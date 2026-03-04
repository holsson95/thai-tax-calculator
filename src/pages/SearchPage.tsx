import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArticleCard from '../components/articles/ArticleCard';
import FAQAccordion from '../components/faq/FAQAccordion';
import { searchArticles } from '../data/articles';
import { searchFAQ } from '../data/faq';

const SITE_URL = 'https://www.mythaitaxes.com';

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
    <div className="py-8">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content="Search Thai tax articles and frequently asked questions." />
        <link rel="canonical" href={`${SITE_URL}/search`} />
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="max-w-6xl mx-auto px-4">
        {/* Search input */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Search</h1>
          <div className="relative max-w-xl">
            <input
              type="text"
              placeholder="Search articles and FAQs..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
              className="w-full px-4 py-3 pl-11 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors text-base"
            />
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {query.length >= 2 ? (
          <div className="space-y-8">
            {/* Summary line */}
            <p className="text-gray-500 text-sm">
              {totalResults === 0
                ? `No results found for "${query}"`
                : `${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}"`}
            </p>

            {/* Article results */}
            {articleResults.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Articles ({articleResults.length})
                </h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {articleResults.map((article) => (
                    <ArticleCard key={article.slug} article={article} />
                  ))}
                </div>
              </section>
            )}

            {/* FAQ results */}
            {faqResults.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  FAQs ({faqResults.length})
                </h2>
                <div className="bg-white rounded-xl shadow-md p-6 divide-y divide-gray-200">
                  {faqResults.map((item, i) => (
                    <FAQAccordion
                      key={i}
                      question={item.question}
                      answer={item.answer}
                      defaultOpen={i === 0}
                    />
                  ))}
                </div>
                <div className="mt-3">
                  <Link to="/faq" className="text-blue-500 hover:underline text-sm">
                    Browse all FAQs →
                  </Link>
                </div>
              </section>
            )}

            {/* Zero results */}
            {totalResults === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">Try a different keyword, or browse:</p>
                <div className="flex justify-center gap-6">
                  <Link to="/articles" className="text-blue-500 hover:underline">All Articles</Link>
                  <Link to="/faq" className="text-blue-500 hover:underline">All FAQs</Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-gray-400 text-center py-12">
            Enter at least 2 characters to search articles and FAQs.
          </p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
