import React, { forwardRef } from 'react';

interface FolderProps {
  id: string;
  /** Part number printed in the boxed cell on the header (visual only). */
  n: number;
  title: string;
  /** Shown on the header while the part is closed, e.g. "About you · 200 days · resident · DTV". */
  summary: string;
  open: boolean;
  onToggle: () => void;
  /** Renders "Next: <label>" at the bottom of the open part. */
  next?: { label: string; onClick: () => void };
  children: React.ReactNode;
}

const Chevron: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 12 12"
    className={`h-3.5 w-3.5 shrink-0 text-desk transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
  >
    <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * One numbered part of the foreign income form, ruled off on the working sheet.
 * The header opens and closes it; closed, it carries a one-line summary of what was
 * filled in, so the whole form reads as a filled-in return at a glance.
 * The header button is forwarded as a ref so callers can move focus to it.
 */
const Folder = forwardRef<HTMLButtonElement, FolderProps>(({ id, n, title, summary, open, onToggle, next, children }, ref) => (
  <section className="min-w-0 border-b-2 border-desk">
    <h2 className="m-0">
      <button
        ref={ref}
        id={`${id}-tab`}
        type="button"
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={onToggle}
        className={`flex w-full items-center gap-4 px-5 py-4 text-left transition-colors sm:px-8 ${
          open ? '' : 'hover:bg-desk/[0.05]'
        }`}
      >
        <span
          aria-hidden="true"
          className={`flex h-9 w-9 shrink-0 items-center justify-center border-2 border-desk font-mono text-sm font-bold transition-colors ${
            open ? 'bg-[#FEF8E1] text-ink' : 'bg-desk text-white'
          }`}
        >
          {n}
        </span>
        <span
          className={`min-w-0 flex-1 text-ink ${open ? 'display text-xl leading-tight sm:text-2xl' : 'text-[15px] font-semibold leading-snug'}`}
        >
          {open ? title : summary}
        </span>
        <Chevron open={open} />
      </button>
    </h2>
    <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-tab`} hidden={!open} className="px-5 pb-7 pt-1 sm:px-8 sm:pb-8">
      {children}
      {next && (
        <div className="mt-7 flex justify-end">
          <button type="button" onClick={next.onClick} className="btn-secondary">
            Next: {next.label}
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  </section>
));
Folder.displayName = 'Folder';

export default Folder;
