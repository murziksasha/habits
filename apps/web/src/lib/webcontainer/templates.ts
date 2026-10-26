/**
 * FileSystemTree templates for WebContainers Node Studio.
 * Keep packages minimal for fast npm install.
 */

export type WcFileNode =
  | { file: { contents: string } }
  | { directory: Record<string, WcFileNode> };

export type WcTemplateId = "node-hello" | "express-hello" | "next-hello";

export type WcTemplateMeta = {
  id: WcTemplateId;
  titleUk: string;
  titleEn: string;
  descriptionUk: string;
  descriptionEn: string;
  /** npm script or shell command after install */
  runCommand: { cmd: string; args: string[] };
  /** Heavy templates warn the user */
  heavy?: boolean;
  /** Default open file in editor */
  defaultFile: string;
};

export const WC_TEMPLATE_META: WcTemplateMeta[] = [
  {
    id: "node-hello",
    titleUk: "Node hello",
    titleEn: "Node hello",
    descriptionUk: "Простий index.js — швидкий старт.",
    descriptionEn: "Simple index.js — fast start.",
    runCommand: { cmd: "node", args: ["index.js"] },
    defaultFile: "index.js",
  },
  {
    id: "express-hello",
    titleUk: "Express API",
    titleEn: "Express API",
    descriptionUk: "HTTP сервер + /health — preview у iframe.",
    descriptionEn: "HTTP server + /health — iframe preview.",
    runCommand: { cmd: "npm", args: ["start"] },
    defaultFile: "server.js",
  },
  {
    id: "next-hello",
    titleUk: "Next.js (heavy)",
    titleEn: "Next.js (heavy)",
    descriptionUk: "Мінімальний App Router — довгий npm install.",
    descriptionEn: "Minimal App Router — long npm install.",
    runCommand: { cmd: "npm", args: ["run", "dev"] },
    heavy: true,
    defaultFile: "app/page.tsx",
  },
];

export function getTemplateMeta(id: string): WcTemplateMeta | undefined {
  return WC_TEMPLATE_META.find((t) => t.id === id);
}

export function buildTemplateTree(id: WcTemplateId): Record<string, WcFileNode> {
  switch (id) {
    case "node-hello":
      return {
        "package.json": {
          file: {
            contents: JSON.stringify(
              {
                name: "eduforge-node-hello",
                type: "module",
                private: true,
                scripts: { start: "node index.js" },
              },
              null,
              2,
            ),
          },
        },
        "index.js": {
          file: {
            contents: `console.log("Hello from EduForge Node Studio");
console.log("Edit index.js and press Run");
const a = 2;
const b = 3;
console.log("2 + 3 =", a + b);
`,
          },
        },
        "README.md": {
          file: {
            contents: `# Node hello

1. Install (once)
2. Run → see terminal output
`,
          },
        },
      };
    case "express-hello":
      return {
        "package.json": {
          file: {
            contents: JSON.stringify(
              {
                name: "eduforge-express-hello",
                type: "module",
                private: true,
                scripts: { start: "node server.js" },
                dependencies: { express: "^4.21.2" },
              },
              null,
              2,
            ),
          },
        },
        "server.js": {
          file: {
            contents: `import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (_req, res) => {
  res.type("html").send(\`<!doctype html>
<html><body style="font-family:system-ui;padding:24px">
  <h1>EduForge Express</h1>
  <p>WebContainers live preview</p>
  <p><a href="/health">/health</a></p>
</body></html>\`);
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, studio: "webcontainers" });
});

app.listen(port, () => {
  console.log("listening on", port);
});
`,
          },
        },
        "README.md": {
          file: {
            contents: `# Express hello

1. Install
2. Run → open Preview when server-ready
`,
          },
        },
      };
    case "next-hello":
      return {
        "package.json": {
          file: {
            contents: JSON.stringify(
              {
                name: "eduforge-next-hello",
                private: true,
                scripts: {
                  dev: "next dev -p 3000",
                  build: "next build",
                  start: "next start -p 3000",
                },
                dependencies: {
                  next: "15.2.4",
                  react: "19.1.0",
                  "react-dom": "19.1.0",
                },
              },
              null,
              2,
            ),
          },
        },
        "next.config.mjs": {
          file: {
            contents: `/** @type {import('next').NextConfig} */
const nextConfig = {};
export default nextConfig;
`,
          },
        },
        "app": {
          directory: {
            "layout.tsx": {
              file: {
                contents: `export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", margin: 24 }}>{children}</body>
    </html>
  );
}
`,
              },
            },
            "page.tsx": {
              file: {
                contents: `export default function Page() {
  return (
    <main>
      <h1>EduForge Next Studio</h1>
      <p>Running inside WebContainers</p>
    </main>
  );
}
`,
              },
            },
          },
        },
        "README.md": {
          file: {
            contents: `# Next hello (heavy)

npm install may take 1–2 minutes. Prefer Express template for quick HTTP demos.
`,
          },
        },
      };
    default:
      return buildTemplateTree("node-hello");
  }
}

/** Flatten tree to path → contents for the Monaco editor. */
export function flattenTree(
  tree: Record<string, WcFileNode>,
  prefix = "",
): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [name, node] of Object.entries(tree)) {
    const path = prefix ? `${prefix}/${name}` : name;
    if ("file" in node) {
      out[path] = node.file.contents;
    } else if ("directory" in node) {
      Object.assign(out, flattenTree(node.directory, path));
    }
  }
  return out;
}

/** Rebuild a shallow tree from flat path map (files only, nested dirs). */
export function filesToTree(files: Record<string, string>): Record<string, WcFileNode> {
  const root: Record<string, WcFileNode> = {};
  for (const [path, contents] of Object.entries(files)) {
    const parts = path.split("/").filter(Boolean);
    let cursor: Record<string, WcFileNode> = root;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i]!;
      const isFile = i === parts.length - 1;
      if (isFile) {
        cursor[part] = { file: { contents } };
      } else {
        const existing = cursor[part];
        if (existing && "directory" in existing) {
          cursor = existing.directory;
        } else {
          const dir: Record<string, WcFileNode> = {};
          cursor[part] = { directory: dir };
          cursor = dir;
        }
      }
    }
  }
  return root;
}
