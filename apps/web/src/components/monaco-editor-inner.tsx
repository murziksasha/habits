"use client";

import Editor, { loader } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import "monaco-editor/min/vs/editor/editor.main.css";

// Configure Monaco environment & workers once on the client
if (typeof window !== "undefined") {
  (self as unknown as { MonacoEnvironment: unknown }).MonacoEnvironment = {
    getWorker(_: unknown, label: string) {
      if (label === "json") {
        return new Worker(
          new URL("monaco-editor/esm/vs/language/json/json.worker.js", import.meta.url)
        );
      }
      if (label === "css" || label === "scss" || label === "less") {
        return new Worker(
          new URL("monaco-editor/esm/vs/language/css/css.worker.js", import.meta.url)
        );
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        return new Worker(
          new URL("monaco-editor/esm/vs/language/html/html.worker.js", import.meta.url)
        );
      }
      if (label === "typescript" || label === "javascript") {
        return new Worker(
          new URL("monaco-editor/esm/vs/language/typescript/ts.worker.js", import.meta.url)
        );
      }
      return new Worker(
        new URL("monaco-editor/esm/vs/editor/editor.worker.js", import.meta.url)
      );
    },
  };

  loader.config({ monaco });
}

export default Editor;

