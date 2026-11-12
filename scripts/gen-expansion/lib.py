"""Emit TypeScript course expansions from Python lesson specs."""
from __future__ import annotations

import json
import os
import re
from pathlib import Path
from typing import Any

ROOT = Path("/workspace/habits")
OUT = ROOT / "packages/content/src/expansion"
COURSES_OUT = ROOT / "packages/content/src"


def js(v: Any) -> str:
    return json.dumps(v, ensure_ascii=False)


def indent(s: str, n: int = 2) -> str:
    pad = " " * n
    return "\n".join(pad + line if line else line for line in s.splitlines())


def emit_retrieval(r: dict) -> str:
    kind = r["kind"]
    if kind == "mcq":
        parts = [
            f'kind: "mcq"',
            f'promptUk: {js(r["promptUk"])}',
            f'promptEn: {js(r["promptEn"])}',
            f'options: {js(r["options"])}',
            f'correctIndex: {r["correctIndex"]}',
            f'explanationUk: {js(r["explanationUk"])}',
            f'explanationEn: {js(r["explanationEn"])}',
        ]
        if r.get("optionsEn"):
            parts.insert(4, f'optionsEn: {js(r["optionsEn"])}')
        return "{ " + ", ".join(parts) + " }"
    if kind == "fill":
        return (
            "{ "
            + ", ".join(
                [
                    'kind: "fill"',
                    f'promptUk: {js(r["promptUk"])}',
                    f'promptEn: {js(r["promptEn"])}',
                    f'language: {js(r.get("language", "javascript"))}',
                    f'code: {js(r["code"])}',
                    f'accepted: {js(r["accepted"])}',
                    f'caseSensitive: {str(r.get("caseSensitive", True)).lower()}',
                    f'explanationUk: {js(r["explanationUk"])}',
                    f'explanationEn: {js(r["explanationEn"])}',
                ]
            )
            + " }"
        )
    if kind in ("read", "output"):
        parts = [
            f'kind: {js(kind)}',
            f'promptUk: {js(r["promptUk"])}',
            f'promptEn: {js(r["promptEn"])}',
            f'language: {js(r.get("language", "javascript"))}',
            f'code: {js(r["code"])}',
            f'options: {js(r["options"])}',
            f'correctIndex: {r["correctIndex"]}',
            f'explanationUk: {js(r["explanationUk"])}',
            f'explanationEn: {js(r["explanationEn"])}',
        ]
        if r.get("optionsEn"):
            parts.insert(6, f'optionsEn: {js(r["optionsEn"])}')
        return "{ " + ", ".join(parts) + " }"
    if kind == "order":
        return (
            "{ "
            + ", ".join(
                [
                    'kind: "order"',
                    f'promptUk: {js(r["promptUk"])}',
                    f'promptEn: {js(r["promptEn"])}',
                    f'language: {js(r.get("language", "javascript"))}',
                    f'lines: {js(r["lines"])}',
                    f'correct: {js(r["correct"])}',
                    f'explanationUk: {js(r["explanationUk"])}',
                    f'explanationEn: {js(r["explanationEn"])}',
                ]
            )
            + " }"
        )
    if kind == "match":
        return (
            "{ "
            + ", ".join(
                [
                    'kind: "match"',
                    f'promptUk: {js(r["promptUk"])}',
                    f'promptEn: {js(r["promptEn"])}',
                    f'pairs: {js(r["pairs"])}',
                ]
            )
            + " }"
        )
    raise ValueError(f"unknown retrieval {kind}")


def emit_teach_spec(spec: dict) -> str:
    """Emit a TeachSpec object literal (sectionUnit maps teachLesson itself)."""
    inner = emit_teach(spec)
    # emit_teach wraps with teachLesson(...); unwrap
    assert inner.startswith("teachLesson(") and inner.endswith(")")
    return inner[len("teachLesson("):-1]

def emit_teach(spec: dict) -> str:
    ideas = ", ".join(
        "{ " + f'labelUk: {js(i["labelUk"])}, labelEn: {js(i["labelEn"])}, anyOf: {js(i["anyOf"])}' + " }"
        for i in spec["ideas"]
    )
    retrieval = ",\n    ".join(emit_retrieval(r) for r in spec["retrieval"])
    lines = [
        "teachLesson({",
        f'  slug: {js(spec["slug"])},',
        f'  titleUk: {js(spec["titleUk"])},',
        f'  titleEn: {js(spec["titleEn"])},',
        f'  difficulty: {spec["difficulty"]},',
    ]
    if spec.get("free"):
        lines.append("  free: true,")
    lines += [
        f'  pointsUk: {js(spec["pointsUk"])},',
        f'  pointsEn: {js(spec["pointsEn"])},',
        f'  conceptUk: {js(spec["conceptUk"])},',
        f'  conceptEn: {js(spec["conceptEn"])},',
    ]
    if spec.get("code"):
        lines.append(f'  code: {js(spec["code"])},')
        lines.append(f'  language: {js(spec.get("language", "javascript"))},')
    if spec.get("check"):
        lines.append(f'  check: {js(spec["check"])},')
    lines += [
        "  retrieval: [",
        "    " + retrieval,
        "  ],",
        f'  whyUk: {js(spec["whyUk"])},',
        f'  whyEn: {js(spec["whyEn"])},',
        f"  ideas: [{ideas}],",
        f'  sampleUk: {js(spec["sampleUk"])},',
        f'  sampleEn: {js(spec["sampleEn"])},',
        "})",
    ]
    return "\n".join(lines)


def emit_exam_q(q: dict) -> str:
    parts = [
        f'promptUk: {js(q["promptUk"])}',
        f'promptEn: {js(q["promptEn"])}',
        f'options: {js(q["options"])}',
        f'correctIndex: {q["correctIndex"]}',
        f'explanationUk: {js(q["explanationUk"])}',
        f'explanationEn: {js(q["explanationEn"])}',
    ]
    if q.get("optionsEn"):
        parts.insert(3, f'optionsEn: {js(q["optionsEn"])}')
    if q.get("code"):
        parts.append(f'code: {js(q["code"])}')
        parts.append(f'language: {js(q.get("language", "javascript"))}')
    if q.get("kind"):
        parts.append(f'kind: {js(q["kind"])}')
    if q.get("fillCode"):
        parts.append(f'fillCode: {js(q["fillCode"])}')
    if q.get("accepted"):
        parts.append(f'accepted: {js(q["accepted"])}')
    return "{ " + ", ".join(parts) + " }"


def emit_section_unit(u: dict) -> str:
    lessons = ",\n".join(indent(emit_teach_spec(l), 4) for l in u["lessons"])
    qs = ",\n    ".join(emit_exam_q(q) for q in u["exam"]["questions"])
    return "\n".join(
        [
            "sectionUnit(",
            f'  {js(u["slug"])},',
            f'  {js(u["titleUk"])},',
            f'  {js(u["titleEn"])},',
            "  [",
            lessons,
            "  ],",
            f'  {js(u["exam"]["titleUk"])},',
            f'  {js(u["exam"]["titleEn"])},',
            "  [",
            f"    {qs}",
            "  ],",
            ")",
        ]
    )


HEADER_EXPAND = """\
import type {{ CourseContent, LessonContent, UnitContent }} from "../types.js";
import {{ expandCourse, sectionUnit, teachLesson }} from "./factory.js";

{units_const}

{insertions_const}

export function {fn}(course: CourseContent): CourseContent {{
  return expandCourse(course, insertions, newUnits);
}}
"""


def write_expansion(filename: str, fn: str, new_units: list[dict], insertions: dict[str, list[dict]]) -> dict:
    """Write an expansion module. Returns counts."""
    units_ts = "export const newUnits: UnitContent[] = [\n" + ",\n".join(
        indent(emit_section_unit(u), 2) for u in new_units
    ) + "\n];"
    if insertions:
        parts = []
        for slug, lessons in insertions.items():
            body = ",\n".join(indent(emit_teach(l), 6) for l in lessons)
            parts.append(f"  {js(slug)}: [\n{body}\n  ]")
        ins_ts = "const insertions: Record<string, LessonContent[]> = {\n" + ",\n".join(parts) + "\n};"
    else:
        ins_ts = "const insertions: Record<string, LessonContent[]> = {};"
    text = f'''import type {{ CourseContent, LessonContent, UnitContent }} from "../types.js";
import {{ expandCourse, sectionUnit, teachLesson }} from "./factory.js";

{units_ts}

{ins_ts}

export function {fn}(course: CourseContent): CourseContent {{
  return expandCourse(course, insertions, newUnits);
}}
'''
    path = OUT / filename
    path.write_text(text, encoding="utf-8")
    n_new = sum(len(u["lessons"]) + 1 for u in new_units)  # + exam
    n_ins = sum(len(v) for v in insertions.values())
    return {"file": str(path), "new_units": len(new_units), "lessons": n_new + n_ins, "unit_lessons": n_new, "insertions": n_ins}


# ---------- compact constructors ----------

def idea(label_uk: str, label_en: str, any_of: list[str]) -> dict:
    return {"labelUk": label_uk, "labelEn": label_en, "anyOf": any_of}


def L(
    slug: str,
    title_uk: str,
    title_en: str,
    difficulty: int,
    concept_uk: str,
    concept_en: str,
    points_uk: list[str],
    points_en: list[str],
    retrieval: list[dict],
    why_uk: str,
    why_en: str,
    ideas: list[dict],
    sample_uk: str,
    sample_en: str,
    code: str | None = None,
    language: str = "javascript",
    free: bool = False,
    check: dict | None = None,
) -> dict:
    assert len(concept_uk) > 40 and len(concept_en) > 40, slug
    assert len(points_uk) >= 3 and len(points_en) >= 3, slug
    assert len(retrieval) >= 2, slug
    assert len(ideas) >= 2, slug
    assert len(sample_uk.split()) >= 12 and len(sample_en.split()) >= 12, (slug, sample_uk, sample_en)
    for r in retrieval:
        if r["kind"] in ("mcq", "read", "output"):
            assert 0 <= r["correctIndex"] < len(r["options"]), slug
            assert r["promptUk"] != r["promptEn"], slug
            assert len(r["promptUk"]) >= 12 and len(r["promptEn"]) >= 12, slug
        if r["kind"] == "order":
            assert sorted(r["lines"]) == sorted(r["correct"]), slug
        if r["kind"] == "fill":
            assert r["accepted"], slug
    d: dict[str, Any] = dict(
        slug=slug,
        titleUk=title_uk,
        titleEn=title_en,
        difficulty=difficulty,
        pointsUk=points_uk,
        pointsEn=points_en,
        conceptUk=concept_uk,
        conceptEn=concept_en,
        retrieval=retrieval,
        whyUk=why_uk,
        whyEn=why_en,
        ideas=ideas,
        sampleUk=sample_uk,
        sampleEn=sample_en,
    )
    if code:
        d["code"] = code
        d["language"] = language
    if free:
        d["free"] = True
    if check:
        d["check"] = check
    return d


def MCQ(puk, pen, options, idx, euk, een, options_en=None, **k) -> dict:
    d = dict(kind="mcq", promptUk=puk, promptEn=pen, options=options, correctIndex=idx, explanationUk=euk, explanationEn=een)
    if options_en:
        d["optionsEn"] = options_en
    return d


def FILL(puk, pen, lang, code, accepted, euk, een, case=True) -> dict:
    return dict(kind="fill", promptUk=puk, promptEn=pen, language=lang, code=code, accepted=accepted, caseSensitive=case, explanationUk=euk, explanationEn=een)


def READ(puk, pen, lang, code, options, idx, euk, een, options_en=None) -> dict:
    d = dict(kind="read", promptUk=puk, promptEn=pen, language=lang, code=code, options=options, correctIndex=idx, explanationUk=euk, explanationEn=een)
    if options_en:
        d["optionsEn"] = options_en
    return d


def OUTP(puk, pen, lang, code, options, idx, euk, een, options_en=None) -> dict:
    d = dict(kind="output", promptUk=puk, promptEn=pen, language=lang, code=code, options=options, correctIndex=idx, explanationUk=euk, explanationEn=een)
    if options_en:
        d["optionsEn"] = options_en
    return d


def ORDER(puk, pen, lang, correct, euk, een, shuffled=None) -> dict:
    lines = shuffled if shuffled else list(reversed(correct)) if correct[0] != correct[-1] else correct[1:] + correct[:1]
    if sorted(lines) != sorted(correct):
        # fallback rotate
        lines = correct[1:] + correct[:1]
    return dict(kind="order", promptUk=puk, promptEn=pen, language=lang, lines=lines, correct=correct, explanationUk=euk, explanationEn=een)


def MATCH(puk, pen, pairs) -> dict:
    return dict(kind="match", promptUk=puk, promptEn=pen, pairs=pairs)


def EQ(puk, pen, options, idx, euk, een, code=None, lang="javascript", options_en=None, kind=None, fill_code=None, accepted=None) -> dict:
    d = dict(promptUk=puk, promptEn=pen, options=options, correctIndex=idx, explanationUk=euk, explanationEn=een)
    if options_en:
        d["optionsEn"] = options_en
    if code:
        d["code"] = code
        d["language"] = lang
    if kind:
        d["kind"] = kind
    if fill_code:
        d["fillCode"] = fill_code
        d["accepted"] = accepted
        d["kind"] = "fill"
        d["language"] = lang
    return d


def U(slug, title_uk, title_en, lessons, exam_uk, exam_en, questions) -> dict:
    assert len(lessons) >= 3, slug
    assert len(questions) >= 4, slug
    return dict(
        slug=slug,
        titleUk=title_uk,
        titleEn=title_en,
        lessons=lessons,
        exam=dict(titleUk=exam_uk, titleEn=exam_en, questions=questions),
    )


def write_full_course(
    path: Path,
    export_name: str,
    slug: str,
    title_uk: str,
    title_en: str,
    desc_uk: str,
    desc_en: str,
    icon: str,
    color: str,
    units: list[dict],
) -> int:
    units_ts = ",\n".join(indent(emit_section_unit(u), 4) for u in units)
    text = f'''import type {{ CourseContent }} from "./types.js";
import {{ sectionUnit, teachLesson }} from "./expansion/factory.js";

export const {export_name}: CourseContent = {{
  slug: {js(slug)},
  titleUk: {js(title_uk)},
  titleEn: {js(title_en)},
  descriptionUk: {js(desc_uk)},
  descriptionEn: {js(desc_en)},
  icon: {js(icon)},
  color: {js(color)},
  units: [
{units_ts}
  ],
}};
'''
    path.write_text(text, encoding="utf-8")
    return sum(len(u["lessons"]) + 1 for u in units)


def write_skill_units_ts(filename: str, fn: str, units_literal: str, extra_imports: str = "") -> None:
    """For skill courses that don't use teachLesson exclusively."""
    text = f'''import type {{ CourseContent, LessonContent, UnitContent }} from "../types.js";
import {{ expandCourse, concept, explain, lesson, mcq, matchEx, unit }} from "./factory.js";
{extra_imports}

{units_literal}

export function {fn}(course: CourseContent): CourseContent {{
  return expandCourse(course, {{}}, newUnits);
}}
'''
    (OUT / filename).write_text(text, encoding="utf-8")
