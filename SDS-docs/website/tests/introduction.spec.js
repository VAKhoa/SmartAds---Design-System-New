import { test, expect } from '@playwright/test';
import { navigation, plannedNavigation } from '../src/lib/navigation.js';

test('Foundation Overview is removed while the homepage Overview remains', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.locator('.sa-sidebar a[href="/"]')).toHaveText('Overview');
  await expect(page.locator('.sa-sidebar a[href="/foundation/overview/"]')).toHaveCount(0);
  expect((await request.get('/foundation/overview/')).status()).toBe(404);
});

test('AI Agents links its article and three reference files', async ({ page, request }) => {
  await page.goto('/introduction/ai-agents/');
  const cards = page.locator('.sa-ai-file-card');
  await expect(cards).toHaveCount(4);
  const files = [
    ['/source/docs/introduction/ai-agents.md', 'title: AI Agents'],
    ['/source/AGENTS.md', '# SmartAds Design System (SDS)'],
    ['/source/SDS-docs/content/rules/SDS-rules.md', '# SmartAds Design System Docs'],
    ['/source/SDS-docs/content/guides/workspace-guide.md', '# Hướng dẫn thư mục và vận hành SDS Docs'],
  ];
  await expect(page.locator('.sa-ai-file-viewer')).toHaveCount(0);
  for (const [index, [href, firstLine]] of files.entries()) {
    await expect(cards.nth(index)).toHaveAttribute('href', href);
    const response = await request.get(href);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('text/markdown');
    expect(await response.text()).toContain(firstLine);
  }
  await cards.first().click();
  await expect(page).toHaveURL(/\/source\/docs\/introduction\/ai-agents\.md$/);
  await expect(page.locator('body')).toContainText('title: AI Agents');
  await page.goBack();
  await expect(page).toHaveURL(/\/introduction\/ai-agents\/$/);
});

test('AI Agents source cards, website URL and copy buttons follow the new layout', async ({ page }) => {
  await page.goto('/introduction/ai-agents/');
  const cards = page.locator('.sa-ai-file-card');
  const first = cards.first();
  await expect(first.locator('.sa-ai-file-asset-light').first()).toBeVisible();
  await expect(first.locator('.sa-ai-file-asset-dark').first()).toBeHidden();
  await expect(first.locator('.sa-ai-file-copy strong')).toHaveText('introduction/ai-agents.md');
  await expect(first.locator('.sa-ai-file-description')).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Cách sử dụng' })).toBeVisible();
  await expect(page.locator('.sa-ai-usage-url a')).toHaveAttribute('href', 'https://smart-ads-design-system-new.vercel.app/');
  for (const button of [page.locator('.sa-copy-button'), page.locator('.sa-ai-usage-url button')]) {
    expect(await button.evaluate(element => element.getBoundingClientRect().height)).toBe(36);
  }
  const boxes = await cards.evaluateAll(elements => elements.map(element => {
    const rect = element.getBoundingClientRect();
    return { x: rect.x, y: rect.y, width: rect.width, height: rect.height };
  }));
  expect(boxes[0].width).toBeGreaterThan(boxes[0].height * 2);
  expect(boxes[0].x).toBeLessThan(boxes[1].x);
  expect(boxes[0].y).toBe(boxes[1].y);
  expect(boxes[2].x).toBe(boxes[0].x);
  expect(boxes[2].y).toBeGreaterThan(boxes[0].y);
  await page.screenshot({ path: 'test-results/sds-ai-cards-light.png', fullPage: true });
  const restBorder = await first.evaluate(element => getComputedStyle(element).borderColor);
  await first.hover();
  await expect.poll(() => first.evaluate(element => getComputedStyle(element).borderColor)).not.toBe(restBorder);
  await first.focus();
  await page.keyboard.press('Tab');
  await expect(cards.nth(1)).toBeFocused();
  await expect.poll(() => cards.nth(1).evaluate(element => getComputedStyle(element).outlineStyle)).toBe('solid');
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  await expect(first.locator('.sa-ai-file-asset-dark').first()).toBeVisible();
  await expect(first.locator('.sa-ai-file-asset-light').first()).toBeHidden();
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await expect(cards.last().locator('.sa-ai-file-copy strong')).toBeVisible();
    const mobileBoxes = await cards.evaluateAll(elements => elements.map(element => element.getBoundingClientRect().x));
    expect(mobileBoxes[0]).toBe(mobileBoxes[1]);
  }
  await page.screenshot({ path: 'test-results/sds-ai-cards-dark-mobile.png', fullPage: true });
});

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
    await expect(page.locator('.sa-sidebar .sa-nav-list a')).toHaveCount(navigation.length + plannedNavigation.reduce((count, group) => count + group.items.length, 0));
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

test('Figma header sizing, theme colors and desktop reading width', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');
  const search = page.locator('.sa-search-trigger');
  const github = page.locator('.sa-header-github');
  const theme = page.locator('.sa-theme-toggle');
  const metrics = async () => page.evaluate(() => {
    const size = selector => document.querySelector(selector).getBoundingClientRect().height;
    const padding = getComputedStyle(document.querySelector('.sa-main'));
    return { search: size('.sa-search-trigger'), github: size('.sa-header-github'), theme: size('.sa-theme-toggle'),
      left: padding.paddingLeft, right: padding.paddingRight, overflow: document.documentElement.scrollWidth > innerWidth };
  });
  await expect(search.locator('svg')).toHaveClass(/tabler-icon-search/);
  await expect(theme.locator('svg')).toHaveClass(/tabler-icon-circle-half-2/);
  await expect(github).toHaveAttribute('href', 'https://github.com/VAKhoa/SmartAds---Design-System-New');
  await expect(github).toHaveAttribute('target', '_blank');
  const githubIcon = github.locator('img');
  await expect(githubIcon).toHaveAttribute('src', '/brand/github-light.svg');
  expect(await githubIcon.evaluate(image => image.complete && image.naturalWidth === 20 && image.naturalHeight === 20)).toBe(true);
  expect(await metrics()).toEqual({ search: 36, github: 36, theme: 36, left: '160px', right: '160px', overflow: false });
  await expect(github).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await expect(github).toHaveCSS('color', 'rgb(255, 255, 255)');
  await github.hover();
  await expect(github).toHaveCSS('background-color', 'rgb(37, 37, 37)');
  await theme.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(github).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(github).toHaveCSS('color', 'rgb(31, 31, 31)');
  await expect(githubIcon).toHaveAttribute('src', '/brand/github-dark.svg');
  expect(await githubIcon.evaluate(image => image.complete && image.naturalWidth === 20 && image.naturalHeight === 20)).toBe(true);
  await expect(theme).toHaveAttribute('aria-label', 'Chuyển giao diện sáng');
  await expect(page.locator('.sa-header .sa-logo')).toHaveAttribute('data-figma-node', '15828:129796');
  await expect(page.locator('.sa-header .sa-logo img')).toHaveCount(4);
  const logoLoaded = await page.locator('.sa-header .sa-logo img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0 && image.currentSrc.includes('/brand/')) && images.slice(0, 3).every(image => image.currentSrc.includes('/brand/smartads-dark-')) && images[3].currentSrc.endsWith('/brand/smartads-fpt-online.svg'));
  expect(logoLoaded).toBe(true);
  expect(await metrics()).toEqual({ search: 36, github: 36, theme: 36, left: '160px', right: '160px', overflow: false });
  await theme.click();
  await expect(github).toHaveCSS('background-color', 'rgb(0, 0, 0)');
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
});

test('Figma sidebar and compact page navigation adapt to screen width and theme', async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 900 });
  await page.goto('/introduction/principles/');
  const sidebar = page.locator('.sa-sidebar');
  const heading = sidebar.locator('.sa-sidebar-heading').first();
  const current = sidebar.locator('a[aria-current="page"]');
  const links = page.locator('.sa-pagination a');
  await expect(sidebar).toHaveCSS('width', '240px');
  await expect(sidebar).toHaveCSS('scrollbar-width', 'auto');
  expect(await sidebar.evaluate(element => getComputedStyle(element, '::-webkit-scrollbar').width)).toBe('8px');
  expect(await sidebar.evaluate(element => element.offsetWidth - element.clientWidth - parseFloat(getComputedStyle(element).borderRightWidth))).toBeLessThanOrEqual(8);
  await expect(heading).toHaveCSS('font-size', '12px');
  await expect(heading).toHaveCSS('font-weight', '600');
  await expect(heading).toHaveCSS('line-height', '14.4px');
  await expect(heading).toHaveCSS('color', 'rgb(115, 115, 115)');
  await expect(sidebar.locator('.sa-nav-list a').first()).toHaveCSS('color', 'rgb(31, 31, 31)');
  await expect(page.locator('h1')).toHaveCSS('color', 'rgb(31, 31, 31)');
  await expect(page.locator('.sa-main')).toHaveCSS('padding-left', '320px');
  await expect(links).toHaveCount(2);
  await expect(links.first()).toContainText('Design System?');
  await expect(links.last()).toContainText('Getting Started');
  await expect(links.first()).toHaveCSS('height', '36px');
  await expect(links.first()).toHaveCSS('border-radius', '8px');
  await expect(links.first()).toHaveCSS('background-color', 'rgb(245, 245, 245)');
  await expect(links.first()).toHaveCSS('color', 'rgb(23, 23, 23)');
  await expect(page.locator('.sa-header')).toHaveCSS('background-color', 'rgb(255, 255, 255)');
  await expect(page.locator('.sa-small-button').last()).toHaveCSS('background-color', 'rgb(245, 245, 245)');
  await expect(links.first().locator('svg')).toHaveClass(/tabler-icon-arrow-left/);
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  await expect(page.locator('body')).toHaveCSS('background-color', 'rgb(9, 9, 10)');
  await expect(page.locator('.sa-header')).toHaveCSS('background-color', 'rgb(9, 9, 10)');
  await expect(page.locator('.sa-header')).toHaveCSS('border-bottom-color', 'rgb(34, 34, 34)');
  await expect(sidebar).toHaveCSS('background-color', 'rgb(9, 9, 10)');
  await expect(sidebar).toHaveCSS('border-right-color', 'rgb(34, 34, 34)');
  await expect(heading).toHaveCSS('color', 'rgb(161, 161, 161)');
  await expect(sidebar.locator('.sa-nav-list a').first()).toHaveCSS('color', 'rgb(250, 250, 250)');
  await expect(current).toHaveCSS('background-color', 'rgb(31, 31, 34)');
  await sidebar.getByRole('link', { name: 'FAQ' }).hover();
  await expect(sidebar.getByRole('link', { name: 'FAQ' })).toHaveCSS('background-color', 'rgb(31, 31, 34)');
  await expect(links.first()).toHaveCSS('height', '36px');
  await expect(links.first()).toHaveCSS('background-color', 'rgb(38, 38, 38)');
  await expect(links.first()).toHaveCSS('color', 'rgb(250, 250, 250)');
  await expect(page.locator('.sa-small-button').last()).toHaveCSS('background-color', 'rgb(38, 38, 38)');
  await page.setViewportSize({ width: 1280, height: 900 });
  await expect(sidebar).toHaveCSS('width', '240px');
  await expect(page.locator('.sa-main')).toHaveCSS('padding-left', '96px');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
});

test('displayed text uses Public Sans with 200% content and 120% navigation line height', async ({ page }) => {
  await page.goto('/');
  const inspect = async () => page.locator('body').evaluate(body => [...body.querySelectorAll('*')].filter(element =>
    [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim()) &&
    getComputedStyle(element).display !== 'none'
  ).map(element => {
    const style = getComputedStyle(element);
    return { tag: element.tagName, className: typeof element.className === 'string' ? element.className : '', font: style.fontFamily,
      weight: Number(style.fontWeight), ratio: parseFloat(style.lineHeight) / parseFloat(style.fontSize), content: !!element.closest('.sa-main') };
  }));
  for (const text of await inspect()) {
    expect(text.font, `${text.tag}.${text.className}`).toContain('Public Sans');
    expect([400, 500, 600, 700], `${text.tag}.${text.className}`).toContain(text.weight);
    expect(text.ratio, `${text.tag}.${text.className}`).toBeCloseTo(text.content ? 2 : 1.2, 1);
  }
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  for (const text of await inspect()) {
    expect(text.font, `${text.tag}.${text.className}`).toContain('Public Sans');
    expect([400, 500, 600, 700], `${text.tag}.${text.className}`).toContain(text.weight);
    expect(text.ratio, `${text.tag}.${text.className}`).toBeCloseTo(text.content ? 2 : 1.2, 1);
  }
});

test('body content uses the selected SDS docs font-size scale on desktop and mobile', async ({ page }) => {
  const allowed = [11, 12, 13, 14, 16, 18, 20, 24, 28, 32];
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 });
    for (const href of [...navigation.map(item => item.href), '/resource/figma/']) {
      await page.goto(href);
      const sizes = await page.locator('.sa-main').evaluate(main => [...main.querySelectorAll('*')]
        .filter(element => [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent.trim())
          && getComputedStyle(element).display !== 'none')
        .map(element => ({ text: element.textContent.trim().slice(0, 32), size: parseFloat(getComputedStyle(element).fontSize) })));
      for (const item of sizes) expect(allowed, `${href} at ${width}px: ${item.text} is ${item.size}px`).toContain(item.size);
    }
  }
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


test('Foundation articles have their own sources and remaining planned destinations stay blank', async ({ page, request }) => {
  await page.goto('/');
  for (const group of plannedNavigation) for (const item of group.items) {
    await page.locator('.sa-sidebar a[href="' + item.href + '"]').click();
    await expect(page).toHaveURL(new RegExp(item.href + '$'));
    if (item.id === 'foundation/colors') {
      await expect(page.locator('#main-content h1')).toHaveText('Colors');
      await expect(page.locator('.sa-color-swatch')).toHaveCount(102);
      await expect(page.locator('.sa-color-mode')).toHaveCount(2);
      const source = await request.get('/source/docs/foundation/sds-color.md');
      expect(source.ok()).toBeTruthy();
      expect(await source.text()).toContain('## Contrast và khả năng đọc');
    } else if (item.id === 'foundation/typography') {
      await expect(page.locator('#main-content h1')).toHaveText('Typography');
      await expect(page.locator('.sa-wf-style')).toHaveCount(77);
      const source = await request.get('/source/docs/foundation/typography.md');
      expect(source.ok()).toBeTruthy();
      expect(await source.text()).toContain('## Thang chữ Brand');
    } else if (item.id === 'foundation/spacing') {
      await expect(page.locator('#main-content h1')).toHaveText('Spacing');
      await expect(page.locator('.sa-spacing-table tbody tr')).toHaveCount(13);
      const source = await request.get('/source/docs/foundation/spacing.md');
      expect(source.ok()).toBeTruthy();
      expect(await source.text()).toContain('## Spacing scale và bảng token');
    } else await expect(page.locator('#main-content')).toBeEmpty();
    await expect(page.locator('.sa-sidebar [aria-current="page"]')).toHaveText(item.title);
    await page.reload();
    if (item.id === 'foundation/colors' || item.id === 'foundation/typography' || item.id === 'foundation/spacing') await expect(page.locator('#main-content h1')).toHaveText(item.title);
    else {
      await expect(page.locator('#main-content')).toBeEmpty();
      await expect(page.locator('.sa-toc')).toHaveCount(0);
    }
  }
});

test('Colors remains readable on mobile in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/foundation/colors/');
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.locator('.sa-color-mode')).toHaveCount(2);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/sds-color-mobile-dark.png', fullPage: false });
});

test('Typography specimens fit mobile widths in dark mode', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/foundation/typography/');
  await expect(page.locator('.sa-wf-style')).toHaveCount(77);
  await page.getByRole('button', { name: 'Chuyển giao diện tối' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Typography at ${width}px`).toBe(true);
  }
  await page.screenshot({ path: 'test-results/sds-typography-mobile.png' });
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
