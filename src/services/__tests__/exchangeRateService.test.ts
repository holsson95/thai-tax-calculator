import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

const botBody = {
  result: { data: { data_detail: [{ period: '2026-03-02', currency_id: 'USD', mid_rate: '35.6200' }] } },
};

describe('getExchangeRate', () => {
  beforeEach(() => {
    vi.resetModules();
    sessionStorage.clear();
    vi.stubEnv('VITE_BOT_PROXY_URL', 'https://proxy.example');
    vi.stubEnv('VITE_BOT_API_KEY', '');
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(botBody), { status: 200 })));
  });
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it('fetches a rate without an API key and sends no Authorization header', async () => {
    const { getExchangeRate } = await import('../exchangeRateService');
    const res = await getExchangeRate('USD', '2026-03-02');
    expect(res).toEqual({ ok: true, data: expect.objectContaining({ rate: 35.62, date: '2026-03-02' }) });
    const init = (fetch as unknown as ReturnType<typeof vi.fn>).mock.calls[0][1] as RequestInit | undefined;
    expect(init?.headers ?? {}).not.toHaveProperty('Authorization');
  });
});
