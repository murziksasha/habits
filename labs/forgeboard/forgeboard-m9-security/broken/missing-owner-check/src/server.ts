import http from "node:http";
import { escapeHtml } from "./security.js";

export interface SecureTask {
  id: number;
  ownerId: number;
  title: string;
}

export function createSecurityServer(tasks: SecureTask[]) {
  return http.createServer((req, res) => {
    const url = new URL(req.url ?? "/", "http://127.0.0.1");
    const match = (req.headers.cookie ?? "").match(/uid=(\d+)/);
    const callerId = match ? Number(match[1]) : null;
    if (url.pathname.startsWith("/tasks/") && (req.method === "GET" || req.method === "DELETE")) {
      if (!callerId) {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "unauthorized" }));
        return;
      }
      const task = tasks.find((t) => t.id === Number(url.pathname.split("/")[2]));
      if (!task) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "not_found" }));
        return;
      }
      // BUG: Missing task.ownerId !== callerId check (IDOR) & Origin check
      res.writeHead(200, {
        "content-type": "application/json",
        "x-content-type-options": "nosniff",
        "x-frame-options": "DENY",
      });
      res.end(JSON.stringify({ id: task.id, titleHtml: escapeHtml(task.title) }));
      return;
    }
    res.writeHead(404).end();
  });
}
