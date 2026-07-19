import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..", "src");
const map = {
  "english.ts": {
    titleEn: "English",
    descriptionEn: "Learn English through short interactive lessons.",
  },
  "chess.ts": {
    titleEn: "Chess",
    descriptionEn: "Theory, puzzles, and live games with other players.",
  },
  "typing.ts": {
    titleEn: "Typing",
    descriptionEn: "Build speed and accuracy with touch typing drills.",
  },
  "speed-reading.ts": {
    titleEn: "Speed reading",
    descriptionEn: "RSVP, chunking, and reading comprehension.",
  },
  "logic.ts": {
    titleEn: "Logic",
    descriptionEn: "Sequences, patterns, and critical thinking puzzles.",
  },
};

// Manual EN titles for known Ukrainian lesson titles
const titleMap = {
  "Англійська": "English",
  "Основи 1": "Basics 1",
  "Привітання": "Greetings",
  "Знайомство": "Introductions",
  "Шахи": "Chess",
  "Друк": "Typing",
  "Швидкочитання": "Speed reading",
  "Логіка": "Logic",
};

function enTitle(uk) {
  return titleMap[uk] ?? uk;
}

for (const [file, m] of Object.entries(map)) {
  let s = fs.readFileSync(path.join(dir, file), "utf8");
  if (!s.includes("titleEn:")) {
    s = s.replace(
      /titleUk: "([^"]+)",\r?\n(\s*)descriptionUk:/,
      (_a, t, sp) => `titleUk: "${t}",\n${sp}titleEn: "${m.titleEn}",\n${sp}descriptionUk:`,
    );
    s = s.replace(
      /descriptionUk: "([^"]+)",\r?\n(\s*)icon:/,
      (_a, d, sp) =>
        `descriptionUk: "${d}",\n${sp}descriptionEn: "${m.descriptionEn}",\n${sp}icon:`,
    );
  }
  // unit titles before lessons:
  s = s.replace(/titleUk: "([^"]+)",\r?\n(\s*)lessons:/g, (_f, title, indent) => {
    if (s.includes(`titleEn:`) && false) return _f;
    return `titleUk: "${title}",\n${indent}titleEn: "${enTitle(title)}",\n${indent}lessons:`;
  });
  // lesson titles before baseXp:
  s = s.replace(/titleUk: "([^"]+)",\r?\n(\s*)baseXp:/g, (_f, title, indent) => {
    return `titleUk: "${title}",\n${indent}titleEn: "${enTitle(title)}",\n${indent}baseXp:`;
  });
  // avoid double titleEn
  s = s.replace(/titleEn: "[^"]+",\r?\n(\s*)titleEn: "[^"]+",/g, (full, indent) => {
    const first = full.match(/titleEn: "[^"]+"/)[0];
    return first + ",\n" + indent; // messy - better redo carefully
  });
  fs.writeFileSync(path.join(dir, file), s);
  console.log("updated", file);
}
