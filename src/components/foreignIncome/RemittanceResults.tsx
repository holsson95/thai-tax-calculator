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
}

const RemittanceResults: React.FC<Props> = ({ result }) => {
  const r = result;
  const effectiveRate = r.taxableIncomeThb > 0 ? r.estimatedTaxThb / (r.thaiAssessableAfterExpensesThb + r.foreignAssessableThb) : 0;

  return (
    <section aria-labelledby="fic-results-heading" className="space-y-5">
      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-5 sm:p-6">
        <h2 id="fic-results-heading" className="text-lg font-semibold text-gray-900">
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
          <div className="col-span-2 sm:col-span-1 rounded-lg bg-blue-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-blue-800">Estimated Thai tax</dt>
            <dd className="text-2xl sm:text-3xl font-bold text-blue-900 mt-1">{thb(r.estimatedTaxThb)}</dd>
            {r.estimatedTaxThb > 0 && <dd className="text-xs text-blue-800 mt-1">≈ {pct(effectiveRate)} of assessable income</dd>}
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-gray-600">Assessable remitted income</dt>
            <dd className="text-lg font-semibold text-gray-900 mt-1">{thb(r.foreignAssessableThb)}</dd>
            <dd className="text-xs text-gray-500">of {thb(r.totalRemittedThb)} brought in</dd>
          </div>
          <div className="rounded-lg bg-gray-50 p-4">
            <dt className="text-xs uppercase tracking-wide text-gray-600">Tax due to remittances</dt>
            <dd className="text-lg font-semibold text-gray-900 mt-1">{thb(r.additionalTaxFromRemittancesThb)}</dd>
            <dd className="text-xs text-gray-500">on top of tax on Thai income</dd>
          </div>
        </dl>

        {r.estimatedTaxIfLtrExemptionAppliesThb !== null && (
          <p className="mt-4 text-sm text-gray-700 rounded-lg border border-blue-200 bg-blue-50 p-3">
            If your LTR foreign-income exemption applies, the estimate would be{' '}
            <strong>{thb(r.estimatedTaxIfLtrExemptionAppliesThb)}</strong>. Whether it applies depends on your circumstances.
          </p>
        )}
      </div>

      {r.flags.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-orange-200 p-5 sm:p-6">
          <h3 className="font-semibold text-gray-900">
            {r.flags.length === 1 ? '1 thing that makes this more complex' : `${r.flags.length} things that make this more complex`}
          </h3>
          <ul className="mt-3 space-y-3">
            {r.flags.map((f) => (
              <li key={f.id} className="text-sm">
                <span className="font-medium text-gray-900">{f.title}.</span>{' '}
                <span className="text-gray-600">{f.detail}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {r.remittances.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
          <h3 className="font-semibold text-gray-900">Transfer by transfer</h3>
          <ol className="mt-3 divide-y divide-gray-100">
            {r.remittances.map((a, i) => (
              <li key={a.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="text-sm font-medium text-gray-900">
                    Transfer {i + 1}: {thb(a.amountThb)}
                  </span>
                  <span className={`text-xs font-medium rounded-full px-2 py-0.5 ${STATUS_STYLE[a.status].cls}`}>
                    {STATUS_STYLE[a.status].label}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{a.reason}</p>
                {a.assessableThb > 0 && <p className="text-xs text-gray-500 mt-0.5">Counted: {thb(a.assessableThb)}</p>}
              </li>
            ))}
          </ol>
        </div>
      )}

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 sm:p-6">
        <h3 className="font-semibold text-gray-900">How the tax is worked out</h3>
        <table className="mt-3 w-full text-sm">
          <tbody className="divide-y divide-gray-100">
            <tr>
              <td className="py-1.5 text-gray-600">Thai income after expense deduction</td>
              <td className="py-1.5 text-right text-gray-900">{thb(r.thaiAssessableAfterExpensesThb)}</td>
            </tr>
            <tr>
              <td className="py-1.5 text-gray-600">+ Assessable remitted income</td>
              <td className="py-1.5 text-right text-gray-900">{thb(r.foreignAssessableThb)}</td>
            </tr>
            <tr>
              <td className="py-1.5 text-gray-600">− Personal allowance and social security</td>
              <td className="py-1.5 text-right text-gray-900">{thb(r.allowancesAndDeductionsThb)}</td>
            </tr>
            <tr className="font-semibold">
              <td className="py-1.5 text-gray-900">Taxable income</td>
              <td className="py-1.5 text-right text-gray-900">{thb(r.taxableIncomeThb)}</td>
            </tr>
          </tbody>
        </table>

        {r.bracketBreakdown.length > 0 && (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <caption className="text-left text-xs uppercase tracking-wide text-gray-500 mb-1">Tax by bracket</caption>
              <thead>
                <tr className="text-left text-xs text-gray-500">
                  <th scope="col" className="py-1 font-medium">Band (THB)</th>
                  <th scope="col" className="py-1 font-medium text-right">Rate</th>
                  <th scope="col" className="py-1 font-medium text-right">Income in band</th>
                  <th scope="col" className="py-1 font-medium text-right">Tax</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {r.bracketBreakdown.map((b) => (
                  <tr key={b.label}>
                    <td className="py-1.5 text-gray-700">{b.label}</td>
                    <td className="py-1.5 text-right text-gray-700">{pct(b.rate)}</td>
                    <td className="py-1.5 text-right text-gray-700">{thb(b.taxableAmount)}</td>
                    <td className="py-1.5 text-right text-gray-900">{thb(b.tax)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 sm:p-6 text-sm text-gray-700 space-y-2">
        <h3 className="font-semibold text-gray-900">Assumptions in this estimate</h3>
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
        <p className="pt-2 text-gray-600">
          This is an estimate for information only, not tax advice. Your actual position may differ. Speak to a qualified
          tax advisor before filing or moving money. Sources are listed on our{' '}
          <Link to="/sources/" className="text-blue-600 hover:underline">
            sources page
          </Link>
          .
        </p>
      </div>
    </section>
  );
};

export default RemittanceResults;
