1. To install playwright
   npm init playwright

## Commands

1. npx playwright test
   Runs the end-to-end tests.

2. npx playwright test --ui
   Starts the interactive UI mode.

3. npx playwright test --project=chromium
   Runs the tests only on Desktop Chrome.

4. npx playwright test example
   Runs the tests in a specific file.

5. npx playwright test --debug
   Runs the tests in debug mode.

6. npx playwright codegen
   (npx playwright codegen "https://rahulshettyacademy.com/client")
   Auto generate tests with Codegen.

7. npx playwright show-report
   To open last HTML report run

8. npx playwright test --headed
   To run test in head mode

We suggest that you begin by typing:

    npx playwright test

And check out the following files:

- .\tests\example.spec.js - Example end-to-end test
- .\playwright.config.js - Playwright Test configuration

Visit https://playwright.dev/docs/intro for more information. ✨
