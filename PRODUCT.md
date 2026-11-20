# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: English-speaking foreigners living in Thailand (expats, digital nomads, retirees) who are unsure whether and how Thai personal income tax applies to them. Closely related: Thai tax residents (180+ days) who bring overseas income or savings into Thailand and need to understand the 2024 remittance rules (Por. 161/2566, Por. 162/2566).

Secondary audiences the site already serves: salaried employees, freelancers, sole proprietors and company owners in Thailand.

## Product Purpose

MyThaiTaxes (mythaitaxes.com) is a free Thailand personal income tax calculator and education site. The calculator is the core product; articles, worked examples, FAQ and methodology explain the result. Success on the front page: a first-time visitor types an income and sees a tax estimate immediately, then knows which deeper calculator or guide fits their situation.

## Positioning

Transparent, source-cited estimates for foreigners: every tax rule is tied to a Revenue Department source, a tax year and its conditions (see TAX_RULES.md and src/config/taxRules.ts), and the site shows its methodology rather than asking to be trusted.

## Operating Context

Visitors arrive from search with a specific worry (residency, remittance, filing deadline, how much tax on a salary). They use desktop and mobile. Tools on the site:
- Quick estimate (home page, salaried income, live result)
- Annual tax wizard (/annual-tax/, multi-step, PDF output)
- Monthly withholding (/monthly-withholding/)
- Foreign income / remittance estimator (/foreign-income-tax-calculator/)
- Worked examples, 2026 overview, articles, FAQ, methodology, sources.

## Capabilities and Constraints

- React 18 + Vite + TypeScript + Tailwind; SSR pre-rendered to static HTML in docs/ (GitHub Pages). AnnualTaxWizard is lazy-loaded (react-pdf breaks SSR).
- The tax calculation engine must not change without documentation, tests and explicit approval (CLAUDE.md).
- Tax facts must never be invented or updated from model knowledge; every rule shown needs a source, tax year and conditions.
- AdSense is the funding model and the site is preparing for AdSense review; ad slots exist (src/components/ads/AdSlot). Partner lead-referral CTA exists but is disabled (partner.config.json).
- Generic SEO filler content is not allowed (CLAUDE.md content rule).

## Brand Commitments

- Name: MyThaiTaxes; domain mythaitaxes.com. No logo exists yet.
- Visible Revenue Department source citations and "last updated" dates must stay.
- The 2026 bracket table and the common-deductions summary must remain on the home page (may be presented more compactly).
- Estimates are labelled as estimates, not tax advice.

## Evidence on Hand

- Real content: 27 articles (src/data/articles.ts), FAQ (src/data/faq.ts), worked examples (TAX_EXAMPLES.md, /tax-examples/), tax rule registry with sources (TAX_RULES.md, tax-data/2026/).
- No testimonials, user counts, press, or customer logos exist. Do not fabricate them.

## Product Principles

1. The calculator is the product: the answer comes before the explanation.
2. Show the source: every number traces to an official document and tax year.
3. Speak to the foreigner's real question (am I taxable, on what, by when) in plain English.
4. Honest uncertainty: estimates are labelled, and unclear interpretations are not stated as fact.
