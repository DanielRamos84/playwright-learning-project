import { Page } from '@playwright/test';

export class BrowserWindowsPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  header() {
    return this.page.getByRole('heading', { name: /browser windows/i });
  }
}