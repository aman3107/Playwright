// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  timeout: 20000,
  expect: {
    timeout: 7000,
  },
  reporter: "html",
  use: {
    browserName: "chromium",
    headless: false,
  },
});
