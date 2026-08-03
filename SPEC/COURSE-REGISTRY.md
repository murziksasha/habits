# Course registry

App-level map of course slug → hub → freemium. DB stores `varchar` slugs; registry is in `@eduforge/shared` (`COURSE_SLUGS`, `COURSE_META`, `COURSE_GROUP`).

## Matrix

| Slug | Group | Hub | Free lessons / course | Notes |
|------|-------|-----|------------------------|--------|
| `programming` | code | `/programming` | `FREE_LESSONS_PER_COURSE` | Primary code path |
| `typescript` | deep | `/programming` + `/typescript` | same | Deep track |
| `html_semantics` | deep | `/programming` | same | Deep |
| `css_layout` | deep | `/programming` | same | Deep |
| `js_fundamentals` | deep | `/programming` | same | Deep |
| `react_fundamentals` | deep | `/programming` | same | Deep |
| `sql_fundamentals` | deep | `/programming` | same | Deep |
| `node_fundamentals` | deep | `/programming` | same | Deep |
| `express_fundamentals` | deep | `/programming` | same | Deep |
| `qa_theory` | deep | `/programming` | same | Deep |
| `english` | skill | `/courses/english` | same | Core skill |
| `typing` | skill | `/courses/typing` | same | |
| `speed_reading` | skill | `/courses/speed_reading` | same | |
| `logic` | skill | `/courses/logic` | same | |
| `chess` | chess | `/play` | same + free rated/day | |

Constants live in `packages/shared/src/entitlements.ts` (`FREE_LESSONS_PER_COURSE`, hearts, rated chess).

## Rules

1. **No new root nav entry** per deep track — link from `/learn`, `/courses`, `/programming`.
2. **No Postgres ENUM migration** for new slug — add to `COURSE_SLUGS` + content seed.
3. **Hub** for code deep tracks is `/programming` (stack tree), not a top-level nav item.
4. Freemium gate uses lesson index in course (`canAccessLesson`).

## Adding a course

1. Add slug to `COURSE_SLUGS` + `COURSE_META` + `COURSE_GROUP`.
2. Seed content in `packages/content`.
3. Run EN completeness gate / `content.test.ts`.
4. Document free tier impact if different from default.
