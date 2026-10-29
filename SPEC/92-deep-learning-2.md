# 92 — Deep learning, round 2: calibration, mistake notebook, mastery map, self-explanation

**Status:** Done (2026-10) · **Plan:** [SPEC/90](./90-deep-improvements-plan.md) items D5–D10, steps 24–29 · **Builds on:** [SPEC/91](./91-deep-learning-features.md)

## 1. Confidence ratings + calibration (D5)

- After answering a rateable exercise (anything except `concept`, `video`, `code_project`) in a lesson, mixed practice or mistake review, the learner picks **Guess (1) / Unsure (2) / Sure (3)** (`components/confidence-picker.tsx`).
- Stored per attempt in the new `exercise_attempts` table (`confidence` nullable int).
- `@eduforge/shared` `calibration.ts`: `CONFIDENCE_META` (expected accuracy 0.33 / 0.6 / 0.9), `normalizeConfidence`, `buildCalibration(attempts)` → buckets (actual vs expected first-try accuracy), `overconfidence`, `underconfidence`, `score` (0–100), bilingual tip.
- API: `GET /deep/calibration?days=30` (default 30, max 180). Web: Calibration card on `/review`.

## 2. Exercise-level SRS — mistake notebook (D7)

- Migration `0032_exercise_attempts_reviews.sql`:
  - `exercise_attempts(user_id, lesson_id, exercise_id, exercise_type, correct, first_try, wrong_attempts, confidence, source, created_at)`; `source` = `lesson | mixed | mistakes`.
  - `exercise_reviews(user_id, lesson_id, exercise_id, ease, interval_days, repetitions, lapses, due_at, last_reviewed_at)`, unique `(user_id, lesson_id, exercise_id)`.
- Because the lesson player soft-grades (retry until correct), a "mistake" is a **wrong attempt reported by the client** (`wrongAttempts` on each lesson answer, captured via `WrongAttemptCtx` in `ExercisePlayer`) or a non-first-try / wrong answer in review sessions. Server clamps `wrongAttempts` to 0–20.
- `shared/exercise-srs.ts`: `isFirstTry`, `shouldTrackMistake`, `srsRatingFromOutcome` (SM-2 rating: wrong → 1, correct after retries or a lucky guess → 2, unsure → 3, sure → 4), `isGraduatedReview` (≥4 reps and ≥21-day interval → leaves the due queue).
- API service `services/exercise-learning.ts` (`planExerciseLearning` pure + `recordExerciseLearning`), called from lesson submit side effects (`safe("exercise_learning")`) and both review sessions.
- Routes: `GET /review/mistakes?limit=` (due items + `due` / `total` / `graduated`), `POST /review/mistakes/check`.
- Web: `/review/mistakes` (shared `PracticeSession` component), Mistake notebook card on `/review`.

## 3. Per-unit mastery map (D8)

- `shared/unit-mastery.ts`: `lessonMasteryState` → `new | learning | fading | mastered` (mastered = score ≥ 0.85 and retention ≥ 0.6; fading = was mastered/learned but retention < 0.6), `buildUnitMasteryMap` → per unit counts + `masteryPct` + average retention.
- API: `GET /deep/mastery-map/:slug`. Web: `/courses/[slug]/mastery` (heat-colored lesson tiles; linked from the course page next to "Mixed practice").

## 4. "Explain in your own words" (D6)

- New exercise type **`explain`**: `{ promptUk/En, keyIdeas: [{ labelUk, labelEn?, anyOf: string[] }], minWords? (12), passRatio? (0.6), sampleAnswerUk/En? }`.
- Grading is **deterministic** (`shared/explain.ts` `gradeExplanation`): normalized text, word count ≥ `minWords`, share of key ideas whose any stem appears ≥ `passRatio`. Returns `matched` / `missing` ideas. Works offline, in exams and in the API grader.
- **Tutor feedback (feasible, hybrid):** `POST /deep/explain-feedback` (10/min) re-grades with the rubric and, when `XAI_API_KEY` is set, asks the tutor model for 2–3 sentences of feedback in the learner's locale; otherwise returns rubric-based feedback (`source: "rubric"`). The AI never decides pass/fail.
- Web `ExplainExercise`: textarea + word counter, missing-idea hints on soft fail, "Ask the tutor" button (hidden in exams), sample answer after the skip threshold.
- Content: 5 `explain` exercises in deep units (`jsf-cl-x1`, `jsf-cl-x2`, `tsc-adv-x1`, `sqlf-cte-x1`, `en-ls-x1`); content test checks each sample answer passes its own rubric.

## 5. Authoring

- **MDX** (`packages/content/src/mdx/parse.ts`):
  ```md
  <!-- concept titleUk="Замикання" titleEn="Closures" -->
  ::uk Текст українською.
  ::en English text.
  ::points-uk пункт 1|пункт 2
  ::points-en point 1|point 2
  ::check q="Питання?" qEn="Question?" options="a|b|c" answer=0
  ```js
  const f = () => x;
  ```
  <!-- /concept -->

  <!-- explain q="Поясніть..." qEn="Explain..." ideas="ідея|idea|stem1,stem2;..." minWords=15 -->
  ```
  Concept cards are emitted first; code inside a concept block does not become `code_fill`. Example: `mdx/concept-lesson.mdx`.
- **Admin exercise builder**: dedicated forms for `concept` (body UK/EN, key points, code + language, optional self-check) and `explain` (key ideas as `labelUk | labelEn | stem1, stem2`, minWords, passRatio, sample answers). Parsing helpers in `apps/web/src/lib/builder-fields.ts` (tested).

## 6. XP for mixed practice / mistake review (step 29 extra)

- +2 XP per **first-try** correct answer, capped at **20 XP per session** and **60 XP per UTC day** across `mixed_practice` + `mistakes_practice` activity events (`reviewSessionXp`, `reviewXpEarnedToday`). Granted via `grantXpToUser` without spark multipliers so review cannot be farmed.

## 7. Content quality + CI (D9, D10)

- `js_fundamentals`: 105 short or UK=EN duplicated prompts rewritten as real Ukrainian + English sentences (ids, answers, options unchanged). New content test: every non-concept/explain/project exercise in `js_fundamentals` has distinct UK/EN prompts of ≥ 12 chars.
- `.github/workflows/ci.yml` now runs on push / PR for `deepImprovements` too (e2e workflow unchanged).

## Verification

See SPEC/90 §5 (round-2 results).
