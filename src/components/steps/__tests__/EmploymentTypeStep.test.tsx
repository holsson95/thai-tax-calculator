import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EmploymentTypeStep from '../EmploymentTypeStep';
import { TaxFormData } from '../../../types/taxForm';

function createBaseFormData(overrides: Partial<TaxFormData> = {}): TaxFormData {
  return {
    employmentType: '',
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

describe('EmploymentTypeStep', () => {
  it('renders all three employment type options', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EmploymentTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    expect(screen.getByText('Salaried Employee')).toBeInTheDocument();
    expect(screen.getByText('Self-Employed / Freelancer')).toBeInTheDocument();
    expect(screen.getByText('Business Owner')).toBeInTheDocument();
  });

  it('updates formData and advances to next step when salaried is selected', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EmploymentTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('Salaried Employee'));

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      employmentType: 'salaried',
    });
    expect(nextStep).toHaveBeenCalled();
  });

  it('updates formData and advances to next step when self-employed is selected', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EmploymentTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('Self-Employed / Freelancer'));

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      employmentType: 'self-employed',
    });
    expect(nextStep).toHaveBeenCalled();
  });

  it('updates formData and advances to next step when business owner is selected', () => {
    const formData = createBaseFormData();
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EmploymentTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    fireEvent.click(screen.getByText('Business Owner'));

    expect(setFormData).toHaveBeenCalledWith({
      ...formData,
      employmentType: 'business',
    });
    expect(nextStep).toHaveBeenCalled();
  });

  it('shows previously selected employment type as pressed', () => {
    const formData = createBaseFormData({ employmentType: 'salaried' });
    const setFormData = vi.fn();
    const nextStep = vi.fn();

    render(
      <EmploymentTypeStep
        formData={formData}
        setFormData={setFormData}
        nextStep={nextStep}
      />
    );

    const salariedButton = screen.getByRole('button', { name: /salaried employee/i });
    expect(salariedButton).toHaveAttribute('aria-pressed', 'true');
  });
});
