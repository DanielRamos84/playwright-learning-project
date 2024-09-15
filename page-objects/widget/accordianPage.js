export class AccordianPage {
  constructor(page) {
    this.page = page;
  }

  header() {
    return this.page.getByRole('heading', { name: /accordian/i });
  }
}
