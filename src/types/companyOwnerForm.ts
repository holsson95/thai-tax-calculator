import { TaxFormData } from './taxForm';

/**
 * Company type for company owner tax calculation
 */
export type CompanyType =
  | 'limited_company'      // บริษัทจำกัด - Private limited company
  | 'public_company'       // บริษัทมหาชน - Public limited company
  | 'partnership_limited'  // ห้างหุ้นส่วนจำกัด - Limited partnership
  | 'other';

/**
 * Dividend type for tax treatment
 * In Thailand, dividends from Thai companies qualify for tax credits
 */
export type DividendType =
  | 'thai_listed'      // Listed on SET - 10% withholding, can exclude from PIT
  | 'thai_unlisted'    // Not listed - 10% withholding, can exclude from PIT
  | 'foreign'          // Foreign dividends - no withholding credit, fully taxable
  | 'other';

/**
 * Dividend entry for tracking multiple dividend payments
 */
export interface DividendEntry {
  id: string;
  amount: number;
  dividendType: DividendType;
  withholdingTax: number; // 10% typically withheld at source
  companyName: string;
  dateReceived: string; // YYYY-MM-DD
  includeInPIT: boolean; // Whether to include in personal income tax (can exclude if withholding paid)
}

/**
 * Company information for the owner
 */
export interface CompanyInfo {
  companyName: string;
  companyType: CompanyType;
  registrationNumber?: string; // Corporate registration number
  ownershipPercentage: number; // 0-100
  isDirector: boolean; // Whether owner is also a director
  hasOtherShareholders: boolean;
}

/**
 * Extended form data for company owner tax calculation
 * Company owners have both employment income (salary/director fees) and investment income (dividends)
 */
export interface CompanyOwnerFormData extends Omit<TaxFormData, 'annualIncome'> {
  // Company information
  companyInfo: CompanyInfo;

  // Income from company
  salaryFromCompany: number; // Monthly salary * 12 or annual salary
  directorFees: number; // Director meeting fees, bonuses
  otherCompanyBenefits: number; // Car allowance, housing benefit, etc.

  // Dividend income
  hasDividends: boolean;
  dividendEntries: DividendEntry[];

  // Informational - company financial health (not directly taxable to owner)
  companyProfitAfterTax: number; // For reference/advice purposes

  // Withholding from salary
  salaryWithholdingTax: number; // Tax withheld from salary by company

  // Social security (may be contributed via company)
  companySocialSecurityContribution: number;
}

/**
 * Company owner tax calculation result
 */
export interface CompanyOwnerTaxResult {
  // Employment income
  totalSalaryIncome: number;
  salaryStandardDeduction: number; // 50% max 100,000

  // Dividend income
  totalDividendIncome: number;
  dividendTaxCredit: number; // Credit for withholding tax on dividends
  taxableDividends: number; // Dividends included in PIT

  // Combined
  grossIncome: number;
  totalDeductions: number;
  totalAllowances: number;
  taxableIncome: number;

  // Tax computation
  grossTaxBeforeCredits: number;
  withholdingCredits: number; // From salary
  dividendCredits: number; // From dividend withholding
  netTaxPayable: number;
  effectiveRate: number;

  // Advisory info
  dividendExclusionSavings: number; // Tax saved by excluding dividends
  optimalDividendStrategy: 'include' | 'exclude' | 'mixed';
}

/**
 * Props interface for company owner step components
 */
export interface CompanyOwnerStepProps {
  formData: CompanyOwnerFormData;
  setFormData: (data: CompanyOwnerFormData) => void;
  nextStep: (updatedFormData?: CompanyOwnerFormData) => void;
  prevStep?: () => void;
  showValidationErrors?: boolean;
}

/**
 * Creates default CompanyInfo
 */
export function createDefaultCompanyInfo(): CompanyInfo {
  return {
    companyName: '',
    companyType: 'limited_company',
    ownershipPercentage: 100,
    isDirector: true,
    hasOtherShareholders: false,
  };
}

/**
 * Creates default CompanyOwnerFormData
 */
export function createDefaultCompanyOwnerFormData(): CompanyOwnerFormData {
  return {
    // Employment type
    employmentType: 'company_owner',

    // Company info
    companyInfo: createDefaultCompanyInfo(),

    // Income from company
    salaryFromCompany: 0,
    directorFees: 0,
    otherCompanyBenefits: 0,

    // Dividends
    hasDividends: false,
    dividendEntries: [],

    // Company profit (informational)
    companyProfitAfterTax: 0,

    // Withholding
    salaryWithholdingTax: 0,
    taxWithheld: 0,

    // Social security
    includeSocialSecurity: false,
    socialSecurityContribution: 0,
    companySocialSecurityContribution: 0,

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
  };
}

/**
 * Generates a unique ID for dividend entries
 */
export function generateDividendEntryId(): string {
  return `div-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Type guard to check if form data is company owner type
 */
export function isCompanyOwnerFormData(data: unknown): data is CompanyOwnerFormData {
  return (
    typeof data === 'object' &&
    data !== null &&
    'companyInfo' in data &&
    'employmentType' in data &&
    (data as CompanyOwnerFormData).employmentType === 'company_owner'
  );
}

/**
 * Calculate total employment income for company owner
 */
export function calculateTotalEmploymentIncome(formData: CompanyOwnerFormData): number {
  return formData.salaryFromCompany + formData.directorFees + formData.otherCompanyBenefits;
}

/**
 * Calculate total dividend income (only those included in PIT)
 */
export function calculateTaxableDividendIncome(formData: CompanyOwnerFormData): number {
  return formData.dividendEntries
    .filter(entry => entry.includeInPIT)
    .reduce((sum, entry) => sum + entry.amount, 0);
}

/**
 * Calculate dividend withholding credits
 */
export function calculateDividendWithholdingCredits(formData: CompanyOwnerFormData): number {
  return formData.dividendEntries
    .filter(entry => entry.includeInPIT)
    .reduce((sum, entry) => sum + entry.withholdingTax, 0);
}
