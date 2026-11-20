import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  estimateRemittanceTax,
  ForeignIncomeType,
  RemittanceEstimateInput,
  RemittanceEstimateResult,
  RemittanceInput,
  RemittanceKind,
  RemittanceVisaType,
  YearEarned,
  YesNoUnsure,
} from '../../utils/remittanceEstimate';
import { RULES_TAX_YEAR, TAX_RULES } from '../../config/taxRules';
import { REMITTANCE_CALCULATOR_CONFIG } from '../../config/remittanceCalculator';
import { COMMON_CURRENCIES, EXTENDED_CURRENCIES } from '../../config/taxConfig';
import { ALL_COUNTRIES } from '../../data/dtaCountries';
import RemittanceResults from './RemittanceResults';
import LeadCTA from '../leads/LeadCTA';
import { leadContextFromRemittance } from '../../utils/leadContext';
import { track, taxBand } from '../../utils/analytics';
import Folder from './Folder';
import TransferMoneyFields from './TransferMoneyFields';
import { MoneyField, hintCls, inputCls, labelCls, toNumber } from './fields';
import { aboutSummary, thaiSummary, transferCardSummary, transfersSummary } from './folderSummaries';
import {
  ForeignTaxMoney,
  loadSavedState,
  newTransferMoney,
  SavedStateV2,
  STORAGE_KEY_V1,
  STORAGE_KEY_V2,
  thbAmounts,
  toThb,
  TransferMoney,
} from './transferMoney';

const INCOME_TYPE_LABELS: Record<ForeignIncomeType, string> = {
  employment: 'Employment / freelance',
  pension: 'Pension',
  dividends_interest: 'Dividends / interest',
  capital_gains: 'Capital gains',
  rental: 'Rental',
  other: 'Other',
};

const VISA_LABELS: Record<RemittanceVisaType, string> = {
  regular: 'Standard / work visa',
  retirement: 'Retirement (Non-O / O-A / O-X)',
  dtv: 'Destination Thailand Visa (DTV)',
  thailand_privilege: 'Thailand Privilege (Elite)',
  ltr_wealthy_global: 'LTR – Wealthy Global Citizen',
  ltr_wealthy_pensioner: 'LTR – Wealthy Pensioner',
  ltr_work_from_thailand: 'LTR – Work-from-Thailand Professional',
  ltr_highly_skilled: 'LTR – Highly-Skilled Professional',
  other: 'Other / not sure',
};

const KIND_LABELS: Record<RemittanceKind, { label: string; hint: string }> = {
  income: { label: 'Income', hint: 'Salary, pension, dividends, interest, rent or a realised gain' },
  capital: { label: 'Savings / capital', hint: 'Money you already had, or the original amount invested' },
  mixed: { label: 'Mixed / not sure', hint: 'Savings and income in the same account' },
};

const YEAR_OPTIONS: YearEarned[] = [
  'pre2024',
  ...Array.from(
    { length: RULES_TAX_YEAR - REMITTANCE_CALCULATOR_CONFIG.earliestIncomeYearOffered + 1 },
    (_, i) => REMITTANCE_CALCULATOR_CONFIG.earliestIncomeYearOffered + i
  ),
];

let idCounter = 0;
const newId = () => `r${Date.now().toString(36)}${(idCounter++).toString(36)}`;

const emptyRemittance = (): RemittanceInput => ({
  id: newId(),
  amountThb: 0,
  yearEarned: RULES_TAX_YEAR,
  kind: 'income',
  incomeType: 'employment',
  residentInYearEarned: 'yes',
});

const DEFAULT_INPUT: RemittanceEstimateInput = {
  daysInThailand: 0,
  visaType: 'regular',
  nationality: '',
  foreignIncomeTypes: [],
  remittances: [],
  thaiIncome: { annualSalary: 0, socialSecurityPaid: 0, otherThaiIncome: 0 },
  foreignTaxPaidThb: 0,
};

const freshState = (): SavedStateV2 => {
  const r = emptyRemittance();
  return {
    input: { ...DEFAULT_INPUT, remittances: [r] },
    money: { [r.id]: newTransferMoney('THB') },
    foreignTax: { currency: 'THB', amount: 0, rate: 1 },
  };
};

function loadInitial(): SavedStateV2 {
  if (typeof window === 'undefined') return freshState();
  try {
    const s =
      loadSavedState(window.sessionStorage.getItem(STORAGE_KEY_V2)) ??
      loadSavedState(window.sessionStorage.getItem(STORAGE_KEY_V1));
    if (!s) return freshState();
    // Fill gaps (older saves, missing money rows) so every transfer has a money record.
    const input = { ...DEFAULT_INPUT, ...s.input };
    const money = { ...s.money };
    for (const r of input.remittances) money[r.id] ??= { ...newTransferMoney('THB'), amount: r.amountThb };
    return { input, money, foreignTax: s.foreignTax };
  } catch {
    return freshState();
  }
}

const foreignTaxThb = (t: ForeignTaxMoney): number => (t.currency === 'THB' ? t.amount : toThb(t.amount, t.rate) ?? 0);

/** Focus an element by id once the DOM has painted (folders may have just opened). */
const focusById = (id: string) =>
  requestAnimationFrame(() => {
    const el = document.getElementById(id);
    el?.focus();
    el?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
  });

const chipCls = (on: boolean) =>
  `cursor-pointer select-none rounded-full border px-3 py-1.5 text-sm transition-colors focus-within:ring-2 focus-within:ring-desk focus-within:ring-offset-1 ${
    on ? 'bg-desk border-desk text-white' : 'bg-white border-ink/30 text-ink hover:border-desk'
  }`;
const optionCls = (on: boolean) =>
  `cursor-pointer rounded-md border text-sm focus-within:ring-2 focus-within:ring-desk focus-within:ring-offset-1 ${
    on ? 'border-desk bg-white ring-1 ring-desk' : 'border-ink/25 bg-white/60 hover:bg-white'
  }`;

type FolderKey = 'about' | 'money' | 'thai';

export interface ForeignIncomeCalculatorProps {
  /** Called each time the user runs the estimate (used for analytics and the lead form in later phases). */
  onEstimate?: (input: RemittanceEstimateInput, result: RemittanceEstimateResult) => void;
  /** Rendered below the results (lead CTA slot). */
  renderAfterResults?: (input: RemittanceEstimateInput, result: RemittanceEstimateResult) => React.ReactNode;
}

const ForeignIncomeCalculator: React.FC<ForeignIncomeCalculatorProps> = ({ onEstimate, renderAfterResults }) => {
  const [initial] = useState(loadInitial);
  const [input, setInput] = useState<RemittanceEstimateInput>(initial.input);
  const [money, setMoney] = useState<Record<string, TransferMoney>>(initial.money);
  const [foreignTax, setForeignTax] = useState<ForeignTaxMoney>(initial.foreignTax);
  const [taxRateText, setTaxRateText] = useState(
    initial.foreignTax.currency !== 'THB' && initial.foreignTax.rate ? String(initial.foreignTax.rate) : ''
  );
  const [open, setOpen] = useState<Record<FolderKey, boolean>>({ about: true, money: true, thai: false });
  const [cardOpen, setCardOpen] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const tabRefs = { about: useRef<HTMLButtonElement>(null), money: useRef<HTMLButtonElement>(null), thai: useRef<HTMLButtonElement>(null) };

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY_V2, JSON.stringify({ input, money, foreignTax }));
    } catch {
      /* storage unavailable (private mode) — calculator still works */
    }
  }, [input, money, foreignTax]);

  const result = useMemo(() => estimateRemittanceTax(input), [input]);
  const leadContext = useMemo(() => leadContextFromRemittance(input, result), [input, result]);
  const isResident = input.daysInThailand >= TAX_RULES.residencyDays.value;
  const lastCurrency = useRef(Object.values(initial.money).slice(-1)[0]?.currency ?? 'THB');

  const set = <K extends keyof RemittanceEstimateInput>(key: K, value: RemittanceEstimateInput[K]) =>
    setInput((prev) => ({ ...prev, [key]: value }));
  const setThai = (key: keyof RemittanceEstimateInput['thaiIncome'], value: number) =>
    setInput((prev) => ({ ...prev, thaiIncome: { ...prev.thaiIncome, [key]: value } }));
  const updateRemittance = (id: string, patch: Partial<RemittanceInput>) =>
    setInput((prev) => ({
      ...prev,
      remittances: prev.remittances.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  const toggleIncomeType = (t: ForeignIncomeType) =>
    set(
      'foreignIncomeTypes',
      input.foreignIncomeTypes.includes(t) ? input.foreignIncomeTypes.filter((x) => x !== t) : [...input.foreignIncomeTypes, t]
    );

  /** Store what the user typed and hand the engine baht (0 until a foreign amount has a rate). */
  const updateMoney = (id: string, m: TransferMoney) => {
    lastCurrency.current = m.currency;
    setMoney((prev) => ({ ...prev, [id]: m }));
    const thb = thbAmounts(m);
    updateRemittance(id, { amountThb: thb?.amountThb ?? 0, incomePortionThb: thb?.incomePortionThb });
  };

  const updateForeignTax = (patch: Partial<ForeignTaxMoney>) => {
    let next = { ...foreignTax, ...patch };
    if (patch.currency !== undefined) {
      // Reuse a rate the user already has for this currency on a transfer, if any.
      const known = patch.currency === 'THB' ? 1 : Object.values(money).find((m) => m.currency === patch.currency && m.rate)?.rate ?? null;
      next = { ...next, rate: known };
      setTaxRateText(patch.currency !== 'THB' && known ? String(known) : '');
    }
    setForeignTax(next);
    set('foreignTaxPaidThb', foreignTaxThb(next));
  };

  const addTransfer = () => {
    const r = emptyRemittance();
    setMoney((prev) => ({ ...prev, [r.id]: newTransferMoney(lastCurrency.current) }));
    set('remittances', [...input.remittances, r]);
  };
  const removeTransfer = (id: string) => {
    set('remittances', input.remittances.filter((x) => x.id !== id));
    setMoney((prev) => {
      const { [id]: _removed, ...rest } = prev;
      return rest;
    });
  };

  const toggle = (k: FolderKey) => setOpen((o) => ({ ...o, [k]: !o[k] }));
  const goNext = (from: FolderKey, to: FolderKey) => {
    setOpen((o) => ({ ...o, [from]: false, [to]: true }));
    requestAnimationFrame(() => tabRefs[to].current?.focus());
  };

  const fail = (message: string, folder: FolderKey, fieldId: string) => {
    setError(message);
    setOpen((o) => ({ ...o, [folder]: true }));
    focusById(fieldId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.daysInThailand <= 0 || input.daysInThailand > 366) {
      fail('Enter the number of days you spent in Thailand this year (1–366).', 'about', 'fic-days');
      return;
    }
    const missingRate = input.remittances.findIndex((r) => money[r.id] && thbAmounts(money[r.id]) === null);
    if (missingRate >= 0) {
      const id = input.remittances[missingRate].id;
      setCardOpen((c) => ({ ...c, [id]: true }));
      fail(`Enter the exchange rate for transfer ${missingRate + 1}.`, 'money', `${id}-rate`);
      return;
    }
    const hasAmount =
      input.remittances.some((r) => r.amountThb > 0) ||
      input.thaiIncome.annualSalary > 0 ||
      input.thaiIncome.otherThaiIncome > 0;
    if (!hasAmount) {
      const first = input.remittances[0];
      fail('Enter at least one amount brought into Thailand, or Thai income.', 'money', first ? `${first.id}-amount` : 'fic-add-transfer');
      return;
    }
    setError(null);
    setSubmitted(true);
    track('foreign_calc_completed', {
      calculator: 'foreign_income',
      is_resident: result.residency.isResident,
      flag_count: result.flags.length,
      tax_band: taxBand(result.estimatedTaxThb),
    });
    onEstimate?.(input, result);
    requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }));
  };

  const handleReset = () => {
    const s = freshState();
    setInput(s.input);
    setMoney(s.money);
    setForeignTax(s.foreignTax);
    setTaxRateText('');
    lastCurrency.current = 'THB';
    setCardOpen({});
    setOpen({ about: true, money: true, thai: false });
    setSubmitted(false);
    setError(null);
  };

  const totalThb = input.remittances.reduce((sum, r) => sum + r.amountThb, 0);
  const transferLabels = Object.fromEntries(
    input.remittances
      .filter((r) => money[r.id] && money[r.id].currency !== 'THB')
      .map((r) => [r.id, `${money[r.id].currency} ${money[r.id].amount.toLocaleString('en-US')}`])
  );
  const taxCurrencyPrefix = foreignTax.currency === 'THB' ? '฿' : foreignTax.currency;

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <Folder
          ref={tabRefs.about}
          id="fic-about"
          title={`About you in ${RULES_TAX_YEAR}`}
          summary={aboutSummary(input, VISA_LABELS[input.visaType])}
          paper="bg-paper-white"
          open={open.about}
          onToggle={() => toggle('about')}
          next={{ label: 'Money brought in', onClick: () => goNext('about', 'money') }}
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="fic-days" className={labelCls}>
                Days in Thailand this year
              </label>
              <input
                id="fic-days"
                type="number"
                inputMode="numeric"
                min={0}
                max={366}
                className={inputCls}
                value={input.daysInThailand || ''}
                placeholder="e.g. 200"
                onChange={(e) => set('daysInThailand', Math.min(366, toNumber(e.target.value)))}
                aria-describedby="fic-days-status"
              />
              <p id="fic-days-status" className="text-xs mt-1" aria-live="polite">
                {input.daysInThailand > 0 ? (
                  <span className="font-semibold text-ink">
                    {isResident
                      ? `Thai tax resident (${TAX_RULES.residencyDays.value}+ days)`
                      : `Non-resident (under ${TAX_RULES.residencyDays.value} days)`}
                  </span>
                ) : (
                  <span className="text-ink-mute">Total days in the calendar year, all trips combined.</span>
                )}
              </p>
            </div>
            <div>
              <label htmlFor="fic-visa" className={labelCls}>
                Visa type
              </label>
              <select
                id="fic-visa"
                className={inputCls}
                value={input.visaType}
                onChange={(e) => set('visaType', e.target.value as RemittanceVisaType)}
              >
                {(Object.keys(VISA_LABELS) as RemittanceVisaType[]).map((v) => (
                  <option key={v} value={v}>
                    {VISA_LABELS[v]}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="fic-nationality" className={labelCls}>
                Nationality
              </label>
              <select
                id="fic-nationality"
                className={inputCls}
                value={input.nationality}
                onChange={(e) => set('nationality', e.target.value)}
              >
                <option value="">Select…</option>
                {ALL_COUNTRIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <p className={labelCls} id="fic-types-label">
              Foreign income you have (tick all that apply)
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="fic-types-label">
              {(Object.keys(INCOME_TYPE_LABELS) as ForeignIncomeType[]).map((t) => {
                const on = input.foreignIncomeTypes.includes(t);
                return (
                  <label key={t} className={chipCls(on)}>
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleIncomeType(t)} />
                    {INCOME_TYPE_LABELS[t]}
                  </label>
                );
              })}
            </div>
          </div>
        </Folder>

        <Folder
          ref={tabRefs.money}
          id="fic-money"
          title={`Money brought in during ${RULES_TAX_YEAR}`}
          summary={transfersSummary(totalThb, input.remittances.length)}
          paper="bg-paper-canary"
          open={open.money}
          onToggle={() => toggle('money')}
          next={{ label: 'Thai income', onClick: () => goNext('money', 'thai') }}
        >
          <p className="text-sm text-ink-soft mb-4 max-w-prose">
            Add each transfer, or group similar ones, in the currency you sent. If you already know the baht amount your
            Thai bank credited, choose THB and enter that.
          </p>
          <ol className="space-y-3">
            {input.remittances.map((r, i) => {
              const m = money[r.id] ?? newTransferMoney('THB');
              const isOpen = cardOpen[r.id] ?? true;
              const askResidency = r.yearEarned !== 'pre2024' && r.yearEarned !== RULES_TAX_YEAR && r.kind !== 'capital';
              return (
                <li key={r.id} className="rounded-sm bg-white/55 ring-1 ring-ink/15">
                  <div className="flex items-center justify-between gap-3 px-3 py-2 sm:px-4">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`${r.id}-body`}
                      onClick={() => setCardOpen((c) => ({ ...c, [r.id]: !isOpen }))}
                      className="min-w-0 flex-1 py-1 text-left text-sm font-bold text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk"
                    >
                      {isOpen ? `Transfer ${i + 1}` : transferCardSummary(i, m, KIND_LABELS[r.kind].label)}
                    </button>
                    {input.remittances.length > 1 && (
                      <button
                        type="button"
                        className="shrink-0 text-sm font-medium text-stamp-deep hover:underline"
                        onClick={() => removeTransfer(r.id)}
                        aria-label={`Remove transfer ${i + 1}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div id={`${r.id}-body`} hidden={!isOpen} className="border-t border-ink/10 px-3 pb-4 pt-3 sm:px-4">
                    <TransferMoneyFields
                      idPrefix={r.id}
                      value={m}
                      onChange={(next) => updateMoney(r.id, next)}
                      showIncomePortion={r.kind === 'mixed'}
                    />
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <label htmlFor={`${r.id}-year`} className={labelCls}>
                          Year the money was earned
                        </label>
                        <select
                          id={`${r.id}-year`}
                          className={inputCls}
                          value={String(r.yearEarned)}
                          onChange={(e) =>
                            updateRemittance(r.id, {
                              yearEarned: e.target.value === 'pre2024' ? 'pre2024' : Number(e.target.value),
                            })
                          }
                        >
                          {YEAR_OPTIONS.map((y) => (
                            <option key={String(y)} value={String(y)}>
                              {y === 'pre2024' ? 'Before 2024' : y}
                            </option>
                          ))}
                        </select>
                      </div>
                      {r.kind !== 'capital' && (
                        <div>
                          <label htmlFor={`${r.id}-type`} className={labelCls}>
                            Income type
                          </label>
                          <select
                            id={`${r.id}-type`}
                            className={inputCls}
                            value={r.incomeType}
                            onChange={(e) => updateRemittance(r.id, { incomeType: e.target.value as ForeignIncomeType })}
                          >
                            {(Object.keys(INCOME_TYPE_LABELS) as ForeignIncomeType[]).map((t) => (
                              <option key={t} value={t}>
                                {INCOME_TYPE_LABELS[t]}
                              </option>
                            ))}
                          </select>
                          {r.incomeType === 'capital_gains' && (
                            <p className={hintCls}>Enter the gain (sale price minus cost), not the full proceeds.</p>
                          )}
                        </div>
                      )}
                      <div className="sm:col-span-2">
                        <p className={labelCls} id={`${r.id}-kind-label`}>
                          What is this money?
                        </p>
                        <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-labelledby={`${r.id}-kind-label`}>
                          {(Object.keys(KIND_LABELS) as RemittanceKind[]).map((k) => (
                            <label key={k} className={`${optionCls(r.kind === k)} p-2.5`}>
                              <input
                                type="radio"
                                name={`${r.id}-kind`}
                                className="sr-only"
                                checked={r.kind === k}
                                onChange={() => updateRemittance(r.id, { kind: k })}
                              />
                              <span className="block font-semibold text-ink">{KIND_LABELS[k].label}</span>
                              <span className="block text-xs text-ink-mute">{KIND_LABELS[k].hint}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      {askResidency && (
                        <div className="sm:col-span-2">
                          <p className={labelCls} id={`${r.id}-res-label`}>
                            Were you in Thailand {TAX_RULES.residencyDays.value}+ days in {String(r.yearEarned)}?
                          </p>
                          <div className="flex gap-2" role="radiogroup" aria-labelledby={`${r.id}-res-label`}>
                            {(['yes', 'no', 'unsure'] as YesNoUnsure[]).map((v) => (
                              <label key={v} className={`${optionCls(r.residentInYearEarned === v)} px-3 py-1.5`}>
                                <input
                                  type="radio"
                                  name={`${r.id}-res`}
                                  className="sr-only"
                                  checked={r.residentInYearEarned === v}
                                  onChange={() => updateRemittance(r.id, { residentInYearEarned: v })}
                                />
                                {v === 'yes' ? 'Yes' : v === 'no' ? 'No' : 'Not sure'}
                              </label>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <button
            id="fic-add-transfer"
            type="button"
            className="mt-4 text-sm font-semibold text-desk hover:underline"
            onClick={addTransfer}
          >
            + Add another transfer
          </button>

          <div className="mt-6 border-t border-ink/15 pt-5">
            <div className="grid gap-3 sm:grid-cols-2">
              <MoneyField
                id="fic-foreign-tax"
                label="Foreign tax already paid on this money (optional)"
                prefix={taxCurrencyPrefix}
                value={foreignTax.amount}
                onChange={(n) => updateForeignTax({ amount: n })}
                hint="Not deducted here; a tax treaty credit may apply."
              />
              <div>
                <label htmlFor="fic-foreign-tax-currency" className={labelCls}>
                  Currency of foreign tax
                </label>
                <select
                  id="fic-foreign-tax-currency"
                  className={inputCls}
                  value={foreignTax.currency}
                  onChange={(e) => updateForeignTax({ currency: e.target.value })}
                >
                  <option value="THB">THB - Thai Baht</option>
                  {[...COMMON_CURRENCIES.filter((c) => c.code !== 'THB'), ...EXTENDED_CURRENCIES].map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} - {c.name}
                    </option>
                  ))}
                </select>
              </div>
              {foreignTax.currency !== 'THB' && (
                <div>
                  <label htmlFor="fic-foreign-tax-rate" className={labelCls}>
                    Rate for foreign tax (฿ per 1 {foreignTax.currency})
                  </label>
                  <input
                    id="fic-foreign-tax-rate"
                    type="text"
                    inputMode="decimal"
                    autoComplete="off"
                    className={`${inputCls} font-mono`}
                    value={taxRateText}
                    placeholder="e.g. 45.00"
                    onChange={(e) => {
                      setTaxRateText(e.target.value);
                      const n = Number(e.target.value.replace(/,/g, ''));
                      updateForeignTax({ rate: Number.isFinite(n) && n > 0 ? n : null });
                    }}
                  />
                </div>
              )}
              {foreignTax.currency !== 'THB' && foreignTax.amount > 0 && foreignTax.rate && (
                <p className="self-end pb-3 font-mono text-sm text-ink">≈ ฿{foreignTaxThb(foreignTax).toLocaleString('en-US')} (approximate)</p>
              )}
            </div>
          </div>
        </Folder>

        <Folder
          ref={tabRefs.thai}
          id="fic-thai"
          title="Thai income (optional)"
          summary={thaiSummary(input.thaiIncome)}
          paper="bg-paper-pink"
          open={open.thai}
          onToggle={() => toggle('thai')}
        >
          <p className="text-sm text-ink-soft mb-4">
            Thai-source income is added to remitted income before the tax brackets apply.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <MoneyField id="fic-thai-salary" label="Thai salary (per year)" value={input.thaiIncome.annualSalary} onChange={(n) => setThai('annualSalary', n)} />
            <MoneyField id="fic-thai-sso" label="Social security paid" value={input.thaiIncome.socialSecurityPaid} onChange={(n) => setThai('socialSecurityPaid', n)} />
            <MoneyField id="fic-thai-other" label="Other Thai income" value={input.thaiIncome.otherThaiIncome} onChange={(n) => setThai('otherThaiIncome', n)} />
          </div>
        </Folder>

        {error && (
          <p role="alert" className="rounded-sm border-l-4 border-stamp bg-paper-white p-3 text-sm font-semibold text-stamp-deep shadow-sheet">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 pt-1 sm:flex-row">
          <button
            type="submit"
            className="w-full rounded-md bg-desk px-6 py-3 font-bold text-white hover:bg-desk-deep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-desk sm:w-auto"
          >
            Estimate my tax
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="w-full rounded-md border border-ink/30 bg-paper-white px-6 py-3 font-semibold text-ink hover:bg-white sm:w-auto"
          >
            Start over
          </button>
        </div>
      </form>

      {submitted && (
        <div ref={resultsRef} className="mt-8 scroll-mt-4">
          <div className="flex">
            <span className="rounded-t-md bg-paper-sky px-4 pb-2 pt-2.5 text-sm font-bold text-ink sm:text-[15px]">Your estimate</span>
          </div>
          <div className="rounded-b-sm rounded-tr-md bg-paper-sky p-3 shadow-sheet sm:p-5">
            <RemittanceResults result={result} transferLabels={transferLabels} />
          </div>
          {renderAfterResults ? renderAfterResults(input, result) : <LeadCTA context={leadContext} />}
        </div>
      )}
    </div>
  );
};

export default ForeignIncomeCalculator;
