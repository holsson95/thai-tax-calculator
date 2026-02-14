import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FAQAccordion from '../components/faq/FAQAccordion';
import AdSlot from '../components/ads/AdSlot';
import { faqData, searchFAQ } from '../data/faq';

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = searchQuery.length >= 2 ? searchFAQ(searchQuery) : [];
  const showSearch = searchQuery.length >= 2;

  return (
    <div className="py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Frequently Asked Questions
          </h1>
          <p className="text-gray-600 mb-6">
            Find answers to common questions about Thai taxation.
          </p>

          {/* Search */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search FAQs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition-colors"
              />
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* FAQ Content */}
          <div className="lg:col-span-2">
            {showSearch ? (
              // Search Results
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  Search Results ({searchResults.length})
                </h2>
                {searchResults.length > 0 ? (
                  <div className="divide-y divide-gray-200">
                    {searchResults.map((item, index) => (
                      <FAQAccordion
                        key={index}
                        question={item.question}
                        answer={item.answer}
                        defaultOpen={index === 0}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No results found for "{searchQuery}". Try a different search term.
                  </p>
                )}
              </div>
            ) : (
              // Category View
              <div className="space-y-6">
                {faqData.map((category, categoryIndex) => (
                  <div key={categoryIndex} className="bg-white rounded-xl shadow-md p-6">
                    <h2 className="text-lg font-semibold text-gray-900 mb-4">
                      {category.name}
                    </h2>
                    <div className="divide-y divide-gray-200">
                      {category.items.map((item, itemIndex) => (
                        <FAQAccordion
                          key={itemIndex}
                          question={item.question}
                          answer={item.answer}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Ad Slot */}
              <div className="flex justify-center">
                <AdSlot size="rectangle" />
              </div>

              {/* Calculator CTA */}
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Calculate Your Tax
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Ready to estimate your Thai tax liability?
                </p>
                <Link
                  to="/"
                  className="block text-center bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  Start Calculator
                </Link>
              </div>

              {/* Contact Note */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Need More Help?
                </h3>
                <p className="text-gray-600 text-sm">
                  For complex tax situations, we recommend consulting with a qualified Thai tax professional.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
