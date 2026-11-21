import { Link } from 'react-router-dom';
import { TaxExample } from '../data/taxExamples';
import { formatThb, formatPercent } from '../utils/taxCalculations';
import TaxFlowDiagram from './TaxFlowDiagram';
import { FieldLabel } from './ui/form';

interface TaxExampleCardProps {
  example: TaxExample;
}

/** A small figure cell in the lower strip of the result box. */
function Figure({ label, value, className = '' }: { label: string; value: string; className?: string }) {
  return (
    <div className={`min-w-0 px-4 py-2.5 ${className}`}>
      <dt className="text-xs leading-snug text-ink-mute">{label}</dt>
      <dd className="mt-0.5 font-mono text-[15px] font-semibold tabular-nums text-ink">{value}</dd>
    </div>
  );
}

/**
 * One worked example as a filled-in white sheet: the scenario and its assumptions, the
 * result box, the explanation, the calculation folded away as ruled form lines, and a
 * source line. Every figure comes from src/data/taxExamples.ts, which runs the real engine.
 */
export default function TaxExampleCard({ example }: TaxExampleCardProps) {
  const showsGross = example.grossIncome !== example.taxableIncome;
  const before = example.before;
  const lineCount = example.flowSteps.reduce(
    (n, step) => n + (step.kind === 'brackets' ? Math.max(step.brackets.length, 1) : 1),
    0,
  );

  return (
    <article
      id={example.id}
      aria-labelledby={`${example.id}-title`}
      className="on-paper scroll-mt-24 bg-paper-white text-ink shadow-sheet-sm"
    >
      <header className="border-b-2 border-desk px-5 pb-4 pt-5 sm:px-8 sm:pt-6">
        <h3 id={`${example.id}-title`} className="display text-xl leading-tight text-ink sm:text-[22px]">
          {example.title}
        </h3>
        <p className="mt-1.5 text-sm leading-snug text-ink-mute">{example.concept}</p>
      </header>

      <div className="px-5 pb-5 pt-5 sm:px-8 sm:pb-6">
        <p className="max-w-prose text-[15px] leading-relaxed text-ink">{example.scenario}</p>

        <div className="mt-6">
          <FieldLabel>Assumptions · tax year {example.taxYear}</FieldLabel>
          <ul className="-mt-1 list-[square] space-y-1.5 pl-5 text-sm leading-relaxed text-ink-soft marker:text-desk">
            {example.assumptions.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        {/* Result box: the two figures the example is about, then the rates. */}
        <dl className="mt-6 border-2 border-desk">
          <div className="grid grid-cols-2 divide-x-2 divide-desk">
            <div className="min-w-0 px-4 py-3">
              <dt className="text-xs text-ink-mute">Taxable income</dt>
              <dd className="mt-0.5 break-words font-mono text-xl font-bold leading-tight tabular-nums text-ink sm:text-[26px]">
                {formatThb(example.taxableIncome)}
              </dd>
            </div>
            <div className="min-w-0 px-4 py-3">
              <dt className="text-xs text-ink-mute">Tax for the year</dt>
              <dd className="mt-0.5 break-words font-mono text-xl font-bold leading-tight tabular-nums text-ink sm:text-[26px]">
                {formatThb(example.taxOwed)}
              </dd>
            </div>
          </div>
          {/* Phones: gross income takes its own row so the two rates sit side by side. */}
          <div className={`grid grid-cols-2 border-t-2 border-desk ${showsGross ? 'sm:grid-cols-3' : ''}`}>
            {showsGross && (
              <Figure
                label="Gross income"
                value={formatThb(example.grossIncome)}
                className="col-span-2 border-b border-ink/25 sm:col-span-1 sm:border-b-0"
              />
            )}
            <Figure
              label="Marginal rate"
              value={formatPercent(example.marginalRatePercent)}
              className={showsGross ? 'sm:border-l sm:border-ink/25' : ''}
            />
            <Figure
              label={`Effective rate, of ${example.effectiveRateBasis}`}
              value={formatPercent(example.effectiveRatePercent)}
              className="border-l border-ink/25"
            />
          </div>
        </dl>

        {before && (
          <div className="mt-6">
            <FieldLabel>Without and with the extra deductions</FieldLabel>
            <table className="sheet-table -mt-1">
              <caption className="sr-only">
                Taxable income and tax for the same taxpayer without and with the extra deductions
              </caption>
              <thead>
                <tr>
                  <th scope="col"><span className="sr-only">Figure</span></th>
                  <th scope="col" className="figure">Without</th>
                  <th scope="col" className="figure">With</th>
                  <th scope="col" className="figure">Change</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">
                    Taxable income
                  </th>
                  <td className="figure">{formatThb(before.taxableIncome)}</td>
                  <td className="figure">{formatThb(example.taxableIncome)}</td>
                  <td className="figure">-{formatThb(before.taxableIncome - example.taxableIncome)}</td>
                </tr>
                <tr>
                  <th scope="row">
                    Tax for the year
                  </th>
                  <td className="figure">{formatThb(before.taxOwed)}</td>
                  <td className="figure">{formatThb(example.taxOwed)}</td>
                  <td className="figure font-bold">-{formatThb(before.taxOwed - example.taxOwed)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <p className="mt-6 max-w-prose text-[15px] leading-relaxed text-ink">{example.explanation}</p>

        {/* Folded by default; a native <details> keeps the lines in the static HTML. */}
        <details className="group mt-6 border-y-2 border-desk">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-3 [&::-webkit-details-marker]:hidden">
            <span className="text-[15px] font-semibold text-desk underline decoration-desk/40 underline-offset-4 group-hover:decoration-desk">
              <span className="group-open:hidden">Show</span>
              <span className="hidden group-open:inline">Hide</span> step-by-step calculation
            </span>
            <span className="flex shrink-0 items-center gap-2 font-mono text-xs tabular-nums text-ink-mute">
              {lineCount} lines
              <svg
                aria-hidden="true"
                viewBox="0 0 12 12"
                className="h-3.5 w-3.5 text-desk transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
              >
                <path d="M2 4.5 6 8l4-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </summary>
          <div className="pb-3">
            <TaxFlowDiagram steps={example.flowSteps} />
          </div>
        </details>

        <p className="mt-4 text-[11px] leading-snug text-ink-mute">
          Source:{' '}
          <a href={example.source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
            {example.source.label}
          </a>
          {!example.source.verified && (
            <>
              {' '}· secondary source, see{' '}
              <Link to="/sources/" className="underline hover:text-ink">
                Sources &amp; References
              </Link>{' '}
              for its verification status
            </>
          )}{' '}
          · tax year {example.taxYear} · an illustrative example, not tax advice.
        </p>
      </div>
    </article>
  );
}
