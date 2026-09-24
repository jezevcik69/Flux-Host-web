import { useEffect } from "react";
import Lenis from "lenis";

let lenis: Lenis | null = null;

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: id === "top" ? 0 : -88 });
  else el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1, anchors: { offset: -88 }, autoRaf: true });
    return () => {
      lenis?.destroy();
      lenis = null;
    };
  }, []);
  return null;
}
