# ForgeBoard M9: Trust Boundaries, XSS, CSRF & IDOR Hardening

## Tasks
Harden `src/security.ts` and `src/server.ts`:
1. Block cross-user IDOR (`403 forbidden`) on `GET/DELETE /tasks/:id`.
2. Sanitize untrusted HTML (`escapeHtml`) and allowlist safe links (`http:`/`https:` only; reject `javascript:` URIs).
3. Enforce strict Origin checks on cookie-authenticated mutations (`POST`/`DELETE`), emit `HttpOnly; SameSite=Lax` cookies, and add `X-Content-Type-Options: nosniff` + `X-Frame-Options: DENY`.

## Run
```powershell
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
```
