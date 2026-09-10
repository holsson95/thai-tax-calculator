# TASK-020A — Internal Linking Audit & Architecture

Design document only. No site, calculator, tax-data, or article changes were made in this task.

---

## 0. What already exists (read this first)

Before proposing anything new, here's what the codebase already has — several of the patterns this
task asks about are already built, just not consistently applied everywhere:

- **Curated related-articles map** — `src/data/articles.ts:3360-3403` (`RELATED_MAP` + `getRelatedArticles`).
  This is **not** keyword-based: it's a hand-authored `slug → [related-slug, related-slug]` table with a
  2-article fallback (`how-to-use-the-thai-tax-calculator`, `thai-tax-brackets-explained`) for any slug not
  in the map. This already matches the task's "no automated keyword linking" philosophy. Gap: only 2 related
  links per article (task asks for 2-4), and a few mappings are stale/misaligned (see §9).
- **Calculator CTA block** — inlined directly in `src/pages/ArticleDetailPage.tsx:158-175` (blue box, "Ready
  to calculate your tax?" → `/annual-tax/`) and again, differently worded, in
  `src/pages/ThailandTax2026Page.tsx:340-374`. Same visual pattern, copy-pasted twice, not a shared component.
- **Related Articles section** — `ArticleDetailPage.tsx:177-189`, renders `getRelatedArticles()` output via
  the existing `ArticleCard` component. Already exists, already reusable at the data layer.
- **Official source display** — `src/components/OfficialSource.tsx`, already a reusable component (used on
  `ThailandTax2026Page.tsx` for the residency threshold). Each article also carries its own `sources` array
  (rendered at `ArticleDetailPage.tsx:135-156`) — this is a per-article citation list, separate from the
  site-wide `/sources/` registry (`src/data/sources.ts`, 18 sources / 10 topics, powers `SourcesPage.tsx`).
  **These two source layers do not currently link to each other** — no article links to `/sources/`, and
  `/sources/` doesn't link back to the articles that cite each source (see §9).
- **Worked examples** — `src/data/taxExamples.ts`, 8 engine-computed examples (`simple-employee`,
  `lower-income-employee`, `middle-income-employence` [sic: `middle-income-employee`], `high-income-employee`,
  `bracket-threshold-below`, `bracket-threshold-above`, `deductions-impact`, `calculator-walkthrough`),
  rendered via `TaxExampleCard` on `/tax-examples/`. `thai-tax-brackets-explained` already pulls 5 of these
  directly into its own article content via `requireExample()` (`articles.ts:32-62`) — the article and
  `/tax-examples/` literally share the same computed numbers. This is the strongest existing example of the
  "shared source of truth, not duplicated content" pattern this task is asking for more of.
- **2026 tax hub** (`/thailand-tax-2026/`, `src/pages/ThailandTax2026Page.tsx`) — already built (not just
  designed — `TAX_HUB_2026.md` was the design doc, the page now exists and is routed in `App.tsx:114`). It
  already links out to brackets, deductions, residency, foreign income (3-way split), filing (3 articles),
  examples, calculator, methodology, sources, and a "Related guides" section. This is close to the target
  state for a hub page already.
- **Footer** (`src/components/layout/Footer.tsx`) — sitewide nav to Calculator, 2026 Tax Guide, Articles,
  FAQ, About, Methodology, Sources, Examples, API, Privacy, Contact. Present on every non-wizard page, so
  every page is technically 1 click from every top-level section already.

**What's genuinely missing**, per the inbound-link grep below: most articles don't link to the hub, to
`/tax-examples/`, or to `/sources/`, and the related-articles map caps at 2 links where 2-4 would better
serve genuine next-questions. This document's recommendations focus on closing those specific gaps, not
rebuilding what's there.

---

## 1. Current internal-link audit

Method: grepped `src/data/articles.ts` for markdown links (`[text](/path)`) inside article `content` fields,
plus the reusable/page-level links described in §0.

| Link target | Articles linking to it (of 27) |
|---|---|
| `/thailand-tax-2026/` (hub) | 3 |
| `/tax-examples/` | 2 |
| `/sources/` | 0 |
| `/methodology/` | 0 |
| `/annual-tax/` (contextual, inside body text — separate from the CTA block every article gets) | 5 |
| Other articles (contextual) | Concentrated on a handful of slugs — `transferring-money-to-thailand-tax-rules` (6 inbound mentions), `understanding-thai-tax-residency` (4), `double-tax-agreements-thailand` (3) |

Every article also gets, unconditionally regardless of the above:
- 1 calculator CTA (`ArticleDetailPage.tsx:158-175`)
- Up to 2 related articles via `RELATED_MAP`/`getRelatedArticles` (`ArticleDetailPage.tsx:177-189`)
- Its own `sources` array, if populated (`ArticleDetailPage.tsx:135-156`)

**Conclusion**: the *navigation* layer (CTA + related articles) is systematic and already reasonably
well-curated. The *contextual* layer (in-body links to the hub, to examples, to the source registry) is
thin and concentrated on 2-3 heavily-cited articles, with most of the other 24 linking to none of those
three targets at all.

---

## 2. Canonical content hierarchy

```
                         2026 TAX HUB  (/thailand-tax-2026/)
                    canonical front door — "how does it work"
                                    |
        +---------------+----------+----------+------------------+
        |               |          |          |                  |
   TAX ARTICLES     CALCULATOR   EXAMPLES   METHODOLOGY        SOURCES
   (27, grouped   (/annual-tax/  (/tax-    (/methodology/    (/sources/,
   into clusters   /monthly-     examples/, step-by-step      18 sources,
   below)          withholding/) 8 worked   walkthrough)      10 topics)
                    the tool,    examples)
                    never "just
                    another link")
```

### Topic clusters (derived from the `category` field + actual content overlap, not invented)

| Cluster | Canonical / hub article | Supporting articles |
|---|---|---|
| **Tax basics** | `thai-tax-brackets-explained` (brackets) + `understanding-thai-tax-residency` (residency) — two co-canonical basics, not one | `maximizing-tax-deductions-thailand`, `how-to-use-the-thai-tax-calculator` |
| **Foreign income / remittance** | `foreign-income-thailand-tax` (conceptual entry point) → `transferring-money-to-thailand-tax-rules` (mechanics, CONTENT_INVENTORY.md calls this "the strongest treatment") → `double-tax-agreements-thailand` (credits/treaties) | `digital-nomad-taxes-thailand`, `dtv-visa-thailand-tax-guide` (both re-touch remittance but shouldn't re-explain it) |
| **Filing** | No single hub article exists — `expat-guide-filing-thai-taxes` (PND90/91) is the closest thing to canonical | `pnd94-mid-year-tax-filing`, `how-to-get-thai-tax-id-number` |
| **Freelance** | `freelancer-tax-guide-thailand` (explicitly called a hub in CONTENT_INVENTORY.md) | `flat-rate-vs-actual-expenses`, `withholding-tax-freelancers-thailand`, `vat-registration-freelancers`, `pnd94-mid-year-tax-filing`, `freelancer-record-keeping-thailand`, `digital-nomad-taxes-thailand` |
| **Retirement** | `pensioner-retiree-tax-guide-thailand` (hub) | `foreign-pension-income-thailand-tax`, `investment-income-retirees-thailand`, `thailand-retirement-visa-tax-obligations`, `ltr-visa-tax-benefits` |
| **Country-specific expat** | No single hub; `thailand-tax-guide-for-expats` is the general-expat pillar page | `thailand-tax-for-uk-expats`, `thailand-tax-for-us-expats` |
| **Visa-and-tax intersection** | Split across `dtv-visa-thailand-tax-guide` and `ltr-visa-tax-benefits` — no single canonical page | — |
| **Standalone (own topic, no cluster)** | `social-security-contributions-thailand`, `rental-income-tax-thailand` | — |

---

## 3. Page relationship map

Only the highest-traffic / structurally important pages — not all 32 URLs get a full row, per the task's
"reasonable number of links, not exhaustive automation" instruction.

| Page | Type | Primary topic | Search intent | Canonical role | Recommended outbound | Recommended inbound |
|---|---|---|---|---|---|---|
| `/thailand-tax-2026/` | Hub | 2026 Thai PIT overview | "how does Thai income tax work" | Front door | Brackets, deductions, residency, foreign income (3), filing (3), examples, calculator, methodology, sources, related guides — **already implemented**, see §0 | Footer (done), every cluster hub article (residency, foreign income, freelancer hub, retiree hub) should link *up* to it — currently only 3 do |
| `/annual-tax/` | Calculator (tool) | Compute annual tax liability | "calculate my Thai tax" | The core product | None needed — a tool, not a content page | Every article via its CTA block (done, systematic); hub (done) |
| `/monthly-withholding/` | Calculator (tool) | Estimate monthly withholding | "Thai payroll withholding estimate" | Secondary tool | None needed | Hub (done); `withholding-tax-freelancers-thailand` should link here contextually — currently doesn't |
| `/articles/understanding-thai-tax-residency/` | Article | 180-day rule | "am I a Thai tax resident" | Canonical residency explainer | Foreign income (next question), filing, hub | `thailand-tax-guide-for-expats`, `foreign-income-thailand-tax`, `dtv-visa-thailand-tax-guide`, `how-to-get-thai-tax-id-number` (all currently link in — good); should also gain inbound from hub's "does this apply to you" section (done) |
| `/articles/foreign-income-thailand-tax/` | Article | What counts as foreign income | "is my foreign income taxable in Thailand" | Canonical conceptual entry to remittance cluster | Residency (prerequisite), remittance mechanics, DTA, calculator | `transferring-money-to-thailand-tax-rules`, `double-tax-agreements-thailand`, `digital-nomad-taxes-thailand` (per `RELATED_MAP`) |
| `/articles/transferring-money-to-thailand-tax-rules/` | Article | Remittance mechanics (Por. 161/2566) | "how does the remittance rule actually work" | Canonical remittance-mechanics article | Foreign income (conceptual), DTA (credits) | Foreign income, DTA (per `RELATED_MAP`) — this is the most-linked-to article already (6 inbound contextual mentions) |
| `/articles/thai-tax-brackets-explained/` | Article | Progressive brackets | "Thai tax brackets/rates" | Canonical bracket explainer | Deductions (next question — what reduces taxable income), examples, calculator | `maximizing-tax-deductions-thailand`, `rental-income-tax-thailand` (per `RELATED_MAP`) |
| `/articles/freelancer-tax-guide-thailand/` | Article | Freelancer tax overview | "how are freelancers taxed in Thailand" | Hub of the freelance cluster | Expense method comparison, withholding, VAT, PND94, record-keeping | 5 of 6 freelance-cluster siblings already point here via `RELATED_MAP` |
| `/articles/pensioner-retiree-tax-guide-thailand/` | Article | Retiree tax overview | "retiring in Thailand tax" | Hub of the retirement cluster | Pension income, investment income, retirement visa, LTR visa | 3 of 4 retirement-cluster siblings point here via `RELATED_MAP` |
| `/tax-examples/` | Examples index | 8 worked examples | "Thai tax calculation example" | Canonical worked-example destination | Calculator | Only 2 articles link here currently — should be the biggest gap closed (§9, §13) |
| `/sources/` | Source registry | 18 sources, 10 topics | (not a search-intent page — trust/verification) | Canonical citation destination | — | **0 articles link here** — biggest structural gap (§9, §13) |
| `/methodology/` | Methodology | Step-by-step calc walkthrough | "how is Thai tax actually calculated" | Canonical calculation-method explainer | Calculator | **0 articles link here** despite being exactly what "how to use the calculator" and "brackets" articles should point to |
| `/faq/` | FAQ | 44 Q&As, 8 categories | Varies per question | Structured Q&A | — | Hub (done); per CONTENT_INVENTORY.md, individual FAQ answers aren't sourced or cross-linked to articles — a gap, not addressed in this task per its scope (no article rewrites) |

---

## 4. Link matrix

Only links with a clear "next question" rationale. This is not exhaustive — see §13 for what to actually
implement first.

| Source Page | Destination | Relationship | Why User Needs It | Priority |
|---|---|---|---|---|
| Residency (`understanding-thai-tax-residency`) | Foreign income (`foreign-income-thailand-tax`) | Next question | Once you know you're a resident, the next question is what income that makes taxable | High (already linked via `RELATED_MAP`) |
| Residency | 2026 Tax Hub | Overview / context | Reader landing here from search may want the full-system picture, not just one rule | Medium — add contextual link, hub already links in |
| Foreign income | Remittance mechanics (`transferring-money-to-thailand-tax-rules`) | Deeper explanation | Conceptual article should route to the mechanics article rather than re-explain Por. 161/2566 | High (already linked, both directions) |
| Foreign income | DTA (`double-tax-agreements-thailand`) | Related concept | If income is taxable, the next question is whether a treaty credit applies | High (already linked via `RELATED_MAP`) |
| Tax brackets | Deductions (`maximizing-tax-deductions-thailand`) | Prerequisite/next question | Brackets apply to taxable income, which depends on deductions — natural sequencing | High (already linked via `RELATED_MAP`) |
| Tax brackets | `/tax-examples/` | Practical application | Shows brackets applied to real numbers — brackets article already borrows 5 of these examples' *numbers* but doesn't currently link to the page itself | High — gap, see §13 Tier 1 |
| Tax brackets | `/methodology/` | Deeper mechanics | Methodology has the full step-by-step; brackets article explains one step of it | Medium |
| How to Use the Calculator | `/annual-tax/`, `/monthly-withholding/` | Direct tool access | This article's entire purpose is routing to the tools | High (already present) |
| How to Use the Calculator | `/methodology/` | Explains what the tool computes | A reader learning "how to use" the calculator may want to understand what it's doing under the hood | Medium — gap |
| Freelancer hub | Flat-rate vs actual expenses | Deeper explanation | The single highest-value freelancer decision (expense method) | High (already linked) |
| Freelancer hub | VAT registration | Compliance threshold question | Natural next question once income is established | Medium (already linked via cluster siblings, not from hub article itself — verify) |
| Retiree hub | Foreign pension income | Deeper explanation | Most retirees' primary income source | High (already linked) |
| Retiree hub | LTR visa benefits | Decision guidance | Visa choice materially changes tax outcome for retirees | Medium (already linked via `thailand-retirement-visa-tax-obligations`, not directly from the hub article — verify) |
| Any article citing a specific rate/threshold in its own `sources` list | `/sources/` | Verification / trust | Reader wants to check verification status, not just the one raw source URL | High — **0 articles do this today** (§13 Tier 1) |
| Cluster hub articles (residency, foreign income, freelancer hub, retiree hub) | `/thailand-tax-2026/` | Overview / broader context | Gives the 2026-specific framing the individual article doesn't restate | Medium — only 3/27 articles do this today (§13 Tier 2) |
| `/sources/` | Articles that cite each source | Reverse navigation | Reader checking a source's verification status likely wants the article that used it | Low/Tier 3 — genuinely new work, not just closing a gap |

---

## 5. Recommended calculator CTA pattern

**Reuse, don't duplicate.** The CTA block already exists in two places with near-identical markup
(`ArticleDetailPage.tsx:158-175`, `ThailandTax2026Page.tsx:340-374`) and slightly different copy. Extract
into a single `CalculateTaxCTA` component (see §12) with props for heading/subtext, so future pages (e.g. a
future "filing" hub, if one is ever built) reuse it instead of re-inlining a third copy.

- Every tax-relevant article keeps exactly 1 CTA (already true via `ArticleDetailPage.tsx`).
- The hub keeps its own, larger CTA block (two buttons: annual + monthly) — don't force it into the
  single-button article variant; make the component accept a `variant` or `secondaryAction` prop instead.
- Pages that are *not* tax-relevant (About, Privacy, Contact, Search) should **not** get a CTA — see §15.

---

## 6. Recommended related-guides pattern

Keep `RELATED_MAP` — it's already the right mechanism (curated, not keyword-matched). Two concrete changes:

1. **Raise the limit from 2 to up to 4** (`getRelatedArticles(currentSlug, limit = 2)` → default `4`, or
   pass `4` explicitly from `ArticleDetailPage.tsx`), and extend `RELATED_MAP` entries from 2-tuples to
   2-4-length arrays. Only add a 3rd/4th entry where there's a genuine next-question — don't pad every
   article to exactly 4 for symmetry.
2. **Audit stale/misaligned entries** before extending (see §9 for specifics — e.g.
   `social-security-contributions-thailand` → `freelancer-tax-guide-thailand` is a weak pairing; SSO is an
   employment-income topic, not a freelance one).

Do not add a "related guides" section that duplicates `RELATED_MAP`'s job elsewhere (e.g. don't also
hand-write related links inside article body content unless it's a genuine in-context reference — see §10).

---

## 7. Recommended related-examples pattern

Currently, no article has a "Related Examples" section — only `thai-tax-brackets-explained` uses example
*data* (via `requireExample()`) without linking to `/tax-examples/` itself, and `how-to-use-the-thai-tax-calculator`
is one of the 2 articles that does link there.

Recommended: a small `RelatedExamples` component (see §12) that takes 1-3 example IDs and renders compact
links (title + income level), for articles where a specific example genuinely illustrates the article's
point:

| Article | Relevant example(s) | Why |
|---|---|---|
| `thai-tax-brackets-explained` | `lower-income-employee` (400k), `middle-income-employee` (1M), `high-income-employee` (5M), `bracket-threshold-below`/`bracket-threshold-above` | Already uses these numbers inline — add the link to `/tax-examples/` (or per-example anchors, if the examples page supports them) so the reader can see the full engine breakdown, not just the article's excerpt |
| `maximizing-tax-deductions-thailand` | `deductions-impact` | Directly demonstrates the deduction-amount-changes-tax-owed point this article argues |
| `how-to-use-the-thai-tax-calculator` | `calculator-walkthrough` | Walks through the exact scenario (married employee, child) the calculator article describes using the tool for |

**Gap, not invented**: no existing example covers freelance/business income, foreign income/remittance, or
retirement-specific scenarios (all 8 examples are salaried-employee scenarios at different income levels —
confirmed via `src/data/taxExamples.ts`). Freelancer-cluster, retirement-cluster, and foreign-income articles
have **no appropriate example to link to today** — documented here as a content gap (§16), not filled with
an irrelevant link.

---

## 8. Official-source linking pattern

Two source layers exist and currently don't connect:

1. **Per-article `sources` array** — every article's own citations, rendered at the bottom of the article
   page (`ArticleDetailPage.tsx:135-156`). This stays as-is; it's the direct citation for that article's claims.
2. **Site-wide `/sources/` registry** (`src/data/sources.ts`) — 18 sources grouped into 10 topics, each
   flagged official/secondary, with a single shared `REGISTRY_LAST_REVIEWED` date.

**Recommended pattern**: add one link per article, near the existing sources block, of the form "See the
full source registry and verification status →	`/sources/`" — not a duplicate list, just a pointer from the
article's own (smaller) citation list to the site's (larger) verification registry. This is a single
sentence per article, not a new list to maintain per article.

Do **not** merge the two lists or replace per-article `sources` with links into `/sources/` — the per-article
list is what lets a specific claim in that specific article be checked against its specific source; the
registry is for browsing/verifying at the site level. Keep both.

---

## 9. Anchor-text audit and recommendations

Current anchor text in `articles.ts` content is already fairly natural (not keyword-stuffed) — spot-checked
examples: "remittance rules article", "Learn how to get one here", "LTR visa categories". A few
recommendations to keep this consistent as more contextual links are added:

- Avoid repeating the exact article title as anchor text every time (e.g. `transferring-money-to-thailand-tax-rules`
  is linked with its full title 4 of 6 times — vary with phrases like "how the remittance rule actually works"
  or "when a later-year transfer still counts").
- For the new `/sources/` and `/methodology/` links recommended above, use natural framing ("see how this
  figure is verified", "see the full calculation walkthrough") rather than "click here" or repeating "Methodology"/"Sources" verbatim every time.
- **`RELATED_MAP` entries to review before extending** (found while building §3-4, not invented):
  - `social-security-contributions-thailand` → `['freelancer-tax-guide-thailand', 'maximizing-tax-deductions-thailand']`.
    SSO is an *employment* topic (its own `category: 'Employment'`), not a freelance one — the freelancer-hub
    link is a weak pairing purely because both are "money taken out of your paycheck." Consider swapping in
    `how-to-use-the-thai-tax-calculator` (SSO contributions feed into deduction calculations) or leaving as
    fallback-only.
  - `digital-nomad-taxes-thailand` → `['dtv-visa-thailand-tax-guide', 'foreign-income-thailand-tax']` is
    reasonable but the article itself (per CONTENT_INVENTORY.md) "overlaps with foreign-income-thailand-tax/remittance
    cluster" — worth also linking to `transferring-money-to-thailand-tax-rules` if a 3rd related slot is added.

---

## 10. Contextual vs. navigation links

- **Navigation links** (systematic, same position on every article page): calculator CTA, related articles,
  per-article sources list. Already built; changes recommended above are additive (raise related-articles
  limit, add a `/sources/` pointer line), not structural.
- **Contextual links** (inside article prose): currently concentrated on ~6 articles that happen to mention
  remittance/residency in passing. Recommendation: when an article's prose states a fact that has its own
  canonical article (e.g. "if you're a tax resident" → link `understanding-thai-tax-residency`), link it
  **once**, at first mention, not every time the phrase recurs. Do not add a contextual link for every
  occurrence of "tax resident," "deduction," "foreign income," etc. — this is the exact keyword-spam pattern
  the task instructs against.

---

## 11. Reusable component recommendations

| Component | Status | Recommendation |
|---|---|---|
| `CalculateTaxCTA` | **Does not exist** — same markup duplicated in `ArticleDetailPage.tsx` and `ThailandTax2026Page.tsx` | Extract. Genuine duplication today, not speculative. |
| `RelatedGuides` | **Partially exists** — `getRelatedArticles()` (data layer) + inline `<section>` + `ArticleCard` (render layer) in `ArticleDetailPage.tsx`, not extracted as a component | Extract only if a second page needs a related-guides section (e.g. if `/tax-examples/` or `/sources/` later gets one). Not urgent — currently only one consumer. |
| `RelatedExamples` | **Does not exist** | Build new (see §7) — first real consumer would be `thai-tax-brackets-explained`, `maximizing-tax-deductions-thailand`, `how-to-use-the-thai-tax-calculator`. |
| `OfficialSources` | **Exists** (`OfficialSource.tsx`), currently used once (hub page, residency stat) | Reuse as-is for any new inline "here's a specific verified figure" callout; don't build a second version. |
| `TaxHubCTA` | **Does not exist** | Not clearly justified yet — only 3 articles currently link to the hub, and a generic "go read the hub" box risks being lower-value than a targeted sentence like the ones in §9. Recommend a plain contextual link (not a boxed CTA component) for hub-inbound links; revisit as a component only if hub-linking becomes systematic across many more articles. |

Building all 5 named components regardless of actual duplication would be overengineering — only
`CalculateTaxCTA` has clear, already-existing duplication justifying extraction today.

---

## 12. Recommended architecture

```
                         2026 TAX HUB (/thailand-tax-2026/)
                                     |
        +---------------+-----------+-----------+------------------+
        |               |           |           |                  |
   TAX ARTICLES     CALCULATOR   EXAMPLES   METHODOLOGY          SOURCES
        |          (/annual-tax/  (/tax-    (/methodology/)    (/sources/)
   +----+----+----+ /monthly-    examples/)
   |    |    |    | withholding/)
Basics Foreign Filing  Freelance   Retirement   Country-specific
(brackets, (income→ (PND90/91,   hub          hub            (UK, US guides)
residency)  remittance→  PND94,   (7 articles)  (4 articles)
            DTA)         TIN)
```

This matches the actual site structure found in §2-3 more closely than the task prompt's illustrative
diagram — filing has no single canonical article (3 siblings, no hub), and country-specific guides sit
under the general expat pillar page rather than as their own top-level branch.

---

## 13. Implementation priority

### Tier 1 — Must do
1. Add a "See the full source registry →	`/sources/`" line to every article's existing sources block
   (`ArticleDetailPage.tsx`, template-level change — one line, not per-article content edits).
2. Add `/tax-examples/` links (via a new `RelatedExamples` component, §7) to the 3 articles with a directly
   matching example: `thai-tax-brackets-explained`, `maximizing-tax-deductions-thailand`,
   `how-to-use-the-thai-tax-calculator`.
3. Add a "See the full 2026 overview →	`/thailand-tax-2026/`" contextual link to the cluster-hub articles
   that don't yet have one: `understanding-thai-tax-residency`, `foreign-income-thailand-tax`,
   `freelancer-tax-guide-thailand`, `pensioner-retiree-tax-guide-thailand` (currently 3/27 articles link to
   the hub; these 4 are the highest-traffic candidates, not all 27).

### Tier 2 — Should do
4. Extract `CalculateTaxCTA` as a shared component (§5, §12) — pure refactor, no link-graph change, but
   removes the two-copies-of-the-same-markup maintenance risk.
5. Raise `getRelatedArticles` limit from 2 to up to 4 and extend `RELATED_MAP` for articles with a clear 3rd/4th
   next-question (§6) — not all 27 need 4; only extend where genuine.
6. Fix the `social-security-contributions-thailand` related-articles pairing (§9).
7. Add a `/methodology/` link from `thai-tax-brackets-explained` and `how-to-use-the-thai-tax-calculator`
   (both currently 0-linked to methodology despite direct topical overlap).

### Tier 3 — Nice to have
8. Reverse links from `/sources/` back to the articles citing each source (new work, not a gap-close —
   requires deciding how `sources.ts` maps to article slugs, which doesn't exist today).
9. Contextual (not navigation-block) links for the remaining articles that mention residency/foreign-income/
   filing in passing but don't yet link out, following the "link once, at first mention" rule (§10).
10. Extract `RelatedGuides` as a standalone component if/when a second page needs the pattern.

Do not implement all 10 items in one pass — Tier 1 alone touches the shared `ArticleDetailPage.tsx` template
plus new links on ~7 articles, which is already a meaningful, reviewable unit of work.

---

## 14. Exact files that should change during implementation

| File | Change |
|---|---|
| `src/pages/ArticleDetailPage.tsx` | Add "see full source registry" line near sources block (Tier 1); raise related-articles `limit` (Tier 2); swap inline CTA markup for `CalculateTaxCTA` (Tier 2) |
| `src/data/articles.ts` | Extend `RELATED_MAP` entries (Tier 2); no changes to `content` fields required for Tier 1/2 unless adding in-body contextual links (Tier 3) — those would be per-article `content` edits, explicitly out of scope for this task ("Do NOT rewrite articles") |
| `src/components/CalculateTaxCTA.tsx` (new) | Extracted CTA component (Tier 2) |
| `src/components/RelatedExamples.tsx` (new) | New component (Tier 1) |
| `src/pages/ThailandTax2026Page.tsx` | Swap its own CTA block for `CalculateTaxCTA` with a two-button variant (Tier 2) |
| `src/data/sources.ts` | Only touched if Tier 3 reverse-linking is implemented — would need an article-slug reference added per source |

No changes to `src/utils/tax*.ts`, `src/config/taxConfig.ts`, `tax-data/2026/*.json`, or any calculator
component — this task does not touch calculation logic, per `CLAUDE.md`'s technical rule.

---

## 15. Pages that should NOT receive additional links

- `/privacy/` — legal page, intentionally isolated, noindex. No CTA, no related content.
- `/search/` — utility page, noindex. No CTA, no related content.
- `/about/` — trust/E-E-A-T page; a light, single link to `/contact/` is reasonable but it should not carry
  a calculator CTA or related-articles block — it's not a tax-content page.
- `/contact/` — transactional page (bug reports, corrections). No CTA, no related-articles.
- Any article already at or near its related-articles cap (2-4) should not have links added purely to "use
  up" unused slots — several articles will correctly stay at 2 related links because a 3rd genuine
  next-question doesn't exist (e.g. `vat-registration-freelancers` → freelancer hub + record-keeping is a
  complete, non-padded set).

---

## 16. Content gaps discovered (not filled — documented per task instructions)

- **No worked example exists for freelance/business income, foreign income/remittance, or retirement-specific
  scenarios.** All 8 entries in `src/data/taxExamples.ts` are salaried-employee scenarios at varying income
  levels. This blocks a genuine "Related Examples" link for the entire freelance cluster (7 articles),
  retirement cluster (4 articles), and foreign-income cluster (3 articles) — 14 of 27 articles have no
  appropriate example to link to. Out of scope to build here (would be new calculator-engine-backed content,
  not a linking change), but worth flagging as the single highest-leverage future content addition for
  internal linking specifically.
- **No single canonical "Filing" hub article** — `expat-guide-filing-thai-taxes`, `pnd94-mid-year-tax-filing`,
  and `how-to-get-thai-tax-id-number` are three siblings with no parent overview page, unlike the freelance
  and retirement clusters which each have one. Not filled here (would require new content), but means the
  hub page's own "Filing" section (`ThailandTax2026Page.tsx:270-286`) is currently doing double duty as the
  de facto filing overview.
- **FAQ answers are not individually sourced or cross-linked to articles** — confirmed still true (per
  `CONTENT_INVENTORY.md`'s existing note and re-verified in `FAQPage.tsx`/`src/data/faq.ts` during this
  audit). Explicitly out of scope for this task (would require editing FAQ content), noted for a future task.
- **`/sources/` has no inbound links from any article** (§1, §4) — the highest-value single gap identified
  in this audit; addressed in Tier 1 (§13) as a template-level link, not per-article content editing.
