import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FAQAccordion from '../FAQAccordion';

const renderAccordion = (props: React.ComponentProps<typeof FAQAccordion>) =>
  render(
    <MemoryRouter>
      <FAQAccordion {...props} />
    </MemoryRouter>
  );

describe('FAQAccordion', () => {
  it('renders the question and toggles the answer open/closed', () => {
    renderAccordion({ question: 'Is this taxable?', answer: 'It depends.' });
    expect(screen.getByText('Is this taxable?')).toBeInTheDocument();
    expect(screen.queryByText('It depends.')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Is this taxable\?/ }));
    expect(screen.getByText('It depends.')).toBeInTheDocument();
  });

  it('renders a "Read more" link when relatedArticleSlug resolves to a real article', () => {
    renderAccordion({
      question: 'How is tax residency determined?',
      answer: '180 days.',
      relatedArticleSlug: 'understanding-thai-tax-residency',
      defaultOpen: true,
    });
    const link = screen.getByRole('link', { name: /Am I a Thai Tax Resident/ });
    expect(link).toHaveAttribute('href', '/articles/understanding-thai-tax-residency/');
  });

  it('renders no "Read more" link when relatedArticleSlug is omitted', () => {
    renderAccordion({ question: 'Q', answer: 'A', defaultOpen: true });
    expect(screen.queryByText(/Read more/)).not.toBeInTheDocument();
  });

  it('renders a Source line when sourceId resolves to a real registry entry', () => {
    renderAccordion({
      question: 'How is tax residency determined?',
      answer: '180 days.',
      sourceId: 'rd-section-41',
      defaultOpen: true,
    });
    expect(screen.getByText(/Source:/)).toBeInTheDocument();
    const link = screen.getByRole('link', { name: /Revenue Code Section 41/ });
    expect(link).toHaveAttribute('href', 'https://www.rd.go.th/english/37749.html');
  });

  it('renders neither section when the item has no relatedArticleSlug or sourceId', () => {
    renderAccordion({ question: 'Q', answer: 'A', defaultOpen: true });
    expect(screen.queryByText(/Read more/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Source:/)).not.toBeInTheDocument();
  });
});
