import { test, expect } from '@playwright/test';

test.describe('Basic UI Elements', () => {
  test('should display the page title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle('frontend');
  });

  test('should display Vite and React logos', async ({ page }) => {
    await page.goto('/');
    
    // Check for Vite logo
    const viteLogo = page.locator('img[alt="Vite logo"]');
    await expect(viteLogo).toBeVisible();
    
    // Check for React logo
    const reactLogo = page.locator('img[alt="React logo"]');
    await expect(reactLogo).toBeVisible();
  });

  test('should display main heading', async ({ page }) => {
    await page.goto('/');
    
    const heading = page.locator('h1:has-text("Vite + React")');
    await expect(heading).toBeVisible();
  });

  test('should display HMR instruction text', async ({ page }) => {
    await page.goto('/');
    
    const instructionText = page.locator('text=Edit').first();
    await expect(instructionText).toBeVisible();
    
    const codeElement = page.locator('code:has-text("src/App.tsx")');
    await expect(codeElement).toBeVisible();
  });

  test('should display footer text', async ({ page }) => {
    await page.goto('/');
    
    const footer = page.locator('.read-the-docs');
    await expect(footer).toBeVisible();
    await expect(footer).toContainText('Click on the Vite and React logos to learn more');
  });
});

test.describe('External Links', () => {
  test('should have working link to Vite documentation', async ({ page }) => {
    await page.goto('/');
    
    const viteLink = page.locator('a[href="https://vite.dev"]');
    await expect(viteLink).toBeVisible();
    await expect(viteLink).toHaveAttribute('target', '_blank');
  });

  test('should have working link to React documentation', async ({ page }) => {
    await page.goto('/');
    
    const reactLink = page.locator('a[href="https://react.dev"]');
    await expect(reactLink).toBeVisible();
    await expect(reactLink).toHaveAttribute('target', '_blank');
  });
});
