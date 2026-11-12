import { describe, expect, it } from "vitest";
import {
  courseSlugSchema,
  learningHistoryQuerySchema,
  learningProgressQuerySchema,
  loginSchema,
  registerSchema,
  seekGameSchema,
  submitLessonSchema,
  updateLearningGoalSchema,
} from "./schemas.js";

describe("registerSchema", () => {
  it("accepts valid payload", () => {
    const r = registerSchema.safeParse({
      email: "a@b.com",
      password: "password1",
      displayName: "Player",
    });
    expect(r.success).toBe(true);
  });

  it("rejects short password", () => {
    const r = registerSchema.safeParse({
      email: "a@b.com",
      password: "short",
      displayName: "Player",
    });
    expect(r.success).toBe(false);
  });

  it("rejects password without digit", () => {
    const r = registerSchema.safeParse({
      email: "a@b.com",
      password: "passwordonly",
      displayName: "Player",
    });
    expect(r.success).toBe(false);
  });

  it("rejects password without letter", () => {
    const r = registerSchema.safeParse({
      email: "a@b.com",
      password: "12345678",
      displayName: "Player",
    });
    expect(r.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("requires email", () => {
    expect(loginSchema.safeParse({ email: "nope", password: "x" }).success).toBe(false);
    expect(
      loginSchema.safeParse({ email: "ok@test.com", password: "x" }).success,
    ).toBe(true);
  });
});

describe("submitLessonSchema", () => {
  it("accepts answers array", () => {
    const r = submitLessonSchema.safeParse({
      lessonId: "11111111-1111-1111-1111-111111111111",
      answers: [{ exerciseId: "e1", answer: 0 }],
    });
    expect(r.success).toBe(true);
  });
});

describe("seekGameSchema", () => {
  it("defaults rated true", () => {
    const r = seekGameSchema.parse({ timeControl: "5+0" });
    expect(r.rated).toBe(true);
  });
});

describe("courseSlugSchema", () => {
  it("accepts known slugs", () => {
    expect(courseSlugSchema.safeParse("english").success).toBe(true);
    expect(courseSlugSchema.safeParse("nope").success).toBe(false);
  });
});

describe("learning progress & goal schemas", () => {
  it("validates progress query filters with 30-day default", () => {
    expect(learningProgressQuerySchema.parse({})).toEqual({ days: 30, course: null });
    expect(learningProgressQuerySchema.parse({ days: "7", course: "all" })).toEqual({
      days: 7,
      course: null,
    });
    expect(learningProgressQuerySchema.safeParse({ days: "14" }).success).toBe(false);
  });

  it("validates history query filters with limit 20 default and max 50", () => {
    expect(learningHistoryQuerySchema.parse({})).toEqual({
      days: "all",
      course: null,
      limit: 20,
    });
    expect(learningHistoryQuerySchema.parse({ days: "90", limit: "50" }).limit).toBe(50);
    expect(learningHistoryQuerySchema.safeParse({ limit: "51" }).success).toBe(false);
    expect(learningHistoryQuerySchema.safeParse({ limit: "0" }).success).toBe(false);
  });

  it("validates weekly goal target 1..1000 or null", () => {
    expect(updateLearningGoalSchema.parse({ weeklyTarget: 10 })).toEqual({ weeklyTarget: 10 });
    expect(updateLearningGoalSchema.parse({ weeklyTarget: null })).toEqual({ weeklyTarget: null });
    expect(updateLearningGoalSchema.safeParse({ weeklyTarget: 0 }).success).toBe(false);
    expect(updateLearningGoalSchema.safeParse({ weeklyTarget: 1001 }).success).toBe(false);
    expect(updateLearningGoalSchema.safeParse({ weeklyTarget: 5.5 }).success).toBe(false);
    expect(updateLearningGoalSchema.safeParse({}).success).toBe(false);
  });
});
