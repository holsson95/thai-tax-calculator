import React from 'react';
import { Link } from 'react-router-dom';
import ArticleCard from '../components/articles/ArticleCard';
import AdSlot from '../components/ads/AdSlot';
import { articles } from '../data/articles';
import { faqData } from '../data/faq';

const HomePage: React.FC = () => {
  // Get first 3 articles and first 3 FAQ items
  const featuredArticles = articles.slice(0, 3);
  const featuredFAQ = faqData[0]?.items.slice(0, 3) || [];

  return (
    <div className="py-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto px-4 text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
          Thai Tax Calculator
        </h1>
        <p className="text-lg text-gray-600">
          Calculate your Thai tax obligation quickly and accurately
        </p>
      </div>

      {/* Calculator CTAs */}
      <div className="max-w-3xl mx-auto px-4 mb-8">
        <div className="grid md:grid-cols-2 gap-4">
          <Link
            to="/annual-tax"
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
            to="/monthly-withholding"
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
          <AdSlot size="leaderboard" />
        </div>
        <div className="md:hidden">
          <AdSlot size="mobile-banner" />
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
            <ul className="space-y-3">
              {featuredFAQ.map((item, index) => (
                <li key={index}>
                  <Link
                    to="/faq"
                    className="flex items-start gap-2 text-gray-600 hover:text-blue-500 transition-colors"
                  >
                    <span className="text-blue-500 mt-0.5">Q:</span>
                    <span className="text-sm">{item.question}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              to="/faq"
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
              to="/articles"
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
