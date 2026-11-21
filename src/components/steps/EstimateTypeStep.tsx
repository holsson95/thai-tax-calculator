import { MonthlyStepProps } from '../../types/taxForm';
import { ChoiceList, ChoiceRow, StepHeading } from '../ui/form';

const ESTIMATE_TYPES = [
  {
    value: 'basic' as const,
    label: 'Basic Estimate',
    description: 'Quick calculation without deductions',
  },
  {
    value: 'detailed' as const,
    label: 'Detailed Estimate',
    description: 'Include deductions for a more accurate result',
  },
];

const EstimateTypeStep: React.FC<MonthlyStepProps> = ({ formData, setFormData, nextStep }) => {
  const handleSelect = (type: 'basic' | 'detailed') => {
    setFormData({ ...formData, estimateType: type });
    nextStep();
  };

  return (
    <div>
      <StepHeading title="Choose your estimate type">
        You can choose a quick estimate without deductions, or a more detailed estimate where deductions are included.
      </StepHeading>

      <ChoiceList>
        {ESTIMATE_TYPES.map((type) => (
          <ChoiceRow
            key={type.value}
            selected={formData.estimateType === type.value}
            onClick={() => handleSelect(type.value)}
            title={type.label}
            description={type.description}
          />
        ))}
      </ChoiceList>
    </div>
  );
};

export default EstimateTypeStep;
