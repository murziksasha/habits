import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers";

test("DevOps parts retain unit order and the incident comprehension is playable", async ({ page }) => {
  test.skip(process.env.SKIP_E2E === "1", "SKIP_E2E=1");
  const api = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000";
  await loginAsAdmin(page);
  await page.goto("/courses/devops");
  await expect(page.locator('h2[id^="part-"]')).toHaveText([
    "Основи", "Випустити образ", "Запустити сервіс", "Тримати сервіс", "На зміні",
  ]);
  const courseResponse = await page.request.get(`${api}/courses/devops`);
  const course = await courseResponse.json();
  expect(course.units).toHaveLength(19);
  expect(course.units.at(-1).slug).toBe("sre-capstone");
  await expect(page.locator("main h3").last()).toContainText("SRE");
  const lesson = course.units.find((unit: { slug: string }) => unit.slug === "incident-drills").lessons[0];
  const response = await page.request.get(`${api}/courses/devops/lessons/${lesson.id}`);
  const detail = await response.json();
  const first = detail.lesson.exercises[0];
  expect(first.type).toBe("comprehension");
  await page.goto(`/courses/devops/lessons/${lesson.id}`);
  await page.getByRole("button", { name: "До питань", exact: true }).click();
  for (const question of first.questions) {
    await page.getByRole("button", { name: question.options[question.correctIndex], exact: true }).click();
  }
  await page.getByRole("button", { name: /Перевірити|Check/, exact: true }).click();
  await expect(page.getByRole("status").filter({ hasText: /Клас!|Nice!|Правильно|Correct/ }).first()).toBeVisible();
});
