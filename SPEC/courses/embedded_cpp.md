# Embedded C++ · MilTech

Slug: `embedded_cpp`
Group: deep
Hub: `/embedded-cpp`
Freemium: the first 5 non-exam lessons in path order.

## What this course is

C++ for constrained systems and miltech stack: memory, CMake, networking, FreeRTOS, MAVLink, safety, data-link, mission, simulation — deep track + unit exams + labs.

## Program

### `miltech-intro` — MilTech intro · C++

- `ec-miltech-path` — C++ specifics in Military Tech. In MilTech systems C++ is often chosen for: (6 exercises)
- `ec-types-ops` — Types, operators, conditions, bitmap. uint8_t in embedded usually means: (6 exercises)
- `ec-loops-fn` — Loops, functions, main event loop. for loop (5 exercises)
- `ec-determinism-logs` — Determinism, logs, coding standards. Determinism in a control loop means: (5 exercises)
- `ec-intro-exam` — Exam: intro. Exam. C++ in MilTech valued for: (7 exercises)

### `memory` — Memory & structures

- `ec-arrays-ptr` — Arrays, strings, pointers. An array in C++ is laid out as: (5 exercises)
- `ec-struct-align` — Structs, enum, union, alignment. Telemetry struct (5 exercises)
- `ec-endian-pack` — Endianness, packed layout, ownership. Little-endian means: (5 exercises)
- `ec-mem-exam` — Exam: memory. Exam. pointer (7 exercises)

### `resources` — Resources & I/O

- `ec-files-threads` — Files and multithreading. Open ifstream (5 exercises)
- `ec-heap-raii` — Dynamic memory & RAII. Heap (dynamic memory) differs in that: (4 exercises)
- `ec-ownership-patterns` — Ownership patterns · no-leak habits. unique_ptr vs shared_ptr: (5 exercises)
- `ec-res-exam` — Exam: resources. Exam. ifstream (6 exercises)

### `linux-dev` — Linux · Bash · Git

- `ec-linux-bash` — Linux FS, terminal, bash. Linux paths (5 exercises)
- `ec-containers-git` — Containers & Git. Containers help dev because: (4 exercises)
- `ec-field-deploy` — Field deploy · logs · transfer. scp file to device (5 exercises)
- `ec-linux-exam` — Exam: linux/git. Exam. ls (6 exercises)

### `oop-stl` — OOP · templates · STL

- `ec-oop-basics` — Classes, encapsulation, virtual. Class (4 exercises)
- `ec-templates-stl` — Templates, vector, smart pointers. Function template (5 exercises)
- `ec-drivers-poly` — Driver interfaces · complexity. Abstract Sensor interface helps: (5 exercises)
- `ec-oop-exam` — Exam: OOP/STL. Exam. class (6 exercises)

### `toolchain` — CMake · debug · tests

- `ec-cmake-build` — Build: stages, make, CMake. Stages (4 exercises)
- `ec-debug-test` — GDB, sanitizers, GTest, clean code. AddressSanitizer helps find: (4 exercises)
- `ec-ci-firmware` — CI · golden tests · static analysis. CI for firmware should: (5 exercises)
- `ec-tool-exam` — Exam: toolchain. Exam. add_executable (6 exercises)

### `networking` — Protocols · UDP/TCP

- `ec-osi-serial` — OSI, serialization, CRC. The OSI model describes: (4 exercises)
- `ec-udp-tcp` — UDP vs TCP, sockets. UDP vs TCP (5 exercises)
- `ec-framing-seq` — Framing · sequence · retransmit. Frame usually includes: (5 exercises)
- `ec-net-exam` — Exam: networking. Exam. Serialization: (7 exercises)

### `miltech-checkpoint` — Checkpoint · mid exam

- `ec-mid-exam` — MilTech mid-course exam. Exam. C++ field priority: (10 exercises)

### `qt-qml` — Qt · QML · MVC

- `ec-qt-arch` — Qt: signals/slots, event loop. Qt is: (4 exercises)
- `ec-qml-mvc` — QML, data models, MVC. QML vs QtWidgets: (4 exercises)
- `ec-ops-hmi` — Operator HMI · signal storms. HMI for operators should: (5 exercises)
- `ec-qt-exam` — Exam: Qt/QML. Exam. moc is for: (6 exercises)

### `ros2` — ROS 2

- `ec-ros-nodes` — Nodes, topics, services. ROS 2 node is: (4 exercises)
- `ec-ros-launch` — Launch, params, bags. Launch files help: (4 exercises)
- `ec-ros-qos-life` — QoS · lifecycle · separation. QoS reliability: (5 exercises)
- `ec-ros-exam` — Exam: ROS 2. Exam. Topic is: (6 exercises)

### `embedded-rtos` — MCU · peripheral · FreeRTOS

- `ec-mcu-arch` — MCU architecture, registers, IRQ. A microcontroller (MCU) is: (4 exercises)
- `ec-periph-rtos` — UART/I2C/SPI · FreeRTOS. Buses (4 exercises)
- `ec-watchdog-sync` — Watchdog · ISR vs task · priorities. Watchdog timer purpose: (6 exercises)
- `ec-emb-exam` — Exam: embedded/RTOS. Exam. MCU includes: (7 exercises)

### `uav-stack` — SBC · drones · MAVLink

- `ec-sbc-roles` — SBC roles · flight stack. Architecture roles (4 exercises)
- `ec-mavlink-sim` — MAVLink · Gazebo/SITL/QGC. MAVLink is: (4 exercises)
- `ec-failsafe-rates` — Failsafe concepts · message rates. Failsafe mode example (concept): (5 exercises)
- `ec-uav-exam` — Exam: UAV stack. Exam. Companion computer: (6 exercises)

### `safety-reliability` — Safety · reliability

- `ec-watchdog-bit` — Watchdog · BIT · self-test. Built-in test (BIT) checks: (4 exercises)
- `ec-failsafe-fmea` — Fail-safe modes · FMEA-light. FMEA-light asks: (4 exercises)
- `ec-safe-coding` — Safe coding habits for field. Assert vs production checks: (4 exercises)
- `ec-safety-exam` — Exam: safety. Exam. Watchdog: (6 exercises)

### `datalink-ops` — Data-link · ops

- `ec-link-quality` — Link quality · RSSI concepts. Link quality metrics help: (4 exercises)
- `ec-rate-budget` — Rate limits · bandwidth budget. Bandwidth budget means: (4 exercises)
- `ec-duty-cycle` — Duty cycle · fairness · queues. Duty cycle limits: (4 exercises)
- `ec-datalink-exam` — Exam: datalink. Exam. Link quality used to: (6 exercises)

### `mission-autonomy` — Mission · autonomy basics

- `ec-waypoints` — Waypoints · path following. Waypoint mission is: (4 exercises)
- `ec-state-machine` — Mission state machine. State machine helps: (4 exercises)
- `ec-geofence-sim` — Safety boundaries · sim validation. Geofence as safety boundary: (4 exercises)
- `ec-mission-exam` — Exam: mission. Exam. Waypoint: (6 exercises)

### `safety_critical_scenarios` — Scenario: Embedded Safety & Fault Debugging

- `cpp-scen-watchdog-and-isr` — Safe ISR execution & Watchdog refresh. Why malloc() and printf() are forbidden inside Interrupt Service Routines (3 exercises)
- `cpp-scen-buffer-overflow-safety` — Buffer overflow prevention in telemetry buffers. Diagnose telemetry packet buffer overflow (2 exercises)
- `cpp-scen-failsafe-state-machine` — Fail-safe state machine & link loss emergency. Drone onboard computer actions on link loss (2 exercises)
- `cpp-safe-exam` — Exam: embedded safety & debugging. Exam. Why does MISRA C++ prohibit dynamic memory allocation after startup? (6 exercises)

### `systems-capstone` — Systems · capstone

- `ec-video-crypto` — Video concepts · crypto basics. Video pipeline concept: (4 exercises)
- `ec-pid-control` — PID control intro. PID uses: (6 exercises)
- `ec-project-ringbuf` — Project: ring buffer. C++ mini: ring buffer push/pop + size; README: concurrency notes (ISR vs task). (1 exercises)
- `ec-project-packet` — Project: framed packet. C++ mini: frame {seq,len,payload,crc}; encode/decode + crc16 stub; README: UDP vs TCP choice. (1 exercises)
- `ec-capstone-telemetry` — Capstone: telemetry packet + sim step. C++ mini: Telemetry {x,y,yaw} struct, encode/decode to byte buffer, simple crc16 stub, step_waypoint() updates pose. README: MCU vs SBC vs GCS. (1 exercises)
- `ec-filters-rate` — Filters · moving average · rate limit. Moving average helps: (4 exercises)
- `ec-cap-exam` — Final Embedded C++ exam. Exam. C++ in MilTech prioritizes: (12 exercises)

## Depth now

- Units: 17
- Lessons: 69
- Exams: 17
- Free non-exam lessons after the freemium pass: 5
- Exercise types in the seed: code_fill, code_order, code_output, code_project, code_read, code_run, match, mcq

Depth here is the seeded player, not a lab you run on a VM. A lesson covers the point in its bullet. It does not add topics that are absent from that bullet.

## Not in this course

The web programming path. This track is C++ for constrained systems: memory, CMake, UDP/TCP, Qt/QML concepts, ROS 2, FreeRTOS, MAVLink, and safety.
