export class CheckboxPage {
  constructor(page) {
    this.page = page;
  }

  header() {
    return this.page.getByRole('heading', { name: /check box/i });
  }

  checkbox(name) {
    return this.page.locator(`[for="tree-node-${name}"] .rct-checkbox`);
  }

  expandAllButton() {
    return this.page.getByLabel(/expand all/i);
  }

  checkboxLocator() {
    return this.page.locator('input[type="checkbox"]');
  }
}
