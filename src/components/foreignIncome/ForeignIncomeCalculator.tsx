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
import { ALL_COUNTRIES } from '../../data/dtaCountries';
import RemittanceResults from './RemittanceResults';
import LeadCTA from '../leads/LeadCTA';
import { leadContextFromRemittance } from '../../utils/leadContext';
import { track, taxBand } from '../../utils/analytics';

const STORAGE_KEY = 'mtt-foreign-income-calculator-v1';

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

function loadSaved(): RemittanceEstimateInput | null {
  try {
    const raw = typeof window !== 'undefined' ? window.sessionStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return null;
    const parsed = JSON.parse(raw) as RemittanceEstimateInput;
    return Array.isArray(parsed.remittances) ? { ...DEFAULT_INPUT, ...parsed } : null;
  } catch {
    return null;
  }
}

const toNumber = (v: string): number => {
  const n = Number(v.replace(/,/g, ''));
  return Number.isFinite(n) && n >= 0 ? n : 0;
};

const inputCls =
  'w-full px-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent';
const labelCls = 'block text-sm font-medium text-gray-800 mb-1';

interface MoneyFieldProps {
  id: string;
  label: string;
  value: number;
  onChange: (n: number) => void;
  hint?: string;
}

const MoneyField: React.FC<MoneyFieldProps> = ({ id, label, value, onChange, hint }) => (
  <div>
    <label htmlFor={id} className={labelCls}>
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 select-none" aria-hidden="true">
        ฿
      </span>
      <input
        id={id}
        type="text"
        inputMode="decimal"
        autoComplete="off"
        className={`${inputCls} pl-7`}
        value={value ? value.toLocaleString('en-US') : ''}
        placeholder="0"
        onChange={(e) => onChange(toNumber(e.target.value))}
        aria-describedby={hint ? `${id}-hint` : undefined}
      />
    </div>
    {hint && (
      <p id={`${id}-hint`} className="text-xs text-gray-500 mt-1">
        {hint}
      </p>
    )}
  </div>
);

export interface ForeignIncomeCalculatorProps {
  /** Called each time the user runs the estimate (used for analytics and the lead form in later phases). */
  onEstimate?: (input: RemittanceEstimateInput, result: RemittanceEstimateResult) => void;
  /** Rendered below the results (lead CTA slot). */
  renderAfterResults?: (input: RemittanceEstimateInput, result: RemittanceEstimateResult) => React.ReactNode;
}

const ForeignIncomeCalculator: React.FC<ForeignIncomeCalculatorProps> = ({ onEstimate, renderAfterResults }) => {
  const [input, setInput] = useState<RemittanceEstimateInput>(() => loadSaved() ?? { ...DEFAULT_INPUT, remittances: [emptyRemittance()] });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(input));
    } catch {
      /* storage unavailable (private mode) — calculator still works */
    }
  }, [input]);

  const result = useMemo(() => estimateRemittanceTax(input), [input]);
  const leadContext = useMemo(() => leadContextFromRemittance(input, result), [input, result]);
  const isResident = input.daysInThailand >= TAX_RULES.residencyDays.value;

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.daysInThailand <= 0 || input.daysInThailand > 366) {
      setError('Enter the number of days you spent in Thailand this year (1–366).');
      return;
    }
    const hasAmount =
      input.remittances.some((r) => r.amountThb > 0) ||
      input.thaiIncome.annualSalary > 0 ||
      input.thaiIncome.otherThaiIncome > 0;
    if (!hasAmount) {
      setError('Enter at least one amount brought into Thailand, or Thai income.');
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
    setInput({ ...DEFAULT_INPUT, remittances: [emptyRemittance()] });
    setSubmitted(false);
    setError(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        {/* Step 1 */}
        <fieldset className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <legend className="text-base font-semibold text-gray-900 px-1">1. About you in {RULES_TAX_YEAR}</legend>
          <div className="grid gap-4 sm:grid-cols-2 mt-2">
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
                  isResident ? (
                    <span className="text-amber-700 font-medium">
                      Thai tax resident ({TAX_RULES.residencyDays.value}+ days)
                    </span>
                  ) : (
                    <span className="text-green-700 font-medium">
                      Non-resident (under {TAX_RULES.residencyDays.value} days)
                    </span>
                  )
                ) : (
                  <span className="text-gray-500">Total days in the calendar year, all trips combined.</span>
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
            <MoneyField
              id="fic-foreign-tax"
              label="Foreign tax already paid on this money (optional)"
              value={input.foreignTaxPaidThb}
              onChange={(n) => set('foreignTaxPaidThb', n)}
              hint="Not deducted here; a tax treaty credit may apply."
            />
          </div>
          <div className="mt-4">
            <p className={labelCls} id="fic-types-label">
              Foreign income you have (tick all that apply)
            </p>
            <div className="flex flex-wrap gap-2" role="group" aria-labelledby="fic-types-label">
              {(Object.keys(INCOME_TYPE_LABELS) as ForeignIncomeType[]).map((t) => {
                const on = input.foreignIncomeTypes.includes(t);
                return (
                  <label
                    key={t}
                    className={`cursor-pointer select-none rounded-full border px-3 py-1.5 text-sm transition-colors focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 ${
                      on ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-gray-700 hover:border-blue-400'
                    }`}
                  >
                    <input type="checkbox" className="sr-only" checked={on} onChange={() => toggleIncomeType(t)} />
                    {INCOME_TYPE_LABELS[t]}
                  </label>
                );
              })}
            </div>
          </div>
        </fieldset>

        {/* Step 2 */}
        <fieldset className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
          <legend className="text-base font-semibold text-gray-900 px-1">2. Money brought into Thailand in {RULES_TAX_YEAR}</legend>
          <p className="text-sm text-gray-600 mt-1 mb-4">
            Add each transfer, or group similar ones. Use baht at the exchange rate on the transfer date.
          </p>
          <ol className="space-y-4">
            {input.remittances.map((r, i) => {
              const askResidency = r.yearEarned !== 'pre2024' && r.yearEarned !== RULES_TAX_YEAR && r.kind !== 'capital';
              return (
                <li key={r.id} className="rounded-lg border border-gray-200 bg-gray-50 p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-800">Transfer {i + 1}</span>
                    {input.remittances.length > 1 && (
                      <button
                        type="button"
                        className="text-sm text-red-600 hover:underline"
                        onClick={() => set('remittances', input.remittances.filter((x) => x.id !== r.id))}
                        aria-label={`Remove transfer ${i + 1}`}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <MoneyField
                      id={`${r.id}-amount`}
                      label="Amount (THB)"
                      value={r.amountThb}
                      onChange={(n) => updateRemittance(r.id, { amountThb: n })}
                    />
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
                    <div className="sm:col-span-2">
                      <p className={labelCls} id={`${r.id}-kind-label`}>
                        What is this money?
                      </p>
                      <div className="grid gap-2 sm:grid-cols-3" role="radiogroup" aria-labelledby={`${r.id}-kind-label`}>
                        {(Object.keys(KIND_LABELS) as RemittanceKind[]).map((k) => (
                          <label
                            key={k}
                            className={`cursor-pointer rounded-lg border p-2.5 text-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 ${
                              r.kind === k ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-300 bg-white'
                            }`}
                          >
                            <input
                              type="radio"
                              name={`${r.id}-kind`}
                              className="sr-only"
                              checked={r.kind === k}
                              onChange={() => updateRemittance(r.id, { kind: k })}
                            />
                            <span className="block font-medium text-gray-900">{KIND_LABELS[k].label}</span>
                            <span className="block text-xs text-gray-500">{KIND_LABELS[k].hint}</span>
                          </label>
                        ))}
                      </div>
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
                          <p className="text-xs text-gray-500 mt-1">Enter the gain (sale price minus cost), not the full proceeds.</p>
                        )}
                      </div>
                    )}
                    {r.kind === 'mixed' && (
                      <MoneyField
                        id={`${r.id}-portion`}
                        label="Income or gain part, if known"
                        value={r.incomePortionThb ?? 0}
                        onChange={(n) => updateRemittance(r.id, { incomePortionThb: n || undefined })}
                        hint="Leave blank to count the whole amount (cautious)."
                      />
                    )}
                    {askResidency && (
                      <div className="sm:col-span-2">
                        <p className={labelCls} id={`${r.id}-res-label`}>
                          Were you in Thailand {TAX_RULES.residencyDays.value}+ days in {String(r.yearEarned)}?
                        </p>
                        <div className="flex gap-2" role="radiogroup" aria-labelledby={`${r.id}-res-label`}>
                          {(['yes', 'no', 'unsure'] as YesNoUnsure[]).map((v) => (
                            <label
                              key={v}
                              className={`cursor-pointer rounded-lg border px-3 py-1.5 text-sm focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-1 ${
                                r.residentInYearEarned === v ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' : 'border-gray-300 bg-white'
                              }`}
                            >
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
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            className="mt-4 text-sm font-medium text-blue-600 hover:underline"
            onClick={() => set('remittances', [...input.remittances, emptyRemittance()])}
          >
            + Add another transfer
          </button>
        </fieldset>

        {/* Step 3 */}
        <details className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6 group">
          <summary className="cursor-pointer text-base font-semibold text-gray-900 list-none flex justify-between items-center">
            <span>3. Thai income (optional)</span>
            <span className="text-sm font-normal text-blue-600 group-open:hidden">Add</span>
          </summary>
          <p className="text-sm text-gray-600 mt-2 mb-4">
            Thai-source income is added to remitted income before the tax brackets apply.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            <MoneyField id="fic-thai-salary" label="Thai salary (per year)" value={input.thaiIncome.annualSalary} onChange={(n) => setThai('annualSalary', n)} />
            <MoneyField id="fic-thai-sso" label="Social security paid" value={input.thaiIncome.socialSecurityPaid} onChange={(n) => setThai('socialSecurityPaid', n)} />
            <MoneyField id="fic-thai-other" label="Other Thai income" value={input.thaiIncome.otherThaiIncome} onChange={(n) => setThai('otherThaiIncome', n)} />
          </div>
        </details>

        {error && (
          <p role="alert" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-lg p-3">
            {error}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          <button type="submit" className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors">
            Estimate my tax
          </button>
          <button type="button" onClick={handleReset} className="w-full sm:w-auto rounded-lg border border-gray-300 px-6 py-3 font-medium text-gray-700 hover:bg-gray-50">
            Start over
          </button>
        </div>
      </form>

      {submitted && (
        <div ref={resultsRef} className="mt-8 scroll-mt-4">
          <RemittanceResults result={result} />
          {renderAfterResults ? renderAfterResults(input, result) : <LeadCTA context={leadContext} />}
        </div>
      )}
    </div>
  );
};

export default ForeignIncomeCalculator;
