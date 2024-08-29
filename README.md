# Alert Dialog Handling Test 🛠️

This document provides an overview of the automated test scripts designed for managing alert dialogs on a sample website using Playwright.

## Overview

The test scripts aim to automate the handling of various alert dialogs on the website: [https://letcode.in/alert](https://letcode.in/alert). The tests cover the following scenarios:

1. **Handling Simple Alerts** ⚠️
2. **Handling Confirmation Alerts** ✅
3. **Handling Prompt Alerts** ✉️
4. **Handling Modern Alerts** 🆕 

### Test 1: Handling Simple Alerts ⚠️

This test verifies the handling and acceptance of a basic alert dialog:

- **Navigate to the Website**
- **Enable Dialog Handler**
- **Verify Alert Message**
- **Accept the Alert**

### Test 2: Handling Confirmation Alerts ✅

This test verifies the handling and dismissal of a confirmation alert dialog:

- **Navigate to the Website**
- **Enable Dialog Handler**
- **Verify Alert Message**
- **Dismiss the Alert**

### Test 3: Handling Prompt Alerts ✉️

This test verifies the handling of a prompt alert dialog and the input of text:

- **Navigate to the Website**
- **Enable Dialog Handler**
- **Verify Alert Message**
- **Input Text and Accept the Alert**
- **Verify Input Text on the Page**

### Test 4: Handling Modern Alerts 🆕

This test verifies the handling of modern alert dialogs:

- **Navigate to the Website**
- **Trigger Modern Alert**
- **Verify Alert Message**
