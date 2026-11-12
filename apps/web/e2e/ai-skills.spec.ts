import { expect, test } from "@playwright/test";

const AI_HUBS = [
  { href: "/python-for-ai", title: /Python для AI|Python for AI/, units: 6, lessons: 18, exams: 6 },
  { href: "/agentic-systems", title: /Агентні системи та RAG|Agentic Systems & RAG/, units: 6, lessons: 18, exams: 6 },
  { href: "/llmops", title: /LLMOps/, units: 6, lessons: 18, exams: 6 },
  { href: "/ai-security", title: /Безпека AI-агентів|AI Security/, units: 6, lessons: 18, exams: 6 },
  { href: "/ai-product", title: /AI-продукт|AI Product/, units: 5, lessons: 15, exams: 5 },
] as const;

test.describe("AI skills stack tracks & ai_coder_control", () => {
  test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");

  test("surfaces the 5 new tracks on /courses, /learn, and /programming without adding primary nav links", async ({
    page,
  }) => {
    await page.goto("/courses");
    await expect(page.getByRole("heading", { name: /Deep tracks/i })).toBeVisible();
    for (const hub of AI_HUBS) {
      await expect(page.locator(`a[href="${hub.href}"]`).first()).toBeVisible();
      await expect(page.locator(`header nav a[href="${hub.href}"]`)).toHaveCount(0);
    }

    await page.goto("/learn");
    await expect(page.getByRole("heading", { name: /Deep tracks/i })).toBeVisible();
    for (const hub of AI_HUBS) {
      await expect(page.locator(`a[href="${hub.href}"]`).first()).toBeVisible();
    }

    await page.goto("/programming");
    for (const hub of AI_HUBS) {
      await expect(page.locator(`a[href="${hub.href}"]`).first()).toBeVisible();
    }
  });

  test("renders all 5 new hubs, checks mobile layout on /python-for-ai, and confirms ai_coder_control on ai_development", async ({
    page,
  }) => {
    for (const hub of AI_HUBS) {
      await page.goto(hub.href);
      await expect(page.getByRole("heading", { level: 1, name: hub.title })).toBeVisible();
      await expect(page.getByText(new RegExp(`0/${hub.lessons}\\s*·.*0/${hub.exams}`))).toBeVisible();
      await expect(page.locator("main .grid > div.card")).toHaveCount(hub.units);
    }

    // Mobile width check on one hub only (/python-for-ai)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/python-for-ai");
    await expect(page.getByRole("heading", { level: 1, name: /Python для AI|Python for AI/ })).toBeVisible();
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );
    expect(overflow).toBe(false);

    // Desktop viewport check on ai_development
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/ai-development");
    await expect(page.locator("main .grid > div.card")).toHaveCount(6);
    await expect(page.getByText(/Контроль AI-кодера|Controlling the AI coder/)).toBeVisible();
  });

  test("completes a free lesson on python_for_ai and confirms the result sheet", async ({ page }) => {
    await page.goto("/python-for-ai");
    const firstLessonLink = page.locator('a[href*="/courses/python_for_ai/lessons/"]').first();
    await expect(firstLessonLink).toBeVisible();
    await firstLessonLink.click();
    await page.waitForURL(/\/courses\/python_for_ai\/lessons\//);

    // Exercise 1: code_read (correctIndex 0)
    await expect(page.getByText(/Вправа 1 з 3|Exercise 1 of 3/)).toBeVisible();
    await page.locator('[role="radio"]').first().click();
    await page.getByRole("button", { name: /Перевірити|Check/ }).click();
    await expect(page.locator(".ef-celebrate")).toBeVisible();

    // Exercise 2: code_fill ("is")
    await expect(page.getByText(/Вправа 2 з 3|Exercise 2 of 3/)).toBeVisible();
    const answerEditor = page.locator(".monaco-editor .view-lines").last();
    await expect(answerEditor).toBeVisible();
    await answerEditor.click();
    await page.keyboard.type("is");
    await page.getByRole("button", { name: /Перевірити|Check/ }).click();
    await expect(page.locator(".ef-celebrate")).toBeVisible();

    // Exercise 3: mcq (correctIndex 0)
    await expect(page.getByText(/Вправа 3 з 3|Exercise 3 of 3/)).toBeVisible();
    await page.locator('[role="radio"]').first().click();
    await page.getByRole("button", { name: /Перевірити|Check/ }).click();

    // Result sheet summary
    await expect(page.getByRole("heading", { level: 1, name: /Урок завершено|Lesson complete/i })).toBeVisible();
    await expect(page.getByText(/100%.*3\/3/)).toBeVisible();
  });

  test("completes a free lesson on ai_security and confirms the result sheet", async ({ page }) => {
    await page.goto("/ai-security");
    const firstLessonLink = page.locator('a[href*="/courses/ai_security/lessons/"]').first();
    await expect(firstLessonLink).toBeVisible();
    await firstLessonLink.click();
    await page.waitForURL(/\/courses\/ai_security\/lessons\//);

    // Exercise 1: mcq (correctIndex 0)
    await expect(page.getByText(/Вправа 1 з 3|Exercise 1 of 3/)).toBeVisible();
    await page.locator('[role="radio"]').first().click();
    await page.getByRole("button", { name: /Перевірити|Check/ }).click();
    await expect(page.locator(".ef-celebrate")).toBeVisible();

    // Exercise 2: match (4 pairs)
    await expect(page.getByText(/Вправа 2 з 3|Exercise 2 of 3/)).toBeVisible();
    const pairs: Array<[string, string]> = [
      ["Пошук по публічному довіднику FAQ", "Read-only індекс без доступу до приватних таблиць"],
      ["Читання статусу замовлення клієнта", "Перевірка `order.userId === session.userId` у коді інструмента"],
      ["Надсилання зовнішнього листа клієнту", "Allowlist отримувачів/шаблону + підтвердження людини"],
      ["Видалення файлів або повернення коштів", "Явне підтвердження людини, ліміти сум і аудит-лог"],
    ];
    for (const [left, right] of pairs) {
      await page.locator('[aria-label="left"] button', { hasText: left }).click();
      await page.locator('[aria-label="right"] button', { hasText: right }).click();
    }
    await page.getByRole("button", { name: /Перевірити|Check/ }).click();
    await expect(page.locator(".ef-celebrate")).toBeVisible();

    // Exercise 3: mcq (correctIndex 0)
    await expect(page.getByText(/Вправа 3 з 3|Exercise 3 of 3/)).toBeVisible();
    await page.locator('[role="radio"]').first().click();
    await page.getByRole("button", { name: /Перевірити|Check/ }).click();

    // Result sheet summary
    await expect(page.getByRole("heading", { level: 1, name: /Урок завершено|Lesson complete/i })).toBeVisible();
    await expect(page.getByText(/100%.*3\/3/)).toBeVisible();
  });
});
