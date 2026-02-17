import { FreelancerFormData, IncomeType } from './freelancerForm';

/**
 * Business categories for sole proprietor tax calculation
 * These determine applicable flat-rate deduction percentages
 */
export type BusinessCategory =
  | 'retail_trade'          // ขายสินค้า - Retail/wholesale trade
  | 'manufacturing'         // ผลิตสินค้า - Manufacturing
  | 'service_business'      // ธุรกิจบริการ - Service business
  | 'restaurant_food'       // ร้านอาหาร - Restaurant/food service
  | 'transportation'        // ขนส่ง - Transportation services
  | 'construction'          // รับเหมาก่อสร้าง - Construction contracting
  | 'professional_service'  // บริการวิชาชีพ - Professional services
  | 'rental_property'       // ให้เช่าทรัพย์สิน - Property rental
  | 'agriculture'           // เกษตรกรรม - Agriculture
  | 'other_business';       // อื่นๆ - Other business

/**
 * Business registration type
 */
export type BusinessRegistrationType =
  | 'unregistered'          // Not formally registered
  | 'sole_proprietorship'   // Registered sole proprietorship
  | 'partnership'           // Ordinary partnership (ห้างหุ้นส่วนสามัญ)
  | 'other';

/**
 * Business profile information
 */
export interface BusinessProfile {
  businessName: string;
  businessCategory: BusinessCategory;
  businessSubCategory?: string; // Optional sub-category for specific profession
  registrationType: BusinessRegistrationType;
  registrationNumber?: string; // Tax ID or DBD registration number
  yearsInOperation: number;
  hasPhysicalLocation: boolean;
  numberOfEmployees: number;
}

/**
 * Maps business category to primary income type for tax calculation
 */
export const BUSINESS_CATEGORY_TO_INCOME_TYPE: Record<BusinessCategory, IncomeType> = {
  retail_trade: 'business_sales_40_8',
  manufacturing: 'business_sales_40_8',
  service_business: 'contractor_40_7',
  restaurant_food: 'business_sales_40_8',
  transportation: 'contractor_40_7',
  construction: 'contractor_40_7',
  professional_service: 'liberal_profession_40_6',
  rental_property: 'rental_40_5',
  agriculture: 'business_sales_40_8',
  other_business: 'business_sales_40_8',
};

/**
 * Extended form data for sole proprietor tax calculation
 * Extends FreelancerFormData with business-specific fields
 */
export interface SoleProprietorFormData extends FreelancerFormData {
  // Business profile
  businessProfile: BusinessProfile;

  // Business-specific flags
  hasBusinessExpenses: boolean;
  hasInventory: boolean;

  // Simplified bookkeeping flag
  // Sole proprietors with turnover < 1.8M can use simplified records
  usesSimplifiedBookkeeping: boolean;
}

/**
 * Props interface for sole proprietor step components
 */
export interface SoleProprietorStepProps {
  formData: SoleProprietorFormData;
  setFormData: (data: SoleProprietorFormData) => void;
  nextStep: (updatedFormData?: SoleProprietorFormData) => void;
  prevStep?: () => void;
  showValidationErrors?: boolean;
}

/**
 * Creates default BusinessProfile
 */
export function createDefaultBusinessProfile(): BusinessProfile {
  return {
    businessName: '',
    businessCategory: 'service_business',
    registrationType: 'unregistered',
    yearsInOperation: 0,
    hasPhysicalLocation: false,
    numberOfEmployees: 0,
  };
}

/**
 * Creates default SoleProprietorFormData
 */
export function createDefaultSoleProprietorFormData(): SoleProprietorFormData {
  return {
    // Employment (from base)
    employmentType: 'sole_proprietor',

    // Residency
    daysInThailand: 0,
    isThaiResident: false,
    visaType: 'regular',

    // Foreign income
    hasForeignIncome: false,
    foreignIncomeEntries: [],

    // Thai income
    thaiIncomeEntries: [],

    // Social security
    includeSocialSecurity: false,
    socialSecurityContribution: 0,

    // Marital status
    maritalStatus: '',
    spouseHasNoIncome: false,
    isAge65OrOlder: false,

    // Dependents
    children: [],
    childrenEligibilityConfirmed: false,
    numberOfParents: 0,
    parentsEligibilityConfirmed: false,

    // Deductions
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

    // Withholding
    taxWithheld: 0,

    // Expenses
    expenseMethod: 'auto_compare',
    actualExpenses: [],

    // Business-specific
    businessProfile: createDefaultBusinessProfile(),
    hasBusinessExpenses: false,
    hasInventory: false,
    usesSimplifiedBookkeeping: true,
  };
}

/**
 * Type guard to check if form data is sole proprietor type
 */
export function isSoleProprietorFormData(data: unknown): data is SoleProprietorFormData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'businessProfile' in data &&
    'employmentType' in data &&
    (data as SoleProprietorFormData).employmentType === 'sole_proprietor'
  );
}
