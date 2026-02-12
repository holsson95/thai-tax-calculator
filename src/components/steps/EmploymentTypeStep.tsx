import { StepProps } from '../../types/taxForm';

const EMPLOYMENT_TYPES = [
  {
    value: 'salaried' as const,
    label: 'Salaried Employee',
    description: 'I receive a regular salary from an employer',
    icon: '💼',
  },
  {
    value: 'self-employed' as const,
    label: 'Self-Employed / Freelancer',
    description: 'I work independently or as a contractor',
    icon: '👨‍💻',
  },
  {
    value: 'business' as const,
    label: 'Business Owner',
    description: 'I own and operate a business',
    icon: '🏢',
  },
];

const EmploymentTypeStep: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
  const handleSelect = (type: 'salaried' | 'self-employed' | 'business') => {
    setFormData({ ...formData, employmentType: type });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">What type of employment do you have?</h2>
      <p className="text-gray-600 mb-6">Select the option that best describes your main source of income.</p>

      <div className="space-y-4">
        {EMPLOYMENT_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => handleSelect(type.value)}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all hover:border-blue-500 hover:bg-blue-50 ${
              formData.employmentType === type.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
            aria-pressed={formData.employmentType === type.value}
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

export default EmploymentTypeStep;
