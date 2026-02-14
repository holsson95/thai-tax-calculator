import { useState } from 'react';
import { StepProps, TAX_CONSTANTS } from '../../types/taxForm';

interface DeductionItemProps {
  id: string;
  label: string;
  maxAmount: number;
  hasDeduction: boolean;
  amount: number;
  onToggle: (checked: boolean) => void;
  onAmountChange: (amount: number) => void;
  description?: string;
  showValidationErrors?: boolean;
}

const DeductionItem: React.FC<DeductionItemProps> = ({
  id,
  label,
  maxAmount,
  hasDeduction,
  amount,
  onToggle,
  onAmountChange,
  description,
  showValidationErrors,
}) => {
  const [error, setError] = useState('');
  const hasValidationError = showValidationErrors && hasDeduction && amount === 0;

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(value) || 0;
    onAmountChange(numValue);
  };

  const handleBlur = () => {
    if (hasDeduction && amount > maxAmount) {
      setError(`Maximum deduction is ฿${maxAmount.toLocaleString()}`);
    } else {
      setError('');
    }
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '';
    return num.toLocaleString('en-US');
  };

  return (
    <div className={`border rounded-lg p-4 mb-3 ${hasValidationError ? 'border-red-500' : 'border-gray-200'}`}>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={hasDeduction}
          onChange={(e) => onToggle(e.target.checked)}
          className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <div className="flex-1">
          <span className="font-medium text-gray-800">{label}</span>
          <span className="text-sm text-gray-500 ml-2">(max ฿{maxAmount.toLocaleString()})</span>
        </div>
      </label>

      {description && (
        <p className="text-sm text-gray-500 mt-1 ml-8">{description}</p>
      )}

      {hasDeduction && (
        <div className="mt-3 ml-8 animate-fadeIn">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">฿</span>
            <input
              type="text"
              id={id}
              value={formatNumber(amount)}
              onChange={handleAmountChange}
              onBlur={handleBlur}
              placeholder="0"
              className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                error || hasValidationError
                  ? 'border-red-500 focus:ring-red-200'
                  : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
              }`}
              aria-describedby={error || hasValidationError ? `${id}-error` : undefined}
            />
          </div>
          {(error || hasValidationError) && (
            <p id={`${id}-error`} className="mt-1 text-sm text-red-600">
              {error || 'Please enter an amount or uncheck this deduction.'}
            </p>
          )}
          {amount > 0 && amount <= maxAmount && (
            <p className="mt-1 text-sm text-green-600">
              Deduction: ฿{Math.min(amount, maxAmount).toLocaleString()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

const DeductionsStepAnnual: React.FC<StepProps> = ({ formData, setFormData, showValidationErrors }) => {
  const deductions = [
    {
      id: 'lifeInsurance',
      label: 'Life Insurance Premiums',
      maxAmount: TAX_CONSTANTS.MAX_LIFE_INSURANCE,
      hasKey: 'hasLifeInsurance' as const,
      amountKey: 'lifeInsurance' as const,
      description: 'Premiums paid for life insurance policies with 10+ year terms',
    },
    {
      id: 'healthInsurance',
      label: 'Health Insurance Premiums',
      maxAmount: TAX_CONSTANTS.MAX_HEALTH_INSURANCE,
      hasKey: 'hasHealthInsurance' as const,
      amountKey: 'healthInsurance' as const,
      description: 'Premiums paid for health insurance policies',
    },
    {
      id: 'pensionFund',
      label: 'Government Pension Fund',
      maxAmount: TAX_CONSTANTS.MAX_PENSION_FUND,
      hasKey: 'hasPensionFund' as const,
      amountKey: 'pensionFund' as const,
      description: 'Contributions to government pension fund',
    },
    {
      id: 'providentFund',
      label: 'Provident Fund',
      maxAmount: TAX_CONSTANTS.MAX_PROVIDENT_FUND,
      hasKey: 'hasProvidentFund' as const,
      amountKey: 'providentFund' as const,
      description: 'Employee contributions to provident fund',
    },
    {
      id: 'rmf',
      label: 'RMF (Retirement Mutual Fund)',
      maxAmount: TAX_CONSTANTS.MAX_RMF,
      hasKey: 'hasRMF' as const,
      amountKey: 'rmf' as const,
      description: 'Investments in approved retirement mutual funds',
    },
    {
      id: 'ssf',
      label: 'SSF (Super Savings Fund)',
      maxAmount: TAX_CONSTANTS.MAX_SSF,
      hasKey: 'hasSSF' as const,
      amountKey: 'ssf' as const,
      description: 'Investments in approved super savings funds',
    },
    {
      id: 'donations',
      label: 'Charitable Donations',
      maxAmount: Math.floor(formData.annualIncome * TAX_CONSTANTS.MAX_DONATION_PERCENT),
      hasKey: 'hasDonations' as const,
      amountKey: 'donations' as const,
      description: 'Donations to approved charities (limited to 10% of income)',
    },
  ];

  const handleToggle = (hasKey: keyof typeof formData, checked: boolean) => {
    setFormData({ ...formData, [hasKey]: checked });
  };

  const handleAmountChange = (amountKey: keyof typeof formData, amount: number) => {
    setFormData({ ...formData, [amountKey]: amount });
  };

  const getTotalDeductions = (): number => {
    let total = 0;
    deductions.forEach((d) => {
      if (formData[d.hasKey]) {
        total += Math.min(formData[d.amountKey] as number, d.maxAmount);
      }
    });
    return total;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Additional Deductions</h2>
      <p className="text-gray-600 mb-6">
        Select the deductions that apply to you. These reduce your taxable income.
      </p>

      {/* Senior Citizen Allowance */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-amber-700">
            Taxpayers aged 65 or older are entitled to an additional ฿{TAX_CONSTANTS.SENIOR_ALLOWANCE.toLocaleString()} allowance.
          </p>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isAge65OrOlder}
            onChange={(e) => setFormData({ ...formData, isAge65OrOlder: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
          />
          <span className="text-gray-800">I am 65 years or older</span>
        </label>
      </div>

      <div className="mb-6">
        {deductions.map((d) => (
          <DeductionItem
            key={d.id}
            id={d.id}
            label={d.label}
            maxAmount={d.maxAmount}
            hasDeduction={formData[d.hasKey] as boolean}
            amount={formData[d.amountKey] as number}
            onToggle={(checked) => handleToggle(d.hasKey, checked)}
            onAmountChange={(amount) => handleAmountChange(d.amountKey, amount)}
            description={d.description}
            showValidationErrors={showValidationErrors}
          />
        ))}
      </div>

      {/* Total Deductions Summary */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-green-800">Total Deductions:</span>
          <span className="text-xl font-bold text-green-600">
            ฿{getTotalDeductions().toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeductionsStepAnnual;
