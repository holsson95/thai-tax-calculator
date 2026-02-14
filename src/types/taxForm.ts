export interface ChildData {
  birthYear: number;
  isStudent?: boolean; // Only asked if age 20-25
}

/**
 * Monthly income entry for variable income
 */
export interface MonthlyIncomeEntry {
  salary: number;
  bonus: number;
  housingAllowance: number;
  otherIncome: number;
}

/**
 * Form data for Monthly Tax Withholding Wizard
 */
export interface MonthlyFormData {
  // Step 1: Estimate Type Selection
  estimateType: 'basic' | 'detailed' | '';

  // Step 2 (Basic): Income Type Selection
  incomeType: 'fixed' | 'variable' | '';

  // Step 3 (Basic): Income Data
  monthlySalary: number; // Used for fixed monthly income
  annualBonus: number; // Annual bonus (for fixed income)
  annualOtherIncome: number; // Other annual income (for fixed income)
  variableIncome: MonthlyIncomeEntry[]; // 12 months for variable income

  // Social Security (optional for basic, shown on income step)
  includeSocialSecurity: boolean;
  socialSecurityContribution: number; // Max 10,500 for 2026

  // Detailed estimate additional fields
  maritalStatus: 'single' | 'married' | '';
  spouseHasNoIncome: boolean;
  isAge65OrOlder: boolean;

  // Children with detailed birth year tracking (same as annual)
  children: ChildData[];
  childrenEligibilityConfirmed: boolean;

  // Parent support allowance
  numberOfParents: number;
  parentsEligibilityConfirmed: boolean;

  // Detailed deductions (checkboxes)
  hasLifeInsurance: boolean;
  lifeInsurance: number;
  hasHealthInsurance: boolean;
  healthInsurance: number;
  hasPensionFund: boolean;
  pensionFund: number;
  hasProvidentFund: boolean;
  providentFund: number;
  hasRMF: boolean;
  rmf: number;
  hasSSF: boolean;
  ssf: number;

  // Charitable donations
  hasDonations: boolean;
  donations: number;
}

/**
 * Tax constants for Monthly Withholding 2026
 */
export const MONTHLY_TAX_CONSTANTS = {
  // Standard expense deduction for employment income (50% of income, max 100,000)
  STANDARD_DEDUCTION_RATE: 0.5,
  MAX_STANDARD_DEDUCTION: 100000,
  MAX_SOCIAL_SECURITY: 10500, // New SSO ceiling for 2026
  PERSONAL_ALLOWANCE: 60000,
  SPOUSE_ALLOWANCE: 60000,
  SENIOR_ALLOWANCE: 190000, // Additional allowance for taxpayers 65 years or older
  // Child allowance with birth year bonus
  CHILD_ALLOWANCE_BASE: 30000,        // Base allowance per child
  CHILD_ALLOWANCE_BONUS: 30000,       // Additional for 2nd+ child born 2018+
  CHILD_BONUS_BIRTH_YEAR: 2018,       // Children born 2018+ eligible for bonus
  // Parent support allowance
  PARENT_ALLOWANCE: 30000,
  MAX_PARENTS: 4,
  // Insurance & fund deductions
  MAX_LIFE_INSURANCE: 100000,
  MAX_HEALTH_INSURANCE: 25000,
  MAX_PENSION_FUND: 500000,
  MAX_PROVIDENT_FUND: 500000,
  MAX_RMF: 500000,
  MAX_SSF: 200000,
  // Donations
  MAX_DONATION_PERCENT: 0.10,         // 10% of taxable income
};

/**
 * Props interface for Monthly Wizard step components
 */
export interface MonthlyStepProps {
  formData: MonthlyFormData;
  setFormData: (data: MonthlyFormData) => void;
  nextStep: () => void;
  showValidationErrors?: boolean;
}

export interface TaxFormData {
  // Step 1: Employment Status
  employmentType: 'salaried' | 'self-employed' | 'business' | '';

  // Step 2: Annual Income
  annualIncome: number;
  includeSocialSecurity: boolean;
  socialSecurityContribution: number; // Max 9,000 for 2025

  // Step 3: Marital Status + Spouse Income + Senior Status
  maritalStatus: 'single' | 'married' | '';
  spouseHasNoIncome: boolean; // Only relevant if married - determines spouse allowance eligibility
  isAge65OrOlder: boolean; // Senior citizen allowance (190,000 THB)

  // Step 4: Dependents & Allowances
  children: ChildData[];
  childrenEligibilityConfirmed: boolean; // User confirms children meet eligibility criteria
  numberOfParents: number;
  parentsEligibilityConfirmed: boolean; // User confirms parents meet eligibility criteria

  // Step 5: Deductions (conditional with checkboxes)
  hasLifeInsurance: boolean;
  lifeInsurance: number;
  hasHealthInsurance: boolean;
  healthInsurance: number;
  hasPensionFund: boolean;
  pensionFund: number;
  hasProvidentFund: boolean;
  providentFund: number;
  hasRMF: boolean;
  rmf: number;
  hasSSF: boolean;
  ssf: number;
  hasDonations: boolean;
  donations: number;

  // Step 6: Withholding
  taxWithheld: number;
}

/**
 * Tax calculation result with breakdown
 */
export interface TaxCalculationResult {
  grossIncome: number;
  totalAllowances: number;
  totalDeductions: number;
  taxableIncome: number;
  taxOwed: number;
  taxWithheld: number;
  refundOrOwed: number;
  effectiveRate: number;
  breakdown: TaxBreakdown;
}

/**
 * Detailed breakdown of all allowances and deductions
 */
export interface TaxBreakdown {
  // Standard expense deduction (50% of income, max 100,000)
  standardDeduction: number;

  // Allowances (always visible)
  personalAllowance: number;
  spouseAllowance: number;
  seniorAllowance: number;
  childAllowance: number;
  parentAllowance: number;

  // Social security deduction
  socialSecurity: number;

  // Deductions (from checkboxes)
  lifeInsurance: number;
  healthInsurance: number;
  pensionFund: number;
  providentFund: number;
  rmf: number;
  ssf: number;
  donations: number;
}

/**
 * Props interface for step components
 */
export interface StepProps {
  formData: TaxFormData;
  setFormData: (data: TaxFormData) => void;
  nextStep: () => void;
  showValidationErrors?: boolean;
}

/**
 * Thai tax bracket definition
 */
export interface TaxBracket {
  upTo: number;
  rate: number;
  label: string;
}

/**
 * Tax constants for 2025 (verified)
 */
export const TAX_CONSTANTS = {
  // Standard expense deduction for employment income (50% of income, max 100,000)
  STANDARD_DEDUCTION_RATE: 0.5,
  MAX_STANDARD_DEDUCTION: 100000,
  MAX_SOCIAL_SECURITY: 9000, // SSO ceiling for 2025
  PERSONAL_ALLOWANCE: 60000,
  SPOUSE_ALLOWANCE: 60000,
  SENIOR_ALLOWANCE: 190000, // Additional allowance for taxpayers 65 years or older
  CHILD_ALLOWANCE_BASE: 30000,        // Base allowance per child
  CHILD_ALLOWANCE_BONUS: 30000,       // Additional for 2nd+ child born 2018+
  PARENT_ALLOWANCE: 30000,
  MAX_PARENTS: 4,
  MAX_LIFE_INSURANCE: 100000,
  MAX_HEALTH_INSURANCE: 25000,
  MAX_PENSION_FUND: 500000,
  MAX_PROVIDENT_FUND: 500000,
  MAX_RMF: 500000,
  MAX_SSF: 200000,
  MAX_DONATION_PERCENT: 0.10,         // 10% of taxable income
  CHILD_BONUS_BIRTH_YEAR: 2018,       // Children born 2018+ eligible for bonus
};

/**
 * Tax brackets for 2025 (verified)
 */
export const TAX_BRACKETS: TaxBracket[] = [
  { upTo: 150000, rate: 0, label: '0-150k' },
  { upTo: 300000, rate: 0.05, label: '150k-300k' },
  { upTo: 500000, rate: 0.10, label: '300k-500k' },
  { upTo: 750000, rate: 0.15, label: '500k-750k' },
  { upTo: 1000000, rate: 0.20, label: '750k-1M' },
  { upTo: 2000000, rate: 0.25, label: '1M-2M' },
  { upTo: 5000000, rate: 0.30, label: '2M-5M' },
  { upTo: Infinity, rate: 0.35, label: '5M+' },
];