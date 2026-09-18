// Shared metadata for the two calculator routes. Single source of truth so the SSR/pre-render
// fallback and the client-hydrated component never disagree on title/description/schema for the
// same URL (see SEO_METADATA_021.md §14).

const SITE_URL = 'https://mythaitaxes.com';

export const ANNUAL_TAX_META = {
  title: 'Annual Tax Calculator | My Thai Taxes',
  description:
    'Estimate your annual Thai personal income tax liability for salaried employees, freelancers, sole proprietors, and company owners — including foreign income and double tax agreement scenarios.',
  canonicalUrl: `${SITE_URL}/annual-tax/`,
};

export const ANNUAL_TAX_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Thai Annual Tax Calculator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: ANNUAL_TAX_META.canonicalUrl,
  description: ANNUAL_TAX_META.description,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Supports salaried employees, freelancers, sole proprietors, and company owners',
    'Covers standard allowances, deductions, and progressive tax brackets',
    'Downloadable PDF summary of results',
  ],
};

export const MONTHLY_WITHHOLDING_META = {
  title: 'Monthly Tax Withholding Estimator | My Thai Taxes',
  description:
    'Estimate how much Thai income tax should be withheld from your monthly salary. Free calculator for salaried employees and freelancers in Thailand.',
  canonicalUrl: `${SITE_URL}/monthly-withholding/`,
};

export const MONTHLY_WITHHOLDING_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Thai Monthly Withholding Estimator',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Web',
  url: MONTHLY_WITHHOLDING_META.canonicalUrl,
  description: MONTHLY_WITHHOLDING_META.description,
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  featureList: [
    'Estimates monthly withholding for salaried employees and freelancers',
    'Useful for checking payslips and planning for salary or bonus changes',
  ],
};
