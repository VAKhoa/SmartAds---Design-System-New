import { test, expect } from '@playwright/test';
import { readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import sharp from 'sharp';

const library = resolve('public/brand/logo-library');
const manifest = JSON.parse(await readFile(resolve(library, 'manifest.json'), 'utf8'));

test('all logo downloads preserve intrinsic vector ratio and 4x PNG size', async () => {
  expect(manifest.assets).toHaveLength(177);
  const referenced = new Set();
  for (const asset of manifest.assets) {
    const svgPath = resolve('public' + asset.svg);
    const pngPath = resolve('public' + asset.png);
    const svg = await readFile(svgPath, 'utf8');
    const root = svg.match(/^<svg\b[^>]*>/)?.[0] || '';
    const width = Number(root.match(/\bwidth="([\d.]+)"/)?.[1]);
    const height = Number(root.match(/\bheight="([\d.]+)"/)?.[1]);
    const viewBox = root.match(/\bviewBox="([^"]+)"/)?.[1].split(/\s+/).map(Number);
    expect(width > 0 && height > 0, asset.svg).toBe(true);
    expect(viewBox?.length, asset.svg).toBe(4);
    expect(Math.abs(width / height - viewBox[2] / viewBox[3]), asset.svg).toBeLessThan(1e-9);
    expect(asset.intrinsicSize, asset.svg).toEqual({ width, height });
    expect(['Light', 'Dark', 'Both', 'Review'], asset.svg).toContain(asset.backgroundSuitability);
    expect(['light', 'dark'], asset.svg).toContain(asset.recommendedBackground);
    expect(asset.contrastReview, asset.svg).toBe(asset.backgroundSuitability === 'Review');
    const png = await sharp(pngPath).metadata();
    expect(png.format, asset.png).toBe('png');
    expect(png.hasAlpha, asset.png).toBe(true);
    expect(Math.abs(png.width - width * 4), asset.png).toBeLessThanOrEqual(1);
    expect(Math.abs(png.height - height * 4), asset.png).toBeLessThanOrEqual(1);
    referenced.add(asset.svg.split('/').pop());
    referenced.add(asset.png.split('/').pop());
  }
  const onDisk = (await readdir(library)).filter(name => /\.(svg|png)$/.test(name) && !name.startsWith('smartads-full-light.'));
  expect(onDisk.length).toBe(referenced.size);
  expect(manifest.assets.slice(33, 36).map(asset => asset.sourceNodeId)).toEqual(['11112:362370', '11112:362369', '11112:362368']);
});

test('vnEgo names, contrast tags and downloads work across layouts', async ({ page }) => {
  await page.goto('/foundation/logo/');
  await expect(page.locator('h1')).toHaveText('Logo');
  await expect(page.locator('.sa-ai-file-card')).toHaveAttribute('href', '/source/docs/foundation/logo.md');
  await page.locator('#sa-logo-search').fill('vnEgo');
  const cards = page.locator('.sa-logo-asset-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.locator('h3')).toHaveText(['vnEgo · Brand', 'vnEgo · Gray', 'vnEgo · White']);
  await expect(cards.locator('.sa-logo-background-tags')).toHaveText(['Light', 'Dark', 'Dark']);
  await expect(cards.first().locator('img')).toHaveCSS('width', '140px');
  await expect(cards.first().locator('img')).toHaveCSS('height', '48px');
  await expect(cards.nth(0).locator('.sa-logo-asset-preview')).toHaveClass(/sa-logo-asset-preview-light/);
  await expect(cards.nth(1).locator('.sa-logo-asset-preview')).toHaveClass(/sa-logo-asset-preview-dark/);
  const downloadPromise = page.waitForEvent('download');
  await cards.first().getByRole('link', { name: /Tải SVG: publisher-vnego-brand\.svg/ }).click();
  expect((await downloadPromise).suggestedFilename()).toBe('publisher-vnego-brand.svg');
  for (const width of [1920, 1440, 1280, 960, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow at ${width}px`).toBe(true);
  }
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(cards.nth(2).locator('.sa-logo-asset-preview')).toHaveClass(/sa-logo-asset-preview-dark/);
  await page.locator('#sa-logo-search').fill('Publisher=logo-ngoisao, Color=Brand');
  await expect(cards).toHaveCount(1);
  await expect(cards.first().locator('.sa-logo-background-tags')).toContainText('Cần rà soát');
});
