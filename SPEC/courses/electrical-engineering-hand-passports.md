# Hand-authored electrical engineering passports

These nine modules are written in the stage sources. `ee-emit.mjs` does not regenerate them. It appends this file to the generated passport list.

### ee-01 `ee-01-matter-charge`

- Titles: Заряд і речовина / Charge and matter
- Prerequisites: none. This module does not use Ohm's law or Kirchhoff's laws.
- Lesson topics: charge and atoms, conductors and ions, conservation of charge, field versus flow, and the coulomb as a count of charge.
- Observable results: the learner compares charges, states that charge is conserved, and computes a charge from a stated count of elementary charges after the coulomb is introduced.
- Formula and model limit: Q = n·e once the elementary charge is defined. The module does not treat a circuit.
- Independent checks: two numeric answers and one multiple-choice item in every taught lesson.
- Exam matrix: ten items, at most four multiple-choice, no concept or explain cards. Pass threshold 0.7.
- Sources: SI brochure for the coulomb. Classroom pictures are original.

### ee-02 `ee-02-electric-field`

- Titles: Поле і потенціал / Field and potential
- Prerequisites: ee-01.
- Observable results: the learner uses Coulomb's force and distinguishes potential difference from a second multiplication by path length.
- Formula and model limit: point-charge Coulomb model. It is not a resistive divider.

### ee-03 `ee-03-current-voltage`

- Titles: Струм і напруга / Current and voltage
- Prerequisites: ee-02.
- Observable results: the learner separates current from voltage and computes charge from a constant current only after that definition is introduced.

### ee-04 `ee-04-si-units-math`

- Titles: Одиниці SI і перевірка розмірності / SI units and dimensional checks
- Prerequisites: ee-03.
- Observable results: the learner converts prefixes, rearranges I = Q/t, and rejects a wrong decade.
- Worked example: 0.03 A for 4 s is 0.12 C. Substituting backwards returns 0.03 A.

### ee-05 `ee-05-resistance-ohm`

- Titles: Опір і закон Ома / Resistance and Ohm's law
- Prerequisites: ee-04.
- Observable results: the learner applies Ohm's law, converts mm² to m², and uses the linear copper temperature model R = R0(1 + αΔT) with the teaching value α = 0.00393 per °C.
- Model limit: the linear coefficient is not a semiconductor model.

### ee-06 `ee-06-work-power-safety`

- Titles: Потужність, енергія і безпека / Power, energy, and safety
- Prerequisites: ee-05.
- Observable results: the learner computes electrical power and energy and states a touch-voltage hazard without treating it as a circuit-design lab.

### ee-07 `ee-07-schematics-meters`

- Titles: Схеми і вимірювальні прилади / Schematics and meters
- Prerequisites: ee-06.
- Worked example: 12 V across 100 Ω and 300 Ω in series gives 0.03 A, 3 V, 9 V, and a power balance of 0.36 W.
- Characteristic mistake: an ideal ammeter placed across a resistor shorts that resistor. A later zero on the voltmeter does not prove the resistor failed.

### ee-08 `ee-08-series-parallel`

- Titles: Послідовне і паралельне з'єднання / Series and parallel
- Prerequisites: ee-07.
- Worked example: 200 Ω parallel to 300 Ω is 120 Ω. Three 100 Ω branches are 100/3 Ω by adding conductances.
- Model limit: the product-over-sum formula is for two branches.

### ee-37 `ee-37-power-switches-pwm`

- Titles: Силові ключі, ШІМ, драйвери затвора та снаббери / Power switches, PWM, gate drivers, and snubbers
- Prerequisites: the semiconductor and converter modules before this one.
- Worked example: 20 kHz at duty 0.25 has a 12.5 µs on-time. Conduction loss in the worked switch example is 0.125 W.
- Observable results: the learner separates conduction loss, switching loss, gate charge, and a snubber for parasitic inductance.
- Model limit: the numeric examples are lumped. They are not a full switched-mode transient simulation.
- Exam matrix: ten items, at most four multiple-choice. Pass threshold 0.7.
