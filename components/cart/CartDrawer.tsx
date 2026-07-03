"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { useCart, formatGBP } from "@/lib/cart";

export default function CartDrawer() {
  const { isOpen, closeCart, lines, count, subtotal, setQty, remove } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[80]"
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-navy/50 backdrop-blur-sm" onClick={closeCart} />

          {/* Panel */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/10 px-6 py-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-ink">
                <ShoppingBag size={20} className="text-brand" />
                Your Cart
                {count > 0 && (
                  <span className="rounded-full bg-brand px-2 py-0.5 text-xs text-white">{count}</span>
                )}
              </h2>
              <button
                onClick={closeCart}
                aria-label="Close cart"
                className="grid h-9 w-9 place-items-center rounded-full bg-surface text-ink transition-colors hover:bg-black/10"
              >
                <X size={18} />
              </button>
            </div>

            {lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-surface text-muted">
                  <ShoppingBag size={28} />
                </span>
                <p className="text-sm text-muted">Your cart is empty.</p>
                <Link
                  href="/#services"
                  onClick={closeCart}
                  className="rounded-xl bg-brand px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-brand-dark"
                >
                  Browse Catalog
                </Link>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
                  {lines.map((l) => (
                    <div key={l.product.slug} className="flex gap-4">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl">
                        <Image
                          src={l.product.img}
                          alt={l.product.title}
                          fill
                          className="object-contain p-1.5"
                          sizes="80px"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm font-bold leading-snug text-ink">
                            {l.product.title}
                          </h3>
                          <button
                            onClick={() => remove(l.product.slug)}
                            aria-label={`Remove ${l.product.title}`}
                            className="text-muted transition-colors hover:text-brand"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <span className="text-xs text-muted">{formatGBP(l.product.price)} each</span>
                        <div className="mt-auto flex items-center justify-between pt-2">
                          <div className="flex items-center gap-1 rounded-full border border-black/10">
                            <button
                              onClick={() => setQty(l.product.slug, l.qty - 1)}
                              aria-label="Decrease quantity"
                              className="grid h-7 w-7 place-items-center rounded-full text-ink hover:bg-surface"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm font-semibold">{l.qty}</span>
                            <button
                              onClick={() => setQty(l.product.slug, l.qty + 1)}
                              aria-label="Increase quantity"
                              className="grid h-7 w-7 place-items-center rounded-full text-ink hover:bg-surface"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-bold text-ink">{formatGBP(l.lineTotal)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="border-t border-black/10 px-6 py-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-muted">Subtotal</span>
                    <span className="text-xl font-extrabold text-ink">{formatGBP(subtotal)}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="block w-full rounded-xl bg-brand py-4 text-center text-sm font-bold uppercase tracking-wide text-white transition-all hover:bg-brand-dark hover:-translate-y-0.5"
                  >
                    Checkout
                  </Link>
                  <button
                    onClick={closeCart}
                    className="mt-2 w-full rounded-xl py-2 text-sm font-semibold text-muted transition-colors hover:text-ink"
                  >
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
