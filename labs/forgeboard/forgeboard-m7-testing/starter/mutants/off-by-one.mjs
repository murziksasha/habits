export { transitionStatus, updateTaskForUser } from "../src/board.mjs";

// MUTANT 1: off-by-one 0-based page offset
export function paginate(items, page, pageSize) {
  const offset = page * pageSize;
  return items.slice(offset, offset + pageSize);
}
