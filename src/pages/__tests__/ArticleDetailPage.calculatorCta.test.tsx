import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ArticleDetailPage from '../ArticleDetailPage';

function renderArticle(slug: string) {
  return render(
    <HelmetProvider>
      <MemoryRouter initialEntries={[`/articles/${slug}/`]}>
        <Routes>
          <Route path="/articles/:slug/" element={<ArticleDetailPage />} />
        </Routes>
      </MemoryRouter>
    </HelmetProvider>
  );
}

describe('ArticleDetailPage calculator box', () => {
  it('shows the article’s own calculator above the article and at the end', () => {
    renderArticle('dtv-visa-thailand-tax-guide');
    expect(screen.getByTestId('article-calculator-cta-top')).toBeInTheDocument();
    const links = screen.getAllByRole('link', { name: /open the foreign income calculator/i });
    expect(links).toHaveLength(2);
    links.forEach((l) => expect(l).toHaveAttribute('href', '/foreign-income-tax-calculator/'));
  });

  it('keeps the generic annual calculator box on other articles', () => {
    renderArticle('thai-tax-brackets-explained');
    expect(screen.queryByTestId('article-calculator-cta-top')).not.toBeInTheDocument();
    expect(screen.getByRole('link', { name: /start calculator/i })).toHaveAttribute('href', '/annual-tax/');
  });
});
