# ForgeBoard M7: Full-Stack Test Suite & Bug Detection

## Goal
Strengthen `tests/suite.test.mjs` so that `pnpm test` passes on the real `src/board.mjs` implementation AND `pnpm test:mutations` kills all 3 injected bugs in `mutants/`.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm test
pnpm test:mutations
```
