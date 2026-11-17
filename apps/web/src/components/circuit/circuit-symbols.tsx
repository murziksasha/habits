"use client";

import React from "react";

export type PinDef = {
  id: string;
  name: string;
  x: number;
  y: number;
};

export type ComponentDef = {
  type: string;
  label: string;
  defaultPrefix: string;
  defaultValue: string;
  pins: PinDef[];
  width: number;
  height: number;
  renderSvg: (props: {
    value: string;
    id: string;
    selected?: boolean;
    properties?: Record<string, any>;
  }) => React.ReactNode;
};

export const COMPONENT_REGISTRY: Record<string, ComponentDef> = {
  resistor: {
    type: "resistor",
    label: "Резистор",
    defaultPrefix: "R",
    defaultValue: "1k",
    width: 60,
    height: 30,
    pins: [
      { id: "1", name: "1", x: 0, y: 15 },
      { id: "2", name: "2", x: 60, y: 15 },
    ],
    renderSvg: ({ value, id, selected }) => (
      <g>
        <line x1="0" y1="15" x2="15" y2="15" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        {/* Zigzag or Rectangular Resistor */}
        <path
          d="M 15 15 L 20 8 L 26 22 L 32 8 L 38 22 L 44 15 L 60 15"
          fill="none"
          stroke={selected ? "#38bdf8" : "#f8fafc"}
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        <text x="30" y="-3" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="600">
          {id}
        </text>
        <text x="30" y="32" fill="#38bdf8" fontSize="10" textAnchor="middle">
          {value}
        </text>
      </g>
    ),
  },

  capacitor: {
    type: "capacitor",
    label: "Конденсатор",
    defaultPrefix: "C",
    defaultValue: "100n",
    width: 60,
    height: 30,
    pins: [
      { id: "1", name: "1", x: 0, y: 15 },
      { id: "2", name: "2", x: 60, y: 15 },
    ],
    renderSvg: ({ value, id, selected }) => (
      <g>
        <line x1="0" y1="15" x2="26" y2="15" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <line x1="26" y1="3" x2="26" y2="27" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2.5" />
        <line x1="34" y1="3" x2="34" y2="27" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2.5" />
        <line x1="34" y1="15" x2="60" y2="15" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <text x="30" y="-3" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="600">
          {id}
        </text>
        <text x="30" y="32" fill="#38bdf8" fontSize="10" textAnchor="middle">
          {value}
        </text>
      </g>
    ),
  },

  inductor: {
    type: "inductor",
    label: "Котушка індуктивності",
    defaultPrefix: "L",
    defaultValue: "10m",
    width: 60,
    height: 30,
    pins: [
      { id: "1", name: "1", x: 0, y: 15 },
      { id: "2", name: "2", x: 60, y: 15 },
    ],
    renderSvg: ({ value, id, selected }) => (
      <g>
        <line x1="0" y1="15" x2="12" y2="15" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        {/* 3 Coils */}
        <path
          d="M 12 15 A 6 6 0 0 1 24 15 A 6 6 0 0 1 36 15 A 6 6 0 0 1 48 15"
          fill="none"
          stroke={selected ? "#38bdf8" : "#f8fafc"}
          strokeWidth="2.5"
        />
        <line x1="48" y1="15" x2="60" y2="15" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <text x="30" y="-3" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="600">
          {id}
        </text>
        <text x="30" y="32" fill="#38bdf8" fontSize="10" textAnchor="middle">
          {value}
        </text>
      </g>
    ),
  },

  dc_voltage: {
    type: "dc_voltage",
    label: "Джерело постійної напруги",
    defaultPrefix: "V",
    defaultValue: "5V",
    width: 40,
    height: 60,
    pins: [
      { id: "1", name: "+", x: 20, y: 0 },
      { id: "2", name: "-", x: 20, y: 60 },
    ],
    renderSvg: ({ value, id, selected }) => (
      <g>
        <line x1="20" y1="0" x2="20" y2="12" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <circle
          cx="20"
          cy="30"
          r="18"
          fill="#0f172a"
          stroke={selected ? "#38bdf8" : "#f8fafc"}
          strokeWidth="2.5"
        />
        <text x="20" y="24" fill="#ef4444" fontSize="14" textAnchor="middle" fontWeight="bold">
          +
        </text>
        <text x="20" y="42" fill="#3b82f6" fontSize="16" textAnchor="middle" fontWeight="bold">
          -
        </text>
        <line x1="20" y1="48" x2="20" y2="60" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <text x="44" y="26" fill="#cbd5e1" fontSize="11" fontWeight="600">
          {id}
        </text>
        <text x="44" y="40" fill="#38bdf8" fontSize="10">
          {value}
        </text>
      </g>
    ),
  },

  ac_voltage: {
    type: "ac_voltage",
    label: "Джерело змінної напруги",
    defaultPrefix: "V",
    defaultValue: "1V",
    width: 40,
    height: 60,
    pins: [
      { id: "1", name: "+", x: 20, y: 0 },
      { id: "2", name: "-", x: 20, y: 60 },
    ],
    renderSvg: ({ value, id, selected }) => (
      <g>
        <line x1="20" y1="0" x2="20" y2="12" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <circle
          cx="20"
          cy="30"
          r="18"
          fill="#0f172a"
          stroke={selected ? "#38bdf8" : "#f8fafc"}
          strokeWidth="2.5"
        />
        {/* Sine wave icon */}
        <path
          d="M 12 30 Q 16 22, 20 30 T 28 30"
          fill="none"
          stroke={selected ? "#38bdf8" : "#f8fafc"}
          strokeWidth="2"
        />
        <line x1="20" y1="48" x2="20" y2="60" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <text x="44" y="26" fill="#cbd5e1" fontSize="11" fontWeight="600">
          {id}
        </text>
        <text x="44" y="40" fill="#38bdf8" fontSize="10">
          {value}
        </text>
      </g>
    ),
  },

  pulse_voltage: {
    type: "pulse_voltage",
    label: "Імпульсне джерело",
    defaultPrefix: "V",
    defaultValue: "PULSE(0 5 0 1u 1u 1m 2m)",
    width: 40,
    height: 60,
    pins: [
      { id: "1", name: "+", x: 20, y: 0 },
      { id: "2", name: "-", x: 20, y: 60 },
    ],
    renderSvg: ({ value, id, selected }) => (
      <g>
        <line x1="20" y1="0" x2="20" y2="12" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <circle cx="20" cy="30" r="18" fill="#0f172a" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2.5" />
        <path d="M 10 36 H 16 V 24 H 24 V 36 H 30" fill="none" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2" />
        <line x1="20" y1="48" x2="20" y2="60" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <text x="44" y="26" fill="#cbd5e1" fontSize="11" fontWeight="600">{id}</text>
        <text x="44" y="40" fill="#38bdf8" fontSize="10">{value}</text>
      </g>
    ),
  },

  sine_voltage: {
    type: "sine_voltage",
    label: "Синусоїдне джерело",
    defaultPrefix: "V",
    defaultValue: "SIN(0 1 1k)",
    width: 40,
    height: 60,
    pins: [
      { id: "1", name: "+", x: 20, y: 0 },
      { id: "2", name: "-", x: 20, y: 60 },
    ],
    renderSvg: ({ value, id, selected }) => (
      <g>
        <line x1="20" y1="0" x2="20" y2="12" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <circle cx="20" cy="30" r="18" fill="#0f172a" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2.5" />
        <path d="M 12 30 Q 16 22, 20 30 T 28 30" fill="none" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2" />
        <line x1="20" y1="48" x2="20" y2="60" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <text x="44" y="26" fill="#cbd5e1" fontSize="11" fontWeight="600">{id}</text>
        <text x="44" y="40" fill="#38bdf8" fontSize="10">{value}</text>
      </g>
    ),
  },

  ground: {
    type: "ground",
    label: "Заземлення (Земля 0)",
    defaultPrefix: "GND",
    defaultValue: "0",
    width: 30,
    height: 30,
    pins: [{ id: "1", name: "0", x: 15, y: 0 }],
    renderSvg: ({ selected }) => (
      <g>
        <line x1="15" y1="0" x2="15" y2="10" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2.5" />
        <line x1="3" y1="10" x2="27" y2="10" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2.5" />
        <line x1="7" y1="16" x2="23" y2="16" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2" />
        <line x1="11" y1="22" x2="19" y2="22" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="1.5" />
      </g>
    ),
  },

  diode: {
    type: "diode",
    label: "Діод",
    defaultPrefix: "D",
    defaultValue: "1N4148",
    width: 60,
    height: 30,
    pins: [
      { id: "1", name: "A", x: 0, y: 15 },
      { id: "2", name: "K", x: 60, y: 15 },
    ],
    renderSvg: ({ value, id, selected }) => (
      <g>
        <line x1="0" y1="15" x2="22" y2="15" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <polygon
          points="22,5 22,25 38,15"
          fill={selected ? "#38bdf8" : "#f8fafc"}
          stroke={selected ? "#38bdf8" : "#f8fafc"}
          strokeWidth="1.5"
        />
        <line x1="38" y1="5" x2="38" y2="25" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2.5" />
        <line x1="38" y1="15" x2="60" y2="15" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <text x="30" y="-3" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="600">
          {id}
        </text>
        <text x="30" y="32" fill="#38bdf8" fontSize="10" textAnchor="middle">
          {value}
        </text>
      </g>
    ),
  },

  bjt_npn: {
    type: "bjt_npn",
    label: "Транзистор NPN",
    defaultPrefix: "Q",
    defaultValue: "2N2222",
    width: 50,
    height: 50,
    pins: [
      { id: "c", name: "C", x: 35, y: 0 },
      { id: "b", name: "B", x: 0, y: 25 },
      { id: "e", name: "E", x: 35, y: 50 },
    ],
    renderSvg: ({ value, id, selected }) => (
      <g>
        {/* Base pin */}
        <line x1="0" y1="25" x2="16" y2="25" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <line x1="16" y1="10" x2="16" y2="40" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="3" />
        {/* Collector */}
        <line x1="16" y1="18" x2="35" y2="8" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2" />
        <line x1="35" y1="8" x2="35" y2="0" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        {/* Emitter with arrow */}
        <line x1="16" y1="32" x2="35" y2="42" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2" />
        <line x1="35" y1="42" x2="35" y2="50" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <polygon points="35,42 27,35 29,41" fill={selected ? "#38bdf8" : "#f8fafc"} />
        <text x="42" y="22" fill="#cbd5e1" fontSize="11" fontWeight="600">
          {id}
        </text>
        <text x="42" y="35" fill="#38bdf8" fontSize="10">
          {value}
        </text>
      </g>
    ),
  },

  opamp: {
    type: "opamp",
    label: "Операційний підсилювач",
    defaultPrefix: "X",
    defaultValue: "OPAMP",
    width: 60,
    height: 50,
    pins: [
      { id: "1", name: "IN+", x: 0, y: 15 },
      { id: "2", name: "IN-", x: 0, y: 35 },
      { id: "3", name: "OUT", x: 60, y: 25 },
    ],
    renderSvg: ({ value, id, selected }) => (
      <g>
        {/* Inputs */}
        <line x1="0" y1="15" x2="15" y2="15" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <line x1="0" y1="35" x2="15" y2="35" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        {/* Triangle Body */}
        <polygon
          points="15,5 15,45 50,25"
          fill="#0f172a"
          stroke={selected ? "#38bdf8" : "#f8fafc"}
          strokeWidth="2.5"
        />
        {/* + and - labels inside */}
        <text x="21" y="19" fill="#ef4444" fontSize="12" fontWeight="bold">
          +
        </text>
        <text x="21" y="38" fill="#3b82f6" fontSize="14" fontWeight="bold">
          -
        </text>
        {/* Output */}
        <line x1="50" y1="25" x2="60" y2="25" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <text x="30" y="-3" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="600">
          {id}
        </text>
        <text x="30" y="47" fill="#38bdf8" fontSize="10" textAnchor="middle">
          {value}
        </text>
      </g>
    ),
  },

  switch: {
    type: "switch",
    label: "Перемикач / Ключ",
    defaultPrefix: "S",
    defaultValue: "SW",
    width: 60,
    height: 30,
    pins: [
      { id: "1", name: "1", x: 0, y: 15 },
      { id: "2", name: "2", x: 60, y: 15 },
    ],
    renderSvg: ({ id, selected }) => (
      <g>
        <line x1="0" y1="15" x2="18" y2="15" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <circle cx="20" cy="15" r="3" fill="#0f172a" stroke="#f8fafc" strokeWidth="2" />
        {/* Angled switch blade */}
        <line x1="20" y1="15" x2="38" y2="4" stroke={selected ? "#38bdf8" : "#f8fafc"} strokeWidth="2.5" />
        <circle cx="40" cy="15" r="3" fill="#0f172a" stroke="#f8fafc" strokeWidth="2" />
        <line x1="42" y1="15" x2="60" y2="15" stroke={selected ? "#38bdf8" : "#94a3b8"} strokeWidth="2" />
        <text x="30" y="-3" fill="#cbd5e1" fontSize="11" textAnchor="middle" fontWeight="600">
          {id}
        </text>
      </g>
    ),
  },
};
