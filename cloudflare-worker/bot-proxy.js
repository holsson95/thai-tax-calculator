/**
 * Cloudflare Worker: BOT API CORS Proxy
 *
 * Deploy this worker on Cloudflare (free tier) to proxy BOT exchange rate
 * requests from the browser. The BOT API does not send CORS headers, so
 * browser requests must go through this worker.
 *
 * How to deploy:
 *  1. Log in to https://dash.cloudflare.com and go to Workers & Pages
 *  2. Create a new Worker, paste this file, and Save & Deploy
 *  3. Note the worker URL (e.g. https://bot-proxy.YOUR-SUBDOMAIN.workers.dev)
 *  4. Set VITE_BOT_PROXY_URL=<that URL> in your .env file
 *
 * Usage: GET <worker-url>?url=<encoded-target-url>
 * Forward Authorization and Accept headers in the request.
 */

const ALLOWED_ORIGINS = new Set([
  'https://www.thai-tax-calculator.com',
  'https://www.mythaitaxes.com',
  'https://mythaitaxes.com',
]);
const ALLOWED_TARGET_PREFIX = 'https://gateway.api.bot.or.th/';

export default {
  async fetch(request) {
    const origin = request.headers.get('Origin') ?? '';
    const allowedOrigin = ALLOWED_ORIGINS.has(origin) ? origin : '';

    const corsHeaders = {
      'Access-Control-Allow-Origin': allowedOrigin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Authorization, Accept',
      'Access-Control-Max-Age': '86400',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'GET') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
      return new Response('Missing ?url= parameter', { status: 400, headers: corsHeaders });
    }

    // Only proxy requests to the BOT API
    if (!targetUrl.startsWith(ALLOWED_TARGET_PREFIX)) {
      return new Response('Target URL not allowed', { status: 403, headers: corsHeaders });
    }

    const auth = request.headers.get('Authorization');
    const accept = request.headers.get('Accept') ?? '*/*';

    let upstream;
    try {
      upstream = await fetch(targetUrl, {
        headers: {
          ...(auth ? { Authorization: auth } : {}),
          Accept: accept,
        },
      });
    } catch {
      return new Response('Failed to reach BOT API', { status: 502, headers: corsHeaders });
    }

    const body = await upstream.arrayBuffer();

    return new Response(body, {
      status: upstream.status,
      headers: {
        ...corsHeaders,
        'Content-Type': upstream.headers.get('Content-Type') ?? 'application/json',
      },
    });
  },
};
