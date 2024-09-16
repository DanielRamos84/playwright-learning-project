export class BrowserWindowsPage {
    constructor(page) {
      this.page = page;
    }
  
    header() {
      return this.page.getByRole('heading', { name: /browser windows/i });
    }
  }
  