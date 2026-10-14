// The header never crowds: "Student Portal" stays on one line and nothing overlaps.
import { test, expect } from '@playwright/test';
import { mockApi } from './mock-api.js';

for (const width of [320, 360, 390, 412, 768, 1024, 1280, 1366, 1920]) {
    test(`header at ${width}px`, async ({ page, context }) => {
        await mockApi(context);
        await page.setViewportSize({ width, height: 700 });
        await page.goto('/');
        const r = await page.evaluate(() => {
            const btn = [...document.querySelectorAll('header a')].find((a) => a.textContent.trim() === 'Student Portal' && a.offsetParent);
            const span = btn.querySelector('span');
            const lines = Math.round(span.getBoundingClientRect().height / parseFloat(getComputedStyle(span).lineHeight));
            const brand = [...document.querySelectorAll('header span')].find((s) => s.textContent === 'MOLEK Schools');
            const bs = getComputedStyle(brand);
            const visible = !(bs.position === 'absolute' && bs.width === '1px');
            const overlap = visible && brand.getBoundingClientRect().right > btn.getBoundingClientRect().left + 0.5;
            return { lines, overlap, overflow: document.documentElement.scrollWidth > document.documentElement.clientWidth };
        });
        expect(r).toEqual({ lines: 1, overlap: false, overflow: false });
    });
}
