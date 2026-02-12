import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WithholdingStep from '../WithholdingStep';
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

describe('WithholdingStep', () => {
  it('renders tax withholding input field', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <WithholdingStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByLabelText(/tax already withheld/i)).toBeInTheDocument();
  });

  it('does not render Continue button (navigation handled by wizard)', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <WithholdingStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  it('updates formData when withholding amount is entered', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <WithholdingStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const input = screen.getByLabelText(/tax already withheld/i);
    fireEvent.change(input, { target: { value: '25000' } });

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      taxWithheld: 25000,
    });
  });

  it('displays formatted number with commas', () => {
    const formData = createBaseFormData({ taxWithheld: 123456 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <WithholdingStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const input = screen.getByLabelText(/tax already withheld/i) as HTMLInputElement;
    expect(input.value).toBe('123,456');
  });

  it('handles comma-separated input correctly', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <WithholdingStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const input = screen.getByLabelText(/tax already withheld/i);
    fireEvent.change(input, { target: { value: '50,000' } });

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      taxWithheld: 50000,
    });
  });

  it('shows helpful information about where to find withholding amount', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <WithholdingStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText(/where to find this amount/i)).toBeInTheDocument();
    expect(screen.getByText(/payslips/i)).toBeInTheDocument();
  });

  it('shows explanation of why withholding matters', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <WithholdingStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText(/why this matters/i)).toBeInTheDocument();
    expect(screen.getByText(/refund/i)).toBeInTheDocument();
  });

  it('displays empty string when withholding is 0', () => {
    const formData = createBaseFormData({ taxWithheld: 0 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <WithholdingStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const input = screen.getByLabelText(/tax already withheld/i) as HTMLInputElement;
    expect(input.value).toBe('');
  });
});
