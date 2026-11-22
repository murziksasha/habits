import { describe, expect, it } from "vitest";
import { gradeCodeProjectChecks } from "@eduforge/shared";
import { ALL_COURSE_CONTENTS, programmingContent } from "./index.js";

describe("TypeScript starter project", () => {
  it("requires work before passing and accepts the requested example", () => {
    const exercise = programmingContent.units.flatMap((unit) => unit.lessons).flatMap((lesson) => lesson.exercises)
      .find((item) => item.id === "pr-ts-proj-1");
    expect(exercise?.type).toBe("code_project");
    if (!exercise || exercise.type !== "code_project") throw new Error("Project missing");
    const starter = Object.fromEntries(exercise.files.map((file) => [file.id, file.starter]));
    expect(gradeCodeProjectChecks(starter, exercise.checks).ok).toBe(false);
    expect(gradeCodeProjectChecks({
      ts: "interface User { id: number; name: string }\nfunction greet(u: User): string { return `Hello, ${u.name}`; }",
      md: "The User interface describes a user; greet returns a string.",
    }, exercise.checks).ok).toBe(true);
  });
});

describe("practice project starters", () => {
  it("requires work on the Node HTTP capstone and accepts a representative solution", () => {
    const exercise = ALL_COURSE_CONTENTS.flatMap((course) => course.units)
      .flatMap((unit) => unit.lessons).flatMap((lesson) => lesson.exercises)
      .find((item) => item.id === "nf-c1");
    if (!exercise || exercise.type !== "code_project") throw new Error("Node capstone missing");
    const starter = Object.fromEntries(exercise.files.map((file) => [file.id, file.starter]));
    expect(gradeCodeProjectChecks(starter, exercise.checks).ok).toBe(false);
    expect(gradeCodeProjectChecks({
      js: "const http = require('node:http'); const port = Number(process.env.PORT ?? 3000); if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('invalid port'); http.createServer((req, res) => res.end('ok')).listen(port);",
      json: '{"scripts":{"start":"node server.js"}}',
      md: "Set the PORT env variable, run npm start, and check with curl.",
    }, exercise.checks).ok).toBe(true);
  });

  it("does not satisfy the selected project checks before the learner edits", () => {
    for (const id of ["cl-mod-5", "rf-cap1", "jsf-fb2", "rf-fb2", "st-fb2", "pg-fb2", "gw-fb2", "ws-fb2", "ai-fb2", "nx-fb2", "aa-fb2"]) {
      const exercise = ALL_COURSE_CONTENTS.flatMap((course) => course.units)
        .flatMap((unit) => unit.lessons).flatMap((lesson) => lesson.exercises)
        .find((item) => item.id === id);
      expect(exercise?.type, id).toBe("code_project");
      if (!exercise || exercise.type !== "code_project") throw new Error(`Missing project ${id}`);
      const starter = Object.fromEntries(exercise.files.map((file) => [file.id, file.starter]));
      expect(gradeCodeProjectChecks(starter, exercise.checks, exercise.caseSensitive !== false).ok, id).toBe(false);
    }
  });

  it("accepts representative completed project fragments", () => {
    const samples: Record<string, Record<string, string>> = {
      "st-fb2": { ts: 'assert.equal(handlerStatusForOtherUser, 403);' },
      "pg-fb2": { sql: "CREATE TABLE tasks (id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY, project_id BIGINT REFERENCES projects(id), title TEXT CHECK (length(title) > 0), created_at TIMESTAMPTZ); CREATE INDEX tasks_project_idx ON tasks(project_id);" },
      "gw-fb2": { js: 'if (!project || project.ownerId !== userId) return { ok: false, error: "forbidden" }; const title = rawTitle.trim(); if (!title) return { ok: false, error: "title_required" }; return { ok: true, title };' },
      "ws-fb2": { ts: `if (taskOwnerId !== sessionUserId) throw Object.assign(new Error("forbidden"), { status: 403 }); return raw.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");` },
      "ai-fb2": { ts: "const n = Number(raw); if (!Number.isInteger(n) || n < 1) return 20; return Math.min(n, 50);" },
      "nx-fb2": { tsx: "function toPublicTaskDto(row) { return { id: row.id, title: row.title, status: row.status }; }" },
      "aa-fb2": { ts: "const map = new Map(); for (const project of projects) map.set(project.id, project); return map;" },
    };
    for (const [id, files] of Object.entries(samples)) {
      const exercise = ALL_COURSE_CONTENTS.flatMap((course) => course.units)
        .flatMap((unit) => unit.lessons).flatMap((lesson) => lesson.exercises)
        .find((item) => item.id === id);
      if (!exercise || exercise.type !== "code_project") throw new Error(`Missing project ${id}`);
      expect(gradeCodeProjectChecks(files, exercise.checks, exercise.caseSensitive !== false).ok, id).toBe(true);
    }
  });
});
