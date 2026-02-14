import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MaritalStatusStepAnnual from '../MaritalStatusStepAnnual';
import { TaxFormData } from '../../../types/taxForm';

function createBaseFormData(overrides: Partial<TaxFormData> = {}): TaxFormData {
  return {
    employmentType: 'salaried',
    annualIncome: 500000,
    includeSocialSecurity: false,
    socialSecurityContribution: 0,
    maritalStatus: '',
    spouseHasNoIncome: false,
    isAge65OrOlder: false,
    children: [],
    childrenEligibilityConfirmed: false,
    parentsEligibilityConfirmed: false,
    numberOfParents: 0,
    hasLifeInsurance: false,
    lifeInsurance: 0,
    hasHealthInsurance: false,
    healthInsurance: 0,
    hasPensionFund: false,
    pensionFund: 0,
    hasProvidentFund: false,
    providentFund: 0,
    hasRMF: false,
    rmf: 0,
    hasSSF: false,
    ssf: 0,
    hasDonations: false,
    donations: 0,
    taxWithheld: 0,
    ...overrides,
  };
}

describe('MaritalStatusStepAnnual', () => {
  it('renders single and married options', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MaritalStatusStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Single')).toBeInTheDocument();
    expect(screen.getByText('Married')).toBeInTheDocument();
  });

  it('auto-advances when single is selected', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MaritalStatusStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('Single'));

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      maritalStatus: 'single',
      spouseHasNoIncome: false,
    });
    expect(nextStep).toHaveBeenCalled();
  });

  it('shows spouse income question when married is selected', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MaritalStatusStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('Married'));

    expect(screen.getByText(/my spouse has no income/i)).toBeInTheDocument();
    expect(nextStep).not.toHaveBeenCalled();
  });

  it('updates spouseHasNoIncome when checkbox is toggled', () => {
    const formData = createBaseFormData({ maritalStatus: 'married' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MaritalStatusStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Click married to show the spouse question
    fireEvent.click(screen.getByText('Married'));

    // Get the spouse income checkbox specifically (the first one in the spouse section)
    const spouseCheckbox = screen.getByLabelText(/my spouse has no income/i);
    fireEvent.click(spouseCheckbox);

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      maritalStatus: 'married',
      spouseHasNoIncome: true,
    });
  });

  it('does not render Continue button for married (navigation handled by wizard)', () => {
    const formData = createBaseFormData({ maritalStatus: 'married' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MaritalStatusStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Click married to show the spouse question
    fireEvent.click(screen.getByText('Married'));

    // Verify spouse question is shown but no Continue button
    expect(screen.getByText(/my spouse has no income/i)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  it('displays spouse allowance information when married is selected', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MaritalStatusStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('Married'));

    expect(screen.getByText(/60,000 spouse allowance/i)).toBeInTheDocument();
  });

  it('shows previously selected marital status as pressed', () => {
    const formData = createBaseFormData({ maritalStatus: 'single' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MaritalStatusStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const singleButton = screen.getByRole('button', { name: /single/i });
    expect(singleButton).toHaveAttribute('aria-pressed', 'true');
  });
});
