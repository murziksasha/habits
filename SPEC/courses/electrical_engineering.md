# Electrical Engineering

Slug: `electrical_engineering`
Group: skill
Hub: `/courses/electrical_engineering`
Access: Free for every account (no Pro, trial, or paywall).
Prerequisites: none
Recommended next: `embedded_cpp`, `programming`

## What this course is

A comprehensive, fully bilingual (Ukrainian and English) professional course in electrical engineering covering 10 sequential stages, 60 modules (units), 360 lessons, integrated SPICE circuit laboratory simulations (powered by ngspice WebAssembly), project cloud persistence, and three independent capstone projects:
1. **Capstone Project 1 (Unit 58)**: Analog Sensor Front-End (Wheatstone bridge, differential amplification, 1 kHz Sallen-Key low-pass filter, and ADC interface).
2. **Capstone Project 2 (Unit 59)**: Switching Power Supply (Buck DC-DC converter 18–24 V → 5 V up to 1 A, PWM, continuous conduction, ripple and efficiency verification).
3. **Capstone Project 3 (Unit 60)**: Three-Phase Industrial Installation (400 V / 230 V source, feeder impedance, inductive motor load, power factor correction capacitor bank bringing $\cos\phi \ge 0.95$, and fault analysis).

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
