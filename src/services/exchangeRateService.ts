/**
 * Bank of Thailand (BOT) Exchange Rate Service
 *
 * Fetches the BOT daily average exchange rate (THB per 1 unit of foreign currency).
 *
 * Requests go through our Cloudflare Worker proxy (cloudflare-worker/bot-proxy.js),
 * which holds the BOT API key as a server-side secret and adds it upstream. The key
 * is never part of this bundle. Environment variable: VITE_BOT_PROXY_URL.
 *
 * The BOT rate is a reference rate. RD Q&A Q12 says to convert at the exchange rate
 * on the date the money is brought into Thailand; it does not name a published rate.
 *
 * Caching: successful lookups are cached in sessionStorage to minimise API calls.
 */

const BOT_API_BASE = 'https://gateway.api.bot.or.th/Stat-ExchangeRate/v2';
const BOT_EXCHANGE_RATE_PATH = '/DAILY_AVG_EXG_RATE/';

const SESSION_CACHE_PREFIX = 'bot_fx_';

export interface ExchangeRateResult {
  fromCurrency: string;
  toCurrency: 'THB';
  rate: number; // 1 unit of fromCurrency in THB
  date: string; // YYYY-MM-DD — the actual rate date (may differ from requested if weekend/holiday)
  source: 'BOT';
}

export interface ExchangeRateError {
  type: 'network' | 'not_found' | 'unsupported_currency' | 'unknown';
  message: string;
}

export type ExchangeRateResponse =
  | { ok: true; data: ExchangeRateResult }
  | { ok: false; error: ExchangeRateError };

/**
 * Cache key for sessionStorage
 */
function cacheKey(currency: string, date: string): string {
  return `${SESSION_CACHE_PREFIX}${currency}_${date}`;
}

/**
 * Read a cached result from sessionStorage
 */
function readCache(currency: string, date: string): ExchangeRateResult | null {
  try {
    const raw = sessionStorage.getItem(cacheKey(currency, date));
    if (!raw) return null;
    return JSON.parse(raw) as ExchangeRateResult;
  } catch {
    return null;
  }
}

/**
 * Write a result to sessionStorage
 */
function writeCache(result: ExchangeRateResult): void {
  try {
    sessionStorage.setItem(
      cacheKey(result.fromCurrency, result.date),
      JSON.stringify(result)
    );
  } catch {
    // sessionStorage may be unavailable in some environments — ignore
  }
}

/**
 * Parse the BOT API response to extract the rate for a given currency.
 *
 * BOT API response shape (data_detail array):
 * {
 *   "period": "2024-01-15",
 *   "currency_id": "USD",
 *   "buying_transfer": "35.0000",
 *   "selling": "35.6000",
 *   "mid_rate": "35.3000"
 * }
 *
 * We use the `mid_rate` (average of buying and selling) as a reference rate.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function parseResponse(data: any, currency: string, requestedDate: string): ExchangeRateResult | null {
  try {
    const detail = data?.result?.data?.data_detail;
    if (!Array.isArray(detail) || detail.length === 0) return null;

    // Find the entry for the requested currency (case-insensitive)
    const match = detail.find(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (row: any) =>
        typeof row.currency_id === 'string' &&
        row.currency_id.toUpperCase() === currency.toUpperCase()
    );
    if (!match) return null;

    const rate = parseFloat(match.mid_rate ?? match.buying_transfer ?? match.selling);
    if (isNaN(rate) || rate <= 0) return null;

    // Use the period from the response (may differ from requested date if weekend)
    const actualDate: string = match.period ?? requestedDate;

    return {
      fromCurrency: currency.toUpperCase(),
      toCurrency: 'THB',
      rate,
      date: actualDate,
      source: 'BOT',
    };
  } catch {
    return null;
  }
}

/**
 * Find the most recent business day on or before the given date.
 * BOT only publishes rates on business days (Mon–Fri, excluding Thai holidays).
 * We try up to 7 days back to handle long weekends.
 */
function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

/**
 * Fetch the exchange rate for a given currency on a given date.
 *
 * @param currency - ISO 4217 currency code (e.g. "USD", "EUR")
 * @param date - YYYY-MM-DD format; uses the rate on this date (or nearest prior business day)
 */
export async function getExchangeRate(
  currency: string,
  date: string
): Promise<ExchangeRateResponse> {
  const upperCurrency = currency.toUpperCase();

  // THB → THB is always 1
  if (upperCurrency === 'THB') {
    return {
      ok: true,
      data: { fromCurrency: 'THB', toCurrency: 'THB', rate: 1, date, source: 'BOT' },
    };
  }

  // Check cache first
  const cached = readCache(upperCurrency, date);
  if (cached) return { ok: true, data: cached };

  const BOT_PROXY_URL = import.meta.env.VITE_BOT_PROXY_URL as string | undefined;
  if (!BOT_PROXY_URL) {
    return {
      ok: false,
      error: {
        type: 'network',
        message: 'BOT proxy not configured. Add VITE_BOT_PROXY_URL to your .env file.',
      },
    };
  }

  // BOT rates are only available for business days; try up to 7 days back
  const requestDate = new Date(date);
  let response: Response | null = null;
  let lastDate = date;

  for (let daysBack = 0; daysBack <= 7; daysBack++) {
    const tryDate = new Date(requestDate);
    tryDate.setDate(tryDate.getDate() - daysBack);
    const tryDateStr = formatDate(tryDate);

    const targetUrl = `${BOT_API_BASE}${BOT_EXCHANGE_RATE_PATH}?start_period=${tryDateStr}&end_period=${tryDateStr}`;
    const proxiedUrl = `${BOT_PROXY_URL}?url=${encodeURIComponent(targetUrl)}`;

    try {
      response = await fetch(proxiedUrl, {
        headers: { Accept: '*/*' },
      });

      if (response.ok) {
        lastDate = tryDateStr;
        break;
      }

      // 404 / no data for this date → try the previous day
      if (response.status === 404 || response.status === 204) {
        response = null;
        continue;
      }

      // Other errors (auth, server) — stop retrying
      break;
    } catch {
      // Network error
      return {
        ok: false,
        error: {
          type: 'network',
          message: 'Could not reach the BOT API. Please check your connection.',
        },
      };
    }
  }

  if (!response || !response.ok) {
    return {
      ok: false,
      error: {
        type: response?.status === 401 || response?.status === 403
          ? 'unknown'
          : 'not_found',
        message:
          response?.status === 401 || response?.status === 403
            ? 'The exchange-rate service is not available right now.'
            : `No exchange rate data available for ${currency} around ${date}.`,
      },
    };
  }

  let json: unknown;
  try {
    json = await response.json();
  } catch {
    return {
      ok: false,
      error: { type: 'unknown', message: 'Invalid response from BOT API.' },
    };
  }

  const result = parseResponse(json, upperCurrency, lastDate);
  if (!result) {
    return {
      ok: false,
      error: {
        type: 'unsupported_currency',
        message: `${currency} not found in BOT exchange rate data for ${date}. The BOT covers major currencies — please enter the THB amount manually.`,
      },
    };
  }

  writeCache(result);
  return { ok: true, data: result };
}

/**
 * Convert an amount in a foreign currency to THB using the BOT rate for a given date.
 *
 * @param amount - Amount in the source currency
 * @param currency - ISO 4217 currency code
 * @param date - YYYY-MM-DD date for the exchange rate
 * @returns THB amount (rounded to 2 decimal places) or null on error
 */
export async function convertToThb(
  amount: number,
  currency: string,
  date: string
): Promise<{ thbAmount: number; rate: ExchangeRateResult } | ExchangeRateError> {
  const rateResult = await getExchangeRate(currency, date);
  if (!rateResult.ok) return rateResult.error;

  return {
    thbAmount: Math.round(amount * rateResult.data.rate * 100) / 100,
    rate: rateResult.data,
  };
}
