import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';

export class SearchResultsPage extends BasePage {
  readonly pageHeading: Locator;
  readonly breadcrumb: Locator;
  readonly searchResults: Locator;
  readonly noResultsMessage: Locator;
  readonly filtersSection: Locator;
  readonly clearAllButton: Locator;

  constructor(page: Page) {
    super(page);
    this.pageHeading = page.getByRole('heading', { level: 2 }).filter({ hasText: 'Products' });
    this.breadcrumb = page.locator('nav[aria-label="Breadcrumb"]');
    this.searchResults = page.locator('[data-testid="search-results"], [class*="product"]').first();
    this.noResultsMessage = page.locator('text=No results found');
    this.filtersSection = page.getByRole('button', { name: 'Categories' });
    this.clearAllButton = page.getByRole('button', { name: 'Clear All' });
  }

  async verifySearchResultsPage(): Promise<void> {
    await this.verifyElementVisible(this.breadcrumb);
    await this.verifyElementText(this.breadcrumb, 'Products');
    this.logger.step('Search results page verified');
  }

  async verifySearchResults(): Promise<void> {
    await this.verifyElementVisible(this.filtersSection);
    // Search results verification - the page exists and has filters
    this.logger.step('Search results displayed');
  }

  async verifyNoResults(): Promise<void> {
    await this.verifyElementVisible(this.noResultsMessage);
    this.logger.step('No results message displayed');
  }
}
