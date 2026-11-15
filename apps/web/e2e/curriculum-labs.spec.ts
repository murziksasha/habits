import { expect, test } from "@playwright/test";

test.describe("ForgeBoard curriculum expansion & local labs", () => {
  test("discovers new courses across /courses, /learn, and /programming and opens hubs", async ({
    page,
  }) => {
    await page.goto("/courses");
    await expect(page.getByRole("link", { name: /Практичне тестування ПЗ|Practical Software Testing/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /PostgreSQL для вебдодатків|PostgreSQL for Web Applications/ }).first()).toBeVisible();

    await page.goto("/programming");
    await expect(page.getByRole("link", { name: /PostgreSQL/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /Full-Stack.*Next\.js|Full-Stack/ }).first()).toBeVisible();

    await page.goto("/learn");
    await expect(page.getByRole("link", { name: /Безпечн[аі] вебдодат|Secure Web Applications/ }).first()).toBeVisible();

    await page.goto("/software-testing");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    await expect(page.getByRole("link", { name: /JavaScript/ }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: /web-security|Безпечні вебдодатки/i }).first()).toBeVisible();
  });

  test("navigates to ForgeBoard M1 lab lesson, displays LocalLabPanel, downloads valid zip, and toggles Windows help", async ({
    page,
    request,
  }) => {
    await page.goto("/courses/html_semantics");
    const labLink = page.getByRole("link", { name: /ForgeBoard/i }).first();
    await expect(labLink).toBeVisible();
    await labLink.click();

    const panel = page.getByTestId("local-lab-panel");
    await expect(panel).toBeVisible();
    await expect(page.getByTestId("local-lab-practice-notice")).toBeVisible();

    const downloadLink = page.getByTestId("local-lab-download");
    const href = await downloadLink.getAttribute("href");
    expect(href).toMatch(/^\/labs\/forgeboard-m1-a11y-v1\.0\.0\.zip$/);

    const zipRes = await request.get(href!);
    expect(zipRes.status()).toBe(200);
    const bytes = await zipRes.body();
    expect(bytes.length).toBeGreaterThan(200);
    expect(bytes[0]).toBe(0x50);
    expect(bytes[1]).toBe(0x4b);

    // Verify Windows setup details expand cleanly
    await panel.locator("summary").click();
    await expect(panel).toContainText(/PowerShell/i);
  });
});
