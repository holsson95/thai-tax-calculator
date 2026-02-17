import {
  ThaiIncomeEntry,
  PND94Result,
  VATResult,
  FreelancerFormData,
} from '../types/freelancerForm';
import {
  TAX_THRESHOLDS,
  PND94_QUALIFYING_INCOME_TYPES,
  TAX_YEAR_CONFIG,
} from '../config/taxConfig';
import { TAX_BRACKETS } from '../types/taxForm';

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

/**
 * Calculate provisional tax estimate for PND94
 * Uses simplified bracket calculation based on projected annual income
 */
export function calculateProvisionalTax(
  halfYearIncome: number,
  personalAllowance: number = 60000,
  spouseAllowance: number = 0
): number {
  // Project full-year income (double the half-year)
  const projectedAnnualIncome = halfYearIncome * 2;

  // Apply basic deductions (simplified for provisional calculation)
  // 50% expense deduction capped at 100,000 for employment-like income
  const expenseDeduction = Math.min(projectedAnnualIncome * 0.5, 100000);
  const totalAllowances = personalAllowance + spouseAllowance;
  const taxableIncome = Math.max(0, projectedAnnualIncome - expenseDeduction - totalAllowances);

  // Calculate tax using progressive brackets
  let tax = 0;
  let remainingIncome = taxableIncome;

  for (let i = 0; i < TAX_BRACKETS.length; i++) {
    const bracket = TAX_BRACKETS[i];
    const prevLimit = i === 0 ? 0 : TAX_BRACKETS[i - 1].upTo;
    const bracketSize = bracket.upTo - prevLimit;
    const incomeInBracket = Math.min(remainingIncome, bracketSize);

    tax += incomeInBracket * bracket.rate;
    remainingIncome -= incomeInBracket;

    if (remainingIncome <= 0) break;
  }

  // PND94 pays half of projected annual tax
  return Math.round(tax / 2);
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

  // Calculate spouse allowance if applicable
  const spouseAllowance =
    formData.maritalStatus === 'married' && formData.spouseHasNoIncome ? 60000 : 0;

  const provisionalTax = required
    ? calculateProvisionalTax(halfYearIncome, 60000, spouseAllowance)
    : 0;

  // PND94 due date is September 30 of the tax year
  const dueDate = TAX_YEAR_CONFIG.PND94_DUE_DATE;

  return {
    required,
    halfYearIncome,
    threshold,
    provisionalTax,
    dueDate,
  };
}

/**
 * Calculate total annual turnover for VAT registration check
 * Includes all Thai income entries regardless of type
 */
export function calculateAnnualTurnover(entries: ThaiIncomeEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.grossAmount, 0);
}

/**
 * Check if VAT registration is required
 * VAT registration is mandatory when annual turnover >= 1,800,000 THB
 */
export function checkVATRegistration(
  formData: FreelancerFormData
): VATResult {
  const turnover = calculateAnnualTurnover(formData.thaiIncomeEntries);
  const threshold = TAX_THRESHOLDS.VAT_REGISTRATION;
  const required = turnover >= threshold;

  return {
    required,
    turnover,
    threshold,
    mustRegisterWithinDays: required ? 30 : 0,
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
