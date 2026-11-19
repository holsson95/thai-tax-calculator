# TASK-024 — Mobile Calculator Audit

**AUDIT ONLY.** No source code was modified in producing this document.

Scope: `/annual-tax/` (`src/components/AnnualTaxWizard.tsx` + `src/components/steps/*.tsx`) and
`/monthly-withholding/` (`src/components/MonthlyWithholding.tsx` + its step components), plus the
shared `src/components/common/IncomeEntryCard.tsx`, `src/components/layout/{Header,Footer,Layout}.tsx`,
and `tailwind.config.js`.

---

## 0. Testing performed

**A. Verified by code inspection** (this section, throughout): full reads of `AnnualTaxWizard.tsx`,
`MonthlyWithholding.tsx`, `IncomeEntryCard.tsx`, `TaxFlowDiagram.tsx`, `TakeHomeIncomeCard.tsx`,
`Header.tsx`, `Footer.tsx`, `Layout.tsx`, `tailwind.config.js`, `src/index.css`, plus targeted grep across
all `src/components/steps/*.tsx` for input types, `inputMode`, and responsive (`sm:`/`md:`/`lg:`) classes.

**C. Browser/device emulation**: **not available in this session.** No headless browser, device emulator,
or screenshot tooling was invoked.

**D. Could not be verified without a real device/browser**: actual rendered layout at 320/360/375/390/
412/430px, real iOS/Android keyboard behavior for each input type, actual tap-target hit areas as
rendered, real scroll/focus behavior when the keyboard opens, actual visual contrast as rendered
(computed, not measured on-screen).

Everything below is either **verified from source** (marked "confirmed" or with a file:line citation) or
**inferred risk** based on the CSS/markup that will be sent to the browser (marked "likely" / "risk").
Nothing here claims to have been seen running on a physical device.

---

## 1. Viewport / breakpoint strategy (static analysis)

`tailwind.config.js` has an empty `theme.extend` — 100% default Tailwind breakpoints (`sm`=640,
`md`=768, `lg`=1024, `xl`=1280, `2xl`=1536). Across `AnnualTaxWizard.tsx`, `MonthlyWithholding.tsx`,
`AnnualResultsStep.tsx`, `AnnualIncomeStep.tsx`, and `DependentsStepAnnual.tsx`, **zero `sm:` or `lg:`
prefixes exist** — the only responsive prefix used anywhere in the wizard flow is `md:` (768px), applied
to exactly two things: card padding (`p-6 md:p-8`) and step-dot label visibility (`hidden md:block`).

Both wizards are wrapped in `max-w-2xl mx-auto` (`AnnualTaxWizard.tsx:555`, `MonthlyWithholding.tsx:232`)
— a fixed 42rem/672px content column. Practical effect: **the calculator renders essentially identically
from 320px through 672px wide.** There is no distinct "phone" vs. "large phone" vs. "small tablet"
treatment — which is a reasonable strategy for a narrow single-column form (nothing needs to reflow into
columns), but it also means nothing has been specifically tuned for the smallest viewports (320–360px);
whatever works at 672px is asked to also work at 320px by nothing more than the browser's own text
reflow and Tailwind's default paddings.

`AnnualResultsStep.tsx` results grid is `grid grid-cols-2 gap-4` (line 105) with no breakpoint variation
at all — 2 columns from 320px to 2xl. This is mobile-appropriate but also means desktop/tablet users get
no denser layout even though they have the room.

**Assessment**: no evidence of a broken layout at any specific width, but also no evidence of deliberate
tuning below 768px — the "mobile design" is really just "the only design," narrow-viewport-safe by virtue
of simplicity rather than by explicit responsive engineering.

---

## 2. Input fields

### MOB-001 — 🔴 P0 — Core money-entry fields do not set `inputMode`, so mobile keyboards default to full alphanumeric

**Location**: `AnnualIncomeStep.tsx` (line 51), `MonthlyIncomeStep.tsx` (lines 72/89/109),
`DeductionsStepAnnual.tsx`'s `DeductionItem` (line 73), `VariableIncomeStep.tsx` (lines 114/129/144/159 —
48 inputs across 12 months × 4 fields).

**Evidence**: grep across the calculator surface found `inputMode` on only 8 of the ~44 numeric-entry
fields, confined to `QuickTaxCalculator.tsx` and `CompanyIncomeStep.tsx`/`BusinessProfileStep.tsx`. Every
income/deduction amount field in the two highest-traffic flows (salaried annual return, monthly
withholding) uses `type="text"` with manual digit-stripping in `onChange`
(`e.target.value.replace(/,/g, '')`) but no `inputMode="numeric"`.

**User impact**: this is the single most repeated interaction in the entire product — entering baht
amounts. Without `inputMode="numeric"`, iOS Safari and Android Chrome show the full QWERTY keyboard
rather than a numeric keypad, forcing users to manually switch keyboards (tap the "123" key) for every
field, every step. On a form with dozens of currency fields (annual income, 12 months of variable income,
multiple deductions), this is a significant, avoidable friction cost.

**Recommendation**: add `inputMode="numeric"` (or `"decimal"` if any of these fields legitimately need a
decimal point — check each field's parsing logic first) to every currency `type="text"` input, matching
the pattern already used correctly in `CompanyIncomeStep.tsx`. This is additive — it does not change
`type`, does not change parsing, does not change validation.

**Regression risk**: very low. `inputMode` is purely a rendering hint for on-screen keyboards; it has no
effect on the value, form submission, or validation logic.

**Decision**: objective UX improvement, no design judgment required.

---

### MOB-002 — 🟡 P2 — `IncomeEntryCard.tsx` uses `type="number"` instead of the site's own `text`+`inputMode` pattern

**Location**: `src/components/common/IncomeEntryCard.tsx:182, 204` (gross amount, withholding amount).

**Problem**: `type="number"` does trigger a numeric-ish keyboard on most mobile browsers, but has known
drawbacks versus the `text`+`inputMode="numeric"` pattern used elsewhere in the app: it renders spinner
arrows (fiddly to avoid tapping on mobile), it cannot display comma-formatted values (`1,234`) since the
browser rejects non-numeric characters in a `number` input's value, and it allows scientific notation
(`1e5`) and other edge inputs that then need separate guarding. This creates an **inconsistent input
experience** within the same product — reused income-entry rows (used for freelancer/sole-proprietor
foreign and Thai income) behave differently from the salaried-flow fields.

**Recommendation**: not an automatic "switch to text" — evaluate whether comma-formatted display is
wanted here (it is used elsewhere, e.g. `AnnualIncomeStep.tsx`). If so, align to the same
`type="text"` + `inputMode="numeric"` + manual formatting pattern as the rest of the app. If simple
unformatted numeric entry is acceptable here, keep `type="number"` but add `inputMode="decimal"` for
consistency and consider `min="0"` is already present (confirmed, line 182).

**Regression risk**: medium if the input type is changed (parsing logic would need to move from
`e.target.valueAsNumber` semantics to string-based parsing) — flag as a decision, not a blind fix.

**Decision**: requires a small design/consistency decision, but low-difficulty either way.

---

### MOB-003 — 🟡 P2 — No visible/live formatting feedback while typing; comma-stripping regex could fight unusual input patterns

**Location**: `AnnualIncomeStep.tsx:9` and equivalent handlers elsewhere:
`e.target.value.replace(/,/g, '')`.

**Problem**: source only strips commas before storing the numeric string; it was not confirmed (in this
pass) whether the *displayed* value is reformatted with thousands separators as the user types, or only
on blur. If reformatting happens on every keystroke (re-inserting commas into the `value` prop while the
user is mid-edit), this is a well-known mobile-input bug pattern: the cursor can jump to the end of the
field after each keystroke, making it hard to correct a digit typed earlier in a long number. This was
**not conclusively verified either way in this pass** — flagged as a risk to check specifically, not
asserted as present.

**Recommendation**: if live reformatting exists, verify cursor position is preserved (or move
formatting to display-only on blur, keeping the live edit value unformatted). If formatting is already
blur-only, no action needed.

**Decision**: needs a quick, targeted code check before deciding whether a fix is warranted — do not
implement speculatively.

---

### MOB-004 — 🟢 (no issue) — Validation error timing

`AnnualIncomeStep.tsx` associates errors via `aria-describedby`/`aria-invalid` (lines 62–63) and shows
them as inline text — not evaluated for "too aggressive while typing" in this pass since the trigger
condition (blur vs. keystroke) wasn't traced for every field; worth a quick spot-check but not flagged
as a confirmed problem.

---

## 3. Dropdowns and selectors

### MOB-005 — 🟠 P1 — `IncomeEntryCard.tsx`'s expand/collapse header is a `<div onClick>`, not a real control

**Location**: `IncomeEntryCard.tsx:62–66`.

**Problem**: the primary way to open an income-entry row (used repeatedly for freelancer/sole-proprietor
foreign and Thai income entries) is a plain `<div onClick={onToggle}>` — not a `<button>`, no `role`, no
`tabIndex`. On mobile this still works for a tap, but the target has no guaranteed minimum tap-target
sizing beyond whatever padding the div happens to have, and (per the accessibility audit) it's not
keyboard-operable at all, which also means it's not reliably operable via mobile screen-reader swipe
gestures (VoiceOver/TalkBack navigate via the accessibility tree, and a non-interactive `<div>` may not
even appear as an actionable element in that tree, or may appear but not respond to double-tap-activate
the way a `<button>` does).

**Recommendation**: change the header element to a real `<button>` (or add `role="button"`, `tabIndex={0}`,
and `Enter`/`Space` key handlers — but a native `<button>` is simpler and gets this for free) with
`aria-expanded={isOpen}`.

**Regression risk**: low — this is a semantic element swap, the `onClick` handler and visual styling can
stay identical (a `<button>` can be styled to look exactly like the current `<div>`).

**Decision**: objective fix, no design judgment required.

---

### MOB-006 — native `<select>` usage

All dropdowns found (income type, month received in `IncomeEntryCard.tsx`; employment-type-style choices
elsewhere use card/button-toggle patterns with `aria-pressed`, not `<select>`) use native `<select>`
elements — this is the correct, mobile-friendliest choice (native pickers on both iOS and Android), no
custom dropdown widget was found in the calculator surface. **No finding here** — this is already the
right pattern, explicitly noted so it is not mistakenly "fixed" later.

---

## 4. Navigation

### MOB-007 — 🟠 P1 — No sticky/fixed bottom action bar; Next/Previous require scrolling on long steps

**Location**: `AnnualTaxWizard.tsx:718–748`, `MonthlyWithholding.tsx:332–356`.

**Problem**: Previous/Next buttons render inline at the bottom of the step's content card, not in a
sticky footer. Steps with many fields (12-month `VariableIncomeStep`, multi-entry `IncomeEntryCard` lists
in the foreign-income flow) can be significantly taller than one mobile viewport. A user must scroll to
the bottom to proceed, then (if there's a validation error) scroll back up to find and fix the offending
field, then scroll down again to re-tap Next.

**Evidence**: `min-h-[300px]` step container (`AnnualTaxWizard.tsx:713`) with no scroll-position
management; nav buttons are the last DOM elements in the card, not `position: sticky`/`fixed`.

**User impact**: extra scrolling per step, most painful on the steps with the most fields — exactly
where friction matters most (income/deduction entry, the core task).

**Recommendation**: consider a sticky bottom action bar (`position: sticky; bottom: 0`) for the
Previous/Next controls on mobile viewports, with `padding-bottom: env(safe-area-inset-bottom)` since
**no safe-area handling exists anywhere in the codebase today** (confirmed — zero matches for
`safe-area-inset` in `src/`). This is a real design decision (visual treatment, whether it should also
show progress) — not prescribed further here.

**Regression risk**: medium — must avoid the sticky bar covering the bottom of the last field group,
especially on short steps, and must be tested against the on-screen keyboard (a fixed-bottom element can
visually stack awkwardly with an open mobile keyboard — see MOB-008).

**Decision**: design decision on visual treatment; the underlying problem (buttons far from thumb reach
on long steps) is objectively real.

---

### MOB-008 — 🟡 P2 — No safe-area-inset handling anywhere; relevant to any future fixed UI

**Location**: `src/index.css` (3 lines, only `@tailwind` directives), no matches anywhere in `src/` for
`env(safe-area-inset` / `pb-safe`.

**Problem**: not an active bug today (nothing is currently fixed/sticky at the bottom of the viewport),
but flagged because MOB-007's natural fix (a sticky bottom bar) would sit under the home-indicator area
on iPhones with no safe-area padding unless explicitly added — groundwork doesn't exist yet.

**Recommendation**: if/when a fixed-bottom element is added, use `padding-bottom: env(safe-area-inset-bottom)`
(or Tailwind arbitrary value `pb-[env(safe-area-inset-bottom)]`).

**Decision**: objective, but only actionable together with MOB-007 — not a standalone fix today.

---

### MOB-009 — 🟢 (positive finding) — Home/Start Over reachability

Both wizards render their own in-card "Home" and "Start Over" controls at the top (`AnnualTaxWizard.tsx:
566–587`, similar in `MonthlyWithholding.tsx`) since the site header is suppressed on wizard pages. These
are reachable without scrolling on both wizards. No finding — noted as working correctly.

---

### MOB-010 — 🟡 P2 — "Start Over" has no confirmation and silently discards all progress

**Location**: `AnnualTaxWizard.tsx` `handleGoHome`/Start Over button (~lines 566–587).

**Problem**: a single tap on "Start Over" clears `sessionStorage` and resets the wizard with no
confirmation dialog. On mobile, accidental taps near the top of a scrollable card are plausible
(especially right after a page transition, before the user's thumb has settled). Given the wizard can
involve significant multi-step data entry (12 months of variable income, several income-entry cards),
losing it all to one mistap is a harsh failure mode.

**Recommendation**: add a lightweight confirmation (native `window.confirm` is a pragmatic,
dependency-free option, or a small inline confirm-state on the button) before clearing.

**Regression risk**: low.

**Decision**: objective UX improvement; exact confirmation UI is a minor design call.

---

### MOB-011 — 🟢 (positive finding) — Focus/scroll-jump on step change not evidenced as broken

No `scrollTo`/scroll-reset logic was found tied to step transitions — meaning if a user scrolls down mid
-step then taps Next, the new step renders at the same scroll position (likely mid-page) rather than
resetting to the top. This **could** be disorienting (new step content starts off-screen above the
viewport) but wasn't verified in a live browser. Flagged as a **risk to verify**, not a confirmed defect
— pairs with the "no focus movement to new step" accessibility finding (see `ACCESSIBILITY_025.md`
KEY-004), since the fix (scroll-to-top + focus-to-heading on step change) would resolve both at once.

---

## 5. Results page

### MOB-012 — 🟡 P2 — Results grid is a fixed 2-column layout at all breakpoints

**Location**: `AnnualResultsStep.tsx:105`, `grid grid-cols-2 gap-4`.

**Problem**: not a mobile problem per se (2 columns is a reasonable density for 320–430px phones), but
confirms there's no attempt to use extra space on larger screens (tablet/desktop) — a `md:grid-cols-3`
or similar could show more at once without scrolling on larger viewports. Low priority since this is a
"could be nicer on desktop" note, not a mobile defect.

**Decision**: optional polish, not required.

---

### MOB-013 — 🟡 P2 — `TaxFlowDiagram.tsx` rows use `whitespace-nowrap` on currency amounts next to labels in a `flex justify-between`

**Location**: `TaxFlowDiagram.tsx:57–75`.

**Problem**: on very narrow viewports (320px), a long label plus a `whitespace-nowrap` currency amount in
a `flex justify-between gap-4` row **could** force horizontal compression or visual crowding if the label
text is long (e.g., a deduction category name). This was **not verified in a rendered browser** — flagged
as an inferred risk based on the CSS pattern, to be checked specifically at 320px before deciding whether
a fix (e.g., allowing the label to wrap while keeping the amount `nowrap`) is needed.

**Decision**: verify first; do not fix speculatively.

---

### MOB-014 — 🟢 (positive finding) — Bracket table in the static content section has no scroll wrapper, but content is small

`AnnualTaxWizard.tsx:769–786` renders a 2-column tax-bracket table with no `overflow-x-auto` wrapper.
Given it's only 2 narrow columns (income range, rate), this is unlikely to overflow even at 320px — flagged
here only for completeness (matches TECHNICAL_SEO_022.md's general note about unwrapped tables sitewide),
not as an urgent mobile fix. If any future results table grows to 4+ columns, it should get a scroll
wrapper; today's 2-column table is low risk.

---

### MOB-015 — Copy/share actions and PDF download

Not deeply traced in this pass beyond confirming `@react-pdf/renderer`'s `pdf(...)` call exists in
`AnnualResultsStep.tsx`/`FreelancerResultsStep.tsx` (see `PERFORMANCE_026.md` for the bundle-size
consequence). Whether the generated-PDF download flow behaves correctly on mobile Safari (which has known
quirks with blob-URL downloads in some versions) was **not verified** — flagged as a **D: could not be
verified without a real device** item, not assumed broken.

---

## 6. Sticky/fixed UI (site-wide, relevant when wizard is *not* active)

### MOB-016 — 🟢 (positive finding) — `Header.tsx` sticky header confirmed, wizard pages exempt

`Header.tsx:65` — `sticky top-0 z-50`. Both `Header` and `Footer` return `null` entirely on `/annual-tax`
and `/monthly-withholding` (confirmed, `Header.tsx:30-35`, `Footer.tsx:8-13`), so the sticky header does
not compete for space with the wizard's own controls while the calculator is in use. No finding on the
wizard pages themselves.

### MOB-017 — 🟡 P2 — Footer's 11-link row has no `flex-wrap` on mobile

**Location**: `Footer.tsx:20` (`<nav>` with `flex gap-6`, parent `flex-col md:flex-row` at line 17, no
`flex-wrap` found on the nav row itself).

**Problem**: this only matters on non-wizard pages (footer is suppressed on the calculators themselves),
so it's a site-wide footer issue, not a calculator-specific one — noted briefly for completeness since
the footer does appear on `/tax-examples/`, `/methodology/`, etc., which are adjacent to the calculator
experience, but this is out of the core TASK-024 scope (calculator itself). Not scored in the mobile
calculator severity table below; included for awareness only.

---

## 7. Severity summary (Task 024 only)

| ID | Severity | Objective/Design |
|---|---|---|
| MOB-001 | 🔴 P0 | Objective |
| MOB-005 | 🟠 P1 | Objective |
| MOB-007 | 🟠 P1 | Design decision (treatment), objective problem |
| MOB-002 | 🟡 P2 | Design decision |
| MOB-003 | 🟡 P2 | Needs verification first |
| MOB-008 | 🟡 P2 | Objective, paired with MOB-007 |
| MOB-010 | 🟡 P2 | Objective |
| MOB-011 | 🟡 P2 | Needs verification first |
| MOB-012 | 🟡 P2 | Optional polish |
| MOB-013 | 🟡 P2 | Needs verification first |
| MOB-014 | 🔵 P3 | Low risk today |
| MOB-006, MOB-009, MOB-016 | — | Positive findings, no action |

**Explicitly do NOT do**: do not change `type="number"`→`type="text"` sitewide without checking each
field's parsing (MOB-002 is a decision, not a blanket rule); do not add a sticky bottom bar without
solving safe-area padding at the same time (MOB-007+MOB-008 are one fix, not two); do not rebuild the
grid layout for desktop density gains (MOB-012) — it is not a mobile problem.
