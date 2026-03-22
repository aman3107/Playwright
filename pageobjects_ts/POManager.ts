import { LoginPage } from "../pageobjects/LoginPage";
import { DashboardPage } from "../pageobjects/DashboardPage";
import { CheckoutPage } from "../pageobjects/CheckoutPage";
import { OrdersPage } from "../pageobjects/OrdersPage";
import { type Page } from "@playwright/test";
export class POManager {
  page: Page;
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  checkoutPage: CheckoutPage;
  ordersPage: OrdersPage;
  constructor(page: Page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.ordersPage = new OrdersPage(this.page);
  }

  getLoginpage(): LoginPage {
    return this.loginPage;
  }
  getDashboardPage(): DashboardPage {
    return this.dashboardPage;
  }
  getCheckoutPage(): CheckoutPage {
    return this.checkoutPage;
  }
  getOrdersPage(): OrdersPage {
    return this.ordersPage;
  }
}
