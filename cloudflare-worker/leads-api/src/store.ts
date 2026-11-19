import type { LeadStatus } from '../../../src/shared/leads';
import type { DeliveryField, LeadFilter, LeadRecord, Store, SubscriberRecord } from './types';

const LEAD_COLUMNS = [
  'id', 'created_at', 'updated_at', 'status', 'status_reason', 'is_duplicate', 'duplicate_of', 'name', 'email',
  'email_norm', 'phone', 'nationality', 'days_in_thailand', 'income_types', 'remittance_range', 'urgency', 'notes',
  'calculator_source', 'calculator', 'flags', 'estimated_tax_thb', 'consent_text', 'consent_at', 'consent_recorded_at',
  'partner_name', 'page_url', 'referrer', 'utm', 'partner_email_status', 'webhook_status', 'user_email_status',
] as const;

const DELIVERY_FIELDS: DeliveryField[] = ['partner_email_status', 'webhook_status', 'user_email_status'];

export class D1Store implements Store {
  constructor(private db: D1Database) {}

  async findLatestLeadByEmail(emailNorm: string) {
    return this.db
      .prepare('SELECT id, created_at FROM leads WHERE email_norm = ? ORDER BY created_at DESC LIMIT 1')
      .bind(emailNorm)
      .first<{ id: string; created_at: string }>();
  }

  async insertLead(lead: LeadRecord) {
    const placeholders = LEAD_COLUMNS.map(() => '?').join(', ');
    await this.db
      .prepare(`INSERT INTO leads (${LEAD_COLUMNS.join(', ')}) VALUES (${placeholders})`)
      .bind(...LEAD_COLUMNS.map((c) => lead[c]))
      .run();
  }

  async setDelivery(id: string, field: DeliveryField, value: string) {
    if (!DELIVERY_FIELDS.includes(field)) throw new Error('bad field');
    await this.db.prepare(`UPDATE leads SET ${field} = ? WHERE id = ?`).bind(value.slice(0, 500), id).run();
  }

  async listLeads(filter: LeadFilter) {
    const where: string[] = [];
    const args: unknown[] = [];
    if (filter.fromIso) { where.push('created_at >= ?'); args.push(filter.fromIso); }
    if (filter.toIso) { where.push('created_at < ?'); args.push(filter.toIso); }
    if (filter.status) { where.push('status = ?'); args.push(filter.status); }
    const sql = `SELECT * FROM leads ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC LIMIT 5000`;
    const res = await this.db.prepare(sql).bind(...args).all<LeadRecord>();
    return res.results ?? [];
  }

  async updateLeadStatus(id: string, status: LeadStatus, reason: string | null, updatedAt: string) {
    const res = await this.db
      .prepare('UPDATE leads SET status = ?, status_reason = ?, updated_at = ? WHERE id = ?')
      .bind(status, reason, updatedAt, id)
      .run();
    return (res.meta?.changes ?? 0) > 0;
  }

  async incrementRateLimit(key: string, windowStart: number) {
    const row = await this.db
      .prepare(
        `INSERT INTO rate_limits (key, window_start, count) VALUES (?, ?, 1)
         ON CONFLICT (key, window_start) DO UPDATE SET count = count + 1
         RETURNING count`
      )
      .bind(key, windowStart)
      .first<{ count: number }>();
    // Opportunistic cleanup of old windows (cheap; keeps the table small)
    await this.db.prepare('DELETE FROM rate_limits WHERE window_start < ?').bind(windowStart - 86400).run();
    return row?.count ?? 1;
  }

  async upsertSubscriber(s: SubscriberRecord) {
    await this.db
      .prepare(
        `INSERT INTO subscribers (email_norm, email, created_at, updated_at, marketing_opt_in, marketing_consent_text,
           marketing_consent_at, source, breakdowns_sent, unsubscribed_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON CONFLICT (email_norm) DO UPDATE SET
           email = excluded.email, updated_at = excluded.updated_at,
           marketing_opt_in = excluded.marketing_opt_in, marketing_consent_text = excluded.marketing_consent_text,
           marketing_consent_at = excluded.marketing_consent_at, source = excluded.source,
           breakdowns_sent = excluded.breakdowns_sent, unsubscribed_at = excluded.unsubscribed_at`
      )
      .bind(s.email_norm, s.email, s.created_at, s.updated_at, s.marketing_opt_in, s.marketing_consent_text,
        s.marketing_consent_at, s.source, s.breakdowns_sent, s.unsubscribed_at)
      .run();
  }

  async getSubscriber(emailNorm: string) {
    return this.db.prepare('SELECT * FROM subscribers WHERE email_norm = ?').bind(emailNorm).first<SubscriberRecord>();
  }

  async listSubscribers() {
    const res = await this.db.prepare('SELECT * FROM subscribers ORDER BY created_at DESC').all<SubscriberRecord>();
    return res.results ?? [];
  }

  async purgeOlderThan(beforeIso: string) {
    const l = await this.db.prepare('DELETE FROM leads WHERE updated_at < ?').bind(beforeIso).run();
    const s = await this.db
      .prepare('DELETE FROM subscribers WHERE marketing_opt_in = 0 AND updated_at < ?')
      .bind(beforeIso)
      .run();
    return { leads: l.meta?.changes ?? 0, subscribers: s.meta?.changes ?? 0 };
  }

  async unsubscribe(emailNorm: string, at: string) {
    const res = await this.db
      .prepare('UPDATE subscribers SET marketing_opt_in = 0, unsubscribed_at = ?, updated_at = ? WHERE email_norm = ?')
      .bind(at, at, emailNorm)
      .run();
    return (res.meta?.changes ?? 0) > 0;
  }
}
