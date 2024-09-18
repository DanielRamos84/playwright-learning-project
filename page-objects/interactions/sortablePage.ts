import { Page } from '@playwright/test';

export class SortablePage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  header() {
    return this.page.getByRole('heading', { name: /sortable/i });
  }
}
