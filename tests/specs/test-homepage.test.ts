import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home-minimal.page';

test('[TC-SETUP-002] Test minimal HomePage', async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.navigateToHomePage();
  await homePage.verifyHomepageElements();
  console.log('✅ HomePage test passed');
});
