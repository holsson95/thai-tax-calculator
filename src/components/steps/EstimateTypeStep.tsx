import { MonthlyStepProps } from '../../types/taxForm';

const ESTIMATE_TYPES = [
  {
    value: 'basic' as const,
    label: 'Basic Estimate',
    description: 'Quick calculation without deductions',
    icon: '⚡',
  },
  {
    value: 'detailed' as const,
    label: 'Detailed Estimate',
    description: 'Include deductions for a more accurate result',
    icon: '📋',
  },
];

const EstimateTypeStep: React.FC<MonthlyStepProps> = ({ formData, setFormData, nextStep }) => {
  const handleSelect = (type: 'basic' | 'detailed') => {
    setFormData({ ...formData, estimateType: type });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">Choose your estimate type</h2>
      <p className="text-gray-600 mb-6">
        You can choose a quick estimate without deductions, or a more detailed estimate where deductions are included.
      </p>

      <div className="space-y-4">
        {ESTIMATE_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${
              formData.estimateType === type.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
            aria-pressed={formData.estimateType === type.value}
          >
            <div className="flex items-center gap-4">
              <span className="text-3xl">{type.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-800">{type.label}</h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EstimateTypeStep;
