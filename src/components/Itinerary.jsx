import { motion } from "framer-motion";
import Reveal from "./Reveal";
import { config } from "../config";
import { BASE } from "../hooks";

const maps = (e) => e.mapa || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${e.lugar}, ${e.direccion}`)}`;

const Church = () => (<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M32 4v12M26 9h12"/><path d="M32 16 14 30v28h36V30z"/><path d="M26 58V42a6 6 0 0 1 12 0v16"/><path d="M4 58h56M14 30H8v28M50 30h6v28"/></svg>);
const Glass = () => (<svg viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h12l-2 20a4 4 0 0 1-8 0zM34 8h12l-2 20a4 4 0 0 1-8 0z" transform="rotate(-12 32 32)"/><path d="M26 34v18M20 56h12" transform="translate(-4 0)"/><path d="M52 10v6M49 13h6M10 22v6M7 25h6"/></svg>);

function icsDownload() {
  const { ceremonia } = config;
  const ics = [
    "BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//Boda Leonel y Ariday//ES", "BEGIN:VEVENT",
    "UID:boda-leonel-ariday-2027@invitacion", "DTSTAMP:20261117T000000Z",
    "DTSTART;TZID=America/Mexico_City:20270110T130000", "DTEND;TZID=America/Mexico_City:20270110T230000",
    "SUMMARY:Boda de Leonel y Ariday 💙",
    `LOCATION:${ceremonia.lugar}\\, ${ceremonia.direccion}`,
    `DESCRIPTION:Ceremonia ${ceremonia.hora} · Recepción: ${config.recepcion.lugar}. Código de vestimenta: ${config.codigoVestimenta}.`,
    "BEGIN:VALARM", "TRIGGER:-P1D", "ACTION:DISPLAY", "DESCRIPTION:¡Mañana es la boda!", "END:VALARM",
    "END:VEVENT", "END:VCALENDAR",
  ].join("\r\n");
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([ics], { type: "text/calendar" }));
  a.download = "boda-leonel-ariday.ics";
  a.click();
}

function Evento({ e, icon, i }) {
  return (
    <Reveal delay={0.1} className={`ev ${i % 2 ? "right" : "left"}`}>
      <div className="ev-dot"><span /></div>
      <article className="ev-card">
        <div className="ev-icon">{icon}</div>
        <h3>{e.titulo}</h3>
        {e.hora && <p className="ev-time">{e.hora}</p>}
        <p className="ev-place">{e.lugar}</p>
        <p className="ev-addr">{e.direccion}</p>
        <iframe className="map" title={`Mapa: ${e.lugar}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${encodeURIComponent(`${e.lugar}, ${e.direccion}`)}&z=16&output=embed`} />
        <a className="btn ghost" href={maps(e)} target="_blank" rel="noreferrer">Cómo llegar</a>
      </article>
    </Reveal>
  );
}

export default function Itinerary() {
  return (
    <section className="section itin" id="detalles">
      <img className="deco itin-rose" src={`${BASE}img/rosa-abajo.webp`} alt="" />
      <div className="wrap">
        <Reveal className="head"><p className="kicker">Domingo, 10 de enero de 2027</p><h2 className="script h2">Itinerario</h2></Reveal>
        <div className="timeline">
          <motion.div className="tl-line" initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, margin: "-120px" }} transition={{ duration: 1.8, ease: "easeInOut" }} />
          <Evento e={config.ceremonia} icon={<Church />} i={0} />
          <Evento e={config.recepcion} icon={<Glass />} i={1} />
        </div>
        <Reveal className="center"><button className="btn" onClick={icsDownload}>📅 Agregar al calendario</button></Reveal>
      </div>
    </section>
  );
}
