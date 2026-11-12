import { updateSiteInfo } from './site-info.mjs';
import { renderToStaticMarkup } from 'react-dom/server';
import Icon from '../src/components/Icon.js';
import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import matter from 'gray-matter';
import { Marked } from 'marked';
import { generateTheme } from './generate-theme.mjs';
import { navigation, plannedNavigation } from '../src/lib/navigation.js';
import { aiSourceFiles } from '../src/data/ai-source-files.js';
import { figmaResourcePage } from '../src/lib/figma-resources.js';
import { dirname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

generateTheme();
const output = new URL('../src/data/', import.meta.url);
mkdirSync(output, { recursive: true });
const colorPrimitives = JSON.parse(readFileSync(new URL('../../variable-figma-export/variables.primitives.json', import.meta.url), 'utf8'));
const colorAliases = JSON.parse(readFileSync(new URL('../../variable-figma-export/variables.alias.json', import.meta.url), 'utf8'));
const colorCatalog = {
  primitives: colorPrimitives.variables.filter(item => item.type === 'COLOR').map(({ id, name, resolvedValues }) => ({ id, name, resolvedValues })),
  aliases: colorAliases.variables.filter(item => item.type === 'COLOR').map(({ id, name, resolvedValues }) => ({ id, name, resolvedValues })),
};
writeFileSync(new URL('color.generated.json', output), JSON.stringify(colorCatalog) + '\n');
const publicDirectory = resolve(fileURLToPath(new URL('../public/', import.meta.url)));
const sourceDirectory = resolve(publicDirectory, 'source');
if (!sourceDirectory.startsWith(publicDirectory + sep)) throw new Error('Unsafe generated source directory');
rmSync(sourceDirectory, { recursive: true, force: true });

const icon = (name, size = 16) => renderToStaticMarkup(Icon({ name, size }));
const clean = (text) => text.replace(/<[^>]*>/g, ' ').replace(/[`*_#]/g, '').replace(/\s+/g, ' ').trim();
const slugify = (text) => clean(text).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const plannedItems = plannedNavigation.flatMap(group => group.items).filter(item =>
  existsSync(new URL(`../../content/pages/${item.file}`, import.meta.url))
);
const documents = [...navigation, ...plannedItems, figmaResourcePage].map(item => {
  const source = readFileSync(new URL(`../../content/pages/${item.file}`, import.meta.url), 'utf8');
  const { data, content } = matter(source);
  for (const key of ['title', 'description', 'section', 'updated', 'status', 'sources']) {
    if (!data[key]) throw new Error(`Missing ${key} in ${item.file}`);
  }
  if (item.section && data.section !== item.section) throw new Error(`Expected section ${item.section} in ${item.file}`);
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

  const sourceHref = `/source/docs/${item.file}`;
  const sourceTarget = new URL(`../public${sourceHref}`, import.meta.url);
  mkdirSync(dirname(fileURLToPath(sourceTarget)), { recursive: true });
  writeFileSync(sourceTarget, source);
  return { ...item, ...data, sourceHref, html, headings, markdown: `# ${data.title}\n\n${content}`, searchText: clean(content) };
});

for (const file of aiSourceFiles) {
  const source = readFileSync(new URL(`../../../${file.path}`, import.meta.url), 'utf8');
  const target = new URL(`../public${file.href}`, import.meta.url);
  mkdirSync(dirname(fileURLToPath(target)), { recursive: true });
  writeFileSync(target, source);
}

function tableHtml(renderer, token) {
  const row = (cells, tag) => '<tr>' + cells.map(cell => `<${tag}>${renderer.parser.parseInline(cell.tokens)}</${tag}>`).join('') + '</tr>';
  return `<table><thead>${row(token.header, 'th')}</thead><tbody>${token.rows.map(cells => row(cells, 'td')).join('')}</tbody></table>`;
}

writeFileSync(new URL('docs.generated.json', output), JSON.stringify(documents, null, 2) + '\n');
console.log(`Prepared ${documents.length} documentation pages and the Figma theme.`);


updateSiteInfo();
