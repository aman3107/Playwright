import { type Locator, type Page } from "@playwright/test";
export class OrdersPage {
  readonly page: Page;
  readonly orderIdText: Locator;
  readonly orderBtn: Locator;
  readonly ordersRow: Locator;
  constructor(page: Page) {
    this.page = page;
    this.orderIdText = page.locator(".em-spacer-1 label").nth(1);
    this.orderBtn = page.locator("button[routerlink*='myorders']");
    this.ordersRow = page.locator("tbody tr");
  }

  async getOrderId(): Promise<string> {
    const orderId = await this.orderIdText.textContent();
    if (!orderId) {
      throw new Error("Order ID text not found");
    }

    return orderId.split("|")[1].trim();
  }

  async goToOrdersPage() {
    await this.orderBtn.click();
  }

  getOrderTable(orderId: string) {
    return this.ordersRow.filter({ hasText: orderId });
  }

  async viewOrder(orderId: string) {
    await this.getOrderTable(orderId)
      .getByRole("button", { name: "View" })
      .click();
  }
}
