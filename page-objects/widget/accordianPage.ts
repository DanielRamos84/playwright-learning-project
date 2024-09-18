import { Page } from '@playwright/test';

export class AccordianPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  header() {
    return this.page.getByRole('heading', { name: /accordian/i });
  }
}
