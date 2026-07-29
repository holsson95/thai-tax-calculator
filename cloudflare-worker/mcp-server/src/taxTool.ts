import { calculateAnnualTax } from '../../../src/utils/taxCalculations';
import type { ChildData, TaxFormData } from '../../../src/types/taxForm';

export interface AnnualTaxArgs {
  annualIncome: number;
  maritalStatus?: 'single' | 'married';
  spouseHasNoIncome?: boolean;
  isAge65OrOlder?: boolean;
  numberOfChildren?: number;
  childrenBornOnOrAfter2018?: number;
  numberOfParents?: number;
  socialSecurityContribution?: number;
  lifeInsurance?: number;
  healthInsurance?: number;
  pensionFund?: number;
  providentFund?: number;
  rmf?: number;
  ssf?: number;
  donations?: number;
  taxWithheld?: number;
}

// Hand-written JSON Schema (rather than a zod dependency) describing the
// tool's input — this is what MCP clients and AI agents read to know what
// arguments are valid.
export const annualTaxInputSchema = {
  type: 'object',
  properties: {
    annualIncome: {
      type: 'number',
      minimum: 0,
      description: 'Total annual gross income in THB, before any deductions.',
    },
    maritalStatus: { type: 'string', enum: ['single', 'married'], default: 'single' },
    spouseHasNoIncome: {
      type: 'boolean',
      default: false,
      description: 'True if married and the spouse has no income (unlocks the 60,000 THB spouse allowance).',
    },
    isAge65OrOlder: {
      type: 'boolean',
      default: false,
      description: 'Adds the 190,000 THB senior allowance.',
    },
    numberOfChildren: { type: 'integer', minimum: 0, default: 0 },
    childrenBornOnOrAfter2018: {
      type: 'integer',
      minimum: 0,
      default: 0,
      description: '2nd-or-later children born in 2018 or after qualify for a doubled (60,000 THB) allowance.',
    },
    numberOfParents: {
      type: 'integer',
      minimum: 0,
      maximum: 4,
      default: 0,
      description: 'Dependent parents supported (30,000 THB each, max 4).',
    },
    socialSecurityContribution: {
      type: 'number',
      minimum: 0,
      default: 0,
      description: 'Annual social security fund contribution, max deductible 10,500 THB.',
    },
    lifeInsurance: { type: 'number', minimum: 0, default: 0, description: 'Max deductible 100,000 THB.' },
    healthInsurance: { type: 'number', minimum: 0, default: 0, description: 'Max deductible 25,000 THB.' },
    pensionFund: { type: 'number', minimum: 0, default: 0, description: 'Max deductible 500,000 THB.' },
    providentFund: { type: 'number', minimum: 0, default: 0, description: 'Max deductible 500,000 THB.' },
    rmf: {
      type: 'number',
      minimum: 0,
      default: 0,
      description: 'Retirement Mutual Fund contribution, max deductible 500,000 THB.',
    },
    ssf: {
      type: 'number',
      minimum: 0,
      default: 0,
      description: 'Super Savings Fund contribution, max deductible 200,000 THB.',
    },
    donations: {
      type: 'number',
      minimum: 0,
      default: 0,
      description: 'Charitable donations, capped at 10% of income after allowances.',
    },
    taxWithheld: {
      type: 'number',
      minimum: 0,
      default: 0,
      description: 'Tax already withheld by the employer this year, used to compute refund vs. amount owed.',
    },
  },
  required: ['annualIncome'],
} as const;

function toFormData(args: AnnualTaxArgs): TaxFormData {
  if (typeof args.annualIncome !== 'number' || !Number.isFinite(args.annualIncome) || args.annualIncome < 0) {
    throw new Error('annualIncome must be a non-negative number.');
  }

  const numberOfChildren = Math.max(0, Math.trunc(args.numberOfChildren ?? 0));
  const bonusChildren = Math.min(
    numberOfChildren,
    Math.max(0, Math.trunc(args.childrenBornOnOrAfter2018 ?? 0))
  );
  // Bonus allowance requires index >= 1 (2nd child+) AND birthYear >= 2018 —
  // placing the "bonus" children last reproduces that regardless of order.
  const children: ChildData[] = Array.from({ length: numberOfChildren }, (_, index) => ({
    birthYear: index >= numberOfChildren - bonusChildren ? 2018 : 2000,
  }));

  return {
    employmentType: 'salaried',
    annualIncome: args.annualIncome,
    includeSocialSecurity: (args.socialSecurityContribution ?? 0) > 0,
    socialSecurityContribution: args.socialSecurityContribution ?? 0,
    maritalStatus: args.maritalStatus ?? 'single',
    spouseHasNoIncome: args.spouseHasNoIncome ?? false,
    isAge65OrOlder: args.isAge65OrOlder ?? false,
    children,
    childrenEligibilityConfirmed: true,
    numberOfParents: Math.min(4, Math.max(0, Math.trunc(args.numberOfParents ?? 0))),
    parentsEligibilityConfirmed: true,
    hasLifeInsurance: (args.lifeInsurance ?? 0) > 0,
    lifeInsurance: args.lifeInsurance ?? 0,
    hasHealthInsurance: (args.healthInsurance ?? 0) > 0,
    healthInsurance: args.healthInsurance ?? 0,
    hasPensionFund: (args.pensionFund ?? 0) > 0,
    pensionFund: args.pensionFund ?? 0,
    hasProvidentFund: (args.providentFund ?? 0) > 0,
    providentFund: args.providentFund ?? 0,
    hasRMF: (args.rmf ?? 0) > 0,
    rmf: args.rmf ?? 0,
    hasSSF: (args.ssf ?? 0) > 0,
    ssf: args.ssf ?? 0,
    hasDonations: (args.donations ?? 0) > 0,
    donations: args.donations ?? 0,
    taxWithheld: args.taxWithheld ?? 0,
  };
}

function summarize(result: ReturnType<typeof calculateAnnualTax>): string {
  const fmt = (n: number) => `${Math.round(n).toLocaleString('en-US')} THB`;
  const settlement =
    result.refundOrOwed >= 0
      ? `a refund of ${fmt(result.refundOrOwed)}`
      : `an additional ${fmt(Math.abs(result.refundOrOwed))} owed`;
  return [
    `Taxable income: ${fmt(result.taxableIncome)} (after ${fmt(result.totalAllowances)} in allowances and ${fmt(result.totalDeductions)} in deductions from ${fmt(result.grossIncome)} gross income).`,
    `Tax owed: ${fmt(result.taxOwed)} (effective rate ${result.effectiveRate.toFixed(2)}%).`,
    `Based on ${fmt(result.taxWithheld)} already withheld, this results in ${settlement}.`,
  ].join(' ');
}

/** Runs the calculation and returns both a JSON result and an MCP-shaped tool response. */
export function runAnnualTaxCalculation(rawArgs: unknown) {
  const args = (rawArgs ?? {}) as AnnualTaxArgs;
  const formData = toFormData(args);
  return calculateAnnualTax(formData);
}

export const annualTaxTool = {
  definition: {
    name: 'calculate_thai_annual_income_tax',
    title: 'Calculate Thai Annual Personal Income Tax',
    description:
      'Calculates Thailand personal income tax (PIT) for a salaried employee for a tax year, using ' +
      'current progressive tax brackets, standard allowances, and common deductions (social security, ' +
      'insurance, retirement funds, donations). Returns taxable income, tax owed, effective rate, and ' +
      'refund/amount owed against tax already withheld. Source: mythaitaxes.com.',
    inputSchema: annualTaxInputSchema,
  },
  run(rawArgs: unknown) {
    const result = runAnnualTaxCalculation(rawArgs);
    return {
      content: [{ type: 'text', text: summarize(result) }],
      structuredContent: result,
    };
  },
};
