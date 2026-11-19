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
      className={`mt-6 rounded-xl p-5 sm:p-6 ${high ? 'border-2 border-blue-600 bg-blue-50' : 'border border-gray-200 bg-white'}`}
    >
      {open ? (
        <Suspense fallback={<p className="text-sm text-gray-500">Loading form…</p>}>
          <LeadForm context={context} onCancel={() => setOpen(false)} />
        </Suspense>
      ) : (
        <>
          <h3 className={`font-semibold text-gray-900 ${high ? 'text-lg' : 'text-base'}`}>
            Want a specialist to review this? Free 15-min call.
          </h3>
          {high && context.flags.length > 0 ? (
            <p className="mt-1 text-sm text-gray-700">
              Your situation includes {context.flags.map((f) => f.title.toLowerCase()).join(', ')}. These are areas where a
              qualified advisor can check how the rules apply to you.
            </p>
          ) : (
            <p className="mt-1 text-sm text-gray-600">A tax specialist at {PARTNER.partnerName} can check your figures and filing.</p>
          )}
          <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
            <button
              type="button"
              onClick={handleOpen}
              className={`rounded-lg px-5 py-2.5 font-semibold ${high ? 'bg-blue-600 text-white hover:bg-blue-700' : 'border border-blue-600 text-blue-700 hover:bg-blue-50'}`}
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
