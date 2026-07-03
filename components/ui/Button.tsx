"use client";

import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ComponentProps, useRef } from "react";

type Variant = "primary" | "dark" | "ghostPill" | "white";

const base =
  "inline-flex items-center justify-center gap-2 font-bold text-[14px] tracking-wide rounded-lg transition-colors duration-300 will-change-transform";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-white px-5 py-3 uppercase hover:bg-brand-dark shadow-[0_8px_24px_-10px_rgba(0,131,195,0.7)] hover:shadow-[0_14px_34px_-12px_rgba(0,131,195,0.85)]",
  dark: "bg-ink text-white px-5 py-3 uppercase hover:bg-[#1a1a1a]",
  white:
    "bg-white text-ink px-5 py-3 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.3)] hover:shadow-[0_14px_32px_-14px_rgba(0,0,0,0.4)]",
  ghostPill:
    "border border-black/15 rounded-full pl-5 pr-2 py-2 text-ink hover:border-brand/40 group",
};

export function Button({
  children,
  variant = "primary",
  className,
  withArrow = false,
  ...props
}: {
  variant?: Variant;
  withArrow?: boolean;
} & Omit<ComponentProps<"a">, "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd" | "ref">) {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  // Subtle magnetic pull toward the cursor — fine pointers only.
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set(((e.clientX - (r.left + r.width / 2)) / r.width) * 14);
    y.set(((e.clientY - (r.top + r.height / 2)) / r.height) * 14);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
      {withArrow &&
        (variant === "ghostPill" ? (
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover:rotate-45">
            <ArrowUpRight size={18} strokeWidth={2.4} />
          </span>
        ) : (
          <ArrowUpRight size={16} strokeWidth={2.6} />
        ))}
    </motion.a>
  );
}
