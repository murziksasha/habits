import { describe, expect, it } from "vitest";
import { paginatedMeta, parsePagination } from "./pagination.js";

describe("parsePagination", () => {
  it("defaults and clamps", () => {
    expect(parsePagination({})).toEqual({ limit: 50, offset: 0 });
    expect(parsePagination({ limit: "10", offset: "5" })).toEqual({
      limit: 10,
      offset: 5,
    });
    expect(parsePagination({ limit: "9999" }, { max: 100 })).toEqual({
      limit: 100,
      offset: 0,
    });
    expect(parsePagination({ limit: "-3", offset: "-1" })).toEqual({
      limit: 1,
      offset: 0,
    });
  });
});

describe("paginatedMeta", () => {
  it("exposes nextOffset when more rows remain", () => {
    expect(paginatedMeta(120, { limit: 50, offset: 0 }).nextOffset).toBe(50);
    expect(paginatedMeta(40, { limit: 50, offset: 0 }).nextOffset).toBeNull();
  });
});
