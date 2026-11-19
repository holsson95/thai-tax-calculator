// @vitest-environment node
import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { verifyAccessJwt, readAccessToken, _resetAccessCertCache } from '../src/access';

const TEAM = 'myteam.cloudflareaccess.com';
const AUD = 'aud-123';
let keyPair: CryptoKeyPair;
let jwk: JsonWebKey;

const b64url = (bytes: Uint8Array | string) =>
  btoa(typeof bytes === 'string' ? bytes : String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

async function sign(payload: Record<string, unknown>, kid = 'k1', key: CryptoKey = keyPair.privateKey) {
  const h = b64url(JSON.stringify({ alg: 'RS256', kid, typ: 'JWT' }));
  const p = b64url(JSON.stringify(payload));
  const sig = new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(`${h}.${p}`)));
  return `${h}.${p}.${b64url(sig)}`;
}

const fetcher = (async () =>
  new Response(JSON.stringify({ keys: [{ ...jwk, kid: 'k1' }] }), { status: 200 })) as unknown as typeof fetch;

const NOW = 1_800_000_000;
const good = { aud: [AUD], exp: NOW + 600, iss: `https://${TEAM}`, email: 'owner@example.com' };

beforeAll(async () => {
  keyPair = (await crypto.subtle.generateKey(
    { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
    true,
    ['sign', 'verify']
  )) as CryptoKeyPair;
  jwk = await crypto.subtle.exportKey('jwk', keyPair.publicKey);
});
beforeEach(() => _resetAccessCertCache());

describe('verifyAccessJwt', () => {
  it('accepts a valid token and returns the email', async () => {
    const r = await verifyAccessJwt(await sign(good), TEAM, AUD, fetcher, NOW);
    expect(r).toEqual({ ok: true, email: 'owner@example.com' });
  });

  it('fails closed when Access is not configured', async () => {
    expect((await verifyAccessJwt(await sign(good), '', AUD, fetcher, NOW)).reason).toBe('access_not_configured');
    expect((await verifyAccessJwt(await sign(good), TEAM, undefined, fetcher, NOW)).reason).toBe('access_not_configured');
  });

  it('rejects missing, malformed, wrong-audience, expired, wrong-issuer and unknown-key tokens', async () => {
    expect((await verifyAccessJwt(null, TEAM, AUD, fetcher, NOW)).ok).toBe(false);
    expect((await verifyAccessJwt('a.b', TEAM, AUD, fetcher, NOW)).ok).toBe(false);
    expect((await verifyAccessJwt(await sign({ ...good, aud: ['other'] }), TEAM, AUD, fetcher, NOW)).reason).toBe('bad_aud');
    expect((await verifyAccessJwt(await sign({ ...good, exp: NOW - 1 }), TEAM, AUD, fetcher, NOW)).reason).toBe('expired');
    expect((await verifyAccessJwt(await sign({ ...good, iss: 'https://evil' }), TEAM, AUD, fetcher, NOW)).reason).toBe('bad_iss');
    expect((await verifyAccessJwt(await sign(good, 'k2'), TEAM, AUD, fetcher, NOW)).reason).toBe('unknown_kid');
  });

  it('rejects a token signed by a different key', async () => {
    const other = (await crypto.subtle.generateKey(
      { name: 'RSASSA-PKCS1-v1_5', modulusLength: 2048, publicExponent: new Uint8Array([1, 0, 1]), hash: 'SHA-256' },
      true,
      ['sign', 'verify']
    )) as CryptoKeyPair;
    expect((await verifyAccessJwt(await sign(good, 'k1', other.privateKey), TEAM, AUD, fetcher, NOW)).reason).toBe('bad_signature');
  });

  it('rejects alg confusion (HS256 / none)', async () => {
    const h = b64url(JSON.stringify({ alg: 'none', kid: 'k1' }));
    const p = b64url(JSON.stringify(good));
    expect((await verifyAccessJwt(`${h}.${p}.`, TEAM, AUD, fetcher, NOW)).reason).toBe('bad_alg');
  });
});

describe('readAccessToken', () => {
  it('reads the header or the CF_Authorization cookie', () => {
    expect(readAccessToken(new Request('https://x', { headers: { 'Cf-Access-Jwt-Assertion': 'h' } }))).toBe('h');
    expect(readAccessToken(new Request('https://x', { headers: { Cookie: 'a=1; CF_Authorization=c; b=2' } }))).toBe('c');
    expect(readAccessToken(new Request('https://x'))).toBeNull();
  });
});
