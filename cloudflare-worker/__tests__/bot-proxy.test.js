// @vitest-environment node
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import worker from '../bot-proxy.js';

const env = { BOT_API_KEY: 'server-key' };
const target =
  'https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/?start_period=2026-03-02&end_period=2026-03-02';
const req = (origin, url = target, auth) =>
  new Request(`https://proxy.example/?url=${encodeURIComponent(url)}`, {
    headers: { Origin: origin, ...(auth ? { Authorization: auth } : {}) },
  });

describe('bot-proxy worker', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn(async () => new Response('{}', { status: 200 })));
  });
  afterEach(() => vi.unstubAllGlobals());

  it('adds the server key and ignores a client Authorization header', async () => {
    const res = await worker.fetch(req('https://www.mythaitaxes.com', target, 'client-key'), env);
    expect(res.status).toBe(200);
    expect(fetch.mock.calls[0][1].headers.Authorization).toBe('server-key');
  });

  it('rejects a disallowed origin with 403 and does not call upstream', async () => {
    expect((await worker.fetch(req('https://evil.example'), env)).status).toBe(403);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('rejects a BOT path other than DAILY_AVG_EXG_RATE with 403', async () => {
    const res = await worker.fetch(
      req('https://www.mythaitaxes.com', 'https://gateway.api.bot.or.th/Stat-InterestRate/v2/x'),
      env
    );
    expect(res.status).toBe(403);
    expect(fetch).not.toHaveBeenCalled();
  });

  it('returns 500 when the secret is missing', async () => {
    expect((await worker.fetch(req('https://www.mythaitaxes.com'), {})).status).toBe(500);
  });
});
