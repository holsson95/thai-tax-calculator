import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import LastUpdated from '../components/LastUpdated';
import { PAGE_LAST_UPDATED } from '../config/contentDates';
import { RULES_TAX_YEAR, TAX_RULES } from '../config/taxRules';
import { getSourceById } from '../data/sources';
import { getArticleBySlug } from '../data/articles';
import {
  FOREIGN_INCOME_CALC_FAQS,
  FOREIGN_INCOME_CALC_META,
  FOREIGN_INCOME_CALC_SCHEMA,
} from '../data/foreignIncomeCalculatorContent';

const ForeignIncomeCalculator = React.lazy(() => import('../components/foreignIncome/ForeignIncomeCalculator'));

const CalculatorPlaceholder: React.FC = () => (
  // Reserves roughly the form's height so the content below does not jump when it loads (CLS).
  <div
    className="bg-white rounded-xl border border-gray-200 p-6 text-center text-gray-500 min-h-[1400px] sm:min-h-[1000px]"
    aria-busy="true"
  >
    Loading calculator…
  </div>
);

/**
 * Same hydration-gate pattern as AnnualTaxRoute in App.tsx: render a static
 * placeholder during SSR and the first client render (so they match), then
 * load the interactive calculator chunk after mount.
 */
const CalculatorIsland: React.FC = () => {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  if (!hydrated) return <CalculatorPlaceholder />;
  return (
    <Suspense fallback={<CalculatorPlaceholder />}>
      <ForeignIncomeCalculator />
    </Suspense>
  );
};

const ForeignIncomeCalculatorPage: React.FC = () => {
  const days = TAX_RULES.residencyDays.value;

  return (
    <div className="bg-gray-100 min-h-screen py-8 px-4">
      <Helmet>
        <title>{FOREIGN_INCOME_CALC_META.title}</title>
        <meta name="description" content={FOREIGN_INCOME_CALC_META.description} />
        <link rel="canonical" href={FOREIGN_INCOME_CALC_META.canonicalUrl} />
        <meta property="og:title" content={FOREIGN_INCOME_CALC_META.title} />
        <meta property="og:description" content={FOREIGN_INCOME_CALC_META.description} />
        <meta property="og:url" content={FOREIGN_INCOME_CALC_META.canonicalUrl} />
        <meta property="og:type" content="website" />
        {FOREIGN_INCOME_CALC_SCHEMA.map((schema, i) => (
          <script key={i} type="application/ld+json">
            {JSON.stringify(schema)}
          </script>
        ))}
      </Helmet>

      <div className="max-w-3xl mx-auto">
        <header className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Thailand Foreign Income Tax Calculator</h1>
          <LastUpdated date={PAGE_LAST_UPDATED.foreignIncomeCalculator} className="mb-3" />
          <p className="text-gray-700 leading-relaxed">
            Estimate Thai tax on foreign income you bring into Thailand in {RULES_TAX_YEAR}. The calculator checks each transfer
            against the 2024 remittance rules (when it was earned, whether you were resident that year, and whether it is
            savings or income) and shows the estimated tax with a bracket breakdown. It runs in your browser; nothing is sent
            to us unless you choose to request a specialist review or email yourself the breakdown.
          </p>
        </header>

        <section aria-label="Calculator" className="mb-10">
          <CalculatorIsland />
        </section>

        <section className="mb-10 bg-white rounded-xl border border-gray-200 p-5 sm:p-6" aria-labelledby="how-rule-works">
          <h2 id="how-rule-works" className="text-xl font-semibold text-gray-900 mb-3">
            How the remittance rule works
          </h2>
          <p className="text-gray-700 leading-relaxed mb-3">
            Revenue Department Order Por. 161/2566, as amended by Por. 162/2566, applies from 1 January 2024. The Revenue
            Department's own Q&amp;A sets out when foreign income brought into Thailand is taxable:
          </p>
          <div className="overflow-x-auto mb-3">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left bg-gray-50 text-gray-600">
                  <th scope="col" className="p-2 font-medium">Money brought in</th>
                  <th scope="col" className="p-2 font-medium">May be taxable?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                <tr>
                  <td className="p-2">Income earned from 1 Jan 2024 in a year you were in Thailand {days}+ days</td>
                  <td className="p-2 font-medium text-amber-700">Yes, in the year you bring it in</td>
                </tr>
                <tr>
                  <td className="p-2">Income earned from 1 Jan 2024 in a year you were in Thailand under {days} days</td>
                  <td className="p-2 font-medium text-green-700">No</td>
                </tr>
                <tr>
                  <td className="p-2">Income earned before 1 Jan 2024</td>
                  <td className="p-2 font-medium text-green-700">No</td>
                </tr>
                <tr>
                  <td className="p-2">Savings or capital (the original principal)</td>
                  <td className="p-2 font-medium text-green-700">No; only interest or gains on it</td>
                </tr>
                <tr>
                  <td className="p-2">A realised capital gain from 2024 while resident</td>
                  <td className="p-2 font-medium text-amber-700">Yes, the gain only (sale price minus cost)</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600">
            Source:{' '}
            <a
              href={getSourceById('rd-section-41-qna')?.url}
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Revenue Department Q&amp;A on Section 41 paragraph 2 (Thai)
            </a>
            . For a full walkthrough see the{' '}
            <Link to="/articles/foreign-income-thailand-tax/" className="text-blue-600 hover:underline">
              foreign income guide
            </Link>
            . To include deductions for a spouse, children, insurance or funds, use the{' '}
            <Link to="/annual-tax/" className="text-blue-600 hover:underline">
              Annual Tax Calculator
            </Link>
            .
          </p>
        </section>

        <section className="mb-10" aria-labelledby="fic-faq">
          <h2 id="fic-faq" className="text-xl font-semibold text-gray-900 mb-3">
            Frequently asked questions
          </h2>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-200">
            {FOREIGN_INCOME_CALC_FAQS.map((f) => {
              const source = f.sourceId ? getSourceById(f.sourceId) : undefined;
              const article = f.relatedArticleSlug ? getArticleBySlug(f.relatedArticleSlug) : undefined;
              return (
                <details key={f.question} className="group px-4 sm:px-5">
                  <summary className="cursor-pointer list-none py-4 font-medium text-gray-900 flex justify-between gap-4">
                    <span>{f.question}</span>
                    <span aria-hidden="true" className="text-gray-400 transition-transform group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <div className="pb-4 text-gray-700 leading-relaxed">
                    <p>{f.answer}</p>
                    {(source || article) && (
                      <p className="mt-2 text-sm text-gray-500">
                        {source && (
                          <>
                            Source:{' '}
                            <a href={source.url} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                              {source.organization}: {source.title}
                            </a>
                          </>
                        )}
                        {source && article && ' · '}
                        {article && (
                          <>
                            Read more:{' '}
                            <Link to={`/articles/${article.slug}/`} className="text-blue-600 hover:underline">
                              {article.title}
                            </Link>
                          </>
                        )}
                      </p>
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        </section>

        <p className="text-xs text-gray-500">
          This calculator gives estimates for information only and is not tax advice. Thai tax rules and their interpretation can
          change; speak to a qualified tax advisor about your situation.
        </p>
      </div>
    </div>
  );
};

export default ForeignIncomeCalculatorPage;
