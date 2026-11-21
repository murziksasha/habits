import { expect, test } from "@playwright/test";

for (const locale of ["uk", "en"] as const) {
  test(`localized order labels keep canonical submitted answers (${locale})`, async ({ page }) => {
    await page.addInitScript((value) => {
      localStorage.setItem("eduforge_locale", value);
      localStorage.setItem("ef_coach_focus", "1");
    }, locale);
    let submitted: unknown = null;
    await page.route("http://localhost:4000/**", async (route) => {
      const request = route.request();
      const path = new URL(request.url()).pathname;
      const headers = { "access-control-allow-origin": "http://localhost:3000", "access-control-allow-credentials": "true", "access-control-allow-headers": "content-type", "access-control-allow-methods": "GET, POST, OPTIONS" };
      if (request.method() === "OPTIONS") return route.fulfill({ status: 204, headers });
      if (path === "/auth/me") return route.fulfill({ status: 401, headers, json: { error: "unauthorized" } });
      if (path.endsWith("/submit")) {
        submitted = request.postDataJSON();
        return route.fulfill({ status: 200, headers, json: { guest: true, xpGain: 0, accuracy: 1, passed: true, results: [] } });
      }
      if (path === "/courses/ai_security/lessons/order-fixture") {
        return route.fulfill({ status: 200, headers, json: { lesson: { id: "order-fixture", titleUk: "Перевірка", titleEn: "Check", exercises: [{ id: "fixture-order", type: "code_order", promptUk: "Впорядкуйте кроки", promptEn: "Order the steps", language: "text", lines: ["Second step", "First step"], linesUk: ["Другий крок", "Перший крок"], correct: ["First step", "Second step"] }] } } });
      }
      return route.fulfill({ status: 404, headers, json: { error: "not_found" } });
    });
    await page.goto("/courses/ai_security/lessons/order-fixture");
    const pool = page.getByRole("list", { name: "word pool" });
    const first = pool.getByRole("button", { name: locale === "uk" ? /Перший крок/ : /First step/ });
    await first.focus();
    await page.keyboard.press("Enter");
    await pool.getByRole("button", { name: locale === "uk" ? /Другий крок/ : /Second step/ }).click();
    await page.getByRole("button", { name: locale === "uk" ? "Перевірити" : "Check", exact: true }).click();
    await expect.poll(() => submitted, { timeout: 15000 }).not.toBeNull();
    expect(submitted).toMatchObject({ answers: [{ exerciseId: "fixture-order", answer: ["First step", "Second step"] }] });
  });
}
