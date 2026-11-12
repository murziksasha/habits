"""Compact text format -> TeachSpec / Unit.

A unit block:

@unit slug | titleUk | titleEn
@exam examTitleUk | examTitleEn
=== slug | titleUk | titleEn | difficulty | language
CODE:
...
UK:
...
EN:
...
PTS_UK: a || b || c
PTS_EN: a || b || c
MCQ: puk || pen || o1 | o2 | o3 | o4 || idx || euk || een
FILL: puk || pen || code || acc1 | acc2 || euk || een
READ: puk || pen || code || o1 | o2 | o3 | o4 || idx || euk || een
OUT: ...
WHY: whyUk || whyEn
IDEAS: labelUk ~ labelEn ~ stem1 | stem2 ; ...
SAMPLE_UK:
...
SAMPLE_EN:
...
?Q: exam mcq same as MCQ
"""
from __future__ import annotations
import re, sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from lib import L, MCQ, FILL, OUTP, READ, ORDER, EQ, U, idea

def _split(s, sep="||"):
    return [p.strip() for p in s.split(sep)]

def parse_block(text: str) -> dict:
    lines = text.strip().n.splitlines() if False else text.strip().splitlines()
    meta = {}
    fields = {}
    key = None
    buf = []
    def flush():
        nonlocal key, buf
        if key:
            fields[key] = "\n".join(buf).strip()
        key, buf = None, []
    for line in lines:
        if line.startswith("==="):
            flush()
            parts = [p.strip() for p in line[3:].split("|")]
            meta = dict(slug=parts[0], title_uk=parts[1], title_en=parts[2], difficulty=int(parts[3]), language=parts[4] if len(parts)>4 else "javascript")
        elif re.match(r"^(CODE|UK|EN|PTS_UK|PTS_EN|WHY|IDEAS|SAMPLE_UK|SAMPLE_EN|FREE):", line):
            flush()
            key, rest = line.split(":", 1)
            buf = [rest] if rest.strip() else []
        elif re.match(r"^(MCQ|FILL|READ|OUT|ORDER|EQ|CHECK):", line):
            flush()
            key, rest = line.split(":", 1)
            # accumulate multiple exercises as list
            if key not in fields:
                fields[key] = []
            # we temporarily use a special list key
            fields.setdefault("_ex", []).append((key, rest.strip()))
            key = None
        else:
            if key:
                buf.append(line)
    flush()
    return meta, fields

def parse_ideas(s: str) -> list:
    ideas = []
    for part in s.split(";"):
        part = part.strip()
        if not part:
            continue
        uk, en, stems = [p.strip() for p in part.split("~")]
        ideas.append(idea(uk, en, [t.strip() for t in stems.split("|") if t.strip()]))
    return ideas

def parse_ex(kind, raw, language="javascript"):
    p = _split(raw)
    if kind == "MCQ":
        opts = [o.strip() for o in p[2].split("|")]
        return MCQ(p[0], p[1], opts, int(p[3]), p[4], p[5])
    if kind == "FILL":
        acc = [o.strip() for o in p[3].split("|")]
        return FILL(p[0], p[1], language, p[2], acc, p[4], p[5])
    if kind == "READ":
        opts = [o.strip() for o in p[3].split("|")]
        return READ(p[0], p[1], language, p[2], opts, int(p[4]), p[5], p[6])
    if kind == "OUT":
        opts = [o.strip() for o in p[3].split("|")]
        return OUTP(p[0], p[1], language, p[2], opts, int(p[4]), p[5], p[6])
    if kind == "EQ":
        opts = [o.strip() for o in p[2].split("|")]
        code = p[6] if len(p) > 6 and p[6] else None
        lang = p[7] if len(p) > 7 and p[7] else language
        return EQ(p[0], p[1], opts, int(p[3]), p[4], p[5], code=code, lang=lang)
    raise ValueError(kind)

def lesson_from_fields(meta, fields) -> dict:
    ex = [parse_ex(k, raw, meta.get("language","javascript")) for k, raw in fields.get("_ex", []) if k != "EQ"]
    why = _split(fields["WHY"])
    return L(
        meta["slug"], meta["title_uk"], meta["title_en"], meta["difficulty"],
        fields["UK"], fields["EN"],
        _split(fields["PTS_UK"]), _split(fields["PTS_EN"]),
        ex, why[0], why[1],
        parse_ideas(fields["IDEAS"]),
        fields["SAMPLE_UK"], fields["SAMPLE_EN"],
        code=fields.get("CODE") or None,
        language=meta.get("language","javascript"),
        free=fields.get("FREE","").strip() in ("1","true","yes"),
    )

def parse_units(text: str) -> list[dict]:
    # split on @unit
    chunks = re.split(r"^@unit ", text.strip(), flags=re.M)
    units = []
    for ch in chunks:
        ch = ch.strip()
        if not ch:
            continue
        head, _, rest = ch.partition("\n")
        slug, tuk, ten = [p.strip() for p in head.split("|")]
        exam_m = re.search(r"^@exam (.+)$", rest, re.M)
        exam_uk, exam_en = [p.strip() for p in exam_m.group(1).split("|")]
        # exam questions after @exam until end, lessons are === blocks before @exam? 
        # Better: all === blocks are lessons, all EQ: after @exam are questions.
        before, after = rest.split("@exam", 1)
        lesson_blocks = re.split(r"^=== ", before, flags=re.M)
        lessons = []
        for lb in lesson_blocks:
            lb = lb.strip()
            if not lb:
                continue
            meta, fields = parse_block("=== " + lb)
            if meta:
                lessons.append(lesson_from_fields(meta, fields))
        # questions: lines starting with EQ: in after
        after_body = after.split("\n", 1)[1] if "\n" in after else ""
        questions = []
        for line in after_body.splitlines():
            if line.startswith("EQ:"):
                questions.append(parse_ex("EQ", line[3:].strip()))
        units.append(U(slug, tuk, ten, lessons, exam_uk, exam_en, questions))
    return units
