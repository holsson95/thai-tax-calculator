/**
 * Renders the small markdown dialect used in src/data/articles.ts to HTML.
 *
 * Supported: ## / ### headings, paragraphs, - bullet lists (with indented
 * sub-bullets), 1. numbered lists (with indented sub-bullets and indented
 * ``` code blocks), | tables |, ``` code blocks, [links](url), **bold** and
 * *italic*. Output carries no styling classes: the .article-body stylesheet in
 * index.css styles it, so every reading page can share one look.
 *
 * Content is authored in this repo (not user input), so inline text is not
 * escaped, matching the previous formatter. Code blocks are escaped.
 */

export interface ArticleHeading {
  id: string;
  text: string;
}

export interface FormattedArticle {
  html: string;
  /** The ## headings, in order, with the ids their <h2> elements carry. */
  headings: ArticleHeading[];
}

const escapeHtml = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function inline(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, label: string, href: string) =>
      /^https?:\/\//.test(href)
        ? `<a href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`
        : `<a href="${href}">${label}</a>`
    )
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*?)\*(?!\*)/g, '$1<em>$2</em>');
}

const plainText = (text: string) =>
  text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\*+/g, '')
    .trim();

function slugify(text: string): string {
  return (
    plainText(text)
      .toLowerCase()
      .replace(/&/g, ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '') || 'section'
  );
}

/** A table cell that is only a figure (amounts, rates, ranges) is set in the mono face. */
function isFigure(cell: string): boolean {
  const text = plainText(cell).replace(/\b(THB|baht)\b/gi, '');
  return /\d/.test(text) && /^[\d\s,.%+\-–−()฿×x/~≈]+$/.test(text);
}

const splitRow = (line: string) =>
  line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((c) => c.trim());

function renderTable(lines: string[]): string {
  const rows = lines.map(splitRow).filter((cells) => !cells.every((c) => /^:?-+:?$/.test(c)));
  if (rows.length === 0) return '';
  const [head, ...body] = rows;
  const th = head.map((c) => `<th scope="col">${inline(c)}</th>`).join('');
  const tr = body
    .map((cells) => `<tr>${cells.map((c) => `<td${isFigure(c) ? ' class="figure"' : ''}>${inline(c)}</td>`).join('')}</tr>`)
    .join('');
  return `<div class="table-scroll"><table><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
}

const isFence = (line: string) => /^\s*```/.test(line);
const isOl = (line: string) => /^\d+\. /.test(line);
const isUl = (line: string) => /^- /.test(line);
const isSub = (line: string) => /^\s+- /.test(line);

export function formatArticle(content: string): FormattedArticle {
  const lines = content.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  const headings: ArticleHeading[] = [];
  const usedIds = new Map<string, number>();
  let paragraph: string[] = [];

  const flush = () => {
    if (paragraph.length) out.push(`<p>${inline(paragraph.join(' '))}</p>`);
    paragraph = [];
  };

  const readFence = (start: number): [string, number] => {
    const indent = lines[start].match(/^\s*/)![0].length;
    const body: string[] = [];
    let i = start + 1;
    while (i < lines.length && !isFence(lines[i])) {
      body.push(lines[i].slice(Math.min(indent, lines[i].match(/^\s*/)![0].length)));
      i++;
    }
    return [`<pre><code>${escapeHtml(body.join('\n'))}</code></pre>`, i + 1];
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.trim() === '') {
      flush();
      i++;
    } else if (isFence(line)) {
      flush();
      const [html, next] = readFence(i);
      out.push(html);
      i = next;
    } else if (/^\|/.test(line)) {
      flush();
      const block: string[] = [];
      while (i < lines.length && /^\|/.test(lines[i])) block.push(lines[i++]);
      out.push(renderTable(block));
    } else if (/^### /.test(line)) {
      flush();
      out.push(`<h3>${inline(line.slice(4))}</h3>`);
      i++;
    } else if (/^## /.test(line)) {
      flush();
      const text = line.slice(3);
      const base = slugify(text);
      const n = usedIds.get(base) ?? 0;
      usedIds.set(base, n + 1);
      const id = n === 0 ? base : `${base}-${n + 1}`;
      headings.push({ id, text: plainText(text) });
      out.push(`<h2 id="${id}">${inline(text)}</h2>`);
      i++;
    } else if (isOl(line) || isUl(line)) {
      flush();
      const ordered = isOl(line);
      const isItem = ordered ? isOl : isUl;
      const items: string[] = [];
      while (i < lines.length && (isItem(lines[i]) || isSub(lines[i]) || (ordered && isFence(lines[i])))) {
        if (isItem(lines[i])) {
          items.push(`<li>${inline(lines[i].replace(/^(\d+\.|-) /, ''))}`);
          i++;
        } else if (isSub(lines[i])) {
          const subs: string[] = [];
          while (i < lines.length && isSub(lines[i])) subs.push(`<li>${inline(lines[i++].replace(/^\s+- /, ''))}</li>`);
          items[items.length - 1] += `<ul>${subs.join('')}</ul>`;
        } else {
          const [html, next] = readFence(i);
          items[items.length - 1] += html;
          i = next;
        }
      }
      const tag = ordered ? 'ol' : 'ul';
      out.push(`<${tag}>${items.map((item) => `${item}</li>`).join('')}</${tag}>`);
    } else {
      paragraph.push(line.trim());
      i++;
    }
  }
  flush();

  return { html: out.join('\n'), headings };
}

/**
 * Splits rendered article HTML in two at the <h2> nearest the middle, so a
 * mid-article ad sits before a section heading instead of inside a section.
 * Returns [html, ''] when there is no heading after the first block.
 */
export function splitAtMiddleHeading(html: string): [string, string] {
  const positions: number[] = [];
  const re = /<h2 /g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) if (m.index > 0) positions.push(m.index);
  if (positions.length === 0) return [html, ''];
  const middle = html.length / 2;
  const at = positions.reduce((best, p) => (Math.abs(p - middle) < Math.abs(best - middle) ? p : best));
  return [html.slice(0, at), html.slice(at)];
}
