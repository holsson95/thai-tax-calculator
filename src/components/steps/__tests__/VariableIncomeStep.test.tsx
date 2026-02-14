import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import VariableIncomeStep from '../VariableIncomeStep';
import { MonthlyFormData, MonthlyIncomeEntry } from '../../../types/taxForm';

const createEmptyMonthEntry = (): MonthlyIncomeEntry => ({
  salary: 0,
  bonus: 0,
  housingAllowance: 0,
  otherIncome: 0,
});

function createBaseFormData(overrides: Partial<MonthlyFormData> = {}): MonthlyFormData {
  return {
    estimateType: 'basic',
    incomeType: 'variable',
    monthlySalary: 0,
    annualBonus: 0,
    annualOtherIncome: 0,
    variableIncome: Array(12).fill(null).map(() => createEmptyMonthEntry()),
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
    ...overrides,
  };
}

describe('VariableIncomeStep', () => {
  it('renders the heading', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <VariableIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Enter your monthly income')).toBeInTheDocument();
  });

  it('displays all 12 months', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <VariableIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];

    months.forEach(month => {
      expect(screen.getByText(month)).toBeInTheDocument();
    });
  });

  it('shows Total Annual Income summary', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <VariableIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Total Annual Income')).toBeInTheDocument();
  });

  it('expands month when clicked', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <VariableIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('January'));

    expect(screen.getByText('Salary')).toBeInTheDocument();
    expect(screen.getByText('Bonus')).toBeInTheDocument();
    expect(screen.getByText('Housing Allowance')).toBeInTheDocument();
    expect(screen.getByText('Other Taxable Income')).toBeInTheDocument();
  });

  it('renders social security checkbox', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <VariableIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Include Social Security Contributions')).toBeInTheDocument();
  });

  it('does not render Continue button (navigation handled by wizard)', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <VariableIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.queryByText('Continue')).not.toBeInTheDocument();
  });

  it('displays explanation about taxable income', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <VariableIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText(/All taxable income including bonuses and housing allowances/i)).toBeInTheDocument();
  });

  it('shows social security input when checkbox is checked', () => {
    const formData = createBaseFormData({ includeSocialSecurity: true });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <VariableIncomeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Estimated annual contribution (THB)')).toBeInTheDocument();
  });
});
