import { test, expect } from "@playwright/test";
import {
  ADMIN_BACKUP_CODE,
  ADMIN_EMAIL,
  ADMIN_PASSWORD,
  currentTotp,
  loginAsAdmin,
  loginAsAdminWithBackup,
} from "./helpers";

const skip = process.env.SKIP_E2E === "1";

test.describe("Admin MFA (real TOTP + backup)", () => {
  test.skip(skip, "SKIP_E2E=1");

  test("password then live TOTP opens admin", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();

    const mfa = page.locator('input[placeholder="123456"], input[autocomplete="one-time-code"]').first();
    await expect(mfa).toBeVisible({ timeout: 10_000 });
    await mfa.fill(currentTotp());
    await page.getByRole("button", { name: /2FA|Підтвердити|Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });

    await page.goto("/admin");
    await expect(page.getByText(/Адмін|Admin|Dashboard/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("loginAsAdmin helper works", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/security");
    await expect(page.getByText(/Security|Безпека|TOTP|2FA/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("backup code login (consumes seed code — run after re-seed if flaky)", async ({
    page,
  }) => {
    // Skip if code already burned; re-seed restores AAAA-BBBB
    test.skip(process.env.SKIP_BACKUP_E2E === "1", "SKIP_BACKUP_E2E=1");
    await loginAsAdminWithBackup(page);
    await page.goto("/admin");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    // force use of constant so unused lint is quiet in some setups
    expect(ADMIN_BACKUP_CODE.length).toBeGreaterThan(3);
  });

  test("admin content shows visual exercise builder", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin/content");
    await expect(page.getByText(/Контент|Content|Visual blocks/i).first()).toBeVisible({
      timeout: 15_000,
    });
    // open first lesson if present
    const lessonBtn = page.locator("button").filter({ hasText: /\(/ }).first();
    if (await lessonBtn.isVisible().catch(() => false)) {
      await lessonBtn.click();
      await expect(page.getByText(/Visual blocks|Advanced JSON|exercise/i).first()).toBeVisible({
        timeout: 10_000,
      });
    }
  });
});
