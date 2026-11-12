"""Helpers for deep English/Chess lesson generation.

Emits TypeScript modules that append units via expandCourse.
"""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[3]  # repo root
OUT_DIR = ROOT / "packages/content/src/expansion"


def _s(s: str) -> str:
    s = s.strip()
    if not s:
        raise ValueError("empty string in lesson content")
    return s


def concept(
    id: str,
    title_uk: str,
    title_en: str,
    body_uk: str,
    body_en: str,
    points_uk: list[str],
    points_en: list[str],
    check: dict[str, Any] | None = None,
) -> dict[str, Any]:
    bu, be = _s(body_uk), _s(body_en)
    if len(bu) > 5900 or len(be) > 5900:
        raise ValueError(f"concept body too long for {id}: {len(bu)}/{len(be)}")
    if len(points_uk) > 8 or len(points_en) > 8:
        raise ValueError(f"too many key points for {id}")
    for p in points_uk + points_en:
        if len(p) > 400:
            raise ValueError(f"key point too long in {id}: {p[:40]}")
    row: dict[str, Any] = {
        "id": id,
        "type": "concept",
        "promptUk": _s(title_uk),
        "promptEn": _s(title_en),
        "bodyUk": bu,
        "bodyEn": be,
        "keyPointsUk": [_s(p) for p in points_uk],
        "keyPointsEn": [_s(p) for p in points_en],
    }
    if check:
        row["check"] = check
    return row


def mcq(
    id: str,
    prompt_uk: str,
    prompt_en: str,
    options: list[str],
    correct: int,
    expl_uk: str,
    expl_en: str,
    options_en: list[str] | None = None,
) -> dict[str, Any]:
    if not (0 <= correct < len(options)):
        raise ValueError(f"{id}: bad correctIndex {correct} for {len(options)} options")
    if len(options) < 2:
        raise ValueError(f"{id}: need 2+ options")
    if len(set(options)) != len(options):
        raise ValueError(f"{id}: duplicate options {options}")
    row: dict[str, Any] = {
        "id": id,
        "type": "mcq",
        "promptUk": _s(prompt_uk),
        "promptEn": _s(prompt_en),
        "options": options,
        "correctIndex": correct,
        "explanationUk": _s(expl_uk),
        "explanationEn": _s(expl_en),
    }
    if options_en:
        if len(options_en) != len(options):
            raise ValueError(f"{id}: optionsEn length")
        row["optionsEn"] = options_en
    return row


def fill(id: str, prompt_uk: str, prompt_en: str, sentence: str, accepted: list[str]) -> dict[str, Any]:
    if not accepted:
        raise ValueError(f"{id}: no accepted answers")
    return {
        "id": id,
        "type": "fill_blank",
        "promptUk": _s(prompt_uk),
        "promptEn": _s(prompt_en),
        "sentence": _s(sentence),
        "accepted": accepted,
    }


def translate(
    id: str,
    prompt_uk: str,
    prompt_en: str,
    source: str,
    accepted: list[str],
    direction: str = "uk_en",
) -> dict[str, Any]:
    if direction not in ("uk_en", "en_uk"):
        raise ValueError(f"{id}: bad direction")
    return {
        "id": id,
        "type": "translate",
        "promptUk": _s(prompt_uk),
        "promptEn": _s(prompt_en),
        "source": _s(source),
        "accepted": accepted,
        "direction": direction,
    }


def match(id: str, prompt_uk: str, prompt_en: str, pairs: list[tuple[str, str]]) -> dict[str, Any]:
    if len(pairs) < 2:
        raise ValueError(f"{id}: need 2+ pairs")
    rights = [p[1] for p in pairs]
    if len(set(rights)) != len(rights):
        raise ValueError(f"{id}: right sides must be unique")
    return {
        "id": id,
        "type": "match",
        "promptUk": _s(prompt_uk),
        "promptEn": _s(prompt_en),
        "pairs": [{"left": a, "right": b} for a, b in pairs],
    }


def order_words(id: str, prompt_uk: str, prompt_en: str, correct: list[str], words: list[str] | None = None) -> dict[str, Any]:
    if len(correct) < 2:
        raise ValueError(f"{id}: short order")
    w = words if words is not None else list(reversed(correct[1:])) + [correct[0]]
    if sorted(w) != sorted(correct):
        raise ValueError(f"{id}: words must be a permutation of correct")
    if w == correct:
        # ensure it's shuffled
        w = correct[1:] + correct[:1]
    return {
        "id": id,
        "type": "order_words",
        "promptUk": _s(prompt_uk),
        "promptEn": _s(prompt_en),
        "words": w,
        "correct": correct,
    }


def comprehension(
    id: str,
    prompt_uk: str,
    prompt_en: str,
    passage: str,
    questions: list[dict[str, Any]],
    expl_uk: str | None = None,
    expl_en: str | None = None,
) -> dict[str, Any]:
    if not questions:
        raise ValueError(f"{id}: no questions")
    row: dict[str, Any] = {
        "id": id,
        "type": "comprehension",
        "promptUk": _s(prompt_uk),
        "promptEn": _s(prompt_en),
        "passage": _s(passage),
        "questions": questions,
    }
    if expl_uk:
        row["explanationUk"] = _s(expl_uk)
        row["explanationEn"] = _s(expl_en or expl_uk)
    return row


def explain(
    id: str,
    prompt_uk: str,
    prompt_en: str,
    ideas: list[dict[str, Any]],
    sample_uk: str,
    sample_en: str,
    min_words: int = 12,
    pass_ratio: float = 0.6,
) -> dict[str, Any]:
    if not ideas:
        raise ValueError(f"{id}: no ideas")
    su, se = _s(sample_uk), _s(sample_en)
    if len(su.split()) < min_words or len(se.split()) < min_words:
        raise ValueError(f"{id}: sample shorter than minWords={min_words}")
    for idea in ideas:
        stems = [s.lower() for s in idea["anyOf"]]
        # at least one stem should appear in each sample language group;
        # we only check that stems exist
        if not stems:
            raise ValueError(f"{id}: empty anyOf")
    return {
        "id": id,
        "type": "explain",
        "promptUk": _s(prompt_uk),
        "promptEn": _s(prompt_en),
        "keyIdeas": ideas,
        "minWords": min_words,
        "passRatio": pass_ratio,
        "sampleAnswerUk": su,
        "sampleAnswerEn": se,
    }


def idea(label_uk: str, label_en: str, *stems: str) -> dict[str, Any]:
    return {"labelUk": _s(label_uk), "labelEn": _s(label_en), "anyOf": list(stems)}


def chess_lesson(
    id: str,
    prompt_uk: str,
    prompt_en: str,
    fen: str,
    notes_uk: str,
    notes_en: str,
    quiz_q: str,
    quiz_q_en: str,
    quiz_options: list[str],
    quiz_correct: int,
    quiz_options_en: list[str] | None = None,
) -> dict[str, Any]:
    if not (0 <= quiz_correct < len(quiz_options)):
        raise ValueError(f"{id}: bad quiz index")
    quiz: dict[str, Any] = {
        "q": _s(quiz_q),
        "qEn": _s(quiz_q_en),
        "options": quiz_options,
        "correctIndex": quiz_correct,
    }
    if quiz_options_en:
        quiz["optionsEn"] = quiz_options_en
    return {
        "id": id,
        "type": "chess_lesson",
        "promptUk": _s(prompt_uk),
        "promptEn": _s(prompt_en),
        "fen": _s(fen),
        "notesUk": _s(notes_uk),
        "notesEn": _s(notes_en),
        "quiz": quiz,
    }


def chess_puzzle(
    id: str,
    prompt_uk: str,
    prompt_en: str,
    fen: str,
    solution: list[str],
    difficulty: int,
) -> dict[str, Any]:
    if not solution:
        raise ValueError(f"{id}: empty solution")
    if not (1 <= difficulty <= 5):
        raise ValueError(f"{id}: difficulty")
    return {
        "id": id,
        "type": "chess_puzzle",
        "promptUk": _s(prompt_uk),
        "promptEn": _s(prompt_en),
        "fen": _s(fen),
        "solutionSans": solution,
        "difficulty": difficulty,
    }


def teach(
    slug: str,
    title_uk: str,
    title_en: str,
    difficulty: int,
    concept_title_uk: str,
    concept_title_en: str,
    body_uk: str,
    body_en: str,
    points_uk: list[str],
    points_en: list[str],
    retrieval: list[dict[str, Any]],
    explain_ex: dict[str, Any],
    free: bool = False,
    base_xp: int | None = None,
    check: dict[str, Any] | None = None,
) -> dict[str, Any]:
    if len(retrieval) < 3:
        raise ValueError(f"{slug}: need at least 3 retrieval exercises")
    xp = base_xp if base_xp is not None else {1: 15, 2: 18, 3: 21, 4: 24, 5: 27}.get(difficulty, 21)
    exercises = [
        concept(f"{slug}-c", concept_title_uk, concept_title_en, body_uk, body_en, points_uk, points_en, check),
        *retrieval,
        explain_ex,
    ]
    # unique ids
    ids = [e["id"] for e in exercises]
    if len(ids) != len(set(ids)):
        raise ValueError(f"{slug}: duplicate exercise ids {ids}")
    lesson: dict[str, Any] = {
        "slug": slug,
        "titleUk": _s(title_uk),
        "titleEn": _s(title_en),
        "baseXp": xp,
        "difficulty": difficulty,
        "exercises": exercises,
    }
    if free:
        lesson["isFree"] = True
    return lesson


def exam_lesson(
    slug: str,
    title_uk: str,
    title_en: str,
    difficulty: int,
    questions: list[dict[str, Any]],
    base_xp: int | None = None,
) -> dict[str, Any]:
    if len(questions) < 4:
        raise ValueError(f"{slug}: exam needs 4+ questions")
    for q in questions:
        if q.get("type") == "concept":
            raise ValueError(f"{slug}: exam must not contain a concept card")
    xp = base_xp if base_xp is not None else 30
    return {
        "slug": slug,
        "titleUk": _s(title_uk),
        "titleEn": _s(title_en),
        "baseXp": xp,
        "difficulty": difficulty,
        "isExam": True,
        "passThreshold": 0.7,
        "exercises": questions,
    }


def unit(slug: str, title_uk: str, title_en: str, lessons: list[dict[str, Any]]) -> dict[str, Any]:
    slugs = [l["slug"] for l in lessons]
    if len(slugs) != len(set(slugs)):
        raise ValueError(f"{slug}: duplicate lesson slugs")
    exams = [l for l in lessons if l.get("isExam")]
    if len(exams) != 1 or lessons[-1] is not exams[0]:
        raise ValueError(f"{slug}: unit must end with exactly one exam")
    if len(lessons) < 5:
        raise ValueError(f"{slug}: expected 4+ teach lessons plus exam")
    return {
        "slug": slug,
        "titleUk": _s(title_uk),
        "titleEn": _s(title_en),
        "lessons": lessons,
    }


def emit_ts(units: list[dict[str, Any]], func_name: str, out_path: Path) -> None:
    payload = json.dumps(units, ensure_ascii=False, indent=2)
    # JSON is valid as a TS expression (quoted keys, double quotes)
    src = (
        'import type { CourseContent, UnitContent } from "../types.js";\n'
        'import { expandCourse } from "./factory.js";\n\n'
        f"const newUnits: UnitContent[] = {payload};\n\n"
        f"export function {func_name}(course: CourseContent): CourseContent {{\n"
        "  return expandCourse(course, {}, newUnits);\n"
        "}\n"
    )
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(src, encoding="utf-8")
    n_lessons = sum(len(u["lessons"]) for u in units)
    n_exams = sum(1 for u in units for l in u["lessons"] if l.get("isExam"))
    print(f"wrote {out_path.relative_to(ROOT)}: {len(units)} units, {n_lessons} lessons ({n_exams} exams)")


def xp(difficulty: int) -> int:
    return {1: 15, 2: 18, 3: 21, 4: 24, 5: 27}.get(difficulty, 21)
