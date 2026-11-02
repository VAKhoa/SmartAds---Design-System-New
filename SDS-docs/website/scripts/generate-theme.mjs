import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';

// This is a small website theme, not a release of the complete SDS token library.
// Preserve Figma names; no rename-map proposals are applied by this script.
export function generateTheme() {
  const root = new URL('../../', import.meta.url);
  const config = JSON.parse(readFileSync(new URL('ds.config.json', root), 'utf8'));
  const read = (file) => {
    const data = JSON.parse(readFileSync(new URL(`variable-figma-export/${file}`, root), 'utf8'));
    if (data.fileKey !== config.figma.fileKey) throw new Error(`Wrong Figma source: ${file}`);
    return data;
  };
  const colors = read('variables.alias.json');
  const spacing = read('variables.spacing.json');
  const text = read('variables.text.json');
  const styles = read('styles.json');
  const colorNames = [
    'background/neutral', 'background/secondary', 'background/primary-selected',
    'background/gray', 'text/on-primary-black-inverse', 'text/on-primary-black-weak',
    'text/primary-white', 'text/primary-green', 'text/secondary',
    'border/gray-muted', 'border/primary', 'border/primary-hover',
    'border/secondary-hover', 'text/accent-hover',
  ];
  const dimensionNames = ['spacing/xs', 'spacing/sm', 'spacing/md', 'spacing/xl', 'radius/sm', 'radius/md', 'radius/lg'];
  function variable(data, name) {
    const item = data.variables.find(v => v.name === name);
    if (!item) throw new Error(`Missing Figma variable: ${name}`);
    return item;
  }
  function declaration(data, name, mode, unit = '') {
    const item = variable(data, name);
    const value = item.resolvedValues[mode];
    if (value == null || typeof value === 'object') throw new Error(`Unresolved variable: ${name} / ${mode}`);
    const formatted = item.type === 'STRING' ? JSON.stringify(value) : `${value}${unit}`;
    return `  /* Figma ${item.id}: ${name} */\n  --${config.prefix}-${name.replaceAll('/', '-')}: ${formatted};`;
  }
  const mode = (dark) => colors.modes.find(m => m.name.includes(dark ? 'Dark' : 'Light'))?.name;
  if (!mode(false) || !mode(true)) throw new Error('Expected Light and Dark modes');
  const global = dimensionNames.map(name => declaration(spacing, name, spacing.modes[0].name, 'px'));
  global.push(declaration(text, 'typography/family/display', text.modes[0].name));
  for (const [name, property] of [
    ['Brand/Display-lg/Bold', 'heading-size'],
    ['Brand/Display-sm/Bold', 'heading-mobile-size'],
    ['Brand/Body-xl/Bold', 'section-size'],
    ['Brand/Body-md/Regular', 'lead-size'],
    ['Brand/Body-sm/Regular', 'body-size'],
    ['Brand/Body-xs/Regular', 'small-size'],
    ['Brand/Body-caption/Regular', 'caption-size'],
  ]) {
    const style = styles.text.find(s => s.name === name);
    if (!style) throw new Error(`Missing Figma text style: ${name}`);
    global.push(`  /* Figma text style ${style.id}: ${name} */\n  --${config.prefix}-docs-${property}: ${style.fontSize}px;`);
  }
  const css = `/* Generated from SmartAds Figma snapshot ${colors.readDate}. Do not edit.\n   File: ${config.figma.fileKey}. Names and values retain the source snapshot. */\n:root {\n${global.join('\n')}\n}\n` +
    [false, true].map(dark => `${dark ? ':root[data-theme="dark"]' : ':root, :root[data-theme="light"]'} {\n${colorNames.map(name => declaration(colors, name, mode(dark))).join('\n')}\n}`).join('\n') + '\n';
  const output = new URL('../src/styles/figma.generated.css', import.meta.url);
  mkdirSync(new URL('../src/styles/', import.meta.url), { recursive: true });
  writeFileSync(output, css);
}
