import React, { forwardRef } from 'react';

interface FolderProps {
  id: string;
  title: string;
  /** Shown on the tab while the folder is closed, e.g. "About you · 200 days · resident · DTV". */
  summary: string;
  /** Paper colour class, e.g. 'bg-paper-canary'. */
  paper: string;
  open: boolean;
  onToggle: () => void;
  /** Renders "Next: <label>" at the bottom of the open folder. */
  next?: { label: string; onClick: () => void };
  children: React.ReactNode;
}

const Chevron: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    aria-hidden="true"
    viewBox="0 0 12 12"
    className={`h-3 w-3 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${open ? 'rotate-180' : ''}`}
  >
    <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/**
 * One section of a calculator as a coloured folder: a tab you click to open or close it,
 * and a sheet below. Closed, the tab carries a one-line summary of what was filled in.
 * The tab is forwarded as a ref so callers can move focus to it.
 */
const Folder = forwardRef<HTMLButtonElement, FolderProps>(
  ({ id, title, summary, paper, open, onToggle, next, children }, ref) => (
    <section className="min-w-0">
      <h2 className="m-0 flex">
        <button
          ref={ref}
          id={`${id}-tab`}
          type="button"
          aria-expanded={open}
          aria-controls={`${id}-panel`}
          onClick={onToggle}
          className={`${paper} relative z-10 flex max-w-full items-center gap-2 rounded-t-md px-4 pb-2 pt-2.5 text-left text-sm font-bold text-ink transition-[filter] duration-200 motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk sm:text-[15px] ${
            open ? '' : 'brightness-[0.95] hover:brightness-100'
          }`}
        >
          <span className="min-w-0">{open ? title : summary}</span>
          <Chevron open={open} />
        </button>
      </h2>
      {/* Closed: a thin paper edge so the folder still reads as a folder. */}
      {!open && <div aria-hidden="true" className={`${paper} h-2.5 rounded-b-sm rounded-tr-md shadow-sheet brightness-[0.95]`} />}
      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-tab`}
        hidden={!open}
        className={`${paper} rounded-b-sm rounded-tr-md px-5 pb-6 pt-5 text-ink shadow-sheet sm:px-8 sm:pb-7 sm:pt-6`}
      >
        {children}
        {next && (
          <div className="mt-6 flex justify-end border-t border-ink/15 pt-4">
            <button
              type="button"
              onClick={next.onClick}
              className="rounded-md border border-ink/30 bg-white/60 px-4 py-2 text-sm font-semibold text-ink hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk"
            >
              Next: {next.label}
            </button>
          </div>
        )}
      </div>
    </section>
  )
);
Folder.displayName = 'Folder';

export default Folder;
