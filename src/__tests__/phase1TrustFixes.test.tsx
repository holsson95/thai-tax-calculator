import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { readFileSync, readdirSync } from 'fs';
import { resolve } from 'path';
import HomePage from '../pages/HomePage';
import ThailandTax2026Page from '../pages/ThailandTax2026Page';
import TaxExamplesPage from '../pages/TaxExamplesPage';
import LastUpdated from '../components/LastUpdated';
import { formatDisplayDate, PAGE_LAST_UPDATED } from '../config/contentDates';
import { TAX_YEAR_CONFIG } from '../config/taxConfig';
import { TAX_BRACKETS } from '../types/taxForm';
import { generatePdfFilename } from '../utils/pdfFilename';

const renderPage = (ui: React.ReactElement) =>
  render(
    <HelmetProvider>
      <MemoryRouter>{ui}</MemoryRouter>
    </HelmetProvider>
  );

describe('formatDisplayDate', () => {
  it('formats ISO dates without depending on locale or timezone', () => {
    expect(formatDisplayDate('2026-11-19')).toBe('19 November 2026');
    expect(formatDisplayDate('2026-01-05')).toBe('5 January 2026');
  });

  it('returns the input unchanged when it is not an ISO date', () => {
    expect(formatDisplayDate('soon')).toBe('soon');
    expect(formatDisplayDate('2026-13-01')).toBe('2026-13-01');
  });
});

describe('LastUpdated', () => {
  it('renders a visible label and a machine-readable <time>', () => {
    const { container } = render(<LastUpdated date="2026-09-10" />);
    expect(screen.getByText(/Last updated:/)).toBeInTheDocument();
    expect(container.querySelector('time')?.getAttribute('dateTime')).toBe('2026-09-10');
    expect(screen.getByText('10 September 2026')).toBeInTheDocument();
  });

  it('every configured page date is a valid ISO date', () => {
    for (const date of Object.values(PAGE_LAST_UPDATED)) {
      expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(formatDisplayDate(date)).not.toBe(date);
    }
  });
});

describe('Phase 1 trust fixes', () => {
  it('homepage labels the bracket table with the current tax year, not 2025', () => {
    renderPage(<HomePage />);
    expect(
      screen.getByText(`${TAX_YEAR_CONFIG.CURRENT_TAX_YEAR} Personal Income Tax Rates`)
    ).toBeInTheDocument();
    expect(screen.queryByText(/2025 Personal Income Tax Rates/)).not.toBeInTheDocument();
  });

  it('homepage shows a Last updated date', () => {
    renderPage(<HomePage />);
    expect(screen.getByText(formatDisplayDate(PAGE_LAST_UPDATED.home))).toBeInTheDocument();
  });

  it('homepage mentions the 2024 remittance rule and links to the foreign income calculator', () => {
    renderPage(<HomePage />);
    expect(screen.getByText(/Por\. 161\/2566/)).toBeInTheDocument();
    // The rule lives on the "Foreign income" sheet of the home page's calculator stack.
    fireEvent.click(screen.getByRole('tab', { name: /Foreign income/ }));
    const link = screen.getByRole('link', { name: /Estimate tax on money you remit/ });
    expect(link.getAttribute('href')).toBe('/foreign-income-tax-calculator/');
  });

  it('guide pages show a Last updated date', () => {
    renderPage(<ThailandTax2026Page />);
    expect(screen.getByText(formatDisplayDate(PAGE_LAST_UPDATED.thailandTax2026))).toBeInTheDocument();
  });

  it('tax examples page shows a Last updated date', () => {
    renderPage(<TaxExamplesPage />);
    expect(screen.getByText(formatDisplayDate(PAGE_LAST_UPDATED.taxExamples))).toBeInTheDocument();
  });

  it('PDF file name defaults to the current tax year', () => {
    expect(generatePdfFilename('salaried')).toContain(String(TAX_YEAR_CONFIG.CURRENT_TAX_YEAR));
    expect(generatePdfFilename('salaried')).not.toContain('2025');
  });

  it('no PDF component hard-codes a 2025 tax-year default', () => {
    const pdfDir = resolve(__dirname, '../pdf');
    for (const file of readdirSync(pdfDir).filter((f) => f.endsWith('.tsx'))) {
      const src = readFileSync(resolve(pdfDir, file), 'utf-8');
      expect(src, file).not.toMatch(/taxYear\s*=\s*2025/);
    }
  });
});

describe('tax-data registry ↔ code', () => {
  it('bracket registry is primary-sourced, verified and matches TAX_BRACKETS', () => {
    const registry = JSON.parse(
      readFileSync(resolve(__dirname, '../../tax-data/2026/income-tax-brackets.json'), 'utf-8')
    );
    expect(registry.rules).toHaveLength(TAX_BRACKETS.length);
    registry.rules.forEach((rule: { value: { upTo: number | null; rate: number }; verified: boolean; source: { url: string }; last_verified: string }, i: number) => {
      expect(rule.verified).toBe(true);
      expect(rule.source.url).toBe('https://www.rd.go.th/59670.html');
      expect(rule.last_verified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(rule.value.rate).toBe(TAX_BRACKETS[i].rate);
      expect(rule.value.upTo ?? Infinity).toBe(TAX_BRACKETS[i].upTo);
    });
  });
});
