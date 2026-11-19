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
}

export const PARTNER: PartnerPublicConfig = {
  enabled: raw.enabled,
  partnerName: raw.partnerName,
  bookingUrl: raw.bookingUrl,
  leadCtaTaxThresholdThb: raw.leadCtaTaxThresholdThb,
  leadsApiBaseUrl: raw.leadsApiBaseUrl.replace(/\/$/, ''),
  turnstileSiteKey: raw.turnstileSiteKey,
};

const isPlaceholder = (s: string) => !s.trim() || /^\[.*\]$/.test(s.trim());

/** The leads Worker URL is set, so email capture (and leads, if a partner is active) can work. */
export function isLeadsApiConfigured(cfg: PartnerPublicConfig = PARTNER): boolean {
  return /^https:\/\//.test(cfg.leadsApiBaseUrl);
}

/** A real partner is configured and switched on: show the "specialist review" CTA and lead form. */
export function isPartnerActive(cfg: PartnerPublicConfig = PARTNER): boolean {
  return cfg.enabled && isLeadsApiConfigured(cfg) && !isPlaceholder(cfg.partnerName);
}
