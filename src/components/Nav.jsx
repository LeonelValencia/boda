import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";

const links = [["#inicio", "Inicio"], ["#nosotros", "Nosotros"], ["#detalles", "Itinerario"], ["#vestimenta", "Vestimenta"], ["#confirmar", "Confirmar"]];

/** Menú flotante: aparece al bajar del inicio. */
export default function Nav() {
  const [ver, setVer] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => setVer(y > window.innerHeight * 0.7));
  return (
    <AnimatePresence>
      {ver && (
        <motion.nav className="nav" initial={{ y: -70, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -70, opacity: 0 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
          {links.map(([h, t]) => <a key={h} href={h}>{t}</a>)}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
