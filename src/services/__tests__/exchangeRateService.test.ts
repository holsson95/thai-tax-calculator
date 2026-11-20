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

  const respond = (rows: unknown[]) =>
    vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify({ result: { data: { data_detail: rows } } }), { status: 200 })));

  it('resolves a weekend date to the latest earlier business day from one range request', async () => {
    respond([
      { period: '2026-03-05', currency_id: 'USD', mid_rate: '35.1000' },
      { period: '2026-03-06', currency_id: 'USD', mid_rate: '35.4000' },
      { period: '2026-03-06', currency_id: 'EUR', mid_rate: '38.0000' },
    ]);
    const { getExchangeRate } = await import('../exchangeRateService');
    const res = await getExchangeRate('USD', '2026-03-08'); // Sunday
    expect(res).toEqual({ ok: true, data: expect.objectContaining({ rate: 35.4, date: '2026-03-06' }) });
    const f = fetch as unknown as ReturnType<typeof vi.fn>;
    expect(f).toHaveBeenCalledTimes(1);
    const target = new URL(new URL(f.mock.calls[0][0] as string).searchParams.get('url')!);
    expect(target.searchParams.get('start_period')).toBe('2026-03-01');
    expect(target.searchParams.get('end_period')).toBe('2026-03-08');
  });

  it('ignores rows after the requested date', async () => {
    respond([
      { period: '2026-03-02', currency_id: 'USD', mid_rate: '35.0000' },
      { period: '2026-03-03', currency_id: 'USD', mid_rate: '36.0000' },
    ]);
    const { getExchangeRate } = await import('../exchangeRateService');
    const res = await getExchangeRate('USD', '2026-03-02');
    expect(res).toEqual({ ok: true, data: expect.objectContaining({ rate: 35, date: '2026-03-02' }) });
  });

  it('reports not found for a 200 reply with no rows', async () => {
    respond([]);
    const { getExchangeRate } = await import('../exchangeRateService');
    const res = await getExchangeRate('USD', '2026-03-08');
    expect(res.ok).toBe(false);
  });

  it('caches under the requested date', async () => {
    respond([{ period: '2026-03-06', currency_id: 'USD', mid_rate: '35.4000' }]);
    const { getExchangeRate } = await import('../exchangeRateService');
    await getExchangeRate('USD', '2026-03-08');
    await getExchangeRate('USD', '2026-03-08');
    expect(fetch as unknown as ReturnType<typeof vi.fn>).toHaveBeenCalledTimes(1);
  });
});
