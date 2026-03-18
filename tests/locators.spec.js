import { test, expect } from "@playwright/test";

// parellel  running in a single test file
test.describe.configure({ mode: "parallel" });

test("Locators Practise", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/#/");
  await page.getByRole("textbox", { name: "username" }).fill("test");
  await page.getByRole("textbox", { name: "password" }).fill("1234");
  await page.getByText("Admin").check();
  await page.getByRole("combobox").selectOption("Teacher");
  await page.getByRole("button", { name: /Sign In/ }).click();
  const errorLocator = page.getByText("Incorrect username/password.");
  const errorMessage = await errorLocator.textContent();
  console.log(errorMessage);
  await expect(errorLocator).toContainText("Incorrect");
});

test("Locators Practise 2", async ({ page }) => {
  const cardTitles = page.locator(".card-body a");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/#/");
  await page.getByLabel("Username:").fill("rahulshettyacademy");
  await page.getByLabel("Password:").fill("Learning@830$3mK2");
  await page.getByText("Admin").check();
  await page.getByRole("combobox").selectOption("Teacher");
  await page.getByRole("button", { name: /Sign In/ }).click();
  // console.log(await cardTitles.nth(0).textContent());
  await expect(cardTitles.first()).toBeVisible();
  const titles = await cardTitles.allTextContents();
  console.log(titles);
});

test("Locators Practise 3", async ({ page }) => {
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page
    .getByRole("textbox", { name: "email@example.com" })
    .fill("abctest31@gmail.com");
  await page
    .getByRole("textbox", { name: "enter your passsword" })
    .fill("Test@1234");
  await page.getByRole("button", { name: "Login" }).click();
  // await expect(products.first()).toBeVisible();
  await page.waitForLoadState("networkidle");
  const productNames = await products.allTextContents();
  console.log(productNames);
});

test("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/#/");
  await page.getByLabel("Username:").fill("rahulshettyacademy");
  await page.getByLabel("Password:").fill("Learning@830$3mK2");
  const dropdown = page.getByRole("combobox");
  await dropdown.selectOption("Consultant");
  await page.getByRole("radio", { name: " User" }).check();
  expect(page.getByRole("radio", { name: " User" })).toBeChecked();
  await page.getByRole("button", { name: "Okay" }).click();
  await page.getByRole("checkbox", { name: "terms" }).check();

  await expect(
    page.getByRole("Link", { name: "Free Access to InterviewQues/" }),
  ).toHaveClass("blinkingText");
});

test("Child Windows Handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const documentLink = page.getByRole("link", {
    name: "Free Access to InterviewQues/",
  });

  await page.goto("https://rahulshettyacademy.com/loginpagePractise/#/");
  const [newPage] = await Promise.all([
    context.waitForEvent("page"),
    documentLink.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  const email = text.split("@")[1].split(" ")[0];
  const email1 = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/)[0];
  console.log(email);
  console.log(email1);
  await page.getByLabel("Username:").fill(email);
  console.log(await page.getByLabel("Username:").inputValue());
});
