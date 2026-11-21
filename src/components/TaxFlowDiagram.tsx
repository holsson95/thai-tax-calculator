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

function Arrow() {
  return (
    <div className="flex justify-center py-1" aria-hidden="true">
      <svg className="w-5 h-5 text-ink-mute" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v15m0 0l-6-6m6 6l6-6" />
      </svg>
    </div>
  );
}

export default function TaxFlowDiagram({ steps }: TaxFlowDiagramProps) {
  return (
    <div>
      {steps.map((step, index) => (
        <div key={index}>
          {index > 0 && <Arrow />}

          {step.kind === 'brackets' ? (
            <div className="border p-4 border-ink/25">
              <p className="text-sm font-medium text-ink-soft mb-2">{step.label}</p>
              <div className="text-sm space-y-1">
                {step.brackets.length === 0 ? (
                  <p className="text-ink-mute">No tax due at this income level</p>
                ) : (
                  step.brackets.map((bracket) => (
                    <div key={bracket.label} className="flex justify-between">
                      <span className="text-ink-soft">
                        {bracket.label} ({bracket.rate}%)
                      </span>
                      <span>{formatThb(bracket.tax)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          ) : (
            <div
              className={
                step.kind === 'subtract'
                  ? 'border border-ink/25 px-4 py-3 flex justify-between items-center gap-4 border-2 border-desk'
                  : step.kind === 'result'
                  ? 'border-2 border-ink/25 px-4 py-3 flex justify-between items-center gap-4 border border-ink/25'
                  : 'border border-paper-rule px-4 py-3 flex justify-between items-center gap-4 border border-ink/25'
              }
            >
              <div>
                <p className={step.kind === 'result' ? 'font-medium text-ink' : 'text-ink-soft'}>
                  {step.label}
                </p>
                {step.sublabel && <p className="text-xs text-ink-mute mt-0.5">{step.sublabel}</p>}
              </div>
              <p
                className={
                  step.kind === 'subtract'
                    ? 'font-semibold text-ink whitespace-nowrap'
                    : step.kind === 'result'
                    ? 'font-bold text-desk text-lg whitespace-nowrap'
                    : 'font-semibold text-ink whitespace-nowrap'
                }
              >
                {step.kind === 'subtract' ? `-${formatThb(step.amount)}` : formatThb(step.amount)}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
