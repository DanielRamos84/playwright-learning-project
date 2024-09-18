import { test } from '../../utils/testFixtures';
import { expect } from '@playwright/test';

test('Visits Home Page', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('https://conduit.bondaracademy.com/', { waitUntil: 'commit' });
    await expect(authenticatedPage.getByText(/nikita schaefer51/i)).toBeVisible();
});

test('Visits New Article Page', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('https://conduit.bondaracademy.com/editor', { waitUntil: 'commit' });
    await expect(authenticatedPage.getByRole('button', { name: /publish article/i })).toBeVisible()
})

test('Visits Settings Page', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('https://conduit.bondaracademy.com/settings', { waitUntil: 'commit' });
    await expect(authenticatedPage.getByRole('button', { name: /update settings/i })).toBeVisible()
})

test('Visits Profile Page', async ({ authenticatedPage }) => {
    await authenticatedPage.goto('https://conduit.bondaracademy.com/profile/Nikita', { waitUntil: 'commit' });
    await expect(authenticatedPage.getByRole('link', { name: /my posts/i })).toHaveAttribute('href');
})


