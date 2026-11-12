"""Shared imports and explain helper for English deep units."""
from __future__ import annotations

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from lib import (  # noqa: F401, E402
    comprehension,
    exam_lesson,
    explain,
    fill,
    idea,
    match,
    mcq,
    order_words,
    teach,
    translate,
    unit,
)


def ex(slug, why_uk, why_en, ideas, sample_uk, sample_en):
    return explain(
        f"{slug}-e",
        why_uk,
        why_en,
        ideas,
        sample_uk,
        sample_en,
        min_words=12,
        pass_ratio=0.6,
    )
