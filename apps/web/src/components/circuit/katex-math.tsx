"use client";

import React, { useMemo } from "react";
import katex from "katex";

export function KaTeXMath({
  math,
  inline = true,
  className = "",
}: {
  math: string;
  inline?: boolean;
  className?: string;
}) {
  const html = useMemo(() => {
    try {
      return katex.renderToString(math, {
        displayMode: !inline,
        throwOnError: false,
      });
    } catch {
      return math;
    }
  }, [math, inline]);

  return (
    <span
      className={`inline-block select-text ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

/**
 * Automatically parses text with $...$ or \(...\) inline math or $$...$$ display math.
 */
export function FormattedFormulaText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  const parts = useMemo(() => {
    if (!text) return [];
    // Match $$...$$, $...$, \[...\], \(...\)
    const regex = /(\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\))/g;
    const tokens: { type: "text" | "inline_math" | "display_math"; content: string }[] = [];
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        tokens.push({ type: "text", content: text.slice(lastIndex, match.index) });
      }
      const raw = match[0]!;
      if (raw.startsWith("$$") && raw.endsWith("$$")) {
        tokens.push({ type: "display_math", content: raw.slice(2, -2).trim() });
      } else if (raw.startsWith("$") && raw.endsWith("$")) {
        tokens.push({ type: "inline_math", content: raw.slice(1, -1).trim() });
      } else if (raw.startsWith("\\[") && raw.endsWith("\\]")) {
        tokens.push({ type: "display_math", content: raw.slice(2, -2).trim() });
      } else if (raw.startsWith("\\(") && raw.endsWith("\\)")) {
        tokens.push({ type: "inline_math", content: raw.slice(2, -2).trim() });
      }
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      tokens.push({ type: "text", content: text.slice(lastIndex) });
    }
    return tokens;
  }, [text]);

  return (
    <span className={className}>
      {parts.map((p, i) => {
        if (p.type === "text") return <React.Fragment key={i}>{p.content}</React.Fragment>;
        if (p.type === "display_math") {
          return (
            <div key={i} className="my-2 overflow-x-auto text-center">
              <KaTeXMath math={p.content} inline={false} />
            </div>
          );
        }
        return <KaTeXMath key={i} math={p.content} inline={true} />;
      })}
    </span>
  );
}
