import { test, expect } from "@playwright/test";

test("Calendar Demo", async ({ page }) => {
  const month = "6";
  const year = "2025";
  const day = "15";
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByRole("button", { name: year }).click();
  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(Number(month) - 1)
    .click();
  await page.getByRole("button", { name: day }).click();
  const selectedDate = await page.locator("div input").nth(1).inputValue();
  console.log(selectedDate);
});
