import { FreelancerStepProps, VisaType } from '../../types/freelancerForm';

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
  // daysInThailand === 0 means no answer yet; 181 = yes (resident); 90 = no (non-resident)
  const hasAnswered = formData.daysInThailand > 0;
  const isResident = formData.isThaiResident;

  const handleResidencyChoice = (stayed: boolean) => {
    setFormData({
      ...formData,
      daysInThailand: stayed ? 181 : 90,
      isThaiResident: stayed,
      // Reset fields that only apply to residents when switching to non-resident
      ...(stayed ? {} : { hasForeignIncome: false }),
    });
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

  const showError = showValidationErrors && !hasAnswered;

  return (
    <div>
      <h2 className="display text-2xl leading-tight text-ink sm:text-[28px] mb-2">
        Tax Residency Status
      </h2>
      <p className="text-ink-soft mb-6">
        Your tax residency determines how your income is taxed in Thailand.
      </p>

      {/* Yes/No Residency Question */}
      <div className="mb-6">
        <p className="text-sm font-medium text-ink-soft mb-3">
          Did you stay more than 180 days in Thailand during this tax year?
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => handleResidencyChoice(true)}
            className={`flex-1 py-4 px-6 border-2 text-base font-medium transition-colors ${
              hasAnswered && isResident
                ? 'border-desk text-ink'
                : 'bg-paper-white border-paper-rule text-ink-soft hover:border-ink/25 hover:bg-desk/[0.05]'
            }`}
            aria-pressed={hasAnswered && isResident}
          >
            Yes
          </button>
          <button
            type="button"
            onClick={() => handleResidencyChoice(false)}
            className={`flex-1 py-4 px-6 border-2 text-base font-medium transition-colors ${
              hasAnswered && !isResident
                ? 'border-desk text-ink'
                : 'bg-paper-white border-paper-rule text-ink-soft hover:border-ink/25 hover:bg-desk/[0.05]'
            }`}
            aria-pressed={hasAnswered && !isResident}
          >
            No
          </button>
        </div>
        {showError && (
          <p className="field-error">Please select an answer to continue.</p>
        )}
      </div>

      {/* Residency Status Badge */}
      {hasAnswered && (
        <div className={`p-4 border-2 mb-6 ${
          isResident
            ? 'border-ink/25'
            : 'border-desk'
        }`}>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-desk">
              {isResident ? (
                <svg className="w-6 h-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-6 h-6 text-ink" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
            </div>
            <div>
              <h3 className={`font-semibold ${isResident ? 'text-ink' : 'text-ink'}`}>
                {isResident ? 'Thai Tax Resident' : 'Non-Resident'}
              </h3>
              <p className={`text-sm ${isResident ? 'text-ink' : 'text-ink'}`}>
                {isResident
                  ? 'You are a tax resident (180+ days). Foreign income remitted to Thailand may be taxable.'
                  : 'You are a non-resident (less than 180 days). Only Thai-sourced income is taxable.'
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Visa Type Selection - Only shown for residents */}
      {isResident && hasAnswered && (
        <div className="mb-6 animate-fadeIn">
          <label htmlFor="visaType" className="block text-sm font-medium text-ink-soft mb-2">
            What type of visa or residency status do you have?
          </label>
          <select
            id="visaType"
            value={formData.visaType}
            onChange={(e) => handleVisaTypeChange(e.target.value as VisaType)}
            className="field-input h-12 text-lg"
          >
            {VISA_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {selectedVisaOption && (
            <p className="mt-2 text-sm text-ink-soft">
              {selectedVisaOption.description}
            </p>
          )}
        </div>
      )}

      {/* LTR Foreign Income Exemption Notice */}
      {isResident && hasForeignIncomeExemption && (
        <div className="border border-ink/25 p-4 mb-6 animate-fadeIn">
          <div className="flex items-start gap-3">
            <div>
              <h3 className="note-title">LTR Tax Benefit Applied</h3>
              <p className="text-sm text-ink-soft">
                As an LTR visa holder ({selectedVisaOption?.label}), your foreign income remitted to Thailand is <strong>tax exempt</strong>.
                You can still track foreign income for your records, but it will not be included in your taxable income calculation.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Foreign Income Question - Only shown for residents without LTR exemption */}
      {isResident && hasAnswered && !hasForeignIncomeExemption && (
        <div className="border border-ink/25 p-4 mb-6 animate-fadeIn">
          <div className="flex items-start gap-3 mb-4">
            <div>
              <p className="text-sm text-ink-soft mb-1">
                <strong>2024+ Rule:</strong> As a Thai tax resident, foreign income earned on or after January 1, 2024, and remitted to Thailand is now taxable.
              </p>
              <p className="text-sm text-ink-soft">
                This includes income from overseas employment, investments, or business activities.
              </p>
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer p-3 bg-paper-white border border-ink/25 hover:border-ink/25 transition-colors">
            <input
              type="checkbox"
              checked={formData.hasForeignIncome}
              onChange={(e) => handleForeignIncomeChange(e.target.checked)}
             
            />
            <span className="text-ink">I have foreign income that was remitted to Thailand</span>
          </label>
        </div>
      )}

      {/* Foreign Income Tracking for LTR holders - Optional */}
      {isResident && hasForeignIncomeExemption && (
        <div className="note mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.hasForeignIncome}
              onChange={(e) => handleForeignIncomeChange(e.target.checked)}
              
            />
            <span className="text-ink-soft">I want to track my foreign income (optional, for records only)</span>
          </label>
        </div>
      )}

      {/* Info box for non-residents */}
      {!isResident && hasAnswered && (
        <div className="note mb-6">
          <p className="text-sm text-ink-soft">
            As a non-resident, you only need to pay tax on income earned in Thailand. Foreign income is not taxable in Thailand for non-residents.
          </p>
        </div>
      )}
    </div>
  );
};

export default ResidencyStep;
