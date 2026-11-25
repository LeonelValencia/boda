import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./Reveal";
import { config } from "../config";

const KEY = "rsvp:boda";
const leer = () => { try { return JSON.parse(localStorage.getItem(KEY)); } catch { return null; } };
const guardar = (v) => { try { localStorage.setItem(KEY, JSON.stringify(v)); } catch { } };

export default function RSVP({ onSuccess }) {
  const cerrado = Date.now() > new Date(config.fechaLimiteRSVP).getTime();
  const previo = leer();
  const [f, setF] = useState({ nombre: "", asistencia: "", telefono: "", comentarios: "", web: "" });
  const [estado, setEstado] = useState(previo ? "enviado" : "form"); // form | enviando | enviado | error
  const [errores, setErrores] = useState({});
  const [resp, setResp] = useState(previo);
  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const wa = config.whatsapp && `https://wa.me/${config.whatsapp}`;
  const asiste = resp?.asistencia?.startsWith("Sí");

  function validar() {
    const e = {};
    if (!f.nombre.trim()) e.nombre = "Escribe tu nombre o el de tu familia";
    if (!f.asistencia) e.asistencia = "Cuéntanos si nos acompañarás";
    if (f.telefono.replace(/\D/g, "").length < 10) e.telefono = "Escribe un teléfono de 10 dígitos";
    setErrores(e);
    return !Object.keys(e).length;
  }

  async function enviar(ev) {
    ev.preventDefault();
    if (f.web || !validar()) return; // "web" es una trampa para bots
    setEstado("enviando");
    const datos = {
      nombre: f.nombre.trim(),
      asistencia: f.asistencia === "si" ? "Sí asistiremos" : "No podremos asistir",
      telefono: f.telefono.trim(), comentarios: f.comentarios.trim(), enviado: new Date().toISOString(),
    };
    try {
      if (config.rsvpEndpoint) {
        await fetch(config.rsvpEndpoint, { method: "POST", mode: "no-cors", body: new URLSearchParams(datos) });
      } else if (config.whatsapp) {
        window.open(`https://wa.me/${config.whatsapp}?text=${encodeURIComponent(`Hola, somos ${datos.nombre}. ${datos.asistencia}. Tel: ${datos.telefono}. ${datos.comentarios}`)}`, "_blank");
      } else throw new Error("sin destino");
      guardar(datos); setResp(datos); setEstado("enviado");
      if (f.asistencia === "si") onSuccess?.();
    } catch { setEstado("error"); }
  }

  return (
    <section className="section rsvp" id="confirmar">
      <div className="wrap narrow">
        <Reveal className="head">
          <p className="kicker">Confirmación de asistencia (opcional)</p>
          <h2 className="script h2">¿Nos acompañas?</h2>
          <p className="lead">Nos encantaría compartir este día tan especial contigo. Por favor ayúdanos a preparar los últimos detalles confirmando tu asistencia antes del <b>{config.fechaLimiteTexto}</b>.</p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rsvp-card">
            <AnimatePresence mode="wait">
              {cerrado && estado !== "enviado" ? (
                <motion.div key="cerrado" className="rsvp-msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <h3 className="script">El periodo de confirmación terminó</h3>
                  <p>Si aún quieres avisarnos, escríbenos directamente.</p>
                  {wa && <a className="btn" href={wa} target="_blank" rel="noreferrer">Escribir por WhatsApp</a>}
                </motion.div>
              ) : estado === "enviado" ? (
                <motion.div key="ok" className="rsvp-msg" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
                  <div className="check"><svg viewBox="0 0 52 52"><motion.path d="M14 27l8 8 16-17" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.7, delay: 0.2 }} /></svg></div>
                  <h3 className="script">{asiste ? "¡Gracias por confirmar!" : "Gracias por avisarnos"}</h3>
                  <p>{asiste ? <>Te esperamos con mucho cariño, <b>{resp.nombre}</b>.</> : "Lamentamos que no puedan acompañarnos, pero los llevaremos en el corazón."}</p>
                  {!cerrado && <button className="link" onClick={() => { setF((x) => ({ ...x, nombre: resp.nombre, telefono: resp.telefono, comentarios: resp.comentarios || "", asistencia: asiste ? "si" : "no" })); setEstado("form"); }}>Cambiar mi respuesta</button>}
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={enviar} noValidate exit={{ opacity: 0 }}>
                  <label className="field">
                    <span>Nombre de la familia o invitado</span>
                    <input value={f.nombre} onChange={(e) => set("nombre", e.target.value)} placeholder="Ej. Familia Pérez López" autoComplete="name" />
                    {errores.nombre && <em>{errores.nombre}</em>}
                  </label>

                  <fieldset className="field">
                    <legend>Asistencia</legend>
                    <div className="choices">
                      {[["si", "¡Sí, ahí estaremos!", "🎉"], ["no", "No podremos asistir", "💌"]].map(([v, t, e]) => (
                        <label key={v} className={`choice ${f.asistencia === v ? "on" : ""}`}>
                          <input type="radio" name="asistencia" value={v} checked={f.asistencia === v} onChange={() => set("asistencia", v)} />
                          <span>{e}</span>{t}
                        </label>
                      ))}
                    </div>
                    {errores.asistencia && <em>{errores.asistencia}</em>}
                  </fieldset>

                  <label className="field">
                    <span>Teléfono de contacto</span>
                    <input type="tel" inputMode="tel" value={f.telefono} onChange={(e) => set("telefono", e.target.value)} placeholder="10 dígitos" autoComplete="tel" />
                    {errores.telefono && <em>{errores.telefono}</em>}
                  </label>

                  <label className="field">
                    <span>Comentarios <small>(opcional)</small></span>
                    <textarea rows="3" value={f.comentarios} onChange={(e) => set("comentarios", e.target.value)} placeholder="Un mensaje para los novios" />
                  </label>

                  <input className="hp" tabIndex="-1" autoComplete="off" value={f.web} onChange={(e) => set("web", e.target.value)} aria-hidden="true" />

                  <button className="btn solid" disabled={estado === "enviando"}>{estado === "enviando" ? "Enviando…" : "Confirmar asistencia"}</button>
                  {estado === "error" && <p className="err">No pudimos enviar tu respuesta. {wa ? <>Escríbenos por <a href={wa}>WhatsApp</a>.</> : "Intenta de nuevo en unos minutos."}</p>}
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
        {wa && <p className="help">¿Problemas con la confirmación? Escríbenos por <a href={wa} target="_blank" rel="noreferrer">WhatsApp</a>.</p>}
      </div>
    </section>
  );
}
