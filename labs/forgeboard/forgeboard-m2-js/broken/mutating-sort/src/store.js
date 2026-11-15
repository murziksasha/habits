export function addTask(tasks, title, priority = 1) {
  const clean = typeof title === "string" ? title.trim() : "";
  if (!clean) throw new Error("Invalid task title");
  return [...tasks, { id: `t-${tasks.length + 1}`, title: clean, priority, status: "todo" }];
}

export function toggleTask(tasks, id) {
  return tasks.map((t) =>
    t.id === id ? { ...t, status: t.status === "done" ? "todo" : "done" } : t,
  );
}

export function filterAndSortTasks(tasks, { query = "", status = "" } = {}) {
  const q = query.trim().toLowerCase();
  // BUG: mutates caller array via .sort()
  return tasks
    .filter((t) => (!status || t.status === status) && (!q || t.title.toLowerCase().includes(q)))
    .length
    ? tasks.sort((a, b) => b.priority - a.priority)
    : [];
}

export function createStorageAdapter(storage, key = "forgeboard_tasks") {
  return {
    load() {
      try {
        const raw = storage.getItem(key);
        return raw ? JSON.parse(raw) : [];
      } catch {
        return [];
      }
    },
    save(tasks) {
      storage.setItem(key, JSON.stringify(tasks));
    },
  };
}
