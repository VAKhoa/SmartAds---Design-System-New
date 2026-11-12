import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, sep } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// Read-only visual audit for logo-library PNGs. No asset or manifest is modified.
// Run from anywhere: node scripts/analyze-logo-contrast.mjs [manifest.json] > logo-contrast.json
const websiteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const publicRoot = resolve(websiteRoot, 'public');
const defaultManifest = resolve(publicRoot, 'brand/logo-library/manifest.json');
const usage = 'Usage: node scripts/analyze-logo-contrast.mjs [manifest.json] > logo-contrast.json';

const backgrounds = [
  { name: 'light', color: '#ffffff', rgb: [255, 255, 255] },
  { name: 'dark', color: '#1f1f22', rgb: [31, 31, 34] },
];
const alphaCutoff = 0.7;
const contrastCutoff = 3;
const passingPercentCutoff = 70;

function linear(value) {
  const channel = value / 255;
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

function luminance(rgb) {
  return 0.2126 * linear(rgb[0]) + 0.7152 * linear(rgb[1]) + 0.0722 * linear(rgb[2]);
}

function contrast(first, second) {
  const high = Math.max(first, second);
  const low = Math.min(first, second);
  return (high + 0.05) / (low + 0.05);
}

function pngPath(publicUrl) {
  if (typeof publicUrl !== 'string' || !publicUrl.startsWith('/')) throw new Error(`Invalid PNG URL: ${publicUrl}`);
  const path = resolve(publicRoot, `.${publicUrl}`);
  if (!path.startsWith(publicRoot + sep)) throw new Error(`PNG escapes public directory: ${publicUrl}`);
  return path;
}

function classify(lightPercent, darkPercent) {
  const lightPass = lightPercent >= passingPercentCutoff;
  const darkPass = darkPercent >= passingPercentCutoff;
  if (lightPass && darkPass) return 'Both';
  if (lightPass) return 'Light';
  if (darkPass) return 'Dark';
  return 'Review';
}

function roundPercent(passing, total) {
  return Math.round((passing / total) * 10000) / 100;
}

export async function analyzeLogoContrast(pngBuffer) {
  if (!Buffer.isBuffer(pngBuffer)) throw new TypeError('analyzeLogoContrast expects a PNG Buffer.');
  const { data, info } = await sharp(pngBuffer).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const passing = [0, 0];
  let opaquePixels = 0;
  for (let offset = 0; offset < data.length; offset += info.channels) {
    const alpha = data[offset + 3] / 255;
    if (alpha < alphaCutoff) continue;
    opaquePixels++;
    for (let index = 0; index < backgrounds.length; index++) {
      const background = backgrounds[index];
      const blended = background.rgb.map((value, channel) => data[offset + channel] * alpha + value * (1 - alpha));
      if (contrast(luminance(blended), luminance(background.rgb)) >= contrastCutoff) passing[index]++;
    }
  }
  if (opaquePixels === 0) throw new Error('PNG has no opaque logo pixels.');
  const lightPercent = (passing[0] / opaquePixels) * 100;
  const darkPercent = (passing[1] / opaquePixels) * 100;
  const suitability = classify(lightPercent, darkPercent);
  return {
    opaquePixels,
    lightPassingPixels: passing[0],
    darkPassingPixels: passing[1],
    lightPassRate: passing[0] / opaquePixels,
    darkPassRate: passing[1] / opaquePixels,
    suitability,
    recommendedBackground: lightPercent >= darkPercent ? 'light' : 'dark',
    needsReview: suitability === 'Review',
  };
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(usage);
  } else {
    const manifestPath = resolve(process.argv[2] || defaultManifest);
    const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
    if (!Array.isArray(manifest.assets)) throw new Error('Manifest must contain an assets array.');
    const results = [];
    for (const asset of manifest.assets) {
      const pngBuffer = await readFile(pngPath(asset.png));
      const result = await analyzeLogoContrast(pngBuffer);
      results.push({
        category: asset.category,
        sourceGroupId: asset.sourceGroupId,
        svg: asset.svg,
        png: asset.png,
        opaquePixels: result.opaquePixels,
        light: { background: backgrounds[0].color, passingPixels: result.lightPassingPixels, passingPercent: roundPercent(result.lightPassingPixels, result.opaquePixels) },
        dark: { background: backgrounds[1].color, passingPixels: result.darkPassingPixels, passingPercent: roundPercent(result.darkPassingPixels, result.opaquePixels) },
        classification: result.suitability,
        suggestedPreviewBackground: result.recommendedBackground,
        needsReview: result.needsReview,
      });
    }
    const summary = Object.fromEntries(['Light', 'Dark', 'Both', 'Review'].map(name => [name, results.filter(asset => asset.classification === name).length]));
    console.log(JSON.stringify({
      source: { manifest: manifestPath, figma: manifest.source || null },
      method: {
        alphaCutoff,
        contrastCutoff,
        passingPercentCutoff,
        backgrounds: Object.fromEntries(backgrounds.map(background => [background.name, background.color])),
        note: 'WCAG luminance contrast is a preview-legibility heuristic for logo pixels, not a Figma usage rule or accessibility certification.',
      },
      summary: { total: results.length, ...summary },
      assets: results,
    }, null, 2));
  }
}
