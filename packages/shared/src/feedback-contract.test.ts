import { describe, expect, it } from "vitest";
import { buildDetailedFeedback } from "./feedback-contract.js";

describe("feedback-contract", () => {
  it("detects environment errors and waives mistake penalties", () => {
    const feedback = buildDetailedFeedback({
      passed: false,
      rawError: "Error: container exited with code 137 (SIGKILL) timeout reached",
    });

    expect(feedback.category).toBe("environment_error");
    expect(feedback.isEnvironmentIssue).toBe(true);
    expect(feedback.penaltyWaived).toBe(true);
    expect(feedback.headlineUk).toContain("середовища");
    expect(feedback.headlineEn).toContain("Environment");
  });

  it("marks partial solutions as incomplete", () => {
    const feedback = buildDetailedFeedback({
      passed: false,
      passedCriteria: [{ id: "c1", titleUk: "Базовий вивід", titleEn: "Basic output" }],
      failedCriteria: [{ id: "c2", titleUk: "Граничні випадки", titleEn: "Edge cases" }],
    });

    expect(feedback.category).toBe("incomplete");
    expect(feedback.penaltyWaived).toBe(false);
    expect(feedback.criteria).toHaveLength(2);
  });

  it("waives penalty for accepted alternatives", () => {
    const feedback = buildDetailedFeedback({
      passed: true,
      category: "accepted_alternative",
    });

    expect(feedback.penaltyWaived).toBe(true);
    expect(feedback.isEnvironmentIssue).toBe(false);
  });
});
