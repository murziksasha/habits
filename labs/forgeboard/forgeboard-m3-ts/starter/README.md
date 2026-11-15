# ForgeBoard M3: Strict TypeScript Modeling & Validation

## Tasks
1. In `src/models.ts`, define `AsyncState<T>` as a strict discriminated union and `Result<T, E>` without using `any` or impossible combinations (`{ loading: true, error: ... }`).
2. In `src/validators.ts`, implement `parseTaskPayload(raw: unknown): Result<Task, ValidationError>` and `safePickFirstTitle(items: readonly Task[]): string | null` compliant with `strict: true` and `noUncheckedIndexedAccess: true`.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
```
