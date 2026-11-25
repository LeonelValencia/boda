import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";
import { config } from "../config";
import { BASE } from "../hooks";

const DIAS = ["D", "L", "M", "M", "J", "V", "S"];

/** Mini calendario de enero 2027 con el 10 resaltado. */
function Calendario() {
  const inicio = new Date(2027, 0, 1).getDay(); // 0 = domingo
  const celdas = [...Array(inicio).fill(null), ...Array.from({ length: 31 }, (_, i) => i + 1)];
  return (
    <div className="cal" role="img" aria-label="Enero 2027, el día 10 está marcado">
      <p className="cal-mes">Enero <b>2027</b></p>
      <div className="cal-grid">
        {DIAS.map((d, i) => <span key={i} className="cal-dow">{d}</span>)}
        {celdas.map((d, i) => d === 10
          ? <motion.span key={i} className="cal-hit" initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.6, stiffness: 160, damping: 11 }}><em>10</em></motion.span>
          : <span key={i} className="cal-d">{d}</span>)}
      </div>
      <p className="cal-foot">Domingo · 1:00 PM</p>
    </div>
  );
}

export default function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const rot = useTransform(scrollYProgress, [0, 1], [-2.5, 2.5]);
  const leafY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section className="section story" id="nosotros" ref={ref}>
      <motion.img className="deco story-leaves" style={{ y: leafY }} src={`${BASE}img/hojas-izq.webp`} alt="" />
      <motion.img className="deco story-rose" style={{ y: leafY }} src={`${BASE}img/rosa-abajo.webp`} alt="" />
      <div className="wrap two">
        <motion.figure className="arch" style={{ rotate: rot }}
          initial={{ opacity: 0, scale: 0.92 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
          <motion.img src={`${BASE}img/pareja.jpg`} alt={`${config.novios.el} y ${config.novios.ella}`} style={{ y, scale: 1.1 }} />
          <span className="arch-ring" />
        </motion.figure>

        <div className="story-text">
          <Reveal><p className="kicker">Con la bendición de Dios</p></Reveal>
          <Reveal delay={0.1} as="h2"><span className="script h2">Dos corazones, un solo camino</span></Reveal>
          <Reveal delay={0.2}>
            <p className="lead">Hoy iniciamos la aventura más hermosa de nuestras vidas y queremos que estés a nuestro lado para compartir la alegría de este día tan especial.</p>
          </Reveal>
          <Reveal delay={0.3}><Calendario /></Reveal>
        </div>
      </div>
    </section>
  );
}
