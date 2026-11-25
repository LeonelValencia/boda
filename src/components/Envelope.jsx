import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { config } from "../config";
import { BASE } from "../hooks";

/** Pantalla inicial: sobre azul con sello. Al tocarlo se abre y revela la invitación. */
export default function Envelope({ onOpen }) {
  const [phase, setPhase] = useState("closed"); // closed → opening → gone
  const { novios } = config;

  useEffect(() => {
    document.body.style.overflow = phase === "gone" ? "" : "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [phase]);

  const abrir = () => {
    if (phase !== "closed") return;
    setPhase("opening");
    onOpen?.();
    setTimeout(() => setPhase("gone"), 2600);
  };

  if (phase === "gone") return null;
  return (
    <motion.div
      className={`intro ${phase}`}
      animate={phase === "opening" ? { opacity: [1, 1, 0], scale: [1, 1, 1.12], filter: ["blur(0px)", "blur(0px)", "blur(8px)"] } : {}}
      transition={{ duration: 2.6, times: [0, 0.72, 1], ease: "easeInOut" }}
    >
      <img className="intro-rose tl" src={`${BASE}img/rosa-arriba.webp`} alt="" />
      <img className="intro-rose br" src={`${BASE}img/rosa-abajo.webp`} alt="" />

      <motion.header initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 1 }}>
        <p className="eyebrow">Nuestra boda</p>
        <h1 className="script intro-names">{novios.el} <span>&</span> {novios.ella}</h1>
      </motion.header>

      <motion.div className="envelope-wrap" initial={{ opacity: 0, y: 40, scale: 0.94 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.5, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}>
        <div className="envelope" onClick={abrir} role="button" tabIndex={0} aria-label="Abrir invitación"
             onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && abrir()}>
          <div className="env-back" />
          <div className="env-card">
            <p className="card-date">10 · ENERO · 2027</p>
            <p className="card-hint">Toca el sello para abrir</p>
          </div>
          <div className="env-side l" /><div className="env-side r" /><div className="env-bottom" />
          <div className="env-flap" />
          <div className="env-seal" aria-hidden="true"><span className="script">L&amp;A</span></div>
          <div className="env-to">
            <small>LA MÁS CORDIAL INVITACIÓN PARA:</small>
            <strong className="script">Ti y tu familia</strong>
          </div>
        </div>
        <p className="intro-foot">Hemos reservado especialmente<br />un lugar para ustedes</p>
      </motion.div>
    </motion.div>
  );
}
