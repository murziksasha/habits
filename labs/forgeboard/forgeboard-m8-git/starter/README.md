# ForgeBoard M8: Branching, Conflict Resolution & Reviewable Delivery

## Tasks
1. Initialize the conflicted Git scenario: `pnpm lab:init` (creates `./workspace` with a real Git merge conflict in `workspace/src/board.js`).
2. Inspect both conflicting changes in `workspace/src/board.js` (status filter AND priority sort), resolve the conflict preserving BOTH features with zero conflict markers, and commit the merge inside `./workspace`.
3. Update `workspace/PR.md` summarizing scope and test verification.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm lab:init
pnpm test
```
