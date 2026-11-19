/**
 * Cloudflare Access JWT verification (defence in depth: Access already blocks
 * unauthenticated requests at the edge; this makes the Worker fail closed if
 * Access is ever misconfigured or the workers.dev route is exposed).
 * https://developers.cloudflare.com/cloudflare-one/identity/authorization-cookie/validating-json/
 */

interface Jwk {
  kid: string;
  kty: string;
  n: string;
  e: string;
  alg?: string;
}

let certCache: { teamDomain: string; keys: Jwk[]; fetchedAt: number } | null = null;

const b64urlToBytes = (s: string): Uint8Array => {
  const b64 = s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4);
  const bin = atob(b64);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
};

const decodeJson = (part: string): Record<string, unknown> => JSON.parse(new TextDecoder().decode(b64urlToBytes(part)));

export function readAccessToken(req: Request): string | null {
  const header = req.headers.get('Cf-Access-Jwt-Assertion');
  if (header) return header;
  const cookie = req.headers.get('Cookie') ?? '';
  const m = /(?:^|;\s*)CF_Authorization=([^;]+)/.exec(cookie);
  return m ? m[1] : null;
}

async function getKeys(teamDomain: string, fetcher: typeof fetch): Promise<Jwk[]> {
  if (certCache && certCache.teamDomain === teamDomain && Date.now() - certCache.fetchedAt < 3_600_000) return certCache.keys;
  const res = await fetcher(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!res.ok) throw new Error(`certs ${res.status}`);
  const body = (await res.json()) as { keys: Jwk[] };
  certCache = { teamDomain, keys: body.keys, fetchedAt: Date.now() };
  return body.keys;
}

export interface AccessCheck {
  ok: boolean;
  email?: string;
  reason?: string;
}

export async function verifyAccessJwt(
  token: string | null,
  teamDomain: string | undefined,
  aud: string | undefined,
  fetcher: typeof fetch = fetch,
  nowSec: number = Math.floor(Date.now() / 1000)
): Promise<AccessCheck> {
  if (!teamDomain || !aud) return { ok: false, reason: 'access_not_configured' };
  if (!token) return { ok: false, reason: 'missing_token' };
  const parts = token.split('.');
  if (parts.length !== 3) return { ok: false, reason: 'malformed' };
  try {
    const header = decodeJson(parts[0]);
    const payload = decodeJson(parts[1]);
    if (header.alg !== 'RS256') return { ok: false, reason: 'bad_alg' };
    const keys = await getKeys(teamDomain, fetcher);
    const jwk = keys.find((k) => k.kid === header.kid);
    if (!jwk) return { ok: false, reason: 'unknown_kid' };
    const key = await crypto.subtle.importKey(
      'jwk',
      { kty: jwk.kty, n: jwk.n, e: jwk.e, alg: 'RS256', ext: true },
      { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
      false,
      ['verify']
    );
    const valid = await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      key,
      b64urlToBytes(parts[2]),
      new TextEncoder().encode(`${parts[0]}.${parts[1]}`)
    );
    if (!valid) return { ok: false, reason: 'bad_signature' };
    const audClaim = payload.aud;
    const auds = Array.isArray(audClaim) ? audClaim : [audClaim];
    if (!auds.includes(aud)) return { ok: false, reason: 'bad_aud' };
    if (typeof payload.exp !== 'number' || payload.exp < nowSec) return { ok: false, reason: 'expired' };
    if (typeof payload.iss === 'string' && payload.iss !== `https://${teamDomain}`) return { ok: false, reason: 'bad_iss' };
    return { ok: true, email: typeof payload.email === 'string' ? payload.email : undefined };
  } catch (e) {
    return { ok: false, reason: `error: ${e instanceof Error ? e.message : 'unknown'}` };
  }
}

/** Test hook. */
export function _resetAccessCertCache() {
  certCache = null;
}
