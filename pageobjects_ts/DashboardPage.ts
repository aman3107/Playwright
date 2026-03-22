import { type Locator, type Page } from "@playwright/test";
export class DashboardPage {
  readonly page: Page;
  readonly cards: Locator;
  readonly cartBtn: Locator;
  constructor(page: Page) {
    this.page = page;
    this.cards = page.locator(".card-body");
    this.cartBtn = page.locator("[routerlink*='cart']");
  }

  async searchProductAddCart(product: string): Promise<void> {
    await this.cards.first().waitFor();
    await this.cards
      .filter({ hasText: product })
      .getByRole("button", { name: "Add To Cart" })
      .click();
  }

  async gotoCartPage(): Promise<void> {
    await this.cartBtn.click();
  }
}
