import { FreelancerStepProps } from '../../types/freelancerForm';
import { TAX_CONSTANTS } from '../../types/taxForm';
import { calculateChildAllowance } from '../../utils/taxCalculations';
import { calculateTotalFlatRateDeductions, getTotalGrossIncome, getTotalWithholding } from '../../utils/expenseCalculations';
import { getResidencyStatusDescription } from '../../utils/foreignIncomeCalculations';
import { INCOME_TYPE_INFO } from '../../data/incomeTypes';

interface FreelancerReviewStepProps extends FreelancerStepProps {
  goToStep: (step: number) => void;
}

const FreelancerReviewStep: React.FC<FreelancerReviewStepProps> = ({
  formData,
  goToStep,
  nextStep,
}) => {
  const formatCurrency = (amount: number): string => {
    return `฿${amount.toLocaleString()}`;
  };

  // Residency status
  const residencyStatus = getResidencyStatusDescription(formData.daysInThailand);

  // Income totals
  const thaiIncomeTotal = getTotalGrossIncome(formData.thaiIncomeEntries);
  const thaiWithholding = getTotalWithholding(formData.thaiIncomeEntries);
  const foreignIncomeTotal = formData.foreignIncomeEntries.reduce(
    (sum, e) => sum + e.amountThb,
    0
  );

  // Expense deduction preview
  const flatRateResult = calculateTotalFlatRateDeductions(formData.thaiIncomeEntries);
  const actualExpensesTotal = formData.actualExpenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  const getMaritalStatusLabel = () => {
    if (formData.maritalStatus === 'single') return 'Single';
    if (formData.maritalStatus === 'married') {
      return formData.spouseHasNoIncome
        ? 'Married (spouse has no income)'
        : 'Married (spouse has income)';
    }
    return 'Not specified';
  };

  const getExpenseMethodLabel = () => {
    switch (formData.expenseMethod) {
      case 'auto_compare':
        return 'Auto Compare (Best of Both)';
      case 'force_flat':
        return 'Flat-Rate Only';
      case 'force_actual':
        return 'Actual Expenses Only';
      default:
        return 'Not specified';
    }
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
      const maxDonation = (thaiIncomeTotal + foreignIncomeTotal) * TAX_CONSTANTS.MAX_DONATION_PERCENT;
      active.push({ label: 'Donations', amount: Math.min(formData.donations, maxDonation) });
    }
    return active;
  };

  const totalAllowances =
    TAX_CONSTANTS.PERSONAL_ALLOWANCE +
    (formData.maritalStatus === 'married' && formData.spouseHasNoIncome ? TAX_CONSTANTS.SPOUSE_ALLOWANCE : 0) +
    (formData.isAge65OrOlder ? TAX_CONSTANTS.SENIOR_ALLOWANCE : 0) +
    calculateChildAllowance(formData.children) +
    formData.numberOfParents * TAX_CONSTANTS.PARENT_ALLOWANCE;

  const activeDeductions = getActiveDeductions();
  const totalDeductions = activeDeductions.reduce((sum, d) => sum + d.amount, 0);

  // Step indices for freelancer flow (11 steps total)
  const STEP_INDICES = {
    EMPLOYMENT: 0,
    RESIDENCY: 1,
    FOREIGN_INCOME: 2,
    THAI_INCOME: 3,
    EXPENSE_METHOD: 4,
    ACTUAL_EXPENSES: 5,
    MARITAL: 6,
    DEPENDENTS: 7,
    DEDUCTIONS: 8,
    WITHHOLDING: 9,
  };

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
              <p className="text-gray-800 mt-1">Self-Employed / Freelancer</p>
            </div>
            <button
              onClick={() => goToStep(STEP_INDICES.EMPLOYMENT)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Residency Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-500 text-sm">Tax Residency</h3>
              <p className="text-gray-800 mt-1">{residencyStatus.status}</p>
              <p className="text-sm text-gray-600 mt-1">
                {formData.daysInThailand} days in Thailand
              </p>
            </div>
            <button
              onClick={() => goToStep(STEP_INDICES.RESIDENCY)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Foreign Income */}
        {formData.hasForeignIncome && formData.foreignIncomeEntries.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-medium text-gray-500 text-sm">Foreign Income</h3>
                <p className="text-gray-800 mt-1 text-lg font-semibold">
                  {formatCurrency(foreignIncomeTotal)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  {formData.foreignIncomeEntries.length} {formData.foreignIncomeEntries.length === 1 ? 'entry' : 'entries'}
                </p>
              </div>
              <button
                onClick={() => goToStep(STEP_INDICES.FOREIGN_INCOME)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {/* Thai Income */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-gray-500 text-sm">Thai Income</h3>
              <p className="text-gray-800 mt-1 text-lg font-semibold">
                {formatCurrency(thaiIncomeTotal)}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                {formData.thaiIncomeEntries.length} {formData.thaiIncomeEntries.length === 1 ? 'source' : 'sources'} |
                Withholding: {formatCurrency(thaiWithholding)}
              </p>
              {/* Income type breakdown */}
              {formData.thaiIncomeEntries.length > 0 && (
                <div className="mt-2 space-y-1">
                  {Object.entries(
                    formData.thaiIncomeEntries.reduce((acc, entry) => {
                      const type = entry.incomeType;
                      acc[type] = (acc[type] || 0) + entry.grossAmount;
                      return acc;
                    }, {} as Record<string, number>)
                  ).map(([type, amount]) => (
                    <div key={type} className="flex justify-between text-sm text-gray-600">
                      <span>{INCOME_TYPE_INFO[type as keyof typeof INCOME_TYPE_INFO]?.shortLabel || type}</span>
                      <span>{formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => goToStep(STEP_INDICES.THAI_INCOME)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Expense Method */}
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="font-medium text-gray-500 text-sm">Expense Deduction Method</h3>
              <p className="text-gray-800 mt-1">{getExpenseMethodLabel()}</p>
              <div className="mt-2 text-sm text-gray-600 space-y-1">
                <div className="flex justify-between">
                  <span>Flat-rate deduction:</span>
                  <span>{formatCurrency(flatRateResult.total)}</span>
                </div>
                {formData.expenseMethod !== 'force_flat' && (
                  <div className="flex justify-between">
                    <span>Actual expenses:</span>
                    <span>{formatCurrency(actualExpensesTotal)}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => goToStep(STEP_INDICES.EXPENSE_METHOD)}
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
              onClick={() => goToStep(STEP_INDICES.MARITAL)}
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
                {formData.isAge65OrOlder && (
                  <div className="flex justify-between">
                    <span>Senior allowance (65+):</span>
                    <span>{formatCurrency(TAX_CONSTANTS.SENIOR_ALLOWANCE)}</span>
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
              onClick={() => goToStep(STEP_INDICES.DEPENDENTS)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium ml-4"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Additional Deductions */}
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
              onClick={() => goToStep(STEP_INDICES.DEDUCTIONS)}
              className="text-blue-500 hover:text-blue-700 text-sm font-medium ml-4"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Additional Tax Withheld */}
        {formData.taxWithheld > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-500 text-sm">Additional Tax Withheld</h3>
                <p className="text-gray-800 mt-1 font-semibold">
                  {formatCurrency(formData.taxWithheld)}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  (Beyond income entry withholdings)
                </p>
              </div>
              <button
                onClick={() => goToStep(STEP_INDICES.WITHHOLDING)}
                className="text-blue-500 hover:text-blue-700 text-sm font-medium"
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {/* Total Withholding Summary */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-medium text-blue-700 text-sm">Total Tax Already Withheld</h3>
              <p className="text-blue-800 text-lg font-semibold">
                {formatCurrency(thaiWithholding + formData.taxWithheld)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => nextStep()}
        className="w-full mt-8 py-4 bg-green-500 text-white rounded-lg font-semibold text-lg hover:bg-green-600 transition-colors"
      >
        Calculate My Tax
      </button>
    </div>
  );
};

export default FreelancerReviewStep;
