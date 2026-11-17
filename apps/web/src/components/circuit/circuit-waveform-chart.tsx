"use client";

import React, { useMemo, useState, useRef, useCallback } from "react";
import clsx from "clsx";
import type { SimSeries, RunSimOutput } from "@eduforge/circuit-engine";
import { useLocale } from "@/lib/locale-context";

export type WaveformChartProps = {
  result: RunSimOutput | null;
  isLoading?: boolean;
  className?: string;
  analysisType?: "tran" | "ac" | "dc" | "op" | "noise";
};

const TRACE_COLORS = [
  "#06b6d4", // cyan-500
  "#10b981", // emerald-500
  "#f59e0b", // amber-500
  "#f43f5e", // rose-500
  "#8b5cf6", // violet-500
  "#3b82f6", // blue-500
  "#14b8a6", // teal-500
  "#eab308", // yellow-500
];

export function formatEngineering(val: number, unit = ""): string {
  if (!Number.isFinite(val)) return "—";
  if (val === 0) return `0 ${unit}`.trim();

  const abs = Math.abs(val);
  const sign = val < 0 ? "-" : "";

  if (abs >= 1e9) return `${sign}${(abs / 1e9).toPrecision(4)} G${unit}`.trim();
  if (abs >= 1e6) return `${sign}${(abs / 1e6).toPrecision(4)} M${unit}`.trim();
  if (abs >= 1e3) return `${sign}${(abs / 1e3).toPrecision(4)} k${unit}`.trim();
  if (abs >= 1) return `${sign}${abs.toPrecision(4)} ${unit}`.trim();
  if (abs >= 1e-3) return `${sign}${(abs * 1e3).toPrecision(4)} m${unit}`.trim();
  if (abs >= 1e-6) return `${sign}${(abs * 1e6).toPrecision(4)} µ${unit}`.trim();
  if (abs >= 1e-9) return `${sign}${(abs * 1e9).toPrecision(4)} n${unit}`.trim();
  if (abs >= 1e-12) return `${sign}${(abs * 1e12).toPrecision(4)} p${unit}`.trim();
  return `${sign}${abs.toExponential(3)} ${unit}`.trim();
}

export function CircuitWaveformChart({
  result,
  isLoading,
  className,
  analysisType,
}: WaveformChartProps) {
  const { t } = useLocale();
  const [hiddenTraces, setHiddenTraces] = useState<Record<string, boolean>>({});
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [acMode, setAcMode] = useState<"mag" | "phase">("mag");
  const svgRef = useRef<SVGSVGElement | null>(null);

  const toggleTrace = (name: string) => {
    setHiddenTraces((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // Find independent axis variable: time, frequency, or first sweep var
  const { xSeries, ySeriesList, isAc } = useMemo(() => {
    if (!result || !result.data || result.data.length === 0) {
      return { xSeries: null, ySeriesList: [], isAc: false };
    }

    let x: SimSeries | null = null;
    const yList: SimSeries[] = [];
    const isComplex = result.dataType === "complex";

    for (const s of result.data) {
      const lower = s.name.toLowerCase();
      if (
        s.type === "time" ||
        lower === "time" ||
        s.type === "frequency" ||
        lower === "frequency"
      ) {
        if (!x) x = s;
      } else {
        yList.push(s);
      }
    }

    // If no explicit time/frequency found, use the first series as x if multiple exist
    if (!x && result.data.length > 1) {
      x = result.data[0]!;
      yList.splice(0, 1);
    }

    return {
      xSeries: x,
      ySeriesList: yList,
      isAc: isComplex || Boolean(x && x.type === "frequency"),
    };
  }, [result]);

  // Extract raw numerical values for X and Y traces
  const parsedData = useMemo(() => {
    if (!xSeries || ySeriesList.length === 0) return null;

    const xVals: number[] = [];
    for (const v of xSeries.values) {
      if (typeof v === "number") {
        xVals.push(v);
      } else if (v && typeof v === "object") {
        xVals.push(v.real);
      } else {
        xVals.push(0);
      }
    }

    const yTraces = ySeriesList.map((series, idx) => {
      const vals: number[] = [];
      const isComplex = result?.dataType === "complex";

      for (const v of series.values) {
        if (typeof v === "number") {
          vals.push(v);
        } else if (v && typeof v === "object") {
          if (isAc && acMode === "mag") {
            const mag = Math.sqrt(v.real * v.real + v.imag * v.imag);
            // Magnitude in dB: 20 * log10(mag)
            const db = mag > 1e-12 ? 20 * Math.log10(mag) : -240;
            vals.push(db);
          } else if (isAc && acMode === "phase") {
            // Phase in degrees: atan2(imag, real) * 180 / PI
            const phase = (Math.atan2(v.imag, v.real) * 180) / Math.PI;
            vals.push(phase);
          } else {
            vals.push(v.real);
          }
        } else {
          vals.push(0);
        }
      }

      // Compute statistics for this trace
      let min = Infinity;
      let max = -Infinity;
      let sum = 0;
      let sumSq = 0;
      const count = vals.length;

      for (const val of vals) {
        if (val < min) min = val;
        if (val > max) max = val;
        sum += val;
        sumSq += val * val;
      }

      const mean = count > 0 ? sum / count : 0;
      const rms = count > 0 ? Math.sqrt(sumSq / count) : 0;
      const vpp = count > 0 ? max - min : 0;

      const unit = isAc
        ? acMode === "mag"
          ? "dB"
          : "°"
        : series.type === "current"
          ? "A"
          : "V";

      return {
        name: series.name,
        color: TRACE_COLORS[idx % TRACE_COLORS.length]!,
        values: vals,
        min: count > 0 ? min : 0,
        max: count > 0 ? max : 0,
        mean,
        rms,
        vpp,
        unit,
      };
    });

    return { xVals, yTraces };
  }, [xSeries, ySeriesList, result?.dataType, isAc, acMode]);

  // SVG coordinate calculations
  const chartLayout = useMemo(() => {
    if (!parsedData || parsedData.xVals.length === 0) return null;

    const width = 760;
    const height = 300;
    const padLeft = 60;
    const padRight = 20;
    const padTop = 20;
    const padBottom = 40;

    const plotW = width - padLeft - padRight;
    const plotH = height - padTop - padBottom;

    const xVals = parsedData.xVals;
    const xMin = Math.min(...xVals);
    const xMax = Math.max(...xVals);
    const xRange = xMax - xMin || 1;
    const xName = (xSeries?.name ?? "").toLowerCase();
    const frequencyAxis =
      isAc || xSeries?.type === "frequency" || xName === "frequency" || analysisType === "ac" || analysisType === "noise";
    const timeAxis = xSeries?.type === "time" || xName === "time" || analysisType === "tran";
    const xUnit = frequencyAxis ? "Hz" : timeAxis ? "s" : "";
    const logX = frequencyAxis && xMin > 0 && xMax / xMin >= 10;

    // Y bounds across all visible traces
    let yMin = Infinity;
    let yMax = -Infinity;

    for (const trace of parsedData.yTraces) {
      if (hiddenTraces[trace.name]) continue;
      if (trace.min < yMin) yMin = trace.min;
      if (trace.max > yMax) yMax = trace.max;
    }

    if (!Number.isFinite(yMin) || !Number.isFinite(yMax)) {
      yMin = -1;
      yMax = 1;
    } else if (yMin === yMax) {
      yMin -= 1;
      yMax += 1;
    } else {
      // Add 5% padding
      const span = yMax - yMin;
      yMin -= span * 0.05;
      yMax += span * 0.05;
    }
    const yRange = yMax - yMin || 1;

    const getX = (val: number) => {
      if (logX) {
        const start = Math.log10(xMin);
        const stop = Math.log10(xMax);
        return padLeft + ((Math.log10(Math.max(val, xMin)) - start) / (stop - start || 1)) * plotW;
      }
      return padLeft + ((val - xMin) / xRange) * plotW;
    };
    const getY = (val: number) => padTop + plotH - ((val - yMin) / yRange) * plotH;

    // Generate polyline paths for visible traces
    const paths = parsedData.yTraces.map((trace) => {
      if (hiddenTraces[trace.name]) return null;

      const pts: string[] = [];
      const step = Math.max(1, Math.floor(xVals.length / 1000));
      for (let i = 0; i < xVals.length; i += step) {
        const x = getX(xVals[i]!);
        const y = getY(trace.values[i]!);
        pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
      }
      return {
        name: trace.name,
        color: trace.color,
        d: pts.length > 0 ? `M ${pts.join(" L ")}` : "",
      };
    });

    // Generate grid lines
    const xTicks: { x: number; label: string }[] = [];
    if (logX) {
      const first = Math.ceil(Math.log10(xMin));
      const last = Math.floor(Math.log10(xMax));
      for (let decade = first; decade <= last; decade++) {
        const v = 10 ** decade;
        xTicks.push({ x: getX(v), label: formatEngineering(v, xUnit) });
      }
      if (xTicks.length === 0) xTicks.push({ x: getX(xMin), label: formatEngineering(xMin, xUnit) });
    } else {
      const numXTicks = 6;
      for (let i = 0; i <= numXTicks; i++) {
        const v = xMin + (xRange * i) / numXTicks;
        xTicks.push({ x: getX(v), label: formatEngineering(v, xUnit) });
      }
    }

    const yUnit = parsedData.yTraces[0]?.unit || (isAc ? (acMode === "mag" ? "dB" : "°") : "V");
    const yTicks: { y: number; label: string }[] = [];
    const numYTicks = 5;
    for (let i = 0; i <= numYTicks; i++) {
      const v = yMin + (yRange * i) / numYTicks;
      const y = getY(v);
      yTicks.push({ y, label: formatEngineering(v, yUnit) });
    }

    return {
      width,
      height,
      padLeft,
      padRight,
      padTop,
      padBottom,
      plotW,
      plotH,
      xMin,
      xMax,
      yMin,
      yMax,
      getX,
      getY,
      paths,
      xTicks,
      yTicks,
      xUnit,
      logX,
    };
  }, [parsedData, hiddenTraces, isAc, acMode, analysisType, xSeries?.name, xSeries?.type]);

  // Mouse hover event handler for crosshair cursor
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<SVGSVGElement>) => {
      if (!svgRef.current || !parsedData || !chartLayout) return;
      const rect = svgRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const scaleX = chartLayout.width / rect.width;
      const plotMouseX = mouseX * scaleX;

      if (
        plotMouseX < chartLayout.padLeft ||
        plotMouseX > chartLayout.width - chartLayout.padRight
      ) {
        setHoverIndex(null);
        return;
      }

      const ratio = (plotMouseX - chartLayout.padLeft) / chartLayout.plotW;
      const targetX = chartLayout.logX
        ? 10 ** (Math.log10(chartLayout.xMin) + ratio * (Math.log10(chartLayout.xMax) - Math.log10(chartLayout.xMin)))
        : chartLayout.xMin + ratio * (chartLayout.xMax - chartLayout.xMin);

      // Find closest index in xVals
      const xVals = parsedData.xVals;
      let low = 0;
      let high = xVals.length - 1;
      while (high - low > 1) {
        const mid = Math.floor((low + high) / 2);
        if (xVals[mid]! <= targetX) low = mid;
        else high = mid;
      }
      const closest =
        Math.abs(xVals[low]! - targetX) < Math.abs(xVals[high]! - targetX) ? low : high;
      setHoverIndex(closest);
    },
    [parsedData, chartLayout]
  );

  const handleMouseLeave = () => setHoverIndex(null);

  // CSV Export
  const exportCsv = () => {
    if (!parsedData || !xSeries) return;
    const header = [
      xSeries.name,
      ...parsedData.yTraces.map((t) => `${t.name} (${t.unit})`),
    ].join(",");

    const rows: string[] = [];
    for (let i = 0; i < parsedData.xVals.length; i++) {
      const row = [
        parsedData.xVals[i],
        ...parsedData.yTraces.map((t) => t.values[i]),
      ].join(",");
      rows.push(row);
    }

    const csvContent = "data:text/csv;charset=utf-8," + [header, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `spice_simulation_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // If loading
  if (isLoading) {
    return (
      <div className={clsx("flex flex-col items-center justify-center p-8 border rounded-xl bg-slate-900/40 border-slate-800 text-slate-400 min-h-[320px]", className)}>
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3" />
        <p className="text-sm font-medium">{t.circuitLab.simulating}</p>
      </div>
    );
  }

  // If error occurred
  if (result && !result.ok) {
    return (
      <div className={clsx("p-6 border rounded-xl bg-red-950/20 border-red-900/50 text-red-300", className)}>
        <h4 className="text-base font-semibold flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          Simulation Error
        </h4>
        <p className="text-sm font-mono whitespace-pre-wrap">{result.error}</p>
        {result.rawErrors && result.rawErrors.length > 0 && (
          <div className="mt-3 text-xs opacity-75 font-mono">
            {result.rawErrors.join("\n")}
          </div>
        )}
      </div>
    );
  }

  // If no data
  if (!result || !result.data || result.data.length === 0 || !parsedData || !chartLayout) {
    return (
      <div className={clsx("flex flex-col items-center justify-center p-8 border rounded-xl bg-slate-900/40 border-slate-800 text-slate-500 min-h-[300px]", className)}>
        <svg className="w-10 h-10 mb-2 opacity-50 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
        </svg>
        <p className="text-sm">{t.circuitLab.plotEmpty}</p>
      </div>
    );
  }

  const paneUnits = [...new Set(parsedData.yTraces.map((trace) => trace.unit))];
  if (paneUnits.length > 1) {
    return (
      <div className={clsx("flex flex-col gap-4", className)}>
        {paneUnits.map((unit) => (
          <CircuitWaveformChart
            key={unit}
            analysisType={analysisType}
            result={{
              ...result,
              data: result.data.filter((series) => {
                const lower = series.name.toLowerCase();
                const isX =
                  series.type === "time" ||
                  series.type === "frequency" ||
                  lower === "time" ||
                  lower === "frequency";
                if (isX) return true;
                return parsedData.yTraces.find((item) => item.name === series.name)?.unit === unit;
              }),
            }}
          />
        ))}
      </div>
    );
  }

  const hoverXVal = hoverIndex !== null ? parsedData.xVals[hoverIndex] : null;

  return (
    <div className={clsx("flex flex-col gap-4 border rounded-xl bg-slate-950 p-4 border-slate-800", className)}>
      {/* Top Header & Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {isAc ? t.circuitLab.frequencyResponse : chartLayout.xUnit === "s" ? t.circuitLab.transientWaveforms : t.circuitLab.sweep}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-400">
            {result.numPoints} pts
          </span>
        </div>

        <div className="flex items-center gap-2">
          {isAc && (
            <div className="inline-flex rounded-md shadow-sm border border-slate-800 p-0.5 bg-slate-900">
              <button
                type="button"
                onClick={() => setAcMode("mag")}
                className={clsx(
                  "px-2.5 py-1 text-xs font-medium rounded",
                  acMode === "mag"
                    ? "bg-cyan-600 text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {t.circuitLab.magnitudeDb}
              </button>
              <button
                type="button"
                onClick={() => setAcMode("phase")}
                className={clsx(
                  "px-2.5 py-1 text-xs font-medium rounded",
                  acMode === "phase"
                    ? "bg-cyan-600 text-white"
                    : "text-slate-400 hover:text-white"
                )}
              >
                {t.circuitLab.phaseDeg}
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={exportCsv}
            title="Export CSV"
            className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded border border-slate-800 bg-slate-900 text-slate-300 hover:bg-slate-800 transition"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            CSV
          </button>
        </div>
      </div>

      {/* Trace Toggles / Legend */}
      <div className="flex flex-wrap items-center gap-2">
        {parsedData.yTraces.map((t) => {
          const isHidden = hiddenTraces[t.name];
          return (
            <button
              key={t.name}
              type="button"
              onClick={() => toggleTrace(t.name)}
              className={clsx(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono font-medium transition border",
                isHidden
                  ? "border-slate-800 bg-slate-900/50 text-slate-500 line-through"
                  : "border-slate-700 bg-slate-900 text-slate-200"
              )}
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: isHidden ? "#64748b" : t.color }}
              />
              {t.name}
            </button>
          );
        })}
      </div>

      {/* SVG Plot Canvas */}
      <div className="relative w-full aspect-[2.4/1] min-h-[260px] bg-slate-900/50 rounded-lg overflow-hidden border border-slate-800">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${chartLayout.width} ${chartLayout.height}`}
          className="w-full h-full cursor-crosshair select-none"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Horizontal Grid lines */}
          {chartLayout.yTicks.map((t, idx) => (
            <g key={`y-${idx}`}>
              <line
                x1={chartLayout.padLeft}
                y1={t.y}
                x2={chartLayout.width - chartLayout.padRight}
                y2={t.y}
                stroke="#334155"
                strokeWidth={0.75}
                strokeDasharray={t.y === chartLayout.getY(0) ? "none" : "2,4"}
              />
              <text
                x={chartLayout.padLeft - 8}
                y={t.y + 4}
                textAnchor="end"
                className="text-[10px] fill-slate-400 font-mono"
              >
                {t.label}
              </text>
            </g>
          ))}

          {/* Vertical Grid lines */}
          {chartLayout.xTicks.map((t, idx) => (
            <g key={`x-${idx}`}>
              <line
                x1={t.x}
                y1={chartLayout.padTop}
                x2={t.x}
                y2={chartLayout.height - chartLayout.padBottom}
                stroke="#334155"
                strokeWidth={0.75}
                strokeDasharray="2,4"
              />
              <text
                x={t.x}
                y={chartLayout.height - chartLayout.padBottom + 16}
                textAnchor="middle"
                className="text-[10px] fill-slate-400 font-mono"
              >
                {t.label}
              </text>
            </g>
          ))}

          {/* Axis border */}
          <rect
            x={chartLayout.padLeft}
            y={chartLayout.padTop}
            width={chartLayout.plotW}
            height={chartLayout.plotH}
            fill="none"
            stroke="#475569"
            strokeWidth={1}
          />

          {/* Traces */}
          {chartLayout.paths.map((p) => {
            if (!p || !p.d) return null;
            return (
              <path
                key={p.name}
                d={p.d}
                fill="none"
                stroke={p.color}
                strokeWidth={1.8}
                strokeLinejoin="round"
                strokeLinecap="round"
              />
            );
          })}

          {/* Crosshair Cursor */}
          {hoverIndex !== null && hoverXVal !== null && (
            <g>
              <line
                x1={chartLayout.getX(hoverXVal)}
                y1={chartLayout.padTop}
                x2={chartLayout.getX(hoverXVal)}
                y2={chartLayout.height - chartLayout.padBottom}
                stroke="#94a3b8"
                strokeWidth={1}
                strokeDasharray="3,3"
              />
              {parsedData.yTraces.map((trace) => {
                if (hiddenTraces[trace.name]) return null;
                const yVal = trace.values[hoverIndex];
                if (yVal === undefined) return null;
                const cx = chartLayout.getX(hoverXVal);
                const cy = chartLayout.getY(yVal);
                return (
                  <circle
                    key={trace.name}
                    cx={cx}
                    cy={cy}
                    r={3.5}
                    fill={trace.color}
                    stroke="#0f172a"
                    strokeWidth={1.5}
                  />
                );
              })}
            </g>
          )}
        </svg>

        {/* Floating Readout Box on Hover */}
        {hoverIndex !== null && hoverXVal !== null && (
          <div className="absolute top-2 right-2 p-2.5 rounded-lg bg-slate-900/95 border border-slate-700/80 shadow-lg text-xs font-mono pointer-events-none backdrop-blur-sm">
            <div className="text-slate-400 mb-1 border-b border-slate-800 pb-1 font-semibold">
              {xSeries?.name}: {formatEngineering(hoverXVal, chartLayout.xUnit)}
            </div>
            <div className="flex flex-col gap-1">
              {parsedData.yTraces.map((t) => {
                if (hiddenTraces[t.name]) return null;
                const val = t.values[hoverIndex];
                return (
                  <div key={t.name} className="flex items-center justify-between gap-4">
                    <span style={{ color: t.color }}>{t.name}:</span>
                    <span className="text-slate-200">
                      {val !== undefined ? formatEngineering(val, t.unit) : "—"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Measurements Table / Cards */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {parsedData.yTraces.map((t) => {
          if (hiddenTraces[t.name]) return null;
          return (
            <div
              key={t.name}
              className="p-3 rounded-lg border border-slate-800 bg-slate-900/60 flex flex-col gap-1.5"
            >
              <div className="flex items-center gap-2 pb-1 border-b border-slate-800">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: t.color }} />
                <span className="text-xs font-mono font-bold text-slate-200">{t.name}</span>
                <span className="text-[10px] text-slate-400 ml-auto uppercase">{t.unit}</span>
              </div>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-400">
                  <span>Vpp / Span:</span>
                  <span className="text-slate-200">{formatEngineering(t.vpp, t.unit)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>RMS:</span>
                  <span className="text-slate-200">{formatEngineering(t.rms, t.unit)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Mean:</span>
                  <span className="text-slate-200">{formatEngineering(t.mean, t.unit)}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>[Min, Max]:</span>
                  <span className="text-slate-200 text-[11px]">
                    {formatEngineering(t.min, "")} .. {formatEngineering(t.max, "")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
