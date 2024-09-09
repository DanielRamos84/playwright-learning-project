import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';

// Extend Playwright test with fixtures
export const test = baseTest.extend<{
  authenticatedPage: any;
  accessToken: string;
}>({
  // Define 'accessToken' fixture
  accessToken: async ({ request }, use) => {
    let token = '';

    // Check if the token is already stored
    const tokenPath = 'playwright/.auth/user.json';
    if (fs.existsSync(tokenPath)) {
      const data = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
      token = data.origins[0].localStorage.find(item => item.name === 'jwtToken')?.value || '';
    }

    // If token is not available, fetch it by logging in
    if (!token) {
      const response = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
          user: {
            email: process.env.EMAIL,
            password: process.env.PASSWORD,
          },
        },
      });

      const responseBody = await response.json();
      token = responseBody.user.token;
      expect(response.status()).toEqual(200);

      // Save the token in the storage file
      const storageState = {
        cookies: [],
        origins: [
          {
            origin: 'https://conduit.bondaracademy.com',
            localStorage: [{ name: 'jwtToken', value: token }],
          },
        ],
      };
      fs.writeFileSync(tokenPath, JSON.stringify(storageState, null, 2));
    }

    // Provide the token to the test
    await use(token);
  },

  // Define 'authenticatedPage' fixture
  authenticatedPage: async ({ page, accessToken }, use) => {
    if (accessToken) {
      // Simulate user being logged in by setting token in localStorage
      await page.goto('https://conduit.bondaracademy.com');
      await page.evaluate(token => {
        localStorage.setItem('jwtToken', token);  // Set token in local storage
      }, accessToken);
      await page.reload();  // Refresh the page with the authenticated state
    }

    // Provide the authenticated page to the test
    await use(page);
  },
});
