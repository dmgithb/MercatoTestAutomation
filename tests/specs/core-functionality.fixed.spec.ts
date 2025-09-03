import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { CategoryPage } from '../pages/category.page';
import { SearchResultsPage } from '../pages/search-results.page';
import { LoginDialog } from '../pages/login-dialog.page';

test.describe('@smoke Core Functionality Tests', () => {
  let homePage: HomePage;
  let categoryPage: CategoryPage;
  let searchResultsPage: SearchResultsPage;
  let loginDialogPage: LoginDialog;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    categoryPage = new CategoryPage(page);
    searchResultsPage = new SearchResultsPage(page);
    loginDialogPage = new LoginDialog(page);
    await homePage.navigateToHomePage();
  });

  test('[TC-CORE-001] @smoke Homepage loads correctly', async () => {
    // Verify homepage elements
    await homePage.verifyHomepageElements();
    console.log('✅ Homepage loading verified');
  });

  test('[TC-CORE-002] @smoke User menu and login dialog work', async () => {
    // Open user menu and access login dialog
    await homePage.openUserMenu();
    await homePage.clickLoginOption();
    await loginDialogPage.waitForDialogToAppear();
    await loginDialogPage.verifyDialogElements();
    console.log('✅ User authentication flow verified');
  });

  test('[TC-CORE-003] @smoke Search functionality works', async () => {
    // Perform search
    await homePage.performSearch('sofa');
    await searchResultsPage.verifySearchResultsPage();
    console.log('✅ Search functionality verified');
  });

  test('[TC-CORE-004] @smoke Category navigation works', async () => {
    // Navigate to category
    await homePage.clickLivingRoomCategory();
    await expect(categoryPage.pageHeading).toBeVisible();
    await expect(categoryPage.breadcrumb).toBeVisible();
    console.log('✅ Category navigation verified');
  });

  test('[TC-CORE-005] @smoke Basic filter visibility', async () => {
    // Navigate to category and check basic filter visibility
    await homePage.clickLivingRoomCategory();
    await expect(categoryPage.categoryFilter).toBeVisible();
    await expect(categoryPage.filtersSection).toBeVisible();
    console.log('✅ Filter visibility verified');
  });
});
