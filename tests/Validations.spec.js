import { test, expect } from "@playwright/test";

test("Validations", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeVisible();
  await page.getByRole("button", { name: "Hide" }).click();
  await expect(page.getByPlaceholder("Hide/Show Example")).toBeHidden();
  // For java popups use page.on
  page.on("dialog", (dialog) => dialog.accept());
  await page.getByRole("button", { name: "Confirm" }).click();
  await page.locator("#mousehover").hover();

  // frames
  const frame = page.frameLocator("#courses-iframe");
  await frame.getByRole("link", { name: "Learning paths" }).click();
  const jsBtn = frame.locator("[data-id='javascript']");
  await expect(jsBtn).toBeVisible();
  await jsBtn.click();
});
