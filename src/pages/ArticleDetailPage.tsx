import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ArticleCard from '../components/articles/ArticleCard';
import AdSlot from '../components/ads/AdSlot';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';

const ArticleDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const relatedArticles = slug ? getRelatedArticles(slug, 3) : [];

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  // Split content for mid-article ad
  const contentParts = article.content.split('\n\n');
  const midPoint = Math.floor(contentParts.length / 2);
  const firstHalf = contentParts.slice(0, midPoint).join('\n\n');
  const secondHalf = contentParts.slice(midPoint).join('\n\n');

  return (
    <div className="py-8">
      <div className="max-w-3xl mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <Link to="/articles" className="text-blue-500 hover:text-blue-600 text-sm">
            ← Back to Articles
          </Link>
        </nav>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-sm text-gray-500">
              {article.readTime} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {article.title}
          </h1>
          <p className="text-gray-500 text-sm">
            Published: {new Date(article.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </header>

        {/* Article Content - First Half */}
        <article className="prose prose-gray max-w-none mb-8">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: formatContent(firstHalf) }}
          />
        </article>

        {/* Mid-article Ad */}
        <div className="flex justify-center my-8">
          <AdSlot size="rectangle" />
        </div>

        {/* Article Content - Second Half */}
        <article className="prose prose-gray max-w-none mb-8">
          <div
            className="article-content"
            dangerouslySetInnerHTML={{ __html: formatContent(secondHalf) }}
          />
        </article>

        {/* Calculator CTA */}
        <div className="bg-blue-50 rounded-xl p-6 text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Ready to calculate your tax?
          </h2>
          <p className="text-gray-600 mb-4">
            Put this knowledge to use with our free calculator.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            Start Calculator
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {relatedArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.slug} article={relatedArticle} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

// Simple markdown-like formatting
function formatContent(content: string): string {
  return content
    // Headers
    .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-6 mb-3">$1</h3>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Lists
    .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
    .replace(/^(\d+)\. (.+)$/gm, '<li class="ml-4"><span class="font-medium">$1.</span> $2</li>')
    // Tables (simple)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^-+$/))) {
        return ''; // Skip separator row
      }
      const isHeader = cells.some(c => c.includes('---'));
      const tag = isHeader ? 'th' : 'td';
      const cellsHtml = cells.map(c => `<${tag} class="border border-gray-200 px-4 py-2">${c.trim()}</${tag}>`).join('');
      return `<tr>${cellsHtml}</tr>`;
    })
    // Paragraphs
    .replace(/\n\n/g, '</p><p class="mb-4 text-gray-600 leading-relaxed">')
    // Wrap in paragraph
    .replace(/^/, '<p class="mb-4 text-gray-600 leading-relaxed">')
    .replace(/$/, '</p>')
    // Clean up empty paragraphs
    .replace(/<p class="mb-4 text-gray-600 leading-relaxed"><\/p>/g, '');
}

export default ArticleDetailPage;
