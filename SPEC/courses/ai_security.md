# AI Security

Slug: `ai_security`
Group: deep
Hub: `/ai-security`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `agentic_systems`, `web_security`
Recommended next: `ai_product`

## What this course is

Defensive agent security: tool trust boundaries, indirect prompt injection separation, allowlists and human confirmation, output policy guardrails (NeMo Guardrails, Llama Guard), keeping secrets out of prompts, and local model boundaries (Ollama, vLLM).

## Program

### `as_threat` — Threat Model and Trust Boundaries for Agent Tools

- `as-th-boundary` — Tools Can Delete Files, Send Mail, or Move Money: Draw the Trust Boundary [free] (3 exercises)
- `as-th-blast` — Fail-Closed Defaults and Scoping Tool Permissions [free] (3 exercises)
- `as-th-exam` — Checkpoint: Threat Model and Boundaries [exam] (3 exercises)

### `as_injection` — Prompt Injection Defense: Separating Data from Instructions

- `as-in-indirect` — Indirect Prompt Injection Through External Content [free] (3 exercises)
- `as-in-controls` — Defense-in-Depth When Processing Untrusted Sources [free] (3 exercises)
- `as-in-exam` — Checkpoint: Prompt Injection Controls [exam] (3 exercises)

### `as_tools` — Allowlists, Least Privilege, and Human Confirmation

- `as-tl-allowlist` — Allowlists Over Denylists and Least Privilege [free] (3 exercises)
- `as-tl-hitl` — Irreversible Actions Require Human Confirmation (3 exercises)
- `as-tl-exam` — Checkpoint: Allowlists and HITL [exam] (3 exercises)

### `as_guardrails` — Output Policy: NeMo Guardrails and Llama Guard

- `as-gr-policy` — The Role of Output Policy Rails and Safety Classifiers (3 exercises)
- `as-gr-enforce` — Fail-Closed Output Enforcement and Policy Auditing (3 exercises)
- `as-gr-exam` — Checkpoint: Output Policy Guardrails [exam] (3 exercises)

### `as_secrets` — Secrets Out of Prompts and Data Minimization

- `as-sc-prompt` — Secrets Never Belong Inside Any Prompt (3 exercises)
- `as-sc-hosted` — Data Minimization Before Outbound Hosted Model Calls (3 exercises)
- `as-sc-exam` — Checkpoint: Secrets and Data Minimization [exam] (3 exercises)

### `as_local` — Local Models: Ollama and vLLM Boundaries

- `as-lc-runtime` — When Ollama or vLLM Fits—and What It Does Not Solve (3 exercises)
- `as-lc-limits` — Securing Local Serving Endpoints and Keeping Guardrails (3 exercises)
- `as-lc-exam` — Checkpoint: Local Models and Limits [exam] (3 exercises)

## Depth now

- Units: 6
- Lessons: 18
- Exams: 6
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_read, match, mcq
