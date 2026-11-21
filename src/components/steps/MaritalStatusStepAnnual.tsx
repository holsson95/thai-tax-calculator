import { useState } from 'react';
import { Check, ChoiceList, ChoiceRow, FieldLabel, StepHeading } from '../ui/form';
import { StepProps, TAX_CONSTANTS } from '../../types/taxForm';

const MaritalStatusStepAnnual: React.FC<StepProps> = ({ formData, setFormData, nextStep }) => {
  const [showSpouseQuestion, setShowSpouseQuestion] = useState(formData.maritalStatus === 'married');

  const handleMaritalStatusSelect = (status: 'single' | 'married') => {
    if (status === 'single') {
      setFormData({ ...formData, maritalStatus: status, spouseHasNoIncome: false });
      setShowSpouseQuestion(false);
      nextStep();
    } else {
      setFormData({ ...formData, maritalStatus: status });
      setShowSpouseQuestion(true);
    }
  };

  const handleSpouseIncomeChange = (hasNoIncome: boolean) => {
    setFormData({ ...formData, spouseHasNoIncome: hasNoIncome });
  };

  return (
    <div>
      <StepHeading title="What is your marital status?">
        Your marital status affects your tax allowances.
      </StepHeading>

      <ChoiceList>
        <ChoiceRow
          selected={formData.maritalStatus === 'single'}
          onClick={() => handleMaritalStatusSelect('single')}
          title="Single"
          description="Not married or legally separated"
        />
        <ChoiceRow
          selected={formData.maritalStatus === 'married'}
          onClick={() => handleMaritalStatusSelect('married')}
          title="Married"
          description="Legally married"
        />
      </ChoiceList>

      {/* Spouse income question: only when married is selected */}
      {showSpouseQuestion && (
        <div className="mt-6">
          <FieldLabel>Spouse allowance</FieldLabel>
          <p className="mb-4 text-sm leading-relaxed text-ink-soft">
            You can claim a ฿{TAX_CONSTANTS.SPOUSE_ALLOWANCE.toLocaleString()} spouse allowance only if your spouse has no income during the tax year.
          </p>
          <Check checked={formData.spouseHasNoIncome} onChange={handleSpouseIncomeChange}>
            My spouse has no income
          </Check>
        </div>
      )}
    </div>
  );
};

export default MaritalStatusStepAnnual;
