"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitReveal from "@/components/ui/SplitReveal";
import { Button } from "@/components/ui/Button";
import { TEAM } from "@/lib/data";
import { inView, revealRight, stagger } from "@/lib/motion";

export default function Team() {
  return (
    <section id="team" className="relative bg-white py-24">
      <div className="container-luxen relative grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        {/* Left intro — pinned while the images scroll past */}
        <div className="lg:sticky lg:top-28 lg:self-start lg:pt-6">
          <Reveal>
            <Eyebrow>OUR SCIENTISTS</Eyebrow>
          </Reveal>
          <SplitReveal as="h2" className="h-display mt-5 text-[clamp(2.2rem,4.4vw,3.4rem)]">
            Meet the people
            <br /> behind the science
          </SplitReveal>
          <Reveal>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted">
              Our chemists and quality specialists oversee synthesis, analytical testing, and
              compliance — so every compound that leaves the lab meets research-grade standards.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Button href="#team" variant="primary" className="mt-7">
              MORE OF THE TEAM
            </Button>
          </Reveal>
        </div>

        {/* Stacked images — scroll past the pinned intro, then release */}
        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid grid-cols-2 gap-5 sm:gap-6"
        >
          {TEAM.map((d) => (
            <motion.article key={d.name} variants={revealRight} className="group">
              <div className="relative aspect-square overflow-hidden rounded-[20px] bg-accent-light/40">
                <Image
                  src={d.img}
                  alt={d.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width:1024px) 24vw, 45vw"
                />
                {/* diagonal brand wedge */}
                <div
                  className="absolute inset-0 bg-brand/85 opacity-0 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-100"
                  style={{ clipPath: "polygon(100% 45%, 100% 100%, 38% 100%)" }}
                />
              </div>
              <p className="mt-4 text-[13px] italic text-muted">{d.role}</p>
              <h3 className="mt-1 text-lg font-bold text-ink">{d.name}</h3>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
