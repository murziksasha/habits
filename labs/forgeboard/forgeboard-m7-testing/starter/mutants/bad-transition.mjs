export { paginate, updateTaskForUser } from "../src/board.mjs";

// MUTANT 3: permits invalid transition done -> broken
export function transitionStatus(_currentStatus, nextStatus) {
  return nextStatus;
}
