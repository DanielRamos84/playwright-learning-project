export class BookStoreLoginPage {
    constructor(page) {
      this.page = page;
    }
  
    header() {
      return this.page.locator('h1', { name: /login/i });
    }
  }
  