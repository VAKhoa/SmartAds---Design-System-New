import { updateSiteInfo } from './site-info.mjs';
import { renderToStaticMarkup } from 'react-dom/server';
import Icon from '../src/components/Icon.js';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { generateTheme } from './generate-theme.mjs';
import { navigation } from '../src/lib/navigation.js';

generateTheme();
const output = new URL('../src/data/', import.meta.url);
mkdirSync(output, { recursive: true });

const icon = (name, size = 16) => renderToStaticMarkup(Icon({ name, size }));
const clean = (text) => text.replace(/<[^>]*>/g, ' ').replace(/[`*_#]/g, '').replace(/\s+/g, ' ').trim();
const slugify = (text) => clean(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const documents = navigation.map(item => {
  const source = readFileSync(new URL(`../src/content/docs/${item.file}`, import.meta.url), 'utf8');
  const { data, content } = matter(source);
  for (const key of ['title', 'description', 'section', 'updated', 'status', 'sources']) {
    if (!data[key]) throw new Error(`Missing ${key} in ${item.file}`);
  }
  if (!['draft', 'in-review', 'beta', 'stable'].includes(data.status)) throw new Error(`Invalid status: ${item.file}`);
  const headings = [];
  const ids = new Map();
  const parser = new Marked({
    gfm: true,
    renderer: {
      heading({ tokens, depth, text }) {
        const base = slugify(text);
        const count = ids.get(base) || 0;
        ids.set(base, count + 1);
        const id = count ? `${base}-${count}` : base;
        if (depth === 2) headings.push({ id, text: clean(text) });
        return `<h${depth} id="${id}">${this.parser.parseInline(tokens)}<a class="sa-heading-anchor" href="#${id}" aria-label="Liên kết đến phần này">${icon('link', 14)}</a></h${depth}>`;
      },
      table(token) { return `<div class="sa-table-scroll" tabindex="0" role="region" aria-label="Bảng thông tin">${tableHtml(this, token)}</div>`; },
    },
  });
  // Content is authored in this repository, never supplied by visitors.
  const html = parser.parse(content)
    .replace(/<span data-icon="([a-z-]+)" aria-hidden="true"><\/span>/g, (_, name) => '<span aria-hidden="true">' + icon(name) + '</span>')
    .replace(/(<a class="sa-entry"[^>]*>)/g, '$1' + renderToStaticMarkup(Icon({ name: 'arrow', size: 16, className: 'sa-entry-icon' })));

  return { ...item, ...data, html, headings, markdown: `# ${data.title}\n\n${content}`, searchText: clean(content) };
});

function tableHtml(renderer, token) {
  const row = (cells, tag) => '<tr>' + cells.map(cell => `<${tag}>${renderer.parser.parseInline(cell.tokens)}</${tag}>`).join('') + '</tr>';
  return `<table><thead>${row(token.header, 'th')}</thead><tbody>${token.rows.map(cells => row(cells, 'td')).join('')}</tbody></table>`;
}

writeFileSync(new URL('docs.generated.json', output), JSON.stringify(documents, null, 2) + '\n');
console.log(`Prepared ${documents.length} Introduction pages and the Figma theme.`);


updateSiteInfo();
