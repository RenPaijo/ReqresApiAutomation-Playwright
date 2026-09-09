import { defineConfig } from '@playwright/test';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  
  // Timeout settings
  timeout: 30 * 1000,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporters - Generate both HTML and JSON (for Allure) + JUnit for CI
  reporter: [
    ['html', { outputFolder: 'tests/report/html-report', open: 'on-failure' }],
    ['json', { outputFile: 'tests/report/cucumber-report.json' }],
    ['junit', { outputFile: 'tests/report/results.xml' }]
  ],

  use: {
    baseURL: process.env.API_BASE_URL || 'https://reqres.in/api',
    trace: 'on-first-retry',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 15000,
  },

  projects: [],
});
