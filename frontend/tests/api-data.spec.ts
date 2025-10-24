import { test, expect } from '@playwright/test';

test.describe('API Data Fetching', () => {
  test('should display "Data from API" heading', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('h2:has-text("Data from API")');
    await expect(heading).toBeVisible();
  });

  test('should show loading state initially', async ({ page }) => {
    // Mock a delayed API response to ensure we can see loading state
    await page.route('http://localhost:3001/api/data', async (route) => {
      // Delay the response to ensure loading state is visible
      await new Promise(resolve => setTimeout(resolve, 100));
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: []
        })
      });
    });
    
    await page.goto('/');
    
    // The loading message should appear
    const loadingText = page.locator('text=Loading data...');
    await expect(loadingText).toBeVisible();
  });

  test('should display API data when backend is available', async ({ page }) => {
    // Mock successful API response
    await page.route('http://localhost:3001/api/data', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: [
            {
              id: 1,
              title: 'Test Item 1',
              description: 'This is a test description',
              timestamp: new Date().toISOString()
            },
            {
              id: 2,
              title: 'Test Item 2',
              description: 'Another test description',
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
    });

    await page.goto('/');
    
    // Wait for the list to appear
    await expect(page.locator('ul')).toBeVisible({ timeout: 10000 });
    
    // Check that items are displayed
    const listItems = page.locator('ul li');
    await expect(listItems).toHaveCount(2);
    
    // Verify content of first item
    await expect(listItems.first()).toContainText('Test Item 1');
    await expect(listItems.first()).toContainText('This is a test description');
    await expect(listItems.first()).toContainText('ID: 1');
    
    // Verify content of second item
    await expect(listItems.nth(1)).toContainText('Test Item 2');
    await expect(listItems.nth(1)).toContainText('Another test description');
    await expect(listItems.nth(1)).toContainText('ID: 2');
  });

  test('should display error message when API fails', async ({ page }) => {
    // Mock failed API response
    await page.route('http://localhost:3001/api/data', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      });
    });

    await page.goto('/');
    
    // Wait for error message to appear
    const errorText = page.locator('text=Error:');
    await expect(errorText).toBeVisible({ timeout: 10000 });
    
    // Verify the error paragraph contains the error message
    const errorParagraph = page.locator('p', { hasText: 'Error:' });
    await expect(errorParagraph).toContainText('Failed to fetch data');
  });

  test('should display error message when network request fails', async ({ page }) => {
    // Mock network failure
    await page.route('http://localhost:3001/api/data', async (route) => {
      await route.abort('failed');
    });

    await page.goto('/');
    
    // Wait for error message to appear
    const errorText = page.locator('text=Error:');
    await expect(errorText).toBeVisible({ timeout: 10000 });
  });

  test('should not show loading state after data is loaded', async ({ page }) => {
    // Mock successful API response
    await page.route('http://localhost:3001/api/data', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: [
            {
              id: 1,
              title: 'Test Item',
              description: 'Test description',
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
    });

    await page.goto('/');
    
    // Wait for data to load
    await expect(page.locator('ul')).toBeVisible({ timeout: 10000 });
    
    // Loading message should not be visible
    const loadingText = page.locator('text=Loading data...');
    await expect(loadingText).not.toBeVisible();
  });

  test('should display data with proper structure', async ({ page }) => {
    // Mock successful API response
    await page.route('http://localhost:3001/api/data', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          data: [
            {
              id: 42,
              title: 'Sample Title',
              description: 'Sample Description',
              timestamp: new Date().toISOString()
            }
          ]
        })
      });
    });

    await page.goto('/');
    
    // Wait for the list to appear
    await expect(page.locator('ul')).toBeVisible({ timeout: 10000 });
    
    const listItem = page.locator('ul li').first();
    
    // Check for strong title
    const title = listItem.locator('strong');
    await expect(title).toContainText('Sample Title');
    
    // Check for description in paragraph
    const description = listItem.locator('p');
    await expect(description).toContainText('Sample Description');
    
    // Check for ID in small element
    const idElement = listItem.locator('small');
    await expect(idElement).toContainText('ID: 42');
  });
});
