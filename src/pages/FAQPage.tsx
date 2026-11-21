import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FAQAccordion from '../components/faq/FAQAccordion';
import AdSlot from '../components/ads/AdSlot';
import ArrowIcon from '../components/ui/ArrowIcon';
import { faqData, searchFAQ } from '../data/faq';

const SITE_URL = 'https://mythaitaxes.com';

/** Anchor id for a question group: "Pensioners & Retirees" -> "pensioners-retirees". */
const groupId = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

const totalQuestions = faqData.reduce((n, cat) => n + cat.items.length, 0);

const FAQPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const searchResults = searchQuery.length >= 2 ? searchFAQ(searchQuery) : [];
  const showSearch = searchQuery.length >= 2;

  const title = 'Thai Tax FAQ | Frequently Asked Questions | Thai Tax Calculator';
  const description =
    'Answers to common questions about Thai income tax: tax residency, deductions, filing deadlines, withholding tax, refunds, and more.';

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqData.flatMap((cat) =>
      cat.items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      }))
    ),
  };

  const groupLinks = (
    <ul>
      {faqData.map((category) => (
        <li key={category.name} className="border-b border-paper-rule last:border-b-0">
          <a
            href={`#${groupId(category.name)}`}
            className="flex items-baseline justify-between gap-3 py-2 text-sm font-semibold leading-snug text-ink transition-colors hover:text-desk"
          >
            {category.name}
            <span className="shrink-0 font-mono text-xs font-normal tabular-nums text-ink-mute">
              {category.items.length}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 lg:px-10 lg:pt-14">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={`${SITE_URL}/faq/`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={`${SITE_URL}/faq/`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* Header */}
      <header className="max-w-[46rem]">
        <h1 className="display text-4xl leading-[1.08] text-ink sm:text-5xl">Frequently Asked Questions</h1>
        <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
          Find answers to common questions about Thai taxation.
          <span className="ml-2 whitespace-nowrap font-mono text-sm tabular-nums text-ink-mute">
            {totalQuestions} questions · {faqData.length} groups
          </span>
        </p>

        {/* Search */}
        <div className="on-paper mt-7 max-w-md" role="search">
          <label htmlFor="faq-search" className="field-label mb-2 block text-ink">
            Search the questions
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
              id="faq-search"
              type="search"
              placeholder="e.g. pension, 180 days, refund"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="field-input h-12 pl-10 font-sans text-[16px] [&::-webkit-search-cancel-button]:hidden"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-2 py-1 text-sm font-semibold text-desk underline decoration-desk/40 underline-offset-4 hover:decoration-desk"
              >
                Clear
              </button>
            )}
          </div>
          <p className="field-hint" aria-live="polite">
            {showSearch
              ? `${searchResults.length} ${searchResults.length === 1 ? 'question matches' : 'questions match'}.`
              : 'Type two or more letters to search questions and answers.'}
          </p>
        </div>
      </header>

      <div className="mt-10 grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0 max-w-[46rem]">
          {showSearch ? (
            <section aria-labelledby="faq-results-heading" className="on-paper bg-paper-white shadow-sheet-sm">
              <div className="flex items-baseline justify-between gap-4 border-b-2 border-desk px-5 py-4 sm:px-7">
                <h2 id="faq-results-heading" className="display text-xl text-ink">
                  Results for “{searchQuery}”
                </h2>
                <span className="field-label shrink-0 text-ink-mute">
                  {searchResults.length} {searchResults.length === 1 ? 'question' : 'questions'}
                </span>
              </div>
              {searchResults.length > 0 ? (
                <div className="px-5 sm:px-7">
                  {searchResults.map((item, index) => (
                    <FAQAccordion
                      key={item.question}
                      question={item.question}
                      answer={item.answer}
                      relatedArticleSlug={item.relatedArticleSlug}
                      sourceId={item.sourceId}
                      defaultOpen={index === 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="px-5 py-5 text-[15px] leading-relaxed text-ink-soft sm:px-7">
                  <p>No results found for “{searchQuery}”. Try a different search term.</p>
                  <button type="button" onClick={() => setSearchQuery('')} className="btn-text mt-3">
                    Show all questions
                  </button>
                </div>
              )}
            </section>
          ) : (
            <>
              {/* Groups, phones and tablets */}
              <details className="group on-paper mb-8 bg-paper-white shadow-sheet-sm lg:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="field-label text-ink">Question groups</span>
                  <span className="flex items-center gap-2 font-mono text-xs text-ink-mute">
                    {faqData.length} groups
                    <ArrowIcon className="h-4 w-4 rotate-90 transition-transform group-open:-rotate-90" />
                  </span>
                </summary>
                <div className="border-t-2 border-desk px-5 pb-2 pt-1">{groupLinks}</div>
              </details>

              <div className="space-y-8">
                {faqData.map((category) => {
                  const id = groupId(category.name);
                  return (
                    <section
                      key={category.name}
                      id={id}
                      aria-labelledby={`${id}-heading`}
                      className="on-paper scroll-mt-24 bg-paper-white shadow-sheet-sm"
                    >
                      <div className="flex items-baseline justify-between gap-4 border-b-2 border-desk px-5 py-4 sm:px-7">
                        <h2 id={`${id}-heading`} className="display text-xl text-ink sm:text-[22px]">
                          {category.name}
                        </h2>
                        <span className="field-label shrink-0 text-ink-mute">
                          {category.items.length} {category.items.length === 1 ? 'question' : 'questions'}
                        </span>
                      </div>
                      <div className="px-5 sm:px-7">
                        {category.items.map((item) => (
                          <FAQAccordion
                            key={item.question}
                            question={item.question}
                            answer={item.answer}
                            relatedArticleSlug={item.relatedArticleSlug}
                            sourceId={item.sourceId}
                          />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* Rail: ad, calculator, help, then the group list, which sticks while you read.
            Only the list is sticky: the whole rail is taller than a laptop screen. */}
        <aside className="flex flex-col gap-8 lg:self-stretch" aria-label="More">
          <div className="flex justify-center">
            <AdSlot size="rectangle" adSlot="3447757856" />
          </div>

          <div className="on-paper bg-paper-sky px-5 py-5 text-ink shadow-sheet-sm">
            <h2 className="display text-lg">Calculate Your Tax</h2>
            <p className="mt-1 text-sm leading-relaxed text-ink-soft">Ready to estimate your Thai tax liability?</p>
            <Link to="/" className="btn-primary group mt-4 w-full">
              Start Calculator
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="note bg-paper-white">
            <h2 className="note-title">Need More Help?</h2>
            <p>For complex tax situations, we recommend consulting with a qualified Thai tax professional.</p>
          </div>

          {!showSearch && (
            <nav aria-label="Question groups" className="sticky top-24 hidden lg:block">
              <p className="field-label border-b-2 border-desk pb-1.5 text-ink">Question groups</p>
              <div className="mt-1">{groupLinks}</div>
            </nav>
          )}
        </aside>
      </div>
    </div>
  );
};

export default FAQPage;
