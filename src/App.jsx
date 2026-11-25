import { useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { config } from "./config";
import { BASE } from "./hooks";
import Envelope from "./components/Envelope";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Marquee from "./components/Marquee";
import Itinerary from "./components/Itinerary";
import DressCode from "./components/DressCode";
import RSVP from "./components/RSVP";
import Petals from "./components/Petals";
import Reveal from "./components/Reveal";

export default function App() {
  const [abierto, setAbierto] = useState(false);
  const [burst, setBurst] = useState(0);
  const { scrollYProgress } = useScroll();
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <>
      <Envelope onOpen={() => setAbierto(true)} />
      <motion.div className="progress" style={{ scaleX: bar }} />
      <Petals burst={burst} />
      <Nav />

      <main>
        <Hero show={abierto} />
        <Story />
        <Marquee />
        <Itinerary />
        <DressCode />
        <RSVP onSuccess={() => setBurst((b) => b + 1)} />
        <footer className="footer">
          <img className="deco foot-l" src={`${BASE}img/hojas-izq.webp`} alt="" />
          <img className="deco foot-r" src={`${BASE}img/hojas-der.webp`} alt="" />
          <Reveal>
            <p className="script big">{config.novios.el} & {config.novios.ella}</p>
            <p className="eyebrow">10 · 01 · 2027</p>
            <p className="muted">Gracias por ser parte de nuestra historia 💙</p>
          </Reveal>
        </footer>
      </main>
    </>
  );
}
