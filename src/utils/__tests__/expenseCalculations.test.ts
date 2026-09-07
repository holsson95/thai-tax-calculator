import { describe, it, expect } from 'vitest';
import {
  calculateFlatRateDeduction,
  calculateTotalFlatRateDeductions,
  calculateTotalActualExpenses,
  compareExpenseDeductions,
  getEffectiveDeduction,
  estimateTaxBracketRate,
  validateExpenseEntry,
  getIncomeByType,
  getTotalWithholding,
  getTotalGrossIncome,
} from '../expenseCalculations';
import { ThaiIncomeEntry, ExpenseEntry, generateEntryId } from '../../types/freelancerForm';

function createThaiIncomeEntry(
  grossAmount: number,
  incomeType: ThaiIncomeEntry['incomeType'] = 'business_sales_40_8',
  overrides: Partial<ThaiIncomeEntry> = {}
): ThaiIncomeEntry {
  return {
    id: generateEntryId(),
    grossAmount,
    incomeType,
    withholdingAmount: 0,
    monthReceived: 1,
    payerName: 'Test Client',
    description: 'Test income',
    ...overrides,
  };
}

function createExpenseEntry(overrides: Partial<ExpenseEntry> = {}): ExpenseEntry {
  return {
    id: generateEntryId(),
    category: 'equipment',
    amount: 10000,
    hasReceipt: true,
    description: 'Test expense',
    ...overrides,
  };
}

describe('calculateFlatRateDeduction', () => {
  it('applies 60% for business income (40(8))', () => {
    const entry = createThaiIncomeEntry(500000, 'business_sales_40_8');
    expect(calculateFlatRateDeduction(entry)).toBe(300000);
  });

  it('applies 30% for liberal profession (40(6))', () => {
    const entry = createThaiIncomeEntry(500000, 'liberal_profession_40_6');
    expect(calculateFlatRateDeduction(entry)).toBe(150000);
  });

  it('applies 60% for contractor income (40(7))', () => {
    const entry = createThaiIncomeEntry(500000, 'contractor_40_7');
    expect(calculateFlatRateDeduction(entry)).toBe(300000);
  });

  it('applies 30% for rental income (40(5))', () => {
    const entry = createThaiIncomeEntry(500000, 'rental_40_5');
    expect(calculateFlatRateDeduction(entry)).toBe(150000);
  });

  it('returns 0 for dividend and other income types', () => {
    expect(calculateFlatRateDeduction(createThaiIncomeEntry(500000, 'dividend'))).toBe(0);
    expect(calculateFlatRateDeduction(createThaiIncomeEntry(500000, 'other'))).toBe(0);
  });

  it('caps salary (40(1)) deduction at 100,000 per entry', () => {
    const entry = createThaiIncomeEntry(1000000, 'salary_40_1');
    // 50% of 1,000,000 = 500,000, capped at 100,000
    expect(calculateFlatRateDeduction(entry)).toBe(100000);
  });

  it('does not cap salary deduction when under the cap', () => {
    const entry = createThaiIncomeEntry(100000, 'salary_40_1');
    expect(calculateFlatRateDeduction(entry)).toBe(50000);
  });
});

describe('calculateTotalFlatRateDeductions', () => {
  it('applies the salary cap across combined entries, not per entry', () => {
    const entries = [
      createThaiIncomeEntry(200000, 'salary_40_1'),
      createThaiIncomeEntry(200000, 'salary_40_1'),
    ];
    // Combined gross 400,000 * 50% = 200,000, capped at 100,000 total
    const { total, breakdown } = calculateTotalFlatRateDeductions(entries);
    expect(total).toBe(100000);
    expect(breakdown.find(b => b.incomeType === 'salary_40_1')?.deduction).toBe(100000);
  });

  it('sums deductions across multiple income types independently', () => {
    const entries = [
      createThaiIncomeEntry(300000, 'business_sales_40_8'), // 60% = 180,000
      createThaiIncomeEntry(200000, 'liberal_profession_40_6'), // 30% = 60,000
    ];
    const { total, breakdown } = calculateTotalFlatRateDeductions(entries);
    expect(total).toBe(240000);
    expect(breakdown).toHaveLength(2);
  });

  it('returns zero total for no entries', () => {
    expect(calculateTotalFlatRateDeductions([]).total).toBe(0);
  });
});

describe('calculateTotalActualExpenses', () => {
  it('groups and sums expenses by category', () => {
    const expenses = [
      createExpenseEntry({ category: 'equipment', amount: 50000, hasReceipt: true }),
      createExpenseEntry({ category: 'equipment', amount: 20000, hasReceipt: true }),
      createExpenseEntry({ category: 'software', amount: 5000, hasReceipt: true }),
    ];
    const { total, breakdown } = calculateTotalActualExpenses(expenses);
    expect(total).toBe(75000);
    expect(breakdown.find(b => b.category === 'equipment')?.amount).toBe(70000);
  });

  it('marks hasReceipts false if any expense in the category lacks a receipt', () => {
    const expenses = [
      createExpenseEntry({ category: 'equipment', amount: 50000, hasReceipt: true }),
      createExpenseEntry({ category: 'equipment', amount: 20000, hasReceipt: false }),
    ];
    const { breakdown } = calculateTotalActualExpenses(expenses);
    expect(breakdown.find(b => b.category === 'equipment')?.hasReceipts).toBe(false);
  });

  it('returns zero total for no expenses', () => {
    expect(calculateTotalActualExpenses([]).total).toBe(0);
  });
});

describe('compareExpenseDeductions', () => {
  it('recommends flat rate when it is higher than actual expenses', () => {
    const entries = [createThaiIncomeEntry(500000, 'business_sales_40_8')]; // flat = 300,000
    const expenses = [createExpenseEntry({ amount: 100000 })];
    const result = compareExpenseDeductions(entries, expenses, 0.2);
    expect(result.recommended).toBe('flat');
    expect(result.flatRateDeduction).toBe(300000);
    expect(result.actualDeduction).toBe(100000);
    expect(result.taxSavings).toBeCloseTo(200000 * 0.2, 5);
  });

  it('recommends actual when it is higher than flat rate', () => {
    const entries = [createThaiIncomeEntry(500000, 'business_sales_40_8')]; // flat = 300,000
    const expenses = [createExpenseEntry({ amount: 400000 })];
    const result = compareExpenseDeductions(entries, expenses, 0.2);
    expect(result.recommended).toBe('actual');
  });

  it('recommends flat when both are exactly equal (tie goes to flat)', () => {
    const entries = [createThaiIncomeEntry(500000, 'business_sales_40_8')]; // flat = 300,000
    const expenses = [createExpenseEntry({ amount: 300000 })];
    const result = compareExpenseDeductions(entries, expenses, 0.2);
    expect(result.recommended).toBe('flat');
    expect(result.taxSavings).toBe(0);
  });
});

describe('getEffectiveDeduction', () => {
  const entries = [createThaiIncomeEntry(500000, 'business_sales_40_8')]; // flat = 300,000
  const lowExpenses = [createExpenseEntry({ amount: 100000 })];
  const highExpenses = [createExpenseEntry({ amount: 400000 })];

  it('force_flat always uses the flat-rate deduction', () => {
    expect(getEffectiveDeduction(entries, highExpenses, 'force_flat')).toBe(300000);
  });

  it('force_actual always uses actual expenses, even if lower', () => {
    expect(getEffectiveDeduction(entries, lowExpenses, 'force_actual')).toBe(100000);
  });

  it('auto_compare uses whichever deduction is higher', () => {
    expect(getEffectiveDeduction(entries, lowExpenses, 'auto_compare')).toBe(300000);
    expect(getEffectiveDeduction(entries, highExpenses, 'auto_compare')).toBe(400000);
  });
});

describe('estimateTaxBracketRate', () => {
  it('returns the correct rate at each bracket boundary', () => {
    expect(estimateTaxBracketRate(0)).toBe(0);
    expect(estimateTaxBracketRate(150000)).toBe(0);
    expect(estimateTaxBracketRate(150001)).toBe(0.05);
    expect(estimateTaxBracketRate(300000)).toBe(0.05);
    expect(estimateTaxBracketRate(300001)).toBe(0.10);
    expect(estimateTaxBracketRate(500000)).toBe(0.10);
    expect(estimateTaxBracketRate(500001)).toBe(0.15);
    expect(estimateTaxBracketRate(750000)).toBe(0.15);
    expect(estimateTaxBracketRate(750001)).toBe(0.20);
    expect(estimateTaxBracketRate(1000000)).toBe(0.20);
    expect(estimateTaxBracketRate(1000001)).toBe(0.25);
    expect(estimateTaxBracketRate(2000000)).toBe(0.25);
    expect(estimateTaxBracketRate(2000001)).toBe(0.30);
    expect(estimateTaxBracketRate(5000000)).toBe(0.30);
    expect(estimateTaxBracketRate(5000001)).toBe(0.35);
    expect(estimateTaxBracketRate(50000000)).toBe(0.35);
  });
});

describe('validateExpenseEntry', () => {
  it('flags a zero or negative amount as invalid', () => {
    expect(validateExpenseEntry(createExpenseEntry({ amount: 0 })).isValid).toBe(false);
    expect(validateExpenseEntry(createExpenseEntry({ amount: -100 })).isValid).toBe(false);
  });

  it('flags a missing description as invalid', () => {
    const result = validateExpenseEntry(createExpenseEntry({ description: '   ' }));
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain('Description is required');
  });

  it('passes for a well-formed entry', () => {
    const result = validateExpenseEntry(createExpenseEntry({ amount: 5000, description: 'Laptop' }));
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe('getIncomeByType / getTotalWithholding / getTotalGrossIncome', () => {
  it('aggregates income and withholding across multiple entries of the same type', () => {
    const entries = [
      createThaiIncomeEntry(100000, 'business_sales_40_8', { withholdingAmount: 3000 }),
      createThaiIncomeEntry(200000, 'business_sales_40_8', { withholdingAmount: 6000 }),
      createThaiIncomeEntry(50000, 'liberal_profession_40_6', { withholdingAmount: 1500 }),
    ];

    expect(getTotalGrossIncome(entries)).toBe(350000);
    expect(getTotalWithholding(entries)).toBe(10500);

    const byType = getIncomeByType(entries);
    expect(byType.get('business_sales_40_8')).toBe(300000);
    expect(byType.get('liberal_profession_40_6')).toBe(50000);
  });

  it('returns zero/empty for no entries', () => {
    expect(getTotalGrossIncome([])).toBe(0);
    expect(getTotalWithholding([])).toBe(0);
    expect(getIncomeByType([]).size).toBe(0);
  });
});
