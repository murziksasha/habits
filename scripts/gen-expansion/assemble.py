
from __future__ import annotations
import json
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).parent))
from lib import write_expansion, write_full_course, COURSES_OUT
from store import STORE, counts

# Maps course key -> (expansion filename, expand fn) or full course meta
EXPAND = {
    "js_fundamentals": ("js-fundamentals-exp.ts", "expandJsFundamentals"),
    "typescript": ("typescript-exp.ts", "expandTypescript"),
    "react_fundamentals": ("react-fundamentals-exp.ts", "expandReactFundamentals"),
    "node_fundamentals": ("node-fundamentals-exp.ts", "expandNodeFundamentals"),
    "express_fundamentals": ("express-fundamentals-exp.ts", "expandExpressFundamentals"),
    "html_semantics": ("html-semantics-exp.ts", "expandHtmlSemantics"),
    "css_layout": ("css-layout-exp.ts", "expandCssLayout"),
    "qa_theory": ("qa-theory-exp.ts", "expandQaTheory"),
    "programming": ("programming-exp.ts", "expandProgramming"),
    "sql_fundamentals": ("sql-fundamentals-exp.ts", "expandSqlFundamentals"),
    "embedded_cpp": ("embedded-cpp-exp.ts", "expandEmbeddedCpp"),
    "english": ("english-exp.ts", "expandEnglish"),
    "chess": ("chess-exp.ts", "expandChess"),
    "typing": ("typing-exp.ts", "expandTyping"),
    "speed_reading": ("speed-reading-exp.ts", "expandSpeedReading"),
    "logic": ("logic-exp.ts", "expandLogic"),
    "sysadmin": ("sysadmin-exp.ts", "expandSysadmin"),
    "devops": ("devops-exp.ts", "expandDevops", "data-plane"),
    "software_testing": ("software-testing-exp.ts", "expandSoftwareTesting"),
    "postgresql_apps": ("postgresql-apps-exp.ts", "expandPostgresqlApps"),
    "git_workflows": ("git-workflows-exp.ts", "expandGitWorkflows"),
    "web_security": ("web-security-exp.ts", "expandWebSecurity"),
    "ai_development": ("ai-development-exp.ts", "expandAiDevelopment"),
    "python_for_ai": ("python-for-ai-exp.ts", "expandPythonForAi"),
    "agentic_systems": ("agentic-systems-exp.ts", "expandAgenticSystems"),
    "llmops": ("llmops-exp.ts", "expandLlmops"),
    "ai_security": ("ai-security-exp.ts", "expandAiSecurity"),
    "ai_product": ("ai-product-exp.ts", "expandAiProduct"),
    "nextjs_fullstack": ("nextjs-fullstack-exp.ts", "expandNextjsFullstack"),
    "applied_algorithms": ("applied-algorithms-exp.ts", "expandAppliedAlgorithms"),
}

NEW_META = {
    "python_fundamentals": dict(export="pythonFundamentalsContent", file="python-fundamentals.ts", title_uk="Python: основи", title_en="Python Fundamentals", desc_uk="Типи, функції, колекції, модулі, помилки та класи — практичний курс Python українською та англійською.", desc_en="Types, functions, collections, modules, errors and classes — a practical Python course in Ukrainian and English.", icon="🐍", color="#3776AB"),
    "go_fundamentals": dict(export="goFundamentalsContent", file="go-fundamentals.ts", title_uk="Go: основи", title_en="Go Fundamentals", desc_uk="Пакети, типи, зрізи, інтерфейси, горутини та тестування — глибокий старт у Go.", desc_en="Packages, types, slices, interfaces, goroutines and testing — a solid start in Go.", icon="🐹", color="#00ADD8"),
    "web_accessibility": dict(export="webAccessibilityContent", file="web-accessibility.ts", title_uk="Веб-доступність (WCAG)", title_en="Web Accessibility (WCAG)", desc_uk="Принципи POUR, клавіатура, ARIA, контраст і перевірка доступності за WCAG 2.2.", desc_en="POUR principles, keyboard, ARIA, contrast and accessibility testing against WCAG 2.2.", icon="♿", color="#0F766E"),
    "rest_api_design": dict(export="restApiDesignContent", file="rest-api-design.ts", title_uk="Дизайн REST API", title_en="REST API Design", desc_uk="Ресурси, методи HTTP, статус-коди, ідемпотентність, версіонування та помилки API.", desc_en="Resources, HTTP methods, status codes, idempotency, versioning and API errors.", icon="🔗", color="#EA580C"),
    "frontend_performance": dict(export="frontendPerformanceContent", file="frontend-performance.ts", title_uk="Продуктивність фронтенду", title_en="Frontend Performance", desc_uk="Критичний шлях, рендер, бандли, зображення, кеш і Core Web Vitals (LCP, INP, CLS).", desc_en="Critical path, rendering, bundles, images, caching and Core Web Vitals (LCP, INP, CLS).", icon="⚡", color="#CA8A04"),
}

def main():
    data = json.loads(STORE.read_text(encoding="utf-8")) if STORE.exists() else {}
    results = {}
    for course, payload in data.items():
        units = payload.get("units") or []
        insertions = payload.get("insertions") or {}
        if course in EXPAND:
            entry = EXPAND[course]
            fn, expand = entry[0], entry[1]
            before = entry[2] if len(entry) > 2 else None
            results[course] = write_expansion(fn, expand, units, insertions, before)
        elif course in NEW_META:
            meta = NEW_META[course]
            n = write_full_course(
                COURSES_OUT / meta["file"],
                meta["export"],
                course,
                meta["title_uk"],
                meta["title_en"],
                meta["desc_uk"],
                meta["desc_en"],
                meta["icon"],
                meta["color"],
                units,
            )
            results[course] = {"file": meta["file"], "lessons": n}
        else:
            raise SystemExit(f"unknown course {course}")
    print(json.dumps({"results": results, "counts": counts()}, ensure_ascii=False, indent=2))

if __name__ == "__main__":
    main()
