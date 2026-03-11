import { test, expect } from "@playwright/test";

test("E2E Testing Script", async ({ page }) => {
  const product = "ZARA COAT 3";
  const cartButton = page.locator("[routerlink*='cart']");
  const checkoutBtn = page.getByRole("button", { name: "Checkout" });
  const orderBtn = page.locator("button[routerlink*='myorders']");
  const years = page.getByRole("combobox").first();
  const days = page.getByRole("combobox").last();
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill("abctest31@gmail.com");
  await page.getByPlaceholder("enter your passsword").fill("Test@1234");
  await page.getByRole("button", { name: "Login" }).click();
  const cards = page.locator(".card-body");
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
  // await ordersTable.first().waitFor();
  // const orderIndex = await ordersTable
  //   .locator("th")
  //   .evaluateAll(
  //     (els, orderId) =>
  //       els.findIndex((el) => el.textContent.trim() === orderId),
  //     orderId,
  //   );
  // await ordersTable
  //   .nth(orderIndex)
  //   .getByRole("button", { name: "View" })
  //   .click();

  await ordersTable.getByRole("button", { name: "View" }).click();
});
