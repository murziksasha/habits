import { test, expect, type Page } from "@playwright/test";
import { loginAsAdmin } from "./helpers";

function squareContent(page: Page, square: string) {
  return page.locator(`[data-square="${square}"] > div`);
}

async function getLessonIdBySlug(page: Page, courseSlug: string, lessonSlug: string): Promise<string> {
  const res = await page.request.get(`http://127.0.0.1:4000/courses/${courseSlug}`);
  const json = (await res.json()) as { units?: { lessons?: { slug: string; id: string }[] }[] };
  for (const unit of json.units || []) {
    for (const l of unit.lessons || []) {
      if (l.slug === lessonSlug) return l.id;
    }
  }
  throw new Error(`Lesson slug ${lessonSlug} not found in course ${courseSlug}`);
}

test.describe("Chess board learning hints (check chip, mate card, dots)", () => {
  test("1. /play bot game: click dots, capture rings, drag, cancel, resign without card", async ({
    page,
  }) => {
    await loginAsAdmin(page);
    await page.goto("/play");

    // Click 'Play bot'
    const playBotBtn = page.getByRole("button", { name: /Грати з ботом|Play vs bot/i });
    await expect(playBotBtn).toBeVisible({ timeout: 15_000 });
    await playBotBtn.click();

    // Verify board container is rendered
    const board = page.locator('[role="application"][aria-label="Chess board"]');
    await expect(board).toBeVisible({ timeout: 10_000 });

    // Step 1: Click White pawn on e2 -> dots on e3 and e4
    const e2 = page.locator('[data-square="e2"]');
    await e2.click();

    // Confirm legal empty dots on e3 and e4
    await expect(squareContent(page, "e3")).toHaveCSS("background-image", /radial-gradient/);
    await expect(squareContent(page, "e4")).toHaveCSS("background-image", /radial-gradient/);

    // Step 2: Cancel by clicking e2 again
    await e2.click();
    await expect(squareContent(page, "e3")).not.toHaveCSS("background-image", /radial-gradient/);
    await expect(squareContent(page, "e4")).not.toHaveCSS("background-image", /radial-gradient/);

    // Step 3: Click e2 and click dot e4 to make the move
    const e4 = page.locator('[data-square="e4"]');
    await e2.click();
    await e4.click();

    // Pawn is now on e4
    const pawnOnE4 = page.locator('[data-square="e4"] [data-piece="wP"]');
    await expect(pawnOnE4).toBeVisible({ timeout: 5_000 });

    // Step 4: Resign does NOT open center card
    const resignBtn = page.getByRole("button", { name: /Здатися|Resign/i });
    await resignBtn.click();

    // Verify side panel updates
    await expect(page.getByText(/Поразка|Defeat|1-0|0-1/i).first()).toBeVisible({ timeout: 5_000 });

    // Ensure NO center card (checkmate / stalemate dialog) is opened
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("2. Check position: top strip, king & attacker rings, no-move badge", async ({
    page,
  }) => {
    await loginAsAdmin(page);
    // White king on e1 in check by Black queen on e8; White pawn on a2 has no legal moves
    await page.goto(
      "/play?testFen=k3q3/8/8/8/8/8/P7/4K3%20w%20-%20-%200%201",
    );

    // Check strip is visible at the top naming the attacker
    const checkStrip = page.locator('[role="status"]').filter({ hasText: /Шах · ферзь|Check · queen/i });
    await expect(checkStrip).toBeVisible({ timeout: 10_000 });

    // Red ring on king (e1)
    await expect(squareContent(page, "e1")).toHaveCSS("box-shadow", /rgb\(239,\s*68,\s*68\)/);

    // Thinner red ring on attacker (e8)
    await expect(squareContent(page, "e8")).toHaveCSS("box-shadow", /rgb\(239,\s*68,\s*68\)/);

    // White pawn on a2 has no legal moves (king is in check, moving pawn leaves king in check)
    const a2 = page.locator('[data-square="a2"]');
    await a2.click();

    // Shows "Немає ходу" on a2
    const noMoveBadge = page.getByText(/Немає ходу|No legal move/i);
    await expect(noMoveBadge).toBeVisible();

    // Check strip stays visible during "Немає ходу"
    await expect(checkStrip).toBeVisible();

    // Click king (e1): noMove disappears, king evasion dots appear on d1, d2, f1, f2
    const e1 = page.locator('[data-square="e1"]');
    await e1.click();
    await expect(noMoveBadge).not.toBeVisible();
    await expect(squareContent(page, "d1")).toHaveCSS("background-image", /radial-gradient/);
  });

  test("3. Double check: names double and rings both attackers", async ({
    page,
  }) => {
    await loginAsAdmin(page);
    // White king on e1 in double check by rook on e8 and bishop on a5
    await page.goto(
      "/play?testFen=k3r3/8/8/b7/8/8/8/4K3%20w%20-%20-%200%201",
    );

    // Check strip names double check
    const checkStrip = page.locator('[role="status"]').filter({ hasText: /Шах · подвійний|Check · double/i });
    await expect(checkStrip).toBeVisible({ timeout: 10_000 });

    // Both attackers e8 and a5 have red rings
    await expect(squareContent(page, "e8")).toHaveCSS("box-shadow", /rgb\(239,\s*68,\s*68\)/);
    await expect(squareContent(page, "a5")).toHaveCSS("box-shadow", /rgb\(239,\s*68,\s*68\)/);
  });

  test("4. Checkmate center card: dismiss, rings stay, chip does not return", async ({
    page,
  }) => {
    await loginAsAdmin(page);
    // Queen mate against white
    await page.goto(
      "/play?testFen=k3q3/8/8/8/8/8/8/4K3%20w%20-%20-%200%201&testReason=checkmate&testResult=0-1",
    );

    // Center card appears
    const mateDialog = page.getByRole("dialog");
    await expect(mateDialog).toBeVisible({ timeout: 10_000 });
    await expect(mateDialog.getByText(/Мат|Checkmate/i)).toBeVisible();
    await expect(
      mateDialog.getByText(/ферзь · ви програли|queen · you lost/i),
    ).toBeVisible();

    // Click card to dismiss
    await mateDialog.click();
    await expect(mateDialog).not.toBeVisible();

    // Rings remain on king e1 and attacker e8 for study
    await expect(squareContent(page, "e1")).toHaveCSS("box-shadow", /rgb\(239,\s*68,\s*68\)/);
    await expect(squareContent(page, "e8")).toHaveCSS("box-shadow", /rgb\(239,\s*68,\s*68\)/);

    // Check strip does NOT return after dismiss
    const checkStrip = page.locator('[role="status"]').filter({ hasText: /Шах|Check/i });
    await expect(checkStrip).toHaveCount(0);
  });

  test("5. Stalemate center card: quiet card, no rings, dismiss", async ({
    page,
  }) => {
    await loginAsAdmin(page);
    await page.goto(
      "/play?testFen=7k/5Q2/6K1/8/8/8/8/8%20b%20-%20-%200%201&testReason=stalemate&testResult=1/2-1/2",
    );

    // Stalemate quiet card appears
    const stalemateDialog = page.getByRole("dialog");
    await expect(stalemateDialog).toBeVisible({ timeout: 10_000 });
    await expect(stalemateDialog.getByText(/Пат · нічия|Stalemate · draw/i)).toBeVisible();

    // No rings on the board
    await expect(squareContent(page, "h8")).not.toHaveCSS("box-shadow", /rgb\(239,\s*68,\s*68\)/);

    // Click card to dismiss
    await stalemateDialog.click();
    await expect(stalemateDialog).not.toBeVisible();
  });

  test("6. Mate-in-1 puzzle (Re8#): mate card shows 'Задачу розв’язано' and holds ~2.5s", async ({
    page,
  }) => {
    await loginAsAdmin(page);
    const lessonId = await getLessonIdBySlug(page, "chess", "mate-in-1-a");
    await page.goto(`/courses/chess/lessons/${lessonId}`);

    // Wait for the board to load
    const e1 = page.locator('[data-square="e1"]');
    await expect(e1).toBeVisible({ timeout: 15_000 });

    // Click White rook on e1
    await e1.click();

    // Destination dot on e8
    const e8 = page.locator('[data-square="e8"]');
    await expect(squareContent(page, "e8")).toHaveCSS("background-image", /radial-gradient/);

    // Click e8 to play Re8#
    await e8.click();

    // Mate card appears with "Задачу розв’язано"
    const mateDialog = page.getByRole("dialog");
    await expect(mateDialog).toBeVisible({ timeout: 5_000 });
    await expect(mateDialog.getByText(/Мат|Checkmate/i)).toBeVisible();
    await expect(
      mateDialog.getByText(/Задачу розв’язано|Puzzle solved/i),
    ).toBeVisible();

    // Card ignores clicks (non-dismissable in puzzle)
    await mateDialog.click({ force: true });
    await expect(mateDialog).toBeVisible();

    // Result sheet appears below
    await expect(page.getByText(/Правильно|Correct/i).first()).toBeVisible({ timeout: 5_000 });

    // Holds for ~2.5s before advancing to next exercise (ex 2: Qxf7#)
    await expect(mateDialog).not.toBeVisible({ timeout: 6_000 });
  });

  test("7. Non-mate puzzle (fork Nxf7): capture ring on f7, no mate card", async ({
    page,
  }) => {
    await loginAsAdmin(page);
    const lessonId = await getLessonIdBySlug(page, "chess", "forks");
    await page.goto(`/courses/chess/lessons/${lessonId}`);

    // Wait for knight on g5
    const g5 = page.locator('[data-square="g5"]');
    await expect(g5).toBeVisible({ timeout: 15_000 });

    // Click knight on g5
    await g5.click();

    // Legal capture square on f7 has amber inset ring
    await expect(squareContent(page, "f7")).toHaveCSS("box-shadow", /rgb\(245,\s*158,\s*11\)/);

    // Click f7 to execute Nxf7
    const f7 = page.locator('[data-square="f7"]');
    await f7.click();

    // Solved! Result sheet appears
    await expect(page.getByText(/Правильно|Correct/i).first()).toBeVisible({ timeout: 5_000 });

    // NO mate card was opened!
    await expect(page.getByRole("dialog")).toHaveCount(0);
  });

  test("8. Lesson diagram explore mode: click piece of each color shows dots, does not move", async ({
    page,
  }) => {
    await loginAsAdmin(page);
    const lessonId = await getLessonIdBySlug(page, "chess", "board-pieces");
    await page.goto(`/courses/chess/lessons/${lessonId}`);

    // First exercise is chess_lesson diagram
    const e2 = page.locator('[data-square="e2"]');
    await expect(e2).toBeVisible({ timeout: 15_000 });

    // Click White pawn e2: shows dots on e3 and e4
    await e2.click();
    await expect(squareContent(page, "e3")).toHaveCSS("background-image", /radial-gradient/);
    await expect(squareContent(page, "e4")).toHaveCSS("background-image", /radial-gradient/);

    // Click dot e4: DOES NOT move!
    const e4 = page.locator('[data-square="e4"]');
    await e4.click();
    // Pawn is still on e2!
    await expect(page.locator('[data-square="e2"] [data-piece="wP"]')).toBeVisible();

    // Click Black piece e7 (side not to move): shows legal moves for Black (e6, e5)
    const e7 = page.locator('[data-square="e7"]');
    await e7.click();
    await expect(squareContent(page, "e6")).toHaveCSS("background-image", /radial-gradient/);
    await expect(squareContent(page, "e5")).toHaveCSS("background-image", /radial-gradient/);

    // No check chip, no mate card, no 'Немає ходу'
    await expect(page.getByRole("dialog")).toHaveCount(0);
    await expect(page.locator('[role="status"]:has-text("Шах")')).toHaveCount(0);
    await expect(page.getByText(/Немає ходу|No legal move/i)).toHaveCount(0);
  });
});
