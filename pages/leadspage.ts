import { Page, Locator } from '@playwright/test';

export class LeadsPage {
  readonly page: Page;
  readonly addLeadButton: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly companyInput: Locator;
  readonly statusSelect: Locator;
  readonly saveButton: Locator;
  readonly leadRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addLeadButton = page.getByTestId('add-lead-button');
    this.nameInput = page.getByLabel('Name');
    this.emailInput = page.getByLabel('Email');
    this.companyInput = page.getByLabel('Company');
    this.statusSelect = page.getByLabel('Status');
    this.saveButton = page.getByTestId('save-button');
    this.leadRows = page.getByTestId('lead-row');
  }

  async addLead(
    name: string,
    email: string,
    company: string,
    status: string
  ) {
    await this.addLeadButton.click();

    await this.nameInput.fill(name);
    await this.emailInput.fill(email);
    await this.companyInput.fill(company);
    await this.statusSelect.selectOption(status);

    await this.saveButton.click();
  }

  async editLead(leadName: string, newStatus: string) {
    const leadRow = this.leadRows.filter({
      hasText: leadName,
    });

    await leadRow.getByTestId('edit-button').click();

    await this.statusSelect.selectOption(newStatus);

    await this.saveButton.click();
  }

  async deleteLead(leadName: string) {
    const leadRow = this.leadRows.filter({
      hasText: leadName,
    });

    await leadRow.getByTestId('delete-button').click();
  }
}