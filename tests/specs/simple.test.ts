import { test, expect } from '@playwright/test';

test('[TC-SETUP-001] Simple test to check setup', async ({ page }) => {
  await page.goto('http://qa.mercato-retailer-jupiter.local/');
  const title = await page.title();
  expect(title).toContain('Jupiter');
  console.log('✅ Basic test passed');
});
