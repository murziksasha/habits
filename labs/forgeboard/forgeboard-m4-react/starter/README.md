# ForgeBoard M4: Multi-View React Client

## Tasks
1. Complete `src/App.tsx`: URL search query helpers (`readFiltersFromSearch`, `writeFiltersToSearch`), derived `deriveVisibleTasks`, and keyed `<TaskForm key={editingTask?.id ?? "new"} ... />`.
2. Complete `src/TaskBoard.tsx`: handle `loading` (`role="status"`), `error` (`role="alert"` + Retry button), empty state, and `tasks` list without letting empty state mask loading/error.
3. Complete `src/TaskForm.tsx`: controlled form with associated `<label htmlFor="task-title">`, `aria-invalid`, and `aria-describedby="title-error"`.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
```
