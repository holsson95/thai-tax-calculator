import { MonthlyStepProps } from '../../types/taxForm';
import { ChoiceList, ChoiceRow, StepHeading } from '../ui/form';

const INCOME_TYPES = [
  {
    value: 'fixed' as const,
    label: 'Fixed Monthly Income',
    description: 'Same salary every month',
  },
  {
    value: 'variable' as const,
    label: 'Variable Monthly Income',
    description: 'Different income each month (bonuses, allowances, etc.)',
  },
];

const IncomeTypeStep: React.FC<MonthlyStepProps> = ({ formData, setFormData, nextStep }) => {
  const handleSelect = (type: 'fixed' | 'variable') => {
    setFormData({ ...formData, incomeType: type });
    nextStep();
  };

  return (
    <div>
      <StepHeading title="How do you receive your income?">
        Choose based on whether your monthly income is consistent or varies throughout the year.
      </StepHeading>

      <ChoiceList>
        {INCOME_TYPES.map((type) => (
          <ChoiceRow
            key={type.value}
            selected={formData.incomeType === type.value}
            onClick={() => handleSelect(type.value)}
            title={type.label}
            description={type.description}
          />
        ))}
      </ChoiceList>
    </div>
  );
};

export default IncomeTypeStep;
