# SEO Strategy — mythaitaxes.com

A reference document for tracking keyword gaps, planned content, and implementation progress.

---

## Status Overview

| Item | Status |
|------|--------|
| Article 1: Thailand Tax for Expats (hub) | [ ] Pending |
| Article 2: How to Get a Thai Tax ID | [ ] Pending |
| Article 3: Transferring Money to Thailand (2024 rules) | [ ] Pending |
| Article 4: Thailand Tax for UK Expats | [ ] Pending |
| Article 5: Rental Income Tax in Thailand | [ ] Pending |
| Article 6: Thailand Tax for US Expats | [ ] Pending |
| FAQ: New "Expats Moving to Thailand" category (4 questions) | [ ] Pending |
| FAQ: Add 2 questions to "Tax Residency" | [ ] Pending |
| FAQ: Add 3 questions to "Filing & Deadlines" | [ ] Pending |
| FAQ: Add 2 questions to "Income & Withholding" | [ ] Pending |
| FAQ: New "Working in Thailand as a Foreigner" category (2 questions) | [ ] Pending |
| Tech: BreadcrumbList schema on article pages | [ ] Pending |
| Tech: Update stale "2024" article titles | [ ] Pending |

---

## Why: Keyword Gaps

The existing 20 articles cover freelancers and retirees well. The biggest gaps for Google search traffic:

| Target Query | Gap |
|---|---|
| "Thailand tax for foreigners" / "expat tax Thailand" | No hub article; fragmented coverage |
| "How to get a Thai tax ID" | Completely missing |
| "Transferring money to Thailand tax" | Old article misses the 2024 rule change |
| "Thailand tax for UK expats" | Only pension angle; no working expat coverage |
| "Thailand tax for US expats" | No FBAR/FATCA/FEIE coverage |
| "Rental income tax Thailand" | Only one FAQ item |
| "Do I pay tax in Thailand?" | No single clear answer page |

---

## Part 1: New Articles

All articles go into `src/data/articles.ts` following the existing `Article` interface.
The prerender script auto-discovers slugs — no changes to `scripts/prerender.mjs` needed.

---

### Article 1: Thailand Tax for Expats — The Complete Guide

**Status:** [ ] Pending
**File:** `src/data/articles.ts`
**Slug:** `thailand-tax-guide-for-expats`
**Category:** `International`
**Target keywords:** "Thailand tax for foreigners", "do I pay tax in Thailand as a foreigner", "expat tax in Thailand", "Thailand income tax for expats 2025"
**Read time:** ~8 min
**Purpose:** Broad hub article that serves as the entry point for all expat queries and links to more specific articles.

**Outline:**
```
H1: Thailand Tax for Expats: The Complete Guide (2025)

H2: Do Foreigners Pay Tax in Thailand?
- Short answer: yes, if you live here 180+ days/year
- Brief intro to the two types of liability: residents vs non-residents

H2: The 180-Day Rule Explained
- How it works (any 365-day period, not just calendar year)
- What counts as a day
- What changes at 180 days (worldwide remitted income becomes taxable)
- What if you're under 180 days (only Thai-sourced income)

H2: What Income Is Taxed for Expats?
[Table]
| Income Type | Under 180 days | 180+ days (resident) |
| Thai salary | Taxable | Taxable |
| Thai freelance | Taxable | Taxable |
| Foreign income remitted | Not taxable | Taxable |
| Foreign income kept abroad | Not taxable | Not taxable |

H2: Thailand's Tax Rates
- Summary of progressive brackets (link to thai-tax-brackets-explained)
- Effective rate examples at common income levels

H2: Key Deductions Available to Expats
- Personal allowance (60,000 THB)
- Employment income deduction (50%, up to 100,000 THB)
- Insurance premiums, social security
- Link to maximizing-tax-deductions-thailand

H2: How to File Your Tax Return as an Expat
- Get a Tax ID first (link to how-to-get-thai-tax-id-number)
- PND 90 vs PND 91
- Deadline March 31 (8-day online extension)
- Link to expat-guide-filing-thai-taxes

H2: Avoiding Double Taxation
- What a Double Tax Agreement does
- How to claim a foreign tax credit
- Link to double-tax-agreements-thailand

H2: Special Situations
- LTR visa: full foreign income exemption (link to ltr-visa-tax-benefits)
- Digital nomads (link to digital-nomad-taxes-thailand)
- Retirees (link to pensioner-retiree-tax-guide-thailand)
- UK expats (link to thailand-tax-for-uk-expats)
- US expats (link to thailand-tax-for-us-expats)

H2: Key Takeaways
[Summary table]
```

**Sources to include:**
- Thai Revenue Department: https://www.rd.go.th/english/6045.html
- Revenue Code Section 41

---

### Article 2: How to Get a Thai Tax ID Number (TIN)

**Status:** [ ] Pending
**File:** `src/data/articles.ts`
**Slug:** `how-to-get-thai-tax-id-number`
**Category:** `Filing`
**Target keywords:** "Thai tax ID", "Thailand TIN number", "how to get tax identification number Thailand", "Thai tax registration expat"
**Read time:** ~5 min
**Purpose:** Prerequisite info every expat needs. High-intent, zero competition on the site currently.

**Outline:**
```
H1: How to Get a Thai Tax ID Number (TIN): Step-by-Step Guide

H2: What Is a Thai Tax Identification Number?
- 13-digit number issued by the Revenue Department
- Required for: filing returns, claiming refunds, issuing invoices as a freelancer
- Different from your Thai national ID (which non-citizens don't have)

H2: Do You Need a TIN?
- Yes if: you file a tax return, you receive income with withholding, you freelance/run a business
- You may already have one: check your pay slips or any Form 50 Tawi (withholding certificate)

H2: How to Check if You Already Have a TIN
- Look at any withholding certificate (50 Tawi) received from employer or bank
- Ask your HR department if your employer registered you
- Check the RD website (rd.go.th) with your passport details

H2: How to Register in Person (Step-by-Step)
1. Go to your local Revenue Department district office (not the central Bangkok office)
2. Required documents: passport, current visa, proof of address (lease agreement or utility bill in your name)
3. Fill in form PP09 (available at the office)
4. Process takes 15-30 minutes; TIN issued same day

H2: Practical Notes
- No work permit required to get a TIN
- Bring originals and photocopies of all documents
- The officer may ask what type of income you have
- If your Thai is limited, bring a translation of your address document

H2: After You Get Your TIN
- Store it securely — you will use it every year
- Register for the RD Smart Tax app using your TIN for online filing
- Use it on all invoices if you are freelancing or self-employed
- Link to expat-guide-filing-thai-taxes for next steps
```

**Sources to include:**
- Thai Revenue Department TIN registration: https://www.rd.go.th/english/6044.html

---

### Article 3: Transferring Money to Thailand — What's Taxable Under the 2024 Rules

**Status:** [ ] Pending
**File:** `src/data/articles.ts`
**Slug:** `transferring-money-to-thailand-tax-rules`
**Category:** `International`
**Target keywords:** "transferring money to Thailand tax", "remittance Thailand tax 2024", "sending money to Thailand taxable", "moving to Thailand bring savings"
**Read time:** ~7 min
**Purpose:** Most-asked question in expat communities since the 2024 rule change. The existing foreign-income article is outdated on this.

**Outline:**
```
H1: Transferring Money to Thailand: What's Taxable Under the New Rules?

H2: The Old Rule vs. the 2024 Change
- Before 2024: foreign income only taxable if remitted in the same year it was earned
- From 1 Jan 2024: all foreign income remitted to Thailand is taxable, regardless of when it was earned
- Revenue Department Circular P.161/2566 — the ruling that changed everything

H2: What Counts as "Remitting" Money to Thailand?
- International wire transfer to a Thai bank account
- ATM cash withdrawals in Thailand using a foreign debit card
- Credit or debit card purchases in Thailand charged to a foreign account
- Wise, Revolut, PayPal transfers to a Thai account
- Cash carried into Thailand (above reporting thresholds)

H2: What Is NOT Taxable When Brought Into Thailand?
- Capital accumulated before you became a Thai tax resident
- Pre-2024 savings (income earned and saved before January 1, 2024)
- Gifts from non-residents
- Loans (not income)
- Inheritance
[Important note box: "income" vs. "capital/savings" distinction is crucial — keep documentation]

H2: Who Is Affected?
- Only Thai tax residents (180+ days in Thailand during the year)
- Non-residents: foreign income remitted to Thailand is NOT taxable
- If you spent fewer than 180 days in Thailand: not affected by this rule

H2: Practical Examples
[Table]
| Scenario | Taxable? |
| UK expat wires monthly salary to Thai account | Yes (if resident) |
| Retiree transfers 10-year-old savings from UK | No (capital, not income) |
| Digital nomad receives Wise payment for client work | Yes (if resident) |
| Investor brings in dividends earned pre-2024 | Disputed — document source carefully |
| Tourist uses foreign card for holiday spending | No (not a resident) |

H2: How to Calculate the Tax
- Remitted income added to your total assessable income
- Progressive rates apply after deductions and allowances
- Link to thai-tax-brackets-explained and calculator CTA

H2: How to Reduce the Tax on Remittances
- Only transfer what you need for Thai living expenses
- Keep foreign investment income offshore; transfer capital instead
- Consider LTR visa if eligible (foreign income fully exempt) — link to ltr-visa-tax-benefits
- Claim DTA foreign tax credits — link to double-tax-agreements-thailand

H2: Record Keeping Is Essential
- Keep bank statements showing source of funds
- Document when income was earned vs. when it was remitted
- Maintain records distinguishing capital (pre-residency savings) from income
- Revenue Department may ask to substantiate tax-free transfers
```

**Sources to include:**
- Revenue Department Circular P.161/2566 (Thai, but cite it)
- Bangkok Post coverage of the 2024 rule change

---

### Article 4: Thailand Tax for UK Expats

**Status:** [ ] Pending
**File:** `src/data/articles.ts`
**Slug:** `thailand-tax-for-uk-expats`
**Category:** `International`
**Target keywords:** "Thailand tax for UK expats", "UK citizen Thailand income tax", "moving to Thailand from UK taxes", "UK expat Thailand"
**Read time:** ~9 min
**Purpose:** UK nationals are one of the largest expat communities in Thailand. Current site only covers UK pensions; this fills the gap for working/active expats.

**Outline:**
```
H1: Thailand Tax for UK Expats: A Complete Guide

H2: The Dual Tax Position for UK Citizens in Thailand
- You may remain a UK taxpayer until you formally establish non-residency with HMRC
- Once you are a Thai tax resident (180+ days), Thailand also has a claim on your income
- The UK-Thailand Double Tax Agreement (DTA) prevents paying twice

H2: Leaving the UK for Tax Purposes
- The UK Statutory Residence Test (SRT) determines UK residency
- Automatic non-residence: fewer than 16 days in UK, or fewer than 46 days if not UK-resident in prior 3 years
- Notify HMRC via form P85 when you leave
- You may still owe UK tax on UK-sourced income even as a non-resident

H2: What Income Does Thailand Tax for UK Expats?
- Thai employment or freelance income: taxable in Thailand
- UK salary received and remitted to Thailand: taxable in Thailand since 2024
- UK pension remitted to Thailand: taxable (except government service pensions — see below)
- UK rental income remitted to Thailand: potentially taxable; DTA credit available

H2: The UK-Thailand Double Tax Agreement
- Credit method: Thai tax paid on UK-sourced income reduces your UK liability
- Government/civil service pensions (NHS, military, teacher, council): taxable only in the UK, not Thailand
- Private pensions, SIPPs, workplace schemes: taxable in Thailand; credit for any UK withholding applied

H2: UK State Pension in Thailand
- Taxable in Thailand as a Thai tax resident
- Apply to HMRC for a NT (no tax) code so the UK pays gross
- Declare on Thai return and apply progressive rates after allowances
- Link to foreign-pension-income-thailand-tax for full detail

H2: UK Rental Income While Living in Thailand
- Always taxable in the UK (HMRC) — file a UK Self Assessment return
- If you remit rental proceeds to Thailand: also potentially assessable here
- DTA credit means you typically don't pay twice, but you must claim it
- Register with HMRC as a non-resident landlord to receive UK rent gross (NRL scheme)

H2: What to Do Before You Leave the UK
1. File form P85 with HMRC
2. Apply for NT (no tax) PAYE code if receiving UK salary or pension
3. Register as a non-resident landlord if you own UK rental property
4. Check your National Insurance record — consider voluntary Class 2 or 3 NICs

H2: National Insurance and the UK State Pension
- You stop paying UK NICs once you leave
- Gaps in your NI record reduce your State Pension
- Voluntary NICs from abroad: Class 2 (~£3.45/week in 2024/25) is usually cost-effective
- Check your NI record and forecast at the government gateway

H2: ISAs and UK Investments
- ISAs remain tax-free for UK tax purposes even after you leave
- Thailand has no equivalent to the ISA wrapper
- Income from ISA funds that is remitted to Thailand is potentially assessable in Thailand
- Strategy: hold ISA income offshore; transfer capital instead

H2: Filing Summary
[Table]
| Obligation | Where | When | Form |
| Thai income tax | Thailand | March 31 | PND 90 or PND 91 |
| UK Self Assessment | UK | Jan 31 | SA100 |
| NRL quarterly return | UK | Quarterly | NRL1 |
```

**Sources to include:**
- HMRC P85: https://www.gov.uk/tell-hmrc-about-a-change-national-insurance
- HMRC Statutory Residence Test: https://www.gov.uk/guidance/the-statutory-residence-test
- UK-Thailand DTA: https://www.gov.uk/government/publications/thailand-tax-treaties

---

### Article 5: Rental Income Tax in Thailand

**Status:** [ ] Pending
**File:** `src/data/articles.ts`
**Slug:** `rental-income-tax-thailand`
**Category:** `Tax Basics`
**Target keywords:** "rental income tax Thailand", "Thailand property rental income tax", "foreigner rental property Thailand tax", "how much tax on rental income Thailand"
**Read time:** ~6 min
**Purpose:** Standalone keyword with no article coverage. Many expats own condos. Only one FAQ item currently covers this topic.

**Outline:**
```
H1: Rental Income Tax in Thailand: A Practical Guide

H2: Is Rental Income Taxable in Thailand?
- Yes: rental income from Thai property is assessable income under Section 40(5) of the Revenue Code
- Applies to both Thai nationals and foreigners who own Thai property
- Foreign owners of condos (foreigners can own condos freehold) are included

H2: Who Has to Pay Tax on Rental Income?
- Thai tax residents with rental income from any property
- Non-residents earning rental income from Thai property (Thai-sourced income is taxable for non-residents too)

H2: How Rental Income Tax Is Calculated

H3: Option 1: 30% Flat-Rate Deduction
- 30% of gross rental income deducted automatically, no receipts required
- Net assessable income = 70% of gross rent
- Simple and standard — most landlords use this

H3: Option 2: Actual Expense Deduction
- Deduct documented actual costs: repairs, management fees, insurance, depreciation
- Only worthwhile if actual costs exceed 30% of gross rent
- Requires all receipts and records

H3: Applying Progressive Tax Rates
- Net rental income added to your total assessable income for the year
- Personal allowance (60,000 THB) and other deductions reduce the base
- Progressive rates from 0% to 35% apply

H3: Worked Example
[Table]
| Item | Amount (THB) |
| Annual rental income (30,000/month) | 360,000 |
| 30% flat-rate deduction | −108,000 |
| Net assessable rental income | 252,000 |
| Personal allowance | −60,000 |
| Total assessable income | 192,000 |
| First 150,000 THB @ 0% | 0 |
| Next 42,000 THB @ 5% | 2,100 |
| Tax due | 2,100 THB |

H2: Withholding Tax from Corporate Tenants
- If a company (not an individual) pays you rent: they must withhold 5% at source
- You receive a withholding tax certificate
- Claim this as a credit against your annual tax liability on PND 90
- Individual tenants have no withholding obligation

H2: Filing Threshold for Rental Income
- Lower threshold than salary income: 60,000 THB/year for single, 120,000 THB for married
- Even modest rental income may trigger a filing requirement
- File PND 90 (not PND 91) if rental income is your only or one source of income

H2: Rental Income from Overseas Property
- If you are a Thai tax resident and remit overseas rental income to Thailand: assessable in Thailand
- DTA foreign tax credit available for tax paid in the source country
- Effective strategy: keep overseas rental proceeds offshore; only transfer capital
- Link to double-tax-agreements-thailand and transferring-money-to-thailand-tax-rules

H2: Tips for Rental Property Owners
1. Keep copies of all lease agreements and payment records
2. Collect withholding tax certificates from corporate tenants (they may not offer automatically)
3. Use the 30% flat deduction unless your documented expenses clearly exceed 30%
4. If you have multiple properties, total all rental income on one PND 90 return
5. Foreign rental income: decide whether to remit net proceeds only, leaving the tax portion abroad
```

**Sources to include:**
- Revenue Code Section 40(5): https://www.rd.go.th/english/6045.html

---

### Article 6: Thailand Tax for US Expats

**Status:** [ ] Pending
**File:** `src/data/articles.ts`
**Slug:** `thailand-tax-for-us-expats`
**Category:** `International`
**Target keywords:** "Thailand tax for Americans", "US expat taxes Thailand", "FATCA Thailand expat", "do I pay US taxes living in Thailand"
**Read time:** ~9 min
**Purpose:** US citizenship-based taxation makes this uniquely complex. FBAR/FATCA/FEIE have no coverage on the site.

**Outline:**
```
H1: Thailand Tax for US Expats and Americans: What You Need to Know

H2: The Unique Problem for US Citizens
- US taxes citizens on worldwide income regardless of residency — unlike almost every other country
- Living in Thailand creates two overlapping tax obligations
- Good news: the Foreign Tax Credit and DTAs prevent most genuine double taxation

H2: US Tax Obligations That Follow You to Thailand
- Annual Form 1040 still required every year, no exceptions
- FBAR (FinCEN 114): required if Thai bank accounts exceed USD 10,000 at any point in the year
- Form 8938 (FATCA): for higher-value overseas financial assets (thresholds vary)
- Some US state tax returns may still apply depending on your state

H2: Thai Tax Obligations for US Citizens
- Same rule as any expat: 180 days in Thailand = Thai tax resident
- Thai-sourced income taxable as normal
- Foreign income (including US income) remitted to Thailand: taxable since 2024
- Link to thailand-tax-guide-for-expats for full overview

H2: The US-Thailand Double Tax Agreement
- Covers: employment income, dividends, interest, royalties, pensions, government service income
- Credit method: taxes paid in Thailand credited against US tax on the same income
- US government pensions: taxable only in the US (not Thailand)
- Thai government service income: taxable only in Thailand

H2: Foreign Earned Income Exclusion (FEIE)
- Eligible US citizens working in Thailand can exclude up to ~USD 126,500 (2024) of earned income from US tax
- Must meet: Physical Presence Test (330+ days abroad in any 12-month period) or Bona Fide Residence Test
- Applies to Thai-sourced earned income (salary, self-employment)
- Does NOT apply to passive income: dividends, interest, capital gains, rental income
- You cannot claim both FEIE and Foreign Tax Credit on the same income

H2: Foreign Tax Credit (FTC)
- Thai taxes paid can be credited against US tax liability on the same income
- Generally more valuable than FEIE for high earners or those with significant passive income
- FTC and FEIE are mutually exclusive on the same dollars — plan which to use

H2: US Social Security in Thailand
- You may still owe US tax on Social Security benefits while living in Thailand (up to 85% can be taxable)
- Thailand does not currently tax US Social Security (no withholding at source for US residents abroad)
- The DTA Article 20 on Social Security is limited — seek specialist advice
- Link to foreign-pension-income-thailand-tax

H2: FBAR: Thai Bank Accounts and Reporting
- If the aggregate value of all foreign financial accounts exceeds USD 10,000 on any day of the year: file FBAR
- Deadline: April 15 (with automatic extension to October 15)
- File at FinCEN website, not the IRS
- Penalties for willful non-filing: up to $100,000 or 50% of account value per year
- This is separate from your Form 1040 — many Americans miss this

H2: Form 8938 (FATCA)
- Required if overseas financial assets exceed: USD 200,000 on last day of year (or USD 300,000 at any time) for single filers abroad
- Attach to Form 1040
- Higher thresholds than FBAR but overlapping requirement — when in doubt, file both

H2: Practical Recommendations for US Expats in Thailand
1. File Form 1040 every year, even if you owe nothing
2. File FBAR separately via FinCEN if accounts exceed USD 10,000
3. Keep Thai tax payment records for the Foreign Tax Credit
4. Evaluate FEIE vs. FTC for your income mix
5. Consider a US CPA or enrolled agent specializing in expat taxes
6. Do not close US brokerage accounts without understanding the tax consequences

H2: Summary: Who Files What
[Table]
| Obligation | Where | Deadline | Form |
| Thai income tax | Thailand | March 31 | PND 90 or PND 91 |
| US income tax | IRS | April 15 (June 15 for expats) | Form 1040 |
| Foreign bank reporting | FinCEN | April 15 (Oct 15 with extension) | FBAR / FinCEN 114 |
| FATCA reporting | IRS (attached to 1040) | Same as 1040 | Form 8938 |
```

**Sources to include:**
- IRS FEIE: https://www.irs.gov/individuals/international-taxpayers/foreign-earned-income-exclusion
- FBAR filing: https://bsaefiling.fincen.treas.gov/
- US-Thailand DTA: https://www.irs.gov/businesses/international-businesses/thailand-tax-treaty-documents

---

## Part 2: FAQ Additions

All FAQs go into `src/data/faq.ts` as new entries in the `faqData` array.

---

### New Category: "Expats Moving to Thailand"

Add as a new entry in the `faqData` array before the existing categories (so it appears first or second in the FAQ list).

**Q1:** Do I pay tax on money I bring to Thailand when I move here?
**A:** Whether money you bring into Thailand is taxable depends on whether it is *income* or *capital*. Capital — savings you accumulated before becoming a Thai tax resident — is generally not assessable income and is not taxed when brought in. Income — money you earned — that is remitted (transferred, withdrawn, or spent) in Thailand is taxable if you are a Thai tax resident (present in Thailand for 180 or more days in a year). Since January 2024, this applies regardless of when the income was earned. If you are moving to Thailand for the first time, the safest approach is to document the source of any large transfers (bank statements, pay slips, investment records) to demonstrate that the funds are pre-residency savings rather than current income.

**Q2:** Do I need to notify my home country's tax authority when I move to Thailand?
**A:** Usually yes. In the UK, you notify HMRC of your departure using form P85 and must meet the conditions of the Statutory Residence Test to establish UK non-residency. In Australia, you notify the ATO and your residency status is assessed based on your intentions and connections. In the US, you remain a US taxpayer regardless of where you live — there is no process to "leave" US taxation, though the Foreign Earned Income Exclusion and Foreign Tax Credit reduce your US liability. For most other countries, there is a formal process to de-register or establish non-residency, and failure to notify can result in continued home-country tax obligations running alongside your Thai obligations.

**Q3:** Can I keep my money in a foreign bank account to avoid Thai tax?
**A:** Yes, if you are a Thai tax resident, income that remains in a foreign account and is never brought into Thailand is not assessable for Thai tax purposes. Thailand's tax system is based on the remittance principle for foreign income: only income that is remitted (transferred, withdrawn, or used) in Thailand is taxable. A remittance includes wire transfers to a Thai bank account, ATM withdrawals in Thailand from a foreign account, and credit or debit card purchases in Thailand charged to a foreign account. Money sitting in a foreign account that you never access in Thailand is not remitted and is not taxed here.

**Q4:** What is the difference between being a Thai tax resident and having a Thai tax ID?
**A:** Tax residency and a Tax Identification Number (TIN) are two different things. Thai tax residency is a legal *status* — you become a Thai tax resident automatically once you have spent 180 or more days in Thailand in a given calendar year. A TIN is a practical *tool*: a 13-digit number issued by the Revenue Department that you use when filing tax returns, claiming refunds, or issuing invoices as a freelancer. You need to apply for a TIN in person at a Revenue Department district office (with your passport, visa, and proof of address). You can be a tax resident without yet having a TIN, and you can have a TIN without currently being a tax resident.

---

### Add to Existing "Tax Residency" Category

**Q5:** Do I become a Thai tax resident automatically after 180 days, or do I need to register?
**A:** Tax residency is automatic — it is a factual status determined entirely by the number of days you are physically present in Thailand, with no registration required. Once you have spent 180 days or more in Thailand during a calendar year, you are a Thai tax resident for that year, whether or not any authority has been notified. However, you do need to actively obtain a Thai Tax Identification Number (TIN) before you can file a return or be refunded excess withholding tax. The TIN must be applied for in person at a Revenue Department district office; it is not issued automatically.

**Q6:** What counts as a "day" in Thailand for the 180-day rule?
**A:** A partial day — any day on which you were physically present in Thailand, even briefly — generally counts as a full day. Both your arrival day and your departure day typically count. For example, arriving on January 15 and departing on July 15 would count 181 days. There is no precise statutory definition of a "day" in the Revenue Code, but Revenue Department practice is to count any calendar day on which you were present. To be conservative, count every day on which you slept in Thailand or were physically in the country at any point.

---

### Add to Existing "Filing & Deadlines" Category

**Q7:** What is the difference between PND 90 and PND 91?
**A:** PND 91 is for individuals whose *only* income is employment income — salary, wages, or pension from a single employer. PND 90 is for everyone else: if you have freelance income, business income, rental income, investment income, foreign income, or income from multiple sources, you use PND 90. In practice, most expats who have any income beyond a single Thai salary should use PND 90. If you are unsure which applies to you, PND 90 is the safe choice as it covers all income types.

**Q8:** Can I file my Thai tax return in English?
**A:** The official PND 90 and PND 91 forms are in Thai only. The Revenue Department's website (rd.go.th) has some English-language guidance, and the RD Smart Tax mobile app provides a guided filing experience with limited English support. In practice, most expats either use a Thai accountant or tax agent to prepare and file in Thai, or use the RD Smart Tax app which walks through fields step by step. Our calculator at mythaitaxes.com can help you prepare and check your figures in English before you file.

**Q9:** Do I need to file a Thai tax return even if I have no tax to pay?
**A:** If you are a Thai tax resident and your assessable income exceeds the filing threshold — 120,000 THB per year for single individuals with employment or pension income, or 60,000 THB for rental or investment income — you are technically required to file even if deductions and allowances reduce your final tax to zero. In practice, enforcement of filing-without-paying is limited, but it is legally required and best practice to file. If you have excess withholding tax deducted by your employer, you must file to claim a refund.

---

### Add to Existing "Income & Withholding" Category

**Q10:** How is rental income taxed in Thailand?
**A:** Rental income from Thai property is assessable income under Section 40(5) of the Revenue Code. You can deduct 30% of gross rental income as a standard flat-rate expense (no receipts needed), making 70% of your rent your net assessable income. This net income is added to your total income for the year and taxed at progressive rates after your personal allowances. If a company (not an individual) pays you rent, they are required to withhold 5% at source — collect a withholding tax certificate and claim this as a credit on your annual PND 90 return. Individual tenants have no withholding obligation.

**Q11:** Does Thailand have a capital gains tax?
**A:** Thailand does not have a separate capital gains tax in the traditional sense. Capital gains from selling shares listed on the Stock Exchange of Thailand (SET) are exempt from personal income tax for individual investors. For other assets — such as overseas shares, foreign property, or Thai real estate — the tax treatment depends on the asset. Proceeds from selling foreign assets that are remitted to Thailand are treated as assessable income subject to progressive rates, not a distinct capital gains tax. When you sell Thai property, Specific Business Tax (3.3% of sale price) applies if the property was held for fewer than 5 years, plus transfer fees — but there is no separate capital gains income tax on top of this.

---

### New Category: "Working in Thailand as a Foreigner"

**Q12:** Do I need a work permit to have a Thai tax obligation?
**A:** No — tax obligations and work permit requirements are entirely separate. Your tax obligation is determined by your income and your residency status (days in Thailand), not whether you hold a work permit. If a Thai employer withholds income tax from your salary, you already have a tax obligation regardless of your work permit status. Legally working in Thailand as a foreign national requires a work permit issued by the Department of Employment, and working without one is a legal violation — but it does not remove your tax obligation or create one where none existed.

**Q13:** My employer is a foreign company with no presence in Thailand. Do I owe Thai tax?
**A:** If you work remotely in Thailand for a foreign employer — one that has no Thai entity and does not withhold Thai tax — and you spend 180 or more days in Thailand in a year, you are a Thai tax resident. Income that you remit (transfer or spend) in Thailand is taxable since the 2024 rule change. Even though your employer never interacts with the Thai Revenue Department, you personally are responsible for declaring and paying Thai tax on your remitted income by filing a PND 90 return by March 31. Your employer's country may also have a withholding or tax obligation depending on its local rules.

---

## Part 3: Technical SEO Changes

### BreadcrumbList Schema on Article Pages

**File:** `src/pages/ArticleDetailPage.tsx`
**Status:** [ ] Pending

Add a second JSON-LD script tag alongside the existing `articleSchema`. The breadcrumb schema should be added to the `helmetScripts` or rendered as a separate `<script>` block inside the Helmet:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://www.mythaitaxes.com/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Articles",
      "item": "https://www.mythaitaxes.com/articles"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[article.title]",
      "item": "[canonicalUrl]"
    }
  ]
}
```

This enables BreadcrumbList rich results in Google Search. Currently there is a text "Back to Articles" link but no machine-readable breadcrumb.

---

### Update Stale Article Titles

**File:** `src/data/articles.ts`
**Status:** [ ] Pending

Update the `title` field for these articles (meta description update optional but recommended):

| Slug | Current Title | Suggested Title |
|------|---------------|-----------------|
| `thai-tax-brackets-explained` | Thai Tax Brackets Explained: 2024 Guide | Thai Income Tax Rates and Brackets 2025/2026: Complete Guide |
| `foreign-income-thailand-tax` | Foreign Income and Thailand Tax: What You Need to Know | Is Foreign Income Taxable in Thailand? The 2024 Remittance Rule Explained |
| `expat-guide-filing-thai-taxes` | Expat Guide: Filing Your Thai Tax Return | How to File a Thai Tax Return as an Expat: Step-by-Step (PND 90/91) |

---

## Part 4: Internal Linking Rules

When adding or editing articles, follow these rules:

- All International/Expat articles must link to: `thailand-tax-guide-for-expats`, `double-tax-agreements-thailand`, `understanding-thai-tax-residency`
- `how-to-get-thai-tax-id-number` must be linked from: `expat-guide-filing-thai-taxes`, `thailand-tax-guide-for-expats`, `thailand-retirement-visa-tax-obligations`, `freelancer-tax-guide-thailand`
- `foreign-income-thailand-tax` should link to `transferring-money-to-thailand-tax-rules` as a "See also"
- `pensioner-retiree-tax-guide-thailand` should link to `how-to-get-thai-tax-id-number`
- New articles should include the calculator CTA (already auto-rendered by `ArticleDetailPage.tsx`)

---

## What NOT to Build Yet

- Category landing pages (`/articles/expats`, `/articles/freelancers`) — too few articles per category to justify the routing complexity
- HowTo schema on calculator pages — those pages use Suspense fallback in SSR so Google sees no schema
- Nationality-specific landing pages (e.g., `/expats/uk`) — articles achieve the same goal more simply

---

## Build & Verification Checklist

After adding new content and running `npm run build`:

- [ ] All new article slugs appear in `docs/articles/[slug]/index.html`
- [ ] `docs/sitemap.xml` includes all new article URLs
- [ ] Pre-rendered HTML of a new article contains: `<title>`, `<meta name="description">`, `<link rel="canonical">`, `<meta property="og:*">`, Article JSON-LD, BreadcrumbList JSON-LD
- [ ] Validate JSON-LD with Google Rich Results Test after deployment
- [ ] Submit updated sitemap in Google Search Console
