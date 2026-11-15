import { describe, expect, it } from "vitest";
import { resolveElectricalNets } from "./circuit-document.js";
import type { CircuitDocument } from "./circuit-types.js";

function divider(withLoadWire: boolean): CircuitDocument {
  const wires: CircuitDocument["wires"] = [
    { id: "w1", from: { componentId: "V1", pin: "1" }, to: { componentId: "R1", pin: "1" } },
    { id: "w2", from: { componentId: "R1", pin: "2" }, to: { componentId: "R2", pin: "1" } },
    { id: "w3", from: { componentId: "R2", pin: "2" }, to: { componentId: "V1", pin: "2" } },
    { id: "w4", from: { componentId: "V1", pin: "2" }, to: { componentId: "GND", pin: "1" } },
  ];
  if (withLoadWire) {
    wires.push({ id: "w5", from: { componentId: "R1", pin: "2" }, to: { componentId: "RL", pin: "1" } });
    wires.push({ id: "w6", from: { componentId: "RL", pin: "2" }, to: { componentId: "GND", pin: "1" } });
  }
  return {
    version: 2,
    components: [
      { id: "V1", type: "dc_voltage", value: "5", x: 0, y: 0, rotation: 0, nodes: [] },
      { id: "R1", type: "resistor", value: "1k", x: 0, y: 0, rotation: 0, nodes: [] },
      { id: "R2", type: "resistor", value: "1k", x: 0, y: 0, rotation: 0, nodes: [] },
      { id: "RL", type: "resistor", value: "1k", x: 0, y: 0, rotation: 0, nodes: [] },
      { id: "GND", type: "ground", value: "0", x: 0, y: 0, rotation: 0, nodes: [] },
    ],
    wires,
    junctions: [],
  };
}

describe("circuit electrical nets", () => {
  it("changes the electrical graph when a wire is removed", () => {
    const connected = resolveElectricalNets(divider(true));
    const open = resolveElectricalNets(divider(false));
    expect(connected.pinNet.get("R1.2")).toBe(connected.pinNet.get("RL.1"));
    expect(open.pinNet.get("R1.2")).not.toBe(open.pinNet.get("RL.1"));
    expect(open.floatingPins).toContain("RL.1");
  });

  it("does not tie an open pin to ground", () => {
    const open = resolveElectricalNets(divider(false));
    expect(open.pinNet.get("RL.1")).not.toBe("0");
    expect(open.pinNet.get("RL.2")).not.toBe("0");
    expect(open.floatingPins).toContain("RL.2");
  });
});
