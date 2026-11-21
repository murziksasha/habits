# AI-Assisted Development

Slug: `ai_development`
Group: deep
Hub: `/ai-development`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: `typescript`, `git_workflows`, `software_testing`
Recommended next: `python_for_ai`, `nextjs_fullstack`, `applied_algorithms`

## What this course is

Clear specifications, safe context curation, reviewing saved AI diffs, catching hallucinated APIs, test-backed verification, ForgeBoard review lab, and controlling AI coders.

## Local ForgeBoard Labs

- **Milestone 10 (`forgeboard-m10-ai` v1.0.0)** on lesson `ai-forgeboard-review-lab` — `/labs/forgeboard-m10-ai-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9 (повністю офлайн, без зовнішнього AI API))

## Program

### `ai_task_specs` — Task Specification & Constraints (No Paid AI Required)

- `ai-ts-spec` — Turning Vague Prompts into Testable Contracts (3 exercises, including a concept card)
- `ai-ts-non-goals` — Stating Non-Goals & Preserving Contracts (2 exercises, including a concept card)
- `ai-ts-exam` — Checkpoint: Task Specifications [exam] (1 exercises)

### `ai_context_selection` — Context Selection & Privacy Boundaries

- `ai-cs-signal` — Curating High-Signal Context Over Raw File Dumps (3 exercises, including a concept card)
- `ai-cs-exam` — Checkpoint: Context Selection [exam] (1 exercises)

### `ai_small_diffs_review` — Small Diffs & Reviewing Saved AI Code

- `ai-sd-diff-inspection` — Reading Plausible-Looking Diffs Critically (3 exercises, including a concept card)
- `ai-sd-chunking` — Small Reviewable Increments (2 exercises, including a concept card)
- `ai-sd-exam` — Checkpoint: Reviewing AI Diffs [exam] (1 exercises)

### `ai_verification_debugging` — Verification Loops & Catching Hallucinated APIs

- `ai-vd-hallucinations` — Catching Invented Flags, Library Methods & Fake Claims (3 exercises, including a concept card)
- `ai-vd-exam` — Checkpoint: Evidence & Debugging [exam] (1 exercises)

### `ai_privacy_deps_capstone` — Privacy, Dependencies & ForgeBoard Review Lab

- `ai-pd-hygiene` — Supply Chain Risks & Author Accountability (3 exercises, including a concept card)
- `ai-forgeboard-review-lab` — Lab: ForgeBoard Saved AI Diff Review, Fix & Verification (M10) (3 exercises, including a concept card)
- `ai-pd-exam` — Checkpoint: Privacy & Review Accountability [exam] (2 exercises)

### `ai_coder_control` — Controlling the AI coder

- `ai-cc-packet` — The Context Packet: Goal, Files, Invariants, and How You Will Check (4 exercises, including a concept card)
- `ai-cc-diff-test` — Read the Generated Diff, Reject Drive-By Refactors, Fix With a Test (4 exercises, including a concept card)
- `ai-cc-exam` — Checkpoint: Controlling the AI coder [exam] (3 exercises)

## Depth now

- Units: 10
- Lessons: 31
- Exams: 10
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
- `ai_applied_patch_evidence` — An invoice change with exact-cent invariants, reviewable diffs, and executed test evidence (3 lessons including exam)
