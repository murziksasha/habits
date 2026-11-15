import { test, expect } from "@playwright/test";
import { loginAsAdmin } from "./helpers";

test.describe("Answer keys shortcuts", () => {
  test("exercises handle top row and numpad digits, text fields type digits, ? help modal ignores digits", async ({
    page,
  }) => {
    await loginAsAdmin(page);

    // Navigate to SQL LIMIT / OFFSET lesson by UUID
    await page.goto("/courses/sql_fundamentals/lessons/696fa840-d760-4ff3-928f-76f6242f5d77");
    await expect(page.locator("main")).toBeVisible({ timeout: 15_000 });

    // --- Exercise 1: code_fill (TextExercise / CodeFill) ---
    // Confirm a text exercise types digits into the field without shortcuts hijacking
    const codeFillInput = page.locator('input[type="text"]');
    await expect(codeFillInput).toBeVisible({ timeout: 10_000 });
    await codeFillInput.focus();
    await page.keyboard.type("10");
    await expect(codeFillInput).toHaveValue("10");

    // Press Enter to check code_fill answer
    await page.keyboard.press("Enter");

    // Wait for the next exercise (MCQ: OFFSET used for:)
    const mcqHeading = page.getByRole("heading", { name: /OFFSET used for/i });
    await expect(mcqHeading).toBeVisible({ timeout: 10_000 });

    // Options container
    const radioGroup = page.getByRole("radiogroup");
    await expect(radioGroup).toBeVisible();
    const options = radioGroup.getByRole("radio");
    await expect(options).toHaveCount(4);

    // Verify option prefixes (1. 2. 3. 4.)
    await expect(options.nth(0)).toContainText("1.");
    await expect(options.nth(1)).toContainText("2.");
    await expect(options.nth(2)).toContainText("3.");
    await expect(options.nth(3)).toContainText("4.");

    // Click background / body to ensure no button has focus
    await page.locator("body").click({ position: { x: 10, y: 10 } });

    // Press top-row 1
    await page.keyboard.press("1");
    await expect(options.nth(0)).toHaveAttribute("aria-checked", "true");
    await expect(options.nth(1)).toHaveAttribute("aria-checked", "false");
    await expect(options.nth(2)).toHaveAttribute("aria-checked", "false");
    await expect(options.nth(3)).toHaveAttribute("aria-checked", "false");

    // Repeat 2-4 on the SQL OFFSET question
    await page.keyboard.press("2");
    await expect(options.nth(1)).toHaveAttribute("aria-checked", "true");
    await expect(options.nth(0)).toHaveAttribute("aria-checked", "false");

    await page.keyboard.press("3");
    await expect(options.nth(2)).toHaveAttribute("aria-checked", "true");
    await expect(options.nth(1)).toHaveAttribute("aria-checked", "false");

    await page.keyboard.press("4");
    await expect(options.nth(3)).toHaveAttribute("aria-checked", "true");
    await expect(options.nth(2)).toHaveAttribute("aria-checked", "false");

    // Press numpad 1
    await page.keyboard.press("Numpad1");
    await expect(options.nth(0)).toHaveAttribute("aria-checked", "true");
    await expect(options.nth(3)).toHaveAttribute("aria-checked", "false");

    // Press ? to open help modal
    await page.keyboard.press("?");
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible();

    // Confirm ? help ignores digits
    await page.keyboard.press("2");
    await expect(dialog).toBeVisible();
    // Option 1 should still be selected, 2 should NOT have been selected while modal was open
    await expect(options.nth(0)).toHaveAttribute("aria-checked", "true");
    await expect(options.nth(1)).toHaveAttribute("aria-checked", "false");

    // Close help modal via Esc
    await page.keyboard.press("Escape");
    await expect(dialog).toBeHidden();

    // With option 1 selected and nothing focused, pressing Enter runs Check
    await page.locator("body").click({ position: { x: 10, y: 10 } });
    await page.keyboard.press("Enter");

    // Soft check passes, feedback advances to exercise 3 (code_order)
    const orderPrompt = page.getByText(/Typical page query order|Typical/i);
    await expect(orderPrompt).toBeVisible({ timeout: 10_000 });
  });
});
