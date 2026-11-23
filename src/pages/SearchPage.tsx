import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArticleCard from '../components/articles/ArticleCard';
import FAQAccordion from '../components/faq/FAQAccordion';
import { PageHeader } from '../components/layout/InfoPage';
import ArrowIcon from '../components/ui/ArrowIcon';
import { searchArticles } from '../data/articles';
import { searchFAQ } from '../data/faq';

const SITE_URL = 'https://mythaitaxes.com';

const SearchPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState(searchParams.get('q') ?? '');

  const query = searchParams.get('q') ?? '';
  const articleResults = query.length >= 2 ? searchArticles(query) : [];
  const faqResults = query.length >= 2 ? searchFAQ(query) : [];
  const totalResults = articleResults.length + faqResults.length;

  // Debounce URL update as user types
  useEffect(() => {
    const timer = setTimeout(() => {
      const trimmed = inputValue.trim();
      if (trimmed) {
        setSearchParams({ q: trimmed }, { replace: true });
      } else {
        setSearchParams({}, { replace: true });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [inputValue, setSearchParams]);

  const title = query
    ? `Results for "${query}" | Thai Tax Calculator`
    : 'Search | Thai Tax Calculator';

  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Search Thai tax articles and frequently asked questions." />
        <link rel="canonical" href={`${SITE_URL}/search/`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-10 sm:px-6 lg:px-10 lg:pt-14">
        {/* Search input */}
        <PageHeader title="Search">
          <div className="on-paper mt-6 max-w-xl" role="search">
            <label htmlFor="site-search" className="field-label mb-2 block text-ink">
              Search articles and FAQs
            </label>
            <div className="relative">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-desk"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                viewBox="0 0 20 20"
              >
                <circle cx="8.5" cy="8.5" r="5.5" />
                <path d="M13 13l4.5 4.5" />
              </svg>
              <input
                id="site-search"
                type="text"
                placeholder="Search articles and FAQs..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                autoFocus
                className="field-input h-12 pl-10 font-sans text-[16px]"
              />
            </div>
            <p className="field-hint" aria-live="polite">
              {query.length >= 2
                ? totalResults === 0
                  ? `No results found for "${query}"`
                  : `${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}"`
                : 'Enter at least 2 characters to search articles and FAQs.'}
            </p>
          </div>
        </PageHeader>

        {query.length >= 2 && (
          <div className="mt-12 space-y-12">
            {/* Article results */}
            {articleResults.length > 0 && (
              <section aria-labelledby="search-articles-heading">
                <h2 id="search-articles-heading" className="display text-2xl text-ink">
                  Articles <span className="font-mono text-base font-semibold tabular-nums text-ink-mute">{articleResults.length}</span>
                </h2>
                <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {articleResults.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* FAQ results */}
            {faqResults.length > 0 && (
              <section aria-labelledby="search-faq-heading" className="max-w-[46rem]">
                <div className="on-paper bg-paper-white shadow-sheet-sm">
                  <div className="flex items-baseline justify-between gap-4 border-b-2 border-desk px-5 py-4 sm:px-7">
                    <h2 id="search-faq-heading" className="display text-xl text-ink">
                      FAQs
                    </h2>
                    <span className="field-label shrink-0 text-ink-mute">
                      {faqResults.length} {faqResults.length === 1 ? 'question' : 'questions'}
                    </span>
                  </div>
                  <div className="px-5 sm:px-7">
                    {faqResults.map((item, i) => (
                      <FAQAccordion
                        key={item.question}
                        question={item.question}
                        answer={item.answer}
                        relatedArticleSlug={item.relatedArticleSlug}
                        sourceId={item.sourceId}
                        defaultOpen={i === 0}
                      />
                    ))}
                  </div>
                </div>
                <Link to="/faq/" className="btn-text group mt-4">
                  Browse all FAQs
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </section>
            )}

            {/* Zero results */}
            {totalResults === 0 && (
              <div className="max-w-[46rem] border-t-2 border-desk pt-5">
                <p className="text-[15px] text-ink-soft">Try a different keyword, or browse:</p>
                <div className="mt-3 flex flex-wrap gap-6">
                  <Link to="/articles/" className="btn-text">All Articles</Link>
                  <Link to="/faq/" className="btn-text">All FAQs</Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
