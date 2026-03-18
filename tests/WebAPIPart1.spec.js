import { test, expect, request } from "@playwright/test";
import { APIUtils } from "../utils/APIUtils";
const loginPayload = {
  userEmail: "abctest31@gmail.com",
  userPassword: "Test@1234",
};
const orderPayload = {
  orders: [
    { country: "Germany", productOrderedId: "6960eac0c941646b7a8b3e68" },
  ],
};
let token;
let apiOrderId;
test.beforeAll("API", async () => {
  const APIContext = await request.newContext();
  const apiInfo = new APIUtils(APIContext, loginPayload);
  token = await apiInfo.getLoginToken();
  apiOrderId = await apiInfo.getOrderId(orderPayload);
  // const response = await APIContext.post(
  //   "https://rahulshettyacademy.com/api/ecom/auth/login",
  //   {
  //     data: loginPayload,
  //   },
  // );

  // expect(response.status()).toBe(200);
  // const responseJson = await response.json();
  // token = responseJson.token;

  // //
  // const orderResponse = await APIContext.post(
  //   "https://rahulshettyacademy.com/api/ecom/order/create-order",
  //   {
  //     data: orderPayload,
  //     headers: {
  //       Authorization: token,
  //       "Content-Type": "application/json",
  //     },
  //   },
  // );

  // const orderResponseJson = await orderResponse.json();
  // apiOrderId = orderResponseJson.orders[0];
  // console.log(apiOrderId);
});

test.beforeEach("Login Token", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
});

test("Order using API", async ({ page }) => {
  const orderBtn = page.locator("button[routerlink*='myorders']");
  // To abort any network calls
  await page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());
  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.url(), response.status()),
  );
  await page.goto("https://rahulshettyacademy.com/client");
  await orderBtn.click();
  const ordersTable = page.locator("tbody tr", { hasText: apiOrderId });
  await expect(ordersTable).toBeVisible();
  await ordersTable.getByRole("button", { name: "View" }).click();
  await page.pause();
});

test("E2E Testing Script", async ({ page }) => {
  const product = "ZARA COAT 3";
  const cartButton = page.locator("[routerlink*='cart']");
  const checkoutBtn = page.getByRole("button", { name: "Checkout" });
  const orderBtn = page.locator("button[routerlink*='myorders']");
  const years = page.getByRole("combobox").first();
  const days = page.getByRole("combobox").last();
  await page.goto("https://rahulshettyacademy.com/client");
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
  await ordersTable.getByRole("button", { name: "View" }).click();
});

test("E2E Testing Script 2", async ({ page }) => {
  const product = "ADIDAS ORIGINAL";
  const cartButton = page.locator("[routerlink*='cart']");
  const checkoutBtn = page.getByRole("button", { name: "Checkout" });
  const orderBtn = page.locator("button[routerlink*='myorders']");
  const years = page.getByRole("combobox").first();
  const days = page.getByRole("combobox").last();
  await page.goto("https://rahulshettyacademy.com/client");
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
  await ordersTable.getByRole("button", { name: "View" }).click();
});
