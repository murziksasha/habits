/**
 * Build a sandboxed srcDoc for multi-file mini-projects (HTML + CSS + JS).
 * Prefer explicit file ids: html | css | js; fall back by language.
 */

export type ProjectFileLike = {
  id: string;
  language?: string;
  name?: string;
};

export function pickProjectContents(
  files: ProjectFileLike[],
  contents: Record<string, string>,
): { html: string; css: string; js: string } {
  const byLang = (langs: string[]) =>
    files.find((f) => langs.includes((f.language || "").toLowerCase()));

  const htmlFile =
    files.find((f) => f.id === "html") ?? byLang(["html"]);
  const cssFile =
    files.find((f) => f.id === "css") ?? byLang(["css"]);
  const jsFile =
    files.find((f) => f.id === "js" || f.id === "javascript") ??
    byLang(["javascript", "js", "typescript", "ts"]);

  return {
    html: htmlFile ? (contents[htmlFile.id] ?? "") : "",
    css: cssFile ? (contents[cssFile.id] ?? "") : "",
    js: jsFile ? (contents[jsFile.id] ?? "") : "",
  };
}

/** Whether preview makes sense (has HTML or CSS-only with injected shell). */
export function canPreviewProject(
  files: ProjectFileLike[],
  contents: Record<string, string>,
): boolean {
  const { html, css } = pickProjectContents(files, contents);
  return Boolean(html.trim() || css.trim());
}

/**
 * Assemble document. If `html` already has <html>, inject style/script before </head>/</body>.
 * Otherwise wrap a minimal document.
 */
export function buildProjectPreviewSrcDoc(
  files: ProjectFileLike[],
  contents: Record<string, string>,
): string {
  const { html, css, js } = pickProjectContents(files, contents);
  const styleTag = css.trim() ? `<style>\n${css}\n</style>` : "";
  // sandbox iframe has no allow-same-origin — scripts still run with allow-scripts
  const scriptTag = js.trim()
    ? `<script>\ntry {\n${js}\n} catch (e) { document.body.insertAdjacentHTML('beforeend', '<pre style="color:red">'+e+'</pre>'); }\n</script>`
    : "";

  const raw = html.trim();
  if (!raw) {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${styleTag}</head><body>
<div class="preview-root"><!-- no HTML file — CSS only --></div>
${scriptTag}
</body></html>`;
  }

  if (/<html[\s>]/i.test(raw)) {
    let doc = raw;
    if (styleTag) {
      if (/<\/head>/i.test(doc)) {
        doc = doc.replace(/<\/head>/i, `${styleTag}</head>`);
      } else if (/<body[\s>]/i.test(doc)) {
        doc = doc.replace(/<body([^>]*)>/i, `<head>${styleTag}</head><body$1>`);
      } else {
        doc = styleTag + doc;
      }
    }
    if (scriptTag) {
      if (/<\/body>/i.test(doc)) {
        doc = doc.replace(/<\/body>/i, `${scriptTag}</body>`);
      } else {
        doc = doc + scriptTag;
      }
    }
    return doc;
  }

  return `<!DOCTYPE html><html><head><meta charset="utf-8"/>${styleTag}</head><body>
${raw}
${scriptTag}
</body></html>`;
}
