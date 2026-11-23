#!/usr/bin/env node
/**
 * Partner launch preflight: `npm run partner:check`
 *
 * Checks that partner.config.json, the leads Worker's wrangler.toml and the
 * DEPLOYED Worker agree, so switching the lead form on cannot ship a form whose
 * every submission fails. Exit code 1 if anything blocks launch.
 *
 *   npm run partner:check                    full launch check (config + live Worker)
 *   npm run partner:check -- --worker-only   before a partner is signed: checks the
 *                                            Worker setup only (partner may be off)
 *   npm run partner:check -- --api https://mythaitaxes-leads.x.workers.dev
 *                                            probe this Worker URL instead of the one in the config
 *   npm run partner:check -- --offline       skip the network checks
 *
 * See PARTNER_LAUNCH.md.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_ORIGIN = 'https://www.mythaitaxes.com';

const isPlaceholder = (s) => typeof s !== 'string' || !s.trim() || /^\[.*\]$/.test(s.trim()) || /example\.com/.test(s);
const isHttps = (s) => typeof s === 'string' && /^https:\/\/[^\s]+$/.test(s.trim());

/** Pulls a `key = "value"` string out of wrangler.toml (good enough for our flat file). */
export function tomlString(toml, key) {
  const m = new RegExp(`^\\s*${key}\\s*=\\s*"([^"]*)"`, 'm').exec(toml);
  return m ? m[1] : null;
}

/**
 * Static checks. Returns { errors: string[], warnings: string[] }.
 * workerOnly: the partner may still be switched off (pre-signing setup).
 */
export function checkConfig({ partner, wranglerToml, siteTs }, { workerOnly = false } = {}) {
  const errors = [];
  const warnings = [];

  // Worker setup (needed in both modes)
  const dbId = tomlString(wranglerToml, 'database_id');
  if (!dbId || dbId.startsWith('REPLACE')) errors.push('wrangler.toml: database_id is not set (run `npx wrangler d1 create mythaitaxes-leads`).');
  if (!tomlString(wranglerToml, 'ACCESS_AUD') || !tomlString(wranglerToml, 'ACCESS_TEAM_DOMAIN'))
    warnings.push('wrangler.toml: ACCESS_AUD / ACCESS_TEAM_DOMAIN empty, so /admin/leads stays locked (503) and you cannot see leads.');

  if (workerOnly) return { errors, warnings };

  // Partner switch
  if (partner.enabled !== true) errors.push('partner.config.json: "enabled" is false, so the form will not show.');
  if (isPlaceholder(partner.partnerName)) errors.push('partner.config.json: "partnerName" is still a placeholder.');
  if (!isHttps(partner.leadsApiBaseUrl)) errors.push('partner.config.json: "leadsApiBaseUrl" must be the deployed Worker URL (https://...workers.dev).');
  if (!partner.bookingUrl || isPlaceholder(partner.bookingUrl)) warnings.push('partner.config.json: no "bookingUrl", so the thank-you page will not offer a booking link.');
  else if (!isHttps(partner.bookingUrl)) errors.push('partner.config.json: "bookingUrl" must start with https://');
  if (!partner.turnstileSiteKey) warnings.push('partner.config.json: no "turnstileSiteKey", so spam protection is honeypot + rate limit only.');
  if (typeof partner.leadCtaTaxThresholdThb !== 'number' || partner.leadCtaTaxThresholdThb < 0)
    errors.push('partner.config.json: "leadCtaTaxThresholdThb" must be a number.');

  // Privacy policy names the operator
  if (/legalName:\s*''/.test(siteTs)) warnings.push("src/config/site.ts: SITE_OPERATOR.legalName is empty (the privacy policy won't name the company that signs the partner deal).");

  return { errors, warnings };
}

/** Compares the live Worker's GET /api/health answer and CORS with the site config. */
export function checkHealth(partner, health, { corsOk = true, workerOnly = false } = {}) {
  const errors = [];
  const warnings = [];
  if (!health || health.ok !== true) {
    errors.push('Worker /api/health did not answer ok. Is the Worker deployed (with the /api/health route)?');
    return { errors, warnings };
  }
  const c = health.configured ?? {};
  if (!c.resend) errors.push('Worker secret RESEND_API_KEY is not set (no emails would be sent).');
  if (!c.appSecret) errors.push('Worker secret APP_SECRET is not set.');
  if (!corsOk) errors.push(`Worker does not allow requests from ${SITE_ORIGIN} (check ALLOWED_ORIGINS in wrangler.toml).`);
  if (!c.adminAccess) warnings.push('Worker: Cloudflare Access is not configured, so /admin/leads is locked.');

  if (workerOnly) return { errors, warnings };

  if (!c.partnerEmails) errors.push('Worker secret PARTNER_EMAILS is not set, so leads would be stored but never reach the partner.');
  if (health.partnerEnabled !== true) errors.push('The deployed Worker still has the partner switched off. Redeploy it after editing partner.config.json.');
  if (health.partnerName !== partner.partnerName)
    errors.push(
      `Partner name mismatch: site says "${partner.partnerName}", deployed Worker says "${health.partnerName}". ` +
        'Every lead would fail the consent check. Redeploy the Worker (`npm run deploy` in cloudflare-worker/leads-api).'
    );
  if (c.turnstile && !partner.turnstileSiteKey)
    errors.push('Worker has TURNSTILE_SECRET_KEY but the site has no turnstileSiteKey, so every lead would fail the spam check.');
  if (!c.turnstile && partner.turnstileSiteKey) warnings.push('Site shows Turnstile but the Worker has no TURNSTILE_SECRET_KEY, so tokens are not verified.');
  return { errors, warnings };
}

async function probe(apiBase) {
  const base = apiBase.replace(/\/$/, '');
  let health = null;
  let corsOk = false;
  try {
    const r = await fetch(`${base}/api/health`, { headers: { Origin: SITE_ORIGIN } });
    health = await r.json().catch(() => null);
  } catch (e) {
    return { health: null, corsOk: false, error: String(e?.message ?? e) };
  }
  try {
    const r = await fetch(`${base}/api/leads`, {
      method: 'OPTIONS',
      headers: { Origin: SITE_ORIGIN, 'Access-Control-Request-Method': 'POST' },
    });
    corsOk = r.headers.get('access-control-allow-origin') === SITE_ORIGIN;
  } catch {
    corsOk = false;
  }
  return { health, corsOk };
}

async function main() {
  const args = process.argv.slice(2);
  const workerOnly = args.includes('--worker-only');
  const offline = args.includes('--offline');
  const apiIdx = args.indexOf('--api');
  const partner = JSON.parse(readFileSync(path.join(ROOT, 'partner.config.json'), 'utf8'));
  const wranglerToml = readFileSync(path.join(ROOT, 'cloudflare-worker/leads-api/wrangler.toml'), 'utf8');
  const siteTs = readFileSync(path.join(ROOT, 'src/config/site.ts'), 'utf8');
  const apiBase = apiIdx >= 0 ? args[apiIdx + 1] : partner.leadsApiBaseUrl;

  const results = [checkConfig({ partner, wranglerToml, siteTs }, { workerOnly })];

  if (offline) {
    results.push({ errors: [], warnings: ['Skipped live Worker checks (--offline).'] });
  } else if (!isHttps(apiBase ?? '')) {
    results.push({ errors: ['No Worker URL to check: set "leadsApiBaseUrl" or pass --api https://...'], warnings: [] });
  } else {
    console.log(`Probing ${apiBase} ...`);
    const { health, corsOk, error } = await probe(apiBase);
    if (error) results.push({ errors: [`Could not reach the Worker: ${error}`], warnings: [] });
    else results.push(checkHealth(partner, health, { corsOk, workerOnly }));
  }

  const errors = results.flatMap((r) => r.errors);
  const warnings = results.flatMap((r) => r.warnings);
  console.log(`\nPartner launch check (${workerOnly ? 'Worker setup only' : 'full launch'})\n`);
  for (const w of warnings) console.log(`  WARN  ${w}`);
  for (const e of errors) console.log(`  FAIL  ${e}`);
  if (!errors.length) {
    console.log(
      workerOnly
        ? '\n  OK    Worker setup is ready. On signing day, follow "Launch day" in PARTNER_LAUNCH.md.'
        : `\n  OK    Ready to launch with ${partner.partnerName}. Now: npm run build, commit, push.`
    );
  }
  process.exit(errors.length ? 1 : 0);
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main();
}
