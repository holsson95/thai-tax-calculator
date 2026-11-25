import { TAX_RULES } from '../config/taxRules';
import { TaxFormData, TaxCalculationResult, TaxBreakdown, TAX_CONSTANTS } from '../types/taxForm';
import {
  FreelancerFormData,
  FreelancerTaxResult,
} from '../types/freelancerForm';
import {
  CompanyOwnerFormData,
  calculateTotalEmploymentIncome,
  calculateTaxableDividendIncome,
  calculateDividendWithholdingCredits,
} from '../types/companyOwnerForm';
import { calculateThaiTax } from './tax';
import {
  getEffectiveDeduction,
  compareExpenseDeductions,
  getTotalGrossIncome,
  getTotalWithholding,
  getIncomeByType,
  estimateTaxBracketRate,
} from './expenseCalculations';
import {
  analyzeForeignIncome,
  hasLTRFlatRateBenefit,
  hasLTRForeignIncomeExemption,
} from './foreignIncomeCalculations';
import { checkPND94Obligation, checkVATRegistration } from './obligationChecks';

/**
 * LTR Highly Skilled Professional flat tax rate (17%)
 */
const LTR_HIGHLY_SKILLED_FLAT_RATE = TAX_RULES.ltrHighlySkilledFlatRate.value;

export interface ChildAllowanceLine {
  base: number;
  bonus: number;
  total: number;
  /** False for an adopted child left out by the 3-children limit. */
  counted: boolean;
}

/**
 * Child allowance for each child, returned in the order the children were
 * entered (so UI rows line up), but decided by CHRONOLOGICAL BIRTH ORDER.
 *
 * - Base: 30,000 THB per child.
 * - Bonus: another 30,000 THB for the 2nd and later LEGITIMATE child (by birth
 *   order) born in or after 2018. Adopted children never get the bonus.
 * - Adopted children: legitimate children are counted first; adopted children
 *   are then counted only while the total stays at or below 3
 *   (TAX_RULES.maxChildrenIncludingAdopted). With 3+ legitimate children, no
 *   adopted child is counted.
 *
 * Sources: tax-data/2026/allowances.json#child-allowance-bonus,
 * #child-allowance-adopted-limit (RD PND94 guide, B. item 3).
 * App interpretation (recorded there): the bonus rank counts legitimate
 * children only. History: entry order was used until 2026-11-25; adopted
 * children were not distinguished until 2026-11-25.
 */
export function getChildAllowanceBreakdown(children: TaxFormData['children']): ChildAllowanceLine[] {
  const byBirth = children
    .map((child, index) => ({ index, birthYear: child.birthYear, adopted: !!child.isAdopted }))
    .sort((a, b) => a.birthYear - b.birthYear || a.index - b.index);
  const legitimate = byBirth.filter(c => !c.adopted);
  const adopted = byBirth.filter(c => c.adopted);

  const legitimateRank = new Map(legitimate.map((c, rank) => [c.index, rank]));
  const adoptedSlots = Math.max(0, TAX_RULES.maxChildrenIncludingAdopted.value - legitimate.length);
  const countedAdopted = new Set(adopted.slice(0, adoptedSlots).map(c => c.index));

  return children.map((child, index) => {
    if (child.isAdopted) {
      const counted = countedAdopted.has(index);
      const base = counted ? TAX_CONSTANTS.CHILD_ALLOWANCE_BASE : 0;
      return { base, bonus: 0, total: base, counted };
    }
    const base = TAX_CONSTANTS.CHILD_ALLOWANCE_BASE;
    const isSecondOrLater = (legitimateRank.get(index) ?? 0) >= 1;
    const bonus = isSecondOrLater && child.birthYear >= TAX_CONSTANTS.CHILD_BONUS_BIRTH_YEAR
      ? TAX_CONSTANTS.CHILD_ALLOWANCE_BONUS
      : 0;
    return { base, bonus, total: base + bonus, counted: true };
  });
}

/** Total child allowance (see getChildAllowanceBreakdown for the rule). */
export function calculateChildAllowance(children: TaxFormData['children']): number {
  return getChildAllowanceBreakdown(children).reduce((sum, line) => sum + line.total, 0);
}

/**
 * Calculate total allowances based on user's family situation
 * Allowances reduce taxable income before deductions
 */
export function calculateAllowances(formData: TaxFormData): number {
  let total = TAX_CONSTANTS.PERSONAL_ALLOWANCE; // Everyone gets personal allowance

  // Spouse allowance (only if married AND spouse has no income)
  if (formData.maritalStatus === 'married' && formData.spouseHasNoIncome) {
    total += TAX_CONSTANTS.SPOUSE_ALLOWANCE;
  }

  // Senior allowance (65 years or older)
  if (formData.isAge65OrOlder) {
    total += TAX_CONSTANTS.SENIOR_ALLOWANCE;
  }

  // Child allowance (calculated based on birth year)
  total += calculateChildAllowance(formData.children);

  // Parent allowance (max 4 parents)
  const eligibleParents = Math.min(formData.numberOfParents, TAX_CONSTANTS.MAX_PARENTS);
  total += eligibleParents * TAX_CONSTANTS.PARENT_ALLOWANCE;

  return total;
}

/**
 * Calculate standard expense deduction for employment income
 * 50% of income, capped at 100,000 THB
 */
export function calculateStandardDeduction(annualIncome: number): number {
  return Math.min(
    annualIncome * TAX_CONSTANTS.STANDARD_DEDUCTION_RATE,
    TAX_CONSTANTS.MAX_STANDARD_DEDUCTION
  );
}

/** The form fields every engine shares for the non-allowance deductions. */
export type DeductionInputs = Pick<
  TaxFormData,
  | 'includeSocialSecurity' | 'socialSecurityContribution'
  | 'hasLifeInsurance' | 'lifeInsurance'
  | 'hasHealthInsurance' | 'healthInsurance'
  | 'hasPensionFund' | 'pensionFund'
  | 'hasProvidentFund' | 'providentFund'
  | 'hasRMF' | 'rmf'
  | 'hasSSF' | 'ssf'
  | 'hasDonations' | 'donations'
>;

export type DeductionBreakdown = Pick<
  TaxBreakdown,
  'socialSecurity' | 'lifeInsurance' | 'healthInsurance' | 'pensionFund' | 'providentFund' | 'rmf' | 'ssf' | 'donations'
>;

/**
 * Incomes that some deduction limits are a percentage of.
 * - assessableIncome: total assessable income (RMF 30%, SSF 30%)
 * - wages: Section 40(1) employment pay (provident fund 15%)
 */
export interface IncomeBasis {
  assessableIncome: number;
  wages: number;
}

/** A ticked amount, floored at zero (blank/NaN/negative inputs give nothing). */
const claimed = (ticked: boolean, amount: number): number =>
  ticked && Number.isFinite(amount) && amount > 0 ? amount : 0;

/**
 * Social security, insurance, retirement-fund and donation deductions, with every cap applied.
 * Shared by the salaried, company-owner, freelancer and monthly calculators so they cannot drift.
 *
 * 1. Each item is capped individually (TAX_CONSTANTS) and, since 2026-11-25, by its
 *    share-of-income limit: provident fund 15% of wages, RMF 30% and SSF 30% of
 *    assessable income (tax-data/2026/deductions.json: provident-fund-wage-percent,
 *    rmf-income-percent, ssf-income-percent). The 'pension fund' field is the
 *    Government Pension Fund (max-pension-fund, 500,000, no share-of-income limit).
 * 2. Pension + provident fund + RMF + SSF together are capped at 500,000
 *    (tax-data/2026/deductions.json#combined-retirement-cap; enforced from 2026-11-25).
 *    When the combined cap binds, the funds are filled in form order (pension,
 *    provident, RMF, SSF) and the later ones trimmed. That order only changes how
 *    the breakdown is displayed, not the total or the tax.
 * 3. Donations are capped at 10% of income after the expense deduction,
 *    allowances AND all the deductions above
 *    (tax-data/2026/deductions.json#max-donation-percent; before 2026-11-25 the cap
 *    ignored the deductions in steps 1–2).
 *
 * @param incomeAfterAllowances income after the expense deduction and allowances
 * @param basis incomes that the share-of-income limits apply to
 */
export function calculateDeductionBreakdown(
  formData: DeductionInputs,
  incomeAfterAllowances: number,
  basis: IncomeBasis
): DeductionBreakdown {
  const assessable = Number.isFinite(basis.assessableIncome) ? Math.max(0, basis.assessableIncome) : 0;
  const wages = Number.isFinite(basis.wages) ? Math.max(0, basis.wages) : 0;

  const socialSecurity = Math.min(claimed(formData.includeSocialSecurity, formData.socialSecurityContribution), TAX_CONSTANTS.MAX_SOCIAL_SECURITY);
  const lifeInsurance = Math.min(claimed(formData.hasLifeInsurance, formData.lifeInsurance), TAX_CONSTANTS.MAX_LIFE_INSURANCE);
  // Life and health insurance together are capped at 100,000 (tax-data/2026/deductions.json:
  // life-health-combined-cap; enforced since 2026-11-25). Health fills whatever room life leaves.
  const healthInsurance = Math.min(
    claimed(formData.hasHealthInsurance, formData.healthInsurance),
    TAX_CONSTANTS.MAX_HEALTH_INSURANCE,
    Math.max(0, TAX_RULES.maxLifeAndHealthInsuranceCombined.value - lifeInsurance)
  );

  let retirementRoom = TAX_RULES.combinedRetirementCap.value;
  const takeRetirement = (amount: number, individualCap: number): number => {
    const allowed = Math.min(amount, individualCap, retirementRoom);
    retirementRoom -= allowed;
    return allowed;
  };
  // Government Pension Fund: its own 500,000 cap, no share-of-income limit.
  const pensionFund = takeRetirement(claimed(formData.hasPensionFund, formData.pensionFund), TAX_CONSTANTS.MAX_PENSION_FUND);
  const providentFund = takeRetirement(
    claimed(formData.hasProvidentFund, formData.providentFund),
    Math.min(TAX_CONSTANTS.MAX_PROVIDENT_FUND, wages * TAX_RULES.providentFundWagePercent.value)
  );
  const rmf = takeRetirement(
    claimed(formData.hasRMF, formData.rmf),
    Math.min(TAX_CONSTANTS.MAX_RMF, assessable * TAX_RULES.rmfIncomePercent.value)
  );
  const ssf = takeRetirement(
    claimed(formData.hasSSF, formData.ssf),
    Math.min(TAX_CONSTANTS.MAX_SSF, assessable * TAX_RULES.ssfIncomePercent.value)
  );

  const incomeBeforeDonations = Math.max(
    0,
    incomeAfterAllowances - socialSecurity - lifeInsurance - healthInsurance - pensionFund - providentFund - rmf - ssf
  );
  const donations = Math.min(
    claimed(formData.hasDonations, formData.donations),
    incomeBeforeDonations * TAX_CONSTANTS.MAX_DONATION_PERCENT
  );

  return { socialSecurity, lifeInsurance, healthInsurance, pensionFund, providentFund, rmf, ssf, donations };
}

/** Sum of a DeductionBreakdown. */
export function sumDeductions(d: DeductionBreakdown): number {
  return d.socialSecurity + d.lifeInsurance + d.healthInsurance + d.pensionFund + d.providentFund + d.rmf + d.ssf + d.donations;
}

/**
 * Full breakdown (expense deduction, allowances and deductions) with capped values.
 * @param incomeAfterAllowances income after the expense deduction and allowances
 * @param basis incomes for the share-of-income limits; defaults to the salary
 *   (annualIncome) as both assessable income and wages
 */
export function calculateDeductions(
  formData: TaxFormData,
  incomeAfterAllowances: number,
  basis: IncomeBasis = { assessableIncome: formData.annualIncome, wages: formData.annualIncome }
): TaxBreakdown {
  return {
    // Standard expense deduction (50% of income, max 100,000)
    standardDeduction: calculateStandardDeduction(formData.annualIncome),

    personalAllowance: TAX_CONSTANTS.PERSONAL_ALLOWANCE,
    spouseAllowance: (formData.maritalStatus === 'married' && formData.spouseHasNoIncome) ? TAX_CONSTANTS.SPOUSE_ALLOWANCE : 0,
    seniorAllowance: formData.isAge65OrOlder ? TAX_CONSTANTS.SENIOR_ALLOWANCE : 0,
    childAllowance: calculateChildAllowance(formData.children),
    parentAllowance: Math.min(formData.numberOfParents, TAX_CONSTANTS.MAX_PARENTS) * TAX_CONSTANTS.PARENT_ALLOWANCE,

    ...calculateDeductionBreakdown(formData, incomeAfterAllowances, basis),
  };
}

/**
 * Calculate complete annual tax with all allowances and deductions
 * Returns full result object with breakdown
 */
export function calculateAnnualTax(formData: TaxFormData): TaxCalculationResult {
  // Step 1: Calculate standard expense deduction (50% of income, max 100,000)
  const standardDeduction = calculateStandardDeduction(formData.annualIncome);

  // Step 2: Calculate total allowances
  const totalAllowances = calculateAllowances(formData);

  // Step 3: Subtract standard deduction and allowances from gross income
  const incomeAfterAllowances = Math.max(0, formData.annualIncome - standardDeduction - totalAllowances);

  // Step 4: Calculate deductions (donations limited by income after allowances)
  const breakdown = calculateDeductions(formData, incomeAfterAllowances);

  // Step 5: Sum up all deductions (excluding standard deduction and allowances)
  const totalDeductions =
    breakdown.standardDeduction +
    breakdown.socialSecurity +
    breakdown.lifeInsurance +
    breakdown.healthInsurance +
    breakdown.pensionFund +
    breakdown.providentFund +
    breakdown.rmf +
    breakdown.ssf +
    breakdown.donations;

  // Step 6: Calculate final taxable income
  const taxableIncome = Math.max(0, incomeAfterAllowances - (totalDeductions - breakdown.standardDeduction));

  // Step 7: Calculate tax using progressive brackets
  const taxOwed = calculateThaiTax(taxableIncome);

  // Step 8: Calculate refund or additional tax owed
  const refundOrOwed = formData.taxWithheld - taxOwed;

  // Step 9: Calculate effective tax rate
  const effectiveRate = formData.annualIncome > 0
    ? (taxOwed / formData.annualIncome) * 100
    : 0;

  return {
    grossIncome: formData.annualIncome,
    totalAllowances,
    totalDeductions,
    taxableIncome,
    taxOwed,
    taxWithheld: formData.taxWithheld,
    refundOrOwed,
    effectiveRate,
    breakdown,
  };
}

export interface MinimumTaxResult {
  /** Non-employment income the 0.5% is charged on (after the 65+ exemption). */
  base: number;
  /** 0.5% of the base when the rule applies, otherwise 0. */
  minimumTax: number;
}

/**
 * Annual minimum ("gross-income") tax, RD Guide to PND90 2024, No. 11 items 8-10
 * (tax-data/2026/income-tax-brackets.json: gross-income-tax-*):
 * when non-employment assessable income is 120,000 or more, tax payable is the
 * greater of the ordinary tax and 0.5% of that income before expenses and
 * allowances, unless the 0.5% figure is under 5,000.
 *
 * @param nonEmploymentIncome gross assessable income other than Section 40(1)
 * @param isAge65OrOlder the 65+ income exemption (up to 190,000) is taken off the
 *   base first; the taxpayer may choose which income it applies to, and this
 *   choice gives the lowest minimum tax
 */
export function calculateMinimumTax(nonEmploymentIncome: number, isAge65OrOlder: boolean): MinimumTaxResult {
  const gross = Number.isFinite(nonEmploymentIncome) ? Math.max(0, nonEmploymentIncome) : 0;
  const base = Math.max(0, gross - (isAge65OrOlder ? TAX_CONSTANTS.SENIOR_ALLOWANCE : 0));
  if (base < TAX_RULES.grossIncomeTaxThreshold.value) return { base, minimumTax: 0 };
  const tax = base * TAX_RULES.grossIncomeTaxRate.value;
  return { base, minimumTax: tax >= TAX_RULES.grossIncomeTaxMinimumAmount.value ? tax : 0 };
}

/**
 * Calculate complete annual tax for company owners
 * Employment income (salary + director fees + benefits) gets the 50% standard deduction capped at 100,000.
 * PIT-included dividends are added to taxable income but receive no expense deduction.
 */
export function calculateCompanyOwnerTax(formData: CompanyOwnerFormData): TaxCalculationResult {
  // Employment income — all Section 40(1), eligible for 50% standard deduction
  const employmentIncome = calculateTotalEmploymentIncome(formData);

  // Dividend income included in PIT (those with includeInPIT = true)
  const taxableDividends = calculateTaxableDividendIncome(formData);

  // Withholding credits from PIT-included dividends (10% each)
  const dividendWithholdingCredits = calculateDividendWithholdingCredits(formData);

  // Standard deduction applies only to employment income
  const standardDeduction = calculateStandardDeduction(employmentIncome);

  // Gross income for display and effective rate
  const grossIncome = employmentIncome + taxableDividends;

  // Allowances — same logic as salaried (shared fields)
  const totalAllowances = calculateAllowances(formData as unknown as TaxFormData);

  // Income after standard deduction and allowances
  const incomeAfterAllowances = Math.max(0, grossIncome - standardDeduction - totalAllowances);

  // Deductions — pass employment income as annualIncome so standardDeduction inside
  // calculateDeductions is also computed on employment income only
  const fakeFormData: TaxFormData = {
    ...(formData as unknown as TaxFormData),
    annualIncome: employmentIncome,
  };
  const breakdown = calculateDeductions(fakeFormData, incomeAfterAllowances, {
    assessableIncome: grossIncome,
    // Provident fund is a share of wages: the salary the company pays (not director fees or dividends).
    wages: formData.salaryFromCompany || 0,
  });

  // Sum additional deductions (all except standardDeduction which is already accounted for)
  const additionalDeductions =
    breakdown.socialSecurity +
    breakdown.lifeInsurance +
    breakdown.healthInsurance +
    breakdown.pensionFund +
    breakdown.providentFund +
    breakdown.rmf +
    breakdown.ssf +
    breakdown.donations;

  const totalDeductions = standardDeduction + additionalDeductions;

  // Taxable income
  const taxableIncome = Math.max(0, incomeAfterAllowances - additionalDeductions);

  // Tax using progressive brackets, but at least the annual minimum tax on the
  // non-employment part: director fees (Section 40(2) — "meeting allowance, fee")
  // and PIT-included dividends (40(4)).
  const progressiveTax = calculateThaiTax(taxableIncome);
  const { minimumTax } = calculateMinimumTax((formData.directorFees || 0) + taxableDividends, formData.isAge65OrOlder);
  const taxOwed = Math.max(progressiveTax, minimumTax);

  // Total withholding: salary withholding + any separately entered withholding + dividend credits
  const taxWithheld =
    (formData.salaryWithholdingTax || 0) +
    (formData.taxWithheld || 0) +
    dividendWithholdingCredits;

  const refundOrOwed = taxWithheld - taxOwed;

  const effectiveRate = grossIncome > 0 ? (taxOwed / grossIncome) * 100 : 0;

  return {
    grossIncome,
    totalAllowances,
    totalDeductions,
    taxableIncome,
    taxOwed,
    taxWithheld,
    refundOrOwed,
    effectiveRate,
    breakdown,
    minimumTax,
    minimumTaxApplied: minimumTax > progressiveTax,
  };
}

/**
 * Format number as Thai Baht currency
 */
export function formatThb(amount: number): string {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format number as percentage
 */
export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

/**
 * Calculate allowances for freelancer (similar to salaried but uses FreelancerFormData)
 */
export function calculateFreelancerAllowances(formData: FreelancerFormData): number {
  let total = TAX_CONSTANTS.PERSONAL_ALLOWANCE;

  if (formData.maritalStatus === 'married' && formData.spouseHasNoIncome) {
    total += TAX_CONSTANTS.SPOUSE_ALLOWANCE;
  }

  if (formData.isAge65OrOlder) {
    total += TAX_CONSTANTS.SENIOR_ALLOWANCE;
  }

  total += calculateChildAllowance(formData.children);

  const eligibleParents = Math.min(formData.numberOfParents, TAX_CONSTANTS.MAX_PARENTS);
  total += eligibleParents * TAX_CONSTANTS.PARENT_ALLOWANCE;

  return total;
}

/**
 * Additional deductions for a freelancer (social security, insurance, funds, donations).
 * Same rules and caps as the salaried calculator: see calculateDeductionBreakdown.
 */
export function calculateFreelancerDeductions(
  formData: FreelancerFormData,
  incomeAfterAllowances: number,
  basis: IncomeBasis
): number {
  return sumDeductions(calculateDeductionBreakdown(formData, incomeAfterAllowances, basis));
}

/**
 * Calculate complete annual tax for freelancers/self-employed
 * Handles foreign income, expense deductions, tax obligations, and LTR visa benefits
 */
export function calculateFreelancerTax(formData: FreelancerFormData): FreelancerTaxResult {
  // Check LTR visa benefits
  const isLTRHighlySkilled = hasLTRFlatRateBenefit(formData.visaType);
  const isLTRForeignExempt = hasLTRForeignIncomeExemption(formData.visaType);

  // Step 1: Calculate Thai income
  const thaiIncomeTotal = getTotalGrossIncome(formData.thaiIncomeEntries);
  const withholdingCredits = getTotalWithholding(formData.thaiIncomeEntries);
  const incomeByType = getIncomeByType(formData.thaiIncomeEntries);

  // For LTR Highly Skilled: Calculate salary income separately for 17% flat rate
  const salaryIncome = incomeByType.get('salary_40_1') || 0;
  const nonSalaryThaiIncome = thaiIncomeTotal - salaryIncome;

  // Step 2: Analyze foreign income
  const foreignAnalysis = analyzeForeignIncome(formData);
  const foreignIncomeTotal = foreignAnalysis.totalForeignIncome;
  const taxableForeignIncome = foreignAnalysis.taxableForeignIncome;
  const foreignTaxCredits = foreignAnalysis.totalForeignTaxCredit;

  // Step 3: Calculate total gross income
  // For LTR Highly Skilled: salary income taxed at flat rate, so exclude from progressive calculation
  const grossIncomeForProgressiveTax = isLTRHighlySkilled
    ? nonSalaryThaiIncome + taxableForeignIncome
    : thaiIncomeTotal + taxableForeignIncome;
  const grossIncome = thaiIncomeTotal + taxableForeignIncome;

  // Step 4: Calculate expense deduction.
  // LTR Highly Skilled: the salary is taxed at the flat rate OUTSIDE the progressive
  // calculation, so its 40(1) expense deduction must not be subtracted from the
  // remaining (progressive) income. Before 2026-11-25 it was, which understated tax
  // on the non-salary income by up to 100,000 THB of taxable income.
  const progressiveIncomeEntries = isLTRHighlySkilled
    ? formData.thaiIncomeEntries.filter(entry => entry.incomeType !== 'salary_40_1')
    : formData.thaiIncomeEntries;
  const expenseDeduction = getEffectiveDeduction(
    progressiveIncomeEntries,
    formData.actualExpenses,
    formData.expenseMethod
  );

  // Step 5: Generate expense comparison if using auto_compare
  const expenseComparison = formData.expenseMethod === 'auto_compare' || formData.expenseMethod === 'force_actual'
    ? compareExpenseDeductions(
        progressiveIncomeEntries,
        formData.actualExpenses,
        estimateTaxBracketRate(grossIncomeForProgressiveTax - expenseDeduction)
      )
    : undefined;

  // Step 6: Calculate allowances
  const totalAllowances = calculateFreelancerAllowances(formData);

  // Step 7: Income after expense deduction and allowances
  const incomeAfterDeductions = Math.max(0, grossIncomeForProgressiveTax - expenseDeduction - totalAllowances);

  // Step 8: Calculate additional deductions (insurance, funds, donations)
  const deductionBreakdown = calculateDeductionBreakdown(formData, incomeAfterDeductions, {
    assessableIncome: grossIncome,
    wages: salaryIncome,
  });
  const totalDeductions = sumDeductions(deductionBreakdown);

  // Step 9: Calculate final taxable income (for progressive brackets)
  const taxableIncome = Math.max(0, incomeAfterDeductions - totalDeductions);

  // Step 10: Calculate tax
  let grossTaxBeforeCredits: number;
  let ltrFlatRateTax = 0;

  // Annual minimum tax on non-employment income (every Thai entry except 40(1)
  // salary). Remitted foreign income is left out of the base: the app does not
  // know its Section 40 category (tax-data: gross-income-tax-rate).
  const { minimumTax } = calculateMinimumTax(nonSalaryThaiIncome, formData.isAge65OrOlder);
  const ordinaryProgressiveTax = calculateThaiTax(taxableIncome);
  const progressiveTax = Math.max(ordinaryProgressiveTax, minimumTax);

  if (isLTRHighlySkilled && salaryIncome > 0) {
    // LTR Highly Skilled: 17% flat rate on salary income + progressive on rest
    ltrFlatRateTax = salaryIncome * LTR_HIGHLY_SKILLED_FLAT_RATE;
    grossTaxBeforeCredits = ltrFlatRateTax + progressiveTax;
  } else {
    // Standard progressive tax calculation
    grossTaxBeforeCredits = progressiveTax;
  }

  // Step 11: Apply credits (withholding and foreign tax credits)
  // Foreign tax credit is limited to Thai tax on that foreign income
  const maxForeignTaxCredit = taxableForeignIncome > 0 && grossIncome > 0
    ? (taxableForeignIncome / grossIncome) * grossTaxBeforeCredits
    : 0;
  const effectiveForeignTaxCredit = Math.min(foreignTaxCredits, maxForeignTaxCredit);

  const totalCredits = withholdingCredits + effectiveForeignTaxCredit;
  const netTaxPayable = Math.max(0, grossTaxBeforeCredits - totalCredits);

  // Step 12: Calculate effective rate
  const effectiveRate = grossIncome > 0
    ? (grossTaxBeforeCredits / grossIncome) * 100
    : 0;

  // Step 13: Check tax obligations
  const pnd94 = checkPND94Obligation(formData);
  const vat = checkVATRegistration(formData);

  return {
    grossIncome,
    thaiIncomeTotal,
    foreignIncomeTotal,
    taxableForeignIncome,
    expenseDeduction,
    expenseMethod: formData.expenseMethod,
    totalAllowances,
    totalDeductions: expenseDeduction + totalDeductions, // Include expense deduction in total
    deductionBreakdown,
    taxableIncome,
    grossTaxBeforeCredits,
    withholdingCredits,
    foreignTaxCredits: effectiveForeignTaxCredit,
    netTaxPayable,
    effectiveRate,
    pnd94,
    vat,
    expenseComparison,
    foreignIncomeTaxability: foreignAnalysis.entries,
    incomeByType,
    // LTR-specific fields
    ltrBenefitApplied: isLTRHighlySkilled || isLTRForeignExempt,
    ltrFlatRateTax: isLTRHighlySkilled ? ltrFlatRateTax : undefined,
    ltrForeignIncomeExempt: isLTRForeignExempt,
    minimumTax,
    minimumTaxApplied: minimumTax > ordinaryProgressiveTax,
  };
}