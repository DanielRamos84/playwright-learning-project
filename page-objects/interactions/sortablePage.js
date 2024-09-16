export class SortablePage {
    constructor(page) {
      this.page = page;
    }
  
    header() {
      return this.page.getByRole('heading', { name: /sortable/i });
    }
  }
  