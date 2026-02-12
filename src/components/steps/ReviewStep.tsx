import { StepProps, TAX_CONSTANTS } from '../../types/taxForm';
import { calculateChildAllowance } from '../../utils/taxCalculations';

interface ReviewStepProps extends StepProps {
  goToStep: (step: number) => void;
}

const ReviewStep: React.FC<ReviewStepProps> = ({ formData, goToStep, nextStep }) => {
  const formatCurrency = (amount: number): string => {
    return `฿${amount.toLocaleString()}`;
  };

  const getEmploymentTypeLabel = () => {
    switch (formData.employmentType) {
      case 'salaried': return 'Salaried Employee';
      case 'self-employed': return 'Self-Employed / Freelancer';
      case 'business': return 'Business Owner';
      default: return 'Not specified';
    }
  };

  const getMaritalStatusLabel = () => {
    if (formData.maritalStatus === 'single') return 'Single';
    if (formData.maritalStatus === 'married') {
      return formData.spouseHasNoIncome
        ? 'Married (spouse has no income)'
        : 'Married (spouse has income)';
    }
    return 'Not specified';
  };

  const getActiveDeductions = () => {
    const active = [];
    if (formData.hasLifeInsurance && formData.lifeInsurance > 0) {
      active.push({ label: 'Life Insurance', amount: Math.min(formData.lifeInsurance, TAX_CONSTANTS.MAX_LIFE_INSURANCE) });
    }
    if (formData.hasHealthInsurance && formData.healthInsurance > 0) {
      active.push({ label: 'Health Insurance', amount: Math.min(formData.healthInsurance, TAX_CONSTANTS.MAX_HEALTH_INSURANCE) });
    }
    if (formData.hasPensionFund && formData.pensionFund > 0) {
      active.push({ label: 'Pension Fund', amount: Math.min(formData.pensionFund, TAX_CONSTANTS.MAX_PENSION_FUND) });
    }
    if (formData.hasProvidentFund && formData.providentFund > 0) {
      active.push({ label: 'Provident Fund', amount: Math.min(formData.providentFund, TAX_CONSTANTS.MAX_PROVIDENT_FUND) });
    }
    if (formData.hasRMF && formData.rmf > 0) {
      active.push({ label: 'RMF', amount: Math.min(formData.rmf, TAX_CONSTANTS.MAX_RMF) });
    }
    if (formData.hasSSF && formData.ssf > 0) {
      active.push({ label: 'SSF', amount: Math.min(formData.ssf, TAX_CONSTANTS.MAX_SSF) });
    }
    if (formData.hasDonations && formData.donations > 0) {
      const maxDonation = formData.annualIncome * TAX_CONSTANTS.MAX_DONATION_PERCENT;
      active.push({ label: 'Donations', amount: Math.min(formData.donations, maxDonation) });
    }
    return active;
  };

  const totalAllowances =
    TAX_CONSTANTS.PERSONAL_ALLOWANCE +
    (formData.maritalStatus === 'married' && formData.spouseHasNoIncome ? TAX_CONSTANTS.SPOUSE_ALLOWANCE : 0) +
    calculateChildAllowance(formData.children) +
    formData.numberOfParents * TAX_CONSTANTS.PARENT_ALLOWANCE;

  const activeDeductions = getActiveDeductions();
  const totalDeductions = activeDeductions.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Review Your Information</h2>
      <p className="text-gray-600 mb-6">
        Please verify your information before calculating your tax.
      </p>

      <div className="space-y-4">
        {/* Employment Type */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-500 text-sm">Employment Type</h3>
              <p className="text-gray-800 mt-1">{getEmploymentTypeLabel()}</p>
            </div>
            <button
              onClick={() => goToStep(0)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Annual Income */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-500 text-sm">Annual Income</h3>
              <p className="text-gray-800 mt-1 text-lg font-semibold">
                {formatCurrency(formData.annualIncome)}
              </p>
            </div>
            <button
              onClick={() => goToStep(1)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Marital Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-500 text-sm">Marital Status</h3>
              <p className="text-gray-800 mt-1">{getMaritalStatusLabel()}</p>
            </div>
            <button
              onClick={() => goToStep(2)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Dependents & Allowances */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-gray-500 text-sm">Dependents & Allowances</h3>
              <div className="mt-2 text-sm text-gray-700 space-y-1">
                <div className="flex justify-between">
                  <span>Personal allowance:</span>
                  <span>{formatCurrency(TAX_CONSTANTS.PERSONAL_ALLOWANCE)}</span>
                </div>
                {formData.maritalStatus === 'married' && formData.spouseHasNoIncome && (
                  <div className="flex justify-between">
                    <span>Spouse allowance:</span>
                    <span>{formatCurrency(TAX_CONSTANTS.SPOUSE_ALLOWANCE)}</span>
                  </div>
                )}
                {formData.children.length > 0 && (
                  <div className="flex justify-between">
                    <span>Children ({formData.children.length}):</span>
                    <span>{formatCurrency(calculateChildAllowance(formData.children))}</span>
                  </div>
                )}
                {formData.numberOfParents > 0 && (
                  <div className="flex justify-between">
                    <span>Parents ({formData.numberOfParents}):</span>
                    <span>{formatCurrency(formData.numberOfParents * TAX_CONSTANTS.PARENT_ALLOWANCE)}</span>
                  </div>
                )}
                <div className="flex justify-between font-semibold border-t border-gray-300 pt-1 mt-1">
                  <span>Total allowances:</span>
                  <span className="text-green-600">{formatCurrency(totalAllowances)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => goToStep(3)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium ml-4"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Deductions */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-gray-500 text-sm">Additional Deductions</h3>
              {activeDeductions.length > 0 ? (
                <div className="mt-2 text-sm text-gray-700 space-y-1">
                  {activeDeductions.map((d) => (
                    <div key={d.label} className="flex justify-between">
                      <span>{d.label}:</span>
                      <span>{formatCurrency(d.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold border-t border-gray-300 pt-1 mt-1">
                    <span>Total deductions:</span>
                    <span className="text-green-600">{formatCurrency(totalDeductions)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 mt-1 text-sm">No deductions claimed</p>
              )}
            </div>
            <button
              onClick={() => goToStep(4)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium ml-4"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Tax Withholding */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-500 text-sm">Tax Already Withheld</h3>
              <p className="text-gray-800 mt-1 font-semibold">
                {formatCurrency(formData.taxWithheld)}
              </p>
            </div>
            <button
              onClick={() => goToStep(5)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={nextStep}
        className="w-full mt-8 py-4 bg-green-500 text-white rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors"
      >
        Calculate My Tax
      </button>
    </div>
  );
};

export default ReviewStep;
