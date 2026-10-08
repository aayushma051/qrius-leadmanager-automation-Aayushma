import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { LeadsPage } from '../pages/leadspage';
import { admin } from '../test-data/users';

test.describe('Edit Lead', () => {
  let loginPage: LoginPage;
  let leadsPage: LeadsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    leadsPage = new LeadsPage(page);

    await loginPage.goto();
    await loginPage.login(admin);
  });

  test('editing a lead status updates it in the list', async () => {
    // Prediction: changing Ram Thapa's status from Contacted
    // to Qualified should update the status shown in the list.

    await leadsPage.editLead('Ram Thapa', 'Qualified');

    const editedLead = leadsPage.leadRows.filter({
      hasText: 'Ram Thapa',
    });

    await expect(editedLead).toContainText('Qualified');
  });
});