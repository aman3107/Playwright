export class DashboardPage {
  constructor(page) {
    this.page = page;
    this.cards = page.locator(".card-body");
    this.cartBtn = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(product) {
    await this.cards.first().waitFor();
    await this.cards
      .filter({ hasText: product })
      .getByRole("button", { name: "Add To Cart" })
      .click();
  }

  async gotoCartPage() {
    await this.cartBtn.click();
  }
}
