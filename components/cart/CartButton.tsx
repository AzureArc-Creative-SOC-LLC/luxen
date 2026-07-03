"use client";

import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";

export default function CartButton({ className }: { className?: string }) {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      aria-label={`Open cart${count ? ` (${count} items)` : ""}`}
      className={cn("relative inline-flex items-center transition-colors", className)}
    >
      <ShoppingBag size={20} strokeWidth={2} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 grid h-[18px] min-w-[18px] place-items-center rounded-full bg-brand px-1 text-[10px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
