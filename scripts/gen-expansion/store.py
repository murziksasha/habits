from __future__ import annotations
import json
from pathlib import Path
from typing import Any

STORE = Path("/workspace/habits/scripts/gen-expansion/store.json")

def _load() -> dict:
    if STORE.exists():
        return json.loads(STORE.read_text(encoding="utf-8"))
    return {}

def _save(data: dict) -> None:
    STORE.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8")

def add_units(course: str, units: list[dict]) -> int:
    data = _load()
    c = data.setdefault(course, {"units": [], "insertions": {}})
    c["units"].extend(units)
    _save(data)
    return sum(len(u["lessons"]) + 1 for u in units)

def add_insertions(course: str, insertions: dict[str, list[dict]]) -> int:
    data = _load()
    c = data.setdefault(course, {"units": [], "insertions": {}})
    n = 0
    for k, v in insertions.items():
        c["insertions"].setdefault(k, []).extend(v)
        n += len(v)
    _save(data)
    return n

def counts() -> dict:
    data = _load()
    out = {}
    total = 0
    for course, c in data.items():
        nu = sum(len(u["lessons"]) + 1 for u in c.get("units", []))
        ni = sum(len(v) for v in c.get("insertions", {}).values())
        out[course] = {"units": len(c.get("units", [])), "lessons": nu + ni, "new_unit_lessons": nu, "insertions": ni}
        total += nu + ni
    out["_total"] = total
    return out
