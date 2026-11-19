/**
 * Lead and subscriber logic shared by the website and the leads Worker
 * (cloudflare-worker/leads-api imports this file). Pure TypeScript: no DOM,
 * no Workers APIs, so it is unit-tested once in src/shared/__tests__.
 */

export const LEAD_STATUSES = ['new', 'contacted', 'booked', 'client', 'rejected'] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

export const URGENCY_OPTIONS = [
  { value: 'this_season', label: 'This filing season' },
  { value: 'planning', label: 'Planning ahead' },
] as const;
export type Urgency = (typeof URGENCY_OPTIONS)[number]['value'];

export const LEAD_INCOME_TYPES = [
  { value: 'employment', label: 'Employment / freelance' },
  { value: 'pension', label: 'Pension' },
  { value: 'dividends_interest', label: 'Dividends / interest' },
  { value: 'capital_gains', label: 'Capital gains' },
  { value: 'rental', label: 'Rental' },
  { value: 'thai_employment', label: 'Thai employment' },
  { value: 'thai_business', label: 'Thai freelance / business' },
  { value: 'other', label: 'Other' },
] as const;
export type LeadIncomeType = (typeof LEAD_INCOME_TYPES)[number]['value'];

/** Approximate yearly remittance ranges (THB). `max` is inclusive; null = no upper bound. */
export const REMITTANCE_RANGES = [
  { value: 'none', label: 'None', min: 0, max: 0 },
  { value: 'under_500k', label: 'Under ฿500,000', min: 1, max: 499_999 },
  { value: '500k_1m', label: '฿500,000 – ฿1M', min: 500_000, max: 1_000_000 },
  { value: '1m_3m', label: '฿1M – ฿3M', min: 1_000_001, max: 3_000_000 },
  { value: '3m_10m', label: '฿3M – ฿10M', min: 3_000_001, max: 10_000_000 },
  { value: 'over_10m', label: 'Over ฿10M', min: 10_000_001, max: null },
] as const;
export type RemittanceRange = (typeof REMITTANCE_RANGES)[number]['value'];

export const LEAD_SOURCES = ['foreign_income', 'annual', 'monthly', 'quick', 'other'] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export function remittanceRangeFor(totalThb: number): RemittanceRange {
  const t = Number.isFinite(totalThb) && totalThb > 0 ? Math.round(totalThb) : 0;
  const hit = REMITTANCE_RANGES.find((r) => t >= r.min && (r.max === null || t <= r.max));
  return hit ? hit.value : 'none';
}

/** The exact consent sentence shown next to the checkbox and stored with the lead. */
export function buildLeadConsentText(partnerName: string): string {
  return `I agree to share my details with ${partnerName} so they can contact me about my Thai taxes.`;
}

export function buildMarketingConsentText(): string {
  return 'Send me occasional Thai tax updates from My Thai Taxes. I can unsubscribe at any time.';
}

export interface CalculatorSnapshot {
  source: LeadSource;
  estimatedTaxThb?: number;
  totalRemittedThb?: number;
  foreignAssessableThb?: number;
  taxableIncomeThb?: number;
  isResident?: boolean;
  flags?: string[];
}

export interface LeadSubmission {
  name: string;
  email: string;
  phone?: string;
  nationality: string;
  daysInThailand?: number | null;
  incomeTypes: LeadIncomeType[];
  remittanceRange: RemittanceRange;
  urgency: Urgency;
  notes?: string;
  consent: { given: boolean; text: string; at: string };
  calculator?: CalculatorSnapshot;
  pageUrl?: string;
  referrer?: string;
  utm?: Record<string, string>;
  turnstileToken?: string;
  /** Honeypot: real users never fill this. */
  website?: string;
}

export interface ValidationResult {
  ok: boolean;
  errors: Partial<Record<string, string>>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const MAX_NOTES = 2000;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  const e = email.trim();
  return e.length <= 254 && EMAIL_RE.test(e);
}

const inList = <T extends string>(v: unknown, list: readonly { value: T }[]): v is T =>
  typeof v === 'string' && list.some((o) => o.value === v);

/**
 * Validate a lead. `expectedConsentText` is the consent sentence for the
 * partner configured on the server; a mismatch means the visitor agreed to
 * share with someone other than who would receive the lead, so it is rejected.
 */
export function validateLeadSubmission(s: Partial<LeadSubmission>, expectedConsentText?: string): ValidationResult {
  const errors: ValidationResult['errors'] = {};
  if (!s.name || s.name.trim().length < 2 || s.name.length > 120) errors.name = 'Please enter your name.';
  if (!s.email || !isValidEmail(s.email)) errors.email = 'Please enter a valid email address.';
  if (s.phone && (s.phone.length > 40 || !/^[+\d\s().-]{6,}$/.test(s.phone))) errors.phone = 'Please enter a valid phone or WhatsApp number.';
  if (!s.nationality || s.nationality.length > 60) errors.nationality = 'Please choose your nationality.';
  if (s.daysInThailand !== undefined && s.daysInThailand !== null) {
    if (!Number.isInteger(s.daysInThailand) || s.daysInThailand < 0 || s.daysInThailand > 366)
      errors.daysInThailand = 'Days must be between 0 and 366.';
  }
  if (!Array.isArray(s.incomeTypes) || s.incomeTypes.some((t) => !inList(t, LEAD_INCOME_TYPES)))
    errors.incomeTypes = 'Please choose valid income types.';
  if (!inList(s.remittanceRange, REMITTANCE_RANGES)) errors.remittanceRange = 'Please choose a range.';
  if (!inList(s.urgency, URGENCY_OPTIONS)) errors.urgency = 'Please choose when you need help.';
  if (s.notes && s.notes.length > MAX_NOTES) errors.notes = `Please keep notes under ${MAX_NOTES} characters.`;
  if (!s.consent || s.consent.given !== true) errors.consent = 'Please tick the box to agree before sending.';
  else if (expectedConsentText !== undefined && s.consent.text !== expectedConsentText)
    errors.consent = 'The consent text does not match the current partner. Please reload the page.';
  return { ok: Object.keys(errors).length === 0, errors };
}

/** Lead ID like "L-261119-7K3QX9MD". `random` must return n cryptographically random bytes. */
export function generateLeadId(now: Date, random: (n: number) => Uint8Array): string {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // no I, O, 0, 1
  const bytes = random(8);
  let suffix = '';
  for (const b of bytes) suffix += alphabet[b % alphabet.length];
  const yy = String(now.getUTCFullYear()).slice(2);
  const mm = String(now.getUTCMonth() + 1).padStart(2, '0');
  const dd = String(now.getUTCDate()).padStart(2, '0');
  return `L-${yy}${mm}${dd}-${suffix}`;
}

/** True when a previous lead with the same email is within the duplicate window. */
export function isWithinDuplicateWindow(previousIso: string, now: Date, windowDays: number): boolean {
  const prev = Date.parse(previousIso);
  if (!Number.isFinite(prev)) return false;
  return now.getTime() - prev <= windowDays * 24 * 60 * 60 * 1000;
}

/** Month filter "YYYY-MM" → [startIso, endIso) in UTC. */
export function monthRange(month: string): [string, string] | null {
  const m = /^(\d{4})-(\d{2})$/.exec(month);
  if (!m) return null;
  const y = Number(m[1]);
  const mo = Number(m[2]);
  if (mo < 1 || mo > 12) return null;
  const start = new Date(Date.UTC(y, mo - 1, 1));
  const end = new Date(Date.UTC(y, mo, 1));
  return [start.toISOString(), end.toISOString()];
}

/**
 * Escape a CSV cell. Also neutralises spreadsheet formula injection: cells
 * starting with = + - @ (or tab/CR) get a leading apostrophe.
 */
export function csvCell(value: unknown): string {
  if (value === null || value === undefined) return '';
  let s = typeof value === 'string' ? value : typeof value === 'object' ? JSON.stringify(value) : String(value);
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(columns: string[], rows: Record<string, unknown>[]): string {
  const lines = [columns.map(csvCell).join(',')];
  for (const row of rows) lines.push(columns.map((c) => csvCell(row[c])).join(','));
  return lines.join('\r\n') + '\r\n';
}

/** Append UTM parameters and the lead id to the partner booking link. */
export function buildBookingUrl(base: string, leadId: string, campaign = 'lead'): string | null {
  try {
    const url = new URL(base);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    url.searchParams.set('utm_source', 'mythaitaxes');
    url.searchParams.set('utm_medium', 'referral');
    url.searchParams.set('utm_campaign', campaign);
    url.searchParams.set('lead_id', leadId);
    return url.toString();
  } catch {
    return null;
  }
}
