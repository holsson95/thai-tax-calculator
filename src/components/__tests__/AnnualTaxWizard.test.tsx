import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import AnnualTaxWizard from '../AnnualTaxWizard';

// Create a fresh store for each test
let store: Record<string, string> = {};

const mockSessionStorage = {
  getItem: vi.fn((key: string) => store[key] || null),
  setItem: vi.fn((key: string, value: string) => {
    store[key] = value;
  }),
  removeItem: vi.fn((key: string) => {
    delete store[key];
  }),
  clear: vi.fn(() => {
    store = {};
  }),
};

Object.defineProperty(window, 'sessionStorage', {
  value: mockSessionStorage,
});

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AnnualTaxWizard', () => {
  beforeEach(() => {
    // Reset store and mocks before each test
    store = {};
    vi.clearAllMocks();
    // Reset the getItem mock to use the fresh store
    mockSessionStorage.getItem.mockImplementation((key: string) => store[key] || null);
  });

  it('renders the wizard with progress indicator', () => {
    renderWithRouter(<AnnualTaxWizard />);

    expect(screen.getByText(/step 1 of 8/i)).toBeInTheDocument();
    expect(screen.getByText('Employment')).toBeInTheDocument();
  });

  it('shows step 1 (Employment) initially', () => {
    renderWithRouter(<AnnualTaxWizard />);

    expect(screen.getByText('What type of employment do you have?')).toBeInTheDocument();
  });

  it('has Home button that navigates back', () => {
    renderWithRouter(<AnnualTaxWizard />);

    expect(screen.getByLabelText(/go to home page/i)).toBeInTheDocument();
  });

  it('has Start Over button on initial step', () => {
    renderWithRouter(<AnnualTaxWizard />);

    expect(screen.getByLabelText(/start over/i)).toBeInTheDocument();
  });

  it('advances to step 2 when employment type is selected', () => {
    renderWithRouter(<AnnualTaxWizard />);

    fireEvent.click(screen.getByText('Salaried Employee'));

    expect(screen.getByText(/step 2 of 8/i)).toBeInTheDocument();
    expect(screen.getByText('What is your annual income?')).toBeInTheDocument();
  });

  it('shows Previous button on step 2', () => {
    renderWithRouter(<AnnualTaxWizard />);

    // Go to step 2
    fireEvent.click(screen.getByText('Salaried Employee'));

    expect(screen.getByLabelText(/go to previous step/i)).toBeInTheDocument();
  });

  it('navigates back when Previous button is clicked', () => {
    renderWithRouter(<AnnualTaxWizard />);

    // Go to step 2
    fireEvent.click(screen.getByText('Salaried Employee'));
    expect(screen.getByText(/step 2 of 8/i)).toBeInTheDocument();

    // Go back
    fireEvent.click(screen.getByLabelText(/go to previous step/i));

    expect(screen.getByText(/step 1 of 8/i)).toBeInTheDocument();
  });

  it('saves form data to sessionStorage', () => {
    renderWithRouter(<AnnualTaxWizard />);

    fireEvent.click(screen.getByText('Salaried Employee'));

    expect(mockSessionStorage.setItem).toHaveBeenCalled();
  });

  it('saves current step to sessionStorage', () => {
    renderWithRouter(<AnnualTaxWizard />);

    fireEvent.click(screen.getByText('Salaried Employee'));

    expect(mockSessionStorage.setItem).toHaveBeenCalledWith(
      'thai_tax_annual_wizard_step',
      '1'
    );
  });

  it('clears sessionStorage when Start Over is clicked', () => {
    renderWithRouter(<AnnualTaxWizard />);

    // Go to step 2 first
    fireEvent.click(screen.getByText('Salaried Employee'));

    // Click Start Over
    fireEvent.click(screen.getByLabelText(/start over/i));

    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('thai_tax_annual_wizard_data');
    expect(mockSessionStorage.removeItem).toHaveBeenCalledWith('thai_tax_annual_wizard_step');
  });

  it('shows resume indicator when returning to a started wizard', () => {
    // Mock saved state at step 2
    mockSessionStorage.getItem.mockImplementation((key: string) => {
      if (key === 'thai_tax_annual_wizard_step') return '1';
      if (key === 'thai_tax_annual_wizard_data') {
        return JSON.stringify({
          employmentType: 'salaried',
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
        });
      }
      return null;
    });

    renderWithRouter(<AnnualTaxWizard />);

    expect(screen.getByText(/your progress has been saved/i)).toBeInTheDocument();
  });

  it('displays progress percentage correctly', () => {
    renderWithRouter(<AnnualTaxWizard />);

    // Step 1 of 8 = 12.5% rounded to 13%
    expect(screen.getByText(/1[23]%/)).toBeInTheDocument();

    // Go to step 2
    fireEvent.click(screen.getByText('Salaried Employee'));

    // Step 2 of 8 = 25%
    expect(screen.getByText('25%')).toBeInTheDocument();
  });

  it('has accessible progress bar', () => {
    renderWithRouter(<AnnualTaxWizard />);

    // Find the progress bar by its role
    const progressBar = document.querySelector('[role="progressbar"]');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveAttribute('aria-valuenow', '1');
    expect(progressBar).toHaveAttribute('aria-valuemin', '1');
    expect(progressBar).toHaveAttribute('aria-valuemax', '8');
  });

  it('shows all step labels', () => {
    renderWithRouter(<AnnualTaxWizard />);

    const stepLabels = [
      'Employment',
      'Income',
      'Marital Status',
      'Dependents',
      'Deductions',
      'Withholding',
      'Review',
      'Results',
    ];

    stepLabels.forEach((label) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('allows clicking on completed steps to navigate', () => {
    // Start at step 3
    mockSessionStorage.getItem.mockImplementation((key: string) => {
      if (key === 'thai_tax_annual_wizard_step') return '2';
      if (key === 'thai_tax_annual_wizard_data') {
        return JSON.stringify({
          employmentType: 'salaried',
          annualIncome: 500000,
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
        });
      }
      return null;
    });

    renderWithRouter(<AnnualTaxWizard />);

    // Click on Step 1 dot to go back
    const step1Button = screen.getByLabelText(/go to step 1: employment/i);
    fireEvent.click(step1Button);

    expect(screen.getByText(/step 1 of 8/i)).toBeInTheDocument();
  });

  it('disables Next button when income is zero on step 2', () => {
    // Start at step 2 with zero income
    mockSessionStorage.getItem.mockImplementation((key: string) => {
      if (key === 'thai_tax_annual_wizard_step') return '1';
      if (key === 'thai_tax_annual_wizard_data') {
        return JSON.stringify({
          employmentType: 'salaried',
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
        });
      }
      return null;
    });

    renderWithRouter(<AnnualTaxWizard />);

    const nextButton = screen.getByLabelText(/go to next step/i);
    expect(nextButton).toBeDisabled();
  });

  it('enables Next button when income is entered on step 2', () => {
    // Start at step 2 with valid income
    mockSessionStorage.getItem.mockImplementation((key: string) => {
      if (key === 'thai_tax_annual_wizard_step') return '1';
      if (key === 'thai_tax_annual_wizard_data') {
        return JSON.stringify({
          employmentType: 'salaried',
          annualIncome: 500000,
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
        });
      }
      return null;
    });

    renderWithRouter(<AnnualTaxWizard />);

    const nextButton = screen.getByLabelText(/go to next step/i);
    expect(nextButton).not.toBeDisabled();
  });

  it('disables Next button when marital status is not selected on step 3', () => {
    // Start at step 3 with no marital status selected
    mockSessionStorage.getItem.mockImplementation((key: string) => {
      if (key === 'thai_tax_annual_wizard_step') return '2';
      if (key === 'thai_tax_annual_wizard_data') {
        return JSON.stringify({
          employmentType: 'salaried',
          annualIncome: 500000,
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
        });
      }
      return null;
    });

    renderWithRouter(<AnnualTaxWizard />);

    const nextButton = screen.getByLabelText(/go to next step/i);
    expect(nextButton).toBeDisabled();
  });

  it('disables Next button when children exist but eligibility not confirmed on step 4', () => {
    // Start at step 4 with children but eligibility not confirmed
    mockSessionStorage.getItem.mockImplementation((key: string) => {
      if (key === 'thai_tax_annual_wizard_step') return '3';
      if (key === 'thai_tax_annual_wizard_data') {
        return JSON.stringify({
          employmentType: 'salaried',
          annualIncome: 500000,
          maritalStatus: 'single',
          spouseHasNoIncome: false,
          children: [{ birthYear: 2020 }],
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
        });
      }
      return null;
    });

    renderWithRouter(<AnnualTaxWizard />);

    const nextButton = screen.getByLabelText(/go to next step/i);
    expect(nextButton).toBeDisabled();
  });

  it('enables Next button when children eligibility is confirmed on step 4', () => {
    // Start at step 4 with children and eligibility confirmed
    mockSessionStorage.getItem.mockImplementation((key: string) => {
      if (key === 'thai_tax_annual_wizard_step') return '3';
      if (key === 'thai_tax_annual_wizard_data') {
        return JSON.stringify({
          employmentType: 'salaried',
          annualIncome: 500000,
          maritalStatus: 'single',
          spouseHasNoIncome: false,
          children: [{ birthYear: 2020 }],
          childrenEligibilityConfirmed: true,
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
        });
      }
      return null;
    });

    renderWithRouter(<AnnualTaxWizard />);

    const nextButton = screen.getByLabelText(/go to next step/i);
    expect(nextButton).not.toBeDisabled();
  });

  it('enables Next button on Dependents step when eligibility checkbox is clicked', () => {
    // Start at step 4 (Dependents) with no children
    mockSessionStorage.getItem.mockImplementation((key: string) => {
      if (key === 'thai_tax_annual_wizard_step') return '3';
      if (key === 'thai_tax_annual_wizard_data') {
        return JSON.stringify({
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
        });
      }
      return null;
    });

    renderWithRouter(<AnnualTaxWizard />);

    // Verify we're on the Dependents step
    expect(screen.getByText('Dependents & Allowances')).toBeInTheDocument();

    // Next button should be enabled initially (no children = valid)
    let nextButton = screen.getByLabelText(/go to next step/i);
    expect(nextButton).not.toBeDisabled();

    // Check the eligibility checkbox to confirm having eligible children
    const childrenCheckbox = screen.getByLabelText(/i have children who meet these criteria/i);
    fireEvent.click(childrenCheckbox);

    // Next button should still be enabled because childrenEligibilityConfirmed is now true
    nextButton = screen.getByLabelText(/go to next step/i);
    expect(nextButton).not.toBeDisabled();

    // Add a child
    const addButton = screen.getByLabelText(/add child/i);
    fireEvent.click(addButton);

    // Next button should still be enabled because eligibility was confirmed
    nextButton = screen.getByLabelText(/go to next step/i);
    expect(nextButton).not.toBeDisabled();
  });
});
