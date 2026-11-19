import { describe, it, expect } from 'vitest';
import {
  remittanceRangeFor,
  buildLeadConsentText,
  validateLeadSubmission,
  generateLeadId,
  isWithinDuplicateWindow,
  monthRange,
  csvCell,
  toCsv,
  buildBookingUrl,
  normalizeEmail,
  LeadSubmission,
} from '../leads';

const valid = (o: Partial<LeadSubmission> = {}): Partial<LeadSubmission> => ({
  name: 'Alex Smith',
  email: 'alex@example.com',
  nationality: 'GB',
  daysInThailand: 200,
  incomeTypes: ['pension'],
  remittanceRange: '1m_3m',
  urgency: 'this_season',
  consent: { given: true, text: buildLeadConsentText('Acme Tax'), at: '2026-11-19T00:00:00.000Z' },
  ...o,
});

describe('remittanceRangeFor', () => {
  it.each([
    [0, 'none'],
    [-5, 'none'],
    [Number.NaN, 'none'],
    [1, 'under_500k'],
    [499_999, 'under_500k'],
    [500_000, '500k_1m'],
    [1_000_000, '500k_1m'],
    [1_000_001, '1m_3m'],
    [3_000_000, '1m_3m'],
    [10_000_000, '3m_10m'],
    [10_000_001, 'over_10m'],
  ])('%s → %s', (thb, expected) => expect(remittanceRangeFor(thb as number)).toBe(expected));
});

describe('buildLeadConsentText', () => {
  it('names the partner', () => {
    expect(buildLeadConsentText('Acme Tax')).toBe(
      'I agree to share my details with Acme Tax so they can contact me about my Thai taxes.'
    );
  });
});

describe('validateLeadSubmission', () => {
  it('accepts a complete submission', () => {
    expect(validateLeadSubmission(valid(), buildLeadConsentText('Acme Tax')).ok).toBe(true);
  });

  it('rejects without consent (unticked)', () => {
    const r = validateLeadSubmission(valid({ consent: { given: false, text: 'x', at: '' } }));
    expect(r.ok).toBe(false);
    expect(r.errors.consent).toBeDefined();
  });

  it('rejects when the consent text names a different partner than the server expects', () => {
    const r = validateLeadSubmission(valid(), buildLeadConsentText('Other Firm'));
    expect(r.errors.consent).toMatch(/does not match/);
  });

  it.each([
    ['name', { name: 'A' }],
    ['email', { email: 'not-an-email' }],
    ['phone', { phone: 'call me maybe' }],
    ['nationality', { nationality: '' }],
    ['daysInThailand', { daysInThailand: 400 }],
    ['incomeTypes', { incomeTypes: ['lottery' as never] }],
    ['remittanceRange', { remittanceRange: 'lots' as never }],
    ['urgency', { urgency: 'yesterday' as never }],
    ['notes', { notes: 'x'.repeat(2001) }],
  ])('flags invalid %s', (field, override) => {
    const r = validateLeadSubmission(valid(override as Partial<LeadSubmission>));
    expect(r.ok).toBe(false);
    expect(r.errors[field]).toBeDefined();
  });

  it('phone and days are optional', () => {
    expect(validateLeadSubmission(valid({ phone: undefined, daysInThailand: null })).ok).toBe(true);
    expect(validateLeadSubmission(valid({ phone: '+66 81 234 5678' })).ok).toBe(true);
  });
});

describe('generateLeadId', () => {
  it('is date-stamped and uses an unambiguous alphabet', () => {
    const id = generateLeadId(new Date('2026-11-19T10:00:00Z'), (n) => new Uint8Array(n).fill(7));
    expect(id).toMatch(/^L-261119-[A-HJ-NP-Z2-9]{8}$/);
  });

  it('differs for different random bytes', () => {
    const d = new Date('2026-11-19T10:00:00Z');
    const a = generateLeadId(d, (n) => new Uint8Array(n).fill(1));
    const b = generateLeadId(d, (n) => new Uint8Array(n).fill(2));
    expect(a).not.toBe(b);
  });
});

describe('isWithinDuplicateWindow', () => {
  const now = new Date('2026-11-19T00:00:00Z');
  it('true at exactly 90 days, false after', () => {
    expect(isWithinDuplicateWindow('2026-08-21T00:00:00Z', now, 90)).toBe(true);
    expect(isWithinDuplicateWindow('2026-08-20T23:59:59Z', now, 90)).toBe(false);
  });
  it('false for unparseable dates', () => {
    expect(isWithinDuplicateWindow('nope', now, 90)).toBe(false);
  });
});

describe('normalizeEmail', () => {
  it('trims and lowercases', () => expect(normalizeEmail('  Alex@Example.COM ')).toBe('alex@example.com'));
});

describe('monthRange', () => {
  it('returns UTC month bounds', () => {
    expect(monthRange('2026-12')).toEqual(['2026-12-01T00:00:00.000Z', '2027-01-01T00:00:00.000Z']);
  });
  it('rejects bad input', () => {
    expect(monthRange('2026-13')).toBeNull();
    expect(monthRange('Nov 2026')).toBeNull();
  });
});

describe('CSV', () => {
  it('quotes commas, quotes and newlines', () => {
    expect(csvCell('a,b')).toBe('"a,b"');
    expect(csvCell('say "hi"')).toBe('"say ""hi"""');
    expect(csvCell('line1\nline2')).toBe('"line1\nline2"');
  });

  it('neutralises formula injection', () => {
    expect(csvCell('=HYPERLINK("x")')).toBe(`"'=HYPERLINK(""x"")"`);
    expect(csvCell('+66 81')).toBe("'+66 81");
    expect(csvCell('@foo')).toBe("'@foo");
  });

  it('serialises objects as JSON and empties null', () => {
    expect(csvCell(null)).toBe('');
    expect(csvCell(['a', 'b'])).toBe('"[""a"",""b""]"');
    expect(csvCell(42)).toBe('42');
  });

  it('builds a header row plus one row per record with CRLF', () => {
    expect(toCsv(['id', 'email'], [{ id: 'L-1', email: 'a@b.co' }])).toBe('id,email\r\nL-1,a@b.co\r\n');
  });
});

describe('buildBookingUrl', () => {
  it('adds UTM parameters and the lead id, keeping existing params', () => {
    const url = new URL(buildBookingUrl('https://cal.example.com/book?x=1', 'L-261119-ABCD2345')!);
    expect(url.searchParams.get('x')).toBe('1');
    expect(url.searchParams.get('utm_source')).toBe('mythaitaxes');
    expect(url.searchParams.get('utm_medium')).toBe('referral');
    expect(url.searchParams.get('utm_campaign')).toBe('lead');
    expect(url.searchParams.get('lead_id')).toBe('L-261119-ABCD2345');
  });

  it('returns null for placeholders and non-http URLs', () => {
    expect(buildBookingUrl('[PARTNER_BOOKING_URL]', 'L-1')).toBeNull();
    expect(buildBookingUrl('javascript:alert(1)', 'L-1')).toBeNull();
  });
});
