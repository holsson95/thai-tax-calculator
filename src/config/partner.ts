import raw from '../../partner.config.json';

/**
 * Public partner settings (from /partner.config.json — the one file shared with
 * the leads Worker). Contains no secrets: partner emails, webhook URL and API
 * keys live only in the Worker's secrets.
 */
export interface PartnerPublicConfig {
  enabled: boolean;
  partnerName: string;
  bookingUrl: string;
  leadCtaTaxThresholdThb: number;
  leadsApiBaseUrl: string;
  turnstileSiteKey: string;
  /** Local preview only (see PARTNER_LAUNCH.md): partner shown as active, submissions mocked, nothing sent. */
  previewMode?: boolean;
}

type RawPartnerConfig = Omit<PartnerPublicConfig, 'previewMode'>;

export const PREVIEW_PARTNER_NAME = 'Example Tax Firm (preview)';

/**
 * Applies the local preview switch. Preview needs BOTH a dev server and
 * VITE_PARTNER_PREVIEW=1, so a production build can never show it.
 */
export function resolvePartnerConfig(r: RawPartnerConfig, env: { dev: boolean; preview: boolean }): PartnerPublicConfig {
  const base: PartnerPublicConfig = {
    enabled: r.enabled,
    partnerName: r.partnerName,
    bookingUrl: r.bookingUrl,
    leadCtaTaxThresholdThb: r.leadCtaTaxThresholdThb,
    leadsApiBaseUrl: r.leadsApiBaseUrl.replace(/\/$/, ''),
    turnstileSiteKey: r.turnstileSiteKey,
    previewMode: false,
  };
  if (!(env.dev && env.preview)) return base;
  return {
    ...base,
    enabled: true,
    partnerName: PREVIEW_PARTNER_NAME,
    bookingUrl: 'https://example.com/book-a-call',
    leadsApiBaseUrl: 'https://preview.invalid',
    turnstileSiteKey: '',
    previewMode: true,
  };
}

export const PARTNER: PartnerPublicConfig = resolvePartnerConfig(raw, {
  dev: !!import.meta.env?.DEV,
  preview: import.meta.env?.VITE_PARTNER_PREVIEW === '1',
});

const isPlaceholder = (s: string) => !s.trim() || /^\[.*\]$/.test(s.trim());

/** The leads Worker URL is set, so email capture (and leads, if a partner is active) can work. */
export function isLeadsApiConfigured(cfg: PartnerPublicConfig = PARTNER): boolean {
  return /^https:\/\//.test(cfg.leadsApiBaseUrl);
}

/** A real partner is configured and switched on: show the "specialist review" CTA and lead form. */
export function isPartnerActive(cfg: PartnerPublicConfig = PARTNER): boolean {
  return cfg.enabled && isLeadsApiConfigured(cfg) && !isPlaceholder(cfg.partnerName);
}
