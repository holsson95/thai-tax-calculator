import { IncomeType } from '../types/freelancerForm';
import { FLAT_RATE_DEDUCTIONS } from '../config/taxConfig';

/**
 * Detailed information about each income type
 */
export interface IncomeTypeInfo {
  type: IncomeType;
  label: string;
  shortLabel: string;
  section: string;
  description: string;
  flatRate: number;
  flatRateCap?: number;
  examples: string[];
  withholdingRate?: number;
  notes?: string;
}

/**
 * Complete income type metadata for UI and calculations
 */
export const INCOME_TYPE_INFO: Record<IncomeType, IncomeTypeInfo> = {
  salary_40_1: {
    type: 'salary_40_1',
    label: 'Salary & Employment Income',
    shortLabel: 'Salary',
    section: '40(1)',
    description: 'Regular employment income from an employer including wages, bonuses, and benefits',
    flatRate: FLAT_RATE_DEDUCTIONS.salary_40_1,
    flatRateCap: 100000,
    examples: [
      'Monthly salary',
      'Annual bonus',
      'Commission from employer',
      'Housing allowance',
      'Transportation allowance',
    ],
    withholdingRate: undefined, // Progressive based on tax table
    notes: 'Expense deduction is 50% of income, capped at ฿100,000',
  },

  liberal_profession_40_6: {
    type: 'liberal_profession_40_6',
    label: 'Liberal Profession Income',
    shortLabel: 'Professional',
    section: '40(6)',
    description: 'Income from professional services requiring specialized knowledge or skills',
    flatRate: FLAT_RATE_DEDUCTIONS.liberal_profession_40_6,
    examples: [
      'Medical/dental practice fees',
      'Legal consultation fees',
      'Engineering services',
      'Accounting services',
      'Architecture fees',
      'Entertainment/performance fees',
      'Sports earnings',
      'Author royalties',
    ],
    withholdingRate: 0.03, // 3% withholding typical
    notes: 'Deduction rate varies: 30% for most professions, 60% for medical, entertainment, sports',
  },

  contractor_40_7: {
    type: 'contractor_40_7',
    label: 'Contractor Income',
    shortLabel: 'Contractor',
    section: '40(7)',
    description: 'Income from contract work where you provide both labor and materials',
    flatRate: FLAT_RATE_DEDUCTIONS.contractor_40_7,
    examples: [
      'Construction contracts',
      'Renovation work',
      'Manufacturing contracts',
      'Installation services',
      'Custom product creation',
    ],
    withholdingRate: 0.03,
    notes: '40% flat deduction rate applies',
  },

  business_sales_40_8: {
    type: 'business_sales_40_8',
    label: 'Business & Sales Income',
    shortLabel: 'Business',
    section: '40(8)',
    description: 'Income from business operations, trading, or sales activities',
    flatRate: FLAT_RATE_DEDUCTIONS.business_sales_40_8,
    examples: [
      'Retail/wholesale sales',
      'E-commerce revenue',
      'Consulting business',
      'Freelance services',
      'Agency fees',
      'Online platform income',
    ],
    withholdingRate: 0.03,
    notes: '60% flat deduction rate - highest among business income types',
  },

  rental_40_5: {
    type: 'rental_40_5',
    label: 'Rental Income',
    shortLabel: 'Rental',
    section: '40(5)',
    description: 'Income from renting out property or assets',
    flatRate: FLAT_RATE_DEDUCTIONS.rental_40_5,
    examples: [
      'Residential property rental',
      'Commercial property rental',
      'Vehicle rental',
      'Equipment rental',
      'Land lease income',
    ],
    withholdingRate: 0.05, // 5% for rental
    notes: '30% flat deduction rate, or actual expenses with documentation',
  },

  dividend: {
    type: 'dividend',
    label: 'Dividend Income',
    shortLabel: 'Dividend',
    section: '40(4)(b)',
    description: 'Dividends received from Thai companies',
    flatRate: FLAT_RATE_DEDUCTIONS.dividend,
    examples: [
      'Stock dividends from SET-listed companies',
      'Dividends from private companies',
      'Investment fund distributions',
    ],
    withholdingRate: 0.10, // 10% final withholding
    notes: 'No expense deduction. May elect final 10% withholding or include in PIT calculation.',
  },

  other: {
    type: 'other',
    label: 'Other Income',
    shortLabel: 'Other',
    section: 'Various',
    description: 'Income from other sources not covered above',
    flatRate: FLAT_RATE_DEDUCTIONS.other,
    examples: [
      'Prizes and lottery winnings',
      'Gifts above threshold',
      'Other taxable receipts',
    ],
    withholdingRate: undefined,
    notes: 'Deduction rules vary based on specific income source',
  },
};

/**
 * Liberal profession sub-types for detailed classification
 */
export interface LiberalProfessionSubType {
  id: string;
  label: string;
  rate: number;
  examples: string[];
}

export const LIBERAL_PROFESSION_SUBTYPES: LiberalProfessionSubType[] = [
  {
    id: 'medical_practice',
    label: 'Medical & Healthcare',
    rate: 0.60,
    examples: ['Doctor fees', 'Dentist fees', 'Specialist consultations'],
  },
  {
    id: 'entertainment',
    label: 'Entertainment & Media',
    rate: 0.60,
    examples: ['Actor/actress fees', 'Singer performance', 'DJ/MC fees', 'Influencer content'],
  },
  {
    id: 'sports',
    label: 'Sports & Athletics',
    rate: 0.60,
    examples: ['Athlete earnings', 'Coach fees', 'Sports instructor'],
  },
  {
    id: 'author_royalties',
    label: 'Author & Royalties',
    rate: 0.60,
    examples: ['Book royalties', 'Music royalties', 'IP licensing'],
  },
  {
    id: 'legal',
    label: 'Legal Services',
    rate: 0.30,
    examples: ['Lawyer fees', 'Legal consultation', 'Notary services'],
  },
  {
    id: 'engineering',
    label: 'Engineering',
    rate: 0.30,
    examples: ['Engineering design', 'Technical consultation', 'Project management'],
  },
  {
    id: 'architecture',
    label: 'Architecture',
    rate: 0.30,
    examples: ['Architectural design', 'Building plans', 'Interior design'],
  },
  {
    id: 'accounting',
    label: 'Accounting & Finance',
    rate: 0.30,
    examples: ['Bookkeeping', 'Tax preparation', 'Financial advisory'],
  },
  {
    id: 'consulting',
    label: 'Business Consulting',
    rate: 0.30,
    examples: ['Management consulting', 'IT consulting', 'Strategy advisory'],
  },
  {
    id: 'other_liberal',
    label: 'Other Professional Services',
    rate: 0.30,
    examples: ['Translation', 'Teaching/tutoring', 'Research services'],
  },
];

/**
 * Get income type info by type
 */
export function getIncomeTypeInfo(type: IncomeType): IncomeTypeInfo {
  return INCOME_TYPE_INFO[type];
}

/**
 * Get all income types as array for dropdowns
 */
export function getIncomeTypeOptions(): Array<{ value: IncomeType; label: string }> {
  return Object.entries(INCOME_TYPE_INFO).map(([type, info]) => ({
    value: type as IncomeType,
    label: `${info.label} (${info.section})`,
  }));
}

/**
 * Get income types suitable for freelancers (excluding salary)
 */
export function getFreelancerIncomeTypeOptions(): Array<{ value: IncomeType; label: string }> {
  return getIncomeTypeOptions().filter(
    (option) => option.value !== 'salary_40_1'
  );
}

/**
 * Format income type for display with section reference
 */
export function formatIncomeTypeLabel(type: IncomeType): string {
  const info = INCOME_TYPE_INFO[type];
  return `${info.shortLabel} (${info.section})`;
}

/**
 * Get flat rate percentage for display (e.g., "60%")
 */
export function formatFlatRate(type: IncomeType): string {
  const info = INCOME_TYPE_INFO[type];
  if (info.flatRate === 0) {
    return 'No deduction';
  }
  return `${(info.flatRate * 100).toFixed(0)}%`;
}
