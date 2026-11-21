import { useEffect, useState, useMemo } from 'react';
import LeadCTA from '../leads/LeadCTA';
import { leadContextFromSalary } from '../../utils/leadContext';
import { track, taxBand } from '../../utils/analytics';
import { MonthlyFormData, MonthlyIncomeEntry, MONTHLY_TAX_CONSTANTS, ChildData } from '../../types/taxForm';
import { calculateThaiTax, getTaxByBracket } from '../../utils/tax';
import TaxFlowDiagram, { TaxFlowStep, TaxFlowBracket } from '../TaxFlowDiagram';
import TakeHomeIncomeCard from '../TakeHomeIncomeCard';
import { FieldLabel, ResultCell, SourceTicket, Stamp, StepHeading } from '../ui/form';
import { RULES_TAX_YEAR } from '../../config/taxRules';

const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Calculate child allowance with birth year bonuses
const calculateChildAllowance = (children: ChildData[]): number => {
  return children.reduce((total, child, index) => {
    let allowance = MONTHLY_TAX_CONSTANTS.CHILD_ALLOWANCE_BASE;
    // Bonus for 2nd+ child born 2018 or later
    if (index >= 1 && child.birthYear >= MONTHLY_TAX_CONSTANTS.CHILD_BONUS_BIRTH_YEAR) {
      allowance += MONTHLY_TAX_CONSTANTS.CHILD_ALLOWANCE_BONUS;
    }
    return total + allowance;
  }, 0);
};

interface MonthlyResultsStepProps {
  formData: MonthlyFormData;
  setFormData: (data: MonthlyFormData) => void;
  onStartOver: () => void;
}

interface EditableValue {
  key: string;
  label: string;
  value: number;
  editable: boolean;
  maxValue?: number;
}

const MonthlyResultsStep: React.FC<MonthlyResultsStepProps> = ({ formData, setFormData, onStartOver }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [editingField, setEditingField] = useState<string | null>(null);

  // Calculate annual income from formData
  const getAnnualIncome = (): number => {
    if (formData.incomeType === 'variable' && formData.variableIncome?.length === 12) {
      return formData.variableIncome.reduce((sum: number, entry: MonthlyIncomeEntry) => {
        return sum + entry.salary + entry.bonus + entry.housingAllowance + entry.otherIncome;
      }, 0);
    }
    // Fixed income: monthly salary * 12 + annual bonus + annual other income
    return (formData.monthlySalary * 12) + (formData.annualBonus || 0) + (formData.annualOtherIncome || 0);
  };

  // Calculate tax based on current formData
  const calculateResult = useMemo(() => {
    const annualIncome = getAnnualIncome();

    // Standard expense deduction for employment income: 50% of income, max 100,000 THB
    const standardDeduction = Math.min(
      annualIncome * MONTHLY_TAX_CONSTANTS.STANDARD_DEDUCTION_RATE,
      MONTHLY_TAX_CONSTANTS.MAX_STANDARD_DEDUCTION
    );

    const personalAllowance = MONTHLY_TAX_CONSTANTS.PERSONAL_ALLOWANCE;
    let totalAllowances = personalAllowance;
    let otherDeductions = 0;

    // Add social security if included
    if (formData.includeSocialSecurity && formData.socialSecurityContribution > 0) {
      otherDeductions += Math.min(formData.socialSecurityContribution, MONTHLY_TAX_CONSTANTS.MAX_SOCIAL_SECURITY);
    }

    // For detailed estimate, add more deductions
    if (formData.estimateType === 'detailed') {
      // Spouse allowance
      if (formData.maritalStatus === 'married' && formData.spouseHasNoIncome) {
        totalAllowances += MONTHLY_TAX_CONSTANTS.SPOUSE_ALLOWANCE;
      }

      // Child allowance with birth year bonuses
      const childAllowance = calculateChildAllowance(formData.children || []);
      totalAllowances += childAllowance;

      // Parent allowance
      const parentAllowance = (formData.numberOfParents || 0) * MONTHLY_TAX_CONSTANTS.PARENT_ALLOWANCE;
      totalAllowances += parentAllowance;

      // Insurance deductions
      if (formData.hasLifeInsurance) {
        otherDeductions += Math.min(formData.lifeInsurance || 0, MONTHLY_TAX_CONSTANTS.MAX_LIFE_INSURANCE);
      }
      if (formData.hasHealthInsurance) {
        otherDeductions += Math.min(formData.healthInsurance || 0, MONTHLY_TAX_CONSTANTS.MAX_HEALTH_INSURANCE);
      }
      if (formData.hasPensionFund) {
        otherDeductions += Math.min(formData.pensionFund || 0, MONTHLY_TAX_CONSTANTS.MAX_PENSION_FUND);
      }
      if (formData.hasProvidentFund) {
        otherDeductions += Math.min(formData.providentFund || 0, MONTHLY_TAX_CONSTANTS.MAX_PROVIDENT_FUND);
      }
      if (formData.hasRMF) {
        otherDeductions += Math.min(formData.rmf || 0, MONTHLY_TAX_CONSTANTS.MAX_RMF);
      }
      if (formData.hasSSF) {
        otherDeductions += Math.min(formData.ssf || 0, MONTHLY_TAX_CONSTANTS.MAX_SSF);
      }

      // Donations (limited to 10% of income)
      if (formData.hasDonations) {
        const maxDonation = Math.floor(annualIncome * MONTHLY_TAX_CONSTANTS.MAX_DONATION_PERCENT);
        otherDeductions += Math.min(formData.donations || 0, maxDonation);
      }
    }

    const totalDeductions = standardDeduction + totalAllowances + otherDeductions;
    const taxableIncome = Math.max(0, annualIncome - totalDeductions);
    const annualTax = calculateThaiTax(taxableIncome);
    const monthlyWithholding = annualTax / 12;

    return {
      annualIncome,
      standardDeduction,
      personalAllowance,
      totalAllowances,
      otherDeductions,
      socialSecurity: formData.includeSocialSecurity
        ? Math.min(formData.socialSecurityContribution || 0, MONTHLY_TAX_CONSTANTS.MAX_SOCIAL_SECURITY)
        : 0,
      totalDeductions,
      taxableIncome,
      annualTax,
      monthlyWithholding,
      effectiveRate: annualIncome > 0 ? (annualTax / annualIncome) * 100 : 0,
    };
  }, [formData]);

  const leadContext = useMemo(
    () => leadContextFromSalary('monthly', calculateResult.annualTax, calculateResult.taxableIncome),
    [calculateResult.annualTax, calculateResult.taxableIncome]
  );

  useEffect(() => {
    track('calculator_completed', { calculator: 'monthly', tax_band: taxBand(calculateResult.annualTax) });
    // fire once when the results step is shown
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const taxBrackets: TaxFlowBracket[] = useMemo(
    () => getTaxByBracket(calculateResult.taxableIncome).map((b) => ({ label: b.label, rate: b.rate * 100, tax: b.tax })),
    [calculateResult.taxableIncome]
  );

  const takeHomeIncome = calculateResult.annualIncome - calculateResult.annualTax;

  const flowSteps: TaxFlowStep[] = [
    { kind: 'start', label: 'Annual Income', amount: calculateResult.annualIncome },
    {
      kind: 'subtract',
      label: 'Employment Deduction',
      amount: calculateResult.standardDeduction,
      sublabel: '50% of income, capped at ฿100,000',
    },
    {
      kind: 'subtract',
      label: 'Personal Allowance',
      amount: calculateResult.totalAllowances,
      sublabel: 'Personal, spouse, child & parent allowances',
    },
    {
      kind: 'subtract',
      label: 'Other Deductions',
      amount: calculateResult.otherDeductions,
      sublabel: 'Insurance, retirement funds, donations & social security',
    },
    { kind: 'result', label: 'Taxable Income', amount: calculateResult.taxableIncome },
    { kind: 'brackets', label: 'Progressive Tax Calculation', brackets: taxBrackets },
    {
      kind: 'result',
      label: 'Estimated Tax',
      amount: calculateResult.annualTax,
      sublabel: `≈ ${'฿' + calculateResult.monthlyWithholding.toLocaleString('en-US', { maximumFractionDigits: 0 })}/month withholding`,
    },
  ];

  // Build list of editable values
  const editableValues: EditableValue[] = useMemo(() => {
    const values: EditableValue[] = [];

    // Annual income - editable for fixed, not for variable
    if (formData.incomeType === 'fixed') {
      values.push({
        key: 'monthlySalary',
        label: 'Monthly Salary',
        value: formData.monthlySalary,
        editable: true,
      });
      values.push({
        key: 'annualBonus',
        label: 'Annual Bonus',
        value: formData.annualBonus || 0,
        editable: true,
      });
      values.push({
        key: 'annualOtherIncome',
        label: 'Other Annual Income',
        value: formData.annualOtherIncome || 0,
        editable: true,
      });
    }

    // Standard expense deduction - NOT editable (calculated automatically)
    values.push({
      key: 'standardDeduction',
      label: 'Expense Deduction (50%)',
      value: calculateResult.standardDeduction,
      editable: false,
    });

    // Personal allowance - NOT editable
    values.push({
      key: 'personalAllowance',
      label: 'Personal Allowance',
      value: MONTHLY_TAX_CONSTANTS.PERSONAL_ALLOWANCE,
      editable: false,
    });

    // Social Security - editable if enabled
    if (formData.includeSocialSecurity) {
      values.push({
        key: 'socialSecurityContribution',
        label: 'Social Security',
        value: formData.socialSecurityContribution,
        editable: true,
        maxValue: MONTHLY_TAX_CONSTANTS.MAX_SOCIAL_SECURITY,
      });
    }

    // Detailed estimate deductions
    if (formData.estimateType === 'detailed') {
      if (formData.maritalStatus === 'married' && formData.spouseHasNoIncome) {
        values.push({
          key: 'spouseAllowance',
          label: 'Spouse Allowance',
          value: MONTHLY_TAX_CONSTANTS.SPOUSE_ALLOWANCE,
          editable: false,
        });
      }

      if (formData.children && formData.children.length > 0) {
        const childAllowance = calculateChildAllowance(formData.children);
        values.push({
          key: 'childAllowance',
          label: `Child Allowance (${formData.children.length})`,
          value: childAllowance,
          editable: false,
        });
      }

      if (formData.numberOfParents > 0) {
        values.push({
          key: 'parentAllowance',
          label: `Parent Allowance (${formData.numberOfParents})`,
          value: formData.numberOfParents * MONTHLY_TAX_CONSTANTS.PARENT_ALLOWANCE,
          editable: false,
        });
      }

      if (formData.hasLifeInsurance) {
        values.push({
          key: 'lifeInsurance',
          label: 'Life Insurance',
          value: formData.lifeInsurance,
          editable: true,
          maxValue: MONTHLY_TAX_CONSTANTS.MAX_LIFE_INSURANCE,
        });
      }

      if (formData.hasHealthInsurance) {
        values.push({
          key: 'healthInsurance',
          label: 'Health Insurance',
          value: formData.healthInsurance,
          editable: true,
          maxValue: MONTHLY_TAX_CONSTANTS.MAX_HEALTH_INSURANCE,
        });
      }

      if (formData.hasPensionFund) {
        values.push({
          key: 'pensionFund',
          label: 'Pension Fund',
          value: formData.pensionFund,
          editable: true,
          maxValue: MONTHLY_TAX_CONSTANTS.MAX_PENSION_FUND,
        });
      }

      if (formData.hasProvidentFund) {
        values.push({
          key: 'providentFund',
          label: 'Provident Fund',
          value: formData.providentFund,
          editable: true,
          maxValue: MONTHLY_TAX_CONSTANTS.MAX_PROVIDENT_FUND,
        });
      }

      if (formData.hasRMF) {
        values.push({
          key: 'rmf',
          label: 'RMF',
          value: formData.rmf,
          editable: true,
          maxValue: MONTHLY_TAX_CONSTANTS.MAX_RMF,
        });
      }

      if (formData.hasSSF) {
        values.push({
          key: 'ssf',
          label: 'SSF',
          value: formData.ssf,
          editable: true,
          maxValue: MONTHLY_TAX_CONSTANTS.MAX_SSF,
        });
      }

      if (formData.hasDonations) {
        const annualIncome = getAnnualIncome();
        const maxDonation = Math.floor(annualIncome * MONTHLY_TAX_CONSTANTS.MAX_DONATION_PERCENT);
        values.push({
          key: 'donations',
          label: 'Donations',
          value: formData.donations,
          editable: true,
          maxValue: maxDonation,
        });
      }
    }

    return values;
  }, [formData, calculateResult.standardDeduction]);

  const handleValueChange = (key: string, value: string, maxValue?: number) => {
    const numValue = parseFloat(value.replace(/[^0-9]/g, '')) || 0;
    const finalValue = maxValue ? Math.min(numValue, maxValue) : numValue;

    setFormData({
      ...formData,
      [key]: finalValue,
    });
  };

  return (
    <div>
      <StepHeading title="Estimated Monthly Withholding">
        What your employer should deduct from each month's pay, from the figures you entered.
      </StepHeading>

      {/* Result box */}
      <FieldLabel>Tax to withhold, tax year {RULES_TAX_YEAR}</FieldLabel>
      <div className="relative border-2 border-desk" aria-live="polite">
        <div className="grid grid-cols-1 divide-y-2 divide-desk sm:grid-cols-2 sm:divide-x-2 sm:divide-y-0">
          <ResultCell
            label="Monthly Tax Withholding"
            value={`฿${calculateResult.monthlyWithholding.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
          />
          <ResultCell
            label="Per year"
            value={`฿${calculateResult.annualTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}`}
          />
        </div>
        <div className="border-t-2 border-desk pb-7 pl-4 pr-4 pt-2 text-xs text-ink-soft sm:py-2 sm:pr-36">
          Effective Rate: {calculateResult.effectiveRate.toFixed(2)}%
        </div>
        <Stamp className="absolute -bottom-4 right-3 sm:-top-5 sm:bottom-auto">
          {calculateResult.annualTax === 0 ? 'No tax due' : 'Estimate'}
        </Stamp>
      </div>

      {/* The twelve months: one unbroken row; scrolls sideways on phones, never wraps */}
      <div className="mt-8 min-w-0 max-w-full overflow-x-auto [mask-image:linear-gradient(to_right,black_82%,transparent)] sm:overflow-visible sm:[mask-image:none]">
        <ol className="grid w-max grid-cols-[repeat(12,56px)] border-2 border-desk sm:w-auto sm:grid-cols-12" aria-label="Withholding per month">
          {MONTH_SHORT.map((m, idx) => (
            <li key={m} className={`flex min-w-0 flex-col items-center py-2 ${idx > 0 ? 'border-l border-desk/60' : ''}`}>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">{m}</span>
              <span className="mt-1 font-mono text-[11px] font-semibold tabular-nums text-ink">
                {Math.round(calculateResult.monthlyWithholding).toLocaleString('en-US')}
              </span>
            </li>
          ))}
        </ol>
      </div>
      <p className="mt-2 text-xs leading-snug text-ink-soft">
        An even split of the annual estimate. Employers project withholding from each month's pay, so your payslip can
        differ in months with a bonus or a salary change.
      </p>
      <SourceTicket year={RULES_TAX_YEAR} className="mt-3" />

      {/* Take-Home Income */}
      <div className="mt-8">
        <TakeHomeIncomeCard annualTakeHome={takeHomeIncome} />
      </div>

      {/* Summary */}
      <div className="mb-8">
        <FieldLabel>The year, line by line</FieldLabel>
        <ul>
          <li className="form-line"><span>Annual Income</span><span>฿{calculateResult.annualIncome.toLocaleString()}</span></li>
          <li className="form-line"><span>Total Deductions</span><span>−฿{calculateResult.totalDeductions.toLocaleString()}</span></li>
          <li className="form-line"><span>Taxable Income</span><span>฿{calculateResult.taxableIncome.toLocaleString()}</span></li>
          <li className="form-total"><span>Annual Tax</span><span>฿{calculateResult.annualTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span></li>
        </ul>
      </div>

      {/* How Your Tax Was Calculated */}
      <div className="mb-6">
        <h3 className="field-label mb-3 block border-b-2 border-desk pb-1.5 text-ink">How Your Tax Was Calculated</h3>
        <TaxFlowDiagram steps={flowSteps} />
      </div>

      {/* Toggle Details Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="btn-secondary mb-4 w-full"
        aria-expanded={showDetails}
      >
        {showDetails ? 'Hide Details' : 'Show All Values & Edit'}
      </button>

      {/* Editable Values Section */}
      {showDetails && (
        <div className="mb-6 border-2 border-desk p-4">
          <p className="text-sm text-ink-mute mb-4">
            Edit values below to see how changes affect your tax estimate. Changes update instantly.
          </p>

          <div>
            {editableValues.map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-4 border-b border-paper-rule py-2 last:border-b-0">
                <span className="text-sm text-ink-soft">{item.label}</span>
                {item.editable ? (
                  <div className="relative">
                    {editingField === item.key ? (
                      <input
                        type="text"
                        value={item.value.toLocaleString()}
                        onChange={(e) => handleValueChange(item.key, e.target.value, item.maxValue)}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        className="field-input w-32 text-right h-10 text-sm"
                      />
                    ) : (
                      <button
                        onClick={() => setEditingField(item.key)}
                        className="w-32 border-2 border-transparent px-2 py-1 text-right font-mono text-sm tabular-nums text-desk underline decoration-desk/40 underline-offset-4 hover:border-desk hover:no-underline"
                        aria-label={`Edit ${item.label}`}
                      >
                        ฿{item.value.toLocaleString()}
                      </button>
                    )}
                    {item.maxValue && (
                      <p className="text-xs text-ink-mute text-right">Max: ฿{item.maxValue.toLocaleString()}</p>
                    )}
                  </div>
                ) : (
                  <span className="w-32 text-right font-mono text-sm tabular-nums text-ink-mute">
                    ฿{item.value.toLocaleString()}
                    <span className="ml-1 text-xs text-ink-mute">(fixed)</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <LeadCTA context={leadContext} />
      <div className="mt-6" />

      {/* Start Over Button */}
      <button
        onClick={onStartOver}
        className="btn-secondary w-full"
      >
        Start Over
      </button>
    </div>
  );
};

export default MonthlyResultsStep;
