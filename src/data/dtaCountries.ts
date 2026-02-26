/**
 * Thailand Double Tax Agreement (DTA) country database
 *
 * Thailand has 61 DTA partner countries as of 2025.
 * Source: Thai Revenue Department (rd.go.th/english/766.html)
 *
 * DTAs primarily use the CREDIT METHOD: taxes paid abroad can be
 * credited against Thai tax liability, limited to the Thai tax
 * on that income. DTA relief is NOT automatic — must be claimed.
 */

export interface DTACountry {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  hasDTA: boolean;
  notes?: string; // Special provisions or notes
}

/**
 * All countries with DTA agreements with Thailand
 */
export const DTA_COUNTRIES: DTACountry[] = [
  { code: 'AM', name: 'Armenia', hasDTA: true },
  { code: 'AU', name: 'Australia', hasDTA: true },
  { code: 'AT', name: 'Austria', hasDTA: true },
  { code: 'BH', name: 'Bahrain', hasDTA: true },
  { code: 'BD', name: 'Bangladesh', hasDTA: true },
  { code: 'BY', name: 'Belarus', hasDTA: true },
  { code: 'BE', name: 'Belgium', hasDTA: true },
  { code: 'BG', name: 'Bulgaria', hasDTA: true },
  { code: 'KH', name: 'Cambodia', hasDTA: true },
  { code: 'CA', name: 'Canada', hasDTA: true },
  { code: 'CL', name: 'Chile', hasDTA: true },
  { code: 'CN', name: 'China', hasDTA: true },
  { code: 'CY', name: 'Cyprus', hasDTA: true },
  { code: 'CZ', name: 'Czech Republic', hasDTA: true },
  { code: 'DK', name: 'Denmark', hasDTA: true },
  { code: 'EE', name: 'Estonia', hasDTA: true },
  { code: 'FI', name: 'Finland', hasDTA: true },
  { code: 'FR', name: 'France', hasDTA: true },
  { code: 'DE', name: 'Germany', hasDTA: true },
  { code: 'HK', name: 'Hong Kong', hasDTA: true },
  { code: 'HU', name: 'Hungary', hasDTA: true },
  { code: 'IN', name: 'India', hasDTA: true },
  { code: 'ID', name: 'Indonesia', hasDTA: true },
  { code: 'IE', name: 'Ireland', hasDTA: true },
  { code: 'IL', name: 'Israel', hasDTA: true },
  { code: 'IT', name: 'Italy', hasDTA: true },
  { code: 'JP', name: 'Japan', hasDTA: true },
  { code: 'KR', name: 'South Korea', hasDTA: true },
  { code: 'KW', name: 'Kuwait', hasDTA: true },
  { code: 'LA', name: 'Laos', hasDTA: true },
  { code: 'LU', name: 'Luxembourg', hasDTA: true },
  { code: 'MY', name: 'Malaysia', hasDTA: true },
  { code: 'MU', name: 'Mauritius', hasDTA: true },
  { code: 'MM', name: 'Myanmar', hasDTA: true },
  { code: 'NP', name: 'Nepal', hasDTA: true },
  { code: 'NL', name: 'Netherlands', hasDTA: true },
  { code: 'NZ', name: 'New Zealand', hasDTA: true },
  { code: 'NO', name: 'Norway', hasDTA: true },
  { code: 'OM', name: 'Oman', hasDTA: true },
  { code: 'PK', name: 'Pakistan', hasDTA: true },
  { code: 'PH', name: 'Philippines', hasDTA: true },
  { code: 'PL', name: 'Poland', hasDTA: true },
  { code: 'RO', name: 'Romania', hasDTA: true },
  { code: 'RU', name: 'Russia', hasDTA: true },
  { code: 'SC', name: 'Seychelles', hasDTA: true },
  { code: 'SG', name: 'Singapore', hasDTA: true },
  { code: 'SI', name: 'Slovenia', hasDTA: true },
  { code: 'ZA', name: 'South Africa', hasDTA: true },
  { code: 'ES', name: 'Spain', hasDTA: true },
  { code: 'LK', name: 'Sri Lanka', hasDTA: true },
  { code: 'SE', name: 'Sweden', hasDTA: true },
  { code: 'CH', name: 'Switzerland', hasDTA: true },
  { code: 'TW', name: 'Taiwan', hasDTA: true },
  { code: 'TJ', name: 'Tajikistan', hasDTA: true },
  { code: 'TR', name: 'Turkey', hasDTA: true },
  { code: 'UA', name: 'Ukraine', hasDTA: true },
  { code: 'AE', name: 'United Arab Emirates', hasDTA: true },
  { code: 'GB', name: 'United Kingdom', hasDTA: true },
  { code: 'US', name: 'United States', hasDTA: true, notes: 'US citizens are subject to citizenship-based taxation; consult a tax professional regarding FTC vs. FEIE.' },
  { code: 'UZ', name: 'Uzbekistan', hasDTA: true },
  { code: 'VN', name: 'Vietnam', hasDTA: true },
];

/**
 * Common countries WITHOUT a DTA with Thailand (for informational warnings)
 */
export const NON_DTA_COUNTRIES: DTACountry[] = [
  { code: 'BR', name: 'Brazil', hasDTA: false },
  { code: 'SA', name: 'Saudi Arabia', hasDTA: false },
  { code: 'MX', name: 'Mexico', hasDTA: false },
  { code: 'AR', name: 'Argentina', hasDTA: false },
  { code: 'NG', name: 'Nigeria', hasDTA: false },
  { code: 'KE', name: 'Kenya', hasDTA: false },
  { code: 'EG', name: 'Egypt', hasDTA: false },
  { code: 'QA', name: 'Qatar', hasDTA: false },
  { code: 'PT', name: 'Portugal', hasDTA: false },
  { code: 'GR', name: 'Greece', hasDTA: false },
];

/**
 * All countries combined, sorted alphabetically
 */
export const ALL_COUNTRIES: DTACountry[] = [
  ...DTA_COUNTRIES,
  ...NON_DTA_COUNTRIES,
].sort((a, b) => a.name.localeCompare(b.name));

/**
 * Look up DTA status for a country by name (case-insensitive)
 */
export function getDTAStatus(countryName: string): DTACountry | null {
  const normalized = countryName.trim().toLowerCase();
  return (
    ALL_COUNTRIES.find(c => c.name.toLowerCase() === normalized) || null
  );
}

/**
 * Look up DTA status for a country by ISO code
 */
export function getDTAStatusByCode(code: string): DTACountry | null {
  return ALL_COUNTRIES.find(c => c.code === code.toUpperCase()) || null;
}

/**
 * Check if a country name has a DTA with Thailand
 * Returns null if country is unknown
 */
export function hasDTAWithThailand(countryName: string): boolean | null {
  const country = getDTAStatus(countryName);
  if (!country) return null;
  return country.hasDTA;
}

/**
 * Search countries by partial name match
 */
export function searchCountries(query: string): DTACountry[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return ALL_COUNTRIES;
  return ALL_COUNTRIES.filter(c =>
    c.name.toLowerCase().includes(normalized)
  );
}

/**
 * DTA pension exemption rules
 *
 * Some DTA articles fully exempt specific pension types from Thai tax — the income
 * is taxable only in the source country, not in Thailand at all (not just a credit).
 *
 * Sources:
 * - Australia-Thailand DTA (1989), Article 19(2): government/military pensions taxable only in Australia
 * - US-Thailand DTA (1996), Article 20(2): US Social Security taxable only in USA
 * - UK-Thailand DTA, Article 19: UK government/military service pensions taxable only in UK
 */
export interface PensionDTAExemption {
  country: string;       // Must match DTACountry.name exactly
  pensionType: string;   // Matches PensionType values from freelancerForm.ts
  dtaArticle: string;    // e.g. "Article 19(2)"
  note: string;          // Human-readable explanation shown in UI
}

export const PENSION_DTA_EXEMPTIONS: PensionDTAExemption[] = [
  {
    country: 'Australia',
    pensionType: 'government_service',
    dtaArticle: 'Article 19(2)',
    note: 'Australian government and military service pensions are taxable only in Australia under the Australia-Thailand DTA. Thai tax does not apply.',
  },
  {
    country: 'United States',
    pensionType: 'social_security',
    dtaArticle: 'Article 20(2)',
    note: 'US Social Security benefits are taxable only in the United States under the US-Thailand DTA. Thai tax does not apply.',
  },
  {
    country: 'United Kingdom',
    pensionType: 'government_service',
    dtaArticle: 'Article 19',
    note: 'UK government and military service pensions are taxable only in the United Kingdom under the UK-Thailand DTA. Thai tax does not apply.',
  },
];

/**
 * Look up a DTA pension exemption for a given country and pension type.
 * Returns the exemption record if found, or null if no exemption applies.
 */
export function getPensionDTAExemption(
  countryName: string,
  pensionType: string
): PensionDTAExemption | null {
  const normalized = countryName.trim().toLowerCase();
  return (
    PENSION_DTA_EXEMPTIONS.find(
      e =>
        e.country.toLowerCase() === normalized &&
        e.pensionType === pensionType
    ) || null
  );
}
