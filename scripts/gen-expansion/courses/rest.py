"""REST API Design — bilingual units (rest_a, rest_b when present)."""
from __future__ import annotations

from rest_a import UNITS as A

try:
    from rest_b import UNITS as B
except ImportError:
    B = []

UNITS = A + B
