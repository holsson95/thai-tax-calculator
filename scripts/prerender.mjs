import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, '..');

// Import the Vite SSR bundle (built by `BUILD_SSR=1 vite build --ssr src/entry-server.tsx`)
const { render, articles } = await import('../dist-ssr/entry-server.js');

const template = readFileSync(resolve(root, 'docs/index.html'), 'utf-8');

const routes = [
  '/',
  '/articles',
  '/faq',
  ...articles.map((a) => `/articles/${a.slug}`),
];

const SITE_URL = 'https://www.mythaitaxes.com';

// --- Prerender pages ---
for (const route of routes) {
  const { html: appHtml, helmetTags } = render(route);

  let fullHtml = template.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`
  );
  if (helmetTags) {
    fullHtml = fullHtml.replace(
      '<title>Thai Tax Calculator</title>',
      helmetTags
    );
  }

  const outDir =
    route === '/' ? resolve(root, 'docs') : resolve(root, `docs${route}`);
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, 'index.html'), fullHtml);
  console.log(`Pre-rendered: ${route}`);
}

// --- Generate sitemap.xml ---
const today = new Date().toISOString().split('T')[0];

const staticRoutes = ['/', '/articles', '/faq'];
const articleRoutes = articles.map((a) => `/articles/${a.slug}`);

const sitemapEntries = [
  ...staticRoutes.map(
    (r) =>
      `  <url>\n    <loc>${SITE_URL}${r}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${r === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
  ),
  ...articleRoutes.map(
    (r) =>
      `  <url>\n    <loc>${SITE_URL}${r}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`
  ),
].join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</urlset>`;

writeFileSync(resolve(root, 'docs/sitemap.xml'), sitemap);
console.log('Generated: docs/sitemap.xml');

console.log(`\nDone. ${routes.length} pages pre-rendered.`);
