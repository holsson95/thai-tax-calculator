import { MonthlyStepProps } from '../../types/taxForm';

const INCOME_TYPES = [
  {
    value: 'fixed' as const,
    label: 'Fixed Monthly Income',
    description: 'Same salary every month',
    icon: '📅',
  },
  {
    value: 'variable' as const,
    label: 'Variable Monthly Income',
    description: 'Different income each month (bonuses, allowances, etc.)',
    icon: '📊',
  },
];

const IncomeTypeStep: React.FC<MonthlyStepProps> = ({ formData, setFormData, nextStep }) => {
  const handleSelect = (type: 'fixed' | 'variable') => {
    setFormData({ ...formData, incomeType: type });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-2">How do you receive your income?</h2>
      <p className="text-gray-600 mb-6">
        Choose based on whether your monthly income is consistent or varies throughout the year.
      </p>

      <div className="space-y-4">
        {INCOME_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${
              formData.incomeType === type.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
            aria-pressed={formData.incomeType === type.value}
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

export default IncomeTypeStep;
