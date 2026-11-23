import React, { Suspense, useEffect, useRef, useState } from 'react';
import { isLeadsApiConfigured, isPartnerActive, PARTNER } from '../../config/partner';
import { track, taxBand } from '../../utils/analytics';
import { isHighPriority, LeadContext } from '../../utils/leadContext';
import EmailCapture from './EmailCapture';

const LeadForm = React.lazy(() => import('./LeadForm'));

interface Props {
  context: LeadContext;
}

/**
 * Shown after a calculator result. If a partner is active: "Want a specialist
 * to review this?" (more prominent when complexity flags fire or tax is above
 * the configured threshold) plus a secondary "email me my breakdown". If no
 * partner is active: email capture only. If the leads API is not configured:
 * nothing (the site behaves as before).
 */
const LeadCTA: React.FC<Props> = ({ context }) => {
  const [open, setOpen] = useState(false);
  const partnerActive = isPartnerActive();
  const apiConfigured = isLeadsApiConfigured();
  const high = isHighPriority(context);
  const shown = useRef(false);

  useEffect(() => {
    if (!apiConfigured || shown.current) return;
    shown.current = true;
    track('lead_cta_shown', {
      calculator: context.source,
      prominence: high ? 'high' : 'standard',
      flag_count: context.flags.length,
      tax_band: taxBand(context.estimatedTaxThb),
      cta_variant: partnerActive ? 'lead' : 'email_fallback',
    });
  }, [apiConfigured, partnerActive, high, context]);

  if (!apiConfigured) return null;

  if (!partnerActive) {
    return (
      <div className="mt-6">
        <EmailCapture context={context} variant="card" />
      </div>
    );
  }

  const handleOpen = () => {
    track('lead_cta_clicked', { calculator: context.source, prominence: high ? 'high' : 'standard', flag_count: context.flags.length });
    setOpen(true);
  };

  return (
    <aside
      aria-label="Specialist review"
      className={`mt-6 p-5 sm:p-6 ${high ? 'border-2 border-desk' : 'border border-paper-rule bg-paper-white'}`}
    >
      {PARTNER.previewMode && (
        <p className="mb-3 inline-block border border-dashed border-ink/40 px-2 py-0.5 font-mono text-[11px] uppercase tracking-wide text-ink-mute">
          Local preview: nothing is sent
        </p>
      )}
      {open ? (
        <Suspense fallback={<p className="text-sm text-ink-mute">Loading form…</p>}>
          <LeadForm context={context} onCancel={() => setOpen(false)} />
        </Suspense>
      ) : (
        <>
          <h3 className={`font-semibold text-ink ${high ? 'text-lg' : 'text-base'}`}>
            Want a specialist to review this? Free 15-min call.
          </h3>
          {high && context.flags.length > 0 ? (
            <p className="mt-1 text-sm text-ink-soft">
              Your situation includes {context.flags.map((f) => f.title.toLowerCase()).join(', ')}. These are areas where a
              qualified advisor can check how the rules apply to you.
            </p>
          ) : (
            <p className="mt-1 text-sm text-ink-soft">A tax specialist at {PARTNER.partnerName} can check your figures and filing.</p>
          )}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={handleOpen}
              className={`px-5 py-2.5 font-semibold ${high ? 'bg-desk text-white hover:bg-desk-deep' : 'border border-desk text-desk hover:bg-desk/[0.05]'}`}
            >
              Request a free call
            </button>
            <EmailCapture context={context} variant="inline" />
          </div>
        </>
      )}
    </aside>
  );
};

export default LeadCTA;
