import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TaxExampleCard from '../components/TaxExampleCard';
import CalculateTaxCTA from '../components/CalculateTaxCTA';
import ArrowIcon from '../components/ui/ArrowIcon';
import { taxExamples, getTaxExampleById, TaxExample } from '../data/taxExamples';
import LastUpdated from '../components/LastUpdated';
import { PAGE_LAST_UPDATED } from '../config/contentDates';
import { RULES_TAX_YEAR } from '../config/taxRules';
import { formatThb } from '../utils/taxCalculations';

const SITE_URL = 'https://mythaitaxes.com';

const SECTIONS: { id: string; heading: string; description: string; exampleIds: string[] }[] = [
  {
    id: 'basic-flow',
    heading: 'The basic flow: from salary to tax owed',
    description: 'How gross income becomes taxable income, and how that taxable income becomes a tax bill.',
    exampleIds: ['simple-employee'],
  },
  {
    id: 'marginal-vs-effective',
    heading: 'Marginal rate vs. effective rate',
    description:
      'Your tax bracket is the rate on your last slice of income, not the rate on all of it. These examples show the gap at different income levels.',
    exampleIds: ['lower-income-employee', 'middle-income-employee', 'high-income-employee'],
  },
  {
    id: 'bracket-threshold',
    heading: 'Crossing a bracket threshold',
    description:
      'Does earning a little more push your whole income into a higher bracket? These two examples, ฿2,000 apart, show exactly what changes.',
    exampleIds: ['bracket-threshold-below', 'bracket-threshold-above'],
  },
  {
    id: 'deductions',
    heading: 'How deductions change the result',
    description: 'The same salary, with and without an insurance premium and provident fund contribution.',
    exampleIds: ['deductions-impact'],
  },
  {
    id: 'walkthrough',
    heading: 'A full calculator walkthrough',
    description: 'A realistic profile — married, one child, several deductions — computed exactly as the calculator would compute it.',
    exampleIds: ['calculator-walkthrough'],
  },
  {
    id: 'freelance-foreign-pension',
    heading: 'Freelance income, foreign remittance, and pensions',
    description:
      'Salaried employees are not the only tax situation on this site. These examples cover the flat-rate business-income deduction, why the same remitted amount can be taxable or exempt depending on when it was earned, and how a DTA can exempt one foreign pension while taxing another.',
    exampleIds: ['freelancer-business-income', 'foreign-income-remittance-timing', 'foreign-pension-dta-exemption'],
  },
];

const RELATED_READING = [
  { to: '/articles/thai-tax-brackets-explained/', label: 'Thai Income Tax Brackets 2025/2026 Explained' },
  { to: '/articles/maximizing-tax-deductions-thailand/', label: 'Thailand Tax Deductions: Full Guide for Expats' },
  { to: '/methodology/', label: 'How Thai Income Tax Is Calculated' },
  { to: '/sources/', label: 'Tax Sources & References' },
];

const sectionExamples = (ids: string[]): TaxExample[] =>
  ids.map((id) => getTaxExampleById(id)).filter((e): e is TaxExample => e !== undefined);

/** The part of an example's title before the colon: "Simple Employee", "Freelance Consultant". */
const shortTitle = (title: string) => title.split(':')[0];

/** The boxed part number, as on the foreign income form's numbered parts. */
const PartNumber: React.FC<{ n: number; size?: 'sm' | 'md' }> = ({ n, size = 'md' }) => (
  <span
    aria-hidden="true"
    className={`inline-flex shrink-0 items-center justify-center border-2 border-desk font-mono font-bold tabular-nums text-ink ${
      size === 'md' ? 'h-9 w-9 text-base' : 'h-6 w-6 text-xs'
    }`}
  >
    {n}
  </span>
);

const TaxExamplesPage: React.FC = () => {
  const title = 'Thailand Income Tax Examples: Worked Calculations by Concept | MyThaiTaxes';
  const description =
    'See how Thailand personal income tax is actually calculated — gross income to taxable income, progressive brackets, marginal vs. effective rate, deductions, and a full calculator walkthrough — with real worked numbers.';
  const canonicalUrl = `${SITE_URL}/tax-examples/`;

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonicalUrl,
  };

  const contents = (
    <ol className="space-y-3">
      {SECTIONS.map((section, i) => (
        <li key={section.id}>
          <a
            href={`#${section.id}`}
            className="flex items-start gap-2.5 text-sm font-semibold leading-snug text-ink transition-colors hover:text-desk"
          >
            <PartNumber n={i + 1} size="sm" />
            <span className="pt-0.5">{section.heading}</span>
          </a>
          <ul className="ml-[34px] mt-1">
            {sectionExamples(section.exampleIds).map((example) => (
              <li key={example.id}>
                <a
                  href={`#${example.id}`}
                  className="flex items-baseline justify-between gap-3 py-1 text-[13px] leading-snug text-ink-soft transition-colors hover:text-desk"
                >
                  <span>{shortTitle(example.title)}</span>
                  <span className="shrink-0 font-mono text-[11px] tabular-nums text-ink-mute">
                    {formatThb(example.taxOwed)}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-10 lg:pt-14">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>

      {/* Header */}
      <header className="max-w-[46rem]">
        <h1 className="display text-4xl leading-[1.08] text-ink sm:text-5xl">Thailand Income Tax Examples</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          See how Thailand personal income tax is calculated for different income levels and situations. Every number
          below is computed by the same engine that powers the{' '}
          <Link to="/annual-tax/" className="font-semibold text-desk underline decoration-desk/40 hover:decoration-desk">
            Annual Tax Calculator
          </Link>
{' '}
          — not typed by hand — so these examples can't drift from what the calculator would actually show you.
        </p>
        <LastUpdated date={PAGE_LAST_UPDATED.taxExamples} className="mt-4" />
        <p className="mt-3 max-w-prose text-[13px] leading-relaxed text-ink-mute">
          These are illustrative example profiles, not tax advice for any specific person. Figures use the{' '}
          {RULES_TAX_YEAR} tax year rules documented on the{' '}
          <Link to="/sources/" className="font-semibold text-desk underline">
            Sources &amp; References
          </Link>{' '}
          page, several of which are strong secondary sources rather than fetched primary government documents. Verify
          your own situation with the{' '}
          <Link to="/annual-tax/" className="font-semibold text-desk underline">
            calculator
          </Link>{' '}
          or a licensed Thai tax advisor.
        </p>
      </header>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,46rem)_15rem] lg:gap-14">
        <div className="min-w-0">
          {/* Contents, phones and tablets */}
          <details className="group on-paper mb-10 bg-paper-white shadow-sheet-sm lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <span className="field-label text-ink">On this page</span>
              <span className="flex items-center gap-2 font-mono text-xs text-ink-mute">
                {taxExamples.length} examples
                <ArrowIcon className="h-4 w-4 rotate-90 transition-transform group-open:-rotate-90" />
              </span>
            </summary>
            <div className="border-t-2 border-desk px-5 pb-4 pt-4">{contents}</div>
          </details>

          <div className="space-y-16">
            {SECTIONS.map((section, i) => (
              <section key={section.id} id={section.id} aria-labelledby={`${section.id}-heading`} className="scroll-mt-24">
                <div className="flex items-start gap-4 border-b-2 border-desk pb-3">
                  <PartNumber n={i + 1} />
                  <h2 id={`${section.id}-heading`} className="display pt-0.5 text-2xl leading-tight text-ink sm:text-[28px]">
                    {section.heading}
                  </h2>
                </div>
                <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-ink-soft">{section.description}</p>
                <div className="mt-7 space-y-8">
                  {sectionExamples(section.exampleIds).map((example) => (
                    <TaxExampleCard key={example.id} example={example} />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div className="perforation mt-16 text-ink/30" aria-hidden="true" />

          <div className="mt-12">
            <CalculateTaxCTA
              heading="See your own numbers"
              description="These examples use illustrative profiles. Enter your real income, allowances, and deductions to get your own taxable income, tax owed, and effective rate."
              primary={{ label: 'Start Calculator', to: '/annual-tax/' }}
            />
          </div>

          <section aria-labelledby="related-reading-heading" className="on-paper mt-10 bg-paper-white shadow-sheet-sm">
            <h2 id="related-reading-heading" className="display border-b-2 border-desk px-5 py-4 text-xl text-ink sm:px-6">
              Related reading
            </h2>
            <ul className="px-5 sm:px-6">
              {RELATED_READING.map(({ to, label }) => (
                <li key={to} className="border-b border-paper-rule last:border-b-0">
                  <Link
                    to={to}
                    className="group flex items-baseline justify-between gap-4 py-3 text-[15px] font-semibold leading-snug text-ink transition-colors hover:text-desk"
                  >
                    {label}
                    <ArrowIcon className="h-4 w-4 shrink-0 self-center text-ink-mute transition-transform group-hover:translate-x-0.5 group-hover:text-desk" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Contents, desktop */}
        <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto lg:block" aria-label="On this page">
          <p className="field-label flex items-baseline justify-between border-b-2 border-desk pb-1.5 text-ink">
            On this page
            <span className="font-mono normal-case tracking-normal text-ink-mute">tax owed</span>
          </p>
          <div className="mt-4">{contents}</div>
        </aside>
      </div>
    </div>
  );
};

export default TaxExamplesPage;
