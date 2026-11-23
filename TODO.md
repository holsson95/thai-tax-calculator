# To do

## Unsourced claims still on live pages (noted 2026-11-24)

Each needs an official source recorded in `TAX_RULES.md` / `tax-data/2026/` before it stays, or it should be reworded or removed (see CLAUDE.md tax rule).

- [ ] **DTV article** (`dtv-visa-thailand-tax-guide`): penalty table (1.5% a month surcharge, "up to 200%" penalty) and filing thresholds (120,000 / 220,000 THB).
- [ ] **Transferring-money article** (`transferring-money-to-thailand-tax-rules`):
  - [ ] USD 20,000 cash-reporting threshold.
  - [ ] Card spending and Wise/Revolut/PayPal transfers listed as remittances.
  - [ ] Gifts from non-residents, loans and inheritance listed as not assessable.
- [ ] **Pensioner guide** (`pensioner-retiree-tax-guide-thailand`): the UK State Pension line says the UK-Thailand treaty applies, but that treaty's pension article has not been checked. Only the US treaty is verified in the registry.
- [ ] **LTR article**: Royal Decree 743 refers to income from the "previous tax year" brought into Thailand. Find an official source on how this applies to older income brought in after the 2024 rule (Por. 161/2566). The article currently flags it as unresolved.

## Merge overlapping articles (noted 2026-11-24)

Search Console (24 Nov 2026): `digital-nomad-taxes-thailand` is "Crawled – currently not indexed" (last crawl 25 Aug 2026), and the retiree articles are "Discovered – currently not indexed". Merging gives one stronger page per topic. Before each merge, carry over anything useful and unique from the old page, and redirect the old URL to the merged one (the site is static on GitHub Pages, so check how redirects are done: e.g. a redirect page with a canonical + meta refresh, and drop the old URL from the sitemap).

- [ ] **Digital nomad → DTV guide**: merge `digital-nomad-taxes-thailand` into `dtv-visa-thailand-tax-guide` (indexed, position ~5). Redirect the old URL.
- [ ] **Retiree articles → one pension page**: merge `pensioner-retiree-tax-guide-thailand`, `foreign-pension-income-thailand-tax` and `thailand-retirement-visa-tax-obligations` into one page. Decide which slug to keep, and whether `investment-income-retirees-thailand` belongs in it too. Redirect the rest.
- [ ] After each merge: update internal links and RELATED_MAP, rebuild, request indexing for the merged page in Search Console.
