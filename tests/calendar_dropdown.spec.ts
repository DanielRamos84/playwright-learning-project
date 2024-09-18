import { test, expect } from '@playwright/test';
test.beforeEach(async ({ page }) => {
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/offers', { waitUntil: 'commit' });
})
test('Set Calendar Date Using Keyboard', async ({ page }) => {
    function getCurrentDate() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    }

    const testMonthEntry = '01';
    const testDayEntry = '01';
    const testYearEntry = '2025';

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
        let options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    }

    function getNextMonthYear(day) {
        const date = new Date();
        date.setMonth(date.getMonth() + 1);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
        const formattedDate = `${year}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return { monthYear: `${month} ${year}`, formattedDate };
    }

    await expect(page).toHaveTitle('GreenKart - veg and fruits kart');

    await page.locator('[class="react-date-picker__calendar-button react-date-picker__button"]').click();

    await expect(page.locator('button.react-calendar__navigation__label')).toHaveText(getCurrentMonthYear());

    const dayToSelect = '15';
    const { monthYear, formattedDate } = getNextMonthYear(dayToSelect);

    await page.locator('button.react-calendar__navigation__arrow.react-calendar__navigation__next-button').click();

    await expect(page.locator('button.react-calendar__navigation__label')).toHaveText(monthYear);

    await page.locator('button.react-calendar__tile.react-calendar__month-view__days__day', { hasText: dayToSelect }).first().click();

    await expect(page.locator('[name="date"]')).toHaveValue(formattedDate);
});
