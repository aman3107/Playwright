import { type Locator, type Page } from "@playwright/test";

export class CheckoutPage {
  readonly page: Page;
  readonly productPresent: Locator;
  readonly checkoutBtn: Locator;
  readonly years: Locator;
  readonly days: Locator;
  readonly cvv: Locator;
  readonly name: Locator;
  readonly coupon: Locator;
  readonly applyBtn: Locator;
  readonly couponAddText: Locator;
  readonly country: Locator;
  readonly countryDropdown: Locator;
  readonly placeOrderBtn: Locator;
  constructor(page: Page) {
    this.page = page;
    this.productPresent = page.locator(".cartSection h3");
    this.checkoutBtn = page.getByRole("button", { name: "Checkout" });
    this.years = page.getByRole("combobox").first();
    this.days = page.getByRole("combobox").last();
    this.cvv = page.getByRole("textbox").nth(1);
    this.name = page.getByRole("textbox").nth(2);
    this.coupon = page.locator("input[name='coupon']");
    this.applyBtn = page.getByRole("button", { name: "Apply Coupon" });
    this.couponAddText = page.locator("input[name='coupon']+p");
    this.country = page.getByPlaceholder("Select Country");
    this.countryDropdown = page.locator(".ta-results button");
    this.placeOrderBtn = page.getByText("Place Order");
  }

  async goToCheckoutPage(): Promise<void> {
    await this.checkoutBtn.click();
  }

  async addPaymentDetails(
    year: string,
    day: string,
    cvv: string,
    name: string,
    coupon: string,
  ) {
    await this.years.selectOption(year);
    await this.days.selectOption(day);
    await this.cvv.fill(cvv);
    await this.name.fill(name);
    await this.coupon.fill(coupon);
    await this.applyBtn.click();
  }

  async searchCountry(searchCountryText: string): Promise<void> {
    await this.country.pressSequentially(searchCountryText);
  }
  async selectCountry(countryName: string): Promise<void> {
    const options: string[] = await this.countryDropdown.allTextContents();

    const index: number = options.findIndex(
      (text) => text.trim() === countryName,
    );
    await this.countryDropdown.nth(index).click();
  }
  async placeOrder(): Promise<void> {
    await this.placeOrderBtn.click();
    await this.page.locator(".hero-primary").waitFor();
  }
}
