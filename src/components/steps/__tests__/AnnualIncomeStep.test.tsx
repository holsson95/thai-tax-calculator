import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AnnualIncomeStep from '../AnnualIncomeStep';
import { TaxFormData } from '../../../types/taxForm';

function createBaseFormData(overrides: Partial<TaxFormData> = {}): TaxFormData {
  return {
    employmentType: 'salaried',
    annualIncome: 0,
    maritalStatus: '',
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

describe('AnnualIncomeStep', () => {
  it('renders income input field', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <AnnualIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByLabelText(/annual income/i)).toBeInTheDocument();
  });

  it('does not render Continue button (navigation handled by wizard)', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <AnnualIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  it('updates formData when income is entered', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <AnnualIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const input = screen.getByLabelText(/annual income/i);
    fireEvent.change(input, { target: { value: '500000' } });

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      annualIncome: 500000,
    });
  });

  it('shows error on blur when income is zero', () => {
    const formData = createBaseFormData({ annualIncome: 0 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <AnnualIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const input = screen.getByLabelText(/annual income/i);
    fireEvent.blur(input);

    expect(screen.getByText(/please enter your annual income/i)).toBeInTheDocument();
  });

  it('displays formatted number with commas', () => {
    const formData = createBaseFormData({ annualIncome: 1234567 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <AnnualIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const input = screen.getByLabelText(/annual income/i) as HTMLInputElement;
    expect(input.value).toBe('1,234,567');
  });

  it('handles comma-separated input correctly', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <AnnualIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const input = screen.getByLabelText(/annual income/i);
    fireEvent.change(input, { target: { value: '1,000,000' } });

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      annualIncome: 1000000,
    });
  });
});
