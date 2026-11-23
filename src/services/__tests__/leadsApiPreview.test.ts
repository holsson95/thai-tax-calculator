import { describe, it, expect, vi, afterEach } from 'vitest';

vi.mock('../../config/partner', () => ({
  PARTNER: {
    enabled: true,
    partnerName: 'Example Tax Firm (preview)',
    bookingUrl: 'https://example.com/book-a-call',
    leadCtaTaxThresholdThb: 50_000,
    leadsApiBaseUrl: 'https://preview.invalid',
    turnstileSiteKey: '',
    previewMode: true,
  },
}));

import { submitLead, subscribe } from '../leadsApi';
import type { LeadSubmission } from '../../shared/leads';

afterEach(() => vi.unstubAllGlobals());

describe('leadsApi in local preview mode', () => {
  it('fakes a successful lead without any network request', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'info').mockImplementation(() => {});
    const res = await submitLead({ name: 'Test' } as LeadSubmission);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(res.ok).toBe(true);
    expect(res.leadId).toMatch(/^L-\d{6}-[A-HJ-NP-Z2-9]{8}$/); // what the thank-you page accepts
    expect(res.bookingUrl).toContain('https://example.com/book-a-call');
  });

  it('fakes email capture too', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    vi.spyOn(console, 'info').mockImplementation(() => {});
    const res = await subscribe({ email: 'a@b.test', marketingOptIn: false, source: 'annual' });
    expect(fetchMock).not.toHaveBeenCalled();
    expect(res.ok).toBe(true);
  });
});
