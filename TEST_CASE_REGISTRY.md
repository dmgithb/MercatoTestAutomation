# Test Case Registry - Mercato Jupiter Automation

This document provides a complete overview of all test cases in the Mercato Jupiter test automation framework.

## Test Case ID Naming Convention

- **TC-AUTH-XXX**: Authentication and user management tests
- **TC-BASIC-XXX**: Basic functionality verification tests  
- **TC-CAT-XXX**: Category navigation and product browsing tests
- **TC-CORE-XXX**: Core functionality integration tests
- **TC-HOME-XXX**: Homepage critical functionality tests
- **TC-SETUP-XXX**: Setup and configuration validation tests

---

## Authentication Tests (@critical)
**File**: `tests/specs/authentication.critical.spec.ts`

| Test Case ID | Test Name | Priority | Description |
|-------------|-----------|----------|-------------|
| TC-AUTH-001 | Login dialog displays correctly | Critical | Verifies login dialog appears with all required elements |
| TC-AUTH-002 | Login form accepts user input | Critical | Validates user can enter credentials in login form |
| TC-AUTH-003 | Login form validation for empty fields | Critical | Tests form validation behavior with empty fields |
| TC-AUTH-004 | Forgot password link navigation | Critical | Verifies forgot password link redirects correctly |
| TC-AUTH-005 | Sign up link navigation | Critical | Verifies sign up link redirects correctly |

---

## Basic Functionality Tests (@smoke)
**File**: `tests/specs/basic-functionality.smoke.spec.ts`

| Test Case ID | Test Name | Priority | Description |
|-------------|-----------|----------|-------------|
| TC-BASIC-001 | Homepage accessibility and basic elements | Smoke | Verifies homepage loads with essential elements |
| TC-BASIC-002 | User menu and login dialog | Smoke | Tests user menu access and login dialog opening |
| TC-BASIC-003 | Search functionality | Smoke | Validates basic search functionality works |
| TC-BASIC-004 | Category navigation | Smoke | Tests navigation to product categories |

---

## Category Navigation Tests (@smoke)
**File**: `tests/specs/category-navigation.smoke.spec.ts`

| Test Case ID | Test Name | Priority | Description |
|-------------|-----------|----------|-------------|
| TC-CAT-001 | Living Room category page loads correctly | Smoke | Verifies category page loads with proper elements |
| TC-CAT-002 | Category filters are functional | Smoke | Tests filter functionality on category pages |
| TC-CAT-003 | Search functionality with different terms | Smoke | Validates search works with multiple terms |
| TC-CAT-004 | Product pagination functionality | Regression | Tests pagination on product listing pages |

---

## Core Functionality Tests (@smoke)
**File**: `tests/specs/core-functionality.fixed.spec.ts`

| Test Case ID | Test Name | Priority | Description |
|-------------|-----------|----------|-------------|
| TC-CORE-001 | Homepage loads correctly | Smoke | Verifies homepage loading and element verification |
| TC-CORE-002 | User menu and login dialog work | Smoke | Tests user authentication flow |
| TC-CORE-003 | Search functionality works | Smoke | Validates search functionality |
| TC-CORE-004 | Category navigation works | Smoke | Tests category navigation functionality |
| TC-CORE-005 | Basic filter visibility | Smoke | Verifies filters are visible on category pages |

---

## Homepage Critical Tests (@critical)
**File**: `tests/specs/homepage.critical.spec.ts`

| Test Case ID | Test Name | Priority | Description |
|-------------|-----------|----------|-------------|
| TC-HOME-001 | Homepage loads with all essential elements | Critical | Comprehensive homepage element verification |
| TC-HOME-002 | Product search functionality works correctly | Critical | Critical path search functionality testing |
| TC-HOME-003 | User menu and login dialog functionality | Critical | Critical user authentication flow |
| TC-HOME-004 | Navigation menu categories are functional | Critical | Tests all main navigation categories |

---

## Setup and Configuration Tests
**Files**: `tests/specs/simple.test.ts`, `tests/specs/test-homepage.test.ts`

| Test Case ID | Test Name | Priority | Description |
|-------------|-----------|----------|-------------|
| TC-SETUP-001 | Simple test to check setup | Setup | Basic connectivity and setup verification |
| TC-SETUP-002 | Test minimal HomePage | Setup | Minimal homepage functionality test |

---

## Test Execution Summary

- **Total Test Cases**: 24
- **Critical Tests**: 9 
- **Smoke Tests**: 13
- **Regression Tests**: 1
- **Setup Tests**: 2

## Test Coverage Areas

1. **User Authentication** (5 tests)
2. **Homepage Functionality** (8 tests)
3. **Search Functionality** (4 tests)
4. **Category Navigation** (4 tests)
5. **Filter Operations** (2 tests)
6. **Setup Validation** (2 tests)

---

## Usage Guidelines

### Running Tests by Priority
```bash
# Run all critical tests
npx playwright test --grep "@critical"

# Run all smoke tests  
npx playwright test --grep "@smoke"

# Run regression tests
npx playwright test --grep "@regression"
```

### Running Tests by Category
```bash
# Run authentication tests
npx playwright test --grep "TC-AUTH"

# Run homepage tests
npx playwright test --grep "TC-HOME"

# Run category tests
npx playwright test --grep "TC-CAT"
```

### Running Specific Test Cases
```bash
# Run specific test case
npx playwright test --grep "TC-AUTH-001"

# Run multiple specific test cases
npx playwright test --grep "TC-AUTH-001|TC-HOME-002"
```

---

## Maintenance Notes

- Test Case IDs should not be changed once assigned
- New tests should follow the established naming convention
- Update this registry when adding new test cases
- Regular review of test coverage and priorities recommended

Last Updated: September 2, 2025
