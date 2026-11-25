import { useState } from 'react';
import { StepProps, TaxFormData, TAX_CONSTANTS } from '../../types/taxForm';
import { CompanyOwnerFormData } from '../../types/companyOwnerForm';
import { calculateCompanyOwnerTax } from '../../utils/taxCalculations';

/**
 * Gross income for the donation hint. Company owners have no annualIncome field
 * (salary, fees and dividends instead), which used to make the hint read "max ฿NaN".
 */
function grossIncomeOf(formData: TaxFormData): number {
  if (formData.employmentType === 'company_owner') {
    return calculateCompanyOwnerTax(formData as unknown as CompanyOwnerFormData).grossIncome;
  }
  return Number.isFinite(formData.annualIncome) ? formData.annualIncome : 0;
}

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
    <div className={`border p-4 mb-3 ${hasValidationError ? 'border-desk' : 'border-paper-rule'}`}>
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={hasDeduction}
          onChange={(e) => onToggle(e.target.checked)}
         
        />
        <div className="flex-1">
          <span className="font-medium text-ink">{label}</span>
          <span className="text-sm text-ink-mute ml-2">(max ฿{maxAmount.toLocaleString()})</span>
        </div>
      </label>

      {description && (
        <p className="text-sm text-ink-mute mt-1 ml-8">{description}</p>
      )}

      {hasDeduction && (
        <div className="mt-3 ml-8 animate-fadeIn">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-mute">฿</span>
            <input
              type="text"
              inputMode="decimal"
              id={id}
              value={formatNumber(amount)}
              onChange={handleAmountChange}
              onBlur={handleBlur}
              placeholder="0"
              className="field-input pl-8"
            aria-invalid={!!(error || hasValidationError)}
              aria-describedby={error || hasValidationError ? `${id}-error` : undefined}
            />
          </div>
          {(error || hasValidationError) && (
            <p id={`${id}-error`} className="field-error">
              {error || 'Please enter an amount or uncheck this deduction.'}
            </p>
          )}
          {amount > 0 && amount <= maxAmount && (
            <p className="mt-1 text-sm text-ink">
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
      // Upper bound only: the real cap is 10% of income after all other deductions, applied by the engine.
      maxAmount: Math.floor(grossIncomeOf(formData) * TAX_CONSTANTS.MAX_DONATION_PERCENT),
      hasKey: 'hasDonations' as const,
      amountKey: 'donations' as const,
      description: 'Donations to approved charities (limited to 10% of income after your other deductions)',
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
      <h2 className="display text-2xl leading-tight text-ink sm:text-[28px] mb-2">Additional Deductions</h2>
      <p className="text-ink-soft mb-6">
        Select the deductions that apply to you. These reduce your taxable income.
      </p>

      {/* Senior Citizen Allowance */}
      <div className="border-desk p-4 mb-4 border-2">
        <div className="flex items-start gap-3 mb-3">
          <p className="text-sm text-ink">
            Taxpayers aged 65 or older are entitled to an additional ฿{TAX_CONSTANTS.SENIOR_ALLOWANCE.toLocaleString()} allowance.
          </p>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isAge65OrOlder}
            onChange={(e) => setFormData({ ...formData, isAge65OrOlder: e.target.checked })}
           
          />
          <span className="text-ink">I am 65 years or older</span>
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
      <div className="p-4 border-2 border-desk">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-ink">Total Deductions:</span>
          <span className="text-xl font-bold text-ink">
            ฿{getTotalDeductions().toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DeductionsStepAnnual;
