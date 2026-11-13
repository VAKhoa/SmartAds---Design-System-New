import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const catalog = JSON.parse(await readFile(resolve('src/data/mingcute.generated.json'), 'utf8'));

test('Icons page offers the public MingCute catalog and working asset actions', async ({ page, request }) => {
  expect(catalog.version).toBe('3.1.0');
  expect(catalog.icons).toHaveLength(2263);
  expect(catalog.categories).toHaveLength(26);
  await page.goto('/foundation/icons/');
  await expect(page.locator('h1')).toHaveText('Icons');
  await expect(page.locator('.sa-ai-file-card')).toHaveAttribute('href', '/source/docs/foundation/icons.md');
  await expect(page.getByRole('link', { name: 'Icons', exact: true }).first()).toHaveAttribute('href', '/foundation/icons/');
  await expect(page.getByRole('region', { name: 'Danh mục icon MingCute' })).toContainText('4.526');
  const connection = page.getByRole('figure', { name: 'Ba bước kết nối MingCute với SmartAds' });
  await expect(connection.locator('ol > li')).toHaveCount(3);
  await expect(connection).toContainText('GitHub chính thức');
  await expect(connection).toContainText('@mingcute/svg@3.1.0');
  await expect(connection).toContainText('home-1.svg');
  const github = connection.getByRole('link', { name: /GitHub MingCute/ });
  await expect(github).toHaveAttribute('href', 'https://github.com/mingcute-design/mingcute-icons');
  await expect(github).toHaveAttribute('target', '_blank');
  expect(await page.evaluate(() => {
    const source = getComputedStyle(document.querySelector('.sa-header-github'));
    const guide = getComputedStyle(document.querySelector('.sa-icon-github-link'));
    return source.backgroundColor === guide.backgroundColor && source.color === guide.color && source.height === guide.height;
  })).toBe(true);
  await expect(page.locator('#main-content')).toContainText('npm install @mingcute/svg@3.1.0');

  const search = page.getByRole('searchbox', { name: 'Tìm icon' });
  await search.fill('home-1');
  await expect(page.locator('.sa-icon-card')).toHaveCount(1);
  await expect(page.locator('.sa-icon-card code')).toHaveText('sa-icon-home-1-regular');

  await page.evaluate(() => {
    window.__copiedIcon = '';
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: async value => { window.__copiedIcon = value; } },
    });
  });
  await page.getByRole('button', { name: 'Sao chép SVG sa-icon-home-1-regular' }).click();
  await expect.poll(() => page.evaluate(() => window.__copiedIcon)).toContain('viewBox="0 0 24 24"');
  await page.getByRole('button', { name: 'Sao chép HTML sa-icon-home-1-regular' }).click();
  await expect.poll(() => page.evaluate(() => window.__copiedIcon)).toContain('<span class="sa-icon" aria-hidden="true"><svg');
  await page.getByRole('button', { name: 'Sao chép tên sa-icon-home-1-regular' }).click();
  await expect.poll(() => page.evaluate(() => window.__copiedIcon)).toBe('sa-icon-home-1-regular');

  const svgResponse = await request.get('/mingcute/core-regular/home-1.svg');
  expect(svgResponse.status()).toBe(200);
  expect(await svgResponse.text()).toContain('viewBox="0 0 24 24"');
  const download = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Tải SVG sa-icon-home-1-regular' }).click();
  expect((await download).suggestedFilename()).toBe('sa-icon-home-1-regular.svg');

  await page.getByRole('button', { name: 'Core Filled' }).click();
  await expect(page.locator('.sa-icon-card code')).toHaveText('sa-icon-home-1-filled');
  await expect(page.locator('.sa-icon-card img')).toHaveAttribute('src', '/mingcute/core-filled/home-1.svg');
  await page.getByLabel('Kích thước xem thử').selectOption('32');
  await expect(page.locator('.sa-icon-card img')).toHaveAttribute('width', '32');
  await page.getByLabel('Nhóm').selectOption('business');
  await expect(page.locator('.sa-icon-empty')).toBeVisible();
  await page.getByLabel('Nhóm').selectOption('all');
  await expect(page.locator('.sa-icon-card')).toHaveCount(1);
});

test('Icons catalog fits supported widths and dark mode', async ({ page }) => {
  for (const width of [1920, 1440, 1280, 960, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/foundation/icons/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `horizontal overflow at ${width}px`).toBe(true);
  }
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const github = page.getByRole('figure', { name: 'Ba bước kết nối MingCute với SmartAds' }).getByRole('link', { name: /GitHub MingCute/ });
  await expect(github).toBeVisible();
  expect(await page.evaluate(() => getComputedStyle(document.querySelector('.sa-header-github')).backgroundColor === getComputedStyle(document.querySelector('.sa-icon-github-link')).backgroundColor)).toBe(true);
  await expect(page.locator('.sa-icon-card').first()).toBeVisible();
  const preview = page.locator('.sa-icon-card-preview img').first();
  await preview.scrollIntoViewIfNeeded();
  await expect.poll(() => preview.evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
});
