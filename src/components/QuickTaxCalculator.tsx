import React, { useState, useCallback } from 'react';
import { calculateThaiTax } from '../utils/tax';
import { TAX_CONSTANTS } from '../types/taxForm';

type Period = 'yearly' | 'monthly' | 'weekly';

function toAnnual(amount: number, period: Period): number {
  if (period === 'monthly') return amount * 12;
  if (period === 'weekly') return amount * 52;
  return amount;
}

function computeTax(annualIncome: number, includeSS: boolean) {
  const standardDeduction = Math.min(annualIncome * TAX_CONSTANTS.STANDARD_DEDUCTION_RATE, TAX_CONSTANTS.MAX_STANDARD_DEDUCTION);
  const personalAllowance = TAX_CONSTANTS.PERSONAL_ALLOWANCE;
  const socialSecurity = includeSS ? TAX_CONSTANTS.MAX_SOCIAL_SECURITY : 0;
  const taxableIncome = Math.max(0, annualIncome - standardDeduction - personalAllowance - socialSecurity);
  const annualTax = calculateThaiTax(taxableIncome);
  return { annualTax, monthlyTax: annualTax / 12, taxableIncome };
}

function fmt(n: number): string {
  return Math.round(n).toLocaleString('en-US');
}

const PERIOD_LABELS: Record<Period, string> = {
  yearly: 'Yearly',
  monthly: 'Monthly',
  weekly: 'Weekly',
};

const QuickTaxCalculator: React.FC = () => {
  const [period, setPeriod] = useState<Period>('monthly');
  const [rawInput, setRawInput] = useState('');
  const [includeSS, setIncludeSS] = useState(true);

  const inputAmount = parseFloat(rawInput.replace(/,/g, '')) || 0;
  const annualIncome = toAnnual(inputAmount, period);
  const hasIncome = inputAmount > 0;
  const result = hasIncome ? computeTax(annualIncome, includeSS) : null;

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/[^0-9.]/g, '');
    setRawInput(val);
  }, []);

  return (
    <div className="max-w-2xl mx-auto px-4 mb-8">
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">Quick Tax Estimate</h2>
        <p className="text-sm text-gray-500 mb-5">
          Salaried income — standard deductions and personal allowance applied automatically.
        </p>

        {/* Period toggle */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 mb-4 w-fit">
          {(['yearly', 'monthly', 'weekly'] as Period[]).map(p => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-colors ${
                period === p
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {PERIOD_LABELS[p]}
            </button>
          ))}
        </div>

        {/* Income input */}
        <div className="flex items-center gap-2 mb-4">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium select-none">฿</span>
            <input
              type="text"
              inputMode="numeric"
              value={rawInput}
              onChange={handleInput}
              placeholder={period === 'yearly' ? '600,000' : period === 'monthly' ? '50,000' : '12,500'}
              className="w-full pl-8 pr-4 py-3 border border-gray-200 rounded-xl text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <span className="text-gray-400 text-sm whitespace-nowrap">{PERIOD_LABELS[period].toLowerCase()} income</span>
        </div>

        {/* Social security checkbox */}
        <label className="flex items-center gap-2.5 mb-5 cursor-pointer select-none group w-fit">
          <input
            type="checkbox"
            checked={includeSS}
            onChange={e => setIncludeSS(e.target.checked)}
            className="w-4 h-4 rounded border-gray-300 text-blue-500 focus:ring-blue-500 cursor-pointer"
          />
          <span className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
            Include social security deduction
            <span className="text-gray-400 ml-1">(฿{fmt(TAX_CONSTANTS.MAX_SOCIAL_SECURITY)}/yr)</span>
          </span>
        </label>

        {/* Results */}
        {result ? (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 mb-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-blue-500 uppercase tracking-wide mb-1">Annual Tax</p>
                <p className="text-2xl font-bold text-gray-900">฿{fmt(result.annualTax)}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-blue-500 uppercase tracking-wide mb-1">Per Month</p>
                <p className="text-2xl font-bold text-gray-900">฿{fmt(result.monthlyTax)}</p>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-blue-100">
              <p className="text-xs text-gray-500">
                Based on ฿{fmt(annualIncome)} annual income · ฿{fmt(result.taxableIncome)} taxable
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-5 mb-4 text-center text-gray-400 text-sm">
            Enter your income above to see your estimate
          </div>
        )}

        <p className="text-xs text-gray-400">
          Need deductions for insurance, provident fund, dependents, or detailed withholding? Use the full calculators below.
        </p>
      </div>
    </div>
  );
};

export default QuickTaxCalculator;
