import { expect, type Locator, type Page } from "@playwright/test";
let message: string = "hello";
let num1: number = 2;
let isActive: boolean = false;

let numbers: number[] = [1, 2, 3, 4];

let data: any = 2;
console.log("Hello");

const fn = (age: number, name: string) => {
  console.log(`Hi, My Name is ${name} and my age is ${age}`);
};

fn(20, "Aman Mittal");

const sum = (a: number, b: number): number => {
  return a + b;
};

console.log(sum(3, 2));

let user: { name: string; age: number } = {
  name: "Aman",
  age: 34,
};

class LoginPage {
  page: Page;
  loginBtn: Locator;
  username: Locator;
  password: Locator;
  constructor(page: Page) {
    this.page = page;
    this.loginBtn = page.getByRole("button", { name: "Login" });
    this.username = page.getByPlaceholder("email@example.com");
    this.password = page.getByPlaceholder("enter your passsword");
  }

  async goto(url: string) {
    await this.page.goto(url);
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginBtn.click();
  }
}
