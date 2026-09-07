import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://mythaitaxes.com';
const CONTACT_EMAIL = 'info@mythaitaxes.com';

const mailto = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const ContactPage: React.FC = () => {
  const title = 'Contact | My Thai Taxes';
  const description =
    'Report incorrect tax information, a calculator bug, or suggest a correction, or get in touch with My Thai Taxes.';

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/contact/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/contact/`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Contact</h1>

      <div className="space-y-8 text-gray-700 leading-relaxed">

        <p>
          Every issue below goes to the same inbox and is read by the person who maintains this site.
          Using the right link helps route your message correctly — see{' '}
          <Link to="/about/" className="text-blue-600 hover:underline">About</Link> for how figures are
          sourced and reviewed.
        </p>

        <div className="border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Found an incorrect calculation or outdated tax rule? Tell us.
          </h2>
          <p className="text-sm text-gray-600 mb-3">
            Every rate, threshold, and allowance used in the calculator is tracked in the{' '}
            <a
              href="https://github.com/holsson95/thai-tax-calculator/blob/main/TAX_RULES.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Thai Tax Rules Registry
            </a>
            . If a figure looks wrong, out of date, or you have a primary source (Revenue Department
            document, official announcement) that says otherwise, let us know — include the tax year and,
            if possible, a link to the source.
          </p>
          <a
            href={mailto(
              '[Tax Rule Correction] ',
              'Which figure or rule is incorrect?\n\nWhat tax year does it apply to?\n\nWhat should it be, and do you have a source (link or document)?\n'
            )}
            className="inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Report incorrect tax information →
          </a>
        </div>

        <div className="border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Found a calculator bug?</h2>
          <p className="text-sm text-gray-600 mb-3">
            If the annual tax calculator or monthly withholding estimator produces a result that looks
            wrong, crashes, or behaves unexpectedly, please report it — include which calculator you were
            using and the inputs that triggered the issue so it can be reproduced.
          </p>
          <a
            href={mailto(
              '[Bug Report] ',
              'Which calculator? (Annual Tax / Monthly Withholding)\n\nWhat inputs did you enter?\n\nWhat result did you expect, and what did you get instead?\n'
            )}
            className="inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Report a calculator bug →
          </a>
        </div>

        <div className="border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Suggest a correction</h2>
          <p className="text-sm text-gray-600 mb-3">
            Spotted an error, unclear explanation, or outdated statement in an article, the FAQ, or
            anywhere else on the site that isn't a calculator figure? Suggest a correction, including a
            link to the page.
          </p>
          <a
            href={mailto(
              '[Correction Suggestion] ',
              'Which page is this about? (link)\n\nWhat should be corrected?\n'
            )}
            className="inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Suggest a correction →
          </a>
        </div>

        <div className="border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">General contact</h2>
          <p className="text-sm text-gray-600 mb-3">
            Questions, feedback, partnership inquiries, or anything else not covered above.
          </p>
          <a
            href={mailto('[General Inquiry] ', '')}
            className="inline-block text-sm font-medium text-blue-600 hover:underline"
          >
            Send a general message →
          </a>
        </div>

        <p className="text-sm text-gray-500">
          Prefer email directly?{' '}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
            {CONTACT_EMAIL}
          </a>
        </p>

      </div>
    </div>
  );
};

export default ContactPage;
