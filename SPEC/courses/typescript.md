# TypeScript

Slug: `typescript`
Group: deep
Hub: `/typescript`
Freemium: first 6 non-exam lesson(s) open without Pro.
Prerequisites: `js_fundamentals`
Recommended next: `react_fundamentals`, `express_fundamentals`, `applied_algorithms`

## What this course is

Full TypeScript course: primitives to generics, narrowing, and utility types. Unit exams after each section.

## Local ForgeBoard Labs

- **Milestone 3 (`forgeboard-m3-ts` v1.0.0)** on lesson `tsc-forgeboard-models-lab` — `/labs/forgeboard-m3-ts-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9, TypeScript 5.x)

## Program

### `basics` — TS basics

- `tsc-what-is-ts` — What is TypeScript [free] (3 exercises)
- `tsc-primitives` — Primitives [free] (3 exercises)
- `tsc-annotations` — Annotations & inference [free] (3 exercises)
- `tsc-basics-exam` — Exam: basics [exam] (5 exercises)

### `objects` — Objects & arrays

- `tsc-objects` — Object types [free] (2 exercises)
- `tsc-arrays-tuples` — Arrays & tuples [free] (3 exercises)
- `tsc-enums` — Enums (intro) (2 exercises)
- `tsc-objects-exam` — Exam: objects [exam] (4 exercises)

### `interfaces` — Interface & type

- `tsc-interface-basics` — interface basics (2 exercises)
- `tsc-extends` — extends / intersection (3 exercises)
- `tsc-interfaces-exam` — Exam: interfaces [exam] (4 exercises)

### `functions` — Functions

- `tsc-fn-types` — Param & return types (2 exercises)
- `tsc-fn-optional` — Optional / default params (2 exercises)
- `tsc-functions-exam` — Exam: functions [exam] (4 exercises)

### `generics` — Generics

- `tsc-generics-fn` — Generic functions (2 exercises)
- `tsc-generics-constraints` — Constraints (2 exercises)
- `tsc-generics-exam` — Exam: generics [exam] (4 exercises)

### `narrowing` — Narrowing

- `tsc-unions` — Unions (2 exercises)
- `tsc-guards` — Type guards (3 exercises)
- `tsc-narrowing-exam` — Exam: narrowing [exam] (4 exercises)

### `utilities` — Utility types

- `tsc-partial-pick` — Partial & Pick (2 exercises)
- `tsc-omit-record` — Omit & Record (2 exercises)
- `tsc-pick-required` — Pick & Required [free] (4 exercises)
- `tsc-utilities-exam` — Exam: utilities [exam] (4 exercises)

### `modules` — Modules & tsconfig

- `tsc-import-export` — import / export (2 exercises)
- `tsc-tsconfig` — tsconfig basics (2 exercises)
- `tsc-modules-exam` — Exam: modules [exam] (4 exercises)

### `applied_error_diagnosis` — Applied: Diagnosing TypeScript Errors

- `ts-dbg-assignability` — Diagnosing: Type X is not assignable to type Y (3 exercises)
- `ts-dbg-narrowing-undefined` — Diagnosing: Object is possibly undefined & narrowing (2 exercises)
- `ts-dbg-generic-constraints` — Diagnosing: Generic constraints & keyof (2 exercises)
- `ts-app-cumulative-task` — Applied task: type-safe API client & error guards (2 exercises)
- `ts-app-exam` — Exam: TS diagnostics & typing [exam] (4 exercises)

### `strict_contracts_unions` — Strict Compiler Diagnostics, unknown & Discriminated Unions

- `tsc-unknown-runtime` — unknown vs any & runtime validation of untrusted API payloads (3 exercises)
- `tsc-discriminated-generics` — Discriminated unions, useful generics & typed API contracts (3 exercises)
- `tsc-sc-exam` — Exam: strict TS contracts [exam] (4 exercises)

### `capstone` — Capstone

- `tsc-capstone-util` — Mini: typed util (1 exercises)
- `tsc-forgeboard-models-lab` — ForgeBoard M3: Strict Modeling & Untrusted Payload Validation (2 exercises)
- `tsc-capstone-exam` — Final exam [exam] (5 exercises)

## Depth now

- Units: 19
- Lessons: 70
- Exams: 19
- Free non-exam lessons: 6
- Exercise types in seed: code_fill, code_order, code_output, code_project, code_read, mcq

## References

- TypeScript Handbook: https://www.typescriptlang.org/docs/

## Expansion (Nov 2026)

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `branded_types` — Branded types and opaque ids (4 lessons including exam)
- `satisfies_const` — satisfies, const assertions and as const (4 lessons including exam)
- `template_literal_types` — Template literal types (4 lessons including exam)
- `assertion_functions` — Predicates and asserts (4 lessons including exam)
- `module_augmentation` — Module augmentation and merging (4 lessons including exam)
- `recursive_types` — Recursive types (4 lessons including exam)
- `this_parameters` — The this parameter (4 lessons including exam)
