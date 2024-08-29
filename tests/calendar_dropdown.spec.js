import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers');
})
test('Set Calendar Date Using Keyboard', async ({ page }) => {
    function getCurrentDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    const testMonthEntry = '11';
    const testDayEntry = '12';
    const testYearEntry = '2023';

    await expect(page).toHaveTitle('GreenKart - veg and fruits kart');
    await expect(page.locator('[name="date"]')).toHaveValue(getCurrentDate());
    await (page.locator('button.react-date-picker__clear-button')).click();
    await (page.locator('[name="month"]')).pressSequentially(testMonthEntry);
    await (page.locator('[name="day"]')).pressSequentially(testDayEntry);
    await (page.locator('[name="year"]')).pressSequentially(testYearEntry);
    await (page.locator('.react-date-picker__calendar-button')).click();
    await expect(page.locator('[name="date"]')).toHaveValue(testYearEntry + '-' + testMonthEntry + '-' + testDayEntry);
})
test('Set Calendar Date Using Modal', async ({ page }) => {
    function getCurrentMonthYear() {
        let today = new Date();
        let options = { month: 'long', year: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    }

    function getNextMonthYear() {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        return `${month} ${year}`;
    }

    await expect(page).toHaveTitle('GreenKart - veg and fruits kart');

    await page.locator('[class="react-date-picker__calendar-button react-date-picker__button"]').click();

    await expect(page.locator('button.react-calendar__navigation__label')).toHaveText(getCurrentMonthYear());

    await page.locator('button.react-calendar__navigation__arrow.react-calendar__navigation__next-button').click();

    await expect(page.locator('button.react-calendar__navigation__label')).toHaveText(getNextMonthYear());

    await page.locator('button.react-calendar__tile.react-calendar__month-view__days__day', { hasText: '30' }).last().click();

    await expect(page.locator('[name="date"]')).toHaveValue('2024-09-30');
})