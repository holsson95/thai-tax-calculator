export function calculateThaiTax(taxableIncome: number): number {
  if (taxableIncome <= 0) return 0

  const brackets = [
    { upTo: 150000, rate: 0 },
    { upTo: 300000, rate: 0.05 },
    { upTo: 500000, rate: 0.10 },
    { upTo: 750000, rate: 0.15 },
    { upTo: 1000000, rate: 0.20 },
    { upTo: 2000000, rate: 0.25 },
    { upTo: 5000000, rate: 0.30 },
    { upTo: Infinity, rate: 0.35 }
  ]

  let remaining = taxableIncome
  let tax = 0
  let lower = 0

  for (const b of brackets) {
    const upper = b.upTo
    const taxableAtThisRate = Math.max(0, Math.min(remaining, upper - lower))
    tax += taxableAtThisRate * b.rate
    remaining -= taxableAtThisRate
    lower = upper
    if (remaining <= 0) break
  }

  return Math.round(tax)
}