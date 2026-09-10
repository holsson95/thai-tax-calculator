import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  TAX_SOURCES,
  OFFICIAL_SOURCES,
  REGISTRY_TAX_YEAR,
  REGISTRY_LAST_REVIEWED,
  topicsWithSources,
  sourcesByTopic,
  getCitingArticles,
} from '../data/sources';

const SITE_URL = 'https://mythaitaxes.com';
const CONTACT_EMAIL = 'info@mythaitaxes.com';

const SourceCard: React.FC<{ source: (typeof TAX_SOURCES)[number] }> = ({ source }) => {
  const citingArticles = getCitingArticles(source);
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 flex flex-col gap-1.5">
      <div className="flex items-start justify-between gap-2">
        <p className="font-semibold text-gray-900 text-sm">{source.organization}</p>
        <span
          className={`shrink-0 text-[11px] font-medium px-2 py-0.5 rounded-full ${
            source.type === 'official'
              ? 'bg-blue-50 text-blue-700'
              : 'bg-gray-100 text-gray-600'
          }`}
        >
          {source.type === 'official' ? 'Official source' : 'Professional tax advisory'}
        </span>
      </div>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:underline text-sm break-words"
      >
        {source.title}
      </a>
      <dl className="mt-1 text-xs text-gray-500 space-y-0.5">
        <div>
          <dt className="inline">Tax year: </dt>
          <dd className="inline">{REGISTRY_TAX_YEAR}</dd>
        </div>
        <div>
          <dt className="inline">Last reviewed: </dt>
          <dd className="inline">{REGISTRY_LAST_REVIEWED}</dd>
        </div>
      </dl>
      {citingArticles.length > 0 && (
        <p className="mt-1 text-xs text-gray-500">
          Cited in:{' '}
          {citingArticles.map((a, i) => (
            <React.Fragment key={a.slug}>
              {i > 0 && ', '}
              <Link to={`/articles/${a.slug}/`} className="text-blue-600 hover:underline">
                {a.title}
              </Link>
            </React.Fragment>
          ))}
        </p>
      )}
    </div>
  );
};

const SourcesPage: React.FC = () => {
  const title = 'Tax Sources & References | MyThaiTaxes';
  const description =
    'See the official and authoritative sources MyThaiTaxes uses to research Thai tax rules, calculations, deductions, and related tax information.';

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/sources/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/sources/`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <h1 className="text-3xl font-bold text-gray-900 mb-2">Tax Sources &amp; References</h1>
      <p className="text-sm text-gray-500 mb-2">Registry last reviewed: {REGISTRY_LAST_REVIEWED}</p>
      <p className="text-sm text-gray-500 mb-8">
        <Link to="/thailand-tax-2026/" className="text-blue-600 hover:underline">← Back to the 2026 tax overview</Link>
      </p>

      <div className="space-y-10 text-gray-700 leading-relaxed">

        <section>
          <p>
            MyThaiTaxes is an independent website and calculator — we are not the Thai Revenue Department
            or any other government body. To research and check the figures behind our calculator and
            articles, we rely on authoritative sources: official Thai government publications where we
            can find them, and reputable professional tax-advisory firms where a primary government page
            is unavailable, outdated, or hard to parse.
          </p>
          <p className="mt-3">
            Thai tax rules change, and every taxpayer's situation is different. Nothing on this site is a
            substitute for checking an official source or consulting a licensed Thai tax advisor for your
            specific circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">How we verify tax information</h2>
          <ol className="list-decimal list-inside space-y-1.5">
            <li>Identify the specific tax rule or requirement being calculated or explained.</li>
            <li>Consult authoritative sources — starting with official Thai government publications.</li>
            <li>Determine which tax year the rule applies to.</li>
            <li>Record the source, the applicable tax year, and any conditions or limitations that affect it.</li>
            <li>Incorporate the figure into the calculator or an article, with the source attached.</li>
            <li>Review the information again when Thai tax rules change.</li>
          </ol>
          <p className="mt-3 text-sm text-gray-600">
            Every figure in our{' '}
            <Link to="/methodology/" className="text-blue-600 hover:underline">calculator methodology</Link>{' '}
            traces back to a source recorded this way. Where a rule could only be confirmed against a
            secondary source rather than a primary government document, we say so rather than presenting
            it as settled fact.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Primary sources</h2>
          <p className="mb-4 text-sm text-gray-600">
            The official government and treaty documents we lean on most for the calculator's core figures.
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {OFFICIAL_SOURCES.map((source) => (
              <SourceCard key={source.id} source={source} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Sources by topic</h2>
          <div className="space-y-8">
            {topicsWithSources().map((topic) => (
              <div key={topic}>
                <h3 className="text-lg font-medium text-gray-900 mb-3">{topic}</h3>
                {topic === 'Tax Rates & Brackets' && (
                  <p className="mb-3 text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
                    The Revenue Department's own English-language rate page has not been updated since
                    before the current bracket structure took effect in 2017 and still shows outdated
                    figures — we do not use it as a source for current brackets. Until an updated primary
                    page is available, we rely on the professional tax-advisory source below.
                  </p>
                )}
                <div className="grid sm:grid-cols-2 gap-3">
                  {sourcesByTopic(topic).map((source) => (
                    <SourceCard key={source.id} source={source} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">A note on tax years</h2>
          <p>
            Thai tax rules can and do change from year to year — allowances get adjusted, thresholds are
            revised, and new decrees are issued. Every source on this page is tagged with the tax year it
            was reviewed for ({REGISTRY_TAX_YEAR}) and the date of that review ({REGISTRY_LAST_REVIEWED}).
            If you are relying on a figure for a different tax year, check the source directly rather than
            assuming it still applies.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Related resources</h2>
          <ul className="space-y-2">
            {[
              { to: '/annual-tax/', label: 'Thailand Tax Calculator' },
              { to: '/methodology/', label: 'How Thai Income Tax Is Calculated' },
              { to: '/articles/understanding-thai-tax-residency/', label: 'Tax Residency Guide' },
              { to: '/articles/foreign-income-thailand-tax/', label: 'Foreign Income Guide' },
              { to: '/about/', label: 'About MyThaiTaxes' },
            ].map(({ to, label }) => (
              <li key={to} className="flex gap-2">
                <span className="text-blue-500">→</span>
                <Link to={to} className="text-blue-600 hover:underline">{label}</Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">
            Found something that looks outdated or incorrect?
          </h2>
          <p>
            We'd rather hear about it than leave it wrong. If you spot a source that's outdated, a broken
            link, a figure that doesn't match an official document, or a calculator result that seems
            inconsistent with the sources above, please let us know at{' '}
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-blue-600 hover:underline">
              {CONTACT_EMAIL}
            </a>{' '}
            — or see the{' '}
            <Link to="/about/" className="text-blue-600 hover:underline">About page</Link>{' '}
            for more ways to get in touch.
          </p>
        </section>

      </div>
    </div>
  );
};

export default SourcesPage;
