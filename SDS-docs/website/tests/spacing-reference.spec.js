import { test, expect } from '@playwright/test';

test('Spacing page keeps verified values, copy actions, and inspect labels in sync', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/foundation/spacing/');
  await expect(page.locator('h1')).toHaveText('Spacing');
  await expect(page.locator('.sa-sidebar a[aria-current="page"]')).toHaveText('Spacing');
  await expect(page.getByRole('link', { name: 'Mở Markdown gốc: foundation/spacing.md' })).toHaveAttribute('href', '/source/docs/foundation/spacing.md');
  await page.screenshot({ path: 'test-results/spacing-desktop-light.png', fullPage: false });
  await expect(page.locator('.sa-spacing-table tbody tr')).toHaveCount(13);
  await expect(page.locator('.sa-spacing-exception')).toHaveCount(7);
  await expect(page.locator('.sa-spacing-table tbody tr').nth(6)).toContainText('spacing/lg (Base)');
  await expect(page.locator('.sa-spacing-table tbody tr').nth(6)).toContainText('16px');
  await expect(page.locator('.sa-spacing-table tbody tr').nth(6)).toContainText('1rem');
  await page.locator('#scale').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'test-results/spacing-table-light.png', fullPage: false });
  await expect(page.locator('.sa-spacing-collision')).toContainText('18px (1.125rem)');

  await page.getByRole('button', { name: 'Sao chép var(--sa-space-4)' }).click();
  await expect(page.locator('.sa-spacing-toast')).toContainText('Copied!');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('var(--sa-space-4)');
  await page.getByRole('button', { name: 'Sao chép 1rem', exact: true }).first().click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('1rem');
  await page.evaluate(() => Object.defineProperty(navigator.clipboard, 'writeText', { value: () => Promise.reject(new Error('blocked')) }));
  await page.getByRole('button', { name: 'Sao chép var(--sa-space-4)' }).click();
  await expect(page.locator('.sa-spacing-toast')).toHaveText('Không thể sao chép. Hãy chọn giá trị trực tiếp.');

  await expect(page.getByRole('region', { name: 'Bảng 13 spacing tokens' })).toBeVisible();
  await expect(page.locator('.sa-spacing-example-table-cell')).toContainText('15044:691533');
  await expect(page.locator('.sa-spacing-example-table-cell')).toContainText('15044:691534');
  await expect(page.locator('.sa-spacing-example-table-cell')).toContainText('15044:691535');
  await expect(page.locator('.sa-spacing-stat-card, .sa-spacing-widget-grid, .sa-spacing-status')).toHaveCount(0);
  const inspect = page.locator('.sa-spacing-example-table-cell .sa-spacing-inspect-toggle');
  await inspect.click();
  await expect(inspect).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.sa-spacing-cell-content')).toHaveCSS('outline-style', 'solid');
  await page.getByRole('tab', { name: 'Helper' }).click();
  await expect(page.getByRole('tabpanel')).toContainText('pxToRem');
  await page.getByRole('tab', { name: 'Helper' }).press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Best Practices' })).toHaveAttribute('aria-selected', 'true');
});

test('Spacing page fits supported widths and both themes', async ({ page }) => {
  for (const width of [1920, 1440, 1280, 960, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/foundation/spacing/');
    const overflow = await page.evaluate(() => ({ page: document.documentElement.scrollWidth, window: innerWidth, elements: [...document.querySelectorAll('*')].filter(el => el.getBoundingClientRect().right > innerWidth + 2).slice(0, 8).map(el => `${el.tagName.toLowerCase()}.${String(el.className).replace(/\s+/g, '.')}`) }));
    expect(overflow.page <= overflow.window, `horizontal overflow at ${width}px: ${JSON.stringify(overflow)}`).toBe(true);
  }
  await expect(page.locator('.sa-spacing-hero-scale')).toBeVisible();
  await expect(page.locator('.sa-spacing-hero-scale')).toContainText('16px (1rem)');
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--sa-docs-primary').trim())).toBe('#048845');
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const roles = await page.evaluate(() => {
    const css = getComputedStyle(document.documentElement);
    return [css.getPropertyValue('--sa-docs-primary').trim(), css.getPropertyValue('--sa-docs-primary-fill').trim(), css.getPropertyValue('--sa-docs-on-primary-fill').trim()];
  });
  expect(roles).toEqual(['#8cc8a9', '#57af82', '#09090a']);
  await expect(page.locator('.sa-spacing-table tbody tr')).toHaveCount(13);
  await page.screenshot({ path: 'test-results/spacing-mobile-dark.png', fullPage: false });
  await page.locator('#application').scrollIntoViewIfNeeded();
  await page.screenshot({ path: 'test-results/spacing-table-cell-dark.png', fullPage: false });
});
