
"""Load all course unit modules into the expansion store."""
from __future__ import annotations
import importlib.util
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
ROOT = HERE.parent
sys.path.insert(0, str(ROOT))
from store import add_units, add_insertions, counts, _load, _save

# (course, module file stem)
MODULES = [
    ("react_fundamentals", "react"),
    ("react_fundamentals", "react_b"),
    ("react_fundamentals", "react_c"),
    ("react_fundamentals", "react_d"),
    ("node_fundamentals", "node"),
    ("node_fundamentals", "node_b"),
    ("express_fundamentals", "express"),
    ("express_fundamentals", "express_b"),
    ("html_semantics", "html"),
    ("css_layout", "css"),
    ("css_layout", "css_b"),
    ("qa_theory", "qa"),
    ("sql_fundamentals", "sql"),
    ("embedded_cpp", "embedded"),
    ("programming", "programming"),  # may also have INSERTIONS
    ("sysadmin", "sysadmin"),
    ("devops", "devops"),
    ("software_testing", "software_testing"),
    ("postgresql_apps", "postgresql"),
    ("git_workflows", "git"),
    ("web_security", "web_security"),
    ("ai_development", "ai_dev"),
    ("python_for_ai", "python_ai"),
    ("agentic_systems", "agentic"),
    ("llmops", "llmops"),
    ("ai_security", "ai_security"),
    ("ai_product", "ai_product"),
    ("nextjs_fullstack", "nextjs"),
    ("applied_algorithms", "algorithms"),
    ("go_fundamentals", "go"),
    ("web_accessibility", "a11y"),
    ("rest_api_design", "rest"),
    ("frontend_performance", "perf"),
    ("browser_web_apis", "browser"),
]


def _imp(stem: str):
    path = HERE / f"{stem}.py"
    if not path.exists():
        return None
    spec = importlib.util.spec_from_file_location(f"gen_{stem}", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def reset_generated_courses(courses: list[str]) -> None:
    """Drop previously loaded generated units for these courses (keep JS/TS)."""
    data = _load()
    keep = {"js_fundamentals", "typescript"}
    for c in courses:
        if c in keep:
            continue
        if c in data:
            # If we only add units (no hand-edits), replace units/insertions we manage
            data[c] = {"units": [], "insertions": data[c].get("insertions") or {}}
            if c == "programming":
                data[c]["insertions"] = {}
    _save(data)


def main(reset: bool = True) -> None:
    loaded_courses = []
    missing = []
    if reset:
        # reset only courses we are about to load that exist as files
        to_reset = []
        for course, stem in MODULES:
            if (HERE / f"{stem}.py").exists() and course not in ("js_fundamentals", "typescript"):
                to_reset.append(course)
        reset_generated_courses(to_reset)
    for course, stem in MODULES:
        mod = _imp(stem)
        if mod is None:
            missing.append(stem)
            continue
        units = getattr(mod, "UNITS", None) or []
        insertions = getattr(mod, "INSERTIONS", None) or {}
        if units:
            n = add_units(course, units)
            loaded_courses.append((course, stem, "units", n))
        if insertions:
            n = add_insertions(course, insertions)
            loaded_courses.append((course, stem, "ins", n))
    print("loaded:")
    for row in loaded_courses:
        print(" ", row)
    print("missing files:", missing)
    print("counts:", counts())


if __name__ == "__main__":
    main()
