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

export interface TaxByBracketLine {
  label: string;
  rate: number;
  taxableAmount: number;
  tax: number;
}

/**
 * Break down tax owed by bracket, for display purposes.
 * Only returns brackets with a nonzero taxable amount. Sums to the same
 * total as calculateThaiTax(taxableIncome) for the same input.
 */
export function getTaxByBracket(taxableIncome: number): TaxByBracketLine[] {
  if (taxableIncome <= 0) return [];

  const lines: TaxByBracketLine[] = [];
  let remainingIncome = taxableIncome;
  let previousLimit = 0;

  for (const bracket of TAX_BRACKETS) {
    if (remainingIncome <= 0) break;

    const bracketSize = bracket.upTo - previousLimit;
    const taxableInBracket = Math.min(remainingIncome, bracketSize);

    if (taxableInBracket > 0) {
      lines.push({
        label: bracket.label,
        rate: bracket.rate,
        taxableAmount: taxableInBracket,
        tax: taxableInBracket * bracket.rate,
      });
    }

    remainingIncome -= taxableInBracket;
    previousLimit = bracket.upTo;
  }

  return lines;
}

/**
 * The tax rate applied to the last baht of taxable income (i.e. the rate on
 * the bracket the taxpayer's top slice of income falls into).
 */
export function getMarginalRate(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0;

  for (const bracket of TAX_BRACKETS) {
    if (taxableIncome <= bracket.upTo) {
      return bracket.rate;
    }
  }

  return TAX_BRACKETS[TAX_BRACKETS.length - 1].rate;
}
