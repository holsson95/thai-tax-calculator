/**
 * First-touch attribution for leads: UTM parameters, referrer and landing page,
 * captured once per browser session (sessionStorage) and sent only with a lead
 * the visitor chooses to submit.
 */
const KEY = 'mtt-attribution-v1';
const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid'] as const;

export interface Attribution {
  utm: Record<string, string>;
  referrer: string;
  landingPage: string;
}

export function parseUtm(search: string): Record<string, string> {
  const params = new URLSearchParams(search);
  const utm: Record<string, string> = {};
  for (const k of UTM_KEYS) {
    const v = params.get(k);
    if (v) utm[k] = v.slice(0, 200);
  }
  return utm;
}

/** Call on app start. Keeps the first capture of the session, but a later visit with UTMs replaces one without. */
export function captureAttribution(loc: { pathname: string; search: string }, referrer: string): void {
  try {
    const existing = getAttribution();
    const utm = parseUtm(loc.search);
    if (existing && (Object.keys(existing.utm).length > 0 || Object.keys(utm).length === 0)) return;
    const external = referrer && !/^https?:\/\/(www\.)?mythaitaxes\.com/i.test(referrer) ? referrer.slice(0, 500) : '';
    const value: Attribution = { utm, referrer: external, landingPage: loc.pathname.slice(0, 200) };
    window.sessionStorage.setItem(KEY, JSON.stringify(value));
  } catch {
    /* storage unavailable */
  }
}

export function getAttribution(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}
