import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { admin } from '../test-data/users';

test.describe('Codegen Flow', () => {
  test('admin can search for a lead after login', async ({ page }) => {
    // Prediction: after admin login, searching for Sita Sharma
    // should display the matching lead.

    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(admin);

    const searchInput = page.getByTestId('search-input');
    const leadRows = page.getByTestId('lead-row');

    await searchInput.fill('Sita Sharma');

    await expect(leadRows).toHaveCount(1);
    await expect(leadRows.first()).toContainText('Sita Sharma');
  });
});