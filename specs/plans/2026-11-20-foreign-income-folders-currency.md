# Foreign Income Calculator: folders, currency entry, BOT key move — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the Foreign Income calculator as collapsible coloured folders, let users enter
transfers in their own currency with an editable Bank of Thailand rate, and move the BOT API key
out of the public bundle into the Cloudflare proxy.

**Architecture:** Conversion happens in the form layer. A per-transfer `TransferMoney` record
(currency, amount, date, rate) is converted to `amountThb` before it is handed to the unchanged
`estimateRemittanceTax`. A reusable `Folder` component wraps each section. The proxy Worker adds
the key from its own secret, so the browser never sees it.

**Tech Stack:** React 18 + TypeScript, Tailwind (redesign tokens `paper-*`, `ink`, `desk`, `shadow-sheet`), Vitest + Testing Library (happy-dom), Cloudflare Worker (module syntax).

**Spec:** `specs/2026-11-20-foreign-income-folders-currency-design.md`

## Global Constraints

- Do not modify `src/utils/remittanceEstimate.ts` (engine logic or its `RemittanceInput` type). `src/utils/__tests__/remittanceEstimate.test.ts` must pass unchanged.
- The UI must never say the RD accepts or requires BOT rates. Rate label: "Bank of Thailand average rate, <d MMM yyyy>"; once the user edits the rate, the label reads "Your rate".
- Reference-rate copy (exact): "This is a reference rate. The baht amount your Thai bank actually credited is the most accurate figure. If you have it, choose THB and enter that."
- Lookup-failure copy (exact): "Enter the rate from your bank statement".
- Baht conversion: `Math.round(amount × rate)` (whole baht).
- Folder colours: About you = `bg-paper-white`, Money brought in = `bg-paper-canary`, Thai income = `bg-paper-pink`, Your estimate = `bg-paper-sky`.
- Defaults: About you and Money brought in open; Thai income closed. New transfers default to the last-used currency; the first transfer defaults to `THB`.
- sessionStorage key becomes `mtt-foreign-income-calculator-v2`; v1 data loads as THB transfers.
- Animations must respect `prefers-reduced-motion` (`motion-reduce:transition-none`).
- The calculator stays behind the existing `CalculatorIsland` hydration gate.

## Review Focus

1. A non-THB transfer with an amount but no rate (offline, lookup failed, unsupported currency) must block submit with "Enter the exchange rate for transfer N." and open the Money folder. It must not count as ฿0. → Task 5 test `blocks submit when a foreign transfer has no rate`.
2. A rate response that arrives after the user has changed the currency or date must be ignored (no stale rate). → Task 3 test `ignores a rate that resolves after currency changed`.
3. The date picker is limited to 1 Jan of `RULES_TAX_YEAR` through today, so no future date can be picked. → Task 3 test `limits the date to the tax year up to today`.
4. A returning visitor with v1 saved data sees their transfers as THB, with amounts intact. → Task 2 test `migrates v1 saved state to THB transfers`.
5. Switching a transfer to THB hides the date and rate fields, and `amountThb` equals the amount. → Task 3 test `THB hides rate fields and passes amount through`.

---

### Task 1: Move the BOT API key into the proxy

**Files:**
- Modify: `cloudflare-worker/bot-proxy.js`
- Modify: `src/services/exchangeRateService.ts`
- Test: `cloudflare-worker/__tests__/bot-proxy.test.js` (create), `src/services/__tests__/exchangeRateService.test.ts` (create)
- Modify: `vitest.config.ts` only if `cloudflare-worker/**` tests are not picked up by default

**Interfaces:**
- Produces: the Worker `fetch(request, env)` where `env.BOT_API_KEY` is a Cloudflare secret. `getExchangeRate(currency: string, date: string): Promise<ExchangeRateResponse>` keeps its signature but sends no `Authorization` header and no longer requires `VITE_BOT_API_KEY`.

- [ ] **Step 1: Write the failing worker tests** (file header `// @vitest-environment node`; stub `globalThis.fetch` with `vi.fn` returning `new Response('{}', {status: 200})`)

```js
const env = { BOT_API_KEY: 'server-key' };
const target = 'https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=2026-03-02&end_period=2026-03-02';
const req = (origin, url = target, auth) =>
  new Request(`https://proxy.example/?url=${encodeURIComponent(url)}`, { headers: { Origin: origin, ...(auth ? { Authorization: auth } : {}) } });

it('adds the server key and ignores a client Authorization header', async () => {
  await worker.fetch(req('https://www.mythaitaxes.com', target, 'client-key'), env);
  expect(fetch.mock.calls[0][1].headers.Authorization).toBe('server-key');
});
it('rejects a disallowed origin with 403 and does not call upstream', async () => {
  expect((await worker.fetch(req('https://evil.example'), env)).status).toBe(403);
  expect(fetch).not.toHaveBeenCalled();
});
it('rejects a BOT path other than DAILY_AVG_EXG_RATE with 403', async () => {
  const res = await worker.fetch(req('https://www.mythaitaxes.com', 'https://gateway.api.bot.or.th/Stat-InterestRate/v2/x'), env);
  expect(res.status).toBe(403);
});
it('returns 500 when the secret is missing', async () => {
  expect((await worker.fetch(req('https://www.mythaitaxes.com'), {})).status).toBe(500);
});
```

- [ ] **Step 2: Run** `npx vitest run cloudflare-worker` and confirm the tests FAIL (the key is taken from the client header, and other origins are allowed).

- [ ] **Step 3: Update `bot-proxy.js`.**
  - Set `ALLOWED_TARGET_PREFIX = 'https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/'`.
  - Add `'http://localhost:5173'` to `ALLOWED_ORIGINS`.
  - Return 403 for any origin that isn't allowed, including on OPTIONS.
  - Return 500 with "Proxy not configured" when `!env.BOT_API_KEY`.
  - Always send `Authorization: env.BOT_API_KEY` upstream.
  - Remove `Authorization` from `Access-Control-Allow-Headers`.
  - Update the header comment with the deploy steps from Step 7, and note that the Origin check only stops browsers, not scripts.

- [ ] **Step 4: Write the failing service test** (`vi.stubEnv('VITE_BOT_PROXY_URL', 'https://proxy.example')`, `vi.stubEnv('VITE_BOT_API_KEY', '')`, mock `fetch` returning a BOT `data_detail` row `{period:'2026-03-02', currency_id:'USD', mid_rate:'35.6200'}`, clear sessionStorage):

```ts
it('fetches a rate without an API key and sends no Authorization header', async () => {
  const res = await getExchangeRate('USD', '2026-03-02');
  expect(res).toEqual({ ok: true, data: expect.objectContaining({ rate: 35.62, date: '2026-03-02' }) });
  expect(fetch.mock.calls[0][1]?.headers).not.toHaveProperty('Authorization');
});
```

- [ ] **Step 5: Update `exchangeRateService.ts`.**
  - Delete `BOT_API_KEY` and the `no_api_key` branch.
  - Send only `Accept: '*/*'`.
  - Remove `'no_api_key'` from `ExchangeRateError['type']` if `grep -rn no_api_key src` shows no other users.
  - Fix the header comment: the proxy holds the key, and the BOT rate is a reference rate (delete the "RD accepts BOT reference rates" sentence).
  - Because the module reads the env at load time, move the `import.meta.env` reads inside `getExchangeRate`, or use `vi.resetModules()` in the test.

- [ ] **Step 6: Run** `npx vitest run cloudflare-worker src/services` and confirm it PASSES. Then run `npx vitest run src/components/steps` and confirm the Annual wizard tests still pass.

- [ ] **Step 7: Commit.**

```bash
git add cloudflare-worker src/services vitest.config.ts
git commit -m "Move BOT API key into the proxy Worker; restrict proxy to rate lookups from our origins"
```

Hand-off to Hannah (not code): new key in BOT portal → Cloudflare secret `BOT_API_KEY` → paste and deploy `bot-proxy.js` → delete `VITE_BOT_API_KEY` from `.env` → rebuild site (Task 6) → revoke old key.

---

### Task 2: Conversion helpers and saved-state migration

**Files:**
- Create: `src/components/foreignIncome/transferMoney.ts`
- Test: `src/components/foreignIncome/__tests__/transferMoney.test.ts`

**Interfaces:**
- Produces:

```ts
export type RateSource = 'bot' | 'user';
export interface TransferMoney {
  currency: string;            // ISO code, 'THB' = no conversion
  amount: number;              // in `currency`
  incomePortion?: number;      // in `currency`, only for kind === 'mixed'
  date: string;                // YYYY-MM-DD, '' if not set
  rate: number | null;         // THB per 1 unit; 1 for THB
  rateSource: RateSource | null;
  rateDate?: string;           // actual BOT publication date
}
export function toThb(amount: number, rate: number | null): number | null; // THB rule: Math.round(amount*rate); null if rate missing/<=0
export function thbAmounts(m: TransferMoney): { amountThb: number; incomePortionThb?: number } | null; // null when a non-THB amount>0 has no rate
export function newTransferMoney(currency: string): TransferMoney; // THB → rate 1, rateSource null
export interface SavedStateV2 { input: RemittanceEstimateInput; money: Record<string, TransferMoney>; foreignTax: { currency: string; amount: number; rate: number | null } }
export function loadSavedState(raw: string | null): SavedStateV2 | null; // parses v2, or a v1 RemittanceEstimateInput → THB money per transfer
export const STORAGE_KEY_V2 = 'mtt-foreign-income-calculator-v2';
export const STORAGE_KEY_V1 = 'mtt-foreign-income-calculator-v1';
```

- [ ] **Step 1: Write the failing tests.**
  - `toThb(20000, 35.62) === 712400`
  - `toThb(10, 35.625) === 356`
  - `toThb(100, null) === null`
  - `toThb(100, 0) === null`
  - `thbAmounts` for THB amount 5000 → `{ amountThb: 5000 }`
  - USD 1000 @ 35 with incomePortion 200 → `{ amountThb: 35000, incomePortionThb: 7000 }`
  - USD 1000 with rate null → `null`
  - USD amount 0 with rate null → `{ amountThb: 0 }`
  - `migrates v1 saved state to THB transfers`: a v1 JSON with remittance `{id:'a', amountThb: 50000, …}` → `money.a` equals `{currency:'THB', amount:50000, rate:1, …}`, and `input` is preserved
  - Malformed JSON and `null` → `null`

- [ ] **Step 2: Run** `npx vitest run src/components/foreignIncome/__tests__/transferMoney.test.ts` and confirm it FAILS (the module is missing).

- [ ] **Step 3: Implement the module** to the signatures above. `loadSavedState` tells v2 from v1 by checking for the `money` key.

- [ ] **Step 4: Run** the same test file and confirm it PASSES.

- [ ] **Step 5: Commit** `"Add transfer currency conversion helpers and v1→v2 saved-state migration"`.

---

### Task 3: `TransferMoneyFields` component (currency, amount, date, rate)

**Files:**
- Create: `src/components/foreignIncome/TransferMoneyFields.tsx`
- Test: `src/components/foreignIncome/__tests__/TransferMoneyFields.test.tsx`

**Interfaces:**
- Consumes: `TransferMoney`, `toThb` (Task 2); `getExchangeRate` (Task 1); `COMMON_CURRENCIES`, `EXTENDED_CURRENCIES` from `src/config/taxConfig.ts`; `RULES_TAX_YEAR`.
- Produces: `<TransferMoneyFields idPrefix: string; value: TransferMoney; onChange: (next: TransferMoney) => void; showIncomePortion: boolean />`.
  - Labels: `Currency`, `Amount`, `Date brought into Thailand`, `Rate (฿ per 1 <CODE>)`, and `Income or gain part, if known` (only when `showIncomePortion`).
  - Below the fields: `= ฿712,400 used in the estimate`, or the lookup-failure copy when no rate is set.

- [ ] **Step 1: Write the failing tests** (mock `../../services/exchangeRateService`).
  - `THB hides rate fields and passes amount through`: with currency THB there are no `Date brought into Thailand` or `Rate` fields, and the result line shows `= ฿5,000 used in the estimate`.
  - `fetches the BOT rate when currency and date are set`: picking USD and date 2026-03-02 calls `getExchangeRate('USD','2026-03-02')`. `onChange` is then called with `rate: 35.62, rateSource: 'bot', rateDate: '2026-03-02'`, and the label "Bank of Thailand average rate, 2 Mar 2026" is shown.
  - `typing a rate marks it as the user's rate`: `rateSource: 'user'`, and the label "Your rate" is shown.
  - `ignores a rate that resolves after currency changed`: the USD promise is still pending when the currency changes to EUR; the EUR promise resolves to 38; the USD promise then resolves to 35.62. The final `onChange` has `currency: 'EUR', rate: 38`.
  - `shows the bank-statement prompt when lookup fails`: `getExchangeRate` returns `{ok:false,…}`, so "Enter the rate from your bank statement" is shown and the rate field stays editable.
  - `limits the date to the tax year up to today`: the date input has `min` = `${RULES_TAX_YEAR}-01-01` and `max` = today (local `YYYY-MM-DD`, use fake timers).
  - The reference-rate copy is shown whenever the currency isn't THB.

- [ ] **Step 2: Run** the test file and confirm it FAILS.

- [ ] **Step 3: Implement.**
  - Fetch in a `useEffect` keyed on `[currency, date]`, with a `let cancelled = false` cleanup for the stale-response guard.
  - Changing the currency or date clears the rate and resets `rateSource` to null before the new fetch.
  - Money inputs reuse the existing `MoneyField` pattern: `type="text" inputMode="decimal"`, with comma formatting and the currency code as the prefix. Move `MoneyField` and `toNumber` out of `ForeignIncomeCalculator.tsx` into `src/components/foreignIncome/fields.tsx` so both files can use them.
  - Style the inputs with redesign tokens: `border-ink/30 bg-white focus:ring-desk`.

- [ ] **Step 4: Run** the test file and confirm it PASSES.

- [ ] **Step 5: Commit** `"Add TransferMoneyFields with BOT rate lookup and editable rate"`.

---

### Task 4: `Folder` component and folder summaries

**Files:**
- Create: `src/components/foreignIncome/Folder.tsx`, `src/components/foreignIncome/folderSummaries.ts`
- Test: `src/components/foreignIncome/__tests__/Folder.test.tsx`, `src/components/foreignIncome/__tests__/folderSummaries.test.ts`

**Interfaces:**
- Produces:

```ts
// Folder.tsx
interface FolderProps {
  id: string; title: string; summary: string; paper: string; // e.g. 'bg-paper-canary'
  open: boolean; onToggle: () => void;
  next?: { label: string; onClick: () => void }; // renders "Next: <label>" button at the bottom
  children: React.ReactNode;
}
// Tab = <button id={`${id}-tab`} aria-expanded={open} aria-controls={`${id}-panel`}>; panel = <div id={`${id}-panel`} role="region" aria-labelledby={`${id}-tab`} hidden={!open}>
// Folder exposes a forwarded ref to the tab button so callers can focus it.

// folderSummaries.ts
export function aboutSummary(input: RemittanceEstimateInput, visaLabel: string): string;   // 'About you · 200 days · resident · DTV' ; 'About you · not started' when days = 0
export function transfersSummary(totalThb: number, count: number): string;                // 'Money brought in · 2 transfers · ฿1,240,000' ; '1 transfer'
export function thaiSummary(t: ThaiIncomeInput): string;                                  // 'Thai income · none' | 'Thai income · ฿600,000'
export function transferCardSummary(i: number, m: TransferMoney, yearLabel: string, kindLabel: string): string; // 'Transfer 1 · USD 20,000 · Mar 2026 · Income' (omit date part when empty)
```

- [ ] **Step 1: Write the failing tests.**
  - The summary strings above, exactly as written. For `aboutSummary`, the residency word comes from `TAX_RULES.residencyDays.value`: 180 → `resident`, 179 → `non-resident`.
  - The folder test checks four things:
    - Clicking the tab toggles `aria-expanded`.
    - When closed, the summary shows and the panel has the `hidden` attribute.
    - The `Next: Money brought in` button calls `next.onClick`.
    - The tab can be reached and activated with the keyboard (`Enter`).

- [ ] **Step 2: Run** `npx vitest run src/components/foreignIncome/__tests__/Folder.test.tsx src/components/foreignIncome/__tests__/folderSummaries.test.ts` and confirm both FAIL.

- [ ] **Step 3: Implement.** Follow CopyStack's tab look (`rounded-t-md px-4 pb-2.5 pt-2 font-bold text-ink`, a slightly lower tab and `brightness-[0.93]` when closed). The body is `${paper} shadow-sheet px-5 pb-7 pt-6 sm:px-8 text-ink`. Add a chevron rotated with `motion-reduce:transition-none`. The summary sits beside the title on the tab and wraps below it on narrow screens.

- [ ] **Step 4: Run** the same tests and confirm they PASS.

- [ ] **Step 5: Commit** `"Add collapsible Folder component and section summaries"`.

---

### Task 5: Wire the calculator together

**Files:**
- Modify: `src/components/foreignIncome/ForeignIncomeCalculator.tsx`, `src/components/foreignIncome/RemittanceResults.tsx`
- Modify (test): `src/pages/__tests__/ForeignIncomeCalculatorPage.test.tsx`
- Test: `src/components/foreignIncome/__tests__/ForeignIncomeCalculator.test.tsx` (create)

**Interfaces:**
- Consumes: Tasks 2–4.
- Produces: `RemittanceResults` gains an optional `transferLabels?: Record<string, string>` prop (remittance id → e.g. `'USD 20,000'`). When a label is given and the currency isn't THB, render `Transfer 1: USD 20,000 → ฿712,400`.

- [ ] **Step 1: Update the existing page test and write the new calculator tests** (mock `exchangeRateService`).
  - In `ForeignIncomeCalculatorPage.test.tsx`, change `getByLabelText('Amount (THB)')` to `getByLabelText('Amount')`. Everything else in that file must keep passing unchanged.
  - New tests:
    - `passes converted baht to the estimate`: USD 20,000 at a mocked 35.62 means `onEstimate`'s input has `remittances[0].amountThb === 712400`.
    - `blocks submit when a foreign transfer has no rate`: the lookup fails and the amount is 1000 USD, so the alert reads `Enter the exchange rate for transfer 1.`, the Money folder is open, and focus is on that transfer's rate field.
    - `opens the About you folder when days are missing`: close About you, then submit; the folder reopens and `Days in Thailand this year` has focus.
    - `closed folders show summaries`: enter 200 days and close About you; the tab reads `About you · 200 days · resident · Standard / work visa`.
    - `new transfer defaults to the last-used currency`: the first transfer is set to EUR, so the added transfer's currency select is EUR.
    - `foreign tax paid converts with its own currency`: GBP 1,000 with a typed rate of 45 shows `≈ ฿45,000 (approximate)`, and `input.foreignTaxPaidThb === 45000`.
    - The results show `USD 20,000 → ฿712,400`.

- [ ] **Step 2: Run** `npx vitest run src/components/foreignIncome src/pages/__tests__/ForeignIncomeCalculatorPage.test.tsx` and confirm the new tests FAIL.

- [ ] **Step 3: Implement in `ForeignIncomeCalculator.tsx`.**
  - State: `input` (engine shape, unchanged), `money: Record<id, TransferMoney>`, `foreignTax`, and `open: { about: boolean; money: boolean; thai: boolean }`. Each transfer card's open state lives in `Record<id, boolean>`, and new cards start open.
  - Every `money` change writes `amountThb` / `incomePortionThb` into `input.remittances` through `thbAmounts`, using 0 when the result is `null`. Validation catches the null case (see Review Focus 1).
  - Folder order: About you → Money brought in (transfers, then "Foreign tax already paid" moved here from About you) → Thai income (optional).
  - Validation order:
    1. Days
    2. Any transfer whose `thbAmounts` is `null`: "Enter the exchange rate for transfer N."
    3. No amounts at all

    Each error opens its folder and focuses the field with `requestAnimationFrame`.
  - Persist `{ input, money, foreignTax }` to `STORAGE_KEY_V2` and load it with `loadSavedState`. When no v2 data exists, fall back to the v1 key.
  - Results render inside a `Folder`-styled sky sheet titled `Your estimate` (always open; no tab toggle needed).
  - The buttons use redesign styling: primary `bg-desk text-white hover:bg-desk-deep`, secondary `border-ink/30`.
  - In `RemittanceResults.tsx`, restyle the cards to paper/ink tokens with the same structure and text, and add `transferLabels`. The existing heading text and the `region` name stay the same, so the page tests keep working.

- [ ] **Step 4: Run** `npx vitest run` (the full suite) and confirm everything PASSES, including `remittanceEstimate.test.ts`, which must be unchanged.

- [ ] **Step 5: Commit** `"Foreign income calculator: folder sections and per-transfer currency with BOT rates"`.

---

### Task 6: Restyle the page, update the privacy copy, build

**Files:**
- Modify: `src/pages/ForeignIncomeCalculatorPage.tsx` (palette only: page ground `bg-paper-ground`, headings `text-ink display`, rule table and FAQ on `bg-paper-white shadow-sheet`, links `text-desk`; **copy unchanged**; `CalculatorPlaceholder` keeps its `min-h` values)
- Modify: `src/pages/PrivacyPolicyPage.tsx` §7. The first sentence becomes exactly: "When you enter foreign income in the Annual Tax Calculator or the Foreign Income Tax Calculator, the site may fetch the Bank of Thailand's published daily exchange rate for the currency and date you specify."
- Rebuild: `docs/`

- [ ] **Step 1: Make both edits.**
- [ ] **Step 2: Run** `npx vitest run src/pages src/__tests__` and confirm it PASSES. The page test's "wording stays informational" check covers the new copy.
- [ ] **Step 3: Check that `VITE_BOT_API_KEY` is gone from `.env`** (Hannah removes it after the Worker is deployed). If it is still there, stop and tell her before building.
- [ ] **Step 4: Run** `npm run build`. It must finish without errors. Then check two things:
  - `grep -c "Loading calculator" docs/foreign-income-tax-calculator/index.html` returns ≥ 1 (the page is still pre-rendered behind the hydration gate).
  - `grep -l "gateway.api.bot.or.th" docs/assets/*.js` lists files, but `grep -rF "$OLD_KEY_PREFIX" docs/assets` finds nothing. Compare against the first 8 characters of the old key without printing it.
- [ ] **Step 5: Check it in the browser.** Run `npm run dev`, open `/foreign-income-tax-calculator/` at 375px and at desktop width, and check four things:
  - The folders open and close with the mouse and the keyboard.
  - A USD transfer fetches a rate (if the proxy is deployed), or else shows the bank-statement prompt.
  - The results show the original currency.
  - The page doesn't scroll sideways at 375px.
- [ ] **Step 6: Commit** `"Restyle foreign income page to carbon-copy palette; privacy note covers its rate lookups; rebuild docs"`.
