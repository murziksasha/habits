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
    const sessionHeader = req.headers.cookie ?? "";
    const match = sessionHeader.match(/uid=(\d+)/);
    const callerId = match ? Number(match[1]) : null;

    if (url.pathname.startsWith("/tasks/") && req.method === "GET") {
      if (!callerId) {
        res.writeHead(401, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "unauthorized" }));
        return;
      }
      const id = Number(url.pathname.split("/")[2]);
      const task = tasks.find((t) => t.id === id);
      if (!task) {
        res.writeHead(404, { "content-type": "application/json" });
        res.end(JSON.stringify({ error: "not_found" }));
        return;
      }
      // TODO: enforce task.ownerId === callerId + security headers
      res.writeHead(200, { "content-type": "application/json" });
      res.end(JSON.stringify({ id: task.id, titleHtml: escapeHtml(task.title) }));
      return;
    }

    res.writeHead(404).end();
  });
}
