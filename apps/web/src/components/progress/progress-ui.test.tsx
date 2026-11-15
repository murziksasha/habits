import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";
import { UI } from "@eduforge/shared";

vi.mock("@/lib/locale-context", () => ({
  useLocale: () => ({
    locale: "en",
    setLocale: () => {},
    t: {
      ...UI,
      learning: {
        ...UI.learning,
        myProgress: "My progress",
        chartsTitle: "Charts & study heatmap",
        dailyActivityChart: "Daily activity",
        scoreTrendsChart: "Score trends",
        courseProgressChart: "Course progress",
        studyHeatmap: "Study heatmap (84 days, UTC)",
        textEquivalent: "Accessible data table",
        heatmapNote: "Marks UTC days with any submitted lesson or exam attempt.",
        less: "Less",
        more: "More",
        utcLabel: "UTC days · Mon–Sun weeks (UTC)",
        activeDays: "Active days",
        maxStreak: "Best streak",
        courseLevels: "Course levels",
        lessonsCount: "lessons",
        averageScore: "Average score",
        noFilteredAttemptsBody: "No attempts match",
        noAttemptsBody: "No attempts yet",
        dataUnavailable: "Unavailable",
      },
    },
  }),
}));

describe("Progress UI components", () => {
  it("renders ProgressChartsSection with accessible img roles, progressbar, and data tables", async () => {
    const { ProgressChartsSection } = await import("./progress-charts.js");
    const html = renderToStaticMarkup(
      <ProgressChartsSection
        days={7}
        dailySeries={[
          {
            date: "2026-11-11",
            attempts: 2,
            successfulAttempts: 1,
            failedAttempts: 1,
            unknownAttempts: 0,
            courseXp: 25,
            averageScore: 0.75,
            scoredAttempts: 2,
            newCompletions: 1,
            heatmapLevel: 2,
          },
          {
            date: "2026-11-12",
            attempts: 1,
            successfulAttempts: 1,
            failedAttempts: 0,
            unknownAttempts: 0,
            courseXp: 30,
            averageScore: 1,
            scoredAttempts: 1,
            newCompletions: 1,
            heatmapLevel: 1,
          },
        ]}
        heatmap={{
          days: 14,
          timezone: "UTC",
          activeDays: 1,
          maxStreakInWindow: 1,
          series: [
            { date: "2026-11-12", count: 3, level: 2 },
          ],
        }}
        courseBreakdown={[
          {
            courseId: "c1",
            courseSlug: "english",
            titleUk: "Англійська",
            titleEn: "English",
            icon: "🇬🇧",
            color: "#58CC02",
            xp: 120,
            level: 2,
            xpInLevel: 20,
            xpNeededForNext: 182,
            xpRemainingToNext: 162,
            levelProgressRatio: 0.11,
            completedLessons: 3,
            totalLessons: 10,
            completionRatio: 0.3,
            attemptsInWindow: 3,
            successfulInWindow: 2,
            courseXpInWindow: 55,
          },
        ]}
      />,
    );
    expect(html).toContain('role="img"');
    expect(html).toContain('role="progressbar"');
    expect(html).toContain("Accessible data table");
    expect(html).toContain("<table");
    expect(html).toContain("2026-11-12");
    expect(html).toContain("30%");
  });

  it("renders StreakCalendar with recorded dates and My progress link", async () => {
    const { StreakCalendar } = await import("../streak-calendar.js");
    const today = new Date().toISOString().slice(0, 10);
    const html = renderToStaticMarkup(
      <StreakCalendar
        activeDates={[today]}
        days={14}
        streakDays={5}
        progressHref="/calendar"
      />,
    );
    expect(html).toContain('href="/calendar"');
    expect(html).toContain(`aria-label="${today} active"`);
  });
});
