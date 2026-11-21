import { StepProps } from '../../types/taxForm';
import { ChoiceList, ChoiceRow, StepHeading } from '../ui/form';

const EMPLOYMENT_TYPES = [
  {
    value: 'salaried' as const,
    label: 'Salaried Employee',
    description: 'I receive a regular salary from an employer',
    comingSoon: false,
  },
  {
    value: 'self-employed' as const,
    label: 'Self-Employed / Freelancer',
    description: 'I work independently or as a contractor',
    comingSoon: false,
  },
  {
    value: 'retired' as const,
    label: 'Retired / Pensioner',
    description: 'I receive a pension or retirement income from abroad or locally',
    comingSoon: false,
  },
  {
    value: 'sole_proprietor' as const,
    label: 'Business Owner (Sole Proprietor)',
    description: 'I own and operate an unincorporated business',
    comingSoon: false,
  },
  {
    value: 'company_owner' as const,
    label: 'Company Owner / Director',
    description: 'I own or direct a limited company and receive salary/dividends',
    comingSoon: false,
  },
];

const EmploymentTypeStep: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
  const handleSelect = (type: 'salaried' | 'self-employed' | 'retired' | 'sole_proprietor' | 'company_owner') => {
    const updatedFormData = { ...formData, employmentType: type };
    setFormData(updatedFormData);
    nextStep(updatedFormData);
  };

  return (
    <div>
      <StepHeading title="What type of employment do you have?">
        Select the option that best describes your main source of income.
      </StepHeading>

      <ChoiceList>
        {EMPLOYMENT_TYPES.map((type) => (
          <ChoiceRow
            key={type.value}
            selected={formData.employmentType === type.value}
            onClick={() => !type.comingSoon && handleSelect(type.value)}
            disabled={type.comingSoon}
            title={type.label}
            description={type.description}
            aside={type.comingSoon ? <span className="field-label shrink-0 self-center text-ink-mute">Coming soon</span> : undefined}
          />
        ))}
      </ChoiceList>
    </div>
  );
};

export default EmploymentTypeStep;
