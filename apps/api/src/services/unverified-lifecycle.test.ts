import { describe, expect, it } from "vitest";
import {
  UNVERIFIED_DELETE_DAYS,
  UNVERIFIED_INACTIVE_DAYS,
} from "./unverified-lifecycle.js";

describe("unverified lifecycle constants", () => {
  it("uses 7d inactive and 30d delete", () => {
    expect(UNVERIFIED_INACTIVE_DAYS).toBe(7);
    expect(UNVERIFIED_DELETE_DAYS).toBe(30);
  });
});
