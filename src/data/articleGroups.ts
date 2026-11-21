import type { Article } from './articles';

/**
 * How the /articles/ index groups guides by the reader's situation.
 *
 * Grouping is by slug, not by Article.category, because a reader's situation
 * cuts across categories (the digital-nomad guide is "Freelance" but belongs
 * with remote workers; visa guides are "International" but read as expat
 * guides). Any article not listed here falls into the last group, so a new
 * article can never disappear from the index.
 */

export interface ArticleGroupDef {
  id: string;
  title: string;
  slugs: string[];
}

/** The three guides a first-time visitor should read, shown with summaries. */
export const FEATURED_ARTICLE_SLUGS = [
  'thailand-tax-guide-for-expats',
  'understanding-thai-tax-residency',
  'transferring-money-to-thailand-tax-rules',
];

export const ARTICLE_GROUPS: ArticleGroupDef[] = [
  {
    id: 'expats',
    title: 'Expats & foreign income',
    slugs: [
      'foreign-income-thailand-tax',
      'double-tax-agreements-thailand',
      'thailand-tax-for-uk-expats',
      'thailand-tax-for-us-expats',
      'ltr-visa-tax-benefits',
      'dtv-visa-thailand-tax-guide',
    ],
  },
  {
    id: 'freelancers',
    title: 'Freelancers & remote workers',
    slugs: [
      'freelancer-tax-guide-thailand',
      'digital-nomad-taxes-thailand',
      'flat-rate-vs-actual-expenses',
      'withholding-tax-freelancers-thailand',
      'pnd94-mid-year-tax-filing',
      'vat-registration-freelancers',
      'freelancer-record-keeping-thailand',
    ],
  },
  {
    id: 'retirees',
    title: 'Retirees',
    slugs: [
      'pensioner-retiree-tax-guide-thailand',
      'foreign-pension-income-thailand-tax',
      'investment-income-retirees-thailand',
      'thailand-retirement-visa-tax-obligations',
    ],
  },
  {
    id: 'basics',
    title: 'Tax basics & filing',
    slugs: [
      'thai-tax-brackets-explained',
      'maximizing-tax-deductions-thailand',
      'expat-guide-filing-thai-taxes',
      'how-to-get-thai-tax-id-number',
      'social-security-contributions-thailand',
      'rental-income-tax-thailand',
      'how-to-use-the-thai-tax-calculator',
    ],
  },
];

export interface ArticleGroup {
  id: string;
  title: string;
  articles: Article[];
}

export interface ArticleIndex {
  featured: Article[];
  groups: ArticleGroup[];
}

/** Where each "Start here" guide belongs, for breadcrumbs on its own page. */
const FEATURED_HOME_GROUP: Record<string, string> = {
  'thailand-tax-guide-for-expats': 'expats',
  'understanding-thai-tax-residency': 'expats',
  'transferring-money-to-thailand-tax-rules': 'expats',
};

/** The group an article is filed under; unlisted articles fall into the last group, as on the index. */
export function getArticleGroup(slug: string): ArticleGroupDef {
  const featuredHome = FEATURED_HOME_GROUP[slug];
  return (
    ARTICLE_GROUPS.find((g) => g.id === featuredHome) ??
    ARTICLE_GROUPS.find((g) => g.slugs.includes(slug)) ??
    ARTICLE_GROUPS[ARTICLE_GROUPS.length - 1]
  );
}

/** Every article appears exactly once: featured, in its group, or in the last group. */
export function buildArticleIndex(all: Article[]): ArticleIndex {
  const bySlug = new Map(all.map((a) => [a.slug, a]));
  const used = new Set<string>();
  const take = (slug: string): Article | undefined => {
    const article = bySlug.get(slug);
    if (!article || used.has(slug)) return undefined;
    used.add(slug);
    return article;
  };

  const featured = FEATURED_ARTICLE_SLUGS.map(take).filter((a): a is Article => !!a);
  const groups = ARTICLE_GROUPS.map((g) => ({
    id: g.id,
    title: g.title,
    articles: g.slugs.map(take).filter((a): a is Article => !!a),
  }));

  const leftovers = all.filter((a) => !used.has(a.slug));
  groups[groups.length - 1].articles.push(...leftovers);

  return { featured, groups: groups.filter((g) => g.articles.length > 0) };
}
