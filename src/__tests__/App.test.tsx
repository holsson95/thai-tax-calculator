import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from '../App';

const renderAt = (path: string) =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('App routing for /monthly-withholding (lazy-loaded, PERF-002 parity with /annual-tax)', () => {
  it('renders a non-empty fallback immediately (no blank screen before the chunk loads)', () => {
    renderAt('/monthly-withholding');

    // Something real should be on screen right away, not an empty page —
    // mirrors AnnualTaxFallback's role for /annual-tax/.
    expect(screen.getByText('Monthly Withholding Estimator')).toBeInTheDocument();
  });

  it('renders the real interactive calculator (Estimate Type step) once the lazy chunk resolves', async () => {
    renderAt('/monthly-withholding');

    expect(await screen.findByText('Choose your estimate type')).toBeInTheDocument();
  });
});
