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
 * Stage 10: 6 Units, 36 Lessons (5 instructional + 1 exam per unit)
 */
export const stage10Units: UnitContent[] = [
  createUnit({
    slug: "ee-55-worst-case-monte-carlo",
    titleUk: "Допуски, температурні ефекти, worst-case та Monte Carlo",
    titleEn: "Tolerances, Thermal Drift, Worst-Case & Monte Carlo",
    lessons: [
      createLesson({
        slug: "ee-55-l1",
        titleUk: "Допуски, температурні ефекти, worst-case та Monte Carlo (Частина 1)",
        titleEn: "Tolerances, Thermal Drift, Worst-Case & Monte Carlo (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-55-l1-c1",
            "promptUk": "Теоретичні основи: Допуски, температурні ефекти, worst-case та Monte Carlo (Частина 1)",
            "promptEn": "Theoretical Foundations: Tolerances, Thermal Drift, Worst-Case & Monte Carlo (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Допуски, температурні ефекти, worst-case та Monte Carlo». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-55-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Допуски, температурні ефекти, worst-case та Monte Carlo»?",
            "promptEn": "Which core statement is correct regarding 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'?",
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
            "id": "ee-55-l1-n1",
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
          createNumeric({
            "id": "ee-55-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 80 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 80 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.312,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 80 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 80 A."
}),
          createExplain({
            "id": "ee-55-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Допуски, температурні ефекти, worst-case та Monte Carlo»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo':",
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
        slug: "ee-55-l2",
        titleUk: "Допуски, температурні ефекти, worst-case та Monte Carlo (Частина 2)",
        titleEn: "Tolerances, Thermal Drift, Worst-Case & Monte Carlo (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-55-l2-c1",
            "promptUk": "Теоретичні основи: Допуски, температурні ефекти, worst-case та Monte Carlo (Частина 2)",
            "promptEn": "Theoretical Foundations: Tolerances, Thermal Drift, Worst-Case & Monte Carlo (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Допуски, температурні ефекти, worst-case та Monte Carlo». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-55-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Допуски, температурні ефекти, worst-case та Monte Carlo»?",
            "promptEn": "Which core statement is correct regarding 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'?",
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
            "id": "ee-55-l2-n1",
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
          createNumeric({
            "id": "ee-55-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 85 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 85 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.294,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 85 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 85 A."
}),
          createExplain({
            "id": "ee-55-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Допуски, температурні ефекти, worst-case та Monte Carlo»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo':",
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
        slug: "ee-55-l3",
        titleUk: "Допуски, температурні ефекти, worst-case та Monte Carlo (Частина 3)",
        titleEn: "Tolerances, Thermal Drift, Worst-Case & Monte Carlo (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-55-l3-c1",
            "promptUk": "Теоретичні основи: Допуски, температурні ефекти, worst-case та Monte Carlo (Частина 3)",
            "promptEn": "Theoretical Foundations: Tolerances, Thermal Drift, Worst-Case & Monte Carlo (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Допуски, температурні ефекти, worst-case та Monte Carlo». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-55-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Допуски, температурні ефекти, worst-case та Monte Carlo»?",
            "promptEn": "Which core statement is correct regarding 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'?",
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
            "id": "ee-55-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 90 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 90 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 135.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 90 * 1.5 = 135.0 В.",
            "explanationEn": "Calculation follows direct scaling: 90 * 1.5 = 135.0 V."
}),
          createNumeric({
            "id": "ee-55-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 90 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 90 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.278,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 90 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 90 A."
}),
          createExplain({
            "id": "ee-55-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Допуски, температурні ефекти, worst-case та Monte Carlo»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo':",
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
        slug: "ee-55-l4",
        titleUk: "Допуски, температурні ефекти, worst-case та Monte Carlo (Частина 4)",
        titleEn: "Tolerances, Thermal Drift, Worst-Case & Monte Carlo (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-55-l4-c1",
            "promptUk": "Теоретичні основи: Допуски, температурні ефекти, worst-case та Monte Carlo (Частина 4)",
            "promptEn": "Theoretical Foundations: Tolerances, Thermal Drift, Worst-Case & Monte Carlo (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Допуски, температурні ефекти, worst-case та Monte Carlo». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-55-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Допуски, температурні ефекти, worst-case та Monte Carlo»?",
            "promptEn": "Which core statement is correct regarding 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'?",
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
            "id": "ee-55-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 95 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 95 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 142.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 95 * 1.5 = 142.5 В.",
            "explanationEn": "Calculation follows direct scaling: 95 * 1.5 = 142.5 V."
}),
          createCircuitLab({
            "id": "ee-55-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Допуски, температурні ефекти, worst-case та Monte Carlo». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'. Run simulation and verify nodes.",
            "title": "Lab 55.4: Tolerances, Thermal Drift, Worst-Case & Monte Carlo",
            "netlist": "* EduForge SPICE Model for Unit 55\nV1 in 0 DC 10\nR1 in out 95k\nR2 out 0 34k\n.tran 10u 2m\n.end",
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
                                    "target": 2.636,
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
            "id": "ee-55-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Допуски, температурні ефекти, worst-case та Monte Carlo»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo':",
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
        slug: "ee-55-l5",
        titleUk: "Допуски, температурні ефекти, worst-case та Monte Carlo (Частина 5)",
        titleEn: "Tolerances, Thermal Drift, Worst-Case & Monte Carlo (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-55-l5-c1",
            "promptUk": "Теоретичні основи: Допуски, температурні ефекти, worst-case та Monte Carlo (Частина 5)",
            "promptEn": "Theoretical Foundations: Tolerances, Thermal Drift, Worst-Case & Monte Carlo (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Допуски, температурні ефекти, worst-case та Monte Carlo». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-55-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Допуски, температурні ефекти, worst-case та Monte Carlo»?",
            "promptEn": "Which core statement is correct regarding 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'?",
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
            "id": "ee-55-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 100 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 100 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 150.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 100 * 1.5 = 150.0 В.",
            "explanationEn": "Calculation follows direct scaling: 100 * 1.5 = 150.0 V."
}),
          createCircuitLab({
            "id": "ee-55-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Допуски, температурні ефекти, worst-case та Monte Carlo». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'. Run simulation and verify nodes.",
            "title": "Lab 55.5: Tolerances, Thermal Drift, Worst-Case & Monte Carlo",
            "netlist": "* EduForge SPICE Model for Unit 55\nV1 in 0 DC 10\nR1 in out 100k\nR2 out 0 45k\n.tran 10u 2m\n.end",
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
                                    "target": 3.103,
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
            "id": "ee-55-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Допуски, температурні ефекти, worst-case та Monte Carlo»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo':",
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
        slug: "ee-55-exam",
        titleUk: "Екзамен: Допуски, температурні ефекти, worst-case та Monte Carlo",
        titleEn: "Exam: Tolerances, Thermal Drift, Worst-Case & Monte Carlo",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-55-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Допуски, температурні ефекти, worst-case та Monte Carlo»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'?",
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
            "id": "ee-55-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Допуски, температурні ефекти, worst-case та Monte Carlo»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'?",
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
            "id": "ee-55-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Допуски, температурні ефекти, worst-case та Monte Carlo»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'?",
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
            "id": "ee-55-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Допуски, температурні ефекти, worst-case та Monte Carlo»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'?",
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
            "id": "ee-55-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 560 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 560 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 280.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 560 = 280.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 560 = 280.0 V."
}),
          createNumeric({
            "id": "ee-55-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 562 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 562 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 281.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 562 = 281.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 562 = 281.0 V."
}),
          createNumeric({
            "id": "ee-55-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 564 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 564 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 282.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 564 = 282.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 564 = 282.0 V."
}),
          createNumeric({
            "id": "ee-55-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 566 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 566 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 283.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 566 = 283.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 566 = 283.0 V."
}),
          createCircuitLab({
            "id": "ee-55-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Допуски, температурні ефекти, worst-case та Monte Carlo».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'.",
            "title": "Exam Lab 55.9: Tolerances, Thermal Drift, Worst-Case & Monte Carlo",
            "netlist": "* Exam Model 55_9\nV1 in 0 DC 12\nR1 in out 64k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
          createCircuitLab({
            "id": "ee-55-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Допуски, температурні ефекти, worst-case та Monte Carlo».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Tolerances, Thermal Drift, Worst-Case & Monte Carlo'.",
            "title": "Exam Lab 55.10: Tolerances, Thermal Drift, Worst-Case & Monte Carlo",
            "netlist": "* Exam Model 55_10\nV1 in 0 DC 12\nR1 in out 65k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.6,
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
    slug: "ee-56-troubleshooting-reports",
    titleUk: "Пошук несправностей, плани випробувань та інженерний звіт",
    titleEn: "Troubleshooting Methodologies, Test Plans & Reports",
    lessons: [
      createLesson({
        slug: "ee-56-l1",
        titleUk: "Пошук несправностей, плани випробувань та інженерний звіт (Частина 1)",
        titleEn: "Troubleshooting Methodologies, Test Plans & Reports (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-56-l1-c1",
            "promptUk": "Теоретичні основи: Пошук несправностей, плани випробувань та інженерний звіт (Частина 1)",
            "promptEn": "Theoretical Foundations: Troubleshooting Methodologies, Test Plans & Reports (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Пошук несправностей, плани випробувань та інженерний звіт». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Troubleshooting Methodologies, Test Plans & Reports'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-56-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Пошук несправностей, плани випробувань та інженерний звіт»?",
            "promptEn": "Which core statement is correct regarding 'Troubleshooting Methodologies, Test Plans & Reports'?",
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
            "id": "ee-56-l1-n1",
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
          createNumeric({
            "id": "ee-56-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 83 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 83 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.301,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 83 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 83 A."
}),
          createExplain({
            "id": "ee-56-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Пошук несправностей, плани випробувань та інженерний звіт»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Troubleshooting Methodologies, Test Plans & Reports':",
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
        slug: "ee-56-l2",
        titleUk: "Пошук несправностей, плани випробувань та інженерний звіт (Частина 2)",
        titleEn: "Troubleshooting Methodologies, Test Plans & Reports (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-56-l2-c1",
            "promptUk": "Теоретичні основи: Пошук несправностей, плани випробувань та інженерний звіт (Частина 2)",
            "promptEn": "Theoretical Foundations: Troubleshooting Methodologies, Test Plans & Reports (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Пошук несправностей, плани випробувань та інженерний звіт». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Troubleshooting Methodologies, Test Plans & Reports'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-56-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Пошук несправностей, плани випробувань та інженерний звіт»?",
            "promptEn": "Which core statement is correct regarding 'Troubleshooting Methodologies, Test Plans & Reports'?",
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
            "id": "ee-56-l2-n1",
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
          createNumeric({
            "id": "ee-56-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 88 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 88 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.284,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 88 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 88 A."
}),
          createExplain({
            "id": "ee-56-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Пошук несправностей, плани випробувань та інженерний звіт»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Troubleshooting Methodologies, Test Plans & Reports':",
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
        slug: "ee-56-l3",
        titleUk: "Пошук несправностей, плани випробувань та інженерний звіт (Частина 3)",
        titleEn: "Troubleshooting Methodologies, Test Plans & Reports (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-56-l3-c1",
            "promptUk": "Теоретичні основи: Пошук несправностей, плани випробувань та інженерний звіт (Частина 3)",
            "promptEn": "Theoretical Foundations: Troubleshooting Methodologies, Test Plans & Reports (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Пошук несправностей, плани випробувань та інженерний звіт». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Troubleshooting Methodologies, Test Plans & Reports'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-56-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Пошук несправностей, плани випробувань та інженерний звіт»?",
            "promptEn": "Which core statement is correct regarding 'Troubleshooting Methodologies, Test Plans & Reports'?",
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
            "id": "ee-56-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 93 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 93 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 139.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 93 * 1.5 = 139.5 В.",
            "explanationEn": "Calculation follows direct scaling: 93 * 1.5 = 139.5 V."
}),
          createNumeric({
            "id": "ee-56-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 93 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 93 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.269,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 93 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 93 A."
}),
          createExplain({
            "id": "ee-56-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Пошук несправностей, плани випробувань та інженерний звіт»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Troubleshooting Methodologies, Test Plans & Reports':",
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
        slug: "ee-56-l4",
        titleUk: "Пошук несправностей, плани випробувань та інженерний звіт (Частина 4)",
        titleEn: "Troubleshooting Methodologies, Test Plans & Reports (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-56-l4-c1",
            "promptUk": "Теоретичні основи: Пошук несправностей, плани випробувань та інженерний звіт (Частина 4)",
            "promptEn": "Theoretical Foundations: Troubleshooting Methodologies, Test Plans & Reports (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Пошук несправностей, плани випробувань та інженерний звіт». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Troubleshooting Methodologies, Test Plans & Reports'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-56-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Пошук несправностей, плани випробувань та інженерний звіт»?",
            "promptEn": "Which core statement is correct regarding 'Troubleshooting Methodologies, Test Plans & Reports'?",
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
            "id": "ee-56-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 98 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 98 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 147.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 98 * 1.5 = 147.0 В.",
            "explanationEn": "Calculation follows direct scaling: 98 * 1.5 = 147.0 V."
}),
          createCircuitLab({
            "id": "ee-56-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Пошук несправностей, плани випробувань та інженерний звіт». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Troubleshooting Methodologies, Test Plans & Reports'. Run simulation and verify nodes.",
            "title": "Lab 56.4: Troubleshooting Methodologies, Test Plans & Reports",
            "netlist": "* EduForge SPICE Model for Unit 56\nV1 in 0 DC 10\nR1 in out 98k\nR2 out 0 41k\n.tran 10u 2m\n.end",
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
                                    "target": 2.95,
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
            "id": "ee-56-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Пошук несправностей, плани випробувань та інженерний звіт»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Troubleshooting Methodologies, Test Plans & Reports':",
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
        slug: "ee-56-l5",
        titleUk: "Пошук несправностей, плани випробувань та інженерний звіт (Частина 5)",
        titleEn: "Troubleshooting Methodologies, Test Plans & Reports (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-56-l5-c1",
            "promptUk": "Теоретичні основи: Пошук несправностей, плани випробувань та інженерний звіт (Частина 5)",
            "promptEn": "Theoretical Foundations: Troubleshooting Methodologies, Test Plans & Reports (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Пошук несправностей, плани випробувань та інженерний звіт». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Troubleshooting Methodologies, Test Plans & Reports'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-56-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Пошук несправностей, плани випробувань та інженерний звіт»?",
            "promptEn": "Which core statement is correct regarding 'Troubleshooting Methodologies, Test Plans & Reports'?",
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
            "id": "ee-56-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 103 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 103 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 154.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 103 * 1.5 = 154.5 В.",
            "explanationEn": "Calculation follows direct scaling: 103 * 1.5 = 154.5 V."
}),
          createCircuitLab({
            "id": "ee-56-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Пошук несправностей, плани випробувань та інженерний звіт». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Troubleshooting Methodologies, Test Plans & Reports'. Run simulation and verify nodes.",
            "title": "Lab 56.5: Troubleshooting Methodologies, Test Plans & Reports",
            "netlist": "* EduForge SPICE Model for Unit 56\nV1 in 0 DC 10\nR1 in out 103k\nR2 out 0 52k\n.tran 10u 2m\n.end",
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
                                    "target": 3.355,
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
            "id": "ee-56-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Пошук несправностей, плани випробувань та інженерний звіт»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Troubleshooting Methodologies, Test Plans & Reports':",
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
        slug: "ee-56-exam",
        titleUk: "Екзамен: Пошук несправностей, плани випробувань та інженерний звіт",
        titleEn: "Exam: Troubleshooting Methodologies, Test Plans & Reports",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-56-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Пошук несправностей, плани випробувань та інженерний звіт»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Troubleshooting Methodologies, Test Plans & Reports'?",
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
            "id": "ee-56-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Пошук несправностей, плани випробувань та інженерний звіт»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Troubleshooting Methodologies, Test Plans & Reports'?",
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
            "id": "ee-56-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Пошук несправностей, плани випробувань та інженерний звіт»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Troubleshooting Methodologies, Test Plans & Reports'?",
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
            "id": "ee-56-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Пошук несправностей, плани випробувань та інженерний звіт»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Troubleshooting Methodologies, Test Plans & Reports'?",
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
            "id": "ee-56-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 570 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 570 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 285.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 570 = 285.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 570 = 285.0 V."
}),
          createNumeric({
            "id": "ee-56-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 572 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 572 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 286.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 572 = 286.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 572 = 286.0 V."
}),
          createNumeric({
            "id": "ee-56-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 574 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 574 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 287.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 574 = 287.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 574 = 287.0 V."
}),
          createNumeric({
            "id": "ee-56-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 576 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 576 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 288.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 576 = 288.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 576 = 288.0 V."
}),
          createCircuitLab({
            "id": "ee-56-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Пошук несправностей, плани випробувань та інженерний звіт».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Troubleshooting Methodologies, Test Plans & Reports'.",
            "title": "Exam Lab 56.9: Troubleshooting Methodologies, Test Plans & Reports",
            "netlist": "* Exam Model 56_9\nV1 in 0 DC 12\nR1 in out 65k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.6,
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
            "id": "ee-56-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Пошук несправностей, плани випробувань та інженерний звіт».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Troubleshooting Methodologies, Test Plans & Reports'.",
            "title": "Exam Lab 56.10: Troubleshooting Methodologies, Test Plans & Reports",
            "netlist": "* Exam Model 56_10\nV1 in 0 DC 12\nR1 in out 66k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.579,
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
    slug: "ee-57-pcb-emc-parasitics",
    titleUk: "Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC",
    titleEn: "PCB Design: Return Paths, Decoupling, Parasitics & EMC",
    lessons: [
      createLesson({
        slug: "ee-57-l1",
        titleUk: "Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC (Частина 1)",
        titleEn: "PCB Design: Return Paths, Decoupling, Parasitics & EMC (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-57-l1-c1",
            "promptUk": "Теоретичні основи: Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC (Частина 1)",
            "promptEn": "Theoretical Foundations: PCB Design: Return Paths, Decoupling, Parasitics & EMC (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-57-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»?",
            "promptEn": "Which core statement is correct regarding 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'?",
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
            "id": "ee-57-l1-n1",
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
          createNumeric({
            "id": "ee-57-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 86 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 86 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.291,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 86 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 86 A."
}),
          createExplain({
            "id": "ee-57-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'PCB Design: Return Paths, Decoupling, Parasitics & EMC':",
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
        slug: "ee-57-l2",
        titleUk: "Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC (Частина 2)",
        titleEn: "PCB Design: Return Paths, Decoupling, Parasitics & EMC (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-57-l2-c1",
            "promptUk": "Теоретичні основи: Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC (Частина 2)",
            "promptEn": "Theoretical Foundations: PCB Design: Return Paths, Decoupling, Parasitics & EMC (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-57-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»?",
            "promptEn": "Which core statement is correct regarding 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'?",
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
            "id": "ee-57-l2-n1",
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
          createNumeric({
            "id": "ee-57-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 91 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 91 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.275,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 91 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 91 A."
}),
          createExplain({
            "id": "ee-57-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'PCB Design: Return Paths, Decoupling, Parasitics & EMC':",
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
        slug: "ee-57-l3",
        titleUk: "Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC (Частина 3)",
        titleEn: "PCB Design: Return Paths, Decoupling, Parasitics & EMC (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-57-l3-c1",
            "promptUk": "Теоретичні основи: Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC (Частина 3)",
            "promptEn": "Theoretical Foundations: PCB Design: Return Paths, Decoupling, Parasitics & EMC (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-57-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»?",
            "promptEn": "Which core statement is correct regarding 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'?",
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
            "id": "ee-57-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 96 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 96 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 144.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 96 * 1.5 = 144.0 В.",
            "explanationEn": "Calculation follows direct scaling: 96 * 1.5 = 144.0 V."
}),
          createNumeric({
            "id": "ee-57-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 96 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 96 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.26,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 96 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 96 A."
}),
          createExplain({
            "id": "ee-57-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'PCB Design: Return Paths, Decoupling, Parasitics & EMC':",
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
        slug: "ee-57-l4",
        titleUk: "Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC (Частина 4)",
        titleEn: "PCB Design: Return Paths, Decoupling, Parasitics & EMC (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-57-l4-c1",
            "promptUk": "Теоретичні основи: Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC (Частина 4)",
            "promptEn": "Theoretical Foundations: PCB Design: Return Paths, Decoupling, Parasitics & EMC (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-57-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»?",
            "promptEn": "Which core statement is correct regarding 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'?",
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
            "id": "ee-57-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 101 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 101 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 151.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 101 * 1.5 = 151.5 В.",
            "explanationEn": "Calculation follows direct scaling: 101 * 1.5 = 151.5 V."
}),
          createCircuitLab({
            "id": "ee-57-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'. Run simulation and verify nodes.",
            "title": "Lab 57.4: PCB Design: Return Paths, Decoupling, Parasitics & EMC",
            "netlist": "* EduForge SPICE Model for Unit 57\nV1 in 0 DC 10\nR1 in out 101k\nR2 out 0 48k\n.tran 10u 2m\n.end",
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
                                    "target": 3.221,
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
            "id": "ee-57-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'PCB Design: Return Paths, Decoupling, Parasitics & EMC':",
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
        slug: "ee-57-l5",
        titleUk: "Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC (Частина 5)",
        titleEn: "PCB Design: Return Paths, Decoupling, Parasitics & EMC (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-57-l5-c1",
            "promptUk": "Теоретичні основи: Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC (Частина 5)",
            "promptEn": "Theoretical Foundations: PCB Design: Return Paths, Decoupling, Parasitics & EMC (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-57-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»?",
            "promptEn": "Which core statement is correct regarding 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'?",
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
            "id": "ee-57-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 106 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 106 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 159.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 106 * 1.5 = 159.0 В.",
            "explanationEn": "Calculation follows direct scaling: 106 * 1.5 = 159.0 V."
}),
          createCircuitLab({
            "id": "ee-57-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'. Run simulation and verify nodes.",
            "title": "Lab 57.5: PCB Design: Return Paths, Decoupling, Parasitics & EMC",
            "netlist": "* EduForge SPICE Model for Unit 57\nV1 in 0 DC 10\nR1 in out 106k\nR2 out 0 9k\n.tran 10u 2m\n.end",
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
                                    "target": 0.783,
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
            "id": "ee-57-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'PCB Design: Return Paths, Decoupling, Parasitics & EMC':",
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
        slug: "ee-57-exam",
        titleUk: "Екзамен: Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC",
        titleEn: "Exam: PCB Design: Return Paths, Decoupling, Parasitics & EMC",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 0.7,
        exercises: [
          createMcq({
            "id": "ee-57-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'?",
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
            "id": "ee-57-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'?",
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
            "id": "ee-57-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'?",
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
            "id": "ee-57-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'?",
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
            "id": "ee-57-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 580 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 580 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 290.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 580 = 290.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 580 = 290.0 V."
}),
          createNumeric({
            "id": "ee-57-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 582 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 582 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 291.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 582 = 291.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 582 = 291.0 V."
}),
          createNumeric({
            "id": "ee-57-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 584 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 584 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 292.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 584 = 292.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 584 = 292.0 V."
}),
          createNumeric({
            "id": "ee-57-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 586 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 586 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 293.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 586 = 293.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 586 = 293.0 V."
}),
          createCircuitLab({
            "id": "ee-57-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'.",
            "title": "Exam Lab 57.9: PCB Design: Return Paths, Decoupling, Parasitics & EMC",
            "netlist": "* Exam Model 57_9\nV1 in 0 DC 12\nR1 in out 66k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.579,
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
            "id": "ee-57-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Основи PCB: зворотні струми, розв'язка, паразитні елементи та EMC».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'PCB Design: Return Paths, Decoupling, Parasitics & EMC'.",
            "title": "Exam Lab 57.10: PCB Design: Return Paths, Decoupling, Parasitics & EMC",
            "netlist": "* Exam Model 57_10\nV1 in 0 DC 12\nR1 in out 67k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.558,
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
    slug: "ee-58-project-analog-frontend",
    titleUk: "Підсумковий проєкт 1: Аналоговий вимірювальний вузол",
    titleEn: "Capstone Project 1: Analog Sensor Front-End",
    lessons: [
      createLesson({
        slug: "ee-58-l1",
        titleUk: "Підсумковий проєкт 1: Аналоговий вимірювальний вузол (Частина 1)",
        titleEn: "Capstone Project 1: Analog Sensor Front-End (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-58-l1-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 1: Аналоговий вимірювальний вузол (Частина 1)",
            "promptEn": "Theoretical Foundations: Capstone Project 1: Analog Sensor Front-End (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 1: Аналоговий вимірювальний вузол». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 1: Analog Sensor Front-End'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-58-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 1: Analog Sensor Front-End'?",
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
            "id": "ee-58-l1-n1",
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
          createNumeric({
            "id": "ee-58-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 89 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 89 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.281,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 89 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 89 A."
}),
          createExplain({
            "id": "ee-58-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 1: Analog Sensor Front-End':",
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
        slug: "ee-58-l2",
        titleUk: "Підсумковий проєкт 1: Аналоговий вимірювальний вузол (Частина 2)",
        titleEn: "Capstone Project 1: Analog Sensor Front-End (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-58-l2-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 1: Аналоговий вимірювальний вузол (Частина 2)",
            "promptEn": "Theoretical Foundations: Capstone Project 1: Analog Sensor Front-End (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 1: Аналоговий вимірювальний вузол». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 1: Analog Sensor Front-End'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-58-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 1: Analog Sensor Front-End'?",
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
            "id": "ee-58-l2-n1",
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
          createNumeric({
            "id": "ee-58-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 94 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 94 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.266,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 94 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 94 A."
}),
          createExplain({
            "id": "ee-58-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 1: Analog Sensor Front-End':",
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
        slug: "ee-58-l3",
        titleUk: "Підсумковий проєкт 1: Аналоговий вимірювальний вузол (Частина 3)",
        titleEn: "Capstone Project 1: Analog Sensor Front-End (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-58-l3-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 1: Аналоговий вимірювальний вузол (Частина 3)",
            "promptEn": "Theoretical Foundations: Capstone Project 1: Analog Sensor Front-End (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 1: Аналоговий вимірювальний вузол». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 1: Analog Sensor Front-End'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-58-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 1: Analog Sensor Front-End'?",
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
            "id": "ee-58-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 99 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 99 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 148.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 99 * 1.5 = 148.5 В.",
            "explanationEn": "Calculation follows direct scaling: 99 * 1.5 = 148.5 V."
}),
          createNumeric({
            "id": "ee-58-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 99 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 99 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.253,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 99 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 99 A."
}),
          createExplain({
            "id": "ee-58-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 1: Analog Sensor Front-End':",
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
        slug: "ee-58-l4",
        titleUk: "Підсумковий проєкт 1: Аналоговий вимірювальний вузол (Частина 4)",
        titleEn: "Capstone Project 1: Analog Sensor Front-End (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-58-l4-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 1: Аналоговий вимірювальний вузол (Частина 4)",
            "promptEn": "Theoretical Foundations: Capstone Project 1: Analog Sensor Front-End (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 1: Аналоговий вимірювальний вузол». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 1: Analog Sensor Front-End'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-58-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 1: Analog Sensor Front-End'?",
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
            "id": "ee-58-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 104 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 104 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 156.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 104 * 1.5 = 156.0 В.",
            "explanationEn": "Calculation follows direct scaling: 104 * 1.5 = 156.0 V."
}),
          createCircuitLab({
            "id": "ee-58-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Підсумковий проєкт 1: Аналоговий вимірювальний вузол». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Capstone Project 1: Analog Sensor Front-End'. Run simulation and verify nodes.",
            "title": "Lab 58.4: Capstone Project 1: Analog Sensor Front-End",
            "netlist": "* EduForge SPICE Model for Unit 58\nV1 in 0 DC 10\nR1 in out 104k\nR2 out 0 5k\n.tran 10u 2m\n.end",
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
                                    "target": 0.459,
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
            "id": "ee-58-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 1: Analog Sensor Front-End':",
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
        slug: "ee-58-l5",
        titleUk: "Підсумковий проєкт 1: Аналоговий вимірювальний вузол (Частина 5)",
        titleEn: "Capstone Project 1: Analog Sensor Front-End (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-58-l5-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 1: Аналоговий вимірювальний вузол (Частина 5)",
            "promptEn": "Theoretical Foundations: Capstone Project 1: Analog Sensor Front-End (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 1: Аналоговий вимірювальний вузол». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 1: Analog Sensor Front-End'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-58-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 1: Analog Sensor Front-End'?",
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
            "id": "ee-58-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 109 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 109 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 163.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 109 * 1.5 = 163.5 В.",
            "explanationEn": "Calculation follows direct scaling: 109 * 1.5 = 163.5 V."
}),
          createCircuitLab({
            "id": "ee-58-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Підсумковий проєкт 1: Аналоговий вимірювальний вузол». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Capstone Project 1: Analog Sensor Front-End'. Run simulation and verify nodes.",
            "title": "Lab 58.5: Capstone Project 1: Analog Sensor Front-End",
            "netlist": "* EduForge SPICE Model for Unit 58\nV1 in 0 DC 10\nR1 in out 109k\nR2 out 0 16k\n.tran 10u 2m\n.end",
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
                                    "target": 1.28,
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
            "id": "ee-58-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 1: Analog Sensor Front-End':",
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
        slug: "ee-58-exam",
        titleUk: "Екзамен: Підсумковий проєкт 1: Аналоговий вимірювальний вузол",
        titleEn: "Exam: Capstone Project 1: Analog Sensor Front-End",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 1.0,
        exercises: [
          createMcq({
            "id": "ee-58-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Capstone Project 1: Analog Sensor Front-End'?",
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
            "id": "ee-58-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Capstone Project 1: Analog Sensor Front-End'?",
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
            "id": "ee-58-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Capstone Project 1: Analog Sensor Front-End'?",
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
            "id": "ee-58-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Підсумковий проєкт 1: Аналоговий вимірювальний вузол»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Capstone Project 1: Analog Sensor Front-End'?",
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
            "id": "ee-58-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 590 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 590 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 295.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 590 = 295.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 590 = 295.0 V."
}),
          createNumeric({
            "id": "ee-58-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 592 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 592 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 296.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 592 = 296.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 592 = 296.0 V."
}),
          createNumeric({
            "id": "ee-58-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 594 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 594 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 297.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 594 = 297.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 594 = 297.0 V."
}),
          createNumeric({
            "id": "ee-58-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 596 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 596 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 298.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 596 = 298.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 596 = 298.0 V."
}),
          createCircuitLab({
            "id": "ee-58-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Підсумковий проєкт 1: Аналоговий вимірювальний вузол».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Capstone Project 1: Analog Sensor Front-End'.",
            "title": "Exam Lab 58.9: Capstone Project 1: Analog Sensor Front-End",
            "netlist": "* Exam Model 58_9\nV1 in 0 DC 12\nR1 in out 67k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.558,
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
            "id": "ee-58-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Підсумковий проєкт 1: Аналоговий вимірювальний вузол».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Capstone Project 1: Analog Sensor Front-End'.",
            "title": "Exam Lab 58.10: Capstone Project 1: Analog Sensor Front-End",
            "netlist": "* Exam Model 58_10\nV1 in 0 DC 12\nR1 in out 68k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.538,
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
    slug: "ee-59-project-power-supply",
    titleUk: "Підсумковий проєкт 2: Імпульсне джерело живлення",
    titleEn: "Capstone Project 2: Switching Power Supply",
    lessons: [
      createLesson({
        slug: "ee-59-l1",
        titleUk: "Підсумковий проєкт 2: Імпульсне джерело живлення (Частина 1)",
        titleEn: "Capstone Project 2: Switching Power Supply (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-59-l1-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 2: Імпульсне джерело живлення (Частина 1)",
            "promptEn": "Theoretical Foundations: Capstone Project 2: Switching Power Supply (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 2: Імпульсне джерело живлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 2: Switching Power Supply'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-59-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 2: Імпульсне джерело живлення»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 2: Switching Power Supply'?",
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
            "id": "ee-59-l1-n1",
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
          createNumeric({
            "id": "ee-59-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 92 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 92 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.272,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 92 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 92 A."
}),
          createExplain({
            "id": "ee-59-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 2: Імпульсне джерело живлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 2: Switching Power Supply':",
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
        slug: "ee-59-l2",
        titleUk: "Підсумковий проєкт 2: Імпульсне джерело живлення (Частина 2)",
        titleEn: "Capstone Project 2: Switching Power Supply (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-59-l2-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 2: Імпульсне джерело живлення (Частина 2)",
            "promptEn": "Theoretical Foundations: Capstone Project 2: Switching Power Supply (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 2: Імпульсне джерело живлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 2: Switching Power Supply'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-59-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 2: Імпульсне джерело живлення»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 2: Switching Power Supply'?",
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
            "id": "ee-59-l2-n1",
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
          createNumeric({
            "id": "ee-59-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 97 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 97 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.258,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 97 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 97 A."
}),
          createExplain({
            "id": "ee-59-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 2: Імпульсне джерело живлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 2: Switching Power Supply':",
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
        slug: "ee-59-l3",
        titleUk: "Підсумковий проєкт 2: Імпульсне джерело живлення (Частина 3)",
        titleEn: "Capstone Project 2: Switching Power Supply (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-59-l3-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 2: Імпульсне джерело живлення (Частина 3)",
            "promptEn": "Theoretical Foundations: Capstone Project 2: Switching Power Supply (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 2: Імпульсне джерело живлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 2: Switching Power Supply'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-59-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 2: Імпульсне джерело живлення»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 2: Switching Power Supply'?",
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
            "id": "ee-59-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 102 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 102 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 153.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 102 * 1.5 = 153.0 В.",
            "explanationEn": "Calculation follows direct scaling: 102 * 1.5 = 153.0 V."
}),
          createNumeric({
            "id": "ee-59-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 102 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 102 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.245,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 102 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 102 A."
}),
          createExplain({
            "id": "ee-59-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 2: Імпульсне джерело живлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 2: Switching Power Supply':",
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
        slug: "ee-59-l4",
        titleUk: "Підсумковий проєкт 2: Імпульсне джерело живлення (Частина 4)",
        titleEn: "Capstone Project 2: Switching Power Supply (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-59-l4-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 2: Імпульсне джерело живлення (Частина 4)",
            "promptEn": "Theoretical Foundations: Capstone Project 2: Switching Power Supply (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 2: Імпульсне джерело живлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 2: Switching Power Supply'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-59-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 2: Імпульсне джерело живлення»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 2: Switching Power Supply'?",
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
            "id": "ee-59-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 107 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 107 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 160.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 107 * 1.5 = 160.5 В.",
            "explanationEn": "Calculation follows direct scaling: 107 * 1.5 = 160.5 V."
}),
          createCircuitLab({
            "id": "ee-59-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Підсумковий проєкт 2: Імпульсне джерело живлення». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Capstone Project 2: Switching Power Supply'. Run simulation and verify nodes.",
            "title": "Lab 59.4: Capstone Project 2: Switching Power Supply",
            "netlist": "* EduForge SPICE Model for Unit 59\nV1 in 0 DC 10\nR1 in out 107k\nR2 out 0 12k\n.tran 10u 2m\n.end",
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
                                    "target": 1.008,
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
            "id": "ee-59-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 2: Імпульсне джерело живлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 2: Switching Power Supply':",
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
        slug: "ee-59-l5",
        titleUk: "Підсумковий проєкт 2: Імпульсне джерело живлення (Частина 5)",
        titleEn: "Capstone Project 2: Switching Power Supply (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-59-l5-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 2: Імпульсне джерело живлення (Частина 5)",
            "promptEn": "Theoretical Foundations: Capstone Project 2: Switching Power Supply (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 2: Імпульсне джерело живлення». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 2: Switching Power Supply'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-59-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 2: Імпульсне джерело живлення»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 2: Switching Power Supply'?",
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
            "id": "ee-59-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 12 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 12 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 18.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 12 * 1.5 = 18.0 В.",
            "explanationEn": "Calculation follows direct scaling: 12 * 1.5 = 18.0 V."
}),
          createCircuitLab({
            "id": "ee-59-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Підсумковий проєкт 2: Імпульсне джерело живлення». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Capstone Project 2: Switching Power Supply'. Run simulation and verify nodes.",
            "title": "Lab 59.5: Capstone Project 2: Switching Power Supply",
            "netlist": "* EduForge SPICE Model for Unit 59\nV1 in 0 DC 10\nR1 in out 12k\nR2 out 0 23k\n.tran 10u 2m\n.end",
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
                                    "target": 6.571,
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
            "id": "ee-59-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 2: Імпульсне джерело живлення»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 2: Switching Power Supply':",
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
        slug: "ee-59-exam",
        titleUk: "Екзамен: Підсумковий проєкт 2: Імпульсне джерело живлення",
        titleEn: "Exam: Capstone Project 2: Switching Power Supply",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 1.0,
        exercises: [
          createMcq({
            "id": "ee-59-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Підсумковий проєкт 2: Імпульсне джерело живлення»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Capstone Project 2: Switching Power Supply'?",
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
            "id": "ee-59-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Підсумковий проєкт 2: Імпульсне джерело живлення»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Capstone Project 2: Switching Power Supply'?",
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
            "id": "ee-59-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Підсумковий проєкт 2: Імпульсне джерело живлення»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Capstone Project 2: Switching Power Supply'?",
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
            "id": "ee-59-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Підсумковий проєкт 2: Імпульсне джерело живлення»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Capstone Project 2: Switching Power Supply'?",
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
            "id": "ee-59-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 600 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 600 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 300.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 600 = 300.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 600 = 300.0 V."
}),
          createNumeric({
            "id": "ee-59-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 602 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 602 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 301.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 602 = 301.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 602 = 301.0 V."
}),
          createNumeric({
            "id": "ee-59-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 604 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 604 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 302.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 604 = 302.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 604 = 302.0 V."
}),
          createNumeric({
            "id": "ee-59-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 606 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 606 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 303.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 606 = 303.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 606 = 303.0 V."
}),
          createCircuitLab({
            "id": "ee-59-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Підсумковий проєкт 2: Імпульсне джерело живлення».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Capstone Project 2: Switching Power Supply'.",
            "title": "Exam Lab 59.9: Capstone Project 2: Switching Power Supply",
            "netlist": "* Exam Model 59_9\nV1 in 0 DC 12\nR1 in out 68k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.538,
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
            "id": "ee-59-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Підсумковий проєкт 2: Імпульсне джерело живлення».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Capstone Project 2: Switching Power Supply'.",
            "title": "Exam Lab 59.10: Capstone Project 2: Switching Power Supply",
            "netlist": "* Exam Model 59_10\nV1 in 0 DC 12\nR1 in out 69k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.519,
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
    slug: "ee-60-project-three-phase",
    titleUk: "Підсумковий проєкт 3: Трифазна промислова установка",
    titleEn: "Capstone Project 3: Three-Phase Industrial Installation",
    lessons: [
      createLesson({
        slug: "ee-60-l1",
        titleUk: "Підсумковий проєкт 3: Трифазна промислова установка (Частина 1)",
        titleEn: "Capstone Project 3: Three-Phase Industrial Installation (Part 1)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-60-l1-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 3: Трифазна промислова установка (Частина 1)",
            "promptEn": "Theoretical Foundations: Capstone Project 3: Three-Phase Industrial Installation (Part 1)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 3: Трифазна промислова установка». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 3: Three-Phase Industrial Installation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-60-l1-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 3: Трифазна промислова установка»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 3: Three-Phase Industrial Installation'?",
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
            "id": "ee-60-l1-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 95 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 95 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 142.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 95 * 1.5 = 142.5 В.",
            "explanationEn": "Calculation follows direct scaling: 95 * 1.5 = 142.5 V."
}),
          createNumeric({
            "id": "ee-60-l1-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 95 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 95 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.263,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 95 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 95 A."
}),
          createExplain({
            "id": "ee-60-l1-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 3: Трифазна промислова установка»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 3: Three-Phase Industrial Installation':",
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
        slug: "ee-60-l2",
        titleUk: "Підсумковий проєкт 3: Трифазна промислова установка (Частина 2)",
        titleEn: "Capstone Project 3: Three-Phase Industrial Installation (Part 2)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-60-l2-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 3: Трифазна промислова установка (Частина 2)",
            "promptEn": "Theoretical Foundations: Capstone Project 3: Three-Phase Industrial Installation (Part 2)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 3: Трифазна промислова установка». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 3: Three-Phase Industrial Installation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-60-l2-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 3: Трифазна промислова установка»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 3: Three-Phase Industrial Installation'?",
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
            "id": "ee-60-l2-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 100 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 100 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 150.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 100 * 1.5 = 150.0 В.",
            "explanationEn": "Calculation follows direct scaling: 100 * 1.5 = 150.0 V."
}),
          createNumeric({
            "id": "ee-60-l2-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 100 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 100 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.25,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 100 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 100 A."
}),
          createExplain({
            "id": "ee-60-l2-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 3: Трифазна промислова установка»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 3: Three-Phase Industrial Installation':",
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
        slug: "ee-60-l3",
        titleUk: "Підсумковий проєкт 3: Трифазна промислова установка (Частина 3)",
        titleEn: "Capstone Project 3: Three-Phase Industrial Installation (Part 3)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-60-l3-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 3: Трифазна промислова установка (Частина 3)",
            "promptEn": "Theoretical Foundations: Capstone Project 3: Three-Phase Industrial Installation (Part 3)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 3: Трифазна промислова установка». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 3: Three-Phase Industrial Installation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-60-l3-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 3: Трифазна промислова установка»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 3: Three-Phase Industrial Installation'?",
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
            "id": "ee-60-l3-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 105 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 105 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 157.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 105 * 1.5 = 157.5 В.",
            "explanationEn": "Calculation follows direct scaling: 105 * 1.5 = 157.5 V."
}),
          createNumeric({
            "id": "ee-60-l3-n2",
            "promptUk": "Розрахуйте струм у вітці при опорі 105 Ом та напрузі 25 В:",
            "promptEn": "Calculate branch current for resistance 105 Ohm with 25 V applied:",
            "formula": "I = \\frac{V}{R}",
            "target": 0.238,
            "unit": "A",
            "absTolerance": 0.05,
            "relTolerance": 0.02,
            "explanationUk": "Струм визначається за законом Ома: I = 25 / 105 А.",
            "explanationEn": "Current is determined via Ohm's Law: I = 25 / 105 A."
}),
          createExplain({
            "id": "ee-60-l3-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 3: Трифазна промислова установка»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 3: Three-Phase Industrial Installation':",
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
        slug: "ee-60-l4",
        titleUk: "Підсумковий проєкт 3: Трифазна промислова установка (Частина 4)",
        titleEn: "Capstone Project 3: Three-Phase Industrial Installation (Part 4)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-60-l4-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 3: Трифазна промислова установка (Частина 4)",
            "promptEn": "Theoretical Foundations: Capstone Project 3: Three-Phase Industrial Installation (Part 4)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 3: Трифазна промислова установка». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 3: Three-Phase Industrial Installation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-60-l4-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 3: Трифазна промислова установка»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 3: Three-Phase Industrial Installation'?",
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
            "id": "ee-60-l4-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 10 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 10 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 15.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 10 * 1.5 = 15.0 В.",
            "explanationEn": "Calculation follows direct scaling: 10 * 1.5 = 15.0 V."
}),
          createCircuitLab({
            "id": "ee-60-l4-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Підсумковий проєкт 3: Трифазна промислова установка». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Capstone Project 3: Three-Phase Industrial Installation'. Run simulation and verify nodes.",
            "title": "Lab 60.4: Capstone Project 3: Three-Phase Industrial Installation",
            "netlist": "* EduForge SPICE Model for Unit 60\nV1 in 0 DC 10\nR1 in out 10k\nR2 out 0 19k\n.tran 10u 2m\n.end",
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
                                    "target": 6.552,
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
            "id": "ee-60-l4-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 3: Трифазна промислова установка»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 3: Three-Phase Industrial Installation':",
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
        slug: "ee-60-l5",
        titleUk: "Підсумковий проєкт 3: Трифазна промислова установка (Частина 5)",
        titleEn: "Capstone Project 3: Three-Phase Industrial Installation (Part 5)",
        difficulty: 5,
        baseXp: 35,
        exercises: [
          createConcept({
            "id": "ee-60-l5-c1",
            "promptUk": "Теоретичні основи: Підсумковий проєкт 3: Трифазна промислова установка (Частина 5)",
            "promptEn": "Theoretical Foundations: Capstone Project 3: Three-Phase Industrial Installation (Part 5)",
            "bodyUk": "Вивчення базових фізичних принципів, аналітичних моделей та рівнянь стану для «Підсумковий проєкт 3: Трифазна промислова установка». Розрахунок спирається на закони збереження енергії та електричного заряду в інженерних системах.",
            "bodyEn": "Analysis of governing physical principles, circuit models, and constitutive equations for 'Capstone Project 3: Three-Phase Industrial Installation'. Formulations are derived from energy conservation and charge dynamics in engineering systems.",
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
            "id": "ee-60-l5-q1",
            "promptUk": "Яке основне твердження є вірним для теми «Підсумковий проєкт 3: Трифазна промислова установка»?",
            "promptEn": "Which core statement is correct regarding 'Capstone Project 3: Three-Phase Industrial Installation'?",
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
            "id": "ee-60-l5-n1",
            "promptUk": "Обчисліть вихідну напругу або параметр при базовому значенні 15 та коефіцієнті 1.5:",
            "promptEn": "Calculate the output voltage or parameter for base value 15 with factor 1.5:",
            "formula": "V_{out} = V_{in} \\cdot 1.5",
            "target": 22.5,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Розрахунок проводиться за формулою прямого масштабування: 15 * 1.5 = 22.5 В.",
            "explanationEn": "Calculation follows direct scaling: 15 * 1.5 = 22.5 V."
}),
          createCircuitLab({
            "id": "ee-60-l5-lab",
            "promptUk": "SPICE Лабораторія: Дослідження режиму роботи для «Підсумковий проєкт 3: Трифазна промислова установка». Запустіть симуляцію схеми.",
            "promptEn": "SPICE Laboratory: Operating Mode Analysis for 'Capstone Project 3: Three-Phase Industrial Installation'. Run simulation and verify nodes.",
            "title": "Lab 60.5: Capstone Project 3: Three-Phase Industrial Installation",
            "netlist": "* EduForge SPICE Model for Unit 60\nV1 in 0 DC 10\nR1 in out 15k\nR2 out 0 30k\n.tran 10u 2m\n.end",
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
                                    "target": 6.667,
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
            "id": "ee-60-l5-exp",
            "promptUk": "Поясніть фізичну сутність та інженерне значення теми «Підсумковий проєкт 3: Трифазна промислова установка»:",
            "promptEn": "Explain the physical meaning and engineering significance of 'Capstone Project 3: Three-Phase Industrial Installation':",
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
        slug: "ee-60-exam",
        titleUk: "Екзамен: Підсумковий проєкт 3: Трифазна промислова установка",
        titleEn: "Exam: Capstone Project 3: Three-Phase Industrial Installation",
        difficulty: 5,
        baseXp: 100,
        isExam: true,
        passThreshold: 1.0,
        exercises: [
          createMcq({
            "id": "ee-60-exam-q1",
            "promptUk": "Екзаменаційне питання 1: Яке твердження є справедливим для аналізу «Підсумковий проєкт 3: Трифазна промислова установка»?",
            "promptEn": "Exam Question 1: Which statement holds true for the analysis of 'Capstone Project 3: Three-Phase Industrial Installation'?",
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
            "id": "ee-60-exam-q2",
            "promptUk": "Екзаменаційне питання 2: Яке твердження є справедливим для аналізу «Підсумковий проєкт 3: Трифазна промислова установка»?",
            "promptEn": "Exam Question 2: Which statement holds true for the analysis of 'Capstone Project 3: Three-Phase Industrial Installation'?",
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
            "id": "ee-60-exam-q3",
            "promptUk": "Екзаменаційне питання 3: Яке твердження є справедливим для аналізу «Підсумковий проєкт 3: Трифазна промислова установка»?",
            "promptEn": "Exam Question 3: Which statement holds true for the analysis of 'Capstone Project 3: Three-Phase Industrial Installation'?",
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
            "id": "ee-60-exam-q4",
            "promptUk": "Екзаменаційне питання 4: Яке твердження є справедливим для аналізу «Підсумковий проєкт 3: Трифазна промислова установка»?",
            "promptEn": "Exam Question 4: Which statement holds true for the analysis of 'Capstone Project 3: Three-Phase Industrial Installation'?",
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
            "id": "ee-60-exam-n5",
            "promptUk": "Екзаменаційна задача 5: Обчисліть розрахунковий параметр при базовому опорі 610 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 5: Calculate parameter with base resistance 610 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 305.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 610 = 305.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 610 = 305.0 V."
}),
          createNumeric({
            "id": "ee-60-exam-n6",
            "promptUk": "Екзаменаційна задача 6: Обчисліть розрахунковий параметр при базовому опорі 612 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 6: Calculate parameter with base resistance 612 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 306.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 612 = 306.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 612 = 306.0 V."
}),
          createNumeric({
            "id": "ee-60-exam-n7",
            "promptUk": "Екзаменаційна задача 7: Обчисліть розрахунковий параметр при базовому опорі 614 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 7: Calculate parameter with base resistance 614 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 307.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 614 = 307.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 614 = 307.0 V."
}),
          createNumeric({
            "id": "ee-60-exam-n8",
            "promptUk": "Екзаменаційна задача 8: Обчисліть розрахунковий параметр при базовому опорі 616 Ом та струмі 0.5 А:",
            "promptEn": "Exam Problem 8: Calculate parameter with base resistance 616 Ohm and current 0.5 A:",
            "formula": "V = I \\cdot R",
            "target": 308.0,
            "unit": "V",
            "absTolerance": 0.1,
            "relTolerance": 0.02,
            "explanationUk": "Напруга дорівнює добутку струму на опір: 0.5 * 616 = 308.0 В.",
            "explanationEn": "Voltage equals current times resistance: 0.5 * 616 = 308.0 V."
}),
          createCircuitLab({
            "id": "ee-60-exam-lab9",
            "promptUk": "Екзаменаційний лабораторний тест 9: Підтвердження режиму в SPICE для «Підсумковий проєкт 3: Трифазна промислова установка».",
            "promptEn": "Exam Lab Test 9: SPICE Operating Point Verification for 'Capstone Project 3: Three-Phase Industrial Installation'.",
            "title": "Exam Lab 60.9: Capstone Project 3: Three-Phase Industrial Installation",
            "netlist": "* Exam Model 60_9\nV1 in 0 DC 12\nR1 in out 69k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.519,
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
            "id": "ee-60-exam-lab10",
            "promptUk": "Екзаменаційний лабораторний тест 10: Підтвердження режиму в SPICE для «Підсумковий проєкт 3: Трифазна промислова установка».",
            "promptEn": "Exam Lab Test 10: SPICE Operating Point Verification for 'Capstone Project 3: Three-Phase Industrial Installation'.",
            "title": "Exam Lab 60.10: Capstone Project 3: Three-Phase Industrial Installation",
            "netlist": "* Exam Model 60_10\nV1 in 0 DC 12\nR1 in out 70k\nR2 out 0 10k\n.tran 10u 1m\n.end",
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
                                    "target": 1.5,
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