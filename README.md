## 📚 Overview

In this project, we've taken a structured approach by extending Playwright’s base test functionality. By doing this, we can reference all our Page Object Models (POMs) from a single extended file, allowing us to maintain clean, readable test files while keeping all POMs easily accessible throughout the test suite. Instead of repeatedly creating new instances of POMs in every test file, we centralize the logic, streamlining the entire process.

### 🏗️ How it Works

1. **Extended Base Test**: 
   - We extend the base Playwright test with our own custom fixtures importing all necessary POMs, making them available throughout the project without needing to instantiate them within individual test files.

2. **Page Object Models (POMs)**:
   - By following the POM design pattern, each page or component of the web application has its own dedicated class that encapsulates its logic.
   - These POMs are referenced in the extended test setup, providing easy access in any test without repetitive code.

3. **Centralized Imports**:
   - Once our test extends the base setup, individual test files can import this extended file, gaining access to all the POMs and shared functionality. This drastically reduces the need to manage multiple imports or create separate instances of each page model within every test.

### 🚀 Why This Matters

- **🧹 Cleaner Test Files**: Tests are much easier to read and maintain since they focus solely on test logic without worrying about repeated page setup.
  
- **🛠️ Code Reusability**: The extended base test makes it simple to reuse common functionalities like authentication, navigation, and interactions across multiple tests.

- **🔍 Improved Readability**: By managing instances of our POMs centrally, our test files remain uncluttered, leading to better code clarity and structure.

## 📝 Example Test Flow

Each test imports the extended base test, automatically giving access to the authenticated page and all POMs. This setup ensures we can interact with various pages and features in a seamless, reusable manner.

## 🎯 Key Highlights

- **Extensible Base Test**: All tests reference a single base configuration, making it easier to extend functionalities.
- **Page Object Models**: Each model encapsulates page-specific logic, ensuring modular and maintainable code.
