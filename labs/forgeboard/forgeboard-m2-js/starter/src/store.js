export function addTask(tasks, title, priority = 1) {
  // TODO: trim & validate title, return a new array without mutating tasks
  tasks.push({ id: String(tasks.length + 1), title, priority, status: "todo" });
  return tasks;
}

export function toggleTask(tasks, id) {
  // TODO: return a new array with matching task status toggled between "todo" and "done"
  return tasks;
}

export function filterAndSortTasks(tasks, { query = "", status = "" } = {}) {
  // TODO: filter immutably and sort by priority descending without mutating caller's tasks
  return tasks.sort((a, b) => b.priority - a.priority);
}

export function createStorageAdapter(storage, key = "forgeboard_tasks") {
  return {
    load() {
      // TODO: parse JSON safely and fall back to [] when storage has corrupt JSON
      return JSON.parse(storage.getItem(key) || "[]");
    },
    save(tasks) {
      storage.setItem(key, JSON.stringify(tasks));
    },
  };
}
