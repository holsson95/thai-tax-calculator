import React, { useEffect, useRef, useState } from 'react';
import { COMMON_CURRENCIES, EXTENDED_CURRENCIES } from '../../config/taxConfig';
import { RULES_TAX_YEAR } from '../../config/taxRules';
import { getExchangeRate } from '../../services/exchangeRateService';
import { MoneyField, hintCls, inputCls, labelCls } from './fields';
import { thbAmounts, TransferMoney } from './transferMoney';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** '2026-03-02' → '2 Mar 2026' (fixed format, independent of the browser locale). */
export const formatIsoDate = (iso: string): string => {
  const [y, m, d] = iso.split('-').map(Number);
  return y && m && d ? `${d} ${MONTHS[m - 1]} ${y}` : iso;
};

/** Today as YYYY-MM-DD in the user's local time zone. */
const todayLocal = (): string => {
  const t = new Date();
  const pad = (n: number) => String(n).padStart(2, '0');
  return `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`;
};

const REFERENCE_NOTE =
  'This is a reference rate. The baht amount your Thai bank actually credited is the most accurate figure. If you have it, choose THB and enter that.';

interface Props {
  idPrefix: string;
  value: TransferMoney;
  onChange: (next: TransferMoney) => void;
  showIncomePortion: boolean;
}

const TransferMoneyFields: React.FC<Props> = ({ idPrefix, value, onChange, showIncomePortion }) => {
  const isThb = value.currency === 'THB';
  const [loading, setLoading] = useState(false);
  const [lookupFailed, setLookupFailed] = useState(false);
  const [rateText, setRateText] = useState(value.rate && !isThb ? String(value.rate) : '');

  // Async results must merge into the latest value, not the one captured when the lookup started.
  const valueRef = useRef(value);
  valueRef.current = value;

  // Keep the rate box in step with rates that did not come from typing (BOT lookups, resets).
  useEffect(() => {
    if (value.rateSource !== 'user') setRateText(value.rate && !isThb ? String(value.rate) : '');
  }, [value.rate, value.rateSource, isThb]);

  useEffect(() => {
    setLookupFailed(false);
    const v = valueRef.current;
    if (isThb || !value.date || v.rate !== null || v.rateSource === 'user') return;
    let cancelled = false;
    setLoading(true);
    getExchangeRate(value.currency, value.date).then((res) => {
      if (cancelled) return;
      setLoading(false);
      const latest = valueRef.current;
      if (latest.rateSource === 'user') return;
      if (res.ok) {
        onChange({ ...latest, rate: res.data.rate, rateSource: 'bot', rateDate: res.data.date });
      } else {
        setLookupFailed(true);
      }
    });
    return () => {
      cancelled = true;
      setLoading(false);
    };
    // onChange is a fresh closure each render; the lookup depends only on currency and date.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value.currency, value.date, isThb]);

  const setCurrency = (currency: string) =>
    onChange({
      ...value,
      currency,
      rate: currency === 'THB' ? 1 : null,
      rateSource: null,
      rateDate: undefined,
    });
  const setDate = (date: string) => onChange({ ...value, date, rate: isThb ? 1 : null, rateSource: null, rateDate: undefined });
  const setRate = (raw: string) => {
    setRateText(raw);
    const n = Number(raw.replace(/,/g, ''));
    onChange({ ...value, rate: Number.isFinite(n) && n > 0 ? n : null, rateSource: 'user', rateDate: undefined });
  };

  const converted = thbAmounts(value);
  const prefix = isThb ? '฿' : value.currency;
  let rateStatus: string;
  if (loading) rateStatus = 'Looking up the Bank of Thailand rate…';
  else if (value.rateSource === 'user') rateStatus = 'Your rate';
  else if (value.rateSource === 'bot' && value.rateDate) rateStatus = `Bank of Thailand average rate, ${formatIsoDate(value.rateDate)}`;
  else if (lookupFailed) rateStatus = 'Enter the rate from your bank statement';
  else rateStatus = value.date ? '' : 'Pick the date to look up the rate, or type your own.';

  return (
    <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
      <div>
        <label htmlFor={`${idPrefix}-currency`} className={labelCls}>
          Currency
        </label>
        <select
          id={`${idPrefix}-currency`}
          className={inputCls}
          value={value.currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <option value="THB">THB - Thai Baht</option>
          <optgroup label="Common">
            {COMMON_CURRENCIES.filter((c) => c.code !== 'THB').map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.name}
              </option>
            ))}
          </optgroup>
          <optgroup label="Other">
            {EXTENDED_CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.code} - {c.name}
              </option>
            ))}
          </optgroup>
        </select>
      </div>
      <MoneyField
        id={`${idPrefix}-amount`}
        label="Amount"
        prefix={prefix}
        value={value.amount}
        onChange={(n) => onChange({ ...value, amount: n })}
      />

      {!isThb && (
        <>
          <div>
            <label htmlFor={`${idPrefix}-date`} className={labelCls}>
              Date brought into Thailand
            </label>
            <input
              id={`${idPrefix}-date`}
              type="date"
              className={inputCls}
              min={`${RULES_TAX_YEAR}-01-01`}
              max={todayLocal()}
              value={value.date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor={`${idPrefix}-rate`} className={labelCls}>
              Rate (฿ per 1 {value.currency})
            </label>
            <input
              id={`${idPrefix}-rate`}
              type="text"
              inputMode="decimal"
              autoComplete="off"
              className={inputCls}
              value={rateText}
              placeholder="e.g. 35.50"
              onChange={(e) => setRate(e.target.value)}
              aria-describedby={`${idPrefix}-rate-status`}
            />
            <p id={`${idPrefix}-rate-status`} className={hintCls} aria-live="polite">
              {rateStatus}
            </p>
          </div>
        </>
      )}

      {showIncomePortion && (
        <MoneyField
          id={`${idPrefix}-portion`}
          label="Income or gain part, if known"
          prefix={prefix}
          value={value.incomePortion ?? 0}
          onChange={(n) => onChange({ ...value, incomePortion: n || undefined })}
          hint="Leave blank to count the whole amount (cautious)."
        />
      )}

      <div className="sm:col-span-2">
        {converted && value.amount > 0 && (
          <p className="font-mono text-sm font-semibold tabular-nums text-ink">= ฿{converted.amountThb.toLocaleString('en-US')} used in the estimate</p>
        )}
        {!isThb && <p className={`${hintCls} mt-1 max-w-prose`}>{REFERENCE_NOTE}</p>}
      </div>
    </div>
  );
};

export default TransferMoneyFields;
