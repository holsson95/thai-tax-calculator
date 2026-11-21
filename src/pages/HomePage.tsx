import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArticleCard from '../components/articles/ArticleCard';
import AdSlot from '../components/ads/AdSlot';
import ArrowIcon from '../components/ui/ArrowIcon';
import RoutingSlip from '../components/ui/RoutingSlip';
import CopyStack from '../components/home/CopyStack';
import { articles } from '../data/articles';
import { faqData } from '../data/faq';
import { PAGE_LAST_UPDATED, formatDisplayDate } from '../config/contentDates';
import { TAX_YEAR_CONFIG } from '../config/taxConfig';
import { TAX_RULES } from '../config/taxRules';

const SITE_URL = 'https://mythaitaxes.com';

const BRACKETS = [
  { range: '0 – 150,000', rate: 0, label: 'Exempt', max: '–' },
  { range: '150,001 – 300,000', rate: 5, label: '5%', max: '7,500' },
  { range: '300,001 – 500,000', rate: 10, label: '10%', max: '20,000' },
  { range: '500,001 – 750,000', rate: 15, label: '15%', max: '37,500' },
  { range: '750,001 – 1,000,000', rate: 20, label: '20%', max: '50,000' },
  { range: '1,000,001 – 2,000,000', rate: 25, label: '25%', max: '250,000' },
  { range: '2,000,001 – 5,000,000', rate: 30, label: '30%', max: '900,000' },
  { range: 'Over 5,000,000', rate: 35, label: '35%', max: 'No limit' },
];

const DEDUCTIONS: [string, string][] = [
  ['Personal allowance', '60,000 THB'],
  ['Spouse allowance (no income)', '60,000 THB'],
  ['Child allowance', '30,000 THB per child'],
  ['Employment income deduction', '50% of salary, max 100,000 THB'],
  ['Life insurance premiums', 'Up to 100,000 THB'],
  ['Health insurance premiums', 'Up to 25,000 THB'],
  ['RMF contributions', 'Up to 30% of income, max 500,000 THB'],
  ['SSF contributions', 'Up to 30% of income, max 200,000 THB'],
];

const KEY_FACTS = [
  {
    label: 'Residency',
    value: '180 days',
    text:
      'Spend 180 or more days in Thailand in a calendar year and you become a Thai tax resident, liable to declare all Thai-source income and remitted foreign income.',
  },
  {
    label: 'Filing deadline',
    value: '31 March',
    text:
      'PND 90 (freelancers & multiple income sources) and PND 91 (salaried employees) are both due by 31 March for the prior tax year (paper filing). The 8-day online-filing extension granted in past years is not yet confirmed for this tax year.',
  },
  {
    label: 'Filing threshold',
    value: '120,000 THB',
    text:
      'Commonly cited threshold: single filers with assessable income above 120,000 THB per year must file a return, rising to 220,000 THB for married couples filing jointly. We have not yet verified these figures against a primary source.',
  },
];

const HomePage: React.FC = () => {
  const featuredArticles = articles.slice(0, 4);
  const FEATURED_FAQ_CATEGORIES = ['Pensioners & Retirees', 'Tax Residency', 'Filing & Deadlines'];
  const featuredFAQCategories = faqData
    .filter(cat => FEATURED_FAQ_CATEGORIES.includes(cat.name))
    .sort((a, b) => FEATURED_FAQ_CATEGORIES.indexOf(a.name) - FEATURED_FAQ_CATEGORIES.indexOf(b.name))
    .map(cat => ({ name: cat.name, items: cat.items.slice(0, 3) }));

  const title = 'Thai Tax Calculator | Free Thai Income Tax Calculator';
  const description =
    'Calculate your Thai income tax quickly and accurately. Free tool for salaried employees, freelancers, sole proprietors, and company owners in Thailand.';

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Thai Tax Calculator',
          url: `${SITE_URL}/`,
          description,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'THB' },
        })}</script>
      </Helmet>

      {/* ── The desk: headline + the stack of calculator sheets ───────────── */}
      <section className="relative flex flex-col overflow-x-clip bg-desk text-white lg:min-h-[calc(100svh-4rem)]">
        <div className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-[minmax(0,1fr)] items-center gap-x-14 gap-y-10 px-4 pb-12 pt-8 sm:px-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:px-10 lg:pb-10 lg:pt-10">
          <div className="max-w-xl">
            <h1 className="display text-[44px] leading-[0.95] sm:text-6xl lg:text-[76px]">
              Thai tax, filled in for you.
            </h1>
            <p className="mt-5 text-[17px] leading-relaxed text-white/85 sm:mt-6 sm:text-xl">
              Living in Thailand or earning income from abroad? Calculate your Thai income tax in minutes,
              with rates backed by official Revenue Department sources.
            </p>
            <p className="mt-6 text-xs text-white/75">
              Last updated: <time dateTime={PAGE_LAST_UPDATED.home}>{formatDisplayDate(PAGE_LAST_UPDATED.home)}</time>
              {' '}· Estimates only, not tax advice
            </p>
          </div>

          <div className="min-w-0 pr-6 sm:pr-8">
            <CopyStack />
          </div>
        </div>

        {/* Tear-off strip: the scroll cue. On desktop it sticks to the bottom of the screen while the hero
            is in view, so it is visible on load at any window height. */}
        <div className="bottom-0 z-40 bg-desk lg:sticky">
          <div className="perforation text-white/35" aria-hidden="true" />
          <a
            href="#reference"
            className="group flex items-center justify-center gap-3 px-4 py-4 text-center text-[12px] font-bold uppercase tracking-[0.14em] text-white/85 transition-colors hover:text-white sm:text-[13px] sm:tracking-[0.16em]"
          >
            <svg viewBox="0 0 24 24" className="hidden h-4 w-4 shrink-0 -rotate-90 opacity-70 sm:block" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
              <circle cx="6" cy="6" r="3" /><circle cx="6" cy="18" r="3" /><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12" />
            </svg>
            <span><span className="hidden sm:inline">Tear here for </span>Rates, deductions &amp; guides</span>
            <svg viewBox="0 0 20 20" className="h-5 w-5 shrink-0 animate-nudge-down" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 4v12M5 11l5 5 5-5" />
            </svg>
          </a>
        </div>
      </section>

      {/* ── The back of the form: rates, facts, deductions ────────────────── */}
      <section id="reference" className="scroll-mt-16 bg-paper-ground">
        <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:px-10 lg:pt-20">
          <div className="max-w-3xl">
            <h2 className="display text-3xl leading-tight text-ink sm:text-4xl">
              Thai personal income tax, the essentials
            </h2>
            <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
              Thailand uses a progressive personal income tax system with eight brackets, ranging from exempt on
              the first 150,000 THB to 35% on income above 5,000,000 THB. Tax residents (those who spend
              180 or more days in Thailand in a calendar year) must report income earned in Thailand and any
              foreign income remitted into the country. Non-residents are taxed only on Thai-sourced income.
              The annual filing deadline is <strong className="text-ink">31 March</strong> each year for paper returns. Online filers have had an 8-day extension in past years, but it is not yet confirmed for the {TAX_YEAR_CONFIG.CURRENT_TAX_YEAR} tax year.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
            {/* Rate schedule */}
            <div className="on-paper bg-paper-white shadow-sheet-sm">
              <div className="flex items-baseline justify-between gap-4 border-b-2 border-desk px-5 py-4 sm:px-6">
                <h3 className="display text-xl text-ink">{TAX_YEAR_CONFIG.CURRENT_TAX_YEAR} Personal Income Tax Rates</h3>
                <span className="field-label hidden text-ink-mute sm:block">Taxable income, THB</span>
              </div>
              <div>
                <table className="w-full text-[15px]">
                  <caption className="sr-only">Thai personal income tax brackets</caption>
                  <thead>
                    <tr className="text-left">
                      <th scope="col" className="field-label px-3 pb-2 pt-3 text-ink-mute sm:px-6">Taxable income (THB)</th>
                      <th scope="col" className="field-label px-2 pb-2 pt-3 text-ink-mute sm:px-3">Rate</th>
                      <th scope="col" className="field-label px-3 pb-2 pt-3 text-right text-ink-mute sm:px-6"><span className="sm:hidden">Max tax</span><span className="hidden sm:inline">Max tax on bracket</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {BRACKETS.map(row => (
                      <tr key={row.range} className="border-t border-paper-rule">
                        <td className="whitespace-nowrap px-3 py-2.5 font-mono text-[12px] text-ink sm:px-6 sm:text-[14px]">{row.range}</td>
                        <td className="px-2 py-2.5 sm:px-3">
                          <div className="flex items-center gap-3">
                            <span className={`shrink-0 font-semibold sm:w-14 ${row.rate === 0 ? 'text-ink-mute' : 'text-ink'}`}>{row.label}</span>
                            <span className="hidden h-2.5 bg-desk/15 sm:block" style={{ width: 120 }} aria-hidden="true">
                              <span className="block h-full bg-desk" style={{ width: `${(row.rate / 35) * 100}%` }} />
                            </span>
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-3 py-2.5 text-right font-mono text-[12px] text-ink-soft sm:px-6 sm:text-[14px]">{row.max}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="border-t-2 border-desk px-5 py-4 text-xs leading-relaxed text-ink-soft sm:px-6">
                <p>
                  Rates apply to <em>taxable</em> income, i.e. after deducting all allowances and expenses.
                  The calculator above applies your personal deductions before reaching these brackets.{' '}
                  <Link to="/articles/thai-tax-brackets-explained/" className="font-semibold text-desk underline">
                    See full breakdown
                  </Link>
                  {' · '}
                  <Link to="/tax-examples/" className="font-semibold text-desk underline">
                    See worked examples
                  </Link>
                </p>
                <p className="mt-1.5">
                  Source:{' '}
                  <a
                    href="https://www.rd.go.th/59670.html"
                    className="underline hover:text-ink"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Revenue Department rate table (Thai)
                  </a>
                  , in force from tax year 2017 under Revenue Code Amendment Act No. 44. No later change found as of the last-updated date above.
                </p>
              </div>
            </div>

            {/* Facts + deductions */}
            <div className="flex flex-col gap-8">
              <div className="on-paper bg-paper-canary px-5 py-5 shadow-sheet-sm sm:px-6">
                <h3 className="display text-xl text-ink">Three numbers to know</h3>
                <dl className="mt-3">
                  {KEY_FACTS.map(f => (
                    <div key={f.label} className="border-t border-ink/25 py-3">
                      <div className="flex items-baseline justify-between gap-4">
                        <dt className="field-label text-ink-soft">{f.label}</dt>
                        <dd className="font-mono text-lg font-bold text-ink">{f.value}</dd>
                      </div>
                      <p className="mt-1 text-[13px] leading-relaxed text-ink-soft">{f.text}</p>
                    </div>
                  ))}
                </dl>
                <p className="mt-1 border-t border-ink/25 pt-3 text-[11px] leading-relaxed text-ink-soft">
                  Residency:{' '}
                  <a href={TAX_RULES.residencyDays.source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
                    Revenue Code Section 41 (Revenue Department)
                  </a>
                  , tax year {TAX_YEAR_CONFIG.CURRENT_TAX_YEAR}. Deadline: 31 March paper filing date confirmed in{' '}
                  <a href="https://www.nishimura.com/en/knowledge/publications/further-eight-day-extension-for-e-filing-tax-returns-and-online-tax-payments-in-thailand" target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
                    secondary sources
                  </a>
                  ; the online-filing extension is not yet confirmed for the {TAX_YEAR_CONFIG.CURRENT_TAX_YEAR} tax year. Filing threshold: not yet verified in our{' '}
                  <Link to="/sources/" className="underline hover:text-ink">rules registry</Link>.
                </p>
              </div>

              <div className="on-paper bg-paper-white px-5 py-5 shadow-sheet-sm sm:px-6">
                <h3 className="display text-xl text-ink">Common deductions that reduce your taxable income</h3>
                <ul className="mt-3 text-[14px]">
                  {DEDUCTIONS.map(([label, value]) => (
                    <li key={label} className="flex justify-between gap-4 border-t border-paper-rule py-2">
                      <span className="text-ink">{label}</span>
                      <span className="text-right text-ink-soft">{value}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-1 border-t border-paper-rule pt-3 text-[11px] leading-relaxed text-ink-soft">
                  Tax year {TAX_YEAR_CONFIG.CURRENT_TAX_YEAR}. Each figure is sourced in our{' '}
                  <Link to="/sources/" className="underline hover:text-ink">rules registry</Link>, e.g.{' '}
                  <a href={TAX_RULES.personalAllowance.source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
                    {TAX_RULES.personalAllowance.source.label.split(' — ')[0]}
                  </a>{' '}
                  (secondary) for allowances. See{' '}
                  <Link to="/methodology/" className="underline hover:text-ink">methodology</Link> for what is verified.
                </p>
                <Link to="/articles/maximizing-tax-deductions-thailand/" className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-desk underline">
                  Full guide to Thai tax deductions
                </Link>
              </div>
            </div>
          </div>

          {/* Routing slips */}
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <RoutingSlip
              to="/thailand-tax-2026/"
              paper="sky"
              title="New to Thai tax? Start with the 2026 overview"
              description="Brackets, allowances, residency, foreign income, and filing on one page, linking to the full guide on each topic."
            />
            <RoutingSlip
              to="/tax-examples/"
              paper="pink"
              title="Not sure what this means for your income?"
              description="See worked examples at real income levels, from a simple salary to a full calculator walkthrough."
            />
          </div>

          {/* Ad slot */}
          <div className="mt-14 flex justify-center">
            <div className="hidden md:block">
              <AdSlot size="leaderboard" adSlot="5959313072" />
            </div>
            <div className="md:hidden">
              <AdSlot size="mobile-banner" adSlot="6916229573" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Questions and guides ─────────────────────────────────────────── */}
      <section className="bg-paper-ground">
        <div className="perforation mx-auto max-w-7xl text-desk/30" aria-hidden="true" />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 pb-20 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:px-10">
          <div>
            <h2 className="display text-3xl text-ink">Questions people ask first</h2>
            <div className="mt-6 space-y-7">
              {featuredFAQCategories.map(category => (
                <div key={category.name}>
                  <p className="field-label border-b-2 border-desk pb-1.5 text-ink">{category.name}</p>
                  <ul>
                    {category.items.map((item, index) => (
                      <li key={index} className="border-b border-paper-rule">
                        <Link
                          to="/faq/"
                          className="group flex items-start justify-between gap-4 py-2.5 text-[15px] text-ink transition-colors hover:text-desk"
                        >
                          <span>{item.question}</span>
                          <ArrowIcon className="mt-1 h-4 w-4 shrink-0 text-ink-mute transition-transform group-hover:translate-x-0.5 group-hover:text-desk" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link to="/faq/" className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-desk underline">
              All questions
            </Link>
          </div>

          <div>
            <h2 className="display text-3xl text-ink">Latest guides</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {featuredArticles.map(article => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            <Link to="/articles/" className="mt-6 inline-flex items-center gap-2 text-[15px] font-semibold text-desk underline">
              All articles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
