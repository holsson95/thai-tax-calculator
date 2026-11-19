/**
 * Analytics events, sent to the existing Google Analytics 4 tag (gtag in
 * index.html). Only these event names are allowed, and only non-personal
 * parameters: never names, emails, phone numbers, notes or exact amounts.
 */
export const ANALYTICS_EVENTS = [
  'calculator_completed',
  'foreign_calc_completed',
  'lead_cta_shown',
  'lead_cta_clicked',
  'lead_submitted',
  'booking_link_clicked',
  'email_captured',
] as const;
export type AnalyticsEvent = (typeof ANALYTICS_EVENTS)[number];

const ALLOWED_PARAMS = new Set([
  'calculator', // annual | monthly | quick | foreign_income
  'prominence', // high | standard
  'flag_count',
  'tax_band', // coarse band, see taxBand()
  'is_resident',
  'marketing_opt_in',
  'is_duplicate',
  'cta_variant', // lead | email_fallback
]);

type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

/** Coarse tax band so GA never receives exact amounts. */
export function taxBand(taxThb: number): string {
  if (!Number.isFinite(taxThb) || taxThb <= 0) return '0';
  if (taxThb < 50_000) return '<50k';
  if (taxThb < 200_000) return '50k-200k';
  if (taxThb < 1_000_000) return '200k-1m';
  return '1m+';
}

export function sanitizeParams(params: Params = {}): Params {
  const out: Params = {};
  for (const [k, v] of Object.entries(params)) if (ALLOWED_PARAMS.has(k)) out[k] = v;
  return out;
}

export function track(event: AnalyticsEvent, params?: Params): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  if (!(ANALYTICS_EVENTS as readonly string[]).includes(event)) return;
  try {
    window.gtag('event', event, sanitizeParams(params));
  } catch {
    /* analytics must never break the page */
  }
}
