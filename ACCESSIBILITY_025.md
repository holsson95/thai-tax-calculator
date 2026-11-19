# TASK-025 — Accessibility Audit

**AUDIT ONLY.** No source code was modified in producing this document.

Scope: `/annual-tax/` and `/monthly-withholding/` wizards, their step components, shared components
(`IncomeEntryCard.tsx`, `TaxFlowDiagram.tsx`), and `Header.tsx`/`Footer.tsx` insofar as they affect the
calculator experience (site header is suppressed on wizard pages, but the mobile menu/search overlay
pattern in `Header.tsx` is included since it's a reusable interaction pattern worth assessing).

---

## 0. Testing performed

**A. Verified by code inspection**: full reads of `AnnualTaxWizard.tsx`, `MonthlyWithholding.tsx`,
`IncomeEntryCard.tsx`, `Header.tsx`, `Footer.tsx`, `tailwind.config.js`; grep across the calculator
surface for `aria-`, `role=`, `<label`, `htmlFor`, `tabIndex`, `alt=`.

**No automated accessibility tooling exists in this repo** (`package.json` devDependencies confirmed:
no `jest-axe`, `vitest-axe`, `@axe-core/*`, `eslint-plugin-jsx-a11y`, no Lighthouse CI config) and none
was run in this session — **D: could not be verified**: actual screen-reader output (VoiceOver/NVDA/
TalkBack), actual computed contrast ratios as rendered (calculated below from Tailwind's documented hex
values where feasible, not measured on-screen), real keyboard-only navigation end-to-end in a browser.

Everything below is derived from reading the JSX/ARIA actually present in source, not from running the
app.

---

## 1. Keyboard navigation

### KEY-001 — 🟠 P1 — `IncomeEntryCard.tsx`'s expand/collapse trigger is not keyboard-operable

**Location**: `IncomeEntryCard.tsx:62–66`, `<div onClick={onToggle}>` with no `tabIndex`, no `role`, no
key handler.

**Problem**: a mouse/touch user can click this div to expand an income entry; a keyboard-only user
tabbing through the page will skip over it entirely — there is no way to reach or activate it without a
pointer. The remove button (93–104) is a real `<button>`, so at least removal is keyboard-reachable, but
the primary expand/collapse action is not.

**Evidence**: div has `className="flex items-center justify-between p-4 cursor-pointer"` — `cursor-pointer`
signals interactivity visually but the element carries none of the semantics or focusability that make it
actually keyboard-operable.

**Impact**: any keyboard-only user (motor-impairment users, some screen-reader users who don't use
touch/swipe navigation, power users) cannot open/close income-entry rows at all in the freelancer/
sole-proprietor foreign-and-Thai-income flows — a genuine task-blocking issue for that flow, not just an
inconvenience, since collapsed entries may hide required fields.

**Recommendation**: change the element to a `<button type="button">` (can retain identical visual
styling), add `aria-expanded={isOpen}` and `aria-controls` pointing to the expandable region's `id`.

**Regression risk**: low — purely a semantic element swap; `onClick` behavior is unchanged.

**Decision**: objective fix, no design judgment needed.

---

### KEY-002 — 🟢 (positive finding) — Header search/mobile-menu keyboard support

`Header.tsx` has real keyboard handling: search overlay auto-focuses on open (13–16) and closes on
`Escape` (18–27); mobile hamburger button correctly toggles `aria-expanded` (152). **Gap**: the
`Escape`-close handler is scoped only to `searchOpen` (18–27), not to `mobileMenuOpen` — pressing Escape
while the mobile nav panel is open does not close it. Also, no focus trap and no auto-focus into the
mobile menu panel when opened (see §3 Focus below). Since the site header/mobile menu is suppressed on
the wizard pages themselves, this is a **site-wide** finding, included here because it's directly
adjacent to the calculator (the last screen before/after using it) rather than a core calculator defect.

**Recommendation**: extend the existing Escape handler to also close `mobileMenuOpen`, for consistency
with the already-correct desktop search pattern.

**Decision**: objective, low-difficulty, matches an existing working pattern.

---

### KEY-003 — 🟢 (positive finding) — Step-dot navigation and card-toggle buttons are real buttons

Step-progress dots (`AnnualTaxWizard.tsx:610–700`) are real `<button>` elements with descriptive
`aria-label`s (e.g. line 660: `` `${index < currentStep ? 'Go to ' : ''}Step ${index + 1}: ${label}` ``)
and disabled future steps use the native `disabled` attribute (correctly removes them from the tab
order and screen-reader-interactive set). Card-selection toggles (e.g. `EmploymentTypeStep.tsx:66`) use
`aria-pressed` correctly. No finding — noted so it isn't miscounted as a gap.

---

### KEY-004 — 🟡 P2 — Focus does not move to the new step's content after Next/Previous

**Location**: `AnnualTaxWizard.tsx` step-transition logic (`renderStep()` around 419–541 and the nav
handlers ~718–748); `MonthlyWithholding.tsx` equivalent (~332–356).

**Problem**: no `useRef`/`tabIndex={-1}`/`.focus()` call was found tied to `currentStep` changes. When a
sighted mouse user clicks Next, the button they clicked stays focused (or focus is lost) while the page
content changes above/around it — for a screen-reader user, this means the step transition is
**silent**: nothing is announced, and the user's focus point does not move into the newly-rendered step,
so they may not realize the content changed at all unless they manually re-explore the page.

**Recommendation**: on step change, move focus to a heading or a `tabIndex={-1}` wrapper at the top of
the new step's content, ideally paired with an `aria-live="polite"` region (or the heading text itself
if programmatically focused, since focus changes are announced regardless of `aria-live`) announcing
which step the user is now on.

**Regression risk**: low, but requires care not to cause a disorienting focus jump for sighted keyboard
users either — a `tabIndex={-1}` focus target (not visually distracting) is the standard pattern here.

**Decision**: objective wizard-accessibility gap; exact implementation (focus target choice) is a small
design call. Cross-references MOB-011 (scroll position) in `MOBILE_CALCULATOR_024.md` — **one fix should
address both**, see Cross-Task Issues in `PHASE6_UX_AUDIT.md`.

---

## 2. Labels

### LBL-001 — 🔴 P0 — `IncomeEntryCard.tsx` labels are not programmatically associated with their controls

**Location**: `IncomeEntryCard.tsx` — all 6 fields (Income Type select, Gross Amount, Withholding Amount,
Month Received select, Payer Name, Description), e.g. lines ~130–146.

**Problem**: each field is `<label className="...">Income Type *</label>` immediately followed by a
sibling `<select>`/`<input>` with **no `id` on the control and no `htmlFor` on the label**. Unlike the
checkbox pattern used elsewhere in the app (where the input is nested *inside* the label, which is a
valid implicit association), these are **sibling** elements with no association mechanism at all — a
screen reader announces the input with no accessible name derived from the label text (it may fall back
to `placeholder`, if present, or announce nothing useful beyond "edit text" / "combo box").

**Evidence**:
```
<label className="block text-sm font-medium text-gray-700 mb-1">Income Type *</label>
<select ...>
```
No `id`/`htmlFor` pair anywhere in this 292-line file, confirmed via full read.

**Impact**: this component is reused for every income-entry row in the foreign-income and Thai-income
flows for freelancers and sole proprietors — a screen-reader user filling out these forms cannot reliably
tell what each field is for. This is the most severe accessibility finding in the audit because it's a
**repeated, high-traffic** component, not a one-off field.

**Recommendation**: add unique `id`s to each control (e.g. derived from the entry's index/key, since
this component renders in a list — `id={`income-type-${entryId}`}`) and matching `htmlFor` on each
label. This is mechanical and requires no visual change.

**Regression risk**: very low — `id`/`htmlFor` additions do not affect layout, styling, or form
behavior. The only care needed: ensure `id`s are unique per rendered instance (list index or entry id,
not a static string), since this component renders multiple times on one page.

**Decision**: objective fix, no design judgment required. **Highest-priority accessibility fix in this
audit.**

---

### LBL-002 — 🟢 (positive finding) — Checkbox/toggle label-wrapping pattern used correctly elsewhere

E.g. `AnnualIncomeStep.tsx:86–107` wraps `<input type="checkbox">` inside the `<label>` — this is a
valid, standards-correct implicit association and does not need `htmlFor`/`id`. Noted so the 59-of-71
"label without `htmlFor`" grep count isn't misread as 59 defects — most of that gap is this valid
wrapping pattern; `LBL-001` above is the genuine defect subset (sibling label+control with no
association at all).

---

### LBL-003 — 🟡 P2 — Inconsistent `aria-invalid`/`aria-describedby` coverage for error states

**Location**: `AnnualIncomeStep.tsx:62–63` has the correct pattern (`aria-describedby`, `aria-invalid`);
`MonthlyIncomeStep.tsx`, `VariableIncomeStep.tsx`, and `IncomeEntryCard.tsx` do not apply this pattern to
their own validation-adjacent fields.

**Impact**: a screen-reader user gets a good experience on one step's income field and a degraded one on
structurally similar fields elsewhere — inconsistent, not absent everywhere.

**Recommendation**: apply the same `aria-invalid`/`aria-describedby` pattern already proven in
`AnnualIncomeStep.tsx` to the other numeric-entry fields as a mechanical extension of an existing,
working pattern (not a new pattern to design).

**Regression risk**: low.

**Decision**: objective, extends an already-approved pattern.

---

### LBL-004 — 🟡 P2 — No `role="alert"`/`aria-live` on validation error messages

**Location**: error `<p>` elements sitewide (e.g. `AnnualIncomeStep.tsx:67`) are static text, associated
via `aria-describedby` but not proactively announced.

**Impact**: `aria-describedby` only helps a screen-reader user who re-focuses the field after the error
appears; it does not proactively announce a newly-appeared error the way `role="alert"` or an
`aria-live="polite"` region would. For a field that shows an error on blur (user has already tabbed away
to the next field), the user may not hear about the problem until they submit/advance and get blocked,
with no clear signal of why.

**Recommendation**: add `role="alert"` to error message containers (lightweight, no restructuring
needed) so screen readers announce them as they appear.

**Regression risk**: very low.

**Decision**: objective; avoid over-applying `role="alert"` to non-error informational text — restrict to
genuine validation error messages, per the audit's general "don't add ARIA where not needed" principle.

---

## 3. Focus

### FOC-001 — Focus indicator consistency

**Location**: focus rings vary between `focus:ring-2 focus:ring-blue-200 focus:border-blue-500` (e.g.
`AnnualIncomeStep.tsx:60`) and `focus:ring-blue-500` (full-strength, e.g. `IncomeEntryCard.tsx`,
`MonthlyIncomeStep.tsx`) across different step files.

**Problem**: not a *missing* focus indicator (every sampled input has some focus-visible treatment,
which is good — no finding of focus indicators being suppressed), but the *intensity* differs — `blue-200`
is a much lighter/lower-contrast ring than `blue-500`. Whether `blue-200` on a white background passes
a reasonable focus-visibility bar was not computed precisely in this pass (Tailwind's `blue-200` is
`#bfdbfe`, a light blue with low contrast against white — likely to be a **weak but not absent** focus
signal, difficult to see in bright ambient light on mobile).

**Recommendation**: standardize on the stronger ring treatment (`ring-blue-500` or similar) across all
form fields, rather than the current per-file inconsistency.

**Regression risk**: very low — purely a Tailwind class swap for visual consistency.

**Decision**: objective consistency fix; exact ring color is a minor design call (keep it within the
existing blue family already in use, no new color needed).

---

### FOC-002 — No focus trap in the mobile menu overlay

Covered above as part of KEY-002 — `Header.tsx`'s mobile nav panel has no focus trap, meaning Tab can
move focus out of the open panel into page content behind it. Site-wide finding, not calculator-specific;
included for completeness since it's the header a user sees immediately before/after the calculator.

---

### FOC-003 — 🟡 P2 — Step transitions don't manage focus (cross-reference)

Same underlying issue as KEY-004 above — listed once there, referenced here to avoid duplicate scoring.
See Cross-Task Issues in `PHASE6_UX_AUDIT.md`.

---

## 4. Screen readers

### SR-001 — 🟢 (positive finding) — `role="progressbar"` used correctly, but missing `aria-valuetext`

**Location**: `AnnualTaxWizard.tsx:601–608`, `MonthlyWithholding.tsx:267–286`.

**Problem**: `role="progressbar"` with `aria-valuenow`/`aria-valuemin`/`aria-valuemax` is the correct base
pattern (confirmed present), but there's no `aria-valuetext` — so a screen reader announces raw numbers
("3", range "1" to some max N) rather than something like "Step 3 of 8: Income Details." The adjacent
visible text label (lines ~589–598) does convey this visually, but isn't wired into the progressbar's
accessible value text, so the announcement is less useful than the visible experience.

**Recommendation**: add `aria-valuetext={`Step ${currentStep + 1} of ${totalSteps}: ${stepLabels[currentStep]}`}`
(or equivalent) to the progressbar element.

**Regression risk**: none — purely additive ARIA attribute.

**Decision**: objective, small, additive.

---

### SR-002 — 🟡 P2 — Step-dot ellipsis characters are unlabeled decorative text

**Location**: `AnnualTaxWizard.tsx:610–700`, the sliding-window IIFE's ellipsis (`...`) spans between
visible step dots.

**Problem**: plain text nodes read literally by a screen reader ("dot dot dot") with no semantic meaning
— low severity since it's a minor auditory noise, not a blocker, but worth marking `aria-hidden="true"`
since it conveys nothing structurally useful when spoken.

**Recommendation**: wrap ellipsis spans in `aria-hidden="true"`.

**Regression risk**: none.

**Decision**: trivial, objective.

---

### SR-003 — 🟠 P1 — Step labels are visually hidden below `md:` (768px), removing them from sighted mobile users but keeping the visible-text alternative unavailable at the exact viewport where most users will be

**Location**: `AnnualTaxWizard.tsx:643, 672, 693`; `MonthlyWithholding.tsx:309` — all `hidden md:block`.

**Problem**: this isn't strictly a screen-reader issue (screen readers still get the dots' `aria-label`s
regardless of the `hidden` CSS class, since the labels are on the buttons, not the hidden text spans) —
but it is a **low-vision / cognitive-accessibility** concern: on the exact viewport width where the
overwhelming majority of real users will be (phones, sub-768px), the only always-visible indication of
which step a user is on is the single text line above the dots (lines ~589–598) plus the percentage —
individual step *names* next to each dot are invisible. A user with low vision or difficulty parsing a
dot-only progress UI has less context on mobile than on desktop.

**Recommendation**: this is a design-density tradeoff (showing 5–8 step names inline on a 320px-wide
row is genuinely hard) — flagged as a **human decision** for whether an alternative (e.g. a dropdown/
sheet listing all step names, or simply relying on the single current-step text line, which already
exists) is sufficient, rather than prescribing a specific fix.

**Decision**: needs a design decision; the underlying gap (less mobile context than desktop) is
objectively real, but the right fix is not obvious or mechanical.

---

### SR-004 — Results announcement

Not conclusively traced: whether navigating to the final results step causes any `aria-live` announcement
of the computed result (e.g. "Your estimated tax is ฿X"). No `aria-live` region was found anywhere in the
grep results (0 `role=` matches beyond the two progressbars) — **flag as a gap**: a screen-reader user
who reaches the results step gets the result via normal document reading order (which does work, since
content is real DOM text, not canvas/SVG-rendered numbers) but gets no proactive announcement the way a
sighted user gets an immediate visual "here's your answer" experience. Lower priority than LBL-001/
KEY-001 since the information **is** accessible, just not proactively announced.

**Decision**: 🔵 P3, optional enhancement — not a blocker since the data is present and reachable.

---

## 5. Headings

Heading hierarchy was not exhaustively traced level-by-level across every step file in this pass (23 step
files). Based on the files read in full (`AnnualTaxWizard.tsx`, `MonthlyWithholding.tsx`), the wizard
container itself does not appear to render a step-specific `<h1>`/`<h2>` at the top of each step's content
in the parent — headings, if present, live inside each individual step component and were not
individually verified for correct nesting level in this pass.

**Flag for follow-up** (not scored as a confirmed defect, since it wasn't fully verified): confirm each
step component renders exactly one `<h2>` (assuming the page-level `<h1>` is the calculator title in the
Helmet-adjacent visible heading) describing that step's purpose, and that heading text matches or
reinforces the step-dot `aria-label`. This would also give KEY-004's focus-management fix a natural
target (focus the step's `<h2>`).

**Decision**: D — not fully verified; recommend a quick follow-up grep for `<h1`/`<h2`/`<h3` across
`src/components/steps/*.tsx` before scoring this as pass/fail.

---

## 6. Color contrast

No live rendering/measurement was performed. Below are ratios computed from **documented default
Tailwind v3 hex values** for the specific class combinations confirmed present in source — this is
"B: verified by inspecting known constants," not a live-rendered measurement, and should be treated as a
strong estimate, not a certified WCAG audit.

| Combination | Where used | Approx. hex | Approx. contrast ratio vs. background | WCAG AA (normal text, 4.5:1) |
|---|---|---|---|---|
| `text-gray-700` on white | body text, labels | `#374151` on `#ffffff` | ~9.4:1 | Pass |
| `text-gray-600` on white | secondary text | `#4b5563` on `#ffffff` | ~7.3:1 | Pass |
| `text-gray-500` on `gray-300` | **disabled Next button text** | `#6b7280` on `#d1d5db` | ~2.6:1 | **Fails 4.5:1** (disabled controls are commonly exempted from strict AA text-contrast requirements by WCAG's own success-criterion scope, so this is not a hard violation, but it is a real readability weakness) |
| `text-red-600` on white | error messages | `#dc2626` on `#ffffff` | ~5.9:1 | Pass |
| `text-blue-600`/`text-blue-500` | links/primary buttons (white text on `blue-600` background is the more relevant pairing for buttons) | white `#ffffff` on `#2563eb` | ~5.2:1 | Pass |
| `ring-blue-200` focus ring on white | some form fields (see FOC-001) | `#bfdbfe` on `#ffffff` | ~1.3:1 (ring vs. background, not text) | Focus *indicators* are held to a 3:1 non-text contrast requirement (WCAG 2.2 SC 1.4.11) — **this likely fails** that bar, consistent with FOC-001's flag |
| `text-yellow-800` on `yellow-50` | disclaimer box | `#854d0e` on `#fefce8` | ~7.8:1 | Pass |
| `text-emerald-700` on `emerald-50` | take-home card | `#047857` on `#ecfdf5` | ~6.6:1 | Pass |

### CON-001 — 🟡 P2 — Disabled-button text contrast is weak (not a hard AA failure, but poor readability)

**Recommendation**: not urgent to "fix" per WCAG's own disabled-control exemption, but consider a
slightly darker disabled-text shade (e.g. `text-gray-600` on `gray-300`, ~3.9:1) for better real-world
legibility, since users do need to *read* why a button is disabled-looking even if it's not interactive.

**Decision**: optional polish, not a compliance blocker.

### CON-002 — 🟡 P2 — Light-ring focus indicator (`ring-blue-200`) likely fails the 3:1 non-text contrast bar

Already covered under FOC-001 — same fix (standardize on `ring-blue-500` or similar) addresses both the
consistency finding and this contrast estimate. Not double-counted in the severity table below.

**All other sampled text/background combinations pass AA comfortably** — no broad contrast crisis found;
this is a narrowly-scoped finding (disabled state + weak focus ring), not a sitewide color problem.

---

## 7. Errors and validation

### ERR-001 — Summary (consolidates LBL-003, LBL-004 above)

Confirmed pattern quality: `AnnualIncomeStep.tsx` shows the strongest example (`aria-invalid`,
`aria-describedby`, visible red text + border color change — **not color-alone**, since the error text
itself is also present, so this does pass the "not color as the only indicator" check for that field).
The gap is **coverage**, not pattern quality — the good pattern exists but isn't applied everywhere
(`MonthlyIncomeStep.tsx`, `VariableIncomeStep.tsx`, `IncomeEntryCard.tsx`).

**No confirmed case of color being the *only* error indicator** — every sampled error state pairs a
color change with visible text. This is a positive finding worth stating explicicly: the fix needed is
*consistency of an existing good pattern*, not inventing indicators from scratch.

### ERR-002 — 🟡 P2 — `MonthlyWithholding.tsx`'s Next button gives no disabled/invalid visual state at all

**Location**: `MonthlyWithholding.tsx:345–354`.

**Problem**: unlike `AnnualTaxWizard.tsx`'s Next button (which is `disabled` + visually grayed when the
step is invalid), the Monthly Withholding wizard's Next button has **no `disabled` state** — it's always
clickable, and invalidity is only surfaced after tapping it (via `showValidationErrors`). This is an
inconsistency between the two wizards, and means a keyboard/screen-reader user gets no advance warning
that a required field is missing before attempting to proceed — they must submit and then encounter
errors, rather than seeing a disabled-state affordance.

**Recommendation**: align `MonthlyWithholding.tsx`'s Next button to the same disabled/enabled pattern
already implemented correctly in `AnnualTaxWizard.tsx`.

**Regression risk**: low — reuses an already-proven pattern from the sibling wizard.

**Decision**: objective consistency fix.

---

## 8. Severity summary (Task 025 only)

| ID | Severity | Objective/Design |
|---|---|---|
| LBL-001 | 🔴 P0 | Objective |
| KEY-001 | 🟠 P1 | Objective |
| SR-003 | 🟠 P1 | Design decision |
| KEY-004 / FOC-003 | 🟡 P2 | Objective gap, small design call on focus target |
| LBL-003 | 🟡 P2 | Objective |
| LBL-004 | 🟡 P2 | Objective |
| FOC-001 / CON-002 | 🟡 P2 | Objective |
| ERR-002 | 🟡 P2 | Objective |
| SR-001 | 🟡 P2 | Objective |
| SR-002 | 🟡 P2 | Objective |
| CON-001 | 🟡 P2 | Optional polish |
| SR-004 | 🔵 P3 | Optional enhancement |
| Heading hierarchy | D (unverified) | Needs follow-up check |
| KEY-002 / FOC-002 | 🟡 P2 | Objective (site-wide, not calculator-specific) |

**Explicitly do NOT do**: do not add `aria-live` regions broadly across the app "just in case" — only
the results step and error messages have a demonstrated need (SR-004, LBL-004); do not add `role`
attributes to elements that are already correct native HTML (checkboxes, native selects); do not
redesign the visual step-progress UI to cram step names onto mobile (SR-003) without a human decision on
the tradeoff.
