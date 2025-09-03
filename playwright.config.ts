import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Type-safe environment variable helpers
const getTraceMode = (): 'on' | 'off' | 'on-first-retry' | 'retain-on-failure' => {
  const mode = process.env.TRACE;
  if (['on', 'off', 'on-first-retry', 'retain-on-failure'].includes(mode || '')) {
    return mode as 'on' | 'off' | 'on-first-retry' | 'retain-on-failure';
  }
  return 'on-first-retry';
};

const getScreenshotMode = (): 'only-on-failure' | 'off' | 'on' => {
  const mode = process.env.SCREENSHOT;
  if (['only-on-failure', 'off', 'on'].includes(mode || '')) {
    return mode as 'only-on-failure' | 'off' | 'on';
  }
  return 'only-on-failure';
};

const getVideoMode = (): 'on' | 'off' | 'retain-on-failure' | 'on-first-retry' => {
  const mode = process.env.VIDEO;
  if (['on', 'off', 'retain-on-failure', 'on-first-retry'].includes(mode || '')) {
    return mode as 'on' | 'off' | 'retain-on-failure' | 'on-first-retry';
  }
  return 'retain-on-failure';
};

export default defineConfig({
  testDir: './tests/specs',
  fullyParallel: process.env.CI ? true : false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? Number(process.env.CI_RETRY_COUNT) || 2 : Number(process.env.RETRY_COUNT) || 1,
  workers: process.env.CI ? Number(process.env.CI_PARALLEL_JOBS) || 3 : Number(process.env.PARALLEL_WORKERS) || 1,
  timeout: Number(process.env.TEST_TIMEOUT) || 60000,
  globalTimeout: process.env.CI ? 600000 : 0, // 10 minutes for CI
  expect: { 
    timeout: 10000,
    toMatchSnapshot: { threshold: Number(process.env.VISUAL_THRESHOLD) || 0.2 },
    toHaveScreenshot: { threshold: Number(process.env.VISUAL_THRESHOLD) || 0.2 }
  },
  
  reporter: process.env.CI ? [
    ['github'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['blob', { outputDir: 'test-results/blob-report' }]
  ] : [
    ['html', { outputFolder: 'playwright-report', open: 'on-failure' }],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/results.xml' }],
    ['line']
  ],

  use: {
    baseURL: process.env.BASE_URL || 'http://qa.mercato-retailer-jupiter.local/',
    trace: getTraceMode(),
    screenshot: getScreenshotMode(),
    video: getVideoMode(),
    headless: process.env.HEADLESS !== 'false',
    viewport: { 
      width: Number(process.env.VIEWPORT_WIDTH) || 1920, 
      height: Number(process.env.VIEWPORT_HEIGHT) || 1080 
    },
    actionTimeout: 15000,
    navigationTimeout: 30000,
    launchOptions: {
      slowMo: Number(process.env.SLOW_MO) || 0,
    }
  },

  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { 
        ...devices['Desktop Chrome'],
        channel: 'chrome'
      },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    
    // Mobile browsers
    {
      name: 'mobile-chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'mobile-safari',
      use: { ...devices['iPhone 12'] },
    },

    // Edge browser
    {
      name: 'edge',
      use: { 
        ...devices['Desktop Edge'],
        channel: 'msedge'
      },
    },

    // High resolution desktop
    {
      name: 'desktop-high-res',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 2560, height: 1440 }
      },
    },

    // Tablet
    {
      name: 'tablet',
      use: { ...devices['iPad Pro'] },
    }
  ],

  // Global setup and teardown
  globalSetup: require.resolve('./tests/utils/global-setup.ts'),
  globalTeardown: require.resolve('./tests/utils/global-teardown.ts'),

  // Test output directories
  outputDir: 'test-results/',
  
  // Web server for local development
  webServer: process.env.NODE_ENV === 'development' ? {
    command: 'npm run start:mock-server',
    port: 3001,
    reuseExistingServer: !process.env.CI,
  } : undefined,
});
