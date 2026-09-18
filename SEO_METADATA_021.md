# TASK-021A — Metadata & SEO Metadata Audit

Audit only. No files outside this document were modified.

Read as part of this audit: `CLAUDE.md`, `CONTENT_INVENTORY.md`, `TAX_HUB_2026.md`, `INTERNAL_LINKING_020.md`, `src/App.tsx`, `src/main.tsx`, `src/entry-server.tsx`, `src/components/layout/Layout.tsx`, every page in `src/pages/`, `src/components/AnnualTaxWizard.tsx`, `src/components/MonthlyWithholding.tsx`, `src/data/articles.ts` (all 27 entries), `src/data/sources.ts`, `public/robots.txt`, `docs/sitemap.xml`, `scripts/prerender.mjs`, `index.html`, `cloudflare-worker/`.

**Note on `CONTENT_INVENTORY.md`**: several articles it flags as thin/weak (`understanding-thai-tax-residency`, `maximizing-tax-deductions-thailand`, `thai-tax-brackets-explained`, `foreign-income-thailand-tax`) have visibly been rewritten since that document was generated — their current titles/excerpts in `articles.ts` already reflect worked examples and original angles the inventory said were missing. This audit describes the **current** state of the code, not the inventory's snapshot.

---

## 1. Executive summary

The metadata layer is more mature than a typical AI-assisted site: every important page has a unique, hand-written title and description via `react-helmet-async`, canonical URLs are present almost everywhere, and there's real (if inconsistently applied) structured data (Article, FAQPage, BreadcrumbList, WebApplication, WebPage). The two biggest risks are not "missing metadata" — it's mostly present — but **consistency and correctness**:

1. **Brand suffix is inconsistent across pages** — "Thai Tax Calculator", "My Thai Taxes", and "MyThaiTaxes" (no space) are all used as the trailing brand string in different `<title>` tags, sometimes on the *same logical page* (see finding on `/annual-tax/` below).
2. **`/annual-tax/`'s pre-rendered (indexed) content and its post-hydration (user-visible) content disagree** — different title text, and the `SoftwareApplication` JSON-LD that Google sees in the static HTML disappears once the real calculator hydrates and overwrites the `<Helmet>` with a version that has no schema at all.
3. **Homepage canonical URL is missing its trailing slash** — `https://mythaitaxes.com` vs. every other page's `.../path/` convention (and vs. the sitemap's own `https://mythaitaxes.com/` entry for the same page).
4. **`/about/` is indexable but absent from `sitemap.xml`** — it has no noindex, links inbound exist, but the generator's `staticRoutes` array omits it.
5. **No Open Graph image or Twitter Card metadata anywhere on the site** — every social share will render as a bare text card.

None of these require touching tax logic, article content, or URL structure — they are metadata/template-layer fixes, consistent with `CLAUDE.md`'s guardrails.

---

## 2. Page-by-page metadata audit

### Core / product pages

| URL | Type | Current title | Current description | Canonical | Robots | OG | Schema | Search intent | Tax year | Priority |
|---|---|---|---|---|---|---|---|---|---|---|
| `/` | Home | `Thai Tax Calculator \| Free Thai Income Tax Calculator` | "Calculate your Thai income tax quickly and accurately. Free tool for salaried employees, freelancers, sole proprietors, and company owners in Thailand." | `https://mythaitaxes.com` (**no trailing slash** — inconsistent) | indexable | title/desc/url/type=website | `WebApplication` | Navigational / tool | Evergreen (D) | **Tier 1** |
| `/annual-tax/` | Calculator | SSR fallback: `Annual Tax Calculator \| Thai Tax Calculator`; hydrated: `Annual Tax Calculator \| My Thai Taxes` (**two different titles for one URL**) | Two different descriptions (see §14) | `https://mythaitaxes.com/annual-tax/` (both versions agree) | indexable | Only on SSR fallback | `SoftwareApplication` only on SSR fallback, **absent after hydration** | Calculation / tool | Evergreen, tax-year implicit in data (B) | **Tier 1** |
| `/monthly-withholding/` | Calculator | `Monthly Tax Withholding Estimator \| My Thai Taxes` | "Estimate how much Thai income tax should be withheld from your monthly salary. Free calculator for salaried employees and freelancers in Thailand." | `https://mythaitaxes.com/monthly-withholding/` | indexable | **None** (no og:title/description/url) | **None** — no JSON-LD at all, unlike `/annual-tax/` | Calculation / tool | Evergreen (B) | Tier 2 |
| `/articles/` | Hub/index | `Thai Tax Articles & Guides \| Thai Tax Calculator` | "Expert guides on Thai taxation covering freelancer tax, expat filing, deductions, tax residency, double tax agreements, and more." | `https://mythaitaxes.com/articles/` | indexable | title/desc/url/type=website | None | Navigational | Evergreen (D) | Tier 3 |
| `/faq/` | FAQ | `Thai Tax FAQ \| Frequently Asked Questions \| Thai Tax Calculator` | "Answers to common questions about Thai income tax: tax residency, deductions, filing deadlines, withholding tax, refunds, and more." | `https://mythaitaxes.com/faq/` | indexable | title/desc/url/type=website | `FAQPage` (all 44 Q&As) | Informational, varies per-Q | Evergreen (D) | Tier 3 |
| `/about/` | Static | `About \| My Thai Taxes` | "What My Thai Taxes is, why it was built, how the tax calculations work, how figures are sourced and reviewed, and who maintains the site." | `https://mythaitaxes.com/about/` | indexable (no noindex) | title/desc/url/type=website | None | Trust/E-E-A-T | Evergreen (D) | **Tier 1 (sitemap gap)** |
| `/contact/` | Static | `Contact \| My Thai Taxes` | "Report incorrect tax information, a calculator bug, or suggest a correction, or get in touch with My Thai Taxes." | `https://mythaitaxes.com/contact/` | indexable | title/desc/url/type=website | None | Transactional | Evergreen (D) | Low |
| `/methodology/` | Reference | `Calculator Methodology \| My Thai Taxes` | "How the My Thai Taxes annual calculator computes Thai personal income tax: assessable income, deductions, allowances, progressive brackets, and a fully worked example." | `https://mythaitaxes.com/methodology/` | indexable | title/desc/url/type=article | None (has a "Last reviewed" date but no `Article`/`TechArticle` schema) | Informational / methodology | Evergreen (D) | Tier 3 |
| `/sources/` | Reference | `Tax Sources & References \| MyThaiTaxes` | (registry/topic description — see below) | `https://mythaitaxes.com/sources/` | indexable | title/desc/url/type=website | None | Reference/trust | Evergreen (D) | Tier 3 |
| `/tax-examples/` | Reference/tool | `Thailand Income Tax Examples: Worked Calculations by Concept \| MyThaiTaxes` | "See how Thailand personal income tax is actually calculated — gross income to taxable income, progressive brackets, marginal vs. effective rate, deductions, and a full calculator walkthrough — with real worked numbers." | `https://mythaitaxes.com/tax-examples/` | indexable | title/desc/url/type=website | `WebPage` | Worked-example / informational | Evergreen, examples use current-config numbers (B) | Low |
| `/thailand-tax-2026/` | Hub | `Thailand Personal Income Tax 2026: Complete Overview \| MyThaiTaxes` | "How Thailand's 2026 personal income tax works: brackets, allowances, residency, foreign income, and filing — plus a free calculator to estimate what you owe." | `https://mythaitaxes.com/thailand-tax-2026/` | indexable | title/desc/url/type=website | `WebPage` | Tax-year overview | **2026-specific (A)** — correctly scoped | Low (already good) |
| `/privacy/` | Static | `Privacy Policy \| My Thai Taxes` | "Privacy policy for mythaitaxes.com — how we handle your data, the third-party services we use, and your rights." | `https://mythaitaxes.com/privacy/` | **noindex** (correct) | None (correct — noindex pages don't need OG) | None | — | — | — |
| `/search/` | Utility | `Search \| Thai Tax Calculator` (or `Results for "…" \| Thai Tax Calculator`) | "Search Thai tax articles and frequently asked questions." | `https://mythaitaxes.com/search/` | **noindex** (correct) | None | None | — | — | — |
| `/articles/:slug/` (×27) | Article | `{article.title} \| My Thai Taxes` | `{article.excerpt}` (reused for both meta description and og:description) | `https://mythaitaxes.com/articles/{slug}/` | indexable | title/desc/url/type=article + `article:published_time` | `Article` + `BreadcrumbList` | Informational (varies) | Varies — see §7 | See §15 |

### Sources page description (not shown above for space)

`SourcesPage.tsx`'s description references the registry directly; it's accurate to the page's actual content (18 sources, verification status) and not evaluated further — no issues found.

---

## 3. Title tag audit

**General assessment**: titles are specific, mostly differentiated, and not keyword-stuffed. The core problem is **brand-suffix inconsistency**, not quality of the descriptive part.

### Brand suffix inventory (verbatim strings currently in use)

| Suffix used | Pages |
|---|---|
| `\| Thai Tax Calculator` | Home, `/annual-tax/` SSR fallback, `/articles/`, `/faq/`, `/search/` |
| `\| My Thai Taxes` | `/annual-tax/` hydrated (AnnualTaxWizard), `/monthly-withholding/`, `/about/`, `/contact/`, `/privacy/`, `/methodology/`, all 27 article pages |
| `\| MyThaiTaxes` (no space) | `/sources/`, `/tax-examples/`, `/thailand-tax-2026/` |

Three different strings for what should be one brand identity. This isn't cosmetic-only: Google sometimes rewrites `<title>` tags in the SERP, and a consistent, recognizable suffix improves brand recognition in search results and reduces the odds of an unpredictable rewrite. **Recommend standardizing on one form** — see §16 for the specific recommendation (not decided unilaterally here since it's a brand choice, not a pure SEO fact).

### `/thailand-tax-2026/` (special attention, per task §4)

Current: `Thailand Personal Income Tax 2026: Complete Overview | MyThaiTaxes`. This already clearly signals "canonical overview," differentiates from the homepage, and correctly scopes the year to the title. **No change recommended** — this is the strongest title on the site already.

### `/annual-tax/` (special attention, per task §4)

Two different titles currently exist for the same URL depending on render phase (see §14, Tier 1). Once unified, the title should keep "Calculator" explicit (already true in both variants) — no tax-year needs to be forced into it, since the calculator computes against whatever `tax-data/` config is current, not a year baked into the URL. Recommend: **`Annual Tax Calculator | My Thai Taxes`** (drop the "Thai Tax Calculator" variant, keep the wizard's phrasing, standardize the suffix per §16).

### Specialist articles — differentiation check

Spot-checked the six clusters the task calls out (brackets, residency, foreign income, remittance, filing, deductions):

- **Brackets**: `Thai Income Tax Brackets 2025/2026: How Much You Actually Pay at Each Income Level` — clearly differentiated from the hub's "overview" framing; the `2025/2026` framing is honest (brackets unchanged since 2017, not a 2026-only fact) but is arguably stale phrasing now that 2026 is the current year and 2025 has closed — see §7.
- **Residency**: `Am I a Thai Tax Resident? The 180-Day Rule, Explained With Examples` — good, question-form title differentiates from other pages, no fake year attached (correct, since Section 41 residency is not 2026-specific).
- **Foreign income**: `What Counts as Foreign Income in Thailand — and When Does It Become Taxable?` — good, clearly the "conceptual entry point" per `TAX_HUB_2026.md`'s own designation.
- **Remittance**: `Transferring Money to Thailand: 2024 Tax Rules` — title says "2024" for a rule that's still current law in 2026. This is **accurate** (the rule took effect in 2024 and the title is naming *when the rule was introduced*, not claiming it's new) but could read as stale/wrong to a 2026 searcher scanning SERPs. Flagged for human judgment in §18 — not a clear-cut fix either way.
- **Filing**: `Thai Tax Return for Expats: PND 90/91 Guide` — fine, but as `TAX_HUB_2026.md` already notes, there's no single canonical filing hub; this, `pnd94-mid-year-tax-filing`, and `how-to-get-thai-tax-id-number` are three siblings whose titles don't signal their relationship to each other. Not a title-wording problem per se — an IA gap already documented in `INTERNAL_LINKING_020.md`.
- **Deductions**: `Thailand Tax Deductions 2026: Full Guide for Expats` — appropriately year-scoped since allowance *amounts* can change by year (even though 2026 amounts are unchanged from prior years per `TAX_RULES.md` — see §7's category B).

No two articles currently target the same title/intent — the cannibalization risk flagged in `CONTENT_INVENTORY.md` (foreign-income cluster, retirement cluster) has already been addressed by differentiated titles (conceptual vs. mechanics vs. credits vs. country-specific).

---

## 4. Meta description audit

Descriptions are generally accurate, non-generic, and describe real page content — a clear improvement over template-generated SEO copy. Specific notes:

- **No instance of "Everything you need to know…"** was found — good, matches the task's explicit anti-pattern warning.
- `thailand-tax-guide-for-expats`'s excerpt is "Everything foreigners need to know about Thai income tax — who pays, what income is taxed, how to file, and how to avoid double taxation." — this **is** the flagged anti-pattern phrase, used as this article's description. It's borderline-defensible since the article genuinely is a broad pillar page covering all four listed topics, but it's the one description on the site that reads as a generic claim rather than a specific one. Recommend rewording to name what's actually distinctive about this article (it's the general/pillar entry point, as opposed to the narrower specialist articles) rather than claiming completeness.
- **Article excerpt reused for both meta description and og:description** (`ArticleDetailPage.tsx:55,58`) — not wrong, but means there's no ability to write a shorter/punchier social-specific description if one is ever wanted. Low priority; flagged in §10.
- `/monthly-withholding/`'s description is accurate but nearly identical in structure/wording to `/annual-tax/`'s ("Free calculator for salaried employees and freelancers..." vs. "...for salaried employees, freelancers, sole proprietors, and company owners...") — acceptable since they are genuinely two different tools, but worth sharpening the withholding one to emphasize its distinct value (paycheck verification, not full annual liability) more in the first sentence rather than the second.

---

## 5. Search intent and cannibalization map

| Page | Primary intent | Competes with | Assessment |
|---|---|---|---|
| `/thailand-tax-2026/` | Tax-year overview / navigational | None directly — correctly positioned as the broad entry point | Good |
| `/` (home) | Navigational / tool-first | `/thailand-tax-2026/` only if the homepage tries to also "explain" the tax system | **Currently fine** — home stays tool/navigation-focused, hub owns the explanation. See §13 for the one thing to watch. |
| `thai-tax-brackets-explained` | Informational — "Thai tax brackets/rates" | Hub's brackets section (compact table only, correctly links out) | No cannibalization — hub explicitly defers to this article per `TAX_HUB_2026.md` §4 |
| `understanding-thai-tax-residency` | Informational — "180-day rule" | Hub's residency section (summary only) | No cannibalization |
| `foreign-income-thailand-tax` → `transferring-money-to-thailand-tax-rules` → `double-tax-agreements-thailand` | Conceptual → mechanics → credits (three distinct steps) | Each other, if any one tried to cover the full topic | Currently well-separated per the existing "conceptual/mechanics/credits" split; risk only if future edits blur the boundaries |
| `expat-guide-filing-thai-taxes` vs `pnd94-mid-year-tax-filing` vs `how-to-get-thai-tax-id-number` | Annual filing vs. mid-year filing vs. TIN registration | Low direct overlap (different sub-tasks), but no single page currently owns "filing overview" as a search intent | Gap already documented in `INTERNAL_LINKING_020.md` §16 — not a title/metadata fix, an IA gap |
| `/annual-tax/` (calculator) | Calculation / transactional | None — no article claims to *be* a calculator | Good |
| `/tax-examples/` | Worked-example / informational | `thai-tax-brackets-explained` (reuses example numbers) | Not cannibalizing — brackets article borrows *numbers*, not the page's search intent; both differentiated by title already |

**Recommendation**: do not add "Thailand tax 2026" phrasing to specialist articles' titles/descriptions to chase the hub's keyword — this would directly create the cannibalization the task warns against. The current split (hub = broad, articles = narrow) should be preserved as new metadata is written.

---

## 6. Tax-year handling audit

Per task §7's A/B/C/D framework, current title/description handling by page:

| Page/article | Category | Correctly framed today? |
|---|---|---|
| `/thailand-tax-2026/` | **A** — 2026-specific overview | Yes — title, H1, and content explicitly scope to 2026 and include a "what changed / unchanged" section per `TAX_HUB_2026.md` §7 |
| `maximizing-tax-deductions-thailand` (title says "2026") | **B** — current rule, year-labeled because amounts are the kind of thing that *could* change yearly, not because anything changed | Acceptable — the year signals "current as of," not "new in" |
| `thai-tax-brackets-explained` (title says "2025/2026") | **B**, but see below | The dual-year framing accurately reflects "unchanged since 2017, still current in both years" but is starting to read as stale/hedging now that 2025 has closed. Human call — see §18. |
| `transferring-money-to-thailand-tax-rules` (title says "2024") | **B** — rule effective 2024, still current law | Accurate as "year introduced," not "year this applies," but easy to misread — see §18 |
| `thailand-tax-guide-for-expats` (subtitle "(2025)") | **B**, stale | Title literally reads `Thailand Tax for Expats: Complete Guide (2025)` — this is the one clear case of a **stale year label** that should be updated (to 2026, or removed entirely and made evergreen) since nothing about the article's content is 2025-specific; it's a general pillar guide. **Tier 1.** |
| `understanding-thai-tax-residency` | **D** — evergreen (Section 41, statutory) | Correctly has no year in the title |
| `double-tax-agreements-thailand`, `thailand-tax-for-uk-expats`, `thailand-tax-for-us-expats` | **D** — evergreen (treaty mechanics don't change annually) | Correctly no year in title |
| `dtv-visa-thailand-tax-guide` | **D**-ish — visa program details can change, but title doesn't claim a year | No issue |
| `foreign-pension-income-thailand-tax`, `investment-income-retirees-thailand`, `thailand-retirement-visa-tax-obligations`, `pensioner-retiree-tax-guide-thailand` | **D** | No year claimed, correctly |

**Recommendation**: fix `thailand-tax-guide-for-expats`'s "(2025)" (Tier 1 — factually stale, not just a style choice). Leave the "2025/2026" and "2024" titles as human-review items (§18) rather than auto-changing them, since both readings are defensible and this task's guardrails explicitly forbid year changes without approval.

---

## 7. Canonical URL audit

- **Format**: every page except the homepage uses `${SITE_URL}/path/` with a trailing slash, matching the route structure and `docs/sitemap.xml`. **Homepage is the sole exception** — `HomePage.tsx:10,30` sets `const SITE_URL = 'https://mythaitaxes.com'` and uses it bare as the canonical (`<link rel="canonical" href={SITE_URL} />`), producing `https://mythaitaxes.com` with no trailing slash, while `docs/sitemap.xml` lists the same page as `https://mythaitaxes.com/`. **Tier 1** — a canonical/sitemap mismatch on the single highest-priority URL on the site.
- **Domain**: every canonical, every sitemap entry, and `robots.txt`'s `Sitemap:` line consistently use the bare apex domain `https://mythaitaxes.com` (no `www`). This is internally consistent. **Side note, not a page-metadata issue**: `cloudflare-worker/bot-proxy.js` and `cloudflare-worker/mcp-server/` reference `https://www.mythaitaxes.com` in a few places (an allowlist entry and an MCP server manifest) — worth a human check that `www.mythaitaxes.com` actually redirects to the apex domain (or 200s identically) so those infra references don't imply a second live host; out of scope to fix here since it's not page metadata.
- **Self-canonicalization**: every page canonicalizes to itself; no cross-page canonical pointing was found.
- **No duplicate routes with conflicting canonicals** were found — each route in `App.tsx` maps to exactly one canonical URL.
- **`/search/`**: canonical points to the bare `/search/` even when a query string is present (`?q=...`) — correct behavior (prevents indexing of infinite query-parameter variants), and the page is also `noindex`, so this is belt-and-suspenders, not an issue.

---

## 8. Indexability audit

| Page | Indexable? | Should be? | Notes |
|---|---|---|---|
| `/`, `/annual-tax/`, `/monthly-withholding/`, `/articles/`, `/articles/:slug/` (×27), `/faq/`, `/about/`, `/contact/`, `/methodology/`, `/sources/`, `/tax-examples/`, `/thailand-tax-2026/` | Yes | Yes | All correctly indexable, all in sitemap **except `/about/`** (see below) |
| `/privacy/` | No (`noindex`) | Correctly no | Legal boilerplate, no search value |
| `/search/` | No (`noindex`) | Correctly no | Query-parameter utility page, correctly excluded from both indexing and the sitemap |
| `/about/` | **Yes** (no noindex meta) | Yes | **Missing from `docs/sitemap.xml`** — `scripts/prerender.mjs:57`'s `staticRoutes` array is `['/', '/monthly-withholding/', '/annual-tax/', '/articles/', '/faq/', '/methodology/', '/sources/', '/tax-examples/', '/thailand-tax-2026/', '/contact/']` — `/about/` is absent. It's indexable and linked-to (footer, `/contact/`) but Google has to discover it via crawling rather than the sitemap. **Tier 1.** |

No query-parameter pages other than `/search/?q=...` were found. No other duplicate-content routes exist (each article slug is unique, no tag/category archive pages exist that would need pagination-canonical handling).

---

## 9. Open Graph / Twitter audit

- **og:title / og:description / og:url / og:type** are present and accurate on every indexable page except `/monthly-withholding/`, which has **no Open Graph tags at all** (only title/description/canonical) — inconsistent with every other indexable page, including its sibling `/annual-tax/`. Tier 2.
- **og:image**: **absent on every single page on the site**, including `index.html`'s static head. A shared link (Slack, WhatsApp, LINE — relevant given the site's likely expat/Thailand audience) will render as a bare text card with no visual, which is a real trust/click-through cost for a site this far along in polish elsewhere.
- **Twitter/X card metadata**: not present anywhere. Not necessarily needed if the site doesn't have a Twitter/X presence to attribute (`twitter:site`/`twitter:creator` would be empty anyway), but `twitter:card`, `twitter:title`, `twitter:description` would still improve rendering on X even without an account handle.
- Per the task's explicit instruction not to invent social copy the site doesn't support: recommend reusing the existing `title`/`description` values for `og:title`/`og:description` (already the pattern) and for `twitter:title`/`twitter:description` if added — no new copy needs to be written, only a default share image needs to be designed/sourced.

---

## 10. Structured data audit

| Schema type | Used on | Accuracy check |
|---|---|---|
| `WebApplication` | `/` (homepage) | Accurate — the site is free, web-based; `offers` correctly states price 0 THB |
| `SoftwareApplication` | `/annual-tax/` — **but only in the SSR-prerendered fallback markup**, not in the hydrated `AnnualTaxWizard` component | Present in the static HTML Google crawls; **absent from what a JS-executing crawler or a real user's DOM sees after hydration** (see §14, Tier 1) — this is the most significant structured-data finding on the site |
| — (none) | `/monthly-withholding/` | No schema at all for the second calculator — inconsistent with `/annual-tax/`'s (partial) `SoftwareApplication` schema. If `/annual-tax/` gets a `SoftwareApplication` schema, `/monthly-withholding/` arguably should too, once the `/annual-tax/` fix (§14) establishes the correct pattern. |
| `Article` | Every article page (`ArticleDetailPage.tsx`) | Fields used: `headline`, `description`, `url`, `datePublished`, `publisher`. Accurate to content. **Minor issue**: `publisher.name` is hardcoded `'Thai Tax Calculator'` — yet another brand-name variant, distinct from both `<title>` suffixes in use (§3). No `dateModified` is emitted even though some articles clearly have been revised after `publishedAt` (e.g., `thailand-tax-guide-for-expats` was likely edited given its "(2025)" label predates the current 2026 content) — `Article` schema supports `dateModified` and the site has no separate `updatedAt` field per `CONTENT_INVENTORY.md`'s own note, so this can't be fixed without a data-model change (out of scope here, flagged for future work). |
| `BreadcrumbList` | Every article page | Accurate 3-level breadcrumb (Home → Articles → Article title); matches the visible "← Back to Articles" link's implied hierarchy |
| `FAQPage` | `/faq/` | Accurate — all 44 Q&As mapped 1:1 into `mainEntity` |
| `WebPage` | `/thailand-tax-2026/`, `/tax-examples/` | Minimal but accurate (`name`, `description`, `url`) — appropriately conservative, not over-claiming |

**Calculator schema type question (task §11 special mention)**: `SoftwareApplication` is the correct choice for `/annual-tax/` and (if added) `/monthly-withholding/` — these are genuinely interactive, JS-driven tools that compute a result client-side, not merely article-like `WebPage`s. No change recommended to the *type* — the issue is the delivery mechanism (§14), not the schema choice.

**No misleading or invented schema properties were found** — `offers.price: '0'` is accurate (free), `applicationCategory: 'FinanceApplication'` is accurate, no `aggregateRating`, `review`, or other unverifiable schema properties are present anywhere (good — nothing to flag as fabricated).

---

## 11. Breadcrumb audit

- **Structured data**: only article pages have `BreadcrumbList` JSON-LD.
- **Visible UI breadcrumbs**: none exist anywhere on the site as a true breadcrumb component. What exists instead are single "← Back to X" links (Articles page from an article, "← Back to the 2026 tax overview" from `/methodology/` and `/sources/`). These serve some of the same wayfinding purpose but are not a breadcrumb trail (they show one step back, not the full hierarchy).
- **Would breadcrumbs help?** Yes, in two specific places:
  1. **Article pages** — currently only "← Back to Articles"; a full trail (Home → Articles → [Category] → Article, or Home → 2026 Tax Guide → Article) would better reflect the cluster hierarchy `INTERNAL_LINKING_020.md` already documents, and would match the existing `BreadcrumbList` schema (which is more complete than the visible UI already).
  2. **`/methodology/`, `/sources/`, `/tax-examples/`** — these currently only have a single "← Back to the 2026 tax overview" link (or none, for `/tax-examples/`, which has no back-link at all despite being a similarly deep page) — a real breadcrumb (Home → 2026 Tax Guide → Methodology) would be more consistent and would also pick up `/tax-examples/`, which is currently the one deep reference page with no upward navigation.
- Not implemented here per task instructions — flagged for a future task.

---

## 12. Homepage metadata recommendations

**Current**: title `Thai Tax Calculator | Free Thai Income Tax Calculator`, description focuses on the tool itself.

**Assessment**: correctly avoids competing with `/thailand-tax-2026/` for "how does Thai tax work" intent — the homepage stays tool-first ("calculate," "free tool for X/Y/Z"), the hub stays explanation-first ("how Thailand's 2026 personal income tax works"). This separation should be preserved.

**Recommended changes**:
1. Fix the canonical trailing-slash bug (§7) — this is a correctness fix, not a wording change.
2. Consider whether the homepage should link to `/thailand-tax-2026/` prominently as "the entry point for understanding the system" while keeping its own metadata calculator-focused — this is a content/IA question already partially covered by `TAX_HUB_2026.md` §11's recommendation that the homepage link to the hub; confirm that link exists and is prominent (out of scope to verify further here — a UI check, not a metadata one).
3. No title/description wording change is otherwise needed — it's accurate and appropriately scoped.

---

## 13. Calculator metadata recommendations (`/annual-tax/`)

Per task §14, what the calculator actually does (per `TAX_HUB_2026.md`'s own calculator-integration section, itself derived from `taxCalculations.ts`/`foreignIncomeCalculations.ts`): computes annual PIT for salaried employees, freelancers, sole proprietors, and company owners, including foreign-income/DTA/LTR logic, gated by 180-day residency — but does **not** classify a specific remittance as capital vs. income, determine which treaty article governs a specific pension, or (per `TAX_RULES.md`'s backlog) fully compute sole-proprietor business tax despite `BUSINESS_FLAT_RATE_DEDUCTIONS` existing in the data layer.

**Metadata implications**:
- Do not add "official" framing (e.g., "the official Thai tax calculator") — neither current title uses this word; correct, keep it that way.
- Do not claim foreign-income support in the title (too narrow a claim for a title) but the description may continue to mention it, since it's true — the SSR fallback in `App.tsx` doesn't currently mention foreign income at all in its copy, while `AnnualTaxWizard.tsx`'s own description explicitly does ("including foreign income and double tax agreement scenarios"). Once unified (§14), prefer the more complete/accurate wording.
- The description should continue to say "estimates" (both current variants do — "Estimate your annual..." / "Calculate your annual..."). Recommend standardizing on "Estimate," since "Calculate" reads slightly more authoritative/exact than the tool claims to be, and "estimate" is the word `CLAUDE.md`'s trust/transparency goal would favor.

---

## 14. `/annual-tax/` — the central finding (detailed)

This is the single most important issue in this audit, so it's broken out from the general table.

`src/App.tsx` routes `/annual-tax` to a `<Suspense>` boundary whose **fallback** (rendered during SSR/pre-render, per `MEMORY.md`: `AnnualTaxWizard` "Not pre-rendered (renders Suspense fallback in SSR)") contains its own `<Helmet>` block:
```
<title>Annual Tax Calculator | Thai Tax Calculator</title>
<meta name="description" content="Calculate your annual Thai income tax liability. Free calculator for salaried employees, freelancers, sole proprietors, and company owners in Thailand." />
<script type="application/ld+json">{...SoftwareApplication schema...}</script>
```
Once the real `AnnualTaxWizard` component (`src/components/AnnualTaxWizard.tsx:544-548`) loads and replaces the fallback, **its own** `<Helmet>` overwrites the document head with:
```
<title>Annual Tax Calculator | My Thai Taxes</title>
<meta name="description" content="Calculate your annual Thai personal income tax liability. Step-by-step calculator for salaried employees, freelancers, sole proprietors, and company owners in Thailand." />
```
— no JSON-LD at all.

**Why this matters**: Googlebot generally does execute JavaScript and waits for a render, but it is not guaranteed to wait for lazy-loaded chunks to fully replace Suspense fallbacks, and other crawlers/parsers (social-link unfurlers, some SEO tools, `react-helmet-async`'s own last-write-wins behavior) may capture either the fallback's or the wizard's version unpredictably. Practically:
- **Structured data is unreliable** — a rendering pass that captures the hydrated state loses the `SoftwareApplication` schema entirely, since the wizard's `<Helmet>` doesn't re-declare it.
- **Title/description are simply inconsistent** — two different, both individually reasonable, strings exist for one URL, which is the kind of thing that produces unpredictable SERP snippets if Google caches one version and a user later shares/re-crawls the other.

**Recommendation (metadata-only fix, does not touch calculator logic)**: make `AnnualTaxWizard.tsx`'s `<Helmet>` block the single source of truth — include the `SoftwareApplication` JSON-LD there too (copy of the object already defined in `App.tsx:21-39`, ideally extracted to a shared constant so it isn't duplicated), and either remove the fallback's `<Helmet>` entirely (letting the wizard's tags apply once hydrated, with the fallback relying on whatever title was already set — risky, since pre-render needs *some* title present) or make the two blocks byte-identical. Given `MEMORY.md`'s note that `/annual-tax/` is *not* pre-rendered with real content (only the fallback), the safest fix is: **keep both `<Helmet>` blocks, but make their title/description/schema identical**, sourced from one shared constant file (e.g. `src/data/calculatorMeta.ts`) imported by both `App.tsx` and `AnnualTaxWizard.tsx`. This is a small, mechanical, low-risk change — flagged Tier 1 because of the structured-data and duplicate-title impact, not because it requires design judgment.

---

## 15. Article metadata audit (all 27)

- **Title vs. H1**: identical on every article (`ArticleDetailPage.tsx:83-85` renders `{article.title}` directly as the H1, and the same string feeds the `<title>` tag before the ` | My Thai Taxes` suffix) — fully consistent, no drift anywhere. This is good practice and should be preserved.
- **Title vs. content**: spot-checked against `articles.ts` excerpts; no title over-promises content the article doesn't have (e.g., the residency article's title claims "Explained With Examples" and the excerpt independently confirms "worked day-count examples" exist).
- **Description vs. content**: excerpts read as accurate summaries, not generic filler, across all 27 — consistent with `CONTENT_INVENTORY.md`'s note that the more recently-written articles (2026-dated) are original and well-differentiated.
- **Duplicate/near-duplicate titles**: none found among the current 27 titles — the cannibalization risk `CONTENT_INVENTORY.md` flagged for the foreign-income and retirement clusters has been resolved at the title level (each article's title now names its specific angle: conceptual / mechanics / credits / country-specific / visa-specific).
- **Missing tax-year framing**: only one clear case — `thailand-tax-guide-for-expats`'s "(2025)" (§6, Tier 1). No article is missing a year where one is actually needed; no article wrongly omits a year.
- **Weak descriptions**: `thailand-tax-guide-for-expats`'s "Everything foreigners need to know..." (§4) is the one description worth revisiting; no others matched the task's listed anti-patterns.
- **Pages needing stronger differentiation**: none — see cannibalization map (§5).

---

## 16. `/thailand-tax-2026/` recommendations

Already strong; the recommendations below are refinements, not fixes:

- **Title**: keep `Thailand Personal Income Tax 2026: Complete Overview | MyThaiTaxes` — already communicates "canonical 2026 overview" per the task's explicit requirement. Only change: standardize the brand suffix (see below).
- **H1**: `Thailand Personal Income Tax 2026: The Complete Overview` — matches the title closely (differs only by "The"), fine as-is.
- **Meta description**: already good — states brackets/allowances/residency/foreign income/filing/calculator in one sentence, accurately reflecting the page's actual 12-section structure per `TAX_HUB_2026.md` §3.
- **Canonical**: `https://mythaitaxes.com/thailand-tax-2026/` — correct, absolute, matches convention.
- **Breadcrumb position**: should be Home → 2026 Tax Guide (a 2-level trail) once breadcrumbs are implemented (§11) — it's a direct child of home, not nested under Articles.
- **Differentiation from homepage**: already correctly separated (§12) — homepage stays tool-first, hub stays explanation-first.
- **Differentiation from individual articles**: already correct per `TAX_HUB_2026.md` §4's summary-and-link pattern — no change needed.

**Sitewide brand-suffix recommendation**: standardize every page's `<title>` suffix to **`| My Thai Taxes`** (the form already used on the most pages — 27 articles plus 5 static pages), and update the 3 `MyThaiTaxes`-suffixed pages (`/sources/`, `/tax-examples/`, `/thailand-tax-2026/`) and the 5 `Thai Tax Calculator`-suffixed pages (home, `/annual-tax/` fallback, `/articles/`, `/faq/`, `/search/`) to match, plus the `Article` schema's `publisher.name` (currently `'Thai Tax Calculator'`) and `AnnualTaxWizard`'s title. This is offered as a recommendation, not a unilateral decision — it's a brand-identity call, flagged for human sign-off in §18.

---

## 17. SEO hierarchy (conceptual, per task §17)

```
Homepage (/)
  — tool-first entry point, links to both calculators and the hub
    ↓
Thailand Tax 2026 Hub (/thailand-tax-2026/)
  — canonical "how does it work" overview
    ↓
Specialist guides (27 articles, in 6 clusters: Tax Basics, Foreign Income/Remittance,
Filing, Freelance, Retirement, Country-specific)
    ↓
Worked examples (/tax-examples/) & Methodology (/methodology/)
  — deeper, numbers-first resources shared across clusters
    ↓
Calculator & tools (/annual-tax/, /monthly-withholding/)
  — the action step
```

Supporting/trust pages (`/sources/`, `/about/`, `/contact/`, `/faq/`) sit alongside this spine rather than within it — each reachable from anywhere via the footer, none competing for the spine's search intents. This matches the actual site structure found in `INTERNAL_LINKING_020.md` §2-3 and requires no structural change — only the metadata fixes above.

---

## 18. Metadata quality scoring

Scored 1–10 (10 = no issues). Only structurally important pages scored individually; the 27 articles are scored as a cohort with named exceptions.

| Page | Title | Description | Search-intent alignment | Uniqueness | Tax-year clarity | Canonical/indexability | Overall priority |
|---|---|---|---|---|---|---|---|
| `/` | 8 | 9 | 9 | 9 | 10 (n/a) | 6 (trailing-slash bug) | Tier 1 |
| `/annual-tax/` | 5 (two titles) | 6 (two descriptions) | 9 | 9 | 10 (n/a) | 5 (schema disappears post-hydration) | **Tier 1 — highest priority on site** |
| `/monthly-withholding/` | 8 | 8 | 9 | 9 | 10 (n/a) | 6 (no OG, no schema) | Tier 2 |
| `/thailand-tax-2026/` | 10 | 10 | 10 | 10 | 10 | 9 | Low (already strong) |
| `thailand-tax-guide-for-expats` | 6 (stale "(2025)") | 6 (generic phrase) | 8 | 8 | 4 (stale year) | 9 | Tier 1 |
| `thai-tax-brackets-explained` | 7 (dual-year hedge) | 9 | 9 | 9 | 6 (human call, §18 below) | 9 | Tier 2/human review |
| `transferring-money-to-thailand-tax-rules` | 7 ("2024" reads dated) | 9 | 9 | 9 | 7 (accurate but ambiguous) | 9 | Human review |
| Other 24 articles | 9 avg | 9 avg | 9 avg | 9 avg | 9 avg | 9 avg | Low |
| `/about/` | 9 | 9 | 9 | 9 | 10 (n/a) | 4 (sitemap gap) | Tier 1 |
| `/methodology/`, `/sources/`, `/tax-examples/` | 9 | 9 | 9 | 9 | 9 | 8 | Tier 3 (brand suffix only) |
| `/faq/`, `/articles/` | 8 | 8 | 8 | 8 | 9 | 9 | Tier 3 (brand suffix only) |
| `/privacy/`, `/search/` | 9 | 9 | n/a (noindex) | n/a | n/a | 10 | — (correctly excluded) |

**Overall metadata priority**: fix the `/annual-tax/` split-metadata issue first (§14) — it's the core product page and the only place structured data is actually unreliable. Everything else is a same-day, low-risk cleanup once decided.

---

## 19. Tier 1 / Tier 2 / Tier 3 implementation plan

### Tier 1 — Critical
1. **Unify `/annual-tax/` metadata** (§14) — one title, one description, one `SoftwareApplication` schema shared between `App.tsx`'s Suspense fallback and `AnnualTaxWizard.tsx`, ideally via one shared constants file.
2. **Fix homepage canonical trailing slash** (§7) — `https://mythaitaxes.com` → `https://mythaitaxes.com/`.
3. **Add `/about/` to `scripts/prerender.mjs`'s `staticRoutes` array** so it's included in `docs/sitemap.xml` (§8).
4. **Fix `thailand-tax-guide-for-expats`'s stale "(2025)" title** (§6) — factually outdated now, not a style preference; update to 2026 or make evergreen.

### Tier 2 — Important
5. Add Open Graph tags to `/monthly-withholding/` (currently the only indexable page missing them entirely) (§9).
6. Add a `SoftwareApplication` schema to `/monthly-withholding/` once the `/annual-tax/` pattern is fixed, for consistency between the two calculators (§10).
7. Standardize the brand suffix across all `<title>` tags and the `Article` schema's `publisher.name` to one form (recommend `| My Thai Taxes`, pending sign-off) (§3, §16).
8. Reword `thailand-tax-guide-for-expats`'s meta description away from the "Everything...need to know" pattern (§4).
9. Human review: decide whether `thai-tax-brackets-explained`'s "2025/2026" and `transferring-money-to-thailand-tax-rules`'s "2024" title-year framing should be updated now that 2026 is fully current (§3, §6, §18) — both are factually defensible as written, so this is a judgment call, not a correctness fix.

### Tier 3 — Optional
10. Design/add a default Open Graph share image (site-wide) and, if desired, per-article images; add `twitter:card`/`twitter:title`/`twitter:description` meta tags reusing existing title/description values (§9).
11. Implement visible breadcrumb UI (not just JSON-LD) on article pages and on `/methodology/`, `/sources/`, `/tax-examples/` (§11).
12. Add `Article`/`TechArticle` schema to `/methodology/` (currently has no structured data despite being a full explainer page with a "last reviewed" date) (§2, §10).
13. Investigate whether `www.mythaitaxes.com` (referenced in `cloudflare-worker/`) correctly resolves/redirects to the apex domain used everywhere in page metadata (§7) — infra check, not a page-metadata fix.

---

## 20. Exact files likely to change (for the follow-up implementation task)

| File | Tier | Change |
|---|---|---|
| `src/App.tsx` | 1 | Unify `/annual-tax/` Suspense-fallback `<Helmet>` with `AnnualTaxWizard.tsx`'s, ideally via a shared constant |
| `src/components/AnnualTaxWizard.tsx` | 1 | Same as above; add `SoftwareApplication` schema |
| `src/pages/HomePage.tsx` | 1 | Fix canonical trailing slash |
| `scripts/prerender.mjs` | 1 | Add `/about/` to `staticRoutes` |
| `src/data/articles.ts` | 1 | Update `thailand-tax-guide-for-expats`'s `title` (drop/update "(2025)"); reword its `excerpt` (Tier 2) |
| `src/components/MonthlyWithholding.tsx` | 2 | Add OG tags + `SoftwareApplication` schema |
| `src/pages/*.tsx` (all, for brand-suffix pass), `src/pages/ArticleDetailPage.tsx` (title template + `publisher.name`) | 2 | Standardize brand suffix once a form is chosen |
| `src/data/articles.ts` (2 titles: brackets, remittance) | Human review | Only if the year-framing decision (§19 item 9) is approved |
| `index.html`, a new `src/data/socialMeta.ts` or similar, `public/` (new image asset) | 3 | Default OG image + Twitter Card tags |
| `src/pages/ArticleDetailPage.tsx`, `src/pages/MethodologyPage.tsx`, `src/pages/SourcesPage.tsx`, `src/pages/TaxExamplesPage.tsx` | 3 | Visible breadcrumb component |
| `src/pages/MethodologyPage.tsx` | 3 | Add `Article`/`TechArticle` schema |

No changes to `src/utils/taxCalculations.ts`, `src/utils/foreignIncomeCalculations.ts`, `tax-data/2026/*.json`, `src/config/taxConfig.ts`, or any URL structure — nothing in this plan touches calculation logic or routing, consistent with `CLAUDE.md`'s technical-change guardrail.

---

## 21. Issues requiring human review (not decided by this audit)

1. **Brand suffix choice** — `| My Thai Taxes` vs `| MyThaiTaxes` vs `| Thai Tax Calculator` vs something new. This audit recommends `| My Thai Taxes` (majority usage today) but the actual brand name is a product decision, not an SEO fact.
2. **Year-in-title framing for `thai-tax-brackets-explained` ("2025/2026")** and **`transferring-money-to-thailand-tax-rules` ("2024")** — both are factually accurate as written; whether they should be updated for freshness-perception reasons is a judgment call requiring someone to weigh "accurate but reads dated" against "changing a URL-adjacent title needs a reason beyond cosmetics."
3. **Whether `www.mythaitaxes.com` is a live, correctly-redirecting alias** of the apex domain — referenced in `cloudflare-worker/` but not used anywhere in page-level canonical/OG metadata; needs a live check outside this codebase audit's scope.
4. **Whether a default OG share image should be a static brand graphic or per-page-type templated image** — a design decision, not addressed here beyond flagging that one currently doesn't exist at all.
5. **No single canonical "Filing" hub article exists** (re-confirmed from `INTERNAL_LINKING_020.md` §16) — affects filing-cluster title/description strategy long-term; out of scope for a metadata-only task since it would require new content.
