import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginpage';
import { LeadsPage } from '../pages/leadspage';
import { admin, agent } from '../test-data/users';

test.describe('Delete Lead', () => {
  let loginPage: LoginPage;
  let leadsPage: LeadsPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    leadsPage = new LeadsPage(page);

    await loginPage.goto();
  });

  test('admin can delete a lead', async () => {
    // Prediction: admin should be able to delete
    // a lead and the lead should disappear from the list.
    await loginPage.login(admin);

    const leadRow = leadsPage.leadRows.filter({
      hasText: 'Pooja Bhattarai',
    });

    await expect(leadRow).toBeVisible();

    await leadsPage.deleteLead('Pooja Bhattarai');

    await expect(
      leadsPage.leadRows.filter({
        hasText: 'Pooja Bhattarai',
      })
    ).toHaveCount(0);
  });

  test('agent cannot delete a lead', async () => {
    // Prediction: agent should not have access
    // to the delete button.
    await loginPage.login(agent);

    const leadRow = leadsPage.leadRows.filter({
      hasText: 'Ram Thapa',
    });

    await expect(leadRow).toBeVisible();

    await expect(
      leadRow.getByTestId('delete-button')
    ).toHaveCount(0);
  });
});