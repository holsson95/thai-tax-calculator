import { TAX_BRACKETS } from '../types/taxForm';

/**
 * Calculate Thai income tax based on progressive tax brackets
 * @param taxableIncome - Income after all allowances and deductions
 * @returns Total tax owed
 */
export function calculateThaiTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  let tax = 0;
  let remainingIncome = taxableIncome;
  let previousLimit = 0;

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) break;

    const bracketSize = bracket.upTo - previousLimit;
    const taxableInBracket = Math.min(remainingIncome, bracketSize);
    tax += taxableInBracket * bracket.rate;
    remainingIncome -= taxableInBracket;
    previousLimit = bracket.upTo;
  }

  return tax;
}
