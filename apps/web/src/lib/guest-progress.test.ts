import { beforeEach, describe, expect, it } from "vitest";
import {
  GUEST_PROGRESS_KEY,
  getGuestProgress,
  recordGuestLessonProgress,
  overlayGuestProgress,
} from "./guest-progress.js";

describe("guest-progress", () => {
  const store = new Map<string, string>();

  beforeEach(() => {
    store.clear();
    // Mock localStorage
    const mockStorage: Storage = {
      length: 0,
      clear: () => store.clear(),
      getItem: (key: string) => store.get(key) ?? null,
      setItem: (key: string, value: string) => store.set(key, value),
      removeItem: (key: string) => store.delete(key),
      key: (index: number) => Array.from(store.keys())[index] ?? null,
    };
    Object.defineProperty(globalThis, "localStorage", {
      value: mockStorage,
      writable: true,
      configurable: true,
    });
  });

  it("reads and writes guest completions per course slug", () => {
    expect(getGuestProgress("english")).toEqual([]);
    recordGuestLessonProgress("english", "lesson-1");
    recordGuestLessonProgress("english", "lesson-2");
    // Duplicate should not duplicate
    recordGuestLessonProgress("english", "lesson-1");

    expect(getGuestProgress("english")).toEqual(["lesson-1", "lesson-2"]);
    expect(getGuestProgress("math")).toEqual([]);

    const raw = JSON.parse(localStorage.getItem(GUEST_PROGRESS_KEY)!);
    expect(raw).toEqual({ english: ["lesson-1", "lesson-2"] });
  });

  it("overlays progress and unlocks exam only when unit lessons are completed", () => {
    const units = [
      {
        id: "unit-1",
        lessons: [
          { id: "l1", status: "available", locked: false, isExam: false },
          { id: "l2", status: "available", locked: false, isExam: false },
          { id: "e1", status: "available", locked: true, isExam: true, examLocked: true },
        ],
      },
    ];

    // With 1 lesson completed
    const partial = overlayGuestProgress(units, ["l1"]);
    expect(partial.completedCount).toBe(1);
    expect(partial.units[0].lessons[0].status).toBe("completed");
    expect(partial.units[0].lessons[1].status).toBe("available");
    // Exam still locked
    expect(partial.units[0].lessons[2].examLocked).toBe(true);
    expect(partial.units[0].lessons[2].locked).toBe(true);

    // With both non-exam lessons completed
    const full = overlayGuestProgress(units, ["l1", "l2"]);
    expect(full.completedCount).toBe(2);
    expect(full.units[0].lessons[0].status).toBe("completed");
    expect(full.units[0].lessons[1].status).toBe("completed");
    // Exam is unlocked!
    expect(full.units[0].lessons[2].examLocked).toBe(false);
    expect(full.units[0].lessons[2].locked).toBe(false);

    // After exam is also completed
    const examDone = overlayGuestProgress(units, ["l1", "l2", "e1"]);
    expect(examDone.completedCount).toBe(3);
    expect(examDone.units[0].lessons[2].status).toBe("completed");
    expect(examDone.units[0].lessons[2].locked).toBe(false);
  });
});

