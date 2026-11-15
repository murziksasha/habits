# AI-Assisted Development

Slug: `ai_development`
Group: deep
Hub: `/ai-development`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `typescript`, `git_workflows`, `software_testing`
Recommended next: `python_for_ai`, `nextjs_fullstack`, `applied_algorithms`

## What this course is

Clear specifications, safe context curation, reviewing saved AI diffs, catching hallucinated APIs, test-backed verification, ForgeBoard review lab, and controlling AI coders.

## Local ForgeBoard Labs

- **Milestone 10 (`forgeboard-m10-ai` v1.0.0)** on lesson `ai-forgeboard-review-lab` — `/labs/forgeboard-m10-ai-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9 (повністю офлайн, без зовнішнього AI API))

## Program

### `ai_task_specs` — Task Specification & Constraints (No Paid AI Required)

- `ai-ts-spec` — Turning Vague Prompts into Testable Contracts [free] (2 exercises)
- `ai-ts-non-goals` — Stating Non-Goals & Preserving Contracts [free] (1 exercises)
- `ai-ts-exam` — Checkpoint: Task Specifications [exam] (1 exercises)

### `ai_context_selection` — Context Selection & Privacy Boundaries

- `ai-cs-signal` — Curating High-Signal Context Over Raw File Dumps [free] (2 exercises)
- `ai-cs-exam` — Checkpoint: Context Selection [exam] (1 exercises)

### `ai_small_diffs_review` — Small Diffs & Reviewing Saved AI Code

- `ai-sd-diff-inspection` — Reading Plausible-Looking Diffs Critically [free] (2 exercises)
- `ai-sd-chunking` — Small Reviewable Increments [free] (1 exercises)
- `ai-sd-exam` — Checkpoint: Reviewing AI Diffs [exam] (1 exercises)

### `ai_verification_debugging` — Verification Loops & Catching Hallucinated APIs

- `ai-vd-hallucinations` — Catching Invented Flags, Library Methods & Fake Claims (2 exercises)
- `ai-vd-exam` — Checkpoint: Evidence & Debugging [exam] (1 exercises)

### `ai_privacy_deps_capstone` — Privacy, Dependencies & ForgeBoard Review Lab

- `ai-pd-hygiene` — Supply Chain Risks & Author Accountability (2 exercises)
- `ai-forgeboard-review-lab` — Lab: ForgeBoard Saved AI Diff Review, Fix & Verification (M10) (2 exercises)
- `ai-pd-exam` — Checkpoint: Privacy & Review Accountability [exam] (2 exercises)

### `ai_coder_control` — Controlling the AI coder

- `ai-cc-packet` — The Context Packet: Goal, Files, Invariants, and How You Will Check (3 exercises)
- `ai-cc-diff-test` — Read the Generated Diff, Reject Drive-By Refactors, Fix With a Test (3 exercises)
- `ai-cc-exam` — Checkpoint: Controlling the AI coder [exam] (3 exercises)

## Depth now

- Units: 9
- Lessons: 28
- Exams: 9
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_project, code_read, match, mcq

## References

- GitHub Guidance for Reviewing AI-Generated Code: https://github.com/github/docs/blob/main/content/copilot/tutorials/review-ai-generated-code.md

## Expansion (Nov 2026)

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `ai_structured_output` — Structured output: a schema, not free text (4 lessons including exam)
- `ai_rag_eval` — Evaluating RAG: whether you found the right thing and did not invent (4 lessons including exam)
- `ai_prompt_cache` — Prompt-prefix cache and control of a coder's context (4 lessons including exam)
