import React, { Suspense, useCallback, useEffect, useMemo, useState } from 'react';
import { isLeadsApiConfigured } from '../config/partner';
import { leadContextFromSalary } from '../utils/leadContext';
import { track, taxBand } from '../utils/analytics';
import { calculateThaiTax } from '../utils/tax';
import { TAX_CONSTANTS } from '../types/taxForm';
import { TAX_YEAR_CONFIG } from '../config/taxConfig';

type Period = 'yearly' | 'monthly' | 'weekly';

function toAnnual(amount: number, period: Period): number {
  if (period === 'monthly') return amount * 12;
  if (period === 'weekly') return amount * 52;
  return amount;
}

function computeTax(annualIncome: number, includeSS: boolean) {
  const standardDeduction = Math.min(annualIncome * TAX_CONSTANTS.STANDARD_DEDUCTION_RATE, TAX_CONSTANTS.MAX_STANDARD_DEDUCTION);
  const personalAllowance = TAX_CONSTANTS.PERSONAL_ALLOWANCE;
  const socialSecurity = includeSS ? TAX_CONSTANTS.MAX_SOCIAL_SECURITY : 0;
  const taxableIncome = Math.max(0, annualIncome - standardDeduction - personalAllowance - socialSecurity);
  const annualTax = calculateThaiTax(taxableIncome);
  return { annualTax, monthlyTax: annualTax / 12, taxableIncome };
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

const PERIOD_LABELS: Record<Period, string> = {
  yearly: 'Yearly',
  monthly: 'Monthly',
  weekly: 'Weekly',
};

const PLACEHOLDER: Record<Period, string> = {
  yearly: '600000',
  monthly: '50000',
  weekly: '12500',
};

export interface QuickEstimate {
  annualIncome: number;
  annualTax: number;
  monthlyTax: number;
  taxableIncome: number;
}

interface QuickTaxCalculatorProps {
  /** Called whenever the estimate changes (null when no income is entered). */
  onResult?: (estimate: QuickEstimate | null) => void;
}

/** Square form box with a drawn cross when ticked (shared by radio and checkbox). */
const FormBox: React.FC<{ checked: boolean }> = ({ checked }) => (
  <span
    aria-hidden="true"
    className="relative inline-flex h-5 w-5 shrink-0 items-center justify-center border-2 border-desk bg-paper-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-desk"
  >
    {checked && (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-ink" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
        <path d="M3 3l10 10M13 3L3 13" />
      </svg>
    )}
  </span>
);

// Loaded only after a result exists and only if the leads API is configured,
// so the homepage bundle does not grow.
const LeadCTA = React.lazy(() => import('./leads/LeadCTA'));

const QuickTaxCalculator: React.FC<QuickTaxCalculatorProps> = ({ onResult }) => {
  const [period, setPeriod] = useState<Period>('monthly');
  const [rawInput, setRawInput] = useState('');
  const [includeSS, setIncludeSS] = useState(true);

  const inputAmount = parseFloat(rawInput.replace(/,/g, '')) || 0;
  const annualIncome = toAnnual(inputAmount, period);
  const hasIncome = inputAmount > 0;
  const result = hasIncome ? computeTax(annualIncome, includeSS) : null;
  const annualTax = result?.annualTax ?? 0;
  const taxable = result?.taxableIncome ?? 0;
  const leadContext = useMemo(() => leadContextFromSalary('quick', annualTax, taxable), [annualTax, taxable]);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    if (!onResult) return;
    onResult(result ? { annualIncome, annualTax: result.annualTax, monthlyTax: result.monthlyTax, taxableIncome: result.taxableIncome } : null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [annualIncome, annualTax, taxable, hasIncome]);

  // calculator_completed fires once, after the result has stopped changing for 2s (not on every keystroke).
  useEffect(() => {
    if (!hasIncome || settled) return;
    const t = setTimeout(() => {
      setSettled(true);
      track('calculator_completed', { calculator: 'quick', tax_band: taxBand(annualTax) });
    }, 2000);
    return () => clearTimeout(t);
  }, [hasIncome, annualTax, settled]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '').slice(0, 9);
    setRawInput(val);
  }, []);

  const effectiveRate = result && annualIncome > 0 ? (result.annualTax / annualIncome) * 100 : 0;

  return (
    <div className="on-paper text-ink">
      {/* 1 — period */}
      <fieldset>
        <legend className="field-label w-full border-b-2 border-desk pb-1.5 mb-3">
          1 · How you are paid
        </legend>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {(['yearly', 'monthly', 'weekly'] as Period[]).map(p => (
            <label key={p} className="flex items-center gap-2 cursor-pointer select-none text-[15px]">
              <input
                type="radio"
                name="quick-period"
                value={p}
                checked={period === p}
                onChange={() => setPeriod(p)}
                className="peer sr-only"
              />
              <FormBox checked={period === p} />
              <span className={period === p ? 'font-semibold' : 'text-ink-soft'}>{PERIOD_LABELS[p]}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {/* 2 — income */}
      <div className="mt-5">
        <label htmlFor="quick-income" className="field-label block border-b-2 border-desk pb-1.5 mb-3">
          2 · {PERIOD_LABELS[period]} salary, in baht
        </label>
        <input
          id="quick-income"
          type="text"
          inputMode="numeric"
          autoComplete="off"
          value={rawInput}
          onChange={handleInput}
          placeholder={PLACEHOLDER[period]}
          aria-describedby="quick-income-hint"
          className="comb-input"
        />
        <p id="quick-income-hint" className="mt-2 text-xs text-ink-mute">
          Salaried income before tax. The 50% employment deduction (max ฿{fmt(TAX_CONSTANTS.MAX_STANDARD_DEDUCTION)}) and ฿{fmt(TAX_CONSTANTS.PERSONAL_ALLOWANCE)} personal allowance are applied for you.
        </p>
        <label className="mt-3 flex w-fit items-center gap-2 cursor-pointer select-none text-[15px]">
          <input
            type="checkbox"
            checked={includeSS}
            onChange={e => setIncludeSS(e.target.checked)}
            className="peer sr-only"
          />
          <FormBox checked={includeSS} />
          <span>
            I pay social security
            <span className="text-ink-mute ml-1">(฿{fmt(TAX_CONSTANTS.MAX_SOCIAL_SECURITY)}/yr deducted)</span>
          </span>
        </label>
      </div>

      {/* 3 — result */}
      <div className="mt-5">
        <p className="field-label border-b-2 border-desk pb-1.5 mb-3">3 · Estimated Thai income tax</p>
        <div className="relative border-2 border-desk" aria-live="polite">
          <div className="grid grid-cols-2 divide-x-2 divide-desk">
            <div className="px-4 py-3">
              <p className="text-xs text-ink-mute">Per year</p>
              <p className={`font-mono text-[34px] sm:text-[40px] font-bold leading-tight tabular-nums ${result ? 'text-ink' : 'text-ink-mute'}`}>
                {result ? fmt(result.annualTax) : '–––'}
              </p>
            </div>
            <div className="px-4 py-3">
              <p className="text-xs text-ink-mute">Per month</p>
              <p className={`font-mono text-[34px] sm:text-[40px] font-bold leading-tight tabular-nums ${result ? 'text-ink' : 'text-ink-mute'}`}>
                {result ? fmt(result.monthlyTax) : '–––'}
              </p>
            </div>
          </div>
          <div className="border-t-2 border-desk py-2 pl-4 pr-28 text-xs text-ink-soft sm:pr-4">
            {result ? (
              <>
                ฿{fmt(annualIncome)} a year · ฿{fmt(result.taxableIncome)} taxable · effective rate {effectiveRate.toFixed(1)}%
              </>
            ) : (
              <>Type your salary in box 2 and the estimate fills in here.</>
            )}
          </div>
          {result && (
            <span
              key={result.annualTax === 0 ? 'zero' : 'tax'}
              className="pointer-events-none absolute -bottom-3 right-2 animate-stamp-in sm:-top-5 sm:bottom-auto sm:right-3 rounded-md border-[3px] border-stamp px-2.5 py-0.5 text-sm font-extrabold uppercase tracking-[0.18em] text-stamp mix-blend-multiply"
            >
              {result.annualTax === 0 ? 'No tax due' : 'Estimate'}
            </span>
          )}
        </div>
        <p className="mt-6 text-[11px] leading-snug text-ink-mute sm:mt-2">
          Rates:{' '}
          <a
            href="https://www.rd.go.th/59670.html"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-ink"
          >
            Revenue Department rate table
          </a>{' '}
          · tax year {TAX_YEAR_CONFIG.CURRENT_TAX_YEAR} · an estimate, not tax advice.
        </p>
      </div>

      {result && settled && isLeadsApiConfigured() && (
        <Suspense fallback={null}>
          <div className="mt-4">
            <LeadCTA context={leadContext} />
          </div>
        </Suspense>
      )}
    </div>
  );
};

export default QuickTaxCalculator;
