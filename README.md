## 🔐 Authentication Setup

Authentication is managed through a streamlined process:
- **API Request:** The user logs in by sending a secure request to the application's API.
- **State Management:** The authentication session is saved locally, allowing it to be reused in specific test cases without re-authentication.

---

## 🌱 Environment Variables

To keep sensitive information safe, credentials are stored in an `.env` file. This approach ensures that:
- **Security**: Your credentials are protected and not hard-coded into the scripts.
- **Flexibility**: Easily update or change credentials without modifying the test code.

---

## 🧩 Test Workflow

Each test follows a simple yet effective workflow:
1. **Authenticate**: Begin by ensuring the user is logged in.
2. **Navigate**: Move through different sections of the web application.
3. **Verify**: Check key elements like buttons, links, and text to confirm that they display correctly for an authenticated user.

---

## 🎯 Why This Setup?

- **Flexibility**: Each test handles its own authentication, allowing for independent execution.
- **Robustness**: Tests are isolated from one another, preventing potential conflicts.
- **Security**: Credentials are stored securely, keeping your setup clean and safe.

