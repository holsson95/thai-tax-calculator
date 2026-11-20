import { describe, it, expect } from 'vitest';
import { aboutSummary, transfersSummary, thaiSummary, transferCardSummary } from '../folderSummaries';
import type { RemittanceEstimateInput } from '../../../utils/remittanceEstimate';
import { newTransferMoney } from '../transferMoney';

const base: RemittanceEstimateInput = {
  daysInThailand: 0, visaType: 'dtv', nationality: '', foreignIncomeTypes: [], remittances: [],
  thaiIncome: { annualSalary: 0, socialSecurityPaid: 0, otherThaiIncome: 0 }, foreignTaxPaidThb: 0,
};

describe('folder summaries', () => {
  it('about you', () => {
    expect(aboutSummary({ ...base, daysInThailand: 200 }, 'DTV')).toBe('About you · 200 days · resident · DTV');
    expect(aboutSummary({ ...base, daysInThailand: 180 }, 'DTV')).toBe('About you · 180 days · resident · DTV');
    expect(aboutSummary({ ...base, daysInThailand: 179 }, 'DTV')).toBe('About you · 179 days · non-resident · DTV');
    expect(aboutSummary(base, 'DTV')).toBe('About you · not started');
  });
  it('money brought in', () => {
    expect(transfersSummary(1240000, 2)).toBe('Money brought in · 2 transfers · ฿1,240,000');
    expect(transfersSummary(5000, 1)).toBe('Money brought in · 1 transfer · ฿5,000');
  });
  it('thai income', () => {
    expect(thaiSummary(base.thaiIncome)).toBe('Thai income · none');
    expect(thaiSummary({ annualSalary: 500000, socialSecurityPaid: 9000, otherThaiIncome: 100000 })).toBe('Thai income · ฿600,000');
  });
  it('transfer card', () => {
    const m = { ...newTransferMoney('USD'), amount: 20000, date: '2026-03-02' };
    expect(transferCardSummary(0, m, 'Income')).toBe('Transfer 1 · USD 20,000 · Mar 2026 · Income');
    expect(transferCardSummary(1, { ...m, date: '' }, 'Income')).toBe('Transfer 2 · USD 20,000 · Income');
  });
});
