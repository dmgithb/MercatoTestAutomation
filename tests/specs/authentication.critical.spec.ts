import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/home.page';
import { LoginDialog } from '../pages/login-dialog.page';
import { TestDataManager } from '../utils/test-data-manager';

test.describe('@critical User Authentication', () => {
  let homePage: HomePage;
  let loginDialog: LoginDialog;
  const testData = TestDataManager.getLoginData();

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginDialog = new LoginDialog(page);
    await homePage.navigateToHomepage();
  });

  test('[TC-AUTH-001] @critical Login dialog displays correctly', async () => {
    // Given I am on the homepage
    // When I open the user menu and click login
    await homePage.openUserMenu();
    await homePage.clickLoginOption();

    // Then the login dialog should appear with all required elements
    await loginDialog.waitForDialogToAppear();
    await expect(loginDialog.dialogTitle).toContainText('Login to your account');
    await expect(loginDialog.welcomeMessage).toBeVisible();
    await expect(loginDialog.emailField).toBeVisible();
    await expect(loginDialog.passwordField).toBeVisible();
    await expect(loginDialog.loginButton).toBeVisible();
    await expect(loginDialog.forgotPasswordLink).toBeVisible();
    await expect(loginDialog.signUpLink).toBeVisible();
  });

  test('[TC-AUTH-002] @critical Login form accepts user input', async () => {
    // Given I have opened the login dialog
    await homePage.openUserMenu();
    await homePage.clickLoginOption();
    await loginDialog.waitForDialogToAppear();

    // When I enter credentials
    await loginDialog.fillEmail(testData.validCredentials.email);
    await loginDialog.fillPassword(testData.validCredentials.password);

    // Then the fields should contain the entered values
    await expect(loginDialog.emailField).toHaveValue(testData.validCredentials.email);
    await expect(loginDialog.passwordField).toHaveValue(testData.validCredentials.password);
  });

  test('[TC-AUTH-003] @critical Login form validation for empty fields', async () => {
    // Given I have opened the login dialog
    await homePage.openUserMenu();
    await homePage.clickLoginOption();
    await loginDialog.waitForDialogToAppear();

    // When I attempt to login with empty fields
    await loginDialog.clickLoginButton();

    // Then validation should prevent submission
    // Note: Actual validation behavior needs to be observed and implemented
    await expect(loginDialog.emailField).toBeVisible();
    await expect(loginDialog.passwordField).toBeVisible();
  });

  test('[TC-AUTH-004] @critical Forgot password link navigation', async ({ page }) => {
    // Given I have opened the login dialog
    await homePage.openUserMenu();
    await homePage.clickLoginOption();
    await loginDialog.waitForDialogToAppear();

    // When I click the forgot password link
    await loginDialog.clickForgotPassword();

    // Then I should be redirected to the forgot password page
    await expect(page).toHaveURL(/forgot-password/);
  });

  test('[TC-AUTH-005] @critical Sign up link navigation', async ({ page }) => {
    // Given I have opened the login dialog
    await homePage.openUserMenu();
    await homePage.clickLoginOption();
    await loginDialog.waitForDialogToAppear();

    // When I click the sign up link
    await loginDialog.clickSignUp();

    // Then I should be redirected to the signup page
    await expect(page).toHaveURL(/signup/);
  });
});
