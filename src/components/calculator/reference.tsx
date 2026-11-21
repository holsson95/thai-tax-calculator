import React from 'react';
import { Link } from 'react-router-dom';
import { BRACKET_RULES, RULES_TAX_YEAR } from '../../config/taxRules';
import { formatDisplayDate } from '../../config/contentDates';

/*
 * The back of the calculator forms: reference sheets on the ground below the desk.
 * Shared by the live calculators and their pre-hydration fallbacks in App.tsx so the
 * static HTML and the loaded page carry the same content.
 */

const fmt = (n: number) => n.toLocaleString('en-US');

/** Rows derived from the rule registry (src/config/taxRules.ts); nothing is hard-coded here. */
function bracketRows() {
  let from = 0;
  return BRACKET_RULES.map(rule => {
    const { upTo, rate } = rule.value;
    const lower = from;
    from = upTo;
    const range = upTo === Infinity ? `Over ${fmt(lower)}` : `${lower === 0 ? '0' : fmt(lower + 1)} – ${fmt(upTo)}`;
    const max = upTo === Infinity ? 'No limit' : rate === 0 ? '–' : fmt((upTo - lower) * rate);
    return { id: rule.id, range, rate, max };
  });
}

/** The progressive rate schedule as a small sheet, with its source ticket. */
export const BracketSheet: React.FC = () => {
  const rows = bracketRows();
  const source = BRACKET_RULES[0].source;
  return (
    <div className="on-paper bg-paper-white text-ink shadow-sheet-sm">
      <div className="border-b-2 border-desk px-5 py-4 sm:px-6">
        <h2 className="display text-xl">Thailand's progressive tax brackets</h2>
      </div>
      <table className="w-full text-[15px]">
        <caption className="sr-only">Thai personal income tax brackets, tax year {RULES_TAX_YEAR}</caption>
        <thead>
          <tr className="text-left">
            <th scope="col" className="field-label px-5 pb-2 pt-3 text-ink-mute sm:px-6">Taxable income (THB)</th>
            <th scope="col" className="field-label px-2 pb-2 pt-3 text-ink-mute">Rate</th>
            <th scope="col" className="field-label px-5 pb-2 pt-3 text-right text-ink-mute sm:px-6">Max tax</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(r => (
            <tr key={r.id} className="border-t border-paper-rule">
              <td className="whitespace-nowrap px-5 py-2 font-mono text-[12px] text-ink sm:px-6 sm:text-[13px]">{r.range}</td>
              <td className={`px-2 py-2 font-semibold ${r.rate === 0 ? 'text-ink-mute' : 'text-ink'}`}>
                {r.rate === 0 ? 'Exempt' : `${Math.round(r.rate * 100)}%`}
              </td>
              <td className="whitespace-nowrap px-5 py-2 text-right font-mono text-[12px] text-ink-soft sm:px-6 sm:text-[13px]">{r.max}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-t-2 border-desk px-5 py-4 text-xs leading-relaxed text-ink-soft sm:px-6">
        <p>
          Rates apply to taxable income, after allowances and deductions. Only the income inside each band is taxed at that
          band's rate, so your effective rate is always below your top rate.
        </p>
        <p className="mt-1.5 text-[11px] text-ink-mute">
          Source:{' '}
          <a href={source.url} target="_blank" rel="noopener noreferrer" className="underline hover:text-ink">
            Revenue Department rate table (Thai)
          </a>{' '}
          · tax year {RULES_TAX_YEAR} · checked {formatDisplayDate(BRACKET_RULES[0].lastVerified)}
        </p>
      </div>
    </div>
  );
};

export interface Qa {
  q: string;
  a: React.ReactNode;
}

/** Questions as a ruled list on a white sheet. Always open: they are short. */
export const QuestionSheet: React.FC<{ items: Qa[] }> = ({ items }) => (
  <div className="on-paper bg-paper-white px-5 py-5 text-ink shadow-sheet-sm sm:px-6">
    <h2 className="display border-b-2 border-desk pb-3 text-xl">Frequently asked questions</h2>
    <dl>
      {items.map(item => (
        <div key={item.q} className="border-b border-paper-rule py-4 last:border-b-0 last:pb-0">
          <dt className="text-[15px] font-bold leading-snug">{item.q}</dt>
          <dd className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.a}</dd>
        </div>
      ))}
    </dl>
  </div>
);

const ProseSheet: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="on-paper bg-paper-white px-5 py-6 text-ink shadow-sheet-sm sm:px-7 sm:py-7 [&_h2]:display [&_h2]:text-xl [&_h2]:leading-snug [&_h2:not(:first-child)]:mt-7 [&_p]:mt-2 [&_p]:text-[15px] [&_p]:leading-relaxed [&_p]:text-ink-soft">
    {children}
  </div>
);

const inlineLink = 'font-semibold text-desk underline decoration-desk/40 hover:decoration-desk';

export const ANNUAL_INTRO =
  'Walk through a step-by-step form to estimate your Thai personal income tax for the full calendar year. Covers salaried employees, freelancers, sole proprietors, and company owners, including foreign income and double tax agreement scenarios. At the end you can download a PDF summary to use as a filing reference.';

export const MONTHLY_INTRO =
  'Check whether the right amount of tax is being deducted from your monthly paycheck. Enter your salary, bonuses, and deductions to see what your employer should be withholding: useful for verifying payslips, planning for a salary change, or estimating the tax impact of a bonus.';

export const AnnualReference: React.FC = () => (
  <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
    <div className="flex flex-col gap-8">
      <BracketSheet />
      <ProseSheet>
        <h2>How this calculator works</h2>
        <p>
          This calculator walks through Thailand's annual personal income tax return step by step: your employment type,
          gross income, and eligible deductions and allowances. It applies Thailand's progressive tax brackets to your
          taxable income and shows a full breakdown of what you owe, with the option to download a PDF summary for your
          records. Everything runs in your browser.
        </p>
      </ProseSheet>
    </div>
    <QuestionSheet
        items={[
          {
            q: 'Who should use this calculator?',
            a: 'Anyone filing a Thai PND 90/91 return: salaried employees, freelancers, sole proprietors, and company owners, including expats with foreign income remitted to Thailand.',
          },
          {
            q: 'Does it account for deductions and allowances?',
            a: 'Yes. The form walks through standard personal allowances, spouse and dependent allowances, social security contributions, and common deductions before applying the tax brackets.',
          },
          {
            q: 'Is my data saved anywhere?',
            a: "Your answers are kept only in your browser's session storage so you can resume if you navigate away. Nothing is sent to a server unless you choose to request a specialist review or email yourself a breakdown.",
          },
        ]}
      />
  </div>
);

export const MonthlyReference: React.FC = () => (
  <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-10">
    <ProseSheet>
      <h2>What is withholding tax?</h2>
      <p>
        In Thailand, employers are required to withhold estimated personal income tax from each salary payment and remit it
        to the Revenue Department on your behalf. The amount withheld is an estimate spread evenly across the year, based on
        projecting your monthly salary forward. It isn't always exactly right, especially in months with a bonus, a raise,
        or irregular income. This estimator lets you check what should be withheld against what actually is, using the
        same progressive brackets and deductions your annual return uses.
      </p>
      <h2>Why the withheld amount can be off</h2>
      <p>
        Withholding is calculated month to month, so a one-off bonus or a mid-year salary change can throw off the
        projection your employer is working from. You may end up over-withheld (refunded when you file) or under-withheld
        (owing a balance). Checking your withholding partway through the year, rather than waiting for your annual filing,
        gives you time to budget for either outcome.
      </p>
    </ProseSheet>
    <QuestionSheet
      items={[
        {
          q: 'Is this the same as my annual tax liability?',
          a: (
            <>
              No. This estimates what should be withheld from a given month's pay. For your full year's tax liability across
              all income sources, use the{' '}
              <Link to="/annual-tax/" className={inlineLink}>
                annual tax calculator
              </Link>
              .
            </>
          ),
        },
        {
          q: 'Does a bonus get taxed differently?',
          a: 'A bonus is added to that month\'s income for withholding purposes, which can temporarily push you into a higher bracket for that pay period, even though your annual effective rate may be lower once the year is averaged out.',
        },
        {
          q: 'Is my data saved anywhere?',
          a: 'No. The calculation runs entirely in your browser and nothing you enter is sent to a server unless you choose to request a specialist review or email yourself a breakdown.',
        },
      ]}
    />
  </div>
);
