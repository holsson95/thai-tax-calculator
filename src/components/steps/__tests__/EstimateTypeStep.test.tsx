import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EstimateTypeStep from '../EstimateTypeStep';
import { MonthlyFormData } from '../../../types/taxForm';

function createBaseFormData(overrides: Partial<MonthlyFormData> = {}): MonthlyFormData {
  return {
    estimateType: '',
    incomeType: '',
    monthlySalary: 0,
    annualBonus: 0,
    annualOtherIncome: 0,
    variableIncome: [],
    includeSocialSecurity: false,
    socialSecurityContribution: 0,
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

describe('EstimateTypeStep', () => {
  it('renders both estimate type options', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EstimateTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Basic Estimate')).toBeInTheDocument();
    expect(screen.getByText('Detailed Estimate')).toBeInTheDocument();
  });

  it('renders the explanation text', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EstimateTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(
      screen.getByText(/You can choose a quick estimate without deductions/i)
    ).toBeInTheDocument();
  });

  it('updates formData and advances to next step when Basic is selected', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EstimateTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('Basic Estimate'));

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      estimateType: 'basic',
    });
    expect(nextStep).toHaveBeenCalled();
  });

  it('updates formData and advances to next step when Detailed is selected', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EstimateTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('Detailed Estimate'));

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      estimateType: 'detailed',
    });
    expect(nextStep).toHaveBeenCalled();
  });

  it('shows previously selected estimate type as pressed', () => {
    const formData = createBaseFormData({ estimateType: 'basic' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EstimateTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const basicButton = screen.getByRole('button', { name: /basic estimate/i });
    expect(basicButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('shows detailed as pressed when previously selected', () => {
    const formData = createBaseFormData({ estimateType: 'detailed' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EstimateTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const detailedButton = screen.getByRole('button', { name: /detailed estimate/i });
    expect(detailedButton).toHaveAttribute('aria-pressed', 'true');
  });
});
