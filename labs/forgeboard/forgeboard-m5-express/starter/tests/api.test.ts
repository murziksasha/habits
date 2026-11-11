import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import type { AddressInfo } from "node:net";
import { createForgeBoardApp } from "../src/app.js";

let baseUrl = "";
let server: ReturnType<ReturnType<typeof createForgeBoardApp>["listen"]>;

before(async () => {
  const app = createForgeBoardApp([
    { id: 1, ownerId: 10, title: "Alice Alpha", status: "todo" },
    { id: 2, ownerId: 10, title: "Alice Beta", status: "done" },
    { id: 3, ownerId: 10, title: "Alice Gamma", status: "todo" },
    { id: 4, ownerId: 20, title: "Bob Private", status: "todo" },
  ]);
  await new Promise<void>((resolve) => {
    server = app.listen(0, "127.0.0.1", () => {
      const addr = server.address() as AddressInfo;
      baseUrl = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

test("rejects unauthenticated callers with 401", async () => {
  const res = await fetch(`${baseUrl}/tasks`);
  assert.equal(res.status, 401);
  assert.deepEqual(await res.json(), { error: "unauthorized" });
});

test("validates POST /tasks and supports paginated GET", async () => {
  const bad = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-user-id": "10" },
    body: JSON.stringify({ title: "" }),
  });
  assert.equal(bad.status, 400);
  const badJson = (await bad.json()) as { error: string };
  assert.equal(badJson.error, "invalid_input");

  const created = await fetch(`${baseUrl}/tasks`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-user-id": "10" },
    body: JSON.stringify({ title: "Alice Delta" }),
  });
  assert.equal(created.status, 201);

  const page = await fetch(`${baseUrl}/tasks?limit=2&offset=1&status=todo`, {
    headers: { "x-user-id": "10" },
  });
  assert.equal(page.status, 200);
  const data = (await page.json()) as { items: { ownerId: number }[]; total: number; limit: number };
  assert.equal(data.items.length, 2);
  assert.equal(data.limit, 2);
  assert.ok(data.items.every((t) => t.ownerId === 10), "Must scope listing to caller");
});

test("enforces ownership 403 vs missing 404 and hides internal errors", async () => {
  const forbidden = await fetch(`${baseUrl}/tasks/1`, {
    method: "PATCH",
    headers: { "content-type": "application/json", "x-user-id": "20" },
    body: JSON.stringify({ title: "Hijacked" }),
  });
  assert.equal(forbidden.status, 403);
  assert.deepEqual(await forbidden.json(), { error: "forbidden" });

  const notFound = await fetch(`${baseUrl}/tasks/99999`, {
    method: "PATCH",
    headers: { "content-type": "application/json", "x-user-id": "10" },
    body: JSON.stringify({ title: "Missing" }),
  });
  assert.equal(notFound.status, 404);
  assert.deepEqual(await notFound.json(), { error: "not_found" });

  const boom = await fetch(`${baseUrl}/boom`, { headers: { "x-user-id": "10" } });
  assert.equal(boom.status, 500);
  const text = await boom.text();
  assert.doesNotMatch(text, /Simulated secret DB password leak/);
  assert.deepEqual(JSON.parse(text), { error: "internal_error" });
});
