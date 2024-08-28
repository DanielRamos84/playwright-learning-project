# 🛒 Checkout Process Test

Welcome to the **Checkout Process Test** documentation! This section outlines the steps taken to automate the checkout flow on an e-commerce website.

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

## 🔧 Troubleshooting Flaky Tests

- **Parallel Test Execution Issues**
    - Running tests in parallel has occasionally led to inconsistent results. We are investigating the root causes and exploring solutions, including:
        - Ensuring test data is isolated across parallel test runs.
        - Implementing proper waits or retries to handle asynchronous operations more reliably.
        - Reviewing and optimizing the test environment to support smooth parallel execution without conflicts.
