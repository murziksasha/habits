"use client";

import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import clsx from "clsx";
import type {
  CircuitDocument,
  CircuitComponent,
  CircuitWire,
  CircuitAnalysis,
  CircuitCriterion,
} from "@eduforge/shared";
import type { RunSimOutput } from "@eduforge/circuit-engine";
import { COMPONENT_REGISTRY, type ComponentDef } from "./circuit-symbols";
import { CircuitWaveformChart } from "./circuit-waveform-chart";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import { useLocale } from "@/lib/locale-context";

export type CircuitEditorProps = {
  initialDoc?: CircuitDocument;
  onChange?: (doc: CircuitDocument) => void;
  readOnly?: boolean;
  initialAnalysis?: CircuitAnalysis;
  onSimulationResult?: (res: RunSimOutput) => void;
  criteria?: CircuitCriterion[];
  evaluationResult?: {
    passed: boolean;
    criteriaResults: Array<{
      criterion: CircuitCriterion;
      passed: boolean;
      actualValue?: number;
      targetValue?: number;
      message?: string;
    }>;
  };
  showWaveforms?: boolean;
  className?: string;
};

const GRID_SIZE = 20;

function snap(val: number): number {
  return Math.round(val / GRID_SIZE) * GRID_SIZE;
}

export function CircuitEditor({
  initialDoc,
  onChange,
  readOnly = false,
  initialAnalysis,
  onSimulationResult,
  criteria,
  evaluationResult,
  showWaveforms = true,
  className,
}: CircuitEditorProps) {
  // Document state
  const { t } = useLocale();
  const { user } = useAuth();
  const workerRef = useRef<Worker | null>(null);
  const runSeq = useRef(0);
  const [doc, setDoc] = useState<CircuitDocument>(
    initialDoc ?? {
      version: 2,
      title: "New Circuit",
      components: [],
      wires: [],
      junctions: [],
      mode: "schematic",
    }
  );

  const [mode, setMode] = useState<"schematic" | "netlist">(doc.mode ?? "schematic");
  const [netlistText, setNetlistText] = useState<string>(doc.netlist ?? "");

  // Analysis state
  const [analysis, setAnalysis] = useState<CircuitAnalysis>(
    initialAnalysis ??
      initialDoc?.analysis ?? {
        type: "tran",
        tran: { tStep: 1e-5, tStop: 5e-3 },
      }
  );

  // Interaction state
  const [selectedCompId, setSelectedCompId] = useState<string | null>(null);
  const [selectedWireId, setSelectedWireId] = useState<string | null>(null);
  const [wiringFrom, setWiringFrom] = useState<{
    id: string;
    pin: string;
    x: number;
    y: number;
  } | null>(null);

  // Dragging state
  const [draggingCompId, setDraggingCompId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Simulation execution state
  const [isSimulating, setIsSimulating] = useState(false);
  const [simResult, setSimResult] = useState<RunSimOutput | null>(null);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  const canvasRef = useRef<SVGSVGElement | null>(null);
  const docRef = useRef(doc);
  docRef.current = doc;
  const pastRef = useRef<CircuitDocument[]>([]);
  const futureRef = useRef<CircuitDocument[]>([]);
  const skipHistoryRef = useRef(false);
  const dragBeforeRef = useRef<CircuitDocument | null>(null);
  const [view, setView] = useState({ x: 0, y: 0, w: 800, h: 500 });
  const viewRef = useRef(view);
  viewRef.current = view;
  const panRef = useRef<{ x: number; y: number; w: number; h: number; px: number; py: number } | null>(null);

  const clientToSvg = useCallback((clientX: number, clientY: number) => {
    const svg = canvasRef.current;
    const box = viewRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const width = rect.width || 1;
    const height = rect.height || 1;
    return {
      x: box.x + ((clientX - rect.left) / width) * box.w,
      y: box.y + ((clientY - rect.top) / height) * box.h,
    };
  }, []);

  // Sync to parent onChange
  const updateDoc = useCallback(
    (updater: (prev: CircuitDocument) => CircuitDocument) => {
      setDoc((prev) => {
        const next = updater(prev);
        if (!skipHistoryRef.current) {
          pastRef.current = [...pastRef.current, prev].slice(-80);
          futureRef.current = [];
        }
        if (onChange) onChange(next);
        return next;
      });
    },
    [onChange]
  );

  const applyDoc = useCallback(
    (next: CircuitDocument) => {
      setDoc(next);
      if (onChange) onChange(next);
    },
    [onChange],
  );

  const undoDoc = useCallback(() => {
    const prev = pastRef.current.pop();
    if (!prev) return;
    futureRef.current.push(docRef.current);
    applyDoc(prev);
  }, [applyDoc]);

  const redoDoc = useCallback(() => {
    const next = futureRef.current.pop();
    if (!next) return;
    pastRef.current.push(docRef.current);
    applyDoc(next);
  }, [applyDoc]);

  const zoomBy = useCallback((factor: number) => {
    setView((current) => ({
      ...current,
      w: Math.min(3200, Math.max(200, current.w * factor)),
      h: Math.min(2000, Math.max(125, current.h * factor)),
    }));
  }, []);

  // Palette components to choose from
  const paletteKeys = useMemo(
    () => [
      "resistor",
      "capacitor",
      "inductor",
      "vdc",
      "vac",
      "vpulse",
      "diode",
      "zener",
      "led",
      "bjt_npn",
      "nmos",
      "opamp",
      "ground",
      "switch",
    ],
    []
  );

  // Check if Ground is present
  const hasGround = useMemo(() => {
    return (
      doc.components.some(
        (c) => c.type === "ground" || c.nodes.includes("0") || c.nodes.includes("gnd")
      ) ||
      doc.wires.some((w) => w.net === "0" || w.net === "gnd") ||
      (mode === "netlist" && /\b0\b/.test(netlistText))
    );
  }, [doc.components, doc.wires, mode, netlistText]);

  // Add component to canvas
  const handleAddComponent = (type: string) => {
    if (readOnly) return;
    const def = COMPONENT_REGISTRY[type];
    if (!def) return;

    // Generate unique ID
    const count = doc.components.filter((c) => c.type === type).length + 1;
    const id = `${def.defaultPrefix}${count}`;

    const newComp: CircuitComponent = {
      id,
      type,
      value: def.defaultValue,
      x: snap(120 + ((doc.components.length * 40) % 300)),
      y: snap(100 + ((doc.components.length * 30) % 200)),
      rotation: 0,
      nodes: def.pins.map((p) => `${id}_${p.name}`),
    };

    updateDoc((prev) => ({
      ...prev,
      components: [...prev.components, newComp],
    }));
    setSelectedCompId(id);
    setSelectedWireId(null);
  };

  // Rotate selected component
  const handleRotateSelected = useCallback(() => {
    if (!selectedCompId || readOnly) return;
    updateDoc((prev) => ({
      ...prev,
      components: prev.components.map((c) => {
        if (c.id !== selectedCompId) return c;
        const nextRot = ((c.rotation + 90) % 360) as 0 | 90 | 180 | 270;
        return { ...c, rotation: nextRot };
      }),
    }));
  }, [selectedCompId, readOnly, updateDoc]);

  // Delete selected component or wire
  const handleDeleteSelected = useCallback(() => {
    if (readOnly) return;
    if (selectedCompId) {
      updateDoc((prev) => ({
        ...prev,
        components: prev.components.filter((c) => c.id !== selectedCompId),
        wires: prev.wires.filter(
          (w) =>
            !("id" in w.from && w.from.id === selectedCompId) &&
            !("id" in w.to && w.to.id === selectedCompId)
        ),
      }));
      setSelectedCompId(null);
    } else if (selectedWireId) {
      updateDoc((prev) => ({
        ...prev,
        wires: prev.wires.filter((w) => w.id !== selectedWireId),
      }));
      setSelectedWireId(null);
    }
  }, [selectedCompId, selectedWireId, readOnly, updateDoc]);

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redoDoc();
        else undoDoc();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "y") {
        e.preventDefault();
        redoDoc();
      } else if (e.key === "r" || e.key === "R") {
        e.preventDefault();
        handleRotateSelected();
      } else if (e.key === "Delete" || e.key === "Backspace") {
        e.preventDefault();
        handleDeleteSelected();
      } else if (e.key === "+" || e.key === "=") {
        zoomBy(0.8);
      } else if (e.key === "-" || e.key === "_") {
        zoomBy(1.25);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleRotateSelected, handleDeleteSelected, undoDoc, redoDoc, zoomBy]);

  // Pin absolute position calculation
  const getPinAbsolutePos = useCallback(
    (comp: CircuitComponent, pinDef: { x: number; y: number }) => {
      const def = COMPONENT_REGISTRY[comp.type];
      const cx = (def?.width ?? 60) / 2;
      const cy = (def?.height ?? 30) / 2;

      let dx = pinDef.x - cx;
      let dy = pinDef.y - cy;

      const rot = comp.rotation;
      if (rot === 90) {
        const tmp = dx;
        dx = -dy;
        dy = tmp;
      } else if (rot === 180) {
        dx = -dx;
        dy = -dy;
      } else if (rot === 270) {
        const tmp = dx;
        dx = dy;
        dy = -tmp;
      }

      return {
        x: comp.x + cx + dx,
        y: comp.y + cy + dy,
      };
    },
    []
  );

  // Pin click handler for wire creation
  const handlePinClick = (comp: CircuitComponent, pinName: string, pinDef: { x: number; y: number }) => {
    if (readOnly) return;
    const absPos = getPinAbsolutePos(comp, pinDef);

    if (!wiringFrom) {
      // Start wiring
      setWiringFrom({
        id: comp.id,
        pin: pinName,
        x: absPos.x,
        y: absPos.y,
      });
    } else {
      // Complete wire
      if (wiringFrom.id === comp.id && wiringFrom.pin === pinName) {
        setWiringFrom(null);
        return;
      }

      const newWire: CircuitWire = {
        id: `W_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
        from: { id: wiringFrom.id, pin: wiringFrom.pin },
        to: { id: comp.id, pin: pinName },
      };

      // Assign shared net name if possible
      updateDoc((prev) => {
        // Find existing net or create new net name
        const netName =
          comp.type === "ground" || wiringFrom.id.startsWith("GND")
            ? "0"
            : `N_${comp.id}_${pinName}`;
        newWire.net = netName;

        return {
          ...prev,
          wires: [...prev.wires, newWire],
        };
      });

      setWiringFrom(null);
    }
  };

  // Canvas mouse handlers for dragging components
  const handleCanvasMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.target === canvasRef.current) {
      setSelectedCompId(null);
      setSelectedWireId(null);
      setWiringFrom(null);
    }
  };

  const handleComponentPointerDown = (e: React.PointerEvent, comp: CircuitComponent) => {
    if (readOnly) return;
    e.stopPropagation();
    setSelectedCompId(comp.id);
    setSelectedWireId(null);
    setDraggingCompId(comp.id);
    dragBeforeRef.current = docRef.current;
    skipHistoryRef.current = true;
    const point = clientToSvg(e.clientX, e.clientY);
    setDragOffset({ x: point.x - comp.x, y: point.y - comp.y });
  };

  const handleCanvasPointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (panRef.current && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const start = panRef.current;
      const dx = ((e.clientX - start.px) / (rect.width || 1)) * start.w;
      const dy = ((e.clientY - start.py) / (rect.height || 1)) * start.h;
      setView({ x: start.x - dx, y: start.y - dy, w: start.w, h: start.h });
      return;
    }
    if (!draggingCompId || readOnly) return;
    const point = clientToSvg(e.clientX, e.clientY);
    const newX = snap(point.x - dragOffset.x);
    const newY = snap(point.y - dragOffset.y);
    updateDoc((prev) => ({
      ...prev,
      components: prev.components.map((c) =>
        c.id === draggingCompId ? { ...c, x: Math.max(0, newX), y: Math.max(0, newY) } : c
      ),
    }));
  };

  const handleCanvasPointerUp = () => {
    if (dragBeforeRef.current) {
      pastRef.current = [...pastRef.current, dragBeforeRef.current].slice(-80);
      futureRef.current = [];
      dragBeforeRef.current = null;
    }
    skipHistoryRef.current = false;
    panRef.current = null;
    setDraggingCompId(null);
  };

  const handleCanvasPointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (e.target === canvasRef.current) {
      setSelectedCompId(null);
      setSelectedWireId(null);
      setWiringFrom(null);
      const box = viewRef.current;
      panRef.current = { x: box.x, y: box.y, w: box.w, h: box.h, px: e.clientX, py: e.clientY };
    }
  };

  const applyAnalysis = (next: CircuitAnalysis) => {
    setAnalysis(next);
    updateDoc((prev) => ({ ...prev, analysis: next }));
  };

  useEffect(() => {
    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const stopPreview = () => {
    runSeq.current += 1;
    workerRef.current?.terminate();
    workerRef.current = null;
    setIsSimulating(false);
  };

  // Authenticated preview uses the server. Guests stay in a worker that cancel can kill.
  const handleRunSimulation = async () => {
    stopPreview();
    const seq = runSeq.current;
    setIsSimulating(true);
    setSimResult(null);
    const circuit = mode === "schematic" ? { ...doc, analysis } : netlistText;
    const payload = { circuit, analysis };

    const accept = (result: RunSimOutput) => {
      if (seq !== runSeq.current) return;
      setSimResult(result);
      if (onSimulationResult) onSimulationResult(result);
    };

    try {
      if (user) {
        const res = await api<{ ok: boolean; result?: RunSimOutput; error?: string }>("/circuits/simulate", {
          method: "POST",
          body: payload,
        });
        accept(
          res.result ?? {
            ok: false,
            dataType: "real",
            variableNames: [],
            numPoints: 0,
            data: [],
            error: res.error || "Simulation error",
          },
        );
      } else {
        const worker = new Worker(new URL("./spice-preview-worker.ts", import.meta.url));
        workerRef.current = worker;
        const result = await new Promise<RunSimOutput>((resolve, reject) => {
          const watch = window.setInterval(() => {
            if (seq !== runSeq.current) {
              window.clearInterval(watch);
              reject(new Error("cancelled"));
            }
          }, 100);
          worker.onmessage = (event: MessageEvent<{ result: RunSimOutput }>) => {
            window.clearInterval(watch);
            resolve(event.data.result);
          };
          worker.onerror = () => {
            window.clearInterval(watch);
            reject(new Error("circuit_engine_unavailable"));
          };
          worker.postMessage(payload);
        });
        worker.terminate();
        if (workerRef.current === worker) workerRef.current = null;
        accept(result);
      }
    } catch (err: unknown) {
      if (seq !== runSeq.current) return;
      const data = (err as { data?: { error?: string }; message?: string }) ?? {};
      accept({
        ok: false,
        dataType: "real",
        variableNames: [],
        numPoints: 0,
        data: [],
        error: data.data?.error || data.message || "circuit_engine_unavailable",
      });
    } finally {
      if (seq === runSeq.current) setIsSimulating(false);
    }
  };

  // Export handlers
  const handleExportNetlist = () => {
    const element = document.createElement("a");
    const file = new Blob([netlistText || "* EduForge SPICE Circuit\n"], {
      type: "text/plain",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title?.replace(/\s+/g, "_") || "circuit"}.cir`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleExportJson = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(doc, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = `${doc.title?.replace(/\s+/g, "_") || "circuit"}.json`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Selected component reference
  const selectedComp = doc.components.find((c) => c.id === selectedCompId);

  return (
    <div className={clsx("flex flex-col gap-4 w-full", className)}>
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2">
          {/* Schematic vs Netlist Toggle */}
          <div className="inline-flex rounded-lg border border-slate-700/80 p-0.5 bg-slate-950">
            <button
              type="button"
              onClick={() => {
                setMode("schematic");
                updateDoc((prev) => ({ ...prev, mode: "schematic" }));
              }}
              className={clsx(
                "px-3 py-1.5 text-xs font-semibold rounded-md transition",
                mode === "schematic"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              Схема (GUI)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("netlist");
                updateDoc((prev) => ({ ...prev, mode: "netlist", netlist: netlistText }));
              }}
              className={clsx(
                "px-3 py-1.5 text-xs font-semibold rounded-md transition",
                mode === "netlist"
                  ? "bg-cyan-600 text-white shadow-sm"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              SPICE Netlist
            </button>
          </div>

          {/* Title or Document Info */}
          <input
            type="text"
            disabled={readOnly}
            value={doc.title ?? ""}
            onChange={(e) => updateDoc((prev) => ({ ...prev, title: e.target.value }))}
            placeholder="Назва схеми..."
            className="px-2.5 py-1 text-xs font-medium bg-slate-950 border border-slate-800 rounded-md text-slate-200 focus:outline-none focus:border-cyan-500 w-48"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Run Button */}
          <button
            type="button"
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-sm disabled:opacity-50"
          >
            {isSimulating ? (
              <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
            {isSimulating ? t.circuitLab.simulating : t.circuitLab.simulate}
          </button>
          {isSimulating && (
            <button type="button" onClick={stopPreview} className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700">
              {t.circuitLab.cancel}
            </button>
          )}
          {!user && (
            <span className="text-[10px] text-slate-500">{t.circuitLab.guestPreview}</span>
          )}
          <button type="button" onClick={undoDoc} className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700">
            {t.circuitLab.undo}
          </button>
          <button type="button" onClick={redoDoc} className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700">
            {t.circuitLab.redo}
          </button>
          <button type="button" onClick={() => zoomBy(0.8)} title={t.circuitLab.zoomIn} className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700">
            +
          </button>
          <button type="button" onClick={() => zoomBy(1.25)} title={t.circuitLab.zoomOut} className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700">
            −
          </button>
          <label className="text-[11px] text-slate-400">
            <select
              value={analysis.type}
              onChange={(e) => {
                const type = e.target.value as CircuitAnalysis["type"];
                if (type === "dc") applyAnalysis({ type, dc: { source: "V1", start: 0, stop: 10, step: 1 } });
                else if (type === "ac") applyAnalysis({ type, ac: { variation: "dec", points: 20, fStart: 10, fStop: 1e6 } });
                else if (type === "tran") applyAnalysis({ type, tran: { tStep: 1e-5, tStop: 5e-3 } });
                else if (type === "noise") applyAnalysis({ type, noise: { output: "V(out)", ref: "0", variation: "dec", points: 10, fStart: 10, fStop: 1e6 } });
                else applyAnalysis({ type: "op" });
              }}
              className="bg-slate-950 border border-slate-700 rounded-md px-2 py-1 text-xs text-slate-200"
            >
              <option value="op">.op</option>
              <option value="dc">.dc</option>
              <option value="ac">.ac</option>
              <option value="tran">.tran</option>
              <option value="noise">.noise</option>
            </select>
          </label>

          {/* Export Dropdown */}
          <button
            type="button"
            onClick={handleExportNetlist}
            title="Експорт Netlist"
            className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            .CIR
          </button>
          <button
            type="button"
            onClick={handleExportJson}
            title="Експорт JSON"
            className="px-2.5 py-1.5 text-xs font-medium rounded-md border border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
          >
            .JSON
          </button>
        </div>
      </div>

      {/* Ground Warning Banner if missing */}
      {!hasGround && (
        <div className="flex items-center gap-2 p-2.5 bg-amber-950/40 border border-amber-800/60 rounded-lg text-amber-300 text-xs">
          <svg className="w-4 h-4 shrink-0 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span>
            Увага: у схемі немає підключення до <strong>GND (вузол 0)</strong>. Для розрахунку SPICE наявність опорного вузла землі обов&apos;язкова.
          </span>
        </div>
      )}

      {/* Criteria Checklist (if this is an exercise/lab) */}
      {criteria && criteria.length > 0 && (
        <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex flex-col gap-2">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Вимоги до схеми (Критерії оцінювання):
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {criteria.map((c, i) => {
              const res = evaluationResult?.criteriaResults?.[i];
              const passed = res?.passed;
              return (
                <div
                  key={i}
                  className={clsx(
                    "flex items-center justify-between gap-2 p-2 rounded-lg border text-xs font-mono",
                    res
                      ? passed
                        ? "bg-emerald-950/30 border-emerald-800/50 text-emerald-300"
                        : "bg-red-950/30 border-red-800/50 text-red-300"
                      : "bg-slate-950 border-slate-800 text-slate-300"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={clsx(
                        "w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                        res
                          ? passed
                            ? "bg-emerald-500 text-slate-950"
                            : "bg-red-500 text-white"
                          : "bg-slate-800 text-slate-400"
                      )}
                    >
                      {res ? (passed ? "✓" : "✕") : i + 1}
                    </span>
                    <span>{c.labelUk || c.labelEn || c.type}</span>
                  </div>
                  {res && res.actualValue !== undefined && (
                    <span className="text-[11px] opacity-80">
                      Фактично: {res.actualValue.toPrecision(4)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Workspace Body */}
      {mode === "schematic" ? (
        <div className="flex flex-col lg:flex-row gap-3">
          {/* Component Palette (Left / Horizontal on mobile) */}
          {!readOnly && (
            <div className="flex lg:flex-col flex-wrap gap-1.5 p-2 bg-slate-900 border border-slate-800 rounded-xl lg:w-44 shrink-0 overflow-y-auto max-h-[500px]">
              <span className="text-[10px] uppercase font-bold text-slate-400 px-1 py-0.5">
                Компоненти
              </span>
              {paletteKeys.map((key) => {
                const def = COMPONENT_REGISTRY[key];
                if (!def) return null;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleAddComponent(key)}
                    className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-slate-800 bg-slate-950 hover:bg-slate-800 text-slate-200 text-xs font-medium transition text-left"
                  >
                    <span className="w-5 h-5 rounded bg-slate-800 text-cyan-400 flex items-center justify-center font-mono font-bold text-[10px]">
                      {def.defaultPrefix || "+"}
                    </span>
                    <span className="truncate">{def.label}</span>
                  </button>
                );
              })}

              <hr className="border-slate-800 my-1" />

              {/* Instructions */}
              <div className="text-[11px] text-slate-400 px-1 space-y-1">
                <p>• Клік по виводу — почати провідник</p>
                <p>• Клавіша &apos;R&apos; — обертання</p>
                <p>• &apos;Del&apos; — видалення</p>
              </div>
            </div>
          )}

          {/* Schematic Canvas */}
          <div className="flex-1 flex flex-col gap-2 min-w-0">
            <div className="relative border border-slate-800 rounded-xl bg-slate-950 overflow-hidden min-h-[460px]">
              <svg
                ref={canvasRef}
                viewBox={`${view.x} ${view.y} ${view.w} ${view.h}`}
                className="w-full h-[460px] cursor-default select-none touch-none"
                onPointerDown={handleCanvasPointerDown}
                onPointerMove={handleCanvasPointerMove}
                onPointerUp={handleCanvasPointerUp}
                onPointerLeave={handleCanvasPointerUp}
              >
                <defs>
                  {/* Dot Grid Pattern */}
                  <pattern
                    id="circuitGrid"
                    width={GRID_SIZE}
                    height={GRID_SIZE}
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1" cy="1" r="1" fill="#334155" opacity="0.6" />
                  </pattern>
                </defs>

                {/* Grid Background */}
                <rect width="100%" height="100%" fill="url(#circuitGrid)" />

                {/* Drawn Wires */}
                {doc.wires.map((w) => {
                  let x1 = 0;
                  let y1 = 0;
                  let x2 = 0;
                  let y2 = 0;

                  const place = (endpoint: CircuitWire["from"]) => {
                    if ("x" in endpoint && "y" in endpoint) return { x: endpoint.x, y: endpoint.y };
                    const id = "componentId" in endpoint ? endpoint.componentId : "id" in endpoint ? endpoint.id : null;
                    const pin = "pin" in endpoint ? endpoint.pin : undefined;
                    if (!id || !pin) return null;
                    const comp = doc.components.find((c) => c.id === id);
                    const defn = comp ? COMPONENT_REGISTRY[comp.type] : null;
                    const pinDef = defn?.pins.find((p) => p.name === pin || p.id === pin);
                    if (!comp || !pinDef) return null;
                    return getPinAbsolutePos(comp, pinDef);
                  };
                  const fromPos = place(w.from);
                  const toPos = place(w.to);
                  if (fromPos) {
                    x1 = fromPos.x;
                    y1 = fromPos.y;
                  }
                  if (toPos) {
                    x2 = toPos.x;
                    y2 = toPos.y;
                  }

                  const isSelected = selectedWireId === w.id;

                  return (
                    <g
                      key={w.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedWireId(w.id);
                        setSelectedCompId(null);
                      }}
                      className="cursor-pointer"
                    >
                      {/* Thicker transparent hit target */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="transparent"
                        strokeWidth="10"
                      />
                      {/* Visible wire */}
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke={isSelected ? "#38bdf8" : "#22d3ee"}
                        strokeWidth={isSelected ? "3" : "2"}
                        strokeLinecap="round"
                      />
                      {/* Connection Dots */}
                      <circle cx={x1} cy={y1} r="3" fill="#22d3ee" />
                      <circle cx={x2} cy={y2} r="3" fill="#22d3ee" />
                    </g>
                  );
                })}

                {/* Interactive Wire Being Drawn */}
                {wiringFrom && (
                  <line
                    x1={wiringFrom.x}
                    y1={wiringFrom.y}
                    x2={wiringFrom.x}
                    y2={wiringFrom.y}
                    stroke="#f59e0b"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                  />
                )}

                {/* Components */}
                {doc.components.map((comp) => {
                  const def = COMPONENT_REGISTRY[comp.type];
                  if (!def) return null;
                  const isSelected = selectedCompId === comp.id;

                  return (
                    <g
                      key={comp.id}
                      transform={`translate(${comp.x}, ${comp.y}) rotate(${comp.rotation}, ${def.width / 2}, ${def.height / 2})`}
                      onPointerDown={(e) => handleComponentPointerDown(e, comp)}
                      className="cursor-move"
                    >
                      {/* Selection Box */}
                      {isSelected && (
                        <rect
                          x="-6"
                          y="-6"
                          width={def.width + 12}
                          height={def.height + 12}
                          fill="rgba(56, 189, 248, 0.1)"
                          stroke="#38bdf8"
                          strokeWidth="1.5"
                          strokeDasharray="3,3"
                          rx="4"
                        />
                      )}

                      {/* Component Symbol */}
                      {def.renderSvg({
                        id: comp.id,
                        value: comp.value,
                        selected: isSelected,
                        properties: comp.properties,
                      })}

                      {/* Pins */}
                      {def.pins.map((pin) => (
                        <circle
                          key={pin.id}
                          cx={pin.x}
                          cy={pin.y}
                          r="4"
                          fill="#0f172a"
                          stroke="#38bdf8"
                          strokeWidth="2"
                          className="cursor-crosshair hover:scale-150 transition-transform"
                          onClick={(e) => {
                            e.stopPropagation();
                            handlePinClick(comp, pin.name, pin);
                          }}
                        />
                      ))}
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Properties bar for selected item */}
            {selectedComp && !readOnly && (
              <div className="flex flex-wrap items-center gap-3 p-3 bg-slate-900 border border-slate-800 rounded-xl">
                <span className="text-xs font-bold text-slate-300">
                  {selectedComp.id} ({COMPONENT_REGISTRY[selectedComp.type]?.label})
                </span>

                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400">Номінал:</span>
                  <input
                    type="text"
                    value={selectedComp.value}
                    onChange={(e) => {
                      const val = e.target.value;
                      updateDoc((prev) => ({
                        ...prev,
                        components: prev.components.map((c) =>
                          c.id === selectedComp.id ? { ...c, value: val } : c
                        ),
                      }));
                    }}
                    className="px-2 py-1 rounded bg-slate-950 border border-slate-700 text-slate-100 font-mono text-xs w-28 focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={handleRotateSelected}
                    title="Обертати (R)"
                    className="px-2.5 py-1 text-xs font-medium rounded border border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 transition"
                  >
                    ⟳ Обернути
                  </button>
                  <button
                    type="button"
                    onClick={handleDeleteSelected}
                    title="Видалити (Del)"
                    className="px-2.5 py-1 text-xs font-medium rounded border border-red-900/60 bg-red-950/40 text-red-300 hover:bg-red-900/60 transition"
                  >
                    ✕ Видалити
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* SPICE Netlist Raw Editor */
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>{t.circuitLab.textMode}</span>
            <span className="text-[11px] font-mono">ngspice syntax</span>
          </div>
          <textarea
            value={netlistText}
            onChange={(e) => {
              setNetlistText(e.target.value);
              updateDoc((prev) => ({ ...prev, netlist: e.target.value }));
            }}
            placeholder="* SPICE netlist here&#10;V1 in 0 DC 5&#10;R1 in out 1k&#10;C1 out 0 100n&#10;.tran 10u 5m&#10;.end"
            rows={12}
            className="w-full p-3 rounded-xl bg-slate-950 border border-slate-800 text-cyan-300 font-mono text-xs leading-relaxed focus:outline-none focus:border-cyan-500"
          />
        </div>
      )}

      {/* Waveforms & Charts Section */}
      {showWaveforms && (
        <div className="mt-2">
          <CircuitWaveformChart
            result={simResult}
            isLoading={isSimulating}
            analysisType={analysis.type}
          />
        </div>
      )}
    </div>
  );
}
