import { useState, useEffect } from 'react';
import { FreelancerStepProps, VisaType } from '../../types/freelancerForm';
import { TAX_THRESHOLDS } from '../../config/taxConfig';

// Visa type options for LTR tax benefits
const VISA_OPTIONS: { value: VisaType; label: string; description: string }[] = [
  { value: 'regular', label: 'Regular visa / no special status', description: 'Standard tax treatment' },
  { value: 'ltr_wealthy_global', label: 'LTR: Wealthy Global Citizen', description: 'Foreign income tax exempt' },
  { value: 'ltr_wealthy_pensioner', label: 'LTR: Wealthy Pensioner', description: 'Foreign income tax exempt' },
  { value: 'ltr_work_from_thailand', label: 'LTR: Work-from-Thailand Professional', description: 'Foreign income tax exempt' },
  { value: 'ltr_highly_skilled', label: 'LTR: Highly Skilled Professional', description: '17% flat rate on Thai employment income' },
  { value: 'thailand_privilege', label: 'Thailand Privilege / Elite', description: 'Standard tax treatment (no special benefits)' },
  { value: 'other', label: 'Other', description: 'Standard tax treatment' },
];

const ResidencyStep: React.FC<FreelancerStepProps> = ({
  formData,
  setFormData,
  showValidationErrors
}) => {
  const [localDays, setLocalDays] = useState<string>(
    formData.daysInThailand > 0 ? formData.daysInThailand.toString() : ''
  );
  const [touched, setTouched] = useState(false);

  // Compute residency status
  const daysNumber = parseInt(localDays, 10) || 0;
  const isResident = daysNumber >= TAX_THRESHOLDS.THAI_RESIDENCY_DAYS;
  const isValidDays = daysNumber >= 0 && daysNumber <= 365;

  // Update form data when days change
  useEffect(() => {
    if (isValidDays) {
      setFormData({
        ...formData,
        daysInThailand: daysNumber,
        isThaiResident: isResident,
      });
    }
  }, [daysNumber, isResident, isValidDays]);

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow empty or numeric input only
    if (value === '' || /^\d+$/.test(value)) {
      setLocalDays(value);
    }
  };

  const handleBlur = () => {
    setTouched(true);
    // Clamp value to valid range
    if (daysNumber > 365) {
      setLocalDays('365');
    }
  };

  const handleForeignIncomeChange = (hasForeignIncome: boolean) => {
    setFormData({ ...formData, hasForeignIncome });
  };

  const handleVisaTypeChange = (visaType: VisaType) => {
    setFormData({ ...formData, visaType });
  };

  // Check if selected visa grants foreign income exemption
  const hasForeignIncomeExemption = ['ltr_wealthy_global', 'ltr_wealthy_pensioner', 'ltr_work_from_thailand'].includes(formData.visaType);
  const selectedVisaOption = VISA_OPTIONS.find(v => v.value === formData.visaType);

  const showError = (touched || showValidationErrors) && (!isValidDays || daysNumber === 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Tax Residency Status
      </h2>
      <p className="text-gray-600 mb-6">
        Your tax residency determines how your income is taxed in Thailand.
      </p>

      {/* Days in Thailand Input */}
      <div className="mb-6">
        <label htmlFor="daysInThailand" className="block text-sm font-medium text-gray-700 mb-2">
          How many days did you spend in Thailand this tax year?
        </label>
        <div className="relative">
          <input
            id="daysInThailand"
            type="text"
            inputMode="numeric"
            value={localDays}
            onChange={handleDaysChange}
            onBlur={handleBlur}
            placeholder="e.g., 200"
            className={`w-full px-4 py-3 border-2 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              showError
                ? 'border-red-300 focus:border-red-500'
                : 'border-gray-200 focus:border-blue-500'
            }`}
            aria-describedby="days-help days-error"
          />
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
            days
          </span>
        </div>
        <p id="days-help" className="mt-1 text-sm text-gray-500">
          Enter the number of days from January 1 to December 31 (max 365)
        </p>
        {showError && (
          <p id="days-error" className="mt-1 text-sm text-red-600">
            Please enter a valid number of days (1-365)
          </p>
        )}
      </div>

      {/* Residency Status Badge */}
      {daysNumber > 0 && isValidDays && (
        <div className={`p-4 rounded-lg border-2 mb-6 ${
          isResident
            ? 'bg-green-50 border-green-200'
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              isResident ? 'bg-green-100' : 'bg-yellow-100'
            }`}>
              {isResident ? (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <div>
              <h3 className={`font-semibold ${isResident ? 'text-green-800' : 'text-yellow-800'}`}>
                {isResident ? 'Thai Tax Resident' : 'Non-Resident'}
              </h3>
              <p className={`text-sm ${isResident ? 'text-green-700' : 'text-yellow-700'}`}>
                {isResident
                  ? `With ${daysNumber} days in Thailand, you are a tax resident (180+ days). Foreign income remitted to Thailand may be taxable.`
                  : `With ${daysNumber} days in Thailand, you are a non-resident (less than 180 days). Only Thai-sourced income is taxable.`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Visa Type Selection - Only shown for residents */}
      {isResident && daysNumber > 0 && (
        <div className="mb-6 animate-fadeIn">
          <label htmlFor="visaType" className="block text-sm font-medium text-gray-700 mb-2">
            What type of visa or residency status do you have?
          </label>
          <select
            id="visaType"
            value={formData.visaType}
            onChange={(e) => handleVisaTypeChange(e.target.value as VisaType)}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
          >
            {VISA_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedVisaOption && (
            <p className="mt-2 text-sm text-gray-600">
              {selectedVisaOption.description}
            </p>
          )}
        </div>
      )}

      {/* LTR Foreign Income Exemption Notice */}
      {isResident && hasForeignIncomeExemption && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center bg-purple-100">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-purple-800">LTR Tax Benefit Applied</h3>
              <p className="text-sm text-purple-700">
                As an LTR visa holder ({selectedVisaOption?.label}), your foreign income remitted to Thailand is <strong>tax exempt</strong>.
                You can still track foreign income for your records, but it will not be included in your taxable income calculation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Foreign Income Question - Only shown for residents without LTR exemption */}
      {isResident && daysNumber > 0 && !hasForeignIncomeExemption && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 animate-fadeIn">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-blue-700 mb-1">
                <strong>2024+ Rule:</strong> As a Thai tax resident, foreign income earned on or after January 1, 2024, and remitted to Thailand is now taxable.
              </p>
              <p className="text-sm text-blue-600">
                This includes income from overseas employment, investments, or business activities.
              </p>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-3 bg-white rounded-lg border border-blue-100 hover:border-blue-300 transition-colors">
            <input
              type="checkbox"
              checked={formData.hasForeignIncome}
              onChange={(e) => handleForeignIncomeChange(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-800">I have foreign income that was remitted to Thailand</span>
          </label>
        </div>
      )}

      {/* Foreign Income Tracking for LTR holders - Optional */}
      {isResident && hasForeignIncomeExemption && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasForeignIncome}
              onChange={(e) => handleForeignIncomeChange(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-gray-500 focus:ring-gray-500"
            />
            <span className="text-gray-700">I want to track my foreign income (optional, for records only)</span>
          </label>
        </div>
      )}

      {/* Info box for non-residents */}
      {!isResident && daysNumber > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            As a non-resident, you only need to pay tax on income earned in Thailand. Foreign income is not taxable in Thailand for non-residents.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResidencyStep;
