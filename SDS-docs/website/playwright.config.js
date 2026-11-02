import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'http://127.0.0.1:4322',
    browserName: 'chromium', channel: 'chrome', headless: true,
    viewport: { width: 1440, height: 1000 }, colorScheme: 'light',
    screenshot: 'only-on-failure',
  },
  webServer: {
    command: 'npm run preview -- --port 4322',
    url: 'http://127.0.0.1:4322',
    reuseExistingServer: !process.env.CI,
  },
});
