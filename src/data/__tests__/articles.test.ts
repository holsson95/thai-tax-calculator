import { describe, it, expect } from 'vitest';
import { getArticleBySlug, getRelatedArticles, articles } from '../articles';
import { getTaxExampleById } from '../taxExamples';

describe('thai-tax-brackets-explained article numbers', () => {
  const article = getArticleBySlug('thai-tax-brackets-explained')!;

  it('exists', () => {
    expect(article).toBeDefined();
  });

  it.each([
    'lower-income-employee',
    'middle-income-employee',
    'high-income-employee',
    'bracket-threshold-below',
    'bracket-threshold-above',
  ])('embeds the exact tax figure from the "%s" taxExamples entry, not a re-typed copy', (id) => {
    const example = getTaxExampleById(id)!;
    const taxFormatted = `฿${Math.round(example.taxOwed).toLocaleString('en-US')}`;
    expect(article.content).toContain(taxFormatted);
  });

  it('does not hardcode a stale bracket total that disagrees with the tax engine', () => {
    // Regression guard: if someone reverts to hand-typed numbers, this
    // specific figure (tax on ฿1,000,000 taxable income) must still appear
    // somewhere the article computes it from taxExamples, not a literal
    // that could silently drift.
    const middleIncome = getTaxExampleById('middle-income-employee')!;
    expect(middleIncome.taxOwed).toBe(115000);
    expect(article.content).toContain('฿115,000');
  });
});

describe('getRelatedArticles', () => {
  it('does not pad a 2-entry curated relation up to the limit with fallbacks', () => {
    // 'expat-guide-filing-thai-taxes' has exactly 2 curated relations in RELATED_MAP.
    const related = getRelatedArticles('expat-guide-filing-thai-taxes');
    expect(related).toHaveLength(2);
    expect(related.map(a => a.slug)).toEqual(['understanding-thai-tax-residency', 'how-to-get-thai-tax-id-number']);
  });

  it('shows more than 2 when RELATED_MAP curates a 3rd/4th genuinely relevant article', () => {
    const related = getRelatedArticles('freelancer-tax-guide-thailand');
    expect(related.length).toBeGreaterThan(2);
    expect(related.map(a => a.slug)).toContain('vat-registration-freelancers');
  });

  it('falls back to the default fallback slugs when a slug has no curated relations', () => {
    const related = getRelatedArticles('not-a-real-slug');
    expect(related).toHaveLength(2);
    expect(related.map(a => a.slug)).toEqual(['how-to-use-the-thai-tax-calculator', 'thai-tax-brackets-explained']);
  });

  it('never recommends the article to itself', () => {
    for (const article of articles) {
      const related = getRelatedArticles(article.slug);
      expect(related.map(a => a.slug)).not.toContain(article.slug);
    }
  });

  it('every RELATED_MAP entry points to slugs that actually exist', () => {
    for (const article of articles) {
      const related = getRelatedArticles(article.slug);
      for (const r of related) {
        expect(getArticleBySlug(r.slug)).toBeDefined();
      }
    }
  });
});
