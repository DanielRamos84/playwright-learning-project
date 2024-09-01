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

- **Handling Dynamic URLs**: One of the key challenges encountered was managing dynamic content, such as user-specific URLs (e.g., `Nikita%20Schaefer51`). Hardcoding such values isn't ideal, and finding a more flexible solution is crucial for improving test scalability and maintainability. Future updates will aim to address this by dynamically resolving user data.

## 🔜 To Be Continued...

This is just the beginning! More tests will be added to further enhance the suite and cover additional functionalities on the Conduit platform. Stay tuned for updates.
