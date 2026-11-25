import { useEffect, useState } from "react";

export const BASE = import.meta.env.BASE_URL;

/** Cuenta regresiva hasta `target` (ISO). */
export function useCountdown(target) {
  const calc = () => {
    const diff = new Date(target).getTime() - Date.now();
    if (diff <= 0) return { done: true, d: 0, h: 0, m: 0, s: 0 };
    return {
      done: false,
      d: Math.floor(diff / 86400000),
      h: Math.floor(diff / 3600000) % 24,
      m: Math.floor(diff / 60000) % 60,
      s: Math.floor(diff / 1000) % 60,
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const i = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(i);
  }, [target]);
  return t;
}

export const pad = (n) => String(n).padStart(2, "0");
