import { describe, it, expect } from 'vitest';
import { faqData } from '../faq';
import { getArticleBySlug } from '../articles';
import { getSourceById } from '../sources';

const allItems = faqData.flatMap((category) => category.items);

describe('faqData', () => {
  it('has 43 items across 8 categories', () => {
    expect(faqData).toHaveLength(8);
    expect(allItems).toHaveLength(43);
  });

  it('every relatedArticleSlug resolves to a real article', () => {
    for (const item of allItems) {
      if (item.relatedArticleSlug) {
        expect(
          getArticleBySlug(item.relatedArticleSlug),
          `"${item.question}" points to missing article slug "${item.relatedArticleSlug}"`
        ).toBeDefined();
      }
    }
  });

  it('every sourceId resolves to a real registry entry', () => {
    for (const item of allItems) {
      if (item.sourceId) {
        expect(
          getSourceById(item.sourceId),
          `"${item.question}" points to missing source id "${item.sourceId}"`
        ).toBeDefined();
      }
    }
  });

  it('most items have a related article, but not all — curation is not forced', () => {
    const withRelated = allItems.filter((i) => i.relatedArticleSlug).length;
    expect(withRelated).toBeGreaterThan(30);
    expect(withRelated).toBeLessThan(allItems.length);
  });

  it('sourcing is a genuine subset, not every item forced to cite something', () => {
    const withSource = allItems.filter((i) => i.sourceId).length;
    expect(withSource).toBeGreaterThan(10);
    expect(withSource).toBeLessThan(allItems.length);
  });
});
