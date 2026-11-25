/**
 * Edge-case and invariant tests across every calculation engine.
 *
 * Three kinds of test live here:
 *  1. Boundary tests: exact figures at every bracket / threshold edge.
 *  2. Invariants: properties that must hold for ANY input (no NaN, tax never
 *     falls when income rises, extra deductions never raise tax, …), checked
 *     over a sweep of incomes.
 *  3. Cross-engine consistency: the same person entered into two calculators
 *     must get the same answer.
 *
 * The "Regressions fixed 2026-11-25" block at the bottom pins bugs found in the
 * 2026-11-25 review. Each was first recorded with `it.fails` (asserting the
 * correct rule from tax-data/2026), then fixed with the project owner's approval.
 * To record a new suspected bug without changing the engine, use `it.fails` the
 * same way (CLAUDE.md, TECHNICAL RULE).
 */
import { describe, it, expect } from 'vitest';
import {
  calculateAnnualTax,
  calculateCompanyOwnerTax,
  calculateMinimumTax,
  calculateFreelancerTax,
  calculateChildAllowance,
  calculateStandardDeduction,
  getChildAllowanceBreakdown,
} from '../taxCalculations';
import { calculateThaiTax, getTaxByBracket, getMarginalRate } from '../tax';
import { checkPND94Obligation, checkVATRegistration } from '../obligationChecks';
import { isForeignIncomeTaxable, validateForeignIncomeEntry } from '../foreignIncomeCalculations';
import { estimateRemittanceTax, assessRemittance, RemittanceInput, RemittanceEstimateInput } from '../remittanceEstimate';
import { TaxFormData, TAX_CONSTANTS, TAX_BRACKETS } from '../../types/taxForm';
import {
  createDefaultFreelancerFormData,
  FreelancerFormData,
  ThaiIncomeEntry,
  ForeignIncomeEntry,
  IncomeType,
} from '../../types/freelancerForm';
import {
  createDefaultCompanyOwnerFormData,
  createDefaultCompanyInfo,
  CompanyOwnerFormData,
  DividendEntry,
} from '../../types/companyOwnerForm';
import { TAX_RULES } from '../../config/taxRules';

// ─── fixtures ────────────────────────────────────────────────────────────────

function salaried(overrides: Partial<TaxFormData> = {}): TaxFormData {
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
    parentsEligibilityConfirmed: false,
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

let idSeq = 0;
function thai(grossAmount: number, incomeType: IncomeType, withholdingAmount = 0, monthReceived = 1): ThaiIncomeEntry {
  return {
    id: `t${idSeq++}`,
    grossAmount,
    incomeType,
    withholdingAmount,
    monthReceived,
    payerName: 'Payer',
    description: '',
  };
}

function foreign(
  amountThb: number,
  dateEarned: string,
  dateRemitted: string | null,
  foreignTaxPaid = 0,
  country = 'United States'
): ForeignIncomeEntry {
  return {
    id: `f${idSeq++}`,
    amount: amountThb,
    currency: 'THB',
    amountThb,
    dateEarned,
    dateRemitted,
    foreignTaxPaid,
    description: '',
    country,
  };
}

function freelancer(overrides: Partial<FreelancerFormData> = {}): FreelancerFormData {
  return {
    ...createDefaultFreelancerFormData(),
    daysInThailand: 200,
    isThaiResident: true,
    maritalStatus: 'single',
    expenseMethod: 'force_flat',
    ...overrides,
  };
}

function companyOwner(overrides: Partial<CompanyOwnerFormData> = {}): CompanyOwnerFormData {
  return {
    ...createDefaultCompanyOwnerFormData(),
    companyInfo: createDefaultCompanyInfo(),
    maritalStatus: 'single',
    ...overrides,
  };
}

function dividend(amount: number, withholdingTax: number, includeInPIT = true): DividendEntry {
  return {
    id: `d${idSeq++}`,
    amount,
    dividendType: 'thai_listed',
    withholdingTax,
    companyName: 'Co',
    dateReceived: '2026-03-01',
    includeInPIT,
  };
}

function remittance(overrides: Partial<RemittanceInput> = {}): RemittanceInput {
  return {
    id: `r${idSeq++}`,
    amountThb: 0,
    yearEarned: 2026,
    kind: 'income',
    incomeType: 'employment',
    residentInYearEarned: 'yes',
    ...overrides,
  };
}

function remitInput(overrides: Partial<RemittanceEstimateInput> = {}): RemittanceEstimateInput {
  return {
    daysInThailand: 200,
    visaType: 'regular',
    nationality: '',
    foreignIncomeTypes: [],
    remittances: [],
    thaiIncome: { annualSalary: 0, socialSecurityPaid: 0, otherThaiIncome: 0 },
    foreignTaxPaidThb: 0,
    ...overrides,
  };
}

/** Incomes from 0 to 20M, dense around every bracket edge. */
const INCOME_SWEEP: number[] = (() => {
  const edges = [0, 150_000, 300_000, 310_000, 500_000, 750_000, 1_000_000, 2_000_000, 5_000_000];
  const out = new Set<number>();
  for (let x = 0; x <= 20_000_000; x += 97_331) out.add(x);
  for (const e of edges) for (const d of [-1, 0, 1, 100_000, 160_000]) if (e + d >= 0) out.add(e + d);
  return [...out].sort((a, b) => a - b);
})();

const isFiniteNumber = (n: unknown) => typeof n === 'number' && Number.isFinite(n);

// ─── 1. progressive bracket engine ───────────────────────────────────────────

describe('calculateThaiTax — bracket boundaries', () => {
  // Cumulative tax at the top of each bracket, from the RD table (taxRules.ts).
  const cumulative: Array<[number, number]> = [
    [150_000, 0],
    [300_000, 7_500],
    [500_000, 27_500],
    [750_000, 65_000],
    [1_000_000, 115_000],
    [2_000_000, 365_000],
    [5_000_000, 1_265_000],
  ];

  it.each(cumulative)('tax on exactly %i is %i', (income, tax) => {
    expect(calculateThaiTax(income)).toBeCloseTo(tax, 6);
  });

  it('the first baht above each edge is taxed at the next bracket rate', () => {
    for (let i = 0; i < TAX_BRACKETS.length - 1; i++) {
      const edge = TAX_BRACKETS[i].upTo;
      const nextRate = TAX_BRACKETS[i + 1].rate;
      expect(calculateThaiTax(edge + 1) - calculateThaiTax(edge)).toBeCloseTo(nextRate, 6);
    }
  });

  it('returns 0 for zero, negative and sub-150k income', () => {
    expect(calculateThaiTax(0)).toBe(0);
    expect(calculateThaiTax(-1)).toBe(0);
    expect(calculateThaiTax(-1e9)).toBe(0);
    expect(calculateThaiTax(149_999.99)).toBe(0);
  });

  it('handles fractional baht and very large incomes without overflow', () => {
    expect(calculateThaiTax(150_000.5)).toBeCloseTo(0.025, 9);
    const huge = calculateThaiTax(1e12);
    expect(isFiniteNumber(huge)).toBe(true);
    expect(huge).toBeCloseTo(1_265_000 + (1e12 - 5_000_000) * 0.35, 0);
  });

  it('is monotonic, never exceeds the 35% top rate, and the bracket breakdown always sums to the total', () => {
    let prev = -1;
    for (const x of INCOME_SWEEP) {
      const tax = calculateThaiTax(x);
      expect(tax).toBeGreaterThanOrEqual(prev);
      expect(tax).toBeLessThanOrEqual(x * 0.35 + 1e-6);
      const lines = getTaxByBracket(x);
      expect(lines.reduce((s, l) => s + l.tax, 0)).toBeCloseTo(tax, 6);
      expect(lines.reduce((s, l) => s + l.taxableAmount, 0)).toBeCloseTo(Math.max(0, x), 6);
      prev = tax;
    }
  });

  it('getMarginalRate treats each upper edge as inside its own bracket', () => {
    expect(getMarginalRate(0)).toBe(0);
    expect(getMarginalRate(150_000)).toBe(0);
    expect(getMarginalRate(150_001)).toBe(0.05);
    expect(getMarginalRate(5_000_000)).toBe(0.3);
    expect(getMarginalRate(5_000_001)).toBe(0.35);
    expect(getMarginalRate(1e15)).toBe(0.35);
  });
});

// ─── 2. annual (salaried) engine ─────────────────────────────────────────────

describe('calculateAnnualTax — thresholds', () => {
  it('a single salaried person pays nothing up to 310,000 and starts paying on the next baht', () => {
    // 310,000 − 100,000 standard deduction − 60,000 personal = 150,000 (top of 0% band)
    expect(calculateAnnualTax(salaried({ annualIncome: 310_000 })).taxOwed).toBe(0);
    expect(calculateAnnualTax(salaried({ annualIncome: 310_001 })).taxOwed).toBeGreaterThan(0);
  });

  it('standard deduction is exactly 50% below 200,000 and capped at 100,000 from there', () => {
    expect(calculateStandardDeduction(0)).toBe(0);
    expect(calculateStandardDeduction(199_998)).toBe(99_999);
    expect(calculateStandardDeduction(200_000)).toBe(100_000);
    expect(calculateStandardDeduction(50_000_000)).toBe(100_000);
  });

  it('zero income gives zero everything and a 0% effective rate (no division by zero)', () => {
    const r = calculateAnnualTax(salaried({ annualIncome: 0 }));
    expect(r.taxOwed).toBe(0);
    expect(r.taxableIncome).toBe(0);
    expect(r.effectiveRate).toBe(0);
  });

  it('negative income is floored at zero tax', () => {
    const r = calculateAnnualTax(salaried({ annualIncome: -500_000 }));
    expect(r.taxOwed).toBe(0);
    expect(r.taxableIncome).toBe(0);
  });

  it('refundOrOwed is positive for over-withholding, negative for under-withholding, zero when exact', () => {
    const tax = calculateAnnualTax(salaried({ annualIncome: 1_000_000 })).taxOwed;
    expect(calculateAnnualTax(salaried({ annualIncome: 1_000_000, taxWithheld: tax + 1_000 })).refundOrOwed).toBeCloseTo(1_000, 6);
    expect(calculateAnnualTax(salaried({ annualIncome: 1_000_000, taxWithheld: tax - 1_000 })).refundOrOwed).toBeCloseTo(-1_000, 6);
    expect(calculateAnnualTax(salaried({ annualIncome: 1_000_000, taxWithheld: tax })).refundOrOwed).toBeCloseTo(0, 6);
  });

  it('withholding on zero-tax income is a full refund', () => {
    const r = calculateAnnualTax(salaried({ annualIncome: 200_000, taxWithheld: 5_000 }));
    expect(r.taxOwed).toBe(0);
    expect(r.refundOrOwed).toBe(5_000);
  });
});

describe('calculateAnnualTax — allowance eligibility edges', () => {
  it('spouse allowance needs BOTH married AND spouse-has-no-income', () => {
    const at = (o: Partial<TaxFormData>) => calculateAnnualTax(salaried({ annualIncome: 1_000_000, ...o })).breakdown.spouseAllowance;
    expect(at({ maritalStatus: 'married', spouseHasNoIncome: true })).toBe(TAX_CONSTANTS.SPOUSE_ALLOWANCE);
    expect(at({ maritalStatus: 'married', spouseHasNoIncome: false })).toBe(0);
    // stale flag left over after switching back to single must not leak through
    expect(at({ maritalStatus: 'single', spouseHasNoIncome: true })).toBe(0);
    expect(at({ maritalStatus: '', spouseHasNoIncome: true })).toBe(0);
  });

  it('parents are capped at 4 even if more are entered, and negative counts give nothing', () => {
    const at = (n: number) => calculateAnnualTax(salaried({ annualIncome: 1_000_000, numberOfParents: n })).breakdown.parentAllowance;
    expect(at(4)).toBe(4 * TAX_CONSTANTS.PARENT_ALLOWANCE);
    expect(at(9)).toBe(4 * TAX_CONSTANTS.PARENT_ALLOWANCE);
    expect(at(0)).toBe(0);
  });

  it('child bonus: first child never gets it, 2nd+ only if born in or after 2018', () => {
    const base = TAX_CONSTANTS.CHILD_ALLOWANCE_BASE;
    const bonus = TAX_CONSTANTS.CHILD_ALLOWANCE_BONUS;
    expect(calculateChildAllowance([{ birthYear: 2020 }])).toBe(base);
    expect(calculateChildAllowance([{ birthYear: 2010 }, { birthYear: 2017 }])).toBe(2 * base);
    expect(calculateChildAllowance([{ birthYear: 2010 }, { birthYear: 2018 }])).toBe(2 * base + bonus);
    expect(calculateChildAllowance([{ birthYear: 2010 }, { birthYear: 2019 }, { birthYear: 2021 }])).toBe(3 * base + 2 * bonus);
  });

  it('65+ exemption reduces taxable income by exactly 190,000 when income is high enough', () => {
    const young = calculateAnnualTax(salaried({ annualIncome: 2_000_000 }));
    const senior = calculateAnnualTax(salaried({ annualIncome: 2_000_000, isAge65OrOlder: true }));
    expect(young.taxableIncome - senior.taxableIncome).toBe(TAX_RULES.seniorExemption.value);
  });

  it('allowances larger than income floor taxable income at zero (never negative)', () => {
    const r = calculateAnnualTax(salaried({
      annualIncome: 100_000,
      maritalStatus: 'married',
      spouseHasNoIncome: true,
      isAge65OrOlder: true,
      numberOfParents: 4,
      children: [{ birthYear: 2015 }, { birthYear: 2019 }, { birthYear: 2022 }],
    }));
    expect(r.taxableIncome).toBe(0);
    expect(r.taxOwed).toBe(0);
  });
});

describe('calculateAnnualTax — deduction caps', () => {
  const big = 10_000_000;
  const capCases: Array<[string, Partial<TaxFormData>, keyof ReturnType<typeof calculateAnnualTax>['breakdown'], number]> = [
    ['social security', { includeSocialSecurity: true, socialSecurityContribution: 99_999 }, 'socialSecurity', TAX_CONSTANTS.MAX_SOCIAL_SECURITY],
    ['life insurance', { hasLifeInsurance: true, lifeInsurance: 999_999 }, 'lifeInsurance', TAX_CONSTANTS.MAX_LIFE_INSURANCE],
    ['health insurance', { hasHealthInsurance: true, healthInsurance: 999_999 }, 'healthInsurance', TAX_CONSTANTS.MAX_HEALTH_INSURANCE],
    ['pension fund', { hasPensionFund: true, pensionFund: 9_999_999 }, 'pensionFund', TAX_CONSTANTS.MAX_PENSION_FUND],
    ['provident fund', { hasProvidentFund: true, providentFund: 9_999_999 }, 'providentFund', TAX_CONSTANTS.MAX_PROVIDENT_FUND],
    ['RMF', { hasRMF: true, rmf: 9_999_999 }, 'rmf', TAX_CONSTANTS.MAX_RMF],
    ['SSF', { hasSSF: true, ssf: 9_999_999 }, 'ssf', TAX_CONSTANTS.MAX_SSF],
  ];

  it.each(capCases)('%s is capped at its maximum', (_label, o, key, cap) => {
    expect(calculateAnnualTax(salaried({ annualIncome: big, ...o })).breakdown[key]).toBe(cap);
  });

  it.each(capCases)('%s below the cap is taken in full', (_label, o, key) => {
    const amountKey = Object.keys(o).find((k) => !k.startsWith('has') && !k.startsWith('include')) as keyof TaxFormData;
    expect(calculateAnnualTax(salaried({ annualIncome: big, ...o, [amountKey]: 1_234 })).breakdown[key]).toBe(1_234);
  });

  it('an amount typed in but with its checkbox unticked is ignored', () => {
    const r = calculateAnnualTax(salaried({ annualIncome: big, lifeInsurance: 50_000, rmf: 50_000, donations: 50_000, socialSecurityContribution: 9_000 }));
    expect(r.breakdown.lifeInsurance).toBe(0);
    expect(r.breakdown.rmf).toBe(0);
    expect(r.breakdown.donations).toBe(0);
    expect(r.breakdown.socialSecurity).toBe(0);
  });

  it('donations are capped at 10% of income after the standard deduction and allowances', () => {
    // 1,000,000 − 100,000 − 60,000 = 840,000 → cap 84,000
    const r = calculateAnnualTax(salaried({ annualIncome: 1_000_000, hasDonations: true, donations: 500_000 }));
    expect(r.breakdown.donations).toBeCloseTo(84_000, 6);
  });

  it('donation cap is zero when income is fully covered by allowances', () => {
    const r = calculateAnnualTax(salaried({ annualIncome: 100_000, hasDonations: true, donations: 50_000 }));
    expect(r.breakdown.donations).toBe(0);
  });
});

describe('calculateAnnualTax — invariants over an income sweep', () => {
  const richProfile: Partial<TaxFormData> = {
    includeSocialSecurity: true, socialSecurityContribution: 10_500,
    maritalStatus: 'married', spouseHasNoIncome: true,
    children: [{ birthYear: 2012 }, { birthYear: 2019 }],
    numberOfParents: 2,
    hasLifeInsurance: true, lifeInsurance: 60_000,
    hasHealthInsurance: true, healthInsurance: 20_000,
    hasRMF: true, rmf: 100_000,
    hasDonations: true, donations: 30_000,
  };

  it('never produces NaN/Infinity and never a negative taxable income or tax', () => {
    for (const annualIncome of INCOME_SWEEP) {
      for (const profile of [{}, richProfile]) {
        const r = calculateAnnualTax(salaried({ annualIncome, ...profile }));
        for (const v of [r.taxOwed, r.taxableIncome, r.totalAllowances, r.totalDeductions, r.effectiveRate, r.refundOrOwed]) {
          expect(isFiniteNumber(v)).toBe(true);
        }
        expect(r.taxableIncome).toBeGreaterThanOrEqual(0);
        expect(r.taxOwed).toBeGreaterThanOrEqual(0);
        expect(r.effectiveRate).toBeLessThan(35);
      }
    }
  });

  it('tax never goes down when income goes up', () => {
    for (const profile of [{}, richProfile]) {
      let prev = 0;
      for (const annualIncome of INCOME_SWEEP) {
        const tax = calculateAnnualTax(salaried({ annualIncome, ...profile })).taxOwed;
        expect(tax).toBeGreaterThanOrEqual(prev - 1e-6);
        prev = tax;
      }
    }
  });

  it('turning on any allowance or deduction never increases tax', () => {
    const toggles: Partial<TaxFormData>[] = [
      { includeSocialSecurity: true, socialSecurityContribution: 10_500 },
      { maritalStatus: 'married', spouseHasNoIncome: true },
      { isAge65OrOlder: true },
      { children: [{ birthYear: 2019 }] },
      { numberOfParents: 1 },
      { hasLifeInsurance: true, lifeInsurance: 100_000 },
      { hasHealthInsurance: true, healthInsurance: 25_000 },
      { hasPensionFund: true, pensionFund: 100_000 },
      { hasProvidentFund: true, providentFund: 100_000 },
      { hasRMF: true, rmf: 100_000 },
      { hasSSF: true, ssf: 100_000 },
      { hasDonations: true, donations: 100_000 },
    ];
    for (const annualIncome of [0, 310_001, 800_000, 3_000_000, 12_000_000]) {
      const baseTax = calculateAnnualTax(salaried({ annualIncome })).taxOwed;
      for (const t of toggles) {
        expect(calculateAnnualTax(salaried({ annualIncome, ...t })).taxOwed).toBeLessThanOrEqual(baseTax + 1e-6);
      }
    }
  });

  it('taxOwed always equals the bracket tax on the reported taxable income', () => {
    for (const annualIncome of INCOME_SWEEP) {
      const r = calculateAnnualTax(salaried({ annualIncome, ...richProfile }));
      expect(r.taxOwed).toBeCloseTo(calculateThaiTax(r.taxableIncome), 6);
    }
  });
});

// ─── 3. company owner engine ─────────────────────────────────────────────────

describe('calculateCompanyOwnerTax — edges', () => {
  it('dividends excluded from PIT (final 10% withholding) add neither income nor credit', () => {
    const without = calculateCompanyOwnerTax(companyOwner({ salaryFromCompany: 1_000_000 }));
    const withExcluded = calculateCompanyOwnerTax(companyOwner({
      salaryFromCompany: 1_000_000,
      dividendEntries: [dividend(5_000_000, 500_000, false)],
    }));
    expect(withExcluded.taxOwed).toBe(without.taxOwed);
    expect(withExcluded.taxWithheld).toBe(without.taxWithheld);
  });

  it('a dividend-only owner gets no standard deduction', () => {
    const r = calculateCompanyOwnerTax(companyOwner({ dividendEntries: [dividend(1_000_000, 100_000)] }));
    expect(r.breakdown.standardDeduction).toBe(0);
    expect(r.taxableIncome).toBe(1_000_000 - TAX_CONSTANTS.PERSONAL_ALLOWANCE);
  });

  it('salary withholding, extra withholding and dividend credits all add up', () => {
    const r = calculateCompanyOwnerTax(companyOwner({
      salaryFromCompany: 600_000,
      salaryWithholdingTax: 10_000,
      taxWithheld: 2_000,
      dividendEntries: [dividend(100_000, 10_000), dividend(50_000, 5_000)],
    }));
    expect(r.taxWithheld).toBe(27_000);
  });

  it('never produces NaN across a salary sweep', () => {
    for (const salary of INCOME_SWEEP) {
      const r = calculateCompanyOwnerTax(companyOwner({ salaryFromCompany: salary, dividendEntries: [dividend(salary / 3, salary / 30)] }));
      expect(isFiniteNumber(r.taxOwed)).toBe(true);
      expect(isFiniteNumber(r.effectiveRate)).toBe(true);
    }
  });
});

// ─── 4. freelancer engine ────────────────────────────────────────────────────

describe('calculateFreelancerTax — expense method edges', () => {
  const incomeTypes: Array<[IncomeType, number]> = [
    ['rental_40_5', 0.3],
    ['liberal_profession_40_6', 0.3],
    ['contractor_40_7', 0.6],
    ['business_sales_40_8', 0.6],
    ['dividend', 0],
    ['other', 0],
  ];

  it.each(incomeTypes)('%s uses a %d flat rate with no cap', (type, rate) => {
    const r = calculateFreelancerTax(freelancer({ thaiIncomeEntries: [thai(10_000_000, type)] }));
    expect(r.expenseDeduction).toBeCloseTo(10_000_000 * rate, 6);
  });

  it('salary entries split across several payers share ONE 100,000 cap', () => {
    const r = calculateFreelancerTax(freelancer({
      thaiIncomeEntries: [thai(150_000, 'salary_40_1'), thai(150_000, 'salary_40_1')],
    }));
    expect(r.expenseDeduction).toBe(100_000);
  });

  it('auto_compare takes whichever is larger, and force_actual with no receipts gives zero', () => {
    const entries = [thai(1_000_000, 'liberal_profession_40_6')];
    const expenses = [{ id: 'e', category: 'software' as const, amount: 400_000, description: 'x', hasReceipt: true }];
    expect(calculateFreelancerTax(freelancer({ thaiIncomeEntries: entries, actualExpenses: expenses, expenseMethod: 'auto_compare' })).expenseDeduction).toBe(400_000);
    expect(calculateFreelancerTax(freelancer({ thaiIncomeEntries: entries, actualExpenses: [], expenseMethod: 'auto_compare' })).expenseDeduction).toBe(300_000);
    expect(calculateFreelancerTax(freelancer({ thaiIncomeEntries: entries, actualExpenses: [], expenseMethod: 'force_actual' })).expenseDeduction).toBe(0);
  });

  it('with no income at all every figure is zero and finite', () => {
    const r = calculateFreelancerTax(freelancer());
    expect(r.grossIncome).toBe(0);
    expect(r.netTaxPayable).toBe(0);
    expect(r.effectiveRate).toBe(0);
  });

  it('withholding larger than tax floors net payable at 0 (the refund is computed by the results UI)', () => {
    const r = calculateFreelancerTax(freelancer({ thaiIncomeEntries: [thai(300_000, 'liberal_profession_40_6', 9_000)] }));
    expect(r.grossTaxBeforeCredits).toBeLessThan(9_000);
    expect(r.netTaxPayable).toBe(0);
    expect(r.withholdingCredits).toBe(9_000);
  });
});

describe('calculateFreelancerTax — foreign income edges', () => {
  it('non-residents are not taxed on remitted foreign income', () => {
    const r = calculateFreelancerTax(freelancer({
      isThaiResident: false, daysInThailand: 179,
      foreignIncomeEntries: [foreign(1_000_000, '2026-01-10', '2026-02-01')],
    }));
    expect(r.taxableForeignIncome).toBe(0);
  });

  it('income earned on 31 Dec 2023 is exempt; income earned on 1 Jan 2024 is taxable', () => {
    const at = (date: string) => calculateFreelancerTax(freelancer({ foreignIncomeEntries: [foreign(500_000, date, '2026-03-01')] })).taxableForeignIncome;
    expect(at('2023-12-31')).toBe(0);
    expect(at('2024-01-01')).toBe(500_000);
  });

  it('un-remitted income is not taxable', () => {
    const r = calculateFreelancerTax(freelancer({ foreignIncomeEntries: [foreign(500_000, '2026-01-01', null)] }));
    expect(r.taxableForeignIncome).toBe(0);
  });

  it.each(['ltr_wealthy_global', 'ltr_wealthy_pensioner', 'ltr_work_from_thailand'] as const)(
    'LTR %s holders pay no Thai tax on remitted foreign income', (visaType) => {
      const r = calculateFreelancerTax(freelancer({ visaType, foreignIncomeEntries: [foreign(2_000_000, '2026-01-01', '2026-02-01')] }));
      expect(r.taxableForeignIncome).toBe(0);
      expect(r.grossTaxBeforeCredits).toBe(0);
    }
  );

  it('LTR Highly Skilled gets NO foreign-income exemption', () => {
    const r = calculateFreelancerTax(freelancer({ visaType: 'ltr_highly_skilled', foreignIncomeEntries: [foreign(2_000_000, '2026-01-01', '2026-02-01')] }));
    expect(r.taxableForeignIncome).toBe(2_000_000);
  });

  it('foreign tax credit never exceeds the Thai tax attributable to the foreign income', () => {
    const r = calculateFreelancerTax(freelancer({
      thaiIncomeEntries: [thai(1_000_000, 'business_sales_40_8')],
      foreignIncomeEntries: [foreign(1_000_000, '2026-01-01', '2026-02-01', 900_000)],
    }));
    expect(r.foreignTaxCredits).toBeCloseTo(r.grossTaxBeforeCredits * 0.5, 6);
    expect(r.netTaxPayable).toBeGreaterThanOrEqual(0);
  });

  it('foreign tax paid to a non-treaty country gives no credit', () => {
    const r = calculateFreelancerTax(freelancer({
      foreignIncomeEntries: [foreign(1_000_000, '2026-01-01', '2026-02-01', 200_000, 'Brazil')],
    }));
    expect(r.foreignTaxCredits).toBe(0);
  });
});

describe('PND94 and VAT thresholds', () => {
  it('PND94: exactly 60,000 of Jan–Jun qualifying income does not trigger filing; 60,001 does', () => {
    expect(checkPND94Obligation(freelancer({ thaiIncomeEntries: [thai(60_000, 'liberal_profession_40_6', 0, 6)] })).required).toBe(false);
    expect(checkPND94Obligation(freelancer({ thaiIncomeEntries: [thai(60_001, 'liberal_profession_40_6', 0, 6)] })).required).toBe(true);
  });

  it('PND94: July income, salary income and dividends never count', () => {
    const r = checkPND94Obligation(freelancer({
      thaiIncomeEntries: [thai(900_000, 'business_sales_40_8', 0, 7), thai(900_000, 'salary_40_1', 0, 1), thai(900_000, 'dividend', 0, 1)],
    }));
    expect(r.halfYearIncome).toBe(0);
    expect(r.required).toBe(false);
  });

  it('PND94: married with a non-earning spouse uses the 120,000 threshold; spouseHasNoIncome alone does not', () => {
    const entries = [thai(100_000, 'contractor_40_7', 0, 3)];
    expect(checkPND94Obligation(freelancer({ maritalStatus: 'married', spouseHasNoIncome: true, thaiIncomeEntries: entries })).required).toBe(false);
    expect(checkPND94Obligation(freelancer({ maritalStatus: 'single', spouseHasNoIncome: true, thaiIncomeEntries: entries })).required).toBe(true);
  });

  it('VAT: 1,799,999 of business turnover is under the threshold; 1,800,001 is over it', () => {
    expect(checkVATRegistration(freelancer({ thaiIncomeEntries: [thai(1_799_999, 'business_sales_40_8')] })).required).toBe(false);
    expect(checkVATRegistration(freelancer({ thaiIncomeEntries: [thai(1_800_001, 'business_sales_40_8')] })).required).toBe(true);
  });
});

// ─── 5. remittance estimate engine ───────────────────────────────────────────

describe('estimateRemittanceTax — edges', () => {
  it('garbage numeric input (NaN, negative, Infinity) is treated as zero and never leaks into the result', () => {
    const r = estimateRemittanceTax(remitInput({
      daysInThailand: NaN,
      remittances: [remittance({ amountThb: NaN }), remittance({ amountThb: -5 }), remittance({ amountThb: Infinity })],
      thaiIncome: { annualSalary: NaN, socialSecurityPaid: -1, otherThaiIncome: Infinity },
      foreignTaxPaidThb: -100,
    }));
    for (const v of [r.estimatedTaxThb, r.taxableIncomeThb, r.totalRemittedThb, r.foreignAssessableThb, r.additionalTaxFromRemittancesThb]) {
      expect(isFiniteNumber(v)).toBe(true);
    }
    expect(r.estimatedTaxThb).toBe(0);
  });

  it('residency for this year flips at exactly 180 days', () => {
    const r = (days: number) => assessRemittance(remittance({ amountThb: 1_000_000 }), days);
    expect(r(179).assessableThb).toBe(0);
    expect(r(180).assessableThb).toBe(1_000_000);
  });

  it('for an earlier year, the user\'s answer decides residency (days this year are ignored)', () => {
    expect(assessRemittance(remittance({ amountThb: 1_000, yearEarned: 2025, residentInYearEarned: 'no' }), 365).assessableThb).toBe(0);
    expect(assessRemittance(remittance({ amountThb: 1_000, yearEarned: 2025, residentInYearEarned: 'yes' }), 0).assessableThb).toBe(1_000);
    expect(assessRemittance(remittance({ amountThb: 1_000, yearEarned: 2025, residentInYearEarned: 'unsure' }), 0).status).toBe('uncertain');
  });

  it('a mixed transfer never counts more income than the transfer itself', () => {
    const a = assessRemittance(remittance({ amountThb: 100_000, kind: 'mixed', incomePortionThb: 900_000 }), 200);
    expect(a.assessableThb).toBe(100_000);
    const b = assessRemittance(remittance({ amountThb: 100_000, kind: 'mixed', incomePortionThb: -50 }), 200);
    expect(b.assessableThb).toBe(0);
  });

  it('capital and pre-2024 money are never assessable, whatever else is set', () => {
    expect(assessRemittance(remittance({ amountThb: 9e6, kind: 'capital' }), 365).assessableThb).toBe(0);
    expect(assessRemittance(remittance({ amountThb: 9e6, yearEarned: 'pre2024', kind: 'mixed' }), 365).assessableThb).toBe(0);
  });

  it('remittances never reduce tax, and the extra tax equals the total minus the Thai-only tax', () => {
    for (const amount of [0, 1, 50_000, 500_000, 5_000_000]) {
      const r = estimateRemittanceTax(remitInput({
        remittances: [remittance({ amountThb: amount })],
        thaiIncome: { annualSalary: 800_000, socialSecurityPaid: 10_500, otherThaiIncome: 0 },
      }));
      expect(r.additionalTaxFromRemittancesThb).toBeGreaterThanOrEqual(0);
      expect(r.estimatedTaxThb - r.taxOnThaiIncomeOnlyThb).toBeCloseTo(r.additionalTaxFromRemittancesThb, 6);
    }
  });

  it('social security above the annual cap is capped', () => {
    const r = estimateRemittanceTax(remitInput({ thaiIncome: { annualSalary: 1_000_000, socialSecurityPaid: 50_000, otherThaiIncome: 0 } }));
    expect(r.allowancesAndDeductionsThb).toBe(TAX_RULES.personalAllowance.value + TAX_RULES.maxSocialSecurity.value);
  });
});

// ─── 6. cross-engine consistency ─────────────────────────────────────────────

describe('cross-engine consistency: same person, same answer', () => {
  it('salaried annual == freelancer with one 40(1) salary entry', () => {
    for (const income of INCOME_SWEEP) {
      const a = calculateAnnualTax(salaried({ annualIncome: income }));
      const f = calculateFreelancerTax(freelancer({ thaiIncomeEntries: [thai(income, 'salary_40_1')] }));
      expect(f.taxableIncome).toBeCloseTo(a.taxableIncome, 6);
      expect(f.grossTaxBeforeCredits).toBeCloseTo(a.taxOwed, 6);
    }
  });

  it('salaried annual == company owner with salary only', () => {
    for (const income of INCOME_SWEEP) {
      const a = calculateAnnualTax(salaried({ annualIncome: income }));
      const c = calculateCompanyOwnerTax(companyOwner({ salaryFromCompany: income }));
      expect(c.taxOwed).toBeCloseTo(a.taxOwed, 6);
    }
  });

  it('salaried annual == remittance estimate with no remittances (same SS, personal allowance only)', () => {
    for (const income of INCOME_SWEEP) {
      const a = calculateAnnualTax(salaried({ annualIncome: income, includeSocialSecurity: true, socialSecurityContribution: 10_500 }));
      const r = estimateRemittanceTax(remitInput({ thaiIncome: { annualSalary: income, socialSecurityPaid: 10_500, otherThaiIncome: 0 } }));
      expect(r.estimatedTaxThb).toBeCloseTo(a.taxOwed, 6);
    }
  });
});

// ─── 7. Regressions fixed 2026-11-25 ─────────────────────────────────────────
//
// Each test asserts the behaviour the research log (tax-data/2026/*.json) says
// is correct. All of them failed before the 2026-11-25 fixes.

describe('Regressions fixed 2026-11-25', () => {
  it('child bonus follows chronological birth order, not the order children were typed in', () => {
    // tax-data/2026/allowances.json#child-allowance-bonus: "2nd and subsequent child BORN IN OR AFTER 2018, by chronological birth order".
    // Same family, two entry orders: before the fix this gave 90,000 vs 60,000.
    const olderFirst = calculateChildAllowance([{ birthYear: 2015 }, { birthYear: 2020 }]);
    const youngerFirst = calculateChildAllowance([{ birthYear: 2020 }, { birthYear: 2015 }]);
    expect(youngerFirst).toBe(olderFirst);
  });

  it('pension + provident + RMF + SSF together are capped at 500,000', () => {
    // tax-data/2026/deductions.json#combined-retirement-cap — defined in DEDUCTION_CAPS but never enforced.
    // Before the fix the four individual caps allowed 1,700,000.
    const r = calculateAnnualTax(salaried({
      annualIncome: 10_000_000,
      hasPensionFund: true, pensionFund: 500_000,
      hasProvidentFund: true, providentFund: 500_000,
      hasRMF: true, rmf: 500_000,
      hasSSF: true, ssf: 200_000,
    }));
    const b = r.breakdown;
    expect(b.pensionFund + b.providentFund + b.rmf + b.ssf).toBeLessThanOrEqual(TAX_RULES.combinedRetirementCap.value);
  });

  it('LTR Highly Skilled: the salary\'s 100,000 standard deduction does not reduce tax on other income', () => {
    // The salary is taxed at the 17% flat rate and removed from the progressive base, but
    // its expense deduction is still subtracted from the non-salary income. With 400,000 of
    // 40(8) income: 400,000 − 240,000 (60%) − 60,000 personal = 100,000 taxable. Was: 0.
    const r = calculateFreelancerTax(freelancer({
      visaType: 'ltr_highly_skilled',
      thaiIncomeEntries: [thai(3_000_000, 'salary_40_1'), thai(400_000, 'business_sales_40_8')],
    }));
    expect(r.taxableIncome).toBe(100_000);
  });

  it('VAT turnover does not include employment salary', () => {
    // Registry: VAT registration is triggered by "taxable turnover". 1.5M salary + 400k freelance
    // fees is 400k of turnover; the app used to say VAT registration was required.
    const r = checkVATRegistration(freelancer({
      thaiIncomeEntries: [thai(1_500_000, 'salary_40_1'), thai(400_000, 'liberal_profession_40_6')],
    }));
    expect(r.required).toBe(false);
  });

  it('foreign income remitted in an earlier tax year is not counted in this year\'s tax', () => {
    // The remittance rule taxes income in the year it is brought in. A 2025 transfer belongs
    // on the 2025 return; it used to be added to the 2026 calculation.
    const r = calculateFreelancerTax(freelancer({ foreignIncomeEntries: [foreign(1_000_000, '2024-03-01', '2025-05-01')] }));
    expect(r.taxableForeignIncome).toBe(0);
  });

  it('an unparseable "date earned" is not silently treated as taxable', () => {
    // new Date('garbage') < 2024-01-01 is false (NaN comparison), so the entry used to fall through to "taxable".
    const r = calculateFreelancerTax(freelancer({ foreignIncomeEntries: [foreign(1_000_000, 'not-a-date', '2026-02-01')] }));
    expect(r.foreignIncomeTaxability[0].reason).not.toMatch(/fully taxable/);
  });

  it('donation cap is 10% of income after ALL other deductions (insurance, funds, SS), not just allowances', () => {
    // tax-data/2026/deductions.json#max-donation-percent: "10% of taxable income after other
    // deductions/allowances, before the donation deduction itself".
    // 1,000,000 − 100,000 − 60,000 − 300,000 RMF = 540,000 → cap 54,000. Was: 84,000.
    const r = calculateAnnualTax(salaried({
      annualIncome: 1_000_000,
      hasRMF: true, rmf: 300_000,
      hasDonations: true, donations: 500_000,
    }));
    expect(r.breakdown.donations).toBeCloseTo(54_000, 6);
  });
});

describe('Behaviour around the 2026-11-25 fixes', () => {
  it('child breakdown is returned in entry order but decided by birth order', () => {
    const lines = getChildAllowanceBreakdown([{ birthYear: 2021 }, { birthYear: 2012 }, { birthYear: 2019 }]);
    // birth order: 2012 (1st, no bonus), 2019 (2nd, bonus), 2021 (3rd, bonus)
    expect(lines.map((l) => l.bonus)).toEqual([30_000, 0, 30_000]);
  });

  it('twins born in 2018 or later: the second still gets the bonus', () => {
    expect(calculateChildAllowance([{ birthYear: 2020 }, { birthYear: 2020 }])).toBe(90_000);
  });

  it('the combined retirement cap also applies in the freelancer calculator', () => {
    const r = calculateFreelancerTax(freelancer({
      thaiIncomeEntries: [thai(10_000_000, 'business_sales_40_8')],
      hasPensionFund: true, pensionFund: 500_000,
      hasRMF: true, rmf: 500_000,
    }));
    expect(r.deductionBreakdown.pensionFund + r.deductionBreakdown.rmf).toBe(500_000);
  });

  it('the freelancer donation cap is also 10% of income after the other deductions', () => {
    // 1,000,000 40(8) − 600,000 flat − 60,000 personal = 340,000; − 100,000 RMF = 240,000 → cap 24,000
    const r = calculateFreelancerTax(freelancer({
      thaiIncomeEntries: [thai(1_000_000, 'business_sales_40_8')],
      hasRMF: true, rmf: 100_000,
      hasDonations: true, donations: 500_000,
    }));
    expect(r.deductionBreakdown.donations).toBeCloseTo(24_000, 6);
  });

  it('negative or NaN deduction amounts count as zero instead of raising tax', () => {
    const base = calculateAnnualTax(salaried({ annualIncome: 1_000_000 })).taxOwed;
    const r = calculateAnnualTax(salaried({
      annualIncome: 1_000_000,
      hasLifeInsurance: true, lifeInsurance: -50_000,
      hasRMF: true, rmf: NaN,
      includeSocialSecurity: true, socialSecurityContribution: -9_000,
    }));
    expect(r.taxOwed).toBe(base);
  });

  it('LTR Highly Skilled with salary only still pays the flat 17% and nothing progressive', () => {
    const r = calculateFreelancerTax(freelancer({ visaType: 'ltr_highly_skilled', thaiIncomeEntries: [thai(3_000_000, 'salary_40_1')] }));
    expect(r.expenseDeduction).toBe(0);
    expect(r.taxableIncome).toBe(0);
    expect(r.grossTaxBeforeCredits).toBeCloseTo(510_000, 6);
  });

  it.each([
    ['2025-12-31', false],
    ['2026-01-01', true],
    ['2026-12-31', true],
    ['2027-01-01', false],
  ] as const)('money brought in on %s counts toward 2026: %s', (dateRemitted, taxable) => {
    const result = isForeignIncomeTaxable(foreign(100_000, '2024-06-01', dateRemitted), true);
    expect(result.isTaxable).toBe(taxable);
    if (!taxable) expect(result.reason).toMatch(/tax return/);
  });

  it('an unreadable "date remitted" is not taxable and says why', () => {
    const result = isForeignIncomeTaxable(foreign(100_000, '2024-06-01', '31/02/2026'), true);
    expect(result.isTaxable).toBe(false);
    expect(result.reason).toMatch(/not a valid date/);
  });

  it('validation reports unreadable dates instead of passing them', () => {
    const { errors } = validateForeignIncomeEntry(foreign(100_000, 'garbage', 'also-garbage'));
    expect(errors).toContain('Date earned is not a valid date');
    expect(errors).toContain('Date remitted is not a valid date');
  });

  it('VAT: dividends are not turnover either, but vehicle rental and contractor income are', () => {
    const r = checkVATRegistration(freelancer({
      thaiIncomeEntries: [thai(5_000_000, 'dividend'), { ...thai(1_000_000, 'rental_40_5'), rentalPropertyKind: 'vehicle' }, thai(800_001, 'contractor_40_7')],
    }));
    expect(r.turnover).toBe(1_800_001);
    expect(r.required).toBe(true);
  });
});

// ─── 8. Open items closed 2026-11-25 (second pass) ───────────────────────────

describe('Share-of-income limits on retirement funds', () => {
  // tax-data/2026/deductions.json: provident-fund-wage-percent (15% of wages, RD primary),
  // rmf-income-percent and ssf-income-percent (30%, RD PND94 guide).
  it('provident fund is limited to 15% of wages', () => {
    const r = calculateAnnualTax(salaried({ annualIncome: 600_000, hasProvidentFund: true, providentFund: 200_000 }));
    expect(r.breakdown.providentFund).toBe(90_000);
  });

  it('RMF and SSF are limited to 30% of assessable income', () => {
    const r = calculateAnnualTax(salaried({ annualIncome: 400_000, hasRMF: true, rmf: 300_000 }));
    expect(r.breakdown.rmf).toBe(120_000);
    const s2 = calculateAnnualTax(salaried({ annualIncome: 400_000, hasSSF: true, ssf: 200_000 }));
    expect(s2.breakdown.ssf).toBe(120_000);
  });

  it('the Government Pension Fund field has its own 500,000 cap and no share-of-income limit', () => {
    // RD PND90 2024 guide: "Total contribution to Government Pension Fund, up to 500,000 baht."
    const r = calculateAnnualTax(salaried({ annualIncome: 600_000, hasPensionFund: true, pensionFund: 300_000 }));
    expect(r.breakdown.pensionFund).toBe(300_000);
  });

  it('a freelancer with no salary cannot claim provident fund, but RMF uses their total income', () => {
    const r = calculateFreelancerTax(freelancer({
      thaiIncomeEntries: [thai(1_000_000, 'liberal_profession_40_6')],
      hasProvidentFund: true, providentFund: 100_000,
      hasRMF: true, rmf: 400_000,
    }));
    expect(r.deductionBreakdown.providentFund).toBe(0);
    expect(r.deductionBreakdown.rmf).toBe(300_000);
  });

  it('company owners: provident fund follows the salary only, RMF the whole income including dividends', () => {
    const r = calculateCompanyOwnerTax(companyOwner({
      salaryFromCompany: 400_000,
      directorFees: 600_000,
      dividendEntries: [dividend(1_000_000, 100_000)],
      hasProvidentFund: true, providentFund: 500_000,
      hasRMF: true, rmf: 500_000,
    }));
    expect(r.breakdown.providentFund).toBe(60_000); // 15% × 400,000 salary
    expect(r.breakdown.rmf).toBe(440_000); // 30% × 2,000,000 = 600,000, but combined cap leaves 440,000
  });
});

describe('Adopted children (RD PND94 guide, B. item 3)', () => {
  const lines = (children: { birthYear: number; isAdopted?: boolean }[]) => getChildAllowanceBreakdown(children);

  it('with 3 or more legitimate children, no adopted child is counted', () => {
    const r = lines([{ birthYear: 2010 }, { birthYear: 2012 }, { birthYear: 2014 }, { birthYear: 2016, isAdopted: true }]);
    expect(r[3]).toEqual({ base: 0, bonus: 0, total: 0, counted: false });
  });

  it('adopted children fill up to 3 children in total', () => {
    const r = lines([{ birthYear: 2010 }, { birthYear: 2011, isAdopted: true }, { birthYear: 2012, isAdopted: true }, { birthYear: 2013, isAdopted: true }]);
    expect(r.map((l) => l.counted)).toEqual([true, true, true, false]);
    expect(calculateChildAllowance([{ birthYear: 2010 }, { birthYear: 2011, isAdopted: true }, { birthYear: 2012, isAdopted: true }, { birthYear: 2013, isAdopted: true }])).toBe(90_000);
  });

  it('adopted children never get the 2018+ bonus', () => {
    const r = lines([{ birthYear: 2015 }, { birthYear: 2020, isAdopted: true }]);
    expect(r[1].bonus).toBe(0);
  });

  it('the bonus rank counts legitimate children only (app interpretation, recorded in tax-data)', () => {
    // adopted 2014, legitimate 2019 and 2021 → the 2019 child is the 1st legitimate child: no bonus; 2021 gets it
    const r = lines([{ birthYear: 2014, isAdopted: true }, { birthYear: 2019 }, { birthYear: 2021 }]);
    expect(r.map((l) => l.bonus)).toEqual([0, 0, 30_000]);
  });

  it('legitimate children have no count limit', () => {
    const five = Array.from({ length: 5 }, (_, i) => ({ birthYear: 2008 + i }));
    expect(calculateChildAllowance(five)).toBe(5 * 30_000);
  });
});

describe('Rental flat rates by property kind (RD rental expense table)', () => {
  it.each([
    ['building', 0.3],
    ['vehicle', 0.3],
    ['agricultural_land', 0.2],
    ['other_land', 0.15],
    ['other_property', 0.1],
  ] as const)('%s → %d', (kind, rate) => {
    const r = calculateFreelancerTax(freelancer({ thaiIncomeEntries: [{ ...thai(1_000_000, 'rental_40_5'), rentalPropertyKind: kind }] }));
    expect(r.expenseDeduction).toBeCloseTo(1_000_000 * rate, 6);
  });

  it('an entry without a property kind keeps the previous 30% (building)', () => {
    const r = calculateFreelancerTax(freelancer({ thaiIncomeEntries: [thai(1_000_000, 'rental_40_5')] }));
    expect(r.expenseDeduction).toBeCloseTo(300_000, 6);
  });
});

describe('Annual minimum tax (RD PND90 guide 2024, No. 11 items 8-10)', () => {
  it('annual minimum tax: 0.5% of non-employment income above 120,000 when that is at least 5,000', () => {
    // RD Guide to PND90 2024, No. 11: "If you have assessable income other than employment income
    // (Section 40(1)) more than 120,000 baht in the tax year ... Assessable Gross Income x 0.005";
    // "If the result is less than 5,000 baht, your tax payable is the amount in No. 11 item 8."
    // 1,200,000 40(8) − 720,000 − 330,000 allowances − 300,000 RMF → 0 net tax; 0.5% = 6,000.
    const r = calculateFreelancerTax(freelancer({
      maritalStatus: 'married', spouseHasNoIncome: true,
      children: [{ birthYear: 2010 }, { birthYear: 2012 }, { birthYear: 2014 }],
      numberOfParents: 4,
      hasRMF: true, rmf: 300_000,
      thaiIncomeEntries: [thai(1_200_000, 'business_sales_40_8')],
    }));
    expect(r.grossTaxBeforeCredits).toBe(6_000);
  });
});

describe('Annual minimum tax — boundaries and scope', () => {
  it('applies only when 0.5% of the base is at least 5,000 (base 1,000,000+)', () => {
    expect(calculateMinimumTax(999_999, false).minimumTax).toBe(0);
    expect(calculateMinimumTax(1_000_000, false).minimumTax).toBe(5_000);
    expect(calculateMinimumTax(119_999, false).minimumTax).toBe(0);
  });

  it('the 65+ exemption comes off the base first', () => {
    expect(calculateMinimumTax(1_100_000, true)).toEqual({ base: 910_000, minimumTax: 0 });
    expect(calculateMinimumTax(1_290_000, true)).toEqual({ base: 1_100_000, minimumTax: 5_500 });
  });

  it('salary is never in the base', () => {
    const r = calculateFreelancerTax(freelancer({ thaiIncomeEntries: [thai(5_000_000, 'salary_40_1')] }));
    expect(r.minimumTax).toBe(0);
    expect(r.minimumTaxApplied).toBe(false);
  });

  it('does not change the tax when the ordinary tax is already higher', () => {
    // 2,000,000 40(6): ordinary tax is far above the 10,000 minimum
    const r = calculateFreelancerTax(freelancer({ thaiIncomeEntries: [thai(2_000_000, 'liberal_profession_40_6')] }));
    expect(r.minimumTax).toBe(10_000);
    expect(r.minimumTaxApplied).toBe(false);
    expect(r.grossTaxBeforeCredits).toBeGreaterThan(10_000);
  });

  it('LTR Highly Skilled: the minimum is compared with the progressive part only, the 17% salary tax is added on top', () => {
    const r = calculateFreelancerTax(freelancer({
      visaType: 'ltr_highly_skilled',
      maritalStatus: 'married', spouseHasNoIncome: true,
      children: [{ birthYear: 2010 }, { birthYear: 2012 }, { birthYear: 2014 }],
      numberOfParents: 4,
      hasRMF: true, rmf: 300_000,
      thaiIncomeEntries: [thai(1_000_000, 'salary_40_1'), thai(1_200_000, 'business_sales_40_8')],
    }));
    expect(r.grossTaxBeforeCredits).toBeCloseTo(170_000 + 6_000, 6);
  });

  it('company owners: director fees and PIT-included dividends form the base, salary does not', () => {
    // salary 300,000; director fees 400,000; dividends 800,000 included → base 1,200,000 → minimum 6,000
    const r = calculateCompanyOwnerTax(companyOwner({
      salaryFromCompany: 300_000,
      directorFees: 400_000,
      dividendEntries: [dividend(800_000, 80_000), dividend(5_000_000, 500_000, false)],
      maritalStatus: 'married', spouseHasNoIncome: true,
      children: [{ birthYear: 2010 }, { birthYear: 2012 }, { birthYear: 2014 }],
      numberOfParents: 4,
      hasRMF: true, rmf: 450_000,
      hasLifeInsurance: true, lifeInsurance: 100_000,
    }));
    expect(r.minimumTax).toBe(6_000);
    expect(r.taxOwed).toBeGreaterThanOrEqual(6_000);
  });
});

describe('VAT boundary and life+health cap (fixed 2026-11-25, third pass)', () => {
  it('VAT: exactly 1,800,000 of turnover does not require registration', () => {
    // Revenue Code s.81/1 (rd.go.th/english/37732.html): a business whose tax base is "not exceeding"
    // the small-business amount is exempt. The engine used >= (required at exactly 1.8M) until 2026-11-25.
    expect(checkVATRegistration(freelancer({ thaiIncomeEntries: [thai(1_800_000, 'business_sales_40_8')] })).required).toBe(false);
  });

  it('life and health insurance together are capped at 100,000', () => {
    // tax-data/2026/deductions.json#max-health-insurance; PwC (Aug 2026): health premium "together with
    // the above life insurance premiums paid cannot exceed THB 100,000 in total"; RD PND94 guide 2023.
    const r = calculateAnnualTax(salaried({
      annualIncome: 2_000_000,
      hasLifeInsurance: true, lifeInsurance: 100_000,
      hasHealthInsurance: true, healthInsurance: 25_000,
    }));
    expect(r.breakdown.lifeInsurance + r.breakdown.healthInsurance).toBe(100_000);
  });
});

describe('Life + health insurance combined cap — more cases', () => {
  it('health fills the room life insurance leaves', () => {
    const r = calculateAnnualTax(salaried({ annualIncome: 2_000_000, hasLifeInsurance: true, lifeInsurance: 90_000, hasHealthInsurance: true, healthInsurance: 25_000 }));
    expect(r.breakdown.lifeInsurance).toBe(90_000);
    expect(r.breakdown.healthInsurance).toBe(10_000);
  });

  it('health alone still has its own 25,000 cap', () => {
    const r = calculateAnnualTax(salaried({ annualIncome: 2_000_000, hasHealthInsurance: true, healthInsurance: 80_000 }));
    expect(r.breakdown.healthInsurance).toBe(25_000);
  });
});

describe('Foreign income: residency in the year earned (freelancer calculator)', () => {
  const at = (residentInYearEarned: 'yes' | 'no' | 'unsure' | undefined, dateEarned = '2025-06-01') =>
    isForeignIncomeTaxable({ ...foreign(500_000, dateEarned, '2026-03-01'), residentInYearEarned }, true);

  it('earlier-year income from a non-resident year is not taxable', () => {
    expect(at('no').isTaxable).toBe(false);
    expect(at('no').reason).toMatch(/fewer than 180 days/);
  });

  it('earlier-year income from a resident year is taxable', () => {
    expect(at('yes').isTaxable).toBe(true);
  });

  it('"not sure" and a missing answer are counted as taxable, with a reason saying so', () => {
    expect(at('unsure').isTaxable).toBe(true);
    expect(at(undefined).isTaxable).toBe(true);
    expect(at(undefined).reason).toMatch(/to be cautious/);
  });

  it('for income earned this year the answer is ignored: this year\'s days decide', () => {
    expect(at('no', '2026-01-15').isTaxable).toBe(true);
    expect(isForeignIncomeTaxable({ ...foreign(500_000, '2026-01-15', '2026-03-01'), residentInYearEarned: 'yes' }, false).isTaxable).toBe(false);
  });

  it('flows through to the freelancer tax result', () => {
    const r = calculateFreelancerTax(freelancer({
      foreignIncomeEntries: [
        { ...foreign(400_000, '2025-02-01', '2026-02-01'), residentInYearEarned: 'no' },
        { ...foreign(300_000, '2025-02-01', '2026-02-01'), residentInYearEarned: 'yes' },
      ],
    }));
    expect(r.taxableForeignIncome).toBe(300_000);
  });
});

describe('DTA country list (RD live table, checked 2026-11-25)', () => {
  it('has exactly the 61 countries with a full income-tax DTA; Saudi Arabia (air transport only) is not one', async () => {
    const { hasDTAWithThailand, searchCountries } = await import('../../data/dtaCountries');
    expect(searchCountries('').filter((c) => c.hasDTA)).toHaveLength(61);
    expect(hasDTAWithThailand('Saudi Arabia')).toBe(false);
    for (const name of ['United Kingdom', 'South Korea', 'China', 'United States', 'United Arab Emirates', 'Taiwan', 'Tajikistan']) {
      expect(hasDTAWithThailand(name), name).toBe(true);
    }
  });
});
