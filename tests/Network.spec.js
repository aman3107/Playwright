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

const fakeOrderPayload = { data: [], message: "No Orders" };
let token;
let apiOrderId;
test.beforeAll("API", async () => {
  const APIContext = await request.newContext();
  const apiInfo = new APIUtils(APIContext, loginPayload);
  token = await apiInfo.getLoginToken();
  apiOrderId = await apiInfo.getOrderId(orderPayload);
});

test.beforeEach("Login Token", async ({ page }) => {
  await page.addInitScript((value) => {
    window.localStorage.setItem("token", value);
  }, token);
});

test("How to fake response", async ({ page }) => {
  const orderBtn = page.locator("button[routerlink*='myorders']");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      // Intercepting response -> API response || send fake response -> browser -> render data on front end
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakeOrderPayload);
      route.fulfill({
        response,
        body,
      });
    },
  );
  await orderBtn.click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
  );
  console.log(await page.locator(".mt-4").textContent());
});
