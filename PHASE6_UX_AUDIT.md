# Phase 6 — Performance & UX Audit (TASK-024/025/026)

**AUDIT ONLY.** No source code, tax logic, tax data, article content, SEO metadata, sitemap, robots.txt,
or routing was modified in producing this document or its companion files
(`MOBILE_CALCULATOR_024.md`, `ACCESSIBILITY_025.md`, `PERFORMANCE_026.md`).

Read as part of this audit: `CLAUDE.md`, `CONTENT_INVENTORY.md`, `SEO_METADATA_021.md`,
`TECHNICAL_SEO_022.md`, `INTERNAL_LINKING_020.md`, `TAX_HUB_2026.md`, `TAX_EXAMPLES.md`, `TAX_RULES.md`;
full reads of `src/components/AnnualTaxWizard.tsx`, `src/components/MonthlyWithholding.tsx`,
`src/components/common/IncomeEntryCard.tsx`, `src/components/TaxFlowDiagram.tsx`,
`src/components/TakeHomeIncomeCard.tsx`, `src/App.tsx`, `src/entry-server.tsx`, `src/main.tsx`,
`scripts/prerender.mjs`, `src/components/layout/{Header,Footer,Layout}.tsx`, `tailwind.config.js`,
`src/index.css`, `package.json`; targeted greps across `src/components/steps/*.tsx` for input types,
`inputMode`, ARIA attributes, and responsive classes; and the actual `docs/assets/` build output.

---

## Executive summary

The calculator's core engineering is solid — the SSR/Suspense defect flagged in TECHNICAL_SEO_022.md is
**already fixed** (confirmed by code inspection, not re-implemented here), input handling and step-based
architecture are reasonable, and no P0-severity tax-logic-adjacent risk was found. What this audit adds
on top of the prior SEO work is a genuinely new set of findings: mobile keyboard ergonomics on the
highest-frequency interaction (entering money), one repeated accessibility defect in a reused component,
and one clear, unaddressed bundle-size cost.

**Three P0-severity findings, one shared across two of the three tasks:**

1. **Currency-entry fields sitewide don't set `inputMode`, forcing a full alphanumeric keyboard for the
   product's single most-repeated action.** (`MOBILE_CALCULATOR_024.md` MOB-001)
2. **`IncomeEntryCard.tsx`'s six form labels are not programmatically associated with their controls** —
   a real, repeated accessibility defect in a component used across every freelancer/sole-proprietor
   income entry. (`ACCESSIBILITY_025.md` LBL-001)
3. **`@react-pdf/renderer` (a large PDF library) is bundled statically into the same 1.7MB chunk as the
   entire calculator UI**, so every calculator user pays its load cost even if they never download a PDF.
   (`PERFORMANCE_026.md` PERF-001)

All three are objective, mechanical fixes with low regression risk and do not touch tax calculation
logic, tax data, or the calculation engine in any way.

Beyond those three, the audit found a small cluster of P1/P2 issues — a non-keyboard-operable expand/
collapse control (also `IncomeEntryCard.tsx`), missing focus management on wizard step transitions, no
sticky bottom action bar on long mobile forms, and one un-code-split calculator
(`MonthlyWithholding.tsx`) — none of which are urgent on their own, but several of which share a single
root cause or a single best fix (see Cross-Task Issues below).

**Nothing found rises to "the calculator is broken" or "content is inaccessible"** — every finding is an
improvement opportunity on a functioning product, consistent with `CLAUDE.md`'s instruction not to
over-engineer or chase arbitrary scores.

---

## Mobile findings (Task 024) — see `MOBILE_CALCULATOR_024.md` for full detail

| ID | Severity | Summary |
|---|---|---|
| MOB-001 | 🔴 P0 | Core money fields lack `inputMode="numeric"` — wrong mobile keyboard |
| MOB-005 | 🟠 P1 | `IncomeEntryCard.tsx` expand/collapse is a non-keyboard `<div onClick>` |
| MOB-007 | 🟠 P1 | No sticky bottom action bar; long steps require scrolling to reach Next |
| MOB-002 | 🟡 P2 | `IncomeEntryCard.tsx` uses `type="number"` inconsistent with rest of app |
| MOB-003 | 🟡 P2 | Live comma-formatting cursor-jump risk — needs verification |
| MOB-008 | 🟡 P2 | No safe-area-inset handling anywhere (relevant to MOB-007's fix) |
| MOB-010 | 🟡 P2 | "Start Over" has no confirmation, silently discards all progress |
| MOB-011 | 🟡 P2 | Scroll position not reset on step change — needs verification |
| MOB-012/013/014 | 🟡 P2 / 🔵 P3 | Minor layout-density and table-wrapping notes |

Testing performed: **A (code inspection) only** — no device/browser emulation was available this
session; nothing here should be read as "tested on iPhone Safari" or "tested on Android Chrome."

---

## Accessibility findings (Task 025) — see `ACCESSIBILITY_025.md` for full detail

| ID | Severity | Summary |
|---|---|---|
| LBL-001 | 🔴 P0 | `IncomeEntryCard.tsx`'s 6 fields have no label/control association at all |
| KEY-001 | 🟠 P1 | Same component's expand/collapse trigger is not keyboard-operable (= MOB-005) |
| SR-003 | 🟠 P1 | Step-dot labels hidden below 768px — less context on mobile than desktop |
| KEY-004/FOC-003 | 🟡 P2 | No focus movement to new step content after Next/Previous |
| LBL-003/LBL-004 | 🟡 P2 | Inconsistent `aria-invalid`/`aria-describedby`/`role="alert"` coverage |
| FOC-001/CON-002 | 🟡 P2 | Inconsistent, sometimes low-contrast focus rings |
| ERR-002 | 🟡 P2 | `MonthlyWithholding.tsx`'s Next button has no disabled/invalid state |
| SR-001/SR-002 | 🟡 P2 | Missing `aria-valuetext` on progressbar; unlabeled ellipsis dots |

No live screen-reader testing was performed (no automated a11y tooling exists in this repo — confirmed
via `package.json`, no `jest-axe`/`axe-core`/`eslint-plugin-jsx-a11y`). Contrast ratios were computed
from documented default Tailwind hex values, not measured on a rendered page.

---

## Performance findings (Task 026) — see `PERFORMANCE_026.md` for full detail

| ID | Severity | Summary |
|---|---|---|
| PERF-001 | 🔴 P0 | `@react-pdf/renderer` statically bundled into the 1.7MB `AnnualTaxWizard` chunk |
| PERF-002 | 🟡 P2 | `MonthlyWithholding` not code-split (ships in 612KB main bundle) |
| PERF-005 | 🟡 P2 | `MonthlyWithholding`'s `steps` memo has an overly broad dependency array |
| — | — | SSR/Suspense mismatch from TECHNICAL_SEO_022.md: **already fixed**, verified, not re-worked here |

No Lighthouse/CWV measurement was performed. Bundle sizes are **uncompressed** raw file sizes from
`docs/assets/` — real network transfer is smaller after gzip/brotli, which this audit could not measure
(GitHub Pages CDN compression behavior isn't visible from the repo).

---

## Cross-Task Issues

Per the task's own instruction, avoid three separate fixes for one shared problem. The following
findings from different sections resolve together:

### 1. `IncomeEntryCard.tsx` — both a mobile blocker and an accessibility blocker, same component

- MOB-005 (not keyboard-operable) and KEY-001 (same finding, accessibility framing) are **the same
  underlying defect**: the expand/collapse trigger should be a real `<button>`. One fix (swap `<div
  onClick>` for `<button aria-expanded>`) resolves both.
- MOB-002 (inconsistent input type) and LBL-001 (missing label association) are **two separate defects
  in the same file** but can reasonably be fixed in one pass over `IncomeEntryCard.tsx` since a developer
  will already be in that file. **Preferred approach**: one focused PR touching
  `src/components/common/IncomeEntryCard.tsx` that (a) adds `id`/`htmlFor` pairs to all 6 fields, (b)
  converts the header `<div>` to a `<button>`, and (c) resolves the `type="number"` vs. `type="text"`
  question. This is the single highest-value fix in the entire audit, since it's a P0 on two different
  tasks in one reused component.

### 2. Sticky bottom action bar (MOB-007) requires safe-area handling (MOB-008) — one fix, not two

Do not implement a sticky bottom Next/Previous bar without simultaneously adding
`env(safe-area-inset-bottom)` padding — building the bar first and safe-area later would ship a
regression on iPhone models with a home indicator. Treat as one implementation task.

### 3. Step-transition focus movement (KEY-004) and scroll-position reset (MOB-011) share one fix

Both stem from the same gap: nothing runs when `currentStep` changes to move the user's attention (focus
for screen readers/keyboard users, scroll position for everyone) to the top of the new step. A single
`useEffect` keyed on `currentStep` that both calls `.focus()` on a `tabIndex={-1}` heading/wrapper *and*
scrolls it into view addresses both MOB-011 and KEY-004/FOC-003 at once. **MOB-011 was not conclusively
verified as broken (flagged D/risk) — verify the current scroll behavior first before building this
fix**, but if a fix is built for KEY-004, extending it to also handle scroll is close to free.

### 4. SSR/rendering and crawlability (TECHNICAL_SEO_022.md T-01) and this audit's performance section overlap by design, not by finding

TECHNICAL_SEO_022.md's SSR/Suspense bug and this audit's rendering section (§5 of
`PERFORMANCE_026.md`) look at the same code path (`App.tsx`'s `AnnualTaxRoute`) but the bug itself is
**already resolved** — no double-fix needed. Noted here only to confirm this audit didn't rediscover or
re-flag already-completed work, per the task's explicit instruction not to duplicate TASK-022.

### 5. `MonthlyWithholding.tsx` inconsistencies cluster around "it doesn't mirror `AnnualTaxWizard`'s
already-correct patterns"

Three separate findings — ERR-002 (no disabled Next state), PERF-002 (not lazy-loaded), and the
sessionStorage-persistence gap noted in `MOBILE_CALCULATOR_024.md`'s research notes (Monthly wizard
loses progress on refresh, unlike Annual) — are really one theme: **`MonthlyWithholding.tsx` was built
before, or independently of, several patterns later proven-out in `AnnualTaxWizard.tsx`.** Rather than
three unrelated tickets, consider one "bring Monthly Withholding up to parity with Annual Tax's
established patterns" task covering: disabled-Next state, `React.lazy` code-splitting (reusing the
`AnnualTaxRoute` hydration-gate pattern), and (if desired — this is a scope call, not included in the P0/
P1 list since it's a feature gap rather than a defect) sessionStorage persistence.

---

## Severity table (all three tasks combined)

| Severity | Count | IDs |
|---|---|---|
| 🔴 P0 | 3 | MOB-001, LBL-001, PERF-001 |
| 🟠 P1 | 4 | MOB-005/KEY-001 (shared), MOB-007, SR-003 |
| 🟡 P2 | ~18 | see individual documents |
| 🔵 P3 | ~3 | see individual documents |

No 🔴 P0 finding touches tax calculation logic, tax data, or requires a design decision to begin fixing
— all three are mechanical/additive changes (an HTML attribute, an `id`/`htmlFor` pair, and a
static-to-dynamic import conversion).

---

## Implementation plan

Ordered per the task's priority framework (severe mobile blockers → accessibility blockers → performance
with meaningful impact → moderate UX → optional polish), with cross-task consolidation applied.

### Sequence 1 — `IncomeEntryCard.tsx` remediation (resolves MOB-001 partially, MOB-002, MOB-005/KEY-001, LBL-001)
- **Files**: `src/components/common/IncomeEntryCard.tsx`
- **Changes**: add `id`/`htmlFor` pairs to all 6 fields (LBL-001); convert header `<div onClick>` to
  `<button aria-expanded>` (MOB-005/KEY-001); add `inputMode="numeric"` or resolve the `type="number"`
  vs. `type="text"` question for the two amount fields (MOB-002).
- **Expected benefit**: fixes the audit's two highest-severity findings plus a P1 in one reused
  component used across every freelancer/sole-proprietor income entry.
- **Risk**: low — semantic/attribute additions, no logic change, no tax calculation touched.
- **Testing required**: keyboard-only click-through of the expand/collapse; screen-reader spot-check of
  label announcements (VoiceOver or NVDA); confirm parsing/validation unaffected if the input type
  changes.

### Sequence 2 — Sitewide `inputMode` pass on currency fields (MOB-001)
- **Files**: `src/components/steps/AnnualIncomeStep.tsx`, `MonthlyIncomeStep.tsx`,
  `DeductionsStepAnnual.tsx`, `VariableIncomeStep.tsx`, and any other `type="text"` currency field
  confirmed missing `inputMode`.
- **Expected benefit**: correct numeric keyboard for the product's most-repeated interaction.
- **Risk**: very low — purely additive attribute, no parsing/logic change.
- **Testing required**: manual check (or device emulation once available) that the numeric keypad
  appears; confirm no regression to existing digit-stripping `onChange` logic.

### Sequence 3 — `@react-pdf/renderer` dynamic import (PERF-001)
- **Files**: `src/components/steps/AnnualResultsStep.tsx`, `FreelancerResultsStep.tsx` (or wherever the
  static `import { pdf } from '@react-pdf/renderer'` lives).
- **Expected benefit**: substantially smaller initial chunk for the calculator's core interactive path;
  PDF library only loads when a user requests a PDF.
- **Risk**: low-to-medium — requires adding a loading state to the PDF-download button while the chunk
  fetches; must confirm it isn't invoked during SSR (existing `AnnualTaxRoute` hydration-gate pattern in
  `App.tsx` is the template to follow).
- **Testing required**: confirm PDF generation still works after converting to dynamic import; confirm
  no SSR-time execution; measure the resulting chunk-size change against the current 1.7MB baseline.

### Sequence 4 — Step-transition focus + scroll management (KEY-004, MOB-011)
- **Files**: `src/components/AnnualTaxWizard.tsx`, `src/components/MonthlyWithholding.tsx`.
- **Expected benefit**: screen-reader users are announced into new step content; (pending verification)
  possible fix to a scroll-position disorientation risk.
- **Risk**: low, but requires care to avoid a jarring focus jump for sighted keyboard users — use a
  non-visually-distracting `tabIndex={-1}` target.
- **Testing required**: verify current scroll behavior first (MOB-011 is unverified); screen-reader
  spot-check that step announcements are heard after this change.

### Sequence 5 — `MonthlyWithholding.tsx` parity pass (ERR-002, PERF-002, PERF-005)
- **Files**: `src/components/MonthlyWithholding.tsx`, `src/App.tsx` (for the `React.lazy` conversion).
- **Expected benefit**: consistent disabled-Next UX matching the Annual wizard; smaller main bundle for
  every non-withholding-calculator page; corrected memoization dependency array.
- **Risk**: medium for the lazy-loading change specifically (must replicate the SSR hydration-gate
  pattern exactly to avoid reintroducing the already-fixed Suspense/renderToString bug) — low for the
  other two.
- **Testing required**: confirm `/monthly-withholding/`'s prerendered static HTML is unaffected (compare
  against current `docs/monthly-withholding/index.html` before/after); confirm no visual/functional
  regression in the disabled-Next state.

### Sequence 6 — Sticky bottom action bar + safe-area (MOB-007 + MOB-008)
- **Files**: `src/components/AnnualTaxWizard.tsx`, `src/components/MonthlyWithholding.tsx`, possibly a
  new small shared component if the pattern is extracted.
- **Expected benefit**: reduces scrolling friction on long steps (12-month income entry, multi-entry
  income lists) on mobile.
- **Risk**: medium — must not obscure form fields or results content; must include safe-area padding
  from the start.
- **Testing required**: device/viewport testing at 320–430px (not available this session — flag for
  whoever implements this to test on real devices or emulation before merging); confirm no field is
  hidden behind the bar when the on-screen keyboard is open.

### Sequence 7 — Remaining P2/P3 polish (SR-003, LBL-003/004, FOC-001/CON-002, MOB-010, SR-001/SR-002, CON-001, MOB-012/013/014)
- Lower priority, can be batched into one or more smaller follow-up passes; several are single-line
  additive ARIA/class changes. SR-003 (step-label visibility on mobile) is the one item in this group
  that needs a human design decision before implementation, not just execution.

**Not scheduled — explicitly not recommended** (per each document's "do not over-optimize" sections):
further code-splitting of React/react-router-dom; broad `React.memo`/`useMemo`/`useCallback` application;
replacing `@react-pdf/renderer`; adding custom web fonts; redesigning the results grid for desktop
density; "fixing" the sub-frame post-hydration fallback flash on `/annual-tax/`.

---

## Final scorecard

| Dimension | Score | Rationale |
|---|---|---|
| **Mobile UX** | 6.5/10 | Core layout is simple and generally safe across widths (no evidence of breakage at any tested-in-source width), but the single most-repeated interaction (entering money) triggers the wrong keyboard almost everywhere, there's no sticky action bar for long forms, and one reused component has a non-operable control. These are real, fixable, moderate-effort issues — not a fundamentally broken mobile experience. |
| **Accessibility** | 6/10 | One genuinely severe, repeated defect (unlabeled form fields in a component used across multiple flows) drags this down; everywhere else, the patterns that *do* exist (progressbar roles, `aria-pressed` toggles, error-association on the best-implemented field) are correct and show the team knows the right patterns — they're just inconsistently applied. This is a "extend what you already got right" problem, not a "start from zero" problem. |
| **Performance** | 7/10 | The hard SSR/Suspense problem is already solved. The one clear bundle-size issue (PDF library bundled eagerly) is significant but has an obvious, low-risk fix. No evidence of runtime jank, expensive unmemoized computation, or wasteful re-renders during typing — the calculator's actual interactive performance while entering data looks sound. |
| **Overall Phase 6 readiness** | 6.5/10 | Nothing found blocks shipping or represents a crisis; three P0 items are all mechanical, well-scoped, low-risk fixes that could reasonably be completed in a single focused work session each. The product's foundations (SSR, input validation patterns, step architecture) are sound — what's missing is consistent application of patterns the codebase has already proven work correctly in at least one place. |

Scores reflect readiness for real users today, not a Lighthouse/audit-tool score — no such score was
computed or should be inferred from these numbers.
