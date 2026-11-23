import { describe, it, expect } from 'vitest';
import { isLeadsApiConfigured, isPartnerActive, PREVIEW_PARTNER_NAME, resolvePartnerConfig } from '../partner';

const disabled = {
  enabled: false,
  partnerName: '[PARTNER_NAME]',
  bookingUrl: '[PARTNER_BOOKING_URL]',
  leadCtaTaxThresholdThb: 50000,
  leadsApiBaseUrl: '',
  turnstileSiteKey: '',
};

describe('resolvePartnerConfig', () => {
  it('uses partner.config.json as-is normally', () => {
    const cfg = resolvePartnerConfig(disabled, { dev: true, preview: false });
    expect(cfg.previewMode).toBe(false);
    expect(isPartnerActive(cfg)).toBe(false);
    expect(isLeadsApiConfigured(cfg)).toBe(false);
  });

  it('in dev with VITE_PARTNER_PREVIEW=1, switches a placeholder partner on for local review', () => {
    const cfg = resolvePartnerConfig(disabled, { dev: true, preview: true });
    expect(cfg.previewMode).toBe(true);
    expect(cfg.partnerName).toBe(PREVIEW_PARTNER_NAME);
    expect(cfg.turnstileSiteKey).toBe('');
    expect(isPartnerActive(cfg)).toBe(true);
  });

  it('never turns preview on in a production build, even if the variable is set', () => {
    const cfg = resolvePartnerConfig(disabled, { dev: false, preview: true });
    expect(cfg.previewMode).toBe(false);
    expect(isPartnerActive(cfg)).toBe(false);
  });

  it('trims a trailing slash from the API URL', () => {
    const cfg = resolvePartnerConfig({ ...disabled, leadsApiBaseUrl: 'https://x.workers.dev/' }, { dev: false, preview: false });
    expect(cfg.leadsApiBaseUrl).toBe('https://x.workers.dev');
  });
});
