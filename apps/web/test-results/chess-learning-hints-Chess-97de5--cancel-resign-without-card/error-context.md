# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chess-learning-hints.spec.ts >> Chess board learning hints (check chip, mate card, dots) >> 1. /play bot game: click dots, capture rings, drag, cancel, resign without card
- Location: e2e\chess-learning-hints.spec.ts:5:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 25000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
  navigated to "http://localhost:3000/login"
============================================================
```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - link "Skip to content · До змісту" [ref=e2] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e3]:
    - generic [ref=e4]:
      - link "E EduForge" [ref=e5] [cursor=pointer]:
        - /url: /
        - generic [ref=e6]: E
        - generic [ref=e7]: EduForge
      - navigation "Головна навігація" [ref=e8]:
        - link "Головна" [ref=e9] [cursor=pointer]:
          - /url: /dashboard
        - link "Навчання" [ref=e10] [cursor=pointer]:
          - /url: /learn
        - link "Курси" [ref=e11] [cursor=pointer]:
          - /url: /courses
        - link "Код" [ref=e12] [cursor=pointer]:
          - /url: /programming
        - link "Грати" [ref=e13] [cursor=pointer]:
          - /url: /play
        - link "Друзі" [ref=e14] [cursor=pointer]:
          - /url: /friends
        - button "Ще ▾" [ref=e16] [cursor=pointer]
      - generic [ref=e17]:
        - link "Увійти" [ref=e18] [cursor=pointer]:
          - /url: /login
        - link "Реєстрація" [ref=e19] [cursor=pointer]:
          - /url: /register
        - button "🌙" [ref=e20] [cursor=pointer]
        - generic [ref=e21]:
          - button "UK" [ref=e22] [cursor=pointer]
          - button "EN" [ref=e23] [cursor=pointer]
  - main [ref=e24]:
    - heading "EduForge · Увійти" [level=1] [ref=e25]
    - generic [ref=e26]:
      - heading "Вхід до EduForge" [level=1] [ref=e27]
      - generic [ref=e28]:
        - generic [ref=e29]:
          - generic [ref=e30]: 2FA (TOTP or backup code)
          - textbox "123456" [ref=e31]
          - paragraph [ref=e32]: 6-digit authenticator code or one-time backup (XXXX-XXXX)
        - button "Підтвердити 2FA" [ref=e33] [cursor=pointer]
      - paragraph [ref=e34]:
        - link "Забули пароль?" [ref=e35] [cursor=pointer]:
          - /url: /forgot-password
      - paragraph [ref=e36]:
        - text: Немає акаунта?
        - link "Реєстрація" [ref=e37] [cursor=pointer]:
          - /url: /register
  - button "Open Next.js Dev Tools" [ref=e43] [cursor=pointer]:
    - img [ref=e44]
  - alert [ref=e47]
```

# Test source

```ts
  6   |   process.env.SEED_ADMIN_TOTP_SECRET ?? "JBSWY3DPEHPK3PXP";
  7   | 
  8   | export const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@eduforge.ua";
  9   | export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "admin12345";
  10  | export const ADMIN_BACKUP_CODE = process.env.SEED_ADMIN_BACKUP_CODE ?? "AAAA-BBBB";
  11  | 
  12  | export function currentTotp(secret: string = ADMIN_TOTP_SECRET): string {
  13  |   const totp = new TOTP({
  14  |     algorithm: "SHA1",
  15  |     digits: 6,
  16  |     period: 30,
  17  |     secret: Secret.fromBase32(secret),
  18  |   });
  19  |   return totp.generate();
  20  | }
  21  | 
  22  | const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:4000";
  23  | const WEB_ORIGIN = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
  24  | 
  25  | /**
  26  |  * Prefer API login + session cookie (works when UI form / MFA differs per env).
  27  |  * Falls back to form + TOTP.
  28  |  */
  29  | export async function loginAsAdmin(page: Page) {
  30  |   try {
  31  |     const res = await page.request.post(`${API_URL}/auth/login`, {
  32  |       data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  33  |       headers: {
  34  |         "Content-Type": "application/json",
  35  |         "X-Issue-Bearer": "1",
  36  |       },
  37  |     });
  38  |     if (res.ok()) {
  39  |       const json = (await res.json()) as {
  40  |         token?: string;
  41  |         mfaRequired?: boolean;
  42  |         mfaToken?: string;
  43  |       };
  44  |       if (json.mfaRequired && json.mfaToken) {
  45  |         const mfaRes = await page.request.post(`${API_URL}/auth/mfa/verify-login`, {
  46  |           data: { mfaToken: json.mfaToken, code: currentTotp() },
  47  |           headers: {
  48  |             "Content-Type": "application/json",
  49  |             "X-Issue-Bearer": "1",
  50  |           },
  51  |         });
  52  |         if (mfaRes.ok()) {
  53  |           const mfaJson = (await mfaRes.json()) as { token?: string };
  54  |           if (mfaJson.token) {
  55  |             for (const u of [WEB_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"]) {
  56  |               await page.context().addCookies([
  57  |                 {
  58  |                   name: "eduforge_session",
  59  |                   value: mfaJson.token,
  60  |                   url: u,
  61  |                   httpOnly: true,
  62  |                   sameSite: "Lax",
  63  |                 },
  64  |               ]);
  65  |             }
  66  |             await page.goto("/learn");
  67  |             return;
  68  |           }
  69  |         }
  70  |       } else if (json.token) {
  71  |         await page.context().addCookies([
  72  |           {
  73  |             name: "eduforge_session",
  74  |             value: json.token,
  75  |             url: WEB_ORIGIN,
  76  |             httpOnly: true,
  77  |             sameSite: "Lax",
  78  |           },
  79  |         ]);
  80  |         await page.goto("/learn");
  81  |         return;
  82  |       }
  83  |     }
  84  |   } catch {
  85  |     /* fall through to form login */
  86  |   }
  87  | 
  88  |   await page.goto("/login");
  89  |   await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
  90  |   await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
  91  |   await page.getByRole("button", { name: /Увійти|Log in/i }).click();
  92  | 
  93  |   // MFA step: TOTP or backup code field
  94  |   const mfaInput = page.locator('input[placeholder="123456"], input[autocomplete="one-time-code"]');
  95  |   const mfaVisible = await mfaInput
  96  |     .first()
  97  |     .isVisible({ timeout: 5_000 })
  98  |     .catch(() => false);
  99  | 
  100 |   if (mfaVisible) {
  101 |     await mfaInput.first().fill(currentTotp());
  102 |     await page.getByRole("button", { name: /2FA|Підтвердити|Увійти|Log in/i }).click();
  103 |   }
  104 | 
  105 |   // Post-login may land on /learn (persona home), dashboard, admin, or profile
> 106 |   await page.waitForURL(/learn|dashboard|admin|profile|courses/, { timeout: 25_000 });
      |              ^ TimeoutError: page.waitForURL: Timeout 25000ms exceeded.
  107 | }
  108 | 
  109 | export async function loginAsAdminWithBackup(page: Page) {
  110 |   await page.goto("/login");
  111 |   await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
  112 |   await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
  113 |   await page.getByRole("button", { name: /Увійти|Log in/i }).click();
  114 | 
  115 |   const mfaInput = page.locator('input[placeholder="123456"], input[autocomplete="one-time-code"]');
  116 |   await expect(mfaInput.first()).toBeVisible({ timeout: 10_000 });
  117 |   await mfaInput.first().fill(ADMIN_BACKUP_CODE);
  118 |   await page.getByRole("button", { name: /2FA|Підтвердити|Увійти|Log in/i }).click();
  119 |   await page.waitForURL(/learn|dashboard|admin|profile|courses/, { timeout: 25_000 });
  120 | }
  121 | 
```