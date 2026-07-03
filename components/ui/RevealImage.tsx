"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { EASE } from "@/lib/motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number;
  /** mask wipe direction */
  from?: "bottom" | "top" | "left" | "right";
};

// All values use % units so Framer can interpolate the clip-path reliably.
const CLIP: Record<NonNullable<Props["from"]>, string> = {
  bottom: "inset(0% 0% 100% 0%)",
  top: "inset(100% 0% 0% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
};
const OPEN = "inset(0% 0% 0% 0%)";

/**
 * Premium media reveal: a directional mask wipes open while the inner media
 * eases from a 1.06 scale down to 1.0 — adding depth and refinement. Wrap any
 * image/video container; pass sizing via className.
 */
export default function RevealImage({ children, className, delay = 0, amount = 0.3, from = "bottom" }: Props) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      className={cn("overflow-hidden", className)}
      variants={{
        hidden: { clipPath: CLIP[from] },
        show: { clipPath: OPEN, transition: { duration: 1.05, ease: EASE, delay } },
      }}
    >
      <motion.div
        className="h-full w-full"
        variants={{
          hidden: { scale: 1.06 },
          show: { scale: 1, transition: { duration: 1.3, ease: EASE, delay } },
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
