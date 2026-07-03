"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Gentle scroll-tied parallax drift. Attach the returned ref to an element
 * (e.g. a background image wrapper); it translates on the Y axis as the
 * section scrolls through the viewport. Disabled under reduced-motion.
 *
 * @param distance total vertical drift in px (positive = moves up as you scroll)
 */
export function useParallax<T extends HTMLElement = HTMLElement>(distance = 60) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const tween = gsap.fromTo(
      el,
      { yPercent: -(distance / 10) },
      {
        yPercent: distance / 10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [distance]);

  return ref;
}
