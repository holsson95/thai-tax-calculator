import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArticleCard from '../components/articles/ArticleCard';
import AdSlot from '../components/ads/AdSlot';
import QuickTaxCalculator from '../components/QuickTaxCalculator';
import { articles } from '../data/articles';
import { faqData } from '../data/faq';

const SITE_URL = 'https://mythaitaxes.com';

const HomePage: React.FC = () => {
  // Get first 3 articles and curated FAQ items across key categories
  const featuredArticles = articles.slice(0, 3);
  const FEATURED_FAQ_CATEGORIES = ['Pensioners & Retirees', 'Tax Residency', 'Filing & Deadlines'];
  const featuredFAQCategories = faqData
    .filter(cat => FEATURED_FAQ_CATEGORIES.includes(cat.name))
    .sort((a, b) => FEATURED_FAQ_CATEGORIES.indexOf(a.name) - FEATURED_FAQ_CATEGORIES.indexOf(b.name))
    .map(cat => ({ name: cat.name, items: cat.items.slice(0, 3) }));

  const title = 'Thai Tax Calculator | Free Thai Income Tax Calculator';
  const description =
    'Calculate your Thai income tax quickly and accurately. Free tool for salaried employees, freelancers, sole proprietors, and company owners in Thailand.';

  return (
    <div className="py-8">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={SITE_URL} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Thai Tax Calculator',
          url: SITE_URL,
          description,
          applicationCategory: 'FinanceApplication',
          operatingSystem: 'All',
          offers: { '@type': 'Offer', price: '0', priceCurrency: 'THB' },
        })}</script>
      </Helmet>
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Thai Tax Calculator
        </h1>
        <p className="text-lg text-gray-600 mb-2">
          Calculate your Thai tax obligation quickly and accurately
        </p>
        <p className="text-sm text-gray-500 max-w-2xl mx-auto">
          Thailand's personal income tax applies to anyone spending 180 or more days in the country each year.
          Enter your income details below to get an instant estimate — salaried employees, freelancers,
          sole proprietors, and company owners are all supported.
        </p>
      </div>

      <QuickTaxCalculator />

      {/* Calculator CTAs */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/annual-tax/"
            className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Annual Tax Calculator
                </h2>
                <p className="text-gray-600 text-sm">
                  Get a detailed breakdown of your annual tax liability and potential refund.
                </p>
              </div>
            </div>
          </Link>

          <Link
            to="/monthly-withholding/"
            className="block bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-6 border-2 border-transparent hover:border-blue-500"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Monthly Withholding
                </h2>
                <p className="text-gray-600 text-sm">
                  Estimate how much tax should be deducted from your monthly salary.
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* Ad Slot */}
      <div className="flex justify-center mb-8 px-4">
        <div className="hidden md:block">
          <AdSlot size="leaderboard" adSlot="5959313072" />
        </div>
        <div className="md:hidden">
          <AdSlot size="mobile-banner" adSlot="6916229573" />
        </div>
      </div>

      {/* Thai Income Tax Essentials */}
      <div className="max-w-4xl mx-auto px-4 mb-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Thai Personal Income Tax — The Essentials</h2>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Thailand uses a progressive personal income tax system with eight brackets, ranging from exempt on
          the first 150,000 THB to 35% on income above 5,000,000 THB. Tax residents — those who spend
          180 or more days in Thailand in a calendar year — must report income earned in Thailand and any
          foreign income remitted into the country. Non-residents are taxed only on Thai-sourced income.
          The annual filing deadline is <strong>31 March</strong> each year (or 8 April for online filings).
        </p>

        {/* Key facts */}
        <div className="grid sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="text-3xl font-bold text-blue-600 mb-1">180</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">Day residency threshold</div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Spend 180 or more days in Thailand in a calendar year and you become a Thai tax resident,
              liable to declare all Thai-source income and remitted foreign income.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="text-3xl font-bold text-blue-600 mb-1">31 Mar</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">Annual filing deadline</div>
            <p className="text-xs text-gray-600 leading-relaxed">
              PND 90 (freelancers &amp; multiple income sources) and PND 91 (salaried employees) are both
              due by 31 March for the prior tax year. Online filings via RD Smart Tax get an 8-day extension.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-5">
            <div className="text-3xl font-bold text-blue-600 mb-1">120k</div>
            <div className="text-sm font-semibold text-gray-900 mb-1">Filing threshold (THB)</div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Single filers with assessable income above 120,000 THB per year must file a return.
              The threshold rises to 220,000 THB for married couples filing jointly.
            </p>
          </div>
        </div>

        {/* Tax brackets table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-4">
          <div className="px-6 py-4 border-b border-gray-100">
            <h3 className="font-semibold text-gray-900">2025 Personal Income Tax Rates</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Taxable Income (THB)</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Rate</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wide">Max tax on bracket</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {[
                  { range: '0 – 150,000',           rate: 'Exempt', max: '–' },
                  { range: '150,001 – 300,000',      rate: '5%',     max: '7,500' },
                  { range: '300,001 – 500,000',      rate: '10%',    max: '20,000' },
                  { range: '500,001 – 750,000',      rate: '15%',    max: '37,500' },
                  { range: '750,001 – 1,000,000',    rate: '20%',    max: '50,000' },
                  { range: '1,000,001 – 2,000,000',  rate: '25%',    max: '250,000' },
                  { range: '2,000,001 – 5,000,000',  rate: '30%',    max: '900,000' },
                  { range: 'Over 5,000,000',         rate: '35%',    max: 'No limit' },
                ].map((row, i) => (
                  <tr key={i} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-3 text-gray-700">{row.range}</td>
                    <td className={`px-6 py-3 text-right font-medium ${row.rate === 'Exempt' ? 'text-green-600' : 'text-blue-600'}`}>{row.rate}</td>
                    <td className="px-6 py-3 text-right text-gray-500">{row.max}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Rates apply to <em>taxable</em> income — i.e. after deducting all allowances and expenses.
              The calculator above applies your personal deductions before reaching these brackets.{' '}
              <Link to="/articles/thai-tax-brackets-explained/" className="text-blue-500 hover:underline">
                See full breakdown →
              </Link>
            </p>
          </div>
        </div>

        {/* Key deductions summary */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="font-semibold text-gray-900 mb-3">Common Deductions That Reduce Your Taxable Income</h3>
          <div className="grid sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-600">
            {[
              ['Personal allowance', '60,000 THB'],
              ['Spouse allowance (no income)', '60,000 THB'],
              ['Child allowance', '30,000 THB per child'],
              ['Employment income deduction', '50% of salary, max 100,000 THB'],
              ['Life insurance premiums', 'Up to 100,000 THB'],
              ['Health insurance premiums', 'Up to 25,000 THB'],
              ['RMF contributions', 'Up to 30% of income, max 500,000 THB'],
              ['SSF contributions', 'Up to 30% of income, max 200,000 THB'],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-1.5 border-b border-gray-100 last:border-0">
                <span>{label}</span>
                <span className="text-gray-900 font-medium text-right flex-shrink-0">{value}</span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-3">
            <Link to="/articles/maximizing-tax-deductions-thailand/" className="text-blue-500 hover:underline">
              Full guide to Thai tax deductions →
            </Link>
          </p>
        </div>
      </div>

      {/* FAQ & Articles Teasers */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Popular Questions */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Popular Questions
            </h2>
            <div className="space-y-5">
              {featuredFAQCategories.map(category => (
                <div key={category.name}>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                    {category.name}
                  </p>
                  <ul className="space-y-2">
                    {category.items.map((item, index) => (
                      <li key={index}>
                        <Link
                          to="/faq/"
                          className="flex items-start gap-2 text-sm text-gray-600 hover:text-blue-500 transition-colors"
                        >
                          <span className="text-blue-500 flex-shrink-0 mt-0.5">Q:</span>
                          <span>{item.question}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Link
              to="/faq/"
              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-4 text-sm font-medium"
            >
              View all FAQ
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Latest Articles */}
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Latest Articles
            </h2>
            <div className="space-y-4">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            <Link
              to="/articles/"
              className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 mt-4 text-sm font-medium"
            >
              View all articles
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
