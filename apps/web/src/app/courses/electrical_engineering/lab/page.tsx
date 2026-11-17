import { CircuitLabClient } from "./circuit-lab-client";

export const metadata = {
  title: "SPICE Лабораторія | EduForge",
  description: "Інтерактивна лабораторія моделювання електричних кіл SPICE",
};

export default function CircuitLabPage() {
  return <CircuitLabClient />;
}
