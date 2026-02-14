import { useState } from 'react';
import { StepProps, TAX_CONSTANTS } from '../../types/taxForm';

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
      <h2 className="text-2xl font-bold text-gray-800 mb-2">What is your annual income?</h2>
      <p className="text-gray-600 mb-6">
        Enter your total gross income for the year before any deductions.
      </p>

      <div className="mb-6">
        <label htmlFor="annualIncome" className="block text-sm font-medium text-gray-700 mb-2">
          Annual Income (THB)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">฿</span>
          <input
            type="text"
            id="annualIncome"
            value={formatNumber(formData.annualIncome)}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="0"
            className={`w-full pl-8 pr-4 py-3 border rounded-lg text-lg focus:outline-none focus:ring-2 ${
              error
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-blue-200 focus:border-blue-500'
            }`}
            aria-describedby={error ? 'income-error' : undefined}
            aria-invalid={!!error}
          />
        </div>
        {error && (
          <p id="income-error" className="mt-2 text-sm text-red-600">
            {error}
          </p>
        )}
      </div>

      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-medium text-gray-700 mb-2">What to include:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Salary and wages</li>
          <li>• Bonuses and commissions</li>
          <li>• Freelance income</li>
          <li>• Business profits</li>
          <li>• Rental income</li>
        </ul>
      </div>

      {/* Social Security Contribution */}
      <div className="border border-gray-200 rounded-lg p-4">
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
            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div>
            <span className="text-sm font-medium text-gray-700">
              I made social security contributions
            </span>
            <p className="text-xs text-gray-500 mt-1">
              If you paid into the Social Security Office (SSO), you can deduct up to ฿{TAX_CONSTANTS.MAX_SOCIAL_SECURITY.toLocaleString()} for 2025.
            </p>
          </div>
        </label>

        {formData.includeSocialSecurity && (
          <div className="mt-4 ml-7">
            <label htmlFor="socialSecurity" className="block text-sm font-medium text-gray-700 mb-2">
              Total Social Security Contributions (THB)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">฿</span>
              <input
                type="text"
                id="socialSecurity"
                value={formData.socialSecurityContribution === 0 ? '' : formData.socialSecurityContribution.toLocaleString('en-US')}
                onChange={(e) => {
                  const value = e.target.value.replace(/,/g, '');
                  const numValue = parseFloat(value) || 0;
                  const cappedValue = Math.min(numValue, TAX_CONSTANTS.MAX_SOCIAL_SECURITY);
                  setFormData({ ...formData, socialSecurityContribution: cappedValue });
                }}
                placeholder="0"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Maximum: ฿{TAX_CONSTANTS.MAX_SOCIAL_SECURITY.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnnualIncomeStep;
