import { test as base } from "@playwright/test";

export const customData = base.extend({
  testDataOrder: {
    username: "abctest31@gmail.com",
    password: "Test@1234",
    url: "https://rahulshettyacademy.com/client",
    product: "ZARA COAT 3",
    year: "11",
    cvv: "123",
    day: "30",
    name: "Aman",
    coupon: "rahulshettyacademy",
    searchCountry: "Ind",
    country: "India",
    couponText: "* Coupon Applied",
  },
});
