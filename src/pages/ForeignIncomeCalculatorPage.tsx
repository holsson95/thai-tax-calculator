import React, { Suspense, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import CalculatorFrame, { SheetLoading } from '../components/calculator/CalculatorFrame';
import { QuestionSheet } from '../components/calculator/reference';
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

// Reserves roughly the form's height so the content below does not jump when it loads (CLS).
const CalculatorPlaceholder: React.FC = () => <SheetLoading className="min-h-[1400px] sm:min-h-[1000px]" />;

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

const inlineLink = 'font-semibold text-desk underline decoration-desk/40 underline-offset-2 hover:decoration-desk';

/** The remittance rule as a reference sheet: the Revenue Department's Q&A in table form. */
const RemittanceRuleSheet: React.FC = () => {
  const days = TAX_RULES.residencyDays.value;
  const rows: { money: string; taxable: string; yes: boolean }[] = [
    { money: `Income earned from 1 Jan 2024 in a year you were in Thailand ${days}+ days`, taxable: 'Yes, in the year you bring it in', yes: true },
    { money: `Income earned from 1 Jan 2024 in a year you were in Thailand under ${days} days`, taxable: 'No', yes: false },
    { money: 'Income earned before 1 Jan 2024', taxable: 'No', yes: false },
    { money: 'Savings or capital (the original principal)', taxable: 'No; only interest or gains on it', yes: false },
    { money: 'A realised capital gain from 2024 while resident', taxable: 'Yes, the gain only (sale price minus cost)', yes: true },
  ];
  return (
    <section aria-labelledby="how-rule-works" className="on-paper bg-paper-white text-ink shadow-sheet-sm lg:sticky lg:top-6">
      <div className="border-b-2 border-desk px-5 py-4 sm:px-6">
        <h2 id="how-rule-works" className="display text-xl">
          How the remittance rule works
        </h2>
      </div>
      <p className="px-5 pt-4 text-[15px] leading-relaxed text-ink-soft sm:px-6">
        Revenue Department Order Por. 161/2566, as amended by Por. 162/2566, applies from 1 January 2024. The Revenue
        Department's own Q&amp;A sets out when foreign income brought into Thailand is taxable:
      </p>
      <div className="overflow-x-auto px-5 pt-4 sm:px-6">
        <table className="sheet-table">
          <thead>
            <tr>
              <th scope="col">Money brought in</th>
              <th scope="col">May be taxable?</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.money}>
                <td>{row.money}</td>
                <td className={row.yes ? 'font-semibold text-ink' : 'text-ink-mute'}>{row.taxable}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="px-5 py-4 text-sm leading-relaxed text-ink-soft sm:px-6">
        Source:{' '}
        <a href={getSourceById('rd-section-41-qna')?.url} className={inlineLink} target="_blank" rel="noopener noreferrer">
          Revenue Department Q&amp;A on Section 41 paragraph 2 (Thai)
        </a>
        . For a full walkthrough see the{' '}
        <Link to="/articles/foreign-income-thailand-tax/" className={inlineLink}>
          foreign income guide
        </Link>
        . To include deductions for a spouse, children, insurance or funds, use the{' '}
        <Link to="/annual-tax/" className={inlineLink}>
          Annual Tax Calculator
        </Link>
        .
      </p>
    </section>
  );
};

const faqItems = FOREIGN_INCOME_CALC_FAQS.map((f) => {
  const source = f.sourceId ? getSourceById(f.sourceId) : undefined;
  const article = f.relatedArticleSlug ? getArticleBySlug(f.relatedArticleSlug) : undefined;
  return {
    q: f.question,
    a: (
      <>
        {f.answer}
        {(source || article) && (
          <span className="mt-2 block text-[13px] text-ink-mute">
            {source && (
              <>
                Source:{' '}
                <a href={source.url} className={inlineLink} target="_blank" rel="noopener noreferrer">
                  {source.organization}: {source.title}
                </a>
              </>
            )}
            {source && article && ' · '}
            {article && (
              <>
                Read more:{' '}
                <Link to={`/articles/${article.slug}/`} className={inlineLink}>
                  {article.title}
                </Link>
              </>
            )}
          </span>
        )}
      </>
    ),
  };
});

const ForeignIncomeReference: React.FC = () => (
  <>
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
      <RemittanceRuleSheet />
      <QuestionSheet items={faqItems} />
    </div>
    <p className="mt-10 max-w-prose text-xs leading-relaxed text-ink-mute">
      This calculator gives estimates for information only and is not tax advice. Thai tax rules and their interpretation can
      change; speak to a qualified tax advisor about your situation.
    </p>
  </>
);

const ForeignIncomeCalculatorPage: React.FC = () => (
  <>
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
    <CalculatorFrame
      title="Thailand Foreign Income Tax Calculator"
      crumb="Foreign income"
      updated={PAGE_LAST_UPDATED.foreignIncomeCalculator}
      paper="sky"
      tab={`Foreign income · tax year ${RULES_TAX_YEAR}`}
      intro={
        <>
          Estimate Thai tax on foreign income you bring into Thailand in {RULES_TAX_YEAR}. The calculator checks each transfer
          against the 2024 remittance rules (when it was earned, whether you were resident that year, and whether it is
          savings or income) and shows the estimated tax with a bracket breakdown. It runs in your browser; nothing is sent to
          us unless you choose to request a specialist review or email yourself the breakdown.
        </>
      }
      reference={<ForeignIncomeReference />}
    >
      <CalculatorIsland />
    </CalculatorFrame>
  </>
);

export default ForeignIncomeCalculatorPage;
