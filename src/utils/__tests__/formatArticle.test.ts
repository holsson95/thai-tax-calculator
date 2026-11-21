import { describe, it, expect } from 'vitest';
import { formatArticle, splitAtMiddleHeading } from '../formatArticle';
import { articles } from '../../data/articles';

describe('formatArticle', () => {
  it('gives each ## heading a unique id and lists it', () => {
    const { html, headings } = formatArticle('## Who Must File?\n\nText\n\n## Who Must File?\n\n### Sub');
    expect(headings).toEqual([
      { id: 'who-must-file', text: 'Who Must File?' },
      { id: 'who-must-file-2', text: 'Who Must File?' },
    ]);
    expect(html).toContain('<h2 id="who-must-file">');
    expect(html).toContain('<h2 id="who-must-file-2">');
    expect(html).toContain('<h3>Sub</h3>');
  });

  it('renders a heading followed directly by a paragraph or list', () => {
    const { html } = formatArticle('### Online\nFile on rd.go.th\n- Faster\n- Longer deadline');
    expect(html).toBe('<h3>Online</h3>\n<p>File on rd.go.th</p>\n<ul><li>Faster</li><li>Longer deadline</li></ul>');
  });

  it('nests indented sub-bullets under their item', () => {
    const { html } = formatArticle('1. **Certificates**\n   - From employer\n   - From banks\n2. ID');
    expect(html).toBe(
      '<ol><li><strong>Certificates</strong><ul><li>From employer</li><li>From banks</li></ul></li><li>ID</li></ol>'
    );
    expect(formatArticle('- Income exceeds:\n  - 60,000 THB').html).toBe(
      '<ul><li>Income exceeds:<ul><li>60,000 THB</li></ul></li></ul>'
    );
  });

  it('renders tables with a header row and marks figure cells', () => {
    const { html } = formatArticle('| Income | Rate |\n|---|---|\n| 0 – 150,000 THB | Exempt |\n| 150,001 – 300,000 | 5% |');
    expect(html).toContain('<thead><tr><th scope="col">Income</th><th scope="col">Rate</th></tr></thead>');
    expect(html).toContain('<td class="figure">0 – 150,000 THB</td><td>Exempt</td>');
    expect(html).toContain('<td class="figure">5%</td>');
    expect(html).not.toContain('---');
  });

  it('renders links, bold and italic; external links open in a new tab', () => {
    const { html } = formatArticle('See [rd.go.th](https://www.rd.go.th/) and [the guide](/articles/x/), **bold** *and* more.');
    expect(html).toContain('<a href="https://www.rd.go.th/" target="_blank" rel="noopener noreferrer">rd.go.th</a>');
    expect(html).toContain('<a href="/articles/x/">the guide</a>');
    expect(html).toContain('<strong>bold</strong> <em>and</em> more');
  });

  it('escapes code blocks, including ones indented inside a list item', () => {
    const { html } = formatArticle('1. Folders:\n   ```\n   2024/\n   ├── <Income>/\n   ```\n2. Next');
    expect(html).toBe('<ol><li>Folders:<pre><code>2024/\n├── &lt;Income&gt;/</code></pre></li><li>Next</li></ol>');
  });

  it('formats every real article without leaving raw markdown markers', () => {
    for (const article of articles) {
      const { html, headings } = formatArticle(article.content);
      expect(headings.length, article.slug).toBeGreaterThan(0);
      expect(html, article.slug).not.toMatch(/(^|<(p|li|td|th)>)\s*(#{2,3} |- |\|)/m);
      expect(html, article.slug).not.toContain('**');
    }
  });
});

describe('splitAtMiddleHeading', () => {
  it('splits before the heading nearest the middle', () => {
    const html = '<p>a</p><h2 id="one">1</h2><p>bbbbbbbbbb</p><h2 id="two">2</h2><p>c</p>';
    const [first, second] = splitAtMiddleHeading(html);
    expect(second.startsWith('<h2 id="two">')).toBe(true);
    expect(first + second).toBe(html);
  });

  it('does not split when the only heading opens the article', () => {
    expect(splitAtMiddleHeading('<h2 id="a">A</h2><p>x</p>')).toEqual(['<h2 id="a">A</h2><p>x</p>', '']);
  });
});
