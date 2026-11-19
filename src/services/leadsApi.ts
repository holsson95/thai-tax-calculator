import { PARTNER } from '../config/partner';
import type { LeadSubmission } from '../shared/leads';

export interface LeadResponse {
  ok: boolean;
  leadId?: string;
  bookingUrl?: string | null;
  duplicate?: boolean;
  error?: string;
  fields?: Partial<Record<string, string>>;
}

export interface BreakdownForEmail {
  calculator: string;
  taxYear: number;
  estimatedTaxThb: number;
  taxableIncomeThb: number;
  totalRemittedThb?: number;
  foreignAssessableThb?: number;
  brackets: { label: string; rate: number; taxableAmount: number; tax: number }[];
  flags: string[];
  assumptions: string[];
}

export interface SubscribeRequest {
  email: string;
  marketingOptIn: boolean;
  marketingConsentText?: string;
  breakdown?: BreakdownForEmail;
  source: string;
  turnstileToken?: string;
  website?: string;
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(`${PARTNER.leadsApiBaseUrl}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const data = (await res.json().catch(() => ({ ok: false, error: `http_${res.status}` }))) as T;
    return data;
  } catch {
    return { ok: false, error: 'network' } as T;
  } finally {
    clearTimeout(timer);
  }
}

export const submitLead = (lead: LeadSubmission) => post<LeadResponse>('/api/leads', lead);
export const subscribe = (req: SubscribeRequest) => post<{ ok: boolean; error?: string; fields?: Record<string, string> }>('/api/subscribe', req);

export function errorMessage(error?: string): string {
  switch (error) {
    case 'rate_limited':
      return 'Too many attempts from this connection. Please try again in an hour.';
    case 'turnstile_failed':
      return 'The spam check did not pass. Please try again.';
    case 'partner_disabled':
      return 'Specialist reviews are not available right now. You can still email yourself the breakdown.';
    case 'network':
      return 'Could not reach the server. Check your connection and try again.';
    default:
      return 'Something went wrong. Please try again, or email info@mythaitaxes.com.';
  }
}
