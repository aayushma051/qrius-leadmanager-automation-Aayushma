import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { LeadsPage } from '../pages/leadspage';
import { admin } from '../test-data/users';

test.describe('Add Lead', () => {
  let loginPage: LoginPage;
  let leadsPage: LeadsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    leadsPage = new LeadsPage(page);

    await loginPage.goto();
    await loginPage.login(admin);
  });

  test('new lead can be added with the selected status', async () => {
    // Prediction: a new lead should be added successfully
    // and the selected status should be saved.
    await leadsPage.addLead(
      'Test Lead',
      'testlead@gmail.com',
      'Test Company',
      'Qualified'
    );

    const newLead = leadsPage.leadRows.filter({
      hasText: 'Test Lead',
    });

    await expect(newLead).toBeVisible();
    await expect(newLead).toContainText('Qualified');
  });
});