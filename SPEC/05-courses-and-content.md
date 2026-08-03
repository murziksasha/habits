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
| `sql_fundamentals` | SQL deep track | SELECT, JOINs, aggregates, DML, keys + exams |
| `node_fundamentals` | Node.js deep track | runtime, modules, fs, env, http, npm, async + exams |
| `express_fundamentals` | Express deep track | app, routes, middleware, REST, errors, Router + exams |
| `embedded_cpp` | Embedded C++ · MilTech | memory, CMake, networking, FreeRTOS, MAVLink, sim + exams |

## Content pipeline

1. Authors define content in `packages/content/src/*.ts`  
2. `pnpm db:seed` upserts courses/units/lessons by **slug** (skips `contentSource=cms`)  
3. Admin CMS can create **draft** courses (free-form slug), units/lessons, then **publish**  
4. Learners see only `status=published` + `isVisible` courses via API  

Seed is **incremental**: existing seed slugs update payload; new seed slugs insert.  
CMS-owned courses are not overwritten by seed. See SPEC 72 for publish gates.

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

See also [23-programming-track.md](./23-programming-track.md) and SPECs 33–54 (playground, minis, race).

Normalization for text answers: trim, lowercase, strip trailing punctuation, collapse spaces.

## Freemium access

A lesson is accessible if:

- `lesson.isFree === true`, **or**  
- user plan is `premium`, **or**  
- lesson index in course (sorted by unit order then lesson order) `< FREE_LESSONS_PER_COURSE` (5)

Hearts gate: free users with 0 hearts cannot open/submit lessons.

## Default admin seed

After seed:

- Email: `admin@eduforge.ua` (override `ADMIN_EMAIL`)  
- Password: `admin12345` (override `ADMIN_PASSWORD`)  
- Role: `admin`, plan: `premium`  
