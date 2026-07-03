"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";
import SplitType from "split-type";
import { gsap } from "gsap";

type Props = {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children: ReactNode;
  /** delay between words */
  stagger?: number;
  delay?: number;
  /** visibility ratio that triggers the reveal */
  amount?: number;
};

/**
 * Phrase-based heading reveal: the text is split into words that rise from
 * below and sharpen from blur into focus, assembled with a refined stagger as
 * the element scrolls into view.
 *
 * The reveal is driven by an IntersectionObserver (not ScrollTrigger) so it can
 * never get "stuck hidden" if smooth-scroll syncing hiccups. Falls back to
 * plain text under reduced-motion or if splitting yields nothing.
 */
export default function SplitReveal({
  as = "h2",
  className,
  children,
  stagger = 0.05,
  delay = 0,
  amount = 0.2,
}: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = new SplitType(el, { types: "words" });
    const words = split.words ?? [];
    if (!words.length) return;

    gsap.set(words, { yPercent: 55, opacity: 0, filter: "blur(8px)" });

    let revealed = false;
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      gsap.to(words, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power3.out",
        duration: 0.9,
        delay,
        stagger,
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          reveal();
          io.disconnect();
        }
      },
      { threshold: amount },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      gsap.killTweensOf(words);
      split.revert();
    };
  }, [stagger, delay, amount]);

  // eslint-disable-next-line react-hooks/refs -- ref is only attached, not read during render
  return createElement(as, { ref, className }, children);
}
