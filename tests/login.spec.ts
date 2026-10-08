import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { admin, agent, wrongPasswordUser } from '../test-data/users';

test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('login page has the correct title', async () => {
    // Prediction: the page title is Qrius Lead Manager
    // and the Lead Manager heading is visible.
    await expect(loginPage.page).toHaveTitle('Qrius Lead Manager');
    await expect(loginPage.heading).toBeVisible();
  });

  test('admin can sign in and reaches the Leads page', async ({ page }) => {
    // Prediction: admin is redirected to /leads
    // and the ADMIN role is displayed.
    await loginPage.login(admin);

    await expect(page).toHaveURL(/\/leads$/);
    await expect(page.getByRole('heading', { name: 'Leads' })).toBeVisible();
    await expect(page.getByTestId('nav-role')).toHaveText('ADMIN');
  });

  test('agent can sign in and sees their role', async ({ page }) => {
    // Prediction: agent is redirected to /leads
    // and the AGENT role is displayed.
    await loginPage.login(agent);

    await expect(page).toHaveURL(/\/leads$/);
    await expect(page.getByRole('heading', { name: 'Leads' })).toBeVisible();
    await expect(page.getByTestId('nav-role')).toHaveText('AGENT');
  });

  test('wrong password shows an error and stays on the login page', async ({ page }) => {
    // Prediction: the login error is displayed
    // and the user remains on /login.
    await loginPage.login(wrongPasswordUser);

    await expect(loginPage.errorMessage).toHaveText(
      'Invalid username or password'
    );
    await expect(page).toHaveURL(/\/login$/);
  });
});