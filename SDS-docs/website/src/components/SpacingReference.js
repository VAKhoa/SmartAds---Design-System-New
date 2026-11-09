import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import documents from '../data/docs.generated.json';
import DocsShell from './DocsShell';
import SpacingExplorer from './SpacingExplorer';
import '../styles/spacing-reference.css';

const scale = [
  ['0', 0, 'spacing/none', 'Không tạo khoảng cách · đề xuất'],
  ['05', 2, 'spacing/xxs', 'Micro spacing · đề xuất'],
  ['1', 4, 'spacing/xs', 'Icon và text · đề xuất'],
  ['15', 6, 'spacing/xs-plus', 'Micro spacing · đề xuất'],
  ['2', 8, 'spacing/sm', 'Table cell: padding dọc, content gap'],
  ['3', 12, 'spacing/md', 'Table cell: padding ngang'],
  ['4', 16, 'spacing/lg (Base)', 'Card inset · đề xuất'],
  ['5', 20, 'spacing/xl', 'Component inset · đề xuất'],
  ['6', 24, 'spacing/2xl', 'Card inset · đề xuất'],
  ['8', 32, 'spacing/3xl', 'Grid gap · đề xuất'],
  ['10', 40, 'spacing/4xl', 'Section gap · đề xuất'],
  ['12', 48, 'spacing/5xl', 'Section gap · đề xuất'],
  ['16', 64, 'spacing/7xl', 'Section gap · đề xuất'],
];

const headings = [
  ['overview', 'Tổng quan'],
  ['rule', 'Hiển thị px và rem'],
  ['scale', 'Spacing scale'],
  ['exceptions', 'Giá trị ngoài bảng'],
  ['application', 'Ứng dụng trực quan'],
  ['implementation', 'Developer implementation'],
  ['source', 'Nguồn và giới hạn'],
].map(([id, text]) => ({ id, text, level: 2 }));

export default async function SpacingReference() {
  const original = documents.find(item => item.id === 'foundation/spacing');
  if (!original) throw new Error('Missing foundation/spacing Markdown source');

  const snapshot = JSON.parse(await readFile(join(process.cwd(), '..', 'variable-figma-export', 'variables.spacing.json'), 'utf8'));
  const byName = new Map(snapshot.variables.filter(variable => variable.name.startsWith('spacing/')).map(variable => [variable.name, variable]));
  const rows = scale.map(([key, px, figmaName, usage]) => {
    const source = byName.get(figmaName);
    if (!source || source.resolvedValues.sm !== px) throw new Error(`Spacing snapshot mismatch: ${figmaName}`);
    return { key, px, multiplier: `${px / 4}x`, token: `--sa-space-${key}`, figmaName, figmaId: source.id, usage };
  });
  const included = new Set(scale.map(([, , name]) => name));
  const exceptions = [...byName.values()]
    .filter(variable => !included.has(variable.name))
    .sort((a, b) => a.resolvedValues.sm - b.resolvedValues.sm)
    .map(variable => ({ name: variable.name, px: variable.resolvedValues.sm, id: variable.id }));
  const document = { ...original, headings };
  const searchIndex = documents.map(({ id, title, href, description, searchText, icon }) => ({ id, title, href, description, searchText, icon }));

  return <DocsShell document={document} searchIndex={searchIndex}>
    <SpacingExplorer rows={rows} exceptions={exceptions} readDate={snapshot.readDate} sourceHref={document.sourceHref} />
  </DocsShell>;
}
