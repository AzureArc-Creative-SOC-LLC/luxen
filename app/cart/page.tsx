import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

/* Cart is user-specific and stateful — keep search engines out. */
export const metadata: Metadata = {
  title: "Your Cart",
  description:
    "Review your selected LUXEN research peptides before checkout. Independently tested and documented, for laboratory R&D only.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/cart" },
};

export default function CartPage() {
  return <CartPageClient />;
}
