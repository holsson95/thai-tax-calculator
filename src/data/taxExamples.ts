import { TaxFormData } from '../types/taxForm';
import { calculateAnnualTax } from '../utils/taxCalculations';
import { calculateThaiTax, getTaxByBracket, getMarginalRate, TaxByBracketLine } from '../utils/tax';
import { TaxFlowStep } from '../components/TaxFlowDiagram';

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
];

export function getTaxExampleById(id: string): TaxExample | undefined {
  return taxExamples.find((e) => e.id === id);
}
