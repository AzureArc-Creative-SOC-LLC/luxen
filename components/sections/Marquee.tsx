"use client";

const TEXT = "INDEPENDENTLY LAB TESTED · RESEARCH GRADE PURITY";

export default function Marquee() {
  const items = Array.from({ length: 8 });
  return (
    <section className="overflow-hidden border-y border-black/10 bg-white py-6">
      <div
        className="flex w-max animate-marquee items-center gap-10"
        style={{ ["--marquee-duration" as string]: "28s" }}
      >
        {items.map((_, i) => (
          <span
            key={i}
            className="whitespace-nowrap text-[clamp(2.5rem,6vw,5rem)] font-extrabold leading-none text-brand"
          >
            {TEXT}
            <span className="mx-8 text-accent-light">✦</span>
          </span>
        ))}
      </div>
    </section>
  );
}
