import React from 'react';

/**
 * The calculators' shared form pieces, in the carbon-copy vocabulary (DESIGN.md):
 * square paper, desk-blue ruling, numbered tracked-caps labels, a drawn cross for
 * "ticked", and stamp red only for the result.
 */

/** Square form box with a drawn cross when ticked (shared by radio and checkbox). */
export const FormBox: React.FC<{ checked: boolean; className?: string }> = ({ checked, className = '' }) => (
  <span
    aria-hidden="true"
    className={`relative inline-flex h-5 w-5 shrink-0 items-center justify-center border-2 border-desk bg-paper-white peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-desk ${className}`}
  >
    {checked && (
      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 text-ink" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round">
        <path d="M3 3l10 10M13 3L3 13" />
      </svg>
    )}
  </span>
);

/** A step's heading and one-line purpose, at the top of the working sheet. */
export const StepHeading: React.FC<{ title: React.ReactNode; children?: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-6">
    <h2 className="display text-2xl leading-tight text-ink sm:text-[28px]">{title}</h2>
    {children && <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-soft">{children}</p>}
  </div>
);

/** Numbered tracked-caps label over a 2px desk rule: names the field directly beneath it. */
export const FieldLabel: React.FC<{
  n?: number | string;
  htmlFor?: string;
  as?: 'label' | 'p' | 'legend' | 'h3';
  className?: string;
  id?: string;
  children: React.ReactNode;
}> = ({ n, htmlFor, as = 'p', className = '', id, children }) => {
  const cls = `field-label mb-3 block w-full border-b-2 border-desk pb-1.5 text-ink ${className}`;
  const content = (
    <>
      {n !== undefined && <span className="font-mono">{n} · </span>}
      {children}
    </>
  );
  if (as === 'label') return <label htmlFor={htmlFor} id={id} className={cls}>{content}</label>;
  if (as === 'legend') return <legend id={id} className={cls}>{content}</legend>;
  if (as === 'h3') return <h3 id={id} className={cls}>{content}</h3>;
  return <p id={id} className={cls}>{content}</p>;
};

/** Validation message; the drawn warning mark comes from .field-error::before. */
export const FieldError: React.FC<{ id?: string; children: React.ReactNode; className?: string }> = ({ id, children, className = '' }) => (
  <p id={id} role="alert" className={`field-error ${className}`}>
    <span>{children}</span>
  </p>
);

/**
 * A selectable option row: form box, title and one-line description, ruled off below.
 * Renders a button with aria-pressed (the wizard advances on click).
 */
export const ChoiceRow: React.FC<{
  selected: boolean;
  onClick: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
  aside?: React.ReactNode;
}> = ({ selected, onClick, title, description, disabled, aside }) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    aria-pressed={selected}
    className={`group flex w-full items-start gap-4 border-b border-ink/25 px-1 py-4 text-left transition-colors sm:px-2 ${
      disabled ? 'cursor-not-allowed opacity-60' : 'hover:bg-desk/[0.05]'
    } ${selected ? 'bg-[#FEF8E1]' : ''}`}
  >
    <FormBox checked={selected} className="mt-0.5" />
    <span className="min-w-0 flex-1">
      <span className={`block text-[16px] leading-snug text-ink ${selected ? 'font-bold' : 'font-semibold'}`}>{title}</span>
      {description && <span className="mt-0.5 block text-sm leading-snug text-ink-soft">{description}</span>}
    </span>
    {aside}
  </button>
);

/** A stack of ChoiceRows under a top rule. */
export const ChoiceList: React.FC<{ children: React.ReactNode; label?: string }> = ({ children, label }) => (
  <div role="group" aria-label={label} className="border-t-2 border-desk">
    {children}
  </div>
);

/** Labelled checkbox using the form box. */
export const Check: React.FC<{
  checked: boolean;
  onChange: (checked: boolean) => void;
  children: React.ReactNode;
  id?: string;
  className?: string;
  disabled?: boolean;
  'aria-describedby'?: string;
}> = ({ checked, onChange, children, id, className = '', disabled, ...rest }) => (
  <label className={`flex cursor-pointer select-none items-start gap-3 text-[15px] text-ink ${disabled ? 'cursor-not-allowed opacity-60' : ''} ${className}`}>
    <input
      id={id}
      type="checkbox"
      checked={checked}
      disabled={disabled}
      onChange={e => onChange(e.target.checked)}
      className="peer sr-only"
      aria-describedby={rest['aria-describedby']}
    />
    <FormBox checked={checked} className="mt-0.5" />
    <span className={checked ? 'font-semibold' : ''}>{children}</span>
  </label>
);

/** Labelled radio using the form box. */
export const Radio: React.FC<{
  name: string;
  value: string;
  checked: boolean;
  onChange: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ name, value, checked, onChange, children, className = '' }) => (
  <label className={`flex cursor-pointer select-none items-start gap-3 text-[15px] ${className}`}>
    <input type="radio" name={name} value={value} checked={checked} onChange={onChange} className="peer sr-only" />
    <FormBox checked={checked} className="mt-0.5" />
    <span className={checked ? 'font-semibold text-ink' : 'text-ink-soft'}>{children}</span>
  </label>
);

/** A money field: ฿ printed in the box, figures in mono. */
export const MoneyInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { prefix?: string; size?: 'md' | 'lg' }
>(({ prefix = '฿', size = 'md', className = '', ...props }, ref) => (
  <div className="relative">
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 select-none font-mono text-ink-mute ${size === 'lg' ? 'text-lg' : 'text-[15px]'}`}
    >
      {prefix}
    </span>
    <input
      ref={ref}
      type="text"
      inputMode="decimal"
      autoComplete="off"
      {...props}
      className={`field-input ${prefix.length > 1 ? 'pl-14' : 'pl-8'} ${size === 'lg' ? 'h-14 text-xl font-semibold' : ''} ${className}`}
    />
  </div>
));
MoneyInput.displayName = 'MoneyInput';

/** The red rubber stamp: lands only on a computed result (One Stamp Rule). */
export const Stamp: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
  <span
    className={`pointer-events-none inline-block animate-stamp-in rounded-md border-[3px] border-stamp px-2.5 py-0.5 text-sm font-extrabold uppercase tracking-[0.18em] text-stamp mix-blend-multiply ${className}`}
  >
    {children}
  </span>
);

/** A cell inside the result box: small label over a figure-size mono number. */
export const ResultCell: React.FC<{
  label: React.ReactNode;
  value: React.ReactNode;
  size?: 'lg' | 'md';
  className?: string;
  testId?: string;
  /** One small line under the figure, e.g. "of ฿1,500,000 brought in". */
  note?: React.ReactNode;
}> = ({ label, value, size = 'lg', className = '', testId, note }) => (
  <div className={`min-w-0 px-4 py-3 ${className}`}>
    <p className="text-xs text-ink-mute">{label}</p>
    <p
      data-testid={testId}
      className={`break-words font-mono font-bold leading-tight tabular-nums text-ink ${size === 'lg' ? 'text-[30px] sm:text-[40px]' : 'text-2xl sm:text-[28px]'}`}
    >
      {value}
    </p>
    {note && <p className="mt-0.5 text-xs text-ink-mute">{note}</p>}
  </div>
);

/** The source ticket: source link, tax year, estimate disclaimer. Closes every figure-bearing sheet. */
export const SourceTicket: React.FC<{ href?: string; label?: string; year: number | string; className?: string; children?: React.ReactNode }> = ({
  href = 'https://www.rd.go.th/59670.html',
  label = 'Revenue Department rate table',
  year,
  className = '',
  children,
}) => (
  <p className={`text-[11px] leading-snug text-ink-mute ${className}`}>
    Rates:{' '}
    <a href={href} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
      {label}
    </a>{' '}
    · tax year {year} · {children ?? 'an estimate, not tax advice.'}
  </p>
);
