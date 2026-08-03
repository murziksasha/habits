/**
 * Client-side React (TSX) preview for /playground.
 * Transforms with Sucrase; loads React from esm.sh inside a sandboxed iframe.
 * Not a full Next.js / npm environment (see SPEC 75 / WebContainers roadmap).
 */

import { transform } from "sucrase";

export type ReactFiles = Record<string, string>;

export type ReactPreviewResult = {
  ok: boolean;
  htmlPreview: string;
  stdout: string;
  stderr: string;
};

const DEFAULT_APP = `export default function App() {
  return (
    <div className="app">
      <h1>Hello React</h1>
      <p>Edit App.tsx and press Run</p>
    </div>
  );
}
`;

const DEFAULT_CSS = `body {
  font-family: system-ui, sans-serif;
  margin: 16px;
  background: #f8fafc;
  color: #0f172a;
}
.app h1 { color: #0ea5e9; }
button {
  margin: 4px;
  padding: 8px 12px;
  border-radius: 8px;
  border: 2px solid #0ea5e9;
  background: #e0f2fe;
  cursor: pointer;
  font-weight: 700;
}
`;

export const DEFAULT_REACT_FILES: ReactFiles = {
  "App.tsx": DEFAULT_APP,
  "styles.css": DEFAULT_CSS,
};

/** Prepare user App.tsx → classic JSX JS without exports, ready for iframe module. */
export function transformReactAppSource(source: string): {
  ok: boolean;
  code: string;
  stderr: string;
} {
  try {
    let code = transform(source, {
      transforms: ["typescript", "jsx"],
      jsxRuntime: "classic",
      production: true,
    }).code;

    // Drop user React imports — we inject React in the shell
    code = code.replace(
      /^\s*import\s+React(?:\s*,\s*\{[^}]*\})?\s+from\s+['"]react['"]\s*;?\s*$/gm,
      "",
    );
    code = code.replace(
      /^\s*import\s+\{[^}]*\}\s+from\s+['"]react['"]\s*;?\s*$/gm,
      "",
    );
    code = code.replace(
      /^\s*import\s+.*?from\s+['"]react\/jsx-runtime['"]\s*;?\s*$/gm,
      "",
    );

    // Normalize default export → __App
    if (/export\s+default\s+function\s+/.test(code)) {
      code = code.replace(
        /export\s+default\s+function\s+([A-Za-z_$][\w$]*)/,
        "function $1",
      );
      const m = source.match(/export\s+default\s+function\s+([A-Za-z_$][\w$]*)/);
      const name = m?.[1] ?? "App";
      code += `\nconst __App = ${name};\n`;
    } else if (/export\s+default\s+/.test(code)) {
      code = code.replace(/export\s+default\s+/, "const __App = ");
    } else if (/\bfunction\s+App\b/.test(code) || /\bconst\s+App\b/.test(code)) {
      code += `\nconst __App = App;\n`;
    } else {
      return {
        ok: false,
        code: "",
        stderr:
          "Export a default component, e.g. export default function App() { ... }",
      };
    }

    // Remove other export statements (named) lightly
    code = code.replace(/export\s+\{[^}]*\}\s*;?/g, "");
    code = code.replace(/export\s+(const|let|var|function|class)\s+/g, "$1 ");

    return { ok: true, code, stderr: "" };
  } catch (e) {
    return {
      ok: false,
      code: "",
      stderr: e instanceof Error ? e.message : String(e),
    };
  }
}

export function buildReactPreviewHtml(files: ReactFiles): ReactPreviewResult {
  const appSrc =
    files["App.tsx"] ?? files["App.jsx"] ?? files["App.js"] ?? DEFAULT_APP;
  const css = files["styles.css"] ?? files["app.css"] ?? "";

  const transformed = transformReactAppSource(appSrc);
  if (!transformed.ok) {
    return {
      ok: false,
      htmlPreview: `<pre style="color:#b91c1c;padding:12px;font:14px monospace">${escapeHtml(transformed.stderr)}</pre>`,
      stdout: "",
      stderr: transformed.stderr,
    };
  }

  const userCode = transformed.code;
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>React Studio</title>
  <style>${css}</style>
  <script type="importmap">
  {
    "imports": {
      "react": "https://esm.sh/react@19.1.0",
      "react-dom": "https://esm.sh/react-dom@19.1.0",
      "react-dom/client": "https://esm.sh/react-dom@19.1.0/client"
    }
  }
  </script>
</head>
<body>
  <div id="root"></div>
  <pre id="__err" style="display:none;color:#b91c1c;padding:12px;font:12px monospace;white-space:pre-wrap"></pre>
  <script type="module">
import React from 'react';
import { createRoot } from 'react-dom/client';
const { useState, useEffect, useMemo, useCallback, useRef, Fragment } = React;
try {
${userCode}
  if (typeof __App === 'undefined' || !__App) {
    throw new Error('No App component (export default function App)');
  }
  const rootEl = document.getElementById('root');
  createRoot(rootEl).render(React.createElement(__App));
  console.log('[react-studio] rendered');
} catch (e) {
  const err = document.getElementById('__err');
  err.style.display = 'block';
  err.textContent = String(e && e.stack ? e.stack : e);
  console.error(e);
}
  </script>
</body>
</html>`;

  return {
    ok: true,
    htmlPreview: html,
    stdout: "React preview ready (client Sucrase + esm.sh)",
    stderr: "",
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function runReactPlayground(
  files: ReactFiles,
): Promise<ReactPreviewResult> {
  return buildReactPreviewHtml(files);
}
