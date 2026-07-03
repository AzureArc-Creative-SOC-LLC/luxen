"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import CartButton from "@/components/cart/CartButton";
import AccountMenu from "@/components/AccountMenu";

/* Compact header for sub-pages (product, cart). */
export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-white/80 backdrop-blur-xl">
      <div className="container-luxen flex h-[74px] items-center justify-between">
        <Link href="/" aria-label="LUXEN home">
          <Logo className="text-ink" mark="var(--brand)" />
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="/#services"
            className="hidden text-sm font-semibold text-ink transition-colors hover:text-brand sm:inline"
          >
            Catalog
          </Link>
          <AccountMenu variant="light" />
          <CartButton className="text-ink hover:text-brand" />
        </div>
      </div>
    </header>
  );
}
