import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import ArrowIcon from '../components/ui/ArrowIcon';

// Client-side "not found" experience for any path that doesn't match a defined route.
// Intentionally excluded from the sitemap, llms.txt, and prerender route list — see
// TECHNICAL_SEO_022.md Issue T-05. This is an in-app UI fix only; it does not change the
// HTTP status GitHub Pages returns for unmatched server paths (that's a separate,
// hosting-level concern via docs/404.html).
const NotFoundPage: React.FC = () => (
  <div className="mx-auto max-w-[52rem] px-4 pb-24 pt-14 sm:px-6 lg:pt-20">
    <Helmet>
      <title>Page Not Found | My Thai Taxes</title>
      <meta name="description" content="The page you're looking for doesn't exist or may have moved." />
      <meta name="robots" content="noindex" />
    </Helmet>
    <p className="font-mono text-sm font-semibold tabular-nums text-ink-mute">404</p>
    <h1 className="display mt-2 text-4xl leading-[1.08] text-ink sm:text-5xl">Page Not Found</h1>
    <p className="mt-4 max-w-prose text-[17px] leading-relaxed text-ink-soft">
      Sorry, we couldn't find the page you were looking for. It may have been moved, renamed,
      or never existed.
    </p>
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <Link to="/" className="btn-primary group">
        Go to Homepage
        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </Link>
      <Link to="/articles/" className="btn-text">
        Browse Articles
      </Link>
    </div>
  </div>
);

export default NotFoundPage;
