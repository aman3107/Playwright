import { type Locator, type Page } from "@playwright/test";
export class LoginPage {
  readonly page: Page;
  readonly loginBtn: Locator;
  readonly username: Locator;
  readonly password: Locator;
  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.username = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
  }

  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async login(username: string, password: string): Promise<void> {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}
