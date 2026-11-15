"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
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
  document?: CircuitDocument;
  revision: number;
  updatedAt: string;
};

type StoredProject = ProjectItem & { document: CircuitDocument };

const DRAFT_KEY = "eduforge.circuit.draft.v2";

type LocalDraft = {
  document: CircuitDocument;
  projectId: string | null;
  revision: number;
  savedAt: string;
};

function readDraft(): LocalDraft | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(DRAFT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LocalDraft;
    if (!parsed?.document || parsed.document.version == null) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeDraft(draft: LocalDraft) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

function downloadJson(circuit: CircuitDocument) {
  const file = new Blob([JSON.stringify(circuit, null, 2)], { type: "application/json" });
  const link = window.document.createElement("a");
  link.href = URL.createObjectURL(file);
  link.download = `${circuit.title?.replace(/\s+/g, "_") || "circuit"}.json`;
  window.document.body.appendChild(link);
  link.click();
  window.document.body.removeChild(link);
}

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
      version: 2,
      title: "Loaded Voltage Divider",
      mode: "schematic",
      junctions: [],
      components: [
        { id: "V1", type: "dc_voltage", value: "10", x: 100, y: 150, rotation: 0, nodes: [] },
        { id: "R1", type: "resistor", value: "1k", x: 220, y: 100, rotation: 0, nodes: [] },
        { id: "R2", type: "resistor", value: "1k", x: 340, y: 150, rotation: 90, nodes: [] },
        { id: "RL", type: "resistor", value: "2.2k", x: 440, y: 150, rotation: 90, nodes: [] },
        { id: "GND1", type: "ground", value: "0", x: 280, y: 260, rotation: 0, nodes: [] },
      ],
      wires: [
        { id: "w1", from: { id: "V1", pin: "1" }, to: { id: "R1", pin: "1" }, net: "in" },
        { id: "w2", from: { id: "R1", pin: "2" }, to: { id: "R2", pin: "1" }, net: "mid" },
        { id: "w3", from: { id: "R2", pin: "1" }, to: { id: "RL", pin: "1" }, net: "mid" },
        { id: "w4", from: { id: "V1", pin: "2" }, to: { id: "GND1", pin: "1" }, net: "0" },
        { id: "w5", from: { id: "R2", pin: "2" }, to: { id: "GND1", pin: "1" }, net: "0" },
        { id: "w6", from: { id: "RL", pin: "2" }, to: { id: "GND1", pin: "1" }, net: "0" },
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
      version: 2,
      title: "RC Step Response",
      mode: "schematic",
      junctions: [],
      components: [
        { id: "V1", type: "pulse_voltage", value: "PULSE(0 5 0 1u 1u 1m 2m)", x: 100, y: 150, rotation: 0, nodes: [] },
        { id: "R1", type: "resistor", value: "1k", x: 220, y: 100, rotation: 0, nodes: [] },
        { id: "C1", type: "capacitor", value: "1u", x: 340, y: 150, rotation: 90, nodes: [] },
        { id: "GND1", type: "ground", value: "0", x: 220, y: 260, rotation: 0, nodes: [] },
      ],
      wires: [
        { id: "w1", from: { id: "V1", pin: "1" }, to: { id: "R1", pin: "1" }, net: "in" },
        { id: "w2", from: { id: "R1", pin: "2" }, to: { id: "C1", pin: "1" }, net: "out" },
        { id: "w3", from: { id: "V1", pin: "2" }, to: { id: "GND1", pin: "1" }, net: "0" },
        { id: "w4", from: { id: "C1", pin: "2" }, to: { id: "GND1", pin: "1" }, net: "0" },
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
      version: 2,
      title: "RLC Bandpass Filter",
      mode: "schematic",
      junctions: [],
      components: [
        { id: "V1", type: "ac_voltage", value: "AC 1", x: 100, y: 150, rotation: 0, nodes: [] },
        { id: "R1", type: "resistor", value: "50", x: 200, y: 100, rotation: 0, nodes: [] },
        { id: "L1", type: "inductor", value: "1m", x: 300, y: 100, rotation: 0, nodes: [] },
        { id: "C1", type: "capacitor", value: "100n", x: 400, y: 150, rotation: 90, nodes: [] },
        { id: "GND1", type: "ground", value: "0", x: 250, y: 260, rotation: 0, nodes: [] },
      ],
      wires: [
        { id: "w1", from: { id: "V1", pin: "1" }, to: { id: "R1", pin: "1" }, net: "in" },
        { id: "w2", from: { id: "R1", pin: "2" }, to: { id: "L1", pin: "1" }, net: "nL" },
        { id: "w3", from: { id: "L1", pin: "2" }, to: { id: "C1", pin: "1" }, net: "out" },
        { id: "w4", from: { id: "V1", pin: "2" }, to: { id: "GND1", pin: "1" }, net: "0" },
        { id: "w5", from: { id: "C1", pin: "2" }, to: { id: "GND1", pin: "1" }, net: "0" },
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
      version: 2,
      title: "Inverting Op-Amp",
      mode: "schematic",
      junctions: [],
      components: [
        { id: "V1", type: "sine_voltage", value: "SIN(0 0.5 1k)", x: 80, y: 180, rotation: 0, nodes: [] },
        { id: "R1", type: "resistor", value: "10k", x: 180, y: 140, rotation: 0, nodes: [] },
        { id: "RF", type: "resistor", value: "47k", x: 300, y: 80, rotation: 0, nodes: [] },
        { id: "X1", type: "opamp", value: "OPAMP_IDEAL", x: 300, y: 180, rotation: 0, nodes: [] },
        { id: "GND1", type: "ground", value: "0", x: 180, y: 280, rotation: 0, nodes: [] },
      ],
      wires: [
        { id: "w1", from: { id: "V1", pin: "1" }, to: { id: "R1", pin: "1" }, net: "in" },
        { id: "w2", from: { id: "R1", pin: "2" }, to: { id: "RF", pin: "1" }, net: "inv" },
        { id: "w3", from: { id: "RF", pin: "1" }, to: { id: "X1", pin: "2" }, net: "inv" },
        { id: "w4", from: { id: "RF", pin: "2" }, to: { id: "X1", pin: "3" }, net: "out" },
        { id: "w5", from: { id: "X1", pin: "1" }, to: { id: "GND1", pin: "1" }, net: "0" },
        { id: "w6", from: { id: "V1", pin: "2" }, to: { id: "GND1", pin: "1" }, net: "0" },
      ],
    },
  },
};

export function CircuitLabClient() {
  const { user } = useAuth();
  const { locale, t } = useLocale();

  const [currentDoc, setCurrentDoc] = useState<CircuitDocument>(TEMPLATES.divider!.doc);
  const [currentAnalysis, setCurrentAnalysis] = useState<CircuitAnalysis>(TEMPLATES.divider!.analysis);
  const [selectedTemplate, setSelectedTemplate] = useState("divider");

  // User saved projects list
  const [projects, setProjects] = useState<ProjectItem[]>([]);
  const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
  const [activeRevision, setActiveRevision] = useState<number>(1);
  const [statusMsg, setStatusMsg] = useState<{ text: string; error?: boolean } | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [conflict, setConflict] = useState(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savingRef = useRef(false);

  const rememberDraft = useCallback((document: CircuitDocument, projectId: string | null, revision: number) => {
    writeDraft({ document, projectId, revision, savedAt: new Date().toISOString() });
  }, []);

  const fetchProjects = useCallback(async () => {
    if (!user) return;
    try {
      const res = await api<{ projects: ProjectItem[] }>("/circuits/projects");
      setProjects(res.projects ?? []);
    } catch {
      // Offline or signed out: the local draft remains.
    }
  }, [user]);

  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    const draft = readDraft();
    if (!draft) return;
    setCurrentDoc(draft.document);
    setActiveProjectId(draft.projectId);
    setActiveRevision(draft.revision || 1);
    if (draft.document.analysis) setCurrentAnalysis(draft.document.analysis);
    setStatusMsg({ text: t.circuitLab.draftRestored });
  }, [t.circuitLab.draftRestored]);

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

  const applyStored = (project: StoredProject) => {
    setConflict(false);
    setActiveProjectId(project.id);
    setActiveRevision(project.revision);
    setCurrentDoc(project.document);
    if (project.document.analysis) setCurrentAnalysis(project.document.analysis);
    rememberDraft(project.document, project.id, project.revision);
    setStatusMsg({
      text: locale === "en" ? `Loaded project: ${project.title}` : `Завантажено проєкт: ${project.title}`,
    });
  };

  const loadUserProject = async (id: string) => {
    try {
      const res = await api<{ project: StoredProject }>(`/circuits/projects/${id}`);
      if (res.project?.document) applyStored(res.project);
    } catch (err: unknown) {
      const code = (err as { data?: { error?: string }; message?: string })?.data?.error;
      setStatusMsg({
        text: code === "offline" || code === "network_error" ? t.circuitLab.offlineDraft : t.circuitLab.conflictError,
        error: true,
      });
    }
  };

  const payloadDocument = (): CircuitDocument => ({
    ...currentDoc,
    version: 2,
    junctions: currentDoc.junctions ?? [],
    analysis: currentAnalysis,
  });

  const saveProject = async () => {
    const document = payloadDocument();
    rememberDraft(document, activeProjectId, activeRevision);
    if (!user) {
      setStatusMsg({
        text: locale === "en" ? "Log in to save circuit projects" : "Увійдіть в акаунт, щоб зберігати схеми",
        error: true,
      });
      return;
    }

    if (savingRef.current) return;
    savingRef.current = true;
    setIsSaving(true);
    setStatusMsg(null);

    try {
      if (activeProjectId) {
        const res = await api<{ project: StoredProject }>(`/circuits/projects/${activeProjectId}`, {
          method: "PATCH",
          body: {
            title: document.title || "Untitled Circuit",
            document,
            expectedRevision: activeRevision,
          },
        });
        setActiveRevision(res.project.revision);
        setConflict(false);
        setStatusMsg({ text: t.circuitLab.projectSaved });
        void fetchProjects();
      } else {
        const res = await api<{ project: StoredProject }>("/circuits/projects", {
          method: "POST",
          body: {
            title: document.title || "Untitled Circuit",
            document,
          },
        });
        setActiveProjectId(res.project.id);
        setActiveRevision(res.project.revision);
        setStatusMsg({ text: t.circuitLab.projectSaved });
        void fetchProjects();
      }
    } catch (err: unknown) {
      const data = (err as { data?: { error?: string }; message?: string }) ?? {};
      const errCode = data.data?.error || data.message;
      if (errCode === "project_conflict") setConflict(true);
      if (errCode === "offline" || errCode === "network_error") {
        setStatusMsg({ text: t.circuitLab.offlineDraft, error: true });
      } else {
        setStatusMsg({
          text:
            errCode === "project_conflict"
              ? t.circuitLab.conflictError
              : errCode === "project_limit_reached"
                ? locale === "en"
                  ? "Limit of 100 projects reached"
                  : "Досягнуто ліміт у 100 збережених проєктів"
                : `Помилка збереження: ${errCode}`,
          error: true,
        });
      }
    } finally {
      savingRef.current = false;
      setIsSaving(false);
    }
  };

  useEffect(() => {
    rememberDraft(payloadDocument(), activeProjectId, activeRevision);
    if (!user || !activeProjectId) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void saveProject();
    }, 2000);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
    // Autosave follows the document. saveProject closes over the latest state.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentDoc, currentAnalysis, user, activeProjectId]);

  const loadServerVersion = async () => {
    if (!activeProjectId) return;
    await loadUserProject(activeProjectId);
  };

  const deleteProject = async () => {
    if (!user || !activeProjectId) return;
    try {
      await api(`/circuits/projects/${activeProjectId}`, { method: "DELETE" });
      setActiveProjectId(null);
      setActiveRevision(1);
      setConflict(false);
      setStatusMsg({ text: t.circuitLab.projectDeleted });
      void fetchProjects();
    } catch (err: unknown) {
      const code = (err as { data?: { error?: string } })?.data?.error ?? "request_failed";
      setStatusMsg({ text: code, error: true });
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
                if (e.target.value) void loadUserProject(e.target.value);
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
            {activeProjectId ? t.circuitLab.saveProject : t.circuitLab.newProject}
          </button>
          {activeProjectId && (
            <button
              type="button"
              onClick={() => void deleteProject()}
              className="px-3 py-1.5 text-xs font-bold rounded-lg border border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              {t.circuitLab.deleteProject}
            </button>
          )}
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
      {conflict && (
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary !py-1.5 text-xs" onClick={() => void loadServerVersion()}>
            {t.circuitLab.loadServer}
          </button>
          <button type="button" className="btn-secondary !py-1.5 text-xs" onClick={() => setConflict(false)}>
            {t.circuitLab.keepLocal}
          </button>
          <button type="button" className="btn-secondary !py-1.5 text-xs" onClick={() => downloadJson(payloadDocument())}>
            {t.circuitLab.exportLocal}
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
