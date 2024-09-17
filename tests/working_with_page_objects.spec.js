import { test, expect } from '../utils/testFixtures';
import { faker } from '@faker-js/faker';
test.beforeEach(async ({ page }) => {
  await page.goto('https://demoqa.com/', { waitUntil: 'commit' });
});
test('Submits Text Box Page Form', async ({ page, pageObjectManager }) => {
  // Generate random data
  const firstName = faker.person.firstName();
  const email = faker.internet.email();
  const currentAddress = faker.location.streetAddress();
  const permanentAddress = faker.location.streetAddress();

  await pageObjectManager.navigateTo().textBoxPage();
  await expect(pageObjectManager.textBoxMainPage().header()).toBeVisible();

  // Fill out the form with random data
  await pageObjectManager
    .textBoxMainPage()
    .fillOutForm(firstName, email, currentAddress, permanentAddress);

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
  pageObjectManager,
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

  await pageObjectManager.navigateTo().checkBoxPage();
  await expect(pageObjectManager.checkBoxMainPage().header()).toBeVisible();

  await pageObjectManager.checkBoxMainPage().checkbox('home').click();
  await expect(
    pageObjectManager.checkBoxMainPage().checkbox('home')
  ).toBeChecked();

  //assert expected text for labels selected is shown in the DOM
  for (const label of checkBoxLabelsText) {
    await expect(page.locator('#result')).toContainText(label);
  }

  // Expand all and assert all checkboxes are selected
  await pageObjectManager.checkBoxMainPage().expandAllButton().click();

  const checkboxesLocator = pageObjectManager
    .checkBoxMainPage()
    .checkboxLocator();
  const checkboxCount = await checkboxesLocator.count();

  for (let i = 0; i < checkboxCount; i++) {
    const checkbox = checkboxesLocator.nth(i);
    const isChecked = await checkbox.isChecked();
    expect(isChecked).toBe(true);
  }
});
test('Forms Page', async ({ pageObjectManager }) => {
  await pageObjectManager.navigateTo().practiceFormPage();
  await expect(pageObjectManager.practiceFormMainPage().header()).toBeVisible();
});
test('Alerts Page', async ({ pageObjectManager }) => {
  await pageObjectManager.navigateTo().browserWindows();
  await expect(
    pageObjectManager.browserWindowsMainPage().header()
  ).toBeVisible();
});
test('Widgets Page', async ({ pageObjectManager }) => {
  await pageObjectManager.navigateTo().accordianPage();
  await expect(pageObjectManager.accordianMainPage().header()).toBeVisible();
});
test('Interactions Page', async ({ pageObjectManager }) => {
  await pageObjectManager.navigateTo().sortablePage();
  await expect(pageObjectManager.sortableMainPage().header()).toBeVisible();
});
test('Book Store Application Page', async ({ pageObjectManager }) => {
  await pageObjectManager.navigateTo().bookStoreLoginPage();
  await expect(
    pageObjectManager.bookStoreLoginMainPage().header()
  ).toBeVisible();
});
