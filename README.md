## 📚 Overview

In this project, we’ve enhanced the Playwright test setup by centralizing the management of Page Object Models (POMs) through a **Page Object Manager**. This approach extends Playwright’s base test functionality, allowing us to reference POMs without the need to instantiate them repeatedly across multiple test files. By centralizing this logic, we ensure our test suite remains clean, maintainable, and efficient.

### 🏗️ How it Works

1. **Extended Base Test**:
   - We extend Playwright’s base test with custom fixtures, integrating the Page Object Manager. This makes all POMs accessible throughout the test suite, eliminating the need to instantiate POMs in individual test files.

2. **Page Object Models (POMs)**:
   - Each page or component of the application is encapsulated within its own class, following the POM design pattern. 
   - These POMs are now centrally managed by the **Page Object Manager**, making them readily available across all tests through a single reference point.

3. **Page Object Manager**:
   - The `PageObjectManager` class is responsible for managing instances of all POMs. This class is instantiated once per test and provides methods to access the POMs, ensuring a single source of truth for page interactions.
   - This reduces redundancy and simplifies test maintenance as we no longer need to manually create instances of POMs in test files.

4. **Centralized Imports**:
   - With the Page Object Manager in place, individual test files import and extend a base configuration, which automatically gives them access to all POMs. This results in cleaner and more maintainable test files, reducing repetitive imports and setups.

### 🚀 Why This Matters

- **🧹 Cleaner Test Files**: Tests remain focused on logic and assertions, without the clutter of repetitive page model instantiations.
  
- **🛠️ Code Reusability**: Centralized POM management means shared functionality like authentication and navigation is reusable across multiple tests.

- **🔍 Improved Readability**: Tests are easier to read and understand since page interactions are handled through a single manager, resulting in a more organized test suite.

### 📝 Example Test Flow

Each test imports the extended base test, providing automatic access to the Page Object Manager. This ensures we can seamlessly interact with multiple POMs, authenticate users, and navigate between pages—all without redundant code.

### 🎯 Key Highlights

- **Extensible Base Test**: The extended base test configuration allows for easy enhancements and centralization of common test functionality.
- **Page Object Models**: Each POM is dedicated to specific pages or components, ensuring modularity and maintainability.
- **Page Object Manager**: Manages POM instances centrally, removing the need to instantiate them repeatedly within test files, streamlining the test-writing process.
