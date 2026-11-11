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

// TODO: Fix O(N * M) nested .find() bottleneck with Map<number, Project>
export function attachProjects(tasks: readonly TaskNode[], projects: readonly Project[]) {
  return tasks.map((t) => ({
    id: t.id,
    title: t.title,
    projectName: projects.find((p) => p.id === t.projectId)?.name ?? "Unknown",
  }));
}

export function buildTagIndex(tasks: readonly TaskNode[]): Map<string, Set<number>> {
  // TODO: Return deduplicated index per tag without prototype collisions
  void tasks;
  return new Map();
}

export function orderByDependencies(tasks: readonly TaskNode[]): number[] {
  // TODO: Topological sort with deterministic cycle detection ("cyclic_dependency")
  return tasks.map((t) => t.id);
}
