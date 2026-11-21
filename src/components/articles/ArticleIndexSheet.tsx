import React from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from '../ui/ArrowIcon';
import type { ArticleGroup } from '../../data/articleGroups';

interface ArticleIndexSheetProps {
  group: ArticleGroup;
}

/** One situation group on the /articles/ index: a white sheet of ruled title rows. */
const ArticleIndexSheet: React.FC<ArticleIndexSheetProps> = ({ group }) => {
  const headingId = `articles-${group.id}-heading`;
  return (
    <section
      id={group.id}
      aria-labelledby={headingId}
      className="on-paper scroll-mt-24 bg-paper-white shadow-sheet-sm"
    >
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-desk px-5 py-4 sm:px-6">
        <h2 id={headingId} className="display text-xl text-ink">
          {group.title}
        </h2>
        <span className="field-label shrink-0 text-ink-mute">
          {group.articles.length} {group.articles.length === 1 ? 'guide' : 'guides'}
        </span>
      </div>
      <ul className="px-5 sm:px-6">
        {group.articles.map((article) => (
          <li key={article.slug} className="border-b border-paper-rule last:border-b-0">
            <Link
              to={`/articles/${article.slug}/`}
              className="group flex items-baseline justify-between gap-4 py-3 text-[15px] leading-snug text-ink transition-colors hover:text-desk"
            >
              <span className="font-semibold">{article.title}</span>
              <span className="flex shrink-0 items-center gap-2 font-mono text-xs tabular-nums text-ink-mute">
                {article.readTime} min
                <ArrowIcon className="h-4 w-4 self-center transition-transform group-hover:translate-x-0.5 group-hover:text-desk" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ArticleIndexSheet;
