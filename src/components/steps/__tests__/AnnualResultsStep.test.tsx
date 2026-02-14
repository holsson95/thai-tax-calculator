import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import AnnualResultsStep from '../AnnualResultsStep';
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

describe('AnnualResultsStep', () => {
  it('renders calculation results', () => {
    const formData = createBaseFormData({ annualIncome: 500000 });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    expect(screen.getByText('Your Tax Calculation Results')).toBeInTheDocument();
    expect(screen.getByText('Gross Income')).toBeInTheDocument();
    expect(screen.getByText('Total Allowances')).toBeInTheDocument();
    expect(screen.getByText('Total Deductions')).toBeInTheDocument();
    expect(screen.getByText('Taxable Income')).toBeInTheDocument();
    expect(screen.getByText('Tax Owed')).toBeInTheDocument();
    expect(screen.getByText('Tax Withheld')).toBeInTheDocument();
  });

  it('shows tax refund when withheld exceeds owed', () => {
    const formData = createBaseFormData({
      annualIncome: 500000,
      taxWithheld: 50000, // More than the actual tax owed
    });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    expect(screen.getByText('Tax Refund')).toBeInTheDocument();
    expect(screen.getByText(/overpaid/i)).toBeInTheDocument();
  });

  it('shows additional tax owed when withheld is less than owed', () => {
    const formData = createBaseFormData({
      annualIncome: 1000000,
      taxWithheld: 10000, // Less than the actual tax owed
    });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    expect(screen.getByText('Additional Tax Owed')).toBeInTheDocument();
    expect(screen.getByText(/owe additional tax/i)).toBeInTheDocument();
  });

  it('shows balanced message when withheld equals owed', () => {
    const formData = createBaseFormData({
      annualIncome: 500000,
      taxWithheld: 11500, // Exactly matches tax owed for 500k income (with standard deduction)
    });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    expect(screen.getByText(/matches your tax liability/i)).toBeInTheDocument();
  });

  it('displays effective tax rate', () => {
    const formData = createBaseFormData({ annualIncome: 500000 });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    expect(screen.getByText('Effective Tax Rate')).toBeInTheDocument();
  });

  it('has collapsible detailed breakdown', () => {
    const formData = createBaseFormData({ annualIncome: 500000 });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    const breakdownButton = screen.getByRole('button', { name: /detailed breakdown/i });
    expect(breakdownButton).toBeInTheDocument();
    expect(breakdownButton).toHaveAttribute('aria-expanded', 'false');
  });

  it('expands breakdown when clicked', () => {
    const formData = createBaseFormData({
      annualIncome: 500000,
      hasLifeInsurance: true,
      lifeInsurance: 50000,
    });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    const breakdownButton = screen.getByRole('button', { name: /detailed breakdown/i });
    fireEvent.click(breakdownButton);

    expect(breakdownButton).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText('Allowances')).toBeInTheDocument();
    expect(screen.getByText('Personal')).toBeInTheDocument();
  });

  it('shows deductions in breakdown when they exist', () => {
    const formData = createBaseFormData({
      annualIncome: 500000,
      hasLifeInsurance: true,
      lifeInsurance: 50000,
    });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    const breakdownButton = screen.getByRole('button', { name: /detailed breakdown/i });
    fireEvent.click(breakdownButton);

    expect(screen.getByText('Deductions')).toBeInTheDocument();
    expect(screen.getByText('Life Insurance')).toBeInTheDocument();
  });

  it('shows tax bracket breakdown', () => {
    const formData = createBaseFormData({ annualIncome: 500000 });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    const breakdownButton = screen.getByRole('button', { name: /detailed breakdown/i });
    fireEvent.click(breakdownButton);

    expect(screen.getByText('Tax by Bracket')).toBeInTheDocument();
    expect(screen.getByText('Total Tax')).toBeInTheDocument();
  });

  it('displays disclaimer', () => {
    const formData = createBaseFormData({ annualIncome: 500000 });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    expect(screen.getByText('Disclaimer')).toBeInTheDocument();
    expect(screen.getByText(/estimate only/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /thai revenue department/i })).toBeInTheDocument();
  });

  it('calls onStartOver when Start Over button is clicked', () => {
    const formData = createBaseFormData({ annualIncome: 500000 });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    fireEvent.click(screen.getByRole('button', { name: /start over/i }));

    expect(onStartOver).toHaveBeenCalled();
  });

  it('calculates correct tax for 500k income single person', () => {
    const formData = createBaseFormData({ annualIncome: 500000 });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    // Income: 500,000
    // Standard deduction: 100,000
    // Allowances: 60,000
    // Taxable: 340,000
    // Tax: 0 (first 150k) + 7,500 (5% of 150k) + 4,000 (10% of 40k) = 11,500
    const breakdownButton = screen.getByRole('button', { name: /detailed breakdown/i });
    fireEvent.click(breakdownButton);

    // Verify total tax appears in the breakdown (multiple elements may contain this value)
    const elementsWithTax = screen.getAllByText(/11,500/);
    expect(elementsWithTax.length).toBeGreaterThan(0);
  });

  it('shows spouse allowance in breakdown when married with no spouse income', () => {
    const formData = createBaseFormData({
      annualIncome: 500000,
      maritalStatus: 'married',
      spouseHasNoIncome: true,
    });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    const breakdownButton = screen.getByRole('button', { name: /detailed breakdown/i });
    fireEvent.click(breakdownButton);

    expect(screen.getByText('Spouse')).toBeInTheDocument();
  });

  it('uses green color styling for refund display', () => {
    const formData = createBaseFormData({
      annualIncome: 500000,
      taxWithheld: 50000,
    });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    // Check that refund text is displayed
    expect(screen.getByText('Tax Refund')).toBeInTheDocument();
    // Check for green color class somewhere in the refund area
    const refundAmount = screen.getByText(/overpaid/i);
    expect(refundAmount).toHaveClass('text-green-600');
  });

  it('uses red color styling for owed display', () => {
    const formData = createBaseFormData({
      annualIncome: 1000000,
      taxWithheld: 10000,
    });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    // Check that owed text is displayed
    expect(screen.getByText('Additional Tax Owed')).toBeInTheDocument();
    // Check for red color class somewhere in the owed area
    const owedMessage = screen.getByText(/owe additional tax/i);
    expect(owedMessage).toHaveClass('text-red-600');
  });

  it('handles zero income correctly', () => {
    const formData = createBaseFormData({ annualIncome: 0 });
    const onStartOver = vi.fn();

    render(
      <AnnualResultsStep formData={formData} onStartOver={onStartOver} />
    );

    // Should still render without errors
    expect(screen.getByText('Your Tax Calculation Results')).toBeInTheDocument();
  });
});
