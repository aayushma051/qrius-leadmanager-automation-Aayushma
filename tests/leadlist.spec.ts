import { test, expect } from '@playwright/test';

test.describe('Leads list', () => {

  test('shows the correct number of leads', async ({ page }) => {
    // prediction: the Leads page shows 12 leads
    await page.goto('/login');

    await page.getByTestId('username').fill('admin.qrius');
    await page.getByTestId('password').fill('Admin@123');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('lead-row')).toHaveCount(12);
  });

  test('shows the signed-in user role', async ({ page }) => {
    // prediction: the role badge shows ADMIN for the admin user
    await page.goto('/login');

    await page.getByTestId('username').fill('admin.qrius');
    await page.getByTestId('password').fill('Admin@123');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
  });

});