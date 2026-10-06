import { test, expect } from '@playwright/test';

test.describe('Login', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('login page has the correct title', async ({ page }) => {
    // prediction: tab title is Qrius Lead Manager and visible heading is Lead Manager
    await expect(page).toHaveTitle('Qrius Lead Manager');
    await expect(page.getByRole('heading', { name: 'Lead Manager', level: 2 })).toBeVisible();
  });

  test('admin can sign in and reaches the Leads page', async ({ page }) => {
    // prediction: URL becomes /leads, heading is Leads, and the role badge is ADMIN
    await page.getByTestId('username').fill('admin.qrius');
    await page.getByTestId('password').fill('Admin@123');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL(/\/leads$/);
    await expect(page.getByRole('heading', { name: 'Leads' })).toBeVisible();
    await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
  });

  test('agent can sign in and sees their role', async ({ page }) => {
    // prediction: URL becomes /leads, heading is Leads, and the role badge is AGENT
    await page.getByTestId('username').fill('agent.qrius');
    await page.getByTestId('password').fill('Agent@123');
    await page.getByTestId('login-button').click();

    await expect(page).toHaveURL(/\/leads$/);
    await expect(page.getByRole('heading', { name: 'Leads' })).toBeVisible();
    await expect(page.getByTestId('nav-role')).toHaveText('AGENT');
  });

  test('wrong password shows an error and stays on the login page', async ({ page }) => {
    // prediction: URL remains /login, and an error message is displayed
    await page.getByTestId('username').fill('admin.qrius');
    await page.getByTestId('password').fill('WrongPassword');
    await page.getByTestId('login-button').click();

    await expect(page.getByTestId('login-error')).toHaveText('Invalid username or password');
    await expect(page).toHaveURL(/\/login$/);
  });
});