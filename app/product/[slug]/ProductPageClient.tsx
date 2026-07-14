"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowUpRight,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Snowflake,
  Truck,
} from "lucide-react";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/sections/Footer";
import { SERVICES, type Product } from "@/lib/data";
import { useCart, formatGBP } from "@/lib/cart";
import { EASE } from "@/lib/motion";

const TRUST = [
  { icon: ShieldCheck, label: "≥99% HPLC purity" },
  { icon: Snowflake, label: "Cold-chain shipped" },
  { icon: Truck, label: "Tracked worldwide" },
];

export default function ProductPageClient({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const gallery = product.gallery?.length ? product.gallery : [product.img];
  const [activeImg, setActiveImg] = useState(0);

  return (
    <>
      <SiteHeader />

      <main id="main" className="pb-24 pt-28">
        <div className="container-luxen">
          {/* Breadcrumb — accessible list, not a bare link */}
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm font-semibold text-muted">
              <li>
                <Link href="/" className="transition-colors hover:text-brand">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/#services"
                  className="inline-flex items-center gap-2 transition-colors hover:text-brand"
                >
                  <ArrowLeft size={16} /> Catalog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="truncate text-ink">
                {product.title}
              </li>
            </ol>
          </nav>

          {/* Product */}
          <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
            {/* Left — image + thumbnails */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-[28px]">
                <Image
                  key={gallery[activeImg]}
                  src={gallery[activeImg] ?? product.img}
                  alt={`${product.title} — research-grade peptide`}
                  fill
                  priority
                  fetchPriority="high"
                  className="object-contain p-8"
                  sizes="(min-width:1024px) 45vw, (min-width:640px) 90vw, 100vw"
                />
              </div>
              {gallery.length > 1 && (
                <div
                  className="mt-4 flex flex-wrap justify-center gap-3"
                  role="tablist"
                  aria-label="Product images"
                >
                  {gallery.map((src, i) => (
                    <button
                      key={src}
                      type="button"
                      role="tab"
                      onClick={() => setActiveImg(i)}
                      aria-label={`Show image ${i + 1} of ${gallery.length}`}
                      aria-selected={activeImg === i}
                      aria-current={activeImg === i}
                      className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-1 transition-all sm:h-20 sm:w-20 ${
                        activeImg === i
                          ? "ring-2 ring-brand"
                          : "ring-black/10 hover:ring-brand/40"
                      }`}
                    >
                      <Image
                        src={src}
                        alt=""
                        fill
                        className="object-contain p-1.5"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>

            {/* Right — details */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            >
              <h1 className="h-display text-[clamp(2rem,4vw,3rem)]">{product.title}</h1>
              <p className="mt-3 text-3xl font-extrabold text-brand">
                <span className="sr-only">Price: </span>
                {formatGBP(product.price)}
                <span className="ml-2 text-sm font-medium text-muted">GBP</span>
              </p>
              <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
                {product.long}
              </p>

              {/* Specs */}
              <dl className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10">
                {product.specs.map((s) => (
                  <div key={s.label} className="bg-white p-4">
                    <dt className="text-xs font-medium uppercase tracking-wide text-muted">
                      {s.label}
                    </dt>
                    <dd className="mt-1 text-sm font-bold text-ink">{s.value}</dd>
                  </div>
                ))}
              </dl>

              {/* Qty + add to cart */}
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                <div
                  className="flex w-fit items-center gap-1 rounded-full border border-black/10 p-1"
                  role="group"
                  aria-label="Quantity selector"
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
                  >
                    <Minus size={16} />
                  </button>
                  <span
                    className="w-10 text-center text-lg font-bold"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="grid h-11 w-11 place-items-center rounded-full text-ink transition-colors hover:bg-surface"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => add(product.slug, qty)}
                  aria-label={`Add ${qty} × ${product.title} to cart`}
                  className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-brand px-7 py-4 text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-brand-dark hover:-translate-y-0.5 sm:w-auto"
                >
                  <ShoppingBag size={18} /> Add to Cart
                </button>
              </div>

              {/* Trust row */}
              <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 border-t border-black/10 pt-6">
                {TRUST.map((t) => (
                  <li key={t.label} className="flex items-center gap-2 text-sm font-medium text-ink">
                    <t.icon size={18} className="text-brand" aria-hidden="true" /> {t.label}
                  </li>
                ))}
              </ul>

              <p className="mt-5 text-xs leading-relaxed text-muted">
                For laboratory research and development use only — not for human or veterinary
                consumption.
              </p>
            </motion.div>
          </div>

          {/* Related products */}
          <section className="mt-24" aria-labelledby="related-heading">
            <div className="flex items-end justify-between">
              <h2 id="related-heading" className="h-display text-[clamp(1.6rem,3vw,2.4rem)]">
                Related research peptides
              </h2>
              <Link
                href="/#services"
                className="hidden text-sm font-semibold text-brand transition-colors hover:text-brand-dark sm:inline"
              >
                View all
              </Link>
            </div>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.filter((p) => p.slug !== product.slug).map((p) => (
                <Link key={p.slug} href={`/product/${p.slug}`} className="group">
                  <article className="flex h-full flex-col overflow-hidden rounded-[24px] bg-white ring-1 ring-black/5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3)]">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={p.img}
                        alt={`${p.title} — research peptide`}
                        fill
                        loading="lazy"
                        className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                        sizes="(min-width:1024px) 30vw, (min-width:640px) 50vw, 100vw"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-bold text-ink">{p.title}</h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{p.desc}</p>
                      <div className="mt-4 flex items-center justify-between pt-2">
                        <span className="text-lg font-extrabold text-brand">
                          {formatGBP(p.price)}
                        </span>
                        <span
                          className="grid h-9 w-9 place-items-center rounded-full bg-surface text-brand transition-colors group-hover:bg-brand group-hover:text-white"
                          aria-hidden="true"
                        >
                          <ArrowUpRight size={18} strokeWidth={2.4} />
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
