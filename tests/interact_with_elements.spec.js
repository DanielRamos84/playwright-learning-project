import { test, expect } from '@playwright/test';
import { beforeEach, describe } from 'node:test';

describe('UI Components Test Suite', () => {
    test.beforeEach('Visit url', async ({ page }) => {
        await page.goto('http://www.rahulshettyacademy.com/loginpagePractise/');
    })
    test('Click Admin Radio Button', async ({ page }) => {
        await page.getByRole('radio', {
            name: /admin/i
        }).click();

        await expect(page.getByRole('radio', { name: "Admin" })).toBeChecked()
    })
    test('Click User Radio Button', async ({ page }) => {
        await page.getByRole('radio', {
            name: /user/i
        }).click();

        await expect(page.getByRole('radio', { name: "User" })).toBeChecked();
        // await expect (page.getByRole('button', {name: "Okay"})).click();     
    })
    test('Set Dropdown Option', async ({ page }) => {
        await page.locator('select').selectOption('Consultant');
        await expect(page.locator('select')).toHaveValue('consult');
    })
    test('Click Checkbox Terms And Conditions', async ({ page }) => {
        await page.getByRole('checkbox').check();
        
        await expect (page.getByRole('checkbox')).toBeChecked();
    })
})

