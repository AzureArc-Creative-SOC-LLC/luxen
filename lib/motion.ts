import type { Variants, Transition } from "framer-motion";

/* Soft editorial easing — matches the reference's calm reveal feel */
export const EASE = [0.22, 1, 0.36, 1] as const;

export const spring: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.6,
};

/* Fade + rise reveal */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

/* Blur reveal */
export const blurUp: Variants = {
  hidden: { opacity: 0, y: 28, filter: "blur(12px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE },
  },
};

/* Directional image reveal */
export const revealLeft: Variants = {
  hidden: { opacity: 0, x: -48, filter: "blur(8px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};
export const revealRight: Variants = {
  hidden: { opacity: 0, x: 48, filter: "blur(8px)" },
  show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.9, ease: EASE } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: EASE } },
};

/* Stagger parent */
export const stagger = (gap = 0.12, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: gap, delayChildren: delay },
  },
});

/* Common viewport config for whileInView */
export const inView = { once: true, amount: 0.25 } as const;
