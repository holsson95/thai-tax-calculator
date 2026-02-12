interface ResultStepProps {
  formData: any;
}

const ResultStep: React.FC<ResultStepProps> = ({ formData }) => {
  // Simple calculation for monthly withholding
  const salary = formData.monthlySalary || 0;
  const annualSalary = salary * 12;
  const personalAllowance = 60000;
  const childAllowance = (formData.children || 0) * 30000;
  const spouseAllowance = formData.maritalStatus === 'married' ? 60000 : 0;

  const totalAllowances = personalAllowance + childAllowance + spouseAllowance;
  const taxableIncome = Math.max(0, annualSalary - totalAllowances);

  // Progressive tax calculation
  let annualTax = 0;
  if (taxableIncome > 150000) annualTax += Math.min(150000, taxableIncome - 150000) * 0.05;
  if (taxableIncome > 300000) annualTax += Math.min(200000, taxableIncome - 300000) * 0.1;
  if (taxableIncome > 500000) annualTax += Math.min(250000, taxableIncome - 500000) * 0.15;
  if (taxableIncome > 750000) annualTax += Math.min(250000, taxableIncome - 750000) * 0.2;
  if (taxableIncome > 1000000) annualTax += Math.min(1000000, taxableIncome - 1000000) * 0.25;
  if (taxableIncome > 2000000) annualTax += Math.min(3000000, taxableIncome - 2000000) * 0.3;
  if (taxableIncome > 5000000) annualTax += (taxableIncome - 5000000) * 0.35;

  const monthlyWithholding = annualTax / 12;

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Estimated Monthly Withholding</h2>
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-4">
        <p className="text-sm text-gray-500 mb-1">Monthly Tax Withholding</p>
        <p className="text-3xl font-bold text-blue-600">
          ฿{monthlyWithholding.toLocaleString('en-US', { maximumFractionDigits: 0 })}
        </p>
      </div>
      <div className="text-sm text-gray-600 space-y-1">
        <p>Monthly salary: ฿{salary.toLocaleString()}</p>
        <p>Annual income: ฿{annualSalary.toLocaleString()}</p>
        <p>Annual tax: ฿{annualTax.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
      </div>
    </div>
  );
};

export default ResultStep;
