/**
 * Cloudflare Worker: Bank of Thailand exchange-rate proxy
 *
 * The BOT API sends no CORS headers, so the browser calls this Worker instead.
 * The Worker holds the BOT API key as a secret and adds it itself: the key is
 * never shipped in the website's JavaScript.
 *
 * Deploy / rotate the key:
 *  1. Get a key at https://portal.api.bot.or.th/ (Exchange Rates product).
 *  2. Cloudflare dashboard → Workers & Pages → this worker → Settings →
 *     Variables and Secrets → Add → type "Secret", name BOT_API_KEY.
 *  3. Edit code → paste this file → Deploy.
 *  4. The site needs only VITE_BOT_PROXY_URL=<worker URL> in .env.
 *
 * Usage: GET <worker-url>?url=<encoded BOT DAILY_AVG_EXG_RATE URL>
 *
 * Limits: only our origins and only the daily average exchange-rate series are
 * forwarded. The Origin check stops other websites' browsers; it cannot stop a
 * script that forges the header, so keep the key scoped to Exchange Rates only.
 */

const ALLOWED_ORIGINS = new Set([
  'https://www.thai-tax-calculator.com',
  'https://www.mythaitaxes.com',
  'https://mythaitaxes.com',
  'http://localhost:5173',
]);
const ALLOWED_TARGET_PREFIX = 'https://gateway.api.bot.or.th/Stat-ExchangeRate/v2/DAILY_AVG_EXG_RATE/';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') ?? '';
    if (!ALLOWED_ORIGINS.has(origin)) {
      return new Response('Origin not allowed', { status: 403 });
    }

    const corsHeaders = {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Accept',
      'Access-Control-Max-Age': '86400',
      Vary: 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }
    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    const targetUrl = new URL(request.url).searchParams.get('url');
    if (!targetUrl) {
      return new Response('Missing ?url= parameter', { status: 400, headers: corsHeaders });
    }
    if (!targetUrl.startsWith(ALLOWED_TARGET_PREFIX)) {
      return new Response('Target URL not allowed', { status: 403, headers: corsHeaders });
    }
    if (!env?.BOT_API_KEY) {
      return new Response('Proxy not configured', { status: 500, headers: corsHeaders });
    }

    let upstream;
    try {
      upstream = await fetch(targetUrl, {
        headers: { Authorization: env.BOT_API_KEY, Accept: request.headers.get('Accept') ?? '*/*' },
      });
    } catch {
      return new Response('Failed to reach BOT API', { status: 502, headers: corsHeaders });
    }

    return new Response(await upstream.arrayBuffer(), {
      status: upstream.status,
      headers: { ...corsHeaders, 'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json' },
    });
  },
};
