/**
 * Turns a calculator result into what the lead CTA / form / email capture need:
 * prefill values, complexity flags, a non-personal snapshot for the partner,
 * and a breakdown for the "email me my breakdown" feature.
 */
import { PARTNER } from '../config/partner';
import { RULES_TAX_YEAR } from '../config/taxRules';
import { REMITTANCE_CALCULATOR_CONFIG } from '../config/remittanceCalculator';
import {
  CalculatorSnapshot,
  LeadIncomeType,
  LeadSource,
  RemittanceRange,
  remittanceRangeFor,
} from '../shared/leads';
import type { BreakdownForEmail } from '../services/leadsApi';
import type { RemittanceEstimateInput, RemittanceEstimateResult } from './remittanceEstimate';
import { getTaxByBracket } from './tax';
import type { FreelancerFormData, FreelancerTaxResult } from '../types/freelancerForm';

export interface LeadFlag {
  id: string;
  title: string;
}

export interface LeadContext {
  source: LeadSource;
  estimatedTaxThb: number;
  flags: LeadFlag[];
  prefill: {
    nationality?: string;
    daysInThailand?: number;
    incomeTypes: LeadIncomeType[];
    remittanceRange?: RemittanceRange;
  };
  snapshot: CalculatorSnapshot;
  breakdown: BreakdownForEmail;
}

/** High prominence when any complexity flag fires or the estimated tax is above the configured threshold. */
export function isHighPriority(ctx: Pick<LeadContext, 'flags' | 'estimatedTaxThb'>, thresholdThb = PARTNER.leadCtaTaxThresholdThb): boolean {
  return ctx.flags.length > 0 || ctx.estimatedTaxThb > thresholdThb;
}

const bracketsFor = (taxable: number) =>
  getTaxByBracket(taxable).map((b) => ({ label: b.label, rate: b.rate, taxableAmount: Math.round(b.taxableAmount), tax: Math.round(b.tax) }));

const FOREIGN_TO_LEAD: Record<string, LeadIncomeType> = {
  employment: 'employment',
  pension: 'pension',
  dividends_interest: 'dividends_interest',
  capital_gains: 'capital_gains',
  rental: 'rental',
  other: 'other',
};

export function leadContextFromRemittance(input: RemittanceEstimateInput, result: RemittanceEstimateResult): LeadContext {
  const types = new Set<LeadIncomeType>();
  input.foreignIncomeTypes.forEach((t) => types.add(FOREIGN_TO_LEAD[t]));
  input.remittances.filter((r) => r.amountThb > 0 && r.kind !== 'capital').forEach((r) => types.add(FOREIGN_TO_LEAD[r.incomeType]));
  if (input.thaiIncome.annualSalary > 0) types.add('thai_employment');
  if (input.thaiIncome.otherThaiIncome > 0) types.add('thai_business');

  const flags = result.flags.map((f) => ({ id: f.id, title: f.title }));
  return {
    source: 'foreign_income',
    estimatedTaxThb: result.estimatedTaxThb,
    flags,
    prefill: {
      nationality: input.nationality || undefined,
      daysInThailand: input.daysInThailand > 0 ? Math.round(input.daysInThailand) : undefined,
      incomeTypes: [...types],
      remittanceRange: remittanceRangeFor(result.totalRemittedThb),
    },
    snapshot: {
      source: 'foreign_income',
      estimatedTaxThb: Math.round(result.estimatedTaxThb),
      totalRemittedThb: Math.round(result.totalRemittedThb),
      foreignAssessableThb: Math.round(result.foreignAssessableThb),
      taxableIncomeThb: Math.round(result.taxableIncomeThb),
      isResident: result.residency.isResident,
      flags: flags.map((f) => f.id),
    },
    breakdown: {
      calculator: 'foreign_income',
      taxYear: result.taxYear,
      estimatedTaxThb: Math.round(result.estimatedTaxThb),
      taxableIncomeThb: Math.round(result.taxableIncomeThb),
      totalRemittedThb: Math.round(result.totalRemittedThb),
      foreignAssessableThb: Math.round(result.foreignAssessableThb),
      brackets: bracketsFor(result.taxableIncomeThb),
      flags: flags.map((f) => f.title),
      assumptions: result.assumptions.map((a) => a.text),
    },
  };
}

const ANNUAL_ASSUMPTIONS = ['Estimate based on the figures entered in the Annual Tax Calculator.'];

/** Annual calculator — freelancer / sole proprietor / company owner path (FreelancerFormData). */
export function leadContextFromFreelancer(formData: FreelancerFormData, result: FreelancerTaxResult): LeadContext {
  const flags: LeadFlag[] = [];
  const foreign = formData.hasForeignIncome ? formData.foreignIncomeEntries : [];
  const remitted = foreign.filter((e) => e.dateRemitted).reduce((s, e) => s + (e.amountThb || 0), 0);
  if (formData.visaType?.startsWith('ltr_')) flags.push({ id: 'ltr', title: 'Long-Term Resident (LTR) visa' });
  if (foreign.length > 0) flags.push({ id: 'foreign_income', title: 'Foreign income' });
  if (remitted > REMITTANCE_CALCULATOR_CONFIG.largeRemittanceFlagThb)
    flags.push({ id: 'large_remittance', title: 'Large remittances' });
  if (foreign.some((e) => e.foreignTaxPaid > 0)) flags.push({ id: 'foreign_tax_paid', title: 'Foreign tax already paid' });
  const thaiTypes = new Set((formData.thaiIncomeEntries ?? []).map((e) => e.incomeType));
  if (thaiTypes.size + (foreign.length > 0 ? 1 : 0) >= 2) flags.push({ id: 'multiple_income_types', title: 'Several income types' });

  const incomeTypes = new Set<LeadIncomeType>();
  if (thaiTypes.has('salary_40_1')) incomeTypes.add('thai_employment');
  if ([...thaiTypes].some((t) => t !== 'salary_40_1')) incomeTypes.add('thai_business');
  if (foreign.some((e) => e.isPension)) incomeTypes.add('pension');
  if (foreign.some((e) => !e.isPension)) incomeTypes.add('other');

  const tax = Math.round(result.grossTaxBeforeCredits);
  return {
    source: 'annual',
    estimatedTaxThb: tax,
    flags,
    prefill: {
      daysInThailand: formData.daysInThailand > 0 ? formData.daysInThailand : undefined,
      incomeTypes: [...incomeTypes],
      remittanceRange: remittanceRangeFor(remitted),
    },
    snapshot: {
      source: 'annual',
      estimatedTaxThb: tax,
      taxableIncomeThb: Math.round(result.taxableIncome),
      isResident: formData.isThaiResident,
      totalRemittedThb: Math.round(remitted),
      flags: flags.map((f) => f.id),
    },
    breakdown: {
      calculator: 'annual',
      taxYear: RULES_TAX_YEAR,
      estimatedTaxThb: tax,
      taxableIncomeThb: Math.round(result.taxableIncome),
      brackets: bracketsFor(result.taxableIncome),
      flags: flags.map((f) => f.title),
      assumptions: ANNUAL_ASSUMPTIONS,
    },
  };
}

/** Simple salary-style results (annual salaried path, monthly withholding, quick estimate). */
export function leadContextFromSalary(source: 'annual' | 'monthly' | 'quick', annualTaxThb: number, taxableIncomeThb: number): LeadContext {
  const tax = Math.round(annualTaxThb);
  return {
    source,
    estimatedTaxThb: tax,
    flags: [],
    prefill: { incomeTypes: ['thai_employment'] },
    snapshot: { source, estimatedTaxThb: tax, taxableIncomeThb: Math.round(taxableIncomeThb), flags: [] },
    breakdown: {
      calculator: source,
      taxYear: RULES_TAX_YEAR,
      estimatedTaxThb: tax,
      taxableIncomeThb: Math.round(taxableIncomeThb),
      brackets: bracketsFor(taxableIncomeThb),
      flags: [],
      assumptions: [
        source === 'quick'
          ? 'Quick estimate: only the standard deduction, personal allowance and (optionally) social security are included.'
          : 'Estimate based on the figures entered in the calculator.',
      ],
    },
  };
}
