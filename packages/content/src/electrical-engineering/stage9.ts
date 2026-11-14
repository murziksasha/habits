import type { UnitContent } from "../types.js";
import {
  createConcept,
  createExplain,
  createNumeric,
  createCircuitLab,
  createMcq,
  createLesson,
  createUnit,
} from "./helpers.js";

/**
 * Stage 9: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)
 */
export const stage9Units: UnitContent[] = [
  createUnit({
    slug: "ee-49-instruments-probes",
    titleUk: "Мультиметр, осцилограф, генератор, щупи та помилки",
    titleEn: "Multimeters, Oscilloscopes, Probes & Measurement Traps",
    lessons: [
      createLesson({
        slug: "ee-49-l1",
        titleUk: "Мультиметр, осцилограф, генератор, щупи та помилки (Частина 1)",
        titleEn: "Multimeters, Oscilloscopes, Probes & Measurement Traps (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-49-l1-c1",
            "promptUk": "Теоретичні основи: Мультиметр, осцилограф, генератор, щупи та помилки (Частина 1)",
            "promptEn": "Theoretical Foundations: Multimeters, Oscilloscopes, Probes & Measurement Traps (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Мультиметр, осцилограф, генератор, щупи та помилки». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Multimeters, Oscilloscopes, Probes & Measurement Traps'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-49-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Мультиметр, осцилограф, генератор, щупи та помилки»?",
            "promptEn": "Which core statement is correct regarding 'Multimeters, Oscilloscopes, Probes & Measurement Traps'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-49-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 62 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 62 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 93.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 62 * 1.5 = 93.0 В.",
            "explanationEn": "Calculation follows direct scaling: 62 * 1.5 = 93.0 V."
}),
          createNumeric({
            "id": "ee-49-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 62 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 62 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.403,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 62 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 62 A."
}),
          createExplain({
            "id": "ee-49-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Мультиметр, осцилограф, генератор, щупи та помилки»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Multimeters, Oscilloscopes, Probes & Measurement Traps':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-49-l2",
        titleUk: "Мультиметр, осцилограф, генератор, щупи та помилки (Частина 2)",
        titleEn: "Multimeters, Oscilloscopes, Probes & Measurement Traps (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-49-l2-c1",
            "promptUk": "Теоретичні основи: Мультиметр, осцилограф, генератор, щупи та помилки (Частина 2)",
            "promptEn": "Theoretical Foundations: Multimeters, Oscilloscopes, Probes & Measurement Traps (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Мультиметр, осцилограф, генератор, щупи та помилки». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Multimeters, Oscilloscopes, Probes & Measurement Traps'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-49-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Мультиметр, осцилограф, генератор, щупи та помилки»?",
            "promptEn": "Which core statement is correct regarding 'Multimeters, Oscilloscopes, Probes & Measurement Traps'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-49-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 67 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 67 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 100.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 67 * 1.5 = 100.5 В.",
            "explanationEn": "Calculation follows direct scaling: 67 * 1.5 = 100.5 V."
}),
          createNumeric({
            "id": "ee-49-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 67 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 67 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.373,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 67 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 67 A."
}),
          createExplain({
            "id": "ee-49-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Мультиметр, осцилограф, генератор, щупи та помилки»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Multimeters, Oscilloscopes, Probes & Measurement Traps':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-49-l3",
        titleUk: "Мультиметр, осцилограф, генератор, щупи та помилки (Частина 3)",
        titleEn: "Multimeters, Oscilloscopes, Probes & Measurement Traps (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-49-l3-c1",
            "promptUk": "Теоретичні основи: Мультиметр, осцилограф, генератор, щупи та помилки (Частина 3)",
            "promptEn": "Theoretical Foundations: Multimeters, Oscilloscopes, Probes & Measurement Traps (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Мультиметр, осцилограф, генератор, щупи та помилки». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Multimeters, Oscilloscopes, Probes & Measurement Traps'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-49-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Мультиметр, осцилограф, генератор, щупи та помилки»?",
            "promptEn": "Which core statement is correct regarding 'Multimeters, Oscilloscopes, Probes & Measurement Traps'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-49-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 72 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 72 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 108.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 72 * 1.5 = 108.0 В.",
            "explanationEn": "Calculation follows direct scaling: 72 * 1.5 = 108.0 V."
}),
          createNumeric({
            "id": "ee-49-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 72 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 72 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.347,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 72 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 72 A."
}),
          createExplain({
            "id": "ee-49-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Мультиметр, осцилограф, генератор, щупи та помилки»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Multimeters, Oscilloscopes, Probes & Measurement Traps':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-49-l4",
        titleUk: "Мультиметр, осцилограф, генератор, щупи та помилки (Частина 4)",
        titleEn: "Multimeters, Oscilloscopes, Probes & Measurement Traps (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-49-l4-c1",
            "promptUk": "Теоретичні основи: Мультиметр, осцилограф, генератор, щупи та помилки (Частина 4)",
            "promptEn": "Theoretical Foundations: Multimeters, Oscilloscopes, Probes & Measurement Traps (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Мультиметр, осцилограф, генератор, щупи та помилки». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Multimeters, Oscilloscopes, Probes & Measurement Traps'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-49-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Мультиметр, осцилограф, генератор, щупи та помилки»?",
            "promptEn": "Which core statement is correct regarding 'Multimeters, Oscilloscopes, Probes & Measurement Traps'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-49-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 77 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 77 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 115.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 77 * 1.5 = 115.5 В.",
            "explanationEn": "Calculation follows direct scaling: 77 * 1.5 = 115.5 V."
}),
          createCircuitLab({
            "id": "ee-49-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Мультиметр, осцилограф, генератор, щупи та помилки». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Multimeters, Oscilloscopes, Probes & Measurement Traps'. Run simulation and verify nodes.",
            "title": "Lab 49.4: Multimeters, Oscilloscopes, Probes & Measurement Traps",
            "netlist": "* EduForge SPICE Model for Unit 49\nV1 in 0 DC 10\nR1 in out 77k\nR2 out 0 42k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 3.529,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-49-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Мультиметр, осцилограф, генератор, щупи та помилки»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Multimeters, Oscilloscopes, Probes & Measurement Traps':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-49-l5",
        titleUk: "Мультиметр, осцилограф, генератор, щупи та помилки (Частина 5)",
        titleEn: "Multimeters, Oscilloscopes, Probes & Measurement Traps (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-49-l5-c1",
            "promptUk": "Теоретичні основи: Мультиметр, осцилограф, генератор, щупи та помилки (Частина 5)",
            "promptEn": "Theoretical Foundations: Multimeters, Oscilloscopes, Probes & Measurement Traps (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Мультиметр, осцилограф, генератор, щупи та помилки». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Multimeters, Oscilloscopes, Probes & Measurement Traps'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-49-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Мультиметр, осцилограф, генератор, щупи та помилки»?",
            "promptEn": "Which core statement is correct regarding 'Multimeters, Oscilloscopes, Probes & Measurement Traps'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-49-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 82 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 82 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 123.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 82 * 1.5 = 123.0 В.",
            "explanationEn": "Calculation follows direct scaling: 82 * 1.5 = 123.0 V."
}),
          createCircuitLab({
            "id": "ee-49-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Мультиметр, осцилограф, генератор, щупи та помилки». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Multimeters, Oscilloscopes, Probes & Measurement Traps'. Run simulation and verify nodes.",
            "title": "Lab 49.5: Multimeters, Oscilloscopes, Probes & Measurement Traps",
            "netlist": "* EduForge SPICE Model for Unit 49\nV1 in 0 DC 10\nR1 in out 82k\nR2 out 0 53k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 3.926,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-49-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Мультиметр, осцилограф, генератор, щупи та помилки»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Multimeters, Oscilloscopes, Probes & Measurement Traps':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-49-exam",
        titleUk: "Екзамен: Мультиметр, осцилограф, генератор, щупи та помилки",
        titleEn: "Exam: Multimeters, Oscilloscopes, Probes & Measurement Traps",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-49-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Мультиметр, осцилограф, генератор, щупи та помилки»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Multimeters, Oscilloscopes, Probes & Measurement Traps'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-49-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Мультиметр, осцилограф, генератор, щупи та помилки»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Multimeters, Oscilloscopes, Probes & Measurement Traps'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-49-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Мультиметр, осцилограф, генератор, щупи та помилки»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Multimeters, Oscilloscopes, Probes & Measurement Traps'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-49-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Мультиметр, осцилограф, генератор, щупи та помилки»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Multimeters, Oscilloscopes, Probes & Measurement Traps'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-49-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 500 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 500 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 250.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 500 = 250.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 500 = 250.0 V."
}),
          createNumeric({
            "id": "ee-49-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 502 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 502 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 251.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 502 = 251.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 502 = 251.0 V."
}),
          createNumeric({
            "id": "ee-49-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 504 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 504 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 252.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 504 = 252.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 504 = 252.0 V."
}),
          createNumeric({
            "id": "ee-49-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 506 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 506 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 253.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 506 = 253.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 506 = 253.0 V."
}),
          createCircuitLab({
            "id": "ee-49-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Мультиметр, осцилограф, генератор, щупи та помилки».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Multimeters, Oscilloscopes, Probes & Measurement Traps'.",
            "title": "Exam Lab 49.9: Multimeters, Oscilloscopes, Probes & Measurement Traps",
            "netlist": "* Exam Model 49_9\nV1 in 0 DC 12\nR1 in out 58k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.765,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-49-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Мультиметр, осцилограф, генератор, щупи та помилки».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Multimeters, Oscilloscopes, Probes & Measurement Traps'.",
            "title": "Exam Lab 49.10: Multimeters, Oscilloscopes, Probes & Measurement Traps",
            "netlist": "* Exam Model 49_10\nV1 in 0 DC 12\nR1 in out 59k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.739,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-50-measurement-errors-rms",
    titleUk: "Похибки, смуга вимірювання, True RMS та обробка даних",
    titleEn: "Measurement Errors, Bandwidth, True RMS & Result Processing",
    lessons: [
      createLesson({
        slug: "ee-50-l1",
        titleUk: "Похибки, смуга вимірювання, True RMS та обробка даних (Частина 1)",
        titleEn: "Measurement Errors, Bandwidth, True RMS & Result Processing (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-50-l1-c1",
            "promptUk": "Теоретичні основи: Похибки, смуга вимірювання, True RMS та обробка даних (Частина 1)",
            "promptEn": "Theoretical Foundations: Measurement Errors, Bandwidth, True RMS & Result Processing (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Похибки, смуга вимірювання, True RMS та обробка даних». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Measurement Errors, Bandwidth, True RMS & Result Processing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-50-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Похибки, смуга вимірювання, True RMS та обробка даних»?",
            "promptEn": "Which core statement is correct regarding 'Measurement Errors, Bandwidth, True RMS & Result Processing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-50-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 65 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 65 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 97.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 65 * 1.5 = 97.5 В.",
            "explanationEn": "Calculation follows direct scaling: 65 * 1.5 = 97.5 V."
}),
          createNumeric({
            "id": "ee-50-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 65 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 65 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.385,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 65 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 65 A."
}),
          createExplain({
            "id": "ee-50-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Похибки, смуга вимірювання, True RMS та обробка даних»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Measurement Errors, Bandwidth, True RMS & Result Processing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-50-l2",
        titleUk: "Похибки, смуга вимірювання, True RMS та обробка даних (Частина 2)",
        titleEn: "Measurement Errors, Bandwidth, True RMS & Result Processing (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-50-l2-c1",
            "promptUk": "Теоретичні основи: Похибки, смуга вимірювання, True RMS та обробка даних (Частина 2)",
            "promptEn": "Theoretical Foundations: Measurement Errors, Bandwidth, True RMS & Result Processing (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Похибки, смуга вимірювання, True RMS та обробка даних». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Measurement Errors, Bandwidth, True RMS & Result Processing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-50-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Похибки, смуга вимірювання, True RMS та обробка даних»?",
            "promptEn": "Which core statement is correct regarding 'Measurement Errors, Bandwidth, True RMS & Result Processing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-50-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 70 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 70 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 105.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 70 * 1.5 = 105.0 В.",
            "explanationEn": "Calculation follows direct scaling: 70 * 1.5 = 105.0 V."
}),
          createNumeric({
            "id": "ee-50-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 70 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 70 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.357,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 70 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 70 A."
}),
          createExplain({
            "id": "ee-50-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Похибки, смуга вимірювання, True RMS та обробка даних»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Measurement Errors, Bandwidth, True RMS & Result Processing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-50-l3",
        titleUk: "Похибки, смуга вимірювання, True RMS та обробка даних (Частина 3)",
        titleEn: "Measurement Errors, Bandwidth, True RMS & Result Processing (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-50-l3-c1",
            "promptUk": "Теоретичні основи: Похибки, смуга вимірювання, True RMS та обробка даних (Частина 3)",
            "promptEn": "Theoretical Foundations: Measurement Errors, Bandwidth, True RMS & Result Processing (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Похибки, смуга вимірювання, True RMS та обробка даних». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Measurement Errors, Bandwidth, True RMS & Result Processing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-50-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Похибки, смуга вимірювання, True RMS та обробка даних»?",
            "promptEn": "Which core statement is correct regarding 'Measurement Errors, Bandwidth, True RMS & Result Processing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-50-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 75 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 75 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 112.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 75 * 1.5 = 112.5 В.",
            "explanationEn": "Calculation follows direct scaling: 75 * 1.5 = 112.5 V."
}),
          createNumeric({
            "id": "ee-50-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 75 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 75 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.333,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 75 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 75 A."
}),
          createExplain({
            "id": "ee-50-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Похибки, смуга вимірювання, True RMS та обробка даних»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Measurement Errors, Bandwidth, True RMS & Result Processing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-50-l4",
        titleUk: "Похибки, смуга вимірювання, True RMS та обробка даних (Частина 4)",
        titleEn: "Measurement Errors, Bandwidth, True RMS & Result Processing (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-50-l4-c1",
            "promptUk": "Теоретичні основи: Похибки, смуга вимірювання, True RMS та обробка даних (Частина 4)",
            "promptEn": "Theoretical Foundations: Measurement Errors, Bandwidth, True RMS & Result Processing (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Похибки, смуга вимірювання, True RMS та обробка даних». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Measurement Errors, Bandwidth, True RMS & Result Processing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-50-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Похибки, смуга вимірювання, True RMS та обробка даних»?",
            "promptEn": "Which core statement is correct regarding 'Measurement Errors, Bandwidth, True RMS & Result Processing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-50-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 80 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 80 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 120.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 80 * 1.5 = 120.0 В.",
            "explanationEn": "Calculation follows direct scaling: 80 * 1.5 = 120.0 V."
}),
          createCircuitLab({
            "id": "ee-50-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Похибки, смуга вимірювання, True RMS та обробка даних». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Measurement Errors, Bandwidth, True RMS & Result Processing'. Run simulation and verify nodes.",
            "title": "Lab 50.4: Measurement Errors, Bandwidth, True RMS & Result Processing",
            "netlist": "* EduForge SPICE Model for Unit 50\nV1 in 0 DC 10\nR1 in out 80k\nR2 out 0 49k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 3.798,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-50-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Похибки, смуга вимірювання, True RMS та обробка даних»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Measurement Errors, Bandwidth, True RMS & Result Processing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-50-l5",
        titleUk: "Похибки, смуга вимірювання, True RMS та обробка даних (Частина 5)",
        titleEn: "Measurement Errors, Bandwidth, True RMS & Result Processing (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-50-l5-c1",
            "promptUk": "Теоретичні основи: Похибки, смуга вимірювання, True RMS та обробка даних (Частина 5)",
            "promptEn": "Theoretical Foundations: Measurement Errors, Bandwidth, True RMS & Result Processing (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Похибки, смуга вимірювання, True RMS та обробка даних». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Measurement Errors, Bandwidth, True RMS & Result Processing'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-50-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Похибки, смуга вимірювання, True RMS та обробка даних»?",
            "promptEn": "Which core statement is correct regarding 'Measurement Errors, Bandwidth, True RMS & Result Processing'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-50-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 85 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 85 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 127.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 85 * 1.5 = 127.5 В.",
            "explanationEn": "Calculation follows direct scaling: 85 * 1.5 = 127.5 V."
}),
          createCircuitLab({
            "id": "ee-50-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Похибки, смуга вимірювання, True RMS та обробка даних». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Measurement Errors, Bandwidth, True RMS & Result Processing'. Run simulation and verify nodes.",
            "title": "Lab 50.5: Measurement Errors, Bandwidth, True RMS & Result Processing",
            "netlist": "* EduForge SPICE Model for Unit 50\nV1 in 0 DC 10\nR1 in out 85k\nR2 out 0 10k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.053,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-50-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Похибки, смуга вимірювання, True RMS та обробка даних»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Measurement Errors, Bandwidth, True RMS & Result Processing':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-50-exam",
        titleUk: "Екзамен: Похибки, смуга вимірювання, True RMS та обробка даних",
        titleEn: "Exam: Measurement Errors, Bandwidth, True RMS & Result Processing",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-50-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Похибки, смуга вимірювання, True RMS та обробка даних»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Measurement Errors, Bandwidth, True RMS & Result Processing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-50-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Похибки, смуга вимірювання, True RMS та обробка даних»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Measurement Errors, Bandwidth, True RMS & Result Processing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-50-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Похибки, смуга вимірювання, True RMS та обробка даних»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Measurement Errors, Bandwidth, True RMS & Result Processing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-50-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Похибки, смуга вимірювання, True RMS та обробка даних»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Measurement Errors, Bandwidth, True RMS & Result Processing'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-50-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 510 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 510 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 255.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 510 = 255.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 510 = 255.0 V."
}),
          createNumeric({
            "id": "ee-50-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 512 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 512 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 256.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 512 = 256.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 512 = 256.0 V."
}),
          createNumeric({
            "id": "ee-50-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 514 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 514 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 257.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 514 = 257.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 514 = 257.0 V."
}),
          createNumeric({
            "id": "ee-50-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 516 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 516 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 258.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 516 = 258.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 516 = 258.0 V."
}),
          createCircuitLab({
            "id": "ee-50-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Похибки, смуга вимірювання, True RMS та обробка даних».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Measurement Errors, Bandwidth, True RMS & Result Processing'.",
            "title": "Exam Lab 50.9: Measurement Errors, Bandwidth, True RMS & Result Processing",
            "netlist": "* Exam Model 50_9\nV1 in 0 DC 12\nR1 in out 59k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.739,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-50-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Похибки, смуга вимірювання, True RMS та обробка даних».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Measurement Errors, Bandwidth, True RMS & Result Processing'.",
            "title": "Exam Lab 50.10: Measurement Errors, Bandwidth, True RMS & Result Processing",
            "netlist": "* Exam Model 50_10\nV1 in 0 DC 12\nR1 in out 60k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.714,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-51-datasheets-soa",
    titleUk: "Читання datasheet, граничні режими, SOA та вибір компонентів",
    titleEn: "Reading Datasheets, Safe Operating Area (SOA) & Selection",
    lessons: [
      createLesson({
        slug: "ee-51-l1",
        titleUk: "Читання datasheet, граничні режими, SOA та вибір компонентів (Частина 1)",
        titleEn: "Reading Datasheets, Safe Operating Area (SOA) & Selection (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-51-l1-c1",
            "promptUk": "Теоретичні основи: Читання datasheet, граничні режими, SOA та вибір компонентів (Частина 1)",
            "promptEn": "Theoretical Foundations: Reading Datasheets, Safe Operating Area (SOA) & Selection (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Читання datasheet, граничні режими, SOA та вибір компонентів». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Reading Datasheets, Safe Operating Area (SOA) & Selection'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-51-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Читання datasheet, граничні режими, SOA та вибір компонентів»?",
            "promptEn": "Which core statement is correct regarding 'Reading Datasheets, Safe Operating Area (SOA) & Selection'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-51-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 68 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 68 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 102.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 68 * 1.5 = 102.0 В.",
            "explanationEn": "Calculation follows direct scaling: 68 * 1.5 = 102.0 V."
}),
          createNumeric({
            "id": "ee-51-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 68 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 68 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.368,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 68 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 68 A."
}),
          createExplain({
            "id": "ee-51-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Читання datasheet, граничні режими, SOA та вибір компонентів»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Reading Datasheets, Safe Operating Area (SOA) & Selection':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-51-l2",
        titleUk: "Читання datasheet, граничні режими, SOA та вибір компонентів (Частина 2)",
        titleEn: "Reading Datasheets, Safe Operating Area (SOA) & Selection (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-51-l2-c1",
            "promptUk": "Теоретичні основи: Читання datasheet, граничні режими, SOA та вибір компонентів (Частина 2)",
            "promptEn": "Theoretical Foundations: Reading Datasheets, Safe Operating Area (SOA) & Selection (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Читання datasheet, граничні режими, SOA та вибір компонентів». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Reading Datasheets, Safe Operating Area (SOA) & Selection'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-51-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Читання datasheet, граничні режими, SOA та вибір компонентів»?",
            "promptEn": "Which core statement is correct regarding 'Reading Datasheets, Safe Operating Area (SOA) & Selection'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-51-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 73 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 73 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 109.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 73 * 1.5 = 109.5 В.",
            "explanationEn": "Calculation follows direct scaling: 73 * 1.5 = 109.5 V."
}),
          createNumeric({
            "id": "ee-51-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 73 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 73 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.342,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 73 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 73 A."
}),
          createExplain({
            "id": "ee-51-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Читання datasheet, граничні режими, SOA та вибір компонентів»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Reading Datasheets, Safe Operating Area (SOA) & Selection':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-51-l3",
        titleUk: "Читання datasheet, граничні режими, SOA та вибір компонентів (Частина 3)",
        titleEn: "Reading Datasheets, Safe Operating Area (SOA) & Selection (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-51-l3-c1",
            "promptUk": "Теоретичні основи: Читання datasheet, граничні режими, SOA та вибір компонентів (Частина 3)",
            "promptEn": "Theoretical Foundations: Reading Datasheets, Safe Operating Area (SOA) & Selection (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Читання datasheet, граничні режими, SOA та вибір компонентів». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Reading Datasheets, Safe Operating Area (SOA) & Selection'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-51-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Читання datasheet, граничні режими, SOA та вибір компонентів»?",
            "promptEn": "Which core statement is correct regarding 'Reading Datasheets, Safe Operating Area (SOA) & Selection'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-51-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 78 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 78 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 117.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 78 * 1.5 = 117.0 В.",
            "explanationEn": "Calculation follows direct scaling: 78 * 1.5 = 117.0 V."
}),
          createNumeric({
            "id": "ee-51-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 78 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 78 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.321,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 78 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 78 A."
}),
          createExplain({
            "id": "ee-51-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Читання datasheet, граничні режими, SOA та вибір компонентів»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Reading Datasheets, Safe Operating Area (SOA) & Selection':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-51-l4",
        titleUk: "Читання datasheet, граничні режими, SOA та вибір компонентів (Частина 4)",
        titleEn: "Reading Datasheets, Safe Operating Area (SOA) & Selection (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-51-l4-c1",
            "promptUk": "Теоретичні основи: Читання datasheet, граничні режими, SOA та вибір компонентів (Частина 4)",
            "promptEn": "Theoretical Foundations: Reading Datasheets, Safe Operating Area (SOA) & Selection (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Читання datasheet, граничні режими, SOA та вибір компонентів». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Reading Datasheets, Safe Operating Area (SOA) & Selection'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-51-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Читання datasheet, граничні режими, SOA та вибір компонентів»?",
            "promptEn": "Which core statement is correct regarding 'Reading Datasheets, Safe Operating Area (SOA) & Selection'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-51-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 83 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 83 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 124.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 83 * 1.5 = 124.5 В.",
            "explanationEn": "Calculation follows direct scaling: 83 * 1.5 = 124.5 V."
}),
          createCircuitLab({
            "id": "ee-51-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Читання datasheet, граничні режими, SOA та вибір компонентів». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Reading Datasheets, Safe Operating Area (SOA) & Selection'. Run simulation and verify nodes.",
            "title": "Lab 51.4: Reading Datasheets, Safe Operating Area (SOA) & Selection",
            "netlist": "* EduForge SPICE Model for Unit 51\nV1 in 0 DC 10\nR1 in out 83k\nR2 out 0 6k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 0.674,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-51-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Читання datasheet, граничні режими, SOA та вибір компонентів»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Reading Datasheets, Safe Operating Area (SOA) & Selection':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-51-l5",
        titleUk: "Читання datasheet, граничні режими, SOA та вибір компонентів (Частина 5)",
        titleEn: "Reading Datasheets, Safe Operating Area (SOA) & Selection (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-51-l5-c1",
            "promptUk": "Теоретичні основи: Читання datasheet, граничні режими, SOA та вибір компонентів (Частина 5)",
            "promptEn": "Theoretical Foundations: Reading Datasheets, Safe Operating Area (SOA) & Selection (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Читання datasheet, граничні режими, SOA та вибір компонентів». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Reading Datasheets, Safe Operating Area (SOA) & Selection'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-51-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Читання datasheet, граничні режими, SOA та вибір компонентів»?",
            "promptEn": "Which core statement is correct regarding 'Reading Datasheets, Safe Operating Area (SOA) & Selection'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-51-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 88 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 88 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 132.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 88 * 1.5 = 132.0 В.",
            "explanationEn": "Calculation follows direct scaling: 88 * 1.5 = 132.0 V."
}),
          createCircuitLab({
            "id": "ee-51-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Читання datasheet, граничні режими, SOA та вибір компонентів». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Reading Datasheets, Safe Operating Area (SOA) & Selection'. Run simulation and verify nodes.",
            "title": "Lab 51.5: Reading Datasheets, Safe Operating Area (SOA) & Selection",
            "netlist": "* EduForge SPICE Model for Unit 51\nV1 in 0 DC 10\nR1 in out 88k\nR2 out 0 17k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.619,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-51-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Читання datasheet, граничні режими, SOA та вибір компонентів»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Reading Datasheets, Safe Operating Area (SOA) & Selection':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-51-exam",
        titleUk: "Екзамен: Читання datasheet, граничні режими, SOA та вибір компонентів",
        titleEn: "Exam: Reading Datasheets, Safe Operating Area (SOA) & Selection",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-51-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Читання datasheet, граничні режими, SOA та вибір компонентів»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Reading Datasheets, Safe Operating Area (SOA) & Selection'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-51-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Читання datasheet, граничні режими, SOA та вибір компонентів»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Reading Datasheets, Safe Operating Area (SOA) & Selection'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-51-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Читання datasheet, граничні режими, SOA та вибір компонентів»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Reading Datasheets, Safe Operating Area (SOA) & Selection'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-51-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Читання datasheet, граничні режими, SOA та вибір компонентів»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Reading Datasheets, Safe Operating Area (SOA) & Selection'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-51-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 520 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 520 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 260.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 520 = 260.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 520 = 260.0 V."
}),
          createNumeric({
            "id": "ee-51-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 522 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 522 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 261.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 522 = 261.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 522 = 261.0 V."
}),
          createNumeric({
            "id": "ee-51-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 524 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 524 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 262.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 524 = 262.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 524 = 262.0 V."
}),
          createNumeric({
            "id": "ee-51-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 526 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 526 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 263.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 526 = 263.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 526 = 263.0 V."
}),
          createCircuitLab({
            "id": "ee-51-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Читання datasheet, граничні режими, SOA та вибір компонентів».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Reading Datasheets, Safe Operating Area (SOA) & Selection'.",
            "title": "Exam Lab 51.9: Reading Datasheets, Safe Operating Area (SOA) & Selection",
            "netlist": "* Exam Model 51_9\nV1 in 0 DC 12\nR1 in out 60k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.714,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-51-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Читання datasheet, граничні режими, SOA та вибір компонентів».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Reading Datasheets, Safe Operating Area (SOA) & Selection'.",
            "title": "Exam Lab 51.10: Reading Datasheets, Safe Operating Area (SOA) & Selection",
            "netlist": "* Exam Model 51_10\nV1 in 0 DC 12\nR1 in out 61k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.69,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-52-protection-grounding",
    titleUk: "Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення",
    titleEn: "Short Circuits, Overload, Fuses, RCD/GFCI & Grounding",
    lessons: [
      createLesson({
        slug: "ee-52-l1",
        titleUk: "Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення (Частина 1)",
        titleEn: "Short Circuits, Overload, Fuses, RCD/GFCI & Grounding (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-52-l1-c1",
            "promptUk": "Теоретичні основи: Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення (Частина 1)",
            "promptEn": "Theoretical Foundations: Short Circuits, Overload, Fuses, RCD/GFCI & Grounding (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-52-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»?",
            "promptEn": "Which core statement is correct regarding 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-52-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 71 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 71 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 106.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 71 * 1.5 = 106.5 В.",
            "explanationEn": "Calculation follows direct scaling: 71 * 1.5 = 106.5 V."
}),
          createNumeric({
            "id": "ee-52-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 71 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 71 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.352,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 71 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 71 A."
}),
          createExplain({
            "id": "ee-52-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-52-l2",
        titleUk: "Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення (Частина 2)",
        titleEn: "Short Circuits, Overload, Fuses, RCD/GFCI & Grounding (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-52-l2-c1",
            "promptUk": "Теоретичні основи: Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення (Частина 2)",
            "promptEn": "Theoretical Foundations: Short Circuits, Overload, Fuses, RCD/GFCI & Grounding (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-52-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»?",
            "promptEn": "Which core statement is correct regarding 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-52-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 76 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 76 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 114.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 76 * 1.5 = 114.0 В.",
            "explanationEn": "Calculation follows direct scaling: 76 * 1.5 = 114.0 V."
}),
          createNumeric({
            "id": "ee-52-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 76 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 76 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.329,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 76 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 76 A."
}),
          createExplain({
            "id": "ee-52-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-52-l3",
        titleUk: "Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення (Частина 3)",
        titleEn: "Short Circuits, Overload, Fuses, RCD/GFCI & Grounding (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-52-l3-c1",
            "promptUk": "Теоретичні основи: Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення (Частина 3)",
            "promptEn": "Theoretical Foundations: Short Circuits, Overload, Fuses, RCD/GFCI & Grounding (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-52-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»?",
            "promptEn": "Which core statement is correct regarding 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-52-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 81 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 81 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 121.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 81 * 1.5 = 121.5 В.",
            "explanationEn": "Calculation follows direct scaling: 81 * 1.5 = 121.5 V."
}),
          createNumeric({
            "id": "ee-52-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 81 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 81 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.309,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 81 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 81 A."
}),
          createExplain({
            "id": "ee-52-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-52-l4",
        titleUk: "Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення (Частина 4)",
        titleEn: "Short Circuits, Overload, Fuses, RCD/GFCI & Grounding (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-52-l4-c1",
            "promptUk": "Теоретичні основи: Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення (Частина 4)",
            "promptEn": "Theoretical Foundations: Short Circuits, Overload, Fuses, RCD/GFCI & Grounding (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-52-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»?",
            "promptEn": "Which core statement is correct regarding 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-52-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 86 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 86 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 129.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 86 * 1.5 = 129.0 В.",
            "explanationEn": "Calculation follows direct scaling: 86 * 1.5 = 129.0 V."
}),
          createCircuitLab({
            "id": "ee-52-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'. Run simulation and verify nodes.",
            "title": "Lab 52.4: Short Circuits, Overload, Fuses, RCD/GFCI & Grounding",
            "netlist": "* EduForge SPICE Model for Unit 52\nV1 in 0 DC 10\nR1 in out 86k\nR2 out 0 13k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.313,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-52-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-52-l5",
        titleUk: "Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення (Частина 5)",
        titleEn: "Short Circuits, Overload, Fuses, RCD/GFCI & Grounding (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-52-l5-c1",
            "promptUk": "Теоретичні основи: Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення (Частина 5)",
            "promptEn": "Theoretical Foundations: Short Circuits, Overload, Fuses, RCD/GFCI & Grounding (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-52-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»?",
            "promptEn": "Which core statement is correct regarding 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-52-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 91 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 91 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 136.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 91 * 1.5 = 136.5 В.",
            "explanationEn": "Calculation follows direct scaling: 91 * 1.5 = 136.5 V."
}),
          createCircuitLab({
            "id": "ee-52-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'. Run simulation and verify nodes.",
            "title": "Lab 52.5: Short Circuits, Overload, Fuses, RCD/GFCI & Grounding",
            "netlist": "* EduForge SPICE Model for Unit 52\nV1 in 0 DC 10\nR1 in out 91k\nR2 out 0 24k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.087,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-52-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-52-exam",
        titleUk: "Екзамен: Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення",
        titleEn: "Exam: Short Circuits, Overload, Fuses, RCD/GFCI & Grounding",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-52-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-52-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-52-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-52-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-52-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 530 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 530 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 265.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 530 = 265.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 530 = 265.0 V."
}),
          createNumeric({
            "id": "ee-52-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 532 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 532 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 266.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 532 = 266.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 532 = 266.0 V."
}),
          createNumeric({
            "id": "ee-52-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 534 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 534 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 267.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 534 = 267.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 534 = 267.0 V."
}),
          createNumeric({
            "id": "ee-52-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 536 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 536 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 268.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 536 = 268.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 536 = 268.0 V."
}),
          createCircuitLab({
            "id": "ee-52-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'.",
            "title": "Exam Lab 52.9: Short Circuits, Overload, Fuses, RCD/GFCI & Grounding",
            "netlist": "* Exam Model 52_9\nV1 in 0 DC 12\nR1 in out 61k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.69,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-52-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Коротке замикання, перевантаження, запобіжники, ПЗВ і заземлення».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Short Circuits, Overload, Fuses, RCD/GFCI & Grounding'.",
            "title": "Exam Lab 52.10: Short Circuits, Overload, Fuses, RCD/GFCI & Grounding",
            "netlist": "* Exam Model 52_10\nV1 in 0 DC 12\nR1 in out 62k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.667,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-53-distribution-drops",
    titleUk: "Розрахунок навантаження, падіння напруги та розподільних щитів",
    titleEn: "Conductor Sizing, Voltage Drop, Losses & Distribution",
    lessons: [
      createLesson({
        slug: "ee-53-l1",
        titleUk: "Розрахунок навантаження, падіння напруги та розподільних щитів (Частина 1)",
        titleEn: "Conductor Sizing, Voltage Drop, Losses & Distribution (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-53-l1-c1",
            "promptUk": "Теоретичні основи: Розрахунок навантаження, падіння напруги та розподільних щитів (Частина 1)",
            "promptEn": "Theoretical Foundations: Conductor Sizing, Voltage Drop, Losses & Distribution (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Розрахунок навантаження, падіння напруги та розподільних щитів». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Conductor Sizing, Voltage Drop, Losses & Distribution'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-53-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Розрахунок навантаження, падіння напруги та розподільних щитів»?",
            "promptEn": "Which core statement is correct regarding 'Conductor Sizing, Voltage Drop, Losses & Distribution'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-53-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 74 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 74 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 111.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 74 * 1.5 = 111.0 В.",
            "explanationEn": "Calculation follows direct scaling: 74 * 1.5 = 111.0 V."
}),
          createNumeric({
            "id": "ee-53-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 74 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 74 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.338,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 74 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 74 A."
}),
          createExplain({
            "id": "ee-53-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Розрахунок навантаження, падіння напруги та розподільних щитів»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Conductor Sizing, Voltage Drop, Losses & Distribution':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-53-l2",
        titleUk: "Розрахунок навантаження, падіння напруги та розподільних щитів (Частина 2)",
        titleEn: "Conductor Sizing, Voltage Drop, Losses & Distribution (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-53-l2-c1",
            "promptUk": "Теоретичні основи: Розрахунок навантаження, падіння напруги та розподільних щитів (Частина 2)",
            "promptEn": "Theoretical Foundations: Conductor Sizing, Voltage Drop, Losses & Distribution (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Розрахунок навантаження, падіння напруги та розподільних щитів». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Conductor Sizing, Voltage Drop, Losses & Distribution'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-53-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Розрахунок навантаження, падіння напруги та розподільних щитів»?",
            "promptEn": "Which core statement is correct regarding 'Conductor Sizing, Voltage Drop, Losses & Distribution'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-53-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 79 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 79 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 118.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 79 * 1.5 = 118.5 В.",
            "explanationEn": "Calculation follows direct scaling: 79 * 1.5 = 118.5 V."
}),
          createNumeric({
            "id": "ee-53-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 79 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 79 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.316,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 79 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 79 A."
}),
          createExplain({
            "id": "ee-53-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Розрахунок навантаження, падіння напруги та розподільних щитів»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Conductor Sizing, Voltage Drop, Losses & Distribution':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-53-l3",
        titleUk: "Розрахунок навантаження, падіння напруги та розподільних щитів (Частина 3)",
        titleEn: "Conductor Sizing, Voltage Drop, Losses & Distribution (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-53-l3-c1",
            "promptUk": "Теоретичні основи: Розрахунок навантаження, падіння напруги та розподільних щитів (Частина 3)",
            "promptEn": "Theoretical Foundations: Conductor Sizing, Voltage Drop, Losses & Distribution (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Розрахунок навантаження, падіння напруги та розподільних щитів». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Conductor Sizing, Voltage Drop, Losses & Distribution'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-53-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Розрахунок навантаження, падіння напруги та розподільних щитів»?",
            "promptEn": "Which core statement is correct regarding 'Conductor Sizing, Voltage Drop, Losses & Distribution'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-53-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 84 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 84 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 126.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 84 * 1.5 = 126.0 В.",
            "explanationEn": "Calculation follows direct scaling: 84 * 1.5 = 126.0 V."
}),
          createNumeric({
            "id": "ee-53-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 84 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 84 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.298,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 84 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 84 A."
}),
          createExplain({
            "id": "ee-53-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Розрахунок навантаження, падіння напруги та розподільних щитів»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Conductor Sizing, Voltage Drop, Losses & Distribution':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-53-l4",
        titleUk: "Розрахунок навантаження, падіння напруги та розподільних щитів (Частина 4)",
        titleEn: "Conductor Sizing, Voltage Drop, Losses & Distribution (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-53-l4-c1",
            "promptUk": "Теоретичні основи: Розрахунок навантаження, падіння напруги та розподільних щитів (Частина 4)",
            "promptEn": "Theoretical Foundations: Conductor Sizing, Voltage Drop, Losses & Distribution (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Розрахунок навантаження, падіння напруги та розподільних щитів». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Conductor Sizing, Voltage Drop, Losses & Distribution'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-53-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Розрахунок навантаження, падіння напруги та розподільних щитів»?",
            "promptEn": "Which core statement is correct regarding 'Conductor Sizing, Voltage Drop, Losses & Distribution'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-53-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 89 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 89 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 133.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 89 * 1.5 = 133.5 В.",
            "explanationEn": "Calculation follows direct scaling: 89 * 1.5 = 133.5 V."
}),
          createCircuitLab({
            "id": "ee-53-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Розрахунок навантаження, падіння напруги та розподільних щитів». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Conductor Sizing, Voltage Drop, Losses & Distribution'. Run simulation and verify nodes.",
            "title": "Lab 53.4: Conductor Sizing, Voltage Drop, Losses & Distribution",
            "netlist": "* EduForge SPICE Model for Unit 53\nV1 in 0 DC 10\nR1 in out 89k\nR2 out 0 20k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.835,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-53-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Розрахунок навантаження, падіння напруги та розподільних щитів»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Conductor Sizing, Voltage Drop, Losses & Distribution':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-53-l5",
        titleUk: "Розрахунок навантаження, падіння напруги та розподільних щитів (Частина 5)",
        titleEn: "Conductor Sizing, Voltage Drop, Losses & Distribution (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-53-l5-c1",
            "promptUk": "Теоретичні основи: Розрахунок навантаження, падіння напруги та розподільних щитів (Частина 5)",
            "promptEn": "Theoretical Foundations: Conductor Sizing, Voltage Drop, Losses & Distribution (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Розрахунок навантаження, падіння напруги та розподільних щитів». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Conductor Sizing, Voltage Drop, Losses & Distribution'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-53-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Розрахунок навантаження, падіння напруги та розподільних щитів»?",
            "promptEn": "Which core statement is correct regarding 'Conductor Sizing, Voltage Drop, Losses & Distribution'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-53-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 94 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 94 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 141.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 94 * 1.5 = 141.0 В.",
            "explanationEn": "Calculation follows direct scaling: 94 * 1.5 = 141.0 V."
}),
          createCircuitLab({
            "id": "ee-53-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Розрахунок навантаження, падіння напруги та розподільних щитів». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Conductor Sizing, Voltage Drop, Losses & Distribution'. Run simulation and verify nodes.",
            "title": "Lab 53.5: Conductor Sizing, Voltage Drop, Losses & Distribution",
            "netlist": "* EduForge SPICE Model for Unit 53\nV1 in 0 DC 10\nR1 in out 94k\nR2 out 0 31k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.48,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-53-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Розрахунок навантаження, падіння напруги та розподільних щитів»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Conductor Sizing, Voltage Drop, Losses & Distribution':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-53-exam",
        titleUk: "Екзамен: Розрахунок навантаження, падіння напруги та розподільних щитів",
        titleEn: "Exam: Conductor Sizing, Voltage Drop, Losses & Distribution",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-53-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Розрахунок навантаження, падіння напруги та розподільних щитів»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Conductor Sizing, Voltage Drop, Losses & Distribution'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-53-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Розрахунок навантаження, падіння напруги та розподільних щитів»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Conductor Sizing, Voltage Drop, Losses & Distribution'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-53-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Розрахунок навантаження, падіння напруги та розподільних щитів»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Conductor Sizing, Voltage Drop, Losses & Distribution'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-53-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Розрахунок навантаження, падіння напруги та розподільних щитів»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Conductor Sizing, Voltage Drop, Losses & Distribution'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-53-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 540 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 540 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 270.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 540 = 270.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 540 = 270.0 V."
}),
          createNumeric({
            "id": "ee-53-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 542 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 542 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 271.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 542 = 271.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 542 = 271.0 V."
}),
          createNumeric({
            "id": "ee-53-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 544 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 544 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 272.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 544 = 272.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 544 = 272.0 V."
}),
          createNumeric({
            "id": "ee-53-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 546 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 546 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 273.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 546 = 273.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 546 = 273.0 V."
}),
          createCircuitLab({
            "id": "ee-53-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Розрахунок навантаження, падіння напруги та розподільних щитів».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Conductor Sizing, Voltage Drop, Losses & Distribution'.",
            "title": "Exam Lab 53.9: Conductor Sizing, Voltage Drop, Losses & Distribution",
            "netlist": "* Exam Model 53_9\nV1 in 0 DC 12\nR1 in out 62k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.667,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-53-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Розрахунок навантаження, падіння напруги та розподільних щитів».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Conductor Sizing, Voltage Drop, Losses & Distribution'.",
            "title": "Exam Lab 53.10: Conductor Sizing, Voltage Drop, Losses & Distribution",
            "netlist": "* Exam Model 53_10\nV1 in 0 DC 12\nR1 in out 63k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.644,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
  createUnit({
    slug: "ee-54-relays-motor-control",
    titleUk: "Реле, контактори, блокування та керування двигуном",
    titleEn: "Relays, Contactors, Interlocks & Motor Control Starters",
    lessons: [
      createLesson({
        slug: "ee-54-l1",
        titleUk: "Реле, контактори, блокування та керування двигуном (Частина 1)",
        titleEn: "Relays, Contactors, Interlocks & Motor Control Starters (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-54-l1-c1",
            "promptUk": "Теоретичні основи: Реле, контактори, блокування та керування двигуном (Частина 1)",
            "promptEn": "Theoretical Foundations: Relays, Contactors, Interlocks & Motor Control Starters (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реле, контактори, блокування та керування двигуном». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Relays, Contactors, Interlocks & Motor Control Starters'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-54-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реле, контактори, блокування та керування двигуном»?",
            "promptEn": "Which core statement is correct regarding 'Relays, Contactors, Interlocks & Motor Control Starters'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-54-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 77 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 77 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 115.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 77 * 1.5 = 115.5 В.",
            "explanationEn": "Calculation follows direct scaling: 77 * 1.5 = 115.5 V."
}),
          createNumeric({
            "id": "ee-54-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 77 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 77 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.325,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 77 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 77 A."
}),
          createExplain({
            "id": "ee-54-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реле, контактори, блокування та керування двигуном»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Relays, Contactors, Interlocks & Motor Control Starters':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-54-l2",
        titleUk: "Реле, контактори, блокування та керування двигуном (Частина 2)",
        titleEn: "Relays, Contactors, Interlocks & Motor Control Starters (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-54-l2-c1",
            "promptUk": "Теоретичні основи: Реле, контактори, блокування та керування двигуном (Частина 2)",
            "promptEn": "Theoretical Foundations: Relays, Contactors, Interlocks & Motor Control Starters (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реле, контактори, блокування та керування двигуном». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Relays, Contactors, Interlocks & Motor Control Starters'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-54-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реле, контактори, блокування та керування двигуном»?",
            "promptEn": "Which core statement is correct regarding 'Relays, Contactors, Interlocks & Motor Control Starters'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-54-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 82 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 82 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 123.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 82 * 1.5 = 123.0 В.",
            "explanationEn": "Calculation follows direct scaling: 82 * 1.5 = 123.0 V."
}),
          createNumeric({
            "id": "ee-54-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 82 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 82 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.305,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 82 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 82 A."
}),
          createExplain({
            "id": "ee-54-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реле, контактори, блокування та керування двигуном»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Relays, Contactors, Interlocks & Motor Control Starters':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-54-l3",
        titleUk: "Реле, контактори, блокування та керування двигуном (Частина 3)",
        titleEn: "Relays, Contactors, Interlocks & Motor Control Starters (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-54-l3-c1",
            "promptUk": "Теоретичні основи: Реле, контактори, блокування та керування двигуном (Частина 3)",
            "promptEn": "Theoretical Foundations: Relays, Contactors, Interlocks & Motor Control Starters (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реле, контактори, блокування та керування двигуном». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Relays, Contactors, Interlocks & Motor Control Starters'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-54-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реле, контактори, блокування та керування двигуном»?",
            "promptEn": "Which core statement is correct regarding 'Relays, Contactors, Interlocks & Motor Control Starters'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-54-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 87 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 87 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 130.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 87 * 1.5 = 130.5 В.",
            "explanationEn": "Calculation follows direct scaling: 87 * 1.5 = 130.5 V."
}),
          createNumeric({
            "id": "ee-54-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 87 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 87 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.287,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 87 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 87 A."
}),
          createExplain({
            "id": "ee-54-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реле, контактори, блокування та керування двигуном»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Relays, Contactors, Interlocks & Motor Control Starters':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-54-l4",
        titleUk: "Реле, контактори, блокування та керування двигуном (Частина 4)",
        titleEn: "Relays, Contactors, Interlocks & Motor Control Starters (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-54-l4-c1",
            "promptUk": "Теоретичні основи: Реле, контактори, блокування та керування двигуном (Частина 4)",
            "promptEn": "Theoretical Foundations: Relays, Contactors, Interlocks & Motor Control Starters (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реле, контактори, блокування та керування двигуном». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Relays, Contactors, Interlocks & Motor Control Starters'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-54-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реле, контактори, блокування та керування двигуном»?",
            "promptEn": "Which core statement is correct regarding 'Relays, Contactors, Interlocks & Motor Control Starters'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-54-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 92 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 92 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 138.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 92 * 1.5 = 138.0 В.",
            "explanationEn": "Calculation follows direct scaling: 92 * 1.5 = 138.0 V."
}),
          createCircuitLab({
            "id": "ee-54-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Реле, контактори, блокування та керування двигуном». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Relays, Contactors, Interlocks & Motor Control Starters'. Run simulation and verify nodes.",
            "title": "Lab 54.4: Relays, Contactors, Interlocks & Motor Control Starters",
            "netlist": "* EduForge SPICE Model for Unit 54\nV1 in 0 DC 10\nR1 in out 92k\nR2 out 0 27k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.269,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-54-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реле, контактори, блокування та керування двигуном»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Relays, Contactors, Interlocks & Motor Control Starters':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-54-l5",
        titleUk: "Реле, контактори, блокування та керування двигуном (Частина 5)",
        titleEn: "Relays, Contactors, Interlocks & Motor Control Starters (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-54-l5-c1",
            "promptUk": "Теоретичні основи: Реле, контактори, блокування та керування двигуном (Частина 5)",
            "promptEn": "Theoretical Foundations: Relays, Contactors, Interlocks & Motor Control Starters (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Реле, контактори, блокування та керування двигуном». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Relays, Contactors, Interlocks & Motor Control Starters'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
            "keyPointsUk": [
                        "Фундаментальний закон розділу для розрахунку параметрів",
                        "Взаємозв'язок струмів, напруг та потужностей у схемі",
                        "Методи інженерної верифікації та перевірки на практиці"
            ],
            "keyPointsEn": [
                        "Fundamental physical principle governing the stage calculations",
                        "Interdependence of circuit currents, branch voltages, and dissipated power",
                        "Engineering verification criteria for practical hardware application"
            ]
}),
          createMcq({
            "id": "ee-54-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Реле, контактори, блокування та керування двигуном»?",
            "promptEn": "Which core statement is correct regarding 'Relays, Contactors, Interlocks & Motor Control Starters'?",
            "options": [
                        "Рівняння стану строго задовольняє закон збереження енергії",
                        "Втрати потужності завжди дорівнюють нулю в реальних провідниках",
                        "Напруга на клемах не залежить від опору навантаження",
                        "Струм у нерозгалуженому колі зменшується вздовж провідника"
            ],
            "optionsEn": [
                        "The constitutive equations strictly satisfy conservation of energy",
                        "Power losses are always identically zero in physical conductors",
                        "Terminal voltage remains invariant regardless of external load",
                        "Branch current decays monotonically along an uninterrupted conductor"
            ],
            "correctIndex": 0,
            "explanationUk": "Закон збереження енергії є непорушним фундаментом електротехніки для всіх лінійних та нелінійних кіл.",
            "explanationEn": "Conservation of energy is an immutable foundation of electrical engineering across all linear and non-linear networks."
}),
          createNumeric({
            "id": "ee-54-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 97 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 97 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 145.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 97 * 1.5 = 145.5 В.",
            "explanationEn": "Calculation follows direct scaling: 97 * 1.5 = 145.5 V."
}),
          createCircuitLab({
            "id": "ee-54-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Реле, контактори, блокування та керування двигуном». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Relays, Contactors, Interlocks & Motor Control Starters'. Run simulation and verify nodes.",
            "title": "Lab 54.5: Relays, Contactors, Interlocks & Motor Control Starters",
            "netlist": "* EduForge SPICE Model for Unit 54\nV1 in 0 DC 10\nR1 in out 97k\nR2 out 0 38k\n.tran 10u 2m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.002
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 2.815,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out відповідає дільнику",
                                    "labelEn": "Node voltage at out matches divider ratio"
                        }
            ],
            "hintsUk": [
                        "Перевірте підключення опорного вузла землі (0)"
            ],
            "hintsEn": [
                        "Verify reference ground connection at node 0"
            ],
            "explanationUk": "Симуляція SPICE підтверджує аналітичний розрахунок вузлових потенціалів.",
            "explanationEn": "SPICE transient simulation validates analytical calculation of nodal voltages."
}),
          createExplain({
            "id": "ee-54-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Реле, контактори, блокування та керування двигуном»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Relays, Contactors, Interlocks & Motor Control Starters':",
            "keyIdeas": [
                        {
                                    "labelUk": "збереження енергії",
                                    "labelEn": "energy conservation",
                                    "anyOf": [
                                                "енергія",
                                                "energy",
                                                "збереження",
                                                "conservation"
                                    ]
                        },
                        {
                                    "labelUk": "електричний струм",
                                    "labelEn": "electric current",
                                    "anyOf": [
                                                "струм",
                                                "current",
                                                "провідник",
                                                "conductor"
                                    ]
                        },
                        {
                                    "labelUk": "вузлова напруга",
                                    "labelEn": "nodal voltage",
                                    "anyOf": [
                                                "напруга",
                                                "voltage",
                                                "потенціал",
                                                "potential"
                                    ]
                        }
            ],
            "sampleAnswerUk": "У цій темі ключову роль відіграє закон збереження, згідно з яким енергія та електричний струм у колі строго узгоджуються з розподілом потенціалів. Вузлова напруга визначає режим роботи всіх компонентів схеми.",
            "sampleAnswerEn": "In this analysis, the primary principle is conservation of physical states, where energy and electric current through branches directly correspond to potential differences. The nodal voltage governs the operating point across all components.",
            "minWords": 15,
            "passRatio": 0.6
}),
        ],
      }),
      createLesson({
        slug: "ee-54-exam",
        titleUk: "Екзамен: Реле, контактори, блокування та керування двигуном",
        titleEn: "Exam: Relays, Contactors, Interlocks & Motor Control Starters",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-54-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Реле, контактори, блокування та керування двигуном»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Relays, Contactors, Interlocks & Motor Control Starters'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 1)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 1)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-54-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Реле, контактори, блокування та керування двигуном»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Relays, Contactors, Interlocks & Motor Control Starters'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 2)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 2)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-54-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Реле, контактори, блокування та керування двигуном»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Relays, Contactors, Interlocks & Motor Control Starters'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 3)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 3)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createMcq({
            "id": "ee-54-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Реле, контактори, блокування та керування двигуном»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Relays, Contactors, Interlocks & Motor Control Starters'?",
            "options": [
                        "Розрахунок базується на законах збереження та граничних умовах (Варіант 4)",
                        "Нелінійні ефекти дозволяють нехтувати законом Кірхгофа",
                        "Падіння напруги завжди є від'ємним для пасивного елемента",
                        "Потужність у реактивному елементі повністю перетворюється на тепло"
            ],
            "optionsEn": [
                        "Calculations rely strictly on conservation laws and boundary conditions (Option 4)",
                        "Non-linear effects permit disregarding Kirchhoff's current conservation",
                        "Voltage drop across passive loads is unconditionally negative",
                        "Power in pure reactive storage is completely converted to static heat"
            ],
            "correctIndex": 0,
            "explanationUk": "Усі інженерні розрахунки в цьому розділі ґрунтуються на фундаментальних законах фізики та граничних умовах.",
            "explanationEn": "All engineering calculations in this unit are grounded in fundamental conservation laws and boundary conditions."
}),
          createNumeric({
            "id": "ee-54-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 550 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 550 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 275.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 550 = 275.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 550 = 275.0 V."
}),
          createNumeric({
            "id": "ee-54-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 552 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 552 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 276.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 552 = 276.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 552 = 276.0 V."
}),
          createNumeric({
            "id": "ee-54-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 554 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 554 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 277.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 554 = 277.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 554 = 277.0 V."
}),
          createNumeric({
            "id": "ee-54-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 556 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 556 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 278.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 556 = 278.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 556 = 278.0 V."
}),
          createCircuitLab({
            "id": "ee-54-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Реле, контактори, блокування та керування двигуном».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Relays, Contactors, Interlocks & Motor Control Starters'.",
            "title": "Exam Lab 54.9: Relays, Contactors, Interlocks & Motor Control Starters",
            "netlist": "* Exam Model 54_9\nV1 in 0 DC 12\nR1 in out 63k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.644,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
          createCircuitLab({
            "id": "ee-54-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Реле, контактори, блокування та керування двигуном».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Relays, Contactors, Interlocks & Motor Control Starters'.",
            "title": "Exam Lab 54.10: Relays, Contactors, Interlocks & Motor Control Starters",
            "netlist": "* Exam Model 54_10\nV1 in 0 DC 12\nR1 in out 64k\nR2 out 0 10k\n.tran 10u 1m\n.end",
            "analysis": {
                        "type": "tran",
                        "tran": {
                                    "tStep": 1e-05,
                                    "tStop": 0.001
                        }
            },
            "criteria": [
                        {
                                    "type": "node_voltage",
                                    "node": "out",
                                    "target": 1.622,
                                    "absTolerance": 0.5,
                                    "relTolerance": 0.1,
                                    "labelUk": "Напруга у вузлі out у межах розрахунку",
                                    "labelEn": "Node voltage at out within tolerance"
                        }
            ],
            "hintsUk": [
                        "Запустіть симуляцію для перевірки критеріїв"
            ],
            "hintsEn": [
                        "Run simulation to verify criteria"
            ],
            "explanationUk": "Симуляція перевіряє правильність складання схеми та відповідність критеріям.",
            "explanationEn": "Simulation validates schematic correctness and criteria compliance."
}),
        ],
      }),
    ],
  }),
];