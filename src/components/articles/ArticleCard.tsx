import React from 'react';
import { Link } from 'react-router-dom';
import { Article } from '../../data/articles';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link
      to={`/articles/${article.slug}`}
      className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
    >
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-medium text-blue-500 bg-blue-50 px-2 py-1 rounded">
            {article.category}
          </span>
          <span className="text-xs text-gray-500">
            {article.readTime} min read
          </span>
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-600 text-sm line-clamp-2">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
};

export default ArticleCard;
