import { useState, useEffect } from 'react';
import {
  FreelancerStepProps,
  ExpenseEntry,
  ExpenseCategory,
  generateEntryId,
} from '../../types/freelancerForm';
import { EXPENSE_CATEGORY_LABELS } from '../../config/taxConfig';
import {
  calculateTotalActualExpenses,
  calculateTotalFlatRateDeductions,
  compareExpenseDeductions,
} from '../../utils/expenseCalculations';

const ActualExpensesStep: React.FC<FreelancerStepProps> = ({
  formData,
  setFormData,
  showValidationErrors,
}) => {
  const [expandedEntry, setExpandedEntry] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Create a new empty expense entry
  const createNewExpense = (): ExpenseEntry => ({
    id: generateEntryId(),
    category: 'other' as ExpenseCategory,
    amount: 0,
    hasReceipt: true,
    description: '',
  });

  // Add new expense
  const handleAddExpense = () => {
    const newExpense = createNewExpense();
    setFormData({
      ...formData,
      actualExpenses: [...formData.actualExpenses, newExpense],
    });
    setExpandedEntry(newExpense.id);
  };

  // Remove expense
  const handleRemoveExpense = (id: string) => {
    setFormData({
      ...formData,
      actualExpenses: formData.actualExpenses.filter(e => e.id !== id),
    });
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);
  };

  // Update expense field
  const handleUpdateExpense = (id: string, field: keyof ExpenseEntry, value: string | number | boolean) => {
    setFormData({
      ...formData,
      actualExpenses: formData.actualExpenses.map(expense =>
        expense.id === id ? { ...expense, [field]: value } : expense
      ),
    });
  };

  // Validate all expenses
  const validateExpenses = (): boolean => {
    const newErrors: Record<string, string[]> = {};
    let isValid = true;

    formData.actualExpenses.forEach(expense => {
      const expenseErrors: string[] = [];

      if (expense.amount <= 0) {
        expenseErrors.push('Amount must be greater than 0');
      }
      if (!expense.description.trim()) {
        expenseErrors.push('Description is required');
      }

      if (expenseErrors.length > 0) {
        newErrors[expense.id] = expenseErrors;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  };

  // Calculate totals and comparison
  const actualExpenses = calculateTotalActualExpenses(formData.actualExpenses);
  const flatRateDeductions = calculateTotalFlatRateDeductions(formData.thaiIncomeEntries);
  const comparison = compareExpenseDeductions(formData.thaiIncomeEntries, formData.actualExpenses);

  // Expense category options
  const categoryOptions: Array<{ value: ExpenseCategory; label: string }> = Object.entries(
    EXPENSE_CATEGORY_LABELS
  ).map(([value, label]) => ({
    value: value as ExpenseCategory,
    label,
  }));

  // Validate expenses when showValidationErrors becomes true
  useEffect(() => {
    if (showValidationErrors && formData.expenseMethod !== 'force_flat' && formData.actualExpenses.length > 0) {
      validateExpenses();
    }
  }, [showValidationErrors]);

  // Skip this step if using flat-rate only method
  if (formData.expenseMethod === 'force_flat') {
    return (
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Expense Tracking</h2>
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 mb-2">
            You selected the flat-rate deduction method
          </p>
          <p className="text-sm text-gray-500">
            Your deduction of <span className="font-semibold text-green-600">฿{flatRateDeductions.total.toLocaleString()}</span> will be calculated automatically based on your income types.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Actual Business Expenses</h2>
      <p className="text-gray-600 mb-6">
        Enter your actual business expenses for the tax year.
        {formData.expenseMethod === 'auto_compare' && ' We\'ll compare with the flat-rate deduction.'}
      </p>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-blue-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Deductible Business Expenses</p>
            <ul className="list-disc list-inside space-y-1 text-blue-600">
              <li>Only expenses directly related to generating income are deductible</li>
              <li>Keep receipts and documentation for at least 5 years</li>
              <li>Personal expenses are not deductible</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Expense Entries */}
      <div className="space-y-4 mb-6">
        {formData.actualExpenses.map((expense, index) => {
          const entryErrors = errors[expense.id] || [];
          const isExpanded = expandedEntry === expense.id;

          return (
            <div
              key={expense.id}
              className={`border-2 rounded-lg overflow-hidden transition-all ${
                entryErrors.length > 0 && showValidationErrors
                  ? 'border-red-300'
                  : 'border-gray-200'
              }`}
            >
              {/* Entry Header */}
              <div
                className={`p-4 cursor-pointer flex justify-between items-center ${
                  isExpanded ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                }`}
                onClick={() => setExpandedEntry(isExpanded ? null : expense.id)}
              >
                <div className="flex items-center gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800">
                      {EXPENSE_CATEGORY_LABELS[expense.category]}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <span>฿{expense.amount.toLocaleString()}</span>
                      {expense.hasReceipt && (
                        <span className="text-green-600 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          Receipt
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemoveExpense(expense.id);
                    }}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    aria-label="Remove expense"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>

              {/* Entry Details (Expanded) */}
              {isExpanded && (
                <div className="p-4 border-t border-gray-200 bg-white space-y-4">
                  {/* Error Messages */}
                  {entryErrors.length > 0 && showValidationErrors && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                      <ul className="text-sm text-red-600 list-disc list-inside">
                        {entryErrors.map((err, i) => (
                          <li key={i}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Category */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category *
                    </label>
                    <select
                      value={expense.category}
                      onChange={(e) => handleUpdateExpense(expense.id, 'category', e.target.value as ExpenseCategory)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {categoryOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Amount */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Amount (THB) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
                      <input
                        type="number"
                        value={expense.amount || ''}
                        onChange={(e) => handleUpdateExpense(expense.id, 'amount', parseFloat(e.target.value) || 0)}
                        placeholder="0"
                        min="0"
                        className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <input
                      type="text"
                      value={expense.description}
                      onChange={(e) => handleUpdateExpense(expense.id, 'description', e.target.value)}
                      placeholder="e.g., Laptop for work, Office rent payment"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Has Receipt */}
                  <label className="flex items-center gap-3 cursor-pointer p-3 bg-gray-50 rounded-lg">
                    <input
                      type="checkbox"
                      checked={expense.hasReceipt}
                      onChange={(e) => handleUpdateExpense(expense.id, 'hasReceipt', e.target.checked)}
                      className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
                    />
                    <div>
                      <span className="text-gray-800 font-medium">I have a receipt/invoice</span>
                      <p className="text-xs text-gray-500">
                        Documentation is required if using actual expense method
                      </p>
                    </div>
                  </label>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Expense Button */}
      <button
        onClick={handleAddExpense}
        className="w-full py-3 px-6 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-purple-500 hover:text-purple-500 transition-colors mb-6 flex items-center justify-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add Expense
      </button>

      {/* Comparison Summary (for auto_compare mode) */}
      {formData.expenseMethod === 'auto_compare' && formData.actualExpenses.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Deduction Comparison</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className={`p-3 rounded-lg ${
              comparison.recommended === 'flat' ? 'bg-green-100 border-2 border-green-300' : 'bg-white border border-gray-200'
            }`}>
              <p className="text-sm text-gray-500 mb-1">Flat-Rate</p>
              <p className="text-xl font-semibold text-gray-800">
                ฿{comparison.flatRateDeduction.toLocaleString()}
              </p>
              {comparison.recommended === 'flat' && (
                <span className="text-xs text-green-700 font-medium">Recommended</span>
              )}
            </div>
            <div className={`p-3 rounded-lg ${
              comparison.recommended === 'actual' ? 'bg-green-100 border-2 border-green-300' : 'bg-white border border-gray-200'
            }`}>
              <p className="text-sm text-gray-500 mb-1">Actual Expenses</p>
              <p className="text-xl font-semibold text-gray-800">
                ฿{comparison.actualDeduction.toLocaleString()}
              </p>
              {comparison.recommended === 'actual' && (
                <span className="text-xs text-green-700 font-medium">Recommended</span>
              )}
            </div>
          </div>

          <div className={`p-3 rounded-lg ${
            comparison.recommended === 'flat' ? 'bg-green-50 border border-green-200' : 'bg-blue-50 border border-blue-200'
          }`}>
            <p className={`text-sm ${comparison.recommended === 'flat' ? 'text-green-700' : 'text-blue-700'}`}>
              {comparison.recommended === 'flat' ? (
                <>
                  <strong>Flat-rate is better.</strong> It gives you a higher deduction by ฿{(comparison.flatRateDeduction - comparison.actualDeduction).toLocaleString()}.
                </>
              ) : (
                <>
                  <strong>Actual expenses are better.</strong> They give you a higher deduction by ฿{(comparison.actualDeduction - comparison.flatRateDeduction).toLocaleString()}.
                </>
              )}
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Estimated tax savings: ~฿{comparison.taxSavings.toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Simple Summary (for force_actual mode) */}
      {formData.expenseMethod === 'force_actual' && formData.actualExpenses.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Expense Summary</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Actual Expenses</span>
            <span className="text-xl font-semibold text-green-600">
              ฿{actualExpenses.total.toLocaleString()}
            </span>
          </div>
          {actualExpenses.breakdown.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-200 space-y-1">
              {actualExpenses.breakdown.map(item => (
                <div key={item.category} className="flex justify-between text-sm">
                  <span className="text-gray-500">{EXPENSE_CATEGORY_LABELS[item.category]}</span>
                  <span className="text-gray-700">฿{item.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* No expenses message */}
      {formData.actualExpenses.length === 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2zM10 8.5a.5.5 0 11-1 0 .5.5 0 011 0zm5 5a.5.5 0 11-1 0 .5.5 0 011 0z" />
          </svg>
          <p className="text-gray-600 mb-2">No expenses added yet</p>
          <p className="text-sm text-gray-500">
            {formData.expenseMethod === 'auto_compare'
              ? 'Add your expenses to compare with the flat-rate deduction, or click Next to use flat-rate only.'
              : 'Click "Add Expense" to enter your business expenses.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default ActualExpensesStep;
