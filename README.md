# 🚀 Playwright Learning Project

Welcome to the **Playwright Learning Project**! This repository is designed to help you explore and experiment with Playwright across various web applications.

🔗 **Live Site**: [Rahul Shetty Academy E-commerce Website](https://rahulshettyacademy.com/client)

## 🎯 Prerequisites

Before you get started, make sure you have the following:

- **Node.js**: Version 14 or higher installed.
- **Playwright**: Install it via npm:  
  ```bash
  npm install @playwright/test
  ```
- **Website Access**: You'll need access to the respective websites to run the tests.

---

## 🧪 Test Suites

### 1️⃣ **E-commerce & UI Testing on Rahul Shetty Academy**
Tests in this section focus on interacting with the e-commerce site and a practice login page:

- **Checkout Flow**: Simulate adding products to the cart, proceeding to checkout, and validating the order.

*For more details, check out the [Test Checkout Flow Test Suite](https://github.com/DanielRamos84/playwright-learning-project/tree/test/checkout-flow)*
- **Login & Registration via UI**: Test user authentication via the UI on [Rahul Shetty Academy E-commerce 
Website](https://rahulshettyacademy.com/client).
- **Login via API**: Direct API testing for login functionalities to streamline testing workflows.
- **Calendar Dropdown**: Dynamic date selection through a calendar component.

*For more details, check out the [Calendar Dropdown Test Suite](https://github.com/DanielRamos84/playwright-learning-project/tree/test/calendar-dropdown)*
- **Miscellaneous Element Interactions**: Covers radio buttons, dropdowns, and checkboxes on [Rahul Shetty Academy Practice Site](http://www.rahulshettyacademy.com/loginpagePractise).

---

### 2️⃣ **Alert Handling on LetCode**
This test suite is dedicated to alert handling:

- **Alert Dialog Testing**: Tests executed against [LetCode Alert Page](https://letcode.in/alert), validating how alerts, confirmations, and prompts are handled.

*For more details, check out the [Test Alert Dialog Test Suite](https://github.com/DanielRamos84/playwright-learning-project/tree/test/alert-dialog).*

---

### 3️⃣ **Conduit App Tests with Playwright Fixtures**
This suite tests the **Conduit** platform by using Playwright fixtures for stateful authentication:

- **API Testing with Fixtures**: Use Playwright's fixture to inject authenticated state and mock API responses.
- **UI Testing in Authenticated State**: After setting up authentication, visit various pages in the **Conduit** app, interacting with content in an authenticated session.
  
*For more details, check out the [Conduit Test Suite](https://github.com/DanielRamos84/playwright-learning-project/tree/test/working-with-api).*
