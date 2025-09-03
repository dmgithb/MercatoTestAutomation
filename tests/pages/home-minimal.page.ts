import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';

export class HomePage extends BasePage {
  readonly logo: Locator;
  readonly searchBox: Locator;
  readonly userButton: Locator;

  constructor(page: Page) {
    super(page);
    this.logo = page.locator('a[href="/"]').filter({ hasText: 'Jupiter' });
    this.searchBox = page.getByPlaceholder('Find products by name or sku...');
    this.userButton = page.getByRole('button', { name: 'User' });
  }

  async navigateToHomePage(): Promise<void> {
    await this.navigateTo('http://qa.mercato-retailer-jupiter.local/');
    this.logger.step('Navigated to Jupiter homepage');
  }

  async verifyHomepageElements(): Promise<void> {
    await this.verifyElementVisible(this.logo);
    await this.verifyElementVisible(this.searchBox);
    await this.verifyElementVisible(this.userButton);
    this.logger.step('Essential homepage elements verified');
  }
}
