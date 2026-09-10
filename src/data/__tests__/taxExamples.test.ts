import { describe, it, expect } from 'vitest';
import { taxExamples } from '../taxExamples';
import { calculateThaiTax, getMarginalRate } from '../../utils/tax';

describe('taxExamples', () => {
  it('has 11 examples (10 concepts; the bracket-threshold concept needs a below/above pair) with unique ids', () => {
    expect(taxExamples).toHaveLength(11);
    const ids = taxExamples.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every example is tax year 2026 and cites a source', () => {
    for (const example of taxExamples) {
      expect(example.taxYear).toBe(2026);
      expect(example.source.label.length).toBeGreaterThan(0);
      expect(example.source.url.length).toBeGreaterThan(0);
    }
  });

  it('every example bracket breakdown sums to taxOwed and matches calculateThaiTax', () => {
    for (const example of taxExamples) {
      const bracketSum = example.bracketBreakdown.reduce((acc, b) => acc + b.tax, 0);
      expect(bracketSum).toBeCloseTo(example.taxOwed, 2);
      expect(example.taxOwed).toBeCloseTo(calculateThaiTax(example.taxableIncome), 2);
    }
  });

  it('every example marginal rate matches getMarginalRate(taxableIncome)', () => {
    for (const example of taxExamples) {
      expect(example.marginalRatePercent).toBeCloseTo(getMarginalRate(example.taxableIncome) * 100, 5);
    }
  });

  it('lower-income employee example (taxable 400,000) matches the published brackets article numbers', () => {
    const example = taxExamples.find((e) => e.id === 'lower-income-employee')!;
    expect(example.taxableIncome).toBe(400000);
    expect(example.taxOwed).toBeCloseTo(17500, 2);
    expect(example.marginalRatePercent).toBe(10);
    expect(example.effectiveRatePercent).toBeCloseTo(4.38, 2);
  });

  it('middle-income employee example (taxable 1,000,000) matches the published brackets article numbers', () => {
    const example = taxExamples.find((e) => e.id === 'middle-income-employee')!;
    expect(example.taxableIncome).toBe(1000000);
    expect(example.taxOwed).toBeCloseTo(115000, 2);
    expect(example.marginalRatePercent).toBe(20);
    expect(example.effectiveRatePercent).toBeCloseTo(11.5, 3);
  });

  it('high-income employee example (taxable 5,000,000) matches the published brackets article numbers', () => {
    const example = taxExamples.find((e) => e.id === 'high-income-employee')!;
    expect(example.taxableIncome).toBe(5000000);
    expect(example.taxOwed).toBeCloseTo(1265000, 2);
    expect(example.marginalRatePercent).toBe(30);
    expect(example.effectiveRatePercent).toBeCloseTo(25.3, 3);
  });

  it('bracket threshold pair (999,000 vs 1,001,000) shows only the extra income taxed at the new rate', () => {
    const below = taxExamples.find((e) => e.id === 'bracket-threshold-below')!;
    const above = taxExamples.find((e) => e.id === 'bracket-threshold-above')!;
    expect(below.taxableIncome).toBe(999000);
    expect(below.taxOwed).toBeCloseTo(114800, 2);
    expect(above.taxableIncome).toBe(1001000);
    expect(above.taxOwed).toBeCloseTo(115250, 2);
    // Only the 2,000 THB above the threshold should generate the extra tax —
    // not the whole 1,001,000 being taxed at the new marginal rate.
    expect(above.taxOwed - below.taxOwed).toBeCloseTo(450, 2);
  });

  it('simple employee example (gross 800,000, single, no extra deductions) is computed via calculateAnnualTax', () => {
    const example = taxExamples.find((e) => e.id === 'simple-employee')!;
    expect(example.grossIncome).toBe(800000);
    expect(example.taxableIncome).toBeCloseTo(640000, 2);
    expect(example.taxOwed).toBeCloseTo(48500, 2);
    expect(example.marginalRatePercent).toBe(15);
    expect(example.effectiveRatePercent).toBeCloseTo(6.06, 2);
  });

  it('deductions-impact example shows the same gross income before/after an insurance + provident fund contribution', () => {
    const example = taxExamples.find((e) => e.id === 'deductions-impact')!;
    expect(example.grossIncome).toBe(800000);
    expect(example.before).toBeDefined();
    expect(example.before!.taxableIncome).toBeCloseTo(640000, 2);
    expect(example.before!.taxOwed).toBeCloseTo(48500, 2);
    expect(example.taxableIncome).toBeCloseTo(565000, 2);
    expect(example.taxOwed).toBeCloseTo(37250, 2);
    expect(example.before!.taxOwed - example.taxOwed).toBeCloseTo(11250, 2);
  });

  it('calculator walkthrough example (married, 1 child, gross 1,200,000) is computed via calculateAnnualTax', () => {
    const example = taxExamples.find((e) => e.id === 'calculator-walkthrough')!;
    expect(example.grossIncome).toBe(1200000);
    expect(example.taxableIncome).toBeCloseTo(864500, 2);
    expect(example.taxOwed).toBeCloseTo(87900, 2);
    expect(example.marginalRatePercent).toBe(20);
    expect(example.effectiveRatePercent).toBeCloseTo(7.32, 2);
  });

  it('freelancer business-income example (gross 900,000, flat-rate deduction) is computed via calculateFreelancerTax', () => {
    const example = taxExamples.find((e) => e.id === 'freelancer-business-income')!;
    expect(example.grossIncome).toBe(900000);
    // 60% flat-rate deduction on Section 40(8) income: 900,000 - 540,000 - 60,000 personal allowance
    expect(example.taxableIncome).toBeCloseTo(300000, 2);
    expect(example.taxOwed).toBeCloseTo(7500, 2);
    expect(example.marginalRatePercent).toBe(5);
    expect(example.effectiveRatePercent).toBeCloseTo(0.83, 2);
  });

  it('foreign-income remittance-timing example shows only the post-2024-earned half as taxable', () => {
    const example = taxExamples.find((e) => e.id === 'foreign-income-remittance-timing')!;
    // Two ฿500,000 entries remitted the same day; only the one earned in 2024 is taxable.
    expect(example.grossIncome).toBe(500000);
    expect(example.taxableIncome).toBeCloseTo(440000, 2);
    expect(example.taxOwed).toBeCloseTo(21500, 2);
    expect(example.marginalRatePercent).toBe(10);

    const exemptStep = example.flowSteps.find(
      (s) => s.kind === 'subtract' && s.label.includes('Exempt: earned before')
    );
    expect(exemptStep).toBeDefined();
    expect((exemptStep as { amount: number }).amount).toBe(500000);
  });

  it('foreign pension DTA-exemption example exempts US Social Security but taxes the UK private pension, with a capped foreign tax credit', () => {
    const example = taxExamples.find((e) => e.id === 'foreign-pension-dta-exemption')!;
    // US Social Security (฿500,000) exempt under DTA Article 20(2); UK private
    // pension (฿900,000) is the only taxable foreign income in this example.
    expect(example.grossIncome).toBe(900000);
    expect(example.taxableIncome).toBeCloseTo(650000, 2);
    expect(example.taxOwed).toBeCloseTo(50000, 2); // tax before the foreign tax credit
    expect(example.marginalRatePercent).toBe(15);

    const exemptStep = example.flowSteps.find(
      (s) => s.kind === 'subtract' && s.label.includes('Exempt: US Social Security')
    );
    expect((exemptStep as { amount: number }).amount).toBe(500000);

    const creditStep = example.flowSteps.find(
      (s) => s.kind === 'subtract' && s.label.includes('Foreign tax credit')
    );
    expect((creditStep as { amount: number }).amount).toBe(30000);

    const netStep = example.flowSteps.find((s) => s.label === 'Net tax still owed to Thailand');
    expect((netStep as { amount: number }).amount).toBe(20000);
  });
});
