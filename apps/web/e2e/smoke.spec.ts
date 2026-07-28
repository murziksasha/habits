import { test, expect } from "@playwright/test";

/**
 * End-to-end smoke against running stack (web + api + seeded DB).
 * Skip with: SKIP_E2E=1
 */
const skip = process.env.SKIP_E2E === "1";

test.describe("EduForge smoke", () => {
  test.skip(skip, "SKIP_E2E=1");

  const suffix = Date.now();
  const email = `e2e-${suffix}@eduforge.test`;
  const password = "password123";
  const displayName = `E2E${suffix}`;

  test("landing shows product CTAs", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("lang", "uk");
    await expect(page.getByText(/EduForge|Навчайся|Learn|Learning OS/i).first()).toBeVisible();
    // Register CTA (uk UI strings) or EN marketing fallbacks
    await expect(
      page.getByRole("link", { name: /Почати|Start free|безкоштовно|Реєстрація|Sign up/i }).first(),
    ).toBeVisible();
  });

  test("register → dashboard → english course → lesson", async ({ page }) => {
    await page.goto("/register");

    await page.locator("input").nth(0).fill(displayName);
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill(password);

    await page.getByRole("button", { name: /Зареєструватися|Реєстрація|Sign up/i }).click();
    await page.waitForURL(/\/(dashboard|courses)/, { timeout: 25_000 });

    await expect(page.getByText(displayName).first()).toBeVisible({ timeout: 15_000 });

    await page.goto("/courses/english");
    await expect(page.locator("main")).toBeVisible();

    const lessonLink = page.locator('a[href*="/lessons/"]').first();
    await expect(lessonLink).toBeVisible({ timeout: 15_000 });
    await lessonLink.click();
    await page.waitForURL(/\/lessons\//, { timeout: 15_000 });
    await expect(page.locator("main")).toBeVisible();

    const optionButtons = page.locator(".card button.rounded-2xl, .card button.w-full");
    if ((await optionButtons.count()) > 0) {
      await optionButtons.first().click();
      const checkBtn = page.getByRole("button", { name: /Перевірити|Далі|Check/i });
      if (await checkBtn.isVisible().catch(() => false)) {
        await checkBtn.click();
      }
    }
  });

  test("login admin and open admin panel", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/admin");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/Адмін|Admin|Користувач|урок|XP/i).first()).toBeVisible();
  });

  test("play page shows bot option", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/play");
    await expect(page.getByRole("button", { name: /бот|Bot|Знайти|Find/i }).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("flashcards page loads decks", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/flashcards");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/SRS|Картк|deck|English|основ/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("placement page shows questions", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/placement");
    await expect(page.getByText(/Placement|student|рівень/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("profile has push toggle", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/profile");
    await expect(page.getByText(/Push|push/i).first()).toBeVisible({ timeout: 15_000 });
  });

  test("playground loads challenges", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/playground");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    await expect(
      page.getByText(/playground|Challenge|JavaScript|Запустити|Run/i).first(),
    ).toBeVisible({ timeout: 15_000 });
  });

  test("programming hub, stack route, free lesson", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/programming");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/HTML|CSS|JavaScript|Programming|Програмування/i).first()).toBeVisible({
      timeout: 15_000,
    });
    // Minis board / weekly race section (seed-dependent but labels always present after load)
    await expect(
      page.getByText(/Mini-projects|minis|гонка|race|Path/i).first(),
    ).toBeVisible({ timeout: 15_000 });
    await page.goto("/programming/html");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    await page.goto("/courses/programming");
    await expect(page.locator("main")).toBeVisible();
    const lessonLink = page.locator('a[href*="/lessons/"]').first();
    if (await lessonLink.isVisible().catch(() => false)) {
      await lessonLink.click();
      await page.waitForURL(/\/lessons\//, { timeout: 15_000 });
      // Soft-grade UX: check button present on first exercise
      await expect(
        page.getByRole("button", { name: /Перевірити|Check/i }).first(),
      ).toBeVisible({ timeout: 10_000 });
      // Focus mode chrome control
      await expect(
        page.getByRole("button", { name: /Focus|Фокус|Full|Усе/i }).first(),
      ).toBeVisible({ timeout: 5_000 });
    }
  });

  test("dashboard shows programming or race teaser when logged in", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await expect(page.locator("main")).toBeVisible();
    // Programming card and/or minis race and/or quick links
    await expect(
      page.getByText(/Програмування|Programming|Код|playground|minis|гонка/i).first(),
    ).toBeVisible({ timeout: 15_000 });
  });

  test("embed playground is public", async ({ page }) => {
    await page.goto("/embed/playground");
    await expect(page.getByText(/playground|embed|Запустити|Run/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("homework page loads for admin", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/homework");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
  });

  test("openapi docs reachable via API origin is optional", async ({ request }) => {
    const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    const res = await request.get(`${api}/openapi.json`);
    expect(res.ok()).toBeTruthy();
    const json = await res.json();
    expect(json.openapi).toMatch(/^3\./);
    expect(json.paths["/push/vapid-public-key"]).toBeTruthy();
    expect(json.paths["/analytics/class/{classId}"]).toBeTruthy();
    expect(json.paths["/friends/minis"]).toBeTruthy();
    expect(json.paths["/friends/race"]).toBeTruthy();
    expect(json.paths["/learning/programming/minis/race"]).toBeTruthy();
    expect(json.paths["/auth/sessions"]).toBeTruthy();
    expect(json.paths["/auth/logout-others"]).toBeTruthy();
  });

  test("friends page loads social minis sections", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/friends");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/Друз|Friends|Minis|гонка|race/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("typescript hub and feedback page load", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/typescript");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/TypeScript|типи|types|Контрольн|Exam/i).first()).toBeVisible({
      timeout: 15_000,
    });
    await page.goto("/feedback");
    await expect(page.getByText(/Відгук|Feedback|розробник|developer|bug/i).first()).toBeVisible({
      timeout: 15_000,
    });
  });

  test("mobile-friendly learn and bottom destinations exist", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    for (const path of ["/learn", "/programming", "/play", "/profile"]) {
      await page.goto(path);
      await expect(page.locator("main")).toBeVisible({ timeout: 15_000 });
    }
  });

  test("learn map page loads", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/learn");
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    await expect(
      page.getByText(/Навчання|Learn|Deep|Контрольн|Exam|Код|Skills/i).first(),
    ).toBeVisible({ timeout: 15_000 });
  });

  test("deep track hubs load", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    for (const path of [
      "/html-semantics",
      "/css-layout",
      "/qa-theory",
      "/js-fundamentals",
      "/react-fundamentals",
      "/sql-fundamentals",
      "/node-fundamentals",
      "/express-fundamentals",
    ]) {
      await page.goto(path);
      await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    }
  });

  test("profile shows push and programming blocks", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/profile");
    await expect(page.getByText(/Push|push/i).first()).toBeVisible({ timeout: 15_000 });
    await expect(
      page.getByText(/minis|Сертифікат|Certificate|Щит|Shield|XP/i).first(),
    ).toBeVisible({ timeout: 15_000 });
  });

  test("profile share card and public profile load", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/profile");
    await expect(
      page.getByRole("button", { name: /Поділитися|Share|Копіювати|Copy/i }).first(),
    ).toBeVisible({ timeout: 15_000 });
    await page.getByRole("link", { name: /Public profile|Публічний профіль/i }).click();
    await page.waitForURL(/\/u\//, { timeout: 15_000 });
    await expect(page.getByRole("heading").first()).toBeVisible({ timeout: 15_000 });
    await expect(
      page.getByRole("button", { name: /Поділитися|Share|Копіювати|Copy/i }).first(),
    ).toBeVisible();
  });

  test("friends invite link section visible", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/friends");
    await expect(
      page.getByText(/invite|Запросити|invite-посилання|Your invite/i).first(),
    ).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/register|реєстрац|friend=/i).first()).toBeVisible();
  });

  test("register friend invite banner from query", async ({ page }) => {
    const fakeFriend = "11111111-1111-4111-8111-111111111111";
    await page.goto(`/register?friend=${fakeFriend}`);
    await expect(page.getByText(/Friend invite|friend request/i).first()).toBeVisible({
      timeout: 10_000,
    });
  });

  test("profile shows session security controls", async ({ page }) => {
    await page.goto("/login");
    await page.locator('input[type="email"]').fill("admin@eduforge.ua");
    await page.locator('input[type="password"]').fill("admin12345");
    await page.getByRole("button", { name: /Увійти|Log in/i }).click();
    await page.waitForURL(/dashboard/, { timeout: 25_000 });
    await page.goto("/profile");
    await expect(
      page.getByText(/Active sessions|Активні сесії|Sign out other|інших пристро/i).first(),
    ).toBeVisible({ timeout: 15_000 });
  });

  test("certificate verify page is public", async ({ page, request }) => {
    // Public API card + page shell (may 404 without certs — still should not require login for route)
    await page.goto("/certificates/NOTREAL");
    await expect(page.locator("main")).toBeVisible({ timeout: 15_000 });
    // Either empty state 404 or loading finished
    await expect(
      page.getByText(/404|not found|не знайдено|EduForge|Certificate|Сертифікат/i).first(),
    ).toBeVisible({ timeout: 15_000 });
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
    const card = await request.get(`${apiBase}/profiles/card/00000000-0000-0000-0000-000000000000`);
    expect([404, 200]).toContain(card.status());
  });
});
