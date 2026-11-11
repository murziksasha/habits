# ForgeBoard M12: Optimizing Search & Dependency Bottlenecks

## Tasks
1. `attachProjects(tasks, projects)`: Replace naive $O(N \cdot M)$ `.find()` loop with a `Map<number, Project>` pre-index ($O(N + M)$).
2. `buildTagIndex(tasks)`: Index unique task IDs per tag using `Map<string, Set<number>>`.
3. `orderByDependencies(tasks)`: Implement cycle-safe topological ordering (`Kahn` or `DFS`) that throws `Error("cyclic_dependency")` cleanly if A depends on B and B depends on A.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
```
