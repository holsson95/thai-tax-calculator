import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import QuickTaxCalculator, { QuickEstimate } from '../QuickTaxCalculator';

type SheetId = 'quick' | 'annual' | 'monthly' | 'foreign';

interface SheetMeta {
  id: SheetId;
  tab: string;
  short: string;
  paper: string; // tailwind bg class
}

const SHEETS: SheetMeta[] = [
  { id: 'quick', tab: 'Quick estimate', short: 'Quick', paper: 'bg-paper-white' },
  { id: 'annual', tab: 'Annual return', short: 'Annual', paper: 'bg-paper-canary' },
  { id: 'monthly', tab: 'Monthly withholding', short: 'Monthly', paper: 'bg-paper-pink' },
  { id: 'foreign', tab: 'Foreign income', short: 'Foreign', paper: 'bg-paper-sky' },
];

// How each sheet sits behind the active one: offset and tilt by depth.
const FAN = [
  'translate-x-0 translate-y-0 rotate-0',
  'translate-x-3 -translate-y-1 rotate-[1.6deg]',
  'translate-x-6 -translate-y-1.5 rotate-[3.2deg]',
  'translate-x-9 -translate-y-2 rotate-[4.8deg]',
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function fmt(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

const Arrow: React.FC<{ className?: string }> = ({ className = 'h-4 w-4' }) => (
  <svg viewBox="0 0 20 20" className={className} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 10h12M11 5l5 5-5 5" />
  </svg>
);

const SheetAction: React.FC<{ to: string; children: React.ReactNode }> = ({ to, children }) => (
  <Link
    to={to}
    className="group mt-6 inline-flex items-center gap-2 bg-desk px-5 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-desk-deep"
  >
    {children}
    <Arrow className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
  </Link>
);

/** A ruled form line: label left, value right. */
const FormLine: React.FC<{ label: string; value: string }> = ({ label, value }) => (
  <li className="flex items-baseline justify-between gap-4 border-b border-ink/25 py-2 text-[15px]">
    <span>{label}</span>
    <span className="text-right text-sm text-ink-soft">{value}</span>
  </li>
);

const CopyStack: React.FC = () => {
  const [active, setActive] = useState<SheetId>('quick');
  const [estimate, setEstimate] = useState<QuickEstimate | null>(null);
  const tabRefs = useRef<Record<SheetId, HTMLButtonElement | null>>({ quick: null, annual: null, monthly: null, foreign: null });

  const onResult = useCallback((e: QuickEstimate | null) => setEstimate(e), []);

  const activeIndex = SHEETS.findIndex(s => s.id === active);

  const onTabKey = (e: React.KeyboardEvent, index: number) => {
    let next = index;
    if (e.key === 'ArrowRight') next = (index + 1) % SHEETS.length;
    else if (e.key === 'ArrowLeft') next = (index - 1 + SHEETS.length) % SHEETS.length;
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = SHEETS.length - 1;
    else return;
    e.preventDefault();
    const id = SHEETS[next].id;
    setActive(id);
    tabRefs.current[id]?.focus();
  };

  // Depth of a sheet behind the active one (0 = on top).
  const depthOf = (index: number) => (index - activeIndex + SHEETS.length) % SHEETS.length;

  return (
    <div className="relative">
      {/* Tab edges */}
      <div role="tablist" aria-label="Calculators" className="relative z-30 flex items-end gap-1 overflow-x-auto overflow-y-hidden pl-2 pr-10 [scrollbar-width:none] sm:gap-1.5">
        {SHEETS.map((s, i) => {
          const isActive = s.id === active;
          return (
            <button
              key={s.id}
              ref={el => { tabRefs.current[s.id] = el; }}
              role="tab"
              id={`sheet-tab-${s.id}`}
              aria-selected={isActive}
              aria-controls={`sheet-${s.id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(s.id)}
              onKeyDown={e => onTabKey(e, i)}
              className={`${s.paper} shrink-0 whitespace-nowrap rounded-t-md px-3 pb-2.5 pt-2 text-[13px] font-bold text-ink transition-[margin,filter] duration-200 sm:px-4 sm:text-sm ${
                isActive ? 'mt-0' : 'mt-1.5 brightness-[0.93] hover:mt-0.5 hover:brightness-100'
              }`}
            >
              <span className="sm:hidden" aria-hidden="true">{s.short}</span>
              <span className="sr-only sm:not-sr-only">{s.tab}</span>
            </button>
          );
        })}
      </div>

      {/* The stack: every sheet shares one grid cell. On desktop the tallest sets the height so nothing
          jumps; below lg the sheets behind are taken out of flow, so the active sheet sets the height and
          a short sheet doesn't leave a tall empty bottom on phones. */}
      <div className="relative grid grid-cols-[minmax(0,1fr)]">
        {SHEETS.map((s, i) => {
          const depth = depthOf(i);
          const isActive = depth === 0;
          return (
            <section
              key={s.id}
              id={`sheet-${s.id}`}
              role="tabpanel"
              aria-labelledby={`sheet-tab-${s.id}`}
              aria-hidden={!isActive}
              // React 18 has no typed `inert`; an empty string renders the boolean attribute.
              {...(!isActive ? ({ inert: '' } as Record<string, string>) : {})}
              style={{ zIndex: 20 - depth, gridArea: '1 / 1' }}
              className={`${s.paper} ${FAN[depth]} ${isActive ? '' : 'max-lg:absolute max-lg:inset-0 max-lg:overflow-hidden'} min-w-0 origin-bottom-left px-5 pb-7 pt-6 text-ink shadow-sheet transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-8 sm:pt-7`}
            >
              <div className={isActive ? 'opacity-100 transition-opacity duration-200' : 'opacity-0'}>
                {s.id === 'quick' && <QuickTaxCalculator onResult={onResult} />}

                {s.id === 'annual' && (
                  <div>
                    <h2 className="display text-2xl sm:text-[28px] leading-tight">Annual return, line by line</h2>
                    <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-soft">
                      The full-year calculation with everything the quick estimate leaves out, step by step, ending
                      with a breakdown you can save as a PDF.
                    </p>
                    <ul className="mt-4">
                      <FormLine label="Who you are" value="Salaried, freelancer or company owner" />
                      <FormLine label="Household" value="Spouse, children, parents" />
                      <FormLine label="Deductions" value="Insurance, funds, donations and more" />
                      <FormLine label="Foreign income" value="Remitted income and residency" />
                      <FormLine label="Already paid" value="Tax withheld, refund or balance due" />
                    </ul>
                    <SheetAction to="/annual-tax/">Open the annual calculator</SheetAction>
                  </div>
                )}

                {s.id === 'monthly' && (
                  <div>
                    <h2 className="display text-2xl sm:text-[28px] leading-tight">What should come off each payslip?</h2>
                    <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-soft">
                      {estimate
                        ? 'Your quick estimate spread evenly across the year:'
                        : 'Fill in the quick estimate sheet and your twelve months appear here.'}
                    </p>
                    {/* The 12-month row is one unbroken line: it never wraps. On phones it scrolls sideways with a fade cue. */}
                    <div className="mt-4 min-w-0 max-w-full overflow-x-auto [mask-image:linear-gradient(to_right,black_82%,transparent)] sm:overflow-visible sm:[mask-image:none]">
                      <ol className="grid w-max grid-cols-[repeat(12,56px)] border-2 border-desk bg-white/60 sm:w-auto sm:grid-cols-12" aria-label="Estimated tax per month">
                        {MONTHS.map((m, idx) => (
                          <li key={m} className={`flex min-w-0 flex-col items-center py-2 ${idx > 0 ? 'border-l border-desk/60' : ''}`}>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">{m}</span>
                            <span className="mt-1 font-mono text-[11px] font-semibold tabular-nums">
                              {estimate ? fmt(estimate.monthlyTax) : '–'}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <p className="mt-3 text-xs leading-snug text-ink-soft">
                      An even split of the annual estimate. Employers project withholding from each month's pay, so
                      your payslip can differ; the withholding calculator follows that method.
                    </p>
                    <ul className="mt-4">
                      <FormLine label="How you are paid" value="Salary, freelance or both" />
                      <FormLine label="Household" value="Spouse, children, parents" />
                      <FormLine label="Deductions" value="Insurance, funds, social security" />
                    </ul>
                    <SheetAction to="/monthly-withholding/">Open the withholding calculator</SheetAction>
                  </div>
                )}

                {s.id === 'foreign' && (
                  <div>
                    <h2 className="display text-2xl sm:text-[28px] leading-tight">Bringing money into Thailand?</h2>
                    <p className="mt-2 max-w-prose text-[15px] leading-relaxed">
                      Under Revenue Department Order Por. 161/2566 (as amended by Por. 162/2566), foreign income
                      earned on or after 1 January 2024 in a year you were a Thai tax resident (180+ days) may be
                      taxable when you bring it into Thailand, whether in that year or any later year. Income
                      earned before 2024 and the original capital of savings or investments are treated
                      differently, so what you remit and when it was earned matter.
                    </p>
                    <p className="field-label mt-5 border-b-2 border-desk pb-1.5">What the remittance calculator asks</p>
                    <ul>
                      <FormLine label="About you" value="Days in Thailand, visa, nationality" />
                      <FormLine label="Each transfer" value="Amount and year the money was earned" />
                      <FormLine label="What it was" value="Income, savings, or a mix" />
                      <FormLine label="Already taxed abroad" value="Foreign tax paid (optional)" />
                    </ul>
                    <div className="flex flex-wrap items-center gap-x-5">
                      <SheetAction to="/foreign-income-tax-calculator/">Estimate tax on money you remit</SheetAction>
                      <Link to="/articles/foreign-income-thailand-tax/" className="mt-6 text-[15px] font-semibold underline">
                        Read the foreign income guide
                      </Link>
                    </div>
                    <p className="mt-4 text-[11px] text-ink-soft">
                      Source:{' '}
                      <a
                        href="https://www.rd.go.th/fileadmin/user_upload/porphor/PIT_Sec41_Paragraph2_QnA.pdf"
                        className="underline hover:text-ink"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Revenue Department Q&amp;A on Section 41 paragraph 2 (Thai)
                      </a>
                      . Estimates only, not tax advice.
                    </p>
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default CopyStack;
