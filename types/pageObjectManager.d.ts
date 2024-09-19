import { Page } from '@playwright/test';
import { BrowserWindowsPage } from '../page-objects/alerts-frame-windows/browserWindowsPage';
import { BookStoreLoginPage } from '../page-objects/book-store-application/bookStoreLoginPage';
import { CheckboxPage } from '../page-objects/checkBox/checkBoxPage';
import { TextBoxPage } from '../page-objects/elements/textBoxPage';
import { PracticeFormPage } from '../page-objects/forms/practiceFormPage';
import { NavigationPage } from '../page-objects/general/navigationPage';
import { SortablePage } from '../page-objects/interactions/sortablePage';
import { AccordianPage } from '../page-objects/widget/accordianPage';

export interface PageObjectManager {
  page: Page;
  browserWindowsPage: BrowserWindowsPage;
  bookStoreLoginPage: BookStoreLoginPage;
  checkboxPage: CheckboxPage;
  textBoxPage: TextBoxPage;
  practiceFormPage: PracticeFormPage;
  navigationPage: NavigationPage;
  sortablePage: SortablePage;
  accordianPage: AccordianPage;

  browserWindowsMainPage(): BrowserWindowsPage;
  bookStoreLoginMainPage(): BookStoreLoginPage;
  checkBoxMainPage(): CheckboxPage;
  textBoxMainPage(): TextBoxPage;
  navigateTo(): NavigationPage;
  practiceFormMainPage(): PracticeFormPage;
  sortableMainPage(): SortablePage;
  accordianMainPage(): AccordianPage;
}
