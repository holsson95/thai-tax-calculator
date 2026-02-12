import { useState } from 'react';
import { StepProps } from '../../types/taxForm';

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

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-700 mb-2">What to include:</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Salary and wages</li>
          <li>• Bonuses and commissions</li>
          <li>• Freelance income</li>
          <li>• Business profits</li>
          <li>• Rental income</li>
        </ul>
      </div>
    </div>
  );
};

export default AnnualIncomeStep;
