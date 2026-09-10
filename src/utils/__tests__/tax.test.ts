import { describe, it, expect } from 'vitest';
import { calculateThaiTax, getTaxByBracket, getMarginalRate } from '../tax';

describe('calculateThaiTax', () => {
  it('returns 0 for zero or negative income', () => {
    expect(calculateThaiTax(0)).toBe(0);
    expect(calculateThaiTax(-1000)).toBe(0);
  });

  it('is fully exempt below the first bracket threshold', () => {
    expect(calculateThaiTax(150000)).toBe(0);
  });

  // Boundary tests at each bracket transition point.
  // Bracket schedule (TAX_BRACKETS in src/types/taxForm.ts):
  // 0-150k: 0%, 150k-300k: 5%, 300k-500k: 10%, 500k-750k: 15%,
  // 750k-1M: 20%, 1M-2M: 25%, 2M-5M: 30%, 5M+: 35%
  it('taxes exactly at the 150k -> 300k boundary correctly', () => {
    // 150,000 exempt + 1 baht at 5%
    expect(calculateThaiTax(150001)).toBeCloseTo(0.05, 5);
    // Full 150k-300k bracket taxed at 5%
    expect(calculateThaiTax(300000)).toBeCloseTo(150000 * 0.05, 5);
  });

  it('taxes exactly at the 300k -> 500k boundary correctly', () => {
    expect(calculateThaiTax(300001)).toBeCloseTo(150000 * 0.05 + 0.1, 5);
    expect(calculateThaiTax(500000)).toBeCloseTo(
      150000 * 0.05 + 200000 * 0.1,
      5
    );
  });

  it('taxes exactly at the 500k -> 750k boundary correctly', () => {
    const taxAt500k = 150000 * 0.05 + 200000 * 0.1;
    expect(calculateThaiTax(500001)).toBeCloseTo(taxAt500k + 0.15, 5);
    expect(calculateThaiTax(750000)).toBeCloseTo(taxAt500k + 250000 * 0.15, 5);
  });

  it('taxes exactly at the 750k -> 1M boundary correctly', () => {
    const taxAt750k = 150000 * 0.05 + 200000 * 0.1 + 250000 * 0.15;
    expect(calculateThaiTax(750001)).toBeCloseTo(taxAt750k + 0.2, 5);
    expect(calculateThaiTax(1000000)).toBeCloseTo(
      taxAt750k + 250000 * 0.2,
      5
    );
  });

  it('taxes exactly at the 1M -> 2M boundary correctly', () => {
    const taxAt1M = 150000 * 0.05 + 200000 * 0.1 + 250000 * 0.15 + 250000 * 0.2;
    expect(calculateThaiTax(1000001)).toBeCloseTo(taxAt1M + 0.25, 5);
    expect(calculateThaiTax(2000000)).toBeCloseTo(taxAt1M + 1000000 * 0.25, 5);
  });

  it('taxes exactly at the 2M -> 5M boundary correctly', () => {
    const taxAt2M =
      150000 * 0.05 + 200000 * 0.1 + 250000 * 0.15 + 250000 * 0.2 + 1000000 * 0.25;
    expect(calculateThaiTax(2000001)).toBeCloseTo(taxAt2M + 0.3, 5);
    expect(calculateThaiTax(5000000)).toBeCloseTo(taxAt2M + 3000000 * 0.3, 5);
  });

  it('taxes income above 5M at the top 35% rate', () => {
    const taxAt5M =
      150000 * 0.05 +
      200000 * 0.1 +
      250000 * 0.15 +
      250000 * 0.2 +
      1000000 * 0.25 +
      3000000 * 0.3;
    expect(calculateThaiTax(5000001)).toBeCloseTo(taxAt5M + 0.35, 5);
    expect(calculateThaiTax(10000000)).toBeCloseTo(taxAt5M + 5000000 * 0.35, 5);
  });
});

describe('getTaxByBracket', () => {
  it('returns an empty array for zero or negative income', () => {
    expect(getTaxByBracket(0)).toEqual([]);
    expect(getTaxByBracket(-1000)).toEqual([]);
  });

  it('returns a single zero-rate line for income fully within the exempt bracket', () => {
    const result = getTaxByBracket(100000);
    expect(result).toEqual([
      { label: '0-150k', rate: 0, taxableAmount: 100000, tax: 0 },
    ]);
  });

  it('only includes brackets with a nonzero taxable amount, in order', () => {
    const result = getTaxByBracket(600000);
    expect(result).toEqual([
      { label: '0-150k', rate: 0, taxableAmount: 150000, tax: 0 },
      { label: '150k-300k', rate: 0.05, taxableAmount: 150000, tax: 7500 },
      { label: '300k-500k', rate: 0.1, taxableAmount: 200000, tax: 20000 },
      { label: '500k-750k', rate: 0.15, taxableAmount: 100000, tax: 15000 },
    ]);
  });

  it('sums to the same total as calculateThaiTax for a range of incomes', () => {
    for (const income of [0, 1, 150000, 400000, 999000, 1001000, 2000000, 5000000, 12345678]) {
      const sum = getTaxByBracket(income).reduce((acc, b) => acc + b.tax, 0);
      expect(sum).toBeCloseTo(calculateThaiTax(income), 5);
    }
  });
});

describe('getMarginalRate', () => {
  it('returns 0 for income at or below the exempt threshold', () => {
    expect(getMarginalRate(0)).toBe(0);
    expect(getMarginalRate(150000)).toBe(0);
  });

  it('returns the rate of the bracket containing the last baht of income', () => {
    expect(getMarginalRate(150001)).toBe(0.05);
    expect(getMarginalRate(600000)).toBe(0.15);
    expect(getMarginalRate(1000000)).toBe(0.2);
    expect(getMarginalRate(1000001)).toBe(0.25);
    expect(getMarginalRate(5000000)).toBe(0.3);
    expect(getMarginalRate(5000001)).toBe(0.35);
  });
});
