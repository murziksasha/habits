/**
 * Structural checks that run before SPICE.
 * They compare the submitted document with the exercise constraints.
 */

import {
  adaptCircuitDocument,
  resolveElectricalNets,
  type CircuitConstraints,
  type CircuitCriterion,
  type CircuitDocument,
  type CircuitLabExercise,
} from "@eduforge/shared";

export type StructureResult = {
  ok: boolean;
  errors: string[];
  criteria: { id?: string; type: string; passed: boolean; error?: string; labelUk?: string; labelEn?: string }[];
};

function constraintsOf(exercise: CircuitLabExercise): CircuitConstraints | undefined {
  return exercise.constraints ?? exercise.allowedModifications;
}

function starterDocument(exercise: CircuitLabExercise): CircuitDocument | null {
  const raw = exercise.circuit;
  const adapted = adaptCircuitDocument(raw);
  return adapted.ok && adapted.document ? adapted.document : null;
}

export function checkStructure(submitted: CircuitDocument, exercise: CircuitLabExercise): StructureResult {
  const errors: string[] = [];
  const criteria: StructureResult["criteria"] = [];
  const limits = constraintsOf(exercise);
  const starter = starterDocument(exercise);
  const starterIds = new Set((starter?.components ?? []).map((c) => c.id));

  if (limits) {
    if (limits.allowedComponentTypes) {
      const allowed = new Set(limits.allowedComponentTypes.map((t) => t.toLowerCase()));
      for (const comp of submitted.components) {
        if (!allowed.has(comp.type.toLowerCase())) {
          errors.push(`forbidden_component_type:${comp.type}`);
        }
      }
    }
    if (limits.canAddComponents === false) {
      for (const comp of submitted.components) {
        if (!starterIds.has(comp.id)) errors.push(`added_component:${comp.id}`);
      }
    }
    if (limits.canRemoveComponents === false && starter) {
      const present = new Set(submitted.components.map((c) => c.id));
      for (const id of starterIds) {
        if (!present.has(id)) errors.push(`removed_component:${id}`);
      }
    }
    if (limits.canChangeValues === false && starter) {
      const editable = new Set(limits.editableComponentIds ?? []);
      const starterValues = new Map(starter.components.map((c) => [c.id, c.value]));
      for (const comp of submitted.components) {
        if (editable.has(comp.id)) continue;
        if (starterValues.has(comp.id) && starterValues.get(comp.id) !== comp.value) {
          errors.push(`changed_value:${comp.id}`);
        }
      }
    }
    if (limits.maxComponents && submitted.components.length > limits.maxComponents) {
      errors.push(`component_limit:${submitted.components.length}`);
    }
  }

  const resolved = resolveElectricalNets(submitted);
  errors.push(...resolved.errors);

  for (const criterion of exercise.criteria) {
    if (criterion.type === "required_connection") {
      const from = criterion.fromComponent && criterion.fromPin
        ? resolved.pinNet.get(`${criterion.fromComponent}.${criterion.fromPin}`)
        : undefined;
      const to = criterion.toComponent && criterion.toPin
        ? resolved.pinNet.get(`${criterion.toComponent}.${criterion.toPin}`)
        : undefined;
      const passed = !!from && from === to;
      if (!passed) errors.push(`missing_connection:${criterion.fromComponent ?? "?"}`);
      criteria.push({
        id: criterion.id,
        type: criterion.type,
        passed,
        error: passed ? undefined : "required_connection_missing",
        labelUk: criterion.labelUk,
        labelEn: criterion.labelEn,
      });
    } else if (criterion.type === "forbidden_element") {
      const banned = (criterion.componentType ?? "").toLowerCase();
      const found = submitted.components.some((c) => c.type.toLowerCase() === banned);
      criteria.push({
        id: criterion.id,
        type: criterion.type,
        passed: !found,
        error: found ? "forbidden_element_present" : undefined,
        labelUk: criterion.labelUk,
        labelEn: criterion.labelEn,
      });
      if (found) errors.push(`forbidden_element:${banned}`);
    } else if (criterion.type === "component_count") {
      const type = criterion.componentType?.toLowerCase();
      const actual = submitted.components.filter((c) => !type || c.type.toLowerCase() === type).length;
      const expected = criterion.count ?? criterion.target;
      const passed = expected === undefined ? false : actual === expected;
      criteria.push({
        id: criterion.id,
        type: criterion.type,
        passed,
        error: passed ? undefined : "component_count_mismatch",
        labelUk: criterion.labelUk,
        labelEn: criterion.labelEn,
      });
      if (!passed) errors.push(`component_count:${type ?? "*"}`);
    }
  }

  if (exercise.rejectOutputSubstitution) {
    const substitution = detectOutputSubstitution(submitted, starter, exercise.criteria);
    if (substitution) errors.push(substitution);
  }

  return { ok: errors.length === 0, errors, criteria };
}

/**
 * A voltage source that is not part of the starter and sits directly across a
 * graded node is an answer substitution, not a circuit.
 */
export function detectOutputSubstitution(
  submitted: CircuitDocument,
  starter: CircuitDocument | null,
  criteria: CircuitCriterion[],
): string | null {
  const starterSources = new Set(
    (starter?.components ?? [])
      .filter((c) => /voltage|source/i.test(c.type) || c.type === "dc_voltage" || c.type === "ac_voltage")
      .map((c) => c.id),
  );
  const resolved = resolveElectricalNets(submitted);
  const gradedNodes = new Set(
    criteria
      .filter((c) => c.type === "node_voltage" || c.type === "gain" || c.type === "ripple")
      .map((c) => c.node)
      .filter((n): n is string => !!n),
  );
  if (gradedNodes.size === 0) return null;
  for (const comp of submitted.components) {
    if (!/voltage/.test(comp.type)) continue;
    if (starterSources.has(comp.id)) continue;
    const plus = resolved.pinNet.get(`${comp.id}.1`);
    const minus = resolved.pinNet.get(`${comp.id}.2`);
    const acrossOutput = (plus && gradedNodes.has(plus) && (minus === "0" || (minus && gradedNodes.has(minus))))
      || (minus && gradedNodes.has(minus) && plus === "0");
    if (acrossOutput) return `output_substitution:${comp.id}`;
  }
  return null;
}

export function applyScenarioOverrides(doc: CircuitDocument, overrides?: Record<string, string>, faults?: string[]): CircuitDocument {
  const faultSet = new Set(faults ?? []);
  return {
    ...doc,
    components: doc.components
      .filter((c) => !faultSet.has(c.id))
      .map((c) => (overrides && overrides[c.id] !== undefined ? { ...c, value: overrides[c.id]! } : c)),
    wires: doc.wires.filter((w) => {
      const ids = [endpointId(w.from), endpointId(w.to)];
      return ids.every((id) => !id || !faultSet.has(id));
    }),
  };
}

function endpointId(ep: CircuitDocument["wires"][number]["from"]): string | null {
  if ("componentId" in ep && ep.componentId) return ep.componentId;
  if ("id" in ep && ep.id && !("x" in ep)) return ep.id;
  return null;
}
