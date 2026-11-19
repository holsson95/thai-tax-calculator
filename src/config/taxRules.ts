/**
 * SINGLE SOURCE OF TRUTH for every Thai tax rate, threshold and rule the site uses.
 *
 * Edit values HERE. Every other module (TAX_BRACKETS, TAX_CONSTANTS,
 * MONTHLY_TAX_CONSTANTS, taxConfig.ts, remittance rules, display tables)
 * derives from this object.
 *
 * Each rule carries:
 *  - id            the matching entry in tax-data/{taxYear}/*.json — the research log,
 *                  which holds the full conditions/limitations and verification notes
 *  - value         the number/list the calculators use
 *  - source        where it comes from (primary = Revenue Department / BOI / treaty text)
 *  - verified      true only when confirmed against a source suitable for this tax year
 *  - lastVerified  ISO date the source was last checked (see `verified` for the outcome)
 *
 * src/config/__tests__/taxRules.test.ts fails if a value here and in tax-data/ disagree,
 * or if any rule lacks a source URL or date. Never change a value from memory —
 * see CLAUDE.md "IMPORTANT TAX RULE" and TAX_RULES.md.
 */

export const RULES_TAX_YEAR = 2026;

export interface RuleSource {
  label: string;
  url: string;
  primary: boolean;
}

export interface TaxRule<T> {
  id: string;
  label: string;
  value: T;
  source: RuleSource;
  verified: boolean;
  lastVerified: string;
}

export const TAX_RULES = {
  bracket0: {
    id: "bracket-0-150k",
    label: "0% bracket",
    value: {"upTo": 150000, "rate": 0},
    source: { label: "Thai Revenue Department — อัตราภาษีเงินได้บุคคลธรรมดา", url: "https://www.rd.go.th/59670.html", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  bracket1: {
    id: "bracket-150k-300k",
    label: "5% bracket",
    value: {"upTo": 300000, "rate": 0.05},
    source: { label: "Thai Revenue Department — อัตราภาษีเงินได้บุคคลธรรมดา", url: "https://www.rd.go.th/59670.html", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  bracket2: {
    id: "bracket-300k-500k",
    label: "10% bracket",
    value: {"upTo": 500000, "rate": 0.1},
    source: { label: "Thai Revenue Department — อัตราภาษีเงินได้บุคคลธรรมดา", url: "https://www.rd.go.th/59670.html", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  bracket3: {
    id: "bracket-500k-750k",
    label: "15% bracket",
    value: {"upTo": 750000, "rate": 0.15},
    source: { label: "Thai Revenue Department — อัตราภาษีเงินได้บุคคลธรรมดา", url: "https://www.rd.go.th/59670.html", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  bracket4: {
    id: "bracket-750k-1m",
    label: "20% bracket",
    value: {"upTo": 1000000, "rate": 0.2},
    source: { label: "Thai Revenue Department — อัตราภาษีเงินได้บุคคลธรรมดา", url: "https://www.rd.go.th/59670.html", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  bracket5: {
    id: "bracket-1m-2m",
    label: "25% bracket",
    value: {"upTo": 2000000, "rate": 0.25},
    source: { label: "Thai Revenue Department — อัตราภาษีเงินได้บุคคลธรรมดา", url: "https://www.rd.go.th/59670.html", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  bracket6: {
    id: "bracket-2m-5m",
    label: "30% bracket",
    value: {"upTo": 5000000, "rate": 0.3},
    source: { label: "Thai Revenue Department — อัตราภาษีเงินได้บุคคลธรรมดา", url: "https://www.rd.go.th/59670.html", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  bracket7: {
    id: "bracket-5m-plus",
    label: "35% bracket (top rate)",
    value: {"upTo": Infinity, "rate": 0.35},
    source: { label: "Thai Revenue Department — อัตราภาษีเงินได้บุคคลธรรมดา", url: "https://www.rd.go.th/59670.html", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  personalAllowance: {
    id: "personal-allowance",
    label: "Personal allowance",
    value: 60000,
    source: { label: "PwC Tax Summaries — Thailand Individual Deductions", url: "https://taxsummaries.pwc.com/thailand/individual/deductions", primary: false },
    verified: false,
    lastVerified: "2026-11-19",
  },
  spouseAllowance: {
    id: "spouse-allowance",
    label: "Spouse allowance",
    value: 60000,
    source: { label: "PwC Tax Summaries — Thailand Individual Deductions", url: "https://taxsummaries.pwc.com/thailand/individual/deductions", primary: false },
    verified: false,
    lastVerified: "2026-11-19",
  },
  seniorExemption: {
    id: "senior-allowance",
    label: "Senior citizen (65+) income exemption — misnamed 'allowance' in code",
    value: 190000,
    source: { label: "Sherrings — Personal Tax Deductions & Allowances Thailand", url: "https://sherrings.com/personal-tax-deductions-allowances-thailand.html", primary: false },
    verified: false,
    lastVerified: "2026-11-19",
  },
  childAllowanceBase: {
    id: "child-allowance-base",
    label: "Child allowance (base, per child)",
    value: 30000,
    source: { label: "Forvis Mazars — Tax deduction for a second child", url: "https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/tax/tax-deduction-for-a-second-child", primary: false },
    verified: true,
    lastVerified: "2026-11-19",
  },
  childAllowanceBonus: {
    id: "child-allowance-bonus",
    label: "Child allowance bonus (2nd+ child)",
    value: 30000,
    source: { label: "Forvis Mazars — Tax deduction for a second child", url: "https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/tax/tax-deduction-for-a-second-child", primary: false },
    verified: true,
    lastVerified: "2026-11-19",
  },
  childBonusBirthYear: {
    id: "child-allowance-bonus",
    label: "Child allowance bonus applies to 2nd+ children born in or after this year",
    value: 2018,
    source: { label: "Forvis Mazars — Tax deduction for a second child", url: "https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/tax/tax-deduction-for-a-second-child", primary: false },
    verified: true,
    lastVerified: "2026-09-07",
  },
  parentAllowance: {
    id: "parent-allowance",
    label: "Parent support allowance (per parent)",
    value: 30000,
    source: { label: "MSNA Group — Parents' Allowance for Computation of Thai Personal Income Tax", url: "https://msnagroup.com/parents-allowance-for-computation-of-thai-personal-income-tax/", primary: false },
    verified: false,
    lastVerified: "2026-11-19",
  },
  maxParents: {
    id: "max-parents",
    label: "Maximum parents eligible for allowance",
    value: 4,
    source: { label: "Derived from parent-eligibility rules", url: "https://msnagroup.com/parents-allowance-for-computation-of-thai-personal-income-tax/", primary: false },
    verified: false,
    lastVerified: "2026-11-19",
  },
  standardDeductionRate: {
    id: "standard-deduction-rate",
    label: "Standard expense deduction rate (employment income, Section 40(1))",
    value: 0.5,
    source: { label: "PwC Tax Summaries — Thailand Individual Deductions", url: "https://taxsummaries.pwc.com/thailand/individual/deductions", primary: false },
    verified: false,
    lastVerified: "2026-09-07",
  },
  maxStandardDeduction: {
    id: "max-standard-deduction",
    label: "Standard expense deduction cap",
    value: 100000,
    source: { label: "PwC Tax Summaries — Thailand Individual Deductions", url: "https://taxsummaries.pwc.com/thailand/individual/deductions", primary: false },
    verified: false,
    lastVerified: "2026-09-07",
  },
  flatRateRental40_5: {
    id: "flat-rate-rental-40-5",
    label: "Flat-rate deduction — Rental income (40(5))",
    value: 0.3,
    source: { label: "Thai Revenue Department — Guide to PND90 Return, Appendix Table A, p.13", url: "https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  flatRateLiberal40_6: {
    id: "flat-rate-liberal-profession-40-6",
    label: "Flat-rate deduction — Liberal profession income (40(6)), default",
    value: 0.3,
    source: { label: "Thai Revenue Department — Guide to PND90 Return, p.14-15", url: "https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  flatRateMedical40_6: {
    id: "liberal-profession-subrates",
    label: "Section 40(6) medical practice (arts of healing) flat-rate expense deduction",
    value: 0.6,
    source: { label: "Thai Revenue Department — Guide to Personal Income Tax Return 2021", url: "https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  flatRateContractor40_7: {
    id: "flat-rate-contractor-40-7",
    label: "Flat-rate deduction — Contractor income (40(7))",
    value: 0.6,
    source: { label: "Thai Revenue Department — Guide to Personal Income Tax Return 2021", url: "https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  flatRateBusiness40_8: {
    id: "flat-rate-business-sales-40-8",
    label: "Flat-rate deduction — Business & sales income (40(8))",
    value: 0.6,
    source: { label: "Thai Revenue Department — Guide to PND90 Return, Appendix Table A, pp.34-36", url: "https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  flatRateDividend: {
    id: "flat-rate-dividend",
    label: "Flat-rate deduction — Dividend income",
    value: 0,
    source: { label: "Thai Revenue Department — Guide to PND90 Return", url: "https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  combinedRetirementCap: {
    id: "combined-retirement-cap",
    label: "Combined retirement fund deduction cap (pension + provident + RMF + SSF)",
    value: 500000,
    source: { label: "Forvis Mazars", url: "https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/payroll/personal-income-tax", primary: false },
    verified: true,
    lastVerified: "2026-09-07",
  },
  maxLifeInsurance: {
    id: "max-life-insurance",
    label: "Life insurance deduction cap",
    value: 100000,
    source: { label: "Thai Revenue Department", url: "https://www.rd.go.th/english/6045.html", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  maxHealthInsurance: {
    id: "max-health-insurance",
    label: "Health insurance deduction cap",
    value: 25000,
    source: { label: "Sherrings", url: "https://sherrings.com/personal-tax-deductions-allowances-thailand.html", primary: false },
    verified: false,
    lastVerified: "2026-09-07",
  },
  maxPensionFund: {
    id: "max-pension-fund",
    label: "Pension/annuity insurance fund deduction cap",
    value: 500000,
    source: { label: "Forvis Mazars", url: "https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/payroll/personal-income-tax", primary: false },
    verified: true,
    lastVerified: "2026-09-07",
  },
  maxProvidentFund: {
    id: "max-provident-fund",
    label: "Provident fund deduction cap",
    value: 500000,
    source: { label: "Thai Revenue Department", url: "https://www.rd.go.th/english/6045.html", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  maxRmf: {
    id: "max-rmf",
    label: "Retirement Mutual Fund (RMF) deduction cap",
    value: 500000,
    source: { label: "Forvis Mazars", url: "https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/payroll/personal-income-tax", primary: false },
    verified: true,
    lastVerified: "2026-09-07",
  },
  maxSsf: {
    id: "max-ssf",
    label: "Super Savings Fund (SSF) deduction cap",
    value: 200000,
    source: { label: "Forvis Mazars", url: "https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/payroll/personal-income-tax", primary: false },
    verified: true,
    lastVerified: "2026-09-07",
  },
  maxDonationPercent: {
    id: "max-donation-percent",
    label: "Charitable donation deduction cap",
    value: 0.1,
    source: { label: "Thai Revenue Department", url: "https://www.rd.go.th/english/6045.html", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  foreignIncomeRuleStart: {
    id: "foreign-income-remittance-rule-start",
    label: "Foreign income remittance rule effective date",
    value: "2024-01-01",
    source: { label: "Mahanakorn Partners Group — Overview of Por. 161/2566 and Por. 162/2566", url: "https://mahanakornpartners.com/comprehensive-overview-of-order-no-por-161-2566-and-no-por-162-2566-on-personal-income-tax-for-foreign-sourced-income/", primary: false },
    verified: true,
    lastVerified: "2026-11-19",
  },
  ltrForeignIncomeExemptVisas: {
    id: "ltr-foreign-income-exemption-visas",
    label: "LTR visa categories exempt from Thai tax on foreign income remitted to Thailand",
    value: ["ltr_wealthy_global", "ltr_wealthy_pensioner", "ltr_work_from_thailand"],
    source: { label: "Royal Decree No. 743, B.E. 2565", url: "https://ltr.boi.go.th/documents/Royal%20Decree%20issued%20under%20the%20Revenue%20Code%20No.743%20(EN).pdf", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  ltrHighlySkilledFlatRate: {
    id: "ltr-highly-skilled-flat-rate",
    label: "LTR Highly Skilled Professional flat tax rate on Thai employment income",
    value: 0.17,
    source: { label: "Royal Decree No. 743, B.E. 2565", url: "https://ltr.boi.go.th/documents/Royal%20Decree%20issued%20under%20the%20Revenue%20Code%20No.743%20(EN).pdf", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  residencyDays: {
    id: "thai-residency-days",
    label: "Thai tax residency threshold (days in Thailand)",
    value: 180,
    source: { label: "Thai Revenue Department", url: "https://www.rd.go.th/english/37749.html", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  pnd94ThresholdSingle: {
    id: "pnd94-threshold-single",
    label: "PND94 mid-year filing threshold — single / no qualifying spouse condition",
    value: 60000,
    source: { label: "MBMG Group", url: "https://mbmg-group.com/pnd-94-half-year-personal-income-tax-who-must-file-by-30-september-2026-and-who-doesnt/", primary: false },
    verified: false,
    lastVerified: "2026-09-07",
  },
  pnd94ThresholdMarriedSpouseNoIncome: {
    id: "pnd94-threshold-married-spouse-no-income",
    label: "PND94 mid-year filing threshold — married, spouse has no income",
    value: 120000,
    source: { label: "MBMG Group", url: "https://mbmg-group.com/pnd-94-half-year-personal-income-tax-who-must-file-by-30-september-2026-and-who-doesnt/", primary: false },
    verified: false,
    lastVerified: "2026-09-07",
  },
  pnd94QualifyingIncomeTypes: {
    id: "pnd94-qualifying-income-types",
    label: "Income types that trigger PND94 mid-year filing obligation",
    value: ["rental_40_5", "liberal_profession_40_6", "contractor_40_7", "business_sales_40_8"],
    source: { label: "MBMG Group", url: "https://mbmg-group.com/pnd-94-half-year-personal-income-tax-who-must-file-by-30-september-2026-and-who-doesnt/", primary: false },
    verified: true,
    lastVerified: "2026-09-07",
  },
  maxSocialSecurity: {
    id: "max-social-security-2026-onward",
    label: "Social security contribution deduction cap — 2026 onward (Phase 1)",
    value: 10500,
    source: { label: "BDO Thailand — New Social Security Fund's Wage Ceiling", url: "https://www.bdo.th/en-gb/insights/new-social-security-fund%E2%80%99s-wage-ceiling-effective-january-2026", primary: false },
    verified: true,
    lastVerified: "2026-09-07",
  },
  vatRegistrationThreshold: {
    id: "vat-registration-threshold",
    label: "VAT registration threshold (annual turnover)",
    value: 1800000,
    source: { label: "Thai Revenue Department", url: "https://www.rd.go.th/english/37732.html", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  vatRegistrationDeadlineDays: {
    id: "vat-registration-deadline-days",
    label: "VAT registration deadline after exceeding threshold",
    value: 30,
    source: { label: "Thai Revenue Department", url: "https://www.rd.go.th/english/37741.html", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  vatStandardRate: {
    id: "vat-standard-rate",
    label: "Effective VAT rate (temporary reduction from statutory 10%)",
    value: 0.07,
    source: { label: "Royal Decree No. 807", url: "https://regfollower.com/thailand-extends-reduced-vat-rate-until-september-2027/", primary: false },
    verified: false,
    lastVerified: "2026-09-07",
  },
  whtLiberal40_6: {
    id: "wht-liberal-profession-40-6",
    label: "Withholding tax — Liberal profession income (40(6))",
    value: 0.03,
    source: { label: "Thai Revenue Department — WHT rate table under Tor.Por. 4/2528", url: "https://www.rd.go.th/3535.html", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  whtContractor40_7: {
    id: "wht-contractor-40-7",
    label: "Withholding tax — Contractor income (40(7))",
    value: 0.03,
    source: { label: "Thai Revenue Department — WHT rate table under Tor.Por. 4/2528", url: "https://www.rd.go.th/3535.html", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  whtBusiness40_8: {
    id: "wht-business-sales-40-8",
    label: "Withholding tax — Business & sales income (40(8))",
    value: 0.03,
    source: { label: "Acclime Thailand — Withholding Tax Guide", url: "https://thailand.acclime.com/guides/withholding-tax/", primary: false },
    verified: true,
    lastVerified: "2026-09-07",
  },
  whtRental40_5: {
    id: "wht-rental-40-5",
    label: "Withholding tax — Rental income (40(5))",
    value: 0.05,
    source: { label: "Thai Revenue Department — WHT rate table under Tor.Por. 4/2528", url: "https://www.rd.go.th/3535.html", primary: true },
    verified: true,
    lastVerified: "2026-09-07",
  },
  whtDividend: {
    id: "wht-dividend",
    label: "Withholding tax — Dividend income (final withholding election)",
    value: 0.1,
    source: { label: "Sherrings — Dividend Income Personal Income Tax Thailand", url: "https://sherrings.com/dividend-income-personal-income-tax-thailand.html", primary: false },
    verified: true,
    lastVerified: "2026-09-07",
  },
  familySupportExemptionCap: {
    id: "exempt-family-support-and-inheritance",
    label: "Exempt receipts",
    value: 20000000,
    source: { label: "RD Legal Affairs Division Q&A", url: "https://www.rd.go.th/fileadmin/user_upload/porphor/PIT_Sec41_Paragraph2_QnA.pdf", primary: true },
    verified: true,
    lastVerified: "2026-11-19",
  },
  proposedRemittanceGracePeriod: {
    id: "proposed-remittance-grace-period",
    label: "PROPOSED (not law): exempt foreign income remitted in the year earned or the following year",
    value: false,
    source: { label: "Brer Rabbit Legal — remittance exemption status 2026", url: "https://brerrabbitlegal.co.th/insights/thailand-remittance-tax-exemption-2026-status/", primary: false },
    verified: false,
    lastVerified: "2026-11-19",
  },
} as const satisfies Record<string, TaxRule<unknown>>;

export type TaxRuleKey = keyof typeof TAX_RULES;

/** Progressive brackets in ascending order, derived from TAX_RULES. */
export const BRACKET_RULES = [
  TAX_RULES.bracket0,
  TAX_RULES.bracket1,
  TAX_RULES.bracket2,
  TAX_RULES.bracket3,
  TAX_RULES.bracket4,
  TAX_RULES.bracket5,
  TAX_RULES.bracket6,
  TAX_RULES.bracket7,
] as const;
