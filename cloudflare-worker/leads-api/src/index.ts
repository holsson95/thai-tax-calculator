/**
 * mythaitaxes leads API (Cloudflare Worker + D1).
 *
 *  Public (CORS-limited to ALLOWED_ORIGINS):
 *    POST /api/leads        lead form submission
 *    POST /api/subscribe    "email me my breakdown" + optional updates opt-in
 *    GET|POST /unsubscribe  signed unsubscribe link
 *
 *  Admin (Cloudflare Access + JWT verified here, fails closed):
 *    GET  /admin/leads                     admin UI
 *    GET  /admin/api/leads?month=&status=  JSON
 *    GET  /admin/api/leads.csv?month=      CSV export (monthly invoicing)
 *    POST /admin/api/leads/:id/status      { status, reason }
 *    GET  /admin/api/subscribers.csv
 *
 * Setup and deploy: see README.md in this folder.
 */
import { verifyAccessJwt, readAccessToken } from './access';
import { ADMIN_CSS, ADMIN_HTML, ADMIN_JS, UNSUBSCRIBE_HTML } from './adminPage';
import {
  handleAdminCsv,
  handleAdminList,
  handleAdminStatus,
  handleAdminSubscribersCsv,
  handleLeadSubmission,
  handleSubscribe,
  handleUnsubscribe,
  HandlerResult,
  healthStatus,
  runRetention,
} from './handlers';
import { D1Store } from './store';
import type { Deps, EmailMessage, Env } from './types';

const MAX_BODY_BYTES = 20_000;

function corsHeaders(req: Request, env: Env): Record<string, string> {
  const origin = req.headers.get('Origin') ?? '';
  const allowed = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());
  return allowed.includes(origin)
    ? {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
        Vary: 'Origin',
      }
    : { Vary: 'Origin' };
}

const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'no-referrer',
  'Cache-Control': 'no-store',
};

const ADMIN_CSP =
  "default-src 'none'; script-src 'self'; style-src 'self'; connect-src 'self'; img-src 'self' data:; form-action 'self'; frame-ancestors 'none'; base-uri 'none'";

const jsonResponse = (r: HandlerResult, extra: Record<string, string> = {}) =>
  new Response(JSON.stringify(r.body), {
    status: r.status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...SECURITY_HEADERS, ...extra },
  });

async function readJson(req: Request): Promise<unknown> {
  const text = await req.text();
  if (text.length > MAX_BODY_BYTES) throw new Error('too_large');
  return JSON.parse(text);
}

async function hmacHex(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(data));
  return [...new Uint8Array(sig)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function makeDeps(env: Env, ctx: ExecutionContext): Deps {
  return {
    store: new D1Store(env.DB),
    now: () => new Date(),
    randomBytes: (n) => crypto.getRandomValues(new Uint8Array(n)),
    hmacHex,
    defer: (p) => ctx.waitUntil(p),
    async sendEmail(msg: EmailMessage) {
      if (!env.RESEND_API_KEY) throw new Error('RESEND_API_KEY not set');
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: env.FROM_EMAIL,
          to: msg.to,
          subject: msg.subject,
          html: msg.html,
          text: msg.text,
          ...(msg.replyTo ? { reply_to: msg.replyTo } : {}),
        }),
      });
      if (!res.ok) throw new Error(`resend ${res.status}: ${(await res.text()).slice(0, 200)}`);
    },
    async postWebhook(url, body, signature) {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 8000);
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', ...(signature ? { 'X-MTT-Signature': `sha256=${signature}` } : {}) },
          body,
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`webhook ${res.status}`);
      } finally {
        clearTimeout(timer);
      }
    },
    async verifyTurnstile(token, ip) {
      const form = new FormData();
      form.append('secret', env.TURNSTILE_SECRET_KEY ?? '');
      form.append('response', token);
      if (ip) form.append('remoteip', ip);
      const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form });
      const body = (await res.json()) as { success?: boolean };
      return body.success === true;
    },
  };
}

async function handleAdmin(req: Request, url: URL, env: Env, deps: Deps): Promise<Response> {
  const access = await verifyAccessJwt(readAccessToken(req), env.ACCESS_TEAM_DOMAIN, env.ACCESS_AUD);
  if (!access.ok) {
    const status = access.reason === 'access_not_configured' ? 503 : 403;
    return new Response(status === 503 ? 'Admin is locked: Cloudflare Access is not configured.' : 'Forbidden', {
      status,
      headers: { 'Content-Type': 'text/plain', ...SECURITY_HEADERS },
    });
  }
  const adminHeaders = { ...SECURITY_HEADERS, 'Content-Security-Policy': ADMIN_CSP, 'X-Frame-Options': 'DENY' };
  const path = url.pathname.replace(/\/$/, '');

  if (req.method === 'GET' && (path === '/admin' || path === '/admin/leads'))
    return new Response(ADMIN_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8', ...adminHeaders } });
  if (req.method === 'GET' && path === '/admin/app.js')
    return new Response(ADMIN_JS, { headers: { 'Content-Type': 'text/javascript; charset=utf-8', ...adminHeaders } });
  if (req.method === 'GET' && path === '/admin/app.css')
    return new Response(ADMIN_CSS, { headers: { 'Content-Type': 'text/css; charset=utf-8', ...adminHeaders } });
  if (req.method === 'GET' && path === '/admin/api/me') return jsonResponse({ status: 200, body: { email: access.email ?? null } }, adminHeaders);
  if (req.method === 'GET' && path === '/admin/api/leads') return jsonResponse(await handleAdminList(url.searchParams, deps), adminHeaders);
  if (req.method === 'GET' && path === '/admin/api/leads.csv') {
    const r = await handleAdminCsv(url.searchParams, deps);
    if (r.status !== 200) return new Response('Bad filter', { status: r.status, headers: adminHeaders });
    const month = url.searchParams.get('month') ?? 'all';
    return new Response(r.csv, {
      headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': `attachment; filename="leads-${month}.csv"`, ...adminHeaders },
    });
  }
  if (req.method === 'GET' && path === '/admin/api/subscribers.csv')
    return new Response(await handleAdminSubscribersCsv(deps), {
      headers: { 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="subscribers.csv"', ...adminHeaders },
    });

  const m = /^\/admin\/api\/leads\/([^/]+)\/status$/.exec(path);
  if (req.method === 'POST' && m) {
    // Same-origin only (blocks cross-site requests riding the Access cookie)
    if (req.headers.get('Origin') !== url.origin) return new Response('Forbidden', { status: 403, headers: adminHeaders });
    let body: unknown;
    try {
      body = await readJson(req);
    } catch {
      return jsonResponse({ status: 400, body: { ok: false, error: 'invalid_json' } }, adminHeaders);
    }
    return jsonResponse(await handleAdminStatus(decodeURIComponent(m[1]), body, deps), adminHeaders);
  }
  return new Response('Not found', { status: 404, headers: adminHeaders });
}

export default {
  async fetch(req: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(req.url);
    const deps = makeDeps(env, ctx);
    const ip = req.headers.get('CF-Connecting-IP') ?? '';

    if (url.pathname.startsWith('/admin')) return handleAdmin(req, url, env, deps);

    if (url.pathname === '/unsubscribe') {
      const html = { 'Content-Type': 'text/html; charset=utf-8', ...SECURITY_HEADERS };
      if (req.method === 'GET') {
        return new Response(UNSUBSCRIBE_HTML(url.searchParams.get('e') ?? '', url.searchParams.get('t') ?? '', false), { headers: html });
      }
      if (req.method === 'POST') {
        const form = await req.formData();
        const r = await handleUnsubscribe(String(form.get('e') ?? ''), String(form.get('t') ?? ''), env, deps);
        return r.status === 200
          ? new Response(UNSUBSCRIBE_HTML('', '', true), { headers: html })
          : new Response('This unsubscribe link is invalid.', { status: 400, headers: { 'Content-Type': 'text/plain', ...SECURITY_HEADERS } });
      }
    }

    const cors = corsHeaders(req, env);
    if (req.method === 'OPTIONS' && url.pathname.startsWith('/api/')) return new Response(null, { status: 204, headers: cors });

    if (req.method === 'GET' && url.pathname === '/api/health') {
      return jsonResponse({ status: 200, body: healthStatus(env) }, { ...cors, 'Cache-Control': 'no-store' });
    }

    if (req.method === 'POST' && (url.pathname === '/api/leads' || url.pathname === '/api/subscribe')) {
      if (!cors['Access-Control-Allow-Origin']) return new Response('Forbidden origin', { status: 403, headers: cors });
      let body: unknown;
      try {
        body = await readJson(req);
      } catch {
        return jsonResponse({ status: 400, body: { ok: false, error: 'invalid_json' } }, cors);
      }
      try {
        const r =
          url.pathname === '/api/leads'
            ? await handleLeadSubmission(body, ip, env, deps)
            : await handleSubscribe(body, ip, env, deps, url.origin);
        return jsonResponse(r, cors);
      } catch (e) {
        console.error('handler error', e);
        return jsonResponse({ status: 500, body: { ok: false, error: 'server_error' } }, cors);
      }
    }

    return new Response('Not found', { status: 404, headers: SECURITY_HEADERS });
  },

  /** Daily cron (wrangler.toml [triggers]): deletes data past the retention period in the Privacy Policy. */
  async scheduled(_event: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    const r = await runRetention(makeDeps(env, ctx));
    console.log(`retention: deleted ${r.leads} leads, ${r.subscribers} subscribers`);
  },
};
