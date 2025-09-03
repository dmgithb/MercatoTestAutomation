import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');

  // Skip health check in CI environment if BASE_URL is not accessible
  if (process.env.CI && !process.env.BASE_URL) {
    console.log('🔄 CI environment detected without custom BASE_URL - skipping health check');
    console.log('✅ Global setup completed (CI mode)');
    return;
  }

  // Create a browser instance for setup tasks
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Health check - verify the application is running
    console.log('🔍 Performing health check...');
    const baseURL = process.env.BASE_URL || 'http://qa.mercato-retailer-jupiter.local/';
    
    // Set a shorter timeout for CI environments
    const timeout = process.env.CI ? 10000 : 30000;
    
    await page.goto(baseURL, { 
      waitUntil: 'domcontentloaded',
      timeout: timeout 
    });
    
    // Verify the page loads successfully
    const title = await page.title();
    console.log(`✅ Application is running. Page title: ${title}`);

    // Check if we can access key elements
    const bodyExists = await page.locator('body').isVisible();
    if (!bodyExists) {
      throw new Error('❌ Application body is not visible');
    }

    // Optional: Set up test data or perform any global initialization
    console.log('📋 Setting up test environment...');
    
    // Create storage state for authentication (if needed)
    if (process.env.SETUP_AUTH === 'true') {
      console.log('🔐 Setting up authentication state...');
      // Add authentication setup logic here if needed
    }

    console.log('✅ Global setup completed successfully');
    
  } catch (error) {
    console.error('❌ Global setup failed:', error);
    
    // In CI, if health check fails, we can continue with tests
    // but warn about potential issues
    if (process.env.CI) {
      console.log('⚠️ Health check failed in CI - continuing with tests (may fail if app not accessible)');
    } else {
      throw error;
    }
  } finally {
    await context.close();
    await browser.close();
  }
}

export default globalSetup;
