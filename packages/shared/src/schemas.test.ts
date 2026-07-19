import { describe, expect, it } from "vitest";
import {
  courseSlugSchema,
  loginSchema,
  registerSchema,
  seekGameSchema,
  submitLessonSchema,
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
