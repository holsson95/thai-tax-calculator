import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import OfficialSource from '../components/OfficialSource';
import TaxExampleCard from '../components/TaxExampleCard';
import { getTaxExampleById } from '../data/taxExamples';

const SITE_URL = 'https://mythaitaxes.com';

const SECTIONS = [
  { id: 'applies-to-you', label: 'Does this apply to you?' },
  { id: 'how-it-works', label: 'How Thai income tax works' },
  { id: 'brackets', label: '2026 tax brackets' },
  { id: 'allowances-deductions', label: 'Allowances & deductions' },
  { id: 'residency', label: 'Tax residency' },
  { id: 'foreign-income', label: 'Foreign income' },
  { id: 'filing', label: 'Filing' },
  { id: 'whats-new', label: "What's new for 2026" },
  { id: 'examples', label: 'Worked examples' },
  { id: 'calculator', label: 'Calculator' },
  { id: 'methodology-sources', label: 'Methodology & sources' },
  { id: 'related-guides', label: 'Related guides' },
];

const ThailandTax2026Page: React.FC = () => {
  const title = 'Thailand Personal Income Tax 2026: Complete Overview | MyThaiTaxes';
  const description =
    'How Thailand’s 2026 personal income tax works: brackets, allowances, residency, foreign income, and filing — plus a free calculator to estimate what you owe.';
  const canonicalUrl = `${SITE_URL}/thailand-tax-2026/`;

  const webPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: canonicalUrl,
  };

  const simpleEmployee = getTaxExampleById('simple-employee');
  const deductionsImpact = getTaxExampleById('deductions-impact');
  const bracketBelow = getTaxExampleById('bracket-threshold-below');

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
            Thailand Personal Income Tax 2026: The Complete Overview
          </h1>
          <p className="text-gray-600 leading-relaxed">
            This page is the starting point for Thailand's 2026 personal income tax system — what
            determines your taxable income, which brackets apply, how residency and foreign income change
            the picture, and what filing involves. Each section below gives you the key facts and links to
            the site's full guide on that topic, so you can go as deep as you need to.
          </p>
        </header>

        <nav className="mb-10 bg-gray-50 border border-gray-200 rounded-lg p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">On this page</p>
          <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className="text-blue-600 hover:underline">{s.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="space-y-14">

          {/* 1. Does this apply to you? */}
          <section id="applies-to-you">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Does this apply to you?</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Whether Thailand taxes your income starts with one question: are you a Thai tax resident?
              Under Section 41 of the Revenue Code, anyone present in Thailand for <strong>180 days or
              more</strong> in a calendar year is a tax resident for that year — regardless of visa type
              or nationality.
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-1">Thai tax resident (180+ days)</p>
                <p className="text-sm text-gray-600">
                  Taxed on Thai-sourced income, plus foreign-sourced income you remit to Thailand.
                </p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-1">Non-resident (under 180 days)</p>
                <p className="text-sm text-gray-600">
                  Taxed only on Thai-sourced income. Foreign income is never taxable, regardless of remittance.
                </p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed mt-3">
              See <Link to="#residency" className="text-blue-600 hover:underline">Tax residency</Link> below
              for the full rule, or the dedicated{' '}
              <Link to="/articles/understanding-thai-tax-residency/" className="text-blue-600 hover:underline">
                180-day rule article
              </Link>{' '}
              for worked day-count examples.
            </p>
          </section>

          {/* 2. How it works */}
          <section id="how-it-works">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">How Thai income tax works</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Every Thai personal income tax calculation follows the same sequence, whether you're a
              salaried employee or a freelancer with multiple income types:
            </p>
            <ol className="space-y-2 mb-4">
              {[
                'Assessable income — gross income from all sources, by Revenue Code category (salary, freelance, rental, etc.)',
                'Expense deductions — a flat or capped deduction, depending on income type',
                'Personal allowances — for yourself, spouse, children, parents, and other qualifying circumstances',
                'Taxable income — what remains after deductions and allowances',
                'Progressive tax brackets — applied to taxable income, band by band',
                'Credits & withholding — tax already withheld, and any foreign tax credit under a treaty, netted against tax owed',
                'Final result — additional tax owed, or a refund',
              ].map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold flex items-center justify-center">{i + 1}</span>
                  <span className="text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
            <p className="text-gray-700 leading-relaxed">
              Residency and foreign income (steps that apply on top of this base flow) are covered in their
              own sections below. The full step-by-step calculation, with a worked example, is documented on
              the <Link to="/methodology/" className="text-blue-600 hover:underline">Methodology</Link> page.
            </p>
          </section>

          {/* 3. Brackets */}
          <section id="brackets">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2026 tax brackets</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Taxable income is taxed progressively across 8 bands, 0% to 35% — this bracket structure has
              been in effect since 2017 and is unchanged for 2026. Only the portion of income within each
              band is taxed at that band's rate.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-gray-700">Taxable income band</th>
                    <th className="text-right px-3 py-2 font-medium text-gray-700">Rate</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-3 py-2">0 – 150,000 THB</td><td className="text-right px-3 py-2">0%</td></tr>
                  <tr><td className="px-3 py-2">150,000 – 300,000 THB</td><td className="text-right px-3 py-2">5%</td></tr>
                  <tr><td className="px-3 py-2">300,000 – 500,000 THB</td><td className="text-right px-3 py-2">10%</td></tr>
                  <tr><td className="px-3 py-2">500,000 – 750,000 THB</td><td className="text-right px-3 py-2">15%</td></tr>
                  <tr><td className="px-3 py-2">750,000 – 1,000,000 THB</td><td className="text-right px-3 py-2">20%</td></tr>
                  <tr><td className="px-3 py-2">1,000,000 – 2,000,000 THB</td><td className="text-right px-3 py-2">25%</td></tr>
                  <tr><td className="px-3 py-2">2,000,000 – 5,000,000 THB</td><td className="text-right px-3 py-2">30%</td></tr>
                  <tr><td className="px-3 py-2">Above 5,000,000 THB</td><td className="text-right px-3 py-2">35%</td></tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
              These bracket figures are corroborated by multiple secondary tax-advisory sources, but the
              Revenue Department's own English-language page showing brackets is stale (pre-2017 figures) —
              see the <Link to="/sources/" className="underline hover:text-amber-900 font-medium">Sources</Link> page
              for the verification status of every figure on this site.
            </p>
            <p className="text-gray-700 leading-relaxed mt-3">
              Full explanation, plus a marginal-vs-effective-rate worked example: see{' '}
              <Link to="/articles/thai-tax-brackets-explained/" className="text-blue-600 hover:underline">
                Thai Income Tax Rates and Brackets
              </Link>.
            </p>
          </section>

          {/* 4. Allowances & deductions */}
          <section id="allowances-deductions">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Allowances & deductions</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Two separate things reduce your taxable income: an <strong>expense deduction</strong> (a flat
              or capped amount depending on your income type — for salaried employees, 50% of income
              capped at 100,000 THB) and <strong>personal allowances</strong> based on your family situation:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-gray-700">Allowance</th>
                    <th className="text-right px-3 py-2 font-medium text-gray-700">Amount</th>
                    <th className="text-left px-3 py-2 font-medium text-gray-700">Condition</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr><td className="px-3 py-2">Personal allowance</td><td className="text-right px-3 py-2">60,000 THB</td><td className="px-3 py-2">Every taxpayer</td></tr>
                  <tr><td className="px-3 py-2">Spouse allowance</td><td className="text-right px-3 py-2">60,000 THB</td><td className="px-3 py-2">Married, spouse has no income</td></tr>
                  <tr><td className="px-3 py-2">Senior exemption (65+)</td><td className="text-right px-3 py-2">190,000 THB</td><td className="px-3 py-2">Taxpayer is 65 or older</td></tr>
                  <tr><td className="px-3 py-2">Child allowance</td><td className="text-right px-3 py-2">30,000 THB/child</td><td className="px-3 py-2">Per qualifying child (+30,000 THB for 2nd+ child born 2018+)</td></tr>
                  <tr><td className="px-3 py-2">Parent allowance</td><td className="text-right px-3 py-2">30,000 THB/parent</td><td className="px-3 py-2">Up to 4 parents, self-certified</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-gray-700 leading-relaxed mt-3">
              Retirement-fund contributions, life/health insurance, and donations are also deductible, each
              with its own cap. Full table and each cap's sourcing:{' '}
              <Link to="/articles/maximizing-tax-deductions-thailand/" className="text-blue-600 hover:underline">
                Thailand Tax Deductions
              </Link>{' '}
              and <Link to="/articles/how-to-use-the-thai-tax-calculator/" className="text-blue-600 hover:underline">
                How to Use the Thai Tax Calculator
              </Link>.
            </p>
          </section>

          {/* 5. Residency */}
          <section id="residency">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Tax residency</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              You're a Thai tax resident for a calendar year if you were physically present in Thailand for
              180 days or more, aggregated across the year — not necessarily consecutive, and not
              determined by visa type. Non-residents are taxed only on Thai-sourced income and never on
              foreign income, regardless of remittance.
            </p>
            <OfficialSource
              label="Thai tax residency threshold"
              value="180 days"
              sourceLabel="Thai Revenue Department (EN) — Revenue Code Section 41"
              sourceUrl="https://www.rd.go.th/english/37749.html"
              taxYear={2026}
              lastVerified="September 2026"
              verified={true}
            />
            <p className="text-gray-700 leading-relaxed mt-3">
              Worked day-count examples and edge cases:{' '}
              <Link to="/articles/understanding-thai-tax-residency/" className="text-blue-600 hover:underline">
                Am I a Thai Tax Resident? The 180-Day Rule, Explained With Examples
              </Link>.
            </p>
          </section>

          {/* 6. Foreign income */}
          <section id="foreign-income">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Foreign income</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              If you're a Thai tax resident, foreign-sourced income becomes assessable when it's remitted
              (transferred, withdrawn, or spent) in Thailand. Since <strong>1 January 2024</strong> (Order
              Por. 161/2566), this applies even if the remittance happens in a later year than when the
              income was earned — income earned before that date keeps the older same-year-remittance
              treatment. Capital (e.g. savings from before you became a resident) is not income and isn't
              taxed regardless of when it's remitted. Where a Double Tax Agreement applies, foreign tax
              already paid can offset the Thai tax on the same income.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Conceptual overview: <Link to="/articles/foreign-income-thailand-tax/" className="text-blue-600 hover:underline">What Counts as Foreign Income in Thailand</Link>.{' '}
              Remittance mechanics and timing examples: <Link to="/articles/transferring-money-to-thailand-tax-rules/" className="text-blue-600 hover:underline">Transferring Money to Thailand: 2024 Tax Rules</Link>.{' '}
              Foreign tax credits and treaties: <Link to="/articles/double-tax-agreements-thailand/" className="text-blue-600 hover:underline">Thai Double Tax Treaties</Link>.
            </p>
          </section>

          {/* 7. Filing */}
          <section id="filing">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Filing</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Most taxpayers file an annual return (PND 90 or PND 91, depending on income types) by{' '}
              <strong>31 March</strong> of the following year on paper — an e-filing extension has
              historically been granted but is not yet confirmed for the return covering tax year 2026.
              Freelancers and others with certain income types (rental, liberal profession, contracting,
              business) may also need to file a mid-year return, PND 94, by 30 September. You'll need a Thai
              Tax Identification Number (TIN) to file.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Step-by-step: <Link to="/articles/expat-guide-filing-thai-taxes/" className="text-blue-600 hover:underline">Thai Tax Return for Expats: PND 90/91 Guide</Link>,{' '}
              <Link to="/articles/pnd94-mid-year-tax-filing/" className="text-blue-600 hover:underline">PND 94: Mid-Year Tax Filing</Link>, and{' '}
              <Link to="/articles/how-to-get-thai-tax-id-number/" className="text-blue-600 hover:underline">How to Get a Thai Tax ID Number</Link>.
            </p>
          </section>

          {/* 8. What's new for 2026 */}
          <section id="whats-new">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">What's new for 2026</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Not everything on this page changed for 2026 — most of Thailand's income tax system carries
              over unchanged. Here's what's actually new versus what simply still applies:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                <p className="font-semibold text-green-900 mb-2">Changed for 2026</p>
                <ul className="text-sm text-green-900 space-y-2">
                  <li>
                    <strong>Social Security (SSO) contribution cap rises to 10,500 THB/year</strong>, up from
                    9,000 THB/year in 2024–2025 (Phase 1, effective 1 Jan 2026 through 2028).
                  </li>
                </ul>
              </div>
              <div className="border border-gray-200 bg-gray-50 rounded-lg p-4">
                <p className="font-semibold text-gray-900 mb-2">Unchanged, still in effect for 2026</p>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>Progressive tax brackets (0%–35%, in effect since 2017)</li>
                  <li>Personal, spouse, child, and parent allowances</li>
                  <li>The 180-day tax residency test</li>
                  <li>The 2024+ foreign-income remittance rule (Por. 161/2566) — now two years in effect, not new for 2026</li>
                  <li>VAT registration threshold (1,800,000 THB)</li>
                </ul>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Based on the site's verified 2026 tax-rules registry — see{' '}
              <Link to="/sources/" className="text-blue-600 hover:underline">Sources</Link> for what's
              primary-verified versus secondary-sourced.
            </p>
          </section>

          {/* 9. Worked examples */}
          <section id="examples">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Worked examples</h2>
            <p className="text-gray-700 leading-relaxed mb-5">
              These are computed by the same engine that powers the calculator — not typed by hand.
            </p>
            <div className="space-y-6">
              {simpleEmployee && <TaxExampleCard example={simpleEmployee} />}
              {deductionsImpact && <TaxExampleCard example={deductionsImpact} />}
              {bracketBelow && <TaxExampleCard example={bracketBelow} />}
            </div>
            <p className="text-gray-700 leading-relaxed mt-4">
              See all 8 examples, including bracket-threshold and full calculator walkthroughs, at{' '}
              <Link to="/tax-examples/" className="text-blue-600 hover:underline">Thailand Income Tax Examples</Link>.
            </p>
          </section>

          {/* 10. Calculator */}
          <section id="calculator">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Calculator</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Everything above explains how the rules work. The calculator estimates what <em>you</em> owe,
              once you know how your specific income should be classified — for genuinely ambiguous cases
              (is this remittance capital or income? which treaty article applies to my pension?), that
              classification is still yours to make, ideally with a qualified advisor. The calculator does
              not provide legal or tax advice.
            </p>
            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Estimate your tax</h3>
              <p className="text-gray-600 mb-4">
                Enter your income, allowances, deductions, and (if applicable) foreign income to get your
                taxable income, tax owed, and effective rate.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/annual-tax/"
                  className="inline-flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Annual Tax Calculator
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link
                  to="/monthly-withholding/"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 font-medium py-3 px-6 rounded-lg transition-colors"
                >
                  Monthly Withholding Estimator
                </Link>
              </div>
            </div>
          </section>

          {/* 11. Methodology & sources */}
          <section id="methodology-sources">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Methodology & sources</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              Every figure on this page traces to a source recorded in this site's tax rules registry, each
              flagged as primary-government-verified or secondary-sourced. The residency threshold and the
              2026 SSO cap above are primary/strongly corroborated; the tax brackets and allowance amounts
              rest on convergent secondary sources, as flagged inline above.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Full step-by-step calculation walkthrough: <Link to="/methodology/" className="text-blue-600 hover:underline">Methodology</Link>.{' '}
              Complete source list by topic: <Link to="/sources/" className="text-blue-600 hover:underline">Sources & References</Link>.
            </p>
          </section>

          {/* 12. Related guides */}
          <section id="related-guides">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Related guides</h2>
            <ul className="space-y-2">
              {[
                { to: '/articles/freelancer-tax-guide-thailand/', label: 'Thai Tax Guide for Freelancers' },
                { to: '/articles/pensioner-retiree-tax-guide-thailand/', label: 'Retiring in Thailand: Tax Guide for Pensioners' },
                { to: '/articles/thailand-tax-for-us-expats/', label: 'US Expat Taxes in Thailand: FBAR, FATCA & Double Tax' },
                { to: '/articles/thailand-tax-for-uk-expats/', label: 'Thailand Tax for UK Expats' },
                { to: '/articles/thailand-tax-guide-for-expats/', label: 'Thailand Tax for Expats: Complete Guide' },
                { to: '/faq/', label: 'Frequently Asked Questions' },
              ].map(({ to, label }) => (
                <li key={to} className="flex gap-2">
                  <span className="text-blue-500">→</span>
                  <Link to={to} className="text-blue-600 hover:underline">{label}</Link>
                </li>
              ))}
            </ul>
          </section>

        </div>

        <div className="mt-12 text-xs text-gray-400 border-t border-gray-200 pt-4">
          This page provides estimates and general information only, not tax advice. Verify your own
          situation with the{' '}
          <a
            href="https://www.rd.go.th/english/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-gray-600"
          >
            Thai Revenue Department
          </a>{' '}
          or a licensed Thai tax advisor. Tax year 2026.
        </div>
      </div>
    </div>
  );
};

export default ThailandTax2026Page;
