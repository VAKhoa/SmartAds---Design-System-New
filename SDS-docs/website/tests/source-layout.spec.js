import { test, expect } from '@playwright/test';
import { navigation, plannedNavigation } from '../src/lib/navigation.js';

const published = [
  ...navigation,
  ...plannedNavigation.flatMap(group => group.items).filter(item => ['foundation/colors', 'foundation/typography', 'foundation/spacing'].includes(item.id)),
  { href: '/resource/figma/', file: 'resource/figma.md' },
];

test('every populated route places its Markdown source directly after title and subtitle', async ({ page, request }) => {
  for (const item of published) {
    await page.goto(item.href);
    await expect(page.locator('#main-content > .sa-page-toolbar')).toHaveCount(1);
    await expect(page.locator('#main-content .sa-title-block .sa-title-row')).toHaveCount(1);
    await expect(page.locator('#main-content .sa-title-block .sa-status')).toBeVisible();
    const source = page.locator('#main-content > .sa-ai-files');
    await expect(source).toHaveCount(1);
    await expect(source.locator('.sa-ai-file-card').first()).toHaveAttribute('href', `/source/docs/${item.file}`);
    expect(await page.locator('#main-content .sa-title-block').evaluate(element => element.nextElementSibling?.classList.contains('sa-ai-files')), item.href).toBe(true);
    const response = await request.get(`/source/docs/${item.file}`);
    expect(response.status(), item.href).toBe(200);
    expect(response.headers()['content-type']).toContain('text/markdown');
  }
});

test('source block keeps the same order and readable cards on mobile dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  for (const route of ['/introduction/ai-agents/', '/foundation/typography/', '/foundation/spacing/', '/resource/figma/']) {
    await page.goto(route);
    await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
    const source = page.locator('#main-content > .sa-ai-files');
    await expect(source).toBeVisible();
    const cards = source.locator('.sa-ai-file-card');
    const bounds = await cards.evaluateAll(elements => elements.map(element => ({ x: element.getBoundingClientRect().x, width: element.getBoundingClientRect().width })));
    expect(bounds.every(box => box.x === bounds[0].x && box.width === bounds[0].width), route).toBe(true);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBe(true);
  }
});
