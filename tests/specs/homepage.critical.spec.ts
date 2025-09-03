import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { SearchResultsPage } from '../pages/search-results.page';
import { LoginDialog } from '../pages/login-dialog.page';
import { TestDataManager } from '../utils/test-data-manager';

test.describe('@critical Homepage Core Functionality', () => {
  let homePage: HomePage;
  let searchResultsPage: SearchResultsPage;
  let loginDialog: LoginDialog;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchResultsPage = new SearchResultsPage(page);
    loginDialog = new LoginDialog(page);
    await homePage.navigateToHomepage();
  });

  test('[TC-HOME-001] @critical Homepage loads with all essential elements', async () => {
    // Given I navigate to the homepage
    // When the page loads
    // Then all critical elements should be visible
    await homePage.verifyHomepageElements();
    
    await expect(homePage.logo).toBeVisible();
    await expect(homePage.searchBox).toBeVisible();
    await expect(homePage.userButton).toBeVisible();
    await expect(homePage.navigationMenu).toBeVisible();
    // Check for featured products section (may load dynamically)
    await expect(homePage.featuredProductsSection).toBeVisible({ timeout: 10000 });
  });

  test('[TC-HOME-002] @critical Product search functionality works correctly', async () => {
    const searchData = TestDataManager.getSearchData();
    
    // Given I am on the homepage
    await expect(homePage.logo).toBeVisible();

    // When I search for a valid product
    await homePage.performSearch(searchData.validSearchTerms[0]);

    // Then I should see search results
    await searchResultsPage.verifySearchResultsPage();
    await expect(searchResultsPage.pageHeading).toBeVisible();
  });

  test('[TC-HOME-003] @critical User menu and login dialog functionality', async () => {
    // Given I am on the homepage
    // When I click the user button
    await homePage.openUserMenu();

    // Then the user menu should appear
    await expect(homePage.loginMenuItem).toBeVisible();
    await expect(homePage.signupMenuItem).toBeVisible();
    await expect(homePage.comparisonMenuItem).toBeVisible();

    // When I click login
    await homePage.clickLoginOption();

    // Then the login dialog should appear with all elements
    await loginDialog.waitForDialogToAppear();
    await loginDialog.verifyDialogElements();
  });

  test('[TC-HOME-004] @critical Navigation menu categories are functional', async () => {
    const categoryData = TestDataManager.getCategoryData();
    
    // Given I am on the homepage
    // When I click on each category
    for (const category of categoryData.availableCategories.slice(0, 3)) {
      await homePage.navigateToHomepage();
      
      if (category === 'Living Room') {
        await homePage.clickLivingRoomCategory();
      } else if (category === 'Dining Room') {
        await homePage.clickDiningRoomCategory();
      } else if (category === 'Bedroom') {
        await homePage.clickBedroomCategory();
      }
      
      // Then I should be on the category page
      await expect(homePage.currentPage).toHaveURL(new RegExp(category.toLowerCase().replace(' ', '-')));
    }
  });
});
