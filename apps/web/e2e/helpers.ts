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

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000";
const WEB_ORIGIN = process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000";

/**
 * Prefer API login + session cookie (works when UI form / MFA differs per env).
 * Falls back to form + TOTP.
 */
export async function loginAsAdmin(page: Page) {
  try {
    const res = await page.request.post(`${API_URL}/auth/login`, {
      data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
      headers: {
        "Content-Type": "application/json",
        "X-Issue-Bearer": "1",
      },
    });
    if (res.ok()) {
      const json = (await res.json()) as {
        token?: string;
        mfaRequired?: boolean;
        mfaToken?: string;
      };
      if (json.mfaRequired && json.mfaToken) {
        const mfaRes = await page.request.post(`${API_URL}/auth/mfa/verify-login`, {
          data: { mfaToken: json.mfaToken, code: currentTotp() },
          headers: {
            "Content-Type": "application/json",
            "X-Issue-Bearer": "1",
          },
        });
        if (mfaRes.ok()) {
          const mfaJson = (await mfaRes.json()) as { token?: string };
          if (mfaJson.token) {
            await page.context().addCookies([
              {
                name: "eduforge_session",
                value: mfaJson.token,
                url: WEB_ORIGIN,
                httpOnly: true,
                sameSite: "Lax",
              },
            ]);
            await page.goto("/learn");
            return;
          }
        }
      } else if (json.token) {
        await page.context().addCookies([
          {
            name: "eduforge_session",
            value: json.token,
            url: WEB_ORIGIN,
            httpOnly: true,
            sameSite: "Lax",
          },
        ]);
        await page.goto("/learn");
        return;
      }
    }
  } catch {
    /* fall through to form login */
  }

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

  // Post-login may land on /learn (persona home), dashboard, admin, or profile
  await page.waitForURL(/learn|dashboard|admin|profile|courses/, { timeout: 25_000 });
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
  await page.waitForURL(/learn|dashboard|admin|profile|courses/, { timeout: 25_000 });
}
