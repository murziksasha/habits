import { type Page, expect } from "@playwright/test";
import { Secret, TOTP } from "otpauth";

/** Must match packages/db seed default when SEED_ADMIN_TOTP_SECRET unset */
export const ADMIN_TOTP_SECRET =
  process.env.SEED_ADMIN_TOTP_SECRET ?? "JBSWY3DPEHPK3PXP";

export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@eduforge.ua";
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin12345";
export const ADMIN_BACKUP_CODE = process.env.SEED_ADMIN_BACKUP_CODE ?? "AAAA-BBBB";

export function currentTotp(secret: string = ADMIN_TOTP_SECRET): string {
  const totp = new TOTP({
    algorithm: "SHA1",
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secret),
  });
  return totp.generate();
}

/** Password login; if 2FA challenge appears, submit live TOTP from seed secret. */
export async function loginAsAdmin(page: Page) {
  await page.goto("/login");
  await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: /Увійти|Log in/i }).click();

  // MFA step: TOTP or backup code field
  const mfaInput = page.locator('input[placeholder="123456"], input[autocomplete="one-time-code"]');
  const mfaVisible = await mfaInput
    .first()
    .isVisible({ timeout: 5_000 })
    .catch(() => false);

  if (mfaVisible) {
    await mfaInput.first().fill(currentTotp());
    await page.getByRole("button", { name: /2FA|Підтвердити|Увійти|Log in/i }).click();
  }

  await page.waitForURL(/dashboard|admin/, { timeout: 25_000 });
}

export async function loginAsAdminWithBackup(page: Page) {
  await page.goto("/login");
  await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
  await page.getByRole("button", { name: /Увійти|Log in/i }).click();

  const mfaInput = page.locator('input[placeholder="123456"], input[autocomplete="one-time-code"]');
  await expect(mfaInput.first()).toBeVisible({ timeout: 10_000 });
  await mfaInput.first().fill(ADMIN_BACKUP_CODE);
  await page.getByRole("button", { name: /2FA|Підтвердити|Увійти|Log in/i }).click();
  await page.waitForURL(/dashboard|admin/, { timeout: 25_000 });
}
