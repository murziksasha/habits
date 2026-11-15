# Secure Web Applications

Slug: `web_security`
Group: deep
Hub: `/web-security`
Freemium: first 5 non-exam lesson(s) open without Pro.
Prerequisites: `express_fundamentals`, `postgresql_apps`
Recommended next: `ai_development`, `nextjs_fullstack`, `devops`

## What this course is

OWASP Top 10:2025 in practice: trust boundaries, validation and XSS/SQLi defenses, hashed sessions and MFA, IDOR/authz, CSRF/CORS/CSP, and ForgeBoard security.

## Local ForgeBoard Labs

- **Milestone 9 (`forgeboard-m9-security` v1.0.0)** on lesson `ws-forgeboard-security-lab` — `/labs/forgeboard-m9-security-v1.0.0.zip` (`assessmentMode: "local_practice"`, runtime: Node >= 20, pnpm >= 9)

## Program

### `ws_trust_boundaries` — Trust Boundaries & Fail-Closed Defaults

- `ws-tb-boundaries` — Client UI vs Server Authority Trust Boundaries [free] (2 exercises)
- `ws-tb-threat-flow` — Least Privilege & Attack Surface Mapping [free] (1 exercises)
- `ws-tb-exam` — Checkpoint: Trust Boundaries [exam] (2 exercises)

### `ws_validation_output` — Server Validation, XSS & Injection Prevention

- `ws-vo-xss-sql` — Preventing XSS & SQL Injection [free] (2 exercises)
- `ws-vo-zod-strict` — Strict Payload Validation & Mass Assignment Prevention [free] (2 exercises)
- `ws-vo-exam` — Checkpoint: Validation & Injection [exam] (2 exercises)

### `ws_sessions_authn` — Sessions, Password Hashing & MFA

- `ws-sa-tokens-cookies` — Hashed Session Tokens & Cookie Flags [free] (2 exercises)
- `ws-sa-passwords-mfa` — Slow Password Hashing, Session Rotation & MFA (1 exercises)
- `ws-sa-exam` — Checkpoint: Sessions & Authentication [exam] (2 exercises)

### `ws_authorization_idor` — Authorization, IDOR & Step-Up Checks

- `ws-az-idor` — Diagnosing & Fixing Insecure Direct Object Reference (IDOR) (2 exercises)
- `ws-az-stepup` — Step-Up Re-Authentication & Admin RBAC (1 exercises)
- `ws-az-exam` — Checkpoint: Authorization & IDOR [exam] (2 exercises)

### `ws_browser_security` — Browser Security: CSRF, CORS, CSP & Headers

- `ws-bs-csrf-cors` — CSRF Origin Verification & CORS Misconceptions (2 exercises)
- `ws-bs-csp-headers` — Content-Security-Policy & Hardening Headers (1 exercises)
- `ws-bs-exam` — Checkpoint: Browser Security [exam] (2 exercises)

### `ws_deps_config_capstone` — Secrets, Supply Chain, Logging & ForgeBoard Security

- `ws-dc-secrets-logs` — Secrets Hygiene, Dependencies & Safe Error Logging (2 exercises)
- `ws-forgeboard-security-lab` — Lab: Hardening & Security Audit of ForgeBoard (M9) (2 exercises)
- `ws-dc-exam` — Checkpoint: Supply Chain & Security Ops [exam] (2 exercises)

## Depth now

- Units: 9
- Lessons: 30
- Exams: 9
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_project, code_read, match, mcq

## References

- OWASP Top 10:2025: https://top10.owasp.org/2025/en/

## Expansion (Nov 2026)

Additional bilingual (uk+en) lessons shipped in `packages/content/src/expansion/`.

New units:

- `ws_ssrf_redirect` — SSRF, open redirects, and CSRF in the 2020s (4 lessons including exam)
- `ws_csp_passkeys` — CSP, Trusted Types, and passkeys (4 lessons including exam)
- `ws_oauth_supply` — OAuth PKCE and the npm supply chain (4 lessons including exam)
