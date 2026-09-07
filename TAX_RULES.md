# Thai Tax Rules Registry

This is the master index of every tax constant currently used by the MyThaiTaxes
calculator, where it comes from, and whether that source has been independently
verified. It exists so no tax rule in this codebase is ever "just known" — every
row below either has a real citation or is explicitly flagged as needing one.

**Machine-readable detail lives in [`/tax-data/2026/`](tax-data/2026/)** — one
JSON file per category, each entry carrying `value`, `conditions`, `source`,
`verified`, `verification_notes`, and `used_in` (exact file/line in `src/`).
This document is the human-readable summary.

Last audited: 2026-09-07. Sourced via 8 parallel research passes (2026-09-07)
against Thai Revenue Department, SSO, BOI, and reputable secondary sources,
then a further 3 independent follow-up passes (2026-09-07) that fetched
primary documents directly to confirm or refute the highest-stakes findings —
see Methodology below.

## ✅ 3 confirmed calculation bugs — fixed 2026-09-07 (user-approved, tested)

A follow-up verification pass **confirmed** three real bugs found in the
initial audit — each independently re-checked against directly-quoted primary
RD text and/or multiple independent secondary sources, with no conflicting
figures found anywhere. The user explicitly approved fixing all three; each
was fixed with test coverage added (`src/config/__tests__/taxConfig.test.ts`,
plus an updated existing test in `src/utils/__tests__/taxCalculations.test.ts`),
and `npx tsc --noEmit` plus the full `vitest` suite were both run clean
(the only failures are 40 pre-existing, unrelated `react-helmet-async`/
happy-dom environment failures, confirmed present on the unmodified baseline
via `git stash`).

1. **FIXED: Contractor income (40(7)) flat deduction.** Was 40%, corrected to 60%, per a direct quote from RD's own 2021 PND90 guide ("...checking the '60 percent' box and entering 60% of the income...") plus two independent secondary sources, none disagreeing. This was a **live bug** — every 40(7) contractor-income user was overstated on tax owed. → [`deductions.json#flat-rate-contractor-40-7`](tax-data/2026/deductions.json)
2. **FIXED (data + live copy; new feature not built): Entertainment/sports/author-royalty misclassification.** Directly-quoted RD text confirms these don't belong under Section 40(6) liberal profession at all — entertainers/athletes are Section 40(8) with a *tiered* 60%/40%-above-300k rate capped at 600,000 THB; author/royalty income is Section 40(3) at 50%, capped at 100,000–200,000 THB (neither is a flat percentage, so neither could simply be "corrected" to a new number). **Important scope finding made during the fix**: this was actually **dead code** — `ThaiIncomeEntry` has no sub-type field, so these three sub-types were never reachable in any real calculation; `liberal_profession_40_6` always applied the flat 30% default regardless. What *was* live: `INCOME_TYPE_INFO.liberal_profession_40_6`'s user-facing examples/notes falsely listed entertainment/sports/author royalties as 40(6) income at 60% — that copy is now corrected. The misclassified entries were removed from the dead `LIBERAL_PROFESSION_RATES`/`LIBERAL_PROFESSION_SUBTYPES` tables (not given new percentages, since a flat percentage can't represent a tiered/capped rate) with a comment pointing future implementers to the correct classification. Building actual tiered/capped calculation support for these as new selectable income types is a real feature addition, not a bug fix — **not done, would need separate design + approval**. → [`deductions.json#liberal-profession-subrates`](tax-data/2026/deductions.json)
3. **FIXED: Sole-proprietor business category rates, 4 of 10 categories.** `service_business`, `transportation`, `construction`, `other_business` corrected from 40% to 60%, confirmed by two independent secondary sources. **Scope finding**: `BUSINESS_FLAT_RATE_DEDUCTIONS` itself is dead code (no sole-proprietor tax calculation exists in the app yet), but `BUSINESS_CATEGORY_DESCRIPTIONS` — a separate, *live* string table shown to users picking a business category — displayed the same wrong "40% flat-rate deduction" text, which has also been corrected. `retail_trade`/`manufacturing`/`restaurant_food`/`agriculture` (60%) and `professional_service` (30%) were already correct and left unchanged. → [`deductions.json#business-category-flat-rates`](tax-data/2026/deductions.json)

**Net effect on real users**: only bug #1 (contractor 40(7)) was mis-taxing anyone before this fix. Bugs #2 and #3's underlying calculation tables were unreachable dead code — their live impact was limited to misleading descriptive text, now corrected.

Two smaller, lower-stakes items also remain flagged (not re-verified, not
fixed): the pension fund cap may be 200,000 (not 500,000) as an individual
sub-cap ([`deductions.json#max-pension-fund`](tax-data/2026/deductions.json)),
and the DTA country count comment was corrected from 61 to 62 ([`foreign-income.json#dta-country-list`](tax-data/2026/foreign-income.json)) — a documentation-only fix, not a calculation change.

**None of these were "corrected" by editing the calculator.** They're recorded
here, with sources, for a deliberate follow-up decision.

## Methodology

8 independent research passes were run in parallel (2026-09-07), each briefed
to find *specific, checkable* sources — Revenue Department (rd.go.th), Social
Security Office (sso.go.th), Board of Investment (boi.go.th / ltr.boi.go.th),
primary treaty texts, or reputable secondary sources (Big 4 firms, Thai law
firms) that themselves cite a specific law/decree/notification number — and
explicitly forbidden from asserting a value from general knowledge without a
found source. Findings were then written into `/tax-data/2026/*.json` verbatim
from what each pass reported, including its uncertainty. A "✅ Yes" verified
status generally means a primary government document was fetched and read, or
multiple independent reputable sources converged with a named legal basis; it
does not always mean the exact document text was quoted from the fetch.

## Income Tax Brackets — [`tax-data/2026/income-tax-brackets.json`](tax-data/2026/income-tax-brackets.json)

| Rule | Value | Tax Year | Conditions | Source | Verified |
|---|---|---|---|---|---|
| PIT brackets 1-8 (0%→35%) | 150k/300k/500k/750k/1M/2M/5M thresholds | Since 2017 | Taxable income after allowances/deductions | Sherrings (secondary), citing Revenue Code Amendment Act No. 44 B.E. 2560 | ❌ No — see known issue below |

**Known issue**: RD's own English page (`rd.go.th/english/6045.html`) is **stale** — it still shows pre-2017 figures (4,000,000 THB top bracket, 30% max rate) and directly contradicts current law. Do not use it to "correct" these figures; it is the outdated one. No working current primary-law page was located during research — brackets rest on convergent secondary sources only.

## Allowances — [`tax-data/2026/allowances.json`](tax-data/2026/allowances.json)

| Rule | Value | Tax Year | Conditions | Source | Verified |
|---|---|---|---|---|---|
| Personal allowance | 60,000 THB | 2026 | Every taxpayer | PwC / Sherrings (secondary), Amendment Act No. 44 | ❌ No |
| Spouse allowance | 60,000 THB | 2026 | Married AND spouse has no income | PwC / Sherrings | ❌ No |
| Senior (65+) — **is an exemption, not an "allowance"** | 190,000 THB | 2026 | Age 65+; exempts first 190,000 THB of income | Sherrings + RD exemption form | ❌ No — "Section 42(17)" citation could NOT be confirmed by any source; treat as unconfirmed, not fact |
| Child allowance (base) | 30,000 THB/child | 2026 | Per qualifying child (adopted capped at 3) | Forvis Mazars + Sherrings | ✅ Yes |
| Child allowance (bonus) | +30,000 THB | 2026 | 2nd+ child born 2018+, **excludes adopted children** (app doesn't model this exclusion) | Forvis Mazars + Sherrings, Amendment Act No. 46 B.E. 2561 (12 Nov 2018) | ✅ Yes |
| Parent allowance | 30,000 THB/parent | 2026 | Parent must be 60+, income ≤30,000/yr, only one sibling can claim (app only stores a self-certification checkbox, not these numeric thresholds) | MSNA Group + PwC + Sherrings | ❌ No |
| Max parents | 4 | 2026 | **Not a stated statutory cap** — derived from "at most 2 own + 2 spouse's parents" | (derived, not directly sourced) | ❌ No |

## Deductions — [`tax-data/2026/deductions.json`](tax-data/2026/deductions.json)

| Rule | Value | Conditions | Source | Verified |
|---|---|---|---|---|
| Standard deduction (40(1)) | 50%, capped 100,000 THB | Employment income | PwC (secondary) | ❌ No |
| Rental (40(5)) | 30% flat in app | RD's table actually varies by property type: houses/vehicles 30%, agricultural land 20%, non-agricultural land 15%, other 10% — app only models the 30% case | **RD Guide to PND90, Appendix Table A** (primary, fetched) | ✅ Yes (primary), but incomplete modeling |
| Liberal profession 40(6) default | 30% | RD's official list is only 6 professions: legal, medical, engineering, architecture, accounting, fine arts | RD Guide to PND90, p.14-15 (primary) | ✅ Yes |
| **Contractor 40(7)** | **FIXED: was 40%, now 60%** | Direct quote from RD's own 2021 PND90 guide: "...checking the '60 percent' box..."; corroborated by 2 independent secondary sources, no disagreement | RD Guide to PND90 (primary, quoted) + thailand.go.th + Sherrings | ✅ Yes — fixed 2026-09-07, was a live bug affecting real users |
| Business/sales 40(8) | 60% | Matches RD's near-universal 60% for business income | RD Guide to PND90, Table A (primary) | ✅ Yes |
| Dividend | 0% | No deduction — taxed gross/gross-up with credit instead | RD Guide to PND90 (inferred) | ✅ Yes (by inference) |
| **Liberal profession sub-rates** | **FIXED (dead-code data + live copy): entertainment/sports/author removed from the flat-60% list** | Directly-quoted RD text confirms: entertainers/athletes → 40(8) tiered 60%/40% above 300k, capped 600,000 THB; authors/royalties → 40(3), 50% capped 100k-200k THB — neither is representable as a flat percentage. New detail: a 2026 decree (No. 803) separately made *visual* fine artists (not performers) eligible for 60% under 40(6) from tax year 2025. | RD Guide (primary, quoted) + Sherrings + ExpatTaxThailand | ✅ Yes — fixed 2026-09-07; was dead code with zero live tax-calculation impact, but corrected misleading user-facing copy |
| **Business category flat rates** | **FIXED (4 of 10 categories): service_business, transportation, construction, other_business now 60%** | retail/manufacturing/restaurant/agriculture (60%) and professional_service (30%, non-medical) were already correct | Sherrings + Acclime (secondary, agreeing with each other and the primary-sourced contractor finding) | ✅ Yes — fixed 2026-09-07; table itself was dead code, but the matching live `BUSINESS_CATEGORY_DESCRIPTIONS` text was also corrected |
| Combined retirement cap | 500,000 THB | Pension+provident+RMF+SSF combined, excludes life/health insurance. **Not enforced anywhere in calculation code** — only individual caps applied | Forvis Mazars + RD Guide p.7 | ✅ Yes (source); ❌ enforcement gap remains |
| Life insurance cap | 100,000 THB | 10+ year Thai policy | RD English page (primary) | ✅ Yes |
| Health insurance cap | 25,000 THB | Combined life+health capped at 100,000 THB total | Sherrings + Forvis Mazars (secondary) | ❌ No |
| **Pension fund cap** | **500,000 THB in app** | Individual sub-cap may actually be 200,000 THB (also 15%-of-income limit); 500,000 only applies to the *combined* ceiling | Forvis Mazars (secondary) | ⚠️ **Flagged as possibly wrong — see top of document** |
| Provident fund cap | 500,000 THB | 15% of wage, max 500,000 | RD English page (primary) | ✅ Yes |
| RMF cap | 500,000 THB | Also a 30%-of-income overlay not modeled in app | Forvis Mazars (secondary) | ✅ Yes |
| SSF cap | 200,000 THB | Same 30%-of-income overlay caveat | Forvis Mazars (secondary) | ✅ Yes |
| Donation cap | 10% | Some categories (education/hospitals/e-Donation) get 2x multiplier, not modeled (conservative gap, not an error) | RD English page + Guide No.11 (primary) | ✅ Yes |

## Social Security — [`tax-data/2026/social-security.json`](tax-data/2026/social-security.json)

| Rule | Value | Tax Year | Source | Verified |
|---|---|---|---|---|
| SSO contribution cap | 9,000 THB | **2024 and 2025** (corrected — held through all of 2025, not just 2024) | BDO Thailand + DLA Piper | ✅ Yes |
| SSO contribution cap | 10,500 THB | **2026 onward (Phase 1, through 2028)** | BDO Thailand + DLA Piper, Cabinet-approved 2 Dec 2025, Royal Gazette 12 Dec 2025, effective 1 Jan 2026 | ✅ Yes |

**Correction made**: the project owner's initial statement (10,500 applies for 2025 *and* 2026) was checked against research and found to be a year early — 9,000 held through all of 2025; 10,500 only starts in 2026. The stale code comment ("Max 9,000 for 2025") has been fixed to reflect the correct figures. Two independent secondary sources agree, but the primary Royal Gazette regulation number was not directly pulled.

## Withholding — [`tax-data/2026/withholding.json`](tax-data/2026/withholding.json)

| Rule | Value | Conditions | Source | Verified |
|---|---|---|---|---|
| WHT 40(6) liberal profession | 3% | Rises to 10% if payer is a foundation/association (not modeled) | RD rate table under Tor.Por. 4/2528 (primary) | ✅ Yes |
| WHT 40(7) contractor | 3% | Rises to 5% for foreign payer with no PE in Thailand (not modeled) | Same (primary) | ✅ Yes |
| **WHT 40(8) business/sales** | **3% flat in app** | Real rate varies sharply by activity: general service 3%, transportation 1%, advertising 2%, insurance 1%, prizes 5% — app's flat 3% is a real oversimplification | Acclime + Forvis Mazars | ✅ Yes (confirmed oversimplification, not just unsourced) |
| WHT 40(5) rental | 5% | Rises to 10% for foundation/association payer; individual-to-individual rent often has no WHT obligation at all | RD rate table (primary) | ✅ Yes |
| WHT dividend (final election) | 10% | Election under Revenue Code §48(3) | Sherrings + PwC | ✅ Yes |
| WHT salary 40(1) | N/A (progressive) | Structural, not a numeric rule | — | ✅ Yes |

**Structural note**: none of these WHT rates actually live in Revenue Code §40(5)-(8) — those sections classify income type only. The rates come from a separate delegated instruction, **Tor.Por. 4/2528** (26 Sep 1985) and its amendments, under §3 Tredecim. Any code comment implying "§40(6) = 3%" is citing the wrong legal basis even where the number is right.

## Residency & Filing — [`tax-data/2026/residency.json`](tax-data/2026/residency.json)

| Rule | Value | Conditions | Source | Verified |
|---|---|---|---|---|
| Thai tax residency | 180 days | Aggregate days per calendar year | **RD English page, Revenue Code §41** (primary, direct quote) | ✅ Yes |
| PND94 threshold — single | 60,000 THB | Jan-Jun qualifying income | MBMG Group + Expat Tax Thailand | ❌ No |
| PND94 threshold — married, spouse no income | 120,000 THB | Same | Same | ❌ No |
| PND94 due date | Sept 30 (paper) | E-filing extension to ~Oct 8 depends on a renewable notification (currently valid through Jan 2027) | MBMG Group + Sherrings | ✅ Yes (paper date) |
| PND90/91 due date | March 31 (paper) | **E-filing extension to ~Apr 8 is UNCONFIRMED for the 2026 tax year** — current renewal notification only covers e-filings through 31 Jan 2027, and the 2026 annual return is e-filed Feb-Apr 2027, after that cutoff. Historically renewed, but not yet confirmed. | Nishimura & Asahi + Forvis Mazars | ✅ Yes (paper date only) |
| PND94 qualifying income types | 40(5),(6),(7),(8) only | Not salary or dividends | MBMG Group + Expat Tax Thailand | ✅ Yes |

## Foreign Income — [`tax-data/2026/foreign-income.json`](tax-data/2026/foreign-income.json)

| Rule | Value | Conditions | Source | Verified |
|---|---|---|---|---|
| Remittance rule start | 2024-01-01 | Order **Por. 161/2566**; clarified by **Por. 162/2566** (pre-2024 income stays under old rule) | Mahanakorn Partners + KPMG (secondary, convergent) | ✅ Yes |
| Foreign tax credit formula | min(foreign tax, Thai tax on same income) | Requires a DTA | **US-Thailand treaty, Article 25(2)** (primary text, direct quote) | ✅ Yes |
| **DTA country count** | **61 in app** | Should be **62** — verified directly against RD's own live data table | **rd.go.th/english/766.html** (primary, parsed live) | ✅ Yes — **update the code comment from 61 to 62** |
| DTA pension exemptions | Country/pension-type specific | Government/social-security pensions often source-only; **ordinary private pensions can be the OPPOSITE (residence-only)** — don't overgeneralize "pensions are exempt" | US-Thailand treaty Art. 20-21 (primary text) | ✅ Yes (mechanism + 1 example country) |
| LTR foreign-income exemption | 3 visa categories exempt | **Corrected wording**: exemption applies to remitted income specifically, not "regardless of remittance" as previously stated | **Royal Decree No. 743 B.E. 2565, Section 5** (primary, full text read via BOI) | ✅ Yes |
| LTR Highly Skilled 17% flat rate | 17% on Thai salary income | Highly-Skilled Professional LTR only (not SMART visa); employer must be in a targeted/BOI/EEC industry | **Royal Decree No. 743 B.E. 2565, Sections 3-4** (primary, full text read via BOI) | ✅ Yes — resolves what was the single largest gap in the registry |

## VAT & Business Obligations — [`tax-data/2026/vat-and-business-obligations.json`](tax-data/2026/vat-and-business-obligations.json)

| Rule | Value | Conditions | Source | Verified |
|---|---|---|---|---|
| VAT registration threshold | 1,800,000 THB | Set by Royal Decree under Revenue Code §81/1 | **rd.go.th/english/37732.html** (primary) + secondary corroboration on the exact figure | ✅ Yes |
| VAT registration deadline | 30 days | From date threshold exceeded | **rd.go.th/english/37741.html, §85/1** (primary, direct quote) | ✅ Yes |
| Standard VAT rate | 7% (statutory rate is 10%) | **Time-limited**: current Royal Decree No. 807 covers only 1 Oct 2026 – 30 Sept 2027, renewed ~annually since 1997. Not guaranteed to continue. | regfollower.com + HLB Thailand (secondary) | ❌ No — flag expiry date to users |

## Not a live source: `taxRulesFreelance.JSON`

The root-level `taxRulesFreelance.JSON` file is **not imported anywhere in `src/`** — a standalone decision-tree spec document, excluded from this registry as a "used_in" target.

## Overall status after sourcing + follow-up verification passes

- **Primary-source verified** (fetched an actual government document or read primary treaty text): residency threshold, PND90/91 & PND94 paper deadlines, VAT threshold/deadline, provident fund cap, life insurance cap, donation cap, most withholding rates, foreign tax credit formula, DTA country count, both LTR rules, rental 40(5)/liberal-profession 40(6)/business 40(8) base rates, and (via the follow-up pass) the contractor 40(7) rate and the entertainment/sports/author classification.
- **Strong secondary-source verified** (multiple independent reputable firms, named legal basis, but no primary document fetched): PIT brackets, personal/spouse/child allowances, remittance rule (Por. 161/2566, 162/2566), SSO ceiling figures, RMF/SSF caps, combined retirement cap, and (via the follow-up pass) the sole-proprietor business category rates.
- **Not verified** (single/generic source, or contested): senior exemption's "Section 42(17)" citation, max-parents "4" cap, PND94 threshold figures, health insurance cap, VAT rate's continuation past Sept 2027, pension fund individual cap (not re-checked in the follow-up pass).
- **CONFIRMED and FIXED, 2026-09-07** (see "Read this first" at top of document): contractor 40(7) rate (40%→60%, was a live bug), entertainment/sports/author sub-classification (dead-code data corrected + misleading live copy fixed; a full tiered/capped feature was not built), sole-proprietor business category table (4 of 10 categories, 40%→60%; table itself dead code, matching live description text fixed).

**Status change from the initial pass**: three items that were "flagged as possibly incorrect, pending review" were independently re-verified (confirmed, not refuted), then fixed with explicit user approval and test coverage. `npx tsc --noEmit` and the full `vitest` suite both pass (aside from 40 pre-existing, unrelated `react-helmet-async` test-environment failures also present on the unmodified baseline).

## Backlog: future feature work identified during this audit

Not implemented — these are feature additions (new selectable income types, new
calculation branches, new UI), not bug fixes, so they were left out of the
2026-09-07 fix per CLAUDE.md/project scope discipline. Recorded here so they
aren't lost:

- **Add dedicated income types for entertainer/athlete income (Section 40(8), tiered) and author/royalty income (Section 40(3), capped).** Currently these have no selectable `IncomeType` at all — a user with this income has no accurate option in the freelancer income-type dropdown. Needs: new `IncomeType` values, new UI copy/examples, and new calculation logic (tiered 60%/40%-above-300k capped at 600,000 THB for entertainers/athletes; flat 50% capped at 100,000–200,000 THB for royalties) — a flat-percentage lookup can't represent either. See [`deductions.json#liberal-profession-subrates`](tax-data/2026/deductions.json) for the full sourcing.
- **Build a sole-proprietor tax calculation function.** `BusinessProfileStep.tsx` lets a user pick a business category, and `BUSINESS_FLAT_RATE_DEDUCTIONS` has rates for each category, but no calculation function actually consumes it yet — sole proprietors can't get a computed result today. See [`deductions.json#business-category-flat-rates`](tax-data/2026/deductions.json).
- **Add a 2025+ visual-fine-arts sub-rate (60%, Royal Decree No. 803)** as a distinct Section 40(6) sub-case from general "fine arts" (30%) — narrower than the current single `fine_arts: 0.30` entry, and only if/when liberal-profession sub-types become a real, selectable feature (see first item above).

Next step: your decision on whether to proceed with fixing these three confirmed bugs. If yes, the recommended path is: (1) update the three constants/tables in `src/config/taxConfig.ts`, with the entertainment/sports/author case needing new tiered-calculation logic rather than a simple percentage swap, (2) add tests in `src/utils/__tests__/` covering each corrected rate, (3) note the fix and its source in a commit referencing this registry.
