import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CalculateTaxCTA from '../CalculateTaxCTA';

describe('CalculateTaxCTA', () => {
  it('renders the heading, description, and primary action link', () => {
    render(
      <MemoryRouter>
        <CalculateTaxCTA
          heading="Ready to calculate your tax?"
          description="Put this knowledge to use with our free calculator."
          primary={{ label: 'Start Calculator', to: '/annual-tax/' }}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Ready to calculate your tax?')).toBeInTheDocument();
    expect(screen.getByText('Put this knowledge to use with our free calculator.')).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Start Calculator/ });
    expect(link).toHaveAttribute('href', '/annual-tax/');
  });

  it('does not render a secondary action when none is given', () => {
    render(
      <MemoryRouter>
        <CalculateTaxCTA
          heading="Estimate your tax"
          description="Description"
          primary={{ label: 'Start Calculator', to: '/annual-tax/' }}
        />
      </MemoryRouter>
    );

    expect(screen.getAllByRole('link')).toHaveLength(1);
  });

  it('renders a secondary action link when provided', () => {
    render(
      <MemoryRouter>
        <CalculateTaxCTA
          heading="Estimate your tax"
          description="Description"
          primary={{ label: 'Annual Tax Calculator', to: '/annual-tax/' }}
          secondary={{ label: 'Monthly Withholding Estimator', to: '/monthly-withholding/' }}
        />
      </MemoryRouter>
    );

    const secondaryLink = screen.getByRole('link', { name: 'Monthly Withholding Estimator' });
    expect(secondaryLink).toHaveAttribute('href', '/monthly-withholding/');
  });

  it('renders the heading as an h3 when headingLevel is "h3"', () => {
    render(
      <MemoryRouter>
        <CalculateTaxCTA
          heading="Estimate your tax"
          description="Description"
          primary={{ label: 'Start Calculator', to: '/annual-tax/' }}
          headingLevel="h3"
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 3, name: 'Estimate your tax' })).toBeInTheDocument();
  });

  it('renders the heading as an h2 by default', () => {
    render(
      <MemoryRouter>
        <CalculateTaxCTA
          heading="Ready to calculate your tax?"
          description="Description"
          primary={{ label: 'Start Calculator', to: '/annual-tax/' }}
        />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { level: 2, name: 'Ready to calculate your tax?' })).toBeInTheDocument();
  });
});
