import { useState, useEffect, useMemo } from 'react';
import { MonthlyStepProps, MONTHLY_TAX_CONSTANTS, MonthlyIncomeEntry } from '../../types/taxForm';

interface DeductionItem {
  key: string;
  hasKey: string;
  label: string;
  description: string;
  maxValue: number;
}

const DeductionsStepMonthly: React.FC<MonthlyStepProps> = ({ formData, setFormData, showValidationErrors = false }) => {

  // Calculate annual income from formData
  const getAnnualIncome = (): number => {
    if (formData.incomeType === 'variable' && formData.variableIncome?.length === 12) {
      return formData.variableIncome.reduce((sum: number, entry: MonthlyIncomeEntry) => {
        return sum + entry.salary + entry.bonus + entry.housingAllowance + entry.otherIncome;
      }, 0);
    }
    return formData.monthlySalary * 12;
  };

  const annualIncome = getAnnualIncome();

  // Build deduction items dynamically (donations depends on income)
  const DEDUCTION_ITEMS: DeductionItem[] = useMemo(() => [
    {
      key: 'lifeInsurance',
      hasKey: 'hasLifeInsurance',
      label: 'Life Insurance',
      description: 'Life insurance premiums paid during the year',
      maxValue: MONTHLY_TAX_CONSTANTS.MAX_LIFE_INSURANCE,
    },
    {
      key: 'healthInsurance',
      hasKey: 'hasHealthInsurance',
      label: 'Health Insurance',
      description: 'Health insurance premiums paid during the year',
      maxValue: MONTHLY_TAX_CONSTANTS.MAX_HEALTH_INSURANCE,
    },
    {
      key: 'pensionFund',
      hasKey: 'hasPensionFund',
      label: 'Pension Fund',
      description: 'Government pension fund contributions',
      maxValue: MONTHLY_TAX_CONSTANTS.MAX_PENSION_FUND,
    },
    {
      key: 'providentFund',
      hasKey: 'hasProvidentFund',
      label: 'Provident Fund',
      description: 'Private provident fund contributions',
      maxValue: MONTHLY_TAX_CONSTANTS.MAX_PROVIDENT_FUND,
    },
    {
      key: 'rmf',
      hasKey: 'hasRMF',
      label: 'RMF (Retirement Mutual Fund)',
      description: 'RMF investments for retirement',
      maxValue: MONTHLY_TAX_CONSTANTS.MAX_RMF,
    },
    {
      key: 'ssf',
      hasKey: 'hasSSF',
      label: 'SSF (Super Savings Fund)',
      description: 'SSF long-term investments',
      maxValue: MONTHLY_TAX_CONSTANTS.MAX_SSF,
    },
    {
      key: 'donations',
      hasKey: 'hasDonations',
      label: 'Charitable Donations',
      description: 'Donations to approved charities (limited to 10% of income)',
      maxValue: Math.floor(annualIncome * MONTHLY_TAX_CONSTANTS.MAX_DONATION_PERCENT),
    },
  ], [annualIncome]);

  const [localData, setLocalData] = useState({
    hasLifeInsurance: formData.hasLifeInsurance || false,
    lifeInsurance: formData.lifeInsurance || 0,
    hasHealthInsurance: formData.hasHealthInsurance || false,
    healthInsurance: formData.healthInsurance || 0,
    hasPensionFund: formData.hasPensionFund || false,
    pensionFund: formData.pensionFund || 0,
    hasProvidentFund: formData.hasProvidentFund || false,
    providentFund: formData.providentFund || 0,
    hasRMF: formData.hasRMF || false,
    rmf: formData.rmf || 0,
    hasSSF: formData.hasSSF || false,
    ssf: formData.ssf || 0,
    hasDonations: formData.hasDonations || false,
    donations: formData.donations || 0,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      ...localData,
    });
  }, [localData]);

  const handleCheckboxChange = (hasKey: string, checked: boolean) => {
    setLocalData({
      ...localData,
      [hasKey]: checked,
    });
  };

  const handleValueChange = (key: string, value: string, maxValue: number) => {
    const numValue = Math.min(parseFloat(value.replace(/[^0-9]/g, '')) || 0, maxValue);
    setLocalData({
      ...localData,
      [key]: numValue,
    });
  };

  const formatNumber = (value: number) => {
    return value > 0 ? value.toLocaleString() : '';
  };


  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Tax Deductions</h2>
      <p className="text-gray-600 mb-6">
        Select any deductions you qualify for. These will reduce your taxable income.
      </p>

      {/* Senior Citizen Allowance */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
        <div className="flex items-start gap-3 mb-3">
          <div className="flex-shrink-0 mt-0.5">
            <svg className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-amber-700">
            Taxpayers aged 65 or older are entitled to an additional ฿{MONTHLY_TAX_CONSTANTS.SENIOR_ALLOWANCE.toLocaleString()} allowance.
          </p>
        </div>

        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={formData.isAge65OrOlder}
            onChange={(e) => setFormData({ ...formData, isAge65OrOlder: e.target.checked })}
            className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500"
          />
          <span className="text-gray-800">I am 65 years or older</span>
        </label>
      </div>

      <div className="space-y-4 mb-6">
        {DEDUCTION_ITEMS.map((item) => {
          const isChecked = localData[item.hasKey as keyof typeof localData] as boolean;
          const value = localData[item.key as keyof typeof localData] as number;
          const hasError = showValidationErrors && isChecked && value === 0;

          return (
            <div key={item.key} className={`border rounded-lg p-4 ${hasError ? 'border-red-500' : 'border-gray-200'}`}>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={(e) => handleCheckboxChange(item.hasKey, e.target.checked)}
                  className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="font-medium text-gray-800">{item.label}</span>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              </label>

              {isChecked && (
                <div className="mt-3 ml-8">
                  <label className="block text-sm text-gray-600 mb-1">
                    Amount (THB)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">฿</span>
                    <input
                      type="text"
                      value={formatNumber(value)}
                      onChange={(e) => handleValueChange(item.key, e.target.value, item.maxValue)}
                      className={`w-full pl-8 pr-4 py-2 border rounded-lg focus:ring-2 ${
                        hasError
                          ? 'border-red-500 focus:ring-red-200'
                          : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="0"
                    />
                  </div>
                  {hasError ? (
                    <p className="text-sm text-red-600 mt-1">
                      Please enter an amount or uncheck this deduction.
                    </p>
                  ) : (
                    <p className="text-xs text-gray-500 mt-1">
                      Maximum: ฿{item.maxValue.toLocaleString()} per year
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeductionsStepMonthly;
