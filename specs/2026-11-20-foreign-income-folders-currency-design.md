# Foreign Income Calculator: folder sections + home-currency entry

Date: 2026-11-20 · Branch: `feature/carbon-copy-redesign` · Size: small change (short design)

## Intent

The calculator page at `/foreign-income-tax-calculator/` still uses the old grey and blue cards.
Two goals:

1. Make it match the carbon-copy redesign and make it easy to move around in. Each section
   becomes a coloured folder with a tab, like the home page.
2. Let people enter transfers in the currency they actually hold (USD, EUR, GBP and so on)
   instead of working out baht themselves.

## Goals / non-goals / anti-goals

- **Goals:** folder-tab sections that can each open and close, with a summary on the closed
  tab; currency entry with a Bank of Thailand rate the user can override.
- **Non-goals:** any change to `estimateRemittanceTax` or `src/utils/remittanceEstimate.ts`. The
  engine keeps receiving `amountThb`, and conversion happens in the form first. No copy changes
  to the rule table or FAQ beyond restyling.
- **Anti-goals:** suggesting that our reference rate is "the" rate the Revenue Department uses.
  Hiding the baht figure the engine actually used.

## Constraints

- Tax rule: RD Q&A Q12 says to convert at the exchange rate **on the date the income is brought
  into Thailand** (`tax-data/2026/foreign-income.json#exchange-rate-at-remittance`, verified
  2026-11-19). It does not say which published rate to use (buying, selling or mid). The comment
  in `exchangeRateService.ts` that "RD accepts BOT reference rates" is **not in our registry**,
  so the UI must not repeat it.
- CLAUDE.md: the tax engine stays unchanged. Tests are required.
- Pre-rendering: the calculator stays inside the existing `CalculatorIsland` hydration gate.

## Approaches considered

**Sections**
- **Stacked collapsible folders (chosen).** Each section is a coloured folder that opens and
  closes on its own, and a closed tab shows a summary. Users can see earlier answers while they
  fill in later ones, and it works well on phones.
- Tabbed sheet stack like the home page, one sheet at a time with Next/Back. Rejected because it
  hides earlier answers.

**Currency**
- **Currency + date, rate auto-filled and editable (chosen).** This reuses the existing Bank of
  Thailand lookup (`src/services/exchangeRateService.ts` through the Cloudflare proxy), which the
  Annual wizard already uses.
- Manual rate only. Rejected because it pushes the look-up onto the user.
- Baht only plus a hint. Rejected as too little help.

## Design

### Folders
- Folders in order: **About you** (paper-white), **Money brought in** (canary), **Thai income
  (optional)** (pink). The **Your estimate** results sheet (sky) appears after submit. Colours
  and shadows come from the existing `paper-*`, `ink`, `desk` and `shadow-sheet` tokens.
- Each tab is a `<button aria-expanded aria-controls>`. A closed tab shows a one-line summary,
  for example: `About you · 200 days · resident · DTV`; `Money brought in · 2 transfers ·
  ฿1,240,000`; `Thai income · none`.
- Defaults: About you and Money brought in start open; Thai income starts closed (as today).
- Each folder ends with a small "Next: <section>" button that closes this folder and opens and
  focuses the next one. All tabs stay clickable in any order.
- If validation fails, the folder holding the error opens and focus moves to the field.
- Within Money brought in, each transfer is a card that can also collapse, with a summary like
  `Transfer 1 · USD 20,000 · Mar 2026 · Income`.
- The rest of the page (header, rule table, FAQ, disclaimer) is restyled to the new palette, and
  its copy stays the same.

### Currency entry (per transfer)
- Fields: **Currency** (THB plus the currencies the BOT service covers; new transfers default to
  the last currency used), **Amount**, **Date brought into Thailand** (date input), and **Rate (฿
  per 1 unit)**.
- Picking a date and a non-THB currency fetches the BOT daily average rate. The rate field fills
  in and shows "Bank of Thailand average rate, 14 Mar 2026" (the actual rate date may be an
  earlier business day). The user can type over it, and the label then changes to "Your rate".
- A line under the fields shows the result: `= ฿712,400 used in the estimate`.
- Copy: "This is a reference rate. The baht amount your Thai bank actually credited is the most
  accurate figure. If you have it, choose THB and enter that."
- If the lookup fails or the currency isn't covered, show "Enter the rate from your bank
  statement" and keep the rate field empty and editable. The estimate still runs once a rate is
  entered.
- THB transfers hide the rate and date fields; the date is optional for THB.
- The "income part, if known" amount on mixed transfers uses the same transfer's currency and
  rate.
- `amountThb` (and `incomePortionThb`) = amount × rate, rounded to the nearest baht.
- The results list each transfer's original amount and currency next to the baht figure.

### Foreign tax already paid
Moves next to the transfers and gets a currency picker. The baht figure uses the latest rate
fetched for that currency, or a rate the user types in, and is labelled approximate. The engine
doesn't deduct it, so this is display only.

### State
UI-only fields (currency, original amount, date, rate, rate source) live in a form-state layer
keyed by transfer id. The engine's `RemittanceInput` type is unchanged. The sessionStorage key
moves to `-v2`, and saved v1 data loads as THB transfers.

### Also update
- Privacy policy §7: name the Foreign Income calculator alongside the Annual calculator, so it
  still says that only the currency code and date are sent.

## Tests
- Unit: the conversion helper (rounding, THB passthrough, user-entered rate overriding the
  fetched one, missing rate returning no amount).
- Component: a USD transfer with a mocked rate passes the correct `amountThb` into the estimate;
  a failed lookup shows the manual-rate prompt; a closed folder shows the correct summary;
  validation opens the folder holding the error.
- Existing remittance engine tests must still pass unchanged.

## Left to the builder
Exact tab sizes and spacing, which currencies appear first in the list, and the motion when a
folder opens or closes (respect `prefers-reduced-motion`).

## Noted, out of scope
`VITE_BOT_API_KEY` is a `VITE_` variable, so it is built into the public JavaScript bundle. It
would be safer to keep the key in the Cloudflare proxy as a secret. Track this separately.
