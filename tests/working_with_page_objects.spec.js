import { test, expect } from '../utils/testFixtures';
import { faker } from '@faker-js/faker';
test.beforeEach(async ({ page }) => {
  await page.goto('https://demoqa.com/', { waitUntil: 'commit' });
});
test('Submits Text Box Page Form', async ({
  page,
  navigationPage,
  textBoxPage,
}) => {
  // Generate random data
  const firstName = faker.person.firstName();
  const email = faker.internet.email();
  const currentAddress = faker.location.streetAddress();
  const permanentAddress = faker.location.streetAddress();

  await navigationPage.textBoxPage();
  await expect(textBoxPage.header()).toBeVisible();

  // Fill out the form with random data
  await textBoxPage.fillOutForm(
    firstName,
    email,
    currentAddress,
    permanentAddress
  );

  // Assert input data is rendered in the DOM
  await expect(page.locator('#name')).toHaveText(`Name:${firstName}`);
  await expect(page.locator('#email')).toHaveText(`Email:${email}`);
  await expect(page.locator('#output #currentAddress')).toHaveText(
    `Current Address :${currentAddress}`
  );
  await expect(page.locator('#output #permanentAddress')).toHaveText(
    `Permananet Address :${permanentAddress}`
  );
});
test('Selects All Checkboxes in Checkbox Page', async ({
  page,
  navigationPage,
  checkBoxPage,
}) => {
  const checkBoxLabelsText = [
    'home',
    'desktop',
    'notes',
    'commands',
    'documents',
    'workspace',
    'react',
    'angular',
    'veu',
    'office',
    'public',
    'private',
    'classified',
    'general',
    'downloads',
    'wordFile',
    'excelFile',
  ];

  await navigationPage.checkBoxPage();
  await expect(checkBoxPage.header()).toBeVisible();

  await checkBoxPage.checkbox('home').click();
  await expect(checkBoxPage.checkbox('home')).toBeChecked();

  //assert expected text for labels selected is shown in the DOM
  for (const label of checkBoxLabelsText) {
    await expect(page.locator('#result')).toContainText(label);
  }

  // Expand all and assert all checkboxes are selected
  await checkBoxPage.expandAllButton().click();

  const checkboxesLocator = checkBoxPage.checkboxLocator();
  const checkboxCount = await checkboxesLocator.count();

  for (let i = 0; i < checkboxCount; i++) {
    const checkbox = checkboxesLocator.nth(i);
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(true);
  }
});
test('Forms Page', async ({ page, navigationPage, practiceFormPage }) => {
  await navigationPage.practiceFormPage();
  await expect(practiceFormPage.header()).toBeVisible();
});
test('Alerts Page', async ({ page, navigationPage, browserWindowsPage }) => {
  await navigationPage.browserWindows();
  await expect(browserWindowsPage.header()).toBeVisible();
});
test('Widgets Page', async ({ page, navigationPage, accordianPage }) => {
  await navigationPage.accordianPage();
  await expect(accordianPage.header()).toBeVisible();
});
test('Interactions Page', async ({ page, navigationPage, sortablePage }) => {
  await navigationPage.sortablePage();
  await expect(sortablePage.header()).toBeVisible();
});
test('Book Store Application Page', async ({
  page,
  navigationPage,
  bookStoreLoginPage,
}) => {
  await navigationPage.bookStoreLoginPage();
  await expect(bookStoreLoginPage.header()).toBeVisible();
});
