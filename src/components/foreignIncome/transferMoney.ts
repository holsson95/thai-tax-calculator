import type { RemittanceEstimateInput } from '../../utils/remittanceEstimate';

/**
 * Form-side money for one transfer. The tax engine only sees baht (`amountThb`);
 * this layer keeps what the user typed (currency, amount, date, rate) and converts.
 * RD Q&A Q12: convert at the exchange rate on the date the money is brought in.
 */
export type RateSource = 'bot' | 'user';

export interface TransferMoney {
  /** ISO code; 'THB' means no conversion. */
  currency: string;
  /** Amount in `currency`. */
  amount: number;
  /** Only for kind === 'mixed': the income or gain part, in `currency`. */
  incomePortion?: number;
  /** YYYY-MM-DD the money was brought into Thailand, '' if not set. */
  date: string;
  /** THB per 1 unit of `currency`; 1 for THB. */
  rate: number | null;
  rateSource: RateSource | null;
  /** Actual BOT publication date (may be an earlier business day). */
  rateDate?: string;
}

export interface ForeignTaxMoney {
  currency: string;
  amount: number;
  rate: number | null;
}

export interface SavedStateV2 {
  input: RemittanceEstimateInput;
  money: Record<string, TransferMoney>;
  foreignTax: ForeignTaxMoney;
}

export const STORAGE_KEY_V1 = 'mtt-foreign-income-calculator-v1';
export const STORAGE_KEY_V2 = 'mtt-foreign-income-calculator-v2';

/** Whole baht, or null when there is no usable rate. */
export function toThb(amount: number, rate: number | null): number | null {
  if (rate === null || !(rate > 0)) return null;
  return Math.round(amount * rate);
}

/** Baht figures for the engine, or null when a foreign amount still needs a rate. */
export function thbAmounts(m: TransferMoney): { amountThb: number; incomePortionThb?: number } | null {
  if (!(m.amount > 0)) return { amountThb: 0 };
  const rate = m.currency === 'THB' ? 1 : m.rate;
  const amountThb = toThb(m.amount, rate);
  if (amountThb === null) return null;
  const out: { amountThb: number; incomePortionThb?: number } = { amountThb };
  if (m.incomePortion !== undefined && m.incomePortion > 0) out.incomePortionThb = toThb(m.incomePortion, rate)!;
  return out;
}

export function newTransferMoney(currency: string): TransferMoney {
  return { currency, amount: 0, date: '', rate: currency === 'THB' ? 1 : null, rateSource: null };
}

const isObject = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null;

/** Parse saved state: v2 as-is, or a v1 engine input migrated to THB transfers. */
export function loadSavedState(raw: string | null): SavedStateV2 | null {
  if (!raw) return null;
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return null;
  }
  if (!isObject(parsed)) return null;

  if (isObject(parsed.money) && isObject(parsed.input) && Array.isArray(parsed.input.remittances)) {
    return parsed as unknown as SavedStateV2;
  }

  if (Array.isArray(parsed.remittances)) {
    const input = parsed as unknown as RemittanceEstimateInput;
    const money: Record<string, TransferMoney> = {};
    for (const r of input.remittances) {
      money[r.id] = {
        ...newTransferMoney('THB'),
        amount: r.amountThb,
        ...(r.incomePortionThb !== undefined ? { incomePortion: r.incomePortionThb } : {}),
      };
    }
    return { input, money, foreignTax: { currency: 'THB', amount: input.foreignTaxPaidThb ?? 0, rate: 1 } };
  }
  return null;
}
