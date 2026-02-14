import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import MonthlyResultsStep from '../MonthlyResultsStep';
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
    incomeType: 'fixed',
    monthlySalary: 50000,
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

describe('MonthlyResultsStep', () => {
  it('renders the results heading', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    expect(screen.getByText('Estimated Monthly Withholding')).toBeInTheDocument();
  });

  it('displays monthly tax withholding result', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    expect(screen.getByText('Monthly Tax Withholding')).toBeInTheDocument();
  });

  it('displays effective rate', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    expect(screen.getByText(/Effective Rate:/)).toBeInTheDocument();
  });

  it('displays summary with annual income, deductions, taxable income, and annual tax', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    expect(screen.getByText('Annual Income')).toBeInTheDocument();
    expect(screen.getByText('Total Deductions')).toBeInTheDocument();
    expect(screen.getByText('Taxable Income')).toBeInTheDocument();
    expect(screen.getByText('Annual Tax')).toBeInTheDocument();
  });

  it('renders Show All Values & Edit button', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    expect(screen.getByText('Show All Values & Edit')).toBeInTheDocument();
  });

  it('shows editable values when Show All Values & Edit is clicked', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    fireEvent.click(screen.getByText('Show All Values & Edit'));

    expect(screen.getByText('Hide Details')).toBeInTheDocument();
    expect(screen.getByText('Monthly Salary')).toBeInTheDocument();
    expect(screen.getByText('Expense Deduction (50%)')).toBeInTheDocument();
    expect(screen.getByText('Personal Allowance')).toBeInTheDocument();
  });

  it('marks standard deduction and personal allowance as non-editable (fixed)', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    fireEvent.click(screen.getByText('Show All Values & Edit'));

    // Both expense deduction and personal allowance should be marked as fixed
    const fixedLabels = screen.getAllByText('(fixed)');
    expect(fixedLabels.length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText('Expense Deduction (50%)')).toBeInTheDocument();
    expect(screen.getByText('Personal Allowance')).toBeInTheDocument();
  });

  it('renders Start Over button', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    expect(screen.getByText('Start Over')).toBeInTheDocument();
  });

  it('calls onStartOver when Start Over button is clicked', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    fireEvent.click(screen.getByText('Start Over'));

    expect(onStartOver).toHaveBeenCalled();
  });

  it('includes social security in deductions when enabled', () => {
    const formData = createBaseFormData({
      includeSocialSecurity: true,
      socialSecurityContribution: 9000,
    });
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    fireEvent.click(screen.getByText('Show All Values & Edit'));

    expect(screen.getByText('Social Security')).toBeInTheDocument();
  });

  it('calculates correctly for basic estimate with fixed income', () => {
    const formData = createBaseFormData({
      estimateType: 'basic',
      incomeType: 'fixed',
      monthlySalary: 50000, // 600,000 annually
      includeSocialSecurity: false,
    });
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    // Annual income should be 600,000
    expect(screen.getByText('฿600,000')).toBeInTheDocument();
  });

  it('shows detailed deductions for detailed estimate', () => {
    const formData = createBaseFormData({
      estimateType: 'detailed',
      maritalStatus: 'married',
      spouseHasNoIncome: true,
      children: [{ birthYear: 2015 }, { birthYear: 2018 }],
      childrenEligibilityConfirmed: true,
      hasLifeInsurance: true,
      lifeInsurance: 50000,
    });
    const setFormData = vi.fn();
    const onStartOver = vi.fn();

    render(
      <MonthlyResultsStep
        formData={formData}
        setFormData={setFormData}
        onStartOver={onStartOver}
      />
    );

    fireEvent.click(screen.getByText('Show All Values & Edit'));

    expect(screen.getByText('Spouse Allowance')).toBeInTheDocument();
    expect(screen.getByText('Child Allowance (2)')).toBeInTheDocument();
    expect(screen.getByText('Life Insurance')).toBeInTheDocument();
  });
});
