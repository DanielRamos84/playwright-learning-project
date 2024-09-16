export class TextBoxPage {
  constructor(page) {
    this.page = page;
  }

  header() {
    return this.page.getByRole('heading', { name: /text box/i });
  }

  async fillOutForm(firstName, email, currentAddress, permanentAddress) {
    await this.page
      .getByRole('textbox', { name: /full name/i })
      .fill(firstName);
    await this.page
      .getByRole('textbox', { name: /name@example.com/i })
      .fill(email);
    await this.page
      .getByRole('textbox', { name: /current address/i })
      .fill(currentAddress);
    await this.page.locator('#permanentAddress').fill(permanentAddress);

    await this.page.getByRole('button', { name: /submit/i }).click();
  }
}
