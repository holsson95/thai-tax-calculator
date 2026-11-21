import { formatThb } from '../utils/taxCalculations';

export interface TaxFlowBracket {
  label: string;
  rate: number;
  tax: number;
}

export type TaxFlowStep =
  | { kind: 'start' | 'result'; label: string; amount: number; sublabel?: string }
  | { kind: 'subtract'; label: string; amount: number; sublabel?: string }
  | { kind: 'brackets'; label: string; brackets: TaxFlowBracket[] };

interface TaxFlowDiagramProps {
  steps: TaxFlowStep[];
}

/**
 * A calculation written out as ruled form lines (DESIGN.md "Results": totals and breakdowns
 * are ruled form lines). Starting amounts are plain lines, subtractions carry a minus,
 * each subtotal is ruled off with a 2px desk line, and the bracket step lists each band
 * indented under its label.
 */
export default function TaxFlowDiagram({ steps }: TaxFlowDiagramProps) {
  return (
    <ol className="text-[15px] leading-snug">
      {steps.map((step, index) => {
        if (step.kind === 'brackets') {
          return (
            <li key={index} className="border-b border-paper-rule py-2.5">
              <p className="text-ink-soft">{step.label}</p>
              {step.brackets.length === 0 ? (
                <p className="mt-1.5 pl-4 text-sm text-ink-mute">No tax due at this income level</p>
              ) : (
                <ul className="mt-1.5 space-y-1 border-l border-ink/25 pl-4">
                  {step.brackets.map((bracket) => (
                    <li key={bracket.label} className="flex items-baseline justify-between gap-4 text-sm">
                      <span className="font-mono text-[13px] tabular-nums text-ink-soft">
                        {bracket.label} ({bracket.rate}%)
                      </span>
                      <span className="whitespace-nowrap font-mono tabular-nums text-ink">{formatThb(bracket.tax)}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        }

        const isResult = step.kind === 'result';
        return (
          <li
            key={index}
            className={`flex items-baseline justify-between gap-4 ${
              isResult ? 'border-t-2 border-desk pb-2.5 pt-2.5 font-bold text-ink' : 'border-b border-paper-rule py-2.5'
            } ${isResult && index > 0 && steps[index - 1].kind !== 'brackets' ? '-mt-px' : ''}`}
          >
            <span className="min-w-0">
              <span className={isResult ? 'text-ink' : step.kind === 'start' ? 'font-semibold text-ink' : 'text-ink-soft'}>
                {step.label}
              </span>
              {step.sublabel && <span className="mt-0.5 block text-xs font-normal text-ink-mute">{step.sublabel}</span>}
            </span>
            <span
              className={`whitespace-nowrap font-mono tabular-nums ${isResult ? 'text-base text-ink' : 'text-sm text-ink'}`}
            >
              {step.kind === 'subtract' ? `-${formatThb(step.amount)}` : formatThb(step.amount)}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
