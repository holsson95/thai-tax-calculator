import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import OfficialSource from '../components/OfficialSource';
import TaxExampleCard from '../components/TaxExampleCard';
import CalculateTaxCTA from '../components/CalculateTaxCTA';
import { getTaxExampleById, taxExamples } from '../data/taxExamples';
import { PageHeader, ProseSheet } from '../components/layout/InfoPage';
import ArrowIcon from '../components/ui/ArrowIcon';
import { PAGE_LAST_UPDATED } from '../config/contentDates';

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

  const toc = (
    <ol className="space-y-0.5">
      {SECTIONS.map((s) => (
        <li key={s.id}>
          <a href={`#${s.id}`} className="block py-1.5 text-sm leading-snug text-ink-soft transition-colors hover:text-desk">
            {s.label}
          </a>
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

      <PageHeader
        title="Thailand Personal Income Tax 2026: The Complete Overview"
        intro={
          <p>
            This page is the starting point for Thailand's 2026 personal income tax system — what
            determines your taxable income, which brackets apply, how residency and foreign income change
            the picture, and what filing involves. Each section below gives you the key facts and links to
            the site's full guide on that topic, so you can go as deep as you need to.
          </p>
        }
        updated={PAGE_LAST_UPDATED.thailandTax2026}
      />

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,46rem)_15rem] lg:gap-14">
        <div className="min-w-0">
          {/* Contents, phones and tablets */}
          <details className="group on-paper mb-6 bg-paper-white shadow-sheet-sm lg:hidden">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
              <span className="field-label text-ink">On this page</span>
              <span className="flex items-center gap-2 font-mono text-xs text-ink-mute">
                {SECTIONS.length} sections
                <ArrowIcon className="h-4 w-4 rotate-90 transition-transform group-open:-rotate-90" />
              </span>
            </summary>
            <div className="border-t-2 border-desk px-5 pb-3 pt-2">{toc}</div>
          </details>

          <ProseSheet>
          {/* 1. Does this apply to you? */}
          <section id="applies-to-you">
            <h2>Does this apply to you?</h2>
            <p>
              Whether Thailand taxes your income starts with one question: are you a Thai tax resident?
              Under Section 41 of the Revenue Code, anyone present in Thailand for <strong>180 days or
              more</strong> in a calendar year is a tax resident for that year — regardless of visa type
              or nationality.
            </p>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="note">
                <p className="mb-1 text-[15px] font-bold text-ink">Thai tax resident (180+ days)</p>
                <p className="text-sm text-ink-soft">
                  Taxed on Thai-sourced income, plus foreign-sourced income you remit to Thailand.
                </p>
              </div>
              <div className="note">
                <p className="mb-1 text-[15px] font-bold text-ink">Non-resident (under 180 days)</p>
                <p className="text-sm text-ink-soft">
                  Taxed only on Thai-sourced income. Foreign income is never taxable, regardless of remittance.
                </p>
              </div>
            </div>
            <p>
              See <Link to="#residency">Tax residency</Link> below
              for the full rule, or the dedicated{' '}
              <Link to="/articles/understanding-thai-tax-residency/">
                180-day rule article
              </Link>{' '}
              for worked day-count examples.
            </p>
          </section>

          {/* 2. How it works */}
          <section id="how-it-works">
            <h2>How Thai income tax works</h2>
            <p>
              Every Thai personal income tax calculation follows the same sequence, whether you're a
              salaried employee or a freelancer with multiple income types:
            </p>
            <ol>
              {[
                'Assessable income — gross income from all sources, by Revenue Code category (salary, freelance, rental, etc.)',
                'Expense deductions — a flat or capped deduction, depending on income type',
                'Personal allowances — for yourself, spouse, children, parents, and other qualifying circumstances',
                'Taxable income — what remains after deductions and allowances',
                'Progressive tax brackets — applied to taxable income, band by band',
                'Credits & withholding — tax already withheld, and any foreign tax credit under a treaty, netted against tax owed',
                'Final result — additional tax owed, or a refund',
              ].map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
            <p>
              Residency and foreign income (steps that apply on top of this base flow) are covered in their
              own sections below. The full step-by-step calculation, with a worked example, is documented on
              the <Link to="/methodology/">Methodology</Link> page.
            </p>
          </section>

          {/* 3. Brackets */}
          <section id="brackets">
            <h2>2026 tax brackets</h2>
            <p>
              Taxable income is taxed progressively across 8 bands, 0% to 35% — this bracket structure has
              been in effect since 2017 and is unchanged for 2026. Only the portion of income within each
              band is taxed at that band's rate.
            </p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Taxable income band</th>
                    <th className="!text-right">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>0 – 150,000 THB</td><td className="text-right">0%</td></tr>
                  <tr><td>150,000 – 300,000 THB</td><td className="text-right">5%</td></tr>
                  <tr><td>300,000 – 500,000 THB</td><td className="text-right">10%</td></tr>
                  <tr><td>500,000 – 750,000 THB</td><td className="text-right">15%</td></tr>
                  <tr><td>750,000 – 1,000,000 THB</td><td className="text-right">20%</td></tr>
                  <tr><td>1,000,000 – 2,000,000 THB</td><td className="text-right">25%</td></tr>
                  <tr><td>2,000,000 – 5,000,000 THB</td><td className="text-right">30%</td></tr>
                  <tr><td>Above 5,000,000 THB</td><td className="text-right">35%</td></tr>
                </tbody>
              </table>
            </div>
            <p className="note">
              These bracket figures are corroborated by multiple secondary tax-advisory sources, but the
              Revenue Department's own English-language page showing brackets is stale (pre-2017 figures) —
              see the <Link to="/sources/">Sources</Link> page
              for the verification status of every figure on this site.
            </p>
            <p>
              Full explanation, plus a marginal-vs-effective-rate worked example: see{' '}
              <Link to="/articles/thai-tax-brackets-explained/">
                Thai Income Tax Rates and Brackets
              </Link>.
            </p>
          </section>

          {/* 4. Allowances & deductions */}
          <section id="allowances-deductions">
            <h2>Allowances & deductions</h2>
            <p>
              Two separate things reduce your taxable income: an <strong>expense deduction</strong> (a flat
              or capped amount depending on your income type — for salaried employees, 50% of income
              capped at 100,000 THB) and <strong>personal allowances</strong> based on your family situation:
            </p>
            <div className="table-scroll">
              <table>
                <thead>
                  <tr>
                    <th>Allowance</th>
                    <th className="!text-right">Amount</th>
                    <th>Condition</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Personal allowance</td><td className="text-right">60,000 THB</td><td>Every taxpayer</td></tr>
                  <tr><td>Spouse allowance</td><td className="text-right">60,000 THB</td><td>Married, spouse has no income</td></tr>
                  <tr><td>Senior exemption (65+)</td><td className="text-right">190,000 THB</td><td>Taxpayer is 65 or older</td></tr>
                  <tr><td>Child allowance</td><td className="text-right">30,000 THB/child</td><td>Per qualifying child (+30,000 THB for 2nd+ child born 2018+)</td></tr>
                  <tr><td>Parent allowance</td><td className="text-right">30,000 THB/parent</td><td>Up to 4 parents, self-certified</td></tr>
                </tbody>
              </table>
            </div>
            <p>
              Retirement-fund contributions, life/health insurance, and donations are also deductible, each
              with its own cap. Full table and each cap's sourcing:{' '}
              <Link to="/articles/maximizing-tax-deductions-thailand/">
                Thailand Tax Deductions
              </Link>{' '}
              and <Link to="/articles/how-to-use-the-thai-tax-calculator/">
                How to Use the Thai Tax Calculator
              </Link>.
            </p>
          </section>

          {/* 5. Residency */}
          <section id="residency">
            <h2>Tax residency</h2>
            <p>
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
            <p>
              Worked day-count examples and edge cases:{' '}
              <Link to="/articles/understanding-thai-tax-residency/">
                Am I a Thai Tax Resident? The 180-Day Rule, Explained With Examples
              </Link>.
            </p>
          </section>

          {/* 6. Foreign income */}
          <section id="foreign-income">
            <h2>Foreign income</h2>
            <p>
              If you're a Thai tax resident, foreign-sourced income becomes assessable when it's remitted
              (transferred, withdrawn, or spent) in Thailand. Since <strong>1 January 2024</strong> (Order
              Por. 161/2566), this applies even if the remittance happens in a later year than when the
              income was earned — income earned before that date keeps the older same-year-remittance
              treatment. Capital (e.g. savings from before you became a resident) is not income and isn't
              taxed regardless of when it's remitted. Where a Double Tax Agreement applies, foreign tax
              already paid can offset the Thai tax on the same income.
            </p>
            <p>
              Conceptual overview: <Link to="/articles/foreign-income-thailand-tax/">What Counts as Foreign Income in Thailand</Link>.{' '}
              Remittance mechanics and timing examples: <Link to="/articles/transferring-money-to-thailand-tax-rules/">Transferring Money to Thailand: 2024 Tax Rules</Link>.{' '}
              Foreign tax credits and treaties: <Link to="/articles/double-tax-agreements-thailand/">Thai Double Tax Treaties</Link>.
            </p>
          </section>

          {/* 7. Filing */}
          <section id="filing">
            <h2>Filing</h2>
            <p>
              Most taxpayers file an annual return (PND 90 or PND 91, depending on income types) by{' '}
              <strong>31 March</strong> of the following year on paper — an e-filing extension has
              historically been granted but is not yet confirmed for the return covering tax year 2026.
              Freelancers and others with certain income types (rental, liberal profession, contracting,
              business) may also need to file a mid-year return, PND 94, by 30 September. You'll need a Thai
              Tax Identification Number (TIN) to file.
            </p>
            <p>
              Step-by-step: <Link to="/articles/expat-guide-filing-thai-taxes/">Thai Tax Return for Expats: PND 90/91 Guide</Link>,{' '}
              <Link to="/articles/pnd94-mid-year-tax-filing/">PND 94: Mid-Year Tax Filing</Link>, and{' '}
              <Link to="/articles/how-to-get-thai-tax-id-number/">How to Get a Thai Tax ID Number</Link>.
            </p>
          </section>

          {/* 8. What's new for 2026 */}
          <section id="whats-new">
            <h2>What's new for 2026</h2>
            <p>
              Not everything on this page changed for 2026 — most of Thailand's income tax system carries
              over unchanged. Here's what's actually new versus what simply still applies:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="note-strong">
                <h3>Changed for 2026</h3>
                <ul>
                  <li>
                    <strong>Social Security (SSO) contribution cap rises to 10,500 THB/year</strong>, up from
                    9,000 THB/year in 2024–2025 (Phase 1, effective 1 Jan 2026 through 2028).
                  </li>
                </ul>
              </div>
              <div className="note">
                <h3>Unchanged, still in effect for 2026</h3>
                <ul>
                  <li>Progressive tax brackets (0%–35%, in effect since 2017)</li>
                  <li>Personal, spouse, child, and parent allowances</li>
                  <li>The 180-day tax residency test</li>
                  <li>The 2024+ foreign-income remittance rule (Por. 161/2566) — now two years in effect, not new for 2026</li>
                  <li>VAT registration threshold (1,800,000 THB)</li>
                </ul>
              </div>
            </div>
            <p className="!text-xs text-ink-mute">
              Based on the site's verified 2026 tax-rules registry — see{' '}
              <Link to="/sources/">Sources</Link> for what's
              primary-verified versus secondary-sourced.
            </p>
          </section>

          </ProseSheet>

          {/* 9. Worked examples: example sheets lie on the ground, not inside the prose sheet. */}
          <section id="examples" aria-labelledby="examples-heading" className="mt-14 scroll-mt-24">
            <h2 id="examples-heading" className="display border-b-2 border-desk pb-2 text-2xl leading-tight text-ink sm:text-[28px]">
              Worked examples
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
              These are computed by the same engine that powers the calculator — not typed by hand.
            </p>
            <div className="mt-6 space-y-8">
              {simpleEmployee && <TaxExampleCard example={simpleEmployee} />}
              {deductionsImpact && <TaxExampleCard example={deductionsImpact} />}
              {bracketBelow && <TaxExampleCard example={bracketBelow} />}
            </div>
            <p className="mt-5 text-[15px] leading-relaxed text-ink-soft">
              See all {taxExamples.length} examples, including bracket-threshold and full calculator walkthroughs, at{' '}
              <Link to="/tax-examples/" className="font-semibold text-desk underline decoration-desk/40 hover:decoration-desk">
                Thailand Income Tax Examples
              </Link>.
            </p>
          </section>

          {/* 10. Calculator */}
          <section id="calculator" aria-labelledby="calculator-heading" className="mt-14 scroll-mt-24">
            <h2 id="calculator-heading" className="display border-b-2 border-desk pb-2 text-2xl leading-tight text-ink sm:text-[28px]">
              Calculator
            </h2>
            <p className="mt-3 mb-6 text-[15px] leading-relaxed text-ink-soft">
              Everything above explains how the rules work. The calculator estimates what <em>you</em> owe,
              once you know how your specific income should be classified — for genuinely ambiguous cases
              (is this remittance capital or income? which treaty article applies to my pension?), that
              classification is still yours to make, ideally with a qualified advisor. The calculator does
              not provide legal or tax advice.
            </p>
            <CalculateTaxCTA
              headingLevel="h3"
              heading="Estimate your tax"
              description="Enter your income, allowances, deductions, and (if applicable) foreign income to get your taxable income, tax owed, and effective rate."
              primary={{ label: 'Annual Tax Calculator', to: '/annual-tax/' }}
              secondary={{ label: 'Monthly Withholding Estimator', to: '/monthly-withholding/' }}
            />
          </section>

          <ProseSheet className="mt-14">
          {/* 11. Methodology & sources */}
          <section id="methodology-sources">
            <h2>Methodology & sources</h2>
            <p>
              Every figure on this page traces to a source recorded in this site's tax rules registry, each
              flagged as primary-government-verified or secondary-sourced. The residency threshold and the
              2026 SSO cap above are primary/strongly corroborated; the tax brackets and allowance amounts
              rest on convergent secondary sources, as flagged inline above.
            </p>
            <p>
              Full step-by-step calculation walkthrough: <Link to="/methodology/">Methodology</Link>.{' '}
              Complete source list by topic: <Link to="/sources/">Sources & References</Link>.
            </p>
          </section>

          {/* 12. Related guides */}
          <section id="related-guides">
            <h2>Related guides</h2>
            <ul className="!list-none !space-y-0 !pl-0">
              {[
                { to: '/articles/freelancer-tax-guide-thailand/', label: 'Thai Tax Guide for Freelancers' },
                { to: '/articles/pensioner-retiree-tax-guide-thailand/', label: 'Retiring in Thailand: Tax Guide for Pensioners' },
                { to: '/articles/thailand-tax-for-us-expats/', label: 'US Expat Taxes in Thailand: FBAR, FATCA & Double Tax' },
                { to: '/articles/thailand-tax-for-uk-expats/', label: 'Thailand Tax for UK Expats' },
                { to: '/articles/thailand-tax-guide-for-expats/', label: 'Thailand Tax for Expats: Complete Guide' },
                { to: '/faq/', label: 'Frequently Asked Questions' },
              ].map(({ to, label }) => (
                <li key={to} className="border-b border-paper-rule last:border-b-0">
                  <Link
                    to={to}
                    className="group flex items-baseline justify-between gap-4 py-3 text-[16px] !text-ink !no-underline transition-colors hover:!text-desk"
                  >
                    {label}
                    <ArrowIcon className="h-4 w-4 shrink-0 self-center text-ink-mute transition-transform group-hover:translate-x-0.5 group-hover:text-desk" />
                  </Link>
                </li>
              ))}
            </ul>
          </section>

          </ProseSheet>

          <p className="mt-8 text-xs leading-relaxed text-ink-mute">
            This page provides estimates and general information only, not tax advice. Verify your own
            situation with the{' '}
            <a
              href="https://www.rd.go.th/english/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-ink"
            >
              Thai Revenue Department
            </a>{' '}
            or a licensed Thai tax advisor. Tax year 2026.
          </p>
        </div>

        {/* Contents, desktop */}
        <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto lg:block" aria-label="On this page">
          <p className="field-label border-b-2 border-desk pb-1.5 text-ink">On this page</p>
          <div className="mt-2">{toc}</div>
        </aside>
      </div>
    </div>
  );
};

export default ThailandTax2026Page;
