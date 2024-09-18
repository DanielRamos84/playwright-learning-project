import {Page} from  '@playwright/test'
export class BookStoreLoginPage {
    private page: Page;  
  
  constructor(page: Page) {
      this.page = page;
    }
  
    header() {
      return this.page.locator('h1', { hasText: /login/i });
    }
  }
  