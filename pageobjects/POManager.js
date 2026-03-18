import { LoginPage } from "../pageobjects/LoginPage";
import { DashboardPage } from "../pageobjects/DashboardPage";
import { CheckoutPage } from "../pageobjects/CheckoutPage";
import { OrdersPage } from "../pageobjects/OrdersPage";

export class POManager {
  constructor(page) {
    this.page = page;
    this.loginPage = new LoginPage(this.page);
    this.dashboardPage = new DashboardPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.ordersPage = new OrdersPage(this.page);
  }

  getLoginpage() {
    return this.loginPage;
  }
  getDashboardPage() {
    return this.dashboardPage;
  }
  getCheckoutPage() {
    return this.checkoutPage;
  }
  getOrdersPage() {
    return this.ordersPage;
  }
}
