import { test } from "@playwright/test";
import { POManager } from "../pageobjects_ts/POManager";
import {
  verifyElementContainText,
  verifyElementVisible,
} from "../utils/assertions";

test.beforeEach;

import testData from "../utils/placeorderTestData.json";

type TestData = {
  username: string;
  password: string;
  url: string;
  product: string;
  year: string;
  cvv: string;
  day: string;
  name: string;
  coupon: string;
  searchCountry: string;
  country: string;
  couponText: string;
};

const dataSet: TestData[] = testData;

for (const data of dataSet) {
  test(`@Web E2E ${data.product} Testing Script`, async ({ page }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginpage();
    await loginPage.goto(data.url);
    await loginPage.login(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.product);
    await verifyElementVisible(dashboardPage.cartBtn);
    await dashboardPage.gotoCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    await verifyElementContainText(checkoutPage.productPresent, data.product);

    await checkoutPage.goToCheckoutPage();
    await checkoutPage.addPaymentDetails(
      data.year,
      data.day,
      data.cvv,
      data.name,
      data.coupon,
    );
    await verifyElementContainText(checkoutPage.couponAddText, data.couponText);
    await checkoutPage.searchCountry(data.searchCountry);
    await verifyElementVisible(checkoutPage.countryDropdown.first());
    await checkoutPage.selectCountry(data.country);
    await checkoutPage.placeOrder();

    const orderPage = poManager.getOrdersPage();
    const orderId: string = await orderPage.getOrderId();
    await orderPage.goToOrdersPage();
    const ordersTable = orderPage.getOrderTable(orderId);
    await verifyElementVisible(ordersTable);
    await orderPage.viewOrder(orderId);
  });
}
