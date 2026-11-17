# 05 — Courses & Content

## Courses

| Slug | Style | Primary skills |
|------|--------|----------------|
| `english` | Duolingo-like path | Vocab, phrases, basic grammar |
| `chess` | Learn + puzzles + play | Rules, tactics, openings, endgames intro |
| `typing` | edclub-like trainer | WPM, accuracy, EN/UK layouts |
| `speed_reading` | Best practices | RSVP, chunking, skimming, comprehension |
| `logic` | LogicLike-like | Sequences, patterns, verbal, syllogisms |
| `programming` | Mimo-style path | HTML → CSS → JS → TS → React → Git → Node → Express → SQL → QA (+ mini-projects + unit exams) |
| `typescript` | Full TypeScript course | basics → generics → narrowing → utilities → modules + unit exams |
| `html_semantics` | Semantic HTML deep track | landmarks, forms a11y, ARIA + exams |
| `css_layout` | CSS Flex & Grid | flexbox, grid, responsive + exams |
| `qa_theory` | QA theory deep track | principles, levels, types, techniques, STLC + exams |
| `js_fundamentals` | JavaScript deep track | types, functions, arrays, async, DOM, modules + exams |
| `react_fundamentals` | React deep track | components, props, state, lists, effects, forms + exams |
| `sql_fundamentals` | SQL & Oracle Database | One course, three sections: SQL & Modern Oracle, PL/SQL, Database Administration. 44 units, 177 lessons, 44 exams. Oracle 1Z0-071 checklist, query repair, and explicit Oracle ↔ PostgreSQL dialect notes |
| `node_fundamentals` | Node.js deep track | runtime, modules, fs, env, http, npm, async + exams |
| `express_fundamentals` | Express deep track | app, routes, middleware, REST, errors, Router + exams |
| `embedded_cpp` | Embedded C++ · MilTech | memory, CMake, net, RTOS, MAVLink, safety, datalink, mission + labs/exams |
| `electrical_engineering` | Electrical engineering + SPICE | Charge and fields → DC/AC → electronics → power systems and machines → three capstones; 60 units, 360 lessons including 60 exams |

Full canonical list of all **36 registered courses** (558 units, 2,513 lessons including 513 exams, 13 ForgeBoard labs) lives in **[SPEC/courses/README.md](./courses/README.md)** and **[SPEC/COURSE-REGISTRY.md](./COURSE-REGISTRY.md)**. Counts include unpublished content. All published courses and lessons are free for all accounts. The in-app SPICE laboratory is separate from ForgeBoard packs.

## Content pipeline

1. Authors define content in `packages/content/src/*.ts`  
2. `pnpm content:sync` safely synchronizes courses/units/lessons without touching users, passwords, sessions, progress, or `contentSource=cms` courses  
3. `pnpm db:seed` runs full seed for fresh local dev environments  
4. Admin CMS can create **draft** courses (free-form slug), units/lessons, then **publish**  
5. Learners see only `status=published` + `isVisible` courses via API  

Seed and content:sync are **incremental**: existing seed slugs update payload; new seed slugs insert.  
CMS-owned courses are not overwritten. See SPEC 72 for publish gates and SPEC 93 for content synchronization guarantees.

## Lesson model

```ts
{
  slug: string;
  titleUk: string;
  baseXp: number;
  difficulty: 1..5;
  isFree?: boolean;
  exercises: Exercise[];
}
```

## Exercise types

| Type | Grading | Used in |
|------|---------|---------|
| `mcq` | `correctIndex` | English, chess theory, reading |
| `translate` | accepted strings (normalized) | English |
| `fill_blank` | accepted strings | English |
| `match` | set of left/right pairs | English |
| `order_words` | ordered string array | English |
| `typing` | wpm ≥ 10 and accuracy ≥ 0.85 | Typing |
| `rsvp` | `completed: true` | Speed reading |
| `comprehension` | ≥ 50% questions correct | Speed reading |
| `logic_puzzle` | `correctIndex` | Logic |
| `chess_puzzle` | SAN sequence or `{ solved: true }` | Chess |
| `chess_lesson` | optional quiz MCQ | Chess |
| `code_read` | snippet + `correctIndex` | Programming |
| `code_output` | MCQ or accepted text | Programming |
| `code_fill` | fill blank in code | Programming |
| `code_order` | ordered lines | Programming |
| `code_project` | multi-file + substring checks | Programming minis |
| `code_run` | client run (C++ via JSCPP) + source needles | embedded_cpp labs, playground-style |
| `video` | watch ratio ≥ `minWatchRatio` | MDX `videoUrl` lessons |
| `code_judge` | Server Docker isolated execution or static text mode (SPEC 93) | Judge-enabled drills |
| `concept` | acknowledged, or optional `check` MCQ | Theory card first in deep lessons (SPEC 91) |
| `explain` | Rubric stem matches plus repetition-capped word count and non-keyword vocabulary checks | Self-explanation; optional tutor feedback (SPEC 92) |
| `numeric` | SI-aware scalar or complex answer with explicit absolute/relative tolerance and magnitude-scaled floating-point slack | Electrical engineering calculations |
| `circuit_lab` | Server structural checks and SPICE evaluation against authored criteria | Electrical engineering circuit exercises |

See also [23-programming-track.md](./23-programming-track.md), [93-clear-tasks-robust-grading.md](./93-clear-tasks-robust-grading.md), and SPECs 33–54 (playground, minis, race).

Choice-based exercises may shuffle their display order deterministically; submitted indices remain the original content indices. Explanation grading counts each normalized token at most twice and requires non-keyword vocabulary as well as rubric matches. This reduces repetition padding but remains a lexical check, not semantic verification. Authoring guidance is in [CONTENT-DX](./CONTENT-DX.md).

Normalization for text and code answers:
- Text: trim, lowercase, unify Ukrainian apostrophes (`’`, `‘`, `ʼ`, `'`) and quotes (`«`, `»`, `“`, `”`, `"`), collapse spaces, strip trailing punctuation.
- Code: normalize string quotes (`'` vs `"`), operator spacing (`a + b` vs `a+b`), optional semicolons, and CSS property spacing (`font-size`). Zero client trust for `code_judge` execution passes (server-verified only).

## Access

Published lessons are free for every account. `lesson.isFree` is leftover content metadata and does not lock the player. Authenticated unit exam opening and submission require completion of the current content version of the unit's non-exam lessons; the server returns `403 exam_locked` otherwise. Draft and hidden content is unavailable to non-admin users. See [API contracts](./04-api-reference.md#courses-courses).

Hearts are a shared practice counter (5, then regen). Running out of hearts does not block opening or submitting a lesson.

## Default admin seed

After seed:

- Email: `admin@eduforge.ua` (override `ADMIN_EMAIL`)  
- Password: `admin12345` (override `ADMIN_PASSWORD`)  
- Role: `admin`, plan: `free`  
