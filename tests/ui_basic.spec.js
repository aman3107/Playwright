import { test, expect } from "@playwright/test";

test("Browser Context Playwright Test", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://www.google.com");
  // const title = await page.title();
  await expect(page).toHaveTitle("Google");
});

test("Page Playwright Test", async ({ page }) => {
  await page.goto("https://www.google.com");
});
