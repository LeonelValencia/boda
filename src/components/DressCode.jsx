import Reveal from "./Reveal";
import { config } from "../config";
import { BASE } from "../hooks";

export default function DressCode() {
  return (
    <section className="section dress" id="vestimenta">
      <img className="deco dress-r" src={`${BASE}img/rosa-arriba.webp`} alt="" />
      <img className="deco dress-l" src={`${BASE}img/rosa-abajo.webp`} alt="" />
      <Reveal className="wrap narrow center">
        <svg className="hanger" viewBox="0 0 64 40" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M32 12a5 5 0 1 0-5-5"/><path d="M32 12 4 31a3 3 0 0 0 2 5h52a3 3 0 0 0 2-5z"/></svg>
        <p className="kicker">Código de vestimenta</p>
        <p className="dress-code">{config.codigoVestimenta}</p>
        <p className="muted">Queremos verlos elegantes y cómodos para disfrutar juntos este día.</p>
      </Reveal>
    </section>
  );
}
