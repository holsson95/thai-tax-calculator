import { useState, useEffect } from 'react';
import { MonthlyStepProps, MonthlyIncomeEntry, MONTHLY_TAX_CONSTANTS } from '../../types/taxForm';

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const createEmptyMonthEntry = (): MonthlyIncomeEntry => ({
  salary: 0,
  bonus: 0,
  housingAllowance: 0,
  otherIncome: 0,
});

const VariableIncomeStep: React.FC<MonthlyStepProps> = ({ formData, setFormData }) => {
  const [monthlyData, setMonthlyData] = useState<MonthlyIncomeEntry[]>(
    formData.variableIncome?.length === 12
      ? formData.variableIncome
      : Array(12).fill(null).map(() => createEmptyMonthEntry())
  );
  const [includeSS, setIncludeSS] = useState(formData.includeSocialSecurity || false);
  const [ssContribution, setSSContribution] = useState(
    formData.socialSecurityContribution ? formData.socialSecurityContribution.toString() : ''
  );
  const [expandedMonth, setExpandedMonth] = useState<number | null>(null);

  useEffect(() => {
    const ssNum = includeSS
      ? Math.min(parseFloat(ssContribution.replace(/,/g, '')) || 0, MONTHLY_TAX_CONSTANTS.MAX_SOCIAL_SECURITY)
      : 0;

    setFormData({
      ...formData,
      variableIncome: monthlyData,
      includeSocialSecurity: includeSS,
      socialSecurityContribution: ssNum,
    });
  }, [monthlyData, includeSS, ssContribution]);

  const handleMonthChange = (monthIndex: number, field: keyof MonthlyIncomeEntry, value: string) => {
    const numValue = parseFloat(value.replace(/[^0-9]/g, '')) || 0;
    const newData = [...monthlyData];
    newData[monthIndex] = {
      ...newData[monthIndex],
      [field]: numValue,
    };
    setMonthlyData(newData);
  };

  const handleSSContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(value) || 0;
    if (numValue <= MONTHLY_TAX_CONSTANTS.MAX_SOCIAL_SECURITY) {
      setSSContribution(value);
    }
  };

  const getMonthTotal = (entry: MonthlyIncomeEntry) => {
    return entry.salary + entry.bonus + entry.housingAllowance + entry.otherIncome;
  };

  const getTotalAnnualIncome = () => {
    return monthlyData.reduce((sum, entry) => sum + getMonthTotal(entry), 0);
  };

  const formatNumber = (value: number) => {
    return value > 0 ? value.toLocaleString() : '';
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Enter your monthly income</h2>
      <p className="text-gray-600 mb-4">
        Enter your income for each month. All taxable income including bonuses and housing allowances by the company should be included.
      </p>

      {/* Annual Total Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-sm text-blue-700">Total Annual Income</span>
          <span className="text-xl font-bold text-blue-700">
            ฿{getTotalAnnualIncome().toLocaleString()}
          </span>
        </div>
      </div>

      {/* Monthly Income Entries */}
      <div className="space-y-2 mb-6 max-h-80 overflow-y-auto">
        {MONTHS.map((month, index) => (
          <div key={month} className="border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setExpandedMonth(expandedMonth === index ? null : index)}
              className="w-full px-4 py-3 flex justify-between items-center bg-gray-50 hover:bg-gray-100"
            >
              <span className="font-medium text-gray-800">{month}</span>
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  ฿{getMonthTotal(monthlyData[index]).toLocaleString()}
                </span>
                <span className="text-gray-400">
                  {expandedMonth === index ? '▲' : '▼'}
                </span>
              </div>
            </button>

            {expandedMonth === index && (
              <div className="p-4 space-y-3 bg-white">
                {/* Salary */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Salary</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">฿</span>
                    <input
                      type="text"
                      value={formatNumber(monthlyData[index].salary)}
                      onChange={(e) => handleMonthChange(index, 'salary', e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Bonus */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Bonus</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">฿</span>
                    <input
                      type="text"
                      value={formatNumber(monthlyData[index].bonus)}
                      onChange={(e) => handleMonthChange(index, 'bonus', e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Housing Allowance */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Housing Allowance</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">฿</span>
                    <input
                      type="text"
                      value={formatNumber(monthlyData[index].housingAllowance)}
                      onChange={(e) => handleMonthChange(index, 'housingAllowance', e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Other Income */}
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Other Taxable Income</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">฿</span>
                    <input
                      type="text"
                      value={formatNumber(monthlyData[index].otherIncome)}
                      onChange={(e) => handleMonthChange(index, 'otherIncome', e.target.value)}
                      className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500"
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Social Security Checkbox */}
      <div className="border border-gray-200 rounded-lg p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeSS}
            onChange={(e) => setIncludeSS(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <div>
            <span className="font-medium text-gray-800">Include Social Security Contributions</span>
            <p className="text-sm text-gray-500 mt-1">
              Social security contributions are tax-deductible up to ฿10,500 per year (2026 limit).
            </p>
          </div>
        </label>

        {includeSS && (
          <div className="mt-4 ml-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Estimated annual contribution (THB)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
              <input
                type="text"
                value={ssContribution ? parseInt(ssContribution).toLocaleString() : ''}
                onChange={handleSSContributionChange}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Maximum: ฿{MONTHLY_TAX_CONSTANTS.MAX_SOCIAL_SECURITY.toLocaleString()} per year
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VariableIncomeStep;
