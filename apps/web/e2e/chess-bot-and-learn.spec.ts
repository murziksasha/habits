import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers";

test.describe("Smarter chess practice & tighter Learn session", () => {
  test("Learn fold: mission with reason, collapsed quests, catalog and club bot link", async ({
    page,
  }) => {
    await loginAsAdmin(page);
    await page.goto("/learn");

    // Primary mission is visible above the fold
    const mission = page.locator('section[aria-label="Місія дня"], section[aria-label="Today\'s mission"]');
    await expect(mission).toBeVisible({ timeout: 10_000 });

    // Mission why line is visible
    await expect(page.getByText(/Чому це|Why this/i)).toBeVisible();

    // Daily & weekly quests are collapsed by default
    const dailyQuestToggle = page.getByRole("button", { name: /Щоденні квести|Daily quests/i });
    await expect(dailyQuestToggle).toBeVisible();
    await expect(dailyQuestToggle).toContainText(/сьогодні|today/i);

    const weeklyQuestToggle = page.getByRole("button", { name: /Тижневі квести|Weekly quests/i });
    await expect(weeklyQuestToggle).toBeVisible();
    await expect(weeklyQuestToggle).toContainText(/тижня|this week/i);

    // Course groups are rendered
    await expect(page.getByRole("heading", { name: /Код|Code/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: /Шахи|Chess/i })).toBeVisible();

    // Chess group has "Practice vs Club bot" extra link
    const clubBotLink = page.getByRole("link", { name: /Практика проти клубного бота|Practice vs Club bot/i });
    await expect(clubBotLink).toBeVisible();
    await expect(clubBotLink).toHaveAttribute("href", "/play?level=club");
  });

  test("Play: start Club game as Black, bot develops, resign without Elo change", async ({
    page,
  }) => {
    await loginAsAdmin(page);
    await page.goto("/play?level=club");

    // Verify rating before game
    const ratingElement = page.getByText(/Рейтинг Elo|Elo rating/i);
    await expect(ratingElement).toBeVisible({ timeout: 10_000 });
    const ratingTextBefore = await ratingElement.innerText();

    // Level 'Club' should be selected by default from query param
    const clubBtn = page.getByRole("button", { name: /Клубний|Club/i }).first();
    await expect(clubBtn).toHaveClass(/btn-primary/);

    // Pick Black
    const blackBtn = page.getByRole("button", { name: /♚ Чорні|♚ Black/i });
    await expect(blackBtn).toBeVisible();
    await blackBtn.click();
    await expect(blackBtn).toHaveClass(/btn-primary/);

    // Start bot game
    const playBotBtn = page.getByRole("button", { name: /Грати з ботом|Play vs bot/i });
    await playBotBtn.click();

    // Board appears
    const board = page.locator('[role="application"][aria-label="Chess board"]');
    await expect(board).toBeVisible({ timeout: 10_000 });

    // Bot notice says Elo is not affected
    await expect(page.getByText(/Тренування з ботом · Elo не змінюється|Practice vs bot · Elo not affected/i)).toBeVisible();

    // Bot is White with level name and NO fake Elo
    const whitePlayer = page.getByText(/♔.*EduForge/i);
    await expect(whitePlayer).toBeVisible();
    await expect(whitePlayer).toContainText(/Клубний|Club/i);
    await expect(whitePlayer).not.toContainText(/800/);

    // Wait for bot (White) to make its opening move
    // Pawn moves from e2/d2/c2 or knight from g1
    await expect(page.locator('[data-square="e4"], [data-square="d4"], [data-square="c4"], [data-square="f3"]')).not.toHaveCount(0, { timeout: 5_000 });

    // Resign game
    const resignBtn = page.getByRole("button", { name: /Здатися|Resign/i });
    await expect(resignBtn).toBeVisible();
    await resignBtn.click();

    // Verify defeat/result text
    await expect(page.getByText(/Поразка|Defeat|1-0|0-1/i).first()).toBeVisible({ timeout: 5_000 });

    // Return to new game or check rating
    const newGameBtn = page.getByRole("button", { name: /Нова гра|New game/i });
    await expect(newGameBtn).toBeVisible();
    await newGameBtn.click();

    // Confirm Elo rating did not change
    const ratingTextAfter = await page.getByText(/Рейтинг Elo|Elo rating/i).innerText();
    expect(ratingTextAfter).toBe(ratingTextBefore);
  });
});

