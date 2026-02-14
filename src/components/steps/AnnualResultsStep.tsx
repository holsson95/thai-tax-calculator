import { useState } from 'react';
import { TaxFormData, TAX_BRACKETS } from '../../types/taxForm';
import { calculateAnnualTax, formatThb, formatPercent } from '../../utils/taxCalculations';

interface AnnualResultsStepProps {
  formData: TaxFormData;
  onStartOver: () => void;
}

const AnnualResultsStep: React.FC<AnnualResultsStepProps> = ({ formData, onStartOver }) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const result = calculateAnnualTax(formData);

  const isRefund = result.refundOrOwed > 0;
  const refundOrOwedLabel = isRefund ? 'Tax Refund' : 'Additional Tax Owed';
  const refundOrOwedColor = isRefund ? 'text-green-600' : 'text-red-600';
  const refundOrOwedBg = isRefund ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200';

  // Calculate tax by bracket for breakdown
  const getTaxByBracket = () => {
    const brackets = [];
    let remainingIncome = result.taxableIncome;
    let previousLimit = 0;

    for (const bracket of TAX_BRACKETS) {
      if (remainingIncome <= 0) break;

      const bracketSize = bracket.upTo - previousLimit;
      const taxableInBracket = Math.min(remainingIncome, bracketSize);
      const taxInBracket = taxableInBracket * bracket.rate;

      if (taxableInBracket > 0) {
        brackets.push({
          label: bracket.label,
          rate: bracket.rate * 100,
          taxableAmount: taxableInBracket,
          tax: taxInBracket,
        });
      }

      remainingIncome -= taxableInBracket;
      previousLimit = bracket.upTo;
    }

    return brackets;
  };

  const taxBrackets = getTaxByBracket();

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Your Tax Calculation Results</h2>
      <p className="text-gray-600 mb-6 text-center">
        Based on the information you provided
      </p>

      {/* Main Result Card */}
      <div className={`${refundOrOwedBg} border-2 rounded-xl p-6 mb-6 text-center`}>
        <p className="text-sm text-gray-600 mb-1">{refundOrOwedLabel}</p>
        <p className={`text-4xl font-bold ${refundOrOwedColor}`}>
          {formatThb(Math.abs(result.refundOrOwed))}
        </p>
        {isRefund ? (
          <p className="text-sm text-green-600 mt-2">
            You've overpaid your taxes and may claim a refund
          </p>
        ) : result.refundOrOwed < 0 ? (
          <p className="text-sm text-red-600 mt-2">
            You owe additional tax beyond what was withheld
          </p>
        ) : (
          <p className="text-sm text-gray-600 mt-2">
            Your withholding matches your tax liability
          </p>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Gross Income</p>
          <p className="text-xl font-semibold text-gray-800">{formatThb(result.grossIncome)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Total Allowances</p>
          <p className="text-xl font-semibold text-green-600">-{formatThb(result.totalAllowances)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Total Deductions</p>
          <p className="text-xl font-semibold text-green-600">-{formatThb(result.totalDeductions)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Taxable Income</p>
          <p className="text-xl font-semibold text-gray-800">{formatThb(result.taxableIncome)}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Tax Owed</p>
          <p className="text-xl font-semibold text-blue-600">{formatThb(result.taxOwed)}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Tax Withheld</p>
          <p className="text-xl font-semibold text-blue-600">{formatThb(result.taxWithheld)}</p>
        </div>
      </div>

      {/* Effective Tax Rate */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
        <p className="text-sm text-gray-500">Effective Tax Rate</p>
        <p className="text-2xl font-bold text-gray-800">{formatPercent(result.effectiveRate)}</p>
      </div>

      {/* Collapsible Breakdown */}
      <div className="border border-gray-200 rounded-lg mb-6">
        <button
          onClick={() => setShowBreakdown(!showBreakdown)}
          className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
          aria-expanded={showBreakdown}
        >
          <span className="font-medium text-gray-800">Detailed Breakdown</span>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${showBreakdown ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showBreakdown && (
          <div className="p-4 border-t border-gray-200 animate-fadeIn">
            {/* Allowances Breakdown */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-700 mb-2">Allowances</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-gray-600">Personal</span>
                  <span>{formatThb(result.breakdown.personalAllowance)}</span>
                </div>
                {result.breakdown.spouseAllowance > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Spouse</span>
                    <span>{formatThb(result.breakdown.spouseAllowance)}</span>
                  </div>
                )}
                {result.breakdown.seniorAllowance > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Senior (65+)</span>
                    <span>{formatThb(result.breakdown.seniorAllowance)}</span>
                  </div>
                )}
                {result.breakdown.childAllowance > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Children</span>
                    <span>{formatThb(result.breakdown.childAllowance)}</span>
                  </div>
                )}
                {result.breakdown.parentAllowance > 0 && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Parents</span>
                    <span>{formatThb(result.breakdown.parentAllowance)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Deductions Breakdown */}
            {result.totalDeductions > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Deductions</h4>
                <div className="text-sm space-y-1">
                  {result.breakdown.standardDeduction > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expense Deduction (50%)</span>
                      <span>{formatThb(result.breakdown.standardDeduction)}</span>
                    </div>
                  )}
                  {result.breakdown.socialSecurity > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Social Security</span>
                      <span>{formatThb(result.breakdown.socialSecurity)}</span>
                    </div>
                  )}
                  {result.breakdown.lifeInsurance > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Life Insurance</span>
                      <span>{formatThb(result.breakdown.lifeInsurance)}</span>
                    </div>
                  )}
                  {result.breakdown.healthInsurance > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Health Insurance</span>
                      <span>{formatThb(result.breakdown.healthInsurance)}</span>
                    </div>
                  )}
                  {result.breakdown.pensionFund > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Pension Fund</span>
                      <span>{formatThb(result.breakdown.pensionFund)}</span>
                    </div>
                  )}
                  {result.breakdown.providentFund > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Provident Fund</span>
                      <span>{formatThb(result.breakdown.providentFund)}</span>
                    </div>
                  )}
                  {result.breakdown.rmf > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">RMF</span>
                      <span>{formatThb(result.breakdown.rmf)}</span>
                    </div>
                  )}
                  {result.breakdown.ssf > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">SSF</span>
                      <span>{formatThb(result.breakdown.ssf)}</span>
                    </div>
                  )}
                  {result.breakdown.donations > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Donations</span>
                      <span>{formatThb(result.breakdown.donations)}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tax Bracket Breakdown */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Tax by Bracket</h4>
              <div className="text-sm space-y-1">
                {taxBrackets.map((bracket) => (
                  <div key={bracket.label} className="flex justify-between">
                    <span className="text-gray-600">
                      {bracket.label} ({bracket.rate}%)
                    </span>
                    <span>{formatThb(bracket.tax)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-medium border-t border-gray-200 pt-1 mt-2">
                  <span>Total Tax</span>
                  <span>{formatThb(result.taxOwed)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <div>
            <h4 className="font-medium text-yellow-800">Disclaimer</h4>
            <p className="text-sm text-yellow-700 mt-1">
              This calculator provides an estimate only. Tax laws are complex and your actual tax
              liability may differ. Please consult with a qualified tax professional or the{' '}
              <a
                href="https://www.rd.go.th"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-yellow-900"
              >
                Thai Revenue Department
              </a>
              {' '}for official guidance.
            </p>
          </div>
        </div>
      </div>

      {/* Start Over Button */}
      <button
        onClick={onStartOver}
        className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
      >
        Start Over
      </button>
    </div>
  );
};

export default AnnualResultsStep;
