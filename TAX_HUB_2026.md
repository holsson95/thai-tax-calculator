# TASK-019A — Thailand Tax 2026 Hub: Implementation Brief

Design document only. No code, calculator, tax-data, or article changes were made in this task.

Route under design: `/thailand-tax-2026/`

---

## 1. Current-site audit

**Routes** (`src/App.tsx`): `/`, `/monthly-withholding`, `/annual-tax` (the two calculators), `/articles`, `/articles/:slug` (27 articles), `/faq`, `/search`, `/privacy`, `/about`, `/methodology`, `/sources`, `/tax-examples`, `/contact`. No `/thailand-tax-2026/` route exists yet, and nothing resembling a topic hub exists — `/articles/` is a flat chronological/alphabetical list, not a structured entry point.

**Existing audit documents already in the repo** (this task builds on them rather than re-deriving them):
- `CONTENT_INVENTORY.md` — per-article word count, duplication, and thinness audit (27 articles).
- `TAX_RULES.md` + `tax-data/2026/*.json` — every tax constant used by the calculator, sourced, verification status flagged.
- `TAX_EXAMPLES.md` + `src/data/taxExamples.ts` — 8 calculator-engine-verified worked examples, rendered at `/tax-examples/`.
- `src/data/sources.ts` — curated display layer over the registry, powers `/sources/` (18 sources, 8 official/10 secondary, grouped by 10 topics).
- `src/pages/MethodologyPage.tsx` — narrates the salaried-employee calculation step-by-step with a full worked example (800,000 THB gross → 48,500 THB tax).

**Articles relevant to the hub's 10 required topics** (slug → role):

| Topic | Canonical article(s) | Notes |
|---|---|---|
| Tax brackets | `thai-tax-brackets-explained` | Thin (218 words) per inventory, but is the canonical bracket article; bracket table is also reproduced in `MethodologyPage.tsx` and `/tax-examples/`. |
| Allowances & deductions | `maximizing-tax-deductions-thailand`, `how-to-use-the-thai-tax-calculator` | Inventory flags overlap between these two; `how-to-use-the-thai-tax-calculator` has the more complete allowance table. |
| Tax residency | `understanding-thai-tax-residency` | Thin (204 words), canonical 180-day-rule article; also re-explained (duplicated) in `thailand-tax-guide-for-expats` and `dtv-visa-thailand-tax-guide`. |
| Filing | `expat-guide-filing-thai-taxes` (PND90/91), `pnd94-mid-year-tax-filing` (PND94), `how-to-get-thai-tax-id-number` (TIN) | Three separate filing-adjacent articles; no single filing-overview page. |
| Foreign income | `foreign-income-thailand-tax` (conceptual overview — the article visible in this session's IDE selection), `transferring-money-to-thailand-tax-rules` (remittance mechanics — inventory calls this "the strongest treatment of the remittance-rule cluster"), `double-tax-agreements-thailand` (DTA/credit mechanics) | Three-way split by design after the recent rewrite of `foreign-income-thailand-tax` (see IDE selection): conceptual → mechanics → credits. |
| Calculator | `/annual-tax/`, `/monthly-withholding/`, `how-to-use-the-thai-tax-calculator` | The two calculator routes are the actual tools; the article explains how to use them. |
| Methodology | `/methodology/` | Already exists as a dedicated page — not an article. |
| Worked examples | `/tax-examples/` | Already exists as a dedicated page with 8 engine-verified examples. |
| 2026 changes | **No dedicated page exists.** | See §7 — this is a genuine gap, not an oversight to paper over. |

**FAQ** (`src/data/faq.ts`): 8 categories, 44 Q&As — Expats Moving to Thailand, Pensioners & Retirees, Tax Residency, Deductions & Allowances, Filing & Deadlines, Income & Withholding, Refunds & Payments, Working in Thailand as a Foreigner. Not sourced per-answer (flagged as a gap in `CONTENT_INVENTORY.md`).

**Sources page** (`/sources/`): topic-grouped, links out to primary/secondary sources; does not currently link back to any hub-style page.

**Internal linking today**: Footer (`src/components/layout/Footer.tsx`) links to Calculator, Articles, FAQ, About, Methodology, Sources, Examples, API, Privacy, Contact — flat list, no hub concept yet. `/articles/` page is the closest thing to a directory but has no topic structure.

---

## 2. Purpose of the hub

`/thailand-tax-2026/` is the canonical **front door** for "how does Thai personal income tax work in 2026" search intent. It does not replace any existing page — it orients a first-time visitor and routes them to the calculator (to act) or to the specialist articles/pages (to go deep), while stating plainly what, if anything, is actually new for 2026.

It is justified under `CLAUDE.md`'s content rule because it adds **original explanation** (the cross-topic roadmap and decision guidance no single article currently provides), **useful tables** (2026 bracket/allowance/deduction quick-reference), and **practical decision guidance** ("which section do I need") — not word count for its own sake.

---

## 3. Recommended information architecture

```
/thailand-tax-2026/

H1: Thailand Personal Income Tax 2026: The Complete Overview

[Intro — 2-3 sentences: who this is for, what it covers, link to calculator]

[On-page contents / jump nav — anchor links to each section below]

1. Does this apply to you? (residency framing, 2 short paths: resident / non-resident)
2. How Thai income tax works (income → deductions → allowances → taxable income → brackets → credits → tax owed) — visual flow, original value #1
3. 2026 tax brackets (compact table + link to full article)
4. Allowances & deductions (compact table + link to full article)
5. Tax residency (180-day rule summary + link to full article)
6. Foreign income (conceptual summary + links to the 3 specialist articles)
7. Filing (who/when/how summary + links to PND90/91, PND94, TIN articles)
8. What's new for 2026 (explicit changed vs. unchanged list — original value #2)
9. Worked examples (2-3 selected from /tax-examples/, "see all 8" link)
10. Calculator (clear CTA block, "learn vs. calculate" distinction — original value #3)
11. Methodology & sources (how figures are verified, link to /methodology/ and /sources/)
12. Related guides (freelancer cluster, retirement cluster, country-specific US/UK guides)

[Footer disclaimer: estimates only, not tax advice, verify with RD/professional]
```

Each numbered section is a **summary block** (2-4 sentences + optionally one compact table) followed by a "Read the full guide →" link. No section should exceed what's needed to answer "does this apply to me / what's the headline fact," per the anti-duplication rule.

---

## 4. Existing pages/articles to reuse and link (not duplicate)

| Hub section | Canonical destination | Why it stays canonical |
|---|---|---|
| Brackets detail | `/articles/thai-tax-brackets-explained/` | Already has the marginal-vs-effective-rate worked example (per `TAX_EXAMPLES.md`, numbers are engine-sourced). |
| Allowances/deductions detail | `/articles/maximizing-tax-deductions-thailand/` + `/articles/how-to-use-the-thai-tax-calculator/` | Latter has the fuller table; inventory already recommends eventually consolidating these two — hub should link to both until that consolidation happens, not decide it here. |
| Residency detail | `/articles/understanding-thai-tax-residency/` | Canonical 180-day-rule article (explicitly named as such in the `foreign-income-thailand-tax` article's own "Which Article Do I Need?" section). |
| Foreign income conceptual | `/articles/foreign-income-thailand-tax/` | Recently rewritten (per IDE selection) specifically to be "the conceptual starting point" — the hub should follow the same delegation pattern this article already models. |
| Remittance mechanics | `/articles/transferring-money-to-thailand-tax-rules/` | Named by `CONTENT_INVENTORY.md` as "the strongest treatment of the remittance-rule cluster." |
| DTA/foreign tax credit | `/articles/double-tax-agreements-thailand/` | Only article covering credit mechanics in general (vs. country-specific). |
| Filing (annual) | `/articles/expat-guide-filing-thai-taxes/` | PND90/91 walkthrough. |
| Filing (mid-year) | `/articles/pnd94-mid-year-tax-filing/` | PND94-specific. |
| TIN registration | `/articles/how-to-get-thai-tax-id-number/` | Registration steps. |
| Calculator | `/annual-tax/`, `/monthly-withholding/` | The actual tools — never reproduce their logic on the hub. |
| Methodology | `/methodology/` | Full step-by-step calculation narrative already exists; hub links, doesn't restate. |
| Worked examples | `/tax-examples/` | 8 engine-verified examples already exist; hub selects 2-3, links to "see all." |
| Sources | `/sources/` | 18-source, topic-grouped registry already exists; hub should not re-list sources, only cite the specific figures it states inline plus one link to `/sources/`. |
| Retirement cluster | `/articles/pensioner-retiree-tax-guide-thailand/` (hub of that cluster) | Existing hub-of-a-cluster pattern the site already uses — the new hub should link to this hub, not the 3 sub-articles individually, to avoid a link explosion. |
| Freelancer cluster | `/articles/freelancer-tax-guide-thailand/` (hub of that cluster) | Same pattern. |
| Country-specific | `/articles/thailand-tax-for-us-expats/`, `/articles/thailand-tax-for-uk-expats/` | Link from the "does this apply to you" or foreign-income section as "if you're American/British specifically." |

**No new supporting article is required** to cover the 10 required topics — every topic already has a canonical destination. The only genuinely new content is the hub page itself and the "what changed in 2026" section (§7), which does not warrant a separate article since it's inherently a short, cross-cutting summary.

---

## 5. Content that should be written directly on the hub (net-new prose)

1. **Intro** (2-3 sentences) framing the hub's purpose and audience.
2. **"Does this apply to you?"** — a short resident/non-resident split, since this framing doesn't exist anywhere else on the site as an entry-point question (the residency *article* explains the rule; nothing currently opens with "which path are you on").
3. **"How Thai income tax works" flow** — income → deductions → allowances → taxable income → brackets → credits → tax owed. This relationship is implicit across the methodology page and calculator but has never been stated as a single at-a-glance sequence.
4. **"What changed for 2026" section** — net-new, see §7. This does not exist anywhere on the site today.
5. **Section connective tissue** — one or two sentences per topic section stating the headline fact (e.g., "Thailand taxes residents on worldwide remitted income and non-residents only on Thai-sourced income") before linking out.
6. **"Which section do I need?" quick-nav** (optional, could be the on-page contents itself rather than a separate block).

Everything else is a compact table (reusing already-verified figures from `tax-data/2026/*.json` via the same constants the calculator/methodology page use — never hand-typed) or a link.

---

## 6. Content that should NOT be duplicated

- The full 180-day-rule explanation, day-count examples, and edge cases — stays in `understanding-thai-tax-residency`.
- The full remittance mechanics (what counts as a remittance, capital vs. income, Por. 161/2566 vs. 162/2566 timing examples) — stays in `transferring-money-to-thailand-tax-rules`.
- The full DTA/foreign-tax-credit mechanics per country — stays in `double-tax-agreements-thailand` and the US/UK country guides.
- The full deduction-cap table with every fund type and edge case — stays in `maximizing-tax-deductions-thailand` / `how-to-use-the-thai-tax-calculator`.
- The step-by-step calculation methodology and its full worked example — stays in `/methodology/`.
- The full 8-example set with breakdowns — stays in `/tax-examples/`.
- The full sourced registry — stays in `/sources/` and `TAX_RULES.md`.
- Per this task's explicit anti-duplication rule: **no article should be copied into the hub wholesale.** Every hub section is a summary + link, not a condensed re-publish.

---

## 7. 2026-specific information requirements

Per `CLAUDE.md`'s tax rule, nothing below may be asserted without a traceable source, and nothing may be presented as a "2026 change" unless it demonstrably is one. Based on `tax-data/2026/*.json` and `TAX_RULES.md` as they exist today:

**Confirmed actual 2026 changes** (from `tax-data/2026/social-security.json` and `TAX_RULES.md`):
- **SSO contribution cap rises to 10,500 THB/year** from 1 January 2026 (Phase 1, through 2028), up from 9,000 THB/year in 2024–2025. Source: BDO Thailand + DLA Piper, Cabinet-approved 2 Dec 2025, Royal Gazette 12 Dec 2025. Verified ✅.

**Confirmed but time-limited, worth flagging as "current for 2026" rather than "new in 2026"**:
- **Reduced 7% VAT rate** continues under Royal Decree No. 807, covering 1 Oct 2026 – 30 Sept 2027 (statutory rate is 10%; this is a renewed, not permanent, reduction). Source: regfollower.com + HLB Thailand. Not primary-verified (❌ per registry) — hub should phrase this as "reduced rate currently in effect through Sept 2027," not as an unconditional fact.

**Unchanged in 2026 (still apply, but are not "new")** — the hub must not imply these changed just because the page is titled "2026":
- **Progressive tax brackets** (0%–35%, 8 bands) — in effect since 2017, no bracket change for 2026. Source: secondary only (Sherrings), RD's own English page is stale — see known issue in `TAX_RULES.md`.
- **Personal/spouse/child/parent allowances and the senior 190,000 THB exemption** — no indication of a 2026 change in the registry; these carry forward from prior years.
- **180-day residency test** — statutory, Section 41, unchanged.
- **Remittance rule (Por. 161/2566, effective 2024-01-01)** — this is a 2024 change, already two years old by 2026; the hub must not describe it as a "2026 change," only as "current law, in effect since 2024."
- **VAT registration threshold (1,800,000 THB)** and **30-day registration deadline** — unchanged.
- **Deduction caps** (life/health insurance, retirement funds, donations) — no 2026-specific change identified in the registry.

**Open/unconfirmed items the hub must not resolve on its own authority**:
- PND90/91 e-filing extension for the 2026 tax year (filed in 2027) is explicitly flagged **unconfirmed** in `residency.json`/`TAX_RULES.md` — the hub should state the statutory paper deadline (31 March) and note the e-filing extension is "historically renewed but not yet confirmed for this filing cycle," not assert a specific extended date.
- Pension fund individual cap (500,000 vs. possibly 200,000 THB) — flagged unverified; the hub should not state a cap more confidently than `/methodology/` already does.

**Recommendation**: the "What's New for 2026" section should be structured as two short lists — "Changed" (just the SSO cap, honestly it may be the only item) and "Unchanged but still in effect" (brackets, allowances, residency test, remittance rule) — rather than manufacturing more "changes" than actually exist. A one-item "Changed" list is an accurate, defensible result, not a weak one.

---

## 8. Calculator integration plan

**What the calculator actually calculates** (from `src/utils/taxCalculations.ts`, `foreignIncomeCalculations.ts`, `MethodologyPage.tsx`):
- Assessable income by Section 40 category → standard/flat expense deductions by category → personal/spouse/senior/child/parent allowances → social security, insurance, retirement-fund deductions → progressive-bracket tax → withholding-credit netting → refund or amount owed.
- **Residency effect**: `isThaiResident` (computed from `daysInThailand >= 180`) gates whether foreign income entries are taxable at all (`foreignIncomeCalculations.ts:52` — non-residents' foreign income is not taxable regardless of remittance).
- **Foreign income handling**: each foreign-income entry carries country, date earned, date remitted, and foreign tax paid; the engine applies the 2024+ earned-date rule, DTA foreign-tax-credit logic (`analyzeForeignIncome`), and LTR exemption logic (`hasLTRForeignIncomeExemption`, `hasLTRFlatRateBenefit`) automatically.
- **What it does NOT determine**: whether a specific remitted amount is capital vs. income (user must classify it), which treaty article governs a specific pension (only recognizes the country/pension-type combinations already built in), or sole-proprietor business tax (per `TAX_RULES.md`'s backlog, `BUSINESS_FLAT_RATE_DEDUCTIONS` exists but no calculation function consumes it yet — this is a real, current gap the hub must not paper over if it mentions sole proprietors).

**Hub placement**: one clear CTA block after the "How Thai income tax works" flow section (early, for someone who already knows their numbers) **and** a second CTA at the end of the "Foreign income" and "Filing" sections for someone who reads further before acting. Avoid CTA-per-section overload — 2 placements, not 12.

**Required framing** (per this task's explicit instruction not to imply the calculator gives legal/tax advice or resolves ambiguous classification): a one-sentence distinction, verbatim-style: *"Reading below tells you how the rule works. The calculator estimates what you owe once you know how your specific income should be classified — for genuinely ambiguous cases (is this remittance capital or income? which treaty article applies to my pension?), that classification is still yours to make, ideally with a qualified advisor."* This mirrors the closing paragraph already present in the `foreign-income-thailand-tax` article (see IDE selection) — the hub should reuse that same framing rather than invent new wording.

---

## 9. Worked-example plan

From the 8 existing engine-verified examples in `src/data/taxExamples.ts` (documented in `TAX_EXAMPLES.md`), recommend selecting **3** for the hub (not duplicating the full set, matching the "small number of representative examples" instruction):

1. **`simple-employee`** (฿800,000 gross → ฿48,500 tax, 6.06% effective) — the single clearest "full flow" example; also the same figures already narrated in `/methodology/`, so it reinforces rather than contradicts.
2. **`deductions-impact`** (฿800,000 gross, same as above but with an added deduction → ฿37,250 tax) — directly demonstrates "why allowances/deductions matter" using the identical base case, which is a stronger teaching pair than two unrelated examples.
3. One bracket-threshold example (`bracket-threshold-below`/`-above` pair, ฿999,000 vs. ฿1,001,000 taxable income) — makes the marginal-rate point concretely, addressing a common misconception ("crossing into a bracket doesn't retax your whole income").

Foreign income does not currently have a dedicated example in `taxExamples.ts` — the hub's foreign-income section should therefore link to the calculator and the foreign-income articles rather than fabricate a foreign-income worked example that doesn't exist in the verified set. **Do not hand-type a new foreign-income example for the hub** — if one is wanted, it should be added to `taxExamples.ts` first (a separate, calculator-engine-verified task), matching how `TAX_EXAMPLES.md` describes the existing 8 being built.

Each selected example should render as a compact card linking to `/tax-examples/` for the full breakdown — not the full `TaxExampleCard` component reproduced inline, to avoid restating the step-by-step (which `/tax-examples/` already owns).

---

## 10. Source plan

Recommend **inline + compact "Sources" section + link to `/sources/`** (the "all three" option), scoped down from the full registry:

- **Inline**: only for the handful of figures stated directly on the hub (SSO cap change, bracket count/top rate, 180-day threshold, personal allowance amount) — using the same `OfficialSource`-style verified/unverified flagging pattern `MethodologyPage.tsx` already uses, not silently presenting unverified secondary-sourced figures (like the brackets, which `TAX_RULES.md` marks ❌ not primary-verified) as settled fact.
- **Compact "Sources" section** at the bottom: 4-6 line list of the primary sources actually cited inline (Revenue Code §41, BDO/DLA Piper SSO notice, etc.) — not all 18 registry entries.
- **Link to `/sources/`**: one explicit "See the full source registry" link for anyone who wants the complete picture, consistent with how `/methodology/` already does this.

No new source should be invented. Every figure on the hub must trace to an existing `tax-data/2026/*.json` entry or `src/data/sources.ts` entry — if a needed figure isn't already sourced there, the hub should either omit it or flag it unverified exactly as `TAX_RULES.md` already does, never assert it newly.

---

## 11. Internal linking plan

**Pages that should link TO the hub** (added as part of implementation, not done in this task):
- Footer nav (`src/components/layout/Footer.tsx`) — add a "2026 Tax Guide" or similar link, likely positioned near "Articles"/"Methodology."
- Homepage — a prominent link/card, since this is meant to be a primary landing surface for search traffic.
- `/articles/` index — as a featured/pinned entry, not just one row in the flat list.
- The "hub" articles that already exist for sub-clusters (`thailand-tax-guide-for-expats`, `freelancer-tax-guide-thailand`, `pensioner-retiree-tax-guide-thailand`) — each could link up to the new hub as "the site's overview page," while remaining canonical for their own cluster.
- `/methodology/` and `/sources/` — a "back to the 2026 overview" link, since those pages currently have no upward navigation to a topic hub.

**Pages the hub should link TO**: enumerated in full in §4's table — every canonical destination for the 10 required topics, plus `/annual-tax/`, `/monthly-withholding/`, `/tax-examples/`, `/methodology/`, `/sources/`.

**What NOT to do**: don't make the hub link to all 27 articles — only the canonical destination per topic (per §4), using the cluster-hub pattern to avoid a link-farm appearance for the freelancer/retirement/country clusters.

---

## 12. SEO recommendations

- **Recommended title**: "Thailand Personal Income Tax 2026: Complete Guide" (or "...The Complete Overview" to match the H1) — under ~60 characters for SERP display.
- **Meta description**: one sentence covering brackets, residency, foreign income, and the calculator, e.g. "How Thailand's 2026 personal income tax works: brackets, allowances, residency, foreign income, and filing — plus a free calculator to estimate what you owe." (~155 characters, adjust to fit).
- **Canonical URL**: `https://www.mythaitaxes.com/thailand-tax-2026/` (matches the site's existing `/slug/` trailing-slash convention seen in all current routes).
- **Primary search intent**: informational, high-level — "Thailand tax 2026," "Thailand personal income tax," "Thailand tax guide 2026."
- **Secondary intents**: "Thailand tax brackets 2026," "Thailand tax calculator," "do I pay tax in Thailand," "Thailand tax residency" — each secondary intent is already served by an existing specialist page; the hub should rank as the entry point and pass intent-specific traffic onward via internal links rather than trying to out-rank the specialist pages for their own keywords.
- **Structured data**: consider `WebPage`/`FAQPage`-adjacent schema only if the hub includes a genuine Q&A block; otherwise a plain `Article`/`WebPage` schema matching the pattern already used elsewhere (per `MEMORY.md`, the site already does Article/FAQPage/WebApplication JSON-LD).
- Avoid keyword stuffing "2026" — the year belongs in the title, H1, canonical, and the dedicated "what's new" section; it should not be forced into every paragraph.

---

## 13. Original-value recommendations (3-5 elements)

1. **"How Thai income tax works" flow** (income → deductions → allowances → taxable income → brackets → credits → final tax) — this exact relationship is implicit across `/methodology/`, the calculator, and multiple articles but has never been stated as one visual/sequential unit anywhere on the site.
2. **"What changed for 2026" checklist** (Changed vs. Unchanged-but-still-in-effect) — genuinely new content; no page currently answers "what's different this year" at all.
3. **"Does this apply to you?" resident/non-resident branching intro** — reframes existing rule content (the residency article) as a decision starting point rather than an explanation, which is a different, currently-missing framing.
4. **Calculator hand-off framing** ("learn the rule" vs. "calculate your estimate," reusing the disclaimer language from `foreign-income-thailand-tax`) — makes explicit a distinction the site enforces informally but has never stated as a named principle.
5. **Cross-cluster navigation** (routing a reader to the right cluster hub — freelancer, retiree, country-specific — based on their situation) — the closest existing analog is the flat `/articles/` list; the hub's "which section do I need" framing is new.

Explicitly **not** recommended: an interactive decision-tree widget or new visual component requiring new code beyond what a content/IA page needs — that would cross from "design a hub" into "build a feature," which is out of this task's scope and would need its own approval per `CLAUDE.md`'s technical rule if it touched calculation logic.

---

## 14. Risks / accuracy concerns

- **Bracket figures are not primary-verified** (`TAX_RULES.md`: RD's own English page is stale, showing pre-2017 figures). The hub must carry the same verification caveat `/methodology/` already does — do not present the bracket table with more confidence than the source registry warrants.
- **VAT 7% rate is time-limited** (through Sept 2027) — if the hub mentions VAT at all (it's arguably out of scope for a *personal* income tax hub), it must not state 7% as permanent.
- **E-filing deadline extension is unconfirmed for the 2026 filing cycle** — state only the statutory paper deadline with a clear caveat, per §7.
- **Sole-proprietor calculation gap**: if the hub's filing/business section mentions sole proprietors at all, it must not imply the calculator produces a computed result for them — per `TAX_RULES.md`'s backlog, it currently doesn't.
- **Duplication creep risk**: the biggest ongoing risk after launch is content drift — if the hub's compact tables (brackets, allowances) are hand-typed rather than sourced from the same constants file the calculator/methodology page use, they will silently diverge when `tax-data/2026/*.json` or `taxConfig.ts` is next updated. Recommend the same pattern `TAX_EXAMPLES.md` describes for the brackets article: pull the actual configured values at build/render time rather than typing numbers into hub prose.
- **"2026" over-claiming**: the largest content-accuracy risk specific to this task is implying more changed in 2026 than the registry supports. §7's honest single-item "Changed" list should be treated as a feature of the page's credibility, not a shortfall to compensate for with invented content.

---

## 15. Recommended implementation scope

A follow-up implementation task should cover, roughly in this order:
1. Add the `/thailand-tax-2026/` route + page component, following the section structure in §3.
2. Pull bracket/allowance/SSO-cap figures from the same source the calculator/methodology page already use (`taxConfig.ts` / `tax-data/2026/*.json`) — no hand-typed numbers.
3. Write the net-new prose identified in §5 only (intro, "does this apply to you," the flow diagram, the 2026 changed/unchanged section, connective tissue) — everything else is table + link per §4/§6.
4. Select and embed the 3 worked-example cards from §9, linking to `/tax-examples/`.
5. Add the compact sources section + `/sources/` link per §10, with verified/unverified flagging matching `MethodologyPage.tsx`'s existing `OfficialSource` component pattern.
6. Wire internal links both directions per §11 (footer, homepage, `/articles/`, cluster-hub articles, `/methodology/`, `/sources/`).
7. Add SEO metadata (title/description/canonical/JSON-LD) per §12, and add the route to `scripts/prerender.mjs`'s static route list and `docs/sitemap.xml` generation (matching how `/tax-examples/` was onboarded per `TAX_EXAMPLES.md`).
8. Add a regression test analogous to `src/data/__tests__/articles.test.ts` / `taxExamples.test.ts` if any figure is interpolated from live constants, so a future constant change can't silently desync the hub from the calculator.

This scope explicitly excludes: any change to `src/utils/taxCalculations.ts`, `src/utils/foreignIncomeCalculations.ts`, `tax-data/2026/*.json`, or any existing article's content — none of those are touched by adding a new summary/navigation page.
