/**
 * Types and Zod schemas for Circuits, SPICE simulation analysis,
 * CircuitDocument persistence, and circuit_lab exercises.
 */

import { z } from "zod";

export const circuitComponentSchema = z.object({
  id: z.string().min(1).max(64),
  type: z.string().min(1).max(64),
  value: z.string().max(128).default(""),
  x: z.number().default(0),
  y: z.number().default(0),
  rotation: z.union([z.literal(0), z.literal(90), z.literal(180), z.literal(270)]).default(0),
  nodes: z.array(z.string()).default([]),
  properties: z.record(z.union([z.string(), z.number()])).optional(),
});

export type CircuitComponent = z.infer<typeof circuitComponentSchema>;

export const circuitWireSchema = z.object({
  id: z.string().min(1).max(64),
  from: z.union([
    z.object({ id: z.string(), pin: z.string().optional() }),
    z.object({ x: z.number(), y: z.number() }),
  ]),
  to: z.union([
    z.object({ id: z.string(), pin: z.string().optional() }),
    z.object({ x: z.number(), y: z.number() }),
  ]),
  net: z.string().optional(),
});

export type CircuitWire = z.infer<typeof circuitWireSchema>;

export const circuitDocumentSchema = z.object({
  version: z.number().int().min(1).default(1),
  title: z.string().max(256).optional(),
  description: z.string().max(2000).optional(),
  components: z.array(circuitComponentSchema).default([]),
  wires: z.array(circuitWireSchema).default([]),
  customModels: z
    .array(
      z.object({
        name: z.string(),
        content: z.string(),
      }),
    )
    .optional(),
  netlist: z.string().optional(),
  mode: z.enum(["schematic", "netlist"]).default("schematic"),
});

export type CircuitDocument = z.infer<typeof circuitDocumentSchema>;

export const circuitAnalysisSchema = z.object({
  type: z.enum(["op", "dc", "ac", "tran", "noise"]),
  dc: z
    .object({
      source: z.string(),
      start: z.number(),
      stop: z.number(),
      step: z.number(),
    })
    .optional(),
  ac: z
    .object({
      variation: z.enum(["dec", "oct", "lin"]).default("dec"),
      points: z.number().int().positive().default(10),
      fStart: z.number().positive().default(1),
      fStop: z.number().positive().default(1e6),
    })
    .optional(),
  tran: z
    .object({
      tStep: z.number().positive().default(1e-6),
      tStop: z.number().positive().default(1e-3),
      tStart: z.number().nonnegative().optional(),
      uic: z.boolean().optional(),
    })
    .optional(),
  noise: z
    .object({
      output: z.string(),
      ref: z.string().default("0"),
      variation: z.enum(["dec", "oct", "lin"]).default("dec"),
      points: z.number().int().positive().default(10),
      fStart: z.number().positive().default(1),
      fStop: z.number().positive().default(1e6),
    })
    .optional(),
  params: z.record(z.union([z.string(), z.number()])).optional(),
});

export type CircuitAnalysis = z.infer<typeof circuitAnalysisSchema>;

export const circuitCriterionSchema = z.object({
  id: z.string().optional(),
  type: z.enum([
    "node_voltage",
    "branch_current",
    "power",
    "gain",
    "frequency",
    "ripple",
    "timing",
    "required_connection",
    "forbidden_element",
    "component_count",
    "custom_metric",
  ]),
  node: z.string().optional(),
  referenceNode: z.string().optional(),
  source: z.string().optional(),
  target: z.number().optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  unit: z.string().optional(),
  absTolerance: z.number().optional(),
  relTolerance: z.number().optional(),
  labelUk: z.string().optional(),
  labelEn: z.string().optional(),
  metricName: z.string().optional(),
});

export type CircuitCriterion = z.infer<typeof circuitCriterionSchema>;

export const circuitLabExerciseSchema = z.object({
  circuit: z.union([circuitDocumentSchema, z.string()]),
  allowedModifications: z
    .object({
      canAddComponents: z.boolean().optional(),
      canRemoveComponents: z.boolean().optional(),
      canChangeValues: z.boolean().optional(),
      allowedComponentTypes: z.array(z.string()).optional(),
      editableComponentIds: z.array(z.string()).optional(),
    })
    .optional(),
  analysis: circuitAnalysisSchema,
  criteria: z.array(circuitCriterionSchema).min(1),
  starterNetlist: z.string().optional(),
  solutionNetlist: z.string().optional(),
  hintUk: z.string().optional(),
  hintEn: z.string().optional(),
  explanationUk: z.string().optional(),
  explanationEn: z.string().optional(),
});

export type CircuitLabExercise = z.infer<typeof circuitLabExerciseSchema>;
