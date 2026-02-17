import { FreelancerStepProps, ExpenseMethod } from '../../types/freelancerForm';
import { calculateTotalFlatRateDeductions } from '../../utils/expenseCalculations';
import { INCOME_TYPE_INFO } from '../../data/incomeTypes';

interface ExpenseMethodOption {
  value: ExpenseMethod;
  title: string;
  description: string;
  icon: React.ReactNode;
  recommended?: boolean;
}

const ExpenseMethodStep: React.FC<FreelancerStepProps> = ({
  formData,
  setFormData,
  nextStep,
  prevStep,
}) => {
  // Calculate flat-rate deduction preview
  const flatRateResult = calculateTotalFlatRateDeductions(formData.thaiIncomeEntries);

  const expenseMethodOptions: ExpenseMethodOption[] = [
    {
      value: 'auto_compare',
      title: 'Auto Compare (Recommended)',
      description: 'We\'ll calculate both methods and automatically use whichever gives you the higher deduction (lower tax).',
      recommended: true,
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
    },
    {
      value: 'force_flat',
      title: 'Flat-Rate Deduction Only',
      description: 'Use the standard percentage-based deduction. No receipts needed - simpler but may result in lower deductions.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
    },
    {
      value: 'force_actual',
      title: 'Actual Expenses Only',
      description: 'Deduct your actual documented business expenses. Requires receipts but may result in higher deductions.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
    },
  ];

  const handleMethodSelect = (method: ExpenseMethod) => {
    setFormData({
      ...formData,
      expenseMethod: method,
    });
  };

  const handleContinue = () => {
    nextStep(formData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Expense Deduction Method</h2>
      <p className="text-gray-600 mb-6">
        Choose how you want to calculate your business expense deductions.
      </p>

      {/* Info Box */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex items-start gap-3">
          <svg className="h-5 w-5 text-blue-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="text-sm text-blue-700">
            <p className="font-medium mb-1">Thai Tax Law Allows Two Methods</p>
            <p className="text-blue-600">
              You can choose between flat-rate deductions (percentage of income) or actual expenses.
              For most freelancers, the flat-rate method is simpler and often provides a good deduction.
            </p>
          </div>
        </div>
      </div>

      {/* Flat Rate Preview */}
      {flatRateResult.breakdown.length > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Your Flat-Rate Deduction Preview</h3>
          <div className="space-y-2 mb-3">
            {flatRateResult.breakdown.map(item => {
              const info = INCOME_TYPE_INFO[item.incomeType];
              return (
                <div key={item.incomeType} className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-600">{info?.shortLabel || item.incomeType}</span>
                    <span className="text-xs text-gray-400">
                      ({(item.rate * 100).toFixed(0)}% of ฿{item.grossAmount.toLocaleString()})
                    </span>
                  </div>
                  <span className="font-medium text-gray-800">
                    ฿{item.deduction.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-gray-200 pt-2 flex justify-between">
            <span className="font-medium text-gray-700">Total Flat-Rate Deduction</span>
            <span className="font-semibold text-green-600 text-lg">
              ฿{flatRateResult.total.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Method Options */}
      <div className="space-y-3 mb-6">
        {expenseMethodOptions.map(option => (
          <button
            key={option.value}
            onClick={() => handleMethodSelect(option.value)}
            className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
              formData.expenseMethod === option.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300 bg-white'
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`flex-shrink-0 p-2 rounded-lg ${
                formData.expenseMethod === option.value
                  ? 'bg-blue-100 text-blue-600'
                  : 'bg-gray-100 text-gray-500'
              }`}>
                {option.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className={`font-semibold ${
                    formData.expenseMethod === option.value
                      ? 'text-blue-700'
                      : 'text-gray-800'
                  }`}>
                    {option.title}
                  </h3>
                  {option.recommended && (
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  )}
                </div>
                <p className={`text-sm mt-1 ${
                  formData.expenseMethod === option.value
                    ? 'text-blue-600'
                    : 'text-gray-500'
                }`}>
                  {option.description}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  formData.expenseMethod === option.value
                    ? 'border-blue-500 bg-blue-500'
                    : 'border-gray-300'
                }`}>
                  {formData.expenseMethod === option.value && (
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Method-specific info */}
      {formData.expenseMethod === 'force_actual' && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-amber-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">
              <p className="text-amber-700 font-medium">Documentation Required</p>
              <p className="text-amber-600 mt-1">
                Using actual expenses requires keeping receipts and invoices.
                You'll need to enter your expense details in the next step.
              </p>
            </div>
          </div>
        </div>
      )}

      {formData.expenseMethod === 'auto_compare' && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-3">
            <svg className="h-5 w-5 text-green-500 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <div className="text-sm">
              <p className="text-green-700 font-medium">Best of Both Worlds</p>
              <p className="text-green-600 mt-1">
                We'll ask for your actual expenses in the next step, then compare both methods to find the one that saves you the most tax.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        {prevStep && (
          <button
            onClick={prevStep}
            className="flex-1 py-3 px-6 rounded-lg font-medium border-2 border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
        )}
        <button
          onClick={handleContinue}
          className="flex-1 py-3 px-6 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          {formData.expenseMethod === 'force_flat' ? 'Continue' : 'Next: Enter Expenses'}
        </button>
      </div>
    </div>
  );
};

export default ExpenseMethodStep;
