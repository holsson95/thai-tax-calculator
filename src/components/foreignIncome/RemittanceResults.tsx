import React from 'react';
import { Link } from 'react-router-dom';
import { RemittanceEstimateResult, RemittanceStatus } from '../../utils/remittanceEstimate';

const thb = (n: number) => `฿${Math.round(n).toLocaleString('en-US')}`;
const pct = (r: number) => `${Math.round(r * 100)}%`;

const STATUS_STYLE: Record<RemittanceStatus, { label: string; cls: string }> = {
  assessable: { label: 'May be taxable', cls: 'bg-amber-100 text-amber-800' },
  not_assessable: { label: 'Likely not taxable', cls: 'bg-green-100 text-green-800' },
  uncertain: { label: 'Unclear: counted', cls: 'bg-orange-100 text-orange-800' },
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
    <section aria-labelledby="fic-results-heading" className="space-y-5">
      <div className="bg-paper-white rounded-sm shadow-sheet p-5 sm:p-6">
        <h2 id="fic-results-heading" className="text-lg font-semibold text-ink">
          Your {r.taxYear} estimate
        </h2>
        <p className="text-sm mt-1">
          {r.residency.isResident ? (
            <span className="text-amber-700">
              {r.residency.daysInThailand} days: Thai tax resident this year.
            </span>
          ) : (
            <span className="text-green-700">
              {r.residency.daysInThailand} days: non-resident this year (under {r.residency.thresholdDays} days).
            </span>
          )}
        </p>

        <dl className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-1 rounded-sm bg-white ring-1 ring-ink/15 p-4">
            <dt className="text-xs uppercase tracking-wide text-ink-soft">Estimated Thai tax</dt>
            <dd className="font-mono text-2xl sm:text-3xl font-bold text-stamp mt-1">{thb(r.estimatedTaxThb)}</dd>
            {r.estimatedTaxThb > 0 && <dd className="text-xs text-ink-soft mt-1">≈ {pct(effectiveRate)} of assessable income</dd>}
          </div>
          <div className="rounded-sm bg-paper-ground p-4">
            <dt className="text-xs uppercase tracking-wide text-ink-soft">Assessable remitted income</dt>
            <dd className="text-lg font-semibold text-ink mt-1">{thb(r.foreignAssessableThb)}</dd>
            <dd className="text-xs text-ink-mute">of {thb(r.totalRemittedThb)} brought in</dd>
          </div>
          <div className="rounded-sm bg-paper-ground p-4">
            <dt className="text-xs uppercase tracking-wide text-ink-soft">Tax due to remittances</dt>
            <dd className="text-lg font-semibold text-ink mt-1">{thb(r.additionalTaxFromRemittancesThb)}</dd>
            <dd className="text-xs text-ink-mute">on top of tax on Thai income</dd>
          </div>
        </dl>

        {r.estimatedTaxIfLtrExemptionAppliesThb !== null && (
          <p className="mt-4 text-sm text-ink-soft rounded-sm border border-desk/30 bg-paper-ground p-3">
            If your LTR foreign-income exemption applies, the estimate would be{' '}
            <strong>{thb(r.estimatedTaxIfLtrExemptionAppliesThb)}</strong>. Whether it applies depends on your circumstances.
          </p>
        )}
      </div>

      {r.flags.length > 0 && (
        <div className="bg-paper-white rounded-sm shadow-sheet ring-1 ring-desk/30 p-5 sm:p-6">
          <h3 className="font-semibold text-ink">
            {r.flags.length === 1 ? '1 thing that makes this more complex' : `${r.flags.length} things that make this more complex`}
          </h3>
          <ul className="mt-3 space-y-3">
            {r.flags.map((f) => (
              <li key={f.id} className="text-sm">
                <span className="font-medium text-ink">{f.title}.</span>{' '}
                <span className="text-ink-soft">{f.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {r.remittances.length > 0 && (
        <div className="bg-paper-white rounded-sm shadow-sheet p-5 sm:p-6">
          <h3 className="font-semibold text-ink">Transfer by transfer</h3>
          <ol className="mt-3 divide-y divide-ink/10">
            {r.remittances.map((a, i) => (
              <li key={a.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-ink">
                    Transfer {i + 1}: {transferLabels?.[a.id] ? `${transferLabels[a.id]} → ${thb(a.amountThb)}` : thb(a.amountThb)}
                  </span>
                  <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${STATUS_STYLE[a.status].cls}`}>
                    {STATUS_STYLE[a.status].label}
                  </span>
                </div>
                <p className="text-sm text-ink-soft mt-1">{a.reason}</p>
                {a.assessableThb > 0 && <p className="text-xs text-ink-mute mt-0.5">Counted: {thb(a.assessableThb)}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="bg-paper-white rounded-sm shadow-sheet p-5 sm:p-6">
        <h3 className="font-semibold text-ink">How the tax is worked out</h3>
        <table className="mt-3 w-full text-sm">
          <tbody className="divide-y divide-ink/10">
            <tr>
              <td className="py-1.5 text-ink-soft">Thai income after expense deduction</td>
              <td className="py-1.5 text-right text-ink">{thb(r.thaiAssessableAfterExpensesThb)}</td>
            </tr>
            <tr>
              <td className="py-1.5 text-ink-soft">+ Assessable remitted income</td>
              <td className="py-1.5 text-right text-ink">{thb(r.foreignAssessableThb)}</td>
            </tr>
            <tr>
              <td className="py-1.5 text-ink-soft">− Personal allowance and social security</td>
              <td className="py-1.5 text-right text-ink">{thb(r.allowancesAndDeductionsThb)}</td>
            </tr>
            <tr className="font-semibold">
              <td className="py-1.5 text-ink">Taxable income</td>
              <td className="py-1.5 text-right text-ink">{thb(r.taxableIncomeThb)}</td>
            </tr>
          </tbody>
        </table>

        {r.bracketBreakdown.length > 0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="text-left text-xs uppercase tracking-wide text-ink-mute mb-1">Tax by bracket</caption>
              <thead>
                <tr className="text-left text-xs text-ink-mute">
                  <th scope="col" className="py-1 font-medium">Band (THB)</th>
                  <th scope="col" className="py-1 font-medium text-right">Rate</th>
                  <th scope="col" className="py-1 font-medium text-right">Income in band</th>
                  <th scope="col" className="py-1 font-medium text-right">Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink/10">
                {r.bracketBreakdown.map((b) => (
                  <tr key={b.label}>
                    <td className="py-1.5 text-ink-soft">{b.label}</td>
                    <td className="py-1.5 text-right text-ink-soft">{pct(b.rate)}</td>
                    <td className="py-1.5 text-right text-ink-soft">{thb(b.taxableAmount)}</td>
                    <td className="py-1.5 text-right text-ink">{thb(b.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-sm bg-paper-white/80 p-5 sm:p-6 text-sm text-ink-soft space-y-2">
        <h3 className="font-semibold text-ink">Assumptions in this estimate</h3>
        <ul className="list-disc pl-5 space-y-1">
          {r.assumptions.map((a) => (
            <li key={a.id}>{a.text}</li>
          ))}
          {!r.gracePeriodIsLaw && (
            <li>
              Proposed changes, such as a grace period for income brought in during the year it is earned or the next year, are{' '}
              <strong>not law</strong> as of our last check and are not applied.
            </li>
          )}
        </ul>
        <p className="pt-2 text-ink-soft">
          This is an estimate for information only, not tax advice. Your actual position may differ. Speak to a qualified
          tax advisor before filing or moving money. Sources are listed on our{' '}
          <Link to="/sources/" className="text-desk hover:underline">
            sources page
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default RemittanceResults;
