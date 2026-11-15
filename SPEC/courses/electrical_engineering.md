# Electrical Engineering

Slug: `electrical_engineering`
Group: skill
Hub: `/courses/electrical_engineering`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: none
Recommended next: `embedded_cpp`, `programming`

## What this course is

A course in electrical engineering for independent study, with Ukrainian and English lesson text, covering 10 stages, 60 modules (units), and 360 lessons including 60 unit exams. Electrical machines and electromechanics are part of the wider electrical engineering curriculum, not a separate registered course. No prior course is required; the curriculum introduces the mathematics used later.

The course includes an ngspice WebAssembly laboratory, personal cloud projects, and ten graded `circuit_lab` exercise cards across the current curriculum. Intermediate cards cover a loaded divider (`ee-12-l2`), a wrong Thévenin resistance the learner must correct (`ee-12-l5`), and an RC charge near one time constant (`ee-17-l1`). The buck card states that it checks the averaged regime, and the phase card states that it is one phase of the machine equivalent. Single-keyword explanations also require a second point taken from the sample's own check. These cards are separate from the 13 ForgeBoard downloadable local practice packs. Most lessons use numeric, multiple-choice, matching, and explanation checks; not every module contains a graded simulation. English localization still has gaps in matching choices and laboratory UI; see [current follow-up work](../CURRENT.md#learning-quality-follow-up).

Three capstone projects conclude the course:
1. **Capstone Project 1 (Unit 58)**: Analog sensor front-end. A 5 V Wheatstone bridge, differential gain near 100, 1.65 V bias, and a separate first-order RC low-pass at 1 kHz. The graded lab is an operating-point card plus an AC card. It is not a Sallen-Key stage, and the ideal op-amp model has no supply rails.
2. **Capstone Project 2 (Unit 59)**: Buck converter from 18–24 V to 5 V at 0.1–1 A. The graded schematic is the DC average model (duty times input, inductor DCR, load). Ripple, CCM boundary, loss, and the load-step estimate are numeric checks. The lab does not run a switching transient.
3. **Capstone Project 3 (Unit 60)**: Three-phase installation at 400 V, 50 Hz. Line impedance, compensation to a power factor of at least 0.95, and unbalance are calculated. The graded schematic is one phase of the electrical motor equivalent. It is not a mechanical machine model.

## Curriculum Structure

The course is divided into 10 stages matching `COURSE_PARTS`:

### Stage 1: Nature of Electricity (Units 1–6)
- `ee-01-matter-charge`: Structure of matter, charge quantization, conductors and dielectrics.
- `ee-02-electric-field`: Electric field, Coulomb force, electrostatic potential.
- `ee-03-current-voltage`: Current, voltage, DC sources, and charge flow direction.
- `ee-04-si-units-math`: SI units, metric prefixes, dimensional analysis, and formula manipulation.
- `ee-05-resistance-ohm`: Resistance, conductance, Ohm's law, and temperature coefficient.
- `ee-06-work-power-safety`: Work, power, energy, efficiency, and electrical safety.

### Stage 2: DC Circuits (Units 7–12)
- `ee-07-schematics-meters`: Schematic symbols, nodes, branches, ground reference, and meter connections.
- `ee-08-series-parallel`: Series, parallel, and mixed resistor networks.
- `ee-09-dividers-loaded`: Voltage and current dividers under load.
- `ee-10-kirchhoff-laws`: Kirchhoff's laws (KCL/KVL), sign conventions, and power balance.
- `ee-11-nodal-analysis`: Node voltage method and linear equation systems.
- `ee-12-mesh-thevenin-norton`: Mesh currents, superposition, Thévenin and Norton equivalent circuits.

### Stage 3: Components & Transients (Units 13–18)
- `ee-13-real-resistors`: Real resistors, potentiometers, tolerances, and measurement.
- `ee-14-capacitors-dielectrics`: Capacitors, dielectrics, energy storage, and connections.
- `ee-15-inductors-magnetic`: Magnetic fields, induction, inductors, and mutual inductance.
- `ee-16-math-transients`: Exponentials, logarithms, derivatives, and integrals in circuit differential equations.
- `ee-17-rc-rl-transients`: RC and RL transient response, time constants, and initial conditions.
- `ee-18-rlc-second-order`: RLC circuits, second-order ODEs, damping, and oscillations.

### Stage 4: Alternating Current (Units 19–24)
- `ee-19-ac-sine-rms`: Trigonometry, sinusoidal waves, frequency, phase, and RMS value.
- `ee-20-complex-phasors`: Complex numbers, rectangular/polar forms, and phasor diagrams.
- `ee-21-impedance-admittance`: Complex impedance and admittance of R, L, C elements.
- `ee-22-ac-circuit-analysis`: AC circuit calculation using nodal and mesh methods.
- `ee-23-ac-power-factor`: Active, reactive, and apparent power, power factor correction.
- `ee-24-resonance-bode`: Series/parallel resonance, quality factor Q, and Bode frequency response.

### Stage 5: Semiconductors & Analog Circuits (Units 25–30)
- `ee-25-semiconductors-diodes`: Semiconductor physics, p-n junction, diodes, and LEDs.
- `ee-26-rectifiers-filters`: Half-wave and bridge rectifiers, capacitor smoothing, and clippers.
- `ee-27-zeners-linear-reg`: Zener breakdown, voltage references, and 3-terminal linear regulators.
- `ee-28-bjt-circuits`: BJT NPN/PNP: operating regions, biasing, switch, and amplifier.
- `ee-29-mosfet-switches`: MOSFET: enhancement modes, gate driving, and switching losses.
- `ee-30-opamp-foundations`: Operational amplifiers, negative feedback, and fundamental topologies.

### Stage 6: Signals, Measurement & Digital Nodes (Units 31–36)
- `ee-31-filters-laplace`: Passive and active filters, transfer functions, and Laplace transform basics.
- `ee-32-real-opamps`: Practical op-amp limitations: bandwidth, slew rate, noise, and compensation.
- `ee-33-comparators-timers`: Comparators, Schmitt triggers with hysteresis, and 555 timers.
- `ee-34-boolean-cmos`: Boolean algebra, logic gates, and CMOS voltage levels.
- `ee-35-flipflops-counters`: Flip-flops (D, JK), synchronous counters, and timing diagrams.
- `ee-36-sensors-adc-dac`: Sensors, Wheatstone bridges, ADC, DAC, and sampling.

### Stage 7: Power Electronics (Units 37–42)
- `ee-37-power-switches-pwm`: Power switches (MOSFET/IGBT), PWM, gate drivers, and snubbers.
- `ee-38-buck-converters`: Step-down (Buck) converter: CCM, inductor ripple, and output capacitor sizing.
- `ee-39-boost-buckboost`: Step-up (Boost) and inverting Buck-Boost converters.
- `ee-40-isolated-flyback`: Galvanic isolation, coupled inductors, and Flyback topology.
- `ee-41-bridge-inverters`: Half-bridge, H-bridge, inverters, and synchronous rectification.
- `ee-42-magnetics-thermal`: Power magnetics, core saturation, losses, and thermal heatsink calculations.

### Stage 8: Power Systems & Electrical Machines (Units 43–48)
- `ee-43-three-phase-systems`: Single-phase and three-phase systems, Star and Delta configurations.
- `ee-44-unbalanced-loads`: Symmetrical and asymmetrical loads, neutral conductor current, and compensation.
- `ee-45-transformers`: Single and three-phase transformers, equivalent circuit, regulation, and testing.
- `ee-46-dc-machines`: DC machines, back-EMF, and torque-speed characteristics.
- `ee-47-induction-motors`: Squirrel-cage induction motors, slip, starting methods, and torque curves.
- `ee-48-synchronous-bldc`: Synchronous machines, Brushless DC (BLDC) motors, and variable frequency drives.

### Stage 9: Practical Engineering (Units 49–54)
- `ee-49-instruments-probes`: DMM, dual-channel oscilloscope, function generator, and 10x probes.
- `ee-50-measurement-errors-rms`: Error analysis, oscilloscope bandwidth, True RMS, and aliasing.
- `ee-51-datasheets-soa`: Reading datasheets, Safe Operating Area (SOA), and component selection.
- `ee-52-protection-grounding`: Short circuits, overloads, fuses, circuit breakers, RCD, and earthing.
- `ee-53-distribution-drops`: Conductor ampacity, voltage drop calculations, and distribution panels.
- `ee-54-relays-motor-control`: Relays, contactors, auxiliary contacts, and motor control circuits.

### Stage 10: Design & Capstone Projects (Units 55–60)
- `ee-55-worst-case-monte-carlo`: Tolerances, thermal coefficients, worst-case, and Monte Carlo SPICE analysis.
- `ee-56-troubleshooting-reports`: Fault finding methodologies, test plans, and engineering documentation.
- `ee-57-pcb-emc-parasitics`: PCB physical layout: return paths, ground planes, decoupling, and EMC.
- `ee-58-project-analog-frontend`: Capstone Project 1 — Analog Sensor Front-End (`passThreshold: 1.0`).
- `ee-59-project-power-supply`: Capstone Project 2 — Switching Power Supply (`passThreshold: 1.0`).
- `ee-60-project-three-phase`: Capstone Project 3 — Three-Phase Industrial Installation (`passThreshold: 1.0`).

## Version 2 contracts

Lesson and unit slugs stay as listed above. Rewritten exercises use new ids that contain `v2` and `contentVersion: "2"`. `lessons.content_version` is 2 for this course (migration `0040_content_version`). A completed progress row counts toward the current certificate only when `completed_content_version` is at least the lesson version. A null completed version is historical version 1: XP and the attempt stay, the course page marks `historicalCompletion`, and the new certificate is not issued.

Seed update does not set `courses.status`. A sync cannot republish a course that was moved back to draft.

Canonical circuit exercise fields are `circuit`, `analysis`, `constraints`, and `criteria`. The learner answer is `{ circuit }`. `POST /circuits/simulate` is authenticated and returns `{ ok: true, result }`. Project routes return `{ projects }` and `{ project }`. Guest preview stays in the browser; guest lesson submit still uses the limited server path.

Electrical connectivity comes from wires and junctions. Coordinates are display only. An open pin is floating. Measurements distinguish signed, magnitude, RMS, average, and peak-to-peak values. DC power is the signed product. AC gain is the complex ratio. Structural checks run before SPICE. Client flags do not grade a lab.

Exams store form A and form B, ten items each, at most four multiple-choice items, and no concept or explain cards. The server selects one form from the learner and the attempt, and hides worked solutions until that form is mastered. Project exams (units 58–60) use `passThreshold: 1.0`.

Opening or submitting a unit exam as an authenticated learner requires current-version completion of all non-exam lessons in that unit. The exam board uses the same content-version completion rule. Course prerequisites remain guidance; these unit exam readiness checks are separate from prerequisite advice and from payment access.

## Implemented learning-quality fixes (2026-11-15)

- Numeric checks use tolerances scaled to the expected quantity. The first-stage helper no longer applies a `1e-6` absolute floor, and shared numeric grading uses magnitude-scaled floating-point slack instead of a fixed `1e-12`. Charge checks reject zero and the wrong sign for nonzero targets.
- Multiple-choice options use a deterministic display order derived from the exercise id. Answers retain their original content indices, including keyboard selection and after reload; authored `correctIndex` values are not rewritten.
- Lesson submission consumes reported hint use, solution views, and wrong attempts when calculating mastery evidence. Theory-only acknowledgements do not establish independent mastery. These signals are client-reported and currently do not survive a lesson reload.
- Global Continue selects an unfinished current-version lesson and skips locked exams. Completed courses do not receive a repeat lesson as their Continue target.
- The laboratory remounts its editor when restoring or replacing a document, preserves document analysis settings, pauses autosave on a conflict, and offers save-as-copy alongside loading the server version and JSON export.

Known recovery, evidence, recommendation, and localization limitations are tracked in [CURRENT](../CURRENT.md#learning-quality-follow-up). These fixes do not mean that the entire learning-flow improvement plan is complete.

## Lesson standard

Each instructional lesson states a question, a physical model, the mathematics before it is applied, one fully worked example, at least three checks of two different kinds, a characteristic mistake with the model limit, and an explain-in-your-own-words close. Module `ee-01-matter-charge` does not use Ohm or Kirchhoff. Numeric targets are base-SI values with an explicit tolerance. Generators may convert units of a written problem. They do not invent the explanation from the lesson title.

## Capstone checks

Unit 58: 5 V bridge, sensor 990/1000/1010 Ω against 1 kΩ arms, differential gain near 100, 1.65 V output bias, first-order low-pass at 1 kHz, output inside 0–3.3 V. The ideal differential voltage at 1010 Ω is about 12.4 mV before gain. The simulator result sits a few millivolts away because the 100 kΩ input resistors load the bridge. Criteria use an absolute tolerance that covers that loading. A forced voltage source on the output node is rejected.

Unit 59: buck 18–24 V to 5 V at 0.1–1 A. Ideal duty at 24 V is 5/24. The lab source is that average voltage, not a pulse. Ripple and the 10 µs load-step sag are numeric estimates. A restarted DC solve is not an in-run step.

Unit 60: 400 V line, 50 Hz, 3 kW electrical input at power factor 0.75, star capacitor bank aimed at 0.95. The per-phase impedance is an electrical equivalent. It does not predict breakdown torque or starting. The lab grades the voltage on the 30 Ω resistor of one phase.

Module passports for the generated units are in `SPEC/courses/electrical-engineering-passports.md`. Units ee-01 through ee-08 and ee-37 are hand-authored in the stage sources and recorded in `SPEC/courses/electrical-engineering-hand-passports.md`. `ee-emit.mjs` appends that file when it rewrites the generated passports.

## Verification sources

Unit definitions follow the SI Brochure (BIPM): the ampere, second, metre, and kilogram are base units; the volt and ohm are derived. Classroom numbers are ideal lumped models. A lesson that uses a datasheet value or a cable resistance says that it is an assumption. SPICE grading uses the pinned `eecircuit-engine` 1.9.0 build recorded in `packages/circuit-engine/ENGINE-PIN.json`. The process timeout and the point cap bound a run. The pin does not by itself prove a 256 MiB linear-memory limit inside the vendor binary.
