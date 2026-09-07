import { describe, it, expect } from 'vitest';
import {
  isForeignIncomeTaxable,
  calculateForeignTaxCredit,
  analyzeForeignIncome,
  isThaiTaxResident,
  hasLTRForeignIncomeExemption,
  hasLTRFlatRateBenefit,
  validateForeignIncomeEntry,
  calculateForeignIncomeSummary,
} from '../foreignIncomeCalculations';
import {
  ForeignIncomeEntry,
  FreelancerFormData,
  createDefaultFreelancerFormData,
  generateEntryId,
} from '../../types/freelancerForm';

function createForeignIncomeEntry(overrides: Partial<ForeignIncomeEntry> = {}): ForeignIncomeEntry {
  return {
    id: generateEntryId(),
    amount: 10000,
    currency: 'USD',
    amountThb: 350000,
    dateEarned: '2024-03-01',
    dateRemitted: '2024-04-15',
    foreignTaxPaid: 0,
    description: 'Foreign work',
    country: 'USA',
    ...overrides,
  };
}

describe('isThaiTaxResident', () => {
  it('is false just under the 180-day threshold', () => {
    expect(isThaiTaxResident(179)).toBe(false);
  });

  it('is true exactly at the 180-day threshold', () => {
    expect(isThaiTaxResident(180)).toBe(true);
  });

  it('is true well above the threshold', () => {
    expect(isThaiTaxResident(365)).toBe(true);
  });

  it('is false for zero days', () => {
    expect(isThaiTaxResident(0)).toBe(false);
  });
});

describe('hasLTRForeignIncomeExemption / hasLTRFlatRateBenefit', () => {
  it('exempts the three foreign-income LTR visa types', () => {
    expect(hasLTRForeignIncomeExemption('ltr_wealthy_global')).toBe(true);
    expect(hasLTRForeignIncomeExemption('ltr_wealthy_pensioner')).toBe(true);
    expect(hasLTRForeignIncomeExemption('ltr_work_from_thailand')).toBe(true);
  });

  it('does not exempt regular or LTR highly skilled visas', () => {
    expect(hasLTRForeignIncomeExemption('regular')).toBe(false);
    expect(hasLTRForeignIncomeExemption('ltr_highly_skilled')).toBe(false);
  });

  it('only the highly skilled LTR visa gets the flat-rate benefit', () => {
    expect(hasLTRFlatRateBenefit('ltr_highly_skilled')).toBe(true);
    expect(hasLTRFlatRateBenefit('regular')).toBe(false);
    expect(hasLTRFlatRateBenefit('ltr_wealthy_global')).toBe(false);
  });
});

describe('isForeignIncomeTaxable', () => {
  it('is taxable when resident, earned 2024+, and remitted', () => {
    const entry = createForeignIncomeEntry();
    const result = isForeignIncomeTaxable(entry, true, 'regular');
    expect(result.isTaxable).toBe(true);
    expect(result.taxableAmount).toBe(entry.amountThb);
  });

  it('is not taxable for non-residents', () => {
    const entry = createForeignIncomeEntry();
    const result = isForeignIncomeTaxable(entry, false, 'regular');
    expect(result.isTaxable).toBe(false);
    expect(result.taxableAmount).toBe(0);
  });

  it('is exempt for LTR foreign-income-exempt visa holders even if resident and remitted', () => {
    const entry = createForeignIncomeEntry();
    const result = isForeignIncomeTaxable(entry, true, 'ltr_wealthy_global');
    expect(result.isTaxable).toBe(false);
    expect(result.reason).toMatch(/LTR/);
  });

  it('is not taxable when income was earned before 2024-01-01', () => {
    const entry = createForeignIncomeEntry({ dateEarned: '2023-12-31' });
    const result = isForeignIncomeTaxable(entry, true, 'regular');
    expect(result.isTaxable).toBe(false);
  });

  it('is taxable exactly on the 2024-01-01 cutoff', () => {
    const entry = createForeignIncomeEntry({ dateEarned: '2024-01-01' });
    const result = isForeignIncomeTaxable(entry, true, 'regular');
    expect(result.isTaxable).toBe(true);
  });

  it('is not taxable when not remitted to Thailand', () => {
    const entry = createForeignIncomeEntry({ dateRemitted: null });
    const result = isForeignIncomeTaxable(entry, true, 'regular');
    expect(result.isTaxable).toBe(false);
    expect(result.reason).toMatch(/not remitted|not taxable until remitted/i);
  });

  it('is not taxable when no date earned is specified', () => {
    const entry = createForeignIncomeEntry({ dateEarned: '' });
    const result = isForeignIncomeTaxable(entry, true, 'regular');
    expect(result.isTaxable).toBe(false);
  });

  it('applies DTA pension exemption for US Social Security under Article 20(2)', () => {
    const entry = createForeignIncomeEntry({
      country: 'United States',
      isPension: true,
      pensionType: 'social_security',
    });
    const result = isForeignIncomeTaxable(entry, true, 'regular');
    expect(result.isTaxable).toBe(false);
    expect(result.dtaPensionExempt).toBe(true);
    expect(result.dtaExemptionArticle).toBe('Article 20(2)');
  });

  it('does not apply pension exemption for a pension type/country combo not in the DTA table', () => {
    const entry = createForeignIncomeEntry({
      country: 'USA', // not the exact DTA country name ('United States')
      isPension: true,
      pensionType: 'social_security',
    });
    const result = isForeignIncomeTaxable(entry, true, 'regular');
    expect(result.dtaPensionExempt).toBeUndefined();
    expect(result.isTaxable).toBe(true);
  });
});

describe('calculateForeignTaxCredit', () => {
  it('gives zero credit when no foreign tax was paid', () => {
    const entry = createForeignIncomeEntry({ foreignTaxPaid: 0, country: 'USA' });
    const result = calculateForeignTaxCredit(entry);
    expect(result.credit).toBe(0);
    expect(result.creditAllowed).toBe(true);
  });

  it('allows the credit when a DTA exists with the source country', () => {
    const entry = createForeignIncomeEntry({ foreignTaxPaid: 20000, country: 'United Kingdom' });
    const result = calculateForeignTaxCredit(entry);
    expect(result.creditAllowed).toBe(true);
    expect(result.credit).toBe(20000);
    expect(result.creditDisallowed).toBe(0);
  });

  it('disallows the credit when no DTA exists with the source country', () => {
    const entry = createForeignIncomeEntry({ foreignTaxPaid: 20000, country: 'Brazil' });
    const result = calculateForeignTaxCredit(entry);
    expect(result.hasDTA).toBe(false);
    expect(result.creditAllowed).toBe(false);
    expect(result.credit).toBe(0);
    expect(result.creditDisallowed).toBe(20000);
  });
});

function createFreelancerFormData(overrides: Partial<FreelancerFormData> = {}): FreelancerFormData {
  return {
    ...createDefaultFreelancerFormData(),
    ...overrides,
  };
}

describe('analyzeForeignIncome', () => {
  it('aggregates taxable and non-taxable entries correctly', () => {
    const formData = createFreelancerFormData({
      isThaiResident: true,
      visaType: 'regular',
      foreignIncomeEntries: [
        createForeignIncomeEntry({ amountThb: 300000, dateRemitted: '2024-05-01' }), // taxable
        createForeignIncomeEntry({ amountThb: 200000, dateRemitted: null }), // not remitted
        createForeignIncomeEntry({ amountThb: 100000, dateEarned: '2023-01-01', dateRemitted: '2024-01-01' }), // pre-2024
      ],
    });

    const result = analyzeForeignIncome(formData);
    expect(result.totalForeignIncome).toBe(600000);
    expect(result.taxableForeignIncome).toBe(300000);
    expect(result.entries).toHaveLength(3);
  });

  it('flags hasMissingDTA when a taxable entry has no treaty with its source country', () => {
    const formData = createFreelancerFormData({
      isThaiResident: true,
      visaType: 'regular',
      foreignIncomeEntries: [
        createForeignIncomeEntry({ amountThb: 300000, country: 'Brazil', foreignTaxPaid: 10000 }),
      ],
    });

    const result = analyzeForeignIncome(formData);
    expect(result.hasMissingDTA).toBe(true);
    expect(result.totalDTACreditDisallowed).toBe(10000);
  });

  it('applies LTR exemption to all entries when visa qualifies', () => {
    const formData = createFreelancerFormData({
      isThaiResident: true,
      visaType: 'ltr_wealthy_global',
      foreignIncomeEntries: [createForeignIncomeEntry({ amountThb: 500000 })],
    });

    const result = analyzeForeignIncome(formData);
    expect(result.ltrExemptionApplied).toBe(true);
    expect(result.taxableForeignIncome).toBe(0);
  });

  it('returns all zeros for no foreign income entries', () => {
    const formData = createFreelancerFormData({ isThaiResident: true, foreignIncomeEntries: [] });
    const result = analyzeForeignIncome(formData);
    expect(result.totalForeignIncome).toBe(0);
    expect(result.taxableForeignIncome).toBe(0);
  });
});

describe('validateForeignIncomeEntry', () => {
  it('flags a zero/negative amount as invalid', () => {
    expect(validateForeignIncomeEntry(createForeignIncomeEntry({ amount: 0 })).isValid).toBe(false);
    expect(validateForeignIncomeEntry(createForeignIncomeEntry({ amountThb: 0 })).isValid).toBe(false);
  });

  it('flags a future date earned as invalid', () => {
    const future = new Date();
    future.setFullYear(future.getFullYear() + 1);
    const result = validateForeignIncomeEntry(
      createForeignIncomeEntry({ dateEarned: future.toISOString().split('T')[0] })
    );
    expect(result.isValid).toBe(false);
  });

  it('flags a remitted date before the earned date as invalid', () => {
    const result = validateForeignIncomeEntry(
      createForeignIncomeEntry({ dateEarned: '2024-06-01', dateRemitted: '2024-01-01' })
    );
    expect(result.isValid).toBe(false);
  });

  it('flags a missing country as invalid', () => {
    const result = validateForeignIncomeEntry(createForeignIncomeEntry({ country: '' }));
    expect(result.isValid).toBe(false);
  });

  it('flags negative foreign tax paid as invalid', () => {
    const result = validateForeignIncomeEntry(createForeignIncomeEntry({ foreignTaxPaid: -100 }));
    expect(result.isValid).toBe(false);
  });

  it('passes for a well-formed entry', () => {
    const result = validateForeignIncomeEntry(createForeignIncomeEntry());
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});

describe('calculateForeignIncomeSummary', () => {
  it('summarizes taxable vs non-taxable entries and effective foreign tax rate', () => {
    const entries = [
      createForeignIncomeEntry({ amountThb: 300000, foreignTaxPaid: 30000, dateRemitted: '2024-05-01' }),
      createForeignIncomeEntry({ amountThb: 100000, foreignTaxPaid: 0, dateRemitted: null }),
    ];
    const summary = calculateForeignIncomeSummary(entries, true, 'regular');

    expect(summary.totalEntries).toBe(2);
    expect(summary.taxableEntries).toBe(1);
    expect(summary.nonTaxableEntries).toBe(1);
    expect(summary.totalIncome).toBe(400000);
    expect(summary.taxableIncome).toBe(300000);
    expect(summary.nonTaxableIncome).toBe(100000);
    expect(summary.totalForeignTax).toBe(30000);
    expect(summary.effectiveForeignTaxRate).toBeCloseTo((30000 / 400000) * 100, 5);
  });

  it('returns zeros for an empty entry list', () => {
    const summary = calculateForeignIncomeSummary([], true, 'regular');
    expect(summary.totalEntries).toBe(0);
    expect(summary.effectiveForeignTaxRate).toBe(0);
  });
});
