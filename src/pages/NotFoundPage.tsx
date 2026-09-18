import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Client-side "not found" experience for any path that doesn't match a defined route.
// Intentionally excluded from the sitemap, llms.txt, and prerender route list — see
// TECHNICAL_SEO_022.md Issue T-05. This is an in-app UI fix only; it does not change the
// HTTP status GitHub Pages returns for unmatched server paths (that's a separate,
// hosting-level concern via docs/404.html).
const NotFoundPage: React.FC = () => (
  <div className="py-16">
    <Helmet>
      <title>Page Not Found | My Thai Taxes</title>
      <meta name="description" content="The page you're looking for doesn't exist or may have moved." />
      <meta name="robots" content="noindex" />
    </Helmet>
    <div className="max-w-xl mx-auto px-4 text-center">
      <p className="text-blue-500 font-semibold mb-2">404</p>
      <h1 className="text-3xl font-bold text-gray-900 mb-3">Page Not Found</h1>
      <p className="text-gray-600 mb-8">
        Sorry, we couldn't find the page you were looking for. It may have been moved, renamed,
        or never existed.
      </p>
      <div className="flex justify-center gap-6">
        <Link to="/" className="text-blue-500 hover:underline font-medium">
          Go to Homepage
        </Link>
        <Link to="/articles/" className="text-blue-500 hover:underline font-medium">
          Browse Articles
        </Link>
      </div>
    </div>
  </div>
);

export default NotFoundPage;
