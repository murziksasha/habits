import { describe, expect, it } from "vitest";
import { isSpacedReviewDue } from "./spaced-due.js";

describe("spaced review due date", () => {
  const now = Date.parse("2026-10-28T00:00:00Z");
  const old = new Date("2026-08-01T00:00:00Z");
  const recent = new Date("2026-10-27T00:00:00Z");

  it("uses the latest successful practice instead of the first completion", () => {
    expect(
      isSpacedReviewDue({ bestScore: 0.9, completedAt: old, lastPracticedAt: recent }, now),
    ).toBe(false);
    expect(isSpacedReviewDue({ bestScore: 0.9, completedAt: old, lastPracticedAt: null }, now)).toBe(
      true,
    );
  });
});
