# 73 — Embedded C++ · MilTech deep track

## Course `embedded_cpp`

Deep track inspired by commercial «C++ for military tech» syllabi (C++ → Linux/tooling → networking → Qt → ROS 2 → embedded/RTOS → UAV stack → safety → data-link → mission → systems). Content is **original** EduForge material (UK + EN). Exercises use existing graders only (no C++ runtime / hardware beyond client JSCPP labs).

| Unit | Focus |
|------|--------|
| miltech-intro | MilTech context, types/ops/bitmap, loops, event loop, determinism/logs |
| memory | Arrays, pointers, struct/enum/union, endian/packed, ownership |
| resources | File I/O, threads, heap, RAII, ownership patterns |
| linux-dev | Linux FS, bash, SSH, containers, Git, field deploy |
| oop-stl | Classes, virtual, templates, STL, driver interfaces |
| toolchain | Compile stages, CMake, ASan, GTest, CI/golden tests |
| networking | OSI, serialization, CRC, UDP/TCP, framing/seq/retransmit |
| miltech-checkpoint | Mid-course cumulative exam (C++ · tools · net) |
| qt-qml | Signals/slots, moc, QML, MVC, operator HMI |
| ros2 | Nodes, topics, services, launch, QoS, lifecycle |
| embedded-rtos | MCU, IRQ, UART/I2C/SPI, FreeRTOS, watchdog/priorities |
| uav-stack | SBC roles, MAVLink, Gazebo/SITL/QGC, failsafe rates |
| safety-reliability | BIT, fail-safe, FMEA-light, safe coding habits |
| datalink-ops | Link quality, bandwidth budget, duty cycle, anti-flood |
| mission-autonomy | Waypoints, state machines, geofence-as-safety, sim validation |
| systems-capstone | Video/crypto concepts, PID, filters, 3× `code_project`, final exam |

**Volume targets:** ≥14 units, ≥55 lessons (incl. exams), ≥14 exams (≥6 items each), ≥15 `code_run` labs, ≥3 `code_project`.

Unit exams ≥70%. Hub: `/embedded-cpp`.

Migration: `0024_embedded_cpp`  
Achievements: `embedded_cpp_start`, `embedded_cpp_deep`, `embedded_cpp_exams`, `embedded_cpp_complete`  
XP weight: `1.1`  
Flashcards: deck `miltech-embedded`

## Grading note

Theory + code reading/fill for systems topics (ROS, FreeRTOS, MAVLink, etc.). Capstone projects are `code_project` with substring checks on C++/README (ring buffer, framed packet, telemetry).

**Runnable labs:** selected lessons use `code_run` (client C++ via JSCPP — SPEC 74). Not full clang; no server judge. Prefer loops, bit ops, clamp, ring index, checksums, PID P-term, sequence wrap.

## Content safety

Educational systems engineering: reliability, telemetry, simulation, fail-safe concepts. No weapon guidance or exploit content.

## Related

- SPEC 05 courses & content
- SPEC 60 unit exams
- SPEC 71 Express fundamentals (wiring pattern)
- SPEC 74 C++ WASM / JSCPP playground
