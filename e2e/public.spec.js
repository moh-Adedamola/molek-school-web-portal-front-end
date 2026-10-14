// Every public page, at phone and desktop width: one main heading, a proper
// title, no sideways scrolling, no script errors, and no serious accessibility issues.
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mockApi } from './mock-api.js';

const PAGES = ['/', '/about', '/admissions', '/academics', '/news', '/news/5', '/gallery', '/contact',
    '/privacy', '/terms', '/accessibility', '/this-page-does-not-exist'];

for (const width of [360, 1366]) {
    for (const path of PAGES) {
        test(`${path} at ${width}px`, async ({ page, context }) => {
            const errors = [];
            page.on('pageerror', (e) => errors.push(String(e)));
            await mockApi(context);
            await page.setViewportSize({ width, height: 900 });
            await page.goto(path);
            await page.waitForLoadState('networkidle');
            await expect(page.locator('h1')).toHaveCount(1);
            await expect(page).toHaveTitle(/MOLEK Schools/);
            const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
            expect(overflow, 'page scrolls sideways').toBe(false);
            const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
            const serious = violations.filter((v) => ['serious', 'critical'].includes(v.impact)).map((v) => `${v.id}: ${v.nodes[0].target}`);
            expect(serious).toEqual([]);
            expect(errors).toEqual([]);
        });
    }
}
