import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PageHeader } from '../components/layout/InfoPage';
import ArrowIcon from '../components/ui/ArrowIcon';

const SITE_URL = 'https://mythaitaxes.com';
const CONTACT_EMAIL = 'info@mythaitaxes.com';

const mailto = (subject: string, body: string) =>
  `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

const ContactPage: React.FC = () => {
  const title = 'Contact | My Thai Taxes';
  const description =
    'Report incorrect tax information, a calculator bug, or suggest a correction, or get in touch with My Thai Taxes.';

  return (
    <div className="mx-auto max-w-[52rem] px-4 pb-20 pt-10 sm:px-6 lg:pt-14">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/contact/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/contact/`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <PageHeader
        title="Contact"
        intro={
          <p>
            Every issue below goes to the same inbox and is read by the person who maintains this site.
            Using the right link helps route your message correctly — see{' '}
            <Link to="/about/" className="font-semibold text-desk underline decoration-desk/40 hover:decoration-desk">About</Link> for how figures are
            sourced and reviewed.
          </p>
        }
      />

      <div className="on-paper mt-8 bg-paper-white px-5 text-ink shadow-sheet-sm sm:px-8">

        <section className="border-b border-paper-rule py-6 last:border-b-0">
          <h2 className="display text-xl leading-snug text-ink">
            Found an incorrect calculation or outdated tax rule? Tell us.
          </h2>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-soft">
            Every rate, threshold, and allowance used in the calculator is tracked in the{' '}
            <a
              href="https://github.com/holsson95/thai-tax-calculator/blob/main/TAX_RULES.md"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-desk underline decoration-desk/40 hover:decoration-desk"
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
            className="btn-text group mt-4"
          >
            Report incorrect tax information
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </section>

        <section className="border-b border-paper-rule py-6 last:border-b-0">
          <h2 className="display text-xl leading-snug text-ink">Found a calculator bug?</h2>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-soft">
            If the annual tax calculator or monthly withholding estimator produces a result that looks
            wrong, crashes, or behaves unexpectedly, please report it — include which calculator you were
            using and the inputs that triggered the issue so it can be reproduced.
          </p>
          <a
            href={mailto(
              '[Bug Report] ',
              'Which calculator? (Annual Tax / Monthly Withholding)\n\nWhat inputs did you enter?\n\nWhat result did you expect, and what did you get instead?\n'
            )}
            className="btn-text group mt-4"
          >
            Report a calculator bug
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </section>

        <section className="border-b border-paper-rule py-6 last:border-b-0">
          <h2 className="display text-xl leading-snug text-ink">Suggest a correction</h2>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-soft">
            Spotted an error, unclear explanation, or outdated statement in an article, the FAQ, or
            anywhere else on the site that isn't a calculator figure? Suggest a correction, including a
            link to the page.
          </p>
          <a
            href={mailto(
              '[Correction Suggestion] ',
              'Which page is this about? (link)\n\nWhat should be corrected?\n'
            )}
            className="btn-text group mt-4"
          >
            Suggest a correction
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </section>

        <section className="border-b border-paper-rule py-6 last:border-b-0">
          <h2 className="display text-xl leading-snug text-ink">General contact</h2>
          <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-ink-soft">
            Questions, feedback, partnership inquiries, or anything else not covered above.
          </p>
          <a
            href={mailto('[General Inquiry] ', '')}
            className="btn-text group mt-4"
          >
            Send a general message
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </section>

      </div>

      <p className="mt-6 text-sm text-ink-soft">
        Prefer email directly?{' '}
        <a href={`mailto:${CONTACT_EMAIL}`} className="font-mono font-semibold text-desk underline decoration-desk/40 hover:decoration-desk">
          {CONTACT_EMAIL}
        </a>
      </p>
    </div>
  );
};

export default ContactPage;
