"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import clsx from "clsx";
import type { CircuitDocument, CircuitAnalysis } from "@eduforge/shared";
import { CircuitEditor } from "@/components/circuit/circuit-editor";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";

type ProjectItem = {
  id: string;
  title: string;
  document: CircuitDocument;
  revision: number;
  updatedAt: string;
};

const TEMPLATES: Record<
  string,
  {
    titleUk: string;
    titleEn: string;
    doc: CircuitDocument;
    analysis: CircuitAnalysis;
  }
> = {
  divider: {
    titleUk: "Дільник напруги під навантаженням",
    titleEn: "Loaded Voltage Divider",
    analysis: {
      type: "tran",
      tran: { tStep: 1e-5, tStop: 2e-3 },
    },
    doc: {
      version: 1,
      title: "Loaded Voltage Divider",
      mode: "schematic",
      components: [
        { id: "V1", type: "vdc", value: "10V", x: 100, y: 150, rotation: 0, nodes: ["in", "0"] },
        { id: "R1", type: "resistor", value: "1k", x: 220, y: 100, rotation: 0, nodes: ["in", "mid"] },
        { id: "R2", type: "resistor", value: "1k", x: 340, y: 150, rotation: 90, nodes: ["mid", "0"] },
        { id: "RL", type: "resistor", value: "2.2k", x: 440, y: 150, rotation: 90, nodes: ["mid", "0"] },
        { id: "GND1", type: "ground", value: "0", x: 280, y: 260, rotation: 0, nodes: ["0"] },
      ],
      wires: [
        { id: "w1", from: { id: "V1", pin: "p" }, to: { id: "R1", pin: "1" }, net: "in" },
        { id: "w2", from: { id: "R1", pin: "2" }, to: { id: "R2", pin: "1" }, net: "mid" },
        { id: "w3", from: { id: "R2", pin: "1" }, to: { id: "RL", pin: "1" }, net: "mid" },
        { id: "w4", from: { id: "V1", pin: "n" }, to: { id: "GND1", pin: "gnd" }, net: "0" },
        { id: "w5", from: { id: "R2", pin: "2" }, to: { id: "GND1", pin: "gnd" }, net: "0" },
        { id: "w6", from: { id: "RL", pin: "2" }, to: { id: "GND1", pin: "gnd" }, net: "0" },
      ],
    },
  },
  rc_step: {
    titleUk: "Перехідний процес RC-кола (Крок)",
    titleEn: "RC Step Response Transient",
    analysis: {
      type: "tran",
      tran: { tStep: 5e-6, tStop: 5e-3 },
    },
    doc: {
      version: 1,
      title: "RC Step Response",
      mode: "schematic",
      components: [
        {
          id: "V1",
          type: "vpulse",
          value: "PULSE(0 5 0 1u 1u 10m 20m)",
          x: 100,
          y: 150,
          rotation: 0,
          nodes: ["in", "0"],
        },
        { id: "R1", type: "resistor", value: "1k", x: 220, y: 100, rotation: 0, nodes: ["in", "out"] },
        { id: "C1", type: "capacitor", value: "1u", x: 340, y: 150, rotation: 90, nodes: ["out", "0"] },
        { id: "GND1", type: "ground", value: "0", x: 220, y: 260, rotation: 0, nodes: ["0"] },
      ],
      wires: [
        { id: "w1", from: { id: "V1", pin: "p" }, to: { id: "R1", pin: "1" }, net: "in" },
        { id: "w2", from: { id: "R1", pin: "2" }, to: { id: "C1", pin: "1" }, net: "out" },
        { id: "w3", from: { id: "V1", pin: "n" }, to: { id: "GND1", pin: "gnd" }, net: "0" },
        { id: "w4", from: { id: "C1", pin: "2" }, to: { id: "GND1", pin: "gnd" }, net: "0" },
      ],
    },
  },
  rlc_resonance: {
    titleUk: "RLC-фільтр та резонансна характеристика",
    titleEn: "RLC Resonance Frequency Sweep",
    analysis: {
      type: "ac",
      ac: { variation: "dec", points: 40, fStart: 100, fStop: 1e6 },
    },
    doc: {
      version: 1,
      title: "RLC Bandpass Filter",
      mode: "schematic",
      components: [
        { id: "V1", type: "vac", value: "AC 1V", x: 100, y: 150, rotation: 0, nodes: ["in", "0"] },
        { id: "R1", type: "resistor", value: "50", x: 200, y: 100, rotation: 0, nodes: ["in", "nL"] },
        { id: "L1", type: "inductor", value: "1m", x: 300, y: 100, rotation: 0, nodes: ["nL", "out"] },
        { id: "C1", type: "capacitor", value: "100n", x: 400, y: 150, rotation: 90, nodes: ["out", "0"] },
        { id: "GND1", type: "ground", value: "0", x: 250, y: 260, rotation: 0, nodes: ["0"] },
      ],
      wires: [
        { id: "w1", from: { id: "V1", pin: "p" }, to: { id: "R1", pin: "1" }, net: "in" },
        { id: "w2", from: { id: "R1", pin: "2" }, to: { id: "L1", pin: "1" }, net: "nL" },
        { id: "w3", from: { id: "L1", pin: "2" }, to: { id: "C1", pin: "1" }, net: "out" },
        { id: "w4", from: { id: "V1", pin: "n" }, to: { id: "GND1", pin: "gnd" }, net: "0" },
        { id: "w5", from: { id: "C1", pin: "2" }, to: { id: "GND1", pin: "gnd" }, net: "0" },
      ],
    },
  },
  opamp_inv: {
    titleUk: "Інвертуючий підсилювач на ОП",
    titleEn: "Inverting Op-Amp Amplifier",
    analysis: {
      type: "tran",
      tran: { tStep: 1e-5, tStop: 4e-3 },
    },
    doc: {
      version: 1,
      title: "Inverting Op-Amp",
      mode: "schematic",
      components: [
        { id: "V1", type: "vac", value: "SIN(0 0.5 1k)", x: 80, y: 180, rotation: 0, nodes: ["in", "0"] },
        { id: "R1", type: "resistor", value: "10k", x: 180, y: 140, rotation: 0, nodes: ["in", "inv"] },
        { id: "RF", type: "resistor", value: "47k", x: 300, y: 80, rotation: 0, nodes: ["inv", "out"] },
        { id: "X1", type: "opamp", value: "OPAMP_IDEAL", x: 300, y: 180, rotation: 0, nodes: ["0", "inv", "out"] },
        { id: "GND1", type: "ground", value: "0", x: 180, y: 280, rotation: 0, nodes: ["0"] },
      ],
      wires: [
        { id: "w1", from: { id: "V1", pin: "p" }, to: { id: "R1", pin: "1" }, net: "in" },
        { id: "w2", from: { id: "R1", pin: "2" }, to: { id: "RF", pin: "1" }, net: "inv" },
        { id: "w3", from: { id: "RF", pin: "1" }, to: { id: "X1", pin: "in_minus" }, net: "inv" },
        { id: "w4", from: { id: "RF", pin: "2" }, to: { id: "X1", pin: "out" }, net: "out" },
        { id: "w5", from: { id: "X1", pin: "in_plus" }, to: { id: "GND1", pin: "gnd" }, net: "0" },
        { id: "w6", from: { id: "V1", pin: "n" }, to: { id: "GND1", pin: "gnd" }, net: "0" },
      ],
    },
  },
};

export function CircuitLabClient() {
  const { user } = useAuth();
  const { locale } = useLocale();

  const [currentDoc, setCurrentDoc] = useState<CircuitDocument>(TEMPLATES.divider!.doc);
  const [currentAnalysis, setCurrentAnalysis] = useState<CircuitAnalysis>(TEMPLATES.divider!.analysis);
  const [selectedTemplate, setSelectedTemplate] = useState("divider");

  // User saved projects list
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeRevision, setActiveRevision] = useState<number>(1);
  const [statusMsg, setStatusMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Load user projects
  const fetchProjects = useCallback(async () => {
    if (!user) return;
    try {
      const res = await api<{ ok: boolean; projects: ProjectItem[] }>("/circuits/projects");
      if (res.ok) {
        setProjects(res.projects);
      }
    } catch {
      // Ignore if unauthenticated or offline
    }
  }, [user]);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  const loadTemplate = (key: string) => {
    const tpl = TEMPLATES[key];
    if (!tpl) return;
    setSelectedTemplate(key);
    setActiveProjectId(null);
    setCurrentDoc(tpl.doc);
    setCurrentAnalysis(tpl.analysis);
    setStatusMsg({
      text: locale === "en" ? `Loaded template: ${tpl.titleEn}` : `Завантажено шаблон: ${tpl.titleUk}`,
    });
  };

  const loadUserProject = (p: ProjectItem) => {
    setActiveProjectId(p.id);
    setActiveRevision(p.revision);
    setCurrentDoc(p.document);
    setStatusMsg({
      text: locale === "en" ? `Loaded project: ${p.title}` : `Завантажено проєкт: ${p.title}`,
    });
  };

  const saveProject = async () => {
    if (!user) {
      setStatusMsg({
        text: locale === "en" ? "Log in to save circuit projects" : "Увійдіть в акаунт, щоб зберігати схеми",
        error: true,
      });
      return;
    }

    setIsSaving(true);
    setStatusMsg(null);

    try {
      if (activeProjectId) {
        // Update existing project
        const res = await api<{ ok: boolean; project: ProjectItem }>(
          `/circuits/projects/${activeProjectId}`,
          {
            method: "PATCH",
            body: {
              title: currentDoc.title || "Untitled Circuit",
              document: currentDoc,
              revision: activeRevision,
            },
          }
        );
        if (res.ok) {
          setActiveRevision(res.project.revision);
          setStatusMsg({
            text: locale === "en" ? "Project updated successfully!" : "Проєкт успішно оновлено!",
          });
          void fetchProjects();
        }
      } else {
        // Create new project
        const res = await api<{ ok: boolean; project: ProjectItem }>("/circuits/projects", {
          method: "POST",
          body: {
            title: currentDoc.title || "Untitled Circuit",
            document: currentDoc,
          },
        });
        if (res.ok) {
          setActiveProjectId(res.project.id);
          setActiveRevision(res.project.revision);
          setStatusMsg({
            text: locale === "en" ? "Project saved successfully!" : "Проєкт збережено в акаунт!",
          });
          void fetchProjects();
        }
      }
    } catch (err: any) {
      const errCode = err?.data?.error || err.message;
      setStatusMsg({
        text:
          errCode === "project_conflict"
            ? locale === "en"
              ? "Conflict: project was modified elsewhere. Please refresh."
              : "Конфлікт версій: проєкт змінено в іншій вкладці."
            : errCode === "limit_exceeded"
              ? locale === "en"
                ? "Limit of 100 projects reached"
                : "Досягнуто ліміт у 100 збережених проєктів"
              : `Помилка збереження: ${errCode}`,
        error: true,
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto px-4 py-6">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex flex-col gap-1">
          <Link
            href="/courses/electrical_engineering"
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 flex items-center gap-1.5 transition"
          >
            ← {locale === "en" ? "Back to Electrical Engineering" : "Назад до Електротехніки"}
          </Link>
          <h1 className="text-2xl font-black text-slate-100 flex items-center gap-2">
            <span>⚡ SPICE Лабораторія</span>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-800 text-cyan-300 font-mono font-medium">
              ngspice WASM
            </span>
          </h1>
          <p className="text-xs text-slate-400">
            {locale === "en"
              ? "Interactive circuit simulator with transient and AC Bode analysis, component library, and cloud saving."
              : "Інтерактивний симулятор електричних кіл: перехідні процеси, ЛАЧХ/ФЧХ Боде, бібліотека компонентів та хмарні проєкти."}
          </p>
        </div>

        {/* Templates & User Projects Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Template picker */}
          <select
            value={selectedTemplate}
            onChange={(e) => loadTemplate(e.target.value)}
            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-700 text-slate-200 focus:outline-none focus:border-cyan-500"
          >
            <option value="divider">
              {locale === "en" ? "Template: Voltage Divider" : "Шаблон: Дільник напруги"}
            </option>
            <option value="rc_step">
              {locale === "en" ? "Template: RC Step Response" : "Шаблон: RC-перехідний процес"}
            </option>
            <option value="rlc_resonance">
              {locale === "en" ? "Template: RLC Resonance" : "Шаблон: RLC-резонанс"}
            </option>
            <option value="opamp_inv">
              {locale === "en" ? "Template: Op-Amp Inverting" : "Шаблон: ОП-підсилювач"}
            </option>
          </select>

          {/* User Projects picker if logged in */}
          {projects.length > 0 && (
            <select
              value={activeProjectId ?? ""}
              onChange={(e) => {
                const found = projects.find((p) => p.id === e.target.value);
                if (found) loadUserProject(found);
              }}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900 border border-slate-700 text-cyan-300 focus:outline-none focus:border-cyan-500"
            >
              <option value="">
                {locale === "en" ? "📂 My Projects..." : "📂 Мої збережені проєкти..."}
              </option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title} (v{p.revision})
                </option>
              ))}
            </select>
          )}

          {/* Save Button */}
          <button
            type="button"
            onClick={saveProject}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white transition disabled:opacity-50 shadow-sm"
          >
            {isSaving ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
            )}
            {activeProjectId
              ? locale === "en"
                ? "Update Project"
                : "Оновити проєкт"
              : locale === "en"
                ? "Save to Account"
                : "Зберегти в акаунт"}
          </button>
        </div>
      </div>

      {/* Notification status message */}
      {statusMsg && (
        <div
          className={clsx(
            "p-3 rounded-xl border text-xs font-medium flex items-center justify-between",
            statusMsg.error
              ? "bg-red-950/40 border-red-800 text-red-300"
              : "bg-cyan-950/40 border-cyan-800 text-cyan-300"
          )}
        >
          <span>{statusMsg.text}</span>
          <button
            type="button"
            onClick={() => setStatusMsg(null)}
            className="text-slate-400 hover:text-slate-200"
          >
            ✕
          </button>
        </div>
      )}

      {/* Full-featured Circuit Editor Island */}
      <CircuitEditor
        key={`${activeProjectId ?? selectedTemplate}-${currentDoc.version}`}
        initialDoc={currentDoc}
        onChange={setCurrentDoc}
        initialAnalysis={currentAnalysis}
      />
    </div>
  );
}
