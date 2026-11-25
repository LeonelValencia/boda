import { config } from "../config";

/** Cinta azul con texto que se desplaza. */
export default function Marquee() {
  const t = `${config.novios.el} & ${config.novios.ella}  ❦  10 · 01 · 2027  ❦  Xoxocotla, Morelos  ❦  `;
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">{[0, 1, 2, 3].map((i) => <span key={i} className="script">{t.repeat(2)}</span>)}</div>
    </div>
  );
}
