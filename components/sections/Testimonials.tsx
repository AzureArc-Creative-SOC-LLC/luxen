"use client";

import Image from "next/image";
import { Quote, Star } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Eyebrow from "@/components/ui/Eyebrow";
import SplitReveal from "@/components/ui/SplitReveal";
import { TESTIMONIALS } from "@/lib/data";

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <article className="flex w-[88vw] shrink-0 flex-col rounded-[24px] bg-surface p-8 sm:w-[440px]">
      <div className="flex items-start justify-between">
        <span className="relative h-14 w-14 overflow-hidden rounded-full">
          <Image src={t.avatar} alt={t.name} fill className="object-cover" sizes="56px" />
        </span>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-brand text-white">
          <Quote size={20} fill="currentColor" strokeWidth={0} />
        </span>
      </div>
      <div className="mt-5 flex gap-1 text-brand">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={18} fill="currentColor" strokeWidth={0} />
        ))}
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-ink/80">&ldquo;{t.quote}&rdquo;</p>
      <p className="mt-auto pt-8 text-sm font-medium text-muted">{t.name}</p>
    </article>
  );
}

export default function Testimonials() {
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section id="testimonials" className="overflow-hidden bg-white py-24">
      <div className="container-luxen">
        <Reveal className="flex flex-col items-center text-center">
          <Eyebrow center>TESTIMONIALS</Eyebrow>
          <SplitReveal as="h2" className="h-display mt-5 text-[clamp(2.2rem,5vw,3.6rem)]">
            What researchers
            <br /> say about us
          </SplitReveal>
        </Reveal>
      </div>

      <div className="group relative mt-14 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div
          className="flex w-max gap-6 animate-marquee group-hover:[animation-play-state:paused]"
          style={{ ["--marquee-duration" as string]: "40s" }}
        >
          {loop.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
