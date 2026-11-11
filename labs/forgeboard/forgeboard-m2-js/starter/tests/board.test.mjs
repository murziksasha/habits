import assert from "node:assert/strict";
import { test } from "node:test";
import { addTask, createStorageAdapter, filterAndSortTasks, toggleTask } from "../src/store.js";
import { createSearchController } from "../src/search.js";

test("store operations are immutable and validate titles", () => {
  const initial = [
    { id: "t1", title: "Write docs", priority: 1, status: "todo" },
    { id: "t2", title: "Ship API", priority: 3, status: "done" },
  ];
  const snapshot = structuredClone(initial);

  assert.throws(() => addTask(initial, "   "), /title/i);
  const added = addTask(initial, "Review PR", 2);
  assert.equal(initial.length, 2);
  assert.equal(added.length, 3);
  assert.deepEqual(initial, snapshot);

  const toggled = toggleTask(added, "t1");
  assert.equal(added[0].status, "todo");
  assert.equal(toggled[0].status, "done");

  const sorted = filterAndSortTasks(added, { status: "" });
  assert.deepEqual(initial, snapshot, "filterAndSortTasks must never mutate input array");
  assert.equal(sorted[0].id, "t2");
  assert.equal(filterAndSortTasks(added, { query: "review" }).length, 1);
});

test("storage adapter recovers cleanly from corrupt JSON", () => {
  const mem = new Map([["k", "{broken-json"]]);
  const storage = {
    getItem: (k) => mem.get(k) ?? null,
    setItem: (k, v) => mem.set(k, v),
  };
  const adapter = createStorageAdapter(storage, "k");
  assert.deepEqual(adapter.load(), []);
  adapter.save([{ id: "1", title: "Saved", priority: 1, status: "todo" }]);
  assert.equal(adapter.load().length, 1);
});

test("search controller cancels stale slow queries and checks !res.ok", async () => {
  let latest = [];
  let abortedCount = 0;

  const fetcher = (url, opts = {}) =>
    new Promise((resolve, reject) => {
      const q = new URL(`http://local${url}`).searchParams.get("q");
      const delay = q === "slow" ? 60 : 5;
      const timer = setTimeout(() => {
        if (opts.signal?.aborted) return;
        if (q === "fail500") {
          resolve({ ok: false, status: 500, json: async () => ({ error: "server_error" }) });
          return;
        }
        resolve({ ok: true, status: 200, json: async () => ({ items: [{ title: q }] }) });
      }, delay);

      opts.signal?.addEventListener("abort", () => {
        abortedCount += 1;
        clearTimeout(timer);
        const err = new Error("Aborted");
        err.name = "AbortError";
        reject(err);
      });
    });

  const ctrl = createSearchController(fetcher);
  const pSlow = ctrl.search("slow", (items) => {
    latest = items;
  });
  const pFast = ctrl.search("fast", (items) => {
    latest = items;
  });

  await Promise.all([pSlow, pFast]);
  await new Promise((r) => setTimeout(r, 80));

  assert.equal(abortedCount, 1, "Expected older slow search signal to abort");
  assert.deepEqual(latest, [{ title: "fast" }], "Stale response must not overwrite newer result");

  await assert.rejects(() => ctrl.search("fail500", () => {}), /500|http/i);
});
