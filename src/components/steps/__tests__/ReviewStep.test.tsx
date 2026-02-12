import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ReviewStep from '../ReviewStep';
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

describe('ReviewStep', () => {
  it('renders all sections of the review', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('Employment Type')).toBeInTheDocument();
    expect(screen.getByText('Annual Income')).toBeInTheDocument();
    expect(screen.getByText('Marital Status')).toBeInTheDocument();
    expect(screen.getByText('Dependents & Allowances')).toBeInTheDocument();
    expect(screen.getByText('Additional Deductions')).toBeInTheDocument();
    expect(screen.getByText('Tax Already Withheld')).toBeInTheDocument();
  });

  it('displays employment type correctly', () => {
    const formData = createBaseFormData({ employmentType: 'salaried' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('Salaried Employee')).toBeInTheDocument();
  });

  it('displays self-employed correctly', () => {
    const formData = createBaseFormData({ employmentType: 'self-employed' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('Self-Employed / Freelancer')).toBeInTheDocument();
  });

  it('displays business owner correctly', () => {
    const formData = createBaseFormData({ employmentType: 'business' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('Business Owner')).toBeInTheDocument();
  });

  it('displays annual income formatted correctly', () => {
    const formData = createBaseFormData({ annualIncome: 1234567 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('฿1,234,567')).toBeInTheDocument();
  });

  it('displays marital status for single correctly', () => {
    const formData = createBaseFormData({ maritalStatus: 'single' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('Single')).toBeInTheDocument();
  });

  it('displays married with spouse income correctly', () => {
    const formData = createBaseFormData({
      maritalStatus: 'married',
      spouseHasNoIncome: false,
    });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('Married (spouse has income)')).toBeInTheDocument();
  });

  it('displays married without spouse income correctly', () => {
    const formData = createBaseFormData({
      maritalStatus: 'married',
      spouseHasNoIncome: true,
    });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('Married (spouse has no income)')).toBeInTheDocument();
  });

  it('displays spouse allowance when eligible', () => {
    const formData = createBaseFormData({
      maritalStatus: 'married',
      spouseHasNoIncome: true,
    });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('Spouse allowance:')).toBeInTheDocument();
  });

  it('displays children allowance correctly', () => {
    const formData = createBaseFormData({
      children: [{ birthYear: 2020 }, { birthYear: 2021 }],
    });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText(/children \(2\)/i)).toBeInTheDocument();
  });

  it('displays parent allowance correctly', () => {
    const formData = createBaseFormData({ numberOfParents: 2 });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText(/parents \(2\)/i)).toBeInTheDocument();
  });

  it('displays active deductions', () => {
    const formData = createBaseFormData({
      hasLifeInsurance: true,
      lifeInsurance: 50000,
      hasHealthInsurance: true,
      healthInsurance: 20000,
    });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('Life Insurance:')).toBeInTheDocument();
    expect(screen.getByText('Health Insurance:')).toBeInTheDocument();
  });

  it('shows "No deductions claimed" when no deductions', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    expect(screen.getByText('No deductions claimed')).toBeInTheDocument();
  });

  it('calls goToStep when Edit button for employment is clicked', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[0]); // First edit button is for employment

    expect(goToStep).toHaveBeenCalledWith(0);
  });

  it('calls goToStep when Edit button for income is clicked', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    const editButtons = screen.getAllByRole('button', { name: /edit/i });
    fireEvent.click(editButtons[1]); // Second edit button is for income

    expect(goToStep).toHaveBeenCalledWith(1);
  });

  it('calls nextStep when Calculate My Tax button is clicked', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    fireEvent.click(screen.getByRole('button', { name: /calculate my tax/i }));

    expect(nextStep).toHaveBeenCalled();
  });

  it('displays total allowances correctly', () => {
    const formData = createBaseFormData({
      maritalStatus: 'married',
      spouseHasNoIncome: true,
      numberOfParents: 2,
    });
    const setFormData = vi.fn();
    const nextStep = vi.fn();
    const goToStep = vi.fn();

    render(
      <ReviewStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
        goToStep={goToStep}
      />
    );

    // Personal: 60,000 + Spouse: 60,000 + Parents: 60,000 = 180,000
    expect(screen.getByText('Total allowances:')).toBeInTheDocument();
    expect(screen.getByText('฿180,000')).toBeInTheDocument();
  });
});
