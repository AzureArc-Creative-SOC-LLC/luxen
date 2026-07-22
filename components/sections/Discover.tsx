"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { BRAND_LOGOS, IMG } from "@/lib/data";
import { blurUp, EASE } from "@/lib/motion";

function LogoRow() {
  const items = [...BRAND_LOGOS, ...BRAND_LOGOS];
  return (
    <div className="relative mt-10 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_8%,#000_92%,transparent)]">
      <div className="flex w-max animate-marquee gap-4" style={{ ["--marquee-duration" as string]: "32s" }}>
        {items.map((name, i) => (
          <div
            key={i}
            className="grid h-[84px] w-[180px] shrink-0 place-items-center rounded-2xl bg-surface text-lg font-bold tracking-tight text-ink/70"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Discover() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-24">
      <div className="container-luxen relative">
        <Reveal>
          <p className="text-center text-2xl font-semibold text-ink/80">
            Trusted by 150+ research labs worldwide.
          </p>
        </Reveal>
        <LogoRow />

        <div className="mt-20 grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left */}
          <div className="lg:pt-20">
            <Reveal>
              <Eyebrow>ABOUT LUXEN</Eyebrow>
            </Reveal>
            <Reveal variants={blurUp}>
              <h2 className="h-display mt-5 text-[clamp(2.4rem,4.4vw,3.4rem)]">
                Discover <span className="text-brand">LUXEN</span>
              </h2>
            </Reveal>
            <Reveal>
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted">
                At LUXEN, we develop and supply premium research reference peptides for laboratory
                and in-vitro analytical work. Every compound is synthesised to research-grade
                standards and independently verified for identity, purity, and content — so
                scientists can characterize their reagents with confidence. For research use only
                — not intended to diagnose, treat, cure, or prevent any disease. Not for human or
                veterinary use.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <Button href="#services" variant="dark" className="mt-7">
                BROWSE CATALOG
              </Button>
            </Reveal>

            <div className="my-9 h-px w-full bg-black/10" />

            <div className="grid gap-8 sm:grid-cols-2">
              {[
                {
                  t: "Independently Tested",
                  d: "Every batch is third-party lab verified for purity, content, and identity.",
                },
                {
                  t: "Research-Grade Purity",
                  d: "≥99% HPLC-verified peptides for reproducible laboratory measurements.",
                },
              ].map((f, i) => (
                <Reveal key={f.t} delay={i * 0.1}>
                  <h3 className="text-lg font-bold text-ink">{f.t}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.15}>
              <div className="mt-9 flex items-center justify-between gap-4 rounded-2xl bg-brand p-3 pl-4 text-white">
                <div className="flex items-center gap-3">
                  <span className="relative h-12 w-12 overflow-hidden rounded-xl ring-2 ring-white/30">
                    <Image src={IMG.alex} alt="Dr. Elena Voss" fill className="object-cover" sizes="48px" />
                  </span>
                  <div className="leading-tight">
                    <div className="font-bold">Dr. Elena Voss</div>
                    <div className="text-sm text-white/80">Head of Peptide Synthesis</div>
                  </div>
                </div>
                <a
                  href="#appointment"
                  className="rounded-xl bg-white px-5 py-3 text-sm font-bold text-brand transition-transform hover:-translate-y-0.5"
                >
                  Request A Quote
                </a>
              </div>
            </Reveal>
          </div>

          {/* Right image with curtain reveal */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            className="relative"
          >
            <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-[28px]">
              <Image
                src={IMG.discover}
                alt="LUXEN laboratory with analytical equipment"
                fill
                className="object-cover"
                sizes="(min-width:1024px) 45vw, 100vw"
              />
              {/* Two curtain panels that slide apart to reveal the image */}
              <motion.div
                variants={{ hidden: { x: "0%" }, show: { x: "-101%" } }}
                transition={{ duration: 0.95, ease: EASE }}
                className="absolute inset-y-0 left-0 z-10 w-1/2 bg-white"
              />
              <motion.div
                variants={{ hidden: { x: "0%" }, show: { x: "101%" } }}
                transition={{ duration: 0.95, ease: EASE }}
                className="absolute inset-y-0 right-0 z-10 w-1/2 bg-white"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
