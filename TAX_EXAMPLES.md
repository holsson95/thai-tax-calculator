# Thailand Tax Worked Examples

Documents the worked-example system added in Task 15: `src/data/taxExamples.ts`,
`src/components/TaxExampleCard.tsx`, and the `/tax-examples/` page, plus the
related update to the `thai-tax-brackets-explained` article.

## Why this exists

The brackets article (`thai-tax-brackets-explained`, Task 14) already showed that
worked, calculator-linked examples are the site's strongest original content —
they answer the actual question a taxpayer has ("what will I pay?") rather than
restating generic tax-system facts. This task turns that into a reusable,
regression-tested data structure so the same examples can appear on multiple
pages without drifting from what the calculator actually computes.

## Examples created

All 8 examples live in `src/data/taxExamples.ts` (`taxExamples` array). Every
numeric field is computed by calling the real engine — `calculateThaiTax`,
`calculateAnnualTax` (`src/utils/taxCalculations.ts`), and the new
`getTaxByBracket` / `getMarginalRate` helpers added to `src/utils/tax.ts` —
never hand-typed.

| id | Concept | Gross income | Taxable income | Tax owed | Effective rate |
|---|---|---:|---:|---:|---:|
| `simple-employee` | Gross → taxable → tax, full flow | ฿800,000 | ฿640,000 | ฿48,500 | 6.06% (of gross) |
| `lower-income-employee` | Marginal ≠ effective rate, low income | ฿400,000* | ฿400,000 | ฿17,500 | 4.38% (of taxable) |
| `middle-income-employee` | Progressive taxation across brackets | ฿1,000,000* | ฿1,000,000 | ฿115,000 | 11.50% (of taxable) |
| `high-income-employee` | Marginal ≠ effective rate, high income | ฿5,000,000* | ฿5,000,000 | ฿1,265,000 | 25.30% (of taxable) |
| `bracket-threshold-below` | Bracket threshold, part 1 | ฿999,000* | ฿999,000 | ฿114,800 | 11.49% (of taxable) |
| `bracket-threshold-above` | Bracket threshold, part 2 | ฿1,001,000* | ฿1,001,000 | ฿115,250 | 11.51% (of taxable) |
| `deductions-impact` | Effect of an extra deduction | ฿800,000 | ฿565,000 | ฿37,250 | 4.66% (of gross) |
| `calculator-walkthrough` | Full calculator profile | ฿1,200,000 | ฿864,500 | ฿87,900 | 7.32% (of gross) |

\* These five are expressed directly as a taxable-income figure (matching the
brackets article's existing framing), so `grossIncome` equals `taxableIncome`
in the data — there is no separate gross salary in that scenario.

The task brief asked for "5–7" examples; this set has 8 records because the
bracket-threshold concept inherently needs a below/above pair to make its
point — they're one concept, two data points, not two independent examples.

**Important nuance on effective rate**: for the five taxable-income-only
examples, effective rate is *tax ÷ taxable income* (matching the brackets
article's existing definition, since no gross figure exists in that framing).
For the three full-flow examples (`simple-employee`, `deductions-impact`,
`calculator-walkthrough`), effective rate is *tax ÷ gross income* — the same
definition `calculateAnnualTax`/`AnnualResultsStep.tsx` use and show a real
calculator user. Each `TaxExample` carries an explicit `effectiveRateBasis`
field (`'gross income'` | `'taxable income'`) and `TaxExampleCard` labels the
stat accordingly, so this is never ambiguous on the page.

## Tax year and assumptions

All examples are tax year 2026. Each carries its own `assumptions` array
(filing status, income type, which deductions apply) and a `source` citation.
None claim primary-government verification beyond what the existing registry
(`TAX_RULES.md`, `tax-data/2026/*.json`) already supports — sources are cited
as secondary (Sherrings for brackets; PwC/Sherrings for allowances and
deductions), matching those files' own `verified: false` status. No new tax
rule, rate, or threshold was introduced — every figure used (brackets,
allowance amounts, deduction caps) already existed in the codebase before this
task.

## Calculation source

- Examples using only a taxable-income figure call `calculateThaiTax` and the
  new `getTaxByBracket`/`getMarginalRate` helpers directly.
- Examples starting from a gross salary (`simple-employee`, `deductions-impact`,
  `calculator-walkthrough`) build a full `TaxFormData` object and call
  `calculateAnnualTax` — the exact function the Annual Tax Calculator uses.
- No example re-implements bracket math independently. `getTaxByBracket` was
  extracted as a new, additive pure function in `src/utils/tax.ts` (the same
  logic that was previously duplicated inline inside `AnnualResultsStep.tsx`,
  `MonthlyResultsStep.tsx`, and `FreelancerResultsStep.tsx` — those components
  were **not** refactored to use it, to keep this change additive and
  low-risk; that refactor is a reasonable, separate follow-up).
- `calculateThaiTax` itself was **not modified**.

## Components created

- **`src/components/TaxExampleCard.tsx`** — renders one `TaxExample`: scenario
  narrative, assumptions, headline stats (gross/taxable/tax/marginal/effective),
  a collapsible step-by-step breakdown (reuses the existing `TaxFlowDiagram`
  component, previously only used inside the calculator's own results
  screens), an explanation, and a source citation.
- **`src/pages/TaxExamplesPage.tsx`** — the `/tax-examples/` page. Groups the 8
  examples into 5 concept sections (mirroring the task brief's structure),
  with SEO metadata, a disclaimer, an in-page nav, and CTAs to the calculator
  and related articles. Added to `App.tsx` routing, `scripts/prerender.mjs`'s
  static route list (so it's pre-rendered and included in `sitemap.xml`), and
  the site footer nav.

## Known limitation: articles can't embed live components

`src/data/articles.ts` content is a plain markdown string rendered via a
hand-rolled formatter (`ArticleDetailPage.tsx`'s `formatContent`) — there is no
MDX or component-embedding pipeline. `TaxExampleCard` therefore **cannot** be
dropped into an article body.

Instead, the `thai-tax-brackets-explained` article's worked-example numbers are
computed at module-load time in `articles.ts` itself and interpolated into the
markdown template literal. As of the latest pass, this is single-sourced as
tightly as the markdown format allows:

- For the five figures that have a matching curated example
  (400k/1M/5M taxable income, and the ฿999k/฿1,001k threshold pair), `articles.ts`
  calls `getTaxExampleById()` and reads the actual `TaxExample` record —
  the *same object* `/tax-examples/` renders — via a small `requireExample()`
  helper. These can no longer just "happen to agree"; they're reading one
  shared computed value.
- ฿600,000 and ฿2,000,000 have no corresponding curated `TaxExample` (the
  curated set doesn't include those two levels — see the table above), so
  they're still computed directly via `calculateThaiTax`/`getMarginalRate`
  through a local `bracketRateRow()` helper. This still can't drift from the
  calculator engine, it's just not backed by a shared example object the way
  the other five are.

`src/data/__tests__/articles.test.ts` regression-locks this: it asserts the
article's rendered content contains the exact formatted tax figure from each
matching `taxExamples.ts` entry, so a future edit that reintroduces a
hand-typed, stale number in the article would fail CI.

The article also has one link to `/tax-examples/` for readers who want the
fuller, calculator-linked treatment (gross-income flow, deductions impact,
full calculator walkthrough) that the markdown-only article format can't show.

## Where each example is used

- All 8: `/tax-examples/`
- `lower-income-employee`, `middle-income-employee`, `high-income-employee`,
  `bracket-threshold-below`/`-above`: values also drive the numbers shown in
  `/articles/thai-tax-brackets-explained/` (via the shared `calculateThaiTax`
  call, not by importing `taxExamples.ts` directly — see limitation above).

## Tests added

- `src/utils/__tests__/tax.test.ts` — new `describe` blocks for
  `getTaxByBracket` (empty/negative income, single-bracket case, multi-bracket
  case, and a sum-equals-`calculateThaiTax` regression check across 9 income
  levels) and `getMarginalRate` (zero/exempt case, one assertion per bracket
  boundary).
- `src/data/__tests__/taxExamples.test.ts` — regression-locks every example:
  unique ids, tax year, source present, bracket breakdown sums to `taxOwed`
  and matches `calculateThaiTax`, marginal rate matches `getMarginalRate`, and
  a specific-value assertion per example (so a future change to
  `calculateThaiTax`, `calculateAnnualTax`, `TAX_BRACKETS`, or the allowance/
  deduction constants that changes any published number will fail this suite,
  not just silently change what a visitor sees).

Ran and passing: `npx vitest run` (350/350 tests across 26 files, including
the two new files above), `npx tsc --noEmit` (clean), `npm run lint` (no new
errors — 13 pre-existing errors/16 warnings in unrelated files, none touched
by this task), `npm run build` (clean; `/tax-examples/` pre-rendered and
present in `docs/sitemap.xml`).

## Manual verification

Ran `npm run dev`, opened `/tax-examples/` and
`/articles/thai-tax-brackets-explained/` in a real (headless) Chrome instance,
confirmed the example cards, stats, and step-by-step toggle render correctly
and the article shows the updated computed numbers, and checked the browser
console for errors (none beyond unrelated Chrome-profile noise).

## Remaining concerns / follow-ups

- **Bracket-breakdown duplication resolved.** `AnnualResultsStep.tsx`,
  `MonthlyResultsStep.tsx`, and `FreelancerResultsStep.tsx` were refactored to
  call the shared `getTaxByBracket` helper instead of each keeping its own
  inline copy of the bracket-splitting loop. `calculateThaiTax` itself was
  not touched; all 350 tests (including the calculator step tests) pass
  after the refactor, and `tsc`/lint/build remain clean.
- **Discoverability added.** `/tax-examples/` is now in the site header nav
  (desktop + mobile) and linked from two spots on the homepage: a footnote
  next to the tax brackets table, and a dedicated CTA card under the
  calculator options ("Not sure what this means for your income?").
- **Source verification status is still "secondary," not primary.** As with
  the rest of the site's tax data, none of these examples claim
  primary-government verification — they inherit the existing registry's
  `verified: false` status for brackets, allowances, and deduction caps.
- **`/tax-examples/` is a new indexed page** — worth a normal SEO/content
  monitoring pass after publishing (search performance, internal link
  placement) as part of whatever cadence the rest of the site content follows.
