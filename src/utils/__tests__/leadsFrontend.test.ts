import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { isLeadsApiConfigured, isPartnerActive, PARTNER, PartnerPublicConfig } from '../../config/partner';
import partnerJson from '../../../partner.config.json';
import { sanitizeParams, taxBand, track } from '../analytics';
import { captureAttribution, getAttribution, parseUtm } from '../attribution';
import { isHighPriority, leadContextFromRemittance, leadContextFromSalary, leadContextFromFreelancer } from '../leadContext';
import { estimateRemittanceTax, RemittanceEstimateInput } from '../remittanceEstimate';
import { calculateFreelancerTax } from '../taxCalculations';
import { RULES_TAX_YEAR } from '../../config/taxRules';
import type { FreelancerFormData } from '../../types/freelancerForm';

const cfg = (o: Partial<PartnerPublicConfig> = {}): PartnerPublicConfig => ({
  enabled: true,
  partnerName: 'Acme Tax Co',
  bookingUrl: 'https://cal.example.com/acme',
  leadCtaTaxThresholdThb: 50_000,
  leadsApiBaseUrl: 'https://mythaitaxes-leads.example.workers.dev',
  turnstileSiteKey: '',
  ...o,
});

describe('partner config', () => {
  it('ships switched off, with placeholders, and with no secrets in the public file', () => {
    expect(partnerJson.enabled).toBe(false);
    expect(isPartnerActive()).toBe(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { _comment, ...settings } = partnerJson;
    expect(Object.keys(settings).some((k) => /email|webhook|secret|api_?key/i.test(k))).toBe(false);
    expect(Object.values(settings).some((v) => typeof v === 'string' && v.includes('@'))).toBe(false);
  });

  it('needs enabled + https API URL + a real (non-placeholder) name to be active', () => {
    expect(isPartnerActive(cfg())).toBe(true);
    expect(isPartnerActive(cfg({ enabled: false }))).toBe(false);
    expect(isPartnerActive(cfg({ partnerName: '[PARTNER_NAME]' }))).toBe(false);
    expect(isPartnerActive(cfg({ leadsApiBaseUrl: '' }))).toBe(false);
    expect(isPartnerActive(cfg({ leadsApiBaseUrl: 'http://insecure.example' }))).toBe(false);
    expect(isLeadsApiConfigured(cfg({ enabled: false }))).toBe(true);
  });

  it('exposes only public fields', () => {
    expect(Object.keys(PARTNER).sort()).toEqual(
      ['bookingUrl', 'enabled', 'leadCtaTaxThresholdThb', 'leadsApiBaseUrl', 'partnerName', 'previewMode', 'turnstileSiteKey'].sort()
    );
  });
});

describe('analytics', () => {
  afterEach(() => {
    delete window.gtag;
  });

  it('drops any parameter not on the allow-list (no PII)', () => {
    expect(sanitizeParams({ calculator: 'quick', email: 'a@b.co', name: 'x', tax_band: '<50k' })).toEqual({
      calculator: 'quick',
      tax_band: '<50k',
    });
  });

  it('sends only known events to gtag', () => {
    const gtag = vi.fn();
    window.gtag = gtag;
    track('lead_submitted', { calculator: 'annual', phone: '123' } as never);
    track('made_up_event' as never);
    expect(gtag).toHaveBeenCalledTimes(1);
    expect(gtag).toHaveBeenCalledWith('event', 'lead_submitted', { calculator: 'annual' });
  });

  it('does nothing without gtag', () => {
    expect(() => track('email_captured')).not.toThrow();
  });

  it.each([
    [0, '0'],
    [49_999, '<50k'],
    [50_000, '50k-200k'],
    [999_999, '200k-1m'],
    [5_000_000, '1m+'],
  ])('taxBand(%s) = %s', (n, band) => expect(taxBand(n)).toBe(band));
});

describe('attribution', () => {
  beforeEach(() => window.sessionStorage.clear());

  it('parses only known UTM keys', () => {
    expect(parseUtm('?utm_source=g&utm_campaign=c&foo=bar')).toEqual({ utm_source: 'g', utm_campaign: 'c' });
  });

  it('captures first touch and keeps it', () => {
    captureAttribution({ pathname: '/foreign-income-tax-calculator/', search: '?utm_source=fb' }, 'https://facebook.com/');
    captureAttribution({ pathname: '/faq/', search: '?utm_source=other' }, 'https://mythaitaxes.com/');
    expect(getAttribution()).toEqual({
      utm: { utm_source: 'fb' },
      referrer: 'https://facebook.com/',
      landingPage: '/foreign-income-tax-calculator/',
    });
  });

  it('a later visit with UTMs replaces a capture without them; internal referrers are dropped', () => {
    captureAttribution({ pathname: '/', search: '' }, 'https://www.mythaitaxes.com/faq/');
    expect(getAttribution()!.referrer).toBe('');
    captureAttribution({ pathname: '/x', search: '?utm_medium=email' }, '');
    expect(getAttribution()!.utm).toEqual({ utm_medium: 'email' });
  });
});

describe('lead context', () => {
  const remitInput = (o: Partial<RemittanceEstimateInput> = {}): RemittanceEstimateInput => ({
    daysInThailand: 200,
    visaType: 'regular',
    nationality: 'US',
    foreignIncomeTypes: ['pension'],
    remittances: [
      { id: 'a', amountThb: 1_200_000, yearEarned: RULES_TAX_YEAR, kind: 'income', incomeType: 'pension', residentInYearEarned: 'yes' },
      { id: 'b', amountThb: 300_000, yearEarned: 'pre2024', kind: 'capital', incomeType: 'other', residentInYearEarned: 'yes' },
    ],
    thaiIncome: { annualSalary: 0, socialSecurityPaid: 0, otherThaiIncome: 0 },
    foreignTaxPaidThb: 0,
    ...o,
  });

  it('prefills from the remittance calculator and carries flags into the snapshot and breakdown', () => {
    const input = remitInput();
    const ctx = leadContextFromRemittance(input, estimateRemittanceTax(input));
    expect(ctx.source).toBe('foreign_income');
    expect(ctx.prefill).toEqual({ nationality: 'US', daysInThailand: 200, incomeTypes: ['pension'], remittanceRange: '1m_3m' });
    expect(ctx.snapshot.flags).toEqual(expect.arrayContaining(['us_citizen', 'large_remittance']));
    expect(ctx.breakdown.brackets.length).toBeGreaterThan(0);
    expect(ctx.breakdown.assumptions.length).toBeGreaterThan(0);
    expect(JSON.stringify(ctx.snapshot)).not.toMatch(/"id":"a"/); // no raw inputs in the snapshot
  });

  it('is high priority when flags fire or tax exceeds the threshold', () => {
    expect(isHighPriority({ flags: [], estimatedTaxThb: 10_000 }, 50_000)).toBe(false);
    expect(isHighPriority({ flags: [], estimatedTaxThb: 50_001 }, 50_000)).toBe(true);
    expect(isHighPriority({ flags: [{ id: 'ltr', title: 'LTR' }], estimatedTaxThb: 0 }, 50_000)).toBe(true);
  });

  it('salary contexts have no flags and round amounts', () => {
    const ctx = leadContextFromSalary('quick', 12_345.6, 400_000.4);
    expect(ctx.flags).toEqual([]);
    expect(ctx.estimatedTaxThb).toBe(12_346);
    expect(ctx.prefill.incomeTypes).toEqual(['thai_employment']);
  });

  it('annual freelancer context flags LTR, foreign income and large remittances', () => {
    const formData = {
      employmentType: 'freelancer',
      daysInThailand: 250,
      isThaiResident: true,
      visaType: 'ltr_wealthy_pensioner',
      hasForeignIncome: true,
      foreignIncomeEntries: [
        { id: 'f', amount: 40_000, currency: 'USD', amountThb: 1_400_000, dateEarned: '2026-02-01', dateRemitted: '2026-03-01', foreignTaxPaid: 0, description: '', country: 'United States', isPension: true },
      ],
      thaiIncomeEntries: [{ id: 't', grossAmount: 300_000, incomeType: 'liberal_profession_40_6' }],
    } as unknown as FreelancerFormData;
    let result;
    try {
      result = calculateFreelancerTax(formData);
    } catch {
      result = { grossTaxBeforeCredits: 100_000, taxableIncome: 900_000 } as ReturnType<typeof calculateFreelancerTax>;
    }
    const ctx = leadContextFromFreelancer(formData, result);
    expect(ctx.flags.map((f) => f.id)).toEqual(expect.arrayContaining(['ltr', 'foreign_income', 'large_remittance', 'multiple_income_types']));
    expect(ctx.prefill.remittanceRange).toBe('1m_3m');
    expect(ctx.prefill.incomeTypes).toEqual(expect.arrayContaining(['thai_business', 'pension']));
  });
});
