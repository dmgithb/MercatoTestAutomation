import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';

export class HomePage extends BasePage {
  readonly logo: Locator;
  readonly searchBox: Locator;
  readonly searchButton: Locator;
  readonly userButton: Locator;
  readonly navigationMenu: Locator;
  readonly livingRoomCategory: Locator;
  readonly diningRoomCategory: Locator;
  readonly bedroomCategory: Locator;
  readonly homeOfficeCategory: Locator;
  readonly homeDecorCategory: Locator;
  readonly loginMenuItem: Locator;
  readonly signupMenuItem: Locator;
  readonly comparisonMenuItem: Locator;
  readonly heroSlider: Locator;
  readonly brandLogos: Locator;
  readonly categoryLinks: Locator;
  readonly testimonials: Locator;
  readonly featuredProductsSection: Locator;

  constructor(page: Page) {
    super(page);
    // Header elements
    this.logo = page.locator('a[href="/"]').filter({ hasText: 'Jupiter' });
    this.searchBox = page.getByPlaceholder('Find products by name or sku...');
    // Use the search button that's next to the search box
    this.searchButton = page.getByRole('button', { name: 'Search' }).nth(1);
    this.userButton = page.getByRole('button', { name: 'User' });

    // Navigation menu items - changed from links to buttons as per actual website
    this.navigationMenu = page.locator('nav');
    this.livingRoomCategory = page.getByRole('button', { name: 'Living Room' });
    this.diningRoomCategory = page.getByRole('button', { name: 'Dining Room' });
    this.bedroomCategory = page.getByRole('button', { name: 'Bedroom' });
    this.homeOfficeCategory = page.getByRole('button', { name: 'Home Office' });
    this.homeDecorCategory = page.getByRole('button', { name: 'Home Decor' });

    // User menu items - these are menuitem, not buttons
    this.loginMenuItem = page.getByRole('menuitem', { name: 'Login' });
    this.signupMenuItem = page.getByRole('menuitem', { name: 'Signup' });
    this.comparisonMenuItem = page.getByRole('menuitem', { name: 'Comparison' });

    // Homepage sections
    this.heroSlider = page.locator('.hero-slider, .carousel, .banner-slider');
    this.brandLogos = page.locator('.brand-logos, .partners-section');
    this.categoryLinks = page.locator('.category-grid, .category-showcase');
    this.testimonials = page.locator('.testimonials, .reviews-section');
    this.featuredProductsSection = page.getByRole('heading', { name: 'Featured Products', level: 2 });
  }

  get currentPage(): Page {
    return this.page;
  }

  async navigateToHomepage(): Promise<void> {
    await this.navigateTo('/');
    this.logger.step('Navigated to Jupiter homepage');
  }

  async navigateToHomePage(): Promise<void> {
    await this.navigateTo('/');
    this.logger.step('Navigated to Jupiter homepage');
  }

  async performSearch(searchTerm: string): Promise<void> {
    await this.searchBox.fill(searchTerm);
    // Try pressing Enter instead of clicking the search button
    await this.searchBox.press('Enter');
    await this.page.waitForTimeout(2000);
    this.logger.step(`Performed search for: ${searchTerm}`);
  }

  async openUserMenu(): Promise<void> {
    await this.userButton.click();
    this.logger.step('Opened user menu');
  }

  async clickLivingRoomCategory(): Promise<void> {
    await this.livingRoomCategory.click();
    await this.page.waitForTimeout(2000);
    this.logger.step('Clicked Living Room category');
  }

  async clickDiningRoomCategory(): Promise<void> {
    await this.diningRoomCategory.click();
    await this.page.waitForTimeout(2000);
    this.logger.step('Clicked Dining Room category');
  }

  async clickBedroomCategory(): Promise<void> {
    await this.bedroomCategory.click();
    await this.page.waitForTimeout(2000);
    this.logger.step('Clicked Bedroom category');
  }

  async clickHomeOfficeCategory(): Promise<void> {
    await this.homeOfficeCategory.click();
    await this.page.waitForTimeout(2000);
    this.logger.step('Clicked Home Office category');
  }

  async clickHomeDecorCategory(): Promise<void> {
    await this.homeDecorCategory.click();
    await this.page.waitForTimeout(2000);
    this.logger.step('Clicked Home Decor category');
  }

  async clickLogin(): Promise<void> {
    await this.openUserMenu();
    await this.loginMenuItem.click();
    this.logger.step('Clicked login option');
  }

  async clickLoginOption(): Promise<void> {
    // Check if menu is already open by looking for menu items
    const isMenuOpen = await this.loginMenuItem.isVisible().catch(() => false);
    if (!isMenuOpen) {
      await this.openUserMenu();
    }
    await this.loginMenuItem.click();
    this.logger.step('Clicked login option');
  }

  async clickSignup(): Promise<void> {
    await this.openUserMenu();
    await this.signupMenuItem.click();
    this.logger.step('Clicked signup option');
  }

  async verifyHomepageElements(): Promise<void> {
    await this.verifyElementVisible(this.logo);
    await this.verifyElementVisible(this.searchBox);
    await this.verifyElementVisible(this.userButton);
    await this.verifyElementVisible(this.navigationMenu);
    this.logger.step('Essential homepage elements verified');
  }

  async isLogoVisible(): Promise<boolean> {
    return await this.logo.isVisible();
  }

  async isSearchBoxVisible(): Promise<boolean> {
    return await this.searchBox.isVisible();
  }

  async isUserButtonVisible(): Promise<boolean> {
    return await this.userButton.isVisible();
  }

  async isNavigationMenuVisible(): Promise<boolean> {
    return await this.navigationMenu.isVisible();
  }

  async isHeroSliderVisible(): Promise<boolean> {
    return await this.heroSlider.first().isVisible();
  }

  async isFeaturedProductsSectionVisible(): Promise<boolean> {
    return await this.featuredProductsSection.first().isVisible();
  }

  async getBrandLogosCount(): Promise<number> {
    return await this.brandLogos.count();
  }

  async getCategoryLinksCount(): Promise<number> {
    return await this.categoryLinks.count();
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async waitForHeroSection(): Promise<void> {
    await this.heroSlider.first().waitFor({ state: 'visible', timeout: 10000 });
  }

  async waitForNavigation(): Promise<void> {
    await this.navigationMenu.waitFor({ state: 'visible', timeout: 5000 });
  }
}
