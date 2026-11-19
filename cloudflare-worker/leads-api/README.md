# Leads API (Cloudflare Worker + D1)

Receives lead-form and "email me my breakdown" submissions from mythaitaxes.com,
stores them in Cloudflare D1, emails the partner firm (and an optional webhook)
via Resend, and serves the password-free, Cloudflare Access–protected
`/admin/leads` page with CSV export.

Everything here fits Cloudflare's **free** plan (Workers, D1, Turnstile, Cron
Triggers, Zero Trust Access up to 50 users) and Resend's free tier.

## One-time setup

All commands run from this folder (`cloudflare-worker/leads-api`).

1. **Install and log in**
   ```sh
   npm install
   npx wrangler login
   ```

2. **Create the database** and paste the printed `database_id` into `wrangler.toml`:
   ```sh
   npx wrangler d1 create mythaitaxes-leads
   npm run db:migrate:remote
   ```

3. **Resend** (email)
   - Create a Resend account, add the domain `mythaitaxes.com`.
   - Add the DNS records Resend shows (SPF/DKIM, usually TXT + MX on a `send.` subdomain)
     at your DNS host (currently GoDaddy, `domaincontrol.com`). Wait until Resend says *Verified*.
   - Check `FROM_EMAIL` / `REPLY_TO_EMAIL` in `wrangler.toml`.

4. **Secrets** (never commit these):
   ```sh
   npx wrangler secret put RESEND_API_KEY
   npx wrangler secret put APP_SECRET            # any random 32+ character string
   npx wrangler secret put PARTNER_EMAILS        # e.g. leads@partner.com,you@yourco.com
   npx wrangler secret put PARTNER_WEBHOOK_URL   # optional
   npx wrangler secret put WEBHOOK_SIGNING_SECRET # optional; partner verifies X-MTT-Signature
   npx wrangler secret put TURNSTILE_SECRET_KEY  # optional but recommended
   ```

5. **Deploy**
   ```sh
   npm run deploy
   ```
   Note the URL, e.g. `https://mythaitaxes-leads.<your-subdomain>.workers.dev`.

6. **Turnstile** (spam protection, optional): Cloudflare dashboard → Turnstile → add a
   widget for `mythaitaxes.com`. Put the **site key** in `partner.config.json`
   (`turnstileSiteKey`) and the **secret** in the `TURNSTILE_SECRET_KEY` secret.
   Without it, the honeypot + per-IP rate limit still apply.

7. **Cloudflare Access** (protects `/admin/*`):
   - Zero Trust dashboard → Access → Applications → *Add* → Self-hosted.
   - Domain: your `*.workers.dev` hostname, path `admin`.
     (mythaitaxes.com's DNS is not on Cloudflare, so the admin lives on the Worker's own hostname.
     Alternatively: Workers → your Worker → Settings → Domains & Routes → workers.dev →
     *Enable Cloudflare Access*.)
   - Policy: *Allow* → Emails → your email.
   - Copy the **Application Audience (AUD) tag** into `ACCESS_AUD` and your team domain
     (`<team>.cloudflareaccess.com`) into `ACCESS_TEAM_DOMAIN` in `wrangler.toml`, then redeploy.
   - Until both are set, `/admin/*` returns 503 (locked). The Worker also verifies the Access
     JWT itself, so a misconfigured Access policy cannot expose the data.

8. **Turn the partner on** — edit `/partner.config.json` at the repo root:
   ```json
   {
     "enabled": true,
     "partnerName": "Partner Firm Co., Ltd.",
     "bookingUrl": "https://cal.example.com/partner/15min",
     "leadsApiBaseUrl": "https://mythaitaxes-leads.<your-subdomain>.workers.dev",
     "turnstileSiteKey": "0x4AAAA..."
   }
   ```
   Then **redeploy the Worker and rebuild/deploy the site** (both read this file). The lead
   form's consent sentence names `partnerName`; the Worker rejects a lead whose consent named a
   different partner, so the two must be deployed together.

   - `enabled: false` + `leadsApiBaseUrl` set → the CTA becomes "Email me my breakdown" only.
   - `leadsApiBaseUrl` empty → no CTA at all (site behaves as before).

## Day to day

- Admin: `https://<worker>/admin/leads` (or the link at mythaitaxes.com/admin/leads/).
  Filter by month, update status (new / contacted / booked / client / rejected + reason),
  export the month's CSV for invoicing. Duplicates (same email within `duplicateWindowDays`)
  are marked and, by default, not sent to the partner.
- Delivery status per lead (partner email / webhook / user email) is shown in the admin and CSV.
- A daily cron deletes leads and breakdown-only subscribers not updated for 24 months (the
  period stated in the Privacy Policy — change `RETENTION_MONTHS` in `src/handlers.ts` and the
  policy together).

## Webhook format

`POST` JSON `{ "event": "lead.created", "lead": { ...all lead fields } }` with header
`X-MTT-Signature: sha256=<hex HMAC-SHA256 of the raw body using WEBHOOK_SIGNING_SECRET>`.

## Tests

From the repo root: `npx vitest run cloudflare-worker/leads-api src/shared`.
