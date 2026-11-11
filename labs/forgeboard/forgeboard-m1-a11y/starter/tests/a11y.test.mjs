import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const html = fs.readFileSync(path.join(root, "src/index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "src/styles.css"), "utf8");

test("semantic HTML landmarks and skip navigation exist", () => {
  assert.match(html, /<header[\s>]/i, "Expected <header> landmark");
  assert.match(html, /<nav[\s>]/i, "Expected <nav> landmark");
  assert.match(html, /<main[\s>]/i, "Expected <main> landmark");
  assert.match(html, /<footer[\s>]/i, "Expected <footer> landmark");
});

test("task form associates label, aria-describedby error, and aria-invalid", () => {
  const inputMatch = html.match(/<input[^>]*\bid=["']([^"']+)["'][^>]*>/i);
  assert.ok(inputMatch, "Expected input with id");
  const inputId = inputMatch[1];
  const labelPattern = new RegExp(`<label[^>]*for=["']${inputId}["']`, "i");
  assert.match(html, labelPattern, `Missing <label for="${inputId}">`);
  const descMatch = html.match(/\baria-describedby=["']([^"']+)["']/i);
  assert.ok(descMatch, "Missing aria-describedby on input");
  const descTokens = descMatch[1].trim().split(/\s+/);
  for (const descId of descTokens) {
    assert.ok(
      new RegExp(`\\bid=["']${descId}["']`, "i").test(html),
      `Referenced error/hint element #${descId} must exist`,
    );
  }
  assert.match(html, /aria-invalid=/i, "Input must support aria-invalid state");
});

test("asynchronous live status announcement and native <dialog> are present", () => {
  assert.match(html, /role=["']status["']/i, "Status container requires role=\"status\"");
  assert.match(html, /aria-live=["']polite["']/i, "Status container requires aria-live=\"polite\"");
  assert.match(html, /<dialog[\s>]/i, "Task details must use native <dialog>");
  assert.doesNotMatch(html, /class=["']modal["']/i, "Do not replace native <dialog> with a plain div.modal");
  assert.match(html, /focus\(\)/i, "Expected focus restoration handling when closing modal");
});

test("CSS uses layers, logical properties, tokens, container queries, focus-visible, reduced motion, and wrap safety", () => {
  assert.match(css, /@layer\s+/i, "Missing @layer cascade organization");
  assert.match(css, /--[a-z0-9-]+\s*:/i, "Missing CSS custom property design tokens");
  assert.match(css, /(padding-inline|margin-block|inline-size)/i, "Missing CSS logical properties");
  assert.match(css, /:focus-visible\b/i, "Missing explicit :focus-visible outline rule");
  assert.match(css, /@container\b/i, "Missing @container responsive card/panel query");
  assert.match(css, /prefers-reduced-motion\s*:\s*reduce/i, "Missing prefers-reduced-motion media query");
  assert.match(css, /min-width:\s*0/i, "Missing min-width: 0 flex/grid overflow safeguard");
  assert.match(css, /(overflow-wrap:\s*anywhere|overflow-wrap:\s*break-word)/i, "Missing long-text wrap rule");
});
