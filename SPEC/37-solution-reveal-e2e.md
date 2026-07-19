# 37 — Solution reveal after skip + e2e smoke

## Solution reveal

After **3 failed soft attempts** (`canSkip`):

| Control | Action |
|---------|--------|
| Show solution | Toggles solution panel |
| Apply answer | Fills editors (mcq / code_fill / code_order) |
| Skip | Advances with current answer (server may mark wrong) |

### Solution sources (`formatExerciseSolution`)

1. `solutionUk` / `solutionEn` (explicit, optional)
2. MCQ → `options[correctIndex]` + explanation
3. `code_fill` → `accepted.join(" | ")`
4. `code_order` → `correct` lines
5. `code_project` → checklist of required substrings per file
6. Fallback → `explanationUk/En`

Helpers: `apps/web/src/lib/exercise-solution.ts`

## E2E smoke additions

`apps/web/e2e/smoke.spec.ts`:

- Programming lesson: assert **Check** button visible
- `/embed/playground` public load
- `/homework` for admin

Run (stack up): `pnpm test:e2e`  
Skip: `SKIP_E2E=1`

## Related

- SPEC 35 soft grade
- SPEC 36 skip / tutor
