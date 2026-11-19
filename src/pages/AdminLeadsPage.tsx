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
    <div className="max-w-xl mx-auto px-4 py-16">
      <Helmet>
        <title>Admin | My Thai Taxes</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <h1 className="text-2xl font-bold text-gray-900 mb-3">Leads admin</h1>
      {url ? (
        <p className="text-gray-700">
          The leads admin is protected by Cloudflare Access.{' '}
          <a href={url} className="text-blue-600 hover:underline" rel="nofollow">
            Open the leads admin
          </a>
          .
        </p>
      ) : (
        <p className="text-gray-700">The leads API is not configured yet (set leadsApiBaseUrl in partner.config.json).</p>
      )}
    </div>
  );
};

export default AdminLeadsPage;
