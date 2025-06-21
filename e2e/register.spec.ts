import { test, expect } from "@playwright/test";

test("should register a new user", async ({ page }) => {
  const email = `test-${crypto.randomUUID()}@example.com`;

  await page.goto("http://localhost:3000/register");

  await page.getByTestId("name").fill("Test User");
  await page.getByTestId("email").fill(email);
  await page.getByTestId("password").fill("Strongp&ss123");
  await page.getByTestId("confirm-password").fill("Strongp&ss123");
  await page.getByTestId("submit-button").click();

  await expect(page.getByTestId("spinner")).toBeVisible();
  await expect(page).toHaveURL(/\/login$/, { timeout: 20000 });
});
