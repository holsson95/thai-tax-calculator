# MyThaiTaxes — Project Audit

**Date:** 2026-09-06 (last updated 2026-09-06 after remediation pass)
**Scope:** Full codebase audit per `CLAUDE.md` goals (calculation accuracy/transparency, calculator-as-core-product, original content, trust/UX/maintainability, AdSense readiness).

**Method:** Static review of the repository (React 18 + Vite 5 + TS, React Router v7, Tailwind, SSR-prerendered to `docs/` for GitHub Pages). Findings below are grouped by audit area, with severity ranked **Critical / High / Medium / Low**, each with concrete file references and a recommended fix.

---

## Remediation status (2026-09-06)

A first remediation pass fixed the Critical items and part of the High/testing items, scoped deliberately to **exclude** content rewrites, SEO titles, page redesigns, new features, internal linking, and content-structure changes (all left untouched, per instruction). Per CLAUDE.md's rule that the tax engine can't change without documented behavior + tests + explicit approval, one item (the stale `TAX_YEAR_CONFIG` year) was resolved by asking the user directly rather than inferring a tax fact — user confirmed tax year 2026 is the current target.

| # | Issue | Status | What changed |
|---|---|---|---|
| 1 | Duplicate `tax.ts`/`tax.tsx` resolve ambiguously | ✅ **Fixed** | Confirmed via module-resolution test (`tsx` resolution, matching Vite's default `.ts`-before-`.tsx` extension order) that `tax.ts` (config-driven, from `TAX_BRACKETS`) was the file actually bundled; `tax.tsx` (hardcoded duplicate with `Math.round`) was dead, unreachable code. Deleted `src/utils/tax.tsx`. No behavior change to the live app, since the deleted file was never executed. |
| 2 | Tax year / SSO ceiling contradictions | ✅ **Fixed** (partially — see remaining note) | `TAX_YEAR_CONFIG` in `src/config/taxConfig.ts` was hardcoded to tax year 2024 with a `PND94_DUE_DATE` of `2024-09-30` — already in the past relative to today (2026-09-06), meaning the app could have shown a stale filing deadline. Asked the user which year is authoritative; **user confirmed tax year 2026**. Updated `CURRENT_TAX_YEAR`, `TAX_YEAR_START`, `TAX_YEAR_END`, `PND94_DUE_DATE` (→ `2026-09-30`), `PND90_91_DUE_DATE` (→ `2027-03-31`). Separately, `DEDUCTION_CAPS.MAX_SOCIAL_SECURITY: 9000` in the same file was found to have **zero usages anywhere in the codebase** (confirmed via grep) — it was dead, stale data that contradicted the live value (10,500, used consistently in both `TAX_CONSTANTS` and `MONTHLY_TAX_CONSTANTS`). Removed the unused key rather than guessing which number was "right," since it was never live. |
| 3 | No source citations for tax constants | 🟡 **Partially addressed** | Added comments to `TAX_BRACKETS` and `TAX_CONSTANTS` in `src/types/taxForm.ts` citing the Thai Revenue Department source already used for the equivalent bracket table in `src/data/articles.ts` (reused an existing, already-vetted citation rather than inventing a new one). Also flagged in-code that `TAX_CONSTANTS`'s non-SSO figures (allowances, deduction caps) have not been independently re-verified for tax year 2026 — this still needs a human/source check before being called fully sourced. Other constants files (`taxConfig.ts`) still lack citations — left for a follow-up pass. |
| 4 | No tests for `calculateThaiTax` / `calculateCompanyOwnerTax`, no boundary tests | ✅ **Fixed** | Added `src/utils/__tests__/tax.test.ts` — direct unit tests for `calculateThaiTax`, including boundary tests at every bracket transition (150k/300k/500k/750k/1M/2M/5M). Added a `calculateCompanyOwnerTax` describe block to `src/utils/__tests__/taxCalculations.test.ts` covering: zero-income case, standard deduction applying only to employment income (not dividends), dividends excluded when `includeInPIT=false`, and dividend withholding credited against tax owed. All new tests pass; full suite run confirmed no regressions (see below). |
| 5 | Bracket thresholds duplicated in 4 places | 🔲 **Not yet done** | Deleting `tax.tsx` (item 1) removed one duplicate. `expenseCalculations.ts:estimateTaxBracketRate()`'s hardcoded lookup table and `obligationChecks.ts:calculateProvisionalTax()`'s inline loop still exist as separate implementations — left untouched this pass since consolidating them changes core calculation code paths and needs its own documented-behavior/test/approval cycle per CLAUDE.md, not a quick edit alongside everything else. |

**Verification performed:** `npx tsc --noEmit` (clean, no type errors). `npx vitest run` — all new/modified tests pass (57 new/changed test cases across `tax.test.ts` and `taxCalculations.test.ts`); confirmed via `git stash` that the 40 pre-existing failures in `AnnualTaxWizard.test.tsx` and `MonthlyWithholding.test.tsx` (a `happy-dom`/`react-helmet-async` incompatibility, already flagged under §1 Dependencies) exist identically on `main` before these changes and are unrelated to this work.

**Explicitly out of scope for this pass** (per instruction): article/content rewrites, SEO title changes, page redesigns, new features, internal linking, content-structure changes. All Medium/Low findings touching those areas (Terms of Service page, OG/JSON-LD gaps, PDF bundle splitting, accessibility contrast, dependency hygiene, etc.) remain open below, unchanged from the original audit.

---

## Summary of Critical/High issues (original findings — see remediation table above for current status)

| # | Issue | Severity | Area |
|---|---|---|---|
| 1 | Two competing tax-calculation implementations (`tax.ts` vs `tax.tsx`) resolve ambiguously | **Critical** — ✅ Fixed | Tax logic |
| 2 | Tax year and Social Security ceiling contradict each other across constants files | **Critical** — ✅ Fixed | Tax data |
| 3 | No source citations (URL/law reference/year) for any tax bracket or rate constant | **High** — 🟡 Partial | Tax logic (CLAUDE.md violation) |
| 4 | Core bracket function (`calculateThaiTax`) and `calculateCompanyOwnerTax` have no dedicated/boundary tests | **High** — ✅ Fixed | Testing |
| 5 | Bracket thresholds/rates duplicated in 4 separate places instead of one source of truth | **High** — 🔲 Open | Tax logic / maintainability |

Full detail follows (original findings, retained for reference).

---

## 1. Framework / Versioning

**Findings:**
- React 18.2.0, react-dom 18.2.0, react-router-dom ^7.13.0 (v7 installed but only classic `<Routes>/<Route>` API used, not the v7 data router), TypeScript ^5.2.2, Vite ^5.0.8, Tailwind ^3.3.6.
- Vitest ^4.0.18 is a newer major line than Vite ^5.0.8 — these are normally paired versions and the mismatch is a latent source of peer-dependency/test-runner friction.
- Both `jsdom` and `happy-dom` are installed as devDependencies — redundant, only one test DOM environment is needed.
- `eslint` ^8.55.0 is EOL (ESLint 9's flat config is current).
- `@types/react-router-dom` ^5.3.3 is a stale, unnecessary devDependency — v7 ships its own types.
- All dependencies use caret (`^`) ranges (loose, not pinned); a `package-lock.json` exists so installs are still reproducible, but `npm update` could pull unexpected minor/patch changes.

| Recommendation | Severity |
|---|---|
| Remove `@types/react-router-dom` (unused with v7's built-in types) | Low |
| Pick one test DOM library (`happy-dom` is faster) and remove the other | Low |
| Bump ESLint to v9 flat config | Low |
| Align Vitest/Vite major versions (bump Vite to 6/7, or pin Vitest to a 5-series build compatible with Vite 5) | Medium |
| Consider pinning exact versions for tax-relevant/core deps given loose caret ranges | Low |

---

## 2. Routing Structure

**Findings** (`src/App.tsx`, `src/main.tsx`, `src/entry-server.tsx`):
- Declarative `<Routes>/<Route>` routing (not v7 data router). Routes: `/`, `/monthly-withholding`, `/annual-tax` (lazy), `/articles`, `/articles/:slug`, `/faq`, `/search`, `/privacy`, `/about`.
- Only `AnnualTaxWizard` is code-split via `React.lazy`; all other page components (including the 408-line `MonthlyWithholding`) are eagerly bundled.
- `main.tsx` correctly branches `hydrateRoot` vs `createRoot` based on prerendered content; `entry-server.tsx` correctly uses `StaticRouter` + manual Helmet tag extraction for SSR.

| Recommendation | Severity |
|---|---|
| Code-split `MonthlyWithholding` and heavier page components the same way as `AnnualTaxWizard` to reduce initial bundle | Medium |

---

## 3. Calculator Components

**Findings:**
- `AnnualTaxWizard.tsx` (814 lines) orchestrates a multi-step wizard; delegates math to `utils/taxCalculations.ts`. Size is driven by step/UI orchestration, not embedded tax math — acceptable but a candidate for splitting into smaller sub-components for maintainability.
- `MonthlyWithholding.tsx` (408 lines) and `QuickTaxCalculator.tsx` (~150 lines) cleanly delegate to utility functions.
- 20+ wizard step components under `src/components/steps/` total ~7,975 lines (largest: `ForeignIncomeStep.tsx` at 881 lines, `CompanyIncomeStep.tsx` at 672 lines).
- Business logic is well isolated into `src/utils/` (taxCalculations, foreignIncomeCalculations, expenseCalculations, obligationChecks, checklistGenerator) — good separation of concerns overall, which is the right foundation for the CLAUDE.md rule requiring tests before touching calc logic.

| Recommendation | Severity |
|---|---|
| Consider splitting `ForeignIncomeStep.tsx`/`CompanyIncomeStep.tsx` into smaller sub-components for maintainability | Low |

---

## 4. Tax Calculation Logic

**Findings:**

**(Critical) Duplicate, conflicting implementations of the core bracket calculation:**
- `src/utils/tax.ts` — imports `TAX_BRACKETS` from `types/taxForm.ts` (config-driven), no rounding.
- `src/utils/tax.tsx` — a **second, independent** `calculateThaiTax` with brackets **hardcoded inline** (lines 4-13) and `Math.round()` applied to the result (line 28) — different output than `tax.ts` for non-round results.
- Both are imported via the extensionless path `'../utils/tax'` from `Calculator.tsx`, `QuickTaxCalculator.tsx`, and `MonthlyResultsStep.tsx` — **which file actually resolves is bundler-dependent and not evident from reading the code.** This is a live correctness risk: the site could be silently running an undocumented, hardcoded tax engine instead of the config-driven one, and no one would notice from the source alone.

**(Critical) Contradictory constants across the codebase**, with no stated single source of truth:
- Tax year: `src/config/taxConfig.ts:151` states `CURRENT_TAX_YEAR: 2024`; `src/types/taxForm.ts:247` labels `TAX_BRACKETS` "for 2025 (verified)" — two different tax years claimed for the numbers actually in use.
- Social Security ceiling: `taxConfig.ts:175` → 9,000; `taxForm.ts:229` → 10,500 commented "SSO ceiling for 2025"; `taxForm.ts:75` (`MONTHLY_TAX_CONSTANTS`) → 10,500 commented "New SSO ceiling for **2026**." Three different values for the same real-world figure, spread across two years, with no citation for any of them.

**(High) No source documentation anywhere for tax numbers**, contrary to the explicit CLAUDE.md rule ("Identify the source... Record the applicable tax year... Preserve the source URL"):
- Occasional Revenue Code section references exist in comments (`expenseCalculations.ts:32`, `taxCalculations.ts:205` — "Section 40(1)"; `taxConfig.ts:20` — "Section 40(6)"), but **no file cites a URL, Revenue Department order/notification number, or dated source** for the actual bracket thresholds (150k/300k/500k/750k/1M/2M/5M) or rates (5%–35%), the SSO ceiling, or deduction caps. `taxForm.ts:247`'s "(verified)" label does not say verified against what.
- By contrast, `src/data/articles.ts` and `src/data/faq.ts` *do* generally include `sources: [{label, url}]` citations — the calculation engine should be held to at least the same standard, since it's the thing users actually rely on for numbers.

**(High) The same bracket table is reimplemented in 4 separate places** instead of referencing one constant:
1. `types/taxForm.ts` `TAX_BRACKETS` (canonical, config-driven)
2. `tax.tsx` — hardcoded inline duplicate
3. `expenseCalculations.ts:estimateTaxBracketRate()` (lines 250-259) — hardcoded lookup table duplicate
4. `obligationChecks.ts:calculateProvisionalTax()` (lines 34-66) — a third independent loop, though at least sourced from `TAX_BRACKETS`

Every duplicate is a place a future bracket update (new tax year) could be missed, silently producing wrong numbers in one code path while others are updated correctly.

| Recommendation | Severity | Status |
|---|---|---|
| Resolve the `tax.ts`/`tax.tsx` collision immediately: determine which one is actually being bundled, delete the other, and standardize on the config-driven version | **Critical** | ✅ Fixed — `tax.tsx` deleted, `tax.ts` confirmed as the only live implementation |
| Reconcile tax year and SSO-ceiling contradictions into one canonical, dated value per constant; document which year(s) the site currently supports | **Critical** | ✅ Fixed — `TAX_YEAR_CONFIG` updated to 2026 (user-confirmed); unused conflicting `DEDUCTION_CAPS.MAX_SOCIAL_SECURITY: 9000` removed |
| Add source citations (Revenue Department URL, notification/order number, effective date) to every constant in `taxConfig.ts` and `taxForm.ts`, per CLAUDE.md's explicit tax-rule requirement | **High** | 🟡 Partial — `TAX_BRACKETS`/`TAX_CONSTANTS` in `taxForm.ts` now cite the existing rd.go.th source; `taxConfig.ts` constants still uncited; non-SSO 2026 figures flagged as unverified |
| Consolidate all bracket-table duplicates to reference `TAX_BRACKETS` as the single source of truth; delete `estimateTaxBracketRate`'s hardcoded copy | **High** | 🔲 Open — needs its own documented-behavior/test/approval cycle before touching `expenseCalculations.ts`/`obligationChecks.ts` |

*(Per CLAUDE.md: none of the above should be changed without inspecting current behavior, documenting it, adding tests, and getting explicit approval — this audit is flagging the issue, not proposing a silent fix.)*

---

## 5. Data / Constants

Covered above (§4) — the constants themselves (`src/config/taxConfig.ts`, `src/types/taxForm.ts`) are the source of the year/value contradictions. No file in the repo states, in one place, "this calculator targets tax year X, sourced from Y, as of date Z."

| Recommendation | Severity |
|---|---|
| Create a single documented "tax year & sources" reference (e.g. a comment block or `TAX_YEAR_SOURCES` constant) that all other constants point back to | High |

---

## 6. Tests

**Findings:**
- `src/utils/__tests__/taxCalculations.test.ts` (810 lines) — strong coverage of allowances, deductions, `calculateAnnualTax`, and extensive `calculateFreelancerTax` scenarios (income types, withholding, foreign income, expense comparison, PND94/VAT).
- `src/utils/__tests__/obligationChecks.test.ts` (454 lines) — good PND94/VAT threshold coverage.
- **No test imports `calculateThaiTax` from either `tax.ts` or `tax.tsx` directly** — the ambiguous duplicate-file issue (§4) is completely untested at the unit level and only exercised indirectly through `calculateAnnualTax`.
- **No boundary tests** at exact bracket transition points (e.g. taxable income of exactly 150,000 / 300,000 / 500,000 / 750,000 / 1,000,000 / 2,000,000 / 5,000,000) in any test file — the classic source of progressive-tax off-by-one bugs.
- `calculateCompanyOwnerTax` (`taxCalculations.ts:204`) has **no tests at all**.

| Recommendation | Severity | Status |
|---|---|---|
| Add direct unit tests for whichever `tax.ts`/`tax.tsx` file is canonical, before touching it | **High** | ✅ Fixed — `src/utils/__tests__/tax.test.ts` added |
| Add boundary-value tests at every bracket edge | High | ✅ Fixed — covered in the same new test file |
| Add tests for `calculateCompanyOwnerTax` | High | ✅ Fixed — added to `taxCalculations.test.ts` |

---

## 7. Article / Content System

**Findings:**
- `src/data/articles.ts`: `Article` interface with `slug, title, excerpt, content (markdown), publishedAt, readTime, category, sources?`. **29 articles**, 28 of which include a `sources` array of `{label, url}` citations.
- Sampled content (e.g. "How to Use the Thai Tax Calculator") includes an original allowance table and calculator-usage walkthrough — genuine structural/original content, not generic filler, consistent with CLAUDE.md's content rule.
- `src/data/faq.ts`: 9 categories, 44 questions, with substantive answers (e.g. citing Revenue Code Section 42(17) for the 65+ pension exemption).

No issues found here beyond the general recommendation to hold the calculation engine to the same sourcing standard already applied to articles/FAQ (see §4).

| Recommendation | Severity |
|---|---|
| None required; maintain current sourcing discipline for new articles | — |

---

## 8. Metadata / SEO

**Findings** (via `react-helmet-async`, SSR through `entry-server.tsx` + `scripts/prerender.mjs`):
- Home, Article, and FAQ pages each have unique title/description/canonical/OG tags plus appropriate JSON-LD.
- **Monthly Withholding page** (`MonthlyWithholding.tsx:221-228`) has title/description/canonical only — **no OG tags, no JSON-LD**, inconsistent with Home/FAQ/Articles.
- **Annual Tax page** has two separate Helmet blocks: one in the Suspense fallback (`App.tsx:44-49`, includes JSON-LD) and one inside the lazily-loaded real `AnnualTaxWizard` component (`AnnualTaxWizard.tsx:544-548`, no OG/JSON-LD). Since SSR cannot resolve `React.lazy` synchronously, the prerendered page almost certainly ships the fallback's tags — meaning the wizard's own Helmet block is dead code for SEO purposes. Worth confirming directly against `docs/annual-tax/index.html`.
- Article JSON-LD (`ArticleDetailPage.tsx:20-31`) is missing `image` and `author` fields, and has no `dateModified` — Google's Article rich-result guidelines recommend both `image` and `author`; their absence may block rich-result eligibility.
- No site-wide `Organization` JSON-LD found (relevant for Knowledge Panel eligibility).
- Root `index.html` (dev entry) has only a generic title with no meta description/canonical — harmless since GitHub Pages serves `docs/index.html`, not this file, but worth being aware it's not representative of the live site.

| Recommendation | Severity |
|---|---|
| Add OG tags and JSON-LD (e.g. `SoftwareApplication`) to Monthly Withholding page for parity with other pages | Medium |
| Verify what `docs/annual-tax/index.html` actually contains; remove the dead Helmet block in `AnnualTaxWizard.tsx` if confirmed unused, or restructure so the real component's metadata is what gets prerendered | Medium |
| Add `image`, `author`, and `dateModified` to Article JSON-LD | Medium |
| Add a site-wide `Organization` JSON-LD block (e.g. on Home) | Low |

---

## 9. Sitemap

**Findings** (`docs/sitemap.xml`, generated by `scripts/prerender.mjs:56-77`):
- 32 URLs: 5 static routes + 27 article URLs, matching the prerendered `docs/` directory exactly. No stale or broken entries found.
- `noindex`'d pages (`/search`, `/privacy`, `/about`) are correctly excluded.
- Static-page `<lastmod>` is regenerated to "today" on every build regardless of whether content changed, making it a meaningless freshness signal for crawlers (not a correctness bug, just a missed signal).

| Recommendation | Severity |
|---|---|
| Derive `lastmod` for static pages from actual last-modified git/file dates rather than build time | Low |

---

## 10. robots.txt

**Findings:**
- `public/robots.txt` / `docs/robots.txt` (identical): `Allow: /` for all agents, correctly points to `https://mythaitaxes.com/sitemap.xml`.
- No stale `www.` references found anywhere in the repo; confirmed live that `www.mythaitaxes.com` 301-redirects to the non-www canonical domain, matching all canonical URLs in code.

No issues found.

---

## 11. Structured Data (JSON-LD)

Covered in detail under §8. Summary: `WebApplication` (Home), `SoftwareApplication` (Annual Tax fallback), `Article` + `BreadcrumbList` (Article pages), `FAQPage` (FAQ) are all present and structurally reasonable, but Article schema is missing recommended fields and there's no site-wide `Organization` schema.

---

## 12. Analytics

**Findings:**
- Client-side: Google Analytics (GA4, `G-0712ETQXV6`), Google AdSense (`ca-pub-4471962643516217`), and Ahrefs Analytics — all loaded `async` in `docs/index.html`, all disclosed in the Privacy Policy with opt-out guidance.
- Separate, unrelated: a Cloudflare Worker (`cloudflare-worker/mcp-server/`) exposing an MCP + REST API for AI agents to call the tax calculator programmatically, instrumented with Cloudflare Analytics Engine (`wrangler.toml`) purely for request-volume visibility. This has no bearing on site SEO/AdSense and is a distinct backend service — worth noting as a maintained surface, but out of scope for the front-end audit.

No issues found in what's implemented; disclosure is properly handled in the Privacy Policy.

---

## 13. Privacy / Terms / Disclaimer Pages

**Findings:**
- **Privacy Policy** (`/privacy`, `PrivacyPolicyPage.tsx`): thorough — covers sessionStorage-only input handling, explicitly discloses GA4/AdSense/Ahrefs with opt-out links, discloses the BOT exchange-rate proxy call, lists data NOT collected, GDPR/PDPA rights, and retention (including AdSense's 13-month cookie lifespan). Correctly `noindex`'d. Last updated 2026-06-28.
- **Disclaimer**: not a standalone page — lives inside `AboutPage.tsx` (lines 110-125) as an "Important disclaimer" section stating the site is for informational/estimation purposes only, is not professional tax advice, and links to `rd.go.th/english/`. Substantively fine, but not separately routable/discoverable (e.g. not linked from the calculator pages themselves where a user is most likely to want it).
- **Terms of Service**: **does not exist** — no route, no file, no content covering site usage terms, liability limitation, or acceptable use, distinct from the tax disclaimer.

| Recommendation | Severity |
|---|---|
| Add a dedicated Terms of Service page (usage terms, liability limitation) — commonly expected for AdSense-monetized sites and currently entirely absent | Medium |
| Link the tax disclaimer directly from calculator pages (Annual Tax, Monthly Withholding), not just from About | Low |

---

## 14. Forms / Contact Functionality

**Findings:**
- No contact form, feedback form, or newsletter signup exists anywhere in the codebase. The only contact mechanism is a plain `mailto:info@mythaitaxes.com` link, present on the About and Privacy pages.
- No user data submission occurs client-side beyond the BOT exchange-rate proxy call (currency + date only, per Privacy Policy).

No issues — this is a deliberately minimal, low-risk design (no server to secure, nothing to spam-protect). No action needed unless a form is added later, in which case validation/spam protection should be planned in.

---

## 15. Dependencies (deeper)

**Findings:**
- `@react-pdf/renderer` is statically imported (not dynamically) by `AnnualResultsStep.tsx` and `FreelancerResultsStep.tsx` — both reachable only inside the already-lazy `AnnualTaxWizard` chunk, but within that chunk the PDF library loads eagerly even for users who never click "download PDF," bloating the `/annual-tax` bundle.
- No dev-only packages (`tsx`, `vitest`, testing-library) are imported from production `src/` code — clean separation confirmed.
- `vite.config.ts` has no `manualChunks`/vendor-splitting config — Vite's default heuristics only.

| Recommendation | Severity |
|---|---|
| Dynamically `import()` `@react-pdf/renderer` only when the user actually triggers a PDF download, rather than statically importing it in the results step components | Medium |
| Consider `manualChunks` for large vendor deps (`@react-pdf/renderer`, `react-router-dom`) to improve caching | Low |

---

## 16. Performance

**Findings:**
- No large static assets (>100KB) exist in `public/`; no `src/assets` directory — imagery is not a bundle concern.
- Only `AnnualTaxWizard` is code-split; `MonthlyWithholding` and all page components load eagerly (see §2, §15).
- Three third-party scripts (GA, AdSense, Ahrefs) load `async` in `index.html` — non-blocking, but no `rel="preconnect"` hints exist for their origins, adding avoidable DNS/connection latency to LCP-adjacent metrics.
- SSG/prerendering via `scripts/prerender.mjs` gives good first-paint HTML for all static routes, which is the single biggest performance/SEO asset already in place.

| Recommendation | Severity |
|---|---|
| Add `<link rel="preconnect">` for `googletagmanager.com`, `pagead2.googlesyndication.com`, and `analytics.ahrefs.com` | Low |
| Code-split remaining eager page components (see §2) | Medium |

---

## 17. Accessibility

**Findings** (sampled: HomePage, MonthlyWithholding, IncomeInput/DeductionsInput, CompanyIncomeStep):
- `<html lang="en">` present and correctly carried into prerendered output.
- Heading hierarchy on HomePage looks correct — one `<h1>`, properly nested `<h2>`/`<h3>`, no skipped levels.
- Form inputs correctly paired with `<label htmlFor>`; MonthlyWithholding's wizard nav uses `aria-label` and `aria-valuenow/min/max` appropriately.
- No non-semantic clickable `<div>`s without `role`/`tabIndex` found in the sampled files (only real `<button>` elements handle `onClick`).
- `text-gray-500`/`text-gray-400` Tailwind utility classes are used directly (no custom theme tokens in `tailwind.config.js`) for body/secondary text — potentially borderline WCAG AA contrast on white backgrounds; not pixel-verified in this audit.
- No `<img>` tags found in sampled files (site is text/form-driven), so missing-alt-text risk appears low in the areas sampled, but a full `grep -rn "<img"` across all of `src/` was not exhaustively completed and should be spot-checked.

| Recommendation | Severity |
|---|---|
| Run an automated contrast check (e.g. axe/Lighthouse) specifically on `text-gray-500`/`text-gray-400` usages sitewide | Medium |
| Full sitewide grep for `<img>` tags to confirm alt-text coverage | Low |

---

## 18. Crawl / Indexing Problems

**Findings:**
- Every route in `scripts/prerender.mjs`'s route list (8 static + 27 articles) is genuinely SSR-rendered via `render()`, not left as an empty shell — confirmed against `docs/` output.
- The one caveat: `/annual-tax/` prerenders the Suspense fallback (rich static content with its own H1/H2/FAQ text and JSON-LD per `App.tsx:44-95`), not the real interactive wizard, since `React.lazy` cannot resolve during `renderToString`. This is a reasonable substitute page rather than an empty shell, but crawlers never see the actual calculator UI/markup for this route — worth being intentional about, especially since this is meant to be a core product page.
- Canonical domain is consistently non-www across code, `CNAME`, and live 301 redirects — no duplicate-content risk from domain variants.
- Minor trailing-slash inconsistency: Home canonical omits a trailing slash while all other pages include one — cosmetic, not a duplicate-content risk for a single root URL.

| Recommendation | Severity |
|---|---|
| Confirm intentionally that `/annual-tax/`'s prerendered fallback content is the desired crawler-facing page (it currently functions as adequate SEO substitute content); if the goal is to have real calculator markup indexed, this would need SSR-safe restructuring | Medium |
| Normalize trailing-slash convention across all canonical URLs | Low |

---

## Prioritized Action List

**Critical (address before any further calculator changes):**
1. ✅ ~~Resolve the `tax.ts` / `tax.tsx` naming collision~~ — done 2026-09-06, `tax.tsx` removed.
2. ✅ ~~Reconcile the conflicting tax-year and Social Security ceiling values~~ — done 2026-09-06, `TAX_YEAR_CONFIG` set to 2026 (user-confirmed), dead conflicting SSO constant removed.

**High:**
3. 🟡 Add source citations (URL, Revenue Department notification/order, effective date) for every tax constant — partially done (`taxForm.ts`); `taxConfig.ts` still needs citations, and the non-SSO 2026 figures in `TAX_CONSTANTS` still need independent verification.
4. 🔲 Consolidate the remaining duplicated bracket-table implementations (`expenseCalculations.ts:estimateTaxBracketRate`, `obligationChecks.ts:calculateProvisionalTax`) to reference a single source of truth — needs its own documented-behavior/approval cycle, not done this pass.
5. ✅ ~~Add unit tests for the canonical `calculateThaiTax`, bracket boundary values, and `calculateCompanyOwnerTax`~~ — done 2026-09-06.

**Medium:**
6. Add OG tags/JSON-LD to Monthly Withholding page; verify and fix the Annual Tax page's prerendered metadata/content.
7. Add `image`/`author`/`dateModified` to Article JSON-LD.
8. Add a Terms of Service page.
9. Dynamically import `@react-pdf/renderer` on demand rather than eagerly in results steps.
10. Code-split remaining eager page components.
11. Run a real contrast audit (axe/Lighthouse) on gray-text utility classes.
12. Decide intentionally whether `/annual-tax/`'s crawler-facing content should remain the fallback or expose real calculator markup.

**Low:**
13. Dependency hygiene: remove stale `@types/react-router-dom`, pick one test-DOM library, bump ESLint, align Vitest/Vite majors.
14. Add `rel="preconnect"` for third-party analytics/ad origins.
15. Derive sitemap `lastmod` from real content-change dates.
16. Normalize trailing-slash convention on canonical URLs.
17. Add site-wide `Organization` JSON-LD.
18. Link the tax disclaimer directly from calculator pages, not just About.
