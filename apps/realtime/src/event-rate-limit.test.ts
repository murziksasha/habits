import { describe, expect, it } from "vitest";
import {
  _resetSocketEventLimits,
  allowSocketEvent,
  forgetSocket,
  socketEventBucketCount,
  sweepSocketEventLimits,
} from "./event-rate-limit.js";

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

describe("socket event limiter bounds", () => {
  it("forgets a socket's buckets on disconnect", () => {
    _resetSocketEventLimits();
    allowSocketEvent("s1", "move");
    allowSocketEvent("s1", "seek");
    allowSocketEvent("s2", "move");
    forgetSocket("s1");
    expect(socketEventBucketCount()).toBe(1);
  });
  it("caps keys and sweeps expired ones", () => {
    _resetSocketEventLimits();
    for (let i = 0; i < 300; i++) allowSocketEvent(`s${i}`, "move", { windowMs: 1_000, maxKeys: 100 });
    expect(socketEventBucketCount()).toBe(100);
    sweepSocketEventLimits(Date.now() + 5_000);
    expect(socketEventBucketCount()).toBe(0);
  });
});
