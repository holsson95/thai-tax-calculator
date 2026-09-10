# Content Rewrite Brief 003 — Foreign Income Article

**Status: Audit and planning only. Article NOT modified. No tax data, calculation code, or unrelated content changed. Awaiting approval before any implementation task acts on this.**

**Scope note**: unlike Brief 001/002, this audit's central question is not just "how should this article be rewritten" but "should this article exist as a standalone rewrite at all" — `CONTENT_INVENTORY.md` already flags `foreign-income-thailand-tax` for **consolidation into `transferring-money-to-thailand-tax-rules`** rather than a standalone rewrite, because that sibling article already covers the same ground more thoroughly. This brief evaluates that recommendation directly (Section 3) before proceeding with the rest of the standard audit, per `CLAUDE.md`'s content rule against generating duplicate content.

---

## 1. Article selected

- **URL**: `/articles/foreign-income-thailand-tax/`
- **File**: `src/data/articles.ts:446-508`
- **Current title**: "Foreign Income in Thailand: When Is It Taxable?"
- **Current length**: 224 words (per `CONTENT_INVENTORY.md`; confirmed by direct read)
- **`publishedAt`**: 2024-03-15 — one of the 5 oldest, never-revisited articles
- **Category**: "International"

---

## 2. Current article summary

Five short sections: "The Remittance Rule" (pre-2024 rule, 3 bullets), "Recent Changes" (vague "the Revenue Department has announced changes... may be taxable"), "Types of Foreign Income" (4 one-line category definitions: employment, investment, rental, business), "Tax Treaties" (generic 3-bullet description + a bare list of 6 "common treaty partners" with no detail), "Planning Strategies" (4 generic bullets: timing, documentation, tax credits, professional advice). One source cited: the RD English homepage (`rd.go.th/english/index-eng.html`), not a page specific to foreign income or the 2024 rule. No worked example, no table, no dates, no calculator link.

---

## 3. Should this be a standalone rewrite, or consolidated? (evaluated before proceeding)

**Finding: the inventory's consolidation flag is correct on the merits, but a full merge is not the right fix — this should become a distinct, narrower "concepts" article that hands off to the calculator-connected article for mechanics, not be deleted or redirected.**

Comparison, based on direct reads of both articles' full content:

| | `foreign-income-thailand-tax` (this article) | `transferring-money-to-thailand-tax-rules` (sibling, 2026-03-05) |
|---|---|---|
| Length | 224 words | ~960 words |
| States the 2024 effective date | No ("Starting from 2024," no day/month) | Yes — "1 January 2024," and the pre-2024 vs. 2024+ distinction with a worked date example |
| Cites the specific rule instrument | No | Yes — "Revenue Department Circular P.161/2566" (note: labeled "Circular," registry/this audit's primary terminology is "Order" — see Section 4, row 2, a real citation-label discrepancy between the two sibling articles that should be resolved, not duplicated) |
| Worked examples | None | Two tables: "Who Is Affected" (4 rows) and "Practical Examples" (6 scenarios) |
| Defines what counts as a remittance | No | Yes — 5-item bullet list (wire transfers, ATM withdrawals, card purchases, digital transfers, cash over the reporting threshold) |
| Defines capital vs. income distinction | No | Yes — dedicated section with 5 non-taxable categories and a documentation recommendation |
| Explains "how much tax" mechanically | No | Yes — ties into allowances and links to the calculator |
| Calculator link | No | Yes ("Use the calculator to estimate your total tax position including any remitted foreign income.") |
| Practical tax-reduction strategies | Generic ("Timing," "Professional Advice") | Concrete and sourced (transfer-only-what-you-need, capital/income account separation, LTR visa route, DTA credit route) |
| DTA/treaty coverage | Generic 3-bullet + bare country-name list, no depth | Cites DTA foreign tax credit mechanism with a "cannot pay tax twice" statement, links out rather than re-deriving |
| Income-type breakdown (employment/investment/rental/business) | Yes — 4 one-line definitions, the one piece of content not duplicated elsewhere in this exact form | Not present in the sibling article |

**Verdict**: `transferring-money-to-thailand-tax-rules` is a strictly more complete, better-sourced, better-dated, calculator-linked treatment of remittance mechanics. Rewriting `foreign-income-thailand-tax` to *also* cover remittance mechanics in comparable depth would be pure duplication — directly against `CLAUDE.md`'s content rule. However, deleting or fully merging it away is not obviously right either: `foreign-income-thailand-tax`'s title and search intent ("when is foreign income taxable") is a genuine, distinct, evergreen head-term query, separate from "transferring money to Thailand" (a more transactional, how-do-I-do-this query). The one piece of real, non-duplicated content here — the four-category breakdown of *what kinds of foreign income exist* (employment / investment / rental / business) and how each is sourced/taxed — is not covered by the sibling article at all, nor fully by any other article found in this audit.

**Recommendation for the rewrite** (for a future implementation task, not decided here): reposition this article as the **conceptual entry point** — "what is foreign income and when does residency/remittance make it taxable, at a glance" — expand the one genuinely distinct section (income-type breakdown, with worked examples of how each type is sourced and treated), state the 2024+ rule accurately but briefly with an explicit link to `transferring-money-to-thailand-tax-rules` for full mechanics, and drop the now-redundant generic "Tax Treaties" and "Planning Strategies" sections in favor of links to `double-tax-agreements-thailand` and the remittance article respectively. This avoids both outcomes CLAUDE.md warns against: generating a rewrite that pads out a thin article with generic filler, or duplicating content that already exists at higher quality elsewhere.

---

## 4. Claim audit

| # | Claim (as currently written) | Tax year | Source currently cited | Source quality | Verification status | Recommended action |
|---|---|---|---|---|---|---|
| 1 | "Thailand historically taxed foreign-sourced income only if: 1. You are a Thai tax resident, 2. The income is remitted... 3. ...in the same year it was earned" | Pre-2024 (implicit, undated) | RD homepage (generic) | Weak | **VERIFIED** — consistent with the registry's foreign-income entry and with the sibling article's independently-written description of the old rule; both converge on the same pre-2024 mechanic. | Keep the substance, but state the "historically" period has a specific end date (see row 2) rather than leaving it open-ended. |
| 2 | "Starting from 2024, foreign-sourced income brought into Thailand may be taxable regardless of when it was earned." | 2024 (vague — no month/day) | Same | Weak | **VERIFIED but imprecisely dated** — the actual effective date is **1 January 2024** (`tax-data/2026/foreign-income.json`, `verified: true`; sibling article states it explicitly). Also note: the word "may" is unnecessarily hedgy for a rule that, once conditions are met, applies definitely, not probabilistically — the calculator's own logic (`isForeignIncomeTaxable`) treats this as a deterministic yes/no, not a "may." | Rewrite to state the exact date and remove the soft "may," while still being honest that classification (capital vs. income, DTA exemptions, LTR exemptions) affects whether *a given transfer* is taxable — that's a real conditionality, different from the rule itself being uncertain. |
| 3 | "The Revenue Department has announced changes to foreign income taxation" — no instrument named | 2024 | RD homepage | Weak — no legal citation at all | **UNSUPPORTED AS WRITTEN (missing citation)** — the actual instrument is Order **Por. 161/2566** (clarified by Por. 162/2566), per `tax-data/2026/foreign-income.json`, strong secondary-source verified (Mahanakorn Partners Group, corroborated by KPMG). The sibling article names it, but as "**Circular** P.161/2566" — **this is a labeling discrepancy the project already has internally**: the registry and this audit's own direct research consistently call it an "Order" (คำสั่ง), while the sibling article calls it a "Circular." Neither this audit nor the existing registry entry resolves which English term is more accurate — **flagging as SOURCE NEEDED / TERMINOLOGY NEEDS VERIFICATION**, not resolving it here. | Do not silently pick one label. Cite the instrument number (Por. 161/2566) either way, and flag the Order-vs-Circular naming inconsistency for resolution in Task 17-equivalent implementation — ideally standardized across both articles at once, not just this one. |
| 4 | "Income earned in prior years may now be taxable when remitted" | 2024+ | Same | Weak | **VERIFIED, same underlying fact as row 2** | Merge with row 2 rather than repeating as a separate bullet — avoids restating the same fact three times in slightly different words, a pattern also seen in Brief 001's critique of the brackets article's "Key Takeaways" section. |
| 5 | "Stricter enforcement expected" | Not stated | Same | None — no source at all | **UNSUPPORTED / SOURCE NEEDED** — no source located in this audit, the registry, or `TAX_RULES.md` supporting a specific enforcement-posture claim. This is exactly the kind of "uncertain interpretation stated as fact" `CLAUDE.md` prohibits. | **Cut, or mark explicitly as speculative/SOURCE NEEDED if kept.** Do not carry into any rewrite without a real source. |
| 6 | "Some exemptions still apply" | Not stated | Same | Weak — no specifics given at all | **VAGUE BUT DIRECTIONALLY TRUE** — real exemptions do exist and are verified elsewhere in the project (LTR visa exemption for 3 visa categories, per `tax-data/2026/foreign-income.json`; DTA pension-article exemptions for specific pension types, per the same file; pre-residency/pre-2024 capital, per the sibling article). The current article names none of them. | Replace the vague line with either a short named list (LTR exemption, DTA pension exemptions, pre-2024/pre-residency capital) with links to where each is covered, or cut it — a claim that gestures at "exemptions exist" without naming any is not useful and borders on the generic-filler pattern `CLAUDE.md` warns against. |
| 7 | Employment / Investment / Rental / Business income category definitions | Evergreen | None cited for this specific breakdown | N/A — these are definitional, not sourced from an external rule | **VERIFIED as consistent with the Revenue Code's general income-type structure** (Section 40 categories, per the registry's deductions/withholding sections, though those cover *domestic* income-type classification — this audit did not find a foreign-income-specific version of this categorization independently sourced). Not incorrect, but currently under-sourced as a *foreign-income* framework specifically. | Keep as the article's one genuinely useful, non-duplicated section; consider tying each category back to how it interacts with residency + remittance (e.g., "foreign rental income is taxed the same way as foreign employment income once remitted — the source doesn't matter, only residency + remittance + earn-date do") rather than leaving each as an isolated one-liner. |
| 8 | "Thailand has tax treaties with many countries that may: reduce withholding rates, provide exemptions... allow foreign tax credits" | Evergreen | None | Weak — generic | **VERIFIED mechanism** (DTA credit formula confirmed against primary US-Thailand treaty text elsewhere in the registry), but stated with zero specifics here and with the vague "may" hedge. | Either state the actual credit mechanism briefly (min(foreign tax, Thai tax on same income), requires a DTA) with a link to `double-tax-agreements-thailand` for full detail, or cut this section entirely in favor of the link — currently adds no information beyond "treaties exist," which a reader already assumes. |
| 9 | "Common Treaty Partners: United States, United Kingdom, Australia, Singapore, Japan, Germany" | Evergreen | None | N/A — no source for the list itself | **VERIFIED** — all 6 confirmed present with `hasDTA: true` in `src/data/dtaCountries.ts` (checked directly in this audit). | Keep if this section is kept at all, but note the site's DTA country *count* has a documented, unresolved discrepancy (the code comment says 61, the registry's live-fetched RD count says 62 — see `TAX_RULES.md`) — if this article states a total country count anywhere in a rewrite, it must use the corrected figure or avoid stating a specific count at all. This article currently doesn't state a total, so no action needed unless a rewrite adds one. |
| 10 | "Timing," "Documentation," "Tax Credits," "Professional Advice" (Planning Strategies) | N/A | None | N/A — generic advice, not factual claims | Not a sourcing issue; a content-quality issue — this is the kind of generic, could-apply-to-any-article filler `CLAUDE.md`'s content rule discourages when it substitutes for original value. | Cut in favor of a link to `transferring-money-to-thailand-tax-rules`'s much more concrete "How to Reduce the Tax on Remittances" section (transfer-only-what-you-need, capital/income separation, LTR route, DTA credit route) — do not duplicate that section's content here. |

**Summary**: no claim is factually false, but three are meaningfully weak: (1) the effective date is under-specified (should be 1 January 2024, not just "2024"), (2) the legal instrument is never named at all (a real sourcing gap, compounded by an unresolved Order-vs-Circular naming inconsistency with the sibling article), and (3) "stricter enforcement expected" is unsourced speculation that should not survive into any rewrite without a citation.

---

## 5. Verified tax rules (usable directly, already confirmed by this project)

1. **Pre-2024 rule**: foreign-sourced income was taxable for a Thai tax resident only if remitted to Thailand in the same calendar year it was earned. Strong secondary-source verified (`tax-data/2026/foreign-income.json`).
2. **2024+ rule**: Order Por. 161/2566, effective **2024-01-01**, clarified by Por. 162/2566 — foreign-sourced income earned on/after that date is assessable when remitted by a Thai tax resident, in the same or any later year. Income earned before 2024-01-01 stays under the old same-year rule. Same source; convergent across Mahanakorn Partners Group and KPMG; **not primary-document verified** (Thai-language RD order text not directly fetched by the registry or this audit).
3. **Residency is the gate**: this rule applies only to Thai tax residents (180+ days); non-residents are never taxed on foreign income regardless of remittance. Confirmed directly against calculator logic (`isForeignIncomeTaxable`, `src/utils/foreignIncomeCalculations.ts:44-63`).
4. **Foreign tax credit mechanism**: credit = min(foreign tax paid, Thai tax on the same income); requires a DTA with the source country; disallowed entirely with no DTA. Primary-source verified against Article 25(2) of the US-Thailand treaty (`tax-data/2026/foreign-income.json`).
5. **LTR visa exemption**: three LTR categories (Wealthy Global Citizen, Wealthy Pensioner, Work-from-Thailand Professional) are exempt from Thai tax on foreign-sourced income **when remitted** — primary-verified against Royal Decree No. 743 B.E. 2565, Section 5 (full text read). Note the registry's own correction: the exemption applies specifically to *remitted* income, not "regardless of remittance" as an earlier version of the app's own copy incorrectly stated — a caution directly relevant to any rewrite of this article.
6. **DTA pension article exemptions exist but are not uniform**: government/social-security pensions are typically source-country-only taxable; ordinary private pensions can be the *opposite* (residence-only, i.e., Thailand-taxable for a Thai resident) — confirmed against US-Thailand treaty Articles 20–21. A blanket "pensions may be exempt" statement would risk exactly the kind of oversimplification `CLAUDE.md` warns against.
7. **Six named countries (US, UK, Australia, Singapore, Japan, Germany) all currently have a DTA with Thailand** — confirmed directly against `src/data/dtaCountries.ts` in this audit.

---

## 6. Uncertain / unsupported claims (do not state as flat fact)

- **"Stricter enforcement expected."** No source found anywhere in the project or during this audit. **Cut, or explicitly mark SOURCE NEEDED** if retained in any form — this is a prediction about administrative behavior, not a documented rule.
- **"Some exemptions still apply"** stated with zero specifics — not false, but too vague to be useful or verifiable as written; needs to either name the real exemptions (LTR, DTA pension articles, pre-2024/pre-residency capital) or be cut.
- **Whether "Circular" or "Order" is the correct English term for Por. 161/2566.** The sibling article (`transferring-money-to-thailand-tax-rules`) calls it a "Circular"; the registry (`tax-data/2026/foreign-income.json`) and this audit's own research consistently use "Order." **Neither was resolved against a primary Thai-language legal text in this audit** — flagging as an open item, not resolving by picking whichever sounds better.
- **"Thailand has tax treaties with many countries that may: reduce withholding rates, provide exemptions..."** — the *mechanism* is verified elsewhere in the registry, but as stated in this article it's an unsupported generality with no citation attached to the sentence itself.

No conflicting sources were found on the core remittance-rule facts (effective date, gate condition, old-vs-new mechanic) — the registry, the sibling article, and every other article checked in this audit (`digital-nomad-taxes-thailand`, `dtv-visa-thailand-tax-guide`, `thailand-tax-guide-for-expats`) agree with each other.

---

## 7. Source map

| Rule | Source | Type | URL | Tax year | What it supports |
|---|---|---|---|---|---|
| 2024+ remittance rule (Por. 161/2566, Por. 162/2566) | Mahanakorn Partners Group, corroborated by KPMG | **Secondary** (convergent, not primary-document-fetched) | `https://mahanakornpartners.com/comprehensive-overview-of-order-no-por-161-2566-and-no-por-162-2566-on-personal-income-tax-for-foreign-sourced-income/` | Effective 2024-01-01 | Already in `src/data/sources.ts` as `mahanakorn-remittance-rule`. **Reuse — do not create a second, differently-worded citation for the same rule.** |
| Foreign tax credit mechanism | US-Thailand Double Taxation Convention, Article 25(2) | **Primary, directly quoted** | `https://www.irs.gov/pub/irs-trty/thailand.pdf` | Evergreen | Already in `src/data/sources.ts` as `irs-us-thailand-treaty`. **Reuse.** |
| LTR foreign-income exemption | Royal Decree No. 743, B.E. 2565, Section 5 | **Primary, full text read** | `https://ltr.boi.go.th/documents/Royal%20Decree%20issued%20under%20the%20Revenue%20Code%20No.743%20(EN).pdf` | Evergreen | Already in `src/data/sources.ts` as `boi-decree-743`. **Reuse.** |
| DTA country list (for the "common treaty partners" line, if kept) | Thai Revenue Department — DTA list | **Primary** | `https://www.rd.go.th/english/766.html` | 2026 (live table) | Already in `src/data/sources.ts` as `rd-dta-list`. **Reuse**; note the unresolved 61-vs-62 count discrepancy if a total is ever stated (see Claim 9). |
| Residency gate condition | Thai Revenue Department, Revenue Code Section 41 | **Primary, directly quoted** | `https://www.rd.go.th/english/37749.html` | Evergreen | Already `rd-section-41` in `src/data/sources.ts` (also the primary citation recommended for Brief 002's residency article) — reuse rather than re-deriving. |
| Full remittance mechanics (what counts as a remittance, capital vs. income) | Internal — `transferring-money-to-thailand-tax-rules` | N/A, internal link | `/articles/transferring-money-to-thailand-tax-rules/` | 2024+ | Not this article's job to re-source; link out. |

**No new source infrastructure is needed.** Every external fact this article needs already has a vetted entry in `src/data/sources.ts` / the registry. The current citation (`rd.go.th/english/index-eng.html`, the generic homepage) should be replaced with the specific, already-verified entries above rather than any newly invented URL.

---

## 8. 2024+ foreign-income findings (this article's core subject — restated precisely, per Step 4 of the audit instructions)

- **What changed**: the timing condition for taxing a Thai tax resident's foreign-sourced income. Before: only taxable if remitted in the same calendar year earned. After: taxable when remitted, regardless of which year it was earned (subject to the 2024-01-01 floor below).
- **Effective date**: **1 January 2024**, per Order Por. 161/2566.
- **Which income is affected**: foreign-sourced income earned **on or after** 2024-01-01, by a **Thai tax resident** (180+ days), **when remitted** to Thailand — in the same year or any later year. Income earned before 2024-01-01 keeps the old same-year-remittance rule (per the clarifying Por. 162/2566), even if remitted in 2024 or later.
- **Does it depend on Thai tax residency?** Yes — this is a precondition, not a parallel rule. Non-residents are unaffected regardless of remittance (see Brief 002, Section 8, for the equivalent residency-side framing — the two briefs should be read as describing the same gate from opposite sides).
- **Does the year income was earned matter?** Yes — it's the line between old-rule and new-rule treatment.
- **Does the year money is remitted matter?** For pre-2024-earned income, yes (same-year-remittance still required for exemption from the old rule to apply). For post-2024-earned income, no — remittance in any year triggers taxation.
- **Exceptions that exist and should be named, not left vague**: (1) LTR visa exemption for three specific visa categories, on remitted foreign income; (2) DTA pension-article exemptions, which are pension-type- and country-specific and can run in *either* direction (source-only or residence-only); (3) capital accumulated before Thai tax residency began, or (per the sibling article, marked there as "a grey area") pre-2024 savings — these are not "income" in the first place, a different concept from a rule *exemption*.
- **Verification status**: Strong secondary-source (multiple independent professional-services firms converge) — **not primary-document verified** by either the existing registry or this audit. The instrument's correct English label (Order vs. Circular) is itself unresolved between the project's own two articles (Section 4, row 3) and should be fixed consistently, not independently guessed at in this rewrite.

---

## 9. Original-value opportunities (5 identified)

1. **Expand the one genuinely distinct section — the income-type breakdown — into something with real substance.** Currently four one-line definitions (employment/investment/rental/business). None of the other foreign-income-adjacent articles on the site organize content this way. A worked table showing, for each income type, a concrete example of "foreign-sourced" vs. "Thai-sourced" for that category (e.g., dividends from a US brokerage vs. dividends from a Thai-listed company) would be genuinely new and directly useful — and matches the calculator's own per-entry country/type/date model (`ForeignIncomeEntry`), so it's not inventing a framework the app doesn't share.
2. **A short "which article do I need?" router at the top of the piece** — since this topic legitimately spans three articles (`foreign-income-thailand-tax`, `transferring-money-to-thailand-tax-rules`, `understanding-thai-tax-residency`/Brief 002), a 3-line signpost ("Want to know if you're a resident? → here. Want the remittance mechanics and worked examples? → here. This page: what foreign income even is.") is itself original, user-serving structure that no competitor page bothers with, and directly resolves the duplication concern raised in Section 3.
3. **Naming the real exemptions instead of the vague "some exemptions still apply."** Turns an unsupported, low-value line into a genuinely useful, fully-sourced mini-section (LTR / DTA pension articles / pre-residency capital), each with a one-line pointer to where full detail lives.
4. **A short, accurate restatement of the foreign tax credit mechanism** (min(foreign tax, Thai tax on same income), DTA required) tied to a named worked figure — this is a formula the project has already primary-source-verified but which appears nowhere in reader-facing article prose in this precise form; currently it's only implicit in the "Tax Treaties" article and the calculator.
5. **Honest calculator hand-off** tied to the `ForeignIncomeEntry` model's actual fields (country, date earned, date remitted, foreign tax paid) — see Section 12.

---

## 10. Recommended article structure (repositioned per Section 3's verdict)

| # | Section | Purpose |
|---|---|---|
| 1 | Intro + "which article do I need" router | Sets the article's narrower scope honestly and resolves the duplication concern up front (Opportunity 2). |
| 2 | What counts as foreign-sourced income (expanded 4-category breakdown with concrete examples) | The core original-value addition (Opportunity 1) — the one section genuinely unique to this article. |
| 3 | When residency turns foreign income into a Thai tax question (brief, gate-level only) | Links to Brief 002's residency article rather than re-explaining the 180-day rule. |
| 4 | The 2024+ rule, stated precisely (exact date, named instrument, old-vs-new one-paragraph contrast) | Corrects Claims 2 and 3 above; links to `transferring-money-to-thailand-tax-rules` for full remittance mechanics rather than re-deriving them. |
| 5 | Named exemptions (LTR, DTA pension articles, pre-residency/pre-2024 capital) | Replaces the vague "some exemptions still apply" line (Opportunity 3). |
| 6 | Foreign tax credit, briefly and accurately | Opportunity 4; links to `double-tax-agreements-thailand` for full DTA detail rather than the current generic "Tax Treaties" section. |
| 7 | Calculator hand-off | Section 12. |
| 8 | Sources | Reuse the four already-registered entries (Section 7) — no new source objects. |

**Cut entirely** (per Section 4 verdict on Claim 5 and Claim 10): "Stricter enforcement expected" and the generic "Planning Strategies" bullets (Timing / Documentation / Tax Credits / Professional Advice) — these duplicate, at lower quality, content the sibling article already does concretely and well.

---

## 11. Recommended examples (3 proposed — deliberately fewer than Brief 002's, since worked remittance-timing examples belong to the sibling article, not this one)

| # | Scenario | Assumptions | Tax year | Concept demonstrated | Source | Uncertainty |
|---|---|---|---|---|---|---|
| 1 | US-based dividend income vs. Thai-listed stock dividend income, both received by a Thai tax resident | Same person, two income streams | Evergreen | What makes income "foreign-sourced" vs. "Thai-sourced" in the first place — the article's core, distinct job | Section 40 general income-type framework (registry) + income-type breakdown (Claim 7) | None on the sourcing concept itself |
| 2 | UK government pension vs. UK private pension, both remitted to Thailand by the same Thai tax resident | Same country, two pension types | Evergreen | DTA pension exemptions are NOT uniform — a real, verified nuance (Verified Rule 6) that a generic "pensions may be exempt" statement would get wrong | US-Thailand treaty Art. 20-21 (as a worked mechanism example; a UK-specific pension article citation exists separately in `foreign-pension-income-thailand-tax` and should be used instead if this exact example is built, to avoid citing a US treaty for a UK scenario) | **Flag before publishing**: if this exact UK example is used, it needs the UK-Thailand treaty's own pension article numbers, not the US treaty's — this audit only directly verified the mechanism against the US treaty text. |
| 3 | LTR Wealthy Pensioner visa holder remitting foreign pension income vs. a Non-OA retirement visa holder doing the same | Same income, different visa | Evergreen | Visa type materially changes foreign-income tax outcome for LTR specifically — but ONLY for LTR, not other visas (a point already correctly made in the FAQ and `thailand-tax-guide-for-expats`, worth reinforcing here in the foreign-income-specific context) | Royal Decree No. 743, Section 5 (verified) | None on the LTR mechanism; note per Verified Rule 5 that the exemption is for *remitted* income, not blanket |

**Do not** add a remittance-timing example (e.g., "income earned 2022, remitted 2025") — that exact example already exists, well-executed, in `transferring-money-to-thailand-tax-rules`'s "Practical Examples" table. Repeating it here would be the duplication this brief recommends against.

---

## 12. Calculator integration — what's actually supported

Confirmed by reading `src/utils/foreignIncomeCalculations.ts` in full:

- **The calculator has a genuinely rich foreign-income model**, more capable than either article currently represents: it tracks, per entry, `country`, `dateEarned`, `dateRemitted`, `foreignTaxPaid`, `isPension`/`pensionType`, and computes taxability via `isForeignIncomeTaxable()` — checking residency, LTR exemption, DTA pension-article exemption, the 2024-01-01 earned-date floor, and remittance, in that order.
- **It does calculate a DTA foreign tax credit** per entry (`calculateForeignTaxCredit`) — lesser of foreign tax paid or Thai tax on that income, disallowed entirely with no DTA (`hasDTAWithThailand`).
- **It does apply the LTR exemption** automatically when the relevant visa type is selected, and **does apply DTA pension-article exemptions** for recognized pension type/country combinations (`getPensionDTAExemption`).
- **It does distinguish pre-2024-earned income** from 2024+-earned income via the actual `dateEarned` field — this is materially more precise than either article's current prose, which only speaks in terms of "the year" abstractly.
- **What it does NOT do**: it does not calculate or model the capital-vs-income distinction (pre-residency or pre-2024 savings) — a user must self-determine that an amount is capital, not income, before deciding whether to even enter it as a foreign income entry. This matches the sibling article's own framing ("There is no formal registration process... documentation is for your own protection") but is worth being explicit about in any CTA: the calculator computes tax on what you tell it is income, it does not adjudicate the capital/income question for you.
- **Recommended, honest CTA**: *"Once you know which of your foreign income is taxable, use the calculator to enter each amount by country, date earned, and date remitted — it will apply the 2024+ rule, DTA credits, and any LTR exemption automatically."* → link to `/annual-tax/`. **Do not claim** the calculator determines whether a transfer is capital vs. income, or resolves DTA pension-article classification beyond the country/pension-type combinations already built into `getPensionDTAExemption` — those judgment calls remain the user's.

---

## 13. Internal linking recommendations

- **Outbound (add)**: `transferring-money-to-thailand-tax-rules` (remittance mechanics — the primary hand-off this rewrite depends on), the residency article covered in Brief 002 (`understanding-thai-tax-residency`, for the gate condition), `double-tax-agreements-thailand` (DTA/credit detail), `foreign-pension-income-thailand-tax` (if the pension example in Section 11 is used, for country-specific pension-article detail beyond the US example verified here).
- **Inbound (already exists, no change needed)**: linked from `digital-nomad-taxes-thailand`'s related-articles block (`src/data/articles.ts:3282`).
- **Overlap to resolve, not duplicate**: `digital-nomad-taxes-thailand` and `dtv-visa-thailand-tax-guide` both also explain the pre-2024/2024+ rule distinction in their own words (see grep excerpts gathered during this audit) — consistent with each other and with this article's facts, but a fourth independent restatement. Once this article and `transferring-money-to-thailand-tax-rules` are the clearly-canonical pair (concepts vs. mechanics), the nomad/DTV articles would ideally trim their own restatements to a sentence + link, matching the consolidation pattern `CONTENT_INVENTORY.md` already recommends for this cluster. **Flagged for a future consolidation pass, not part of this brief's immediate scope.**

---

## 14. Recommended title

**"What Counts as Foreign Income in Thailand — and When Does It Become Taxable?"**

Reframes the title around the article's actual, narrower job after repositioning (Section 3) — distinguishing it from `transferring-money-to-thailand-tax-rules`'s more transactional "how do I move money" framing, while still matching the "foreign income taxable Thailand" search intent.

**Alternatives**:
- "Foreign Income in Thailand: What It Is, and How Residency Decides If It's Taxed"
- "Employment, Investment, Rental, or Business — How Thailand Taxes Each Type of Foreign Income"
- "Foreign Income in Thailand: The 2024 Rule Change and What's Actually Exempt"

---

## 15. Recommended meta description

"What foreign income actually means under Thai tax law — employment, investment, rental, and business income — and how residency, the 2024 remittance rule, and specific exemptions decide what you owe."

(Signals the article's distinct, narrower job — categorizing and gating — rather than remittance mechanics, which belongs to the sibling article.)

---

## 16. Quality targets

| Dimension | Current | Target |
|---|---|---|
| Accuracy | 6/10 | 9/10 |
| Source quality | 2/10 | 9/10 (reuses 4 already-verified registry entries; no new/invented citations) |
| Originality | 2/10 | 6/10 (capped below Brief 002's target — this article's job is deliberately narrower post-repositioning, to avoid duplicating the sibling article's original-value additions) |
| User usefulness | 3/10 | 7/10 (clear router to the right article for a given question, real income-type examples) |
| Clarity | 6/10 | 8/10 |
| Tax-year specificity | 3/10 | 8/10 (exact 2024-01-01 date, named instrument, resolved terminology pending) |
| Calculator integration | 0/10 | 6/10 (honest CTA tied to the real `ForeignIncomeEntry` model; capped because capital-vs-income classification stays a user judgment call, not a calculator feature) |
| Trustworthiness | 3/10 | 9/10 |
| SEO/search intent | 4/10 | 7/10 (capped slightly below Brief 002's target — the article now deliberately hands off depth to a sibling page rather than trying to rank as the single deepest page on the whole topic) |

**Biggest gap-closers, in priority order**: (1) resolve the missing legal-instrument citation and imprecise date, (2) cut the unsourced "stricter enforcement" claim and vague "some exemptions" line, (3) reposition/narrow scope to avoid duplicating `transferring-money-to-thailand-tax-rules`, (4) expand the income-type breakdown into the article's real original-value core, (5) honest calculator CTA tied to the actual per-entry model.

---

## 17. Implementation notes for a future implementation task

- **This is the one place in the "thin 2024-era articles" cluster where the right fix is repositioning, not just enrichment.** Do not simply pad the current sections with more words — several (Planning Strategies, generic Tax Treaties) should be cut in favor of links, per Section 10.
- **Resolve the Order-vs-Circular naming discrepancy against a primary source before publishing**, or state the instrument number (Por. 161/2566) without committing to either English word if a primary source can't be found in time — do not silently copy whichever label the sibling article happens to use.
- **Do not restate remittance mechanics** (what counts as a remittance, capital vs. income, practical reduction strategies) — link to `transferring-money-to-thailand-tax-rules` for all of that; duplicating it here would directly contradict `CLAUDE.md`'s content rule.
- **Do not restate the 180-day residency rule in depth** — link to the residency article (Brief 002's subject) for that; this article only needs the one-sentence "residency is the gate" framing.
- **Reuse existing source-registry entries verbatim** (`mahanakorn-remittance-rule`, `irs-us-thailand-treaty`, `boi-decree-743`, `rd-dta-list`, `rd-section-41`) — no new citation objects needed.
- **If the UK pension example (Section 11, #2) is used, source it against the UK-Thailand treaty specifically** (via `foreign-pension-income-thailand-tax`'s existing sourcing, if verified there) rather than citing the US treaty text this audit verified the general mechanism against.
- **No calculation code, tax data JSON, or unrelated articles should be touched.** Any future implementation task's deliverable should be limited to `src/data/articles.ts`'s `foreign-income-thailand-tax` entry (content, title, excerpt, sources array, `publishedAt`) — same constraint as Brief 002.
- **Consider whether this rewrite and Brief 002's residency rewrite should ship together or in sequence** — several of this brief's internal links (to the residency article) assume Brief 002's rewrite has also landed, or at minimum that the current residency article still functions adequately as a link target in the meantime.
