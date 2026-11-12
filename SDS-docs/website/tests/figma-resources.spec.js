import { test, expect } from '@playwright/test';
import files from '../src/data/figma-files.json' with { type: 'json' };

test('Resource opens an internal directory, cards expose real Figma links and keyboard states', async ({ page }) => {
  await page.goto('/');
  await page.locator('.sa-sidebar .sa-resource-link').click();
  await expect(page).toHaveURL(/\/resource\/figma\/$/);
  await expect(page.locator('h1')).toHaveText('Figma files');
  await expect(page.locator('.sa-ai-file-card')).toHaveAttribute('href', '/source/docs/resource/figma.md');
  await expect(page.locator('.sa-sidebar .sa-resource-link')).toHaveAttribute('aria-current', 'page');
  const cards = page.locator('.sa-figma-card');
  await expect(cards).toHaveCount(files.length);
  for (let i = 0; i < files.length; i++) {
    await expect(cards.nth(i)).toHaveAttribute('href', files[i].url);
    await expect(cards.nth(i)).toHaveAttribute('target', '_blank');
    await expect(cards.nth(i)).toContainText(files[i].title);
  }
  expect(await page.locator('.sa-figma-mark img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0 && img.getBoundingClientRect().width === 11.5))).toBe(true);
  const first = cards.first();
  await first.hover();
  await expect(first.locator('.sa-figma-card-action')).toHaveCSS('opacity', '1');
  await page.mouse.move(0, 0);
  await cards.nth(1).focus();
  await page.keyboard.press('Shift+Tab');
  await expect(first).toBeFocused();
  await expect(first).toHaveCSS('outline-style', 'solid');
  await expect(first.locator('.sa-figma-card-action')).toHaveCSS('opacity', '1');
  await page.screenshot({ path: 'test-results/figma-resources-light.png', fullPage: true });
  await page.locator('.sa-theme-toggle').click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(first).toHaveCSS('background-color', 'rgb(9, 9, 10)');
  await expect(first).toHaveCSS('color', 'rgb(250, 250, 250)');
  await first.hover();
  await expect(first).toHaveCSS('background-color', 'rgb(31, 31, 34)');
  await page.mouse.down();
  await expect(first).toHaveCSS('background-color', 'rgb(38, 38, 38)');
  await page.mouse.move(0, 0);
  await page.mouse.up();
  await page.screenshot({ path: 'test-results/figma-resources-dark.png', fullPage: true });
  for (const width of [1920, 1280, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `viewport ${width}`).toBe(true);
  }
  await page.screenshot({ path: 'test-results/figma-resources-mobile.png', fullPage: true });
  await page.reload();
  await expect(page.locator('h1')).toHaveText('Figma files');
});

test('Figma directory can be found in global search', async ({ page }) => {
  await page.goto('/');
  await page.locator('.sa-search-trigger').click();
  await page.getByRole('searchbox').fill('Figma files');
  await page.locator('.sa-search-result[href="/resource/figma/"]').click();
  await expect(page).toHaveURL(/\/resource\/figma\/$/);
  await expect(page.locator('.sa-search-dialog')).not.toBeVisible();
});
