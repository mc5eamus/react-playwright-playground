# Playwright Tests

This directory contains end-to-end tests for the frontend application using Playwright.

## Test Structure

- `basic-ui.spec.ts` - Tests for basic UI elements (logos, headings, links)
- `counter.spec.ts` - Tests for the counter button functionality
- `api-data.spec.ts` - Tests for API data fetching, loading states, and error handling

## Running Tests

### Prerequisites

First, install Playwright browsers (only needed once):

```bash
npx playwright install
```

Or install with system dependencies:

```bash
npx playwright install --with-deps
```

### Running Tests

Run all tests in headless mode:
```bash
npm test
```

Run tests with UI mode (interactive):
```bash
npm run test:ui
```

Run tests in headed mode (see browser):
```bash
npm run test:headed
```

Run tests in debug mode:
```bash
npm run test:debug
```

View test report:
```bash
npm run test:report
```

### Running Specific Tests

Run a specific test file:
```bash
npx playwright test tests/counter.spec.ts
```

Run tests matching a pattern:
```bash
npx playwright test --grep "counter"
```

## Test Configuration

Tests are configured in `playwright.config.ts` with the following settings:

- **Base URL**: http://localhost:5173 (Vite dev server)
- **Browsers**: Chromium, Firefox, and WebKit
- **Auto-start dev server**: The Vite dev server starts automatically before tests
- **Retries**: 2 retries on CI, 0 locally
- **Screenshots**: Captured on test failure
- **Traces**: Captured on first retry

## Writing Tests

Tests follow Playwright best practices:

1. Use semantic selectors (text content, roles, labels)
2. Wait for elements to be visible/stable before interacting
3. Use `expect()` assertions for validation
4. Mock API responses for consistent testing
5. Test both success and error scenarios

## CI/CD Integration

To run tests in CI/CD:

1. Install dependencies: `npm ci`
2. Install Playwright browsers: `npx playwright install --with-deps`
3. Run tests: `npm test`

The configuration automatically optimizes for CI environments (no parallel execution, more retries).

## Test Coverage

Current tests cover:

- ✅ Basic UI rendering (logos, headings, text)
- ✅ External links
- ✅ Counter button functionality
- ✅ API data fetching with mocked responses
- ✅ Loading states
- ✅ Error handling
- ✅ Data structure validation
