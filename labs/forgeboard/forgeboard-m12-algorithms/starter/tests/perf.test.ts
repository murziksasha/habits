import assert from "node:assert/strict";
import { performance } from "node:perf_hooks";
import { test } from "node:test";
import {
  attachProjects,
  buildTagIndex,
  orderByDependencies,
  type Project,
  type TaskNode,
} from "../src/engine.js";

test("attachProjects completes 20,000 tasks x 5,000 projects in linear O(N + M) work", () => {
  let projectReads = 0;
  const projects: Project[] = Array.from({ length: 5000 }, (_, i) => {
    const obj = { id: i + 1, name: `Project ${i + 1}` };
    return new Proxy(obj, {
      get(target, prop, receiver) {
        if (prop === "id") projectReads += 1;
        return Reflect.get(target, prop, receiver);
      },
    });
  });

  const tasks: TaskNode[] = Array.from({ length: 20000 }, (_, i) => ({
    id: i + 1,
    projectId: (i % 5000) + 1,
    title: `Task ${i + 1}`,
    tags: ["backend"],
    dependsOn: [],
  }));

  const t0 = performance.now();
  const joined = attachProjects(tasks, projects);
  const elapsedMs = performance.now() - t0;

  assert.equal(joined.length, 20000);
  assert.equal(joined[0]!.projectName, "Project 1");
  assert.ok(
    projectReads <= 10000,
    `Expected O(M) single pass indexing projects (got ${projectReads} reads -> quadratic scan!)`,
  );
  assert.ok(elapsedMs < 250, `Expected < 250ms linear runtime, took ${elapsedMs.toFixed(1)}ms`);
});

test("buildTagIndex avoids prototype pollution and deduplicates safely", () => {
  const tasks: TaskNode[] = [
    { id: 1, projectId: 1, title: "A", tags: ["constructor", "api", "api"], dependsOn: [] },
    { id: 2, projectId: 1, title: "B", tags: ["api"], dependsOn: [1] },
  ];
  const idx = buildTagIndex(tasks);
  assert.deepEqual([...(idx.get("constructor") ?? [])], [1]);
  assert.deepEqual([...(idx.get("api") ?? [])].sort(), [1, 2]);
});

test("orderByDependencies orders prerequisites first and detects cycles", () => {
  const ordered = orderByDependencies([
    { id: 3, projectId: 1, title: "Deploy", tags: [], dependsOn: [2] },
    { id: 2, projectId: 1, title: "Test", tags: [], dependsOn: [1] },
    { id: 1, projectId: 1, title: "Migrate", tags: [], dependsOn: [] },
  ]);
  assert.deepEqual(ordered, [1, 2, 3]);

  assert.throws(
    () =>
      orderByDependencies([
        { id: 1, projectId: 1, title: "A", tags: [], dependsOn: [2] },
        { id: 2, projectId: 1, title: "B", tags: [], dependsOn: [1] },
      ]),
    /cyclic_dependency/,
  );
});
