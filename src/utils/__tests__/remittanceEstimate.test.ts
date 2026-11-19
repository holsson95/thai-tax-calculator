import { describe, it, expect } from 'vitest';
import {
  estimateRemittanceTax,
  assessRemittance,
  RemittanceInput,
  RemittanceEstimateInput,
} from '../remittanceEstimate';
import { calculateThaiTax } from '../tax';
import { TAX_RULES, RULES_TAX_YEAR } from '../../config/taxRules';

const Y = RULES_TAX_YEAR;
const PA = TAX_RULES.personalAllowance.value;

const remit = (overrides: Partial<RemittanceInput> = {}): RemittanceInput => ({
  id: 'r1',
  amountThb: 500_000,
  yearEarned: Y,
  kind: 'income',
  incomeType: 'employment',
  residentInYearEarned: 'yes',
  ...overrides,
});

const base = (overrides: Partial<RemittanceEstimateInput> = {}): RemittanceEstimateInput => ({
  daysInThailand: 200,
  visaType: 'regular',
  nationality: 'GB',
  foreignIncomeTypes: ['employment'],
  remittances: [remit()],
  thaiIncome: { annualSalary: 0, socialSecurityPaid: 0, otherThaiIncome: 0 },
  foreignTaxPaidThb: 0,
  ...overrides,
});

describe('assessRemittance — per-remittance rules (RD Q&A on Por. 161/162)', () => {
  it('income earned 2024+ while resident is assessable in full', () => {
    const r = assessRemittance(remit(), 200);
    expect(r.status).toBe('assessable');
    expect(r.assessableThb).toBe(500_000);
  });

  it('income earned before 2024 is not assessable (Por. 162/2566)', () => {
    const r = assessRemittance(remit({ yearEarned: 'pre2024' }), 200);
    expect(r.status).toBe('not_assessable');
    expect(r.assessableThb).toBe(0);
    expect(r.ruleId).toBe('por161-text');
  });

  it('income earned in a year the person was NOT resident is not assessable (Q&A Q5, Q14)', () => {
    const r = assessRemittance(remit({ yearEarned: 2024, residentInYearEarned: 'no' }), 200);
    expect(r.status).toBe('not_assessable');
    expect(r.assessableThb).toBe(0);
    expect(r.ruleId).toBe('residency-tested-in-year-earned');
  });

  it('for money earned this year, residency comes from days entered, not the per-remittance answer', () => {
    expect(assessRemittance(remit({ residentInYearEarned: 'no' }), 200).status).toBe('assessable');
    expect(assessRemittance(remit({ residentInYearEarned: 'yes' }), 120).status).toBe('not_assessable');
  });

  it('180 days exactly counts as resident; 179 does not (Q&A Q4)', () => {
    expect(assessRemittance(remit(), 180).status).toBe('assessable');
    expect(assessRemittance(remit(), 179).status).toBe('not_assessable');
  });

  it('remitted capital / principal is not assessable (Q&A Q10–Q11)', () => {
    const r = assessRemittance(remit({ kind: 'capital' }), 200);
    expect(r.status).toBe('not_assessable');
    expect(r.ruleId).toBe('remitted-principal-not-assessable');
  });

  it('mixed money uses the stated income portion when given', () => {
    const r = assessRemittance(remit({ kind: 'mixed', incomePortionThb: 120_000 }), 200);
    expect(r.status).toBe('uncertain');
    expect(r.assessableThb).toBe(120_000);
  });

  it('mixed money with no stated split is treated as fully assessable (cautious) and marked uncertain', () => {
    const r = assessRemittance(remit({ kind: 'mixed' }), 200);
    expect(r.status).toBe('uncertain');
    expect(r.assessableThb).toBe(500_000);
    expect(r.ruleId).toBe('mixed-funds-no-ordering-rule');
  });

  it('an income portion larger than the transfer is capped at the transfer amount', () => {
    expect(assessRemittance(remit({ kind: 'mixed', incomePortionThb: 9e9 }), 200).assessableThb).toBe(500_000);
  });

  it('"not sure" about past residency is treated as assessable (cautious) and marked uncertain', () => {
    const r = assessRemittance(remit({ yearEarned: 2024, residentInYearEarned: 'unsure' }), 200);
    expect(r.status).toBe('uncertain');
    expect(r.assessableThb).toBe(500_000);
  });

  it('negative or non-finite amounts are treated as zero', () => {
    expect(assessRemittance(remit({ amountThb: -5 }), 200).assessableThb).toBe(0);
    expect(assessRemittance(remit({ amountThb: Number.NaN }), 200).assessableThb).toBe(0);
  });
});

describe('estimateRemittanceTax — totals and tax', () => {
  it('reports resident / non-resident status for this year', () => {
    expect(estimateRemittanceTax(base({ daysInThailand: 200 })).residency.isResident).toBe(true);
    expect(estimateRemittanceTax(base({ daysInThailand: 90 })).residency.isResident).toBe(false);
  });

  it('applies the personal allowance and progressive brackets to remitted income', () => {
    const res = estimateRemittanceTax(base());
    expect(res.foreignAssessableThb).toBe(500_000);
    expect(res.taxableIncomeThb).toBe(500_000 - PA);
    expect(res.estimatedTaxThb).toBe(calculateThaiTax(500_000 - PA));
    const bracketSum = res.bracketBreakdown.reduce((s, b) => s + b.tax, 0);
    expect(bracketSum).toBeCloseTo(res.estimatedTaxThb, 6);
  });

  it('applies no expense deduction to foreign income by default and records that as an assumption', () => {
    const res = estimateRemittanceTax(base());
    expect(res.assumptions.some((a) => a.id === 'no-expense-deduction-on-foreign-income')).toBe(true);
  });

  it('combines Thai salary (with the standard deduction and SSO) with remitted income', () => {
    const res = estimateRemittanceTax(
      base({ thaiIncome: { annualSalary: 600_000, socialSecurityPaid: 9_000, otherThaiIncome: 0 } })
    );
    const thaiNet = 600_000 - TAX_RULES.maxStandardDeduction.value;
    expect(res.thaiAssessableAfterExpensesThb).toBe(thaiNet);
    expect(res.taxableIncomeThb).toBe(thaiNet + 500_000 - PA - 9_000);
    expect(res.estimatedTaxThb).toBe(calculateThaiTax(thaiNet + 500_000 - PA - 9_000));
    expect(res.taxOnThaiIncomeOnlyThb).toBe(calculateThaiTax(thaiNet - PA - 9_000));
    expect(res.additionalTaxFromRemittancesThb).toBe(res.estimatedTaxThb - res.taxOnThaiIncomeOnlyThb);
  });

  it('caps the social security deduction at the configured maximum', () => {
    const res = estimateRemittanceTax(
      base({ thaiIncome: { annualSalary: 0, socialSecurityPaid: 999_999, otherThaiIncome: 0 } })
    );
    expect(res.taxableIncomeThb).toBe(500_000 - PA - TAX_RULES.maxSocialSecurity.value);
  });

  it('non-resident this year: remittances of this year\'s income are not assessable, Thai income still is', () => {
    const res = estimateRemittanceTax(
      base({ daysInThailand: 100, thaiIncome: { annualSalary: 0, socialSecurityPaid: 0, otherThaiIncome: 400_000 } })
    );
    expect(res.foreignAssessableThb).toBe(0);
    expect(res.estimatedTaxThb).toBe(calculateThaiTax(400_000 - PA));
  });

  it('never returns negative taxable income or tax', () => {
    const res = estimateRemittanceTax(base({ remittances: [remit({ amountThb: 10_000 })] }));
    expect(res.taxableIncomeThb).toBe(0);
    expect(res.estimatedTaxThb).toBe(0);
  });

  it('sums the total remitted, including non-assessable transfers', () => {
    const res = estimateRemittanceTax(
      base({ remittances: [remit({ id: 'a' }), remit({ id: 'b', kind: 'capital', amountThb: 2_000_000 })] })
    );
    expect(res.totalRemittedThb).toBe(2_500_000);
    expect(res.foreignAssessableThb).toBe(500_000);
  });

  it('states that the proposed grace period is not law (from config)', () => {
    const res = estimateRemittanceTax(base());
    expect(res.gracePeriodIsLaw).toBe(TAX_RULES.proposedRemittanceGracePeriod.value);
    expect(res.gracePeriodIsLaw).toBe(false);
  });

  it('LTR exempt categories: flagged, not applied; an "if the exemption applies" figure is given', () => {
    const res = estimateRemittanceTax(
      base({ visaType: 'ltr_wealthy_pensioner', thaiIncome: { annualSalary: 0, socialSecurityPaid: 0, otherThaiIncome: 300_000 } })
    );
    expect(res.flags.map((f) => f.id)).toContain('ltr');
    expect(res.foreignAssessableThb).toBe(500_000);
    expect(res.estimatedTaxIfLtrExemptionAppliesThb).toBe(calculateThaiTax(300_000 - PA));
  });

  it('non-exempt visas get no LTR alternative figure', () => {
    expect(estimateRemittanceTax(base()).estimatedTaxIfLtrExemptionAppliesThb).toBeNull();
    expect(estimateRemittanceTax(base({ visaType: 'ltr_highly_skilled' })).estimatedTaxIfLtrExemptionAppliesThb).toBeNull();
  });
});

describe('estimateRemittanceTax — complexity flags', () => {
  const flags = (o: Partial<RemittanceEstimateInput>) => estimateRemittanceTax(base(o)).flags.map((f) => f.id);

  it('no flags for a simple single-type case', () => {
    expect(flags({})).toEqual([]);
  });

  it('LTR (any LTR category, including highly skilled)', () => {
    expect(flags({ visaType: 'ltr_highly_skilled' })).toContain('ltr');
    expect(flags({ visaType: 'ltr_work_from_thailand' })).toContain('ltr');
  });

  it('pre-2024 savings mixed with new income', () => {
    expect(flags({ remittances: [remit({ id: 'a' }), remit({ id: 'b', yearEarned: 'pre2024' })] })).toContain(
      'pre2024_mixed_with_new_income'
    );
    expect(flags({ remittances: [remit({ yearEarned: 'pre2024' })] })).not.toContain('pre2024_mixed_with_new_income');
  });

  it('a single transfer described as mixed money', () => {
    expect(flags({ remittances: [remit({ kind: 'mixed' })] })).toContain('mixed_funds');
  });

  it('capital gains and rental, from either selected income types or a remittance', () => {
    expect(flags({ foreignIncomeTypes: ['capital_gains'] })).toContain('capital_gains');
    expect(flags({ remittances: [remit({ incomeType: 'rental' })] })).toContain('rental');
  });

  it('US citizen', () => {
    expect(flags({ nationality: 'US' })).toContain('us_citizen');
  });

  it('remittances over the configured threshold (strictly greater)', () => {
    expect(flags({ remittances: [remit({ amountThb: 1_000_000 })] })).not.toContain('large_remittance');
    expect(flags({ remittances: [remit({ amountThb: 1_000_001 })] })).toContain('large_remittance');
  });

  it('multiple income types', () => {
    expect(flags({ foreignIncomeTypes: ['employment', 'pension'] })).toContain('multiple_income_types');
    expect(
      flags({ foreignIncomeTypes: [], remittances: [remit({ id: 'a' }), remit({ id: 'b', incomeType: 'dividends_interest' })] })
    ).toContain('multiple_income_types');
  });

  it('uncertain residency in an earlier year, and foreign tax already paid', () => {
    expect(flags({ remittances: [remit({ yearEarned: 2024, residentInYearEarned: 'unsure' })] })).toContain(
      'residency_uncertain'
    );
    expect(flags({ foreignTaxPaidThb: 1 })).toContain('foreign_tax_paid');
    expect(
      flags({ remittances: [remit({ yearEarned: 2024, kind: 'mixed', residentInYearEarned: 'unsure' })] })
    ).toEqual(expect.arrayContaining(['mixed_funds', 'residency_uncertain']));
  });

  it('flags are unique', () => {
    const ids = flags({ visaType: 'ltr_wealthy_global', foreignIncomeTypes: ['rental'], remittances: [remit({ incomeType: 'rental' })] });
    expect(new Set(ids).size).toBe(ids.length);
  });
});
