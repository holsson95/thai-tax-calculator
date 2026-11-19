import partnerConfig from '../../../partner.config.json';
import {
  buildBookingUrl,
  buildLeadConsentText,
  buildMarketingConsentText,
  generateLeadId,
  isValidEmail,
  isWithinDuplicateWindow,
  LEAD_STATUSES,
  LeadStatus,
  LeadSubmission,
  monthRange,
  normalizeEmail,
  toCsv,
  validateLeadSubmission,
} from '../../../src/shared/leads';
import { breakdownEmail, partnerLeadEmail, sanitizeBreakdown, userConfirmationEmail } from './emails';
import type { Deps, Env, LeadRecord } from './types';

export interface PartnerConfig {
  enabled: boolean;
  partnerName: string;
  bookingUrl: string;
  duplicateWindowDays: number;
  deliverDuplicatesToPartner: boolean;
}

export const PARTNER: PartnerConfig = partnerConfig;

export interface HandlerResult {
  status: number;
  body: unknown;
}

const json = (status: number, body: unknown): HandlerResult => ({ status, body });

export const RATE_LIMIT_PER_HOUR = { lead: 5, subscribe: 10 };

async function rateLimited(deps: Deps, env: Env, ip: string, bucket: keyof typeof RATE_LIMIT_PER_HOUR): Promise<boolean> {
  const salt = env.APP_SECRET ?? 'unset';
  const key = `${bucket}:${await deps.hmacHex(salt, ip || 'unknown')}`;
  const windowStart = Math.floor(deps.now().getTime() / 3_600_000) * 3600;
  const count = await deps.store.incrementRateLimit(key, windowStart);
  return count > RATE_LIMIT_PER_HOUR[bucket];
}

const clip = (v: unknown, max: number): string | null => (typeof v === 'string' && v.trim() ? v.trim().slice(0, max) : null);

function cleanUtm(utm: unknown): Record<string, string> | null {
  if (!utm || typeof utm !== 'object') return null;
  const out: Record<string, string> = {};
  for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid']) {
    const v = clip((utm as Record<string, unknown>)[k], 200);
    if (v) out[k] = v;
  }
  return Object.keys(out).length ? out : null;
}

export async function handleLeadSubmission(
  body: unknown,
  ip: string,
  env: Env,
  deps: Deps,
  partner: PartnerConfig = PARTNER
): Promise<HandlerResult> {
  if (!body || typeof body !== 'object') return json(400, { ok: false, error: 'invalid_json' });
  const s = body as Partial<LeadSubmission>;

  // Honeypot: pretend success, store nothing.
  if (typeof s.website === 'string' && s.website.trim() !== '') return json(200, { ok: true });

  if (await rateLimited(deps, env, ip, 'lead')) return json(429, { ok: false, error: 'rate_limited' });

  if (env.TURNSTILE_SECRET_KEY) {
    if (!s.turnstileToken || !(await deps.verifyTurnstile(s.turnstileToken, ip)))
      return json(400, { ok: false, error: 'turnstile_failed' });
  }

  if (!partner.enabled) return json(503, { ok: false, error: 'partner_disabled' });

  const expectedConsent = buildLeadConsentText(partner.partnerName);
  const v = validateLeadSubmission(s, expectedConsent);
  if (!v.ok) return json(400, { ok: false, error: 'validation', fields: v.errors });

  const now = deps.now();
  const nowIso = now.toISOString();
  const emailNorm = normalizeEmail(s.email!);
  const prev = await deps.store.findLatestLeadByEmail(emailNorm);
  const isDuplicate = !!prev && isWithinDuplicateWindow(prev.created_at, now, partner.duplicateWindowDays);

  const calc = s.calculator && typeof s.calculator === 'object' ? s.calculator : null;
  const flags = Array.isArray(calc?.flags) ? calc!.flags.filter((f) => typeof f === 'string').slice(0, 20) : [];
  const estimatedTax =
    typeof calc?.estimatedTaxThb === 'number' && Number.isFinite(calc.estimatedTaxThb) ? Math.round(calc.estimatedTaxThb) : null;

  const lead: LeadRecord = {
    id: generateLeadId(now, deps.randomBytes),
    created_at: nowIso,
    updated_at: nowIso,
    status: 'new',
    status_reason: null,
    is_duplicate: isDuplicate ? 1 : 0,
    duplicate_of: isDuplicate ? prev!.id : null,
    name: s.name!.trim().slice(0, 120),
    email: s.email!.trim(),
    email_norm: emailNorm,
    phone: clip(s.phone, 40),
    nationality: s.nationality!.slice(0, 60),
    days_in_thailand: typeof s.daysInThailand === 'number' ? s.daysInThailand : null,
    income_types: JSON.stringify(s.incomeTypes ?? []),
    remittance_range: s.remittanceRange!,
    urgency: s.urgency!,
    notes: clip(s.notes, 2000),
    calculator_source: clip(calc?.source, 40),
    calculator: calc ? JSON.stringify(calc).slice(0, 4000) : null,
    flags: JSON.stringify(flags),
    estimated_tax_thb: estimatedTax,
    consent_text: s.consent!.text,
    consent_at: clip(s.consent!.at, 40) ?? nowIso,
    consent_recorded_at: nowIso,
    partner_name: partner.partnerName,
    page_url: clip(s.pageUrl, 500),
    referrer: clip(s.referrer, 500),
    utm: (() => {
      const u = cleanUtm(s.utm);
      return u ? JSON.stringify(u) : null;
    })(),
    partner_email_status: null,
    webhook_status: null,
    user_email_status: null,
  };

  await deps.store.insertLead(lead);

  const bookingUrl = buildBookingUrl(partner.bookingUrl, lead.id);
  deps.defer(deliverLead(lead, bookingUrl, env, deps, partner));

  return json(200, { ok: true, leadId: lead.id, bookingUrl, duplicate: isDuplicate });
}

const errText = (e: unknown) => `failed: ${e instanceof Error ? e.message : String(e)}`.slice(0, 300);

export async function deliverLead(lead: LeadRecord, bookingUrl: string | null, env: Env, deps: Deps, partner: PartnerConfig): Promise<void> {
  const toPartner = !lead.is_duplicate || partner.deliverDuplicatesToPartner;
  const partnerEmails = (env.PARTNER_EMAILS ?? '').split(',').map((e) => e.trim()).filter(isValidEmail);

  const tasks: Promise<void>[] = [];

  tasks.push(
    (async () => {
      if (!toPartner) return deps.store.setDelivery(lead.id, 'partner_email_status', 'skipped: duplicate');
      if (!partnerEmails.length) return deps.store.setDelivery(lead.id, 'partner_email_status', 'skipped: no PARTNER_EMAILS');
      try {
        await deps.sendEmail(partnerLeadEmail(lead, partnerEmails));
        await deps.store.setDelivery(lead.id, 'partner_email_status', 'sent');
      } catch (e) {
        await deps.store.setDelivery(lead.id, 'partner_email_status', errText(e));
      }
    })()
  );

  tasks.push(
    (async () => {
      if (!toPartner) return deps.store.setDelivery(lead.id, 'webhook_status', 'skipped: duplicate');
      if (!env.PARTNER_WEBHOOK_URL) return deps.store.setDelivery(lead.id, 'webhook_status', 'skipped: not configured');
      try {
        const payload = JSON.stringify({
          event: 'lead.created',
          lead: {
            ...lead,
            income_types: JSON.parse(lead.income_types),
            flags: lead.flags ? JSON.parse(lead.flags) : [],
            calculator: lead.calculator ? JSON.parse(lead.calculator) : null,
            utm: lead.utm ? JSON.parse(lead.utm) : null,
          },
        });
        const sig = env.WEBHOOK_SIGNING_SECRET ? await deps.hmacHex(env.WEBHOOK_SIGNING_SECRET, payload) : null;
        await deps.postWebhook(env.PARTNER_WEBHOOK_URL, payload, sig);
        await deps.store.setDelivery(lead.id, 'webhook_status', 'sent');
      } catch (e) {
        await deps.store.setDelivery(lead.id, 'webhook_status', errText(e));
      }
    })()
  );

  tasks.push(
    (async () => {
      try {
        await deps.sendEmail(userConfirmationEmail(lead, bookingUrl, env.SITE_URL, env.REPLY_TO_EMAIL));
        await deps.store.setDelivery(lead.id, 'user_email_status', 'sent');
      } catch (e) {
        await deps.store.setDelivery(lead.id, 'user_email_status', errText(e));
      }
    })()
  );

  await Promise.all(tasks);
}

// ---------------------------------------------------------------- subscribers

export async function unsubscribeToken(env: Env, deps: Deps, emailNorm: string): Promise<string | null> {
  return env.APP_SECRET ? deps.hmacHex(env.APP_SECRET, `unsub:${emailNorm}`) : null;
}

export async function handleSubscribe(
  body: unknown,
  ip: string,
  env: Env,
  deps: Deps,
  workerOrigin: string
): Promise<HandlerResult> {
  if (!body || typeof body !== 'object') return json(400, { ok: false, error: 'invalid_json' });
  const b = body as Record<string, unknown>;
  if (typeof b.website === 'string' && b.website.trim() !== '') return json(200, { ok: true });
  if (await rateLimited(deps, env, ip, 'subscribe')) return json(429, { ok: false, error: 'rate_limited' });
  if (env.TURNSTILE_SECRET_KEY) {
    if (typeof b.turnstileToken !== 'string' || !(await deps.verifyTurnstile(b.turnstileToken, ip)))
      return json(400, { ok: false, error: 'turnstile_failed' });
  }

  const email = typeof b.email === 'string' ? b.email.trim() : '';
  if (!isValidEmail(email)) return json(400, { ok: false, error: 'validation', fields: { email: 'Please enter a valid email address.' } });
  const marketing = b.marketingOptIn === true;
  if (marketing && b.marketingConsentText !== buildMarketingConsentText())
    return json(400, { ok: false, error: 'validation', fields: { marketing: 'Consent text mismatch. Please reload.' } });
  const breakdown = b.breakdown === undefined ? null : sanitizeBreakdown(b.breakdown);
  if (b.breakdown !== undefined && !breakdown) return json(400, { ok: false, error: 'invalid_breakdown' });
  if (!breakdown && !marketing) return json(400, { ok: false, error: 'nothing_to_do' });

  const now = deps.now().toISOString();
  const emailNorm = normalizeEmail(email);
  const existing = await deps.store.getSubscriber(emailNorm);
  // Opt-in only ever upgrades here; withdrawing is done via the unsubscribe link.
  const optedIn = marketing || (existing?.marketing_opt_in === 1 && !existing.unsubscribed_at);
  await deps.store.upsertSubscriber({
    email_norm: emailNorm,
    email,
    created_at: existing?.created_at ?? now,
    updated_at: now,
    marketing_opt_in: optedIn ? 1 : 0,
    marketing_consent_text: marketing ? buildMarketingConsentText() : existing?.marketing_consent_text ?? null,
    marketing_consent_at: marketing ? now : existing?.marketing_consent_at ?? null,
    source: clip(b.source, 40) ?? existing?.source ?? null,
    breakdowns_sent: (existing?.breakdowns_sent ?? 0) + (breakdown ? 1 : 0),
    unsubscribed_at: marketing ? null : existing?.unsubscribed_at ?? null,
  });

  if (breakdown) {
    const token = await unsubscribeToken(env, deps, emailNorm);
    const unsubUrl = optedIn && token
      ? `${workerOrigin}/unsubscribe?e=${encodeURIComponent(emailNorm)}&t=${token}`
      : null;
    deps.defer(
      deps.sendEmail(breakdownEmail(email, breakdown, env.SITE_URL, unsubUrl)).catch(() => {
        /* failure is visible in Resend logs; the user can retry */
      })
    );
  }
  return json(200, { ok: true });
}

export async function handleUnsubscribe(emailNorm: string, token: string, env: Env, deps: Deps): Promise<HandlerResult> {
  const expected = await unsubscribeToken(env, deps, normalizeEmail(emailNorm));
  if (!expected || !timingSafeEqual(expected, token)) return json(400, { ok: false, error: 'invalid_token' });
  await deps.store.unsubscribe(normalizeEmail(emailNorm), deps.now().toISOString());
  return json(200, { ok: true });
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

// ---------------------------------------------------------------- retention

/** Months a lead / breakdown-only subscriber is kept after its last update (stated in the Privacy Policy). */
export const RETENTION_MONTHS = 24;

export function retentionCutoff(now: Date, months = RETENTION_MONTHS): string {
  const d = new Date(now.getTime());
  d.setUTCMonth(d.getUTCMonth() - months);
  return d.toISOString();
}

export async function runRetention(deps: Deps): Promise<{ leads: number; subscribers: number }> {
  return deps.store.purgeOlderThan(retentionCutoff(deps.now()));
}

// ---------------------------------------------------------------- admin

export const LEAD_CSV_COLUMNS = [
  'id', 'created_at', 'status', 'status_reason', 'is_duplicate', 'duplicate_of', 'name', 'email', 'phone', 'nationality',
  'days_in_thailand', 'income_types', 'remittance_range', 'urgency', 'estimated_tax_thb', 'flags', 'calculator_source',
  'notes', 'partner_name', 'consent_text', 'consent_recorded_at', 'page_url', 'referrer', 'utm',
  'partner_email_status', 'webhook_status', 'user_email_status', 'updated_at',
];

export const SUBSCRIBER_CSV_COLUMNS = [
  'email', 'created_at', 'updated_at', 'marketing_opt_in', 'marketing_consent_text', 'marketing_consent_at', 'source',
  'breakdowns_sent', 'unsubscribed_at',
];

function parseFilter(params: URLSearchParams): { fromIso?: string; toIso?: string; status?: LeadStatus } | null {
  const filter: { fromIso?: string; toIso?: string; status?: LeadStatus } = {};
  const month = params.get('month');
  if (month) {
    const r = monthRange(month);
    if (!r) return null;
    [filter.fromIso, filter.toIso] = r;
  }
  const status = params.get('status');
  if (status) {
    if (!(LEAD_STATUSES as readonly string[]).includes(status)) return null;
    filter.status = status as LeadStatus;
  }
  return filter;
}

export async function handleAdminList(params: URLSearchParams, deps: Deps): Promise<HandlerResult> {
  const filter = parseFilter(params);
  if (!filter) return json(400, { ok: false, error: 'bad_filter' });
  return json(200, { ok: true, leads: await deps.store.listLeads(filter) });
}

export async function handleAdminCsv(params: URLSearchParams, deps: Deps): Promise<{ status: number; csv?: string }> {
  const filter = parseFilter(params);
  if (!filter) return { status: 400 };
  return { status: 200, csv: toCsv(LEAD_CSV_COLUMNS, (await deps.store.listLeads(filter)) as unknown as Record<string, unknown>[]) };
}

export async function handleAdminSubscribersCsv(deps: Deps): Promise<string> {
  return toCsv(SUBSCRIBER_CSV_COLUMNS, (await deps.store.listSubscribers()) as unknown as Record<string, unknown>[]);
}

export async function handleAdminStatus(id: string, body: unknown, deps: Deps): Promise<HandlerResult> {
  const b = (body ?? {}) as Record<string, unknown>;
  const status = b.status;
  if (typeof status !== 'string' || !(LEAD_STATUSES as readonly string[]).includes(status))
    return json(400, { ok: false, error: 'bad_status' });
  const reason = clip(b.reason, 300);
  if (status === 'rejected' && !reason) return json(400, { ok: false, error: 'reason_required' });
  const ok = await deps.store.updateLeadStatus(id, status as LeadStatus, status === 'rejected' ? reason : null, deps.now().toISOString());
  return ok ? json(200, { ok: true }) : json(404, { ok: false, error: 'not_found' });
}
