import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import ArticlesPage from '../ArticlesPage';
import { articles, type Article } from '../../data/articles';
import { ARTICLE_GROUPS, FEATURED_ARTICLE_SLUGS, buildArticleIndex } from '../../data/articleGroups';

const renderPage = () =>
  render(
    <HelmetProvider>
      <MemoryRouter>
        <ArticlesPage />
      </MemoryRouter>
    </HelmetProvider>
  );

describe('buildArticleIndex', () => {
  it('places every article exactly once', () => {
    const { featured, groups } = buildArticleIndex(articles);
    const slugs = [...featured, ...groups.flatMap((g) => g.articles)].map((a) => a.slug);
    expect(slugs).toHaveLength(articles.length);
    expect(new Set(slugs).size).toBe(articles.length);
  });

  it('only references slugs that exist', () => {
    const known = new Set(articles.map((a) => a.slug));
    const referenced = [...FEATURED_ARTICLE_SLUGS, ...ARTICLE_GROUPS.flatMap((g) => g.slugs)];
    expect(referenced.filter((s) => !known.has(s))).toEqual([]);
  });

  it('puts an unmapped article in the last group instead of dropping it', () => {
    const stray = { ...articles[0], slug: 'brand-new-guide' } as Article;
    const { groups } = buildArticleIndex([...articles, stray]);
    expect(groups[groups.length - 1].articles.map((a) => a.slug)).toContain('brand-new-guide');
  });
});

describe('ArticlesPage', () => {
  it('links to every article', () => {
    const { container } = renderPage();
    for (const article of articles) {
      expect(container.querySelector(`a[href="/articles/${article.slug}/"]`)).not.toBeNull();
    }
  });

  it('shows a heading and jump link for each group', () => {
    renderPage();
    for (const group of ARTICLE_GROUPS) {
      expect(screen.getByRole('heading', { level: 2, name: group.title })).toBeInTheDocument();
      expect(screen.getByRole('link', { name: new RegExp(group.title.replace('&', '\\&')) })).toHaveAttribute(
        'href',
        `#${group.id}`
      );
    }
  });

  it('shows summaries only for the featured guides', () => {
    renderPage();
    const featured = articles.filter((a) => FEATURED_ARTICLE_SLUGS.includes(a.slug));
    const other = articles.find((a) => !FEATURED_ARTICLE_SLUGS.includes(a.slug))!;
    for (const a of featured) expect(screen.getByText(a.excerpt)).toBeInTheDocument();
    expect(screen.queryByText(other.excerpt)).toBeNull();
  });
});
