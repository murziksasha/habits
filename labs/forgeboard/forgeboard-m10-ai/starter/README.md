# ForgeBoard M10: Reviewing & Verifying an AI-Generated Diff

## Offline Exercise (No AI API Key Needed)
1. Compare `fixtures/ai-candidate.patch` and `src/review-target.ts` against `SPEC.md`.
2. Fix the 3 subtle bugs introduced in the plausible-looking AI code:
   - `parseLimit`: must validate integers `1..50` (not accept `NaN`, `0`, `-5`, or `3.5`) defaulting only when omitted (`undefined`), rejecting malformed non-numeric strings with `RangeError`.
   - `safeSaveTaskNote`: must NOT swallow storage write failures silently with `{ ok: true }`; must sanitize `<`/`>` and rethrow real errors.
   - `canActorEditTask`: must enforce exact owner equality (never grant edit on missing task or `task.isPublic`).
3. Ensure no unvetted runtime packages exist in `package.json`.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
```
