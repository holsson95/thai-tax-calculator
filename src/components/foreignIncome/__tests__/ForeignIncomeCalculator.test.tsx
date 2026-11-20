import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ForeignIncomeCalculator from '../ForeignIncomeCalculator';
import { getExchangeRate } from '../../../services/exchangeRateService';
import type { RemittanceEstimateInput } from '../../../utils/remittanceEstimate';

vi.mock('../../../services/exchangeRateService', () => ({ getExchangeRate: vi.fn() }));
const mockRate = vi.mocked(getExchangeRate);
const ok = (currency: string, rate: number) =>
  ({ ok: true, data: { fromCurrency: currency, toCurrency: 'THB', rate, date: '2026-03-02', source: 'BOT' } }) as const;

const renderCalc = (onEstimate?: (i: RemittanceEstimateInput) => void) =>
  render(
    <MemoryRouter>
      <ForeignIncomeCalculator onEstimate={onEstimate} renderAfterResults={() => null} />
    </MemoryRouter>
  );

const setDays = (v: string) => fireEvent.change(screen.getByLabelText('Days in Thailand this year'), { target: { value: v } });
const usdTransfer = (amount: string) => {
  fireEvent.change(screen.getByLabelText('Currency'), { target: { value: 'USD' } });
  fireEvent.change(screen.getByLabelText('Date brought into Thailand'), { target: { value: '2026-03-02' } });
  fireEvent.change(screen.getByLabelText('Amount'), { target: { value: amount } });
};
const estimate = () => fireEvent.click(screen.getByRole('button', { name: 'Estimate my tax' }));

describe('ForeignIncomeCalculator with folders and currencies', () => {
  beforeEach(() => {
    sessionStorage.clear();
    mockRate.mockReset();
  });

  it('passes converted baht to the estimate and shows the original currency in results', async () => {
    mockRate.mockResolvedValue(ok('USD', 35.62));
    const onEstimate = vi.fn();
    renderCalc(onEstimate);
    setDays('200');
    usdTransfer('20000');
    await screen.findByText(/Bank of Thailand average rate/);
    estimate();
    expect(onEstimate.mock.calls[0][0].remittances[0].amountThb).toBe(712400);
    const results = screen.getByRole('region', { name: /estimate/i });
    expect(within(results).getByText(/USD 20,000 → ฿712,400/)).toBeInTheDocument();
  });

  it('blocks submit when a foreign transfer has no rate', async () => {
    mockRate.mockResolvedValue({ ok: false, error: { type: 'network', message: 'x' } });
    const onEstimate = vi.fn();
    renderCalc(onEstimate);
    setDays('200');
    usdTransfer('1000');
    await screen.findByText('Enter the rate from your bank statement');
    fireEvent.click(screen.getByRole('button', { name: /^Money brought in/ })); // close it
    estimate();
    expect(screen.getByRole('alert')).toHaveTextContent('Enter the exchange rate for transfer 1.');
    expect(screen.getByRole('button', { name: /^Money brought in/ })).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() => expect(screen.getByLabelText('Rate (฿ per 1 USD)')).toHaveFocus());
    expect(onEstimate).not.toHaveBeenCalled();
  });

  it('opens the About you folder when days are missing', async () => {
    renderCalc();
    fireEvent.click(screen.getByRole('button', { name: /^About you/ }));
    estimate();
    expect(screen.getByRole('button', { name: /^About you/ })).toHaveAttribute('aria-expanded', 'true');
    await waitFor(() => expect(screen.getByLabelText('Days in Thailand this year')).toHaveFocus());
  });

  it('closed folders show summaries', () => {
    renderCalc();
    setDays('200');
    fireEvent.click(screen.getByRole('button', { name: /^About you/ }));
    expect(
      screen.getByRole('button', { name: /About you · 200 days · resident · Standard \/ work visa/ })
    ).toHaveAttribute('aria-expanded', 'false');
  });

  it('new transfer defaults to the last-used currency', () => {
    mockRate.mockResolvedValue(ok('EUR', 38));
    renderCalc();
    fireEvent.change(screen.getByLabelText('Currency'), { target: { value: 'EUR' } });
    fireEvent.click(screen.getByRole('button', { name: '+ Add another transfer' }));
    expect(screen.getAllByLabelText('Currency')[1]).toHaveValue('EUR');
  });

  it('foreign tax paid converts with its own currency', () => {
    const onEstimate = vi.fn();
    renderCalc(onEstimate);
    setDays('200');
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: '500000' } });
    fireEvent.change(screen.getByLabelText('Currency of foreign tax'), { target: { value: 'GBP' } });
    fireEvent.change(screen.getByLabelText('Foreign tax already paid on this money (optional)'), { target: { value: '1000' } });
    fireEvent.change(screen.getByLabelText('Rate for foreign tax (฿ per 1 GBP)'), { target: { value: '45' } });
    expect(screen.getByText('≈ ฿45,000 (approximate)')).toBeInTheDocument();
    estimate();
    expect(onEstimate.mock.calls[0][0].foreignTaxPaidThb).toBe(45000);
  });

  it('restores a v1 session as THB transfers', () => {
    sessionStorage.setItem(
      'mtt-foreign-income-calculator-v1',
      JSON.stringify({
        daysInThailand: 200, visaType: 'regular', nationality: '', foreignIncomeTypes: [],
        remittances: [{ id: 'a', amountThb: 50000, yearEarned: 2026, kind: 'income', incomeType: 'employment', residentInYearEarned: 'yes' }],
        thaiIncome: { annualSalary: 0, socialSecurityPaid: 0, otherThaiIncome: 0 }, foreignTaxPaidThb: 0,
      })
    );
    renderCalc();
    expect(screen.getByLabelText('Currency')).toHaveValue('THB');
    expect(screen.getByLabelText('Amount')).toHaveValue('50,000');
  });

  it('hides a stale estimate while a transfer needs a rate', async () => {
    mockRate.mockImplementation(async (_c: string, d: string) =>
      d === '2026-03-02' ? ok('USD', 35.62) : { ok: false, error: { type: 'network', message: 'x' } }
    );
    renderCalc();
    setDays('200');
    usdTransfer('20000');
    await screen.findByText(/Bank of Thailand average rate/);
    estimate();
    expect(screen.getByRole('region', { name: /estimate/i })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Date brought into Thailand'), { target: { value: '2026-03-03' } });
    await screen.findByText('Enter the rate from your bank statement');
    expect(screen.queryByRole('region', { name: /estimate/i })).not.toBeInTheDocument();
    expect(screen.getByText(/Transfer 1 needs an exchange rate/)).toBeInTheDocument();
  });

  it('marks un-rated transfers in the closed Money summary instead of counting them as ฿0', async () => {
    mockRate.mockResolvedValue({ ok: false, error: { type: 'network', message: 'x' } });
    renderCalc();
    usdTransfer('1000');
    await screen.findByText('Enter the rate from your bank statement');
    fireEvent.click(screen.getByRole('button', { name: /^Money brought in/ }));
    expect(screen.getByRole('button', { name: /1 transfer · ฿0 · 1 needs a rate/ })).toBeInTheDocument();
  });
});
