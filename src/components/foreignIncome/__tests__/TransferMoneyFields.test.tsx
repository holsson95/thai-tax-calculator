import React, { useState } from 'react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react';
import TransferMoneyFields from '../TransferMoneyFields';
import { newTransferMoney, TransferMoney } from '../transferMoney';
import { RULES_TAX_YEAR } from '../../../config/taxRules';
import { getExchangeRate } from '../../../services/exchangeRateService';

vi.mock('../../../services/exchangeRateService', () => ({ getExchangeRate: vi.fn() }));
const mockRate = vi.mocked(getExchangeRate);

const ok = (currency: string, rate: number, date: string) =>
  ({ ok: true, data: { fromCurrency: currency, toCurrency: 'THB', rate, date, source: 'BOT' } }) as const;

let latest: TransferMoney;
const Harness: React.FC<{ initial: TransferMoney; portion?: boolean }> = ({ initial, portion = false }) => {
  const [v, setV] = useState(initial);
  latest = v;
  return <TransferMoneyFields idPrefix="t1" value={v} onChange={(n) => { latest = n; setV(n); }} showIncomePortion={portion} />;
};

const pickUsdOnDate = () => {
  fireEvent.change(screen.getByLabelText('Currency'), { target: { value: 'USD' } });
  fireEvent.change(screen.getByLabelText('Date brought into Thailand'), { target: { value: '2026-03-02' } });
};

describe('TransferMoneyFields', () => {
  beforeEach(() => mockRate.mockReset());
  afterEach(() => vi.useRealTimers());

  it('THB hides rate fields and passes amount through', () => {
    render(<Harness initial={newTransferMoney('THB')} />);
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '5,000' } });
    expect(screen.queryByLabelText('Date brought into Thailand')).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/^Rate/)).not.toBeInTheDocument();
    expect(screen.getByText('= ฿5,000 used in the estimate')).toBeInTheDocument();
    expect(mockRate).not.toHaveBeenCalled();
  });

  it('fetches the BOT rate when currency and date are set', async () => {
    mockRate.mockResolvedValue(ok('USD', 35.62, '2026-03-02'));
    render(<Harness initial={newTransferMoney('THB')} />);
    pickUsdOnDate();
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '20000' } });
    expect(await screen.findByText('Bank of Thailand average rate, 2 Mar 2026')).toBeInTheDocument();
    expect(mockRate).toHaveBeenCalledWith('USD', '2026-03-02');
    expect(latest).toMatchObject({ currency: 'USD', rate: 35.62, rateSource: 'bot', rateDate: '2026-03-02' });
    expect(screen.getByLabelText('Rate (฿ per 1 USD)')).toHaveValue('35.62');
    expect(screen.getByText('= ฿712,400 used in the estimate')).toBeInTheDocument();
  });

  it("typing a rate marks it as the user's rate", async () => {
    mockRate.mockResolvedValue(ok('USD', 35.62, '2026-03-02'));
    render(<Harness initial={newTransferMoney('THB')} />);
    pickUsdOnDate();
    await screen.findByText('Bank of Thailand average rate, 2 Mar 2026');
    fireEvent.change(screen.getByLabelText('Rate (฿ per 1 USD)'), { target: { value: '35.9' } });
    expect(latest).toMatchObject({ rate: 35.9, rateSource: 'user' });
    expect(screen.getByText('Your rate')).toBeInTheDocument();
  });

  it('ignores a rate that resolves after currency changed', async () => {
    let resolveUsd!: (v: unknown) => void;
    mockRate.mockImplementation((c: string) =>
      c === 'USD' ? (new Promise((r) => { resolveUsd = r; }) as never) : Promise.resolve(ok('EUR', 38, '2026-03-02'))
    );
    render(<Harness initial={newTransferMoney('THB')} />);
    pickUsdOnDate();
    fireEvent.change(screen.getByLabelText('Currency'), { target: { value: 'EUR' } });
    await waitFor(() => expect(latest).toMatchObject({ currency: 'EUR', rate: 38 }));
    await act(async () => { resolveUsd(ok('USD', 35.62, '2026-03-02')); });
    expect(latest).toMatchObject({ currency: 'EUR', rate: 38 });
  });

  it('shows the bank-statement prompt when lookup fails', async () => {
    mockRate.mockResolvedValue({ ok: false, error: { type: 'network', message: 'x' } });
    render(<Harness initial={newTransferMoney('THB')} />);
    pickUsdOnDate();
    expect(await screen.findByText('Enter the rate from your bank statement')).toBeInTheDocument();
    expect(screen.getByLabelText('Rate (฿ per 1 USD)')).not.toBeDisabled();
  });

  it('limits the date to the tax year up to today', () => {
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(RULES_TAX_YEAR, 5, 9, 12));
    render(<Harness initial={newTransferMoney('USD')} />);
    const d = screen.getByLabelText('Date brought into Thailand');
    expect(d).toHaveAttribute('min', `${RULES_TAX_YEAR}-01-01`);
    expect(d).toHaveAttribute('max', `${RULES_TAX_YEAR}-06-09`);
  });

  it('shows the reference-rate note for foreign currencies only', () => {
    const note = /This is a reference rate\. The baht amount your Thai bank actually credited is the most accurate figure\. If you have it, choose THB and enter that\./;
    const { unmount } = render(<Harness initial={newTransferMoney('USD')} />);
    expect(screen.getByText(note)).toBeInTheDocument();
    unmount();
    render(<Harness initial={newTransferMoney('THB')} />);
    expect(screen.queryByText(note)).not.toBeInTheDocument();
  });

  it('converts the income part with the same rate', async () => {
    mockRate.mockResolvedValue(ok('USD', 35, '2026-03-02'));
    render(<Harness initial={newTransferMoney('THB')} portion />);
    pickUsdOnDate();
    await screen.findByText(/Bank of Thailand average rate/);
    fireEvent.change(screen.getByLabelText('Income or gain part, if known'), { target: { value: '200' } });
    expect(latest.incomePortion).toBe(200);
  });
});
