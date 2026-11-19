/**
 * Foreign income / remittance tax ESTIMATE (Thai personal income tax).
 *
 * Pure functions, no UI. Every tax rule used here comes from
 * src/config/taxRules.ts; the reasoning for each per-remittance decision cites
 * a registry rule id in tax-data/2026/foreign-income.json, which in turn cites
 * Revenue Department Order Por. 161/2566 (as amended by Por. 162/2566) and the
 * RD Legal Affairs Division Q&A on Section 41 paragraph 2 (Jan 2024).
 *
 * This is an estimate for information only. Where the rules leave a question
 * open (mixed money, residency in past years, LTR exemption scope, foreign tax
 * credits) the estimate takes the cautious (higher) figure and raises a
 * complexity flag rather than deciding the point.
 */
import { TAX_RULES, RULES_TAX_YEAR } from '../config/taxRules';
import { REMITTANCE_CALCULATOR_CONFIG } from '../config/remittanceCalculator';
import { calculateThaiTax, getTaxByBracket, TaxByBracketLine } from './tax';
import { calculateStandardDeduction } from './taxCalculations';

export type RemittanceKind = 'income' | 'capital' | 'mixed';
export type ForeignIncomeType =
  | 'employment'
  | 'pension'
  | 'dividends_interest'
  | 'capital_gains'
  | 'rental'
  | 'other';
export type YesNoUnsure = 'yes' | 'no' | 'unsure';
export type YearEarned = 'pre2024' | number;

export type RemittanceVisaType =
  | 'regular'
  | 'ltr_wealthy_global'
  | 'ltr_wealthy_pensioner'
  | 'ltr_work_from_thailand'
  | 'ltr_highly_skilled'
  | 'retirement'
  | 'dtv'
  | 'thailand_privilege'
  | 'other';

export interface RemittanceInput {
  id: string;
  /** Amount brought into Thailand, in THB at the exchange rate on the transfer date. */
  amountThb: number;
  yearEarned: YearEarned;
  kind: RemittanceKind;
  incomeType: ForeignIncomeType;
  /** Only used when kind === 'mixed': the part that is income or gain, if known. */
  incomePortionThb?: number;
  /** Ignored when yearEarned is the current tax year (days entered decide it). */
  residentInYearEarned: YesNoUnsure;
}

export interface ThaiIncomeInput {
  /** Annual Thai employment income, Section 40(1). */
  annualSalary: number;
  socialSecurityPaid: number;
  /** Any other Thai-source income; no expense deduction is applied to it in this estimate. */
  otherThaiIncome: number;
}

export interface RemittanceEstimateInput {
  daysInThailand: number;
  visaType: RemittanceVisaType;
  /** ISO 3166-1 alpha-2 code, e.g. 'US'. Empty string if not given. */
  nationality: string;
  foreignIncomeTypes: ForeignIncomeType[];
  remittances: RemittanceInput[];
  thaiIncome: ThaiIncomeInput;
  foreignTaxPaidThb: number;
}

export type RemittanceStatus = 'assessable' | 'not_assessable' | 'uncertain';

export interface RemittanceAssessment {
  id: string;
  amountThb: number;
  assessableThb: number;
  status: RemittanceStatus;
  reason: string;
  /** Registry id in tax-data/2026/foreign-income.json backing the reason. */
  ruleId: string;
}

export type ComplexityFlagId =
  | 'ltr'
  | 'pre2024_mixed_with_new_income'
  | 'mixed_funds'
  | 'capital_gains'
  | 'rental'
  | 'us_citizen'
  | 'large_remittance'
  | 'multiple_income_types'
  | 'residency_uncertain'
  | 'foreign_tax_paid';

export interface ComplexityFlag {
  id: ComplexityFlagId;
  title: string;
  detail: string;
}

export interface Assumption {
  id: string;
  text: string;
}

export interface RemittanceEstimateResult {
  taxYear: number;
  residency: { daysInThailand: number; isResident: boolean; thresholdDays: number };
  remittances: RemittanceAssessment[];
  totalRemittedThb: number;
  foreignAssessableThb: number;
  thaiAssessableAfterExpensesThb: number;
  allowancesAndDeductionsThb: number;
  taxableIncomeThb: number;
  estimatedTaxThb: number;
  bracketBreakdown: TaxByBracketLine[];
  taxOnThaiIncomeOnlyThb: number;
  additionalTaxFromRemittancesThb: number;
  /** Estimated tax if an LTR foreign-income exemption applies; null when the visa is not in an exempt category. */
  estimatedTaxIfLtrExemptionAppliesThb: number | null;
  flags: ComplexityFlag[];
  assumptions: Assumption[];
  gracePeriodIsLaw: boolean;
}

const LTR_VISAS: RemittanceVisaType[] = [
  'ltr_wealthy_global',
  'ltr_wealthy_pensioner',
  'ltr_work_from_thailand',
  'ltr_highly_skilled',
];

const money = (n: number | undefined): number => (typeof n === 'number' && Number.isFinite(n) && n > 0 ? n : 0);

export function isResidentForDays(days: number): boolean {
  return money(days) >= TAX_RULES.residencyDays.value;
}

function isLtrForeignIncomeExemptVisa(visa: RemittanceVisaType): boolean {
  return (TAX_RULES.ltrForeignIncomeExemptVisas.value as readonly string[]).includes(visa);
}

/**
 * Decide how much of one transfer is assessable foreign income.
 * Order of checks follows the RD Q&A: earned before 2024 → not assessable;
 * not resident in the year earned → not assessable; capital → not assessable;
 * then income / mixed.
 */
export function assessRemittance(r: RemittanceInput, daysInThailandThisYear: number): RemittanceAssessment {
  const amountThb = money(r.amountThb);
  const out = (status: RemittanceStatus, assessableThb: number, reason: string, ruleId: string): RemittanceAssessment => ({
    id: r.id,
    amountThb,
    assessableThb,
    status,
    reason,
    ruleId,
  });

  if (r.yearEarned === 'pre2024') {
    return out(
      'not_assessable',
      0,
      'Earned before 1 January 2024. Por. 162/2566 excludes this income from the remittance rule.',
      'por161-text'
    );
  }

  const residentWhenEarned: YesNoUnsure =
    r.yearEarned === RULES_TAX_YEAR
      ? isResidentForDays(daysInThailandThisYear)
        ? 'yes'
        : 'no'
      : r.residentInYearEarned;

  if (residentWhenEarned === 'no') {
    return out(
      'not_assessable',
      0,
      `Earned in a year you were in Thailand fewer than ${TAX_RULES.residencyDays.value} days. Per the Revenue Department Q&A, foreign income from a non-resident year is not taxed when brought in.`,
      'residency-tested-in-year-earned'
    );
  }

  if (r.kind === 'capital') {
    return out(
      'not_assessable',
      0,
      'Savings or capital (principal) is not assessable income. Only interest, dividends or gains on it are.',
      'remitted-principal-not-assessable'
    );
  }

  if (r.kind === 'mixed') {
    const stated = r.incomePortionThb !== undefined && Number.isFinite(r.incomePortionThb);
    const portion = stated ? Math.min(money(r.incomePortionThb), amountThb) : amountThb;
    return out(
      'uncertain',
      portion,
      stated
        ? 'Mixed capital and income: only the income/gain part you entered is counted. The Revenue Department leaves the split for you to support from your records.'
        : 'Mixed capital and income with no split entered: the whole amount is counted to be cautious. The Revenue Department gives no ordering rule; the split depends on your records.',
      'mixed-funds-no-ordering-rule'
    );
  }

  if (residentWhenEarned === 'unsure') {
    return out(
      'uncertain',
      amountThb,
      `Counted as taxable to be cautious: you are not sure whether you were in Thailand ${TAX_RULES.residencyDays.value}+ days in the year it was earned.`,
      'residency-tested-in-year-earned'
    );
  }

  return out(
    'assessable',
    amountThb,
    r.incomeType === 'capital_gains'
      ? 'Realised gain earned from 2024 while resident: assessable in the year brought into Thailand (gain only, not the full sale proceeds).'
      : 'Earned from 2024 in a year you were resident: assessable in the year it is brought into Thailand.',
    r.incomeType === 'capital_gains' ? 'capital-gains-computation' : 'por161-text'
  );
}

function buildFlags(input: RemittanceEstimateInput, totalRemitted: number): ComplexityFlag[] {
  const flags: ComplexityFlag[] = [];
  const add = (id: ComplexityFlagId, title: string, detail: string) => {
    if (!flags.some((f) => f.id === id)) flags.push({ id, title, detail });
  };

  const types = new Set<ForeignIncomeType>([
    ...input.foreignIncomeTypes,
    ...input.remittances.filter((r) => money(r.amountThb) > 0).map((r) => r.incomeType),
  ]);

  if (LTR_VISAS.includes(input.visaType)) {
    add(
      'ltr',
      'Long-Term Resident (LTR) visa',
      isLtrForeignIncomeExemptVisa(input.visaType)
        ? 'Your LTR category may exempt foreign income under Royal Decree No. 743. Whether it covers your income and remittances depends on your circumstances, so the main estimate does not apply it.'
        : 'LTR Highly-Skilled Professionals may get a 17% flat rate on qualifying Thai employment income, but no foreign-income exemption. Not applied in this estimate.'
    );
  }

  const hasPre2024 = input.remittances.some((r) => r.yearEarned === 'pre2024' && money(r.amountThb) > 0);
  const hasNewIncome = input.remittances.some(
    (r) => r.yearEarned !== 'pre2024' && r.kind !== 'capital' && money(r.amountThb) > 0
  );
  if (hasPre2024 && hasNewIncome) {
    add(
      'pre2024_mixed_with_new_income',
      'Pre-2024 savings and newer income',
      'You are bringing in both pre-2024 money and income earned from 2024. If they sit in the same account, you may need records showing which part each transfer came from.'
    );
  }

  if (input.remittances.some((r) => r.kind === 'mixed' && money(r.amountThb) > 0)) {
    add(
      'mixed_funds',
      'Mixed capital and income',
      'The Revenue Department says you must assess from the facts which part of a transfer is income and which is capital. There is no fixed ordering rule.'
    );
  }

  if (types.has('capital_gains')) {
    add('capital_gains', 'Capital gains', 'Gains are computed per transaction as sale price minus cost. Cost records and currency matter.');
  }
  if (types.has('rental')) {
    add('rental', 'Foreign rental income', 'Rental income may have expense deductions and foreign tax that affect the Thai figure.');
  }
  if (input.nationality.toUpperCase() === 'US') {
    add(
      'us_citizen',
      'US citizen',
      'US citizens file US returns on worldwide income regardless of residence. The US–Thailand tax treaty and foreign tax credits may apply in both directions.'
    );
  }
  if (totalRemitted > REMITTANCE_CALCULATOR_CONFIG.largeRemittanceFlagThb) {
    add(
      'large_remittance',
      `Remittances over ฿${REMITTANCE_CALCULATOR_CONFIG.largeRemittanceFlagThb.toLocaleString('en-US')}`,
      'Larger transfers are more likely to be reviewed. Planning the timing and source of transfers can matter.'
    );
  }
  if (types.size >= 2) {
    add('multiple_income_types', 'Several income types', 'Different income types can be treated differently for deductions and foreign tax credits.');
  }
  const residencyUnsure = input.remittances.some(
    (r) =>
      money(r.amountThb) > 0 &&
      r.kind !== 'capital' &&
      r.yearEarned !== 'pre2024' &&
      r.yearEarned !== RULES_TAX_YEAR &&
      r.residentInYearEarned === 'unsure'
  );
  if (residencyUnsure) {
    add(
      'residency_uncertain',
      'Residency in an earlier year is unclear',
      `Whether money from an earlier year is taxable depends on whether you spent ${TAX_RULES.residencyDays.value}+ days in Thailand in that year.`
    );
  }
  if (money(input.foreignTaxPaidThb) > 0) {
    add(
      'foreign_tax_paid',
      'Foreign tax already paid',
      'A foreign tax credit under a double tax agreement may reduce Thai tax. It is not applied in this estimate.'
    );
  }

  return flags;
}

export function estimateRemittanceTax(input: RemittanceEstimateInput): RemittanceEstimateResult {
  const isResident = isResidentForDays(input.daysInThailand);
  const assessed = input.remittances.map((r) => assessRemittance(r, input.daysInThailand));
  const totalRemittedThb = assessed.reduce((s, a) => s + a.amountThb, 0);
  const foreignAssessableThb = assessed.reduce((s, a) => s + a.assessableThb, 0);

  const salary = money(input.thaiIncome.annualSalary);
  const thaiAssessableAfterExpensesThb =
    salary - (salary > 0 ? calculateStandardDeduction(salary) : 0) + money(input.thaiIncome.otherThaiIncome);

  const allowancesAndDeductionsThb =
    TAX_RULES.personalAllowance.value +
    Math.min(money(input.thaiIncome.socialSecurityPaid), TAX_RULES.maxSocialSecurity.value);

  const taxable = (assessable: number) => Math.max(0, assessable - allowancesAndDeductionsThb);

  const taxableIncomeThb = taxable(thaiAssessableAfterExpensesThb + foreignAssessableThb);
  const estimatedTaxThb = calculateThaiTax(taxableIncomeThb);
  const taxOnThaiIncomeOnlyThb = calculateThaiTax(taxable(thaiAssessableAfterExpensesThb));

  const assumptions: Assumption[] = [
    {
      id: 'no-expense-deduction-on-foreign-income',
      text: REMITTANCE_CALCULATOR_CONFIG.applyThaiExpenseDeductionsToForeignIncome
        ? 'Thai flat-rate expense deductions are applied to foreign employment or freelance income.'
        : 'No expense deduction is applied to foreign income. If Thai deduction rules apply to your income, your tax could be lower. A qualified advisor can confirm.',
    },
    {
      id: 'only-personal-allowance',
      text: 'Only the personal allowance and social security are deducted. Spouse, children, parents, insurance and fund deductions are not included; the Annual Tax Calculator covers them.',
    },
    {
      id: 'no-foreign-tax-credit',
      text: 'Foreign tax credits under a double tax agreement are not applied.',
    },
    {
      id: 'thb-at-transfer-date',
      text: 'Amounts should be in baht at the exchange rate on the date the money was brought into Thailand.',
    },
  ];

  return {
    taxYear: RULES_TAX_YEAR,
    residency: { daysInThailand: money(input.daysInThailand), isResident, thresholdDays: TAX_RULES.residencyDays.value },
    remittances: assessed,
    totalRemittedThb,
    foreignAssessableThb,
    thaiAssessableAfterExpensesThb,
    allowancesAndDeductionsThb,
    taxableIncomeThb,
    estimatedTaxThb,
    bracketBreakdown: getTaxByBracket(taxableIncomeThb),
    taxOnThaiIncomeOnlyThb,
    additionalTaxFromRemittancesThb: estimatedTaxThb - taxOnThaiIncomeOnlyThb,
    estimatedTaxIfLtrExemptionAppliesThb: isLtrForeignIncomeExemptVisa(input.visaType) ? taxOnThaiIncomeOnlyThb : null,
    flags: buildFlags(input, totalRemittedThb),
    assumptions,
    gracePeriodIsLaw: TAX_RULES.proposedRemittanceGracePeriod.value,
  };
}
