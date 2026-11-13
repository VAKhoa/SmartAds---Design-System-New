import { test, expect } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const campaign = JSON.parse(await readFile(resolve('src/data/layout-campaign.json'), 'utf8'));
const dashboard = JSON.parse(await readFile(resolve('src/data/layout-dashboard.json'), 'utf8'));

test('Layout page keeps source, grid style and measured Create Campaign frames distinct', async ({ page }) => {
  expect(campaign.scenarios).toHaveLength(12);
  expect(dashboard.frames).toHaveLength(8);
  await page.goto('/foundation/layout/');
  await expect(page.locator('h1')).toHaveText('Layout');
  await expect(page.locator('.sa-ai-file-card')).toHaveAttribute('href', '/source/docs/foundation/layout.md');
  await expect(page.locator('.sa-layout-grid-columns span')).toHaveCount(12);
  await expect(page.locator('.sa-layout-specimen-facts').first()).toContainText('12px');
  await expect(page.locator('.sa-layout-specimen-facts').first()).toContainText('20px');
  await expect(page.locator('#main-content')).toContainText('1536-lg');
  await expect(page.locator('#main-content')).toContainText('1563px');
  await expect(page.locator('#main-content')).toContainText('480px');

  const campaignSection = page.getByRole('region', { name: 'Sơ đồ bố cục Create Campaign' });
  const viewport = campaignSection.getByLabel('Viewport trong Figma');
  const state = campaignSection.getByLabel('Trạng thái frame');
  const facts = campaignSection.locator('.sa-layout-campaign-facts');
  await expect(facts).toContainText('847px');
  await expect(facts).toContainText('280px');
  await state.selectOption('chat');
  await expect(facts).toContainText('674px');
  await expect(facts).toContainText('360px');
  await expect(campaignSection.getByRole('link', { name: 'Mở frame Figma' })).toHaveAttribute('href', /node-id=14637-364776/);
  await expect(campaignSection.locator('.sa-layout-conflict')).toContainText('60px');
  await expect(campaignSection.locator('.sa-layout-conflict')).toContainText('84px');
  await viewport.selectOption('1280');
  await expect(facts).toContainText('554px');
  await expect(facts).toContainText('320px');
  await state.selectOption('expanded');
  await expect(facts).toContainText('687px');
  await expect(campaignSection.locator('.sa-layout-conflict')).toHaveCount(0);

  const dashboardSection = page.getByRole('region', { name: 'Sơ đồ bố cục Dashboard' });
  await expect(dashboardSection.locator('.sa-layout-dashboard-kpis span')).toHaveCount(5);
  await expect(dashboardSection.locator('.sa-layout-dashboard-facts')).toContainText('1189px');
  await expect(dashboardSection.locator('.sa-layout-dashboard-facts')).toContainText('12px');
  await dashboardSection.getByLabel('Trạng thái sidebar').selectOption('collapsed');
  await expect(dashboardSection.locator('.sa-layout-dashboard-facts')).toContainText('1377px');
  await expect(dashboardSection.locator('.sa-layout-conflict')).toContainText('84px');
  await dashboardSection.getByLabel('Viewport trong Figma').selectOption('1280');
  await expect(dashboardSection.locator('.sa-layout-dashboard-facts')).toContainText('1217px');
  await expect(dashboardSection.getByRole('link', { name: 'Mở frame Figma' })).toHaveAttribute('href', /node-id=14416-263929/);
});

test('Layout route fits supported widths and dark theme', async ({ page }) => {
  for (const width of [1920, 1440, 1280, 960, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/foundation/layout/');
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `horizontal overflow at ${width}px`).toBe(true);
  }
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.sa-layout-specimen')).toHaveCount(3);
});

test('Figma captures show real UI regions and let readers inspect the unmarked image', async ({ page }) => {
  await page.goto('/foundation/layout/');
  const captures = page.locator('.sa-layout-capture');
  await expect(captures).toHaveCount(3);
  for (const capture of await captures.all()) {
    await capture.scrollIntoViewIfNeeded();
    const image = capture.locator('.sa-layout-capture-frame img');
    await expect(image).toBeVisible();
    await expect.poll(() => image.evaluate(element => element.naturalWidth > 0 && element.naturalHeight > 0)).toBe(true);
    await expect(capture.getByRole('link', { name: 'Mở node Dev Mode' })).toHaveAttribute('href', /figma\.com\/design\/cRZ5kIi4kD6j9lh1dbh5mh\/.*m=dev/);
  }

  const campaign = page.getByRole('figure', { name: 'Ảnh Figma Create Campaign · 1440px' });
  await expect(campaign.locator('.sa-layout-capture-region')).toHaveCount(4);
  await expect(campaign.locator('.sa-layout-capture-detail-image')).toHaveCount(2);
  await campaign.getByRole('button', { name: 'Ẩn viền đo' }).click();
  await expect(campaign.locator('.sa-layout-capture-region')).toHaveCount(0);
  await campaign.getByRole('button', { name: 'Hiện viền đo' }).click();
  await expect(campaign.locator('.sa-layout-capture-region')).toHaveCount(4);
  await page.setViewportSize({ width: 390, height: 844 });
  await campaign.getByRole('button', { name: 'Phóng to' }).click();
  expect(await campaign.locator('.sa-layout-capture-scroll').evaluate(element => element.scrollWidth > element.clientWidth)).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});
