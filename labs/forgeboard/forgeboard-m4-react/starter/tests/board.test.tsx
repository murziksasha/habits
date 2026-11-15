import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";
import { renderToStaticMarkup } from "react-dom/server";
import {
  deriveVisibleTasks,
  ForgeBoardApp,
  readFiltersFromSearch,
  writeFiltersToSearch,
} from "../src/App.js";
import { TaskBoard } from "../src/TaskBoard.js";
import { TaskForm } from "../src/TaskForm.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("syncs filters with URL query strings cleanly", () => {
  assert.deepEqual(readFiltersFromSearch("?q=auth&status=done"), {
    query: "auth",
    status: "done",
  });
  assert.deepEqual(readFiltersFromSearch("?status=bogus"), {
    query: "",
    status: "",
  });
  assert.equal(writeFiltersToSearch({ query: "api", status: "todo" }), "?q=api&status=todo");
  assert.equal(writeFiltersToSearch({ query: "", status: "" }), "");
});

test("derives filtered tasks cleanly during render", () => {
  const items = [
    { id: 1, title: "Fix CORS", status: "todo" as const },
    { id: 2, title: "Write tests", status: "done" as const },
  ];
  assert.equal(deriveVisibleTasks(items, { query: "cors", status: "todo" }).length, 1);
  assert.deepEqual(
    deriveVisibleTasks(items, { query: "", status: "done" }).map((t) => t.id),
    [2],
  );
});

test("renders loading, error with Retry, and empty states distinctly", () => {
  const loadingHtml = renderToStaticMarkup(<TaskBoard status="loading" tasks={[]} />);
  assert.match(loadingHtml, /role="status"/);
  assert.doesNotMatch(loadingHtml, /No tasks match/);

  const errorHtml = renderToStaticMarkup(
    <TaskBoard status="error" tasks={[]} errorText="Network failed" onRetry={() => {}} />,
  );
  assert.match(errorHtml, /role="alert"/);
  assert.match(errorHtml, /Retry/);
  assert.doesNotMatch(errorHtml, /No tasks match/);

  const emptyHtml = renderToStaticMarkup(<TaskBoard status="ready" tasks={[]} />);
  assert.match(emptyHtml, /no tasks/i);
});

test("renders accessible TaskForm with label/aria-describedby/aria-invalid and keyed reset", () => {
  const html = renderToStaticMarkup(
    <TaskForm initialTitle="" errorMessage="Title is required" />,
  );
  assert.match(html, /<label for="task-title"/);
  assert.match(html, /aria-invalid="true"/);
  assert.match(html, /aria-describedby="title-error"/);
  assert.match(html, /id="title-error"/);
  assert.match(html, /role="alert"/);

  const appSrc = fs.readFileSync(path.join(root, "src/App.tsx"), "utf8");
  assert.match(appSrc, /<TaskForm\b[^>]*\bkey=/);
  const rendered = renderToStaticMarkup(
    <ForgeBoardApp
      tasks={[{ id: 9, title: "Visible", status: "todo" }]}
      filters={{ query: "", status: "" }}
      loadState="ready"
      editingTask={null}
    />,
  );
  assert.match(rendered, /Visible/);
});
