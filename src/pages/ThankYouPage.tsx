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
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <Helmet>
        <title>Thank you | My Thai Taxes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Thanks, your request has been sent</h1>
        <p className="text-gray-700">
          We have shared your details with {isPartnerActive() ? PARTNER.partnerName : 'our partner firm'} so they can contact you.
          A confirmation email is on its way.
        </p>
        {leadId && (
          <p className="mt-3 text-sm text-gray-600">
            Your reference: <strong className="font-mono">{leadId}</strong>
          </p>
        )}
        {bookingUrl && (
          <div className="mt-6">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener"
              onClick={() => track('booking_link_clicked', { cta_variant: 'lead' })}
              className="inline-flex w-full sm:w-auto justify-center rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Book your free 15-minute call now
            </a>
            <p className="mt-2 text-xs text-gray-500">Opens {PARTNER.partnerName}'s booking page.</p>
          </div>
        )}
        <p className="mt-6 text-sm text-gray-600">
          Calculator figures are estimates for information only, not tax advice.{' '}
          <Link to="/how-this-site-is-funded/" className="text-blue-600 hover:underline">How this site is funded</Link> ·{' '}
          <Link to="/privacy/#leads" className="text-blue-600 hover:underline">Privacy policy</Link>
        </p>
        <p className="mt-4">
          <Link to="/" className="text-blue-600 hover:underline">Back to the calculators</Link>
        </p>
      </div>
    </div>
  );
};

export default ThankYouPage;
