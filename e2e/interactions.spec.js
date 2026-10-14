import { test, expect } from '@playwright/test';
import { mockApi } from './mock-api.js';

test.beforeEach(async ({ context }) => { await mockApi(context); });

test('phone: Student Portal visible, menu is a dialog, Escape closes it and returns focus', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await expect(page.locator('header').getByRole('link', { name: 'Student Portal' })).toBeVisible();
    const openMenu = page.getByRole('button', { name: 'Open menu' });
    await openMenu.click();
    await expect(page.getByRole('dialog').getByRole('link', { name: 'News & Events' })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
    await expect(openMenu).toBeFocused();
});

test('pages change without reloading the site', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    await page.evaluate(() => { window.__noReload = 1; });
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('dialog').getByRole('link', { name: 'About Us' }).click();
    await expect(page).toHaveURL(/\/about$/);
    expect(await page.evaluate(() => window.__noReload)).toBe(1);
});

test('homepage: six reasons first, Show all reveals every one; headlines link to articles', async ({ page }) => {
    await page.goto('/');
    const reasons = page.locator('#why-choose-us-list > div');
    await expect(reasons).toHaveCount(6);
    await page.getByRole('button', { name: /Show all \d+ reasons/ }).click();
    await expect(reasons).toHaveCount(12);
    const updates = page.locator('section[aria-labelledby="latest-updates-heading"]');
    await expect(updates.locator('.swiper-slide-active a')).toHaveAttribute('href', '/news/1');
    await updates.getByRole('button', { name: 'Next update' }).first().click();
    await expect(updates.getByText('2 of 3')).toBeVisible();
});

test('news: real links, video stills, Load more reaches older items', async ({ page }) => {
    await page.goto('/news');
    await expect(page.locator('article')).toHaveCount(27);
    await expect(page.locator('article a').first()).toHaveAttribute('href', '/news/1');
    await expect(page.locator('article video').first()).toHaveAttribute('poster', /clip\.jpg$/);
    await page.getByRole('button', { name: 'Load more' }).click();
    await expect(page.locator('article')).toHaveCount(30);
    await expect(page.getByRole('button', { name: 'Load more' })).toHaveCount(0);
});

test('gallery: photo viewer works with arrow keys and Escape', async ({ page }) => {
    await page.goto('/gallery');
    await page.getByRole('button', { name: /View Gallery/ }).first().click();
    const viewer = page.getByRole('dialog');
    await expect(viewer.getByText('1 / 2')).toBeVisible();
    await page.keyboard.press('ArrowRight');
    await expect(viewer.getByText('2 / 2')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(page.getByRole('dialog')).toHaveCount(0);
});

test('contact: errors under each field, then WhatsApp opens with the enquiry', async ({ page, context }) => {
    await page.goto('/contact');
    await page.getByRole('button', { name: 'Send via WhatsApp' }).click();
    await expect(page.locator('#fullName-error')).toHaveText('Full name is required');
    await expect(page.locator('#phoneNumber-error')).toHaveText('Phone number is required');
    await expect(page.locator('#message-error')).toHaveText('Message is required');
    await page.getByLabel('Full Name *').fill('Mrs Bello');
    await page.getByLabel('Phone Number *').fill('08031234567');
    await page.getByLabel('Message *').fill('Admission enquiry for JSS1');
    const [popup] = await Promise.all([context.waitForEvent('page'), page.getByRole('button', { name: 'Send via WhatsApp' }).click()]);
    expect(decodeURIComponent(popup.url())).toContain('wa.me/+2347066277945?text=*New Enquiry from MOLEK Schools Website*');
});
