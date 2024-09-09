# 🛒 Checkout Process Test

This Playwright test suite automates a complete e-commerce checkout flow on the [Rahul Shetty Academy](https://rahulshettyacademy.com/client) website, covering everything from user login to order confirmation. It ensures that the purchase process runs smoothly by verifying product selection, payment information, coupon application, and order validation.

## 🚦 Test Steps Overview

1. **Navigate to the Website**
    - The script directs the browser to the client's e-commerce page.

2. **Login**
    - Inputs the test email and password.
    - Clicks the login button to authenticate.

3. **Product Selection**
    - Waits for the product listings to load.
    - Iterates through the products to find the `IPHONE 13 PRO`.
    - Adds the selected product to the cart.

4. **Verify Product Addition**
    - Confirms that an alert appears, indicating the product has been successfully added to the cart.

## 🚀 Test Improvements

- **Secure Credentials Management**
    - Currently, test credentials are hardcoded in the test script. For better security, we'll move these credentials to a separate configuration file or environment variables in an upcoming update. This will enhance both security and maintainability.

