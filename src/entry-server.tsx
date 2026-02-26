import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export { articles } from './data/articles';

export function render(url: string): { html: string; helmetTags: string } {
  // react-helmet-async fills this object with head tags after renderToString
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const helmetContext: any = {};

  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;
  const helmetTags = helmet
    ? [
        helmet.title.toString(),
        helmet.meta.toString(),
        helmet.link.toString(),
        helmet.script.toString(),
      ].join('\n    ')
    : '';

  return { html, helmetTags };
}
