import { TaxFormData } from './taxForm';

/**
 * Income types per Thailand Revenue Code sections
 */
export type IncomeType =
  | 'salary_40_1'
  | 'liberal_profession_40_6'
  | 'contractor_40_7'
  | 'business_sales_40_8'
  | 'rental_40_5'
  | 'dividend'
  | 'other';

/**
 * Expense deduction method selection
 */
export type ExpenseMethod = 'auto_compare' | 'force_actual' | 'force_flat';

/**
 * Foreign income entry with remittance tracking
 * Per 2024+ rules: foreign income taxable if earned on/after 2024-01-01 and remitted to Thailand
 */
export interface ForeignIncomeEntry {
  id: string;
  amount: number;
  currency: string;
  amountThb: number; // Converted to THB
  dateEarned: string; // YYYY-MM-DD
  dateRemitted: string | null; // YYYY-MM-DD, null if not remitted
  foreignTaxPaid: number; // For foreign tax credit
  description: string;
  country: string;
}

/**
 * Thai income entry with source tracking
 */
export interface ThaiIncomeEntry {
  id: string;
  grossAmount: number;
  incomeType: IncomeType;
  withholdingAmount: number;
  monthReceived: number; // 1-12, used for PND94 calculation
  payerName: string;
  description: string;
}

/**
 * Expense entry for actual expense tracking
 */
export interface ExpenseEntry {
  id: string;
  category: ExpenseCategory;
  amount: number;
  hasReceipt: boolean;
  description: string;
  relatedIncomeType?: IncomeType; // Optional link to specific income
}

/**
 * Expense categories for business/freelance expenses
 */
export type ExpenseCategory =
  | 'office_supplies'
  | 'equipment'
  | 'software'
  | 'travel'
  | 'communication'
  | 'professional_services'
  | 'rent'
  | 'utilities'
  | 'marketing'
  | 'insurance'
  | 'other';

/**
 * Extended form data for freelancer tax calculation
 * Extends base TaxFormData with freelancer-specific fields
 */
export interface FreelancerFormData extends Omit<TaxFormData, 'annualIncome'> {
  // Residency determination
  daysInThailand: number;
  isThaiResident: boolean; // Computed: daysInThailand >= 180

  // Foreign income tracking
  hasForeignIncome: boolean;
  foreignIncomeEntries: ForeignIncomeEntry[];

  // Thai income (multiple sources replacing single annualIncome)
  thaiIncomeEntries: ThaiIncomeEntry[];

  // Expense deduction method
  expenseMethod: ExpenseMethod;
  actualExpenses: ExpenseEntry[];

  // Computed obligation flags (set during calculation)
  pnd94Required?: boolean;
  pnd94Amount?: number;
  pnd94DueDate?: string;
  vatRegistrationRequired?: boolean;
  vatTurnover?: number;
}

/**
 * PND94 obligation check result
 */
export interface PND94Result {
  required: boolean;
  halfYearIncome: number;
  threshold: number;
  provisionalTax: number;
  dueDate: string;
}

/**
 * VAT registration check result
 */
export interface VATResult {
  required: boolean;
  turnover: number;
  threshold: number;
  mustRegisterWithinDays: number;
}

/**
 * Expense comparison result for auto-compare mode
 */
export interface ExpenseComparisonResult {
  flatRateDeduction: number;
  actualDeduction: number;
  recommended: 'flat' | 'actual';
  taxSavings: number;
  flatBreakdown: FlatRateBreakdown[];
  actualBreakdown: ActualExpenseBreakdown[];
}

/**
 * Breakdown of flat-rate deduction by income type
 */
export interface FlatRateBreakdown {
  incomeType: IncomeType;
  grossAmount: number;
  rate: number;
  deduction: number;
}

/**
 * Breakdown of actual expenses by category
 */
export interface ActualExpenseBreakdown {
  category: ExpenseCategory;
  amount: number;
  hasReceipts: boolean;
}

/**
 * Foreign income taxability result
 */
export interface ForeignIncomeTaxability {
  entry: ForeignIncomeEntry;
  isTaxable: boolean;
  reason: string;
  taxableAmount: number;
  foreignTaxCredit: number;
}

/**
 * Extended tax calculation result for freelancers
 */
export interface FreelancerTaxResult {
  // Base calculation
  grossIncome: number;
  thaiIncomeTotal: number;
  foreignIncomeTotal: number;
  taxableForeignIncome: number;

  // Deductions
  expenseDeduction: number;
  expenseMethod: ExpenseMethod;
  totalAllowances: number;
  totalDeductions: number;

  // Tax computation
  taxableIncome: number;
  grossTaxBeforeCredits: number;
  withholdingCredits: number;
  foreignTaxCredits: number;
  netTaxPayable: number;
  effectiveRate: number;

  // Obligations
  pnd94: PND94Result;
  vat: VATResult;

  // Detailed breakdowns
  expenseComparison?: ExpenseComparisonResult;
  foreignIncomeTaxability: ForeignIncomeTaxability[];
  incomeByType: Map<IncomeType, number>;
}

/**
 * Props interface for freelancer step components
 */
export interface FreelancerStepProps {
  formData: FreelancerFormData;
  setFormData: (data: FreelancerFormData) => void;
  nextStep: (updatedFormData?: FreelancerFormData) => void;
  prevStep?: () => void;
  showValidationErrors?: boolean;
}

/**
 * Creates default FreelancerFormData
 */
export function createDefaultFreelancerFormData(): FreelancerFormData {
  return {
    // Employment (from base)
    employmentType: 'freelancer',

    // Residency
    daysInThailand: 0,
    isThaiResident: false,

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
  };
}

/**
 * Generates a unique ID for list entries
 */
export function generateEntryId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
