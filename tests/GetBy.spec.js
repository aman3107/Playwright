import { test, expect } from "@playwright/test";

test("GetBy Locators", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  await page.getByLabel("Employed").click();
  await page.getByLabel("Gender").selectOption("Female");

  await page.getByPlaceholder("Password").fill("1234");

  await page.locator("input[name='email']").fill("abc@gmail.com");

  await page.getByRole("button", { name: "Submit" }).click();

  const textPresent = await page
    .getByText("Success! The Form has been submitted successfully!.")
    .isVisible();

  expect(textPresent).toBeTruthy();

  await page.getByRole("link", { name: "Shop" }).click();

  await page.locator(".card-body").first().waitFor();
  await page
    .locator("app-card", { hasText: "Nokia Edge" })
    .getByRole("button", { name: "Add" })
    .click();
});
