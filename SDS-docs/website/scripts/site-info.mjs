import { readdirSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = resolve(root, 'src/data/site.generated.json');
export function updateSiteInfo() {
  const files = [];
  function scan(path) {
    for (const entry of readdirSync(path, { withFileTypes: true })) {
      const file = resolve(path, entry.name);
      if (entry.isDirectory()) scan(file);
      else if (!entry.name.includes('.generated.') && !entry.name.endsWith('.md') && !entry.name.endsWith('.txt')) files.push(file);
    }
  }
  for (const dir of ['src', 'scripts', 'public']) scan(resolve(root, dir));
  for (const file of ['package.json', 'package-lock.json', 'next.config.mjs', 'jsconfig.json']) files.push(resolve(root, file));
  const updatedAt = new Date(Math.max(...files.map(file => statSync(file).mtimeMs)));
  const parts = Object.fromEntries(new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Ho_Chi_Minh', hour: '2-digit', minute: '2-digit', second: '2-digit',
    day: '2-digit', month: '2-digit', year: 'numeric', hourCycle: 'h23',
  }).formatToParts(updatedAt).map(part => [part.type, part.value]));
  const data = JSON.stringify({ version: '0.0.1', updatedAt: updatedAt.toISOString(),
    label: `${parts.hour}:${parts.minute}:${parts.second}-${parts.day}/${parts.month}/${parts.year}`,
    timeZone: 'Asia/Ho_Chi_Minh',
  }, null, 2) + '\n';
  mkdirSync(resolve(root, 'src/data'), { recursive: true });
  let current = '';
  try { current = readFileSync(output, 'utf8'); } catch {}
  if (current !== data) writeFileSync(output, data);
}
updateSiteInfo();
if (process.argv.includes('--watch')) setInterval(updateSiteInfo, 1000);
