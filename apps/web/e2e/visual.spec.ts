import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers";

/**
 * Visual regression baseline (Playwright screenshots).
 * Update baselines: `pnpm --filter @eduforge/web test:e2e -- --update-snapshots`
 * Skip with SKIP_E2E=1
 */
const skip = process.env.SKIP_E2E === "1";

test.describe("Visual baseline", () => {
  test.skip(skip, "SKIP_E2E=1");

  test.use({
    viewport: { width: 1280, height: 720 },
  });

  test("landing snapshot", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible({ timeout: 15_000 });
    await expect(page).toHaveScreenshot("landing.png", {
      maxDiffPixelRatio: 0.02,
      fullPage: true,
    });
  });

  test("login snapshot", async ({ page }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    await expect(page).toHaveScreenshot("login.png", {
      maxDiffPixelRatio: 0.02,
      fullPage: true,
    });
  });

  test("pricing snapshot", async ({ page }) => {
    await page.goto("/pricing");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 20_000 });
    // Wait for flags skeleton to settle
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot("pricing.png", {
      maxDiffPixelRatio: 0.03,
      fullPage: true,
    });
  });

  test("learn map snapshot (authenticated)", async ({ page }) => {
    await loginAsAdmin(page);
    // Dismiss wizard if present
    const skipWizard = page.getByRole("button", { name: /Пропустити|Skip/i });
    if (await skipWizard.isVisible().catch(() => false)) {
      await skipWizard.click();
      await page.waitForTimeout(300);
    }
    await page.goto("/learn");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 20_000 });
    await page.waitForTimeout(400);
    await expect(page).toHaveScreenshot("learn.png", {
      maxDiffPixelRatio: 0.04,
      fullPage: true,
    });
  });

  test("admin dashboard snapshot", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/admin");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 20_000 });
    await page.waitForTimeout(400);
    await expect(page).toHaveScreenshot("admin-home.png", {
      maxDiffPixelRatio: 0.05,
      fullPage: true,
    });
  });
});
