import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthlyIncomeStep from '../MonthlyIncomeStep';
import { MonthlyFormData } from '../../../types/taxForm';

function createBaseFormData(overrides: Partial<MonthlyFormData> = {}): MonthlyFormData {
  return {
    estimateType: 'basic',
    incomeType: 'fixed',
    monthlySalary: 0,
    annualBonus: 0,
    annualOtherIncome: 0,
    variableIncome: [],
    includeSocialSecurity: false,
    socialSecurityContribution: 0,
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
    ...overrides,
  };
}

describe('MonthlyIncomeStep', () => {
  it('renders the assessable income heading and input fields', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MonthlyIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Assessable Income')).toBeInTheDocument();
    expect(screen.getByText('Salary per month (THB)')).toBeInTheDocument();
    expect(screen.getByText('Bonus per year (THB)')).toBeInTheDocument();
    expect(screen.getByText('Other income per year (THB)')).toBeInTheDocument();
  });

  it('renders social security checkbox', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MonthlyIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Include Social Security Contributions')).toBeInTheDocument();
  });

  it('shows social security amount input when checkbox is checked', () => {
    const formData = createBaseFormData({ includeSocialSecurity: true });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MonthlyIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Estimated annual contribution (THB)')).toBeInTheDocument();
    expect(screen.getByText(/Maximum: ฿10,500 per year/)).toBeInTheDocument();
  });

  it('does not show social security amount input when checkbox is unchecked', () => {
    const formData = createBaseFormData({ includeSocialSecurity: false });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MonthlyIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.queryByText('Estimated annual contribution (THB)')).not.toBeInTheDocument();
  });

  it('disables Continue button when no salary entered', () => {
    const formData = createBaseFormData({ monthlySalary: 0 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MonthlyIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const continueButton = screen.getByText('Continue');
    expect(continueButton).toBeDisabled();
  });

  it('calls nextStep when Continue is clicked with valid salary', () => {
    const formData = createBaseFormData({ monthlySalary: 50000 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MonthlyIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Enter salary - use the first input (salary per month)
    const inputs = screen.getAllByPlaceholderText('0');
    fireEvent.change(inputs[0], { target: { value: '50000' } });

    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);

    expect(nextStep).toHaveBeenCalled();
  });

  it('updates formData when salary is entered', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MonthlyIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    // Use the first input (salary per month)
    const inputs = screen.getAllByPlaceholderText('0');
    fireEvent.change(inputs[0], { target: { value: '75000' } });

    expect(setFormData).toHaveBeenCalled();
  });

  it('displays explanation about assessable income', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MonthlyIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText(/Enter your income details below/i)).toBeInTheDocument();
  });

  it('renders helper text for bonus and other income fields', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <MonthlyIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Expected annual bonus amount')).toBeInTheDocument();
    expect(screen.getByText('Housing allowance, overtime, commissions, etc.')).toBeInTheDocument();
  });
});
