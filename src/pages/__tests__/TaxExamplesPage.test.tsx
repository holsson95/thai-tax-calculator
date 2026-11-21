import { describe, it, expect } from 'vitest';
import { render, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import TaxExamplesPage from '../TaxExamplesPage';
import { taxExamples, getTaxExampleById } from '../../data/taxExamples';
import { formatThb } from '../../utils/taxCalculations';

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <TaxExamplesPage />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('TaxExamplesPage', () => {
  it('renders every worked example as a sheet whose id is its deep-link anchor', () => {
    const { container } = renderPage();
    for (const example of taxExamples) {
      const sheet = container.querySelector(`article#${example.id}`);
      expect(sheet, example.id).not.toBeNull();
      expect(within(sheet as HTMLElement).getByRole('heading', { name: example.title })).toBeInTheDocument();
    }
  });

  it('prints each example’s computed taxable income and tax in its result box', () => {
    const { container } = renderPage();
    const example = getTaxExampleById('simple-employee')!;
    const sheet = within(container.querySelector('article#simple-employee') as HTMLElement);
    expect(sheet.getAllByText(formatThb(example.taxableIncome)).length).toBeGreaterThan(0);
    expect(sheet.getAllByText(formatThb(example.taxOwed)).length).toBeGreaterThan(0);
  });

  it('keeps the step-by-step calculation in the markup, folded in a <details>', () => {
    const { container } = renderPage();
    const details = container.querySelector('article#simple-employee details');
    expect(details).not.toBeNull();
    expect(details!.hasAttribute('open')).toBe(false);
    expect(within(details as HTMLElement).getByText('Standard employment deduction')).toBeInTheDocument();
  });

  it('compares without and with the extra deductions on the deductions example', () => {
    const { container } = renderPage();
    const example = getTaxExampleById('deductions-impact')!;
    const table = within(container.querySelector('article#deductions-impact table') as HTMLElement);
    expect(table.getByText(`-${formatThb(example.before!.taxOwed - example.taxOwed)}`)).toBeInTheDocument();
  });

  it('contents links point at section and example anchors that exist on the page', () => {
    const { container } = renderPage();
    const hrefs = Array.from(container.querySelectorAll('aside[aria-label="On this page"] a')).map((a) =>
      a.getAttribute('href')!
    );
    expect(hrefs.length).toBeGreaterThan(taxExamples.length);
    for (const href of hrefs) {
      expect(container.querySelector(href), href).not.toBeNull();
    }
  });
});
