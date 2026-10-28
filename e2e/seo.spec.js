import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { mockApi, signIn } from './mock-api.js';

const PAGES = JSON.parse(readFileSync(new URL('../src/seo/pages.json', import.meta.url), 'utf8'));
const canonical = (page) => page.locator('link[rel="canonical"]').getAttribute('href');
const meta = (page, name) => page.locator(`meta[name="${name}"]`).getAttribute('content');

test('each public page has its own title, description and address, also when opened directly', async ({ page, context }) => {
    await mockApi(context);
    for (const route of ['/', '/about', '/contact', '/student/login']) {
        await page.goto(route);
        await expect(page).toHaveTitle(PAGES[route].title);
        expect(await meta(page, 'description')).toBe(PAGES[route].description);
        expect(await canonical(page)).toBe(route === '/' ? 'https://molekschools.com/' : `https://molekschools.com${route}`);
        expect(await meta(page, 'robots')).toBe('index, follow');
    }
});

test('moving between pages updates the address and description', async ({ page, context }) => {
    await mockApi(context);
    await page.goto('/');
    await page.locator('header a[href="/gallery"]').first().click();
    await expect(page).toHaveURL(/\/gallery$/);
    await expect.poll(() => canonical(page)).toBe('https://molekschools.com/gallery');
    expect(await page.locator('meta[property="og:url"]').getAttribute('content')).toBe('https://molekschools.com/gallery');
    expect(await meta(page, 'description')).toBe(PAGES['/gallery'].description);
    await expect(page).toHaveTitle(PAGES['/gallery'].title);
});

test('a news article gets its own title, address and description', async ({ page, context }) => {
    await mockApi(context);
    await page.goto('/news');
    const first = page.locator('a[href^="/news/"]').first();
    const href = await first.getAttribute('href');
    await first.click();
    await expect(page).toHaveURL(new RegExp(href + '$'));
    await expect.poll(() => canonical(page)).toBe(`https://molekschools.com${href}`);
    expect(await page.title()).toMatch(/\| MOLEK Schools$/);
    expect(await page.title()).not.toBe(PAGES['/news'].title);
    expect((await meta(page, 'description')).length).toBeGreaterThan(10);
});

test('missing pages and the signed-in portal stay out of search results', async ({ page, context }) => {
    await mockApi(context);
    await page.goto('/no-such-page');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    expect(await meta(page, 'robots')).toBe('noindex, follow');
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await signIn(page);
    await page.goto('/student');
    await expect.poll(() => meta(page, 'robots')).toBe('noindex, nofollow');
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await page.locator('a[href="/student/results"]').first().click();
    await expect(page).toHaveURL(/\/student\/results$/);
    expect(await meta(page, 'robots')).toBe('noindex, nofollow');
});

test('robots.txt keeps the portal out and points to the sitemap', async ({ request }) => {
    const body = await (await request.get('/robots.txt')).text();
    expect(body).toContain('Disallow: /student/');
    expect(body).toContain('Allow: /student/login');
    expect(body).toContain('Sitemap: https://molekschools.com/sitemap.xml');
});
