export class OrdersPage {
  constructor(page) {
    this.page = page;
    this.orderIdText = page.locator(".em-spacer-1 label").nth(1);
    this.orderBtn = page.locator("button[routerlink*='myorders']");
    this.ordersRow = page.locator("tbody tr");
  }

  async getOrderId() {
    const orderId = await this.orderIdText.textContent();
    if (!orderId) {
      throw new Error("Order ID text not found");
    }

    return orderId.split("|")[1].trim();
  }

  async goToOrdersPage() {
    await this.orderBtn.click();
  }

  getOrderTable(orderId) {
    return this.ordersRow.filter({ hasText: orderId });
  }

  async viewOrder(orderId) {
    await this.getOrderTable(orderId)
      .getByRole("button", { name: "View" })
      .click();
  }
}
