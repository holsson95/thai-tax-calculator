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
import { PageHeader, ProseSheet } from '../components/layout/InfoPage';
import ArrowIcon from '../components/ui/ArrowIcon';

const SITE_URL = 'https://mythaitaxes.com';
const CONTACT_EMAIL = 'info@mythaitaxes.com';

/** One source as a ruled register row: organisation and type tag, title link, review stamp, citing articles. */
const SourceRow: React.FC<{ source: (typeof TAX_SOURCES)[number] }> = ({ source }) => {
  const citingArticles = getCitingArticles(source);
  const official = source.type === 'official';
  return (
    <li className="border-b border-paper-rule py-4 last:border-b-0">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="text-[15px] font-bold text-ink">{source.organization}</p>
        {/* Square, desk-only tags: filled for official, outlined for advisory. */}
        <span
          className={`shrink-0 border-2 border-desk px-1.5 py-px text-[11px] font-bold leading-tight ${
            official ? 'bg-desk text-white' : 'text-desk'
          }`}
        >
          {official ? 'Official source' : 'Professional tax advisory'}
        </span>
      </div>
      <a
        href={source.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 block break-words text-[15px] font-semibold text-desk underline decoration-desk/40 hover:decoration-desk"
      >
        {source.title}
      </a>
      <dl className="mt-1.5 flex flex-wrap gap-x-4 font-mono text-xs tabular-nums text-ink-mute">
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
        <p className="mt-1.5 text-xs leading-relaxed text-ink-soft">
          Cited in:{' '}
          {citingArticles.map((a, i) => (
            <React.Fragment key={a.slug}>
              {i > 0 && ', '}
              <Link to={`/articles/${a.slug}/`} className="underline hover:text-desk">
                {a.title}
              </Link>
            </React.Fragment>
          ))}
        </p>
      )}
    </li>
  );
};

/** A white sheet of source rows under a ruled heading. */
const SourceSheet: React.FC<{ id: string; title: string; intro?: React.ReactNode; children: React.ReactNode }> = ({
  id,
  title,
  intro,
  children,
}) => (
  <section id={id} aria-labelledby={`${id}-heading`} className="on-paper scroll-mt-24 bg-paper-white shadow-sheet-sm">
    <div className="border-b-2 border-desk px-5 py-4 sm:px-8">
      <h2 id={`${id}-heading`} className="display text-xl leading-snug text-ink sm:text-[22px]">
        {title}
      </h2>
    </div>
    <div className="px-5 sm:px-8">
      {intro}
      <ul>{children}</ul>
    </div>
  </section>
);

const topicId = (topic: string) =>
  topic
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const SourcesPage: React.FC = () => {
  const title = 'Tax Sources & References | MyThaiTaxes';
  const description =
    'See the official and authoritative sources MyThaiTaxes uses to research Thai tax rules, calculations, deductions, and related tax information.';

  return (
    <div className="mx-auto max-w-[52rem] px-4 pb-20 pt-10 sm:px-6 lg:pt-14">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/sources/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/sources/`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <PageHeader
        title="Tax Sources & References"
        intro={
          <>
            <p>
              MyThaiTaxes is an independent website and calculator — we are not the Thai Revenue Department
              or any other government body. To research and check the figures behind our calculator and
              articles, we rely on authoritative sources: official Thai government publications where we
              can find them, and reputable professional tax-advisory firms where a primary government page
              is unavailable, outdated, or hard to parse.
            </p>
            <p className="mt-3 text-[15px] text-ink-mute">
              Thai tax rules change, and every taxpayer's situation is different. Nothing on this site is a
              substitute for checking an official source or consulting a licensed Thai tax advisor for your
              specific circumstances.
            </p>
          </>
        }
      >
        <p className="mt-4 font-mono text-xs tabular-nums text-ink-mute">Registry last reviewed: {REGISTRY_LAST_REVIEWED}</p>
        <p className="mt-3 text-sm">
          <Link to="/thailand-tax-2026/" className="font-semibold text-desk underline decoration-desk/40 hover:decoration-desk">
            ← Back to the 2026 tax overview
          </Link>
        </p>
      </PageHeader>

      <ProseSheet className="mt-8">
        <h2>How we verify tax information</h2>
        <ol>
          <li>Identify the specific tax rule or requirement being calculated or explained.</li>
          <li>Consult authoritative sources — starting with official Thai government publications.</li>
          <li>Determine which tax year the rule applies to.</li>
          <li>Record the source, the applicable tax year, and any conditions or limitations that affect it.</li>
          <li>Incorporate the figure into the calculator or an article, with the source attached.</li>
          <li>Review the information again when Thai tax rules change.</li>
        </ol>
        <p className="text-[15px] text-ink-soft">
          Every figure in our{' '}
          <Link to="/methodology/">calculator methodology</Link>{' '}
          traces back to a source recorded this way. Where a rule could only be confirmed against a
          secondary source rather than a primary government document, we say so rather than presenting
          it as settled fact.
        </p>
      </ProseSheet>

      <div className="mt-10">
        <SourceSheet
          id="primary-sources"
          title="Primary sources"
          intro={
            <p className="pt-3 text-sm text-ink-soft">
              The official government and treaty documents we lean on most for the calculator's core figures.
            </p>
          }
        >
          {OFFICIAL_SOURCES.map((source) => (
            <SourceRow key={source.id} source={source} />
          ))}
        </SourceSheet>
      </div>

      <div className="perforation mt-12 text-ink/30" aria-hidden="true" />

      <section aria-labelledby="by-topic-heading" className="mt-10">
        <h2 id="by-topic-heading" className="display text-2xl text-ink sm:text-[28px]">Sources by topic</h2>
        <nav aria-label="Topics" className="mt-3">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {topicsWithSources().map((topic) => (
              <li key={topic}>
                <a
                  href={`#${topicId(topic)}`}
                  className="font-semibold text-desk underline decoration-desk/30 underline-offset-4 transition-colors hover:decoration-desk"
                >
                  {topic}
                  <span className="ml-1.5 font-mono text-xs font-normal tabular-nums text-ink-mute">
                    {sourcesByTopic(topic).length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-6 space-y-8">
          {topicsWithSources().map((topic) => (
            <SourceSheet
              key={topic}
              id={topicId(topic)}
              title={topic}
              intro={
                topic === 'Tax Rates & Brackets' ? (
                  <p className="note-strong mt-4">
                    The Revenue Department's own English-language rate page has not been updated since
                    before the current bracket structure took effect in 2017 and still shows outdated
                    figures — we do not use it as a source for current brackets. Until an updated primary
                    page is available, we rely on the professional tax-advisory source below.
                  </p>
                ) : undefined
              }
            >
              {sourcesByTopic(topic).map((source) => (
                <SourceRow key={source.id} source={source} />
              ))}
            </SourceSheet>
          ))}
        </div>
      </section>

      <ProseSheet className="mt-12">
        <h2>A note on tax years</h2>
        <p>
          Thai tax rules can and do change from year to year — allowances get adjusted, thresholds are
          revised, and new decrees are issued. Every source on this page is tagged with the tax year it
          was reviewed for ({REGISTRY_TAX_YEAR}) and the date of that review ({REGISTRY_LAST_REVIEWED}).
          If you are relying on a figure for a different tax year, check the source directly rather than
          assuming it still applies.
        </p>

        <h2>Found something that looks outdated or incorrect?</h2>
        <p>
          We'd rather hear about it than leave it wrong. If you spot a source that's outdated, a broken
          link, a figure that doesn't match an official document, or a calculator result that seems
          inconsistent with the sources above, please let us know at{' '}
          <a href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>{' '}
          — or see the{' '}
          <Link to="/about/">About page</Link>{' '}
          for more ways to get in touch.
        </p>
      </ProseSheet>

      <section aria-labelledby="related-resources-heading" className="on-paper mt-8 bg-paper-white shadow-sheet-sm">
        <h2 id="related-resources-heading" className="display border-b-2 border-desk px-5 py-4 text-xl text-ink sm:px-8">
          Related resources
        </h2>
        <ul className="px-5 sm:px-8">
          {[
            { to: '/annual-tax/', label: 'Thailand Tax Calculator' },
            { to: '/methodology/', label: 'How Thai Income Tax Is Calculated' },
            { to: '/articles/understanding-thai-tax-residency/', label: 'Tax Residency Guide' },
            { to: '/articles/foreign-income-thailand-tax/', label: 'Foreign Income Guide' },
            { to: '/about/', label: 'About MyThaiTaxes' },
          ].map(({ to, label }) => (
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
  );
};

export default SourcesPage;
