#!/usr/bin/env python3
"""Assemble deep English/Chess TypeScript expansion modules."""
from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
sys.path.insert(0, str(ROOT))

from lib import OUT_DIR, emit_ts  # noqa: E402


def main() -> None:
    from english import all_units as english_units
    from chess import all_units as chess_units

    en = english_units()
    ch = chess_units()
    if en:
        emit_ts(en, "expandEnglishDeep", OUT_DIR / "english-deep.ts")
    else:
        print("skip english-deep.ts (no units yet)")
    if ch:
        emit_ts(ch, "expandChessDeep", OUT_DIR / "chess-deep.ts")
    else:
        print("skip chess-deep.ts (no units yet)")


if __name__ == "__main__":
    main()
