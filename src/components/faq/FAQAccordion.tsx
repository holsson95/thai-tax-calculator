import React from 'react';
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

/**
 * One question as a ruled row on a white sheet. A native <details>, so the answer is in the
 * static HTML even while folded (search engines and readers without JavaScript get it too).
 */
const FAQAccordion: React.FC<FAQAccordionProps> = ({
  question,
  answer,
  relatedArticleSlug,
  sourceId,
  defaultOpen = false,
}) => {
  const relatedArticle = relatedArticleSlug ? getArticleBySlug(relatedArticleSlug) : undefined;
  const source = sourceId ? getSourceById(sourceId) : undefined;

  return (
    <details className="group border-b border-paper-rule last:border-b-0" open={defaultOpen}>
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 text-left text-[16px] font-semibold leading-snug text-ink transition-colors hover:text-desk group-open:font-bold [&::-webkit-details-marker]:hidden">
        <span>{question}</span>
        {/* A form box with a plus that becomes a minus. */}
        <span
          aria-hidden="true"
          className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center border-2 border-desk bg-paper-white text-desk"
        >
          <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="square">
            <path d="M1.5 6h9" />
            <path d="M6 1.5v9" className="group-open:hidden" />
          </svg>
        </span>
      </summary>
      <div className="max-w-prose pb-5 pr-9">
        <p className="text-[15px] leading-relaxed text-ink-soft">{answer}</p>
        {relatedArticle && (
          <p className="mt-3 text-sm text-ink-soft">
            Read more:{' '}
            <Link
              to={`/articles/${relatedArticle.slug}/`}
              className="font-semibold text-desk underline decoration-desk/40 hover:decoration-desk"
            >
              {relatedArticle.title}
            </Link>
          </p>
        )}
        {source && (
          <p className="mt-2 text-[11px] leading-snug text-ink-mute">
            Source:{' '}
            <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
              {source.organization} — {source.title}
            </a>
          </p>
        )}
      </div>
    </details>
  );
};

export default FAQAccordion;
