import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/articles/ArticleCard';
import AdSlot from '../components/ads/AdSlot';
import { articles } from '../data/articles';

const ArticlesPage: React.FC = () => {
  // Split articles for ad placement
  const firstBatch = articles.slice(0, 3);
  const secondBatch = articles.slice(3);

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Thai Tax Guides for Expats
          </h1>
          <p className="text-gray-600">
            Comprehensive guides to help you understand and navigate Thai taxation.
          </p>
        </div>

        {/* First batch of articles */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {firstBatch.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>

        {/* In-feed Ad */}
        {secondBatch.length > 0 && (
          <div className="flex justify-center mb-8">
            <div className="hidden md:block">
              <AdSlot size="leaderboard" />
            </div>
            <div className="md:hidden">
              <AdSlot size="rectangle" />
            </div>
          </div>
        )}

        {/* Second batch of articles */}
        {secondBatch.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {secondBatch.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        )}

        {/* CTA Section */}
        <div className="bg-blue-50 rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to calculate your tax?
          </h2>
          <p className="text-gray-600 mb-4">
            Use our free calculator to estimate your Thai tax liability.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Start Calculator
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticlesPage;
