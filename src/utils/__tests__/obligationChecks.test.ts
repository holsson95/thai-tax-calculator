import { describe, it, expect } from 'vitest';
import {
  calculateHalfYearIncome,
  calculatePND94Estimate,
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

describe('calculatePND94Estimate (RD PND94 guide method)', () => {
  // Half-year income − flat-rate expenses − HALF the annual allowances, taxed at the
  // ordinary rates; at least 0.5% of the income once it reaches 120,000.
  // tax-data/2026/residency.json: pnd94-half-year-allowances, pnd94-gross-income-tax-*.
  const estimate = (overrides: Partial<FreelancerFormData>) =>
    calculatePND94Estimate(createFreelancerFormData({ maritalStatus: 'single', ...overrides }));

  it('below 120,000 the 0.5% minimum does not apply and low income pays nothing', () => {
    // 100,000 − 30,000 (30%) − 30,000 half personal = 40,000 → 0
    const e = estimate({ thaiIncomeEntries: [createIncomeEntry({ grossAmount: 100000 })] });
    expect(e.allowances).toBe(30000);
    expect(e.netIncome).toBe(40000);
    expect(e.grossIncomeTax).toBe(0);
    expect(e.provisionalTax).toBe(0);
  });

  it('the 0.5% minimum applies from 120,000 and wins when the net-income tax is lower', () => {
    // 200,000 − 60,000 − 30,000 = 110,000 → 0 net tax; 0.5% × 200,000 = 1,000
    const e = estimate({ thaiIncomeEntries: [createIncomeEntry({ grossAmount: 200000 })] });
    expect(e.netIncomeTax).toBe(0);
    expect(e.grossIncomeTax).toBe(1000);
    expect(e.provisionalTax).toBe(1000);
    expect(estimate({ thaiIncomeEntries: [createIncomeEntry({ grossAmount: 120000 })] }).grossIncomeTax).toBe(600);
    expect(estimate({ thaiIncomeEntries: [createIncomeEntry({ grossAmount: 119999 })] }).grossIncomeTax).toBe(0);
  });

  it('uses the ordinary full-year rates on half-year net income', () => {
    // 500,000 − 150,000 − 30,000 = 320,000 → 7,500 + 20,000 × 10% = 9,500 (> 2,500 minimum)
    const e = estimate({ thaiIncomeEntries: [createIncomeEntry({ grossAmount: 500000 })] });
    expect(e.netIncome).toBe(320000);
    expect(e.provisionalTax).toBe(9500);
  });

  it('halves spouse, child and parent allowances too', () => {
    // annual 60k + 60k + (30k + 60k children) + 30k parent = 240k → half 120k
    // 600,000 40(8) − 360,000 (60%) − 120,000 = 120,000 → 0; minimum 3,000
    const e = estimate({
      maritalStatus: 'married',
      spouseHasNoIncome: true,
      children: [{ birthYear: 2015 }, { birthYear: 2019 }],
      numberOfParents: 1,
      thaiIncomeEntries: [createIncomeEntry({ grossAmount: 600000, incomeType: 'business_sales_40_8' })],
    });
    expect(e.allowances).toBe(120000);
    expect(e.netIncome).toBe(120000);
    expect(e.provisionalTax).toBe(3000);
  });

  it('applies the 65+ exemption to the lowest-rate income first', () => {
    // 100k building rent (30%) fully exempt, then 90k of the 300k 40(8) (60%).
    // Left: 210,000 of 40(8) → expenses 126,000; − 30,000 = 54,000 → 0; minimum 1,050
    const e = estimate({
      isAge65OrOlder: true,
      thaiIncomeEntries: [
        createIncomeEntry({ grossAmount: 100000, incomeType: 'rental_40_5' }),
        createIncomeEntry({ grossAmount: 300000, incomeType: 'business_sales_40_8' }),
      ],
    });
    expect(e.seniorExemption).toBe(190000);
    expect(e.assessableIncome).toBe(210000);
    expect(e.expenseDeduction).toBeCloseTo(126000, 6);
    expect(e.provisionalTax).toBe(1050);
  });

  it('rental expense rate follows the property kind', () => {
    // land: 400,000 − 60,000 (15%) − 30,000 = 310,000 → 8,500; building: − 120,000 (30%) → 250,000 → 5,000
    const land = estimate({ thaiIncomeEntries: [createIncomeEntry({ grossAmount: 400000, incomeType: 'rental_40_5', rentalPropertyKind: 'other_land' })] });
    const building = estimate({ thaiIncomeEntries: [createIncomeEntry({ grossAmount: 400000, incomeType: 'rental_40_5' })] });
    expect(land.provisionalTax).toBe(8500);
    expect(building.provisionalTax).toBe(5000);
  });

  it('ignores July–December income, salary and dividends', () => {
    const e = estimate({
      thaiIncomeEntries: [
        createIncomeEntry({ grossAmount: 900000, monthReceived: 7 }),
        createIncomeEntry({ grossAmount: 900000, incomeType: 'salary_40_1', monthReceived: 2 }),
        createIncomeEntry({ grossAmount: 900000, incomeType: 'dividend', monthReceived: 2 }),
      ],
    });
    expect(e.halfYearIncome).toBe(0);
    expect(e.provisionalTax).toBe(0);
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

  it('sums business income from every month', () => {
    const entries: ThaiIncomeEntry[] = [
      createIncomeEntry({ grossAmount: 500000, monthReceived: 3 }),
      createIncomeEntry({ grossAmount: 800000, monthReceived: 9 }),
    ];
    expect(calculateAnnualTurnover(entries)).toBe(1300000);
  });

  it('excludes salary (40(1)) and dividends, which are not VAT turnover', () => {
    const entries: ThaiIncomeEntry[] = [
      createIncomeEntry({ grossAmount: 500000, monthReceived: 3 }),
      createIncomeEntry({ grossAmount: 600000, incomeType: 'salary_40_1', monthReceived: 6 }),
      createIncomeEntry({ grossAmount: 900000, incomeType: 'dividend', monthReceived: 4 }),
    ];
    expect(calculateAnnualTurnover(entries)).toBe(500000);
  });

  it('excludes rent from buildings and land (VAT-exempt) but counts vehicle and other-property rent', () => {
    // Revenue Code s.81(1)(r): rental of immovable property is VAT-exempt
    const entries: ThaiIncomeEntry[] = [
      createIncomeEntry({ grossAmount: 1000000, incomeType: 'rental_40_5' }), // building (default)
      createIncomeEntry({ grossAmount: 1000000, incomeType: 'rental_40_5', rentalPropertyKind: 'agricultural_land' }),
      createIncomeEntry({ grossAmount: 1000000, incomeType: 'rental_40_5', rentalPropertyKind: 'other_land' }),
      createIncomeEntry({ grossAmount: 300000, incomeType: 'rental_40_5', rentalPropertyKind: 'vehicle' }),
      createIncomeEntry({ grossAmount: 200000, incomeType: 'rental_40_5', rentalPropertyKind: 'other_property' }),
    ];
    expect(calculateAnnualTurnover(entries)).toBe(500000);
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

  it('is not required at exactly the threshold, and required one baht above it', () => {
    // Revenue Code s.81/1: a tax base "not exceeding" the small-business amount is exempt
    const at = checkVATRegistration(createFreelancerFormData({ thaiIncomeEntries: [createIncomeEntry({ grossAmount: 1800000 })] }));
    expect(at.required).toBe(false);
    expect(at.turnover).toBe(1800000);
    const above = checkVATRegistration(createFreelancerFormData({ thaiIncomeEntries: [createIncomeEntry({ grossAmount: 1800001 })] }));
    expect(above.required).toBe(true);
    expect(above.mustRegisterWithinDays).toBe(30);
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
