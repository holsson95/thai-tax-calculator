import React from 'react';
import { Link } from 'react-router-dom';
import LastUpdated from '../LastUpdated';

export type CopyPaper = 'canary' | 'pink' | 'sky';

const PAPER: Record<CopyPaper, string> = {
  canary: 'bg-paper-canary',
  pink: 'bg-paper-pink',
  sky: 'bg-paper-sky',
};

interface CalculatorFrameProps {
  title: string;
  /** Short breadcrumb name after "Home". */
  crumb: string;
  updated: string;
  intro: React.ReactNode;
  /** The calculator's copy colour (DESIGN.md copy stack: annual canary, monthly pink, foreign income sky). */
  paper: CopyPaper;
  /** Text on the copy's tab, e.g. "Annual return · tax year 2026". */
  tab: string;
  /** Rendered as the Home crumb. Pass to replace the default link (e.g. a button with a handler). */
  homeLink?: React.ReactNode;
  /** The working form. */
  children: React.ReactNode;
  /** The back of the form: reference sheets below the desk. */
  reference?: React.ReactNode;
}

/**
 * Calculator page: a short ultramarine desk carrying the title, the working form as the
 * warm-white top sheet straddling the desk and the ground, and the calculator's own
 * coloured copy lying behind it with its tab showing. Below, the back of the form.
 */
const CalculatorFrame: React.FC<CalculatorFrameProps> = ({
  title,
  crumb,
  updated,
  intro,
  paper,
  tab,
  homeLink,
  children,
  reference,
}) => (
  <div className="overflow-x-clip bg-paper-ground">
    {/* Desk */}
    <div className="bg-desk text-white">
      <div className="mx-auto max-w-3xl px-4 pb-28 pt-8 sm:px-6 sm:pb-32 sm:pt-10">
        <nav aria-label="Breadcrumb" className="mb-5 flex items-center gap-2 text-[13px] font-medium text-white/70">
          {homeLink ?? (
            <Link to="/" aria-label="Go to home page" className="hover:text-white">
              Home
            </Link>
          )}
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-white">{crumb}</span>
        </nav>
        <h1 className="display text-[34px] leading-[1.05] sm:text-5xl">{title}</h1>
        <LastUpdated date={updated} tone="desk" className="mt-3" />
        <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-white/85 sm:text-[17px]">{intro}</p>
      </div>
    </div>

    {/* The form, lying across the desk edge */}
    <div className="mx-auto -mt-20 max-w-3xl px-4 pb-14 sm:-mt-24 sm:px-6 sm:pb-20">
      <div className="relative pt-9">
        {/* The coloured copy behind, with its tab. Tilted from sm up only: the tilt pivots on the
            bottom-left corner, so on a long form it swings the tab off a phone screen. */}
        <div
          aria-hidden="true"
          className={`${PAPER[paper]} absolute inset-x-0 bottom-0 top-9 origin-bottom-left translate-x-1.5 -translate-y-1 shadow-sheet sm:translate-x-3.5 sm:rotate-[1.4deg]`}
        >
          <span
            className={`${PAPER[paper]} absolute -top-8 right-6 flex h-8 items-center whitespace-nowrap rounded-t-md px-4 text-[13px] font-bold text-ink sm:right-10 sm:text-sm`}
          >
            {tab}
          </span>
        </div>
        <section aria-label={title} className="on-paper relative bg-paper-white text-ink shadow-sheet">
          {children}
        </section>
      </div>
    </div>

    {reference && (
      <div className="pb-16 sm:pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-10">
          <div className="perforation mb-12 text-ink/30" aria-hidden="true" />
          {reference}
        </div>
      </div>
    )}
  </div>
);

export default CalculatorFrame;

/** Placeholder inside the sheet while the calculator chunk loads (SSR and first paint). */
export const SheetLoading: React.FC<{ children?: React.ReactNode; className?: string }> = ({ children, className = 'min-h-[520px]' }) => (
  <div className={`px-5 py-7 sm:px-8 ${className}`} aria-busy="true">
    <p className="field-label border-b-2 border-desk pb-1.5 text-ink-mute">Loading the form</p>
    {children && <div className="mt-5 max-w-prose text-[15px] leading-relaxed text-ink-soft">{children}</div>}
  </div>
);
