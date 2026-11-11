export { paginate, transitionStatus } from "../src/board.mjs";

// MUTANT 2: drops ownership check (IDOR)
export function updateTaskForUser(task, _userId, patch) {
  if (!task) {
    const err = new Error("not_found");
    err.status = 404;
    throw err;
  }
  return { ...task, title: patch.title ?? task.title };
}
