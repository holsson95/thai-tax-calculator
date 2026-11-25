import {
  ThaiIncomeEntry,
  PND94Estimate,
  PND94Result,
  VATResult,
  FreelancerFormData,
} from '../types/freelancerForm';
import {
  TAX_THRESHOLDS,
  PND94_QUALIFYING_INCOME_TYPES,
  TAX_YEAR_CONFIG,
  VAT_CONFIG,
  getEntryFlatRate,
  isVatExemptRental,
} from '../config/taxConfig';
import { TAX_CONSTANTS } from '../types/taxForm';
import { TAX_RULES } from '../config/taxRules';
import { calculateThaiTax } from './tax';
import { calculateChildAllowance } from './taxCalculations';

/**
 * Calculate half-year (Jan-Jun) income from Thai income entries
 * Only includes income types that qualify for PND94
 */
export function calculateHalfYearIncome(entries: ThaiIncomeEntry[]): number {
  return entries
    .filter(entry => {
      // Only income types 40(5) through 40(8) qualify for PND94
      const isQualifyingType = PND94_QUALIFYING_INCOME_TYPES.includes(entry.incomeType);
      // Only include income received in Jan-Jun (months 1-6)
      const isFirstHalf = entry.monthReceived >= 1 && entry.monthReceived <= 6;
      return isQualifyingType && isFirstHalf;
    })
    .reduce((sum, entry) => sum + entry.grossAmount, 0);
}

/** Jan–Jun entries of the income types that PND94 covers (40(5)-(8)). */
function halfYearQualifyingEntries(entries: ThaiIncomeEntry[]): ThaiIncomeEntry[] {
  return entries.filter(entry =>
    PND94_QUALIFYING_INCOME_TYPES.includes(entry.incomeType) &&
    entry.monthReceived >= 1 && entry.monthReceived <= 6 &&
    Number.isFinite(entry.grossAmount) && entry.grossAmount > 0
  );
}

/**
 * Estimate the PND94 half-year tax, following the Revenue Department's PND94
 * guide (tax-data/2026/residency.json: pnd94-half-year-allowances,
 * pnd94-gross-income-tax-rate, pnd94-gross-income-tax-threshold):
 *
 * 1. Jan–Jun 40(5)-(8) income. A 65+ taxpayer's 190,000 income exemption is
 *    applied first, to the income with the lowest flat-rate deduction (the
 *    taxpayer may choose the category; this choice gives the lowest tax).
 * 2. Less the flat-rate expense deduction for each income type.
 * 3. Less HALF the annual personal, spouse, child and parent allowances.
 * 4. Tax at the ordinary full-year progressive rates.
 * 5. If Jan–Jun assessable income is 120,000 or more, tax is the greater of
 *    that and 0.5% of the assessable income.
 *
 * Not included (the app does not collect Jan–Jun payment amounts): insurance,
 * fund, social security and donation deductions, and actual expenses. Leaving
 * them out gives a higher, more cautious estimate.
 *
 * Replaces (2026-11-25) a method that doubled the half-year income, applied the
 * salary-style 50%/100,000 deduction to all income and halved the annual tax.
 */
export function calculatePND94Estimate(formData: FreelancerFormData): PND94Estimate {
  const entries = halfYearQualifyingEntries(formData.thaiIncomeEntries);
  const halfYearIncome = entries.reduce((sum, entry) => sum + entry.grossAmount, 0);

  // 65+ exemption against the lowest-rate income first.
  let exemptionLeft = formData.isAge65OrOlder ? TAX_CONSTANTS.SENIOR_ALLOWANCE : 0;
  let expenseDeduction = 0;
  const byRate = [...entries].sort((a, b) => getEntryFlatRate(a) - getEntryFlatRate(b));
  for (const entry of byRate) {
    const exempt = Math.min(exemptionLeft, entry.grossAmount);
    exemptionLeft -= exempt;
    expenseDeduction += (entry.grossAmount - exempt) * getEntryFlatRate(entry);
  }
  const seniorExemption = formData.isAge65OrOlder ? Math.min(TAX_CONSTANTS.SENIOR_ALLOWANCE, halfYearIncome) : 0;
  const assessableIncome = halfYearIncome - seniorExemption;

  const annualAllowances =
    TAX_CONSTANTS.PERSONAL_ALLOWANCE +
    (formData.maritalStatus === 'married' && formData.spouseHasNoIncome ? TAX_CONSTANTS.SPOUSE_ALLOWANCE : 0) +
    calculateChildAllowance(formData.children || []) +
    Math.min(formData.numberOfParents || 0, TAX_CONSTANTS.MAX_PARENTS) * TAX_CONSTANTS.PARENT_ALLOWANCE;
  const allowances = annualAllowances * TAX_RULES.pnd94HalfYearAllowanceFraction.value;

  const netIncome = Math.max(0, assessableIncome - expenseDeduction - allowances);
  const netIncomeTax = calculateThaiTax(netIncome);
  const grossIncomeTax = assessableIncome >= TAX_RULES.pnd94GrossIncomeTaxThreshold.value
    ? assessableIncome * TAX_RULES.pnd94GrossIncomeTaxRate.value
    : 0;

  return {
    halfYearIncome,
    seniorExemption,
    assessableIncome,
    expenseDeduction,
    allowances,
    netIncome,
    netIncomeTax,
    grossIncomeTax,
    provisionalTax: Math.round(Math.max(netIncomeTax, grossIncomeTax)),
  };
}

/**
 * Check if PND94 mid-year filing is required
 * PND94 is required when qualifying income types (40(5)-40(8)) in Jan-Jun exceed threshold
 */
export function checkPND94Obligation(
  formData: FreelancerFormData
): PND94Result {
  const halfYearIncome = calculateHalfYearIncome(formData.thaiIncomeEntries);

  // Determine threshold based on marital status
  const threshold =
    formData.maritalStatus === 'married' && formData.spouseHasNoIncome
      ? TAX_THRESHOLDS.PND94_MARRIED_SPOUSE_NO_INCOME
      : TAX_THRESHOLDS.PND94_SINGLE;

  const required = halfYearIncome > threshold;

  const estimate = calculatePND94Estimate(formData);
  const provisionalTax = required ? estimate.provisionalTax : 0;

  // PND94 due date is September 30 of the tax year
  const dueDate = TAX_YEAR_CONFIG.PND94_DUE_DATE;

  return {
    required,
    halfYearIncome,
    threshold,
    provisionalTax,
    dueDate,
    estimate,
  };
}

/**
 * Income types that are not business turnover for VAT: employment pay
 * (Section 40(1)) and dividends are not sales of goods or services.
 * The VAT threshold applies to "taxable turnover"
 * (tax-data/2026/vat-and-business-obligations.json#vat-registration-threshold).
 * Before 2026-11-25 every Thai income entry counted, so a salaried freelancer
 * could be told to register for VAT on the strength of their salary.
 */
const NON_TURNOVER_INCOME_TYPES: ReadonlySet<ThaiIncomeEntry['incomeType']> = new Set(['salary_40_1', 'dividend']);

/**
 * Calculate total annual business turnover for the VAT registration check.
 * Excludes salary and dividends (see NON_TURNOVER_INCOME_TYPES) and VAT-exempt
 * rental of immovable property (tax-data: vat-exempt-rental-immovable-property).
 */
export function calculateAnnualTurnover(entries: ThaiIncomeEntry[]): number {
  return entries
    .filter(entry => !NON_TURNOVER_INCOME_TYPES.has(entry.incomeType))
    // Rental of buildings and land is VAT-exempt (Revenue Code s.81(1)(r));
    // vehicle and other movable-property rental still counts.
    .filter(entry => !isVatExemptRental(entry))
    .reduce((sum, entry) => sum + entry.grossAmount, 0);
}

/**
 * Check if VAT registration is required
 * VAT registration is mandatory when annual turnover exceeds 1,800,000 THB
 */
export function checkVATRegistration(
  formData: FreelancerFormData
): VATResult {
  const turnover = calculateAnnualTurnover(formData.thaiIncomeEntries);
  const threshold = TAX_THRESHOLDS.VAT_REGISTRATION;
  // Revenue Code s.81/1: a business whose tax base is "not exceeding" the
  // small-business amount is exempt, so registration starts above the threshold
  // (was >= until 2026-11-25).
  const required = turnover > threshold;

  return {
    required,
    turnover,
    threshold,
    mustRegisterWithinDays: required ? VAT_CONFIG.REGISTRATION_DEADLINE_DAYS : 0,
  };
}

/**
 * Get a human-readable summary of PND94 obligation status
 */
export function getPND94Summary(result: PND94Result): string {
  if (!result.required) {
    return `PND94 filing is not required. Your Jan-Jun income (฿${result.halfYearIncome.toLocaleString()}) does not exceed the threshold of ฿${result.threshold.toLocaleString()}.`;
  }

  return `PND94 mid-year filing is required. Your Jan-Jun qualifying income (฿${result.halfYearIncome.toLocaleString()}) exceeds ฿${result.threshold.toLocaleString()}. Estimated provisional tax: ฿${result.provisionalTax.toLocaleString()}. Due by ${result.dueDate}.`;
}

/**
 * Get a human-readable summary of VAT registration status
 */
export function getVATSummary(result: VATResult): string {
  if (!result.required) {
    return `VAT registration is not required. Your annual turnover (฿${result.turnover.toLocaleString()}) is below the ฿${result.threshold.toLocaleString()} threshold.`;
  }

  return `VAT registration is required. Your annual turnover (฿${result.turnover.toLocaleString()}) exceeds ฿${result.threshold.toLocaleString()}. You must register within ${result.mustRegisterWithinDays} days of exceeding the threshold.`;
}

/**
 * Check all obligations for a freelancer
 * Returns combined result for display
 */
export interface ObligationCheckResult {
  pnd94: PND94Result;
  vat: VATResult;
  hasAnyObligation: boolean;
  urgentItems: string[];
}

export function checkAllObligations(
  formData: FreelancerFormData
): ObligationCheckResult {
  const pnd94 = checkPND94Obligation(formData);
  const vat = checkVATRegistration(formData);

  const urgentItems: string[] = [];

  // Check if PND94 is due soon (within current tax year)
  if (pnd94.required) {
    urgentItems.push(`PND94 filing due by ${pnd94.dueDate}`);
  }

  // VAT registration is urgent if required
  if (vat.required) {
    urgentItems.push(`VAT registration required within ${vat.mustRegisterWithinDays} days`);
  }

  return {
    pnd94,
    vat,
    hasAnyObligation: pnd94.required || vat.required,
    urgentItems,
  };
}
