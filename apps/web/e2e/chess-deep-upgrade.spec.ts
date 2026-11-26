import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers";

/** Deep upgrade phases 7–8: opening trainer and board controls. */
test.describe("Chess deep upgrade: openings and board", () => {
  test("opening trainer starts an Italian line; board controls default to sound off", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/play/openings");
    await page.getByRole("tab", { name: /За білих|As White/i }).click();
    const italian = page.getByTestId("repertoire-italian");
    await expect(italian).toBeVisible();
    await italian.getByRole("button", { name: /Джуоко піаніссімо|Giuoco Pianissimo/i }).click();
    await expect(page.getByText(/Зіграйте хід вашого репертуару|Play your repertoire move/i)).toBeVisible();

    // Sound is off by default; flip and coordinates are available.
    await expect(page.getByTestId("sound-toggle")).toHaveAttribute("aria-pressed", "false");
    await page.getByTestId("flip-board").click();
    await page.getByTestId("board-settings").click();
    await expect(page.getByTestId("coordinates-toggle")).toBeChecked();
  });

  test("play page offers personalities and the opening picker", async ({ page }) => {
    await loginAsAdmin(page);
    await page.goto("/play");
    await expect(page.getByTestId("opening-trainer-link")).toBeVisible();
    await expect(page.getByLabel(/Зіграти дебют з ботом|Play the opening vs the bot/i)).toBeVisible();
    await page.getByTestId("challenge-italian").click();
    await expect(page.getByTestId("bot-personality-desc")).toContainText(/дебюти курсу|course openings/i);
  });
});
