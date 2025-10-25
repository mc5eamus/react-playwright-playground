import { test, expect } from '@playwright/test';

test.describe('Counter Functionality', () => {
  test('should display counter button with initial count of 0', async ({ page }) => {
    await page.goto('/');
    
    const counterButton = page.locator('button:has-text("count is")');
    await expect(counterButton).toBeVisible();
    await expect(counterButton).toContainText('count is 0');
  });

  test('should increment counter when button is clicked', async ({ page }) => {
    await page.goto('/');
    
    const counterButton = page.locator('button:has-text("count is")');
    
    // Initial state
    await expect(counterButton).toContainText('count is 0');
    
    // Click once
    await counterButton.click();
    await expect(counterButton).toContainText('count is 1');
    
    // Click twice more
    await counterButton.click();
    await expect(counterButton).toContainText('count is 2');
    
    await counterButton.click();
    await expect(counterButton).toContainText('count is 3');
  });

  test('should maintain counter state during multiple clicks', async ({ page }) => {
    await page.goto('/');
    
    const counterButton = page.locator('button:has-text("count is")');
    
    // Click 5 times
    for (let i = 0; i < 5; i++) {
      await counterButton.click();
    }
    
    await expect(counterButton).toContainText('count is 5');
  });

  test('counter should be interactive and clickable', async ({ page }) => {
    await page.goto('/');
    
    const counterButton = page.locator('button:has-text("count is")');
    await expect(counterButton).toBeEnabled();
  });
});
