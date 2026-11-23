// @vitest-environment node
import { describe, it, expect } from 'vitest';
// @ts-expect-error plain .mjs script without type declarations
import { checkConfig, checkHealth, tomlString } from '../partner-check.mjs';

const READY_TOML = `
database_id = "0f1e2d3c-aaaa-bbbb-cccc-1234567890ab"
ACCESS_TEAM_DOMAIN = "team.cloudflareaccess.com"
ACCESS_AUD = "abc123"
`;
const UNSET_TOML = `
database_id = "REPLACE_WITH_ID_FROM_wrangler_d1_create"
ACCESS_TEAM_DOMAIN = ""   # e.g. "yourteam.cloudflareaccess.com"
ACCESS_AUD = ""
`;
const SITE_TS_FILLED = "export const SITE_OPERATOR = { legalName: 'Example Holdings LLC', country: 'x' };";

const live = {
  enabled: true,
  partnerName: 'Acme Tax Co',
  bookingUrl: 'https://cal.acme.test/15min',
  leadCtaTaxThresholdThb: 50000,
  leadsApiBaseUrl: 'https://mythaitaxes-leads.acme.workers.dev',
  turnstileSiteKey: '0x4AAA',
};
const placeholder = { ...live, enabled: false, partnerName: '[PARTNER_NAME]', bookingUrl: '[PARTNER_BOOKING_URL]', leadsApiBaseUrl: '', turnstileSiteKey: '' };

const healthy = {
  ok: true,
  partnerEnabled: true,
  partnerName: 'Acme Tax Co',
  configured: { resend: true, appSecret: true, partnerEmails: true, partnerWebhook: false, turnstile: true, adminAccess: true },
};

describe('tomlString', () => {
  it('reads quoted values and ignores trailing comments', () => {
    expect(tomlString(UNSET_TOML, 'ACCESS_AUD')).toBe('');
    expect(tomlString(READY_TOML, 'ACCESS_TEAM_DOMAIN')).toBe('team.cloudflareaccess.com');
    expect(tomlString(READY_TOML, 'MISSING')).toBeNull();
  });
});

describe('checkConfig', () => {
  it('passes a fully configured launch', () => {
    expect(checkConfig({ partner: live, wranglerToml: READY_TOML, siteTs: SITE_TS_FILLED })).toEqual({ errors: [], warnings: [] });
  });

  it('blocks launch while the committed placeholders are in place', () => {
    const r = checkConfig({ partner: placeholder, wranglerToml: UNSET_TOML, siteTs: "legalName: ''," });
    expect(r.errors.join('\n')).toMatch(/database_id/);
    expect(r.errors.join('\n')).toMatch(/"enabled" is false/);
    expect(r.errors.join('\n')).toMatch(/partnerName/);
    expect(r.errors.join('\n')).toMatch(/leadsApiBaseUrl/);
    expect(r.warnings.join('\n')).toMatch(/legalName/);
  });

  it('worker-only mode ignores the partner switch but still needs the database', () => {
    const r = checkConfig({ partner: placeholder, wranglerToml: READY_TOML, siteTs: '' }, { workerOnly: true });
    expect(r.errors).toEqual([]);
    expect(checkConfig({ partner: placeholder, wranglerToml: UNSET_TOML, siteTs: '' }, { workerOnly: true }).errors).toHaveLength(1);
  });

  it('rejects a non-https booking link', () => {
    const r = checkConfig({ partner: { ...live, bookingUrl: 'http://cal.acme.test' }, wranglerToml: READY_TOML, siteTs: SITE_TS_FILLED });
    expect(r.errors.join()).toMatch(/bookingUrl/);
  });
});

describe('checkHealth', () => {
  it('passes when the deployed Worker matches the site', () => {
    expect(checkHealth(live, healthy)).toEqual({ errors: [], warnings: [] });
  });

  it('fails on a partner name mismatch (every lead would fail consent)', () => {
    const r = checkHealth(live, { ...healthy, partnerName: '[PARTNER_NAME]', partnerEnabled: false });
    expect(r.errors.join('\n')).toMatch(/mismatch/);
    expect(r.errors.join('\n')).toMatch(/switched off/);
  });

  it('fails when partner emails are missing or Turnstile is only half set up', () => {
    const r = checkHealth({ ...live, turnstileSiteKey: '' }, { ...healthy, configured: { ...healthy.configured, partnerEmails: false } });
    expect(r.errors.join('\n')).toMatch(/PARTNER_EMAILS/);
    expect(r.errors.join('\n')).toMatch(/TURNSTILE_SECRET_KEY/);
  });

  it('fails when CORS does not allow the site or the Worker is unreachable', () => {
    expect(checkHealth(live, healthy, { corsOk: false }).errors.join()).toMatch(/ALLOWED_ORIGINS/);
    expect(checkHealth(live, null).errors.join()).toMatch(/did not answer/);
  });

  it('worker-only mode does not require a partner yet', () => {
    const preSigning = { ...healthy, partnerEnabled: false, partnerName: '[PARTNER_NAME]', configured: { ...healthy.configured, partnerEmails: false } };
    expect(checkHealth(placeholder, preSigning, { workerOnly: true }).errors).toEqual([]);
  });
});
