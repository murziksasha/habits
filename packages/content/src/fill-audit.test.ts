import { expect, it } from "vitest";
import * as content from "./index.js";
import type { CourseContent } from "./types.js";

it("teaches and localizes compute retries and token budgets", () => {
  const unit = content.llmopsContent.units.find((item) => item.slug === "lo_cost");
  expect(unit).toBeDefined();
  for (const slug of ["lo-co-compute", "lo-co-budget"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "lo-o3");
  const matching = exercises.find((exercise) => exercise.id === "lo-o6");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing budget exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(order.correct.at(-1)).toContain("Retry the request");
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes cloud model configuration", () => {
  const unit = content.llmopsContent.units.find((item) => item.slug === "lo_cloud");
  expect(unit).toBeDefined();
  for (const slug of ["lo-cl-consoles", "lo-cl-iam"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "lo-c5");
  const matching = exercises.find((exercise) => exercise.id === "lo-c2");
  const fill = exercises.find((exercise) => exercise.id === "lo-c6");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match" || !fill || fill.type !== "code_fill") throw new Error("Missing cloud exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(order.correct.some((line) => line.includes("actual candidate responses"))).toBe(true);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
  expect(fill.code.replace("___", fill.accepted[0]!)).toContain('cfg["region"]');
});

it("teaches and localizes queue delivery and idempotency", () => {
  const unit = content.llmopsContent.units.find((item) => item.slug === "lo_queues");
  expect(unit).toBeDefined();
  for (const slug of ["lo-qu-brokers", "lo-qu-idempotency"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "lo-q5");
  const matching = exercises.find((exercise) => exercise.id === "lo-q2");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing queue exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(order.correct.some((line) => line.includes("lease"))).toBe(true);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes durable API job handoffs", () => {
  const unit = content.llmopsContent.units.find((item) => item.slug === "lo_apis");
  expect(unit).toBeDefined();
  for (const slug of ["lo-ap-contracts", "lo-ap-events"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "lo-a5");
  const matching = exercises.find((exercise) => exercise.id === "lo-a2");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing API exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(order.correct.some((line) => line.includes("outbox"))).toBe(true);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes fixture evaluation and its limitations", () => {
  const unit = content.llmopsContent.units.find((item) => item.slug === "lo_evals");
  expect(unit).toBeDefined();
  for (const slug of ["lo-ev-fixtures", "lo-ev-metrics"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "lo-e3");
  const matching = exercises.find((exercise) => exercise.id === "lo-e4");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing evaluation exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes traces and token accounting", () => {
  const unit = content.llmopsContent.units.find((item) => item.slug === "lo_traces");
  expect(unit).toBeDefined();
  for (const slug of ["lo-tr-spans", "lo-tr-tokens"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "lo-t6");
  const matching = exercises.find((exercise) => exercise.id === "lo-t2");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing tracing exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("localizes semantic-cache and LLM SLO exercises", () => {
  const unit = content.llmopsContent.units.find((item) => item.slug === "lo_semantic_slo");
  expect(unit).toBeDefined();
  const choices = unit!.lessons.flatMap((lesson) => lesson.exercises).filter(
    (exercise) => exercise.type === "mcq" || exercise.type === "code_read",
  );
  expect(choices).toHaveLength(11);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const fallback = unit!.lessons.flatMap((lesson) => lesson.exercises).find((exercise) => exercise.id === "lo-slo-llm-r2");
  if (!fallback || fallback.type !== "code_fill") throw new Error("Missing fallback exercise");
  expect(fallback.code.replace("___", fallback.accepted[0]!)).toContain("fallback_allowed(req)");
  expect(fallback.code).toContain("raise ServiceUnavailable()");
});

it("localizes canary and shadow rollout exercises", () => {
  const unit = content.llmopsContent.units.find((item) => item.slug === "lo_canary_rollout");
  expect(unit).toBeDefined();
  const choices = unit!.lessons.flatMap((lesson) => lesson.exercises).filter(
    (exercise) => exercise.type === "mcq" || exercise.type === "code_read",
  );
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});

it("localizes prompt versioning and completes its example gate", () => {
  const unit = content.llmopsContent.units.find((item) => item.slug === "lo_prompt_versions");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const gate = exercises.find((exercise) => exercise.id === "lo-prompt-eval-gate-r2");
  if (!gate || gate.type !== "code_fill") throw new Error("Missing prompt regression gate exercise");
  expect(gate.code.replace("___", gate.accepted[0]!)).toContain("gate: prompt_regression");
});

it("teaches and localizes vector-store filtering and version activation", () => {
  const unit = content.agenticSystemsContent.units.find((item) => item.slug === "ag_vectors");
  expect(unit).toBeDefined();
  for (const slug of ["ag-vs-stores", "ag-vs-freshness"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ag-v5");
  const matching = exercises.find((exercise) => exercise.id === "ag-v1");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing vector-store exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(order.correct.some((line) => line.includes("Switch the active version"))).toBe(true);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes agent retrieval strategies", () => {
  const unit = content.agenticSystemsContent.units.find((item) => item.slug === "ag_rag");
  expect(unit).toBeDefined();
  for (const slug of ["ag-rg-chunk-hybrid", "ag-rg-graphrag"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(7);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ag-r6");
  const matching = exercises.find((exercise) => exercise.id === "ag-r4");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing retrieval exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes multi-agent transitions with exhausted retries", () => {
  const unit = content.agenticSystemsContent.units.find((item) => item.slug === "ag_multi");
  expect(unit).toBeDefined();
  for (const slug of ["ag-ma-roles", "ag-ma-pick"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  for (const id of ["ag-m2", "ag-m-e1"]) {
    const exercise = exercises.find((item) => item.id === id);
    if (!exercise || exercise.type !== "match") throw new Error(`Missing ${id}`);
    expect(exercise.pairsEn).toHaveLength(exercise.pairs.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ag-m5");
  if (!order || order.type !== "code_order") throw new Error("Missing framework ordering exercise");
  expect(order.linesUk).toHaveLength(order.lines.length);
  const transition = exercises.find((exercise) => exercise.id === "ag-m4");
  if (!transition || transition.type !== "code_read") throw new Error("Missing transition exercise");
  expect(transition.code).toContain('else "hitl_pause"');
});

it("teaches and localizes agent planning and verification", () => {
  const unit = content.agenticSystemsContent.units.find((item) => item.slug === "ag_plan_reflect");
  expect(unit).toBeDefined();
  for (const slug of ["ag-pr-split", "ag-pr-check"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ag-p2");
  const matching = exercises.find((exercise) => exercise.id === "ag-p6");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing planning exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes agent tool contracts and retry safety", () => {
  const unit = content.agenticSystemsContent.units.find((item) => item.slug === "ag_tools");
  expect(unit).toBeDefined();
  for (const slug of ["ag-tl-schema", "ag-tl-idempotent"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(5);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const matching = exercises.find((exercise) => exercise.id === "ag-t5");
  if (!matching || matching.type !== "match") throw new Error("Missing tool-design matching exercise");
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes choosing an agent architecture", () => {
  const unit = content.agenticSystemsContent.units.find((item) => item.slug === "ag_choose");
  expect(unit).toBeDefined();
  for (const slug of ["ag-ch-ladder", "ag-ch-surface"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ag-c5");
  const matching = exercises.find((exercise) => exercise.id === "ag-c2");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing architecture exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("localizes agent budget exercises and produces complete parameter names", () => {
  const unit = content.agenticSystemsContent.units.find((item) => item.slug === "ag_timeouts_budget");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  for (const [id, answer, expected] of [
    ["ag-step-cap-r2", "_steps", "max_steps=8"],
    ["ag-partial-result-r2", "intermediate_state", "intermediate_state=draft"],
  ] as const) {
    const exercise = exercises.find((item) => item.id === id);
    if (!exercise || exercise.type !== "code_fill") throw new Error(`Missing ${id}`);
    expect(exercise.accepted).toContain(answer);
    expect(exercise.code.replace("___", answer)).toContain(expected);
  }
});

it("localizes agent approval and durable waiting exercises", () => {
  const unit = content.agenticSystemsContent.units.find((item) => item.slug === "ag_hitl_gates");
  expect(unit).toBeDefined();
  const choices = unit!.lessons.flatMap((lesson) => lesson.exercises).filter(
    (exercise) => exercise.type === "mcq" || exercise.type === "code_read",
  );
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});

it("localizes agent memory exercises without fictional account plans", () => {
  const unit = content.agenticSystemsContent.units.find((item) => item.slug === "ag_memory_session");
  expect(unit).toBeDefined();
  const choices = unit!.lessons.flatMap((lesson) => lesson.exercises).filter(
    (exercise) => exercise.type === "mcq" || exercise.type === "code_read",
  );
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  expect(JSON.stringify(unit)).not.toMatch(/\bPro\b/);
});

it("teaches and localizes the support-agent design review", () => {
  const unit = content.aiProductContent.units.find((item) => item.slug === "ap_capstone");
  expect(unit).toBeDefined();
  for (const slug of ["ap-cp-review", "ap-cp-logging"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ap-c5");
  const matching = exercises.find((exercise) => exercise.id === "ap-c2");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing support-agent review exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes AI product failure modes and evaluations", () => {
  const unit = content.aiProductContent.units.find((item) => item.slug === "ap_failure");
  expect(unit).toBeDefined();
  for (const slug of ["ap-fl-modes", "ap-fl-evals"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(7);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ap-f5");
  const matching = exercises.find((exercise) => exercise.id === "ap-f2");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing failure-mode exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes human approval controls", () => {
  const unit = content.aiProductContent.units.find((item) => item.slug === "ap_hitl");
  expect(unit).toBeDefined();
  for (const slug of ["ap-hl-patterns", "ap-hl-state"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ap-h5");
  const matching = exercises.find((exercise) => exercise.id === "ap-h2");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing approval exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes AI product briefs and the limits of retrieval scores", () => {
  const unit = content.aiProductContent.units.find((item) => item.slug === "ap_brief");
  expect(unit).toBeDefined();
  for (const slug of ["ap-br-spec", "ap-br-checks"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ap-b2");
  const matching = exercises.find((exercise) => exercise.id === "ap-b3");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing brief exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes AI product routing", () => {
  const unit = content.aiProductContent.units.find((item) => item.slug === "ap_route");
  expect(unit).toBeDefined();
  for (const slug of ["ap-rt-matrix", "ap-rt-code"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ap-r5");
  const matching = exercises.find((exercise) => exercise.id === "ap-r2");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing routing exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("localizes AI product launch exercises and completes the escalation action", () => {
  const unit = content.aiProductContent.units.find((item) => item.slug === "ap_launch_checklist");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const action = exercises.find((exercise) => exercise.id === "ap-day2-watch-r2");
  if (!action || action.type !== "code_fill") throw new Error("Missing support escalation exercise");
  expect(action.accepted).toEqual(["_off"]);
  expect(action.code.replace("___", action.accepted[0]!)).toContain("request_flag_off");
});

it("localizes AI product feedback exercises", () => {
  const unit = content.aiProductContent.units.find((item) => item.slug === "ap_feedback_loop");
  expect(unit).toBeDefined();
  const choices = unit!.lessons.flatMap((lesson) => lesson.exercises).filter(
    (exercise) => exercise.type === "mcq" || exercise.type === "code_read",
  );
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});

it("localizes AI product quota and usage exercises", () => {
  const unit = content.aiProductContent.units.find((item) => item.slug === "ap_pricing_ux");
  expect(unit).toBeDefined();
  const choices = unit!.lessons.flatMap((lesson) => lesson.exercises).filter(
    (exercise) => exercise.type === "mcq" || exercise.type === "code_read",
  );
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});

it("teaches and localizes the AI coder control unit", () => {
  const unit = content.aiDevelopmentContent.units.find((item) => item.slug === "ai_coder_control");
  expect(unit).toBeDefined();
  for (const slug of ["ai-cc-packet", "ai-cc-diff-test"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ai-cc2");
  const matching = exercises.find((exercise) => exercise.id === "ai-cc3");
  if (!order || order.type !== "code_order" || !matching || matching.type !== "match") throw new Error("Missing context packet exercises");
  expect(order.linesUk).toHaveLength(order.lines.length);
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes dependency review and the ForgeBoard lab", () => {
  const unit = content.aiDevelopmentContent.units.find((item) => item.slug === "ai_privacy_deps_capstone");
  expect(unit).toBeDefined();
  for (const slug of ["ai-pd-hygiene", "ai-forgeboard-review-lab"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const choices = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => exercise.type === "mcq");
  expect(choices).toHaveLength(4);
  for (const exercise of choices) {
    if (exercise.type !== "mcq") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});

it("teaches and localizes evidence-based verification of AI changes", () => {
  const unit = content.aiDevelopmentContent.units.find((item) => item.slug === "ai_verification_debugging");
  expect(unit).toBeDefined();
  expect(unit!.lessons.find((lesson) => lesson.slug === "ai-vd-hallucinations")?.exercises[0]?.type).toBe("concept");
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  for (const id of ["ai-vd1", "ai-vd-e1"]) {
    const exercise = exercises.find((item) => item.id === id);
    if (!exercise || (exercise.type !== "mcq" && exercise.type !== "code_read")) throw new Error(`Missing ${id}`);
    expect(exercise.optionsEn, id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ai-vd2");
  if (!order || order.type !== "code_order") throw new Error("Missing verification ordering exercise");
  expect(order.linesUk).toHaveLength(order.lines.length);
});

it("teaches and localizes review of AI-generated diffs", () => {
  const unit = content.aiDevelopmentContent.units.find((item) => item.slug === "ai_small_diffs_review");
  expect(unit).toBeDefined();
  for (const slug of ["ai-sd-diff-inspection", "ai-sd-chunking"]) {
    expect(unit!.lessons.find((lesson) => lesson.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const choices = unit!.lessons.flatMap((lesson) => lesson.exercises).filter(
    (exercise) => exercise.type === "mcq" || exercise.type === "code_read",
  );
  expect(choices).toHaveLength(4);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});

it("teaches and localizes safe context selection", () => {
  const unit = content.aiDevelopmentContent.units.find((item) => item.slug === "ai_context_selection");
  expect(unit).toBeDefined();
  expect(unit!.lessons.find((lesson) => lesson.slug === "ai-cs-signal")?.exercises[0]?.type).toBe("concept");
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq");
  expect(choices).toHaveLength(2);
  for (const exercise of choices) {
    if (exercise.type !== "mcq") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const matching = exercises.find((exercise) => exercise.id === "ai-cs1");
  expect(matching?.type).toBe("match");
  if (!matching || matching.type !== "match") throw new Error("Missing context matching exercise");
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes AI task specifications and their ordering exercise", () => {
  const unit = content.aiDevelopmentContent.units.find((item) => item.slug === "ai_task_specs");
  expect(unit).toBeDefined();
  for (const slug of ["ai-ts-spec", "ai-ts-non-goals"]) {
    expect(unit!.lessons.find((item) => item.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq");
  expect(choices).toHaveLength(3);
  for (const exercise of choices) {
    if (exercise.type !== "mcq") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const order = exercises.find((exercise) => exercise.id === "ai-ts2");
  expect(order?.type).toBe("code_order");
  if (!order || order.type !== "code_order") throw new Error("Missing task specification ordering exercise");
  expect(order.linesUk).toHaveLength(order.lines.length);
});

it("localizes prompt-cache lessons and uses complete diagnostic and test commands", () => {
  const unit = content.aiDevelopmentContent.units.find((item) => item.slug === "ai_prompt_cache");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(12);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  for (const [id, expected] of [["ai-context-budget-r2", "compiler_error"], ["ai-diff-scope-r2", "vitest"]] as const) {
    const exercise = exercises.find((item) => item.id === id);
    expect(exercise?.type, id).toBe("code_fill");
    if (!exercise || exercise.type !== "code_fill") throw new Error(`Missing ${id}`);
    expect(exercise.accepted).toContain(expected);
    expect(exercise.code.replace("___", expected)).not.toContain("___");
  }
});

it("localizes the RAG evaluation unit and distinguishes recall from hit rate", () => {
  const unit = content.aiDevelopmentContent.units.find((item) => item.slug === "ai_rag_eval");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(12);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const concept = exercises.find((exercise) => exercise.id === "ai-rag-labels-c");
  expect(concept?.type).toBe("concept");
  if (!concept || concept.type !== "concept") throw new Error("Missing RAG metrics concept");
  expect(concept.bodyEn).toContain("recall 0.5 and hit 1");
});

it("localizes structured-output practice and uses a complete allowed-root answer", () => {
  const unit = content.aiDevelopmentContent.units.find((item) => item.slug === "ai_structured_output");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(12);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const check = exercises.find((exercise) => exercise.id === "ai-tool-args-r2");
  expect(check?.type).toBe("code_fill");
  if (!check || check.type !== "code_fill") throw new Error("Missing path authorization exercise");
  expect(check.accepted).toEqual(["ALLOWED_ROOT"]);
  expect(check.code.replace("___", check.accepted[0]!)).toContain("authorize_path(path, ALLOWED_ROOT)");
});

it("provides Ukrainian labels aligned with the canonical AI security ordering steps", () => {
  const ids = ["as-t5", "as-i5", "as-a5", "as-g5", "as-s6", "as-l5"];
  const exercises = content.aiSecurityContent.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.exercises));
  for (const id of ids) {
    const exercise = exercises.find((item) => item.id === id);
    expect(exercise?.type, id).toBe("code_order");
    if (!exercise || exercise.type !== "code_order") throw new Error(`Missing ordering exercise ${id}`);
    expect(exercise.linesUk, id).toHaveLength(exercise.lines.length);
    expect(exercise.linesUk!.every((line) => /[А-Яа-яІіЇїЄєҐґ]/u.test(line)), id).toBe(true);
  }
});

it("teaches and localizes the AI local-serving unit", () => {
  const unit = content.aiSecurityContent.units.find((item) => item.slug === "as_local");
  expect(unit).toBeDefined();
  for (const slug of ["as-lc-runtime", "as-lc-limits"]) {
    expect(unit!.lessons.find((item) => item.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(7);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const matching = exercises.find((exercise) => exercise.id === "as-l2");
  expect(matching?.type).toBe("match");
  if (!matching || matching.type !== "match") throw new Error("Missing local-serving matching exercise");
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes AI secret handling and data minimization", () => {
  const unit = content.aiSecurityContent.units.find((item) => item.slug === "as_secrets");
  expect(unit).toBeDefined();
  for (const slug of ["as-sc-prompt", "as-sc-hosted"]) {
    expect(unit!.lessons.find((item) => item.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const matching = exercises.find((exercise) => exercise.id === "as-s5");
  expect(matching?.type).toBe("match");
  if (!matching || matching.type !== "match") throw new Error("Missing secret handling matching exercise");
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes AI guardrails including classifier failure", () => {
  const unit = content.aiSecurityContent.units.find((item) => item.slug === "as_guardrails");
  expect(unit).toBeDefined();
  for (const slug of ["as-gr-policy", "as-gr-enforce"]) {
    expect(unit!.lessons.find((item) => item.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const matching = exercises.find((exercise) => exercise.id === "as-g3");
  expect(matching?.type).toBe("match");
  if (!matching || matching.type !== "match") throw new Error("Missing guardrails matching exercise");
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
  const failure = exercises.find((exercise) => exercise.id === "as-g4");
  expect(failure?.type).toBe("code_read");
  if (!failure || failure.type !== "code_read") throw new Error("Missing classifier failure exercise");
  expect(failure.code).toContain("except Exception:");
});

it("teaches and localizes the AI tool authorization unit", () => {
  const unit = content.aiSecurityContent.units.find((item) => item.slug === "as_tools");
  expect(unit).toBeDefined();
  for (const slug of ["as-tl-allowlist", "as-tl-hitl"]) {
    expect(unit!.lessons.find((item) => item.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const matching = exercises.find((exercise) => exercise.id === "as-a6");
  expect(matching?.type).toBe("match");
  if (!matching || matching.type !== "match") throw new Error("Missing tool authorization matching exercise");
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("teaches and localizes the AI prompt-injection unit", () => {
  const unit = content.aiSecurityContent.units.find((item) => item.slug === "as_injection");
  expect(unit).toBeDefined();
  for (const slug of ["as-in-indirect", "as-in-controls"]) {
    const lesson = unit!.lessons.find((item) => item.slug === slug);
    expect(lesson?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(6);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const matching = exercises.find((exercise) => exercise.id === "as-i4");
  expect(matching?.type).toBe("match");
  if (!matching || matching.type !== "match") throw new Error("Missing injection control matching exercise");
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("localizes choice and matching exercises in the AI tool trust-boundary unit", () => {
  const unit = content.aiSecurityContent.units.find((item) => item.slug === "as_threat");
  expect(unit).toBeDefined();
  for (const slug of ["as-th-boundary", "as-th-blast"]) {
    expect(unit!.lessons.find((item) => item.slug === slug)?.exercises[0]?.type, slug).toBe("concept");
  }
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter((exercise) => exercise.type === "mcq" || exercise.type === "code_read");
  expect(choices).toHaveLength(7);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const matching = exercises.find((exercise) => exercise.id === "as-t2");
  expect(matching?.type).toBe("match");
  if (!matching || matching.type !== "match") throw new Error("Missing tool trust-boundary matching exercise");
  expect(matching.pairsEn).toHaveLength(matching.pairs.length);
});

it("localizes AI logging and erasure choices and checks the deleted owner", () => {
  const unit = content.aiSecurityContent.units.find((item) => item.slug === "as_log_redaction");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter(
    (exercise) => exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output",
  );
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const check = exercises.find((exercise) => exercise.type === "code_fill" && exercise.code.includes("hit.owner_id != ___"));
  expect(check?.type).toBe("code_fill");
  if (!check || check.type !== "code_fill") throw new Error("Missing erasure ownership check");
  expect(check.accepted).toEqual(["user_id"]);
});

it("localizes AI safety evaluation choices and completes the overblock metric", () => {
  const unit = content.aiSecurityContent.units.find((item) => item.slug === "as_jailbreak_evals");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  const choices = exercises.filter(
    (exercise) => exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output",
  );
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const metric = exercises.find((exercise) => exercise.type === "code_fill" && exercise.code.includes("___max"));
  expect(metric?.type).toBe("code_fill");
  if (!metric || metric.type !== "code_fill") throw new Error("Missing overblock metric exercise");
  expect(metric.accepted).toEqual(["overblock_"]);
});

it("provides English choices throughout the AI data residency unit", () => {
  const unit = content.aiSecurityContent.units.find((item) => item.slug === "as_data_residency");
  expect(unit).toBeDefined();
  const choices = unit!.lessons.flatMap((lesson) => lesson.exercises).filter(
    (exercise) => exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output",
  );
  expect(choices).toHaveLength(10);
  for (const exercise of choices) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
    expect(exercise.optionsEn![exercise.correctIndex]).toBeTruthy();
  }
  const agreement = unit!.lessons.flatMap((lesson) => lesson.exercises).find(
    (exercise) => exercise.type === "code_fill" && exercise.code.includes("signed ___ before sending health excerpts"),
  );
  expect(agreement?.type).toBe("code_fill");
  if (!agreement || agreement.type !== "code_fill") throw new Error("Missing data processing agreement exercise");
  expect(agreement.accepted).toEqual(["DPA", "dpa"]);
});

it("provides exactly one visible placeholder for each code-fill answer", () => {
  const issues: string[] = [];
  for (const value of Object.values(content)) {
    if (!value || typeof value !== "object" || !("units" in value) || !Array.isArray(value.units)) continue;
    const course = value as CourseContent;
    for (const unit of course.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
      if (exercise.type !== "code_fill") continue;
      const count = (exercise.code.match(/___/g) ?? []).length;
      if (count !== 1) issues.push(`${course.slug}/${lesson.slug}/${exercise.id}: ${count}`);
    }
  }
  expect(issues).toEqual([]);
});

it("keeps QA theory text free of replacement question-mark sequences", () => {
  expect(JSON.stringify(content.qaTheoryContent)).not.toMatch(/\?{3}/);
});

it("provides English choices for assembled QA theory multiple-choice questions", () => {
  const missing: string[] = [];
  for (const unit of content.qaTheoryContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" && (!exercise.optionsEn || exercise.optionsEn.length !== exercise.options.length)) {
      missing.push(`${lesson.slug}/${exercise.id}`);
    }
  }
  expect(missing).toEqual([]);
});

it("provides English choices for assembled software testing questions", () => {
  const missing: string[] = [];
  for (const unit of content.softwareTestingContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
    if ((exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") &&
        exercise.options && (!exercise.optionsEn || exercise.optionsEn.length !== exercise.options.length)) {
      missing.push(`${lesson.slug}/${exercise.id}`);
    }
  }
  expect(missing).toEqual([]);
});

it("provides English choices for assembled Git workflow questions", () => {
  const missing: string[] = [];
  for (const unit of content.gitWorkflowsContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
    if ((exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") &&
        exercise.options && (!exercise.optionsEn || exercise.optionsEn.length !== exercise.options.length)) {
      missing.push(`${lesson.slug}/${exercise.id}`);
    }
  }
  expect(missing).toEqual([]);
});

it("provides English choices for assembled React questions", () => {
  const missing: string[] = [];
  for (const unit of content.reactFundamentalsContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
    if ((exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") &&
        exercise.options && (!exercise.optionsEn || exercise.optionsEn.length !== exercise.options.length)) {
      missing.push(`${lesson.slug}/${exercise.id}`);
    }
  }
  expect(missing).toEqual([]);
});


it("provides English choices in assembled Oracle hierarchy lessons", () => {
  const unit = content.sqlFundamentalsContent.units.find((item) => item.slug === "hierarchical_queries");
  expect(unit).toBeDefined();
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});


it("grades Oracle MV dictionary and partition boundaries correctly", () => {
  const exercises = content.sqlFundamentalsContent.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.exercises));
  const dictionary = exercises.find((exercise) => exercise.id === "sqlf-mv-stale-r2");
  const boundary = exercises.find((exercise) => exercise.id === "sqlf-part-prune-r2");
  if (!dictionary || dictionary.type !== "code_fill" || !boundary || boundary.type !== "code_fill") throw new Error("Missing SQL fill exercises");
  expect(dictionary.accepted.map((answer) => answer.toUpperCase())).toEqual(["USER_MVIEWS", "USER_MVIEWS"]);
  expect(dictionary.code).toContain("FROM ___");
  expect(boundary.accepted).toEqual(["<"]);
});

it("provides English choices in assembled Oracle materialized-view lessons", () => {
  const unit = content.sqlFundamentalsContent.units.find((item) => item.slug === "materialized_views");
  expect(unit).toBeDefined();
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});


it("provides English choices in assembled Oracle partitioning lessons", () => {
  const unit = content.sqlFundamentalsContent.units.find((item) => item.slug === "table_partitioning");
  expect(unit).toBeDefined();
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
});


it("provides English choices and a complete ASH view name in assembled SQL profiling", () => {
  const unit = content.sqlFundamentalsContent.units.find((item) => item.slug === "sql_profiling");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  for (const exercise of exercises) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
  }
  const fill = exercises.find((exercise) => exercise.id === "sqlf-ash-waits-r2");
  if (!fill || fill.type !== "code_fill") throw new Error("Missing ASH exercise");
  expect(fill.code).toContain("FROM ___");
  expect(fill.accepted).toContain("V$ACTIVE_SESSION_HISTORY");
});


it("does not expose untranslated choices in the assembled Oracle course", () => {
  const missing: string[] = [];
  for (const unit of content.sqlFundamentalsContent.units) for (const lesson of unit.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type !== "mcq" && exercise.type !== "code_read" && exercise.type !== "code_output") continue;
    if (exercise.options.some((option) => /[А-Яа-яІіЇїЄєҐґ]/.test(option)) && !exercise.optionsEn) missing.push(exercise.id);
  }
  expect(missing).toEqual([]);
});


it("localizes explanatory answer choices in the English grammar and workplace lessons", () => {
  const ids = ["en-dlg-4", "en-dlg-26", "en-eng-5", "en-eng-e2", "en-a-an-1", "en-a-an-2", "en-zero-1", "en-zero-3", "en-rd-3", "en-rr-1", "en-pp-3", "en-pt-1", "en-pm-1", "en-rnd-1", "en-mm-1", "en-my-1", "en-my-3", "en-mrv-2", "en-tb-1", "en-td-1", "en-tm-1"];
  const exercises = content.englishContent.units.flatMap((unit) => unit.lessons.flatMap((lesson) => lesson.exercises));
  for (const id of ids) {
    const exercise = exercises.find((item) => item.id === id);
    if (!exercise || exercise.type !== "mcq") throw new Error(`Missing English choice exercise ${id}`);
    expect(exercise.optionsEn, id).toHaveLength(exercise.options.length);
  }
});


it("provides English answers in the sysadmin foundations exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "foundations");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-f\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin office networking exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "soho-network");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-n\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin office care exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "soho-care");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-c\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin Windows exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "windows-client");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-w\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("localizes sysadmin shell choices and requires the specified directory name", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "shell");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-s\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  const directory = exercises.find((exercise) => exercise.id === "sa-s13");
  expect(directory?.type).toBe("code_fill");
  if (!directory || directory.type !== "code_fill") throw new Error("Missing shell directory exercise");
  expect(directory.accepted).toEqual(["Files"]);
  expect(directory.caseSensitive).toBe(true);
});


it("localizes sysadmin file exercises and searches only regular files", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "files-perms");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-p\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  const findFiles = exercises.find((exercise) => exercise.id === "sa-p08");
  expect(findFiles?.type).toBe("code_fill");
  if (!findFiles || findFiles.type !== "code_fill") throw new Error("Missing find exercise");
  expect(findFiles.code).toContain("-type f");
});


it("provides English answers in the sysadmin text, packages, and Git exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "text-packages");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-t\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin process exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "processes");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-pr\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(27);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin network command exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "net-cli");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-nc\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("provides English answers in the sysadmin users, disks, and cron exercises", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "users-disks-cron");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-ud\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(30);
  for (const exercise of exercises) {
    if (exercise.type === "mcq") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
});


it("localizes sysadmin recovery exercises and notifies before restoring", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "harden-recover");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-hr\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  const incident = exercises.find((exercise) => exercise.id === "sa-hr16");
  expect(incident?.type).toBe("code_order");
  if (!incident || incident.type !== "code_order") throw new Error("Missing incident exercise");
  expect(incident.correct.findIndex((line) => line.includes("Notify the owner"))).toBeLessThan(incident.correct.findIndex((line) => line.includes("Restore after checks")));
});


it("localizes sysadmin runbook exercises and inventories before updating", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "capstone");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-cap\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(26);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  const checklist = exercises.find((exercise) => exercise.id === "sa-cap01");
  expect(checklist?.type).toBe("code_order");
  if (!checklist || checklist.type !== "code_order") throw new Error("Missing runbook checklist");
  expect(checklist.correct[0]).toContain("Inventory systems");
  expect(checklist.correct[2]).toContain("Create a backup");
});


it("localizes troubleshooting choices and targets an isolated database server", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "local_troubleshooting");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises).filter((exercise) => /^sa-lt(?:-e)?\d+$/.test(exercise.id));
  expect(exercises).toHaveLength(14);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  const restore = exercises.find((exercise) => exercise.id === "sa-lt7");
  expect(restore?.type).toBe("code_order");
  if (!restore || restore.type !== "code_order") throw new Error("Missing restore exercise");
  for (const command of restore.correct.filter((line) => /^(createdb|pg_restore .*--dbname|psql)/.test(line))) {
    expect(command).toContain("-h 127.0.0.1 -p 55432");
  }
});


it("localizes the assembled sysadmin backup unit and distinguishes RTO from measured time", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "backups_verify");
  expect(unit).toBeDefined();
  let choices = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(12);
  const fill = unit!.lessons.flatMap((lesson) => lesson.exercises).find((exercise) => exercise.type === "code_fill" && exercise.code.includes("last drill took"));
  expect(fill?.type).toBe("code_fill");
  if (!fill || fill.type !== "code_fill") throw new Error("Missing RTO exercise");
  expect(fill.code).toContain("target ___ = 45 minutes");
});


it("localizes home observability choices and teaches valid container command patterns", () => {
  const observability = content.sysadminContent.units.find((item) => item.slug === "observability_home");
  expect(observability).toBeDefined();
  let choices = 0;
  for (const lesson of observability!.lessons.filter((item) => item.slug !== "sa-transfer-restore")) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(12);
  const containers = content.sysadminContent.units.find((item) => item.slug === "containers_home");
  expect(containers).toBeDefined();
  const exercises = containers!.lessons.flatMap((lesson) => lesson.exercises);
  const fills = exercises.filter((exercise) => exercise.type === "code_fill");
  expect(fills.some((exercise) => exercise.type === "code_fill" && exercise.code.startsWith("___ run") && exercise.accepted.includes("podman"))).toBe(true);
  expect(fills.some((exercise) => exercise.type === "code_fill" && exercise.code.includes("64 hexadecimal digits") && exercise.accepted.includes("sha256"))).toBe(true);
});


it("localizes the assembled container unit and includes Quadlet startup configuration", () => {
  const unit = content.sysadminContent.units.find((item) => item.slug === "containers_home");
  expect(unit).toBeDefined();
  let choices = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(12);
  const quadlet = unit!.lessons.find((lesson) => lesson.slug === "sa-quadlet-user");
  expect(quadlet).toBeDefined();
  expect(JSON.stringify(quadlet)).toContain("WantedBy=default.target");
});


it("provides localized choices and pairs in the DevOps Git workstation unit", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "git-workstation");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(16);
  expect(matches).toBe(2);
});


it("provides localized choices and pairs in the DevOps Linux unit", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "linux-base");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(17);
  expect(matches).toBe(1);
});


it("localizes DevOps Bash choices and includes pipe operators in pipeline exercises", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "bash");
  expect(unit).toBeDefined();
  let choices = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(16);
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  for (const id of ["do-text-3", "do-bash-exam-5"]) {
    const order = exercises.find((exercise) => exercise.id === id);
    expect(order?.type).toBe("code_order");
    if (!order || order.type !== "code_order") throw new Error(`Missing pipeline ${id}`);
    expect(order.correct.slice(1).every((line) => line.startsWith("| "))).toBe(true);
  }
});


it("localizes DevOps network choices and asks for the correct CIDR value", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "networks");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(16);
  expect(matches).toBe(2);
  const cidr = exercises.find((exercise) => exercise.id === "do-tcp-3");
  expect(cidr?.type).toBe("code_fill");
  if (!cidr || cidr.type !== "code_fill") throw new Error("Missing CIDR exercise");
  expect(cidr.promptEn).toContain("prefix length");
  expect(cidr.accepted).toEqual(["24"]);
});


it("localizes the DevOps Python unit and specifies its timeout value", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "python-ops");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  let choices = 0;
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(18);
  const timeout = exercises.find((exercise) => exercise.id === "do-py-exam-2");
  expect(timeout?.type).toBe("code_fill");
  if (!timeout || timeout.type !== "code_fill") throw new Error("Missing timeout exercise");
  expect(timeout.promptEn).toContain("5-second");
  expect(timeout.accepted).toEqual(["5"]);
});


it("localizes DevOps container exercises and includes build inputs", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "containers");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(17);
  expect(matches).toBe(1);
  const dockerfile = exercises.find((exercise) => exercise.id === "do-dockerfile-1");
  expect(dockerfile?.type).toBe("code_read");
  if (!dockerfile || dockerfile.type !== "code_read") throw new Error("Missing Dockerfile exercise");
  expect(dockerfile.code).toContain("COPY package*.json ./");
  expect(dockerfile.code).toContain("COPY . .\nRUN npm run build");
});


it("provides localized choices and pairs in the DevOps AWS unit", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "aws-survival");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(16);
  expect(matches).toBe(2);
});


it("localizes DevOps IaC choices and enables the S3 backend lock", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "iac");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  let choices = 0;
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(19);
  const backend = exercises.find((exercise) => exercise.id === "do-state-2");
  expect(backend?.type).toBe("code_read");
  if (!backend || backend.type !== "code_read") throw new Error("Missing backend exercise");
  expect(backend.code).toContain("use_lockfile = true");
  expect(backend.code).not.toContain("dynamodb_table");
});


it("localizes DevOps CI exercises and names the masking workflow command", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "ci");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  let choices = 0;
  let matches = 0;
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(16);
  expect(matches).toBe(2);
  const mask = exercises.find((exercise) => exercise.id === "do-oidc-4");
  expect(mask?.type).toBe("code_fill");
  if (!mask || mask.type !== "code_fill") throw new Error("Missing masking exercise");
  expect(mask.code).toBe("::___::VALUE");
  expect(mask.accepted).toEqual(["add-mask"]);
});


it("provides localized choices and pairs in the DevOps Kubernetes unit", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "kubernetes");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(18);
  expect(matches).toBe(1);
});


it("localizes DevOps observability exercises and uses a supported log collector", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "observability");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(17);
  expect(matches).toBe(2);
  const logStack = exercises.find((exercise) => exercise.id === "do-loki-2");
  expect(logStack?.type).toBe("match");
  if (!logStack || logStack.type !== "match") throw new Error("Missing log stack exercise");
  expect(logStack.pairs.map((pair) => pair.left)).toContain("Grafana Alloy");
});


it("provides localized choices and pairs in the DevSecOps and GitOps unit", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "devsecops-gitops");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(15);
  expect(matches).toBe(2);
});


it("provides English choices and matching labels in Kubernetes workload scenarios", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "k8s-workloads");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(22);
  expect(matches).toBe(7);
});


it("provides English choices and matching labels in Kubernetes traffic and identity scenarios", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "traffic-identity");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(22);
  expect(matches).toBe(7);
});


it("provides English choices and matching labels in DevOps GitOps delivery scenarios", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "gitops-delivery");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(22);
  expect(matches).toBe(7);
});


it("provides English choices and matching labels in DevOps database recovery scenarios", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "data-plane");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(22);
  expect(matches).toBe(7);
});


it("provides English choices and matching labels in DevOps alert and runbook scenarios", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "alerts-runbooks");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(22);
  expect(matches).toBe(7);
});


it("localizes incident scenarios, matching labels and comprehension passages", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "incident-drills");
  expect(unit).toBeDefined();
  let choices = 0;
  let matches = 0;
  let passages = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read" || exercise.type === "code_output") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "comprehension") {
      passages++;
      expect(exercise.passageEn, exercise.id).toBeTruthy();
      expect(exercise.passageEn, exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
      for (const question of exercise.questions) {
        expect(question.optionsEn, exercise.id).toHaveLength(question.options.length);
        expect(question.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
      }
    }
  }
  expect(choices).toBe(16);
  expect(matches).toBe(7);
  expect(passages).toBe(6);
});


it("localizes DevOps SRE capstone choices and describes readiness correctly", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "sre-capstone");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  let choices = 0;
  let matches = 0;
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
    if (exercise.type === "match") {
      matches++;
      expect(exercise.pairsEn, exercise.id).toHaveLength(exercise.pairs.length);
      expect(JSON.stringify(exercise.pairsEn), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(21);
  expect(matches).toBe(1);
  const rollout = exercises.find((exercise) => exercise.id === "do-forgeboard-delivery-lab-2");
  expect(rollout?.type).toBe("code_read");
  if (!rollout || rollout.type !== "code_read") throw new Error("Missing rollout exercise");
  expect(rollout.code).toContain("not Ready");
  expect(rollout.code).not.toContain("restarting on readiness");
});


it("provides English choices in the assembled FinOps unit", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "finops_cost");
  expect(unit).toBeDefined();
  let choices = 0;
  for (const lesson of unit!.lessons) for (const exercise of lesson.exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(12);
});


it("localizes supply-chain exercises and teaches the full digest pattern", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "supply_chain_builds");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  let choices = 0;
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(12);
  const digest = exercises.find((exercise) => exercise.type === "code_fill" && exercise.code.includes("64 hexadecimal digits"));
  expect(digest?.type).toBe("code_fill");
  if (!digest || digest.type !== "code_fill") throw new Error("Missing digest exercise");
  expect(digest.accepted).toEqual(["sha256"]);
});


it("localizes policy exercises and accepts only complete expected fill values", () => {
  const unit = content.devopsContent.units.find((item) => item.slug === "policy_as_code");
  expect(unit).toBeDefined();
  const exercises = unit!.lessons.flatMap((lesson) => lesson.exercises);
  let choices = 0;
  for (const exercise of exercises) {
    if (exercise.type === "mcq" || exercise.type === "code_read") {
      choices++;
      expect(exercise.optionsEn, exercise.id).toHaveLength(exercise.options.length);
      expect(exercise.optionsEn!.join(" "), exercise.id).not.toMatch(/[\u0400-\u04ff]/u);
    }
  }
  expect(choices).toBe(12);
  const fills = exercises.filter((exercise) => exercise.type === "code_fill");
  expect(fills.some((exercise) => exercise.type === "code_fill" && exercise.code.includes("___-lived") && JSON.stringify(exercise.accepted) === JSON.stringify(["short"]))).toBe(true);
  expect(fills.some((exercise) => exercise.type === "code_fill" && exercise.code.includes("want: ___") && JSON.stringify(exercise.accepted) === JSON.stringify(["deny"]))).toBe(true);
});
