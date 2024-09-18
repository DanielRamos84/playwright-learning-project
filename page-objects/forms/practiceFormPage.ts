import { Page } from '@playwright/test';

export class PracticeFormPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  header() {
    return this.page.getByRole('heading', { name: /practice form/i });
  }
}
