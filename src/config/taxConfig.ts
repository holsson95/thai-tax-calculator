import { IncomeType, ExpenseCategory } from '../types/freelancerForm';
import { BusinessCategory } from '../types/soleProprietorForm';

/**
 * Flat-rate deduction percentages per income type (Revenue Code sections)
 * These rates are applied to gross income when using flat-rate deduction method
 * Source: Thai Revenue Department — Guide to Personal Income Tax Return 2021 (PND90)
 * https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf
 * See TAX_RULES.md / tax-data/2026/deductions.json for full sourcing detail.
 */
export const FLAT_RATE_DEDUCTIONS: Record<IncomeType, number> = {
  salary_40_1: 0.50, // 50% capped at 100,000 THB (handled separately)
  liberal_profession_40_6: 0.30, // 30% default, medical practice gets 60% (see LIBERAL_PROFESSION_RATES)
  contractor_40_7: 0.60, // 60% — corrected 2026-09-07 from an incorrect 40%; RD guide directly confirms 60% for hire-of-work income where the contractor supplies essential materials
  business_sales_40_8: 0.60, // 60%
  rental_40_5: 0.30, // 30% (applies to houses/buildings/vehicles; RD's table has lower rates for land — not modeled here)
  dividend: 0, // No expense deduction for dividends
  other: 0, // No default deduction for unclassified income
};

/**
 * Liberal profession sub-categories with their specific deduction rates
 * Section 40(6) allows either 30% or 60% depending on profession type.
 *
 * RD's official Section 40(6) list is exactly six professions: legal, medical
 * (arts of healing), engineering, architecture, accounting, fine arts. Only
 * medical gets 60% — the rest get 30%.
 *
 * "entertainment", "sports", and "author_royalties" were REMOVED from this
 * table on 2026-09-07 (were previously listed at 60%): they are not Section
 * 40(6) income at all. Entertainers/athletes are Section 40(8) income with a
 * tiered 60%/40%-above-300,000-THB rate capped at 600,000 THB total; author/
 * royalty income is Section 40(3) "royalties" at 50%, capped at 100,000 THB
 * (200,000 THB if filing jointly with an earning spouse). Neither of these is
 * a flat percentage the way this table assumes, so they cannot simply be
 * re-added here with a corrected number — they'd need dedicated tiered/capped
 * calculation logic if ever wired into the app. See
 * tax-data/2026/deductions.json#liberal-profession-subrates for full detail.
 *
 * NOTE: this table is not currently read by any calculation or UI component —
 * ThaiIncomeEntry has no sub-type field, and calculateFlatRateDeduction always
 * applies the single default rate in FLAT_RATE_DEDUCTIONS.liberal_profession_40_6.
 * Kept here as documentation-of-record; correct the data even though unused.
 */
export const LIBERAL_PROFESSION_RATES: Record<string, number> = {
  // 60% deduction professions
  medical_practice: 0.60,

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
// Currencies listed first in the dropdown — the most common choices for Thailand expats
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

// Additional currencies published in the BOT daily exchange rate.
// All of these work with "Fetch BOT rate"; sorted alphabetically.
export const EXTENDED_CURRENCIES = [
  { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' },
  { code: 'BDT', name: 'Bangladeshi Taka', symbol: '৳' },
  { code: 'BHD', name: 'Bahraini Dinar', symbol: '.د.ب' },
  { code: 'BND', name: 'Brunei Dollar', symbol: 'B$' },
  { code: 'BRL', name: 'Brazilian Real', symbol: 'R$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' },
  { code: 'CZK', name: 'Czech Koruna', symbol: 'Kč' },
  { code: 'DKK', name: 'Danish Krone', symbol: 'kr' },
  { code: 'HUF', name: 'Hungarian Forint', symbol: 'Ft' },
  { code: 'IDR', name: 'Indonesian Rupiah', symbol: 'Rp' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'KHR', name: 'Cambodian Riel', symbol: '៛' },
  { code: 'KWD', name: 'Kuwaiti Dinar', symbol: 'د.ك' },
  { code: 'LAK', name: 'Lao Kip', symbol: '₭' },
  { code: 'LKR', name: 'Sri Lankan Rupee', symbol: '₨' },
  { code: 'MXN', name: 'Mexican Peso', symbol: '$' },
  { code: 'MYR', name: 'Malaysian Ringgit', symbol: 'RM' },
  { code: 'MMK', name: 'Myanmar Kyat', symbol: 'K' },
  { code: 'NOK', name: 'Norwegian Krone', symbol: 'kr' },
  { code: 'NPR', name: 'Nepalese Rupee', symbol: '₨' },
  { code: 'NZD', name: 'New Zealand Dollar', symbol: 'NZ$' },
  { code: 'OMR', name: 'Omani Rial', symbol: 'ر.ع.' },
  { code: 'PHP', name: 'Philippine Peso', symbol: '₱' },
  { code: 'PKR', name: 'Pakistani Rupee', symbol: '₨' },
  { code: 'PLN', name: 'Polish Zloty', symbol: 'zł' },
  { code: 'QAR', name: 'Qatari Riyal', symbol: 'ر.ق' },
  { code: 'SAR', name: 'Saudi Riyal', symbol: 'ر.س' },
  { code: 'SEK', name: 'Swedish Krona', symbol: 'kr' },
  { code: 'TWD', name: 'Taiwan Dollar', symbol: 'NT$' },
  { code: 'VND', name: 'Vietnamese Dong', symbol: '₫' },
  { code: 'ZAR', name: 'South African Rand', symbol: 'R' },
];

/**
 * Tax year configuration
 */
export const TAX_YEAR_CONFIG = {
  CURRENT_TAX_YEAR: 2026,
  TAX_YEAR_START: '2026-01-01',
  TAX_YEAR_END: '2026-12-31',
  PND94_DUE_DATE: '2026-09-30', // September 30 of tax year
  PND90_91_DUE_DATE: '2027-03-31', // March 31 of following year
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

/**
 * Business category labels for UI display
 */
export const BUSINESS_CATEGORY_LABELS: Record<BusinessCategory, string> = {
  retail_trade: 'Retail / Wholesale Trade',
  manufacturing: 'Manufacturing',
  service_business: 'Service Business',
  restaurant_food: 'Restaurant / Food Service',
  transportation: 'Transportation',
  construction: 'Construction',
  professional_service: 'Professional Services',
  rental_property: 'Property Rental',
  agriculture: 'Agriculture',
  other_business: 'Other Business',
};

/**
 * Business category descriptions for UI display
 */
export const BUSINESS_CATEGORY_DESCRIPTIONS: Record<BusinessCategory, string> = {
  retail_trade: 'Selling goods - 60% flat-rate deduction',
  manufacturing: 'Producing goods for sale - 60% flat-rate deduction',
  service_business: 'General services - 60% flat-rate deduction',
  restaurant_food: 'Food and beverage business - 60% flat-rate deduction',
  transportation: 'Delivery and logistics - 60% flat-rate deduction',
  construction: 'Building and contracting - 60% flat-rate deduction',
  professional_service: 'Legal, accounting, consulting - 30% flat-rate deduction',
  rental_property: 'Renting property - 30% flat-rate deduction',
  agriculture: 'Farming and agricultural - 60% flat-rate deduction',
  other_business: 'Other business activities - varies',
};

/**
 * Flat-rate deduction percentages by business category (Section 40(8) sole
 * proprietor income). Corrected 2026-09-07: service_business, transportation,
 * construction, and other_business were previously set to an incorrect 40% —
 * current RD guidance sets nearly all Section 40(8)/40(7) business categories
 * to a flat 60%. Source: Sherrings and Acclime Thailand tax guides,
 * corroborating the RD guide used for FLAT_RATE_DEDUCTIONS above. See
 * tax-data/2026/deductions.json#business-category-flat-rates for detail.
 *
 * NOTE: this table is not currently read by any calculation — there is no
 * sole-proprietor tax calculation function yet (BusinessProfileStep.tsx only
 * uses the category for display, via BUSINESS_CATEGORY_DESCRIPTIONS above).
 * Kept here as documentation-of-record; correct the data even though unused.
 */
export const BUSINESS_FLAT_RATE_DEDUCTIONS: Record<BusinessCategory, number> = {
  retail_trade: 0.60,
  manufacturing: 0.60,
  service_business: 0.60,
  restaurant_food: 0.60,
  transportation: 0.60,
  construction: 0.60,
  professional_service: 0.30,
  rental_property: 0.30,
  agriculture: 0.60,
  other_business: 0.60,
};
