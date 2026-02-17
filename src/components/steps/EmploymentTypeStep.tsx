import { StepProps } from '../../types/taxForm';

const EMPLOYMENT_TYPES = [
  {
    value: 'salaried' as const,
    label: 'Salaried Employee',
    description: 'I receive a regular salary from an employer',
    icon: '💼',
    comingSoon: false,
  },
  {
    value: 'self-employed' as const,
    label: 'Self-Employed / Freelancer',
    description: 'I work independently or as a contractor',
    icon: '👨‍💻',
    comingSoon: false,
  },
  {
    value: 'sole_proprietor' as const,
    label: 'Business Owner (Sole Proprietor)',
    description: 'I own and operate an unincorporated business',
    icon: '🏢',
    comingSoon: false,
  },
  {
    value: 'company_owner' as const,
    label: 'Company Owner / Director',
    description: 'I own or direct a limited company and receive salary/dividends',
    icon: '🏛️',
    comingSoon: false,
  },
];

const EmploymentTypeStep: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
  const handleSelect = (type: 'salaried' | 'self-employed' | 'sole_proprietor' | 'company_owner') => {
    const updatedFormData = { ...formData, employmentType: type };
    setFormData(updatedFormData);
    nextStep(updatedFormData);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">What type of employment do you have?</h2>
      <p className="text-gray-600 mb-6">Select the option that best describes your main source of income.</p>

      <div className="space-y-4">
        {EMPLOYMENT_TYPES.map((type) => (
          <button
            key={type.value}
            onClick={() => !type.comingSoon && handleSelect(type.value)}
            disabled={type.comingSoon}
            className={`w-full p-4 border-2 rounded-lg text-left transition-all relative ${
              type.comingSoon
                ? 'border-gray-200 cursor-not-allowed'
                : formData.employmentType === type.value
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'
            }`}
            aria-pressed={formData.employmentType === type.value}
          >
            <div className={`flex items-center gap-4 ${type.comingSoon ? 'blur-[2px] opacity-50' : ''}`}>
              <span className="text-3xl">{type.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-800">{type.label}</h3>
                <p className="text-sm text-gray-500">{type.description}</p>
              </div>
            </div>
            {type.comingSoon && (
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-800 text-white text-sm font-medium px-3 py-1 rounded-full">
                Coming Soon
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmploymentTypeStep;
