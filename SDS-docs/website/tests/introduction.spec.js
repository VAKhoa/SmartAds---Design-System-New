import { test, expect } from '@playwright/test';
import { navigation, plannedNavigation } from '../src/lib/navigation.js';

test('seven routes, original Figma logo, navigation and internal links', async ({ page, request }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  const links = new Set();
  for (const item of navigation) {
    const response = await page.goto(item.href);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1')).toHaveText(item.id === 'overview' ? 'SmartAds Design System' : item.title);
    await expect(page.locator('.sa-sidebar nav[aria-label="Introduction"] .sa-nav-list a')).toHaveText(navigation.map(item => item.title));
    await expect(page.locator('.sa-sidebar [aria-current="page"]')).toHaveText(item.title);
    await expect(page.locator('.sa-footer')).toBeVisible();
    const logo = page.locator('.sa-header .sa-logo');
    await expect(logo).toHaveAttribute('data-figma-node', '123:497');
    await expect(logo.locator('img')).toHaveCount(4);
    expect(await logo.locator('img').evaluateAll(images => images.every(img => img.complete && img.naturalWidth > 0 && img.currentSrc.includes('/brand/')))).toBe(true);
    const box = await logo.boundingBox();
    expect(box.width).toBeCloseTo(110, 0);
    await expect(page.locator('.sa-sidebar svg')).toHaveCount(0);
    await expect(page.locator('.sa-sidebar .sa-nav-list a')).toHaveCount(26);
    const foreignFonts = await page.locator('body *').evaluateAll(elements => elements.filter(el => el.textContent.trim() && !['SCRIPT','STYLE'].includes(el.tagName) && !getComputedStyle(el).fontFamily.includes('Public Sans')).map(el => el.tagName));
    expect(foreignFonts).toEqual([]);
    expect(box.width / box.height).toBeCloseTo(294.75 / 90, 1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    expect(await page.locator('.sa-toc a').evaluateAll(anchors => anchors.every(a => a.getBoundingClientRect().right <= innerWidth))).toBe(true);
    for (const href of await page.locator('a[href^="/"]').evaluateAll(anchors => anchors.map(a => a.getAttribute('href')))) links.add(href.split('#')[0]);
  }
  for (const href of links) expect((await request.get(href)).status(), href).toBe(200);
  expect((await request.get('/missing-page/')).status()).toBe(404);
  expect(errors).toEqual([]);
});

test('search supports text, no results, keyboard navigation and Escape', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Tìm kiếm tài liệu', exact: true }).click();
  const dialog = page.getByRole('dialog', { name: 'Tìm kiếm tài liệu', exact: true });
  const input = dialog.getByRole('searchbox');
  await expect(input).toBeFocused();
  await input.fill('zzzzzzzzzzzzzz');
  await expect(dialog.getByText('Chưa tìm thấy nội dung phù hợp')).toBeVisible();
  await input.fill('Codex');
  await expect(dialog.locator('.sa-search-result').filter({ hasText: 'AI Agents' })).toBeVisible();
  await input.press('ArrowDown');
  await expect(dialog.locator('.sa-search-result').first()).toBeFocused();
  await dialog.locator('.sa-search-result').filter({ hasText: 'AI Agents' }).click();
  await expect(page).toHaveURL(/introduction\/ai-agents/);
  await expect(page.locator('h1')).toHaveText('AI Agents');
  await expect(dialog).not.toBeVisible();
  await page.keyboard.press('Control+k');
  await expect(dialog).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
});

test('copy page and persistent dark theme', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/');
  await page.screenshot({ path: 'test-results/sds-next-desktop.png', fullPage: true });
  await page.getByRole('button', { name: 'Sao chép nội dung trang' }).click();
  await expect(page.locator('.sa-copy-button')).toContainText('Đã sao chép');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('SmartAds Design System');
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  await page.locator('.sa-sidebar').getByRole('link', { name: 'FAQ', exact: true }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.screenshot({ path: 'test-results/sds-next-dark.png', fullPage: true });
});

test('mobile navigation and responsive reading layout', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'Mở menu Introduction' }).click();
  const menu = page.getByRole('dialog', { name: 'Menu tài liệu' });
  await expect(menu).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).not.toBeVisible();
  await page.getByRole('button', { name: 'Mở menu Introduction' }).click();
  await menu.getByRole('link', { name: 'Getting Started', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('Getting Started');
  await expect(menu).not.toBeVisible();
  for (const item of navigation) {
    await page.goto(item.href);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), item.href).toBe(true);
  }
  await page.goto('/');
  await page.screenshot({ path: 'test-results/sds-next-mobile.png', fullPage: true });
  for (const width of [320, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `viewport ${width}`).toBe(true);
  }
});


test('planned sidebar destinations have separate blank pages', async ({ page }) => {
  await page.goto('/');
  for (const group of plannedNavigation) for (const item of group.items) {
    await page.locator('.sa-sidebar a[href="' + item.href + '"]').click();
    await expect(page).toHaveURL(new RegExp(item.href + '$'));
    await expect(page.locator('#main-content')).toBeEmpty();
    await expect(page.locator('.sa-sidebar [aria-current="page"]')).toHaveText(item.title);
    await page.reload();
    await expect(page.locator('#main-content')).toBeEmpty();
    await expect(page.locator('.sa-toc')).toHaveCount(0);
  }
});

test('all UI icons use Tabler including CSS, article decorations and search states', async ({ page, request }) => {
  async function audit() {
    await expect(page.locator('svg:not(.tabler-icon)')).toHaveCount(0);
    expect(await page.locator('body').evaluate(body => {
      const arrows = /[\u2190-\u21ff\u2713\u2715]/;
      const walker = document.createTreeWalker(body, NodeFilter.SHOW_TEXT);
      const bad = [];
      while(walker.nextNode()) { const n=walker.currentNode; if (!['SCRIPT','STYLE'].includes(n.parentElement.tagName) && arrows.test(n.textContent)) bad.push(n.textContent); }
      for(const el of body.querySelectorAll('*')) for(const pseudo of ['::before','::after']) if(arrows.test(getComputedStyle(el,pseudo).content)) bad.push(el.className);
      return bad;
    })).toEqual([]);
  }
  for (const item of navigation) { await page.goto(item.href); await audit(); }
  await page.goto('/');
  await expect(page.locator('.sa-actions .tabler-icon')).toHaveCount(2);
  await expect(page.locator('.sa-flow .tabler-icon')).toHaveCount(2);
  await expect(page.locator('.sa-entry .tabler-icon')).toHaveCount(4);
  await page.getByRole('button',{ name:'Tìm kiếm tài liệu',exact:true }).click();
  await page.getByRole('searchbox').fill('Codex');
  await audit();
  await page.getByRole('button',{name:'Clear search'}).click();
  await expect(page.getByRole('searchbox')).toHaveValue('');
  await page.keyboard.press('Escape');
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Mở menu Introduction'}).click();
  await audit();
  const favicon = await request.get('/brand/smartads-favicon.svg');
  expect(await favicon.text()).toContain('<svg');
});
