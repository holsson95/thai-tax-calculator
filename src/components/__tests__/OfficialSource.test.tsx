import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import OfficialSource from '../OfficialSource';

describe('OfficialSource', () => {
  it('displays the label, value, source, tax year, and last verified date', () => {
    render(
      <OfficialSource
        label="Personal allowance"
        value="฿60,000"
        sourceLabel="Thai Revenue Department"
        taxYear={2026}
        lastVerified="September 2026"
      />
    );

    expect(screen.getByText('Personal allowance')).toBeInTheDocument();
    expect(screen.getByText('฿60,000')).toBeInTheDocument();
    expect(screen.getByText('Thai Revenue Department')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
    expect(screen.getByText('September 2026')).toBeInTheDocument();
  });

  it('renders the source as a link when sourceUrl is provided', () => {
    render(
      <OfficialSource
        label="Personal allowance"
        value="฿60,000"
        sourceLabel="Thai Revenue Department"
        sourceUrl="https://www.rd.go.th/english/6045.html"
        taxYear={2026}
        lastVerified="September 2026"
      />
    );

    const link = screen.getByRole('link', { name: 'Thai Revenue Department' });
    expect(link).toHaveAttribute('href', 'https://www.rd.go.th/english/6045.html');
  });

  it('renders the source as plain text (no link) when sourceUrl is omitted', () => {
    render(
      <OfficialSource
        label="Personal allowance"
        value="฿60,000"
        sourceLabel="Thai Revenue Department"
        taxYear={2026}
        lastVerified="September 2026"
      />
    );

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('does not show an unverified badge by default', () => {
    render(
      <OfficialSource
        label="Personal allowance"
        value="฿60,000"
        sourceLabel="Thai Revenue Department"
        taxYear={2026}
        lastVerified="September 2026"
      />
    );

    expect(screen.queryByText(/unverified/i)).not.toBeInTheDocument();
  });

  it('shows an unverified badge and notes when verified is false', () => {
    render(
      <OfficialSource
        label="Personal allowance"
        value="฿60,000"
        sourceLabel="PwC Tax Summaries"
        taxYear={2026}
        lastVerified="September 2026"
        verified={false}
        verificationNotes="Corroborated by a secondary source only; no primary document found."
      />
    );

    expect(screen.getByText(/unverified/i)).toBeInTheDocument();
    expect(
      screen.getByText('Corroborated by a secondary source only; no primary document found.')
    ).toBeInTheDocument();
  });

  it('does not show an unverified badge when verified is explicitly true', () => {
    render(
      <OfficialSource
        label="Personal allowance"
        value="฿60,000"
        sourceLabel="Thai Revenue Department"
        taxYear={2026}
        lastVerified="September 2026"
        verified={true}
      />
    );

    expect(screen.queryByText(/unverified/i)).not.toBeInTheDocument();
  });

  it('renders a ReactNode value as-is', () => {
    render(
      <OfficialSource
        label="Tax residency threshold"
        value={<span data-testid="custom-value">180 days</span>}
        sourceLabel="Thai Revenue Department"
        taxYear={2026}
        lastVerified="September 2026"
      />
    );

    expect(screen.getByTestId('custom-value')).toBeInTheDocument();
  });
});
