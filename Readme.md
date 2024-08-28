# Checkout Process Test

This README describes the functionality and purpose of the `checkout_process.spec.js` file, which contains an automated test script for verifying the checkout process on a sample e-commerce website using Playwright.

## Prerequisites

- Node.js installed
- Playwright installed (`npm install @playwright/test`)
- Access to the e-commerce website (`https://rahulshettyacademy.com/client`)

## Test Steps

1. **Navigate to the Website**:
    - The script navigates to the e-commerce website's client page.

2. **Login**:
    - Fills in the email and password fields with test credentials.
    - Clicks the login button.

3. **Product Selection**:
    - Waits for the product cards to load.
    - Iterates through the product list to find a specific product (`IPHONE 13 PRO`).
    - Adds the product to the cart.

4. **Verify Product Addition**:
    - Checks for an alert indicating the product was added to the cart.

## Test Improvements

- **Credentials Management**:
    - Currently, the test credentials are stored directly within the test file. This is not a secure practice.
    - We will be extracting these credentials into a separate configuration file or environment variables in a feature branch to enhance security and maintainability.

## Troubleshooting Flaky Tests

- **Parallel Test Execution**:
    - We have observed that running tests in parallel sometimes results in flaky test outcomes.
    - Further troubleshooting is required to identify and resolve the root cause of these inconsistencies.
    - Potential areas to investigate include:
        - Ensuring that test data is isolated and not shared between parallel test runs.
        - Adding appropriate waits or retries to handle asynchronous operations more reliably.
        - Reviewing the test environment setup to ensure it supports parallel execution without conflicts.