import React from 'react';
import ArrowIcon from '../ui/ArrowIcon';

interface StepTrackProps {
  labels: string[];
  current: number; // 0-based
  onGoTo: (index: number) => void;
  onStartOver?: () => void;
  /** Small print under the track (e.g. the saved-progress line). */
  children?: React.ReactNode;
}

/**
 * The sheet head: the steps as a row of boxed, numbered cells (like the comb input).
 * Done cells are filled in desk ink and go back on click; the current cell carries the
 * butter wash; the rest are blank boxes. The current step's name sits on the rule below.
 */
export const StepTrack: React.FC<StepTrackProps> = ({ labels, current, onGoTo, onStartOver, children }) => {
  const total = labels.length;
  const percent = Math.round(((current + 1) / total) * 100);

  return (
    <div className="px-5 pt-6 sm:px-8 sm:pt-7">
      <div className="flex items-end justify-between gap-4">
        <ol
          className="grid min-w-0 flex-1 border-2 border-desk"
          style={{ gridTemplateColumns: `repeat(${total}, minmax(0, 2.5rem))`, maxWidth: `${total * 2.5}rem` }}
          aria-label="Steps"
        >
          {labels.map((label, i) => {
            const done = i < current;
            const isCurrent = i === current;
            return (
              <li key={`${label}-${i}`} className={`min-w-0 ${i > 0 ? 'border-l-2 border-desk' : ''}`}>
                <button
                  type="button"
                  onClick={() => done && onGoTo(i)}
                  disabled={!done}
                  aria-label={`${done ? 'Go to ' : ''}Step ${i + 1}: ${label}`}
                  aria-current={isCurrent ? 'step' : undefined}
                  title={label}
                  className={`flex h-9 w-full items-center justify-center font-mono text-[13px] font-semibold tabular-nums transition-colors sm:h-10 sm:text-[15px] ${
                    done
                      ? 'cursor-pointer bg-desk text-white hover:bg-desk-deep'
                      : isCurrent
                        ? 'cursor-default bg-[#FEF8E1] font-bold text-ink'
                        : 'cursor-default bg-paper-white text-ink-mute/70'
                  }`}
                >
                  {i + 1}
                  <span className="sr-only">{label}</span>
                </button>
              </li>
            );
          })}
        </ol>
        {onStartOver && (
          <button
            type="button"
            onClick={onStartOver}
            aria-label="Start over"
            className="shrink-0 pb-1 text-[13px] font-semibold text-ink-soft underline decoration-ink/30 underline-offset-4 hover:text-ink hover:decoration-ink"
          >
            Start Over
          </button>
        )}
      </div>
      <div
        className="mt-3 flex items-baseline justify-between gap-4 border-b-2 border-desk pb-1.5"
        role="progressbar"
        aria-label="Form progress"
        aria-valuenow={current + 1}
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuetext={`Step ${current + 1} of ${total}: ${labels[current]}`}
      >
        <p className="field-label text-ink">
          Step {current + 1} of {total}: {labels[current]}
        </p>
        <p className="font-mono text-[11px] font-semibold tabular-nums text-ink-mute">{percent}%</p>
      </div>
      {children}
    </div>
  );
};

/** Previous / Next at the foot of the sheet. */
export const WizardNav: React.FC<{
  onPrevious: () => void;
  onNext?: () => void;
  nextDisabled?: boolean;
}> = ({ onPrevious, onNext, nextDisabled }) => (
  <div className="mt-10 flex items-center justify-between gap-4 border-t-2 border-desk pt-5">
    <button type="button" onClick={onPrevious} className="btn-secondary" aria-label="Go to previous step">
      <ArrowIcon className="h-4 w-4 rotate-180" />
      Previous
    </button>
    {onNext && (
      <button type="button" onClick={onNext} disabled={nextDisabled} className="group btn-primary" aria-label="Go to next step">
        Next
        <ArrowIcon className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-disabled:translate-x-0" />
      </button>
    )}
  </div>
);
