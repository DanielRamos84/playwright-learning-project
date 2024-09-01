# 📝 Conduit Article Management Test Suite

This Playwright test suite demonstrates automated article management on the Conduit platform, tested against [https://conduit.bondaracademy.com](https://conduit.bondaracademy.com). It handles article creation, deletion, and validation using a combination of API requests and UI interactions.

## 🌟 Overview

This test suite automates:

1. **Authentication**: Secure login via API using environment variables for sensitive data.
2. **Clean Slate**: Deletes pre-existing articles to ensure a fresh start.
3. **Article Creation**: Creates a new article via API and verifies its presence on the UI.
4. **Article Deletion**: Removes the article through the UI and confirms its successful deletion.

## 🚀 Key Features

- **Environment Variables**: Manages sensitive data securely with `.env` files.
- **API Integration**: Utilizes Playwright’s API capabilities for efficient test execution.
- **Comprehensive Cleanup**: Deletes all articles before each test run to ensure consistency.
- **End-to-End Validation**: Combines API and UI testing for robust verification.

## 🔧 How It Works

### Setup

- **Login and Token Retrieval**: Logs in via API and retrieves an access token.
- **Article Cleanup**: Fetches and deletes existing articles to ensure a clean testing environment.

### Tests

1. **Create a New Article**:  
   - **API**: Sends a POST request to create an article.
   - **UI**: Navigates to the site and confirms the article’s presence.

2. **Delete Article**:  
   - **API**: Posts a new article to ensure it's available for deletion.
   - **UI**: Deletes the article via the UI and verifies it no longer exists.

## ⚠️ Challenges

- **Handling Dynamic URLs**: Managing dynamic content like user-specific URLs (e.g., `Nikita%20Schaefer51`) presents a challenge. Hardcoding such values isn’t ideal, and finding a more flexible solution is necessary for better test scalability and maintainability.
- **Skipped API Tests**: Currently, the tests rely on shared state by reading the authentication token from `.auth/user.json`. Due to this setup, the API tests are skipped unless the necessary file contents are provided. I'm still working on a way to change this logic to make the tests more self-contained and reliable.
- **Race Condition in Parallel Execution**: Running tests in parallel can cause race conditions when deleting articles. This sometimes leads to one test failing because it attempts to assert the presence of an article that has already been deleted by another test. Addressing this issue requires synchronization or isolation strategies to ensure test reliability.

## 🔜 To Be Continued...

This is just the beginning! More tests will be added to further enhance the suite and cover additional functionalities on the Conduit platform. Stay tuned for updates.
