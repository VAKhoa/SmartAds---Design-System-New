import { test, expect } from '@playwright/test';

test('Typography reference shows the full snapshot without page overflow', async ({ page }) => {
  for (const width of [1920, 1440, 1280, 960, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/foundation/typography/');
    await expect(page.getByText('Dữ liệu draft', { exact: true })).toBeVisible();
    await expect(page.locator('.sa-wf-style')).toHaveCount(77);
    await expect(page.locator('#sizes tbody tr')).toHaveCount(21);
    await expect(page.locator('#catalog-display .sa-wf-style')).toHaveCount(24);
    await expect(page.locator('#catalog-body .sa-wf-style')).toHaveCount(21);
    await expect(page.locator('#catalog-detail .sa-wf-style')).toHaveCount(17);
    await expect(page.locator('#catalog-code .sa-wf-style')).toHaveCount(1);
    await expect(page.locator('#catalog-ads-merriweather .sa-wf-style')).toHaveCount(10);
    await expect(page.locator('#catalog-ads-arial .sa-wf-style')).toHaveCount(4);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow, 'horizontal overflow at ' + width + 'px').toBe(false);
  }
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('#review')).toBeVisible();
  await expect(page.locator('[data-style-name="Brand/Body-xl/Semi"] .sa-wf-flag')).toHaveText('Cần review');
});
