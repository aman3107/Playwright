export class LoginPage {
  constructor(page) {
    this.page = page;
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.username = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
  }

  async goto(url) {
    await this.page.goto(url);
  }

  async login(username, password) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}
