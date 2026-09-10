import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticleBySlug } from '../../data/articles';
import { getSourceById } from '../../data/sources';

interface FAQAccordionProps {
  question: string;
  answer: string;
  relatedArticleSlug?: string;
  sourceId?: string;
  defaultOpen?: boolean;
}

const FAQAccordion: React.FC<FAQAccordionProps> = ({
  question,
  answer,
  relatedArticleSlug,
  sourceId,
  defaultOpen = false
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const relatedArticle = relatedArticleSlug ? getArticleBySlug(relatedArticleSlug) : undefined;
  const source = sourceId ? getSourceById(sourceId) : undefined;

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-4 flex items-center justify-between text-left hover:text-blue-500 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="pb-4 text-gray-600 leading-relaxed">
          <p>{answer}</p>
          {(relatedArticle || source) && (
            <div className="mt-3 pt-3 border-t border-gray-100 text-sm space-y-1">
              {relatedArticle && (
                <p>
                  Read more:{' '}
                  <Link to={`/articles/${relatedArticle.slug}/`} className="text-blue-600 hover:underline">
                    {relatedArticle.title}
                  </Link>
                </p>
              )}
              {source && (
                <p className="text-gray-500">
                  Source:{' '}
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    {source.organization} — {source.title}
                  </a>
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FAQAccordion;
