## 🚀 Overview

This project uses Playwright to automate end-to-end testing for a web application, focusing on **user authentication** and verifying the application's behavior for a logged-in user. By managing authentication at the individual test level, this setup provides the flexibility needed for diverse testing scenarios.

---

## 🔧 Precondition

Before running the tests, follow these steps:

1. **Create a Folder Structure:**
   - Inside your project, create a folder named `playwright`.
   - Within the `playwright` folder, create another folder named `.auth`.

2. **Create `user.json` File:**
   - Inside the `.auth` folder, create a `user.json` file with the following structure:

   ```json
   {
       "cookies": [],
       "origins": [
           {
               "origin": "https://conduit.bondaracademy.com",
               "localStorage": [
                   {
                       "name": "jwtToken",
                       "value": ""
                   }
               ]
           }
       ]
   }
   ```

   - The `jwtToken` value will be automatically populated when the setup file runs, storing the authentication token.
  
## 🌱 Environment Variables

Storing sensitive information, like credentials, in an `.env` file ensures:
- **Security:** Your credentials are not exposed in the source code, reducing the risk of unauthorized access.
- **Ease of Use:** Updating credentials is simple and does not require changes to the test code.

**Set Up Environment Variables:**
   - Create an `.env` file in the root directory of your project.
   - In the `.env` file, add the following environment variables:

     ```plaintext
     EMAIL=<replace with your test email>
     PASSWORD=<replace with your user password>
     ```

   - Replace `<replace with your test email>` with the email address you use for testing.
   - Replace `<replace with your user password>` with the corresponding password for that email.

   These credentials will be used during the authentication process in the setup file to log in and retrieve the authentication token.

---

## 🔐 Authentication Setup

The authentication process is secure and efficient:
- **API Request:** The user logs in by sending a request to the application's API, using the credentials stored in the `.env` file.
- **State Management:** The `user.json` file is updated with the authentication token, allowing it to be reused in specific test cases without needing to re-authenticate.

## 🧩 Test Workflow

Each test follows a straightforward workflow:
1. **Authenticate:** Ensure the user is logged in using the saved state from the `user.json` file.
2. **Navigate:** Visit different sections of the web application.
3. **Verify:** Check key elements like buttons, links, and text to confirm they display correctly for an authenticated user.

---

## 🎯 Why This Setup?

- **Flexibility:** Each test handles its own authentication, enabling independent execution.
- **Robustness:** Tests are isolated from each other, preventing conflicts.
- **Security:** Credentials are securely stored, maintaining a clean and safe setup.
