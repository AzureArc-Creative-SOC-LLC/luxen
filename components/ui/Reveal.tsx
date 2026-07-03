"use client";

import { motion, type Variants } from "framer-motion";
import { ReactNode } from "react";
import { fadeUp, inView } from "@/lib/motion";

export default function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  as = "div",
}: {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  as?: "div" | "span" | "li";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={delay ? { delay } : undefined}
    >
      {children}
    </MotionTag>
  );
}
