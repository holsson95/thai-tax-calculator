import { IncomeType, ExpenseCategory } from '../types/freelancerForm';

/**
 * Flat-rate deduction percentages per income type (Revenue Code sections)
 * These rates are applied to gross income when using flat-rate deduction method
 */
export const FLAT_RATE_DEDUCTIONS: Record<IncomeType, number> = {
  salary_40_1: 0.50, // 50% capped at 100,000 THB (handled separately)
  liberal_profession_40_6: 0.30, // 30% default, some professions get 60%
  contractor_40_7: 0.40, // 40%
  business_sales_40_8: 0.60, // 60%
  rental_40_5: 0.30, // 30%
  dividend: 0, // No expense deduction for dividends
  other: 0, // No default deduction for unclassified income
};

/**
 * Liberal profession sub-categories with their specific deduction rates
 * Section 40(6) allows either 30% or 60% depending on profession type
 */
export const LIBERAL_PROFESSION_RATES: Record<string, number> = {
  // 60% deduction professions
  medical_practice: 0.60,
  entertainment: 0.60,
  sports: 0.60,
  author_royalties: 0.60,

  // 30% deduction professions
  legal: 0.30,
  engineering: 0.30,
  architecture: 0.30,
  accounting: 0.30,
  fine_arts: 0.30,
  consulting: 0.30,
  other_liberal: 0.30,
};

/**
 * Key thresholds for tax obligations
 */
export const TAX_THRESHOLDS = {
  // VAT registration threshold (annual turnover)
  VAT_REGISTRATION: 1800000,

  // PND94 mid-year filing thresholds (Jan-Jun income)
  PND94_SINGLE: 60000,
  PND94_MARRIED_SPOUSE_NO_INCOME: 120000,

  // Thai tax residency (days in Thailand per calendar year)
  THAI_RESIDENCY_DAYS: 180,

  // Foreign income tax year start (2024+ remittance rule)
  FOREIGN_INCOME_TAX_YEAR_START: '2024-01-01',
};

/**
 * Income types that qualify for PND94 mid-year filing requirement
 * Only sections 40(5) through 40(8) are subject to PND94
 */
export const PND94_QUALIFYING_INCOME_TYPES: IncomeType[] = [
  'rental_40_5',
  'liberal_profession_40_6',
  'contractor_40_7',
  'business_sales_40_8',
];

/**
 * VAT rates and settings
 */
export const VAT_CONFIG = {
  STANDARD_RATE: 0.07, // 7% VAT
  REGISTRATION_DEADLINE_DAYS: 30, // Days to register after exceeding threshold
};

/**
 * Expense category labels for UI display
 */
export const EXPENSE_CATEGORY_LABELS: Record<ExpenseCategory, string> = {
  office_supplies: 'Office Supplies',
  equipment: 'Equipment & Tools',
  software: 'Software & Subscriptions',
  travel: 'Travel & Transportation',
  communication: 'Phone & Internet',
  professional_services: 'Professional Services',
  rent: 'Office Rent',
  utilities: 'Utilities',
  marketing: 'Marketing & Advertising',
  insurance: 'Business Insurance',
  other: 'Other Expenses',
};

/**
 * Common currencies for foreign income
 */
export const COMMON_CURRENCIES = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'SGD', name: 'Singapore Dollar', symbol: 'S$' },
  { code: 'HKD', name: 'Hong Kong Dollar', symbol: 'HK$' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CNY', name: 'Chinese Yuan', symbol: '¥' },
  { code: 'KRW', name: 'Korean Won', symbol: '₩' },
  { code: 'THB', name: 'Thai Baht', symbol: '฿' },
];

/**
 * Tax year configuration
 */
export const TAX_YEAR_CONFIG = {
  CURRENT_TAX_YEAR: 2024,
  TAX_YEAR_START: '2024-01-01',
  TAX_YEAR_END: '2024-12-31',
  PND94_DUE_DATE: '2024-09-30', // September 30 of tax year
  PND90_91_DUE_DATE: '2025-03-31', // March 31 of following year
};

/**
 * Maximum deduction caps that apply across all income types
 */
export const DEDUCTION_CAPS = {
  // Salary income (40(1)) has special cap
  SALARY_EXPENSE_CAP: 100000,

  // Combined retirement fund cap (pension + provident + RMF + SSF)
  COMBINED_RETIREMENT_CAP: 500000,

  // Individual caps (from existing TAX_CONSTANTS)
  MAX_LIFE_INSURANCE: 100000,
  MAX_HEALTH_INSURANCE: 25000,
  MAX_PENSION_FUND: 500000,
  MAX_PROVIDENT_FUND: 500000,
  MAX_RMF: 500000,
  MAX_SSF: 200000,
  MAX_SOCIAL_SECURITY: 9000,
};

/**
 * Helper function to get flat rate for an income type
 */
export function getFlatRateForIncomeType(
  incomeType: IncomeType,
  liberalProfessionSubType?: string
): number {
  if (incomeType === 'liberal_profession_40_6' && liberalProfessionSubType) {
    return LIBERAL_PROFESSION_RATES[liberalProfessionSubType] ?? 0.30;
  }
  return FLAT_RATE_DEDUCTIONS[incomeType];
}

/**
 * Check if an income type qualifies for PND94 mid-year filing
 */
export function isIncomeTypePND94Qualifying(incomeType: IncomeType): boolean {
  return PND94_QUALIFYING_INCOME_TYPES.includes(incomeType);
}

/**
 * Get PND94 threshold based on marital status
 */
export function getPND94Threshold(
  maritalStatus: 'single' | 'married' | '',
  spouseHasIncome: boolean
): number {
  if (maritalStatus === 'married' && !spouseHasIncome) {
    return TAX_THRESHOLDS.PND94_MARRIED_SPOUSE_NO_INCOME;
  }
  return TAX_THRESHOLDS.PND94_SINGLE;
}
