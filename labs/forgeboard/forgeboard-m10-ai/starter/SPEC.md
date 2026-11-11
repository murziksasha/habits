# ForgeBoard AI Diff Review Specification

1. `parseLimit(raw: unknown): number`
   - Returns `20` when `raw === undefined` or `raw === ""`.
   - Clamps valid positive integers > 50 down to `50`.
   - Throws `RangeError("invalid_limit")` when non-integer, `< 1`, or `NaN`.
2. `safeSaveTaskNote(store, taskId, note)`
   - Trims `note`, escapes `<` and `>`, throws `RangeError("empty_note")` if empty after trim.
   - Calls `store.write(taskId, clean)` WITHOUT swallowing I/O errors inside an empty `catch`!
3. `canActorEditTask(task, actorId)`
   - Returns `false` if `!task` or `actorId <= 0`; returns `true` ONLY when `task.ownerId === actorId`.
