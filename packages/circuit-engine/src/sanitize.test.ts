import { describe, expect, it } from "vitest";
import { sanitizeNetlist } from "./sanitize.js";

describe("netlist grammar", () => {
  it("rejects control blocks, shell, includes, and interpreter loops", () => {
    for (const line of [".control", ".include /etc/passwd", ".shell rm", "while 1", ".lib models.lib"]) {
      const result = sanitizeNetlist(`* bad\n${line}\n.end\n`);
      expect(result.valid, line).toBe(false);
    }
  });

  it("accepts a passive divider with a model card", () => {
    const result = sanitizeNetlist(`* ok\nV1 in 0 5\nR1 in out 1k\nR2 out 0 1k\n.model DMOD D\n.op\n.end\n`);
    expect(result.valid).toBe(true);
  });
});
