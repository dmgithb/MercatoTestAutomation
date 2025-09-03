import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginDialog } from '../pages/login-dialog.page';

test.describe('@smoke Basic Functionality Verification', () => {
  let homePage: HomePage;
  let loginDialog: LoginDialog;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginDialog = new LoginDialog(page);
  });

  test('[TC-BASIC-001] @smoke Homepage accessibility and basic elements', async () => {
    // Navigate to homepage
    await homePage.navigateToHomepage();
    
    // Verify basic elements are present
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.userButton).toBeVisible();
    await expect(homePage.navigationMenu).toBeVisible();
    await expect(homePage.searchBox).toBeVisible();
    
    console.log('✅ Homepage basic elements verified');
  });

  test('[TC-BASIC-002] @smoke User menu and login dialog', async () => {
    await homePage.navigateToHomepage();
    
    // Open user menu
    await homePage.openUserMenu();
    await expect(homePage.loginMenuItem).toBeVisible();
    
    // Open login dialog
    await homePage.clickLoginOption();
    await loginDialog.waitForDialogToAppear();
    
    // Verify login dialog elements
    await expect(loginDialog.dialogTitle).toBeVisible();
    await expect(loginDialog.emailField).toBeVisible();
    await expect(loginDialog.passwordField).toBeVisible();
    
    console.log('✅ Login dialog verified');
  });

  test('[TC-BASIC-003] @smoke Search functionality', async () => {
    await homePage.navigateToHomepage();
    
    // Perform search
    await homePage.performSearch('sofa');
    
    // Verify we're on search results page
    await expect(homePage.currentPage).toHaveURL(/products\?search=sofa/);
    
    console.log('✅ Search functionality verified');
  });

  test('[TC-BASIC-004] @smoke Category navigation', async () => {
    await homePage.navigateToHomepage();
    
    // Click Living Room category
    await homePage.clickLivingRoomCategory();
    
    // Verify we're on the category page
    await expect(homePage.currentPage).toHaveURL(/categories\/living-room/);
    
    console.log('✅ Category navigation verified');
  });
});
