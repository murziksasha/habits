/**
 * Short learning session built from the existing recommendation list.
 * 5 minutes is one review, or the next lesson when nothing is due.
 * 10 minutes adds one new lesson. 20 minutes adds a close or a second lesson.
 */

export type SessionPlanItem = {
  kind: string;
  titleUk: string;
  titleEn: string;
  href: string;
};

export type SessionRole = "review" | "new" | "close";

export type SessionStep = SessionPlanItem & { role: SessionRole };

const REVIEW_KINDS = new Set(["review_weak", "leech", "spaced_review", "review_queue"]);

function isNewKind(kind: string): boolean {
  return (
    kind === "continue_course" ||
    kind === "start_course" ||
    kind === "explore_course" ||
    kind === "deep_track" ||
    kind === "programming_mini" ||
    kind === "programming_minis"
  );
}

function isCloseKind(kind: string): boolean {
  return kind === "exam_ready" || kind === "quests" || kind === "flashcards";
}

export function composeLearningSession(
  minutes: 5 | 10 | 20,
  items: SessionPlanItem[],
): SessionStep[] {
  const review = items.find((item) => REVIEW_KINDS.has(item.kind));
  const fresh = items.filter((item) => isNewKind(item.kind));
  const firstNew = fresh[0];
  const secondNew = fresh[1];
  const closeItem =
    secondNew ??
    items.find(
      (item) =>
        isCloseKind(item.kind) && item.href !== firstNew?.href && item.href !== review?.href,
    );

  const steps: SessionStep[] = [];
  const push = (item: SessionPlanItem | undefined, role: SessionRole) => {
    if (!item) return;
    if (steps.some((step) => step.href === item.href)) return;
    steps.push({ ...item, role });
  };

  if (minutes === 5) {
    const only = review ?? firstNew ?? items[0];
    push(only, review ? "review" : "new");
    return steps;
  }

  push(review, "review");
  push(firstNew, "new");
  if (minutes === 20) push(closeItem, "close");
  if (!steps.length && items[0]) push(items[0], "new");
  return steps;
}
