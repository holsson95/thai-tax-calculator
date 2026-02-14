import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import IncomeTypeStep from '../IncomeTypeStep';
import { MonthlyFormData } from '../../../types/taxForm';

function createBaseFormData(overrides: Partial<MonthlyFormData> = {}): MonthlyFormData {
  return {
    estimateType: 'basic',
    incomeType: '',
    monthlySalary: 0,
    annualBonus: 0,
    annualOtherIncome: 0,
    variableIncome: [],
    includeSocialSecurity: false,
    socialSecurityContribution: 0,
    parentsEligibilityConfirmed: false,
    maritalStatus: '',
    spouseHasNoIncome: false,
    isAge65OrOlder: false,
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

describe('IncomeTypeStep', () => {
  it('renders both income type options', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <IncomeTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Fixed Monthly Income')).toBeInTheDocument();
    expect(screen.getByText('Variable Monthly Income')).toBeInTheDocument();
  });

  it('renders the question heading', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <IncomeTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('How do you receive your income?')).toBeInTheDocument();
  });

  it('renders description text for each option', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <IncomeTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Same salary every month')).toBeInTheDocument();
    expect(screen.getByText('Different income each month (bonuses, allowances, etc.)')).toBeInTheDocument();
  });

  it('updates formData and advances to next step when Fixed is selected', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <IncomeTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('Fixed Monthly Income'));

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      incomeType: 'fixed',
    });
    expect(nextStep).toHaveBeenCalled();
  });

  it('updates formData and advances to next step when Variable is selected', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <IncomeTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('Variable Monthly Income'));

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      incomeType: 'variable',
    });
    expect(nextStep).toHaveBeenCalled();
  });

  it('shows previously selected income type as pressed', () => {
    const formData = createBaseFormData({ incomeType: 'fixed' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <IncomeTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const fixedButton = screen.getByRole('button', { name: /fixed monthly income/i });
    expect(fixedButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows variable as pressed when previously selected', () => {
    const formData = createBaseFormData({ incomeType: 'variable' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <IncomeTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const variableButton = screen.getByRole('button', { name: /variable monthly income/i });
    expect(variableButton).toHaveAttribute('aria-pressed', 'true');
  });
});
