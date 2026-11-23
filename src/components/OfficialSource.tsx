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

/**
 * One sourced figure, as a small ruled box on the sheet: what it is, the figure in mono,
 * then the source ticket (source, tax year, last verified). An unverified figure carries a
 * dashed "Unverified" tag and its note; never a warning colour (One Ink Rule).
 */
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
    <div className="border-2 border-desk bg-paper-white">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 px-4 pb-2.5 pt-3">
        <div className="min-w-0">
          <p className="text-xs leading-snug text-ink-mute">{label}</p>
          <p className="mt-0.5 font-mono text-xl font-bold tabular-nums text-ink">{value}</p>
        </div>
        {verified === false && (
          <span className="shrink-0 border-2 border-dashed border-desk px-1.5 py-px text-[11px] font-bold leading-tight text-desk">
            Unverified
          </span>
        )}
      </div>
      <dl className="flex flex-wrap gap-x-4 gap-y-0.5 border-t border-ink/25 px-4 py-2 text-[11px] leading-snug text-ink-mute">
        <div className="min-w-0">
          <dt className="inline">Source: </dt>
          <dd className="inline">
            {sourceUrl ? (
              <a href={sourceUrl} target="_blank" rel="noopener noreferrer" className="!font-normal !text-ink-mute underline hover:!text-ink">
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
        <p className="border-t border-ink/25 px-4 py-2 text-xs leading-relaxed text-ink-soft">
          {verificationNotes ?? 'Not confirmed against a primary government source.'}
        </p>
      )}
    </div>
  );
}
