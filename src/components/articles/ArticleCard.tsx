import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../data/articles';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link
      to={`/articles/${article.slug}/`}
      className="group flex h-full flex-col bg-paper-white p-5 text-ink shadow-sheet-sm transition-transform duration-200 hover:-translate-y-0.5"
    >
      <div className="border-b-2 border-desk pb-2">
        <h3 className="font-bold leading-snug text-ink line-clamp-2 group-hover:text-desk">
          {article.title}
        </h3>
      </div>
      <p className="mt-2 text-xs text-ink-mute">
        {article.category} · {article.readTime} min read
      </p>
      <p className="mt-2 text-sm leading-relaxed text-ink-soft line-clamp-3">
        {article.excerpt}
      </p>
    </Link>
  );
};

export default ArticleCard;
