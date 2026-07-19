# 59 — TypeScript course

## Model

- **Course slug:** `typescript` (Postgres enum + seed)
- **Separate** from programming path unit `typescript` (kept as intro + mini)
- Progress: own XP / hearts / level / certificate
- Hub: `/typescript` + path `/courses/typescript`
- Freemium: first lessons free + `FREE_LESSONS_PER_COURSE`

## Units (MVP)

| Unit | Focus |
|------|--------|
| basics | What is TS, primitives, annotations |
| objects | objects, arrays, tuples, enums/unions |
| interfaces | interface vs type, extends, intersection |
| functions | params, returns, optional |
| generics | functions, constraints |
| narrowing | unions, typeof, discriminants |
| utilities | Partial, Pick, Omit, Record |
| modules | import/export, tsconfig |
| capstone | typed util mini-project |

Each unit ends with a **control exam** (see SPEC 60).

## Content

`packages/content/src/typescript.ts` — dual UK/EN prompts, code drills (`mcq`, `code_*`, `code_project`).

## Migration

`0015_typescript_exams_feedback` — `ADD VALUE 'typescript'`.

## Related

- SPEC 23 programming unit TypeScript (unchanged intro)
- SPEC 60 unit exams
