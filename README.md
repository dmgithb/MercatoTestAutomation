# Mercato Jupiter Test Automation Framework

A comprehensive end-to-end test automation framework built with Playwright, TypeScript, and modern DevOps practices for the Mercato Jupiter retail platform.

## 🚀 Features

- **Cross-browser Testing**: Chrome, Firefox, Safari, Edge, Mobile browsers
- **Comprehensive Test Coverage**: 24 test cases across 6 categories with systematic test case IDs
- **CI/CD Integration**: GitHub Actions pipeline with parallel execution and sharding
- **Docker Support**: Containerized testing environment for consistent execution
- **Advanced Reporting**: HTML, JSON, JUnit, and GitHub Action reports
- **Test Case Management**: Systematic TC-XXX-### format for tracking and filtering
- **Environment Configuration**: Flexible configuration for different environments
- **Visual Testing**: Screenshot and video capture on failures with trace files
- **Performance Monitoring**: Built-in performance tracking and thresholds
- **Global Setup/Teardown**: Automated environment validation and cleanup

## 📁 Project Structure

```
mercato_Automation/
├── tests/
│   ├── specs/                      # Test specification files
│   │   ├── auth.spec.ts           # Authentication tests (TC-AUTH-001 to TC-AUTH-005)
│   │   ├── basic.spec.ts          # Basic functionality tests (TC-BASIC-001 to TC-BASIC-004)
│   │   ├── categories.spec.ts     # Category navigation tests (TC-CAT-001 to TC-CAT-004)
│   │   ├── core.spec.ts           # Core functionality tests (TC-CORE-001 to TC-CORE-004)
│   │   ├── homepage.spec.ts       # Homepage tests (TC-HOME-001 to TC-HOME-004)
│   │   └── setup.spec.ts          # Setup validation tests (TC-SETUP-001 to TC-SETUP-002)
│   ├── utils/                     # Utility files
│   │   ├── global-setup.ts        # Global test setup and health checks
│   │   └── global-teardown.ts     # Global test cleanup and archiving
│   └── page-objects/              # Page object models (if applicable)
├── .github/
│   └── workflows/
│       └── playwright-tests.yml   # Comprehensive CI/CD pipeline
├── docker/                        # Docker configuration
│   ├── Dockerfile                 # Test execution container
│   └── docker-compose.yml         # Multi-service test environment
├── test-results/                  # Test execution results and artifacts
├── playwright-report/             # Interactive HTML test reports
├── .env.example                   # Environment variables template
├── playwright.config.ts           # Enhanced Playwright configuration
└── package.json                   # 35+ npm scripts for comprehensive test management
```

## 🛠 Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git
- Docker (optional, for containerized testing)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mercato_Automation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Playwright browsers**
   ```bash
   npx playwright install
   ```

4. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

## 🎯 Test Execution

### Local Development

```bash
# Run all tests
npm test

# Run specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit
npm run test:edge

# Run by category with test case IDs
npm run test:auth          # Authentication tests (TC-AUTH-001 to TC-AUTH-005)
npm run test:homepage      # Homepage tests (TC-HOME-001 to TC-HOME-004)
npm run test:categories    # Category tests (TC-CAT-001 to TC-CAT-004)
npm run test:core          # Core functionality (TC-CORE-001 to TC-CORE-004)
npm run test:basic         # Basic functionality (TC-BASIC-001 to TC-BASIC-004)
npm run test:setup         # Setup tests (TC-SETUP-001 to TC-SETUP-002)

# Run critical tests only
npm run test:critical

# Run with specific test case ID
npx playwright test --grep "TC-AUTH-001"
npx playwright test --grep "TC-HOME-002"

# Debug and development
npm run test:debug         # Debug specific tests
npm run test:headed        # Run with visible browser
npm run test:step          # Step through tests
```

### CI/CD Execution

```bash
# Full CI pipeline
npm run ci:full

# Quick smoke tests
npm run ci:smoke

# Critical tests only
npm run ci:critical

# Health check
## 🐳 Docker Support

### Build and Run with Docker

```bash
# Build the test container
docker build -t mercato-tests .

# Run tests in container
docker run --rm -v $(pwd)/test-results:/app/test-results mercato-tests

# Use docker-compose for full environment
docker-compose up --build

# Run specific test category in Docker
docker-compose run playwright-tests npm run test:auth
```

### Docker Services

- **playwright-tests**: Main test execution service with full Playwright environment
- **report-server**: Serves HTML reports on port 9323 for easy access
- **test-data-setup**: Prepares test data and environment (if applicable)

## 📊 Test Categories & Test Case IDs

### Authentication Tests (TC-AUTH)
- **TC-AUTH-001**: Valid login functionality and session creation
- **TC-AUTH-002**: Invalid login handling and error messages
- **TC-AUTH-003**: Logout functionality and session cleanup
- **TC-AUTH-004**: Session management and timeout handling
- **TC-AUTH-005**: Password reset flow and email validation

### Homepage Tests (TC-HOME)
- **TC-HOME-001**: Page load verification and performance
- **TC-HOME-002**: Logo and branding display validation
- **TC-HOME-003**: Search functionality and autocomplete
- **TC-HOME-004**: Main navigation menu and dropdown menus

### Category Tests (TC-CAT)
- **TC-CAT-001**: Category page navigation and URL validation
- **TC-CAT-002**: Category filtering and sort functionality
- **TC-CAT-003**: Product display in categories and pagination
- **TC-CAT-004**: Category breadcrumbs and navigation

### Core Functionality (TC-CORE)
- **TC-CORE-001**: Product search and results display
- **TC-CORE-002**: Product detail page and image gallery
- **TC-CORE-003**: Shopping cart operations and calculations
- **TC-CORE-004**: Checkout process and form validation

### Basic Functionality (TC-BASIC)
- **TC-BASIC-001**: Page responsiveness and mobile compatibility
- **TC-BASIC-002**: Cross-browser compatibility testing
- **TC-BASIC-003**: Error handling and user feedback
- **TC-BASIC-004**: Performance baseline and load times

### Setup Tests (TC-SETUP)
- **TC-SETUP-001**: Environment validation and connectivity
- **TC-SETUP-002**: Configuration verification and dependencies

## 🔧 Configuration

### Environment Variables

Create a `.env` file based on `.env.example`:

```bash
# Application Configuration
BASE_URL=http://qa.mercato-retailer-jupiter.local/
HEADLESS=true
NODE_ENV=test

# Test Execution Settings
PARALLEL_WORKERS=1
CI_PARALLEL_JOBS=3
RETRY_COUNT=1
CI_RETRY_COUNT=2
TEST_TIMEOUT=60000

# Media Capture Settings
TRACE=on-first-retry
SCREENSHOT=only-on-failure
VIDEO=retain-on-failure

# Visual Testing Configuration
VISUAL_THRESHOLD=0.2
VIEWPORT_WIDTH=1920
VIEWPORT_HEIGHT=1080

# Performance Settings
SLOW_MO=0

# CI/CD Configuration
CI=false

# Optional Features
SETUP_AUTH=false
GENERATE_SUMMARY=true
CLEANUP_MEDIA=true
```

### Playwright Configuration Features

The enhanced `playwright.config.ts` includes:

- **Multi-browser support**: Chrome, Firefox, Safari, Edge, mobile browsers
- **Environment-based configuration**: Different settings for CI vs local development
- **Advanced reporting**: Multiple report formats with conditional outputs
- **Global setup/teardown**: Automated health checks and cleanup
- **Type-safe configuration**: TypeScript validation for all settings
- **Performance monitoring**: Configurable timeouts and thresholds

### CI Environment Compatibility

The framework intelligently handles different execution environments:

#### **Local Development Environment**
- Full health checks with local BASE_URL (`qa.mercato-retailer-jupiter.local`)
- Extended timeouts for debugging and development
- Visual browser mode available for test development

#### **CI/CD Environment**
- Automatic CI environment detection (`process.env.CI`)
- Graceful handling of inaccessible local development URLs
- Skip global setup with `SKIP_GLOBAL_SETUP=true` environment variable
- Shorter timeouts optimized for CI performance
- Headless browser execution for better resource utilization

#### **Environment Variables for CI**

```bash
# Skip global setup in CI environments
SKIP_GLOBAL_SETUP=true

# CI environment indicator
CI=true

# Optional: Use demo URL for CI testing when local URLs not accessible
# BASE_URL=https://demo.playwright.dev/

# CI optimizations
HEADLESS=true
TIMEOUT=30000
```

The framework automatically detects CI environments and:
- ✅ Continues gracefully when health checks fail
- ✅ Uses shorter timeouts for better performance  
- ✅ Skips local development URL dependencies
- ✅ Provides detailed logging for CI troubleshooting

## 📈 CI/CD Pipeline

### GitHub Actions Workflow

The comprehensive pipeline includes multiple specialized jobs:

#### 1. **Setup Validation** (`setup-validation`)
- Environment validation and health checks
- Dependency verification and security scanning
- Configuration validation and test discovery

#### 2. **Critical Tests** (`critical-tests`)
- Authentication flow validation (TC-AUTH-001 to TC-AUTH-005)
- Core user journeys (TC-CORE-001 to TC-CORE-004)
- Essential functionality verification

#### 3. **Full Test Suite** (`full-test-suite`)
- Comprehensive cross-browser testing (8 browser configurations)
- Parallel execution with intelligent sharding
- Mobile device testing (iPhone, Android)
- High-resolution display testing

#### 4. **Smoke Tests** (`smoke-tests`)
- Quick validation tests for deployment readiness
- Performance baseline verification
- Basic functionality smoke tests

#### 5. **Report Generation** (`generate-report`)
- Consolidated test reports from all jobs
- Artifact collection and archiving
- Slack/Teams notification integration
- Performance metrics collection

### Pipeline Triggers and Strategy

- **Pull Requests**: Critical tests + smoke tests (fast feedback)
- **Main Branch Push**: Full test suite (comprehensive validation)
- **Scheduled Runs**: Daily full regression at 2 AM UTC
- **Manual Triggers**: On-demand execution with parameter selection

### Parallel Execution and Sharding

```yaml
strategy:
  matrix:
    shard: [1/4, 2/4, 3/4, 4/4]
    browser: [chromium, firefox, webkit, edge]
```

## 📝 Reporting and Analytics

### Available Report Formats

1. **Interactive HTML Report**: 
   - Detailed test execution dashboard
   - Screenshots and videos for failures
   - Performance metrics and trends

2. **JSON Report**: 
   - Machine-readable format for integrations
   - API consumption for dashboards
   - Historical data analysis

3. **JUnit Report**: 
   - Compatible with CI/CD systems
   - Test management tool integration
   - Coverage and quality metrics

4. **GitHub Actions Integration**: 
   - Native GitHub UI integration
   - Pull request status checks
   - Workflow run summaries

5. **Blob Report**: 
   - Merging parallel execution results
   - Distributed test execution support

### Accessing and Managing Reports

```bash
# Open latest HTML report
npm run report:open

# Generate custom report with filtering
npm run report:generate

# Serve reports locally for team access
npm run report:serve

# Archive old reports
npm run report:archive

# Generate performance summary
npm run report:performance
```

## 🔍 Debugging and Troubleshooting

### Debug Commands and Tools

```bash
# Debug specific test case by ID
npm run test:debug -- --grep "TC-AUTH-001"

# Run with browser visible (headed mode)
npm run test:headed

# Step through tests interactively
npm run test:step

# Generate detailed trace files
TRACE=on npm test

# Use Playwright Inspector UI
npm run test:ui

# Debug with specific browser
npm run test:debug:chromium
```

### Common Issues and Solutions

1. **Test Failures**: 
   - Check screenshots and videos in `test-results/`
   - Review trace files for detailed execution steps
   - Verify element selectors haven't changed

2. **Environment Issues**: 
   - Validate `.env` configuration
   - Check application availability with health check
   - Verify network connectivity and permissions

3. **Browser Issues**: 
   - Run `npx playwright install` to update browsers
   - Clear browser cache and data
   - Check for browser version compatibility

4. **CI/CD Pipeline Issues**: 
   - Review GitHub Actions logs and artifacts
   - Check environment variable configuration
   - Verify Docker container permissions

### Performance Monitoring

```bash
# Run performance baseline tests
npm run test:performance

# Monitor test execution times
npm run test:timing

# Generate performance report
npm run report:performance
```

### Example:
```typescript
// ✅ Correct - Use environment variables
const email = process.env.TEST_USER_EMAIL;

// ❌ Wrong - Never hardcode credentials
const email = "admin@company.com";
```

## 📊 Test Coverage

### Core Functionality Tested
- ✅ Homepage loading and navigation
- ✅ Product search and results
- ✅ User authentication flows
- ✅ Category browsing and filtering
- ✅ Product pagination
- ✅ Menu interactions and dialogs

### Page Objects Implemented
- ✅ BasePage - Common functionality
- ✅ HomePage - Homepage interactions
- ✅ LoginDialog - Authentication flows
- ✅ CategoryPage - Product browsing
- ✅ SearchResultsPage - Search functionality

## 🎨 Page Object Model Implementation

### Base Page Pattern
```typescript
export abstract class BasePage {
  protected page: Page;
  protected logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger();
  }

  async navigateTo(url: string): Promise<void> {
    await this.page.goto(url);
    this.logger.step(`Navigated to: ${url}`);
  }
}
```

### Test Structure
```typescript
test('@critical Feature description', async () => {
  // Given - Setup condition
  await homePage.navigateToHomepage();
  
  // When - Perform action
  await homePage.performSearch('sofa');
  
  // Then - Verify result
  await expect(searchResultsPage.pageHeading).toBeVisible();
});
```

## 📝 Contributing Guidelines

### Adding New Tests
1. Follow BDD structure (Given-When-Then)
2. Use appropriate priority tags (@critical, @smoke, @regression)
3. Implement proper logging with Logger utility
4. Follow secure data patterns with TestDataManager
5. Extend existing page objects or create new ones as needed

### Code Standards
- TypeScript for type safety
- ESLint configuration for code quality
- Prettier for code formatting
- Meaningful test and method names
- Proper error handling and logging

## 🚀 CI/CD Integration

### Environment Variables for CI
```bash
BASE_URL=http://qa.mercato-retailer-jupiter.local/
HEADLESS=true
TEST_USER_EMAIL=your-test-email
TEST_USER_PASSWORD=your-test-password
```

### Parallel Execution
Tests are configured for parallel execution with appropriate workers based on environment (CI vs local).

## 📞 Support

For questions or issues with the test suite:
1. Check the test execution reports
2. Review the logs for detailed step information
3. Ensure environment variables are properly configured
4. Verify the application is accessible at the configured BASE_URL

## 📈 Test Metrics

- **Total Test Cases**: 8 tests
- **Critical Tests**: 4 tests (Homepage, Search, Authentication, Navigation)
- **Smoke Tests**: 3 tests (Category browsing, Filters, Search variations)
- **Regression Tests**: 1 test (Pagination functionality)
- **Expected Execution Time**: 
  - Critical: 2-3 minutes
  - Smoke: 5-10 minutes  
  - Regression: 20-30 minutes
- **Browser Coverage**: Chrome, Firefox, Safari, Mobile Chrome, Mobile Safari
