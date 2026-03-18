import { test, expect } from "@playwright/test";

test.beforeAll("Login", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill("abctest31@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Test@1234");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
});

test("API Login using Json", async ({ browser }) => {
  const context = await browser.newContext({ storageState: "state.json" });
  const page = await context.newPage();
  const product = "ZARA COAT 3";
  const cartButton = page.locator("[routerlink*='cart']");
  const checkoutBtn = page.getByRole("button", { name: "Checkout" });
  const orderBtn = page.locator("button[routerlink*='myorders']");
  const years = page.getByRole("combobox").first();
  const days = page.getByRole("combobox").last();
  const cards = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await cards.first().waitFor();
  await cards
    .filter({ hasText: product })
    .getByRole("button", { name: "Add To Cart" })
    .click();
  await expect(cartButton).toBeVisible();
  await cartButton.click();
  const productPresent = page.locator(".cartSection h3");
  await expect(productPresent).toContainText(product);
  expect(productPresent).toBeTruthy();
  await checkoutBtn.click();
  await years.selectOption("11");
  await days.selectOption("30");
  await page.getByRole("textbox").nth(1).fill("123");
  await page.getByRole("textbox").nth(2).fill("Aman");
  await page.locator("input[name='coupon']").fill("rahulshettyacademy");
  await page.getByRole("button", { name: "Apply Coupon" }).click();
  await expect(page.locator("input[name='coupon']+p")).toContainText(
    "* Coupon Applied",
  );
  await page.getByPlaceholder("Select Country").pressSequentially("Ind");

  const dropdown = page.locator(".ta-results button");
  await expect(dropdown.first()).toBeVisible();
  const index = await dropdown.evaluateAll((els) =>
    els.findIndex((el) => el.textContent.trim() === "India"),
  );
  await dropdown.nth(index).click();
  await page.getByText("Place Order").click();
  await page.locator(".hero-primary").waitFor();
  const text = await page.locator(".em-spacer-1 label").nth(1).textContent();
  const orderId = text.split("|")[1].trim();
  await orderBtn.click();
  const ordersTable = page.locator("tbody tr", { hasText: orderId });
  await expect(ordersTable).toBeVisible();
  await ordersTable.getByRole("button", { name: "View" }).click();
});
