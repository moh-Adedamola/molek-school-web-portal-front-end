// Browser tests for the website and student portal (npm run test:e2e).
// The site is built against a fake API address and every request to it is
// answered by e2e/mock-api.js, so the tests never touch real school data.
import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;

export default defineConfig({
    testDir: 'e2e',
    timeout: 45_000,
    fullyParallel: true,
    retries: process.env.CI ? 1 : 0,
    reporter: process.env.CI ? [['github'], ['html', { open: 'never' }]] : 'list',
    use: { baseURL: `http://127.0.0.1:${PORT}`, trace: 'retain-on-failure' },
    projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
    webServer: {
        command: `npx vite build && npx vite preview --port ${PORT} --strictPort`,
        url: `http://127.0.0.1:${PORT}`,
        reuseExistingServer: !process.env.CI,
        timeout: 180_000,
        env: { VITE_API_BASE_URL: 'http://api.test' },
    },
});
