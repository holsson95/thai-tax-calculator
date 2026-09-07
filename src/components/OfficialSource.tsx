import type { ReactNode } from 'react';

interface OfficialSourceProps {
  label: string;
  value: string | ReactNode;
  sourceLabel: string;
  sourceUrl?: string;
  taxYear: string | number;
  lastVerified: string;
  verified?: boolean;
  verificationNotes?: string;
}

export default function OfficialSource({
  label,
  value,
  sourceLabel,
  sourceUrl,
  taxYear,
  lastVerified,
  verified,
  verificationNotes,
}: OfficialSourceProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
      <p className="text-sm text-gray-600">{label}</p>
      <p className="text-lg font-semibold text-gray-900">{value}</p>
      <dl className="mt-2 text-xs text-gray-500 space-y-0.5">
        <div>
          <dt className="inline">Source: </dt>
          <dd className="inline">
            {sourceUrl ? (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {sourceLabel}
              </a>
            ) : (
              sourceLabel
            )}
          </dd>
        </div>
        <div>
          <dt className="inline">Tax year: </dt>
          <dd className="inline">{taxYear}</dd>
        </div>
        <div>
          <dt className="inline">Last verified: </dt>
          <dd className="inline">{lastVerified}</dd>
        </div>
      </dl>
      {verified === false && (
        <p className="mt-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-2 py-1">
          <span className="font-medium">Unverified:</span>{' '}
          {verificationNotes ?? 'Not confirmed against a primary government source.'}
        </p>
      )}
    </div>
  );
}
