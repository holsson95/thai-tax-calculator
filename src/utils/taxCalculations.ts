import { TaxFormData, TaxCalculationResult, TaxBreakdown, TAX_CONSTANTS } from '../types/taxForm';
import {
  FreelancerFormData,
  FreelancerTaxResult,
} from '../types/freelancerForm';
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
const LTR_HIGHLY_SKILLED_FLAT_RATE = 0.17;

/**
 * Calculate child allowance based on birth year
 * - Base: 30,000 THB per child
 * - Bonus: Additional 30,000 THB for 2nd+ child born 2018 or later
 */
export function calculateChildAllowance(children: TaxFormData['children']): number {
  let total = 0;

  children.forEach((child, index) => {
    // Base allowance for each child
    total += TAX_CONSTANTS.CHILD_ALLOWANCE_BASE;

    // Bonus for 2nd+ child (index >= 1) born 2018 or later
    if (index >= 1 && child.birthYear >= TAX_CONSTANTS.CHILD_BONUS_BIRTH_YEAR) {
      total += TAX_CONSTANTS.CHILD_ALLOWANCE_BONUS;
    }
  });

  return total;
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

/**
 * Calculate total deductions based on user's expenses
 * Returns breakdown object with capped values
 */
export function calculateDeductions(formData: TaxFormData, taxableIncomeBeforeDeductions: number): TaxBreakdown {
  const breakdown: TaxBreakdown = {
    // Standard expense deduction (50% of income, max 100,000)
    standardDeduction: calculateStandardDeduction(formData.annualIncome),

    personalAllowance: TAX_CONSTANTS.PERSONAL_ALLOWANCE,
    spouseAllowance: (formData.maritalStatus === 'married' && formData.spouseHasNoIncome) ? TAX_CONSTANTS.SPOUSE_ALLOWANCE : 0,
    seniorAllowance: formData.isAge65OrOlder ? TAX_CONSTANTS.SENIOR_ALLOWANCE : 0,
    childAllowance: calculateChildAllowance(formData.children),
    parentAllowance: Math.min(formData.numberOfParents, TAX_CONSTANTS.MAX_PARENTS) * TAX_CONSTANTS.PARENT_ALLOWANCE,

    // Social security contribution
    socialSecurity: formData.includeSocialSecurity
      ? Math.min(formData.socialSecurityContribution, TAX_CONSTANTS.MAX_SOCIAL_SECURITY)
      : 0,

    // Insurance (capped individually and combined)
    lifeInsurance: formData.hasLifeInsurance
      ? Math.min(formData.lifeInsurance, TAX_CONSTANTS.MAX_LIFE_INSURANCE)
      : 0,
    healthInsurance: formData.hasHealthInsurance
      ? Math.min(formData.healthInsurance, TAX_CONSTANTS.MAX_HEALTH_INSURANCE)
      : 0,

    // Retirement funds (capped individually)
    pensionFund: formData.hasPensionFund
      ? Math.min(formData.pensionFund, TAX_CONSTANTS.MAX_PENSION_FUND)
      : 0,
    providentFund: formData.hasProvidentFund
      ? Math.min(formData.providentFund, TAX_CONSTANTS.MAX_PROVIDENT_FUND)
      : 0,
    rmf: formData.hasRMF
      ? Math.min(formData.rmf, TAX_CONSTANTS.MAX_RMF)
      : 0,
    ssf: formData.hasSSF
      ? Math.min(formData.ssf, TAX_CONSTANTS.MAX_SSF)
      : 0,

    // Donations (limited to 10% of taxable income before donations)
    donations: formData.hasDonations
      ? Math.min(formData.donations, taxableIncomeBeforeDeductions * TAX_CONSTANTS.MAX_DONATION_PERCENT)
      : 0,
  };

  return breakdown;
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
 * Calculate additional deductions for freelancer (insurance, funds, donations)
 */
export function calculateFreelancerDeductions(
  formData: FreelancerFormData,
  taxableIncomeBeforeDeductions: number
): number {
  let total = 0;

  // Social security
  if (formData.includeSocialSecurity) {
    total += Math.min(formData.socialSecurityContribution, TAX_CONSTANTS.MAX_SOCIAL_SECURITY);
  }

  // Insurance
  if (formData.hasLifeInsurance) {
    total += Math.min(formData.lifeInsurance, TAX_CONSTANTS.MAX_LIFE_INSURANCE);
  }
  if (formData.hasHealthInsurance) {
    total += Math.min(formData.healthInsurance, TAX_CONSTANTS.MAX_HEALTH_INSURANCE);
  }

  // Retirement funds
  if (formData.hasPensionFund) {
    total += Math.min(formData.pensionFund, TAX_CONSTANTS.MAX_PENSION_FUND);
  }
  if (formData.hasProvidentFund) {
    total += Math.min(formData.providentFund, TAX_CONSTANTS.MAX_PROVIDENT_FUND);
  }
  if (formData.hasRMF) {
    total += Math.min(formData.rmf, TAX_CONSTANTS.MAX_RMF);
  }
  if (formData.hasSSF) {
    total += Math.min(formData.ssf, TAX_CONSTANTS.MAX_SSF);
  }

  // Donations (limited to 10% of taxable income before donations)
  if (formData.hasDonations) {
    total += Math.min(
      formData.donations,
      taxableIncomeBeforeDeductions * TAX_CONSTANTS.MAX_DONATION_PERCENT
    );
  }

  return total;
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

  // Step 4: Calculate expense deduction (only for non-salary income if LTR Highly Skilled)
  const expenseDeduction = getEffectiveDeduction(
    formData.thaiIncomeEntries,
    formData.actualExpenses,
    formData.expenseMethod
  );

  // Step 5: Generate expense comparison if using auto_compare
  const expenseComparison = formData.expenseMethod === 'auto_compare' || formData.expenseMethod === 'force_actual'
    ? compareExpenseDeductions(
        formData.thaiIncomeEntries,
        formData.actualExpenses,
        estimateTaxBracketRate(grossIncomeForProgressiveTax - expenseDeduction)
      )
    : undefined;

  // Step 6: Calculate allowances
  const totalAllowances = calculateFreelancerAllowances(formData);

  // Step 7: Income after expense deduction and allowances
  const incomeAfterDeductions = Math.max(0, grossIncomeForProgressiveTax - expenseDeduction - totalAllowances);

  // Step 8: Calculate additional deductions (insurance, funds, donations)
  const totalDeductions = calculateFreelancerDeductions(formData, incomeAfterDeductions);

  // Step 9: Calculate final taxable income (for progressive brackets)
  const taxableIncome = Math.max(0, incomeAfterDeductions - totalDeductions);

  // Step 10: Calculate tax
  let grossTaxBeforeCredits: number;
  let ltrFlatRateTax = 0;

  if (isLTRHighlySkilled && salaryIncome > 0) {
    // LTR Highly Skilled: 17% flat rate on salary income + progressive on rest
    ltrFlatRateTax = salaryIncome * LTR_HIGHLY_SKILLED_FLAT_RATE;
    const progressiveTax = calculateThaiTax(taxableIncome);
    grossTaxBeforeCredits = ltrFlatRateTax + progressiveTax;
  } else {
    // Standard progressive tax calculation
    grossTaxBeforeCredits = calculateThaiTax(taxableIncome);
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
  };
}