# Embedded C++ · MilTech

Slug: `embedded_cpp`
Group: deep
Hub: `/embedded-cpp`
Freemium: first 5 non-exam lesson(s) open without Pro.

## What this course is

C++ for constrained systems and miltech stack: memory, CMake, networking, FreeRTOS, MAVLink, safety, data-link, mission, simulation — deep track + unit exams + labs.

## Program

### `miltech-intro` — MilTech intro · C++

- `ec-miltech-path` — C++ specifics in Military Tech [free] (6 exercises)
- `ec-types-ops` — Types, operators, conditions, bitmap [free] (6 exercises)
- `ec-loops-fn` — Loops, functions, main event loop [free] (5 exercises)
- `ec-determinism-logs` — Determinism, logs, coding standards [free] (5 exercises)
- `ec-intro-exam` — Exam: intro [exam] (7 exercises)

### `memory` — Memory & structures

- `ec-arrays-ptr` — Arrays, strings, pointers [free] (5 exercises)
- `ec-struct-align` — Structs, enum, union, alignment (5 exercises)
- `ec-endian-pack` — Endianness, packed layout, ownership (5 exercises)
- `ec-mem-exam` — Exam: memory [exam] (7 exercises)

### `resources` — Resources & I/O

- `ec-files-threads` — Files and multithreading (5 exercises)
- `ec-heap-raii` — Dynamic memory & RAII (4 exercises)
- `ec-ownership-patterns` — Ownership patterns · no-leak habits (5 exercises)
- `ec-res-exam` — Exam: resources [exam] (6 exercises)

### `linux-dev` — Linux · Bash · Git

- `ec-linux-bash` — Linux FS, terminal, bash (5 exercises)
- `ec-containers-git` — Containers & Git (4 exercises)
- `ec-field-deploy` — Field deploy · logs · transfer (5 exercises)
- `ec-linux-exam` — Exam: linux/git [exam] (6 exercises)

### `oop-stl` — OOP · templates · STL

- `ec-oop-basics` — Classes, encapsulation, virtual (4 exercises)
- `ec-templates-stl` — Templates, vector, smart pointers (5 exercises)
- `ec-drivers-poly` — Driver interfaces · complexity (5 exercises)
- `ec-oop-exam` — Exam: OOP/STL [exam] (6 exercises)

### `toolchain` — CMake · debug · tests

- `ec-cmake-build` — Build: stages, make, CMake (4 exercises)
- `ec-debug-test` — GDB, sanitizers, GTest, clean code (4 exercises)
- `ec-ci-firmware` — CI · golden tests · static analysis (5 exercises)
- `ec-tool-exam` — Exam: toolchain [exam] (6 exercises)

### `networking` — Protocols · UDP/TCP

- `ec-osi-serial` — OSI, serialization, CRC (4 exercises)
- `ec-udp-tcp` — UDP vs TCP, sockets (5 exercises)
- `ec-framing-seq` — Framing · sequence · retransmit (5 exercises)
- `ec-net-exam` — Exam: networking [exam] (7 exercises)

### `miltech-checkpoint` — Checkpoint · mid exam

- `ec-mid-exam` — MilTech mid-course exam [exam] (10 exercises)

### `qt-qml` — Qt · QML · MVC

- `ec-qt-arch` — Qt: signals/slots, event loop (4 exercises)
- `ec-qml-mvc` — QML, data models, MVC (4 exercises)
- `ec-ops-hmi` — Operator HMI · signal storms (5 exercises)
- `ec-qt-exam` — Exam: Qt/QML [exam] (6 exercises)

### `ros2` — ROS 2

- `ec-ros-nodes` — Nodes, topics, services (4 exercises)
- `ec-ros-launch` — Launch, params, bags (4 exercises)
- `ec-ros-qos-life` — QoS · lifecycle · separation (5 exercises)
- `ec-ros-exam` — Exam: ROS 2 [exam] (6 exercises)

### `embedded-rtos` — MCU · peripheral · FreeRTOS

- `ec-mcu-arch` — MCU architecture, registers, IRQ (4 exercises)
- `ec-periph-rtos` — UART/I2C/SPI · FreeRTOS (4 exercises)
- `ec-watchdog-sync` — Watchdog · ISR vs task · priorities (6 exercises)
- `ec-emb-exam` — Exam: embedded/RTOS [exam] (7 exercises)

### `uav-stack` — SBC · drones · MAVLink

- `ec-sbc-roles` — SBC roles · flight stack (4 exercises)
- `ec-mavlink-sim` — MAVLink · Gazebo/SITL/QGC (4 exercises)
- `ec-failsafe-rates` — Failsafe concepts · message rates (5 exercises)
- `ec-uav-exam` — Exam: UAV stack [exam] (6 exercises)

### `safety-reliability` — Safety · reliability

- `ec-watchdog-bit` — Watchdog · BIT · self-test (4 exercises)
- `ec-failsafe-fmea` — Fail-safe modes · FMEA-light (4 exercises)
- `ec-safe-coding` — Safe coding habits for field (4 exercises)
- `ec-safety-exam` — Exam: safety [exam] (6 exercises)

### `datalink-ops` — Data-link · ops

- `ec-link-quality` — Link quality · RSSI concepts (4 exercises)
- `ec-rate-budget` — Rate limits · bandwidth budget (4 exercises)
- `ec-duty-cycle` — Duty cycle · fairness · queues (4 exercises)
- `ec-datalink-exam` — Exam: datalink [exam] (6 exercises)

### `mission-autonomy` — Mission · autonomy basics

- `ec-waypoints` — Waypoints · path following (4 exercises)
- `ec-state-machine` — Mission state machine (4 exercises)
- `ec-geofence-sim` — Safety boundaries · sim validation (4 exercises)
- `ec-mission-exam` — Exam: mission [exam] (6 exercises)

### `safety_critical_scenarios` — Scenario: Embedded Safety & Fault Debugging

- `cpp-scen-watchdog-and-isr` — Safe ISR execution & Watchdog refresh (3 exercises)
- `cpp-scen-buffer-overflow-safety` — Buffer overflow prevention in telemetry buffers (2 exercises)
- `cpp-scen-failsafe-state-machine` — Fail-safe state machine & link loss emergency (2 exercises)
- `cpp-safe-exam` — Exam: embedded safety & debugging [exam] (6 exercises)

### `debug_simulation_boundaries` — Debugging & Simulation vs Hardware

- `ec-host-sim-vs-mcu` — Host / Browser Simulation vs Target Hardware (2 exercises)
- `ec-sanitizers-gdb` — Compiler Warnings, Sanitizers & GDB Workflows (2 exercises)
- `ec-dsb-exam` — Checkpoint: Debugging & Simulation Boundaries [exam] (6 exercises)

### `systems-capstone` — Systems · capstone

- `ec-video-crypto` — Video concepts · crypto basics (4 exercises)
- `ec-pid-control` — PID control intro (6 exercises)
- `ec-project-ringbuf` — Project: ring buffer (1 exercises)
- `ec-project-packet` — Project: framed packet (1 exercises)
- `ec-capstone-telemetry` — Capstone: telemetry packet + sim step (1 exercises)
- `ec-filters-rate` — Filters · moving average · rate limit (4 exercises)
- `ec-cap-exam` — Final Embedded C++ exam [exam] (12 exercises)

## Depth now

- Units: 18
- Lessons: 72
- Exams: 18
- Free non-exam lessons: 5
- Exercise types in seed: code_fill, code_order, code_output, code_project, code_read, code_run, match, mcq

