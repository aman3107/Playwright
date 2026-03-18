import { test, expect } from "@playwright/test";

test("Screenshot and Visual", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page
    .getByPlaceholder("Hide/Show Example")
    .screenshot({ path: "partialScreenshot.png" });
  await page.getByRole("button", { name: "Hide" }).click();
  await page.screenshot({ path: "screenshot.png" });

  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
});

test.only("Visual Testing", async ({ page }) => {
  await page.goto("https://www.flightaware.com/");
  expect(await page.screenshot()).toMatchSnapshot("landing.png");
});
