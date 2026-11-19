# TASK-026 — Performance Audit

**AUDIT ONLY.** No source code was modified in producing this document.

Scope: `/annual-tax/` and `/monthly-withholding/` — build output, bundle composition, SSR/hydration
pipeline, rendering behavior, and calculator recalculation performance.

---

## 0. Testing performed

**A. Verified by code inspection**: `src/App.tsx`, `src/entry-server.tsx`, `src/main.tsx`,
`scripts/prerender.mjs`, `package.json`, hooks usage across `AnnualTaxWizard.tsx`/
`MonthlyWithholding.tsx`.

**B. Verified by production build/output**: `docs/assets/` file sizes via `ls -la`/`du -sh`.

**C. Browser automation**: not available in this session — no Lighthouse/WebPageTest/real network
throttling was run.

**D. Could not be verified**: actual gzip/brotli sizes as served by GitHub Pages' CDN (only raw
uncompressed file sizes were measured), real device parse/execute time, actual Core Web Vitals
(LCP/INP/CLS) field or lab data.

All bundle-size figures below are **uncompressed** file sizes from `docs/assets/`. Text-heavy JS/CSS
typically compresses 3–4× with gzip/brotli, so real network transfer is meaningfully smaller than the
raw numbers quoted — this is called out explicitly rather than presenting uncompressed size as the
user-facing cost.

---

## 1. Initial page load

`docs/index.html` and the prerendered route HTML files (per the existing SSR pipeline, unchanged since
TECHNICAL_SEO_022.md's audit) deliver real static HTML for every route including `/annual-tax/` and
`/monthly-withholding/` — text content, meta tags, and JSON-LD are present without executing JS (already
verified accurate in the prior technical SEO audit; not re-litigated here beyond the SSR/Suspense point
in §5).

Third-party scripts (Google Analytics `gtag.js`, AdSense `adsbygoogle.js`, Ahrefs analytics) load `async`
— confirmed non-blocking for initial parse, consistent with TECHNICAL_SEO_022.md's finding. Not
re-audited in depth here since nothing about the calculator changes this picture.

No custom web fonts are loaded (confirmed: no `@font-face`/Google Fonts `<link>` anywhere) — system font
stack only, meaning **zero font-loading cost and zero FOUT/FOIT layout-shift risk**. This is a genuine
performance positive, not a gap.

---

## 2. JavaScript bundle

### PERF-001 — 🔴 P0 — `AnnualTaxWizard` chunk is 1.7MB (uncompressed) because `@react-pdf/renderer` is bundled with the core wizard UI, not split further

**Evidence**:
```
docs/assets/AnnualTaxWizard-DnGusPYl.js   1.7M  (1,796,768 bytes, uncompressed)
docs/assets/index-CqkH0nvn.js             612K  (624,476 bytes, uncompressed) — main/shared chunk
docs/assets/index-BECzh0Zs.css            36K   (33,568 bytes, uncompressed)
```
`AnnualResultsStep.tsx` and `FreelancerResultsStep.tsx` both `import { pdf } from '@react-pdf/renderer'`
at the top of the file (static import), and both are statically imported by `AnnualTaxWizard.tsx` (which
is itself the one thing that *is* already lazy-loaded via `React.lazy`, per `App.tsx:21`). Net effect:
`@react-pdf/renderer` — a full PDF-rendering engine, one of the heavier libraries in the npm ecosystem
for this use case — ships inside the same 1.7MB chunk as the entire calculator UI (all steps, all form
logic), even though it is only actually *used* when a user reaches the results step and explicitly
clicks a "Download Tax Filing Packet" button.

**User impact**: every visitor who opens `/annual-tax/` and interacts with the calculator (not just
those who download a PDF) must download and parse this entire 1.7MB chunk before the wizard becomes
interactive, on a page that is explicitly the site's core product (per `CLAUDE.md` goal 2). On a slower
mobile connection, this is the single largest concrete performance cost identified in this audit.

**Recommendation**: split the PDF-generation code path into its own lazy-loaded chunk — e.g.,
`const { pdf } = await import('@react-pdf/renderer')` inside the click handler that triggers PDF
generation, rather than a static top-level import in `AnnualResultsStep.tsx`/`FreelancerResultsStep.tsx`.
This defers loading `@react-pdf/renderer` until the user actually requests a PDF, shrinking the
initially-required chunk substantially (the exact resulting size wasn't measured since this audit did
not modify code, but `@react-pdf/renderer` is a large fraction of typical bundles that include it — this
is very likely to be the majority of the 1.7MB, given the wizard's own step/form code is comparable in
scope to `MonthlyWithholding`'s much smaller footprint within the 612KB shared chunk).

**Regression risk**: low-to-medium — converting a static import to a dynamic `import()` inside an event
handler is a well-understood pattern, but requires care that the PDF button shows a loading state while
the chunk fetches (a UX addition, not just a technical change) and that this doesn't run inside SSR
(the existing `React.lazy`/hydration-gated pattern in `App.tsx` already establishes the precedent for
handling exactly this kind of client-only-load concern).

**Decision**: technically objective (the split doesn't change PDF output or calculation), but implementing
it correctly requires adding a small loading-state UX around the PDF button — a minor design/UX
addition, not just a mechanical code change. Does **not** touch tax calculation logic.

---

### PERF-002 — 🟡 P2 — `MonthlyWithholding` is not code-split; ships in the shared 612KB main bundle

**Evidence**: `App.tsx:5` imports `MonthlyWithholding` eagerly (`import MonthlyWithholding from
'./components/MonthlyWithholding'`), unlike `AnnualTaxWizard`'s `React.lazy`. This means every page load
of the site — including the homepage, articles, FAQ, etc. — includes `MonthlyWithholding` and its full
step-component tree in the same JS chunk that must be parsed for the app shell to boot.

**User impact**: smaller than PERF-001 (no PDF library involved here — `package.json` confirms no chart/
date library dependency beyond what's already counted), but still a real cost: a user reading an article
who never visits the withholding calculator still pays for parsing its code. The exact contribution of
`MonthlyWithholding` to the 612KB shared bundle wasn't isolated in this pass (would require a bundle
visualizer/source-map-explorer run, not available in this session) — flagged as a **likely meaningful,
not precisely quantified** contributor.

**Recommendation**: apply the same `React.lazy` + Suspense pattern already proven for `AnnualTaxWizard`
(including its hydration-gated SSR-safe wrapper, `AnnualTaxRoute` in `App.tsx:84–110`) to
`MonthlyWithholding`. This is copying an already-validated pattern, not inventing a new one.

**Regression risk**: low — the pattern already exists in the codebase and is proven to work correctly
with the SSR/prerender pipeline (confirmed no Suspense/renderToString mismatch after the existing fix,
see §5). Should be replicated exactly, including the hydration-gate wrapper, to avoid reintroducing the
bug that wrapper was built to prevent.

**Decision**: objective, low-risk, matches an already-validated in-codebase pattern.

---

### PERF-003 — 🔵 P3 — Main shared bundle (612KB uncompressed) is moderate but not alarming

**Evidence**: `index-CqkH0nvn.js`, 612KB uncompressed, includes React, react-dom, react-router-dom,
react-helmet-async, and all non-lazy page/route components. No single oversized dependency was
identified here beyond the `MonthlyWithholding` question in PERF-002 — `package.json` shows a lean
dependency list (5 production dependencies total).

**Recommendation**: no action beyond PERF-002. Do not chase further splitting of React/react-router
itself — that would be diminishing returns for a site this size and adds real complexity (more network
round-trips, more cache-invalidation surface) for uncertain benefit. **Explicitly not recommended.**

**Decision**: no fix needed beyond PERF-002.

---

## 3. Images

Confirmed (carried over from TECHNICAL_SEO_022.md, re-verified relevant to this scope): **no raster
images exist anywhere in `public/`/`docs/`** except a `vite.svg` favicon. All icons in the calculator are
inline SVGs (`currentColor`-filled, no separate network requests). **No image-related performance issues
exist for the calculator specifically** — there is nothing to optimize here. Not flagged as a gap; stated
explicitly so it isn't mistaken for an unexamined area.

---

## 4. Fonts

Confirmed: no `@font-face`, no Google Fonts `<link>`, anywhere in `index.html` or any component —
system/Tailwind default font stack only. **Zero font-loading performance cost.** No recommendation —
changing to a custom web font would only *add* a performance cost with no demonstrated benefit; explicitly
**not recommended** per the audit's anti-over-optimization instruction.

---

## 5. Rendering (SSR / hydration / Suspense)

### Already fixed — not duplicating TASK-022 work

TECHNICAL_SEO_022.md (Issue T-01) previously found that `/annual-tax/`'s SSR pass injected a malformed
`<template data-msg="...">` diagnostic comment because `renderToString` doesn't support `<Suspense>`.

**Confirmed via code inspection: this has already been fixed.** `App.tsx:84–110` now defines an
`AnnualTaxRoute` wrapper that renders only the plain `AnnualTaxFallback` component (no `<Suspense>`
element at all) until a `useEffect`-gated `hydrated` state flips to `true` on the client; only then does
it render the real `<Suspense><AnnualTaxWizard/></Suspense>` tree. Since `renderToString` (confirmed
still in use, `entry-server.tsx:13`) never encounters a `<Suspense>` boundary during the server pass, and
the client's first render before hydration matches that same fallback-only output, there is no
Suspense-related SSR/hydration mismatch. The fix is directly documented in an inline code comment in
`App.tsx` referencing the prior audit by name.

**No further action needed for the previously-identified rendering defect.**

### PERF-004 — 🟡 P2 — Every visit to `/annual-tax/` shows the loading fallback for at least one JS tick, even on a fully warm cache, because `hydrated` always initializes `false`

**Location**: `App.tsx:95` (`const [hydrated, setHydrated] = useState(false)`), flips true only inside a
`useEffect` (97–99).

**Problem**: this is the necessary mechanism that fixes the SSR/Suspense bug (§5 above) — not a bug
itself — but it does mean that **even a returning visitor with the lazy chunk already cached** sees the
"Loading calculator…" fallback for the brief window between initial paint and the first `useEffect` firing,
rather than the real wizard being possible to show immediately. This is an inherent tradeoff of the fix,
not a new defect, and the delay is a single React commit cycle (not a network wait, since hydration
doesn't block on the lazy import until *after* `hydrated` flips) — likely on the order of a few
milliseconds to one frame, not a perceptible stall for most users.

**Recommendation**: no change recommended. This is the correct, minimal-risk trade the existing fix
already made; re-engineering it (e.g., to synchronously check some other signal) would reintroduce
complexity and hydration-mismatch risk for a sub-frame-scale timing win. **Explicitly flagged as a
"don't fix" — included only so the tradeoff is documented, not because it's a real user-facing problem.**

**Decision**: no action.

---

## 6. Calculator performance (recalculation, renders, effects)

### PERF-005 — 🟡 P2 — `MonthlyWithholding.tsx`'s `steps` `useMemo` depends on `[formData, currentStep]` but doesn't use `currentStep` in its body, causing full step-list reconstruction on every keystroke

**Location**: `MonthlyWithholding.tsx:141` (memo definition) / `211` (dependency array).

**Problem**: `steps` builds an array of step *React elements* (i.e., `<SomeStepComponent .../>` for each
step, including all their props). Because the dependency array includes the entire `formData` object
(not just the field a user is currently typing in) and an apparently-unused `currentStep`, this array is
rebuilt — meaning every step component gets a **new element reference** — on every single character typed
anywhere in the form, not just when something that actually affects the step list (e.g., which flow/
estimate type is selected) changes.

**Measured impact**: **not measured** — this was identified by code-pattern inspection, not profiling.
Given each step renders one component at a time and the underlying computation (array construction) is
cheap, this is unlikely to cause a *visibly* janky keystroke experience on modern hardware, but it is a
real anti-pattern: new element references can cause child components to lose any internal
memoization benefit and, in React's reconciliation, forces prop-comparison work that a correctly-scoped
dependency array would avoid.

**Recommendation**: narrow the `useMemo` dependency array to only the values that actually determine
*which* steps exist (e.g., `estimateType`/`incomeType`-equivalent fields), not the entire `formData`
object and not `currentStep`. This is a targeted fix to an already-identified anti-pattern, not a
blanket "add more memoization" recommendation.

**Regression risk**: low, provided the narrowed dependency list is verified to include every field that
actually changes the step sequence (a missed dependency would cause stale step lists — needs a quick
test/verification pass, not a blind narrowing).

**Decision**: objective correctness-of-memoization fix; **explicitly do not extend this into adding
`useMemo`/`useCallback` elsewhere in the wizard "for consistency"** — no other unmemoized computation in
the wizard was found to be expensive enough to warrant it (see PERF-006).

---

### PERF-006 — 🟢 (positive finding, explicitly "do not over-optimize") — No expensive unmemoized computations found on keystroke paths

`AnnualTaxWizard.tsx`'s `isStepValid()` (a large branching function, lines 419–541) runs on every render
but consists of cheap comparisons/arithmetic, not expensive work (no loops over large datasets, no
PDF/schema generation, no heavy string processing) — **does not need memoization**. Step components'
local-state-then-effect-sync pattern (e.g. `MonthlyIncomeStep.tsx:13–27`, `VariableIncomeStep.tsx:28–39`)
performs small object spreads on every keystroke — also cheap. `React.memo` is used nowhere in the
calculator (`0` occurrences confirmed), and **this audit found no evidence that adding it anywhere would
produce a measurable improvement** — with one active step rendering at a time and no expensive per-step
computation identified, wrapping step components in `React.memo` would add complexity (prop-identity
management, the PERF-005 issue actively working against it) without a demonstrated problem to solve.

**Explicitly recommended: do NOT add `useMemo`/`useCallback`/`React.memo` broadly across the wizard.**
The one real memoization defect found (PERF-005) is a dependency-array correctness issue, not a "needs
more memoization" issue — the fix is to scope an existing memo correctly, not to add new memoization
elsewhere.

---

### PERF-007 — 🟢 (positive finding) — `sessionStorage` persistence is cheap and appropriately scoped

`AnnualTaxWizard.tsx`'s two `useEffect`s persisting `formData`/`currentStep` to `sessionStorage`
(189–196) run `JSON.stringify` on every `formData` change — for a form of this size (dozens of fields,
not thousands), this is not a meaningful performance cost on any modern device. No finding; noted to
confirm it was checked and not overlooked.

---

## 7. Severity summary (Task 026 only)

| ID | Severity | Objective/Design |
|---|---|---|
| PERF-001 | 🔴 P0 | Objective split; needs a small loading-state UX addition |
| PERF-002 | 🟡 P2 | Objective, reuses existing pattern |
| PERF-005 | 🟡 P2 | Objective, narrow scope |
| PERF-003, PERF-004, PERF-006, PERF-007 | — | Explicitly no action needed |

**Explicitly do NOT do**: do not further code-split React/react-router-dom/react-helmet-async (PERF-003);
do not "fix" the brief post-hydration fallback flash (PERF-004) — it's the correct trade for the already
-fixed SSR bug; do not add broad memoization across step components (PERF-006); do not replace
`@react-pdf/renderer` with a different library — the finding is about *when* it loads, not *what* it is;
do not chase a specific Lighthouse score — no live CWV measurement was performed or should be assumed
from this audit.
