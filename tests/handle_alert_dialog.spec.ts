import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://letcode.in/alert', { waitUntil: 'commit' });
});
test('Handle Accept Alert', async ({ page }) => {
  //enable dialog window handler
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Hey! Welcome to LetCode');
    await dialog.accept();
  });
  await page.getByRole('button', { name: /simple alert/i }).click();
});
test('Handle Dismiss Alert', async ({ page }) => {
  //enable dialog window handler
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Are you happy with LetCode?');
    await dialog.dismiss();
  });

  await page.getByRole('button', { name: /confirm alert/i }).click();
});

test('Handle Prompt Alert', async ({ page }) => {
  const name = 'Playwright Automation';

  //enable dialog window handler
  page.on('dialog', async (dialog) => {
    expect(dialog.message()).toContain('Enter your name');
    await dialog.accept(name);
  });

  await page.getByRole('button', { name: /prompt alert/i }).click();
  await expect(page.locator('#myName')).toHaveText('Your name is: ' + name);
});

test('Modern Alert', async ({ page }) => {
  await page.getByRole('button', { name: /modern alert/i }).click();
  await expect(page.locator('.modal-content')).toHaveText(
    /Modern Alert - Some people address me as sweet alert as well /i
  );
});
