import {
  ThaiIncomeEntry,
  ExpenseEntry,
  IncomeType,
  ExpenseMethod,
  ExpenseComparisonResult,
  FlatRateBreakdown,
  ActualExpenseBreakdown,
  ExpenseCategory,
} from '../types/freelancerForm';
import {
  FLAT_RATE_DEDUCTIONS,
  DEDUCTION_CAPS,
  EXPENSE_CATEGORY_LABELS,
} from '../config/taxConfig';
import { INCOME_TYPE_INFO } from '../data/incomeTypes';

/**
 * Calculate flat-rate deduction for a single income entry
 * Applies the appropriate percentage based on income type
 */
export function calculateFlatRateDeduction(entry: ThaiIncomeEntry): number {
  const info = INCOME_TYPE_INFO[entry.incomeType];
  const rate = FLAT_RATE_DEDUCTIONS[entry.incomeType];

  if (rate === 0) {
    return 0;
  }

  const deduction = entry.grossAmount * rate;

  // Apply cap for salary income (Section 40(1))
  if (entry.incomeType === 'salary_40_1' && info.flatRateCap) {
    return Math.min(deduction, info.flatRateCap);
  }

  return deduction;
}

/**
 * Calculate total flat-rate deductions for all income entries
 * Returns breakdown by income type
 */
export function calculateTotalFlatRateDeductions(
  entries: ThaiIncomeEntry[]
): {
  total: number;
  breakdown: FlatRateBreakdown[];
} {
  // Group entries by income type and calculate deductions
  const byType = new Map<IncomeType, { gross: number; deduction: number }>();

  entries.forEach(entry => {
    const existing = byType.get(entry.incomeType) || { gross: 0, deduction: 0 };
    const entryDeduction = calculateFlatRateDeduction(entry);

    byType.set(entry.incomeType, {
      gross: existing.gross + entry.grossAmount,
      deduction: existing.deduction + entryDeduction,
    });
  });

  // For salary income, we need to apply the cap to the total, not per entry
  const salaryData = byType.get('salary_40_1');
  if (salaryData) {
    const salaryRate = FLAT_RATE_DEDUCTIONS.salary_40_1;
    const uncappedDeduction = salaryData.gross * salaryRate;
    salaryData.deduction = Math.min(uncappedDeduction, DEDUCTION_CAPS.SALARY_EXPENSE_CAP);
    byType.set('salary_40_1', salaryData);
  }

  const breakdown: FlatRateBreakdown[] = [];
  let total = 0;

  byType.forEach((data, incomeType) => {
    breakdown.push({
      incomeType,
      grossAmount: data.gross,
      rate: FLAT_RATE_DEDUCTIONS[incomeType],
      deduction: data.deduction,
    });
    total += data.deduction;
  });

  return { total, breakdown };
}

/**
 * Calculate total actual expenses
 * Returns breakdown by category
 */
export function calculateTotalActualExpenses(
  expenses: ExpenseEntry[]
): {
  total: number;
  breakdown: ActualExpenseBreakdown[];
} {
  // Group by category
  const byCategory = new Map<ExpenseCategory, { amount: number; hasReceipts: boolean }>();

  expenses.forEach(expense => {
    const existing = byCategory.get(expense.category);
    if (existing) {
      byCategory.set(expense.category, {
        amount: existing.amount + expense.amount,
        hasReceipts: existing.hasReceipts && expense.hasReceipt,
      });
    } else {
      byCategory.set(expense.category, {
        amount: expense.amount,
        hasReceipts: expense.hasReceipt,
      });
    }
  });

  const breakdown: ActualExpenseBreakdown[] = [];
  let total = 0;

  byCategory.forEach((data, category) => {
    breakdown.push({
      category,
      amount: data.amount,
      hasReceipts: data.hasReceipts,
    });
    total += data.amount;
  });

  return { total, breakdown };
}

/**
 * Compare flat-rate vs actual expenses and recommend the better option
 * Returns detailed comparison with tax savings calculation
 */
export function compareExpenseDeductions(
  incomeEntries: ThaiIncomeEntry[],
  actualExpenses: ExpenseEntry[],
  taxBracketRate: number = 0.20 // Default to 20% bracket for estimation
): ExpenseComparisonResult {
  const flatRate = calculateTotalFlatRateDeductions(incomeEntries);
  const actual = calculateTotalActualExpenses(actualExpenses);

  const difference = Math.abs(flatRate.total - actual.total);
  const taxSavings = difference * taxBracketRate;

  const recommended: 'flat' | 'actual' =
    flatRate.total >= actual.total ? 'flat' : 'actual';

  return {
    flatRateDeduction: flatRate.total,
    actualDeduction: actual.total,
    recommended,
    taxSavings,
    flatBreakdown: flatRate.breakdown,
    actualBreakdown: actual.breakdown,
  };
}

/**
 * Get the effective deduction amount based on chosen method
 */
export function getEffectiveDeduction(
  incomeEntries: ThaiIncomeEntry[],
  actualExpenses: ExpenseEntry[],
  method: ExpenseMethod
): number {
  const comparison = compareExpenseDeductions(incomeEntries, actualExpenses);

  switch (method) {
    case 'force_flat':
      return comparison.flatRateDeduction;
    case 'force_actual':
      return comparison.actualDeduction;
    case 'auto_compare':
    default:
      return Math.max(comparison.flatRateDeduction, comparison.actualDeduction);
  }
}

/**
 * Format currency amount for display
 */
export function formatCurrency(amount: number): string {
  return `฿${amount.toLocaleString()}`;
}

/**
 * Get expense category label
 */
export function getExpenseCategoryLabel(category: ExpenseCategory): string {
  return EXPENSE_CATEGORY_LABELS[category];
}

/**
 * Validate an expense entry
 */
export function validateExpenseEntry(expense: ExpenseEntry): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (expense.amount <= 0) {
    errors.push('Amount must be greater than 0');
  }

  if (!expense.description.trim()) {
    errors.push('Description is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Calculate income by type for breakdown display
 */
export function getIncomeByType(
  entries: ThaiIncomeEntry[]
): Map<IncomeType, number> {
  const byType = new Map<IncomeType, number>();

  entries.forEach(entry => {
    const current = byType.get(entry.incomeType) || 0;
    byType.set(entry.incomeType, current + entry.grossAmount);
  });

  return byType;
}

/**
 * Get total withholding from all income entries
 */
export function getTotalWithholding(entries: ThaiIncomeEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.withholdingAmount, 0);
}

/**
 * Get total gross income from all entries
 */
export function getTotalGrossIncome(entries: ThaiIncomeEntry[]): number {
  return entries.reduce((sum, entry) => sum + entry.grossAmount, 0);
}

/**
 * Calculate estimated tax bracket based on taxable income
 */
export function estimateTaxBracketRate(taxableIncome: number): number {
  if (taxableIncome <= 150000) return 0;
  if (taxableIncome <= 300000) return 0.05;
  if (taxableIncome <= 500000) return 0.10;
  if (taxableIncome <= 750000) return 0.15;
  if (taxableIncome <= 1000000) return 0.20;
  if (taxableIncome <= 2000000) return 0.25;
  if (taxableIncome <= 5000000) return 0.30;
  return 0.35;
}

/**
 * Generate recommendation text based on comparison result
 */
export function getRecommendationText(comparison: ExpenseComparisonResult): string {
  const { recommended, flatRateDeduction, actualDeduction, taxSavings } = comparison;

  if (recommended === 'flat') {
    const savings = flatRateDeduction - actualDeduction;
    return `The flat-rate deduction (${formatCurrency(flatRateDeduction)}) is higher than your actual expenses (${formatCurrency(actualDeduction)}) by ${formatCurrency(savings)}. Using flat-rate could save you approximately ${formatCurrency(taxSavings)} in taxes.`;
  } else {
    const savings = actualDeduction - flatRateDeduction;
    return `Your actual expenses (${formatCurrency(actualDeduction)}) are higher than the flat-rate deduction (${formatCurrency(flatRateDeduction)}) by ${formatCurrency(savings)}. Using actual expenses could save you approximately ${formatCurrency(taxSavings)} in taxes, but you'll need documentation.`;
  }
}

/**
 * Check if actual expenses method requires documentation
 */
export function requiresDocumentation(method: ExpenseMethod): boolean {
  return method === 'force_actual';
}

/**
 * Get expense method description
 */
export function getExpenseMethodDescription(method: ExpenseMethod): string {
  switch (method) {
    case 'auto_compare':
      return 'Automatically use whichever method results in a higher deduction (lower tax)';
    case 'force_flat':
      return 'Use the flat-rate deduction based on income type percentages';
    case 'force_actual':
      return 'Use your actual documented expenses as deductions';
    default:
      return '';
  }
}
