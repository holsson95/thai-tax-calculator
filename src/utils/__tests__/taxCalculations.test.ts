import { describe, it, expect } from 'vitest';
import {
  calculateAllowances,
  calculateDeductions,
  calculateAnnualTax,
  calculateChildAllowance,
  formatThb,
  formatPercent,
} from '../taxCalculations';
import { TaxFormData, TAX_CONSTANTS } from '../../types/taxForm';

function createBaseFormData(overrides: Partial<TaxFormData> = {}): TaxFormData {
  return {
    employmentType: 'salaried',
    annualIncome: 0,
    includeSocialSecurity: false,
    socialSecurityContribution: 0,
    maritalStatus: 'single',
    spouseHasNoIncome: false,
    isAge65OrOlder: false,
    children: [],
    childrenEligibilityConfirmed: false,
    numberOfParents: 0,
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
    taxWithheld: 0,
    ...overrides,
  };
}

describe('calculateChildAllowance', () => {
  it('returns 0 for no children', () => {
    expect(calculateChildAllowance([])).toBe(0);
  });

  it('returns base allowance for single child', () => {
    const children = [{ birthYear: 2020 }];
    expect(calculateChildAllowance(children)).toBe(30000);
  });

  it('applies bonus for 2nd+ child born 2018 or later', () => {
    const children = [
      { birthYear: 2015 }, // 1st child, no bonus regardless of year
      { birthYear: 2020 }, // 2nd child born 2018+, gets bonus
    ];
    // 30,000 + 30,000 + 30,000 (bonus) = 90,000
    expect(calculateChildAllowance(children)).toBe(90000);
  });

  it('does not apply bonus for 2nd+ child born before 2018', () => {
    const children = [
      { birthYear: 2010 },
      { birthYear: 2015 }, // 2nd child but born before 2018
    ];
    // 30,000 + 30,000 = 60,000 (no bonus)
    expect(calculateChildAllowance(children)).toBe(60000);
  });

  it('applies bonus to all eligible children after first', () => {
    const children = [
      { birthYear: 2015 }, // 1st - no bonus
      { birthYear: 2018 }, // 2nd born 2018+ - bonus
      { birthYear: 2020 }, // 3rd born 2018+ - bonus
    ];
    // 30,000 + 60,000 + 60,000 = 150,000
    expect(calculateChildAllowance(children)).toBe(150000);
  });
});

describe('calculateAllowances', () => {
  it('returns personal allowance for single person with no dependents', () => {
    const formData = createBaseFormData();
    expect(calculateAllowances(formData)).toBe(TAX_CONSTANTS.PERSONAL_ALLOWANCE);
  });

  it('includes spouse allowance only if married AND spouse has no income', () => {
    // Married but spouse has income - no spouse allowance
    const marriedWithSpouseIncome = createBaseFormData({
      maritalStatus: 'married',
      spouseHasNoIncome: false,
    });
    expect(calculateAllowances(marriedWithSpouseIncome)).toBe(60000);

    // Married and spouse has no income - gets spouse allowance
    const marriedNoSpouseIncome = createBaseFormData({
      maritalStatus: 'married',
      spouseHasNoIncome: true,
    });
    expect(calculateAllowances(marriedNoSpouseIncome)).toBe(120000);
  });

  it('includes parent allowance up to max 4 parents', () => {
    const formData = createBaseFormData({ numberOfParents: 2 });
    expect(calculateAllowances(formData)).toBe(60000 + 60000); // personal + 2 parents

    // Test cap at 4 parents
    const tooManyParents = createBaseFormData({ numberOfParents: 6 });
    expect(calculateAllowances(tooManyParents)).toBe(60000 + 120000); // personal + max 4 parents
  });
});

describe('calculateDeductions', () => {
  it('caps life insurance at maximum', () => {
    const formData = createBaseFormData({
      hasLifeInsurance: true,
      lifeInsurance: 200000, // Over the 100,000 max
    });
    const breakdown = calculateDeductions(formData, 500000);
    expect(breakdown.lifeInsurance).toBe(TAX_CONSTANTS.MAX_LIFE_INSURANCE);
  });

  it('caps health insurance at maximum', () => {
    const formData = createBaseFormData({
      hasHealthInsurance: true,
      healthInsurance: 50000, // Over the 25,000 max
    });
    const breakdown = calculateDeductions(formData, 500000);
    expect(breakdown.healthInsurance).toBe(TAX_CONSTANTS.MAX_HEALTH_INSURANCE);
  });

  it('caps retirement funds at their maximums', () => {
    const formData = createBaseFormData({
      hasPensionFund: true,
      pensionFund: 600000,
      hasProvidentFund: true,
      providentFund: 600000,
      hasRMF: true,
      rmf: 600000,
      hasSSF: true,
      ssf: 300000,
    });
    const breakdown = calculateDeductions(formData, 2000000);
    expect(breakdown.pensionFund).toBe(TAX_CONSTANTS.MAX_PENSION_FUND);
    expect(breakdown.providentFund).toBe(TAX_CONSTANTS.MAX_PROVIDENT_FUND);
    expect(breakdown.rmf).toBe(TAX_CONSTANTS.MAX_RMF);
    expect(breakdown.ssf).toBe(TAX_CONSTANTS.MAX_SSF);
  });

  it('limits donations to 10% of taxable income before donations', () => {
    const formData = createBaseFormData({
      hasDonations: true,
      donations: 100000,
    });
    // If taxable income before donations is 500,000, max donation is 50,000
    const breakdown = calculateDeductions(formData, 500000);
    expect(breakdown.donations).toBe(50000);
  });

  it('allows full donation if under 10% limit', () => {
    const formData = createBaseFormData({
      hasDonations: true,
      donations: 30000,
    });
    const breakdown = calculateDeductions(formData, 500000);
    expect(breakdown.donations).toBe(30000);
  });

  it('returns 0 for deductions when checkbox is unchecked', () => {
    const formData = createBaseFormData({
      hasLifeInsurance: false,
      lifeInsurance: 100000,
      hasHealthInsurance: false,
      healthInsurance: 25000,
    });
    const breakdown = calculateDeductions(formData, 500000);
    expect(breakdown.lifeInsurance).toBe(0);
    expect(breakdown.healthInsurance).toBe(0);
  });
});

describe('calculateAnnualTax', () => {
  it('calculates tax for single person with 500k income and no deductions', () => {
    const formData = createBaseFormData({
      annualIncome: 500000,
    });

    const result = calculateAnnualTax(formData);

    // Income: 500,000
    // Standard deduction: 100,000 (50% of 500k, capped at 100k)
    // Allowances: 60,000 (personal)
    // Taxable: 500,000 - 100,000 - 60,000 = 340,000
    // Tax: 0 (first 150k) + 7,500 (5% of 150k) + 4,000 (10% of 40k) = 11,500
    expect(result.grossIncome).toBe(500000);
    expect(result.totalAllowances).toBe(60000);
    expect(result.taxableIncome).toBe(340000);
    expect(result.taxOwed).toBe(11500);
  });

  it('calculates tax for married person with 1M income and 2 children', () => {
    const formData = createBaseFormData({
      annualIncome: 1000000,
      maritalStatus: 'married',
      spouseHasNoIncome: true,
      children: [
        { birthYear: 2015 }, // 1st child - 30,000
        { birthYear: 2020 }, // 2nd child born 2018+ - 60,000
      ],
    });

    const result = calculateAnnualTax(formData);

    // Income: 1,000,000
    // Standard deduction: 100,000
    // Allowances: 60,000 (personal) + 60,000 (spouse) + 90,000 (children) = 210,000
    // Taxable: 1,000,000 - 100,000 - 210,000 = 690,000
    // Tax: 0 (150k) + 7,500 (150k at 5%) + 20,000 (200k at 10%) + 28,500 (190k at 15%) = 56,000
    expect(result.totalAllowances).toBe(210000);
    expect(result.taxableIncome).toBe(690000);
    expect(result.taxOwed).toBe(56000);
  });

  it('calculates tax with max deductions scenario', () => {
    const formData = createBaseFormData({
      annualIncome: 2000000,
      maritalStatus: 'married',
      spouseHasNoIncome: true,
      children: [{ birthYear: 2020 }],
      numberOfParents: 4,
      hasLifeInsurance: true,
      lifeInsurance: 150000, // Will be capped at 100,000
      hasHealthInsurance: true,
      healthInsurance: 30000, // Will be capped at 25,000
      hasPensionFund: true,
      pensionFund: 500000,
      hasProvidentFund: true,
      providentFund: 500000,
      hasRMF: true,
      rmf: 500000,
      hasSSF: true,
      ssf: 200000,
    });

    const result = calculateAnnualTax(formData);

    // Standard deduction: 100,000
    // Allowances: 60,000 + 60,000 + 30,000 + 120,000 = 270,000
    // Income after standard + allowances: 2,000,000 - 100,000 - 270,000 = 1,630,000
    // Other deductions: 100,000 + 25,000 + 500,000 + 500,000 + 500,000 + 200,000 = 1,825,000
    // Taxable: max(0, 1,630,000 - 1,825,000) = 0
    expect(result.totalAllowances).toBe(270000);
    expect(result.taxableIncome).toBe(0); // Deductions exceed income after allowances
    expect(result.taxOwed).toBe(0);
  });

  it('calculates refund when tax withheld exceeds tax owed', () => {
    const formData = createBaseFormData({
      annualIncome: 500000,
      taxWithheld: 30000,
    });

    const result = calculateAnnualTax(formData);

    // Tax owed: 11,500 (with standard deduction)
    // Withheld: 30,000
    // Refund: 30,000 - 11,500 = 18,500
    expect(result.refundOrOwed).toBe(18500);
  });

  it('calculates additional tax owed when withheld is less than owed', () => {
    const formData = createBaseFormData({
      annualIncome: 500000,
      taxWithheld: 10000,
    });

    const result = calculateAnnualTax(formData);

    // Tax owed: 11,500 (with standard deduction)
    // Withheld: 10,000
    // Owed: 10,000 - 11,500 = -1,500
    expect(result.refundOrOwed).toBe(-1500);
  });

  it('calculates effective tax rate correctly', () => {
    const formData = createBaseFormData({
      annualIncome: 500000,
    });

    const result = calculateAnnualTax(formData);

    // Tax: 11,500 / Income: 500,000 = 2.3%
    expect(result.effectiveRate).toBeCloseTo(2.3, 1);
  });

  it('handles zero income', () => {
    const formData = createBaseFormData({
      annualIncome: 0,
    });

    const result = calculateAnnualTax(formData);

    expect(result.taxableIncome).toBe(0);
    expect(result.taxOwed).toBe(0);
    expect(result.effectiveRate).toBe(0);
  });
});

describe('formatThb', () => {
  it('formats number as Thai Baht', () => {
    const formatted = formatThb(1234567);
    expect(formatted).toContain('1,234,567');
    expect(formatted).toMatch(/THB|฿/);
  });

  it('formats zero correctly', () => {
    const formatted = formatThb(0);
    expect(formatted).toContain('0');
  });
});

describe('formatPercent', () => {
  it('formats number as percentage with 2 decimal places', () => {
    expect(formatPercent(4.3)).toBe('4.30%');
    expect(formatPercent(10)).toBe('10.00%');
    expect(formatPercent(0.5)).toBe('0.50%');
  });
});
