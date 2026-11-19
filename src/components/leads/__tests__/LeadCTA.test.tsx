import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { buildLeadConsentText, buildMarketingConsentText } from '../../../shared/leads';
import type { LeadContext } from '../../../utils/leadContext';

const partnerState = vi.hoisted(() => ({ active: true, api: true }));

vi.mock('../../../config/partner', () => ({
  PARTNER: {
    enabled: true,
    partnerName: 'Acme Tax Co',
    bookingUrl: 'https://cal.example.com/acme',
    leadCtaTaxThresholdThb: 50_000,
    leadsApiBaseUrl: 'https://leads.example.workers.dev',
    turnstileSiteKey: '',
  },
  isPartnerActive: () => partnerState.active,
  isLeadsApiConfigured: () => partnerState.api,
}));

import LeadCTA from '../LeadCTA';
import ThankYouPage from '../../../pages/ThankYouPage';

const ctx = (o: Partial<LeadContext> = {}): LeadContext => ({
  source: 'foreign_income',
  estimatedTaxThb: 120_000,
  flags: [{ id: 'us_citizen', title: 'US citizen' }],
  prefill: { nationality: 'US', daysInThailand: 200, incomeTypes: ['pension'], remittanceRange: '1m_3m' },
  snapshot: { source: 'foreign_income', estimatedTaxThb: 120_000, flags: ['us_citizen'] },
  breakdown: { calculator: 'foreign_income', taxYear: 2026, estimatedTaxThb: 120_000, taxableIncomeThb: 900_000, brackets: [], flags: ['US citizen'], assumptions: [] },
  ...o,
});

const renderCTA = (c: LeadContext = ctx()) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={['/foreign-income-tax-calculator/']}>
        <Routes>
          <Route path="/foreign-income-tax-calculator/" element={<LeadCTA context={c} />} />
          <Route path="/thank-you/" element={<ThankYouPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );

let fetchMock: ReturnType<typeof vi.fn>;
let gtag: ReturnType<typeof vi.fn>;

beforeEach(() => {
  partnerState.active = true;
  partnerState.api = true;
  fetchMock = vi.fn(async () => new Response(JSON.stringify({ ok: true, leadId: 'L-261119-ABCDEFGH', bookingUrl: null }), { status: 200 }));
  vi.stubGlobal('fetch', fetchMock);
  gtag = vi.fn();
  window.gtag = gtag as unknown as Window["gtag"];
  window.sessionStorage.clear();
});
afterEach(() => {
  vi.unstubAllGlobals();
  delete window.gtag;
});

const events = () => gtag.mock.calls.map((c) => c[1]);

describe('LeadCTA', () => {
  it('renders nothing when the leads API is not configured', () => {
    partnerState.api = false;
    partnerState.active = false;
    const { container } = renderCTA();
    expect(container.textContent).toBe('');
    expect(events()).toEqual([]);
  });

  it('falls back to email capture when no partner is active', () => {
    partnerState.active = false;
    renderCTA();
    expect(screen.getByText('Email me my tax breakdown')).toBeInTheDocument();
    expect(screen.queryByText(/Want a specialist/)).not.toBeInTheDocument();
    expect(events()).toContain('lead_cta_shown');
  });

  it('shows the prominent CTA (with flags) and tracks shown + clicked', async () => {
    renderCTA();
    expect(screen.getByText('Want a specialist to review this? Free 15-min call.')).toBeInTheDocument();
    expect(screen.getByLabelText('Specialist review').className).toMatch(/border-2/);
    expect(screen.getByText(/us citizen/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Request a free call' }));
    expect(await screen.findByRole('heading', { name: 'Request a free 15-minute call' })).toBeInTheDocument();
    expect(events()).toEqual(['lead_cta_shown', 'lead_cta_clicked']);
  });

  it('standard prominence for simple, low-tax results', () => {
    renderCTA(ctx({ flags: [], estimatedTaxThb: 1_000 }));
    expect(screen.getByLabelText('Specialist review').className).not.toMatch(/border-2/);
  });
});

describe('LeadForm', () => {
  const open = async () => {
    renderCTA();
    fireEvent.click(screen.getByRole('button', { name: 'Request a free call' }));
    await screen.findByLabelText('Name');
  };

  it('prefills from the calculator, names the partner in an unticked consent box', async () => {
    await open();
    expect((screen.getByLabelText('Nationality') as HTMLSelectElement).value).toBe('US');
    expect((screen.getByLabelText(/Days in Thailand/) as HTMLInputElement).value).toBe('200');
    expect((screen.getByLabelText(/Approximate yearly remittance/) as HTMLSelectElement).value).toBe('1m_3m');
    const consent = screen.getByRole('checkbox', { name: /I agree to share my details with Acme Tax Co/ }) as HTMLInputElement;
    expect(consent.checked).toBe(false);
    expect(screen.getByRole('link', { name: 'How this site is funded' })).toHaveAttribute('href', '/how-this-site-is-funded/');
    expect(screen.getByRole('link', { name: 'Privacy policy' })).toHaveAttribute('href', '/privacy/#leads');
  });

  it('does not submit without consent', async () => {
    await open();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sam Lee' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'sam@example.com' } });
    fireEvent.click(screen.getByText('This filing season'));
    fireEvent.click(screen.getByRole('button', { name: 'Send my request' }));
    expect(await screen.findByText(/Please tick the box/)).toBeInTheDocument();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('submits with consent text, snapshot and attribution, then goes to the thank-you page', async () => {
    window.sessionStorage.setItem('mtt-attribution-v1', JSON.stringify({ utm: { utm_source: 'google' }, referrer: 'https://google.com/', landingPage: '/' }));
    await open();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sam Lee' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'sam@example.com' } });
    fireEvent.click(screen.getByText('Planning ahead'));
    fireEvent.click(screen.getByRole('checkbox', { name: /I agree to share/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Send my request' }));
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(1));
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://leads.example.workers.dev/api/leads');
    const body = JSON.parse(init.body as string);
    expect(body.consent.given).toBe(true);
    expect(body.consent.text).toBe(buildLeadConsentText('Acme Tax Co'));
    expect(body.calculator.flags).toEqual(['us_citizen']);
    expect(body.utm).toEqual({ utm_source: 'google' });
    expect(body.urgency).toBe('planning');
    expect(body.website).toBe('');
    expect(await screen.findByText('Thanks, your request has been sent')).toBeInTheDocument();
    expect(events()).toContain('lead_submitted');
    const submitted = gtag.mock.calls.find((c) => c[1] === 'lead_submitted')![2];
    expect(JSON.stringify(submitted)).not.toMatch(/sam|example\.com/i);
  });

  it('shows a readable error when the server rejects', async () => {
    fetchMock.mockImplementationOnce(async () => new Response(JSON.stringify({ ok: false, error: 'rate_limited' }), { status: 429 }));
    await open();
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Sam Lee' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'sam@example.com' } });
    fireEvent.click(screen.getByText('Planning ahead'));
    fireEvent.click(screen.getByRole('checkbox', { name: /I agree to share/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Send my request' }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/Too many attempts/);
  });
});

describe('EmailCapture', () => {
  it('sends the breakdown with a separate, unticked updates opt-in and tracks email_captured', async () => {
    partnerState.active = false;
    renderCTA();
    const optIn = screen.getByRole('checkbox', { name: buildMarketingConsentText() }) as HTMLInputElement;
    expect(optIn.checked).toBe(false);
    fireEvent.change(screen.getByLabelText('Email address'), { target: { value: 'sam@example.com' } });
    fireEvent.click(optIn);
    fireEvent.click(screen.getByRole('button', { name: 'Send breakdown' }));
    await screen.findByText(/Check your inbox/);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('https://leads.example.workers.dev/api/subscribe');
    const body = JSON.parse(init.body as string);
    expect(body.marketingOptIn).toBe(true);
    expect(body.marketingConsentText).toBe(buildMarketingConsentText());
    expect(body.breakdown.calculator).toBe('foreign_income');
    expect(events()).toContain('email_captured');
  });
});

describe('ThankYouPage', () => {
  it('shows the tagged booking link for a valid lead id and tracks clicks', async () => {
    window.history.pushState({}, '', '/thank-you/?lead=L-261119-ABCDEFGH');
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ThankYouPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    const link = await screen.findByRole('link', { name: /Book your free 15-minute call/ });
    const url = new URL(link.getAttribute('href')!);
    expect(url.searchParams.get('lead_id')).toBe('L-261119-ABCDEFGH');
    expect(url.searchParams.get('utm_source')).toBe('mythaitaxes');
    fireEvent.click(link);
    expect(events()).toContain('booking_link_clicked');
  });

  it('ignores a malformed lead id', () => {
    window.history.pushState({}, '', '/thank-you/?lead=<script>');
    render(
      <HelmetProvider>
        <MemoryRouter>
          <ThankYouPage />
        </MemoryRouter>
      </HelmetProvider>
    );
    expect(screen.queryByRole('link', { name: /Book your/ })).not.toBeInTheDocument();
  });
});
