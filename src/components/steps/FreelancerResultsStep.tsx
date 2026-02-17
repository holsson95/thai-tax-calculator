import { useState } from 'react';
import { FreelancerFormData, IncomeType } from '../../types/freelancerForm';
import { TAX_BRACKETS } from '../../types/taxForm';
import { calculateFreelancerTax, formatThb, formatPercent } from '../../utils/taxCalculations';
import { ObligationAlerts, ObligationSummary } from '../ObligationAlerts';
import { checkAllObligations } from '../../utils/obligationChecks';
import { INCOME_TYPE_INFO } from '../../data/incomeTypes';

interface FreelancerResultsStepProps {
  formData: FreelancerFormData;
  onStartOver: () => void;
}

const FreelancerResultsStep: React.FC<FreelancerResultsStepProps> = ({
  formData,
  onStartOver,
}) => {
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showObligations, setShowObligations] = useState(false);

  const result = calculateFreelancerTax(formData);
  const obligations = checkAllObligations(formData);

  // Calculate refund/owed
  const totalWithholding = result.withholdingCredits + result.foreignTaxCredits;
  const refundOrOwed = totalWithholding - result.grossTaxBeforeCredits;
  const isRefund = refundOrOwed > 0;
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

  // Get expense deduction display
  const getExpenseDeductionLabel = () => {
    switch (result.expenseMethod) {
      case 'auto_compare':
        return result.expenseComparison?.recommended === 'actual'
          ? 'Actual Expenses (Auto-selected)'
          : 'Flat-Rate (Auto-selected)';
      case 'force_flat':
        return 'Flat-Rate Deduction';
      case 'force_actual':
        return 'Actual Expenses';
      default:
        return 'Expense Deduction';
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
        Your Tax Calculation Results
      </h2>
      <p className="text-gray-600 mb-6 text-center">
        Based on your freelance/self-employment income
      </p>

      {/* Main Result Card */}
      <div className={`${refundOrOwedBg} border-2 rounded-xl p-6 mb-6 text-center`}>
        <p className="text-sm text-gray-600 mb-1">{refundOrOwedLabel}</p>
        <p className={`text-4xl font-bold ${refundOrOwedColor}`}>
          {formatThb(Math.abs(refundOrOwed))}
        </p>
        {isRefund ? (
          <p className="text-sm text-green-600 mt-2">
            You've overpaid your taxes and may claim a refund
          </p>
        ) : refundOrOwed < 0 ? (
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
          <p className="text-sm text-gray-500">Total Gross Income</p>
          <p className="text-xl font-semibold text-gray-800">{formatThb(result.grossIncome)}</p>
          {result.foreignIncomeTotal > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Thai: {formatThb(result.thaiIncomeTotal)} + Foreign: {formatThb(result.taxableForeignIncome)}
            </p>
          )}
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Expense Deduction</p>
          <p className="text-xl font-semibold text-green-600">-{formatThb(result.expenseDeduction)}</p>
          <p className="text-xs text-gray-500 mt-1">{getExpenseDeductionLabel()}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Total Allowances</p>
          <p className="text-xl font-semibold text-green-600">-{formatThb(result.totalAllowances)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Taxable Income</p>
          <p className="text-xl font-semibold text-gray-800">{formatThb(result.taxableIncome)}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Tax Owed</p>
          <p className="text-xl font-semibold text-blue-600">{formatThb(result.grossTaxBeforeCredits)}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-gray-500">Tax Credits</p>
          <p className="text-xl font-semibold text-blue-600">{formatThb(totalWithholding)}</p>
          {result.foreignTaxCredits > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              Incl. foreign tax credit: {formatThb(result.foreignTaxCredits)}
            </p>
          )}
        </div>
      </div>

      {/* Effective Tax Rate */}
      <div className="bg-gray-100 rounded-lg p-4 mb-6 text-center">
        <p className="text-sm text-gray-500">Effective Tax Rate</p>
        <p className="text-2xl font-bold text-gray-800">{formatPercent(result.effectiveRate)}</p>
      </div>

      {/* Expense Comparison (if auto_compare) */}
      {result.expenseComparison && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-purple-800 mb-2">Expense Comparison Result</h4>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className={`p-3 rounded ${result.expenseComparison.recommended === 'flat' ? 'bg-purple-100' : 'bg-white'}`}>
              <p className="text-gray-600">Flat-Rate</p>
              <p className="font-semibold text-purple-800">
                {formatThb(result.expenseComparison.flatRateDeduction)}
              </p>
              {result.expenseComparison.recommended === 'flat' && (
                <span className="text-xs text-purple-600">✓ Selected</span>
              )}
            </div>
            <div className={`p-3 rounded ${result.expenseComparison.recommended === 'actual' ? 'bg-purple-100' : 'bg-white'}`}>
              <p className="text-gray-600">Actual Expenses</p>
              <p className="font-semibold text-purple-800">
                {formatThb(result.expenseComparison.actualDeduction)}
              </p>
              {result.expenseComparison.recommended === 'actual' && (
                <span className="text-xs text-purple-600">✓ Selected</span>
              )}
            </div>
          </div>
          <p className="text-xs text-purple-600 mt-2">
            Tax savings from optimal choice: ~{formatThb(result.expenseComparison.taxSavings)}
          </p>
        </div>
      )}

      {/* Tax Obligations Section */}
      <div className="border border-gray-200 rounded-lg mb-6">
        <button
          onClick={() => setShowObligations(!showObligations)}
          className="w-full p-4 flex justify-between items-center hover:bg-gray-50 transition-colors"
          aria-expanded={showObligations}
        >
          <div className="flex items-center gap-2">
            <span className="font-medium text-gray-800">Tax Obligations</span>
            {obligations.hasAnyObligation && (
              <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full">
                Action Required
              </span>
            )}
          </div>
          <svg
            className={`w-5 h-5 text-gray-500 transition-transform ${showObligations ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showObligations && (
          <div className="p-4 border-t border-gray-200">
            <ObligationAlerts result={obligations} showAll />
          </div>
        )}

        {!showObligations && obligations.hasAnyObligation && (
          <div className="px-4 pb-4">
            <ObligationSummary result={obligations} />
          </div>
        )}
      </div>

      {/* Collapsible Detailed Breakdown */}
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
            {/* Income by Type */}
            {result.incomeByType.size > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Income by Type</h4>
                <div className="text-sm space-y-1">
                  {Array.from(result.incomeByType.entries()).map(([type, amount]) => (
                    <div key={type} className="flex justify-between">
                      <span className="text-gray-600">
                        {INCOME_TYPE_INFO[type as IncomeType]?.shortLabel || type}
                      </span>
                      <span>{formatThb(amount)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Foreign Income Taxability */}
            {result.foreignIncomeTaxability.length > 0 && (
              <div className="mb-4">
                <h4 className="font-medium text-gray-700 mb-2">Foreign Income Analysis</h4>
                <div className="text-sm space-y-2">
                  {result.foreignIncomeTaxability.map((item, idx) => (
                    <div key={idx} className="p-2 bg-gray-50 rounded">
                      <div className="flex justify-between">
                        <span className="text-gray-600">
                          {item.entry.country} - {item.entry.description || 'Foreign Income'}
                        </span>
                        <span className={item.isTaxable ? 'text-red-600' : 'text-green-600'}>
                          {item.isTaxable ? 'Taxable' : 'Not Taxable'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">{item.reason}</p>
                      {item.isTaxable && (
                        <p className="text-xs text-gray-600 mt-1">
                          Taxable amount: {formatThb(item.taxableAmount)}
                          {item.foreignTaxCredit > 0 && ` | Credit: ${formatThb(item.foreignTaxCredit)}`}
                        </p>
                      )}
                    </div>
                  ))}
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
                  <span>{formatThb(result.grossTaxBeforeCredits)}</span>
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
            <h4 className="font-medium text-yellow-800">Important Disclaimer</h4>
            <p className="text-sm text-yellow-700 mt-1">
              This calculator provides an estimate for freelance/self-employment income. Tax laws
              for business income are complex and your actual tax liability may differ. Please
              consult with a qualified tax professional or the{' '}
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
            {result.expenseMethod !== 'force_flat' && (
              <p className="text-sm text-yellow-700 mt-2">
                <strong>Note:</strong> If using actual expenses, you must keep proper documentation
                (receipts, invoices) to support your deductions.
              </p>
            )}
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

export default FreelancerResultsStep;
