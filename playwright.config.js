// @ts-check
import { defineConfig } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  retries: 2,
  timeout: 20000,
  expect: {
    timeout: 7000,
  },
  reporter: [["html"], ["line"], ["allure-playwright"]],
  use: {
    browserName: "chromium",
    headless: false,
    screenshot: "on",
    trace: "on",
  },
});
