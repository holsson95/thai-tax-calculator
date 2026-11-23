import React from 'react';
import { Helmet } from 'react-helmet-async';
import { PARTNER, isLeadsApiConfigured } from '../config/partner';

/**
 * /admin/leads/ on the static site. The real admin runs on the leads Worker,
 * behind Cloudflare Access (the site's DNS is not on Cloudflare, so Access
 * cannot protect a mythaitaxes.com path). This page only links there.
 */
const AdminLeadsPage: React.FC = () => {
  const url = isLeadsApiConfigured() ? `${PARTNER.leadsApiBaseUrl}/admin/leads` : null;
  return (
    <div className="mx-auto max-w-[52rem] px-4 pb-24 pt-14 sm:px-6">
      <Helmet>
        <title>Admin | My Thai Taxes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="display text-3xl text-ink">Leads admin</h1>
      {url ? (
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-soft">
          The leads admin is protected by Cloudflare Access.{' '}
          <a href={url} className="font-semibold text-desk underline" rel="nofollow">
            Open the leads admin
          </a>
          .
        </p>
      ) : (
        <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-soft">The leads API is not configured yet (set leadsApiBaseUrl in partner.config.json).</p>
      )}
    </div>
  );
};

export default AdminLeadsPage;
