export class PracticeFormPage {
  constructor(page) {
    this.page = page;
  }

  header() {
    return this.page.getByRole('heading', { name: /practice form/i });
  }
}
