import React from 'react';
import { Link } from 'react-router-dom';
import { RemittanceEstimateResult, RemittanceStatus } from '../../utils/remittanceEstimate';
import { FieldLabel, ResultCell, SourceTicket, Stamp } from '../ui/form';

const thb = (n: number) => `฿${Math.round(n).toLocaleString('en-US')}`;
const pct = (r: number) => `${Math.round(r * 100)}%`;

/**
 * Square status tags in desk ink only (One Ink Rule): the label carries the meaning,
 * the weight of the mark echoes it. Filled = counted, outlined = not counted,
 * dashed = unclear and counted to be cautious.
 */
const STATUS_TAG: Record<RemittanceStatus, { label: string; cls: string }> = {
  assessable: { label: 'May be taxable', cls: 'border-2 border-desk bg-desk text-white' },
  not_assessable: { label: 'Likely not taxable', cls: 'border-2 border-ink/25 text-ink-mute' },
  uncertain: { label: 'Unclear: counted', cls: 'border-2 border-dashed border-desk text-ink' },
};

interface Props {
  result: RemittanceEstimateResult;
  /** Remittance id → what the user entered, e.g. 'USD 20,000'. Shown for non-THB transfers. */
  transferLabels?: Record<string, string>;
}

const RemittanceResults: React.FC<Props> = ({ result, transferLabels }) => {
  const r = result;
  const effectiveRate = r.taxableIncomeThb > 0 ? r.estimatedTaxThb / (r.thaiAssessableAfterExpensesThb + r.foreignAssessableThb) : 0;

  return (
    <section aria-labelledby="fic-results-heading">
      <h2 id="fic-results-heading" className="display mb-6 text-2xl leading-tight text-ink sm:text-[28px]">
        Your {r.taxYear} estimate
      </h2>

      {/* Result box */}
      <FieldLabel>Estimated Thai income tax, tax year {r.taxYear}</FieldLabel>
      <div className="relative border-2 border-desk" aria-live="polite">
        <ResultCell
          label="Estimated Thai tax"
          value={thb(r.estimatedTaxThb)}
          note={r.estimatedTaxThb > 0 ? `≈ ${pct(effectiveRate)} of assessable income` : undefined}
          className="pr-28 sm:pr-40"
        />
        <div className="grid grid-cols-1 divide-y-2 divide-desk border-t-2 border-desk sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0">
          <ResultCell
            size="md"
            label="Assessable remitted income"
            value={thb(r.foreignAssessableThb)}
            note={`of ${thb(r.totalRemittedThb)} brought in`}
          />
          <ResultCell
            size="md"
            label="Tax due to remittances"
            value={thb(r.additionalTaxFromRemittancesThb)}
            note="on top of tax on Thai income"
          />
        </div>
        <div className="border-t-2 border-desk px-4 py-2 text-xs text-ink-soft">
          <p>
            {r.residency.isResident
              ? `${r.residency.daysInThailand} days: Thai tax resident this year.`
              : `${r.residency.daysInThailand} days: non-resident this year (under ${r.residency.thresholdDays} days).`}
          </p>
        </div>
        <Stamp className="absolute right-3 top-3 sm:right-5 sm:top-5">{r.estimatedTaxThb > 0 ? 'Estimate' : 'No tax due'}</Stamp>
      </div>
      <SourceTicket year={r.taxYear} className="mt-6 sm:mt-2" />

      {r.estimatedTaxIfLtrExemptionAppliesThb !== null && (
        <p className="note mt-6">
          If your LTR foreign-income exemption applies, the estimate would be{' '}
          <strong className="font-mono font-bold tabular-nums text-ink">{thb(r.estimatedTaxIfLtrExemptionAppliesThb)}</strong>. Whether it
          applies depends on your circumstances.
        </p>
      )}

      {r.flags.length > 0 && (
        <div className="note-strong mt-8">
          <h3>
            {r.flags.length === 1 ? '1 thing that makes this more complex' : `${r.flags.length} things that make this more complex`}
          </h3>
          <ul className="space-y-2.5">
            {r.flags.map((f) => (
              <li key={f.id} className="text-sm leading-relaxed">
                <span className="font-semibold text-ink">{f.title}.</span> <span className="text-ink-soft">{f.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {r.remittances.length > 0 && (
        <div className="mt-8">
          <FieldLabel as="h3">Transfer by transfer</FieldLabel>
          <ol>
            {r.remittances.map((a, i) => (
              <li key={a.id} className="border-b border-paper-rule py-3 first:pt-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1.5">
                  <span className="text-[15px] font-semibold text-ink">
                    Transfer <span className="font-mono">{i + 1}</span>:{' '}
                    <span className="font-mono text-sm tabular-nums">
                      {transferLabels?.[a.id] ? `${transferLabels[a.id]} → ${thb(a.amountThb)}` : thb(a.amountThb)}
                    </span>
                  </span>
                  <span className={`field-label px-1.5 py-0.5 ${STATUS_TAG[a.status].cls}`}>{STATUS_TAG[a.status].label}</span>
                </div>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{a.reason}</p>
                {a.assessableThb > 0 && (
                  <p className="mt-0.5 text-xs text-ink-mute">
                    Counted: <span className="font-mono tabular-nums">{thb(a.assessableThb)}</span>
                  </p>
                )}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="mt-8">
        <FieldLabel as="h3">How the tax is worked out</FieldLabel>
        <ul>
          <li className="form-line">
            <span className="text-ink-soft">Thai income after expense deduction</span>
            <span>{thb(r.thaiAssessableAfterExpensesThb)}</span>
          </li>
          <li className="form-line">
            <span className="text-ink-soft">+ Assessable remitted income</span>
            <span>{thb(r.foreignAssessableThb)}</span>
          </li>
          <li className="form-line">
            <span className="text-ink-soft">− Personal allowance and social security</span>
            <span>{thb(r.allowancesAndDeductionsThb)}</span>
          </li>
          <li className="form-total">
            <span>Taxable income</span>
            <span>{thb(r.taxableIncomeThb)}</span>
          </li>
        </ul>

        {r.bracketBreakdown.length > 0 && (
          <div className="mt-6 overflow-x-auto">
            <table className="sheet-table text-[13px] sm:text-sm">
              <caption className="field-label mb-2 text-left text-ink">Tax by bracket</caption>
              <thead>
                <tr>
                  <th scope="col">Band (THB)</th>
                  <th scope="col" className="!text-right">Rate</th>
                  <th scope="col" className="!text-right">Income in band</th>
                  <th scope="col" className="!text-right">Tax</th>
                </tr>
              </thead>
              <tbody>
                {r.bracketBreakdown.map((b) => (
                  <tr key={b.label}>
                    <td className="whitespace-nowrap font-mono tabular-nums">{b.label}</td>
                    <td className="figure text-ink-soft">{pct(b.rate)}</td>
                    <td className="figure text-ink-soft">{thb(b.taxableAmount)}</td>
                    <td className="figure">{thb(b.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="note mt-8">
        <h3>Assumptions in this estimate</h3>
        <ul className="list-disc space-y-1 pl-5">
          {r.assumptions.map((a) => (
            <li key={a.id}>{a.text}</li>
          ))}
          {!r.gracePeriodIsLaw && (
            <li>
              Proposed changes, such as a grace period for income brought in during the year it is earned or the next year, are{' '}
              <strong className="text-ink">not law</strong> as of our last check and are not applied.
            </li>
          )}
        </ul>
        <p className="mt-3">
          This is an estimate for information only, not tax advice. Your actual position may differ. Speak to a qualified
          tax advisor before filing or moving money. Sources are listed on our{' '}
          <Link to="/sources/" className="font-semibold text-desk underline decoration-desk/40 underline-offset-2 hover:decoration-desk">
            sources page
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default RemittanceResults;
