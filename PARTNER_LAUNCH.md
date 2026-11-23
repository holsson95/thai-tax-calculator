# Partner lead form: launch runbook

The lead form ("Want a specialist to review this? Free 15-min call") is built and
hidden behind `partner.config.json`. This file has two parts:

- **Part A**, done once **before** any partner signs: sets up the backend while
  the site looks exactly as it does today.
- **Part B**, **launch day**: about 15 minutes, a few config values, then build and push.

Technical detail for each step is in [cloudflare-worker/leads-api/README.md](cloudflare-worker/leads-api/README.md).

## Where the form appears

Once switched on, the call-to-action box appears under the result of every calculator,
with no further code changes:

| Calculator | Component |
|---|---|
| Home page quick calculator | `src/components/QuickTaxCalculator.tsx` |
| Annual tax wizard | `src/components/steps/AnnualResultsStep.tsx` |
| Monthly withholding | `src/components/steps/MonthlyResultsStep.tsx` |
| Freelancer | `src/components/steps/FreelancerResultsStep.tsx` |
| Foreign income / remittance | `src/components/foreignIncome/ForeignIncomeCalculator.tsx` |

The box is more prominent (solid border, filled button) when the result has complexity
flags (LTR visa, US citizen, mixed savings, capital gains…) or tax above
`leadCtaTaxThresholdThb` (50,000 THB). Pages that change automatically when the partner
is on: `/thank-you/` (booking link), `/how-this-site-is-funded/` and `/privacy/` (both
name the partner).

## Preview it any time (no partner, no backend)

```sh
npm run dev:partner-preview
```

Opens the dev server with a placeholder partner ("Example Tax Firm (preview)").
Run any calculator to see the box, open the form, submit it and land on the thank-you
page. Nothing is sent: submissions are faked in the browser, and the box is labelled
"Local preview: nothing is sent". This switch only works on the dev server; production
builds strip it out.

## Part A: before a partner signs

All free tier. Nothing visible on the site changes.

- [ ] **Get this code onto `main`.** The lead-gen work currently lives on
      `feature/carbon-copy-redesign` (and `feature/lead-generation`); `main` does not have it.
- [ ] **Deploy the leads Worker** (README steps 1–5): D1 database, Resend account + DNS
      records at GoDaddy, secrets `RESEND_API_KEY` and `APP_SECRET`, `npm run deploy`.
      Note the `https://mythaitaxes-leads.<you>.workers.dev` URL.
- [ ] **Turnstile** (README step 6): create the widget; set the Worker secret
      `TURNSTILE_SECRET_KEY` and put the site key in `partner.config.json`
      (`turnstileSiteKey`). This is harmless while the form is off.
- [ ] **Cloudflare Access** for `/admin/leads` (README step 7): fill `ACCESS_AUD` and
      `ACCESS_TEAM_DOMAIN` in `wrangler.toml`, redeploy.
- [ ] **Operator name**: fill `SITE_OPERATOR` in `src/config/site.ts` (the company that
      signs partner deals; shown in the privacy policy).
- [ ] **Verify**:
      ```sh
      npm run partner:check -- --worker-only --api https://mythaitaxes-leads.<you>.workers.dev
      ```
      Should end in `OK`.

Optional: putting the Worker URL in `leadsApiBaseUrl` now (partner still `enabled: false`)
switches on the "Email me my breakdown" box under results, without a partner. Leave it
empty if you want the site to stay exactly as it is until launch.

## Part B: launch day

### 1. Get from the partner

| Item | Goes to | Public? |
|---|---|---|
| Firm name, exactly as visitors should see it in the consent sentence | `partnerName` in `partner.config.json` | yes (repo is public) |
| Inbox(es) that receive leads | Worker secret `PARTNER_EMAILS` | **no**, never commit |
| Booking link for the free 15-min call (Calendly, Cal.com…) | `bookingUrl` | yes |
| CRM webhook URL (optional) | Worker secrets `PARTNER_WEBHOOK_URL`, `WEBHOOK_SIGNING_SECRET` | **no** |

Before going live, have the agreement and the privacy policy's lead section (`/privacy/#leads`)
reviewed. Visitors consent to sharing their details with the named firm.

### 2. Switch on (Worker first, then site)

```sh
# a) partner.config.json:
#    "enabled": true,
#    "partnerName": "<firm name>",
#    "bookingUrl": "https://...",
#    "leadsApiBaseUrl": "https://mythaitaxes-leads.<you>.workers.dev"

# b) Worker: secret + redeploy (it reads partner.config.json at deploy time)
cd cloudflare-worker/leads-api
npx wrangler secret put PARTNER_EMAILS
npm run deploy
cd ../..

# c) Preflight: must end in OK
npm run partner:check
```

`partner:check` blocks launch if anything would break submissions. In particular, it
catches a deployed Worker that names a different partner than the site. That mismatch
would reject every lead at the consent check.

### 3. Ship

```sh
npm run build
git add partner.config.json docs/
git commit -m "Switch on partner lead form: <firm name>"
git push
```

### 4. Send one real test lead (straight after the site deploys)

On www.mythaitaxes.com (the Worker only accepts requests from the live site, so this
can't be done from `npm run dev`): run the foreign income calculator and submit the
form with your own email. Check that:

- the partner inbox received it
- you received the confirmation email
- it shows in `https://<worker>/admin/leads`

Then mark it `rejected` with the reason "test". If it fails, switch off (below) and check
`npm run partner:check` and `npx wrangler tail` in `cloudflare-worker/leads-api`.

## Switching off or changing partner

- **Off:** set `"enabled": false` → `npm run build` and push **first** (hides the form) →
  then redeploy the Worker.
- **New partner:** same as Part B with the new values. Deploy the Worker and push the site
  back to back. A visitor who opened the form before the switch gets "please reload".

## Files involved

`partner.config.json` (the switch, read by both site and Worker) ·
`src/config/partner.ts` · `src/components/leads/*` · `src/services/leadsApi.ts` ·
`cloudflare-worker/leads-api/*` (Worker, `GET /api/health` used by the check) ·
`scripts/partner-check.mjs`
