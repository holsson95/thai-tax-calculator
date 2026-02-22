import {
  ForeignIncomeEntry,
  ForeignIncomeTaxability,
  FreelancerFormData,
  VisaType,
} from '../types/freelancerForm';
import { TAX_THRESHOLDS } from '../config/taxConfig';
import { hasDTAWithThailand } from '../data/dtaCountries';

/**
 * LTR visa types that grant foreign income tax exemption
 */
const LTR_FOREIGN_INCOME_EXEMPT_VISAS: VisaType[] = [
  'ltr_wealthy_global',
  'ltr_wealthy_pensioner',
  'ltr_work_from_thailand',
];

/**
 * Check if a visa type grants foreign income tax exemption
 */
export function hasLTRForeignIncomeExemption(visaType: VisaType): boolean {
  return LTR_FOREIGN_INCOME_EXEMPT_VISAS.includes(visaType);
}

/**
 * Check if a visa type qualifies for 17% flat rate on Thai employment income
 */
export function hasLTRFlatRateBenefit(visaType: VisaType): boolean {
  return visaType === 'ltr_highly_skilled';
}

/**
 * Check if a single foreign income entry is taxable under 2024+ rules
 *
 * Taxability requires ALL three conditions:
 * 1. Thai tax resident (180+ days in Thailand)
 * 2. Income earned on or after January 1, 2024
 * 3. Income remitted to Thailand
 *
 * Exception: LTR visa holders (Wealthy Global Citizen, Wealthy Pensioner,
 * Work-from-Thailand Professional) are exempt from foreign income tax.
 */
export function isForeignIncomeTaxable(
  entry: ForeignIncomeEntry,
  isThaiResident: boolean,
  visaType: VisaType = 'regular'
): ForeignIncomeTaxability {
  const dtaResult = calculateForeignTaxCredit(entry);

  // Not a Thai resident - foreign income not taxable
  if (!isThaiResident) {
    return {
      entry,
      isTaxable: false,
      reason: 'Not a Thai tax resident (less than 180 days in Thailand)',
      taxableAmount: 0,
      foreignTaxCredit: 0,
      hasDTA: dtaResult.hasDTA,
      dtaCreditAllowed: dtaResult.creditAllowed,
      dtaCreditDisallowed: 0,
    };
  }

  // LTR visa exemption - check before other conditions
  if (hasLTRForeignIncomeExemption(visaType)) {
    return {
      entry,
      isTaxable: false,
      reason: 'LTR visa holder - foreign income is tax exempt',
      taxableAmount: 0,
      foreignTaxCredit: 0,
      hasDTA: dtaResult.hasDTA,
      dtaCreditAllowed: dtaResult.creditAllowed,
      dtaCreditDisallowed: 0,
    };
  }

  // No date earned specified
  if (!entry.dateEarned) {
    return {
      entry,
      isTaxable: false,
      reason: 'Date earned not specified',
      taxableAmount: 0,
      foreignTaxCredit: 0,
      hasDTA: dtaResult.hasDTA,
      dtaCreditAllowed: dtaResult.creditAllowed,
      dtaCreditDisallowed: 0,
    };
  }

  const earnedDate = new Date(entry.dateEarned);
  const taxYearStart = new Date(TAX_THRESHOLDS.FOREIGN_INCOME_TAX_YEAR_START);

  // Income earned before 2024 - not taxable under new rules
  if (earnedDate < taxYearStart) {
    return {
      entry,
      isTaxable: false,
      reason: 'Income earned before January 1, 2024 - exempt under pre-2024 rules',
      taxableAmount: 0,
      foreignTaxCredit: 0,
      hasDTA: dtaResult.hasDTA,
      dtaCreditAllowed: dtaResult.creditAllowed,
      dtaCreditDisallowed: 0,
    };
  }

  // Not remitted to Thailand
  if (!entry.dateRemitted) {
    return {
      entry,
      isTaxable: false,
      reason: 'Income not remitted to Thailand - not taxable until remitted',
      taxableAmount: 0,
      foreignTaxCredit: 0,
      hasDTA: dtaResult.hasDTA,
      dtaCreditAllowed: dtaResult.creditAllowed,
      dtaCreditDisallowed: 0,
    };
  }

  // All conditions met - income is taxable
  return {
    entry,
    isTaxable: true,
    reason: 'Income earned in 2024+ and remitted to Thailand - fully taxable',
    taxableAmount: entry.amountThb,
    foreignTaxCredit: dtaResult.credit,
    hasDTA: dtaResult.hasDTA,
    dtaCreditAllowed: dtaResult.creditAllowed,
    dtaCreditDisallowed: dtaResult.creditDisallowed,
  };
}

/**
 * Calculate the foreign tax credit for an income entry
 *
 * The foreign tax credit is the lesser of:
 * 1. Actual foreign tax paid
 * 2. Thai tax that would be payable on that income
 *
 * A DTA (tax treaty) with the source country is required to claim the credit.
 * Countries without a DTA may result in double taxation.
 */
export function calculateForeignTaxCredit(entry: ForeignIncomeEntry): {
  credit: number;
  hasDTA: boolean | null;
  creditAllowed: boolean;
  creditDisallowed: number;
} {
  if (entry.foreignTaxPaid <= 0) {
    return { credit: 0, hasDTA: hasDTAWithThailand(entry.country), creditAllowed: true, creditDisallowed: 0 };
  }

  const dtaStatus = hasDTAWithThailand(entry.country);

  // If no DTA exists, foreign tax credit is not available
  if (dtaStatus === false) {
    return {
      credit: 0,
      hasDTA: false,
      creditAllowed: false,
      creditDisallowed: entry.foreignTaxPaid,
    };
  }

  // DTA exists or unknown - allow the credit (actual cap applied in main calculation)
  return {
    credit: entry.foreignTaxPaid,
    hasDTA: dtaStatus,
    creditAllowed: true,
    creditDisallowed: 0,
  };
}

/**
 * Analyze all foreign income entries and calculate taxability
 */
export function analyzeForeignIncome(
  formData: FreelancerFormData
): {
  entries: ForeignIncomeTaxability[];
  totalForeignIncome: number;
  taxableForeignIncome: number;
  totalForeignTaxPaid: number;
  totalForeignTaxCredit: number;
  totalDTACreditDisallowed: number;
  ltrExemptionApplied: boolean;
  hasMissingDTA: boolean; // true if any taxable entry has no treaty
} {
  const ltrExemptionApplied = hasLTRForeignIncomeExemption(formData.visaType);

  const entries = formData.foreignIncomeEntries.map(entry =>
    isForeignIncomeTaxable(entry, formData.isThaiResident, formData.visaType)
  );

  const totalForeignIncome = entries.reduce(
    (sum, e) => sum + e.entry.amountThb,
    0
  );

  const taxableForeignIncome = entries.reduce(
    (sum, e) => sum + e.taxableAmount,
    0
  );

  const totalForeignTaxPaid = entries.reduce(
    (sum, e) => sum + e.entry.foreignTaxPaid,
    0
  );

  const totalForeignTaxCredit = entries.reduce(
    (sum, e) => sum + e.foreignTaxCredit,
    0
  );

  const totalDTACreditDisallowed = entries.reduce(
    (sum, e) => sum + e.dtaCreditDisallowed,
    0
  );

  const hasMissingDTA = entries.some(
    e => e.isTaxable && e.hasDTA === false
  );

  return {
    entries,
    totalForeignIncome,
    taxableForeignIncome,
    totalForeignTaxPaid,
    totalForeignTaxCredit,
    totalDTACreditDisallowed,
    ltrExemptionApplied,
    hasMissingDTA,
  };
}

/**
 * Determine tax residency status based on days in Thailand
 */
export function isThaiTaxResident(daysInThailand: number): boolean {
  return daysInThailand >= TAX_THRESHOLDS.THAI_RESIDENCY_DAYS;
}

/**
 * Get residency status description
 */
export function getResidencyStatusDescription(daysInThailand: number): {
  isResident: boolean;
  status: string;
  description: string;
} {
  const isResident = isThaiTaxResident(daysInThailand);

  if (isResident) {
    return {
      isResident: true,
      status: 'Thai Tax Resident',
      description: `With ${daysInThailand} days in Thailand (180+ required), you are considered a Thai tax resident. Both Thai-sourced income and foreign income remitted to Thailand may be taxable.`,
    };
  }

  return {
    isResident: false,
    status: 'Non-Resident',
    description: `With ${daysInThailand} days in Thailand (less than 180), you are not a Thai tax resident. Only income earned in Thailand is subject to Thai tax.`,
  };
}

/**
 * Format foreign income entry for display
 */
export function formatForeignIncomeEntry(entry: ForeignIncomeEntry): string {
  const currencyAmount = `${entry.currency} ${entry.amount.toLocaleString()}`;
  const thbAmount = `THB ${entry.amountThb.toLocaleString()}`;
  const source = entry.country || 'Unknown country';

  return `${source}: ${currencyAmount} (${thbAmount})`;
}

/**
 * Validate a foreign income entry
 */
export function validateForeignIncomeEntry(entry: ForeignIncomeEntry): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (entry.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }

  if (entry.amountThb <= 0) {
    errors.push('THB amount must be greater than 0');
  }

  if (!entry.dateEarned) {
    errors.push('Date earned is required');
  } else {
    const earnedDate = new Date(entry.dateEarned);
    const today = new Date();
    if (earnedDate > today) {
      errors.push('Date earned cannot be in the future');
    }
  }

  if (entry.dateRemitted) {
    const remittedDate = new Date(entry.dateRemitted);
    const today = new Date();
    if (remittedDate > today) {
      errors.push('Date remitted cannot be in the future');
    }

    if (entry.dateEarned && remittedDate < new Date(entry.dateEarned)) {
      errors.push('Date remitted cannot be before date earned');
    }
  }

  if (!entry.country.trim()) {
    errors.push('Country is required');
  }

  if (entry.foreignTaxPaid < 0) {
    errors.push('Foreign tax paid cannot be negative');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate summary statistics for foreign income
 */
export function calculateForeignIncomeSummary(
  entries: ForeignIncomeEntry[],
  isThaiResident: boolean,
  visaType: VisaType = 'regular'
): {
  totalEntries: number;
  taxableEntries: number;
  nonTaxableEntries: number;
  totalIncome: number;
  taxableIncome: number;
  nonTaxableIncome: number;
  totalForeignTax: number;
  effectiveForeignTaxRate: number;
  ltrExemptionApplied: boolean;
} {
  const ltrExemptionApplied = hasLTRForeignIncomeExemption(visaType);
  const analysis = entries.map(entry =>
    isForeignIncomeTaxable(entry, isThaiResident, visaType)
  );

  const taxableEntries = analysis.filter(a => a.isTaxable);
  const nonTaxableEntries = analysis.filter(a => !a.isTaxable);

  const totalIncome = entries.reduce((sum, e) => sum + e.amountThb, 0);
  const taxableIncome = taxableEntries.reduce(
    (sum, a) => sum + a.taxableAmount,
    0
  );
  const nonTaxableIncome = totalIncome - taxableIncome;

  const totalForeignTax = entries.reduce(
    (sum, e) => sum + e.foreignTaxPaid,
    0
  );

  const effectiveForeignTaxRate =
    totalIncome > 0 ? (totalForeignTax / totalIncome) * 100 : 0;

  return {
    totalEntries: entries.length,
    taxableEntries: taxableEntries.length,
    nonTaxableEntries: nonTaxableEntries.length,
    totalIncome,
    taxableIncome,
    nonTaxableIncome,
    totalForeignTax,
    effectiveForeignTaxRate,
    ltrExemptionApplied,
  };
}
