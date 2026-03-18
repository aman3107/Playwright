export class CheckoutPage {
  constructor(page) {
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

  async goToCheckoutPage() {
    await this.checkoutBtn.click();
  }

  async addPaymentDetails(year, day, cvv, name, coupon) {
    await this.years.selectOption(year);
    await this.days.selectOption(day);
    await this.cvv.fill(cvv);
    await this.name.fill(name);
    await this.coupon.fill(coupon);
    await this.applyBtn.click();
  }

  async searchCountry(searchCountryText) {
    await this.country.pressSequentially(searchCountryText);
  }
  async selectCountry(countryName) {
    const options = await this.countryDropdown.allTextContents();

    const index = options.findIndex((text) => text.trim() === countryName);
    await this.countryDropdown.nth(index).click();
  }
  async placeOrder() {
    await this.placeOrderBtn.click();
    await this.page.locator(".hero-primary").waitFor();
  }
}
