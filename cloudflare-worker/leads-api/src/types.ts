import type { LeadStatus } from '../../../src/shared/leads';

export interface Env {
  DB: D1Database;
  ALLOWED_ORIGINS: string;
  SITE_URL: string;
  FROM_EMAIL: string;
  REPLY_TO_EMAIL?: string;
  ACCESS_TEAM_DOMAIN?: string;
  ACCESS_AUD?: string;
  RESEND_API_KEY?: string;
  APP_SECRET?: string;
  PARTNER_EMAILS?: string;
  PARTNER_WEBHOOK_URL?: string;
  WEBHOOK_SIGNING_SECRET?: string;
  TURNSTILE_SECRET_KEY?: string;
}

export interface LeadRecord {
  id: string;
  created_at: string;
  updated_at: string;
  status: LeadStatus;
  status_reason: string | null;
  is_duplicate: number;
  duplicate_of: string | null;
  name: string;
  email: string;
  email_norm: string;
  phone: string | null;
  nationality: string;
  days_in_thailand: number | null;
  income_types: string;
  remittance_range: string;
  urgency: string;
  notes: string | null;
  calculator_source: string | null;
  calculator: string | null;
  flags: string | null;
  estimated_tax_thb: number | null;
  consent_text: string;
  consent_at: string;
  consent_recorded_at: string;
  partner_name: string;
  page_url: string | null;
  referrer: string | null;
  utm: string | null;
  partner_email_status: string | null;
  webhook_status: string | null;
  user_email_status: string | null;
}

export interface SubscriberRecord {
  email_norm: string;
  email: string;
  created_at: string;
  updated_at: string;
  marketing_opt_in: number;
  marketing_consent_text: string | null;
  marketing_consent_at: string | null;
  source: string | null;
  breakdowns_sent: number;
  unsubscribed_at: string | null;
}

export type DeliveryField = 'partner_email_status' | 'webhook_status' | 'user_email_status';

export interface LeadFilter {
  fromIso?: string;
  toIso?: string;
  status?: LeadStatus;
}

/** Storage boundary — D1 in production, in-memory in tests. */
export interface Store {
  findLatestLeadByEmail(emailNorm: string): Promise<{ id: string; created_at: string } | null>;
  insertLead(lead: LeadRecord): Promise<void>;
  setDelivery(id: string, field: DeliveryField, value: string): Promise<void>;
  listLeads(filter: LeadFilter): Promise<LeadRecord[]>;
  updateLeadStatus(id: string, status: LeadStatus, reason: string | null, updatedAt: string): Promise<boolean>;
  /** Increments the counter for (key, window) and returns the new count. */
  incrementRateLimit(key: string, windowStart: number): Promise<number>;
  upsertSubscriber(sub: SubscriberRecord): Promise<void>;
  getSubscriber(emailNorm: string): Promise<SubscriberRecord | null>;
  listSubscribers(): Promise<SubscriberRecord[]>;
  unsubscribe(emailNorm: string, at: string): Promise<boolean>;
  /** Retention: delete leads not updated since `beforeIso`, and breakdown-only subscribers not updated since then. */
  purgeOlderThan(beforeIso: string): Promise<{ leads: number; subscribers: number }>;
}

export interface EmailMessage {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export interface Deps {
  store: Store;
  now: () => Date;
  randomBytes: (n: number) => Uint8Array;
  sendEmail: (msg: EmailMessage) => Promise<void>;
  postWebhook: (url: string, body: string, signature: string | null) => Promise<void>;
  verifyTurnstile: (token: string, ip: string) => Promise<boolean>;
  hmacHex: (secret: string, data: string) => Promise<string>;
  /** Run work after the response (ctx.waitUntil in production, awaited in tests). */
  defer: (p: Promise<unknown>) => void;
}
