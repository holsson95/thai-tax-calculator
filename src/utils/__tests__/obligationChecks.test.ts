import { describe, it, expect } from 'vitest';
import {
  calculateHalfYearIncome,
  calculateProvisionalTax,
  checkPND94Obligation,
  calculateAnnualTurnover,
  checkVATRegistration,
  checkAllObligations,
  getPND94Summary,
  getVATSummary,
} from '../obligationChecks';
import {
  FreelancerFormData,
  ThaiIncomeEntry,
  createDefaultFreelancerFormData,
  generateEntryId,
} from '../../types/freelancerForm';
import { TAX_THRESHOLDS } from '../../config/taxConfig';

function createIncomeEntry(
  overrides: Partial<ThaiIncomeEntry> = {}
): ThaiIncomeEntry {
  return {
    id: generateEntryId(),
    grossAmount: 100000,
    incomeType: 'liberal_profession_40_6',
    withholdingAmount: 3000,
    monthReceived: 3,
    payerName: 'Client A',
    description: 'Consulting work',
    ...overrides,
  };
}

function createFreelancerFormData(
  overrides: Partial<FreelancerFormData> = {}
): FreelancerFormData {
  return {
    ...createDefaultFreelancerFormData(),
    ...overrides,
  };
}

describe('calculateHalfYearIncome', () => {
  it('returns 0 for empty entries', () => {
    expect(calculateHalfYearIncome([])).toBe(0);
  });

  it('includes qualifying income types in first half of year', () => {
    const entries: ThaiIncomeEntry[] = [
      createIncomeEntry({
        grossAmount: 50000,
        incomeType: 'liberal_profession_40_6',
        monthReceived: 3, // March
      }),
      createIncomeEntry({
        grossAmount: 30000,
        incomeType: 'contractor_40_7',
        monthReceived: 5, // May
      }),
    ];
    expect(calculateHalfYearIncome(entries)).toBe(80000);
  });

  it('excludes salary income (40(1)) from PND94 calculation', () => {
    const entries: ThaiIncomeEntry[] = [
      createIncomeEntry({
        grossAmount: 100000,
        incomeType: 'salary_40_1',
        monthReceived: 3,
      }),
      createIncomeEntry({
        grossAmount: 50000,
        incomeType: 'liberal_profession_40_6',
        monthReceived: 4,
      }),
    ];
    // Only freelance income should count
    expect(calculateHalfYearIncome(entries)).toBe(50000);
  });

  it('excludes income received in second half of year', () => {
    const entries: ThaiIncomeEntry[] = [
      createIncomeEntry({
        grossAmount: 50000,
        incomeType: 'liberal_profession_40_6',
        monthReceived: 6, // June - included
      }),
      createIncomeEntry({
        grossAmount: 100000,
        incomeType: 'liberal_profession_40_6',
        monthReceived: 7, // July - excluded
      }),
    ];
    expect(calculateHalfYearIncome(entries)).toBe(50000);
  });

  it('includes all qualifying income types: 40(5), 40(6), 40(7), 40(8)', () => {
    const entries: ThaiIncomeEntry[] = [
      createIncomeEntry({
        grossAmount: 10000,
        incomeType: 'rental_40_5',
        monthReceived: 1,
      }),
      createIncomeEntry({
        grossAmount: 20000,
        incomeType: 'liberal_profession_40_6',
        monthReceived: 2,
      }),
      createIncomeEntry({
        grossAmount: 30000,
        incomeType: 'contractor_40_7',
        monthReceived: 3,
      }),
      createIncomeEntry({
        grossAmount: 40000,
        incomeType: 'business_sales_40_8',
        monthReceived: 4,
      }),
    ];
    expect(calculateHalfYearIncome(entries)).toBe(100000);
  });
});

describe('calculateProvisionalTax', () => {
  it('returns 0 for income below tax-free threshold', () => {
    // Half year income of 30,000 = projected annual 60,000
    // After personal allowance of 60,000, taxable income is 0
    // But we also have 50% expense deduction (up to 100k)
    // So for very low income, tax is 0
    expect(calculateProvisionalTax(30000)).toBe(0);
  });

  it('calculates provisional tax for single filer', () => {
    // Half year income: 200,000
    // Projected annual: 400,000
    // Expense deduction (50% capped): 100,000
    // Personal allowance: 60,000
    // Taxable income: 400,000 - 100,000 - 60,000 = 240,000
    // Tax: 150,000 @ 0% = 0 + 90,000 @ 5% = 4,500
    // PND94 = half = 2,250
    const tax = calculateProvisionalTax(200000);
    expect(tax).toBe(2250);
  });

  it('calculates lower tax with spouse allowance', () => {
    // Same income but with spouse allowance
    // Taxable income: 400,000 - 100,000 - 60,000 - 60,000 = 180,000
    // Tax: 150,000 @ 0% = 0 + 30,000 @ 5% = 1,500
    // PND94 = half = 750
    const tax = calculateProvisionalTax(200000, 60000, 60000);
    expect(tax).toBe(750);
  });

  it('handles higher income brackets', () => {
    // Half year income: 500,000
    // Projected annual: 1,000,000
    // Expense deduction: 100,000 (capped)
    // Personal allowance: 60,000
    // Taxable income: 840,000
    // Tax: 0 + 7,500 + 20,000 + 37,500 + 18,000 = 83,000
    // PND94 = half = 41,500
    const tax = calculateProvisionalTax(500000);
    expect(tax).toBe(41500);
  });
});

describe('checkPND94Obligation', () => {
  it('returns not required when below single threshold', () => {
    const formData = createFreelancerFormData({
      maritalStatus: 'single',
      thaiIncomeEntries: [
        createIncomeEntry({
          grossAmount: 50000,
          incomeType: 'liberal_profession_40_6',
          monthReceived: 3,
        }),
      ],
    });

    const result = checkPND94Obligation(formData);

    expect(result.required).toBe(false);
    expect(result.halfYearIncome).toBe(50000);
    expect(result.threshold).toBe(TAX_THRESHOLDS.PND94_SINGLE);
    expect(result.provisionalTax).toBe(0);
  });

  it('returns required when above single threshold', () => {
    const formData = createFreelancerFormData({
      maritalStatus: 'single',
      thaiIncomeEntries: [
        createIncomeEntry({
          grossAmount: 200000,
          incomeType: 'liberal_profession_40_6',
          monthReceived: 4,
        }),
      ],
    });

    const result = checkPND94Obligation(formData);

    expect(result.required).toBe(true);
    expect(result.halfYearIncome).toBe(200000);
    expect(result.threshold).toBe(60000);
    // With 200k half-year income, projected annual = 400k
    // After deductions, there should be taxable income
    expect(result.provisionalTax).toBeGreaterThan(0);
  });

  it('uses higher threshold for married with spouse no income', () => {
    const formData = createFreelancerFormData({
      maritalStatus: 'married',
      spouseHasNoIncome: true,
      thaiIncomeEntries: [
        createIncomeEntry({
          grossAmount: 100000,
          incomeType: 'liberal_profession_40_6',
          monthReceived: 5,
        }),
      ],
    });

    const result = checkPND94Obligation(formData);

    expect(result.required).toBe(false);
    expect(result.threshold).toBe(TAX_THRESHOLDS.PND94_MARRIED_SPOUSE_NO_INCOME);
  });

  it('uses single threshold for married with spouse having income', () => {
    const formData = createFreelancerFormData({
      maritalStatus: 'married',
      spouseHasNoIncome: false,
      thaiIncomeEntries: [
        createIncomeEntry({
          grossAmount: 70000,
          incomeType: 'liberal_profession_40_6',
          monthReceived: 3,
        }),
      ],
    });

    const result = checkPND94Obligation(formData);

    expect(result.required).toBe(true);
    expect(result.threshold).toBe(TAX_THRESHOLDS.PND94_SINGLE);
  });

  it('includes due date in result', () => {
    const formData = createFreelancerFormData({
      thaiIncomeEntries: [
        createIncomeEntry({
          grossAmount: 100000,
          monthReceived: 3,
        }),
      ],
    });

    const result = checkPND94Obligation(formData);

    expect(result.dueDate).toBeDefined();
    expect(result.dueDate).toContain('09-30'); // September 30
  });
});

describe('calculateAnnualTurnover', () => {
  it('returns 0 for empty entries', () => {
    expect(calculateAnnualTurnover([])).toBe(0);
  });

  it('sums all income regardless of type or month', () => {
    const entries: ThaiIncomeEntry[] = [
      createIncomeEntry({ grossAmount: 500000, monthReceived: 3 }),
      createIncomeEntry({ grossAmount: 800000, monthReceived: 9 }),
      createIncomeEntry({
        grossAmount: 600000,
        incomeType: 'salary_40_1',
        monthReceived: 6,
      }),
    ];
    expect(calculateAnnualTurnover(entries)).toBe(1900000);
  });
});

describe('checkVATRegistration', () => {
  it('returns not required when below threshold', () => {
    const formData = createFreelancerFormData({
      thaiIncomeEntries: [
        createIncomeEntry({ grossAmount: 1500000 }),
      ],
    });

    const result = checkVATRegistration(formData);

    expect(result.required).toBe(false);
    expect(result.turnover).toBe(1500000);
    expect(result.threshold).toBe(TAX_THRESHOLDS.VAT_REGISTRATION);
    expect(result.mustRegisterWithinDays).toBe(0);
  });

  it('returns required when at or above threshold', () => {
    const formData = createFreelancerFormData({
      thaiIncomeEntries: [
        createIncomeEntry({ grossAmount: 1800000 }),
      ],
    });

    const result = checkVATRegistration(formData);

    expect(result.required).toBe(true);
    expect(result.turnover).toBe(1800000);
    expect(result.mustRegisterWithinDays).toBe(30);
  });

  it('returns required for turnover above threshold', () => {
    const formData = createFreelancerFormData({
      thaiIncomeEntries: [
        createIncomeEntry({ grossAmount: 1000000 }),
        createIncomeEntry({ grossAmount: 1000000 }),
      ],
    });

    const result = checkVATRegistration(formData);

    expect(result.required).toBe(true);
    expect(result.turnover).toBe(2000000);
  });
});

describe('checkAllObligations', () => {
  it('returns no obligations for low income', () => {
    const formData = createFreelancerFormData({
      thaiIncomeEntries: [
        createIncomeEntry({
          grossAmount: 50000,
          monthReceived: 3,
        }),
      ],
    });

    const result = checkAllObligations(formData);

    expect(result.hasAnyObligation).toBe(false);
    expect(result.pnd94.required).toBe(false);
    expect(result.vat.required).toBe(false);
    expect(result.urgentItems).toHaveLength(0);
  });

  it('identifies both obligations when both thresholds exceeded', () => {
    const formData = createFreelancerFormData({
      thaiIncomeEntries: [
        createIncomeEntry({
          grossAmount: 1000000,
          monthReceived: 3,
        }),
        createIncomeEntry({
          grossAmount: 1000000,
          monthReceived: 9,
        }),
      ],
    });

    const result = checkAllObligations(formData);

    expect(result.hasAnyObligation).toBe(true);
    expect(result.pnd94.required).toBe(true);
    expect(result.vat.required).toBe(true);
    expect(result.urgentItems.length).toBeGreaterThan(0);
  });

  it('identifies only PND94 when only half-year threshold exceeded', () => {
    const formData = createFreelancerFormData({
      thaiIncomeEntries: [
        createIncomeEntry({
          grossAmount: 100000,
          monthReceived: 3,
        }),
      ],
    });

    const result = checkAllObligations(formData);

    expect(result.hasAnyObligation).toBe(true);
    expect(result.pnd94.required).toBe(true);
    expect(result.vat.required).toBe(false);
  });
});

describe('getPND94Summary', () => {
  it('returns not required message when not required', () => {
    const result = {
      required: false,
      halfYearIncome: 50000,
      threshold: 60000,
      provisionalTax: 0,
      dueDate: '2024-09-30',
    };

    const summary = getPND94Summary(result);

    expect(summary).toContain('not required');
    expect(summary).toContain('50,000');
    expect(summary).toContain('60,000');
  });

  it('returns required message with details when required', () => {
    const result = {
      required: true,
      halfYearIncome: 100000,
      threshold: 60000,
      provisionalTax: 5000,
      dueDate: '2024-09-30',
    };

    const summary = getPND94Summary(result);

    expect(summary).toContain('required');
    expect(summary).toContain('100,000');
    expect(summary).toContain('5,000');
    expect(summary).toContain('2024-09-30');
  });
});

describe('getVATSummary', () => {
  it('returns not required message when not required', () => {
    const result = {
      required: false,
      turnover: 1500000,
      threshold: 1800000,
      mustRegisterWithinDays: 0,
    };

    const summary = getVATSummary(result);

    expect(summary).toContain('not required');
    expect(summary).toContain('1,500,000');
    expect(summary).toContain('1,800,000');
  });

  it('returns required message with registration deadline when required', () => {
    const result = {
      required: true,
      turnover: 2000000,
      threshold: 1800000,
      mustRegisterWithinDays: 30,
    };

    const summary = getVATSummary(result);

    expect(summary).toContain('required');
    expect(summary).toContain('2,000,000');
    expect(summary).toContain('30 days');
  });
});
