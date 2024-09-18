import { test, expect } from '@playwright/test';

test('Checkout Process', async ({ page }) => {
  const testEmail = 'email+1112345678901@email.com';
  const testPassword = 'Password123!';
  const testProduct = 'IPHONE 13 PRO';
  const priceItem = '$ 231500';
  const quantity = 1;
  const creditCardNumber = '4542 9931 9292 2293';
  const cvvCode = '12345';
  const cardHolderName = 'John Doe';
  const couponCode = 'rahulshettyacademy';
  const country = 'United States';

  await page.goto('https://rahulshettyacademy.com/client', {
    waitUntil: 'commit',
  });
  await page.getByPlaceholder('email@example.com').fill(testEmail);
  await page.getByPlaceholder('enter your passsword').fill(testPassword);
  await page.getByRole('button', { name: 'Login' }).click();

  await page.locator('.card-body').last().waitFor();
  const getProductsRows = page.locator('.card-body');
  const getProductsCount = await getProductsRows.count();

  for (let i = 0; i < getProductsCount; i++) {
    const productMatchFound = await getProductsRows
      .nth(i)
      .locator('h5')
      .textContent();
    if (productMatchFound === testProduct) {
      await getProductsRows
        .nth(i)
        .getByRole('button', { name: /add to cart/i })
        .click();
      break;
    }
  }

  await expect(
    page.getByRole('alert', { name: /product added to cart/i })
  ).toBeVisible();

  //checkout process
  await page.locator('button', { hasText: 'Cart ' + quantity }).click();
  await expect(page.getByRole('heading', { name: 'My Cart' })).toBeVisible();
  await page.getByRole('button', { name: 'Checkout' }).click();

  //confirm checkout information
  await expect(page.getByText(testProduct)).toBeVisible();
  await expect(page.getByText(priceItem)).toBeVisible();
  await expect(page.getByText('Quantity: ' + quantity)).toBeVisible();

  const creditCardLabel = page.locator('.title', {
    hasText: 'Credit Card Number',
  });
  const creditCardInput = creditCardLabel
    .locator('..')
    .locator('[type="text"]');
  await expect(creditCardInput).toHaveValue(creditCardNumber);

  //fill out personal information
  const cvvCodeLabel = page.locator('.title', { hasText: 'CVV Code' });
  const cvvInput = cvvCodeLabel.locator('..').locator('[type="text"]');
  await cvvInput.fill(cvvCode);

  const nameOnCardLabel = page.locator('.title', { hasText: 'Name on Card' });
  const nameOnCardLabelInput = nameOnCardLabel
    .locator('..')
    .locator('[type="text"]');
  await nameOnCardLabelInput.fill(cardHolderName);

  const applyCouponLabel = page.locator('.title', { hasText: 'Apply Coupon' });
  const applyCouponLabelInput = applyCouponLabel
    .locator('..')
    .locator('[type="text"]');
  await applyCouponLabelInput.fill(couponCode);
  await page.getByRole('button', { name: /apply coupon/i }).click();
  await expect(page.getByText('Coupon Applied')).toBeVisible();

  //fill out shipping information
  await expect(page.locator('.payment__shipping label')).toHaveText(testEmail);
  await page
    .getByPlaceholder('Select Country')
    .pressSequentially(country, { delay: 100 });

  //wait for country dropdowns to be present
  const dropdown = page.locator('.ta-results');
  await dropdown.waitFor();
  const optionsCount = await dropdown.locator('button').count();
  for (let i = 0; i < optionsCount; ++i) {
    const text = await dropdown.locator('button').nth(i).textContent();
    if (text && text.includes(country)) {
      await dropdown.locator('button').nth(i).click();
      break;
    }
  }

  //place order
  await page.getByText(/place order/i).click();
  await expect(
    page.getByRole('heading', { name: 'Thankyou for the order.' })
  ).toBeVisible();

  //capture order information
  const confirmationNumber = await page
    .locator('label.ng-star-inserted')
    .textContent();
  await page.getByText('Orders History Page').click();

  //confirm order information
  await expect(
    page.getByRole('heading', { name: 'Your Orders' })
  ).toBeVisible();

  await page.locator('tbody').waitFor();
  const rows = page.locator('tbody tr');
  const rowsCount = await rows.count();

  if (confirmationNumber) {
    for (let i = 0; i < rowsCount; i++) {
      const findOrderNumberText = await rows.nth(i).locator('th').textContent();
      if (
        confirmationNumber &&
        findOrderNumberText &&
        confirmationNumber.includes(findOrderNumberText)
      ) {
        await rows.nth(i).getByRole('button', { name: 'View' }).click();
        break;
      }
    }

    // Order Summary Confirmation Information
    const orderIdSummaryPage = await page.locator('.col-text').textContent();
    if (orderIdSummaryPage) {
      expect(confirmationNumber.includes(orderIdSummaryPage)).toBeTruthy();
    } else {
      throw new Error('Order ID summary page text is null');
    }
  } else {
    throw new Error('Confirmation number is null');
  }
});
