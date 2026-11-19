// Content, metadata and structured data for /foreign-income-tax-calculator/.
// Every FAQ answer cites a source id from src/data/sources.ts. Facts come from
// Revenue Department Order Por. 161/2566 (as amended by Por. 162/2566), the RD
// Legal Affairs Division Q&A on Section 41 paragraph 2 (Jan 2024), and Royal
// Decree No. 743 — see tax-data/2026/foreign-income.json.

const SITE_URL = 'https://mythaitaxes.com';

export const FOREIGN_INCOME_CALC_PATH = '/foreign-income-tax-calculator/';

export const FOREIGN_INCOME_CALC_META = {
  title: 'Thailand Foreign Income Tax Calculator (Remittance Rules) | My Thai Taxes',
  description:
    'Estimate Thai tax on foreign income you bring into Thailand under the 2024 remittance rules: residency, pre-2024 savings, capital vs income, and a bracket breakdown.',
  canonicalUrl: `${SITE_URL}${FOREIGN_INCOME_CALC_PATH}`,
};

export interface CalcFaq {
  question: string;
  answer: string;
  sourceId?: string;
  relatedArticleSlug?: string;
}

export const FOREIGN_INCOME_CALC_FAQS: CalcFaq[] = [
  {
    question: 'Is foreign income taxable when I bring it into Thailand?',
    answer:
      'It may be. Under Revenue Department Order Por. 161/2566, foreign income is assessable in the tax year you bring it into Thailand if it was earned on or after 1 January 2024 in a year you were a Thai tax resident (in Thailand 180 days or more). It does not matter whether you bring it in the same year or a later year.',
    sourceId: 'rd-section-41-qna',
    relatedArticleSlug: 'foreign-income-thailand-tax',
  },
  {
    question: 'Do I pay Thai tax on savings from before 2024?',
    answer:
      'Under Por. 162/2566, the remittance rule does not apply to income that arose before 1 January 2024, even if you bring it into Thailand in 2024 or later. Keeping records that show when the money was earned helps if you are ever asked.',
    sourceId: 'rd-por-161',
  },
  {
    question: 'What about money I earned in a year I was not a Thai resident?',
    answer:
      'The Revenue Department Q&A says foreign income is not taxed when brought in if you were in Thailand fewer than 180 days in the year it was earned. Savings built up while living abroad fall under this.',
    sourceId: 'rd-section-41-qna',
  },
  {
    question: 'Is the capital I originally invested taxable when I bring it back?',
    answer:
      'No. The Revenue Department Q&A says principal or capital you transfer back is not assessable income. Only the interest, dividends or gains on it are.',
    sourceId: 'rd-section-41-qna',
  },
  {
    question: 'How are foreign capital gains worked out?',
    answer:
      'Per transaction: only the gain over your cost counts, i.e. sale price minus cost at the date you acquired the asset. Unrealised gains on assets you have not sold are not assessable. A realised gain from 2024 onward is taxed in the year you bring it into Thailand.',
    sourceId: 'rd-section-41-qna',
  },
  {
    question: 'My account mixes savings and income. Which part am I bringing in?',
    answer:
      'The Revenue Department says you must assess this yourself from the facts. It does not give a fixed ordering rule. That is why the calculator flags mixed money and counts the whole amount unless you enter the income part. A qualified advisor can help you document the split.',
    sourceId: 'rd-section-41-qna',
  },
  {
    question: 'Are LTR visa holders exempt from tax on foreign income?',
    answer:
      'Royal Decree No. 743 exempts foreign income brought into Thailand for some Long-Term Resident visa categories (Wealthy Global Citizen, Wealthy Pensioner and Work-from-Thailand Professional), subject to its conditions. Highly-Skilled Professionals do not get this exemption. The calculator flags LTR status and shows the figure if the exemption applies, but does not decide whether it does.',
    sourceId: 'boi-decree-743',
    relatedArticleSlug: 'ltr-visa-tax-benefits',
  },
  {
    question: 'Is there a new two-year grace period for remittances?',
    answer:
      'A proposal to exempt foreign income brought in during the year it is earned or the following year has been discussed, but as of our last check it had not been published in the Royal Gazette, so it is not law. This calculator applies the current rules. We will update it if the change is enacted.',
  },
  {
    question: 'Which exchange rate should I use?',
    answer:
      'The Revenue Department Q&A says to use the exchange rate on the date you bring the money into Thailand. Enter each transfer in baht at that rate.',
    sourceId: 'rd-section-41-qna',
  },
  {
    question: 'I already paid tax abroad. Will I be taxed twice?',
    answer:
      'If you are a Thai tax resident, the Revenue Department Q&A says you can credit foreign tax against Thai tax in the year you bring the income in, under the terms of the double tax agreement with that country. This calculator does not apply the credit, so your actual Thai tax may be lower.',
    sourceId: 'rd-section-41-qna',
    relatedArticleSlug: 'double-tax-agreements-thailand',
  },
  {
    question: 'Are gifts from family or an inheritance taxable?',
    answer:
      'The Revenue Department Q&A notes that income already exempt under the Revenue Code stays exempt. Examples include an inheritance, and support from parents, children or a spouse up to 20 million baht in a tax year.',
    sourceId: 'rd-section-41-qna',
  },
];

export const FOREIGN_INCOME_CALC_SCHEMA = [
  {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Thailand Foreign Income Tax Calculator',
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web',
    url: FOREIGN_INCOME_CALC_META.canonicalUrl,
    description: FOREIGN_INCOME_CALC_META.description,
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    featureList: [
      'Thai tax residency check (180-day rule)',
      'Per-transfer check: pre-2024 income, savings vs income, residency in the year earned',
      'Estimated Thai tax with a bracket breakdown',
      'Complexity flags for LTR visas, capital gains, rental income, US citizens and large transfers',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FOREIGN_INCOME_CALC_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  },
];
