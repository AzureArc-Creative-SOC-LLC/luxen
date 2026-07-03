"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { SERVICES, getProduct, type Product } from "@/lib/data";

type CartItem = { slug: string; qty: number };
export type CartLine = { product: Product; qty: number; lineTotal: number };

type CartContextValue = {
  items: CartItem[];
  lines: CartLine[];
  count: number;
  subtotal: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "luxen-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  // Load persisted cart after mount. We intentionally setState here (rather
  // than a lazy initializer) so the first render matches the server HTML and
  // there's no hydration mismatch on the cart count.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const add = useCallback((slug: string, qty = 1) => {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === slug);
      if (found) return prev.map((i) => (i.slug === slug ? { ...i, qty: i.qty + qty } : i));
      return [...prev, { slug, qty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.slug !== slug)
        : prev.map((i) => (i.slug === slug ? { ...i, qty } : i)),
    );
  }, []);

  const remove = useCallback((slug: string) => {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const lines = useMemo<CartLine[]>(
    () =>
      items
        .map((i) => {
          const product = getProduct(i.slug);
          if (!product) return null;
          return { product, qty: i.qty, lineTotal: product.price * i.qty };
        })
        .filter((l): l is CartLine => l !== null),
    [items],
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      lines,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: lines.reduce((s, l) => s + l.lineTotal, 0),
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear,
    }),
    [items, lines, isOpen, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export const formatGBP = (n: number) => `£${n.toLocaleString("en-GB")}`;

// Re-export so consumers can grab the full catalog without another import.
export { SERVICES as PRODUCTS };
