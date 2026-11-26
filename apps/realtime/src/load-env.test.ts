import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

describe("realtime env loading", () => {
  it("index.ts imports ./load-env.js before anything else", () => {
    const src = readFileSync(new URL("./index.ts", import.meta.url), "utf8");
    const firstImport = src.split(/\r?\n/).find((l) => l.startsWith("import "));
    expect(firstImport).toBe('import "./load-env.js";');
  });
});
