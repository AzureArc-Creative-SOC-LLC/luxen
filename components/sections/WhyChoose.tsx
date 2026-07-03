"use client";

import { motion } from "framer-motion";
import { FlaskConical, ShieldCheck, Snowflake, Truck, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitReveal from "@/components/ui/SplitReveal";
import { WHY } from "@/lib/data";
import { blurUp, inView, stagger } from "@/lib/motion";

const ICONS: Record<string, LucideIcon> = {
  flask: FlaskConical,
  snowflake: Snowflake,
  truck: Truck,
  shield: ShieldCheck,
};

export default function WhyChoose() {
  return (
    <section className="bg-white py-24">
      <div className="container-luxen">
        <div className="grid items-end gap-8 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <Reveal>
              <Eyebrow>WHY CHOOSE US</Eyebrow>
            </Reveal>
            <SplitReveal as="h2" className="h-display mt-5 text-[clamp(2.2rem,4.6vw,3.5rem)]">
              Your trusted partner in
              <br className="hidden sm:block" /> research-grade peptides
            </SplitReveal>
          </div>
          <Reveal>
            <p className="text-[15px] leading-relaxed text-muted lg:pb-3">
              Independently tested, cold-chain handled, and shipped worldwide — built for
              laboratories that need reproducible, research-grade compounds.
            </p>
          </Reveal>
        </div>

        <motion.div
          variants={stagger(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-12 grid grid-cols-1 overflow-hidden rounded-[24px] border border-black/10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {WHY.map((f) => {
            const Icon = ICONS[f.icon] ?? FlaskConical;
            return (
              <motion.div
                key={f.title}
                variants={blurUp}
                className="group border-black/10 p-8 transition-colors hover:bg-surface/60 sm:[&:nth-child(odd)]:border-r lg:border-r lg:last:border-r-0 lg:[&:nth-child(odd)]:border-r [&:not(:last-child)]:border-b sm:[&:nth-child(-n+2)]:border-b sm:[&:nth-child(n+3)]:border-b-0 lg:border-b-0"
              >
                <span className="grid h-16 w-16 place-items-center rounded-2xl text-brand transition-transform duration-500 group-hover:-translate-y-1">
                  <Icon size={40} strokeWidth={1.5} />
                </span>
                <h3 className="mt-12 text-xl font-bold text-ink">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{f.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
