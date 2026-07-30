import { describe, expect, it } from "vitest";
import {
  parentChildDigestEmail,
  registrationVerifyEmail,
  weeklyReportEmail,
} from "./email.js";

describe("retention emails", () => {
  it("parent digest includes exams, portal CTA, and inactive copy", () => {
    const mail = parentChildDigestEmail({
      email: "p@test.com",
      parentName: "Parent",
      childName: "Kid",
      locale: "en",
      lessonsCompleted: 0,
      xpApprox: 0,
      streakDays: 2,
      programmingLessonsWeek: 0,
      playgroundSolvedWeek: 0,
      homeworkCompletedWeek: 0,
      examsPassedWeek: 0,
      globalLevel: 3,
    });
    expect(mail.subject).toMatch(/quiet/i);
    expect(mail.text).toMatch(/Exams passed: 0/);
    expect(mail.html).toMatch(/Open parent portal|parents/i);
    expect(mail.html).toMatch(/#58CC02/);
  });

  it("parent digest active week subject", () => {
    const mail = parentChildDigestEmail({
      email: "p@test.com",
      parentName: "Parent",
      childName: "Kid",
      locale: "uk",
      lessonsCompleted: 4,
      xpApprox: 80,
      streakDays: 5,
      programmingLessonsWeek: 2,
      playgroundSolvedWeek: 1,
      homeworkCompletedWeek: 1,
      examsPassedWeek: 1,
      globalLevel: 4,
    });
    expect(mail.subject).toMatch(/тиждень Kid/);
    expect(mail.text).toMatch(/Контрольні: 1/);
  });

  it("weekly report inactive nudge", () => {
    const mail = weeklyReportEmail({
      email: "u@test.com",
      displayName: "Alex",
      locale: "en",
      lessonsCompleted: 0,
      xpApprox: 0,
      flashcardReviews: 0,
      focusMinutes: 0,
      streakDays: 0,
    });
    expect(mail.subject).toMatch(/miss you/i);
    expect(mail.html).toMatch(/Continue learning|Back to learning|learn/i);
  });

  it("registration verify email includes policy and CTA", () => {
    const mail = registrationVerifyEmail({
      to: "new@test.com",
      displayName: "Nova",
      verifyUrl: "http://localhost:3000/verify-email?token=abc",
      locale: "uk",
    });
    expect(mail.subject).toMatch(/Підтвердіть|акаунт/i);
    expect(mail.text).toMatch(/7 днів/);
    expect(mail.text).toMatch(/30 днів/);
    expect(mail.html).toMatch(/verify-email\?token=abc/);
    expect(mail.html).toMatch(/#58CC02/);
  });

  it("registration verify email EN policy", () => {
    const mail = registrationVerifyEmail({
      to: "new@test.com",
      displayName: "Nova",
      verifyUrl: "https://app.example/verify-email?token=xyz",
      locale: "en",
    });
    expect(mail.subject).toMatch(/Confirm/i);
    expect(mail.text).toMatch(/7 days/i);
    expect(mail.text).toMatch(/30 days/i);
  });
});
