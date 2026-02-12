import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DependentsStepAnnual from '../DependentsStepAnnual';
import { TaxFormData } from '../../../types/taxForm';

function createBaseFormData(overrides: Partial<TaxFormData> = {}): TaxFormData {
  return {
    employmentType: 'salaried',
    annualIncome: 500000,
    maritalStatus: 'single',
    spouseHasNoIncome: false,
    children: [],
    childrenEligibilityConfirmed: false,
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

describe('DependentsStepAnnual', () => {
  it('renders children and parents sections', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Children')).toBeInTheDocument();
    expect(screen.getByText('Parents')).toBeInTheDocument();
  });

  it('shows eligibility criteria for children and parents sections', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Both children and parents eligibility criteria are now always visible
    const eligibilityCriteria = screen.getAllByText(/eligibility criteria/i);
    expect(eligibilityCriteria).toHaveLength(2);

    // Children criteria
    expect(screen.getByText(/under 20 years old/i)).toBeInTheDocument();

    // Parents criteria
    expect(screen.getByText(/parent is 60 years or older/i)).toBeInTheDocument();
  });

  it('allows adding children when eligibility checkbox is checked', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Enable children section by checking the eligibility checkbox
    const childrenCheckbox = screen.getByLabelText(/i have children who meet these criteria/i);
    fireEvent.click(childrenCheckbox);

    // Add a child
    const addButton = screen.getByLabelText(/add child/i);
    fireEvent.click(addButton);

    expect(setFormData).toHaveBeenCalled();
  });

  it('sets childrenEligibilityConfirmed to true when eligibility checkbox is checked', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Check the eligibility checkbox
    const childrenCheckbox = screen.getByLabelText(/i have children who meet these criteria/i);
    fireEvent.click(childrenCheckbox);

    // Should set childrenEligibilityConfirmed to true
    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      childrenEligibilityConfirmed: true,
    });
  });

  it('clears children and sets childrenEligibilityConfirmed to false when checkbox is unchecked', () => {
    const formData = createBaseFormData({
      children: [{ birthYear: 2015 }],
      childrenEligibilityConfirmed: true,
    });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Uncheck the eligibility checkbox
    const childrenCheckbox = screen.getByLabelText(/i have children who meet these criteria/i);
    fireEvent.click(childrenCheckbox);

    // Should clear children and set childrenEligibilityConfirmed to false
    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      children: [],
      childrenEligibilityConfirmed: false,
    });
  });

  it('updates parent count when + button is clicked', () => {
    const formData = createBaseFormData({ numberOfParents: 0 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // First enable parents section by checking eligibility checkbox
    const parentsCheckbox = screen.getByLabelText(/i have parents who meet these criteria/i);
    fireEvent.click(parentsCheckbox);

    const addParentButton = screen.getByLabelText(/add parent/i);
    fireEvent.click(addParentButton);

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      numberOfParents: 1,
    });
  });

  it('updates parent count when - button is clicked', () => {
    const formData = createBaseFormData({ numberOfParents: 2 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const removeParentButton = screen.getByLabelText(/remove parent/i);
    fireEvent.click(removeParentButton);

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      numberOfParents: 1,
    });
  });

  it('does not allow more than 4 parents', () => {
    const formData = createBaseFormData({ numberOfParents: 4 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const addParentButton = screen.getByLabelText(/add parent/i);
    expect(addParentButton).toBeDisabled();
  });

  it('shows total allowances summary', () => {
    const formData = createBaseFormData({
      maritalStatus: 'married',
      spouseHasNoIncome: true,
      numberOfParents: 2,
    });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Total Allowances')).toBeInTheDocument();
    // Personal: 60,000 + Spouse: 60,000 + Parents: 60,000 = 180,000
    expect(screen.getByText(/180,000/)).toBeInTheDocument();
  });

  it('does not render Continue button (navigation handled by wizard)', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  it('shows child allowance with bonus for 2nd+ child born 2018+', () => {
    const formData = createBaseFormData({
      children: [
        { birthYear: 2015 },
        { birthYear: 2020 },
      ],
      childrenEligibilityConfirmed: true,
    });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DependentsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Should show bonus indicator for 2nd child
    expect(screen.getByText(/\+฿30k bonus/i)).toBeInTheDocument();
  });
});
