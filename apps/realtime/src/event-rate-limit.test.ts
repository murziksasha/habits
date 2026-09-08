import { describe, expect, it } from "vitest";
import { _resetSocketEventLimits, allowSocketEvent } from "./event-rate-limit.js";

describe("allowSocketEvent", () => {
  it("allows up to limit then rejects", () => {
    _resetSocketEventLimits();
    expect(allowSocketEvent("s1", "move", { limit: 3, windowMs: 60_000 })).toBe(true);
    expect(allowSocketEvent("s1", "move", { limit: 3, windowMs: 60_000 })).toBe(true);
    expect(allowSocketEvent("s1", "move", { limit: 3, windowMs: 60_000 })).toBe(true);
    expect(allowSocketEvent("s1", "move", { limit: 3, windowMs: 60_000 })).toBe(false);
  });

  it("isolates sockets and events", () => {
    _resetSocketEventLimits();
    allowSocketEvent("a", "move", { limit: 1, windowMs: 60_000 });
    expect(allowSocketEvent("b", "move", { limit: 1, windowMs: 60_000 })).toBe(true);
    expect(allowSocketEvent("a", "chat", { limit: 1, windowMs: 60_000 })).toBe(true);
  });
});
