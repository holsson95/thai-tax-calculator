import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MonthlyWithholding from '../MonthlyWithholding';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <MemoryRouter>
      {component}
    </MemoryRouter>
  );
};

describe('MonthlyWithholding', () => {
  describe('Fiscal Year Notice', () => {
    it('displays the fiscal year notice at the top', () => {
      renderWithRouter(<MonthlyWithholding />);

      expect(
        screen.getByText(/This estimate is based on Thai tax rules for Fiscal Year 2026/i)
      ).toBeInTheDocument();
    });
  });

  describe('Header Navigation', () => {
    it('displays Home link', () => {
      renderWithRouter(<MonthlyWithholding />);

      expect(screen.getByText('Home')).toBeInTheDocument();
    });

    it('displays Start Over button on non-result steps', () => {
      renderWithRouter(<MonthlyWithholding />);

      expect(screen.getByText('Start Over')).toBeInTheDocument();
    });

    it('displays progress bar and step counter', () => {
      renderWithRouter(<MonthlyWithholding />);

      expect(screen.getByText(/Step 1 of/)).toBeInTheDocument();
    });
  });

  describe('Estimate Type Step', () => {
    it('shows the estimate type step as the first step', () => {
      renderWithRouter(<MonthlyWithholding />);

      expect(screen.getByText('Estimate Type')).toBeInTheDocument();
      expect(screen.getByText('Choose your estimate type')).toBeInTheDocument();
    });

    it('shows both Basic and Detailed options', () => {
      renderWithRouter(<MonthlyWithholding />);

      expect(screen.getByText('Basic Estimate')).toBeInTheDocument();
      expect(screen.getByText('Detailed Estimate')).toBeInTheDocument();
    });

    it('advances to Income Type step when Basic is selected', () => {
      renderWithRouter(<MonthlyWithholding />);

      fireEvent.click(screen.getByText('Basic Estimate'));

      expect(screen.getByText('Income Type')).toBeInTheDocument();
      expect(screen.getByText('How do you receive your income?')).toBeInTheDocument();
    });

    it('advances to Income Type step when Detailed is selected', () => {
      renderWithRouter(<MonthlyWithholding />);

      fireEvent.click(screen.getByText('Detailed Estimate'));

      expect(screen.getByText('Income Type')).toBeInTheDocument();
      expect(screen.getByText('How do you receive your income?')).toBeInTheDocument();
    });
  });

  describe('Income Type Step', () => {
    it('shows Fixed and Variable income options', () => {
      renderWithRouter(<MonthlyWithholding />);

      // Go to income type step
      fireEvent.click(screen.getByText('Basic Estimate'));

      expect(screen.getByText('Fixed Monthly Income')).toBeInTheDocument();
      expect(screen.getByText('Variable Monthly Income')).toBeInTheDocument();
    });

    it('advances to Assessable Income step when Fixed is selected', () => {
      renderWithRouter(<MonthlyWithholding />);

      // Go to income type step
      fireEvent.click(screen.getByText('Basic Estimate'));
      fireEvent.click(screen.getByText('Fixed Monthly Income'));

      // "Assessable Income" appears both in step indicator and page heading
      expect(screen.getAllByText('Assessable Income').length).toBeGreaterThan(0);
      expect(screen.getByText('Salary per month (THB)')).toBeInTheDocument();
    });

    it('advances to Variable Income step when Variable is selected', () => {
      renderWithRouter(<MonthlyWithholding />);

      // Go to income type step
      fireEvent.click(screen.getByText('Basic Estimate'));
      fireEvent.click(screen.getByText('Variable Monthly Income'));

      expect(screen.getByText('Monthly Income')).toBeInTheDocument();
      expect(screen.getByText('Enter your monthly income')).toBeInTheDocument();
    });
  });

  describe('Step Navigation', () => {
    it('does not show Previous button on first step', () => {
      renderWithRouter(<MonthlyWithholding />);

      expect(screen.queryByText('Previous')).not.toBeInTheDocument();
    });

    it('shows Previous button on second step', () => {
      renderWithRouter(<MonthlyWithholding />);

      // Go to step 2
      fireEvent.click(screen.getByText('Basic Estimate'));

      expect(screen.getByText('Previous')).toBeInTheDocument();
    });

    it('navigates back when Previous is clicked', () => {
      renderWithRouter(<MonthlyWithholding />);

      // Go to step 2
      fireEvent.click(screen.getByText('Basic Estimate'));
      expect(screen.getByText('How do you receive your income?')).toBeInTheDocument();

      // Go back
      fireEvent.click(screen.getByText('Previous'));

      expect(screen.getByText('Choose your estimate type')).toBeInTheDocument();
    });
  });

  describe('Basic Estimate Flow', () => {
    it('follows the correct step order: Estimate Type -> Income Type -> Income Entry -> Results', () => {
      renderWithRouter(<MonthlyWithholding />);

      // Step 1: Estimate Type
      expect(screen.getByText('Estimate Type')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Basic Estimate'));

      // Step 2: Income Type
      expect(screen.getByText('Income Type')).toBeInTheDocument();
      fireEvent.click(screen.getByText('Fixed Monthly Income'));

      // Step 3: Assessable Income
      expect(screen.getAllByText('Assessable Income').length).toBeGreaterThan(0);
    });

    it('shows social security checkbox on income step', () => {
      renderWithRouter(<MonthlyWithholding />);

      fireEvent.click(screen.getByText('Basic Estimate'));
      fireEvent.click(screen.getByText('Fixed Monthly Income'));

      expect(screen.getByText('Include Social Security Contributions')).toBeInTheDocument();
    });
  });

  describe('Detailed Estimate Flow', () => {
    it('includes additional steps for marital status, dependents, and deductions', () => {
      renderWithRouter(<MonthlyWithholding />);

      // Step 1: Estimate Type
      fireEvent.click(screen.getByText('Detailed Estimate'));

      // Step 2: Income Type
      fireEvent.click(screen.getByText('Fixed Monthly Income'));

      // Step 3: Assessable Income - enter a value and continue
      const salaryInputs = screen.getAllByPlaceholderText('0');
      fireEvent.change(salaryInputs[0], { target: { value: '50000' } });
      fireEvent.click(screen.getByText('Continue'));

      // Step 4: Should be Marital Status for detailed estimate
      expect(screen.getByText('Marital Status')).toBeInTheDocument();
    });
  });

  describe('Start Over', () => {
    it('resets to first step when Start Over is clicked', () => {
      renderWithRouter(<MonthlyWithholding />);

      // Go to step 2
      fireEvent.click(screen.getByText('Basic Estimate'));
      expect(screen.getByText('Income Type')).toBeInTheDocument();

      // Click Start Over
      fireEvent.click(screen.getByText('Start Over'));

      expect(screen.getByText('Estimate Type')).toBeInTheDocument();
      expect(screen.getByText('Choose your estimate type')).toBeInTheDocument();
    });
  });

  describe('Step Titles', () => {
    it('displays correct title for each step', () => {
      renderWithRouter(<MonthlyWithholding />);

      // Step 1
      expect(screen.getByText('Estimate Type')).toBeInTheDocument();

      // Go to step 2
      fireEvent.click(screen.getByText('Basic Estimate'));
      expect(screen.getByText('Income Type')).toBeInTheDocument();

      // Go to step 3
      fireEvent.click(screen.getByText('Fixed Monthly Income'));
      expect(screen.getAllByText('Assessable Income').length).toBeGreaterThan(0);
    });
  });
});
