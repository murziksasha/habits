import http from "node:http";
import { escapeHtml, isTrustedMutationOrigin } from "./security.js";

export interface SecureTask {
  id: number;
  ownerId: number;
  title: string;
}

const ALLOWED_ORIGIN = "http://localhost:3000";

function securityHeaders(): Record<string, string> {
  return {
    "content-type": "application/json",
    "x-content-type-options": "nosniff",
    "x-frame-options": "DENY",
  };
}

export function createSecurityServer(tasks: SecureTask[]) {
  return http.createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");
    const sessionHeader = req.headers.cookie ?? "";
    const match = sessionHeader.match(/uid=(\d+)/);
    const callerId = match ? Number(match[1]) : null;

    if (url.pathname.startsWith("/tasks/") && (req.method === "GET" || req.method === "DELETE")) {
      if (req.method === "DELETE") {
        const origin = typeof req.headers.origin === "string" ? req.headers.origin : undefined;
        if (!isTrustedMutationOrigin(origin, ALLOWED_ORIGIN)) {
          res.writeHead(403, securityHeaders());
          res.end(JSON.stringify({ error: "csrf_origin_denied" }));
          return;
        }
      }
      if (!callerId) {
        res.writeHead(401, securityHeaders());
        res.end(JSON.stringify({ error: "unauthorized" }));
        return;
      }
      const id = Number(url.pathname.split("/")[2]);
      const idx = tasks.findIndex((t) => t.id === id);
      const task = idx >= 0 ? tasks[idx] : undefined;
      if (!task) {
        res.writeHead(404, securityHeaders());
        res.end(JSON.stringify({ error: "not_found" }));
        return;
      }
      if (task.ownerId !== callerId) {
        res.writeHead(403, securityHeaders());
        res.end(JSON.stringify({ error: "forbidden" }));
        return;
      }
      if (req.method === "DELETE") {
        tasks.splice(idx, 1);
        res.writeHead(200, securityHeaders());
        res.end(JSON.stringify({ ok: true }));
        return;
      }
      res.writeHead(200, securityHeaders());
      res.end(JSON.stringify({ id: task.id, titleHtml: escapeHtml(task.title) }));
      return;
    }

    res.writeHead(404, securityHeaders()).end(JSON.stringify({ error: "not_found" }));
  });
}
