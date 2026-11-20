import { describe, it, expect } from 'vitest';
import { toThb, thbAmounts, newTransferMoney, loadSavedState, TransferMoney } from '../transferMoney';

const usd = (patch: Partial<TransferMoney> = {}): TransferMoney => ({
  currency: 'USD', amount: 1000, date: '2026-03-02', rate: 35, rateSource: 'bot', ...patch,
});

describe('toThb', () => {
  it('rounds to whole baht', () => {
    expect(toThb(20000, 35.62)).toBe(712400);
    expect(toThb(10, 35.625)).toBe(356);
  });
  it('returns null without a usable rate', () => {
    expect(toThb(100, null)).toBeNull();
    expect(toThb(100, 0)).toBeNull();
  });
});

describe('thbAmounts', () => {
  it('passes THB through', () => {
    expect(thbAmounts({ ...newTransferMoney('THB'), amount: 5000 })).toEqual({ amountThb: 5000 });
  });
  it('converts amount and income portion with the same rate', () => {
    expect(thbAmounts(usd({ incomePortion: 200 }))).toEqual({ amountThb: 35000, incomePortionThb: 7000 });
  });
  it('returns null when a foreign amount has no rate', () => {
    expect(thbAmounts(usd({ rate: null, rateSource: null }))).toBeNull();
  });
  it('treats a zero foreign amount without a rate as zero', () => {
    expect(thbAmounts(usd({ amount: 0, rate: null, rateSource: null }))).toEqual({ amountThb: 0 });
  });
});

describe('newTransferMoney', () => {
  it('THB has rate 1, foreign currencies start without a rate', () => {
    expect(newTransferMoney('THB')).toMatchObject({ currency: 'THB', amount: 0, rate: 1, rateSource: null, date: '' });
    expect(newTransferMoney('EUR')).toMatchObject({ currency: 'EUR', rate: null });
  });
});

describe('loadSavedState', () => {
  const v1 = {
    daysInThailand: 200, visaType: 'regular', nationality: '', foreignIncomeTypes: [],
    remittances: [{ id: 'a', amountThb: 50000, yearEarned: 2026, kind: 'mixed', incomeType: 'employment', residentInYearEarned: 'yes', incomePortionThb: 10000 }],
    thaiIncome: { annualSalary: 0, socialSecurityPaid: 0, otherThaiIncome: 0 },
    foreignTaxPaidThb: 1200,
  };

  it('migrates v1 saved state to THB transfers', () => {
    const s = loadSavedState(JSON.stringify(v1))!;
    expect(s.input.daysInThailand).toBe(200);
    expect(s.input.remittances[0].amountThb).toBe(50000);
    expect(s.money.a).toMatchObject({ currency: 'THB', amount: 50000, incomePortion: 10000, rate: 1 });
    expect(s.foreignTax).toEqual({ currency: 'THB', amount: 1200, rate: 1 });
  });

  it('reads v2 state as saved', () => {
    const v2 = { input: v1, money: { a: usd() }, foreignTax: { currency: 'GBP', amount: 10, rate: 45 } };
    expect(loadSavedState(JSON.stringify(v2))).toEqual(v2);
  });

  it('returns null for missing or malformed data', () => {
    expect(loadSavedState(null)).toBeNull();
    expect(loadSavedState('{nope')).toBeNull();
    expect(loadSavedState('{"foo":1}')).toBeNull();
  });
});
