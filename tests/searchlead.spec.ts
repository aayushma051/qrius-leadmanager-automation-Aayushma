import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { admin } from '../test-data/users';

test.describe('Search', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(admin);
  });

  test('searching by lead name narrows the list', async ({ page }) => {
    // Prediction: searching for an existing lead name
    // should show only the matching lead.
    const searchInput = page.getByTestId('search-input');
    const leadRows = page.getByTestId('lead-row');

    await searchInput.fill('Sita Sharma');

    await expect(leadRows).toHaveCount(1);
    await expect(leadRows.first()).toContainText('Sita Sharma');
  });

  test('searching by company name narrows the list', async ({ page }) => {
    // Prediction: searching for an existing company name
    // should show only the matching lead.
    const searchInput = page.getByTestId('search-input');
    const leadRows = page.getByTestId('lead-row');

    await searchInput.fill('HimalKart');

    await expect(leadRows).toHaveCount(1);
    await expect(leadRows.first()).toContainText('HimalKart');
  });

  test('searching for a non-existing value shows the empty state', async ({ page }) => {
    // Prediction: a value that does not exist should show
    // no lead rows and the "No leads found" message.
    const searchInput = page.getByTestId('search-input');
    const leadRows = page.getByTestId('lead-row');

    await searchInput.fill('ThisLeadDoesNotExist123');

    await expect(leadRows).toHaveCount(0);
    await expect(page.getByText('No leads found')).toBeVisible();
  });

  test('count reflects the number of leads after a search', async ({ page }) => {
    // Prediction: searching for Sita Sharma should reduce
    // the displayed lead count from 12 leads to 1 lead.
    const searchInput = page.getByTestId('search-input');
    const leadRows = page.getByTestId('lead-row');

    await expect(leadRows).toHaveCount(12);

    await searchInput.fill('Sita Sharma');

    await expect(leadRows).toHaveCount(1);
  });
});