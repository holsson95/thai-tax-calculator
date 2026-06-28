import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://mythaitaxes.com';
const CONTACT_EMAIL = 'info@mythaitaxes.com';

const PrivacyPolicyPage: React.FC = () => {
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
      <p className="text-sm text-gray-500 mb-8">Last updated: 28 June 2026</p>

      <div className="prose prose-gray max-w-none space-y-8 text-gray-700">

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Who we are</h2>
          <p>
            This website (<strong>mythaitaxes.com</strong>) provides free tools and informational articles
            to help individuals estimate their Thai personal income tax. It is operated as an independent
            personal project. For questions about this policy, contact{' '}
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
            Because all calculation happens locally in your browser, you can use the calculators with
            complete confidence that your financial information stays on your device.
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

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Exchange rate lookups</h2>
          <p>
            When you enter foreign income in the Annual Tax Calculator, the site may fetch the Bank of
            Thailand's published daily exchange rate for the currency and date you specify. This request
            is made through a proxy server to comply with browser security restrictions. <strong>No personal
            or financial data from your form is included in this request</strong> — only the currency code and date.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Information this site does not collect</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>We do not collect your name, email address, or any contact details (unless you email us directly)</li>
            <li>We do not have user accounts or logins</li>
            <li>We do not store your calculator inputs on any server</li>
            <li>We do not sell data to third parties</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Your rights</h2>
          <p>
            Depending on where you are located, you may have rights regarding your personal data under
            laws such as the EU General Data Protection Regulation (GDPR) or Thailand's Personal Data
            Protection Act (PDPA). Because we do not collect personally identifiable information through
            this site, most of these rights apply to data held by third-party services (Google, Ahrefs)
            rather than by us. To exercise rights against those providers, use the opt-out links above
            or contact them directly.
          </p>
          <p className="mt-2">
            For any privacy enquiries, email{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">{CONTACT_EMAIL}</a>.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">7. Data retention</h2>
          <p>
            Calculator data in session storage is deleted when you close the browser tab. Google Analytics
            retains event data for 14 months by default (configurable in the GA4 console). AdSense cookies
            persist for up to 13 months. We do not control the retention policies of third-party services.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">8. Changes to this policy</h2>
          <p>
            We may update this policy if we add new features or services. The "Last updated" date at the
            top of the page will reflect any changes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">9. Contact</h2>
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
