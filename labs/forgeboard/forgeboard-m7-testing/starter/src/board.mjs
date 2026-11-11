const ALLOWED_TRANSITIONS = {
  todo: new Set(["in_progress", "done"]),
  in_progress: new Set(["todo", "done"]),
  done: new Set(["todo"]),
};

export function paginate(items, page, pageSize) {
  if (!Number.isInteger(page) || page < 1 || !Number.isInteger(pageSize) || pageSize < 1) {
    throw new RangeError("invalid_pagination");
  }
  const capped = Math.min(pageSize, 50);
  const offset = (page - 1) * capped;
  return items.slice(offset, offset + capped);
}

export function transitionStatus(currentStatus, nextStatus) {
  const allowed = ALLOWED_TRANSITIONS[currentStatus];
  if (!allowed || !allowed.has(nextStatus)) {
    const err = new Error("invalid_transition");
    err.status = 400;
    throw err;
  }
  return nextStatus;
}

export function updateTaskForUser(task, userId, patch) {
  if (!task) {
    const err = new Error("not_found");
    err.status = 404;
    throw err;
  }
  if (task.ownerId !== userId) {
    const err = new Error("forbidden");
    err.status = 403;
    throw err;
  }
  const title = typeof patch.title === "string" ? patch.title.trim() : task.title;
  if (!title) {
    const err = new Error("invalid_input");
    err.status = 400;
    throw err;
  }
  return { ...task, title };
}
