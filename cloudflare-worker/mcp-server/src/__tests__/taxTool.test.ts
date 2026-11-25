import { describe, it, expect } from 'vitest';
import { runAnnualTaxCalculation } from '../taxTool';

describe('MCP annual tax tool — input bounds', () => {
  it.each([1e9, Infinity, Number.NaN, -3])('numberOfChildren %s does not crash and is bounded', (n) => {
    const r = runAnnualTaxCalculation({ annualIncome: 1_000_000, numberOfChildren: n });
    expect(Number.isFinite(r.taxOwed)).toBe(true);
    expect(r.breakdown.childAllowance).toBeLessThanOrEqual(30 * 60_000);
  });

  it('a normal family still gets the 2018+ bonus for the later children', () => {
    const r = runAnnualTaxCalculation({ annualIncome: 1_000_000, numberOfChildren: 3, childrenBornOnOrAfter2018: 2 });
    expect(r.breakdown.childAllowance).toBe(30_000 + 60_000 + 60_000);
  });

  it('rejects a missing or negative income', () => {
    expect(() => runAnnualTaxCalculation({ annualIncome: -1 })).toThrow();
    expect(() => runAnnualTaxCalculation({})).toThrow();
  });
});
