# Content Rewrite Brief 001

**Status: Analysis only. Article NOT yet modified. Awaiting approval.**

## 1. Selected article

- **URL**: `/articles/thai-tax-brackets-explained/`
- **Slug**: `thai-tax-brackets-explained`
- **Current title**: "Thai Income Tax Rates and Brackets 2025/2026"
- **Type/topic**: Tax Basics — progressive PIT bracket structure
- **Current length**: ~218 words (source: `CONTENT_INVENTORY.md`); confirmed by direct read of `src/data/articles.ts:224-272`
- **Last published**: 2024-02-15 (one of the 5 oldest, never-revisited articles per the inventory)

## 2. Why it was selected

Chosen over the other four "thin + duplicate" candidates flagged in `CONTENT_INVENTORY.md` (`understanding-thai-tax-residency`, `maximizing-tax-deductions-thailand`, `expat-guide-filing-thai-taxes`, `foreign-income-thailand-tax`) because:

1. **Highest, most evergreen search intent of the group.** "Thai tax brackets," "Thailand income tax rates 2026" is a head-term query with a clean informational+transactional intent (people want the table, then want to know what it means for their own number).
2. **Directly tied to the core tax engine**, not a peripheral topic. The brackets are literally `TAX_BRACKETS` in `src/types/taxForm.ts:260` and are used by both calculators — this is the article most naturally positioned to hand off to the product.
3. **Lowest duplication risk after rewrite.** `foreign-income-thailand-tax` is explicitly recommended in the inventory for *consolidation* into `transferring-money-to-thailand-tax-rules`, not a standalone rewrite. `understanding-thai-tax-residency` and `expat-guide-filing-thai-taxes` overlap heavily with `thailand-tax-guide-for-expats`. The bracket topic has no equally-thorough sibling article to fold into — it earns its own page.
4. **Clear opportunity for an original calculation** (marginal vs. effective rate) that the current article gestures at ("Key Takeaways" point 2) but never builds out.
5. **High internal-link weight**: referenced as a "related article" from `how-to-use-the-thai-tax-calculator`, `maximizing-tax-deductions-thailand`, and `rental-income-tax-thailand` (`src/data/articles.ts:3158-3184`), and is one of two `FALLBACK_SLUGS` used site-wide when no related article is found (`src/data/articles.ts:3155`). Improving it has outsized reach.

**User intent served**: "What tax bracket am I in, and what does that actually mean for what I pay?" — most searchers conflate marginal rate (bracket) with effective rate (real tax burden), which is precisely the misconception this article can resolve better than any generic source.

**Original value potential**: worked marginal-vs-effective-rate comparison across multiple income levels, a bracket-crossing visual, and a direct calculator hand-off — none of which is generic RD-summary content.

**Calculator connection**: very natural — the annual calculator already computes and displays both `effectiveRate` and marginal rate (confirmed in `src/utils/taxCalculations.ts`, `src/components/steps/AnnualResultsStep.tsx`), so the article can honestly say "see these two numbers for your own income" without inventing a feature.

**Current quality assessment**: Thin (218 words), generic in structure (single worked example, no comparison table, no misconception-correction), and shows an unresolved editorial inconsistency (see 3.A below) — reads as a first-draft placeholder rather than a finished page, consistent with it being one of the 5 untouched-since-2024 articles.

**Factual/source concern flagged upfront**: the article cites only `https://www.rd.go.th/english/index-eng.html` (the RD homepage, not a bracket-specific page). `TAX_RULES.md` independently documents that RD's actual English bracket page (`rd.go.th/english/6045.html`) is **stale** and shows outdated (pre-2017) figures — so even a more specific RD citation would currently be wrong. The brackets are correct (matches `tax-data/2026/income-tax-brackets.json`) but are **not primary-source verified** — the registry's status is "strong secondary-source verified" via Sherrings, not a fetched government document.

## 3. Deep audit

### A. Accuracy

| Claim in article | Status | Source in project | Notes |
|---|---|---|---|
| Bracket thresholds/rates (150k/300k/500k/750k/1M/2M/5M, 0-35%) | Matches app config | `tax-data/2026/income-tax-brackets.json` — **verified: false** (strong secondary, not primary) | Do not "correct" from model knowledge; already matches the registry, keep as-is, but do not upgrade the confidence claim beyond what the registry supports. |
| "2024 Tax Brackets" heading vs. title says "2025/2026" | **Internal inconsistency — needs fix, not a tax-rule change** | N/A — this is an editorial/copy bug | The brackets have applied unchanged since 2017 (per registry `conditions` field), so the underlying numbers are fine for 2025/2026 too, but the heading text is stale and self-contradicts the title. This is a wording fix, not a rule change. |
| Cited source: `rd.go.th/english/index-eng.html` | **NEEDS VERIFICATION / should be replaced** | `TAX_RULES.md` documents that RD's actual bracket-specific English page (`rd.go.th/english/6045.html`) is stale/wrong, and that "No working current primary-law page was located during research." | Do not link a more "specific-looking" RD page under the assumption it's more authoritative — the registry explicitly found the specific one to be wrong. Recommend citing Sherrings (already the project's accepted secondary source for this exact data, see `income-tax-brackets.json`) alongside the current generic RD link, both flagged per the registry's own verification status. |
| Worked example (600,000 THB → 42,500 THB tax, 7.08% effective) | **Arithmetically correct**, re-verified: 0+7,500+20,000+15,000 = 42,500; 42,500/600,000 = 7.083% | Internally consistent with the bracket table above it | Keep the math, but it's currently the *only* example — a single data point can't illustrate how the marginal/effective gap widens at higher income. |
| "Your marginal rate applies only to income in that bracket" | Correct, standard progressive-tax mechanics | Follows directly from the bracket structure itself | Not itself a claim needing external sourcing — it's a definitional restatement of the table above it. |
| "The effective rate is always lower than your top bracket" | Correct given brackets start at 0% | Same as above | True as a mathematical consequence of the bracket table, not an independent tax-law claim. |
| No mention of deduction/allowance interaction beyond one bullet | Not wrong, but incomplete | Deductions/allowances are documented in `tax-data/2026/deductions.json` and `allowances.json` | Article says taxable income "after allowances/deductions" is what's bracketed but never shows how someone gets from gross salary to taxable income — a real gap for a reader trying to self-calculate. |

**No claims found that are demonstrably wrong.** The core risk is a **stale-looking citation and an internally contradictory heading**, not incorrect numbers.

### B. Originality

- **Genuinely useful**: the bracket table itself, and the one worked example (mechanically correct, clearly laid out).
- **Generic/common knowledge**: "Thailand uses a progressive tax system where higher income is taxed at higher rates" — restates the concept without adding anything Thailand-specific.
- **Repetitive across the site**: this exact bracket table is also implicitly present inside both calculators — the article doesn't yet do anything the calculator doesn't already show more precisely.
- **Likely AI-generated filler**: the "Key Takeaways" list restates points already made in prose immediately above it (bullets 1-3 duplicate the "How It Works" section) — filler by repetition rather than added content.
- **Missing originality opportunity**: no comparison across income levels, no bracket-crossing visualization, no discussion of *why* the effective/marginal gap matters for a real decision (e.g., "is a raise worth it," "should I defer income to next year").

### C. User usefulness

- **Actual question**: "I earn X — what tax bracket does that put me in, and how much will I actually pay?" Secondary question: "Is it worth earning more if it pushes me into a higher bracket?" (a common misconception — people think crossing a bracket taxes *all* their income at the new rate).
- **Decision being made**: whether a raise/bonus/extra freelance income is worth it net of tax; whether to prepay/defer income near a bracket boundary; sanity-checking payroll withholding.
- **Missing information**: 
  - How gross salary becomes "taxable income" (allowances + deductions step) — currently assumed, not shown.
  - More than one income level worked through, so the reader can find themselves in it.
  - Direct answer to "does crossing a bracket cost me more overall?" — the misconception this article is best positioned to kill.
- **Where a table helps**: a multi-income-level comparison table (e.g. 400k / 600k / 1M / 2M / 5M) showing tax owed, effective rate, and marginal rate side by side.
- **Where a worked example helps**: already has one; needs 2-3 more at different income levels, ideally including one that crosses from one bracket to the next by a small margin (illustrating "the extra 1,000 THB is only taxed at the new rate, not your whole income").
- **Where the calculator helps**: exactly here — after showing the *mechanism* by hand, hand off to the calculator for the reader's own numbers including allowances/deductions, which the article deliberately won't model.
- **Likely misunderstanding created by current version**: readers may come away thinking their "tax bracket" (marginal rate) is roughly what they pay overall, since the effective-rate point is stated once, abstractly, and never demonstrated at a second income level.

### D. Calculator integration

Confirmed actually-supported features (not invented):
- Annual calculator computes and returns `effectiveRate` and a marginal-rate figure per the tax bracket schedule (`src/utils/taxCalculations.ts`, surfaced in `src/components/steps/AnnualResultsStep.tsx`).
- Both calculators consume the same `TAX_BRACKETS` table the article documents (`src/types/taxForm.ts:260`).
- PDF export exists (already referenced from `how-to-use-the-thai-tax-calculator`) — worth a single cross-link, not a new claim.

Recommended integration points:
- After the worked-example table: "See your own effective and marginal rate" → link/CTA to `/annual-tax/`.
- Do **not** claim the calculator does bracket-crossing "what-if" comparisons or raise/bonus modeling unless confirmed — current audit found no such feature. Any decision-tree content ("is a raise worth it") must be explained narratively in the article itself, not attributed to a calculator feature that doesn't exist.

### E. Structure

| Section | Verdict | Notes |
|---|---|---|
| Title | Keep, minor edit | "2025/2026" is fine since brackets are unchanged since 2017; just needs the body to stop saying "2024." |
| "Progressive Tax System" intro | Shorten | One generic sentence; can be folded into a tighter intro. |
| "2024 Tax Brackets" table | Keep, rename heading | The table data is correct; only the heading label is stale. |
< /br>
| "How It Works" | Expand | Currently one sentence; this is where the allowances/deductions pipeline (gross → taxable income) belongs, briefly, before the worked example. |
| "Example Calculation" (single 600k example) | Expand into multi-level comparison table | Core original-value opportunity — see Section 5. |
| "Key Takeaways" | Remove/merge | Restates prior sections; fold the one non-redundant point (bracket-crossing misconception) into a new dedicated section instead. |
| Sources | Fix | Replace/supplement the generic RD homepage link; see Section 6. |
| FAQs | Add | None currently exist; 2-3 targeted FAQs (e.g. "Does a raise push my whole salary into a higher rate?") would directly address the core misconception and pick up FAQ-style search queries. |
| Internal links | Add | Currently none in-body (only the auto-generated "related articles" footer). Should link to `maximizing-tax-deductions-thailand` (for the allowances/deductions step) and `how-to-use-the-thai-tax-calculator`. |

## 4. Proposed structure (new article)

1. **Intro** (2-3 sentences) — What a "tax bracket" is in Thailand's system and the one misconception the article will resolve (marginal ≠ effective rate). No original example needed here; sets up the rest.
2. **2025/2026 tax brackets table** — Keep existing table verbatim (data confirmed correct). Source: registry-backed citation (see Section 6).
3. **From salary to taxable income (brief)** — 3-4 sentences on allowances/deductions reducing taxable income before brackets apply, with a link out to `maximizing-tax-deductions-thailand` for detail (no re-explaining deduction amounts here — avoids duplicating that article). No new calculation; just the missing conceptual step.
4. **Worked example: one income level, step by step** — Keep the existing 600,000 THB walkthrough (verified correct), reformatted for clarity.
5. **Original addition: effective vs. marginal rate across income levels (table)** — New table across 5 income levels (e.g., 400k / 600k / 1M / 2M / 5M taxable THB) showing tax owed, marginal rate, and effective rate side by side. Requires calculation — see Section 5 below for method (uses only the already-confirmed bracket table; no new tax rule needed).
6. **"Does crossing a bracket cost me more overall?" (misconception section)** — Short worked example showing income at 999,000 vs. 1,001,000 THB, demonstrating the extra 2,000 THB is taxed only at 25%, not that the whole income jumps to the new rate. Directly answers the #1 likely misunderstanding.
7. **Calculator hand-off** — "These examples use taxable income directly. Your actual number depends on your allowances and deductions — use the calculator to get your own effective and marginal rate" → CTA to `/annual-tax/`.
8. **FAQs** (2-3) — e.g. "What's the difference between my tax bracket and my effective tax rate?", "Will a bonus push me into a higher bracket for my whole salary?", "Have these brackets changed for 2026?" (answer: no, unchanged since 2017 per registry).
9. **Sources** — registry-backed citation list (Section 6).

Explanation → Example → Calculation → Source ordering is followed within sections 4-6 specifically (mechanism explained in 3, single example in 4, comparative calculation in 5, source list at the end).

## 5. Original value opportunities (3-5 concrete proposals)

1. **Multi-level effective-vs-marginal comparison table.** Compute tax owed at 5 taxable-income levels using the *already-verified* `TAX_BRACKETS` values — no new tax rule, pure arithmetic on existing confirmed data. This is the single highest-value addition: it's the one thing a generic RD summary or competitor article is unlikely to show clearly, and it directly demonstrates the point the current article only asserts.
2. **Bracket-crossing misconception example** (999k vs 1,001k THB). Small, concrete, and corrects a real and common misunderstanding — high practical value per word.
3. **Visual bracket "fill" explanation** — a simple horizontal bar/table showing how each bracket "fills up" before the next rate applies, for the 600,000 THB example already in the article (illustration of already-verified numbers, not a new claim).
4. **Explicit gross-to-taxable-income bridge** — even 3-4 sentences closes the single biggest comprehension gap (article currently starts at "taxable income" as if it just appears), cross-linked rather than duplicated from `maximizing-tax-deductions-thailand`.
5. **Direct, honest calculator hand-off** tied to features that actually exist (`effectiveRate`, marginal rate output) — turns the article from a dead-end read into a funnel toward the core product, per `CLAUDE.md` goal #2 ("Make the calculator the core product").

## 6. Source requirements

| Topic/rule | Available in project? | Official source needed | Tax year | Reason |
|---|---|---|---|---|
| Bracket thresholds/rates (0-35%) | YES — `tax-data/2026/income-tax-brackets.json` | A primary RD/Revenue Code page or gazetted amendment text (Amendment Act No. 44 B.E. 2560) — **SOURCE NEEDED**, not yet located per registry | 2017-onward, unchanged through 2026 | Registry explicitly flags this as secondary-source-only; do not claim primary verification the project doesn't have. |
| Correct citation to replace RD homepage link | Partially — Sherrings is already the project's accepted secondary source for this data | Sherrings URL already in `income-tax-brackets.json`: `https://sherrings.com/personal-income-tax-rates-thailand.html` — usable now | 2026 | Registry has already vetted this specific source for this specific data; reuse it rather than inventing a new citation. |
| Confirmation RD's specific bracket page is stale | YES — `TAX_RULES.md` "Known issue" note | N/A (documented internally, no external source needed) | — | Prevents accidentally "upgrading" the citation to a page the project has already identified as wrong. |
| Allowances/deductions reducing taxable income (referenced, not detailed) | YES — `tax-data/2026/allowances.json`, `deductions.json`, and existing article `maximizing-tax-deductions-thailand` | None needed for this article — link out instead of re-citing | 2026 | Avoids duplicating sourcing work already done elsewhere; this article should reference, not restate. |
| Whether brackets are confirmed unchanged for tax year 2026 specifically (for an FAQ answer) | Implied by registry (`conditions`: "Effective from the 2017 tax year onward") but **not an explicit "still true for 2026" primary confirmation** | **SOURCE NEEDED** — a 2026-dated primary or secondary confirmation that no amendment has occurred | 2026 | The FAQ "have brackets changed for 2026?" needs a source dated to 2026, not an inference from a 2017 effective-date clause. |

## 7. Rewrite score

| Dimension | Score |
|---|---|
| Current usefulness | 4/10 |
| Originality | 2/10 |
| Tax information quality | 7/10 (numbers correct, but citation is weak/generic and heading is stale) |
| Source quality | 3/10 (single non-specific RD link; registry shows the "more specific" alternative is actually wrong) |
| Calculator integration potential | 8/10 (calculator already has the exact features — effective/marginal rate — this article should point to) |
| Search intent alignment | 8/10 (high-intent head term, currently underserved by a 218-word page) |
| Trust/transparency | 4/10 (title/heading contradiction undermines credibility on a page about specific tax years) |
| Overall rewrite opportunity | 8/10 |

**Current article score: 4/10**
**Potential after rewrite: 8/10**

Biggest changes required to reach potential: (1) fix the title/heading date contradiction, (2) replace the weak citation with the registry-vetted Sherrings source and add the internal transparency note about RD's stale page, (3) add the multi-level effective-vs-marginal comparison table (the core original-value addition), (4) add the bracket-crossing misconception example, (5) add an honest, feature-accurate calculator CTA. None of these require inventing or assuming any new tax rule — all draw on data already verified (or already flagged as unverified) in `TAX_RULES.md` and `tax-data/2026/`.

## 8. Recommended title

**"Thai Income Tax Brackets 2025/2026: How Much You Actually Pay at Each Income Level"**

(Keeps the existing year framing that's accurate per the registry; adds "how much you actually pay," signaling the effective-vs-marginal content that differentiates it from the current version and from competitor pages.)

## 9. Recommended meta description

"Thailand's 2025/2026 income tax brackets, explained with worked examples at five income levels — see the real difference between your tax bracket and your effective tax rate, then calculate your own."

(Under ~160 characters, states the original content — multi-level worked examples — rather than generic "learn about Thai tax brackets" filler.)

## 10. Internal linking opportunities

- **Outbound, in-body** (new, not currently present): `maximizing-tax-deductions-thailand` (for the gross→taxable income step), `how-to-use-the-thai-tax-calculator` (for the calculator hand-off).
- **Inbound, already exists**: linked from `how-to-use-the-thai-tax-calculator`, `maximizing-tax-deductions-thailand`, `rental-income-tax-thailand` related-articles blocks, and is a site-wide fallback slug (`src/data/articles.ts:3155,3158-3184`) — no changes needed here, but worth noting the rewrite's quality improvement will be seen by an unusually large share of site traffic via these existing links.

## 11. Sections to remove

- "Key Takeaways" list as currently written (restates "How It Works" and "Example Calculation" without adding new information) — replace with the dedicated bracket-crossing misconception section (Section 4, item 6 above), which carries a genuinely new point instead of a summary.

## 12. Sections to add

- Gross-to-taxable-income bridge (brief, links out rather than duplicating).
- Multi-level effective-vs-marginal comparison table.
- Bracket-crossing misconception worked example.
- Calculator CTA tied to confirmed existing features.
- FAQ block (2-3 questions).

## 13. Sections to preserve

- The bracket rate table itself (data confirmed correct against `tax-data/2026/income-tax-brackets.json`).
- The existing 600,000 THB worked example (arithmetic re-verified correct) — reuse as the "single example" anchor before the new multi-level table.

## 14. Final rewrite checklist

- [ ] Fix "2024 Tax Brackets" heading to remove the contradiction with the "2025/2026" title (numbers stay the same; only the label changes).
- [ ] Replace/supplement the RD-homepage citation with the registry-vetted Sherrings source; add a brief note (or at minimum, do not imply primary-government verification the project doesn't have).
- [ ] Add gross-to-taxable-income bridge section with a link to `maximizing-tax-deductions-thailand` (no new numeric claims — link, don't duplicate).
- [ ] Keep and reformat the existing 600,000 THB example.
- [ ] Add the multi-level (5 income points) effective-vs-marginal comparison table — arithmetic only, using already-confirmed bracket values; no new tax rule needed.
- [ ] Add the bracket-crossing misconception example (999k vs. 1,001k THB).
- [ ] Remove the redundant "Key Takeaways" list; keep only the one non-redundant point, expanded into its own section.
- [ ] Add calculator CTA referencing only confirmed features (`effectiveRate`, marginal rate) — link to `/annual-tax/`.
- [ ] Add 2-3 FAQs, each either self-contained (definitional) or explicitly sourced; do not state "brackets unchanged for 2026" without locating a 2026-dated confirmation (mark **NEEDS VERIFICATION** if none is found before publishing).
- [ ] Update `publishedAt` (or add a `reviewedAt` if that field gets introduced per the inventory's suggestion) to reflect the actual rewrite date.
- [ ] Add/update the "sources" array in `src/data/articles.ts` to include the Sherrings citation alongside (or in place of) the current RD homepage link.
- [ ] Re-run the site build/prerender after the edit and confirm the article route still renders and the sitemap/OG tags update correctly (per existing SSR build process in project memory).
- [ ] Do not touch `TAX_BRACKETS` in `src/types/taxForm.ts` or any calculation code — this is a content-only change, per `CLAUDE.md`'s technical rule on core tax calculations.
