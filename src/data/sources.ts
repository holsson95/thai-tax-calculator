// Curated display layer over the project's tax-rules registry.
//
// The underlying facts (which sources exist, what they support, and when they
// were reviewed) live in TAX_RULES.md and tax-data/2026/*.json at the repo
// root — that JSON registry is the single source of truth, built from a
// documented research pass on 2026-09-07. This file does not add or invent
// any source; it only gives the registry's entries clean display labels and
// groups them by topic for the public /sources/ page.

import { articles } from './articles';

export type SourceType = 'official' | 'secondary';

export interface TaxSource {
  id: string;
  organization: string;
  title: string;
  url: string;
  type: SourceType;
  topics: string[];
}

// Every entry in the registry shares this snapshot date — recorded once here
// instead of repeated per source.
export const REGISTRY_TAX_YEAR = 2026;
export const REGISTRY_LAST_REVIEWED = 'September 2026';

export const TOPICS = [
  'Personal Income Tax',
  'Tax Rates & Brackets',
  'Deductions & Allowances',
  'Social Security',
  'Tax Residency',
  'Foreign Income',
  'Tax Filing',
  'Withholding Tax',
  'Tax Treaties',
  'VAT & Business Registration',
] as const;

export const TAX_SOURCES: TaxSource[] = [
  // --- Official / primary sources ---
  {
    id: 'rd-section-41',
    organization: 'Thai Revenue Department',
    title: 'Revenue Code Section 41 — Tax Residency',
    url: 'https://www.rd.go.th/english/37749.html',
    type: 'official',
    topics: ['Tax Residency'],
  },
  {
    id: 'rd-dta-list',
    organization: 'Thai Revenue Department',
    title: 'List of Double Tax Agreements (DTAs)',
    url: 'https://www.rd.go.th/english/766.html',
    type: 'official',
    topics: ['Foreign Income', 'Tax Treaties'],
  },
  {
    id: 'rd-pnd90-guide',
    organization: 'Thai Revenue Department',
    title: 'Guide to Personal Income Tax Return 2021 (PND90)',
    url: 'https://www.rd.go.th/fileadmin/download/english_form/030265guide90.pdf',
    type: 'official',
    topics: ['Personal Income Tax', 'Deductions & Allowances'],
  },
  {
    id: 'rd-wht-table',
    organization: 'Thai Revenue Department',
    title: 'Withholding Tax Rate Table (Tor.Por. 4/2528)',
    url: 'https://www.rd.go.th/3535.html',
    type: 'official',
    topics: ['Withholding Tax'],
  },
  {
    id: 'rd-vat-threshold',
    organization: 'Thai Revenue Department',
    title: 'VAT Registration Threshold (Revenue Code §80–82)',
    url: 'https://www.rd.go.th/english/37732.html',
    type: 'official',
    topics: ['VAT & Business Registration'],
  },
  {
    id: 'rd-vat-deadline',
    organization: 'Thai Revenue Department',
    title: 'VAT Registration Deadline (Revenue Code §85/1)',
    url: 'https://www.rd.go.th/english/37741.html',
    type: 'official',
    topics: ['VAT & Business Registration'],
  },
  {
    id: 'boi-decree-743',
    organization: 'Board of Investment (BOI)',
    title: 'Royal Decree No. 743 B.E. 2565 — LTR Visa Tax Provisions',
    url: 'https://ltr.boi.go.th/documents/Royal%20Decree%20issued%20under%20the%20Revenue%20Code%20No.743%20(EN).pdf',
    type: 'official',
    topics: ['Foreign Income'],
  },
  {
    id: 'irs-us-thailand-treaty',
    organization: 'Internal Revenue Service (IRS, USA)',
    title: 'US–Thailand Double Taxation Convention (treaty text)',
    url: 'https://www.irs.gov/pub/irs-trty/thailand.pdf',
    type: 'official',
    topics: ['Foreign Income', 'Tax Treaties'],
  },

  // --- Secondary / professional-advisory sources ---
  {
    id: 'sherrings-rates',
    organization: 'Sherrings',
    title: 'Thailand Personal Income Tax Rates',
    url: 'https://sherrings.com/personal-income-tax-rates-thailand.html',
    type: 'secondary',
    topics: ['Tax Rates & Brackets'],
  },
  {
    id: 'sherrings-deductions',
    organization: 'Sherrings',
    title: 'Personal Tax Deductions & Allowances in Thailand',
    url: 'https://sherrings.com/personal-tax-deductions-allowances-thailand.html',
    type: 'secondary',
    topics: ['Deductions & Allowances'],
  },
  {
    id: 'sherrings-dividend',
    organization: 'Sherrings',
    title: 'Dividend Income & Personal Income Tax in Thailand',
    url: 'https://sherrings.com/dividend-income-personal-income-tax-thailand.html',
    type: 'secondary',
    topics: ['Withholding Tax'],
  },
  {
    id: 'pwc-deductions',
    organization: 'PwC Tax Summaries',
    title: 'Thailand — Individual Deductions',
    url: 'https://taxsummaries.pwc.com/thailand/individual/deductions',
    type: 'secondary',
    topics: ['Personal Income Tax', 'Deductions & Allowances'],
  },
  {
    id: 'forvis-personal-income-tax',
    organization: 'Forvis Mazars',
    title: 'Personal Income Tax in Thailand',
    url: 'https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/tax/personal-income-tax',
    type: 'secondary',
    topics: ['Deductions & Allowances'],
  },
  {
    id: 'forvis-second-child',
    organization: 'Forvis Mazars',
    title: 'Tax Deduction for a Second Child',
    url: 'https://www.forvismazars.com/th/en/insights/doing-business-in-thailand/tax/tax-deduction-for-a-second-child',
    type: 'secondary',
    topics: ['Deductions & Allowances'],
  },
  {
    id: 'msna-parents-allowance',
    organization: 'MSNA Group',
    title: "Parents' Allowance for Computation of Thai Personal Income Tax",
    url: 'https://msnagroup.com/parents-allowance-for-computation-of-thai-personal-income-tax/',
    type: 'secondary',
    topics: ['Deductions & Allowances'],
  },
  {
    id: 'bdo-sso-ceiling',
    organization: 'BDO Thailand',
    title: "New Social Security Fund's Wage Ceiling",
    url: 'https://www.bdo.th/en-gb/insights/new-social-security-fund%E2%80%99s-wage-ceiling-effective-january-2026',
    type: 'secondary',
    topics: ['Social Security'],
  },
  {
    id: 'mahanakorn-remittance-rule',
    organization: 'Mahanakorn Partners Group',
    title: 'Overview of Orders Por. 161/2566 and Por. 162/2566',
    url: 'https://mahanakornpartners.com/comprehensive-overview-of-order-no-por-161-2566-and-no-por-162-2566-on-personal-income-tax-for-foreign-sourced-income/',
    type: 'secondary',
    topics: ['Foreign Income'],
  },
  {
    id: 'mbmg-pnd94',
    organization: 'MBMG Group',
    title: 'PND94 Half-Year Personal Income Tax Filing',
    url: 'https://mbmg-group.com/pnd-94-half-year-personal-income-tax-who-must-file-by-30-september-2026-and-who-doesnt/',
    type: 'secondary',
    topics: ['Tax Filing'],
  },
  {
    id: 'nishimura-efiling-extension',
    organization: 'Nishimura & Asahi',
    title: 'E-Filing Extension for Tax Returns in Thailand',
    url: 'https://www.nishimura.com/en/knowledge/publications/further-eight-day-extension-for-e-filing-tax-returns-and-online-tax-payments-in-thailand',
    type: 'secondary',
    topics: ['Tax Filing'],
  },
  {
    id: 'acclime-wht-guide',
    organization: 'Acclime Thailand',
    title: 'Withholding Tax Guide',
    url: 'https://thailand.acclime.com/guides/withholding-tax/',
    type: 'secondary',
    topics: ['Withholding Tax'],
  },
  {
    id: 'regfollower-vat-rate',
    organization: 'RegFollower',
    title: 'Thailand Extends Reduced VAT Rate',
    url: 'https://regfollower.com/thailand-extends-reduced-vat-rate-until-september-2027/',
    type: 'secondary',
    topics: ['VAT & Business Registration'],
  },
];

export function sourcesByTopic(topic: string): TaxSource[] {
  return TAX_SOURCES.filter((s) => s.topics.includes(topic));
}

export function topicsWithSources(): string[] {
  return TOPICS.filter((t) => sourcesByTopic(t).length > 0);
}

export const OFFICIAL_SOURCES = TAX_SOURCES.filter((s) => s.type === 'official');

export function getSourceById(id: string): TaxSource | undefined {
  return TAX_SOURCES.find((s) => s.id === id);
}

export interface CitingArticle {
  slug: string;
  title: string;
}

/**
 * Articles whose own `sources` array cites the exact same URL as this
 * registry entry — an exact match, not a topic-based guess. Most articles
 * cite a generic Revenue Department URL rather than the specific page listed
 * here, so most sources will have no citing articles; that's an accurate
 * reflection of the data, not a bug to paper over with fuzzy matching.
 */
export function getCitingArticles(source: TaxSource): CitingArticle[] {
  return articles
    .filter((article) => article.sources?.some((s) => s.url === source.url))
    .map((article) => ({ slug: article.slug, title: article.title }));
}
