import { test, expect } from "@playwright/test";

test("should register a new user", async ({ page }) => {
  const email = `test-${crypto.randomUUID()}@example.com`;

  await page.goto("http://localhost:3000/register");

  await page.fill("input#name", "Test User");
  await page.fill("input#email", email);
  await page.fill("input#password", "strongp&ss123");
  await page.fill("input#confirmPassword", "strongp&ss123");

  await page.click('button[type="submit"]');
  await expect(page.getByTestId("spinner")).toBeVisible();
  await page.waitForURL("**/login", { timeout: 10000 });

  // valida que está mesmo na página esperada
  await expect(page).toHaveURL(/\/login$/);
});
