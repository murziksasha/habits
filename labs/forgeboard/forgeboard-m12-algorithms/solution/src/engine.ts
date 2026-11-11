export interface Project {
  id: number;
  name: string;
}

export interface TaskNode {
  id: number;
  projectId: number;
  title: string;
  tags: readonly string[];
  dependsOn: readonly number[];
}

export function attachProjects(tasks: readonly TaskNode[], projects: readonly Project[]) {
  const byId = new Map<number, string>();
  for (const p of projects) {
    byId.set(p.id, p.name);
  }
  return tasks.map((t) => ({
    id: t.id,
    title: t.title,
    projectName: byId.get(t.projectId) ?? "Unknown",
  }));
}

export function buildTagIndex(tasks: readonly TaskNode[]): Map<string, Set<number>> {
  const index = new Map<string, Set<number>>();
  for (const t of tasks) {
    for (const tag of t.tags) {
      let bucket = index.get(tag);
      if (!bucket) {
        bucket = new Set();
        index.set(tag, bucket);
      }
      bucket.add(t.id);
    }
  }
  return index;
}

export function orderByDependencies(tasks: readonly TaskNode[]): number[] {
  const byId = new Map<number, TaskNode>();
  for (const t of tasks) byId.set(t.id, t);

  const state = new Map<number, "visiting" | "done">();
  const result: number[] = [];

  function visit(id: number) {
    const s = state.get(id);
    if (s === "done") return;
    if (s === "visiting") {
      throw new Error("cyclic_dependency");
    }
    state.set(id, "visiting");
    const node = byId.get(id);
    if (node) {
      for (const depId of node.dependsOn) {
        if (byId.has(depId)) visit(depId);
      }
    }
    state.set(id, "done");
    result.push(id);
  }

  for (const t of [...tasks].sort((a, b) => a.id - b.id)) {
    visit(t.id);
  }
  return result;
}
