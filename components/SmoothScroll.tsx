"use client";

import { ReactNode, useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      // Honor reduced-motion: native scroll, no smoothing, instant anchors.
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      // lerp gives frame-rate-independent smoothing that feels great on
      // 60Hz and high-refresh displays alike.
      lerp: 0.1,
      smoothWheel: true,
      syncTouch: true, // momentum/inertia on touch devices
      syncTouchLerp: 0.08,
      touchMultiplier: 1.5,
      wheelMultiplier: 1,
    });

    // Keep ScrollTrigger perfectly in sync with Lenis' scroll position.
    lenis.on("scroll", ScrollTrigger.update);

    // Drive Lenis from GSAP's ticker so all motion shares one clock (no jitter).
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Smooth anchor scrolling for in-page nav links.
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"]');
      if (!target) return;
      const id = target.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (el) {
        e.preventDefault();
        lenis.scrollTo(el as HTMLElement, { offset: -90 });
      }
    };
    document.addEventListener("click", onClick);

    // Recalculate triggers once fonts/images settle.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 600);

    return () => {
      gsap.ticker.remove(raf);
      lenis.off("scroll", ScrollTrigger.update);
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
