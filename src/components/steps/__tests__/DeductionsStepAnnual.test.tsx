import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import DeductionsStepAnnual from '../DeductionsStepAnnual';
import { TaxFormData } from '../../../types/taxForm';

function createBaseFormData(overrides: Partial<TaxFormData> = {}): TaxFormData {
  return {
    employmentType: 'salaried',
    annualIncome: 500000,
    includeSocialSecurity: false,
    socialSecurityContribution: 0,
    maritalStatus: 'single',
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

describe('DeductionsStepAnnual', () => {
  it('renders all deduction options', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DeductionsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Life Insurance Premiums')).toBeInTheDocument();
    expect(screen.getByText('Health Insurance Premiums')).toBeInTheDocument();
    expect(screen.getByText('Government Pension Fund')).toBeInTheDocument();
    expect(screen.getByText('Provident Fund')).toBeInTheDocument();
    expect(screen.getByText('RMF (Retirement Mutual Fund)')).toBeInTheDocument();
    expect(screen.getByText('SSF (Super Savings Fund)')).toBeInTheDocument();
    expect(screen.getByText('Charitable Donations')).toBeInTheDocument();
  });

  it('shows input field when deduction checkbox is checked', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DeductionsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Initially no input fields should be visible (they're hidden by default)
    expect(screen.queryByRole('textbox', { name: /lifeInsurance/i })).not.toBeInTheDocument();

    // Check the life insurance checkbox (index 1, since index 0 is the Age 65+ checkbox)
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // Life insurance is second after Age 65+ checkbox

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      hasLifeInsurance: true,
    });
  });

  it('updates deduction amount when input value changes', () => {
    const formData = createBaseFormData({ hasLifeInsurance: true, lifeInsurance: 0 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DeductionsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: '50000' } });

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      hasLifeInsurance: true,
      lifeInsurance: 50000,
    });
  });

  it('shows max deduction limit in label', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DeductionsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText(/max ฿100,000/)).toBeInTheDocument(); // Life insurance
    expect(screen.getByText(/max ฿25,000/)).toBeInTheDocument(); // Health insurance
  });

  it('shows total deductions summary', () => {
    const formData = createBaseFormData({
      hasLifeInsurance: true,
      lifeInsurance: 50000,
      hasHealthInsurance: true,
      healthInsurance: 20000,
    });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DeductionsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Total Deductions:')).toBeInTheDocument();
    expect(screen.getByText(/70,000/)).toBeInTheDocument();
  });

  it('does not render Continue button (navigation handled by wizard)', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DeductionsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.queryByRole('button', { name: /continue/i })).not.toBeInTheDocument();
  });

  it('shows error when amount exceeds maximum on blur', () => {
    const formData = createBaseFormData({ hasLifeInsurance: true, lifeInsurance: 200000 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DeductionsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const input = screen.getByRole('textbox');
    fireEvent.blur(input);

    expect(screen.getByText(/maximum deduction is ฿100,000/i)).toBeInTheDocument();
  });

  it('calculates donation max based on annual income', () => {
    const formData = createBaseFormData({ annualIncome: 1000000 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DeductionsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Donations max should be 10% of 1,000,000 = 100,000
    expect(screen.getByText(/charitable donations/i).parentElement?.textContent).toContain('100,000');
  });

  it('shows deduction confirmation when valid amount entered', () => {
    const formData = createBaseFormData({ hasLifeInsurance: true, lifeInsurance: 50000 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DeductionsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText(/deduction: ฿50,000/i)).toBeInTheDocument();
  });

  it('unchecking deduction hides the input field', () => {
    const formData = createBaseFormData({ hasLifeInsurance: true, lifeInsurance: 50000 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <DeductionsStepAnnual
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Initially input should be visible
    expect(screen.getByRole('textbox')).toBeInTheDocument();

    // Uncheck the checkbox (index 1, since index 0 is the Age 65+ checkbox)
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      hasLifeInsurance: false,
    });
  });
});
