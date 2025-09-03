import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';

export class CategoryPage extends BasePage {
  readonly pageHeading: Locator;
  readonly breadcrumb: Locator;
  readonly filtersSection: Locator;
  readonly categoryFilter: Locator;
  readonly brandFilter: Locator;
  readonly dimensionFilter: Locator;
  readonly clearAllButton: Locator;
  readonly productGrid: Locator;
  readonly productCards: Locator;
  readonly paginationInfo: Locator;
  readonly paginationButtons: Locator;
  readonly nextPageButton: Locator;
  readonly previousPageButton: Locator;
  readonly sortingOptions: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { level: 2 }).first();
    this.breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    this.filtersSection = page.getByRole('button', { name: 'Categories' });
    this.categoryFilter = page.getByRole('button', { name: 'Categories' });
    this.brandFilter = page.getByRole('button', { name: 'Brands' });
    this.dimensionFilter = page.getByRole('button', { name: 'Dimension' });
    this.clearAllButton = page.getByRole('button', { name: 'Clear All' });
    this.productGrid = page.locator('[class*="productGrid"], [data-testid="product-grid"]').first();
    this.productCards = page.locator('[class*="product"], [data-testid="product-card"]');
    this.paginationInfo = page.locator('text=Showing').first();
    this.paginationButtons = page.locator('button').filter({ hasText: /^[0-9]+$/ }).first();
    this.nextPageButton = page.getByRole('button', { name: 'Next page' });
    this.previousPageButton = page.getByRole('button', { name: 'Previous page' });
    this.sortingOptions = page.locator('[data-testid="sort-options"]');
  }

  async verifyCategoryPageElements(): Promise<void> {
    await this.verifyElementVisible(this.pageHeading);
    await this.verifyElementVisible(this.breadcrumb);
    await this.verifyElementVisible(this.filtersSection);
    this.logger.step('Category page elements verified');
  }

  async clickCategoryFilter(categoryName: string): Promise<void> {
    await this.page.getByRole('link', { name: categoryName }).click();
    this.logger.step(`Clicked category filter: ${categoryName}`);
  }

  async clickBrandFilter(brandName: string): Promise<void> {
    // Target the brand filter specifically in the filter section to avoid strict mode violations
    // Use the exact text from the website: "Ambella Home (365)"
    await this.page.getByRole('link', { name: `${brandName} (365)` }).click();
    this.logger.step(`Clicked brand filter: ${brandName}`);
  }

  async clearAllFilters(): Promise<void> {
    await this.clickElement(this.clearAllButton);
    this.logger.step('Cleared all filters');
  }

  async getProductCount(): Promise<string> {
    const text = await this.paginationInfo.textContent();
    this.logger.step(`Product count: ${text}`);
    return text || '';
  }

  async clickNextPage(): Promise<void> {
    await this.clickElement(this.nextPageButton);
    this.logger.step('Clicked next page');
  }

  async clickPreviousPage(): Promise<void> {
    await this.clickElement(this.previousPageButton);
    this.logger.step('Clicked previous page');
  }
}
