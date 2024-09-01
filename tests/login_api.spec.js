import { expect, test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/user.json' });

test.skip('Visits Home Page', async ({ page }) => {
    await page.goto('https://conduit.bondaracademy.com/');
    await expect(page.getByText(/nikita schaefer51/i)).toBeVisible();
});

test.skip('Visits New Article Page', async ({ page }) => {
    await page.goto('https://conduit.bondaracademy.com/editor');
    await expect(page.getByRole('button', { name: /publish article/i })).toBeVisible()
})

test.skip('Visits Settings Page', async ({ page }) => {
    await page.goto('https://conduit.bondaracademy.com/settings');
    await expect(page.getByRole('button', { name: /update settings/i })).toBeVisible()
})

test.skip('Visits Profile Page', async ({ page }) => {
    await page.goto('https://conduit.bondaracademy.com/profile/Nikita');
    await expect(page.getByRole('link', { name: /my posts/i })).toHaveAttribute('href');
})


