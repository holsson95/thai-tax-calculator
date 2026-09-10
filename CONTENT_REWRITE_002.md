# Content Rewrite Brief 002 — Thai Tax Residency Article

**Status: Audit and planning only. Article NOT modified. No tax data, calculation code, or unrelated content changed. Awaiting approval before Task 17B implements anything.**

---

## 1. Article selected

- **URL**: `/articles/understanding-thai-tax-residency/`
- **File**: `src/data/articles.ts:187-229`
- **Current title**: "Am I a Thai Tax Resident? The 180-Day Rule Explained"
- **Current length**: 204 words (per `CONTENT_INVENTORY.md`; confirmed by direct read)
- **`publishedAt`**: 2024-01-15 — the single oldest article on the site, never revisited
- **Category**: "Tax Basics"

---

## 2. Current article summary

Four short sections: "What is Tax Residency?" (2 sentences), "The 180-Day Rule" (1 sentence + 3 bullets), "Tax Implications" (two 3-bullet lists: resident vs. non-resident), "Planning Tips" (4 generic bullets: keep records, understand remittance timing, consider treaties, consult a professional). One source cited: the RD English homepage (`rd.go.th/english/index-eng.html`), not a page specific to residency or Section 41. No worked example, no table, no visual, no FAQ block, no calculator link.

---

## 3. Current quality assessment

| Dimension | Score | Why |
|---|---|---|
| Accuracy | 6/10 | Nothing stated is factually *wrong*, but it's compressed to the point of being misleading in one place (see Claim Audit, row 3 — "brought into Thailand" implies only remitted-in-2024+ income is affected, without stating the actual timing rule). |
| Source quality | 2/10 | Cites only the RD homepage, not the specific Section 41 page. The project already has a verified, quoted primary source (`rd.go.th/english/37749.html`) that this article doesn't use. |
| Originality | 1/10 | No worked example, no table, no day-count scenario, no decision aid — pure restated definition. |
| User usefulness | 3/10 | Doesn't actually answer "am I a resident?" for a real reader with a specific travel pattern — the title promises a self-assessment tool the content never delivers. |
| Clarity | 6/10 | Short and readable, but too short to be genuinely clear about edge cases (multiple trips, partial years, day-counting). |
| Tax-year specificity | 4/10 | Never states which tax year(s) the content applies to. The 2024 remittance change is alluded to only as "may be taxed" with no effective date. |
| Calculator integration | 0/10 | Zero mention of the calculator. `how-to-use-the-thai-tax-calculator` links *to* this article, but this article never links back or to `/annual-tax/`. |
| Trustworthiness | 3/10 | Weak citation, no tax-year framing, "Planning Tips" reads as generic filler ("consult with a tax professional") rather than site-specific guidance. |
| SEO / search intent | 4/10 | Title matches a real head-term query ("am I a Thai tax resident") but the content is too thin to satisfy the searcher, and it's outranked in depth by the site's own `dtv-visa-thailand-tax-guide` and `thailand-tax-guide-for-expats` articles. |

**Current overall score: 3/10**
**Target score after rewrite: 8/10**

**Biggest reasons for the gap**: (1) no worked day-count examples despite the title promising a self-assessment, (2) citation doesn't point to the specific, already-verified primary source the project has on file, (3) no tax-year framing for the 2024+ remittance change, (4) zero calculator connection, (5) the article currently duplicates — at much lower quality — content already done well elsewhere on the site (see Section 10).

---

## 4. Claim audit

| # | Claim (as currently written) | Tax year | Source currently cited | Source quality | Verification status | Recommended action |
|---|---|---|---|---|---|---|
| 1 | "if you spend 180 days or more in Thailand during a calendar year, you are considered a Thai tax resident" | Not stated (evergreen rule) | RD homepage (generic) | Weak (wrong specificity) | **VERIFIED** — matches `tax-data/2026/residency.json` and a direct RD quote obtained in this audit (Section 41: "Any person staying in Thailand for a period or periods aggregating 180 days or more in any tax year shall be deemed a resident of Thailand") | Keep the substance; replace citation with the specific Section 41 URL already in the project's source registry. |
| 2 | "Days are counted per calendar year (January to December)" | N/A | Same | Weak | **VERIFIED** — RD Section 39 states "Tax year means calendar year" (confirmed by direct fetch in this audit) | Keep; can now cite Section 39 alongside Section 41 for extra precision. |
| 3 | "Partial days typically count as full days" | N/A | Same | Weak, no citation for this specific sub-claim | **AMBIGUOUS / PARTIALLY VERIFIED** — the site's own `src/data/faq.ts` (FAQ: `What counts as a "day"...`) already states there is *no precise statutory definition* of a "day" in the Revenue Code, and that this is Revenue Department *practice*, not codified law. The article states it as flat fact with no hedge. | **Do not state as settled fact.** Align with the FAQ's more honest framing: describe it as documented practice, not a statutory rule, and cross-reference the FAQ rather than re-deriving a claim with weaker sourcing. |
| 4 | "The days don't need to be consecutive" | N/A | Same | Weak | **VERIFIED** — consistent with the statute's own wording ("a period or periods aggregating..."), and consistent across every other article on the site (`dtv-visa-thailand-tax-guide`, `thailand-tax-guide-for-expats`) | Keep. |
| 5 | "As a Thai Tax Resident: ...You may be taxed on foreign-sourced income brought into Thailand" | Not stated | Same | Weak — no effective date, no distinction between pre-2024 and 2024+ rule | **OUTDATED / INCOMPLETE** — the article was written 2024-01-15, apparently just before or at the start of the Por. 161/2566 change (effective 2024-01-01), and never updated to state the new rule explicitly. It's not *wrong*, but it fails the CLAUDE.md tax-year-specificity requirement: a reader today cannot tell whether "brought into Thailand" means "in the same year earned" (old rule) or "in any year" (2024+ rule). | Rewrite to explicitly state: "for foreign income earned on or after 1 January 2024, Thai tax residents are taxed on it when remitted, regardless of the year of remittance" — sourced to Por. 161/2566, already verified in `tax-data/2026/foreign-income.json` (see Section 8 below). Do not attempt a full remittance-rule explainer here — link to `transferring-money-to-thailand-tax-rules`, the project's already-identified canonical article for that topic (see Section 10). |
| 6 | "You must file an annual tax return if your income exceeds the filing threshold" | Not stated | Same | Weak — no actual threshold figures given | **VERIFIED mechanism, but no numbers given** — filing thresholds exist and are used elsewhere on the site (FAQ, `tax-data/2026/residency.json` PND94 entries; annual thresholds of 120,000/60,000 THB appear in FAQ) but this article states the rule with zero specifics. | Either give the actual threshold figures (sourced from FAQ/registry) or explicitly link to the article/FAQ that has them (`expat-guide-filing-thai-taxes` or the FAQ page) rather than leaving a vague, unsourced claim. |
| 7 | "As a Non-Resident: You are only taxed on income earned within Thailand" | N/A | Same | OK | **VERIFIED** — consistent with the statute's structure (residency triggers worldwide/remittance-based taxation; non-residents are Thai-source only) and consistent with every other article and the calculator's own `getResidencyStatusDescription()` logic (`src/utils/foreignIncomeCalculations.ts:269-288`). | Keep. |
| 8 | "Different withholding rates may apply" (non-residents) | N/A | Same | Weak — vague, no specifics | **UNSUPPORTED as written** — true in principle (WHT does vary by income type per `tax-data/2026/withholding.json`) but the claim as stated gives no information a reader could act on and isn't clearly tied to residency status specifically (WHT rates in the registry vary by income *type*, not resident/non-resident status, for most categories). | Either cut this line (adds no value) or replace with a concrete, sourced point if one exists — do not keep a vague unsupported assertion. |
| 9 | "You may still need to file depending on your income type" (non-residents) | N/A | Same | Weak | **PLAUSIBLE, not directly verified in this audit** — plausible given Thai-source income filing obligations exist independent of residency, but no specific source was located confirming non-resident filing triggers during this pass. | Mark **SOURCE NEEDED** if kept; alternatively cut for brevity since it adds no actionable detail. |
| 10 | "Consider tax treaties between Thailand and your home country" (Planning Tips) | N/A | None | N/A | Not a factual claim — generic advice | Fine to keep as a pointer, but should link to `double-tax-agreements-thailand` rather than stand alone with no source or detail. |
| 11 | (Implicit, by omission) Whether visa type or nationality affects residency | Not addressed at all | N/A | N/A | **VERIFIED elsewhere, missing here** — confirmed by direct RD fetch in this audit: "The code establishes residency based solely on physical presence, not on nationality, visa status, or domicile." This exact point is made explicitly and well in `dtv-visa-thailand-tax-guide` and `thailand-tax-guide-for-expats`, but is completely absent from the dedicated residency article. | **This is the single highest-value missing claim.** A reader who searches "am I a Thai tax resident" is very likely conflating tax residency with visa/immigration status (retirement visa, DTV, Elite) — the current article never addresses this, despite it being the article whose job this most obviously is. |

**Summary**: no claim in the article is demonstrably false. The problems are (a) a weak/generic citation where a specific, already-verified one exists, (b) missing tax-year framing for the 2024+ remittance change, (c) one claim (partial-day counting) stated more confidently than the site's own FAQ states it elsewhere, and (d) a glaring omission — residency vs. visa/nationality — that is exactly the misconception this article's title implies it will resolve.

---

## 5. Verified tax rules (usable directly, already confirmed by this project)

1. **Core residency test**: "Any person staying in Thailand for a period or periods aggregating 180 days or more in any tax year shall be deemed a resident of Thailand." — Thai Revenue Code Section 41. Primary source, directly quoted, fetched fresh during this audit at `https://www.rd.go.th/english/37749.html`. Matches `tax-data/2026/residency.json` (`verified: true`).
2. **"Tax year" = calendar year**: Revenue Code Section 39 states "Tax year means calendar year." Confirmed by direct fetch during this audit (same RD page). Not previously called out explicitly in the registry's residency entry, but corroborates the "calendar year, January–December" framing already used site-wide.
3. **Residency is presence-based only**, not nationality/visa/domicile-based. Confirmed by direct fetch: the statute "establishes residency based solely on physical presence, not on nationality, visa status, or domicile." This is the strongest, most citable version of a point currently made (correctly) but only in `dtv-visa-thailand-tax-guide` and `thailand-tax-guide-for-expats`, never in the dedicated residency article.
4. **2024+ foreign income remittance rule**: Order Por. 161/2566 (effective 2024-01-01), clarified by Por. 162/2566 — foreign-sourced income earned on or after 2024-01-01 is assessable when remitted by a Thai tax resident, in the same or any later tax year. Income earned *before* 2024-01-01 stays under the old same-year-remittance rule even if remitted later. Strong secondary-source verification (Mahanakorn Partners Group, corroborated by KPMG) — `tax-data/2026/foreign-income.json`, `verified: true`, but **not primary-document verified** (the RD's own Thai-language order text was not directly fetched in the registry's research pass, nor in this one).
5. **Non-residents**: taxed on Thai-source income only; foreign income is never taxable for a non-resident regardless of remittance, since the remittance rule only applies to residents. Confirmed by the calculator's own logic (`isForeignIncomeTaxable`, `src/utils/foreignIncomeCalculations.ts:46-56`) and consistent across every article and the FAQ.

---

## 6. Uncertain / unsupported claims (do not state as flat fact)

- **"Partial days typically count as full days."** The site's own FAQ (`src/data/faq.ts`, "What counts as a 'day'...") already documents that there is **no precise statutory definition** of a "day" in the Revenue Code — this is Revenue Department *practice*, not codified law, and the FAQ recommends counting conservatively. The current article states this as unqualified fact. **This should be corrected in the rewrite to match the FAQ's more accurate, hedged framing** — not because the current claim is necessarily wrong, but because it overstates the certainty of the underlying source.
- **"Different withholding rates may apply" for non-residents.** Vague as stated; not clearly tied to residency status specifically in the registry (WHT varies mainly by income type). **SOURCE NEEDED** if this claim is kept in any form.
- **"You may still need to file depending on your income type" (non-residents).** **SOURCE NEEDED** — plausible but not independently confirmed during this audit pass.
- **Whether the e-filing extension date (~8 April) should appear in this article at all.** `TAX_RULES.md`/registry flags the 2026-filing-year e-filing extension as **unconfirmed** (the current Ministry of Finance notification only covers e-filings through 31 Jan 2027, and the 2026 annual return would be e-filed Feb–Apr 2027, after that cutoff). If a filing-deadline mention is added to this article, it must say "31 March (paper filing)" only, and should not assert the e-filing extension date as settled for the 2026 tax year — consistent with how the registry already treats this uncertainty.

No conflicting sources were found for the core residency rule itself — RD's Section 41 page, the registry, and every secondary source checked in this audit agree.

---

## 7. Source map

| Rule | Source | Type | URL | Tax year | What it supports |
|---|---|---|---|---|---|
| 180-day residency test (Section 41) | Thai Revenue Department, Revenue Code Section 41 | **Primary, directly quoted** | `https://www.rd.go.th/english/37749.html` | Evergreen (no year-specific change found) | The core residency definition — already in `src/data/sources.ts` as `rd-section-41` and in the `/sources/` page. **Reuse this exact entry; do not create a new one.** |
| "Tax year" = calendar year (Section 39) | Thai Revenue Department (same page as above) | **Primary, directly quoted** | Same URL | Evergreen | Confirms "calendar year, Jan–Dec" framing. Not currently a separate registry entry — worth adding as a `verification_notes` addendum to the existing `thai-residency-days` entry in `tax-data/2026/residency.json` in Task 17B, not a new source. |
| Residency is presence-based, not nationality/visa/domicile-based | Same RD page (Section 41 in context) | **Primary** | Same URL | Evergreen | The single biggest missing claim in the current article (Section 4, row 11). |
| 2024+ remittance rule (Por. 161/2566, Por. 162/2566) | Mahanakorn Partners Group, corroborated by KPMG | **Secondary** (convergent, not primary-document-fetched) | `https://mahanakornpartners.com/comprehensive-overview-of-order-no-por-161-2566-and-no-por-162-2566-on-personal-income-tax-for-foreign-sourced-income/` | Effective 2024-01-01 onward | Already in `src/data/sources.ts` as `mahanakorn-remittance-rule`. **Reuse.** |
| Canonical remittance-rule deep dive (existing article) | `transferring-money-to-thailand-tax-rules` (site-internal) | N/A — internal link, not an external source | `/articles/transferring-money-to-thailand-tax-rules/` | 2024+ | `CONTENT_INVENTORY.md` already identifies this as the site's strongest treatment of the remittance rule — the residency article should link to it, not re-explain it. |
| PND94/PND90-91 filing thresholds/deadlines, if referenced | MBMG Group / Nishimura & Asahi (already in registry) | Secondary / Primary(deadline only) | See `tax-data/2026/residency.json` | 2026 | Only needed if the rewrite adds specific filing-threshold numbers (see Claim 6/9 above) — reuse existing registry entries, don't re-derive. |

**No new source infrastructure is needed.** The `/sources/` page (`src/pages/SourcesPage.tsx`, `src/data/sources.ts`) already carries both the residency and remittance-rule primary/secondary sources this article needs — `rd-section-41` and `mahanakorn-remittance-rule`. The rewrite should cite these exact entries (or the same URLs, formatted consistently with how other recently-rewritten articles cite the registry) rather than the generic RD homepage link currently used.

---

## 8. 2024+ foreign-income findings (kept separate from residency findings, per instructions)

These are **remittance/foreign-income rules**, distinct from the **residency test** itself. The residency article should state the *existence and effective date* of the 2024+ change only insofar as it affects the "why residency matters" section — it should not attempt to fully explain remittance mechanics (definition of a "remittance," capital vs. income, documentation requirements, etc.), which is `transferring-money-to-thailand-tax-rules`'s job.

- **What changed**: Before 2024, a Thai tax resident's foreign-sourced income was only taxable if remitted to Thailand *in the same calendar year it was earned*. Income earned in one year and remitted in a later year escaped Thai tax entirely.
- **Effective date**: 2024-01-01, per Order Por. 161/2566, clarified by Por. 162/2566 (income earned *before* 2024-01-01 stays under the old same-year rule even if remitted in 2024 or later).
- **Which income is affected**: foreign-sourced income earned on/after 2024-01-01 by a Thai tax resident, when remitted to Thailand — in the same year or any later year.
- **Does it depend on residency?** Yes — this rule only applies to Thai tax residents (180+ days). Non-residents are never taxed on foreign income under this or any prior rule, regardless of remittance. This is the key structural link between the two topics that the residency article should make explicit: *residency status is the gate that determines whether the 2024+ remittance rule applies to you at all.*
- **Does the year income was earned matter?** Yes — it's the dividing line between the old and new rule (pre-2024-earned income still follows the old same-year-remittance rule).
- **Does the year money is remitted matter?** Yes, for post-2024-earned income, remittance timing no longer provides an exemption — remittance in any year triggers taxation.
- **Verification status**: Strong secondary-source (convergent, multiple independent professional-services firms) — **not primary-document verified** in either the existing registry or this audit. If Task 17B wants primary verification before publishing a specific effective-date claim, that would need a direct fetch of the Thai-language RD order text, which was out of scope for this audit (English-language secondary sources only).

---

## 9. Original-value opportunities (6 identified)

1. **A residency self-check decision aid** (simple, not a full app) — e.g., "Have you spent 180+ days in Thailand this calendar year? → Yes: resident. No, but you're close and plan to stay through year-end? → Track your count. No, and you're leaving before 180 days? → Non-resident." This is the concrete deliverable the current title promises ("Am I a Thai Tax Resident?") and never delivers. Should be built from already-verified facts only — no new interpretation needed.
2. **Worked day-count examples** (3-5 scenarios) — e.g., a single 200-day stay, two trips totaling 190 days with a gap, a person present Jan–Jun then leaving (should land under 180 in most calendar layouts), a person who thinks their visa length (e.g., DTV's "180 days per entry") determines tax residency and is wrong. Directly addresses the aggregation/consecutiveness points already verified (Claim 1, 4).
3. **Explicit residency-vs-visa/immigration-status correction** — the single highest-value missing claim (Section 4, row 11), verified via direct primary-source fetch in this audit. Framed as a "common misconception" section: many searchers conflate "I have a retirement/DTV/Elite visa" with tax status; the statute doesn't care about visa type at all.
4. **A clear "why residency matters" bridge to the 2024+ remittance rule**, stated at the *gate* level only (residency is a precondition for the remittance rule applying to you) with a link out to the canonical remittance article — avoids re-litigating remittance mechanics while still explaining the practical stakes of the residency question.
5. **A calendar-year visual/table** showing how the 180-day count resets each January and accumulates across multiple stays — currently absent from every article on the site, even the more thorough `dtv-visa-thailand-tax-guide`, which explains the concept in prose/table form but not visually.
6. **An honest, feature-accurate calculator hand-off** — see Section 12 below. None of the site's articles currently link from a residency discussion directly into the calculator's actual Residency Step.

---

## 10. Recommended article structure

| # | Section | Purpose |
|---|---|---|
| 1 | Intro (2-3 sentences) | State the core question and promise a direct, sourced answer — sets up the self-check in Section 3. |
| 2 | The core rule (180-day test) | State Section 41's rule verbatim/paraphrased, cite the specific `rd-section-41` source (not the homepage), state "tax year = calendar year" (Section 39). |
| 3 | Residency self-check / worked day-count examples | The core original-value addition (opportunities 1-2 above). |
| 4 | Common misconception: visa/immigration status ≠ tax residency | Opportunity 3 — the highest-value missing claim, now primary-source-backed. |
| 5 | Why residency matters (Thai-source vs. worldwide/remitted income) | Short, structural — resident vs. non-resident tax scope, referencing but not re-deriving the filing-threshold numbers (link to FAQ/`expat-guide-filing-thai-taxes` for specifics). |
| 6 | The 2024+ foreign income rule — the short version | States only the gate-level fact (Section 8 above) with a clear link to `transferring-money-to-thailand-tax-rules` for the full mechanics — avoids the duplication `CONTENT_INVENTORY.md` already flags. |
| 7 | Calculator hand-off | Honest CTA per Section 12 below. |
| 8 | FAQs (2-3) | Reuse/cross-link the site's existing, already-accurate FAQ answers (e.g., "What counts as a 'day'...") rather than restating them with different wording — avoids introducing a second, less-hedged version of a claim the FAQ already gets right. |
| 9 | Sources | `rd-section-41`, `mahanakorn-remittance-rule` (both already in the registry — no new sourcing infrastructure needed). |

**Not recommended**: a full remittance-mechanics section (capital vs. income, what counts as a remittance, documentation) — that's `transferring-money-to-thailand-tax-rules`'s job per the existing site structure (Section 10 below covers this duplication concern in detail). Also not recommended: DTA/tax-treaty detail — that belongs to `double-tax-agreements-thailand`.

---

## 11. Recommended examples (4 proposed)

| # | Scenario | Assumptions | Tax year | Concept demonstrated | Source | Uncertainty |
|---|---|---|---|---|---|---|
| 1 | Single continuous stay, Jan 1 – Aug 1 (~213 days) | No trips out of Thailand | Evergreen | Straightforward case: single stay clearly crosses 180 | Section 41 (verified) | None |
| 2 | Two separate trips: Feb–Apr (60 days) + Jul–Dec (180 days) = 240 days total, non-consecutive | Days added, not reset by the gap | Evergreen | Aggregation — days don't need to be consecutive | Section 41, "period or periods aggregating" (verified) | None |
| 3 | Person present Jan–Jun (~181 days), then leaves for the rest of the year | Crosses 180 mid-year, doesn't return | Evergreen | You become resident *for that calendar year* once the threshold is crossed, regardless of what happens afterward | Section 41 + Section 39 (verified) | None |
| 4 | DTV holder who stays under their visa's 180-day-per-entry limit but makes 3 entries totaling 195 days in one calendar year | Visa duration limit ≠ tax residency threshold | Evergreen (DTV itself launched 2024, referenced in `dtv-visa-thailand-tax-guide`) | Directly corrects the "my visa says 180 days so I'm fine" misconception (Section 9, opportunity 3) | Section 41 (presence-only rule, verified) + existing `dtv-visa-thailand-tax-guide` treatment | None on the tax rule; note the DTV visa mechanics themselves are outside this audit's scope and should defer to the DTV article for visa-specific detail |

Do not add a 5th example calculating actual tax owed (e.g., "and therefore your tax bill is X") — that would blend the residency article with the calculator's job and risks stating a number without the full income/deduction picture. Keep examples strictly to day-counting/residency determination.

---

## 12. Calculator integration — what's actually supported

Confirmed by reading `src/components/steps/ResidencyStep.tsx` and `src/utils/foreignIncomeCalculations.ts`:

- **The calculator does ask about residency.** `ResidencyStep.tsx` asks: "Did you stay more than 180 days in Thailand during this tax year?" (Yes/No).
- **Residency changes the calculation.** `isThaiResident` gates whether foreign income is evaluated at all (`isForeignIncomeTaxable`, `foreignIncomeCalculations.ts:46-56`); non-residents skip foreign-income taxation entirely.
- **It does calculate foreign income and remitted foreign income**, including the 2024+ rule (the `ResidencyStep` UI explicitly states the 2024+ rule to the user) and LTR visa exemptions.
- **It does distinguish Thai-source and foreign-source income** for tax purposes, per the above.
- **It does NOT ask for an actual day count.** The UI is a binary Yes/No; internally it stores a placeholder value (181 for "yes," 90 for "no" — see `ResidencyStep.tsx:26`, `daysInThailand: stayed ? 181 : 90`), not the user's real day count. **This means the calculator cannot help with the borderline/aggregation scenarios this article's examples are about** (e.g., "I had two trips totaling 190 days, non-consecutive" — the calculator can't accept or verify that input at all today).
- **Minor wording note (documented here, not to be silently "fixed")**: the calculator's UI asks "more than 180 days," while the statutory test is "180 days **or** more" (i.e., exactly 180 counts as a threshold-crossing day in the statute's wording). This is a >180 vs. ≥180 discrepancy between the UI copy and Section 41. It doesn't affect this content audit's scope (no calculation logic uses this exact wording — `isThaiTaxResident` correctly uses `>=`, per `foreignIncomeCalculations.ts:262-263`), but the **UI label itself** is imprecise and worth flagging separately as a copy fix, not a calculation-engine change.
- **Does not support tax-year selection** for residency purposes beyond the single form session.

**Recommended, honest CTA for the article**: *"Once you've determined your residency status using the examples above, use our calculator to estimate your Thai tax liability — including how residency affects your foreign income."* → link to `/annual-tax/`. **Do not claim** the calculator will help a reader *determine* a borderline day count — it only accepts a Yes/No answer once the reader has already decided.

---

## 13. Internal linking recommendations

- **Outbound (add)**: `transferring-money-to-thailand-tax-rules` (for full remittance mechanics — avoids re-explaining what's already covered better there), `double-tax-agreements-thailand` (for treaty detail, currently only a vague "consider tax treaties" bullet), `/annual-tax/` calculator (Section 12), FAQ page (for filing thresholds and the "what counts as a day" answer — cite/link rather than restate).
- **Inbound (already exists, no change needed)**: linked from `how-to-use-the-thai-tax-calculator`, `expat-guide-filing-thai-taxes`, `thailand-tax-guide-for-expats`, `how-to-get-thai-tax-id-number` (`src/data/articles.ts:3270-3292`).
- **Overlap to resolve, not duplicate**: `dtv-visa-thailand-tax-guide` and `thailand-tax-guide-for-expats` both already explain the 180-day rule well (in some respects better than this article currently does — see Section 4). After the rewrite, the dedicated residency article should be the canonical, most-detailed treatment of *residency specifically* (with the self-check/examples), and those other articles should ideally trim their own residency explanations down to a shorter summary + link here, consistent with the "canonical article, others link out" pattern `CONTENT_INVENTORY.md` already recommends for the remittance-rule cluster. **This is a recommendation for a future consolidation pass, not part of Task 17B's scope** — flagging it here so it isn't lost.

---

## 14. Recommended title

**"Am I a Thai Tax Resident? The 180-Day Rule, Explained With Examples"**

Keeps the existing question-form title (good search-intent match, no reason to change the core framing) but signals the added worked-example content that differentiates the rewrite from the current thin version and from competitor pages.

**Alternatives**:
- "Thai Tax Residency: The 180-Day Rule and How to Count Your Days"
- "The 180-Day Rule in Thailand: How Tax Residency Actually Works"
- "Thai Tax Residency Explained: 180 Days, Visa Status, and What Changes When You Cross It"

---

## 15. Recommended meta description

"How Thailand's 180-day rule determines tax residency — with worked day-count examples, why your visa type doesn't decide it, and what changes once you cross the threshold."

(Signals the two things the current article is missing most: worked examples and the residency-vs-visa distinction.)

---

## 16. Quality targets

| Dimension | Current | Target |
|---|---|---|
| Accuracy | 6/10 | 9/10 |
| Source quality | 2/10 | 9/10 (specific, already-verified primary Section 41 citation + registry-backed remittance citation) |
| Originality | 1/10 | 7/10 (worked examples + misconception correction; not claiming a full interactive tool) |
| User usefulness | 3/10 | 8/10 (title's implicit promise — "am I a resident?" — actually answered via self-check + examples) |
| Clarity | 6/10 | 8/10 |
| Tax-year specificity | 4/10 | 8/10 (explicit 2024-01-01 effective date for the remittance-gate mention; core residency rule correctly framed as evergreen) |
| Calculator integration | 0/10 | 6/10 (honest CTA; capped below 8-9 because the calculator genuinely can't help with the borderline-day-count scenarios this article covers — see Section 12) |
| Trustworthiness | 3/10 | 9/10 |
| SEO/search intent | 4/10 | 8/10 |

**Biggest gap-closers, in priority order**: (1) worked day-count examples + self-check, (2) residency-vs-visa misconception section, (3) correct/specific source citation, (4) explicit 2024+ effective-date framing at the gate level only, (5) honest calculator CTA.

---

## 17. Implementation notes for Task 17B

- **Do not restate the "partial days count as full days" claim more confidently than the site's own FAQ does.** Match or link to the FAQ's existing hedge ("no precise statutory definition... Revenue Department practice").
- **Reuse existing source-registry entries verbatim** (`rd-section-41`, `mahanakorn-remittance-rule` from `src/data/sources.ts`) — do not invent new citation objects or new URLs.
- **Do not build out remittance mechanics in this article.** Link to `transferring-money-to-thailand-tax-rules` for anything beyond "residency is the gate that makes the 2024+ rule apply to you at all."
- **Do not claim the calculator accepts a real day count.** It's Yes/No only, storing placeholder values (181/90). Any CTA copy must not imply otherwise.
- **The >180 vs. ≥180 wording mismatch in `ResidencyStep.tsx`'s UI label is a separate, small copy-fix candidate** — flagged here for awareness, not something this content-only task should touch (it's calculator UI, not article content, and the underlying calculation logic is already correct).
- **Section 39 ("tax year = calendar year") is a new fact surfaced by this audit's direct RD fetch** that isn't yet a separate line item in `tax-data/2026/residency.json` — worth adding as a `verification_notes` addendum to the existing `thai-residency-days` entry when this rewrite ships, so the registry stays the source of truth for what's been verified and how.
- **No calculation code, tax data JSON, or unrelated articles should be touched** — this task's only deliverable is this brief; Task 17B's deliverable should be limited to `src/data/articles.ts`'s `understanding-thai-tax-residency` entry (content, title, excerpt, sources array, `publishedAt`) plus, if approved separately, the registry addendum noted above.
- **Consider updating `publishedAt`** (or introducing a `reviewedAt` field, per `CONTENT_INVENTORY.md`'s existing suggestion) to reflect the actual rewrite date rather than silently keeping 2024-01-15 on substantially new content.
