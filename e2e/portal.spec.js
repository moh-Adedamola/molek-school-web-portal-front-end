import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { mockApi, signIn, RIGHT_PASSWORD } from './mock-api.js';

const noSeriousIssues = async (page) => {
    const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
    expect(violations.filter((v) => ['serious', 'critical'].includes(v.impact)).map((v) => v.id)).toEqual([]);
};

test('sign-in: plain message for wrong details, then lands on Home', async ({ page, context }) => {
    await mockApi(context);
    await page.goto('/student/login');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.locator('#admission_number-error')).toBeVisible();
    await page.getByLabel('Admission number').fill('mol/2024/015');
    await page.getByLabel('Password', { exact: true }).fill('nope');
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('alert')).toContainText('The admission number or password is wrong. Check both and try again.');
    await noSeriousIssues(page);
    await page.getByLabel('Password', { exact: true }).fill(RIGHT_PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/\/student$/);
    await expect(page.getByText('Term average')).toBeVisible();
    await expect(page.getByText('PROMOTED', { exact: true })).toBeVisible();
    await noSeriousIssues(page);
});

test('results open on the latest term; report card uses CA1/CA2/Exam and prints alone', async ({ page, context }) => {
    await mockApi(context); await signIn(page);
    await page.goto('/student/results');
    await expect(page.getByRole('button', { name: /First Term, 2025\/2026/ })).toBeVisible();
    await noSeriousIssues(page);
    await page.getByRole('tab', { name: 'Report card' }).click();
    const card = page.locator('.report-print-area');
    for (const text of ['CA1 (15)', 'CA2 (15)', 'Exam (70)', 'JSS2', 'Not yet available.', 'A steady term']) {
        await expect(card).toContainText(text);
    }
    await noSeriousIssues(page);
    await page.emulateMedia({ media: 'print' });
    expect(await page.evaluate(() => getComputedStyle(document.querySelector('aside')).visibility)).toBe('hidden');
    expect(await page.evaluate(() => getComputedStyle(document.querySelector('.report-print-area .no-print')).display)).toBe('none');
    await page.emulateMedia({ media: 'screen' });
    await page.getByRole('tab', { name: 'Progress' }).click();
    await expect(page.locator('svg.recharts-surface')).toBeVisible();
});

test('old bookmarks still work', async ({ page, context }) => {
    await mockApi(context); await signIn(page);
    for (const [from, to] of [['/student/dashboard', /\/student$/], ['/student/grades', /\/student\/results$/],
        ['/student/settings', /\/student\/details$/], ['/student/profile', /\/student\/details$/], ['/student/payments', /\/student\/payment$/]]) {
        await page.goto(from);
        await expect(page).toHaveURL(to);
    }
});

test('my details: field errors, saving, wrong current password, sign out clears everything', async ({ page, context }) => {
    await mockApi(context); await signIn(page);
    await page.goto('/student/details');
    await page.getByLabel('Email address').fill('not-an-email');
    await page.getByRole('button', { name: 'Save details' }).click();
    await expect(page.locator('#email-error')).toBeVisible();
    await page.getByLabel('Email address').fill('new@example.com');
    await page.getByRole('button', { name: 'Save details' }).click();
    await expect(page.locator('.Toastify__toast')).toContainText('Your details are saved.');
    await page.getByLabel('Current password', { exact: true }).fill('wrong');
    await page.getByLabel('New password', { exact: true }).fill('newpass123');
    await page.getByLabel('Type the new password again').fill('newpass123');
    await page.getByRole('button', { name: 'Change password' }).click();
    await expect(page.locator('#old_password-error')).toHaveText('That is not your current password');
    await noSeriousIssues(page);
    await page.getByRole('button', { name: 'Sign out' }).last().click();
    await expect(page).toHaveURL(/\/student\/login$/);
    expect(await page.evaluate(() => Object.keys(localStorage).filter((k) => k.startsWith('student')))).toEqual([]);
});

test('signed out for unpaid fees: the sign-in page says why', async ({ page, context }) => {
    await mockApi(context, { feesBlocked: true }); await signIn(page);
    await page.goto('/student/results');
    await expect(page).toHaveURL(/\/student\/login\?reason=fees$/);
    await expect(page.getByText('You have been signed out.')).toBeVisible();
    await expect(page.getByText(/Outstanding fees/)).toBeVisible();
});
