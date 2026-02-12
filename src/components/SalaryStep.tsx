import { useState } from 'react';

interface SalaryStepProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
}

const SalaryStep: React.FC<SalaryStepProps> = ({ formData, setFormData, nextStep }) => {
  const [salary, setSalary] = useState(formData.monthlySalary || '');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/,/g, '');
    setSalary(value);
    setFormData({ ...formData, monthlySalary: parseFloat(value) || 0 });
  };

  const handleSubmit = () => {
    if (salary && parseFloat(salary) > 0) {
      nextStep();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">What is your monthly salary?</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Monthly Salary (THB)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">฿</span>
          <input
            type="text"
            value={salary}
            onChange={handleChange}
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg"
            placeholder="0"
          />
        </div>
      </div>
      <button
        onClick={handleSubmit}
        className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
      >
        Continue
      </button>
    </div>
  );
};

export default SalaryStep;
