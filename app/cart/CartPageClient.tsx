"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/sections/Footer";
import { useCart, formatGBP } from "@/lib/cart";

export default function CartPageClient() {
  const { lines, count, subtotal, setQty, remove, clear } = useCart();
  const router = useRouter();
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <>
      <SiteHeader />

      <main id="main" className="relative z-10 min-h-[70vh] pt-28 lg:pt-32">
        <div className="container-luxen pb-24">
          {/* Page header */}
          <div className="flex items-end justify-between border-b border-black/10 pb-8">
            <div>
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-brand">Your Cart</p>
              <h1 className="h-display mt-2 text-4xl tracking-[-0.02em] text-ink lg:text-5xl">
                {lines.length ? `${count} ${count === 1 ? "item" : "items"}` : "Cart is empty"}
              </h1>
            </div>
            <Link
              href="/#services"
              className="hidden text-sm text-brand transition-colors hover:text-brand-dark md:inline-block"
            >
              ← Back to Catalog
            </Link>
          </div>

          {lines.length === 0 ? (
            <EmptyCart />
          ) : (
            <div className="mt-12 grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
              {/* Items */}
              <div>
                <ul className="flex flex-col gap-4">
                  {lines.map((l) => (
                    <li
                      key={l.product.slug}
                      className="flex flex-col gap-4 rounded-[var(--radius-xl2)] border border-black/10 bg-white p-5 sm:flex-row sm:items-center"
                    >
                      <Link
                        href={`/product/${l.product.slug}`}
                        className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-surface"
                      >
                        <Image
                          src={l.product.img}
                          alt={l.product.title}
                          fill
                          loading="lazy"
                          className="object-contain p-3"
                          sizes="112px"
                        />
                      </Link>

                      <div className="flex flex-1 flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                        <div>
                          <p className="text-[0.6rem] uppercase tracking-[0.22em] text-muted">
                            Research peptide
                          </p>
                          <Link
                            href={`/product/${l.product.slug}`}
                            className="mt-1 block text-lg font-bold text-ink hover:text-brand"
                          >
                            {l.product.title}
                          </Link>
                          <p className="mt-1 text-xs text-muted">{formatGBP(l.product.price)} each</p>
                        </div>

                        <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                          <div
                            className="flex items-center rounded-full border border-black/10"
                            role="group"
                            aria-label={`Quantity for ${l.product.title}`}
                          >
                            <button
                              type="button"
                              onClick={() => setQty(l.product.slug, l.qty - 1)}
                              className="grid h-10 w-10 place-items-center text-ink hover:text-brand"
                              aria-label="Decrease quantity"
                            >
                              −
                            </button>
                            <span className="w-8 text-center text-sm font-semibold" aria-live="polite">
                              {l.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => setQty(l.product.slug, l.qty + 1)}
                              className="grid h-10 w-10 place-items-center text-ink hover:text-brand"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <p className="w-20 text-right text-base font-bold text-ink">
                            {formatGBP(l.lineTotal)}
                          </p>
                          <button
                            type="button"
                            onClick={() => remove(l.product.slug)}
                            className="text-xs uppercase tracking-[0.2em] text-muted hover:text-brand"
                            aria-label={`Remove ${l.product.title} from cart`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={clear}
                    className="text-xs uppercase tracking-[0.2em] text-muted hover:text-brand"
                  >
                    Clear cart
                  </button>
                </div>
              </div>

              {/* Summary */}
              <aside
                className="h-fit rounded-[var(--radius-xl2)] border border-black/10 bg-surface p-7 lg:sticky lg:top-28"
                aria-labelledby="order-summary-heading"
              >
                <h2 id="order-summary-heading" className="text-xl font-bold text-ink">
                  Order summary
                </h2>

                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-muted">Subtotal</dt>
                    <dd className="text-ink">{formatGBP(subtotal)}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-muted">Tracked UK shipping</dt>
                    <dd className="text-ink">Free</dd>
                  </div>
                  <div className="my-4 h-px bg-black/10" role="separator" />
                  <div className="flex justify-between text-lg font-bold">
                    <dt className="text-ink">Total</dt>
                    <dd className="text-ink">{formatGBP(total)}</dd>
                  </div>
                </dl>

                <button
                  type="button"
                  onClick={() => router.push("/checkout")}
                  className="mt-7 w-full rounded-full bg-brand py-3.5 text-sm font-medium text-white transition-all hover:bg-brand-dark hover:shadow-[0_20px_40px_-20px_rgba(0,131,195,0.6)]"
                >
                  Checkout
                </button>

                <Link
                  href="/#services"
                  className="mt-4 block text-center text-sm text-brand hover:text-brand-dark"
                >
                  Continue shopping
                </Link>

                <p className="mt-7 border-t border-black/10 pt-5 text-center text-[0.65rem] uppercase tracking-[0.22em] text-muted">
                  For laboratory R&amp;D use only · Not for human or veterinary consumption
                </p>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

function EmptyCart() {
  return (
    <div className="mt-16 flex flex-col items-center justify-center rounded-[var(--radius-xl2)] border border-black/10 bg-surface py-20 text-center">
      <div className="grid h-16 w-16 place-items-center rounded-full bg-white text-brand">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          aria-hidden="true"
        >
          <path d="M3 3h2l2.4 12.2a2 2 0 0 0 2 1.6h8.2a2 2 0 0 0 2-1.5L21 8H6" />
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
        </svg>
      </div>
      <p className="mt-5 text-xl font-bold text-ink">No research products yet</p>
      <p className="mt-2 max-w-sm text-sm text-muted">
        Explore our catalogue and add a compound to get started.
      </p>
      <Link
        href="/#services"
        className="mt-8 rounded-full bg-brand px-6 py-3 text-sm text-white transition-colors hover:bg-brand-dark"
      >
        Continue shopping
      </Link>
    </div>
  );
}
