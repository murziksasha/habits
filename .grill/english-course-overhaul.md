# Grill: Thorough English Course Improvement & Expansion
Date: 2026-11-25

## Intent
Transform the monolithic 45-unit / 249-lesson `english` course into a coherent, pedagogically sound, CEFR-aligned 5-course curriculum under the `languages` subject, while fixing core learner UX, audio/listening mechanics, placement routing, and answer grading so Ukrainian speakers (and English UI users) get authentic skill practice from A0 to C1.

## Constraints
- **Free & offline-capable**: zero paid TTS/STT/LLM API key requirements; audio uses browser Web Speech API (`speechSynthesis`) with graceful no-audio fallback.
- **IA & Nav budget (`SPEC/CURRENT.md`)**: primary navigation stays subject-neutral (`Home, Learn, Courses, Practice, Friends` + mobile 5 tabs); the unified `/english` hub sits in `More` alongside `/programming` and `/play`.
- **No hard course locks**: prerequisites across the 5 courses remain guidance, not locks (`SPEC/COURSE-REGISTRY.md`); unit exams continue to enforce current-version completion of unit lessons (`exam_locked`).
- **Backwards compatibility**: preserve existing `lesson.id` / `user_lesson_progress` / notes / comments / review items when migrating units out of `english` into the new courses; track substantive lesson rewrites with `contentVersion: 2` (`historicalCompletion`).
- **Client/server grading parity**: deterministic grading lives in `@eduforge/shared` so client soft-grade and server submit never drift.

## Key decisions
- **Decision**: Comprehensive full-stack overhaul across content, player UX, audio/listening, placement, and grading.
  - **Reason**: Content expansion alone leaves broken TTS (`uk_en` spoken in `en-US`, `___` spoken aloud), missing `DrillFooter`/hints in `TextExercise`, rigid grading, and broken placement routing unresolved.
  - **Alternative considered**: Content-only expansion or player-only redesign.
- **Decision**: Split the 45-unit monolith into 5 specialized courses under `languages`:
  1. `english` — General English Foundations (A0–A2)
  2. `english_b1_b2` — Grammar, Vocabulary & Reading (B1–B2)
  3. `english_pronunciation` — IPA, Minimal Pairs, Stress, Intonation & Listening
  4. `english_work_it` — Business & IT English (Calls, PRs, Incidents, Interviews)
  5. `english_c1_exams` — Advanced C1 Style, Academic Writing & IELTS/FCE Practice
  - **Reason**: Decouples beginner foundations from specialized IT/C1/phonetics tracks and allows clear CEFR progression, independent certificates/badges, and logical placement.
  - **Alternative considered**: Keeping a single 45+ unit monolith or splitting into 3–4 courses with pronunciation embedded.
- **Decision**: Create a unified `/english` hub page (parallel to `/programming`) placed in the `More` menu, keeping primary nav subject-neutral.
  - **Reason**: Respects `SPEC/CURRENT.md` IA rules and `ux.test.ts` subject-neutrality while giving English learners one home for all 5 courses, placement, CEFR map, and flashcards.
  - **Alternative considered**: Replacing `Friends` or expanding desktop nav to 6 slots.
- **Decision**: Unified `/placement` routes A0–C1 across the 5 courses (with optional cross-course skip for mastered lower courses) plus per-course `/placement/<slug>` for unit skipping.
  - **Reason**: Current `PLACEMENT_LEVELS` sent B2/C1 learners to `travel` / `work-life`; cross-course routing fixes onboarding without hard-locking courses.
  - **Alternative considered**: Per-course placement only or hard prerequisite locks.
- **Decision**: Add `listening` exercise type using Web Speech API (`0.75×` / `1.0×` playback, hidden transcript, quiet-mode / no-TTS fallback to text/IPA without heart penalty, and exam-safe fallback), plus fixed `SpeakButton` and audio playback on `Concept` examples, `Comprehension` passages, and optional multi-turn `dialogue` context blocks.
  - **Reason**: Real listening & minimal-pair discrimination requires hiding text until answered while remaining accessible in quiet environments or browsers without TTS voices.
  - **Alternative considered**: Pre-recorded MP3 bundle, paid external TTS, or keeping text always visible.
- **Decision**: Upgrade deterministic grading in `@eduforge/shared` (contraction expansion, UK/US spelling equivalence, pattern tolerance, specific miss diagnostics) + `DrillFooter` (hints + 3 soft attempts) in `TextExercise`, plus optional `🎓 Tutor check` (SpaceXAI) for open feedback without affecting deterministic score.
  - **Reason**: Eliminates false rejections on contractions/variants while keeping client/server grading 100% deterministic.
  - **Alternative considered**: Non-deterministic LLM grading in submit path or dropping free-text `translate`.
- **Decision**: Idempotent DB migration + `content:sync` re-parenting of moved units/lessons/progress by `unit.slug`, with separate certificates, starter achievements, `+1 SP` path badges, and flashcard decks for each of the 5 courses.
  - **Reason**: Protects live learner progress while making each of the 5 courses a first-class citizen in EduForge progression.
  - **Alternative considered**: Leaving legacy units duplicated in `english` or skipping live DB migration.
- **Decision**: Full content overhaul across all 5 courses: A0–A1 bedrock + concepts/exams in `english`; B1–B2 `comprehension` + exams in `english_b1_b2`; audio-first `listening` in `english_pronunciation`; applied cases (KWT, Open Cloze, email/PR/essay editing, IELTS reading) replacing meta-trivia in `english_work_it` and `english_c1_exams`, with `examVariant` A/B/C banks; structured into 5 test-passing phases.
  - **Reason**: Replaces "quiz about rules" anti-pattern with genuine language transfer and exam-readiness.
  - **Alternative considered**: Enriching only A0–A2 and pronunciation first, or omitting `examVariant` A/B/C.

## Surfaced assumptions
- `seedCourse` matches units by `(courseId, unit.slug)` and lessons by `(unitId, lesson.slug)`; moving units across courses therefore requires explicit SQL/sync re-parenting of existing DB rows so old units do not stay orphaned in `english`.
- Browser `speechSynthesis` availability varies across OS/browsers/headless CI, so `listening` must auto-detect voice availability and offer a quiet-mode fallback so lessons and unit exams never deadlock.
- Splitting `english` impacts `COURSE_SLUGS`, `COURSE_PARTS`, `COURSE_SUBJECT`, `LEARNING_PATHS`, `skills.ts` (`verifyAllCoursesHaveObjectives`), `PATH_BADGE_CATALOG`, `ACHIEVEMENT_CATALOG`, `content.test.ts`, `courses.test.ts`, and `deep-tracks-learning.test.ts`.

## Out of scope
- Paid external TTS/STT or mandatory `XAI_API_KEY` for deterministic grading.
- Pre-recorded MP3/OGG audio asset packs bundled in git/CDN.
- Native mobile app shells (`apps/mobile`).
- C2 Proficiency level or specialized Legal/Medical English domains.
- Modifying primary subject-neutral desktop/mobile nav slots.
