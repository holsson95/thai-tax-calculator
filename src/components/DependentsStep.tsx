import { useState } from 'react';

interface DependentsStepProps {
  formData: any;
  setFormData: (data: any) => void;
  nextStep: () => void;
}

const DependentsStep: React.FC<DependentsStepProps> = ({ formData, setFormData, nextStep }) => {
  const [children, setChildren] = useState(formData.children || 0);

  const handleChange = (delta: number) => {
    const newValue = Math.max(0, children + delta);
    setChildren(newValue);
    setFormData({ ...formData, children: newValue });
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">How many children do you have?</h2>
      <div className="flex items-center justify-center gap-4 mb-6">
        <button
          onClick={() => handleChange(-1)}
          disabled={children === 0}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
        >
          -
        </button>
        <span className="text-2xl font-bold w-10 text-center">{children}</span>
        <button
          onClick={() => handleChange(1)}
          className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
        >
          +
        </button>
      </div>
      <button
        onClick={nextStep}
        className="w-full py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600"
      >
        Continue
      </button>
    </div>
  );
};

export default DependentsStep;
