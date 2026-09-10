import { useState } from 'react';
import { TaxExample } from '../data/taxExamples';
import { formatThb, formatPercent } from '../utils/taxCalculations';
import TaxFlowDiagram from './TaxFlowDiagram';

interface TaxExampleCardProps {
  example: TaxExample;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
    </div>
  );
}

export default function TaxExampleCard({ example }: TaxExampleCardProps) {
  const [showBreakdown, setShowBreakdown] = useState(false);

  return (
    <div id={example.id} className="bg-white border border-gray-200 rounded-xl p-6 scroll-mt-24">
      <p className="text-sm font-medium text-blue-500 mb-1">{example.concept}</p>
      <h3 className="text-xl font-semibold text-gray-900 mb-3">{example.title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{example.scenario}</p>

      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
          Assumptions (tax year {example.taxYear})
        </p>
        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
          {example.assumptions.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <Stat label="Gross income" value={formatThb(example.grossIncome)} />
        <Stat label="Taxable income" value={formatThb(example.taxableIncome)} />
        <Stat label="Total tax" value={formatThb(example.taxOwed)} />
        <Stat label="Marginal rate" value={formatPercent(example.marginalRatePercent)} />
      </div>

      <div className="mb-4">
        <Stat
          label={`Effective rate (tax as % of ${example.effectiveRateBasis})`}
          value={formatPercent(example.effectiveRatePercent)}
        />
      </div>

      {example.before && (
        <div className="mb-4 text-sm bg-green-50 border border-green-100 rounded-lg px-4 py-3 text-green-800">
          Without the extra deduction shown below, this same taxpayer's taxable income would be{' '}
          <strong>{formatThb(example.before.taxableIncome)}</strong> and tax owed would be{' '}
          <strong>{formatThb(example.before.taxOwed)}</strong> — a difference of{' '}
          <strong>{formatThb(example.before.taxOwed - example.taxOwed)}</strong>.
        </div>
      )}

      <p className="text-gray-700 leading-relaxed mb-4">{example.explanation}</p>

      <button
        type="button"
        onClick={() => setShowBreakdown((v) => !v)}
        className="text-sm font-medium text-blue-600 hover:text-blue-700 mb-3"
      >
        {showBreakdown ? 'Hide' : 'Show'} step-by-step calculation
      </button>

      {showBreakdown && <TaxFlowDiagram steps={example.flowSteps} />}

      <p className="text-xs text-gray-400 mt-4">
        Source:{' '}
        <a
          href={example.source.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
            {example.source.label}
        </a>
        {!example.source.verified && ' — secondary source; see Sources & References for verification status'}
      </p>
    </div>
  );
}
