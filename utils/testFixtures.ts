import { test as baseTest, expect as baseExpect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { NavigationPage } from '../page-objects/general/navigationPage';
import { BrowserWindowsPage } from '../page-objects/alerts-frame-windows/browserWindowsPage';
import { BookStoreLoginPage } from '../page-objects/book-store-application/bookStoreLoginPage';
import { CheckboxPage } from '../page-objects/checkBox/checkBoxPage';
import { TextBoxPage } from '../page-objects/elements/textBoxPage';
import { PracticeFormPage } from '../page-objects/forms/practiceFormPage';
import { SortablePage } from '../page-objects/interactions/sortablePage';
import { AccordianPage } from '../page-objects/widget/accordianPage';
dotenv.config();
export const expect = baseExpect;

// Extend Playwright test with fixtures
export const test = baseTest.extend<{
  authenticatedPage: any;
  accessToken: string;
  browserWindowsPage: BrowserWindowsPage;
  bookStoreLoginPage: BookStoreLoginPage;
  checkBoxPage: CheckboxPage;
  textBoxPage: TextBoxPage;
  practiceFormPage: PracticeFormPage;
  navigationPage: NavigationPage;
  sortablePage: SortablePage;
  accordianPage: AccordianPage;
}>({
  // Define 'accessToken' fixture
  accessToken: async ({ request }, use) => {
    let token = '';

    // Fetch the token by logging in if not already available
    if (!token) {
      const response = await request.post(
        'https://conduit-api.bondaracademy.com/api/users/login',
        {
          data: {
            user: {
              email: process.env.EMAIL,
              password: process.env.PASSWORD,
            },
          },
        }
      );

      const responseBody = await response.json();
      token = responseBody.user?.token || ''; // Use optional chaining and default value
      expect(response.status()).toEqual(200);

      if (!token) {
        throw new Error('Failed to retrieve token from login response');
      }
    }

    // Provide the token to the test
    await use(token);
  },

  // Define 'authenticatedPage' fixture
  authenticatedPage: async ({ page, accessToken }, use) => {
    if (accessToken) {
      // Simulate user being logged in by setting token in localStorage
      await page.goto('https://conduit.bondaracademy.com');
      await page.evaluate((token) => {
        localStorage.setItem('jwtToken', token);
      }, accessToken);
      await page.reload();
    }

    // Provide the authenticated page to the test
    await use(page);
  },
  // POM BrowserWindowsPage fixture
  browserWindowsPage: async ({ page }, use) => {
    await use(new BrowserWindowsPage(page));
  },
  // POM BooksStoreLoginPage fixture
  bookStoreLoginPage: async ({ page }, use) => {
    await use(new BookStoreLoginPage(page));
  },
  // POM CheckboxPage fixture
  checkBoxPage: async ({ page }, use) => {
    await use(new CheckboxPage(page));
  },
  // POM TextBoxPage fixture
  textBoxPage: async ({ page }, use) => {
    await use(new TextBoxPage(page));
  },
  // POM PracticeFormPage fixture
  practiceFormPage: async ({ page }, use) => {
    await use(new PracticeFormPage(page));
  },
  // POM NavigationPage fixture
  navigationPage: async ({ page }, use) => {
    await use(new NavigationPage(page));
  },
  // POM SortablePage fixture
  sortablePage: async ({ page }, use) => {
    await use(new SortablePage(page));
  },
  // POM AccordianPage fixture
  accordianPage: async ({ page }, use) => {
    await use(new AccordianPage(page));
  },
});
