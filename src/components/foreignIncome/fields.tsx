import React from 'react';

/** Parse a typed money string ("1,234") to a non-negative number; anything else is 0. */
export const toNumber = (v: string): number => {
  const n = Number(v.replace(/,/g, ''));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

/* The carbon-copy field vocabulary (src/index.css: .field-input, .field-name, .field-hint). */
export const inputCls = 'field-input';
export const labelCls = 'field-name';
export const hintCls = 'field-hint';

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
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none font-mono text-[15px] text-ink-mute"
        aria-hidden="true"
      >
        {prefix}
      </span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        className={`${inputCls} ${prefix.length > 1 ? 'pl-14' : 'pl-8'}`}
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
