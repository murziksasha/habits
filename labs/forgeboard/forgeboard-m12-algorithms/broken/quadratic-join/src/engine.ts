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

// BUG: quadratic O(N * M) nested .find() scan
export function attachProjects(tasks: readonly TaskNode[], projects: readonly Project[]) {
  return tasks.map((t) => ({
    id: t.id,
    title: t.title,
    projectName: projects.find((p) => p.id === t.projectId)?.name ?? "Unknown",
  }));
}

export function buildTagIndex(tasks: readonly TaskNode[]): Map<string, Set<number>> {
  const index = new Map<string, Set<number>>();
  for (const t of tasks) {
    for (const tag of t.tags) {
      const bucket = index.get(tag) ?? new Set<number>();
      bucket.add(t.id);
      index.set(tag, bucket);
    }
  }
  return index;
}

export function orderByDependencies(tasks: readonly TaskNode[]): number[] {
  const byId = new Map(tasks.map((t) => [t.id, t]));
  const state = new Map<number, "visiting" | "done">();
  const result: number[] = [];
  function visit(id: number) {
    if (state.get(id) === "done") return;
    if (state.get(id) === "visiting") throw new Error("cyclic_dependency");
    state.set(id, "visiting");
    for (const dep of byId.get(id)?.dependsOn ?? []) visit(dep);
    state.set(id, "done");
    result.push(id);
  }
  for (const t of [...tasks].sort((a, b) => a.id - b.id)) visit(t.id);
  return result;
}
