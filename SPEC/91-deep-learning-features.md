# 91 — Deep-learning features (concept cards, memory model, mixed practice)

Plan and backlog: [SPEC/90](./90-deep-improvements-plan.md).

## 1. Concept cards (`concept` exercise type)

Theory / worked-example step placed **first** in a lesson so practice follows explanation.

```ts
import { concept } from "./builders.js";

concept("jsf-cl-c1", "Що таке замикання", "What a closure is",
  { uk: "Пояснення…\n\nДругий абзац", en: "Explanation…\n\nSecond paragraph" },
  {
    keyPointsUk: ["…"], keyPointsEn: ["…"],
    code: "const next = counter();", language: "javascript",
    check: { qUk: "…?", qEn: "…?", options: ["a", "b"], correctIndex: 0 }, // optional
  });
```

| Field | Notes |
|-------|-------|
| `bodyUk` / `bodyEn` | Paragraphs split by a blank line (`\n\n`) |
| `keyPointsUk` / `keyPointsEn` | ≤ 8 bullets |
| `code` + `language` | Read-only Monaco block |
| `check` | Optional 1-question self-check |

**Grading** (`@eduforge/shared` `gradeExercise`): without `check` → correct when the answer is `true` or `{ acknowledged: true }` ("Got it"); with `check` → answer index must equal `check.correctIndex`.

- Zod: `exerciseSchema` (`type: "concept"`), listed in `EXERCISE_TYPES`.
- Web: `ConceptExercise` in `apps/web/src/components/exercises.tsx`; admin builder has a blank template.
- No DB migration (exercises are jsonb).
- Rule: do **not** put concept cards inside unit exams (content test enforces this for the new units).

## 2. Memory-strength model (forgetting curve)

`packages/shared/src/retention.ts`

- `stabilityDays({ bestScore, attempts })` — `S = (0.5 + 12·score²) · (1 + 0.3·log2(1+attempts))`, halved for leeches (≥4 attempts, score < 0.7), clamped 0.5–180 days.
- `estimateRetention({ …, daysSince })` — `R = exp(-t / S)`.
- `daysUntilRetention(input, target = 0.8)` — days until R drops to the target.
- `retentionSummary({ bestScore, attempts, lastPracticedAt })` → `{ retentionPct, stabilityDays, dueInDays }`.

`GET /review` items now include `retentionPct`, `stabilityDays`, `dueInDays` (null when the lesson is not completed). `/review` shows "🧠 Memory ≈ N% · review in ~Xd".

## 3. Interleaved mixed practice

`packages/shared/src/interleave.ts`

- `MIXED_PRACTICE_TYPES`: mcq, logic_puzzle, code_read, code_output (with options/accepted), code_fill, code_order, fill_blank, translate, match, order_words.
- `buildInterleavedSet(pools, { count ≤ 30, seed, maxPerLesson = 3 })` — weighted random lesson order (weight `1 + 2·(1 − bestScore)`), round-robin across lessons (no back-to-back items from one lesson when avoidable), no duplicates, deterministic for a seed (mulberry32).

API (auth required):

| Method | Path | Notes |
|--------|------|-------|
| GET | `/review/mixed?course=&count=10&seed=` | Completed, non-exam lessons; returns `{ seed, items[{ lessonId, courseSlug, lessonTitleUk/En, exercise }] }` |
| POST | `/review/mixed/check` | Body `{ answers: [{ lessonId, exerciseId, answer }] }` (≤ 30); server-graded; logs `mixed_practice` activity; rate limit 30/min |

Web: `/review/mixed` (linked from `/review`) — progress bar, `ExercisePlayer`, result sheet with links back to lessons for missed items.

No XP is awarded for mixed practice yet (keeps the economy unchanged) — see SPEC/90 backlog.

## 4. New content (14 lessons, 59 exercises)

| Course | Unit slug | Lessons |
|--------|-----------|---------|
| `js_fundamentals` | `closures_event_loop` | Closures · this & bind · Event loop & microtasks · Exam |
| `typescript` | `advanced_types` | Conditional types & infer · Mapped types · Template literal types · Exam |
| `sql_fundamentals` | `cte-performance` | WITH (CTE) · Indexes · EXPLAIN · Exam |
| `english` | `learning-skills` | Talking about learning · Phrasal verbs for studying |

Source: `packages/content/src/deep-units.ts` (wired before `capstone` in each deep track, appended to English). Every non-exam lesson opens with a bilingual concept card.

## Tests

- `packages/shared/src/concept.test.ts`, `retention.test.ts`, `interleave.test.ts`
- `packages/content/src/content.test.ts` → "deep-learning units (SPEC 90/91)"
