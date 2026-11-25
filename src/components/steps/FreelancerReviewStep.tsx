import { FreelancerStepProps } from '../../types/freelancerForm';
import { TAX_CONSTANTS } from '../../types/taxForm';
import { calculateChildAllowance, calculateFreelancerTax } from '../../utils/taxCalculations';
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

  // Capped amounts straight from the engine, so this screen always matches the results.
  const engineResult = (() => {
    const r = calculateFreelancerTax(formData);
    return { totalAllowances: r.totalAllowances, deductions: r.deductionBreakdown };
  })();
  const getActiveDeductions = () => {
    const d = engineResult.deductions;
    return [
      { label: 'Life Insurance', amount: d.lifeInsurance },
      { label: 'Health Insurance', amount: d.healthInsurance },
      { label: 'Pension Fund', amount: d.pensionFund },
      { label: 'Provident Fund', amount: d.providentFund },
      { label: 'RMF', amount: d.rmf },
      { label: 'SSF', amount: d.ssf },
      { label: 'Donations', amount: d.donations },
    ].filter((item) => item.amount > 0);
  };

  const totalAllowances = engineResult.totalAllowances;

  const activeDeductions = getActiveDeductions();
  const totalDeductions = activeDeductions.reduce((sum, d) => sum + d.amount, 0);

  // Step indices for freelancer flow (10 steps total)
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
  };

  return (
    <div>
      <h2 className="display text-2xl leading-tight text-ink sm:text-[28px] mb-2">Review Your Information</h2>
      <p className="text-ink-soft mb-6">
        Please verify your information before calculating your tax.
      </p>

      <div className="space-y-4">
        {/* Employment Type */}
        <div className="p-4 border border-ink/25">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="field-label text-ink-mute">Employment Type</h3>
              <p className="text-ink mt-1">Self-Employed / Freelancer</p>
            </div>
            <button
              onClick={() => goToStep(STEP_INDICES.EMPLOYMENT)}
              className="text-sm font-semibold text-desk underline decoration-desk/40 underline-offset-4 hover:decoration-desk"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Residency Status */}
        <div className="p-4 border border-ink/25">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="field-label text-ink-mute">Tax Residency</h3>
              <p className="text-ink mt-1">{residencyStatus.status}</p>
              <p className="text-sm text-ink-soft mt-1">
                {formData.daysInThailand} days in Thailand
              </p>
            </div>
            <button
              onClick={() => goToStep(STEP_INDICES.RESIDENCY)}
              className="text-sm font-semibold text-desk underline decoration-desk/40 underline-offset-4 hover:decoration-desk"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Foreign Income */}
        {formData.hasForeignIncome && formData.foreignIncomeEntries.length > 0 && (
          <div className="p-4 border border-ink/25">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="field-label text-ink-mute">Foreign Income</h3>
                <p className="text-ink mt-1 text-lg font-semibold">
                  {formatCurrency(foreignIncomeTotal)}
                </p>
                <p className="text-sm text-ink-soft mt-1">
                  {formData.foreignIncomeEntries.length} {formData.foreignIncomeEntries.length === 1 ? 'entry' : 'entries'}
                </p>
              </div>
              <button
                onClick={() => goToStep(STEP_INDICES.FOREIGN_INCOME)}
                className="text-sm font-semibold text-desk underline decoration-desk/40 underline-offset-4 hover:decoration-desk"
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {/* Thai Income */}
        <div className="p-4 border border-ink/25">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="field-label text-ink-mute">Thai Income</h3>
              <p className="text-ink mt-1 text-lg font-semibold">
                {formatCurrency(thaiIncomeTotal)}
              </p>
              <p className="text-sm text-ink-soft mt-1">
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
                    <div key={type} className="flex justify-between text-sm text-ink-soft">
                      <span>{INCOME_TYPE_INFO[type as keyof typeof INCOME_TYPE_INFO]?.shortLabel || type}</span>
                      <span>{formatCurrency(amount)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button
              onClick={() => goToStep(STEP_INDICES.THAI_INCOME)}
              className="text-sm font-semibold text-desk underline decoration-desk/40 underline-offset-4 hover:decoration-desk"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Expense Method */}
        <div className="p-4 border border-ink/25">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="field-label text-ink-mute">Expense Deduction Method</h3>
              <p className="text-ink mt-1">{getExpenseMethodLabel()}</p>
              <div className="mt-2 text-sm text-ink-soft space-y-1">
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
              className="text-sm font-semibold text-desk underline decoration-desk/40 underline-offset-4 hover:decoration-desk"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Marital Status */}
        <div className="p-4 border border-ink/25">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="field-label text-ink-mute">Marital Status</h3>
              <p className="text-ink mt-1">{getMaritalStatusLabel()}</p>
            </div>
            <button
              onClick={() => goToStep(STEP_INDICES.MARITAL)}
              className="text-sm font-semibold text-desk underline decoration-desk/40 underline-offset-4 hover:decoration-desk"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Dependents & Allowances */}
        <div className="p-4 border border-ink/25">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="field-label text-ink-mute">Dependents & Allowances</h3>
              <div className="mt-2 text-sm text-ink-soft space-y-1">
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
                <div className="flex justify-between font-semibold border-t border-ink/25 pt-1 mt-1">
                  <span>Total allowances:</span>
                  <span className="text-ink">{formatCurrency(totalAllowances)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => goToStep(STEP_INDICES.DEPENDENTS)}
              className="text-sm font-semibold text-desk underline decoration-desk/40 underline-offset-4 hover:decoration-desk ml-4"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Additional Deductions */}
        <div className="p-4 border border-ink/25">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="field-label text-ink-mute">Additional Deductions</h3>
              {activeDeductions.length > 0 ? (
                <div className="mt-2 text-sm text-ink-soft space-y-1">
                  {activeDeductions.map((d) => (
                    <div key={d.label} className="flex justify-between">
                      <span>{d.label}:</span>
                      <span>{formatCurrency(d.amount)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-semibold border-t border-ink/25 pt-1 mt-1">
                    <span>Total deductions:</span>
                    <span className="text-ink">{formatCurrency(totalDeductions)}</span>
                  </div>
                </div>
              ) : (
                <p className="text-ink-mute mt-1 text-sm">No deductions claimed</p>
              )}
            </div>
            <button
              onClick={() => goToStep(STEP_INDICES.DEDUCTIONS)}
              className="text-sm font-semibold text-desk underline decoration-desk/40 underline-offset-4 hover:decoration-desk ml-4"
            >
              Edit
            </button>
          </div>
        </div>

        {/* Total Withholding Summary */}
        <div className="p-4 border border-ink/25">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="field-label text-ink">Total Tax Already Withheld</h3>
              <p className="text-ink text-lg font-semibold">
                {formatCurrency(thaiWithholding)}
              </p>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={() => nextStep()}
        className="w-full mt-8 py-4 bg-desk text-white font-semibold text-lg hover:bg-desk-deep transition-colors"
      >
        Calculate My Tax
      </button>
    </div>
  );
};

export default FreelancerReviewStep;
