import { useState, useEffect } from 'react';
import { FreelancerStepProps } from '../../types/freelancerForm';
import { TAX_THRESHOLDS } from '../../config/taxConfig';

const ResidencyStep: React.FC<FreelancerStepProps> = ({
  formData,
  setFormData,
  nextStep,
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

  const handleContinue = () => {
    if (isValidDays && daysNumber > 0) {
      const updatedData = {
        ...formData,
        daysInThailand: daysNumber,
        isThaiResident: isResident,
      };
      setFormData(updatedData);
      nextStep(updatedData);
    }
  };

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

      {/* Foreign Income Question - Only shown for residents */}
      {isResident && daysNumber > 0 && (
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

      {/* Info box for non-residents */}
      {!isResident && daysNumber > 0 && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-600">
            As a non-resident, you only need to pay tax on income earned in Thailand. Foreign income is not taxable in Thailand for non-residents.
          </p>
        </div>
      )}

      {/* Continue Button */}
      <button
        onClick={handleContinue}
        disabled={!isValidDays || daysNumber === 0}
        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
          isValidDays && daysNumber > 0
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-gray-200 text-gray-500 cursor-not-allowed'
        }`}
      >
        Continue
      </button>
    </div>
  );
};

export default ResidencyStep;
