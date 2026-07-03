"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useAnimationFrame, useMotionValue } from "framer-motion";
import {
  ArrowUpRight,
  Atom,
  Dna,
  Droplet,
  FlaskConical,
  Microscope,
  TestTube,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitReveal from "@/components/ui/SplitReveal";
import { SERVICES } from "@/lib/data";

const ICONS: Record<string, LucideIcon> = {
  flask: FlaskConical,
  atom: Atom,
  dna: Dna,
  microscope: Microscope,
  droplet: Droplet,
  "test-tube": TestTube,
};

export default function Solutions() {
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const halfWidth = useRef(0);
  const [paused, setPaused] = useState(false);

  // Cards are rendered twice so the loop is seamless.
  const items = [...SERVICES, ...SERVICES];

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        // Total scroll width covers both copies; one copy is half of that (plus the trailing gap).
        halfWidth.current = (trackRef.current.scrollWidth + 24) / 2;
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useAnimationFrame((_, delta) => {
    if (paused || !halfWidth.current) return;
    const speed = 60; // px per second
    let next = x.get() - (speed * delta) / 1000;
    // Wrap around once the first copy has fully scrolled past.
    if (next <= -halfWidth.current) next += halfWidth.current;
    x.set(next);
  });

  return (
    <section id="services" className="overflow-hidden bg-surface py-24">
      <div className="container-luxen">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow center>RESEARCH CATALOG</Eyebrow>
          <SplitReveal as="h2" className="h-display mt-5 text-[clamp(2.4rem,5vw,3.6rem)]">
            Engineered for
            <br />
            Research Precision.
          </SplitReveal>
        </Reveal>
      </div>

      {/* Auto-scrolling carousel */}
      <div
        className="mt-14 cursor-grab overflow-hidden active:cursor-grabbing"
        onPointerEnter={() => setPaused(true)}
        onPointerLeave={() => setPaused(false)}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          drag="x"
          dragConstraints={trackRef}
          dragElastic={0.05}
          onDragStart={() => setPaused(true)}
          onDragEnd={() => setPaused(false)}
          className="flex w-max gap-6 px-[max(24px,calc((100vw-1320px)/2))]"
        >
          {items.map((s, i) => {
            const Icon = ICONS[s.icon] ?? FlaskConical;
            return (
              <motion.article
                key={`${s.title}-${i}`}
                className="group grid w-[88vw] shrink-0 grid-cols-1 gap-6 rounded-[28px] bg-white p-5 sm:w-[640px] sm:grid-cols-[260px_1fr] sm:p-6"
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl">
                  <Image
                    src={s.img}
                    alt={s.title}
                    fill
                    draggable={false}
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                    sizes="260px"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="grid h-12 w-12 place-items-center rounded-xl text-brand">
                    <Icon size={34} strokeWidth={1.6} />
                  </span>
                  <h3 className="mt-3 text-2xl font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{s.desc}</p>
                  <Link
                    href={`/product/${s.slug}`}
                    draggable={false}
                    className="group/btn mt-auto inline-flex w-fit items-center gap-2 rounded-full border border-black/10 py-2 pl-5 pr-2 text-sm font-semibold text-ink transition-colors hover:border-brand/40"
                  >
                    Explore More
                    <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white transition-transform duration-300 group-hover/btn:rotate-45">
                      <ArrowUpRight size={18} strokeWidth={2.4} />
                    </span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
