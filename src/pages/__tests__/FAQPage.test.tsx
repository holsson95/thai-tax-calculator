import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import FAQPage from '../FAQPage';
import { faqData, searchFAQ } from '../../data/faq';

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <FAQPage />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('FAQPage', () => {
  it('puts every question and its answer in the markup, folded', () => {
    const { container } = renderPage();
    const details = container.querySelectorAll('details:not(.lg\\:hidden)');
    const total = faqData.reduce((n, c) => n + c.items.length, 0);
    expect(details.length).toBe(total);
    const first = faqData[0].items[0];
    expect(container.textContent).toContain(first.answer);
    details.forEach((d) => expect((d as HTMLDetailsElement).open).toBe(false));
  });

  it('gives each group a sheet whose id the group links point to', () => {
    const { container } = renderPage();
    const links = Array.from(container.querySelectorAll('nav[aria-label="Question groups"] a'));
    expect(links).toHaveLength(faqData.length);
    for (const link of links) {
      expect(container.querySelector(link.getAttribute('href')!)).not.toBeNull();
    }
  });

  it('search shows only matching questions and opens the first', () => {
    const { container } = renderPage();
    fireEvent.change(screen.getByLabelText('Search the questions'), { target: { value: 'pension' } });
    const expected = searchFAQ('pension');
    const details = container.querySelectorAll('section[aria-labelledby="faq-results-heading"] details');
    expect(details.length).toBe(expected.length);
    expect((details[0] as HTMLDetailsElement).open).toBe(true);
    expect(screen.getByText(`${expected.length} questions match.`)).toBeInTheDocument();
  });

  it('offers a way back when nothing matches', () => {
    renderPage();
    fireEvent.change(screen.getByLabelText('Search the questions'), { target: { value: 'zzzqqq' } });
    fireEvent.click(screen.getByRole('button', { name: 'Show all questions' }));
    expect(screen.getByRole('heading', { name: faqData[0].name })).toBeInTheDocument();
  });
});
