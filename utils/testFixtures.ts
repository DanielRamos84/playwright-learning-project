import { test as baseTest, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
dotenv.config();

// Extend Playwright test with fixtures
export const test = baseTest.extend<{
  authenticatedPage: any;
  accessToken: string;
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
});
