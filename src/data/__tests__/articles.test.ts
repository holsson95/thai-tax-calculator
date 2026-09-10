import { describe, it, expect } from 'vitest';
import { getArticleBySlug } from '../articles';
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
