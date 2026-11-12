import { expect, test } from "@playwright/test";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
const WEB_ORIGIN = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const skip = process.env.SKIP_E2E === "1";

test.describe("My progress, history, weekly goals & lesson results", () => {
  test.skip(skip, "SKIP_E2E=1");

  test("complete desktop & mobile flow in UK and EN with cookie-only auth", async ({
    page,
  }) => {
    test.setTimeout(90_000);
    const ts = Date.now();
    const email = `e2e-progress-${ts}@eduforge.test`;
    const password = "password123";
    const displayName = `Prog${ts}`;

    // Respect reduced motion
    await page.emulateMedia({ reducedMotion: "reduce" });

    // 1. Register via UI (cookie-only auth; no token in localStorage)
    await page.goto("/register");
    await page.locator("input").nth(0).fill(displayName);
    await page.locator('input[type="email"]').fill(email);
    await page.locator('input[type="password"]').fill(password);
    await page.getByRole("button", { name: /Зареєструватися|Sign up/i }).click();
    await page.waitForURL(/\/(learn|dashboard|courses)/, { timeout: 25_000 });

    const skipWizard = page.getByRole("button", { name: /Пропустити|Skip/i });
    if (await skipWizard.isVisible().catch(() => false)) {
      await skipWizard.click();
      await page.waitForTimeout(400);
    }

    // Confirm cookie-only session (no eduforge_token in localStorage)
    const legacyToken = await page.evaluate(() => localStorage.getItem("eduforge_token"));
    expect(legacyToken).toBeNull();
    const cookies = await page.context().cookies();
    expect(cookies.some((c) => c.name === "eduforge_session")).toBe(true);

    // 2. Verify links from Learn, Dashboard, and Profile without adding primary nav item
    await page.goto("/learn");
    await expect(page.locator('header nav a[href="/calendar"]')).toHaveCount(0);
    await expect(page.locator('main a[href="/calendar"]').first()).toBeVisible({ timeout: 15_000 });

    await page.goto("/dashboard");
    await expect(page.locator('main a[href="/calendar"]').first()).toBeVisible({ timeout: 15_000 });

    await page.goto("/profile");
    await expect(page.locator('main a[href="/calendar"]').first()).toBeVisible({ timeout: 15_000 });

    // 3. Complete English Lesson 1 in the browser and inspect enhanced lesson results
    await page.goto("/courses/english");
    const firstLesson = page.locator('a[href*="/courses/english/lessons/"]').first();
    await expect(firstLesson).toBeVisible({ timeout: 15_000 });
    await firstLesson.click();
    await page.waitForURL(/\/courses\/english\/lessons\//, { timeout: 30_000 });

    // Ex 1: mcq "Hello"
    await page.locator('[role="radio"]', { hasText: "Hello" }).first().click();
    await page.getByRole("button", { name: /Перевірити|Check/i }).click();
    await expect(page.locator(".ef-celebrate")).toBeVisible();

    // Ex 2: translate "доброго ранку"
    await expect(page.getByText(/Good morning/)).toBeVisible({ timeout: 10_000 });
    await page.locator("main input").first().fill("доброго ранку");
    await page.getByRole("button", { name: /Перевірити|Check/i }).click();
    await expect(page.locator(".ef-celebrate")).toBeVisible();

    // Ex 3: match 3 pairs
    await expect(page.locator('[aria-label="left"] button').first()).toBeVisible({ timeout: 10_000 });
    for (const [l, r] of [
      ["Hello", "Привіт"],
      ["Bye", "Бувай"],
      ["Thanks", "Дякую"],
    ]) {
      await page.locator('[aria-label="left"] button', { hasText: l }).click();
      await page.locator('[aria-label="right"] button', { hasText: r }).click();
    }
    await page.getByRole("button", { name: /Перевірити|Check/i }).click();
    await expect(page.locator(".ef-celebrate")).toBeVisible();

    // Ex 4: order_words "My name is Anna"
    await expect(page.locator('[aria-label="word pool"] button').first()).toBeVisible({
      timeout: 10_000,
    });
    for (const w of ["My", "name", "is", "Anna"]) {
      await page
        .locator('[aria-label="word pool"] button', {
          hasText: new RegExp(`(?:^|\\d+\\.\\s*)${w}$`),
        })
        .first()
        .click();
    }
    await page.getByRole("button", { name: /Перевірити|Check/i }).click();

    // Enhanced lesson results assertions
    await expect(
      page.getByRole("heading", { level: 1, name: /Урок завершено|Lesson complete/i }),
    ).toBeVisible({ timeout: 15_000 });
    await expect(page.getByText(/XP курсу|Course XP/i).first()).toBeVisible();
    await expect(page.getByText(/XP персонажа|Character XP/i).first()).toBeVisible();
    await expect(page.getByText(/Рівень курсу|Course level/i).first()).toBeVisible();
    await expect(page.getByText(/Рівень персонажа|Character level/i).first()).toBeVisible();

    // 4. Create additional attempts via authenticated cookie request so pagination (>20) is exercised
    const courseRes = await page.request.get(`${API_URL}/courses/english`);
    const courseJson = (await courseRes.json()) as {
      units: { lessons: { id: string; isExam?: boolean }[] }[];
    };
    const lessonId = courseJson.units[0]!.lessons.find((l) => !l.isExam)!.id;
    const lessonRes = await page.request.get(`${API_URL}/courses/english/lessons/${lessonId}`);
    const lessonJson = (await lessonRes.json()) as {
      lesson: {
        exercises: {
          id: string;
          type: string;
          correctIndex?: number;
          accepted?: string[];
          pairs?: { left: string; right: string }[];
          correct?: string[];
        }[];
      };
    };
    const solvedAnswers = lessonJson.lesson.exercises.map((ex) => {
      if (ex.type === "mcq") return { exerciseId: ex.id, answer: ex.correctIndex ?? 0 };
      if (ex.type === "translate") return { exerciseId: ex.id, answer: ex.accepted?.[0] ?? "" };
      if (ex.type === "match") return { exerciseId: ex.id, answer: ex.pairs ?? [] };
      if (ex.type === "order_words") return { exerciseId: ex.id, answer: ex.correct ?? [] };
      return { exerciseId: ex.id, answer: true };
    });

    // 19 passes + 1 failure -> total 21 attempts (triggers cursor pagination >20)
    for (let i = 0; i < 19; i++) {
      const r = await page.request.post(`${API_URL}/courses/english/lessons/${lessonId}/submit`, {
        headers: { Origin: WEB_ORIGIN },
        data: { answers: solvedAnswers, idempotencyKey: `e2e-rep-${ts}-${i}` },
      });
      expect(r.ok()).toBe(true);
    }
    const failR = await page.request.post(`${API_URL}/courses/english/lessons/${lessonId}/submit`, {
      headers: { Origin: WEB_ORIGIN },
      data: { answers: [], idempotencyKey: `e2e-fail-${ts}` },
    });
    expect(failR.ok()).toBe(true);

    // Check Dashboard & Profile small calendars now reflect today's UTC study date
    const todayUtc = new Date().toISOString().slice(0, 10);
    await page.goto("/dashboard");
    await expect(page.locator(`[aria-label="${todayUtc} active"]`).first()).toBeVisible({
      timeout: 15_000,
    });
    await page.goto("/profile");
    await expect(page.locator(`[aria-label="${todayUtc} active"]`).first()).toBeVisible({
      timeout: 15_000,
    });

    // 5. Open /calendar (My progress) on Desktop in Ukrainian
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/calendar");
    await expect(
      page.getByRole("heading", { level: 1, name: /Мій прогрес|My progress/i }),
    ).toBeVisible({ timeout: 15_000 });

    // Automatic goal initially
    await expect(page.getByText(/Автоціль|Automatic goal/i).first()).toBeVisible();

    // Save target via quick preset 5 -> shows completion recognition (20 >= 5)
    await page.getByRole("button", { name: /^5$/ }).click();
    await expect(page.getByText(/Тижневу ціль досягнуто|Weekly target reached/i)).toBeVisible({
      timeout: 10_000,
    });

    // Edit target via input to 25 -> denominator updates immediately
    const goalInput = page.locator("#weekly-goal-input");
    await goalInput.fill("25");
    await page.getByRole("button", { name: /Зберегти ціль|Save target/i }).click();
    await expect(page.getByText(/20\s*\/\s*25/)).toBeVisible({ timeout: 10_000 });

    // Remove target -> automatic goal restored
    await page.getByRole("button", { name: /Прибрати ціль|Remove target/i }).click();
    await expect(page.getByText(/Автоціль|Automatic goal/i).first()).toBeVisible({
      timeout: 10_000,
    });

    // Filters: switch days and course filter
    await page.getByRole("button", { name: /7 днів|7 days/i }).first().click();
    await page.getByRole("button", { name: /90 днів|90 days/i }).first().click();
    await page.locator("#progress-course-filter").selectOption("english");
    await page.locator("#progress-course-filter").selectOption("all");

    // History: includes failed attempt + retries + Load more pagination + All time
    await expect(page.getByText(/Не складено|Failed/i).first()).toBeVisible({ timeout: 10_000 });
    const loadMoreBtn = page.getByRole("button", { name: /Показати ще|Load more/i });
    await expect(loadMoreBtn).toBeVisible();
    await loadMoreBtn.click();
    await expect(loadMoreBtn).toBeHidden({ timeout: 10_000 });
    await page.getByRole("button", { name: /За весь час|All time/i }).click();

    // 6. Switch UI language to English and verify English copy
    await page.getByRole("button", { name: "EN", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1, name: /My progress/i })).toBeVisible();
    await expect(page.getByText(/Weekly recap/i)).toBeVisible();
    await expect(page.getByText(/Personal bests/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: /Attempt history/i })).toBeVisible();

    // 7. Mobile viewport check (both languages, zero horizontal overflow)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);
    const mobileOverflowEn = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(mobileOverflowEn).toBe(false);

    await page.getByRole("button", { name: "UK", exact: true }).click();
    await expect(page.getByRole("heading", { level: 1, name: /Мій прогрес/i })).toBeVisible();
    const mobileOverflowUk = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(mobileOverflowUk).toBe(false);
  });
});
