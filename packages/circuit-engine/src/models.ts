/**
 * Standard built-in SPICE models and subcircuits for components.
 * Provided locally to avoid external file fetches or insecure includes.
 */

export const STANDARD_SPICE_MODELS = `
* --- Standard Diode Models ---
.model D1N4148 D (Is=2.52n Rs=0.568 N=1.752 Cjo=4p M=0.4 tt=20n Bv=100 Ibv=100u)
.model D1N4007 D (Is=7.027n Rs=0.0341 N=1.8 Cjo=10p M=0.333 tt=5u Bv=1000 Ibv=50u)
.model DZ5V1 D (Is=1e-11 Rs=2.5 N=1.2 Bv=5.1 Ibv=5m)
.model DLED D (Is=1e-19 N=1.8 Rs=2 Eg=2.1 Cjo=20p)

* --- Standard BJT Models ---
.model Q2N2222 NPN (Is=14.34f Xti=3 Eg=1.11 Vaf=74.03 Bf=255.9 Ne=1.307
+ Ise=14.34f Ikf=.2847 Xtb=1.5 Br=6.092 Nc=2 Isc=0 Ikr=0 Rc=1
+ Cjc=7.306p Mjc=.3416 Vjc=.75 Fc=.5 Cje=22.01p Mje=.377 Vje=.75
+ Tr=46.91n Tf=411.1p Itf=.6 Vtf=1.7 Xtf=3 Rb=10)

.model Q2N2907 PNP (Is=650.6f Xti=3 Eg=1.11 Vaf=115.7 Bf=231.7 Ne=1.829
+ Ise=54.81p Ikf=1.079 Xtb=1.5 Br=3.563 Nc=2 Isc=0 Ikr=0 Rc=.715
+ Cjc=14.74p Mjc=.5383 Vjc=.75 Fc=.5 Cje=19.82p Mje=.3357 Vje=.75
+ Tr=111.3n Tf=603.7p Itf=.65 Vtf=5 Xtf=1.7 Rb=10)

* --- Standard MOSFET Models ---
.model M2N7000 NMOS (Level=1 Vto=2.1 Kp=0.12 Lambda=0.02 Rd=1.2 Rs=1.2 Cgs=40p Cgd=10p)
.model MIRF540 NMOS (Level=1 Vto=3.7 Kp=5.5 Lambda=0.01 Rd=0.04 Rs=0.02 Cgs=1.2n Cgd=150p)
.model MIRF9540 PMOS (Level=1 Vto=-3.5 Kp=3.2 Lambda=0.01 Rd=0.1 Rs=0.05 Cgs=1.1n Cgd=200p)

* --- Ideal and Practical Op-Amp Subcircuits ---
* Ideal Op-Amp: 3-terminal (in_plus in_minus out)
.subckt OPAMP_IDEAL 1 2 3
Rin 1 2 100Meg
E1 3 0 1 2 100k
Rout 3 0 100Meg
.ends OPAMP_IDEAL

* 5-terminal Op-Amp with supply rails: (in_plus in_minus v_pos v_neg out)
.subckt OPAMP_RAIL 1 2 3 4 5
Rin 1 2 10Meg
Egain 6 0 1 2 100k
Rlimit 6 7 100
Dpos 7 3 D1N4148
Dneg 4 7 D1N4148
Eout 5 0 7 0 1
Rout 5 0 50
.ends OPAMP_RAIL

* LM741 Macro-model: (in_plus in_minus v_pos v_neg out)
.subckt LM741 1 2 3 4 5
Rin 1 2 2Meg
Ib1 1 0 80n
Ib2 2 0 80n
* Differential gain with dominant pole at 10 Hz (Unity Gain Bandwidth ~ 1 MHz)
G1 0 6 1 2 1m
R1 6 0 100Meg
C1 6 0 159p
* Output stage with voltage saturation
Eout 7 0 6 0 1
Rout 7 5 75
Dhigh 7 3 DZ5V1
Dlow 4 7 DZ5V1
.ends LM741
`;

/**
 * Normalizes component model names.
 */
export function getModelDefForComponent(type: string, userModel?: string): string {
  const normType = type.toLowerCase();
  if (normType.includes("opamp") || normType === "op_amp") {
    if (userModel && userModel.toLowerCase().includes("741")) return "LM741";
    if (userModel && userModel.toLowerCase().includes("rail")) return "OPAMP_RAIL";
    return "OPAMP_IDEAL";
  }
  if (normType === "diode") {
    if (userModel && userModel.toLowerCase().includes("4007")) return "D1N4007";
    return "D1N4148";
  }
  if (normType === "zener") return "DZ5V1";
  if (normType === "led") return "DLED";
  if (normType === "bjt_npn" || normType === "npn") return "Q2N2222";
  if (normType === "bjt_pnp" || normType === "pnp") return "Q2N2907";
  if (normType === "mosfet_n" || normType === "nmos") {
    if (userModel && userModel.toLowerCase().includes("irf")) return "MIRF540";
    return "M2N7000";
  }
  if (normType === "mosfet_p" || normType === "pmos") return "MIRF9540";
  return userModel ?? "";
}
