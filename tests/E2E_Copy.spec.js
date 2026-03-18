import { test } from "@playwright/test";
import { POManager } from "../pageobjects/POManager";
import {
  verifyElementContainText,
  verifyElementVisible,
} from "../utils/assertions";

import { customData } from "../utils/test-base";

import testData from "../utils/placeorderTestData.json" assert { type: "json" };
testData.forEach((data, index) => {
  test(`E2E ${data.product} Testing Script`, async ({ page }) => {
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
    const orderId = await orderPage.getOrderId();
    await orderPage.goToOrdersPage();
    const ordersTable = orderPage.getOrderTable(orderId);
    await verifyElementVisible(ordersTable);
    await orderPage.viewOrder(orderId);
  });
});

customData.only(
  `E2E Testing Script using fixtures`,
  async ({ page, testDataOrder }) => {
    const poManager = new POManager(page);
    const loginPage = poManager.getLoginpage();
    await loginPage.goto(testDataOrder.url);
    await loginPage.login(testDataOrder.username, testDataOrder.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(testDataOrder.product);
    await verifyElementVisible(dashboardPage.cartBtn);
    await dashboardPage.gotoCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    await verifyElementContainText(
      checkoutPage.productPresent,
      testDataOrder.product,
    );

    await checkoutPage.goToCheckoutPage();
    await checkoutPage.addPaymentDetails(
      testDataOrder.year,
      testDataOrder.day,
      testDataOrder.cvv,
      testDataOrder.name,
      testDataOrder.coupon,
    );
    await verifyElementContainText(
      checkoutPage.couponAddText,
      testDataOrder.couponText,
    );
    await checkoutPage.searchCountry(testDataOrder.searchCountry);
    await verifyElementVisible(checkoutPage.countryDropdown.first());
    await checkoutPage.selectCountry(testDataOrder.country);
    await checkoutPage.placeOrder();

    const orderPage = poManager.getOrdersPage();
    const orderId = await orderPage.getOrderId();
    await orderPage.goToOrdersPage();
    const ordersTable = orderPage.getOrderTable(orderId);
    await verifyElementVisible(ordersTable);
    await orderPage.viewOrder(orderId);
  },
);
