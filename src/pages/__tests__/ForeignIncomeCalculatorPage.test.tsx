import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import App from '../../App';
import ForeignIncomeCalculatorPage from '../ForeignIncomeCalculatorPage';
import ForeignIncomeCalculator from '../../components/foreignIncome/ForeignIncomeCalculator';
import {
  FOREIGN_INCOME_CALC_FAQS,
  FOREIGN_INCOME_CALC_META,
  FOREIGN_INCOME_CALC_SCHEMA,
} from '../../data/foreignIncomeCalculatorContent';
import { getSourceById } from '../../data/sources';
import { getArticleBySlug } from '../../data/articles';

const wrap = (ui: React.ReactElement, path = '/foreign-income-tax-calculator/') =>
  render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>
    </HelmetProvider>
  );

describe('/foreign-income-tax-calculator/ page', () => {
  it('is routed in App', async () => {
    wrap(<App />);
    expect(await screen.findByRole('heading', { level: 1, name: 'Thailand Foreign Income Tax Calculator' })).toBeInTheDocument();
  });

  it('server-renders the explanation and every FAQ answer (not only the questions)', () => {
    const html = renderToString(
      <HelmetProvider context={{}}>
        <StaticRouter location="/foreign-income-tax-calculator/">
          <ForeignIncomeCalculatorPage />
        </StaticRouter>
      </HelmetProvider>
    );
    const text = new DOMParser().parseFromString(html, 'text/html').body.textContent ?? '';
    expect(text).toContain('How the remittance rule works');
    for (const f of FOREIGN_INCOME_CALC_FAQS) {
      expect(text).toContain(f.answer);
    }
    expect(html).toContain('Loading calculator');
  });

  it('every FAQ source and related article id resolves', () => {
    for (const f of FOREIGN_INCOME_CALC_FAQS) {
      if (f.sourceId) expect(getSourceById(f.sourceId), f.sourceId).toBeDefined();
      if (f.relatedArticleSlug) expect(getArticleBySlug(f.relatedArticleSlug), f.relatedArticleSlug).toBeDefined();
    }
  });

  it('FAQPage schema mirrors the visible FAQ exactly', () => {
    const faqSchema = FOREIGN_INCOME_CALC_SCHEMA.find((s) => s['@type'] === 'FAQPage') as {
      mainEntity: { name: string; acceptedAnswer: { text: string } }[];
    };
    expect(faqSchema.mainEntity.map((q) => q.name)).toEqual(FOREIGN_INCOME_CALC_FAQS.map((f) => f.question));
    expect(faqSchema.mainEntity.map((q) => q.acceptedAnswer.text)).toEqual(FOREIGN_INCOME_CALC_FAQS.map((f) => f.answer));
  });

  it('metadata is self-canonical, and the title and description are within typical length limits', () => {
    expect(FOREIGN_INCOME_CALC_META.canonicalUrl).toBe('https://mythaitaxes.com/foreign-income-tax-calculator/');
    expect(FOREIGN_INCOME_CALC_META.title.length).toBeLessThanOrEqual(75);
    expect(FOREIGN_INCOME_CALC_META.description.length).toBeLessThanOrEqual(170);
  });

  it('wording stays informational (no "you will owe", "guaranteed", "tax advice" offered)', () => {
    const text = JSON.stringify(FOREIGN_INCOME_CALC_FAQS) + FOREIGN_INCOME_CALC_META.description;
    expect(text).not.toMatch(/you will owe|guarantee|we advise you to/i);
  });
});

describe('ForeignIncomeCalculator (interactive)', () => {
  beforeEach(() => window.sessionStorage.clear());

  const fillBasic = (days: string, amount: string) => {
    fireEvent.change(screen.getByLabelText('Days in Thailand this year'), { target: { value: days } });
    fireEvent.change(screen.getByLabelText('Amount'), { target: { value: amount } });
  };

  it('shows resident / non-resident status as days are entered', () => {
    wrap(<ForeignIncomeCalculator />);
    fireEvent.change(screen.getByLabelText('Days in Thailand this year'), { target: { value: '200' } });
    expect(screen.getByText(/Thai tax resident/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Days in Thailand this year'), { target: { value: '90' } });
    expect(screen.getByText(/Non-resident/)).toBeInTheDocument();
  });

  it('validates days before estimating', () => {
    wrap(<ForeignIncomeCalculator />);
    fireEvent.click(screen.getByRole('button', { name: 'Estimate my tax' }));
    expect(screen.getByRole('alert')).toHaveTextContent(/days/);
  });

  it('estimates tax, shows the bracket breakdown, and calls onEstimate', () => {
    let called = 0;
    wrap(<ForeignIncomeCalculator onEstimate={() => called++} />);
    fillBasic('200', '1,500,000');
    fireEvent.click(screen.getByRole('button', { name: 'Estimate my tax' }));
    const results = screen.getByRole('region', { name: /estimate/i });
    expect(within(results).getByText('Estimated Thai tax')).toBeInTheDocument();
    expect(within(results).getByText('Tax by bracket')).toBeInTheDocument();
    expect(within(results).getByText(/not law/)).toBeInTheDocument();
    expect(called).toBe(1);
  });

  it('raises the large-remittance and US-citizen flags', () => {
    wrap(<ForeignIncomeCalculator />);
    fillBasic('200', '1500000');
    fireEvent.change(screen.getByLabelText('Nationality'), { target: { value: 'US' } });
    fireEvent.click(screen.getByRole('button', { name: 'Estimate my tax' }));
    expect(screen.getByText('US citizen.')).toBeInTheDocument();
    expect(screen.getByText(/Remittances over ฿1,000,000/)).toBeInTheDocument();
  });

  it('asks about residency only for earlier 2024+ years', () => {
    wrap(<ForeignIncomeCalculator />);
    expect(screen.queryByText(/Were you in Thailand 180\+ days in 2024/)).not.toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Year the money was earned'), { target: { value: '2024' } });
    expect(screen.getByText(/Were you in Thailand 180\+ days in 2024/)).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText('Year the money was earned'), { target: { value: 'pre2024' } });
    expect(screen.queryByText(/Were you in Thailand 180\+ days/)).not.toBeInTheDocument();
  });

  it('can add and remove transfers', () => {
    wrap(<ForeignIncomeCalculator />);
    fireEvent.click(screen.getByRole('button', { name: '+ Add another transfer' }));
    expect(screen.getAllByLabelText('Amount')).toHaveLength(2);
    fireEvent.click(screen.getByRole('button', { name: 'Remove transfer 2' }));
    expect(screen.getAllByLabelText('Amount')).toHaveLength(1);
  });
});
