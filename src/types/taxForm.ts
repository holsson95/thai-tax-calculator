import { TAX_RULES as R, BRACKET_RULES } from '../config/taxRules';

export interface ChildData {
  birthYear: number;
  isStudent?: boolean; // Only asked if age 20-25
  /** Adopted children count only up to 3 children in total and never get the 2018+ bonus (tax-data: child-allowance-adopted-limit). */
  isAdopted?: boolean;
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
 * Tax constants for the Monthly Withholding estimator.
 * Values come from src/config/taxRules.ts (single source of truth, with sources
 * and last-verified dates). Identical to TAX_CONSTANTS; kept as a separate
 * name because existing modules import it.
 */
export const MONTHLY_TAX_CONSTANTS = {
  STANDARD_DEDUCTION_RATE: R.standardDeductionRate.value,
  MAX_STANDARD_DEDUCTION: R.maxStandardDeduction.value,
  MAX_SOCIAL_SECURITY: R.maxSocialSecurity.value,
  PERSONAL_ALLOWANCE: R.personalAllowance.value,
  SPOUSE_ALLOWANCE: R.spouseAllowance.value,
  SENIOR_ALLOWANCE: R.seniorExemption.value, // 65+ exemption (named "allowance" in code)
  CHILD_ALLOWANCE_BASE: R.childAllowanceBase.value,
  CHILD_ALLOWANCE_BONUS: R.childAllowanceBonus.value,
  CHILD_BONUS_BIRTH_YEAR: R.childBonusBirthYear.value,
  PARENT_ALLOWANCE: R.parentAllowance.value,
  MAX_PARENTS: R.maxParents.value,
  MAX_LIFE_INSURANCE: R.maxLifeInsurance.value,
  MAX_HEALTH_INSURANCE: R.maxHealthInsurance.value,
  MAX_PENSION_FUND: R.maxPensionFund.value,
  MAX_PROVIDENT_FUND: R.maxProvidentFund.value,
  MAX_RMF: R.maxRmf.value,
  MAX_SSF: R.maxSsf.value,
  MAX_DONATION_PERCENT: R.maxDonationPercent.value,
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

/**
 * Employment types supported by the tax wizard
 * Includes legacy values (self-employed, business) for backward compatibility
 */
export type EmploymentType =
  | 'salaried'
  | 'freelancer'
  | 'sole_proprietor'
  | 'company_owner'
  | 'retired'        // Retired/Pensioner — routes to freelancer flow
  | 'self-employed'  // Legacy - maps to freelancer
  | 'business'       // Legacy - maps to sole_proprietor
  | '';

export interface TaxFormData {
  // Step 1: Employment Status
  employmentType: EmploymentType;

  // Step 2: Annual Income
  annualIncome: number;
  includeSocialSecurity: boolean;
  socialSecurityContribution: number; // Max 10,500 for 2026 (9,000 for 2024–2025) — see TAX_CONSTANTS.MAX_SOCIAL_SECURITY

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
  /** Annual minimum tax (0.5% of non-employment income); only set by the company-owner calculator. */
  minimumTax?: number;
  /** True when the minimum tax replaced the ordinary progressive tax. */
  minimumTaxApplied?: boolean;
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
  nextStep: (updatedFormData?: TaxFormData) => void;
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
 * Allowance and deduction constants for the annual calculator.
 * Values come from src/config/taxRules.ts — edit them there, not here.
 * Verification status per rule is recorded in taxRules.ts and TAX_RULES.md.
 */
export const TAX_CONSTANTS = {
  STANDARD_DEDUCTION_RATE: R.standardDeductionRate.value,
  MAX_STANDARD_DEDUCTION: R.maxStandardDeduction.value,
  MAX_SOCIAL_SECURITY: R.maxSocialSecurity.value,
  PERSONAL_ALLOWANCE: R.personalAllowance.value,
  SPOUSE_ALLOWANCE: R.spouseAllowance.value,
  SENIOR_ALLOWANCE: R.seniorExemption.value, // 65+ exemption (named "allowance" in code)
  CHILD_ALLOWANCE_BASE: R.childAllowanceBase.value,
  CHILD_ALLOWANCE_BONUS: R.childAllowanceBonus.value,
  CHILD_BONUS_BIRTH_YEAR: R.childBonusBirthYear.value,
  PARENT_ALLOWANCE: R.parentAllowance.value,
  MAX_PARENTS: R.maxParents.value,
  MAX_LIFE_INSURANCE: R.maxLifeInsurance.value,
  MAX_HEALTH_INSURANCE: R.maxHealthInsurance.value,
  MAX_PENSION_FUND: R.maxPensionFund.value,
  MAX_PROVIDENT_FUND: R.maxProvidentFund.value,
  MAX_RMF: R.maxRmf.value,
  MAX_SSF: R.maxSsf.value,
  MAX_DONATION_PERCENT: R.maxDonationPercent.value,
};

/**
 * Progressive personal income tax brackets, derived from src/config/taxRules.ts
 * (verified 2026-11-19 against https://www.rd.go.th/59670.html). Labels are
 * display-only.
 */
const BRACKET_LABELS = ['0-150k', '150k-300k', '300k-500k', '500k-750k', '750k-1M', '1M-2M', '2M-5M', '5M+'];

export const TAX_BRACKETS: TaxBracket[] = BRACKET_RULES.map((rule, i) => ({
  upTo: rule.value.upTo,
  rate: rule.value.rate,
  label: BRACKET_LABELS[i],
}));

// Re-export freelancer types for convenience
export * from './freelancerForm';

// Re-export sole proprietor types for convenience
export * from './soleProprietorForm';

// Re-export company owner types for convenience
export * from './companyOwnerForm';