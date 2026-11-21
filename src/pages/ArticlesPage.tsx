import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArticleCard from '../components/articles/ArticleCard';
import ArticleIndexSheet from '../components/articles/ArticleIndexSheet';
import AdSlot from '../components/ads/AdSlot';
import RoutingSlip from '../components/ui/RoutingSlip';
import { articles } from '../data/articles';
import { buildArticleIndex } from '../data/articleGroups';

const SITE_URL = 'https://mythaitaxes.com';

const ArticlesPage: React.FC = () => {
  const { featured, groups } = buildArticleIndex(articles);
  // The in-feed ad sits after the first row of sheets (two per row on lg).
  const firstRow = groups.slice(0, 2);
  const secondRow = groups.slice(2);

  const title = 'Thai Tax Articles & Guides | Thai Tax Calculator';
  const description =
    'Expert guides on Thai taxation covering freelancer tax, expat filing, deductions, tax residency, double tax agreements, and more.';

  return (
    <div className="mx-auto max-w-7xl px-4 pb-20 pt-12 sm:px-6 lg:px-10 lg:pt-16">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/articles/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/articles/`} />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Header */}
      <div className="max-w-3xl">
        <h1 className="display text-4xl leading-tight text-ink sm:text-5xl">Thai Tax Guides for Expats</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          {articles.length} guides, grouped by situation. New here?{' '}
          <Link to="/thailand-tax-2026/" className="font-semibold text-desk underline underline-offset-2">
            Start with the 2026 tax overview
          </Link>
          .
        </p>
        <nav aria-label="Guide groups" className="mt-5">
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[15px]">
            {groups.map((group) => (
              <li key={group.id}>
                <a
                  href={`#${group.id}`}
                  className="font-semibold text-desk underline decoration-desk/30 underline-offset-4 transition-colors hover:decoration-desk"
                >
                  {group.title}
                  <span className="ml-1.5 font-mono text-xs font-normal tabular-nums text-ink-mute">
                    {group.articles.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Start here */}
      {featured.length > 0 && (
        <section aria-labelledby="start-here-heading" className="mt-12">
          <h2 id="start-here-heading" className="display text-2xl text-ink">
            Start here
          </h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            {featured.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </section>
      )}

      <div className="perforation mt-14 text-desk/30" aria-hidden="true" />

      {/* Groups by situation */}
      <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
        {firstRow.map((group) => (
          <ArticleIndexSheet key={group.id} group={group} />
        ))}
      </div>

      {secondRow.length > 0 && (
        <>
          <div className="mt-12 flex justify-center">
            <div className="hidden md:block">
              <AdSlot size="leaderboard" adSlot="5959313072" />
            </div>
            <div className="md:hidden">
              <AdSlot size="rectangle" adSlot="3447757856" />
            </div>
          </div>

          <div className="mt-12 grid items-start gap-8 lg:grid-cols-2">
            {secondRow.map((group) => (
              <ArticleIndexSheet key={group.id} group={group} />
            ))}
          </div>
        </>
      )}

      {/* Calculator routing slip */}
      <RoutingSlip
        to="/"
        className="mt-14"
        title="Ready to calculate your tax?"
        description="Use our free calculator to estimate your Thai tax liability."
      />
    </div>
  );
};

export default ArticlesPage;
