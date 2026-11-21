import { FreelancerStepProps, ExpenseMethod } from '../../types/freelancerForm';
import { ChoiceList, ChoiceRow } from '../ui/form';
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

  return (
    <div>
      <h2 className="display text-2xl leading-tight text-ink sm:text-[28px] mb-2">Expense Deduction Method</h2>
      <p className="text-ink-soft mb-6">
        Choose how you want to calculate your business expense deductions.
      </p>

      {/* Info Box */}
      <div className="border border-ink/25 p-4 mb-6">
        <div className="flex items-start gap-3">
          <div className="text-sm text-ink-soft">
            <p className="font-medium mb-1">Thai Tax Law Allows Two Methods</p>
            <p className="text-ink-soft">
              You can choose between flat-rate deductions (percentage of income) or actual expenses.
              For most freelancers, the flat-rate method is simpler and often provides a good deduction.
            </p>
          </div>
        </div>
      </div>

      {/* Flat Rate Preview */}
      {flatRateResult.breakdown.length > 0 && (
        <div className="border p-4 mb-6 border-ink/25">
          <h3 className="field-label mb-3 block border-b-2 border-desk pb-1.5 text-ink">Your Flat-Rate Deduction Preview</h3>
          <div className="space-y-2 mb-3">
            {flatRateResult.breakdown.map(item => {
              const info = INCOME_TYPE_INFO[item.incomeType];
              return (
                <div key={item.incomeType} className="flex justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-ink-soft">{info?.shortLabel || item.incomeType}</span>
                    <span className="text-xs text-ink-mute">
                      ({(item.rate * 100).toFixed(0)}% of ฿{item.grossAmount.toLocaleString()})
                    </span>
                  </div>
                  <span className="font-medium text-ink">
                    ฿{item.deduction.toLocaleString()}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="border-t border-paper-rule pt-2 flex justify-between">
            <span className="font-medium text-ink-soft">Total Flat-Rate Deduction</span>
            <span className="font-semibold text-ink text-lg">
              ฿{flatRateResult.total.toLocaleString()}
            </span>
          </div>
        </div>
      )}

      {/* Method Options */}
      <div className="mb-6">
        <ChoiceList>
          {expenseMethodOptions.map(option => (
            <ChoiceRow
              key={option.value}
              selected={formData.expenseMethod === option.value}
              onClick={() => handleMethodSelect(option.value)}
              title={option.title}
              description={option.description}
              aside={
                option.recommended ? (
                  <span className="field-label shrink-0 self-center border border-desk px-1.5 py-0.5 text-ink">Recommended</span>
                ) : undefined
              }
            />
          ))}
        </ChoiceList>
      </div>

      {/* Method-specific info */}
      {formData.expenseMethod === 'force_actual' && (
        <div className="border-desk p-4 mb-6 border-2">
          <div className="flex items-start gap-3">
            <div className="text-sm">
              <p className="text-ink font-medium">Documentation Required</p>
              <p className="text-ink mt-1">
                Using actual expenses requires keeping receipts and invoices.
                You'll need to enter your expense details in the next step.
              </p>
            </div>
          </div>
        </div>
      )}

      {formData.expenseMethod === 'auto_compare' && (
        <div className="p-4 border-2 border-desk">
          <div className="flex items-start gap-3">
            <div className="text-sm">
              <p className="text-ink font-medium">Best of Both Worlds</p>
              <p className="text-ink mt-1">
                We'll ask for your actual expenses in the next step, then compare both methods to find the one that saves you the most tax.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpenseMethodStep;
