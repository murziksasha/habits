# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: chess-learning-hints.spec.ts >> Chess board learning hints (check chip, mate card, dots) >> 1. /play bot game: click dots, capture rings, drag, cancel, resign without card
- Location: e2e\chess-learning-hints.spec.ts:20:7

# Error details

```
TimeoutError: page.waitForURL: Timeout 25000ms exceeded.
=========================== logs ===========================
waiting for navigation until "load"
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
  27  | /**
  28  |  * Prefer API login + session cookie (works when UI form / MFA differs per env).
  29  |  * Falls back to form + TOTP.
  30  |  */
  31  | export async function loginAsAdmin(page: Page) {
  32  |   if (cachedAdminToken) {
  33  |     for (const u of [WEB_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"]) {
  34  |       await page.context().addCookies([
  35  |         {
  36  |           name: "eduforge_session",
  37  |           value: cachedAdminToken,
  38  |           url: u,
  39  |           httpOnly: true,
  40  |           sameSite: "Lax",
  41  |         },
  42  |       ]);
  43  |     }
  44  |     await page.goto("/learn");
  45  |     return;
  46  |   }
  47  |   try {
  48  |     const res = await page.request.post(`${API_URL}/auth/login`, {
  49  |       data: { email: ADMIN_EMAIL, password: ADMIN_PASSWORD },
  50  |       headers: {
  51  |         "Content-Type": "application/json",
  52  |         "X-Issue-Bearer": "1",
  53  |       },
  54  |     });
  55  |     if (res.ok()) {
  56  |       const json = (await res.json()) as {
  57  |         token?: string;
  58  |         mfaRequired?: boolean;
  59  |         mfaToken?: string;
  60  |       };
  61  |       if (json.mfaRequired && json.mfaToken) {
  62  |         const mfaRes = await page.request.post(`${API_URL}/auth/mfa/totp/verify`, {
  63  |           data: { mfaToken: json.mfaToken, code: currentTotp() },
  64  |           headers: {
  65  |             "Content-Type": "application/json",
  66  |             "X-Issue-Bearer": "1",
  67  |           },
  68  |         });
  69  |         if (mfaRes.ok()) {
  70  |           const mfaJson = (await mfaRes.json()) as { token?: string };
  71  |           if (mfaJson.token) {
  72  |             cachedAdminToken = mfaJson.token;
  73  |             for (const u of [WEB_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"]) {
  74  |               await page.context().addCookies([
  75  |                 {
  76  |                   name: "eduforge_session",
  77  |                   value: mfaJson.token,
  78  |                   url: u,
  79  |                   httpOnly: true,
  80  |                   sameSite: "Lax",
  81  |                 },
  82  |               ]);
  83  |             }
  84  |             await page.goto("/learn");
  85  |             return;
  86  |           }
  87  |         }
  88  |       } else if (json.token) {
  89  |         cachedAdminToken = json.token;
  90  |         for (const u of [WEB_ORIGIN, "http://localhost:3000", "http://127.0.0.1:3000"]) {
  91  |           await page.context().addCookies([
  92  |             {
  93  |               name: "eduforge_session",
  94  |               value: json.token,
  95  |               url: u,
  96  |               httpOnly: true,
  97  |               sameSite: "Lax",
  98  |             },
  99  |           ]);
  100 |         }
  101 |         await page.goto("/learn");
  102 |         return;
  103 |       }
  104 |     }
  105 |   } catch {
  106 |     /* fall through to form login */
  107 |   }
  108 | 
  109 |   await page.goto("/login");
  110 |   await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
  111 |   await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
  112 |   await page.getByRole("button", { name: /Увійти|Log in/i }).click();
  113 | 
  114 |   // MFA step: TOTP or backup code field
  115 |   const mfaInput = page.locator('input[placeholder="123456"], input[autocomplete="one-time-code"]');
  116 |   const mfaVisible = await mfaInput
  117 |     .first()
  118 |     .isVisible({ timeout: 5_000 })
  119 |     .catch(() => false);
  120 | 
  121 |   if (mfaVisible) {
  122 |     await mfaInput.first().fill(currentTotp());
  123 |     await page.getByRole("button", { name: /2FA|Підтвердити|Увійти|Log in/i }).click();
  124 |   }
  125 | 
  126 |   // Post-login may land on /learn (persona home), dashboard, admin, or profile
> 127 |   await page.waitForURL(/learn|dashboard|admin|profile|courses/, { timeout: 25_000 });
      |              ^ TimeoutError: page.waitForURL: Timeout 25000ms exceeded.
  128 | }
  129 | 
  130 | export async function loginAsAdminWithBackup(page: Page) {
  131 |   await page.goto("/login");
  132 |   await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
  133 |   await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
  134 |   await page.getByRole("button", { name: /Увійти|Log in/i }).click();
  135 | 
  136 |   const mfaInput = page.locator('input[placeholder="123456"], input[autocomplete="one-time-code"]');
  137 |   await expect(mfaInput.first()).toBeVisible({ timeout: 10_000 });
  138 |   await mfaInput.first().fill(ADMIN_BACKUP_CODE);
  139 |   await page.getByRole("button", { name: /2FA|Підтвердити|Увійти|Log in/i }).click();
  140 |   await page.waitForURL(/learn|dashboard|admin|profile|courses/, { timeout: 25_000 });
  141 | }
  142 | 
```