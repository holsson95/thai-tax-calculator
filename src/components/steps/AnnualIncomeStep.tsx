import { useState } from 'react';
import { StepProps, TAX_CONSTANTS } from '../../types/taxForm';
import { TAX_YEAR_CONFIG } from '../../config/taxConfig';

const AnnualIncomeStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const [error, setError] = useState<string>('');
  const [touched, setTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(value) || 0;
    setFormData({ ...formData, annualIncome: numValue });

    if (touched) {
      validateInput(numValue);
    }
  };

  const validateInput = (value: number) => {
    if (value <= 0) {
      setError('Please enter your annual income');
      return false;
    }
    setError('');
    return true;
  };

  const handleBlur = () => {
    setTouched(true);
    validateInput(formData.annualIncome);
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '';
    return num.toLocaleString('en-US');
  };

  return (
    <div>
      <h2 className="display text-2xl leading-tight text-ink sm:text-[28px] mb-2">What is your annual income?</h2>
      <p className="text-ink-soft mb-6">
        Enter your total gross income for the year before any deductions.
      </p>

      <div className="mb-6">
        <label htmlFor="annualIncome" className="block text-sm font-medium text-ink-soft mb-2">
          Annual Income (THB)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-mute">฿</span>
          <input
            type="text"
            inputMode="decimal"
            id="annualIncome"
            value={formatNumber(formData.annualIncome)}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="0"
            className="field-input pl-8 h-12 text-lg"
            aria-describedby={error ? 'income-error' : undefined}
            aria-invalid={!!error}
          />
        </div>
        {error && (
          <p id="income-error" className="field-error">
            {error}
          </p>
        )}
      </div>

      <div className="p-4 mb-6 border border-ink/25">
        <h3 className="note-title">What to include:</h3>
        <ul className="text-sm text-ink-soft space-y-1">
          <li>• Salary and wages</li>
          <li>• Bonuses and commissions</li>
          <li>• Freelance income</li>
          <li>• Business profits</li>
          <li>• Rental income</li>
        </ul>
      </div>

      {/* Social Security Contribution */}
      <div className="border border-paper-rule p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.includeSocialSecurity}
            onChange={(e) => {
              setFormData({
                ...formData,
                includeSocialSecurity: e.target.checked,
                socialSecurityContribution: e.target.checked ? formData.socialSecurityContribution : 0,
              });
            }}
            className="mt-1"
          />
          <div>
            <span className="text-sm font-medium text-ink-soft">
              I made social security contributions
            </span>
            <p className="text-xs text-ink-mute mt-1">
              If you paid into the Social Security Office (SSO), you can deduct up to ฿{TAX_CONSTANTS.MAX_SOCIAL_SECURITY.toLocaleString()} for {TAX_YEAR_CONFIG.CURRENT_TAX_YEAR}.
            </p>
          </div>
        </label>

        {formData.includeSocialSecurity && (
          <div className="mt-4 ml-7">
            <label htmlFor="socialSecurity" className="block text-sm font-medium text-ink-soft mb-2">
              Total Social Security Contributions (THB)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ink-mute">฿</span>
              <input
                type="text"
                inputMode="decimal"
                id="socialSecurity"
                value={formData.socialSecurityContribution === 0 ? '' : formData.socialSecurityContribution.toLocaleString('en-US')}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '');
                  const numValue = parseFloat(value) || 0;
                  const cappedValue = Math.min(numValue, TAX_CONSTANTS.MAX_SOCIAL_SECURITY);
                  setFormData({ ...formData, socialSecurityContribution: cappedValue });
                }}
                placeholder="0"
                className="field-input pl-8 pr-4"
              />
            </div>
            <p className="text-xs text-ink-mute mt-1">
              Maximum: ฿{TAX_CONSTANTS.MAX_SOCIAL_SECURITY.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnualIncomeStep;
