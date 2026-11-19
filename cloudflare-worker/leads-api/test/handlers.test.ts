// @vitest-environment node
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  handleLeadSubmission,
  handleSubscribe,
  handleUnsubscribe,
  handleAdminStatus,
  handleAdminCsv,
  handleAdminList,
  PartnerConfig,
  RATE_LIMIT_PER_HOUR,
} from '../src/handlers';
import { escapeHtml, partnerLeadEmail, sanitizeBreakdown } from '../src/emails';
import { buildLeadConsentText, buildMarketingConsentText, LeadSubmission } from '../../../src/shared/leads';
import type { Deps, EmailMessage, Env, LeadRecord, Store, SubscriberRecord } from '../src/types';

class MemoryStore implements Store {
  leads: LeadRecord[] = [];
  subs = new Map<string, SubscriberRecord>();
  rl = new Map<string, number>();
  async findLatestLeadByEmail(e: string) {
    const l = this.leads.filter((x) => x.email_norm === e).sort((a, b) => b.created_at.localeCompare(a.created_at))[0];
    return l ? { id: l.id, created_at: l.created_at } : null;
  }
  async insertLead(l: LeadRecord) { this.leads.push({ ...l }); }
  async setDelivery(id: string, f: 'partner_email_status' | 'webhook_status' | 'user_email_status', v: string) {
    const l = this.leads.find((x) => x.id === id); if (l) l[f] = v;
  }
  async listLeads(f: { fromIso?: string; toIso?: string; status?: string }) {
    return this.leads.filter((l) => (!f.fromIso || l.created_at >= f.fromIso) && (!f.toIso || l.created_at < f.toIso) && (!f.status || l.status === f.status));
  }
  async updateLeadStatus(id: string, status: LeadRecord['status'], reason: string | null, at: string) {
    const l = this.leads.find((x) => x.id === id); if (!l) return false;
    Object.assign(l, { status, status_reason: reason, updated_at: at }); return true;
  }
  async incrementRateLimit(k: string, w: number) { const key = `${k}|${w}`; const n = (this.rl.get(key) ?? 0) + 1; this.rl.set(key, n); return n; }
  async upsertSubscriber(s: SubscriberRecord) { this.subs.set(s.email_norm, { ...s }); }
  async getSubscriber(e: string) { return this.subs.get(e) ?? null; }
  async listSubscribers() { return [...this.subs.values()]; }
  async unsubscribe(e: string, at: string) { const s = this.subs.get(e); if (!s) return false; s.marketing_opt_in = 0; s.unsubscribed_at = at; return true; }
}

const PARTNER: PartnerConfig = {
  enabled: true,
  partnerName: 'Acme Tax Co',
  bookingUrl: 'https://cal.example.com/acme',
  duplicateWindowDays: 90,
  deliverDuplicatesToPartner: false,
};

const ENV: Env = {
  DB: {} as D1Database,
  ALLOWED_ORIGINS: 'https://mythaitaxes.com',
  SITE_URL: 'https://mythaitaxes.com',
  FROM_EMAIL: 'x@mythaitaxes.com',
  APP_SECRET: 'test-secret',
  PARTNER_EMAILS: 'leads@acme.example, bad-address',
  PARTNER_WEBHOOK_URL: 'https://hooks.example.com/lead',
  WEBHOOK_SIGNING_SECRET: 'whsec',
};

let store: MemoryStore;
let emails: EmailMessage[];
let webhooks: { url: string; body: string; sig: string | null }[];
let clock: Date;
let turnstileOk: boolean;
let pending: Promise<unknown>[];
let failEmail: boolean;

const deps = (): Deps => ({
  store,
  now: () => clock,
  randomBytes: (n) => crypto.getRandomValues(new Uint8Array(n)),
  sendEmail: async (m) => { if (failEmail) throw new Error('resend down'); emails.push(m); },
  postWebhook: async (url, body, sig) => { webhooks.push({ url, body, sig }); },
  verifyTurnstile: async () => turnstileOk,
  hmacHex: async (secret, data) => {
    const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
    const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
    return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
  },
  defer: (p) => { pending.push(p); },
});
const flush = () => Promise.all(pending);

const submission = (o: Partial<LeadSubmission> = {}): Partial<LeadSubmission> => ({
  name: 'Sam Lee',
  email: 'Sam@Example.com',
  phone: '+66 81 234 5678',
  nationality: 'US',
  daysInThailand: 220,
  incomeTypes: ['pension', 'capital_gains'],
  remittanceRange: '1m_3m',
  urgency: 'this_season',
  notes: 'Retired <b>in</b> Chiang Mai',
  consent: { given: true, text: buildLeadConsentText('Acme Tax Co'), at: '2026-11-19T09:00:00.000Z' },
  calculator: { source: 'foreign_income', estimatedTaxThb: 123456.7, flags: ['us_citizen', 'capital_gains'] },
  pageUrl: 'https://mythaitaxes.com/foreign-income-tax-calculator/',
  referrer: 'https://www.google.com/',
  utm: { utm_source: 'google', utm_campaign: 'remit', evil: 'x' } as Record<string, string>,
  ...o,
});

beforeEach(() => {
  store = new MemoryStore();
  emails = [];
  webhooks = [];
  pending = [];
  clock = new Date('2026-11-19T10:00:00Z');
  turnstileOk = true;
  failEmail = false;
});

afterEach(async () => {
  await flush();
});

describe('POST /api/leads', () => {
  it('stores a lead with status new, consent record, UTM, flags and returns a tagged booking link', async () => {
    const r = await handleLeadSubmission(submission(), '1.2.3.4', ENV, deps(), PARTNER);
    expect(r.status).toBe(200);
    const body = r.body as { leadId: string; bookingUrl: string; duplicate: boolean };
    expect(body.leadId).toMatch(/^L-261119-/);
    expect(body.duplicate).toBe(false);
    const booking = new URL(body.bookingUrl);
    expect(booking.searchParams.get('lead_id')).toBe(body.leadId);
    expect(booking.searchParams.get('utm_source')).toBe('mythaitaxes');

    const lead = store.leads[0];
    expect(lead.status).toBe('new');
    expect(lead.email_norm).toBe('sam@example.com');
    expect(lead.consent_text).toBe(buildLeadConsentText('Acme Tax Co'));
    expect(lead.consent_recorded_at).toBe('2026-11-19T10:00:00.000Z');
    expect(lead.partner_name).toBe('Acme Tax Co');
    expect(JSON.parse(lead.utm!)).toEqual({ utm_source: 'google', utm_campaign: 'remit' });
    expect(JSON.parse(lead.flags!)).toEqual(['us_citizen', 'capital_gains']);
    expect(lead.estimated_tax_thb).toBe(123457);
    expect(lead.page_url).toContain('/foreign-income-tax-calculator/');
  });

  it('delivers to partner email + webhook (signed) and confirms to the user', async () => {
    await handleLeadSubmission(submission(), '1.2.3.4', ENV, deps(), PARTNER);
    await flush();
    const toPartner = emails.find((e) => e.to.includes('leads@acme.example'))!;
    expect(toPartner.to).toEqual(['leads@acme.example']); // invalid address dropped
    expect(toPartner.html).toContain('Retired &lt;b&gt;in&lt;/b&gt; Chiang Mai'); // escaped
    expect(toPartner.replyTo).toBe('Sam@Example.com');
    const toUser = emails.find((e) => e.to.includes('Sam@Example.com'))!;
    expect(toUser.html).toContain('Acme Tax Co');
    expect(toUser.html).toContain('how-this-site-is-funded');
    expect(webhooks).toHaveLength(1);
    expect(webhooks[0].sig).toMatch(/^[0-9a-f]{64}$/);
    expect(JSON.parse(webhooks[0].body).lead.income_types).toEqual(['pension', 'capital_gains']);
    const lead = store.leads[0];
    expect([lead.partner_email_status, lead.webhook_status, lead.user_email_status]).toEqual(['sent', 'sent', 'sent']);
  });

  it('records delivery failures without failing the submission', async () => {
    failEmail = true;
    const r = await handleLeadSubmission(submission(), '1.2.3.4', ENV, deps(), PARTNER);
    await flush();
    expect(r.status).toBe(200);
    expect(store.leads[0].partner_email_status).toMatch(/^failed: resend down/);
    expect(store.leads[0].webhook_status).toBe('sent');
  });

  it('marks the same email within 90 days as a duplicate and does not deliver it to the partner', async () => {
    await handleLeadSubmission(submission(), '1.2.3.4', ENV, deps(), PARTNER);
    await flush();
    emails = []; webhooks = [];
    clock = new Date('2027-02-16T10:00:00Z'); // 89 days later
    const r = await handleLeadSubmission(submission({ email: ' sam@example.COM ' }), '5.6.7.8', ENV, deps(), PARTNER);
    await flush();
    expect((r.body as { duplicate: boolean }).duplicate).toBe(true);
    const dup = store.leads[1];
    expect(dup.is_duplicate).toBe(1);
    expect(dup.duplicate_of).toBe(store.leads[0].id);
    expect(dup.status).toBe('new');
    expect(webhooks).toHaveLength(0);
    expect(emails.every((e) => !e.to.includes('leads@acme.example'))).toBe(true);
    expect(dup.partner_email_status).toBe('skipped: duplicate');
    expect(emails.some((e) => e.to.includes(' sam@example.COM '.trim()))).toBe(true); // user still confirmed
  });

  it('after 90 days the same email is a fresh lead', async () => {
    await handleLeadSubmission(submission(), '1.2.3.4', ENV, deps(), PARTNER);
    clock = new Date('2027-02-18T10:00:01Z'); // 91 days later
    const r = await handleLeadSubmission(submission(), '1.2.3.4', ENV, deps(), PARTNER);
    expect((r.body as { duplicate: boolean }).duplicate).toBe(false);
  });

  it('rejects when consent is not given', async () => {
    const r = await handleLeadSubmission(submission({ consent: { given: false, text: '', at: '' } }), '1', ENV, deps(), PARTNER);
    expect(r.status).toBe(400);
    expect(store.leads).toHaveLength(0);
  });

  it('rejects when the consent named a different partner than the configured one', async () => {
    const r = await handleLeadSubmission(
      submission({ consent: { given: true, text: buildLeadConsentText('Someone Else'), at: '' } }), '1', ENV, deps(), PARTNER
    );
    expect(r.status).toBe(400);
    expect(store.leads).toHaveLength(0);
  });

  it('honeypot: returns ok but stores and sends nothing', async () => {
    const r = await handleLeadSubmission(submission({ website: 'http://spam' }), '1', ENV, deps(), PARTNER);
    await flush();
    expect(r.status).toBe(200);
    expect(store.leads).toHaveLength(0);
    expect(emails).toHaveLength(0);
  });

  it('rate limits per IP per hour', async () => {
    for (let i = 0; i < RATE_LIMIT_PER_HOUR.lead; i++) {
      expect((await handleLeadSubmission(submission({ email: `u${i}@ex.com` }), '9.9.9.9', ENV, deps(), PARTNER)).status).toBe(200);
    }
    expect((await handleLeadSubmission(submission({ email: 'x@ex.com' }), '9.9.9.9', ENV, deps(), PARTNER)).status).toBe(429);
    expect((await handleLeadSubmission(submission({ email: 'y@ex.com' }), '8.8.8.8', ENV, deps(), PARTNER)).status).toBe(200);
    clock = new Date('2026-11-19T11:00:00Z');
    expect((await handleLeadSubmission(submission({ email: 'z@ex.com' }), '9.9.9.9', ENV, deps(), PARTNER)).status).toBe(200);
  });

  it('verifies Turnstile when a secret is configured', async () => {
    const env = { ...ENV, TURNSTILE_SECRET_KEY: 'ts' };
    expect((await handleLeadSubmission(submission(), '1', env, deps(), PARTNER)).status).toBe(400); // no token
    turnstileOk = false;
    expect((await handleLeadSubmission(submission({ turnstileToken: 't' }), '1', env, deps(), PARTNER)).status).toBe(400);
    turnstileOk = true;
    expect((await handleLeadSubmission(submission({ turnstileToken: 't' }), '1', env, deps(), PARTNER)).status).toBe(200);
  });

  it('returns 503 and stores nothing when the partner is switched off', async () => {
    const r = await handleLeadSubmission(submission(), '1', ENV, deps(), { ...PARTNER, enabled: false });
    expect(r.status).toBe(503);
    expect(store.leads).toHaveLength(0);
  });

  it('skips webhook cleanly when not configured', async () => {
    await handleLeadSubmission(submission(), '1', { ...ENV, PARTNER_WEBHOOK_URL: undefined }, deps(), PARTNER);
    await flush();
    expect(store.leads[0].webhook_status).toBe('skipped: not configured');
  });
});

describe('admin', () => {
  beforeEach(async () => {
    await handleLeadSubmission(submission(), '1', ENV, deps(), PARTNER);
    clock = new Date('2026-12-02T10:00:00Z');
    await handleLeadSubmission(submission({ email: 'other@ex.com', notes: '=cmd|calc' }), '2', ENV, deps(), PARTNER);
  });

  it('filters by month', async () => {
    const r = await handleAdminList(new URLSearchParams('month=2026-11'), deps());
    expect((r.body as { leads: LeadRecord[] }).leads).toHaveLength(1);
    expect((await handleAdminList(new URLSearchParams('month=bad'), deps())).status).toBe(400);
  });

  it('updates status; rejected requires a reason', async () => {
    const id = store.leads[0].id;
    expect((await handleAdminStatus(id, { status: 'booked' }, deps())).status).toBe(200);
    expect(store.leads[0].status).toBe('booked');
    expect((await handleAdminStatus(id, { status: 'rejected' }, deps())).status).toBe(400);
    expect((await handleAdminStatus(id, { status: 'rejected', reason: 'Not resident' }, deps())).status).toBe(200);
    expect(store.leads[0].status_reason).toBe('Not resident');
    expect((await handleAdminStatus(id, { status: 'paid' }, deps())).status).toBe(400);
    expect((await handleAdminStatus('nope', { status: 'new' }, deps())).status).toBe(404);
  });

  it('exports a monthly CSV with formula injection neutralised', async () => {
    const r = await handleAdminCsv(new URLSearchParams('month=2026-12'), deps());
    expect(r.status).toBe(200);
    const lines = r.csv!.trim().split('\r\n');
    expect(lines[0].startsWith('id,created_at,status')).toBe(true);
    expect(lines).toHaveLength(2);
    expect(r.csv).toContain("'=cmd|calc");
  });
});

describe('subscribe / unsubscribe', () => {
  const breakdown = {
    calculator: 'foreign_income',
    taxYear: 2026,
    estimatedTaxThb: 90_000,
    taxableIncomeThb: 700_000,
    brackets: [{ label: '150k-300k', rate: 0.05, taxableAmount: 150_000, tax: 7500 }],
    flags: ['US citizen <script>'],
    assumptions: ['No FTC'],
  };

  it('sends the breakdown without opting in to marketing', async () => {
    const r = await handleSubscribe({ email: 'a@b.co', breakdown }, '1', ENV, deps(), 'https://w.example');
    await flush();
    expect(r.status).toBe(200);
    expect(store.subs.get('a@b.co')!.marketing_opt_in).toBe(0);
    expect(emails[0].html).toContain('US citizen &lt;script&gt;');
    expect(emails[0].html).not.toContain('Unsubscribe');
  });

  it('records separate marketing consent with text and time, and includes a signed unsubscribe link', async () => {
    await handleSubscribe(
      { email: 'a@b.co', breakdown, marketingOptIn: true, marketingConsentText: buildMarketingConsentText() }, '1', ENV, deps(), 'https://w.example'
    );
    await flush();
    const s = store.subs.get('a@b.co')!;
    expect(s.marketing_opt_in).toBe(1);
    expect(s.marketing_consent_text).toBe(buildMarketingConsentText());
    expect(s.marketing_consent_at).toBe(clock.toISOString());
    const link = /href="(https:\/\/w\.example\/unsubscribe\?[^"]+)"/.exec(emails[0].html)![1].replace(/&amp;/g, '&');
    const u = new URL(link);
    expect((await handleUnsubscribe(u.searchParams.get('e')!, u.searchParams.get('t')!, ENV, deps())).status).toBe(200);
    expect(store.subs.get('a@b.co')!.marketing_opt_in).toBe(0);
    expect((await handleUnsubscribe('a@b.co', 'forged', ENV, deps())).status).toBe(400);
  });

  it('rejects a marketing opt-in whose consent text does not match', async () => {
    const r = await handleSubscribe({ email: 'a@b.co', marketingOptIn: true, marketingConsentText: 'spam me' }, '1', ENV, deps(), 'x');
    expect(r.status).toBe(400);
  });

  it('validates email and requires something to do', async () => {
    expect((await handleSubscribe({ email: 'nope', breakdown }, '1', ENV, deps(), 'x')).status).toBe(400);
    expect((await handleSubscribe({ email: 'a@b.co' }, '1', ENV, deps(), 'x')).status).toBe(400);
  });
});

describe('email helpers', () => {
  it('escapeHtml escapes all specials', () => {
    expect(escapeHtml(`<a href="x">'&'</a>`)).toBe('&lt;a href=&quot;x&quot;&gt;&#39;&amp;&#39;&lt;/a&gt;');
  });

  it('sanitizeBreakdown drops junk and bounds values', () => {
    expect(sanitizeBreakdown({ estimatedTaxThb: -1, taxableIncomeThb: 1, taxYear: 2026 })).toBeNull();
    const b = sanitizeBreakdown({ estimatedTaxThb: 1, taxableIncomeThb: 1, taxYear: 2026, brackets: [{ label: 'x', rate: 7, taxableAmount: 1, tax: 1 }], flags: [1, 'ok'] })!;
    expect(b.brackets).toEqual([]);
    expect(b.flags).toEqual(['ok']);
  });

  it('partnerLeadEmail renders without calculator data', () => {
    const lead: LeadRecord = {
      id: 'L-1', created_at: '', updated_at: '', status: 'new', status_reason: null, is_duplicate: 1, duplicate_of: 'L-0',
      name: 'A', email: 'a@b.co', email_norm: 'a@b.co', phone: null, nationality: 'GB', days_in_thailand: null,
      income_types: '[]', remittance_range: 'none', urgency: 'planning', notes: null, calculator_source: null, calculator: null,
      flags: null, estimated_tax_thb: null, consent_text: 'c', consent_at: '', consent_recorded_at: '', partner_name: 'P',
      page_url: null, referrer: null, utm: null, partner_email_status: null, webhook_status: null, user_email_status: null,
    };
    const m = partnerLeadEmail(lead, ['p@x.co']);
    expect(m.subject).toBe('New Thai tax lead L-1');
    expect(m.html).toContain('repeat enquiry');
  });
});
