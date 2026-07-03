"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import Eyebrow from "@/components/ui/Eyebrow";
import { PROCESS, IMG } from "@/lib/data";
import { EASE, inView, stagger } from "@/lib/motion";

type Step = (typeof PROCESS)[number];

const cardClass =
  "relative flex min-h-[200px] w-full flex-col rounded-[24px] bg-white px-6 py-8 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.35)] ring-1 ring-black/5 sm:px-7";

function CardBody({ p }: { p: Step }) {
  return (
    <>
      <span className="pointer-events-none absolute right-6 top-4 text-7xl font-extrabold text-black/[0.06]">
        {p.num}
      </span>
      <span className="text-sm font-medium text-muted">{p.step}</span>
      <h3 className="mt-1 text-xl font-bold text-ink">{p.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted">{p.desc}</p>
    </>
  );
}

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={inView}
      transition={{ duration: 0.7, ease: EASE }}
    >
      <Eyebrow light center>
        OUR PROCESS
      </Eyebrow>
      <h2 className="h-display mt-4 text-white text-[clamp(2rem,4.6vw,3.4rem)]">
        From Order to Lab
        <br /> Step by Step
      </h2>
    </motion.div>
  );
}

// Desktop card: rises from below into its slot during its slice of scroll.
function ProcessCard({ p, i, progress }: { p: Step; i: number; progress: MotionValue<number> }) {
  const start = i * 0.26;
  const end = start + 0.32;
  // Comes from off-screen bottom → settles into place (no fade, just glide).
  const y = useTransform(progress, [start, end], [460, 0]);
  return (
    <motion.div style={{ y }} className={cardClass}>
      <CardBody p={p} />
    </motion.div>
  );
}

// Mobile / tablet card: simple fade-up on scroll into view (no pinning).
function StaticCard({ p }: { p: Step }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 36 },
        show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
      }}
      className={cardClass}
    >
      <CardBody p={p} />
    </motion.div>
  );
}

function Backdrop() {
  return (
    <>
      <div className="absolute inset-0 opacity-40 mix-blend-screen">
        <Image src={IMG.process} alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="absolute inset-0 blueprint opacity-50" />
      <div className="absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-[120px]" />
      <div className="checker absolute inset-x-0 bottom-0" />
    </>
  );
}

// Desktop: full-height pinned panel; cards reveal one-by-one then release.
function DesktopProcess() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 60, damping: 22, mass: 0.5 });

  return (
    // Tall track = scroll room to reveal all three cards before release.
    <section ref={ref} className="relative h-[320vh] bg-navy">
      <div className="sticky top-0 h-screen overflow-hidden bg-navy">
        <Backdrop />
        <div className="container-luxen relative flex h-full flex-col items-center justify-center text-center">
          <Header />
          <div className="mt-14 grid w-full max-w-5xl gap-6 lg:grid-cols-3">
            {PROCESS.map((p, i) => (
              <ProcessCard key={p.num} p={p} i={i} progress={smoothProgress} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Mobile / tablet: plain stacked section that can never clip.
function MobileProcess() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <Backdrop />
      <div className="container-luxen relative flex flex-col items-center py-20 text-center sm:py-24">
        <Header />
        <motion.div
          variants={stagger(0.14)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid w-full max-w-xl gap-6 sm:grid-cols-2"
        >
          {PROCESS.map((p) => (
            <StaticCard key={p.num} p={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function Process() {
  // Default to mobile for SSR so the first client render matches the server.
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return isDesktop ? <DesktopProcess /> : <MobileProcess />;
}
