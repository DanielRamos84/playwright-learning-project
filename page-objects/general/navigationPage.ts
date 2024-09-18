import { Page } from '@playwright/test';

export class NavigationPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async elementsPage() {
    await this.page
      .locator('.card', {
        hasText: /elements/i,
      })
      .click();
  }

  async textBoxPage() {
    await this.elementsPage();
    await this.page.locator('li', { hasText: /text box/i }).click();
  }

  async checkBoxPage() {
    await this.elementsPage();
    await this.page.locator('li', { hasText: /check box/i }).click();
  }

  async formsPage() {
    await this.page.locator('.card', { hasText: /forms/i }).click();
  }

  async practiceFormPage() {
    await this.formsPage();
    await this.page.locator('li', { hasText: /practice form/i }).click();
  }

  async alertsPage() {
    await this.page
      .locator('.card', { hasText: /alerts, frame & windows/i })
      .click();
  }

  async browserWindows() {
    await this.alertsPage();
    await this.page.locator('li', { hasText: /browser windows/i }).click();
  }

  async widgetsPage() {
    await this.page.locator('.card', { hasText: /widgets/i }).click();
  }

  async accordianPage() {
    await this.widgetsPage();
    await this.page.locator('li', { hasText: /accordian/i }).click();
  }

  async interactionsPage() {
    await this.page.locator('.card', { hasText: /interactions/i }).click();
  }

  async sortablePage() {
    await this.interactionsPage();
    await this.page.locator('li', { hasText: /sortable/i }).click();
  }

  async bookStoreApplicationPage() {
    await this.page
      .locator('.card', { hasText: /book store application/i })
      .click();
  }

  async bookStoreLoginPage() {
    await this.bookStoreApplicationPage();
    await this.page.locator('li', { hasText: /login/i }).click();
  }
}
