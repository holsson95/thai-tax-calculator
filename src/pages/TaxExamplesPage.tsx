import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import TaxExampleCard from '../components/TaxExampleCard';
import { taxExamples, getTaxExampleById } from '../data/taxExamples';

const SITE_URL = 'https://mythaitaxes.com';

const SECTIONS: { heading: string; description: string; exampleIds: string[] }[] = [
  {
    heading: 'The basic flow: from salary to tax owed',
    description: 'How gross income becomes taxable income, and how that taxable income becomes a tax bill.',
    exampleIds: ['simple-employee'],
  },
  {
    heading: 'Marginal rate vs. effective rate',
    description:
      'Your tax bracket is the rate on your last slice of income, not the rate on all of it. These examples show the gap at different income levels.',
    exampleIds: ['lower-income-employee', 'middle-income-employee', 'high-income-employee'],
  },
  {
    heading: 'Crossing a bracket threshold',
    description:
      'Does earning a little more push your whole income into a higher bracket? These two examples, ฿2,000 apart, show exactly what changes.',
    exampleIds: ['bracket-threshold-below', 'bracket-threshold-above'],
  },
  {
    heading: 'How deductions change the result',
    description: 'The same salary, with and without an insurance premium and provident fund contribution.',
    exampleIds: ['deductions-impact'],
  },
  {
    heading: 'A full calculator walkthrough',
    description: 'A realistic profile — married, one child, several deductions — computed exactly as the calculator would compute it.',
    exampleIds: ['calculator-walkthrough'],
  },
  {
    heading: 'Freelance income, foreign remittance, and pensions',
    description:
      'Salaried employees are not the only tax situation on this site. These examples cover the flat-rate business-income deduction, why the same remitted amount can be taxable or exempt depending on when it was earned, and how a DTA can exempt one foreign pension while taxing another.',
    exampleIds: ['freelancer-business-income', 'foreign-income-remittance-timing', 'foreign-pension-dta-exemption'],
  },
];

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

  return (
    <div className="py-8">
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

      <div className="max-w-3xl mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Thailand Income Tax Examples
          </h1>
          <p className="text-gray-600 leading-relaxed">
            See how Thailand personal income tax is calculated for different income levels and
            situations. Every number below is computed by the same engine that powers the{' '}
            <Link to="/annual-tax/" className="text-blue-600 hover:underline">Annual Tax Calculator</Link>{' '}
            — not typed by hand — so these examples can't drift from what the calculator would actually
            show you.
          </p>
        </header>

        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-10 text-sm text-amber-800">
          <svg className="w-4 h-4 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>
            These are illustrative example profiles, not tax advice for any specific person. Figures use
            the 2026 tax year rules documented on the{' '}
            <Link to="/sources/" className="underline hover:text-amber-900 font-medium">Sources &amp; References</Link>{' '}
            page — several of which are strong secondary sources rather than fetched primary government
            documents. Verify your own situation with the{' '}
            <Link to="/annual-tax/" className="underline hover:text-amber-900 font-medium">calculator</Link>{' '}
            or a licensed Thai tax advisor.
          </span>
        </div>

        <nav className="mb-10 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">On this page</p>
          <ul className="space-y-1 text-sm">
            {SECTIONS.map((section) => (
              <li key={section.heading}>
                <a href={`#${section.exampleIds[0]}`} className="text-blue-600 hover:underline">
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">
          {SECTIONS.map((section) => (
            <section key={section.heading}>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{section.heading}</h2>
              <p className="text-gray-600 mb-5">{section.description}</p>
              <div className="space-y-6">
                {section.exampleIds.map((id) => {
                  const example = getTaxExampleById(id);
                  return example ? <TaxExampleCard key={id} example={example} /> : null;
                })}
              </div>
            </section>
          ))}
        </div>

        <div className="bg-blue-50 rounded-xl p-6 text-center my-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">See your own numbers</h2>
          <p className="text-gray-600 mb-4">
            These examples use illustrative profiles. Enter your real income, allowances, and deductions
            to get your own taxable income, tax owed, and effective rate.
          </p>
          <Link
            to="/annual-tax/"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Start Calculator
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Related reading</h2>
          <ul className="space-y-2">
            {[
              { to: '/articles/thai-tax-brackets-explained/', label: 'Thai Income Tax Brackets 2025/2026 Explained' },
              { to: '/articles/maximizing-tax-deductions-thailand/', label: 'Thailand Tax Deductions: Full Guide for Expats' },
              { to: '/methodology/', label: 'How Thai Income Tax Is Calculated' },
              { to: '/sources/', label: 'Tax Sources & References' },
            ].map(({ to, label }) => (
              <li key={to} className="flex gap-2">
                <span className="text-blue-500">→</span>
                <Link to={to} className="text-blue-600 hover:underline">{label}</Link>
              </li>
            ))}
          </ul>
        </section>

        <p className="text-xs text-gray-400 mt-8">
          {taxExamples.length} worked examples · Tax year 2026
        </p>
      </div>
    </div>
  );
};

export default TaxExamplesPage;
