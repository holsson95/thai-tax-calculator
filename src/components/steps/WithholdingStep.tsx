import { StepProps } from '../../types/taxForm';

const WithholdingStep: React.FC<StepProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    const numValue = parseFloat(value) || 0;
    setFormData({ ...formData, taxWithheld: numValue });
  };

  const formatNumber = (num: number): string => {
    if (num === 0) return '';
    return num.toLocaleString('en-US');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Tax Withholding</h2>
      <p className="text-gray-600 mb-6">
        Enter the total tax already withheld from your income this year.
      </p>

      <div className="mb-6">
        <label htmlFor="taxWithheld" className="block text-sm font-medium text-gray-700 mb-2">
          Tax Already Withheld (THB)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">฿</span>
          <input
            type="text"
            id="taxWithheld"
            value={formatNumber(formData.taxWithheld)}
            onChange={handleChange}
            placeholder="0"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500"
          />
        </div>
        <p className="mt-2 text-sm text-gray-500">
          Leave at 0 if you haven't had any tax withheld.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="font-medium text-blue-800 mb-2">Where to find this amount:</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• Check your monthly payslips (look for "Tax Withheld" or "WHT")</li>
          <li>• Request a withholding certificate from your employer</li>
          <li>• Sum up all monthly withholdings for the year</li>
          <li>• Check your 50 Tawi form from your employer</li>
        </ul>
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-medium text-gray-800 mb-2">Why this matters:</h3>
        <p className="text-sm text-gray-600">
          If you've had tax withheld throughout the year, you may be entitled to a refund
          if the total exceeds your actual tax liability. Or you may owe additional tax
          if the withholding was insufficient.
        </p>
      </div>
    </div>
  );
};

export default WithholdingStep;
