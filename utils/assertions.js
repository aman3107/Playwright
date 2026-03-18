import { expect } from "@playwright/test";

export const verifyElementVisible = async (locator) => {
  await expect(locator).toBeVisible();
};

export const verifyElementContainText = async (locator, text) => {
  await expect(locator).toContainText(text);
};
