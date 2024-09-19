import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('Creating context for browser in case you need to inject something to the browser', async ({
  browser,
}) => {
  // create a new incognito browser context
  const context = await browser.newContext();
  // crate a new pristine page in a pristine context
  const page = await context.newPage();
  await page.goto('https://playwright.dev/', { waitUntil: 'commit' });

  await expect(page).toHaveTitle(
    'Fast and reliable end-to-end testing for modern web apps | Playwright'
  );
});

test('Use page fixture - not injecting cookies, plugins or proxy', async ({
  page,
}) => {
  await page.goto('https://google.com', { waitUntil: 'commit' });

  await expect(page).toHaveTitle('Google');
});

test('Incorrect username / password', async ({ page }) => {
  await page.goto('http://www.rahulshettyacademy.com/loginpagePractise', {
    waitUntil: 'commit',
  });

  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

  await page.locator('input#username').fill('Joe');

  await page.locator('input#password').fill('My Password');

  await page.locator('input#terms').check();

  await page.locator('input#signInBtn').click();

  await expect(page.locator('div.alert.alert-danger.col-md-12')).toContainText(
    'Incorrect username/password.'
  );
});

test('Valid login', async ({ page }) => {
  await page.goto('http://www.rahulshettyacademy.com/loginpagePractise/', {
    waitUntil: 'commit',
  });

  await page.locator('[type="text"]').fill('rahulshettyacademy');

  await page.locator('[type="password"]').fill('learning');

  await page.locator('[type="checkbox"]').check();

  await page.locator('[type="submit"]').click();

  await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop');

  await expect(page).toHaveTitle('ProtoCommerce');
});

test('Find all the card titles', async ({ page }) => {
  await page.goto('http://www.rahulshettyacademy.com/loginpagePractise/', {
    waitUntil: 'commit',
  });

  await page.locator('[type="text"]').fill('rahulshettyacademy');

  await page.locator('[type="password"]').fill('learning');

  await page.locator('[type="checkbox"]').check();

  await page.locator('[type="submit"]').click();

  await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop', {
    waitUntil: 'commit',
  });

  await expect(page).toHaveTitle('ProtoCommerce');

  await expect(page.locator('.card-title a')).toHaveText([
    'iphone X',
    'Samsung Note 8',
    'Nokia Edge',
    'Blackberry',
  ]);
});

test('Registration and Signup', async ({ browser }) => {
  const randomFirstName = faker.person.firstName();
  const randomLastName = faker.person.lastName();
  const randomEmail = faker.internet.email();
  const randomPhoneNumber = faker.string.numeric(10);

  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('https://rahulshettyacademy.com/client/', {
    waitUntil: 'commit',
  });

  await expect(page).toHaveTitle("Let's Shop");

  //fill registration form
  await page.getByText('Register here').click();
  await page.getByPlaceholder('First Name').fill(randomFirstName);
  await page.getByPlaceholder('Last Name').fill(randomLastName);
  await page.getByPlaceholder('Email').fill(randomEmail);
  await page.getByPlaceholder('enter your number').fill(randomPhoneNumber);
  await page.locator('select').selectOption('Engineer');
  await page.locator('input[value="Male"]').click();
  await page.locator('#userPassword').fill('Password123!');
  await page.locator('#confirmPassword').fill('Password123!');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'register' }).click();

  //login after account has been created
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByPlaceholder('email@example.com').fill(randomEmail);
  await page.getByPlaceholder('enter your passsword').fill('Password123!');
  await page.getByRole('button', { name: 'Login' }).click();

  //wait for all images to be loaded
  await page.locator('[class="card-img-top"]').last().waitFor();
});
