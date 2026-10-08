import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { admin, agent } from '../test-data/users';

test.describe('Leads List', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('shows the correct number of leads after signing in', async ({ page }) => {
    // Prediction: 12 leads should be displayed after signing in.
    await loginPage.login(admin);

    await expect(page.getByTestId('lead-row')).toHaveCount(12);
  });

  test('role badge shows ADMIN for admin user', async ({ page }) => {
    // Prediction: the role badge should show ADMIN.
    await loginPage.login(admin);

    await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
  });

  test('role badge shows AGENT for agent user', async ({ page }) => {
    // Prediction: the role badge should show AGENT.
    await loginPage.login(agent);

    await expect(page.getByTestId('nav-role')).toHaveText('AGENT');
  });
});