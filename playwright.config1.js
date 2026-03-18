// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: "./tests",
  retries: 1,
  // parellel times
  workers: 2,
  timeout: 20000,
  expect: {
    timeout: 7000,
  },
  reporter: "html",
  projects: [
    {
      name: "safari",
      use: {
        browserName: "webkit",
        headless: true,
        screenshot: "off",
        trace: "on",
      },
    },
    {
      name: "chrome",
      use: {
        browserName: "chromium",
        headless: false,
        screenshot: "on",
        trace: "on",
        // ...devices["Desktop Chrome HiDPI"],
        viewport: { width: 1500, height: 780 },
        // viewport: { width: 720, height: 720 },
        // to ignore the https warning if site is not secure
        ignoreHTTPSErrors: true,
        video: "retain-on-failure",
      },
    },
  ],
});
