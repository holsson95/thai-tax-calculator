import { TaxFormData } from '../types/taxForm';
import { calculateAnnualTax, calculateFreelancerTax } from '../utils/taxCalculations';
import { calculateThaiTax, getTaxByBracket, getMarginalRate, TaxByBracketLine } from '../utils/tax';
import { TaxFlowStep } from '../components/TaxFlowDiagram';
import { FreelancerFormData, createDefaultFreelancerFormData } from '../types/freelancerForm';

/**
 * Source citation for a worked example. Mirrors the verification status
 * convention used in TAX_RULES.md / tax-data/2026/*.json — do not mark
 * `verified: true` unless a primary government source has actually been
 * fetched and confirmed.
 */
export interface TaxExampleSource {
  label: string;
  url: string;
  verified: boolean;
}

/**
 * A single computed worked-example scenario. Every numeric field here is
 * derived from calculateThaiTax / calculateAnnualTax (src/utils/tax.ts,
 * src/utils/taxCalculations.ts) — never hand-typed — so this data can never
 * silently drift from what the actual calculator would show a user.
 *
 * `effectiveRatePercent` is tax as a percentage of GROSS income for examples
 * built from a full TaxFormData (grossIncome !== taxableIncome) — matching
 * what AnnualResultsStep shows a real user. For examples expressed directly
 * as a taxable-income figure (grossIncome === taxableIncome), it is
 * necessarily tax as a percentage of taxable income, since no gross figure
 * exists. See `effectiveRateBasis`.
 */
export interface TaxExample {
  id: string;
  title: string;
  concept: string;
  scenario: string;
  taxYear: number;
  assumptions: string[];
  grossIncome: number;
  taxableIncome: number;
  totalDeductionsAndAllowances: number;
  taxOwed: number;
  marginalRatePercent: number;
  effectiveRatePercent: number;
  effectiveRateBasis: 'gross income' | 'taxable income';
  bracketBreakdown: TaxByBracketLine[];
  flowSteps: TaxFlowStep[];
  explanation: string;
  source: TaxExampleSource;
  /** Only present for the deductions-impact example: the same scenario without the extra deduction, for comparison. */
  before?: {
    taxableIncome: number;
    taxOwed: number;
    effectiveRatePercent: number;
  };
}

const BRACKET_SOURCE: TaxExampleSource = {
  label: 'Sherrings — Thailand Personal Income Tax Rates',
  url: 'https://sherrings.com/personal-income-tax-rates-thailand.html',
  verified: false,
};

const ALLOWANCE_DEDUCTION_SOURCE: TaxExampleSource = {
  label: 'PwC Tax Summaries / Sherrings — Thailand Individual Deductions & Allowances',
  url: 'https://taxsummaries.pwc.com/thailand/individual/deductions',
  verified: false,
};

// Reuses the exact citation already used for the flat-rate expense deduction
// figure in the flat-rate-vs-actual-expenses article (src/data/articles.ts) —
// same source, not a newly invented one.
const FREELANCE_EXPENSE_SOURCE: TaxExampleSource = {
  label: 'Thai Revenue Department — Expense Deductions for Self-Employed',
  url: 'https://www.rd.go.th/english/index-eng.html',
  verified: false,
};

// Reuses the exact citation already used for the 2024+ remittance rule in
// understanding-thai-tax-residency and foreign-income-thailand-tax.
const REMITTANCE_RULE_SOURCE: TaxExampleSource = {
  label: 'Mahanakorn Partners Group — Overview of Orders Por. 161/2566 and Por. 162/2566',
  url: 'https://mahanakornpartners.com/comprehensive-overview-of-order-no-por-161-2566-and-no-por-162-2566-on-personal-income-tax-for-foreign-sourced-income/',
  verified: false,
};

// The specific pension-exemption rules (which country/pension-type
// combinations are exempt) live in src/data/dtaCountries.ts
// (PENSION_DTA_EXEMPTIONS), already sourced to the US-Thailand treaty text
// for the Article 20(2) Social Security exemption used below.
const DTA_PENSION_SOURCE: TaxExampleSource = {
  label: 'IRS — US–Thailand Double Taxation Convention (treaty text, Article 20(2))',
  url: 'https://www.irs.gov/pub/irs-trty/thailand.pdf',
  verified: false,
};

function bracketFlowStep(taxableIncome: number, label = 'Tax by bracket'): TaxFlowStep {
  const brackets = getTaxByBracket(taxableIncome);
  return {
    kind: 'brackets',
    label,
    brackets: brackets.map((b) => ({ label: b.label, rate: b.rate * 100, tax: b.tax })),
  };
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function thb(n: number): string {
  return `฿${Math.round(n).toLocaleString('en-US')}`;
}

/** Minimal base FreelancerFormData (single, no dependents, Thai resident); examples override what they need. */
function freelancerBaseFormData(overrides: Partial<FreelancerFormData>): FreelancerFormData {
  return {
    ...createDefaultFreelancerFormData(),
    maritalStatus: 'single',
    daysInThailand: 300,
    isThaiResident: true,
    ...overrides,
  };
}

/** Minimal base TaxFormData with every field zeroed/off; examples override what they need. */
function baseFormData(overrides: Partial<TaxFormData>): TaxFormData {
  return {
    employmentType: 'salaried',
    annualIncome: 0,
    includeSocialSecurity: false,
    socialSecurityContribution: 0,
    maritalStatus: 'single',
    spouseHasNoIncome: false,
    isAge65OrOlder: false,
    children: [],
    childrenEligibilityConfirmed: false,
    numberOfParents: 0,
    parentsEligibilityConfirmed: false,
    hasLifeInsurance: false,
    lifeInsurance: 0,
    hasHealthInsurance: false,
    healthInsurance: 0,
    hasPensionFund: false,
    pensionFund: 0,
    hasProvidentFund: false,
    providentFund: 0,
    hasRMF: false,
    rmf: 0,
    hasSSF: false,
    ssf: 0,
    hasDonations: false,
    donations: 0,
    taxWithheld: 0,
    ...overrides,
  };
}

/** A worked example expressed directly as a taxable-income figure (no gross/deduction flow). */
function taxableIncomeExample(params: {
  id: string;
  title: string;
  concept: string;
  scenario: string;
  taxableIncome: number;
  assumptions: string[];
  explanation: string;
}): TaxExample {
  const { id, title, concept, scenario, taxableIncome, assumptions, explanation } = params;
  const taxOwed = calculateThaiTax(taxableIncome);
  return {
    id,
    title,
    concept,
    scenario,
    taxYear: 2026,
    assumptions,
    grossIncome: taxableIncome,
    taxableIncome,
    totalDeductionsAndAllowances: 0,
    taxOwed,
    marginalRatePercent: getMarginalRate(taxableIncome) * 100,
    effectiveRatePercent: round2((taxOwed / taxableIncome) * 100),
    effectiveRateBasis: 'taxable income',
    bracketBreakdown: getTaxByBracket(taxableIncome),
    flowSteps: [
      { kind: 'start', label: 'Taxable income', amount: taxableIncome },
      bracketFlowStep(taxableIncome),
      { kind: 'result', label: 'Total tax', amount: taxOwed },
    ],
    explanation,
    source: BRACKET_SOURCE,
  };
}

export const taxExamples: TaxExample[] = [
  // Example 1 — Simple employee: full gross -> taxable -> tax flow.
  (() => {
    const formData = baseFormData({ annualIncome: 800000 });
    const result = calculateAnnualTax(formData);
    return {
      id: 'simple-employee',
      title: 'Simple Employee: From Salary to Tax Owed',
      concept: 'Gross income to taxable income to tax',
      scenario:
        'A single salaried employee earning ฿800,000 a year, with no dependents and no extra deductions beyond the standard employment deduction and personal allowance.',
      taxYear: 2026,
      assumptions: [
        'Filing status: single, no dependents',
        'Employment income only (Section 40(1)) — eligible for the standard 50% deduction, capped at ฿100,000',
        'No life/health insurance, retirement fund contributions, or donations claimed',
      ],
      grossIncome: result.grossIncome,
      taxableIncome: round2(result.taxableIncome),
      totalDeductionsAndAllowances: round2(result.totalDeductions + result.totalAllowances),
      taxOwed: round2(result.taxOwed),
      marginalRatePercent: getMarginalRate(result.taxableIncome) * 100,
      effectiveRatePercent: round2(result.effectiveRate),
      effectiveRateBasis: 'gross income',
      bracketBreakdown: getTaxByBracket(result.taxableIncome),
      flowSteps: [
        { kind: 'start', label: 'Gross annual income', amount: result.grossIncome },
        { kind: 'subtract', label: 'Standard employment deduction', amount: result.breakdown.standardDeduction, sublabel: '50% of income, capped at ฿100,000' },
        { kind: 'subtract', label: 'Personal allowance', amount: result.totalAllowances, sublabel: 'Single filer, no dependents' },
        { kind: 'result', label: 'Taxable income', amount: result.taxableIncome },
        bracketFlowStep(result.taxableIncome),
        { kind: 'result', label: 'Total tax owed', amount: result.taxOwed },
      ],
      explanation:
        'This is the baseline flow every salaried taxpayer starts from: gross pay is reduced by the standard employment deduction and the personal allowance before any bracket rate is applied. The resulting taxable income (฿640,000) is what actually gets run through the progressive brackets — not the ฿800,000 salary.',
      source: ALLOWANCE_DEDUCTION_SOURCE,
    };
  })(),

  // Example 2 — Lower-income employee (taxable income directly, matches the brackets article).
  taxableIncomeExample({
    id: 'lower-income-employee',
    title: 'Lower-Income Employee: Bracket Rate ≠ Overall Tax Rate',
    concept: 'Marginal rate vs. effective rate at a low income level',
    scenario: 'A taxpayer whose taxable income is ฿400,000 — low enough that most of it falls in the 0% and 5% brackets.',
    taxableIncome: 400000,
    assumptions: [
      'Figure represents taxable income directly (after allowances/deductions already applied)',
      'No special income types or credits',
    ],
    explanation:
      'Being "in the 10% bracket" does not mean paying 10% of this income in tax. Only the last ฿100,000 slice is taxed at 10% — the rest is taxed at 0% and 5% — so the effective rate (4.38%) is less than half the marginal rate.',
  }),

  // Example 3 — Middle-income employee (crosses multiple brackets).
  taxableIncomeExample({
    id: 'middle-income-employee',
    title: 'Middle-Income Employee: Tax Across Multiple Brackets',
    concept: 'Progressive taxation made visible, bracket by bracket',
    scenario: 'A taxpayer with ฿1,000,000 of taxable income — enough to fill every bracket from 0% up to 20%.',
    taxableIncome: 1000000,
    assumptions: [
      'Figure represents taxable income directly (after allowances/deductions already applied)',
      'No special income types or credits',
    ],
    explanation:
      'Five separate brackets each contribute part of the total ฿115,000 tax bill. The 20% marginal rate only applies to the final ฿250,000 slice — the effective rate across the whole ฿1,000,000 is 11.50%.',
  }),

  // Example 4 — High-income employee.
  taxableIncomeExample({
    id: 'high-income-employee',
    title: 'High-Income Employee: Why 30% Isn’t the Real Rate',
    concept: 'Marginal vs. effective rate at a high income level',
    scenario: 'A taxpayer with ฿5,000,000 of taxable income, deep into the 30% bracket.',
    taxableIncome: 5000000,
    assumptions: [
      'Figure represents taxable income directly (after allowances/deductions already applied)',
      'No special income types or credits',
    ],
    explanation:
      'Even at a 30% marginal rate, the effective rate is 25.30% — every bracket below 30% still applies at its own lower rate to its own slice of income. No taxpayer in Thailand’s system pays their top bracket rate on their whole income.',
  }),

  // Example 5a/5b — Bracket threshold pair.
  taxableIncomeExample({
    id: 'bracket-threshold-below',
    title: 'Just Below the 1,000,000 Threshold',
    concept: 'Bracket threshold, part 1 of 2',
    scenario: 'A taxpayer with ฿999,000 of taxable income — ฿1,000 below the boundary between the 20% and 25% brackets.',
    taxableIncome: 999000,
    assumptions: ['Figure represents taxable income directly (after allowances/deductions already applied)'],
    explanation:
      'All of this income is taxed at 20% or below — none of it reaches the 25% bracket, since the boundary is ฿1,000,000.',
  }),
  taxableIncomeExample({
    id: 'bracket-threshold-above',
    title: 'Just Above the 1,000,000 Threshold',
    concept: 'Bracket threshold, part 2 of 2',
    scenario: 'A taxpayer with ฿1,001,000 of taxable income — ฿1,000 above the boundary between the 20% and 25% brackets.',
    taxableIncome: 1001000,
    assumptions: ['Figure represents taxable income directly (after allowances/deductions already applied)'],
    explanation:
      'Earning ฿2,000 more than the example below costs only ฿450 more in tax — not ฿500 (25% of ฿2,000), and nowhere close to the whole ฿1,001,000 being taxed at 25%. Only the ฿1,000 above the ฿1,000,000 threshold is taxed at the new 25% rate; everything below the threshold is still taxed exactly as before.',
  }),

  // Example 6 — Deductions/allowances impact (before/after comparison).
  (() => {
    const grossIncome = 800000;
    const before = calculateAnnualTax(baseFormData({ annualIncome: grossIncome }));
    const after = calculateAnnualTax(
      baseFormData({
        annualIncome: grossIncome,
        hasHealthInsurance: true,
        healthInsurance: 25000,
        hasProvidentFund: true,
        providentFund: 50000,
      })
    );
    return {
      id: 'deductions-impact',
      title: 'Same Salary, Different Deductions',
      concept: 'How deductions/allowances change the tax bill',
      scenario:
        'The same single, ฿800,000-salary employee as the Simple Employee example, but now contributing ฿25,000 to health insurance and ฿50,000 to a provident fund — both deduction categories the calculator supports.',
      taxYear: 2026,
      assumptions: [
        'Same base profile as the Simple Employee example (single, no dependents, ฿800,000 salary)',
        'Adds: ฿25,000 health insurance premium (within the ฿25,000 cap) and ฿50,000 provident fund contribution (within the ฿500,000 cap)',
      ],
      grossIncome: after.grossIncome,
      taxableIncome: round2(after.taxableIncome),
      totalDeductionsAndAllowances: round2(after.totalDeductions + after.totalAllowances),
      taxOwed: round2(after.taxOwed),
      marginalRatePercent: getMarginalRate(after.taxableIncome) * 100,
      effectiveRatePercent: round2(after.effectiveRate),
      effectiveRateBasis: 'gross income',
      bracketBreakdown: getTaxByBracket(after.taxableIncome),
      flowSteps: [
        { kind: 'start', label: 'Gross annual income', amount: after.grossIncome },
        { kind: 'subtract', label: 'Standard employment deduction', amount: after.breakdown.standardDeduction },
        { kind: 'subtract', label: 'Personal allowance', amount: after.totalAllowances },
        { kind: 'subtract', label: 'Health insurance deduction', amount: after.breakdown.healthInsurance },
        { kind: 'subtract', label: 'Provident fund deduction', amount: after.breakdown.providentFund },
        { kind: 'result', label: 'Taxable income', amount: after.taxableIncome },
        bracketFlowStep(after.taxableIncome),
        { kind: 'result', label: 'Total tax owed', amount: after.taxOwed },
      ],
      explanation: `Without the extra deductions, this taxpayer owes ${before.taxOwed.toLocaleString()} THB on a taxable income of ${before.taxableIncome.toLocaleString()} THB (see the Simple Employee example). Claiming the health insurance and provident fund deductions lowers taxable income to ${after.taxableIncome.toLocaleString()} THB and cuts the tax bill by ${(before.taxOwed - after.taxOwed).toLocaleString()} THB — money that would otherwise be taxed at this taxpayer's 15% marginal rate.`,
      source: ALLOWANCE_DEDUCTION_SOURCE,
      before: {
        taxableIncome: round2(before.taxableIncome),
        taxOwed: round2(before.taxOwed),
        effectiveRatePercent: round2(before.effectiveRate),
      },
    };
  })(),

  // Example 7 — Calculator walkthrough.
  (() => {
    const formData = baseFormData({
      annualIncome: 1200000,
      maritalStatus: 'married',
      spouseHasNoIncome: true,
      children: [{ birthYear: 2015 }],
      childrenEligibilityConfirmed: true,
      includeSocialSecurity: true,
      socialSecurityContribution: 10500,
      hasHealthInsurance: true,
      healthInsurance: 15000,
      hasProvidentFund: true,
      providentFund: 60000,
    });
    const result = calculateAnnualTax(formData);
    return {
      id: 'calculator-walkthrough',
      title: 'Calculator Walkthrough: A Married Employee With a Child',
      concept: 'Mirrors entering real numbers into the MyThaiTaxes calculator',
      scenario:
        'A married employee earning ฿1,200,000 a year, whose spouse has no income of their own, with one child, maxed-out social security contributions, health insurance, and a provident fund — the same inputs this person would enter step by step into the Annual Tax Calculator.',
      taxYear: 2026,
      assumptions: [
        'Married, spouse has no income of their own (qualifies for the spouse allowance)',
        'One child (born 2015 — the per-child birth-year bonus only applies to a 2nd or later child born 2018+)',
        'Social security contribution at the ฿10,500 annual cap',
        '฿15,000 health insurance premium and ฿60,000 provident fund contribution, both within their respective caps',
      ],
      grossIncome: result.grossIncome,
      taxableIncome: round2(result.taxableIncome),
      totalDeductionsAndAllowances: round2(result.totalDeductions + result.totalAllowances),
      taxOwed: round2(result.taxOwed),
      marginalRatePercent: getMarginalRate(result.taxableIncome) * 100,
      effectiveRatePercent: round2(result.effectiveRate),
      effectiveRateBasis: 'gross income',
      bracketBreakdown: getTaxByBracket(result.taxableIncome),
      flowSteps: [
        { kind: 'start', label: 'Gross annual income', amount: result.grossIncome },
        { kind: 'subtract', label: 'Standard employment deduction', amount: result.breakdown.standardDeduction },
        { kind: 'subtract', label: 'Personal + spouse + child allowances', amount: result.totalAllowances },
        { kind: 'subtract', label: 'Social security contribution', amount: result.breakdown.socialSecurity },
        { kind: 'subtract', label: 'Health insurance deduction', amount: result.breakdown.healthInsurance },
        { kind: 'subtract', label: 'Provident fund deduction', amount: result.breakdown.providentFund },
        { kind: 'result', label: 'Taxable income', amount: result.taxableIncome },
        bracketFlowStep(result.taxableIncome),
        { kind: 'result', label: 'Total tax owed', amount: result.taxOwed },
      ],
      explanation:
        'This is exactly what the Annual Tax Calculator computes when these values are entered: every allowance and deduction stacks up before the progressive brackets are applied, bringing taxable income from ฿1,200,000 down to ฿864,500 and landing this taxpayer at a 20% marginal rate but only a 7.32% effective rate on gross income.',
      source: ALLOWANCE_DEDUCTION_SOURCE,
    };
  })(),

  // Example 8 — Freelance/business income: flat-rate expense deduction.
  (() => {
    const formData = freelancerBaseFormData({
      thaiIncomeEntries: [
        {
          id: 'consulting-fees',
          grossAmount: 900000,
          incomeType: 'business_sales_40_8',
          withholdingAmount: 0,
          monthReceived: 6,
          payerName: 'Multiple Thai clients',
          description: 'Online consulting and e-commerce revenue',
        },
      ],
      expenseMethod: 'force_flat',
    });
    const result = calculateFreelancerTax(formData);
    return {
      id: 'freelancer-business-income',
      title: 'Freelance Consultant: From Gross Fees to Tax Owed',
      concept: 'Freelance/business income and the flat-rate expense deduction',
      scenario:
        'A single freelance consultant earning ฿900,000 a year in Section 40(8) business/sales income from multiple Thai clients, using the 60% flat-rate expense deduction instead of tracking actual receipts.',
      taxYear: 2026,
      assumptions: [
        'Filing status: single, no dependents',
        'Section 40(8) business/sales income (consulting, e-commerce, agency-type revenue) — eligible for the 60% flat-rate expense deduction, uncapped',
        'No withholding tax, foreign income, insurance, or retirement fund contributions in this scenario',
      ],
      grossIncome: result.grossIncome,
      taxableIncome: round2(result.taxableIncome),
      totalDeductionsAndAllowances: round2(result.totalDeductions + result.totalAllowances),
      taxOwed: round2(result.grossTaxBeforeCredits),
      marginalRatePercent: getMarginalRate(result.taxableIncome) * 100,
      effectiveRatePercent: round2((result.grossTaxBeforeCredits / result.grossIncome) * 100),
      effectiveRateBasis: 'gross income',
      bracketBreakdown: getTaxByBracket(result.taxableIncome),
      flowSteps: [
        { kind: 'start', label: 'Gross business income (Section 40(8))', amount: result.grossIncome },
        { kind: 'subtract', label: 'Flat-rate expense deduction', amount: result.expenseDeduction, sublabel: '60% of gross income, no cap' },
        { kind: 'subtract', label: 'Personal allowance', amount: result.totalAllowances, sublabel: 'Single filer, no dependents' },
        { kind: 'result', label: 'Taxable income', amount: result.taxableIncome },
        bracketFlowStep(result.taxableIncome),
        { kind: 'result', label: 'Total tax owed', amount: result.grossTaxBeforeCredits },
      ],
      explanation:
        'This is the same gross-to-taxable flow as an employee, but the deduction is a flat 60% of income instead of the employee\'s capped 50%/฿100,000 deduction — a much larger reduction for the same gross figure. That is why this article\'s companion, Flat-Rate vs. Actual Expenses, matters: for a freelancer with low actual costs, the flat rate is usually the better choice. Freelancers who also had tax withheld from client invoices would subtract that withholding as a credit against this total — see Withholding Tax for Thai Freelancers.',
      source: FREELANCE_EXPENSE_SOURCE,
    };
  })(),

  // Example 9 — Foreign income remittance: the 2024 earned-date line.
  (() => {
    const formData = freelancerBaseFormData({
      hasForeignIncome: true,
      foreignIncomeEntries: [
        {
          id: 'pre-2024-earnings',
          amount: 15000,
          currency: 'USD',
          amountThb: 500000,
          dateEarned: '2023-06-15',
          dateRemitted: '2025-03-01',
          foreignTaxPaid: 0,
          description: 'Consulting fee earned before the 1 January 2024 rule change',
          country: 'United States',
        },
        {
          id: 'post-2024-earnings',
          amount: 15000,
          currency: 'USD',
          amountThb: 500000,
          dateEarned: '2024-06-15',
          dateRemitted: '2025-03-01',
          foreignTaxPaid: 0,
          description: 'Consulting fee earned after the 1 January 2024 rule change',
          country: 'United States',
        },
      ],
      expenseMethod: 'force_flat',
    });
    const result = calculateFreelancerTax(formData);
    const exemptPortion = result.foreignIncomeTotal - result.taxableForeignIncome;
    return {
      id: 'foreign-income-remittance-timing',
      title: 'Foreign Income Remittance: Same Amount, Different Earned Dates',
      concept: 'Why the 2024+ remittance rule depends on when income was earned, not just when it was remitted',
      scenario:
        'A Thai tax resident freelancer remits two equal $15,000 consulting fees to Thailand on the same day in 2025 — one earned in 2023, the other earned in 2024. Both are remitted after the 1 January 2024 rule change; only one is taxable.',
      taxYear: 2026,
      assumptions: [
        'Thai tax resident for the relevant years (180+ days in Thailand)',
        'Both amounts (฿500,000 each) remitted to Thailand on 1 March 2025',
        'No Thai-sourced income, foreign tax paid, or other deductions in this scenario, to isolate the earned-date effect',
      ],
      grossIncome: result.grossIncome,
      taxableIncome: round2(result.taxableIncome),
      totalDeductionsAndAllowances: round2(result.totalDeductions + result.totalAllowances),
      taxOwed: round2(result.grossTaxBeforeCredits),
      marginalRatePercent: getMarginalRate(result.taxableIncome) * 100,
      effectiveRatePercent: round2((result.grossTaxBeforeCredits / result.grossIncome) * 100),
      effectiveRateBasis: 'gross income',
      bracketBreakdown: getTaxByBracket(result.taxableIncome),
      flowSteps: [
        { kind: 'start', label: 'Total foreign income remitted in 2025', amount: result.foreignIncomeTotal },
        { kind: 'subtract', label: 'Exempt: earned before 1 Jan 2024', amount: exemptPortion, sublabel: 'Old same-year-remittance rule still applies to pre-2024 earnings' },
        { kind: 'result', label: 'Taxable foreign income', amount: result.taxableForeignIncome },
        { kind: 'subtract', label: 'Personal allowance', amount: result.totalAllowances, sublabel: 'Single filer, no dependents' },
        { kind: 'result', label: 'Taxable income', amount: result.taxableIncome },
        bracketFlowStep(result.taxableIncome),
        { kind: 'result', label: 'Total tax owed', amount: result.grossTaxBeforeCredits },
      ],
      explanation:
        'Both amounts are the same size, remitted on the same day, from the same country — the only difference is when the income was earned. Under Por. 161/2566, the 2023-earned amount keeps the pre-2024 same-year-remittance treatment and is never taxable no matter when it is later remitted; the 2024-earned amount falls under the new rule and is taxable when remitted, even in a later year. Half the total remittance ends up taxable, and half does not — see What Counts as Foreign Income in Thailand for the underlying rule and Transferring Money to Thailand for the full remittance mechanics.',
      source: REMITTANCE_RULE_SOURCE,
    };
  })(),

  // Example 10 — Foreign pension income: DTA exemption vs. taxable, with a foreign tax credit.
  (() => {
    const formData = freelancerBaseFormData({
      isAge65OrOlder: true,
      hasForeignIncome: true,
      foreignIncomeEntries: [
        {
          id: 'us-social-security',
          amount: 13700,
          currency: 'USD',
          amountThb: 500000,
          dateEarned: '2026-01-01',
          dateRemitted: '2026-06-01',
          foreignTaxPaid: 0,
          description: 'US Social Security retirement benefit',
          country: 'United States',
          isPension: true,
          pensionType: 'social_security',
        },
        {
          id: 'uk-private-pension',
          amount: 19000,
          currency: 'GBP',
          amountThb: 900000,
          dateEarned: '2026-01-01',
          dateRemitted: '2026-06-01',
          foreignTaxPaid: 30000,
          foreignTaxPaidOriginal: 633,
          foreignTaxPaidCurrency: 'GBP',
          description: 'UK private occupational pension',
          country: 'United Kingdom',
          isPension: true,
          pensionType: 'private_occupational',
        },
      ],
      expenseMethod: 'force_flat',
    });
    const result = calculateFreelancerTax(formData);
    return {
      id: 'foreign-pension-dta-exemption',
      title: 'Foreign Pension Income: One Exempt, One Taxable',
      concept: 'How the pension type and country — not just "is it a pension" — decide DTA treatment',
      scenario:
        'A retired Thai tax resident remits two foreign pensions of comparable size in the same year: a US Social Security benefit and a UK private occupational pension. One is fully exempt from Thai tax under a specific DTA article; the other is taxable, with UK tax already paid credited against the Thai tax.',
      taxYear: 2026,
      assumptions: [
        'Thai tax resident, age 65+ (qualifies for the senior exemption in addition to the personal allowance)',
        'US Social Security (฿500,000): exempt under Article 20(2) of the US-Thailand DTA — taxable only in the US',
        'UK private occupational pension (฿900,000): not a government/military pension, so the UK DTA\'s pension-exemption article does not apply — taxable in Thailand, with ฿30,000 of UK tax already paid claimed as a foreign tax credit',
        'No Thai-sourced income in this scenario',
      ],
      grossIncome: result.grossIncome,
      taxableIncome: round2(result.taxableIncome),
      totalDeductionsAndAllowances: round2(result.totalDeductions + result.totalAllowances),
      taxOwed: round2(result.grossTaxBeforeCredits),
      marginalRatePercent: getMarginalRate(result.taxableIncome) * 100,
      effectiveRatePercent: round2((result.grossTaxBeforeCredits / result.grossIncome) * 100),
      effectiveRateBasis: 'gross income',
      bracketBreakdown: getTaxByBracket(result.taxableIncome),
      flowSteps: [
        { kind: 'start', label: 'Total foreign pension income remitted', amount: result.foreignIncomeTotal },
        { kind: 'subtract', label: 'Exempt: US Social Security (DTA Article 20(2))', amount: result.foreignIncomeTotal - result.taxableForeignIncome },
        { kind: 'result', label: 'Taxable foreign income (UK pension)', amount: result.taxableForeignIncome },
        { kind: 'subtract', label: 'Personal + senior allowance', amount: result.totalAllowances, sublabel: 'Single filer, age 65+' },
        { kind: 'result', label: 'Taxable income', amount: result.taxableIncome },
        bracketFlowStep(result.taxableIncome),
        { kind: 'result', label: 'Tax before foreign tax credit', amount: result.grossTaxBeforeCredits },
        { kind: 'subtract', label: 'Foreign tax credit (UK tax already paid)', amount: result.foreignTaxCredits, sublabel: 'Capped at the Thai tax attributable to that income' },
        { kind: 'result', label: 'Net tax still owed to Thailand', amount: result.netTaxPayable },
      ],
      explanation: `Same pension concept, two different outcomes: the US Social Security payment is fully exempt because the US-Thailand treaty puts it outside Thai tax entirely (not a credit — it is simply not taxable here), while the UK private pension does not qualify for that DTA's narrower government-pension exemption, so it is taxed normally. The Thai tax bill before any credit is ${thb(result.grossTaxBeforeCredits)}; the ${thb(result.foreignTaxCredits)} of UK tax already paid reduces that to a final ${thb(result.netTaxPayable)} still owed to Thailand. The credit cannot exceed the Thai tax on that same income — see Thai Double Tax Treaties for how the cap works in general.`,
      source: DTA_PENSION_SOURCE,
    };
  })(),
];

export function getTaxExampleById(id: string): TaxExample | undefined {
  return taxExamples.find((e) => e.id === id);
}
