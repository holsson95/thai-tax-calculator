import { ExpenseComparisonResult, IncomeType, ExpenseCategory } from '../types/freelancerForm';
import { INCOME_TYPE_INFO } from '../data/incomeTypes';
import { EXPENSE_CATEGORY_LABELS } from '../config/taxConfig';

interface ExpenseComparisonCardProps {
  comparison: ExpenseComparisonResult;
  showDetails?: boolean;
}

const ExpenseComparisonCard: React.FC<ExpenseComparisonCardProps> = ({
  comparison,
  showDetails = true,
}) => {
  const {
    flatRateDeduction,
    actualDeduction,
    recommended,
    taxSavings,
    flatBreakdown,
    actualBreakdown,
  } = comparison;

  const difference = Math.abs(flatRateDeduction - actualDeduction);
  const winnerAmount = recommended === 'flat' ? flatRateDeduction : actualDeduction;

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
        <h3 className="font-semibold text-gray-800">Expense Deduction Comparison</h3>
        <p className="text-sm text-gray-500">We've calculated both methods to find the best option</p>
      </div>

      {/* Comparison Cards */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Flat Rate Card */}
          <div className={`p-4 rounded-lg transition-all ${
            recommended === 'flat'
              ? 'bg-green-50 border-2 border-green-400 shadow-sm'
              : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                recommended === 'flat' ? 'text-green-700' : 'text-gray-600'
              }`}>
                Flat-Rate Method
              </span>
              {recommended === 'flat' && (
                <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Best
                </span>
              )}
            </div>
            <p className={`text-2xl font-bold ${
              recommended === 'flat' ? 'text-green-600' : 'text-gray-700'
            }`}>
              ฿{flatRateDeduction.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              No documentation required
            </p>
          </div>

          {/* Actual Expenses Card */}
          <div className={`p-4 rounded-lg transition-all ${
            recommended === 'actual'
              ? 'bg-green-50 border-2 border-green-400 shadow-sm'
              : 'bg-gray-50 border border-gray-200'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                recommended === 'actual' ? 'text-green-700' : 'text-gray-600'
              }`}>
                Actual Expenses
              </span>
              {recommended === 'actual' && (
                <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Best
                </span>
              )}
            </div>
            <p className={`text-2xl font-bold ${
              recommended === 'actual' ? 'text-green-600' : 'text-gray-700'
            }`}>
              ฿{actualDeduction.toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Requires receipts/documentation
            </p>
          </div>
        </div>

        {/* Recommendation Box */}
        <div className={`p-4 rounded-lg ${
          recommended === 'flat' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 p-1.5 rounded-full ${
              recommended === 'flat' ? 'bg-green-100' : 'bg-blue-100'
            }`}>
              <svg className={`w-5 h-5 ${
                recommended === 'flat' ? 'text-green-600' : 'text-blue-600'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className={`font-medium ${
                recommended === 'flat' ? 'text-green-800' : 'text-blue-800'
              }`}>
                {recommended === 'flat'
                  ? 'Use Flat-Rate Deduction'
                  : 'Use Actual Expenses'
                }
              </p>
              <p className={`text-sm mt-1 ${
                recommended === 'flat' ? 'text-green-700' : 'text-blue-700'
              }`}>
                {recommended === 'flat'
                  ? `The flat-rate method gives you ฿${difference.toLocaleString()} more in deductions than your actual expenses.`
                  : `Your actual expenses give you ฿${difference.toLocaleString()} more in deductions than the flat-rate method.`
                }
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`text-xs ${
                  recommended === 'flat' ? 'text-green-600' : 'text-blue-600'
                }`}>
                  Estimated tax savings:
                </span>
                <span className={`text-sm font-semibold ${
                  recommended === 'flat' ? 'text-green-700' : 'text-blue-700'
                }`}>
                  ~฿{taxSavings.toLocaleString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Breakdowns (Collapsible) */}
        {showDetails && (flatBreakdown.length > 0 || actualBreakdown.length > 0) && (
          <details className="mt-4">
            <summary className="cursor-pointer text-sm font-medium text-gray-600 hover:text-gray-800 py-2">
              View detailed breakdown
            </summary>
            <div className="mt-3 space-y-4">
              {/* Flat Rate Breakdown */}
              {flatBreakdown.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Flat-Rate by Income Type</h4>
                  <div className="space-y-2">
                    {flatBreakdown.map((item, index) => {
                      const info = INCOME_TYPE_INFO[item.incomeType as IncomeType];
                      return (
                        <div key={index} className="flex justify-between text-sm">
                          <div>
                            <span className="text-gray-600">{info?.shortLabel || item.incomeType}</span>
                            <span className="text-xs text-gray-400 ml-2">
                              {(item.rate * 100).toFixed(0)}% of ฿{item.grossAmount.toLocaleString()}
                            </span>
                          </div>
                          <span className="font-medium text-gray-800">
                            ฿{item.deduction.toLocaleString()}
                          </span>
                        </div>
                      );
                    })}
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-medium text-gray-600">Total</span>
                      <span className="font-semibold text-gray-800">
                        ฿{flatRateDeduction.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Actual Expenses Breakdown */}
              {actualBreakdown.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Actual Expenses by Category</h4>
                  <div className="space-y-2">
                    {actualBreakdown.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-gray-600">
                            {EXPENSE_CATEGORY_LABELS[item.category as ExpenseCategory]}
                          </span>
                          {item.hasReceipts && (
                            <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium text-gray-800">
                          ฿{item.amount.toLocaleString()}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-gray-200 pt-2 flex justify-between">
                      <span className="font-medium text-gray-600">Total</span>
                      <span className="font-semibold text-gray-800">
                        ฿{actualDeduction.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </details>
        )}
      </div>

      {/* Footer with Winner */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="text-white">
            <p className="text-sm opacity-90">Your optimal deduction</p>
            <p className="text-2xl font-bold">฿{winnerAmount.toLocaleString()}</p>
          </div>
          <div className="bg-white/20 rounded-lg px-3 py-1.5">
            <p className="text-xs text-white/80">Method</p>
            <p className="text-sm font-medium text-white">
              {recommended === 'flat' ? 'Flat-Rate' : 'Actual'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseComparisonCard;
