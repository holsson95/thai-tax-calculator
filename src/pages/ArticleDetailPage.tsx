import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArticleIndexSheet from '../components/articles/ArticleIndexSheet';
import ArrowIcon from '../components/ui/ArrowIcon';
import AdSlot from '../components/ads/AdSlot';
import CalculateTaxCTA from '../components/CalculateTaxCTA';
import RelatedExamples from '../components/RelatedExamples';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import { getArticleGroup } from '../data/articleGroups';
import { formatDisplayDate } from '../config/contentDates';
import { formatArticle, splitAtMiddleHeading } from '../utils/formatArticle';

const SITE_URL = 'https://mythaitaxes.com';

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = slug ? getRelatedArticles(slug) : [];

  if (!article) {
    return <Navigate to="/articles/" replace />;
  }

  const canonicalUrl = `${SITE_URL}/articles/${article.slug}/`;
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    url: canonicalUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    publisher: {
      '@type': 'Organization',
      name: 'Thai Tax Calculator',
      url: SITE_URL,
    },
  };
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Articles', item: `${SITE_URL}/articles/` },
      { '@type': 'ListItem', position: 3, name: article.title, item: canonicalUrl },
    ],
  };

  const group = getArticleGroup(article.slug);
  const { html, headings } = formatArticle(article.content);
  const [firstHalf, secondHalf] = splitAtMiddleHeading(html);
  const dateLabel = article.updatedAt ? 'Updated' : 'Published';
  const date = article.updatedAt || article.publishedAt;

  const toc = (
    <ol className="space-y-0.5">
      {headings.map((h) => (
        <li key={h.id}>
          <a
            href={`#${h.id}`}
            className="block py-1.5 text-sm leading-snug text-ink-soft transition-colors hover:text-desk"
          >
            {h.text}
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-10 lg:pt-14">
      <Helmet>
        <title>{article.title} | My Thai Taxes</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={article.publishedAt} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Header */}
      <header className="max-w-[46rem]">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 text-sm text-ink-mute">
            <li>
              <Link to="/articles/" className="font-semibold text-desk hover:underline">
                Articles
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link to={`/articles/#${group.id}`} className="font-semibold text-desk hover:underline">
                {group.title}
              </Link>
            </li>
          </ol>
        </nav>
        <h1 className="display mt-4 text-3xl leading-[1.12] text-ink sm:text-4xl lg:text-[44px]">{article.title}</h1>
        <p className="mt-4 text-sm text-ink-mute">
          {article.readTime} min read · {dateLabel} <time dateTime={date}>{formatDisplayDate(date)}</time>
        </p>
        <p className="mt-3 max-w-prose text-[13px] leading-relaxed text-ink-mute">
          This article is for informational purposes only and is based on publicly available Thai Revenue Department
          guidance and the Revenue Code. Tax rules change — verify current regulations at{' '}
          <a
            href="https://www.rd.go.th/english/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-desk underline"
          >
            rd.go.th
          </a>{' '}
          or consult a licensed Thai tax advisor before making financial decisions.
        </p>
      </header>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(0,46rem)_15rem] lg:gap-14">
        <div className="min-w-0">
          {/* Contents, phones and tablets */}
          {headings.length > 1 && (
            <details className="group on-paper mb-6 bg-paper-white shadow-sheet-sm lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <span className="field-label text-ink">On this page</span>
                <span className="flex items-center gap-2 font-mono text-xs text-ink-mute">
                  {headings.length} sections
                  <ArrowIcon className="h-4 w-4 rotate-90 transition-transform group-open:-rotate-90" />
                </span>
              </summary>
              <div className="border-t-2 border-desk px-5 pb-3 pt-2">{toc}</div>
            </details>
          )}

          {article.calculatorCta && (
            <div className="mb-8" data-testid="article-calculator-cta-top">
              <CalculateTaxCTA
                heading={article.calculatorCta.heading}
                description={article.calculatorCta.description}
                primary={{ label: article.calculatorCta.label, to: article.calculatorCta.to }}
              />
            </div>
          )}

          <article className="on-paper bg-paper-white px-5 py-8 shadow-sheet-sm sm:px-10 sm:py-10">
            <div className="article-body" dangerouslySetInnerHTML={{ __html: firstHalf }} />
            {secondHalf && (
              <>
                <div className="my-10 flex justify-center">
                  <AdSlot size="rectangle" adSlot="3447757856" />
                </div>
                <div className="article-body" dangerouslySetInnerHTML={{ __html: secondHalf }} />
              </>
            )}
          </article>

          {/* Sources & References */}
          {article.sources && article.sources.length > 0 && (
            <section aria-labelledby="sources-heading" className="on-paper mt-8 bg-paper-white shadow-sheet-sm">
              <h2 id="sources-heading" className="display border-b-2 border-desk px-5 py-4 text-lg text-ink sm:px-10">
                Sources &amp; official references
              </h2>
              <ul className="px-5 sm:px-10">
                {article.sources.map((source, i) => (
                  <li key={i} className="border-b border-paper-rule py-2.5 text-[15px] last:border-b-0">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-desk underline decoration-desk/40 hover:decoration-desk"
                    >
                      {source.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="border-t border-paper-rule px-5 py-3 text-xs text-ink-mute sm:px-10">
                See the full source registry and verification status on{' '}
                <Link to="/sources/" className="font-semibold text-desk underline">
                  Sources &amp; References
                </Link>
                .
              </p>
            </section>
          )}

          {/* Related Examples */}
          {article.relatedExamples && article.relatedExamples.length > 0 && (
            <div className="mt-12">
              <RelatedExamples exampleIds={article.relatedExamples} />
            </div>
          )}

          {/* Calculator CTA */}
          <div className="mt-12">
            {article.calculatorCta ? (
              <CalculateTaxCTA
                heading={article.calculatorCta.heading}
                description={article.calculatorCta.description}
                primary={{ label: article.calculatorCta.label, to: article.calculatorCta.to }}
                secondary={{ label: 'Or estimate your full-year tax', to: '/annual-tax/' }}
              />
            ) : (
              <CalculateTaxCTA
                heading="Ready to calculate your tax?"
                description="Put this knowledge to use with our free calculator."
                primary={{ label: 'Start Calculator', to: '/annual-tax/' }}
              />
            )}
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div className="mt-12">
              <ArticleIndexSheet group={{ id: 'related', title: 'Related guides', articles: relatedArticles }} />
            </div>
          )}
        </div>

        {/* Contents, desktop */}
        {headings.length > 1 && (
          <aside className="sticky top-24 hidden max-h-[calc(100vh-7rem)] overflow-y-auto lg:block" aria-label="On this page">
            <p className="field-label border-b-2 border-desk pb-1.5 text-ink">On this page</p>
            <div className="mt-2">{toc}</div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default ArticleDetailPage;
