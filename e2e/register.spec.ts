import { test, expect } from "@playwright/test";

test.describe.serial("Registration flow", () => {
  const email = `test-${crypto.randomUUID()}@example.com`;

  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000/register");
    await page.getByTestId("name").fill("Test User");
    await page.getByTestId("email").fill(email);
    await page.getByTestId("password").fill("Strongp&ss123");
    await page.getByTestId("confirm-password").fill("Strongp&ss123");
    await page.getByTestId("submit-button").click();
  });

  test("should register a new user", async ({ page }) => {
    await expect(page).toHaveURL(/\/login$/, { timeout: 20000 });
  });

  test("should show error for existing email", async ({ page }) => {
    await expect(page.getByTestId("error-message")).toBeVisible();
    await expect(page.getByTestId("error-message")).toHaveText(
      "Email already exists"
    );
  });
});
