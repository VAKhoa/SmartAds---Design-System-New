import { chromium } from 'playwright';
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { analyzeLogoContrast } from './analyze-logo-contrast.mjs';

// Read-only export of SmartAds Design System node 123:153, received from Figma Local.
// This script derives a standalone SVG and transparent PNG for each named variant.
// It does not change Figma. Re-export node 123:153 before running:
// node scripts/extract-logo-library.mjs path/to/root-export.svg
if (!process.argv[2]) throw new Error('Pass the SVG export of Figma node 123:153 as the first argument.');
const sourcePath = resolve(process.argv[2]);
const outputDir = resolve('public/brand/logo-library');
// The current Figma board names vnEGO explicitly; older exports said Default.
// Exact inner vectors and variant properties were verified at publisher set 2391:619.
const vnEgoVariants = [
  { old: 'Publisher=Default', current: 'Publisher=logo-vnEgo, Color=Brand', file: 'vnego-brand.svg', nodeId: '11112:362370', label: 'vnEgo · Brand', formatName: 'publisher-vnego-brand' },
  { old: 'Publisher=Default_2', current: 'Publisher=logo-vnEgo, Color=Gray', file: 'vnego-gray.svg', nodeId: '11112:362369', label: 'vnEgo · Gray', formatName: 'publisher-vnego-gray' },
  { old: 'Publisher=Default_3', current: 'Publisher=logo-vnEgo, Color=White', file: 'vnego-white.svg', nodeId: '11112:362368', label: 'vnEgo · White', formatName: 'publisher-vnego-white' },
];
const directVectorOverrides = new Map(vnEgoVariants.flatMap(item => [item.old, item.current].map(name => [
  `logo-publisher_2/${name}`,
  { ...item, frame: { width: 140, height: 48 } },
])));
function intrinsicSize(svg) {
  const root = svg.match(/^<svg\b[^>]*>/)?.[0] || '';
  const width = Number(root.match(/\bwidth="([\d.]+)"/)?.[1]);
  const height = Number(root.match(/\bheight="([\d.]+)"/)?.[1]);
  if (!(width > 0 && height > 0)) throw new Error('SVG is missing positive intrinsic dimensions');
  return { width, height };
}
const parentGroups = [
  { category: 'SmartAds & FPT', groupId: 'logo-fpt_2' },
  { category: 'SmartAds & FPT', groupId: 'logo-smartads_3' },
  { category: 'Publisher', groupId: 'logo-publisher_2' },
  { category: 'Partnership', groupId: 'logo-partnership_2' },
  { category: 'Third Party', groupId: 'logo-thirdParty_2' },
  { category: 'Third Party / Social', groupId: 'logo-social_2' },
  { category: 'Third Party / AI', groupId: 'app-ai-icon-variations_2' },
  { category: 'Third Party / Contact', groupId: 'logo-cta-contact-gradient_2' },
];

const source = await readFile(sourcePath);
if (!source.toString('utf8', 0, 1500).includes('Logo SmartAds')) {
  throw new Error('Unexpected SVG source; expected node 123:153 export.');
}
await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
let manifest = [];
try {
  const page = await browser.newPage({ viewport: { width: 4096, height: 900 } });
  await page.goto(pathToFileURL(sourcePath).href);
  const variants = await page.evaluate(groups => groups.flatMap(({ category, groupId }) => {
    const parent = document.getElementById(groupId);
    if (!parent) throw new Error(`Missing export group ${groupId}`);
    return Array.from(parent.children)
      .filter(child => child.localName === 'g')
      .map((child, index) => ({ category, parentGroupId: groupId, sourceGroupId: child.id, index }));
  }), parentGroups);
  console.log(`Found ${variants.length} named logo variants.`);

  for (let index = 0; index < variants.length; index++) {
    const variant = variants[index];
    const result = await page.evaluate(groupId => {
      const sourceSvg = document.querySelector('svg');
      const target = document.getElementById(groupId);
      if (!target) throw new Error(`Missing group ${groupId}`);
      const b = target.getBBox();
      const ctm = target.getCTM();
      if (!b.width || !b.height || !Number.isFinite(b.width) || !Number.isFinite(b.height)) {
        throw new Error(`Invalid bounds for ${groupId}`);
      }
      if (Math.abs(ctm.a - 1) > 0.0001 || Math.abs(ctm.d - 1) > 0.0001 ||
          Math.abs(ctm.b) > 0.0001 || Math.abs(ctm.c) > 0.0001 ||
          Math.abs(ctm.e) > 0.0001 || Math.abs(ctm.f) > 0.0001) {
        throw new Error(`Transformed group requires manual review: ${groupId}`);
      }

      const ns = 'http://www.w3.org/2000/svg';
      const out = document.createElementNS(ns, 'svg');
      out.setAttribute('xmlns', ns);
      out.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
      // The intrinsic dimensions must have the SAME ratio as viewBox. Independent
      // ceil() rounding made 77 of 177 logos smaller inside their download frame.
      out.setAttribute('width', String(b.width + 1));
      out.setAttribute('height', String(b.height + 1));
      out.setAttribute('viewBox', `${b.x - 0.5} ${b.y - 0.5} ${b.width + 1} ${b.height + 1}`);
      out.setAttribute('preserveAspectRatio', 'xMidYMid meet');
      out.setAttribute('fill', 'none');
      const defs = document.createElementNS(ns, 'defs');
      out.appendChild(defs);
      const clone = target.cloneNode(true);
      out.appendChild(clone);

      // Figma exports a shared defs block; copy only dependencies referenced by this variant.
      // A copied definition can itself reference a gradient, mask, pattern or clip path.
      const seen = new Set();
      let pending = [clone.outerHTML];
      while (pending.length) {
        const markup = pending.pop();
        const refs = [
          ...Array.from(markup.matchAll(/url\(#([^\)]+)\)/g), match => match[1]),
          ...Array.from(markup.matchAll(/(?:href|xlink:href)="#([^"]+)"/g), match => match[1]),
        ];
        for (const ref of refs) {
          if (seen.has(ref)) continue;
          seen.add(ref);
          const original = sourceSvg.querySelector(`[id="${CSS.escape(ref)}"]`);
          if (!original || target.contains(original)) continue;
          const definition = original.cloneNode(true);
          defs.appendChild(definition);
          pending.push(definition.outerHTML);
        }
      }
      const svg = new XMLSerializer().serializeToString(out);
      return {
        svg,
        x: b.x,
        y: b.y,
        width: b.width,
        height: b.height,
        containsEmbeddedPng: /data:image\/png;base64,/i.test(svg),
        definitionCount: defs.children.length,
      };
    }, variant.sourceGroupId);

    const slug = variant.sourceGroupId.toLowerCase()
      .replaceAll('&', ' and ')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80);
    const stem = `${String(index + 1).padStart(3, '0')}-${slug}`;
    const svgFile = `${stem}.svg`;
    const pngFile = `${stem}.png`;
    const override = directVectorOverrides.get(`${variant.parentGroupId}/${variant.sourceGroupId}`);
    const rawSvg = override
      ? await readFile(resolve('scripts/logo-source', override.file), 'utf8')
      : result.svg;
    // Figma's inner-asset SVGs use preserveAspectRatio="none". Keep their paths
    // untouched, but make the downloadable SVG safe when a consumer scales it.
    const svgText = override
      ? rawSvg.replace(/preserveAspectRatio="none"/, 'preserveAspectRatio="xMidYMid meet"')
      : rawSvg;
    const svgBuffer = Buffer.from(svgText);
    await writeFile(join(outputDir, svgFile), svgBuffer);
    const pngBuffer = await sharp(svgBuffer, { density: 288 }).png().toBuffer();
    await writeFile(join(outputDir, pngFile), pngBuffer);
    const contrast = await analyzeLogoContrast(pngBuffer);
    manifest.push({
      category: variant.category,
      parentGroupId: variant.parentGroupId,
      sourceGroupId: variant.sourceGroupId,
      variantLabel: override?.label || variant.sourceGroupId,
      ...(override ? { downloadName: override.formatName, sourceFrameSize: override.frame } : {}),
      sourceFileKey: 'cRZ5kIi4kD6j9lh1dbh5mh',
      sourceNodeId: override?.nodeId || '123:153',
      svg: `/brand/logo-library/${svgFile}`,
      png: `/brand/logo-library/${pngFile}`,
      pngKind: override ? 'rendered-from-direct-figma-vector' : 'rendered-from-figma-svg',
      intrinsicSize: intrinsicSize(svgText),
      backgroundSuitability: contrast.suitability,
      recommendedBackground: contrast.recommendedBackground,
      contrastReview: contrast.needsReview,
      contrastPassRate: {
        light: Number(contrast.lightPassRate.toFixed(4)),
        dark: Number(contrast.darkPassRate.toFixed(4)),
      },
      containsOriginalPng: result.containsEmbeddedPng,
      exportBounds: {
        x: Number(result.x.toFixed(3)), y: Number(result.y.toFixed(3)),
        width: Number(result.width.toFixed(3)), height: Number(result.height.toFixed(3)),
      },
      definitionCount: result.definitionCount,
      svgBytes: svgBuffer.length,
      pngBytes: pngBuffer.length,
    });
    if ((index + 1) % 20 === 0) console.log(`Exported ${index + 1}/${variants.length}`);
  }
  await writeFile(join(outputDir, 'manifest.json'), JSON.stringify({
    source: { fileKey: 'cRZ5kIi4kD6j9lh1dbh5mh', nodeId: '123:153', method: 'Figma Local SVG export, group-isolated with referenced defs only' },
    note: 'PNG downloads are transparent 4x renders of each Figma SVG; they are not separate original PNG files. Background suitability is a preview-legibility heuristic, not a Figma usage rule.',
    assets: manifest,
  }, null, 2) + '\n');
  console.log(`Wrote ${manifest.length} assets, SVG+PNG, to ${outputDir}`);
} finally {
  await browser.close();
}
