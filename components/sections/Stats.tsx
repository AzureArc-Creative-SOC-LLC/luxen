"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SplitReveal from "@/components/ui/SplitReveal";
import { STATS, VALUE_CHIPS, IMG } from "@/lib/data";
import { EASE, inView } from "@/lib/motion";

function Counter({ to, suffix = "%" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const seen = useInView(ref, { once: true, amount: 0.5 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!seen) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * to));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [seen, to]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="bg-surface py-24">
      <div className="container-luxen">
        <Reveal className="flex flex-col items-center text-center">
          <div className="flex items-center gap-1 rounded bg-[#00b67a] px-1.5 py-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={14} className="text-white" fill="currentColor" strokeWidth={0} />
            ))}
          </div>
          <span className="mt-2 text-xs font-semibold text-muted">4.5/5 (1,259)</span>
          <SplitReveal as="h2" className="h-display mt-5 max-w-3xl text-[clamp(2.2rem,4.6vw,3.4rem)]">
            LUXEN delivers research-grade peptides for confident, reproducible science.
          </SplitReveal>
          <p className="mt-4 text-[15px] text-muted">
            Independently verified compounds for laboratory research only.
          </p>
        </Reveal>

        <div className="mt-14 grid auto-rows-[300px] grid-cols-1 gap-5 md:grid-cols-5">
          {/* Top-left image */}
          <BentoImage
            className="md:col-span-3"
            img={IMG.statLab}
            label={STATS.consultations.label}
            pct={STATS.consultations.pct}
            desc={STATS.consultations.desc}
            align="bottom"
          />
          {/* Top-right dark */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden rounded-[24px] bg-navy p-8 text-white md:col-span-2"
          >
            <div className="absolute -right-6 top-10 h-40 w-40 rounded-full border-[18px] border-white/5" />
            <div className="text-6xl font-extrabold">
              <Counter to={STATS.treatments.pct} />
            </div>
            <div className="mt-1 text-lg font-semibold">{STATS.treatments.label}</div>
            <p className="mt-6 text-sm leading-relaxed text-white/70">{STATS.treatments.desc}</p>
          </motion.div>

          {/* Bottom-left blue chips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative overflow-hidden rounded-[24px] bg-brand p-5 md:col-span-2"
          >
            <ShuffleChips />
          </motion.div>

          {/* Bottom-right image */}
          <BentoImage
            className="md:col-span-3"
            img={IMG.statDiag}
            label={STATS.diagnostics.label}
            pct={STATS.diagnostics.pct}
            desc={STATS.diagnostics.desc}
            align="top"
          />
        </div>
      </div>
    </section>
  );
}

const ROWS = VALUE_CHIPS.length;

function ShuffleChips() {
  const containerRef = useRef<HTMLDivElement>(null);
  const chipRefs = useRef<(HTMLSpanElement | null)[]>([]);
  // Deterministic first render (no SSR hydration mismatch); measured scatter
  // takes over after mount.
  const [slots, setSlots] = useState(() =>
    VALUE_CHIPS.map((_, i) => ({ top: (i / ROWS) * 100, left: (i % 2) * 40 + 4 })),
  );

  useEffect(() => {
    const reposition = () => {
      const cont = containerRef.current;
      if (!cont) return;
      const W = cont.clientWidth;
      const H = cont.clientHeight;
      const bandH = H / ROWS;

      // Unique row per chip → no vertical overlap; shuffle the row assignment.
      const rows = VALUE_CHIPS.map((_, i) => i);
      for (let i = rows.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [rows[i], rows[j]] = [rows[j], rows[i]];
      }

      setSlots(
        VALUE_CHIPS.map((_, i) => {
          const el = chipRefs.current[i];
          const cw = el?.offsetWidth ?? 90;
          const ch = el?.offsetHeight ?? 24;
          const top = rows[i] * bandH + Math.random() * Math.max(0, bandH - ch);
          const left = Math.random() * Math.max(0, W - cw);
          return { top: (top / H) * 100, left: (left / W) * 100 };
        }),
      );
    };

    const first = setTimeout(reposition, 400);
    const id = setInterval(reposition, 2200);
    window.addEventListener("resize", reposition);
    return () => {
      clearTimeout(first);
      clearInterval(id);
      window.removeEventListener("resize", reposition);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-full w-full">
      {VALUE_CHIPS.map((c, i) => (
        <motion.span
          key={c}
          ref={(el) => {
            chipRefs.current[i] = el;
          }}
          animate={{ top: `${slots[i].top}%`, left: `${slots[i].left}%` }}
          transition={{ type: "spring", stiffness: 130, damping: 18 }}
          className="absolute whitespace-nowrap rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur"
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

function BentoImage({
  className,
  img,
  label,
  pct,
  desc,
  align,
}: {
  className?: string;
  img: string;
  label: string;
  pct: number;
  desc: string;
  align: "top" | "bottom";
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.7, ease: EASE }}
      className={`relative overflow-hidden rounded-[24px] ${className ?? ""}`}
    >
      <Image src={img} alt={label} fill className="object-cover" sizes="(min-width:768px) 55vw, 100vw" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-navy/10" />
      <div
        className={`absolute inset-x-0 p-8 text-white ${
          align === "bottom" ? "bottom-0" : "top-0 text-right"
        }`}
      >
        <div className="text-sm font-medium text-white/85">{label}</div>
        <div className="text-6xl font-extrabold leading-none">
          <Counter to={pct} />
        </div>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">{desc}</p>
      </div>
    </motion.div>
  );
}
