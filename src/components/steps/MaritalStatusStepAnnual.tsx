import { useState } from 'react';
import { StepProps, TAX_CONSTANTS } from '../../types/taxForm';

const MaritalStatusStepAnnual: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
  const [showSpouseQuestion, setShowSpouseQuestion] = useState(formData.maritalStatus === 'married');

  const handleMaritalStatusSelect = (status: 'single' | 'married') => {
    if (status === 'single') {
      setFormData({ ...formData, maritalStatus: status, spouseHasNoIncome: false });
      setShowSpouseQuestion(false);
      nextStep();
    } else {
      setFormData({ ...formData, maritalStatus: status });
      setShowSpouseQuestion(true);
    }
  };

  const handleSpouseIncomeChange = (hasNoIncome: boolean) => {
    setFormData({ ...formData, spouseHasNoIncome: hasNoIncome });
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">What is your marital status?</h2>
      <p className="text-gray-600 mb-6">
        Your marital status affects your tax allowances.
      </p>

      <div className="space-y-4 mb-6">
        <button
          onClick={() => handleMaritalStatusSelect('single')}
          className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${
            formData.maritalStatus === 'single'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200'
          }`}
          aria-pressed={formData.maritalStatus === 'single'}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">👤</span>
            <div>
              <h3 className="font-semibold text-gray-800">Single</h3>
              <p className="text-sm text-gray-500">Not married or legally separated</p>
            </div>
          </div>
        </button>

        <button
          onClick={() => handleMaritalStatusSelect('married')}
          className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${
            formData.maritalStatus === 'married'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200'
          }`}
          aria-pressed={formData.maritalStatus === 'married'}
        >
          <div className="flex items-center gap-4">
            <span className="text-3xl">👫</span>
            <div>
              <h3 className="font-semibold text-gray-800">Married</h3>
              <p className="text-sm text-gray-500">Legally married</p>
            </div>
          </div>
        </button>
      </div>

      {/* Spouse Income Question - Only shown when married is selected */}
      {showSpouseQuestion && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 animate-fadeIn">
          <div className="flex items-start gap-3 mb-4">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-blue-700">
              You can claim a ฿{TAX_CONSTANTS.SPOUSE_ALLOWANCE.toLocaleString()} spouse allowance only if your spouse has no income during the tax year.
            </p>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.spouseHasNoIncome}
              onChange={(e) => handleSpouseIncomeChange(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-blue-500 focus:ring-blue-500"
            />
            <span className="text-gray-800">My spouse has no income</span>
          </label>
        </div>
      )}

    </div>
  );
};

export default MaritalStatusStepAnnual;
