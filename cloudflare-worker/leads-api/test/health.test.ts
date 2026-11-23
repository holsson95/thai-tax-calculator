// @vitest-environment node
import { describe, it, expect } from 'vitest';
import { healthStatus, PartnerConfig } from '../src/handlers';
import type { Env } from '../src/types';

const partner: PartnerConfig = {
  enabled: true,
  partnerName: 'Acme Tax Co',
  bookingUrl: 'https://cal.example.com/acme',
  duplicateWindowDays: 90,
  deliverDuplicatesToPartner: false,
};

const env = (o: Partial<Env> = {}): Env =>
  ({ DB: {} as D1Database, ALLOWED_ORIGINS: '', SITE_URL: '', FROM_EMAIL: '', ...o }) as Env;

describe('healthStatus (GET /api/health)', () => {
  it('reports the deployed partner and which secrets are set, as booleans only', () => {
    const body = healthStatus(
      env({ RESEND_API_KEY: 're_secret', APP_SECRET: 'x'.repeat(40), PARTNER_EMAILS: 'leads@acme.test', ACCESS_AUD: 'aud', ACCESS_TEAM_DOMAIN: 't.cloudflareaccess.com' }),
      partner
    );
    expect(body).toEqual({
      ok: true,
      partnerEnabled: true,
      partnerName: 'Acme Tax Co',
      configured: {
        resend: true,
        appSecret: true,
        partnerEmails: true,
        partnerWebhook: false,
        turnstile: false,
        adminAccess: true,
      },
    });
    expect(JSON.stringify(body)).not.toContain('leads@acme.test');
    expect(JSON.stringify(body)).not.toContain('re_secret');
  });

  it('treats empty or whitespace secrets as not configured', () => {
    const body = healthStatus(env({ PARTNER_EMAILS: '  ', APP_SECRET: '' }), { ...partner, enabled: false });
    expect(body.partnerEnabled).toBe(false);
    expect(body.configured.partnerEmails).toBe(false);
    expect(body.configured.appSecret).toBe(false);
    expect(body.configured.adminAccess).toBe(false);
  });
});
