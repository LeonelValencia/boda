import { useEffect, useRef } from "react";

/** Pétalos que caen suavemente (canvas, ligero). `burst` lanza una ráfaga extra. */
export default function Petals({ burst = 0 }) {
  const ref = useRef(null);
  const api = useRef({});

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const c = ref.current, ctx = c.getContext("2d");
    let w, h, raf, petals = [];
    const colors = ["#ffffff", "#dbe6f7", "#b8cdee", "#8fb0e0", "#6f8fc6"];
    const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; };
    const make = (top = false) => ({
      x: Math.random() * w, y: top ? -20 : Math.random() * h,
      s: 6 + Math.random() * 9, vy: 0.4 + Math.random() * 0.9, vx: -0.3 + Math.random() * 0.6,
      r: Math.random() * 6.28, vr: (Math.random() - 0.5) * 0.03, sw: Math.random() * 6.28,
      col: colors[(Math.random() * colors.length) | 0], a: 0.45 + Math.random() * 0.45,
    });
    resize();
    const N = Math.min(28, Math.round(w / 45));
    petals = Array.from({ length: N }, () => make());
    api.current.burst = () => { for (let i = 0; i < 70; i++) { const p = make(true); p.y = h * 0.55; p.vx = (Math.random() - 0.5) * 7; p.vy = -4 - Math.random() * 6; p.burst = true; petals.push(p); } };
    const draw = (p) => {
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r); ctx.globalAlpha = p.a; ctx.fillStyle = p.col;
      ctx.beginPath(); ctx.moveTo(0, -p.s); ctx.bezierCurveTo(p.s * 0.9, -p.s * 0.5, p.s * 0.7, p.s * 0.6, 0, p.s);
      ctx.bezierCurveTo(-p.s * 0.7, p.s * 0.6, -p.s * 0.9, -p.s * 0.5, 0, -p.s); ctx.fill(); ctx.restore();
    };
    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      petals = petals.filter((p) => !(p.burst && p.y > h + 30));
      for (const p of petals) {
        p.sw += 0.02; p.x += p.vx + Math.sin(p.sw) * 0.5; p.y += p.vy; p.r += p.vr;
        if (p.burst) { p.vy += 0.12; p.vx *= 0.985; } 
        if (!p.burst && p.y > h + 20) Object.assign(p, make(true));
        draw(p);
      }
      raf = requestAnimationFrame(tick);
    };
    tick(); addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", resize); };
  }, []);

  useEffect(() => { if (burst) api.current.burst?.(); }, [burst]);
  return <canvas ref={ref} className="petals" aria-hidden="true" />;
}
