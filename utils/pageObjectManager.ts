import { Page } from '@playwright/test';
import { BrowserWindowsPage } from '../page-objects/alerts-frame-windows/browserWindowsPage';
import { BookStoreLoginPage } from '../page-objects/book-store-application/bookStoreLoginPage';
import { CheckboxPage } from '../page-objects/checkBox/checkBoxPage';
import { TextBoxPage } from '../page-objects/elements/textBoxPage';
import { PracticeFormPage } from '../page-objects/forms/practiceFormPage';
import { NavigationPage } from '../page-objects/general/navigationPage';
import { SortablePage } from '../page-objects/interactions/sortablePage';
import { AccordianPage } from '../page-objects/widget/accordianPage';

export class PageObjectManager {
  private readonly page: Page;
  private readonly browserWindowsPage: BrowserWindowsPage;
  private readonly bookStoreLoginPage: BookStoreLoginPage;
  private readonly checkboxPage: CheckboxPage;
  private readonly textBoxPage: TextBoxPage;
  private readonly practiceFormPage: PracticeFormPage;
  private readonly navigationPage: NavigationPage;
  private readonly sortablePage: SortablePage;
  private readonly accordianPage: AccordianPage;

  constructor(page: Page) {
    this.page = page;
    this.browserWindowsPage = new BrowserWindowsPage(this.page);
    this.bookStoreLoginPage = new BookStoreLoginPage(this.page);
    this.checkboxPage = new CheckboxPage(this.page);
    this.textBoxPage = new TextBoxPage(this.page);
    this.practiceFormPage = new PracticeFormPage(this.page);
    this.navigationPage = new NavigationPage(this.page);
    this.sortablePage = new SortablePage(this.page);
    this.accordianPage = new AccordianPage(this.page);
  }

  browserWindowsMainPage() {
    return this.browserWindowsPage;
  }

  bookStoreLoginMainPage() {
    return this.bookStoreLoginPage;
  }

  checkBoxMainPage() {
    return this.checkboxPage;
  }

  textBoxMainPage() {
    return this.textBoxPage;
  }

  navigateTo() {
    return this.navigationPage;
  }

  practiceFormMainPage() {
    return this.practiceFormPage;
  }

  sortableMainPage() {
    return this.sortablePage;
  }

  accordianMainPage() {
    return this.accordianPage;
  }
}
