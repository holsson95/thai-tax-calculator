import React from 'react';

/** Parse a typed money string ("1,234") to a non-negative number; anything else is 0. */
export const toNumber = (v: string): number => {
  const n = Number(v.replace(/,/g, ''));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

export const inputCls =
  'w-full px-3 py-2.5 border border-ink/30 rounded-md text-ink bg-white placeholder:text-ink-mute/70 focus:outline-none focus:ring-2 focus:ring-desk focus:border-transparent';
export const labelCls = 'block text-sm font-semibold text-ink mb-1';
export const hintCls = 'text-xs text-ink-mute mt-1';

interface MoneyFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  hint?: string;
  /** Shown inside the field before the number: '฿' or a currency code. */
  prefix?: string;
}

export const MoneyField: React.FC<MoneyFieldProps> = ({ id, label, value, onChange, hint, prefix = '฿' }) => (
  <div>
    <label htmlFor={id} className={labelCls}>
      {label}
    </label>
    <div className="relative">
      <span
        className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-sm text-ink-mute select-none"
        aria-hidden="true"
      >
        {prefix}
      </span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        className={`${inputCls} ${prefix.length > 1 ? 'pl-14' : 'pl-7'}`}
        value={value ? value.toLocaleString('en-US') : ''}
        placeholder="0"
        onChange={(e) => onChange(toNumber(e.target.value))}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
    </div>
    {hint && (
      <p id={`${id}-hint`} className={hintCls}>
        {hint}
      </p>
    )}
  </div>
);
