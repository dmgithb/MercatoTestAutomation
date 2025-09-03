import { chromium, FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  console.log('🚀 Starting global test setup...');

  // Create a browser instance for setup tasks
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Health check - verify the application is running
    console.log('🔍 Performing health check...');
    const baseURL = process.env.BASE_URL || 'http://qa.mercato-retailer-jupiter.local/';
    
    await page.goto(baseURL, { waitUntil: 'networkidle' });
    
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
    throw error;
  } finally {
    await context.close();
    await browser.close();
  }
}

export default globalSetup;
