import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import type { AddressInfo } from "node:net";
import {
  escapeHtml,
  formatSessionCookie,
  isTrustedMutationOrigin,
  sanitizeExternalHref,
} from "../src/security.js";
import { createSecurityServer } from "../src/server.js";

let baseUrl = "";
let server: ReturnType<typeof createSecurityServer>;

before(async () => {
  server = createSecurityServer([
    { id: 1, ownerId: 100, title: '<script>alert(1)</script>Audit API' },
    { id: 2, ownerId: 200, title: "Bob Private Secret" },
  ]);
  await new Promise<void>((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const addr = server.address() as AddressInfo;
      baseUrl = `http://127.0.0.1:${addr.port}`;
      resolve();
    });
  });
});

after(async () => {
  await new Promise<void>((resolve) => server.close(() => resolve()));
});

test("escapes XSS output and blocks dangerous URL schemes", () => {
  const escaped = escapeHtml('<img src=x onerror="alert(1)">');
  assert.doesNotMatch(escaped, /<img/);
  assert.match(escaped, /&lt;img/);
  assert.equal(sanitizeExternalHref("javascript:alert(document.cookie)"), null);
  assert.equal(sanitizeExternalHref("data:text/html,<script>1</script>"), null);
  assert.equal(sanitizeExternalHref("https://forgeboard.local/docs"), "https://forgeboard.local/docs");
});

test("cookie flags and CSRF Origin check fail closed", () => {
  const cookie = formatSessionCookie("opaque-secret");
  assert.match(cookie, /HttpOnly/i);
  assert.match(cookie, /SameSite=Lax/i);
  assert.equal(isTrustedMutationOrigin(undefined, "http://localhost:3000"), false);
  assert.equal(isTrustedMutationOrigin("https://evil.example", "http://localhost:3000"), false);
  assert.equal(isTrustedMutationOrigin("http://localhost:3000", "http://localhost:3000"), true);
});

test("HTTP server prevents IDOR and sets hardening headers", async () => {
  const crossUser = await fetch(`${baseUrl}/tasks/1`, {
    headers: { cookie: "uid=200" },
  });
  assert.equal(crossUser.status, 403, "User 200 must get 403 reading User 100 task");

  const ownerRes = await fetch(`${baseUrl}/tasks/1`, {
    headers: { cookie: "uid=100" },
  });
  assert.equal(ownerRes.status, 200);
  assert.equal(ownerRes.headers.get("x-content-type-options"), "nosniff");
  assert.equal(ownerRes.headers.get("x-frame-options"), "DENY");
  const payload = (await ownerRes.json()) as { titleHtml: string };
  assert.doesNotMatch(payload.titleHtml, /<script>/i);

  const csrfBlocked = await fetch(`${baseUrl}/tasks/1`, {
    method: "DELETE",
    headers: { cookie: "uid=100", origin: "https://evil.example" },
  });
  assert.equal(csrfBlocked.status, 403, "Cross-origin DELETE must be blocked cleanly");
});
