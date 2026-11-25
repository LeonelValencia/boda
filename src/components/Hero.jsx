import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { config } from "../config";
import { BASE, useCountdown, pad } from "../hooks";

const unidades = [["d", "Días"], ["h", "Horas"], ["m", "Minutos"], ["s", "Segundos"]];

export default function Hero({ show }) {
  const t = useCountdown(config.fechaBoda);
  const { novios } = config;
  const go = show ? "visible" : "hidden";
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTop = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const yBot = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const yTxt = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const up = (d) => ({ hidden: { opacity: 0, y: 26 }, visible: { opacity: 1, y: 0, transition: { delay: d, duration: 1, ease: [0.22, 1, 0.36, 1] } } });
  const reveal = (d) => ({ hidden: { clipPath: "inset(0 100% 0 0)", opacity: 0 }, visible: { clipPath: "inset(0 -10% 0 -10%)", opacity: 1, transition: { delay: d, duration: 1.8, ease: [0.65, 0, 0.35, 1] } } });

  return (
    <section className="hero" id="inicio" ref={ref}>
      <div className="aurora" aria-hidden="true"><i /><i /><i /></div>
      <motion.div className="deco rose-tr" style={{ y: yTop }}><img className="sway" src={`${BASE}img/rosa-arriba.webp`} alt="" /></motion.div>
      <motion.div className="deco rose-bl" style={{ y: yBot }}><img className="sway2" src={`${BASE}img/rosa-abajo.webp`} alt="" /></motion.div>
      <img className="deco leaves-l" src={`${BASE}img/hojas-izq.webp`} alt="" />
      <img className="deco leaves-r" src={`${BASE}img/hojas-der.webp`} alt="" />

      <motion.div className="hero-inner" style={{ y: yTxt, opacity: fade }}>
        <motion.p className="eyebrow" variants={up(0.1)} initial="hidden" animate={go}>Nos encantaría su presencia y bendiciones<br />en este día tan especial</motion.p>
        <motion.p className="kicker" variants={up(0.3)} initial="hidden" animate={go}>Nuestra boda</motion.p>

        <motion.h1 className="script names" variants={reveal(0.5)} initial="hidden" animate={go}>{novios.el}</motion.h1>
        <motion.span className="amp" variants={up(1.5)} initial="hidden" animate={go}>y</motion.span>
        <motion.h1 className="script names second" variants={reveal(1.7)} initial="hidden" animate={go}>{novios.ella}</motion.h1>

        <motion.div className="orn" variants={up(2.8)} initial="hidden" animate={go}><i /><b>❦</b><i /></motion.div>
        <motion.p className="date" variants={up(3)} initial="hidden" animate={go}>{config.fechaTexto}</motion.p>
        <motion.p className="place" variants={up(3.2)} initial="hidden" animate={go}>Xoxocotla, Morelos</motion.p>

        <motion.div className="countdown" variants={up(3.5)} initial="hidden" animate={go} aria-live="off">
          {t.done ? (
            <p className="script done">¡Hoy es el gran día!</p>
          ) : (
            unidades.map(([k, label]) => (
              <div className="cd" key={k}>
                <span className="cd-num" key={t[k]}>{k === "d" ? t[k] : pad(t[k])}</span>
                <span className="cd-lab">{label}</span>
              </div>
            ))
          )}
        </motion.div>
        <motion.p className="faltan" variants={up(3.7)} initial="hidden" animate={go}>{t.done ? "" : "para el gran día"}</motion.p>
      </motion.div>

      <motion.a href="#nosotros" className="scroll-cue" variants={up(4.2)} initial="hidden" animate={go} aria-label="Bajar"><span /></motion.a>
    </section>
  );
}
