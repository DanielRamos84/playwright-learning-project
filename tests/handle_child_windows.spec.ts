import { test, expect } from '@playwright/test';

test('Navigate Back and Forth From Parent to Child Window', async ({
  browser,
}) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto('http://www.rahulshettyacademy.com/loginpagePractise', {
    waitUntil: 'commit',
  });

  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

  const interviewQuestionsLink = page.getByRole('link', {
    name: 'Free Access to InterviewQues/ResumeAssistance/Material',
  });

  //wait until both promises are fulfilled and then move on to the next step
  const [newPage] = await Promise.all([
    context.waitForEvent('page'),
    interviewQuestionsLink.click(),
  ]); //at this point we are in the new page - child window
  console.log(
    `Navigating to new url` + (await newPage.evaluate('location.href'))
  );

  //grab email address found in child window so we can enter it in the parent window
  const storeEmailAddress = await newPage
    .locator('.im-para.red a')
    .textContent();

  if (!storeEmailAddress) {
    throw new Error('Email address not found in child window');
  }

  await page.goto('http://www.rahulshettyacademy.com/loginpagePractise');

  await expect(page).toHaveTitle('LoginPage Practise | Rahul Shetty Academy');

  await page.getByRole('textbox', { name: 'Username' }).fill(storeEmailAddress);
});
