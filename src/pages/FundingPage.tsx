import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import InfoPage from '../components/layout/InfoPage';
import { PAGE_LAST_UPDATED } from '../config/contentDates';
import { PARTNER, isPartnerActive } from '../config/partner';

const SITE_URL = 'https://mythaitaxes.com';

const FUNDING_META = {
  title: 'How This Site Is Funded | My Thai Taxes',
  description:
    'How My Thai Taxes is funded: advertising and referral fees from partner tax firms, and how we keep the calculators and guides independent of both.',
  canonicalUrl: `${SITE_URL}/how-this-site-is-funded/`,
};

const FundingPage: React.FC = () => {
  const partnerActive = isPartnerActive();
  return (
    <InfoPage title="How this site is funded" updated={PAGE_LAST_UPDATED.funding}>
      <Helmet>
        <title>{FUNDING_META.title}</title>
        <meta name="description" content={FUNDING_META.description} />
        <link rel="canonical" href={FUNDING_META.canonicalUrl} />
        <meta property="og:title" content={FUNDING_META.title} />
        <meta property="og:description" content={FUNDING_META.description} />
        <meta property="og:url" content={FUNDING_META.canonicalUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

          <h2>The calculators and guides are free</h2>
          <p>
            You can use every calculator and article on My Thai Taxes without paying or signing up. The calculators run in your
            browser; nothing you type into them is sent to us unless you choose to request a specialist review or email yourself
            a breakdown.
          </p>

          <h2>Two ways we earn money</h2>
          <ul>
            <li>
              <strong>Advertising.</strong> Some pages show ads served by Google AdSense. See the{' '}
              <Link to="/privacy/">privacy policy</Link> for how ad cookies work.
            </li>
            <li>
              <strong>Referral fees.</strong> After a calculation you can ask for a free call with a partner tax firm
              {partnerActive ? ` (currently ${PARTNER.partnerName})` : ''}. If you do, we may receive a referral fee from that
              firm, either per qualified enquiry or as a share of their fee. You never pay us anything, and the fee does not
              change what the firm charges you.
            </li>
          </ul>

          <h2>How we keep the numbers independent</h2>
          <ul>
            <li>Partner firms have no say in our calculations, tax rules or articles.</li>
            <li>
              Every tax rate and rule the calculators use is listed with its source on our{' '}
              <Link to="/sources/">sources page</Link>, and our method is on the{' '}
              <Link to="/methodology/">methodology page</Link>.
            </li>
            <li>
              We show the specialist-review option more prominently when a result involves things the calculator cannot settle
              (for example LTR visas, mixed savings and income, or capital gains) or when the estimated tax is higher. It is
              never shown in place of the result.
            </li>
            <li>We only share your details with a partner firm if you tick the consent box naming that firm.</li>
          </ul>

          <h2>Not tax advice</h2>
          <p>
            Our calculators give estimates for information only. Partner firms are independent; any advice you receive comes
            from them, not from My Thai Taxes. Questions:{' '}
            <a href="mailto:info@mythaitaxes.com">info@mythaitaxes.com</a>.
          </p>
    </InfoPage>
  );
};

export default FundingPage;
