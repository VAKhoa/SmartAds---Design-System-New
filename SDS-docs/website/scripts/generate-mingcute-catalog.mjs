import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, unlinkSync } from 'node:fs';
import { basename, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const website = fileURLToPath(new URL('../', import.meta.url));
const packageRoot = join(website, 'node_modules', '@mingcute', 'svg');
const publicRoot = join(website, 'public', 'mingcute');
const dataRoot = join(website, 'src', 'data');
const packageInfo = JSON.parse(readFileSync(join(packageRoot, 'package.json'), 'utf8'));
const styles = ['core-regular', 'core-filled'];
const lists = Object.fromEntries(styles.map(style => [style, JSON.parse(readFileSync(join(packageRoot, style, 'metadata.json'), 'utf8'))]));
const regular = lists['core-regular'];
const filledByFile = new Map(lists['core-filled'].map(item => [item.file, item]));
if (regular.length !== filledByFile.size) throw new Error('MingCute style counts differ');

const icons = regular.map(item => {
  const filled = filledByFile.get(item.file);
  if (!filled || filled.category !== item.category || !/^[a-z0-9-]+\.svg$/.test(item.file)) {
    throw new Error(`MingCute styles do not match: ${item.file}`);
  }
  return { slug: basename(item.file, '.svg'), name: item.name, category: item.category };
});
if (new Set(icons.map(item => item.slug)).size !== icons.length) throw new Error('Duplicate MingCute icon slug');

mkdirSync(dataRoot, { recursive: true });
mkdirSync(publicRoot, { recursive: true });
const stampPath = join(publicRoot, '.source-version');
const stamp = `${packageInfo.version}:${icons.length}:${styles.length}`;
const assetsReady = existsSync(stampPath) && readFileSync(stampPath, 'utf8') === stamp && styles.every(style => {
  const folder = join(publicRoot, style);
  return existsSync(folder) && readdirSync(folder).filter(name => name.endsWith('.svg')).length === icons.length;
});
if (!assetsReady) {
  for (const style of styles) {
    const destination = join(publicRoot, style);
    mkdirSync(destination, { recursive: true });
    const expected = new Set();
    for (const icon of icons) {
      const filename = `${icon.slug}.svg`;
      expected.add(filename);
      copyFileSync(join(packageRoot, style, filename), join(destination, filename));
    }
    for (const filename of readdirSync(destination)) {
      if (filename.endsWith('.svg') && !expected.has(filename)) unlinkSync(join(destination, filename));
    }
  }
  copyFileSync(join(packageRoot, 'LICENSE'), join(publicRoot, 'LICENSE.txt'));
  writeFileSync(stampPath, stamp);
}
const catalog = {
  source: '@mingcute/svg',
  version: packageInfo.version,
  license: packageInfo.license,
  styles,
  categories: [...new Set(icons.map(item => item.category))].sort(),
  icons,
};
writeFileSync(join(dataRoot, 'mingcute.generated.json'), `${JSON.stringify(catalog)}\n`);
console.log(`Prepared MingCute ${packageInfo.version}: ${icons.length} names × ${styles.length} styles.`);
