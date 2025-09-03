import { BasePage } from './base.page';
import { Page, Locator } from '@playwright/test';

export class LoginDialog extends BasePage {
  readonly dialog: Locator;
  readonly dialogTitle: Locator;
  readonly welcomeMessage: Locator;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;
  readonly forgotPasswordLink: Locator;
  readonly signUpLink: Locator;
  readonly closeButton: Locator;
  readonly emailLabel: Locator;
  readonly passwordLabel: Locator;

  constructor(page: Page) {
    super(page);
    this.dialog = page.locator('[role="dialog"]');
    this.dialogTitle = page.getByRole('heading', { name: 'Login to your account' });
    this.welcomeMessage = page.locator('text=Welcome back! It\'s great to see you again.');
    this.emailField = page.getByPlaceholder('Enter your email address');
    this.passwordField = page.getByPlaceholder('Enter your password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.forgotPasswordLink = page.getByRole('link', { name: 'Forgot password?' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.closeButton = page.locator('button').filter({ hasText: '×' });
    this.emailLabel = page.locator('text=Email Address *');
    this.passwordLabel = page.locator('text=Password *');
  }

  async waitForDialogToAppear(): Promise<void> {
    await this.waitForElement(this.dialog);
    await this.waitForElement(this.dialogTitle);
    this.logger.step('Login dialog appeared');
  }

  async fillEmail(email: string): Promise<void> {
    await this.fillField(this.emailField, email);
    this.logger.step(`Filled email field`);
  }

  async fillPassword(password: string): Promise<void> {
    await this.fillField(this.passwordField, password);
    this.logger.step('Filled password field');
  }

  async clickLoginButton(): Promise<void> {
    await this.clickElement(this.loginButton);
    this.logger.step('Clicked login button');
  }

  async clickForgotPassword(): Promise<void> {
    await this.clickElement(this.forgotPasswordLink);
    this.logger.step('Clicked forgot password link');
  }

  async clickSignUp(): Promise<void> {
    await this.clickElement(this.signUpLink);
    this.logger.step('Clicked sign up link');
  }

  async closeDialog(): Promise<void> {
    await this.clickElement(this.closeButton);
    this.logger.step('Closed login dialog');
  }

  async verifyDialogElements(): Promise<void> {
    await this.verifyElementVisible(this.dialogTitle);
    await this.verifyElementVisible(this.emailField);
    await this.verifyElementVisible(this.passwordField);
    await this.verifyElementVisible(this.loginButton);
    await this.verifyElementVisible(this.forgotPasswordLink);
    await this.verifyElementVisible(this.signUpLink);
    this.logger.step('All login dialog elements verified');
  }

  async performLogin(email: string, password: string): Promise<void> {
    await this.fillEmail(email);
    await this.fillPassword(password);
    await this.clickLoginButton();
    this.logger.step('Performed login attempt');
  }
}
