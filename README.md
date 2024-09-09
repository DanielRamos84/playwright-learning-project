# 📝 Conduit Article Management Test Suite

This Playwright test suite demonstrates automated article management on the Conduit platform, tested against [https://conduit.bondaracademy.com](https://conduit.bondaracademy.com). It handles article creation, deletion, validation, and includes additional tests for mocking API responses. The suite ensures comprehensive coverage by combining API requests and UI interactions.

## 🌟 Overview

This test suite automates:

1. **Authentication**: Secure login via API using GitHub secrets in the `.yml` configuration file to handle sensitive data.
2. **Clean Slate**: Deletes pre-existing articles to ensure a fresh start.
3. **Article Creation**: Creates a new article via API and verifies its presence on the UI.
4. **Article Deletion**: Removes the article through the UI and confirms its successful deletion.
5. **Mocking API Responses**: Includes tests for mocking various API responses to validate the handling of dynamic content and empty states.

## 🚀 Key Features

- **GitHub Secrets**: Manages sensitive data securely using secrets stored in GitHub Actions `.yml` files.
- **API Integration**: Utilizes Playwright’s API capabilities for efficient test execution.
- **Comprehensive Cleanup**: Deletes all articles before each test run to ensure consistency.
- **End-to-End Validation**: Combines API and UI testing for robust verification.

## 🔧 How It Works

### Setup

- **Login and Token Retrieval**: Logs in via API and retrieves an access token.
- **Article Cleanup**: Fetches and deletes existing articles to ensure a clean testing environment.

### Tests

1. **Create a New Article**  
   - **Description**: This test creates a new article via the API and verifies that it is visible on the home page and the user's profile page.
   - **API Endpoint**: POST /api/articles
   - **Assertions**: Checks if the article is visible on the home page and the profile page.

2. **Delete Article**  
   - **Description**: This test creates a new article via the API, deletes it, and verifies that it is no longer visible on the home page and the user's profile page.
   - **API Endpoint**: DELETE /api/articles/{slug}
   - **Assertions**: Checks if the article is not visible on the home page and the profile page after deletion.

3. **Mark Article as Favorite**  
   - **Description**: This test creates a new article via the API, marks it as favorite, and verifies that the favorite count is updated on the home page and the user's profile page.
   - **API Endpoint**: POST /api/articles/{slug}/favorite
   - **Assertions**: Checks if the favorite count is updated on the home page and the profile page.

4. **Post Comment on Personal Article**  
   - **Description**: This test creates a new article via the API, posts a comment on it, and verifies that the comment is visible on the article page.
   - **API Endpoint**: POST /api/articles/{slug}/comments
   - **Assertions**: Checks if the comment is visible on the article page with the correct author and date.

5. **Delete Comment on Personal Article**  
   - **Description**: This test creates a new article via the API, posts a comment on it, deletes the comment, and verifies that the comment is no longer visible on the article page.
   - **API Endpoint**: DELETE /api/articles/{slug}/comments/{id}
   - **Assertions**: Checks if the comment is not visible on the article page after deletion.

6. **Mock Articles Global Feed Page**  
   - **Description**: This test mocks the global feed articles API and verifies that the articles are displayed correctly on the page.
   - **Mocked API**: **/api/articles?limit=*&offset=***  
   - **Assertions**: Checks if the titles of the articles match the mock data.

7. **Empty Mock Global Feed Page**  
   - **Description**: This test mocks an empty response for the global feed articles API and verifies that the "no articles are here... yet." message is displayed.
   - **Mocked API**: **/api/articles?limit=*&offset=***  
   - **Assertions**: Checks if the "no articles are here... yet." message is displayed.

8. **Mock Articles Your Feed Page**  
   - **Description**: This test mocks the "Your Feed" articles API and verifies that the articles are displayed correctly on the page.
   - **Mocked API**: **/api/articles/feed?limit=*&offset=***  
   - **Assertions**: Checks if the titles of the articles match the mock data.

9. **Empty Mock Your Feed Page**  
   - **Description**: This test mocks an empty response for the "Your Feed" articles API and verifies that the "no articles are here... yet." message is displayed.
   - **Mocked API**: **/api/articles/feed?limit=*&offset=***  
   - **Assertions**: Checks if the "no articles are here... yet." message is displayed.

10. **Mock Tags**  
    - **Description**: This test mocks the tags API and verifies that the tags are displayed correctly in the sidebar.
    - **Mocked API**: **/api/tags**  
    - **Assertions**: Checks if the tags in the sidebar match the mock data.

## ⚠️ Challenges

- **Handling Dynamic URLs**: Managing dynamic content like user-specific URLs (e.g., `Nikita%20Schaefer51`) presents a challenge. Hardcoding such values isn’t ideal, and finding a more flexible solution is necessary for better test scalability and maintainability.
- **Race Condition in Parallel Execution**: Running tests in parallel can cause race conditions when deleting articles. This sometimes leads to one test failing because it attempts to assert the presence of an article that has already been deleted by another test. Addressing this issue requires synchronization or isolation strategies to ensure test reliability.

## 🔜 To Be Continued...
