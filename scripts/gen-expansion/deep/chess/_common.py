"""Shared helpers for deep Chess units."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from lib import (  # noqa: F401, E402
    chess_lesson,
    chess_puzzle,
    exam_lesson,
    explain,
    idea,
    match,
    mcq,
    unit,
    xp,
)

def ex(slug, why_uk, why_en, ideas, sample_uk, sample_en, min_words=12):
    return explain(
        f"{slug}-e",
        why_uk,
        why_en,
        ideas,
        sample_uk,
        sample_en,
        min_words=min_words,
        pass_ratio=0.6,
    )


def quiz(q_uk, q_en, options, correct, options_en=None):
    return (q_uk, q_en, options, correct, options_en)


def chess_teach(
    slug: str,
    title_uk: str,
    title_en: str,
    difficulty: int,
    fen: str,
    notes_uk: str,
    notes_en: str,
    quiz_spec: tuple,
    extras: list,
    explain_ex: dict | None = None,
    free: bool = False,
    lesson_prompt_uk: str | None = None,
    lesson_prompt_en: str | None = None,
) -> dict:
    q_uk, q_en, options, correct, options_en = quiz_spec
    lesson = chess_lesson(
        f"{slug}-l",
        lesson_prompt_uk or title_uk,
        lesson_prompt_en or title_en,
        fen,
        notes_uk,
        notes_en,
        q_uk,
        q_en,
        options,
        correct,
        options_en,
    )
    exercises = [lesson, *extras]
    if explain_ex is not None:
        exercises.append(explain_ex)
    ids = [e["id"] for e in exercises]
    if len(ids) != len(set(ids)):
        raise ValueError(f"{slug}: duplicate exercise ids {ids}")
    if len(exercises) < 3:
        raise ValueError(f"{slug}: need at least 3 exercises (lesson + retrieval)")
    row = {
        "slug": slug,
        "titleUk": title_uk,
        "titleEn": title_en,
        "baseXp": xp(difficulty),
        "difficulty": difficulty,
        "exercises": exercises,
    }
    if free:
        row["isFree"] = True
    return row


def puz(slug, n, prompt_uk, prompt_en, fen, solution, difficulty):
    return chess_puzzle(f"{slug}-p{n}", prompt_uk, prompt_en, fen, solution, difficulty)


def q(slug, n, prompt_uk, prompt_en, options, correct, expl_uk, expl_en, options_en=None):
    return mcq(f"{slug}-m{n}", prompt_uk, prompt_en, options, correct, expl_uk, expl_en, options_en)
