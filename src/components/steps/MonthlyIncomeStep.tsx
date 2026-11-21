import { useState, useEffect } from 'react';
import { MonthlyStepProps, MONTHLY_TAX_CONSTANTS } from '../../types/taxForm';

const MonthlyIncomeStep: React.FC<MonthlyStepProps> = ({ formData, setFormData }) => {
  const [salary, setSalary] = useState(formData.monthlySalary ? formData.monthlySalary.toString() : '');
  const [bonus, setBonus] = useState(formData.annualBonus ? formData.annualBonus.toString() : '');
  const [otherIncome, setOtherIncome] = useState(formData.annualOtherIncome ? formData.annualOtherIncome.toString() : '');
  const [includeSS, setIncludeSS] = useState(formData.includeSocialSecurity || false);
  const [ssContribution, setSSContribution] = useState(
    formData.socialSecurityContribution ? formData.socialSecurityContribution.toString() : ''
  );

  useEffect(() => {
    const salaryNum = parseFloat(salary.replace(/,/g, '')) || 0;
    const bonusNum = parseFloat(bonus.replace(/,/g, '')) || 0;
    const otherIncomeNum = parseFloat(otherIncome.replace(/,/g, '')) || 0;
    const ssNum = includeSS ? Math.min(parseFloat(ssContribution.replace(/,/g, '')) || 0, MONTHLY_TAX_CONSTANTS.MAX_SOCIAL_SECURITY) : 0;

    setFormData({
      ...formData,
      monthlySalary: salaryNum,
      annualBonus: bonusNum,
      annualOtherIncome: otherIncomeNum,
      includeSocialSecurity: includeSS,
      socialSecurityContribution: ssNum,
    });
  }, [salary, bonus, otherIncome, includeSS, ssContribution]);

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setSalary(value);
  };

  const handleBonusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setBonus(value);
  };

  const handleOtherIncomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setOtherIncome(value);
  };

  const handleSSContributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numValue = parseInt(value) || 0;
    if (numValue <= MONTHLY_TAX_CONSTANTS.MAX_SOCIAL_SECURITY) {
      setSSContribution(value);
    }
  };


  const formatDisplayValue = (value: string) => {
    const num = parseInt(value.replace(/,/g, '')) || 0;
    return num > 0 ? num.toLocaleString() : '';
  };

  return (
    <div>
      <h2 className="display mb-4 text-2xl leading-tight text-ink sm:text-[28px]">Assessable Income</h2>
      <p className="text-ink-soft mb-6">
        Enter your income details below. Include your regular monthly salary, plus any bonus or other income you expect to receive this year.
      </p>

      {/* Monthly Salary Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-ink-soft mb-2">
          Salary per month (THB)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute">฿</span>
          <input
            type="text"
            inputMode="numeric"
            value={formatDisplayValue(salary)}
            onChange={handleSalaryChange}
            className="field-input pl-8 pr-4"
            placeholder="0"
          />
        </div>
      </div>

      {/* Annual Bonus Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-ink-soft mb-2">
          Bonus per year (THB)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute">฿</span>
          <input
            type="text"
            inputMode="numeric"
            value={formatDisplayValue(bonus)}
            onChange={handleBonusChange}
            className="field-input pl-8 pr-4"
            placeholder="0"
          />
        </div>
        <p className="text-xs text-ink-mute mt-1">
          Expected annual bonus amount
        </p>
      </div>

      {/* Other Income Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-ink-soft mb-2">
          Other income per year (THB)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute">฿</span>
          <input
            type="text"
            inputMode="numeric"
            value={formatDisplayValue(otherIncome)}
            onChange={handleOtherIncomeChange}
            className="field-input pl-8 pr-4"
            placeholder="0"
          />
        </div>
        <p className="text-xs text-ink-mute mt-1">
          Housing allowance, overtime, commissions, etc.
        </p>
      </div>

      {/* Social Security Checkbox */}
      <div className="border border-paper-rule p-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={includeSS}
            onChange={(e) => setIncludeSS(e.target.checked)}
            className="mt-1"
          />
          <div>
            <span className="font-medium text-ink">Include Social Security Contributions</span>
            <p className="text-sm text-ink-mute mt-1">
              Social security contributions are tax-deductible up to ฿10,500 per year (2026 limit).
            </p>
          </div>
        </label>

        {/* Social Security Amount Input */}
        {includeSS && (
          <div className="mt-4 ml-8">
            <label className="block text-sm font-medium text-ink-soft mb-2">
              Estimated annual contribution (THB)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute">฿</span>
              <input
                type="text"
                inputMode="numeric"
                value={formatDisplayValue(ssContribution)}
                onChange={handleSSContributionChange}
                className="field-input pl-8 pr-4"
                placeholder="0"
              />
            </div>
            <p className="text-xs text-ink-mute mt-1">
              Maximum: ฿{MONTHLY_TAX_CONSTANTS.MAX_SOCIAL_SECURITY.toLocaleString()} per year
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MonthlyIncomeStep;
