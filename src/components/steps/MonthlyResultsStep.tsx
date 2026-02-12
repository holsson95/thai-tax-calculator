import { useState, useMemo } from 'react';
import { MonthlyFormData, MonthlyIncomeEntry, MONTHLY_TAX_CONSTANTS, ChildData } from '../../types/taxForm';
import { calculateThaiTax } from '../../utils/tax';

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

    // Start with standard deduction + personal allowance
    let totalDeductions = standardDeduction + personalAllowance;

    // Add social security if included
    if (formData.includeSocialSecurity && formData.socialSecurityContribution > 0) {
      totalDeductions += Math.min(formData.socialSecurityContribution, MONTHLY_TAX_CONSTANTS.MAX_SOCIAL_SECURITY);
    }

    // For detailed estimate, add more deductions
    if (formData.estimateType === 'detailed') {
      // Spouse allowance
      if (formData.maritalStatus === 'married' && formData.spouseHasNoIncome) {
        totalDeductions += MONTHLY_TAX_CONSTANTS.SPOUSE_ALLOWANCE;
      }

      // Child allowance with birth year bonuses
      const childAllowance = calculateChildAllowance(formData.children || []);
      totalDeductions += childAllowance;

      // Parent allowance
      const parentAllowance = (formData.numberOfParents || 0) * MONTHLY_TAX_CONSTANTS.PARENT_ALLOWANCE;
      totalDeductions += parentAllowance;

      // Insurance deductions
      if (formData.hasLifeInsurance) {
        totalDeductions += Math.min(formData.lifeInsurance || 0, MONTHLY_TAX_CONSTANTS.MAX_LIFE_INSURANCE);
      }
      if (formData.hasHealthInsurance) {
        totalDeductions += Math.min(formData.healthInsurance || 0, MONTHLY_TAX_CONSTANTS.MAX_HEALTH_INSURANCE);
      }
      if (formData.hasPensionFund) {
        totalDeductions += Math.min(formData.pensionFund || 0, MONTHLY_TAX_CONSTANTS.MAX_PENSION_FUND);
      }
      if (formData.hasProvidentFund) {
        totalDeductions += Math.min(formData.providentFund || 0, MONTHLY_TAX_CONSTANTS.MAX_PROVIDENT_FUND);
      }
      if (formData.hasRMF) {
        totalDeductions += Math.min(formData.rmf || 0, MONTHLY_TAX_CONSTANTS.MAX_RMF);
      }
      if (formData.hasSSF) {
        totalDeductions += Math.min(formData.ssf || 0, MONTHLY_TAX_CONSTANTS.MAX_SSF);
      }

      // Donations (limited to 10% of income)
      if (formData.hasDonations) {
        const maxDonation = Math.floor(annualIncome * MONTHLY_TAX_CONSTANTS.MAX_DONATION_PERCENT);
        totalDeductions += Math.min(formData.donations || 0, maxDonation);
      }
    }

    const taxableIncome = Math.max(0, annualIncome - totalDeductions);
    const annualTax = calculateThaiTax(taxableIncome);
    const monthlyWithholding = annualTax / 12;

    return {
      annualIncome,
      standardDeduction,
      personalAllowance,
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
      <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">Estimated Monthly Withholding</h2>

      {/* Main Result */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6 text-center">
        <p className="text-sm text-gray-500 mb-1">Monthly Tax Withholding</p>
        <p className="text-4xl font-bold text-blue-600">
          ฿{calculateResult.monthlyWithholding.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Effective Rate: {calculateResult.effectiveRate.toFixed(2)}%
        </p>
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Annual Income</span>
          <span className="font-medium">฿{calculateResult.annualIncome.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Deductions</span>
          <span className="font-medium">-฿{calculateResult.totalDeductions.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Taxable Income</span>
          <span className="font-medium">฿{calculateResult.taxableIncome.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-sm border-t border-gray-200 pt-2">
          <span className="text-gray-600">Annual Tax</span>
          <span className="font-medium">฿{calculateResult.annualTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</span>
        </div>
      </div>

      {/* Toggle Details Button */}
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full py-2 text-blue-600 font-medium flex items-center justify-center gap-2 hover:bg-blue-50 rounded-lg mb-4"
      >
        {showDetails ? 'Hide Details' : 'Show All Values & Edit'}
        <span>{showDetails ? '▲' : '▼'}</span>
      </button>

      {/* Editable Values Section */}
      {showDetails && (
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-gray-500 mb-4">
            Edit values below to see how changes affect your tax estimate. Changes update instantly.
          </p>

          <div className="space-y-3">
            {editableValues.map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <span className="text-sm text-gray-700">{item.label}</span>
                {item.editable ? (
                  <div className="relative">
                    {editingField === item.key ? (
                      <input
                        type="text"
                        value={item.value.toLocaleString()}
                        onChange={(e) => handleValueChange(item.key, e.target.value, item.maxValue)}
                        onBlur={() => setEditingField(null)}
                        autoFocus
                        className="w-32 px-2 py-1 text-right border border-blue-500 rounded text-sm focus:ring-2 focus:ring-blue-500"
                      />
                    ) : (
                      <button
                        onClick={() => setEditingField(item.key)}
                        className="w-32 px-2 py-1 text-right text-blue-600 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 text-sm"
                      >
                        ฿{item.value.toLocaleString()}
                        <span className="ml-1 text-xs">✎</span>
                      </button>
                    )}
                    {item.maxValue && (
                      <p className="text-xs text-gray-400 text-right">Max: ฿{item.maxValue.toLocaleString()}</p>
                    )}
                  </div>
                ) : (
                  <span className="text-sm text-gray-500 w-32 text-right">
                    ฿{item.value.toLocaleString()}
                    <span className="ml-1 text-xs text-gray-400">(fixed)</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Start Over Button */}
      <button
        onClick={onStartOver}
        className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300"
      >
        Start Over
      </button>
    </div>
  );
};

export default MonthlyResultsStep;
