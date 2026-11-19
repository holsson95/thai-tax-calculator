import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { PARTNER, isPartnerActive } from '../config/partner';
import { SITE_OPERATOR } from '../config/site';

const SITE_URL = 'https://mythaitaxes.com';
const CONTACT_EMAIL = 'info@mythaitaxes.com';

const PrivacyPolicyPage: React.FC = () => {
  const partnerName = isPartnerActive() ? PARTNER.partnerName : 'the partner tax firm named on the form';
  const title = 'Privacy Policy | My Thai Taxes';
  const description = 'Privacy policy for mythaitaxes.com — how we handle your data, the third-party services we use, and your rights.';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/privacy/`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
      <p className="text-sm text-gray-500 mb-8">Last updated: 19 November 2026</p>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Who we are</h2>
          <p>
            This website (<strong>mythaitaxes.com</strong>) provides free tools and informational articles
            to help individuals estimate their Thai personal income tax.{' '}
            {SITE_OPERATOR.legalName
              ? `It is operated by ${SITE_OPERATOR.legalName}${SITE_OPERATOR.country ? `, ${SITE_OPERATOR.country}` : ''}, which is responsible for the personal data described below. `
              : 'It is operated independently. '}
            For questions about this policy, contact{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Data you enter into the calculators</h2>
          <p>
            When you use the Annual Tax Calculator or Monthly Withholding Estimator, the income figures,
            deduction amounts, and other financial details you enter are stored <strong>only in your browser's
            session storage</strong> — a temporary area that is cleared automatically when you close the
            browser tab or click "Start Over." This data is <strong>never transmitted to our servers</strong>,
            never stored in a database, and never shared with anyone. We do not see it.
          </p>
          <p className="mt-2">
            Because all calculation happens locally in your browser, your financial information stays on
            your device <strong>unless you choose</strong> to request a specialist review or email yourself a
            breakdown (sections 4 and 5). Only then is a summary of your result sent, together with the
            details you enter in that form.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Cookies and tracking technologies</h2>
          <p>
            We do not set any first-party cookies ourselves. However, the third-party services listed below
            place their own cookies and collect usage data when you visit this site.
          </p>

          <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">Google Analytics (GA4)</h3>
          <p>
            We use Google Analytics to understand how visitors use the site — which pages are visited,
            how long visitors stay, and where traffic comes from. Google Analytics sets cookies that
            identify your browser across sessions. The data is aggregated and does not personally
            identify you to us. Google may process this data on servers outside your country.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>To opt out: install the <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a></li>
            <li><a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a></li>
          </ul>

          <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">Google AdSense</h3>
          <p>
            We display advertisements served by Google AdSense. Google uses cookies to serve ads based
            on your prior visits to this site and other sites. These cookies allow Google and its partners
            to show you ads that may be relevant to your interests. You can opt out of personalised
            advertising at any time.
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-sm">
            <li>Opt out of personalised ads: <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google Ad Settings</a></li>
            <li>Opt out via industry tool: <a href="https://www.aboutads.info/choices/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">aboutads.info</a></li>
            <li><a href="https://policies.google.com/technologies/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">How Google uses advertising cookies</a></li>
          </ul>

          <h3 className="text-base font-semibold text-gray-800 mt-4 mb-2">Ahrefs Analytics</h3>
          <p>
            We use Ahrefs Analytics to measure site traffic and search performance. Ahrefs collects
            anonymised page view data. See the{' '}
            <a href="https://ahrefs.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
              Ahrefs Privacy Policy
            </a>{' '}
            for details.
          </p>
        </section>

        <section id="leads">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Specialist review requests</h2>
          <p>
            After a calculation you can ask for a free call with a partner tax firm. If you submit that form we collect:
            your name, email, optional WhatsApp/phone number, nationality, days in Thailand, income types, approximate
            yearly remittance range, urgency, any notes you add, a summary of your calculator result (estimated tax,
            remitted and taxable amounts, residency and complexity flags), the page you were on, how you arrived
            (referrer and campaign/UTM tags) and a record of your consent (the exact wording and the time).
          </p>
          <p className="mt-2">
            <strong>We share these details with {partnerName} only if you tick the consent box naming them.</strong> The
            box is never pre-ticked and the form cannot be sent without it. We use the details to pass on your request, to
            send you a confirmation email, and to keep a record of referrals for invoicing the partner firm. The partner
            firm then handles your data under its own privacy policy. We may receive a referral fee:{' '}
            <Link to="/how-this-site-is-funded/" className="text-blue-600 hover:underline">how this site is funded</Link>.
          </p>
          <p className="mt-2">
            Legal basis: your consent (Thailand's PDPA section 19 and, where it applies, GDPR article 6(1)(a)). You can
            withdraw consent at any time by emailing us; this does not affect what was shared before you withdrew, and we
            will ask the partner firm to stop contacting you.
          </p>
        </section>

        <section id="email">
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. "Email me my breakdown" and updates</h2>
          <p>
            If you ask us to email your tax breakdown, we use your email address to send it and keep a record that we did.
            Separately, and only if you tick the (unticked by default) box, we will send you occasional Thai tax updates.
            Every update includes an unsubscribe link. Your email is not shared with partner firms through this feature.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Service providers and international transfers</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Cloudflare</strong> hosts the form service and database, and provides spam protection (Turnstile).</li>
            <li><strong>Resend</strong> sends the confirmation, lead and breakdown emails.</li>
            <li><strong>GitHub Pages</strong> hosts the website itself.</li>
          </ul>
          <p className="mt-2">
            These providers, and our operating company, may process data outside Thailand, including in the United States.
            We rely on the providers' contractual safeguards for these transfers.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Exchange rate lookups</h2>
          <p>
            When you enter foreign income in the Annual Tax Calculator, the site may fetch the Bank of
            Thailand's published daily exchange rate for the currency and date you specify. This request
            is made through a proxy server to comply with browser security restrictions. <strong>No personal
            or financial data from your form is included in this request</strong> — only the currency code and date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Information this site does not collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not collect your name or contact details unless you submit one of the forms above or email us</li>
            <li>We do not have user accounts or logins</li>
            <li>We do not store your detailed calculator inputs on any server; only the result summary described in section 4 is sent, and only if you submit the form</li>
            <li>We do not sell data. Sharing with a partner firm happens only with your explicit consent</li>
            <li>Analytics events do not include your name, email, phone number, notes or exact amounts</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Your rights</h2>
          <p>
            Under Thailand's Personal Data Protection Act (PDPA) and, where it applies, the EU GDPR, you can ask us
            for access to the personal data we hold about you, correct it, delete it, restrict or object to its use,
            receive a copy, and withdraw consent. You can also complain to Thailand's Personal Data Protection Committee.
            For data held by Google or Ahrefs, use the opt-out links above or contact them directly.
          </p>
          <p className="mt-2">
            For any privacy enquiries, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">10. Data retention</h2>
          <p>
            Specialist review requests are kept for 24 months after the last update to their status (needed for
            referral invoicing and disputes), then deleted. Email-capture records are kept until you unsubscribe or ask us
            to delete them, and breakdown-only records for 24 months. Calculator data in session storage is deleted when
            you close the browser tab. Google Analytics
            retains event data for 14 months by default (configurable in the GA4 console). AdSense cookies
            persist for up to 13 months. We do not control the retention policies of third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">11. Changes to this policy</h2>
          <p>
            We may update this policy if we add new features or services. The "Last updated" date at the
            top of the page will reflect any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">12. Contact</h2>
          <p>
            Questions or concerns about this privacy policy can be sent to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>

      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
