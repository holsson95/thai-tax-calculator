import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PARTNER, isPartnerActive } from '../config/partner';
import { buildBookingUrl } from '../shared/leads';
import { track } from '../utils/analytics';

const LEAD_ID_RE = /^L-\d{6}-[A-HJ-NP-Z2-9]{8}$/;

/** Thank-you page after a lead is submitted. noindex; the lead id is read client-side only. */
const ThankYouPage: React.FC = () => {
  const [leadId, setLeadId] = useState<string | null>(null);

  useEffect(() => {
    const fromQuery = new URLSearchParams(window.location.search).get('lead');
    if (fromQuery && LEAD_ID_RE.test(fromQuery)) setLeadId(fromQuery);
  }, []);

  const bookingUrl = leadId && isPartnerActive() ? buildBookingUrl(PARTNER.bookingUrl, leadId) : null;

  return (
    <div className="mx-auto max-w-[52rem] px-4 pb-24 pt-10 sm:px-6 lg:pt-14">
      <Helmet>
        <title>Thank you | My Thai Taxes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="on-paper max-w-xl bg-paper-white px-5 py-7 text-ink shadow-sheet-sm sm:px-8">
        <h1 className="display border-b-2 border-desk pb-3 text-2xl leading-tight text-ink sm:text-[28px]">Thanks, your request has been sent</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-ink">
          We have shared your details with {isPartnerActive() ? PARTNER.partnerName : 'our partner firm'} so they can contact you.
          A confirmation email is on its way.
        </p>
        {leadId && (
          <p className="mt-3 text-sm text-ink-soft">
            Your reference: <strong className="font-mono font-semibold tabular-nums text-ink">{leadId}</strong>
          </p>
        )}
        {bookingUrl && (
          <div className="mt-6">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener"
              onClick={() => track('booking_link_clicked', { cta_variant: 'lead' })}
              className="btn-primary w-full sm:w-auto"
            >
              Book your free 15-minute call now
            </a>
            <p className="mt-2 text-xs text-ink-mute">Opens {PARTNER.partnerName}'s booking page.</p>
          </div>
        )}
        <p className="mt-6 border-t border-paper-rule pt-4 text-xs leading-relaxed text-ink-mute">
          Calculator figures are estimates for information only, not tax advice.{' '}
          <Link to="/how-this-site-is-funded/" className="underline hover:text-ink">How this site is funded</Link> ·{' '}
          <Link to="/privacy/#leads" className="underline hover:text-ink">Privacy policy</Link>
        </p>
        <p className="mt-4">
          <Link to="/" className="btn-text">Back to the calculators</Link>
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
