import type { Metadata } from "next";
import { Urbanist } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { CartProvider } from "@/lib/cart";
import { AuthProvider } from "@/lib/auth";
import CartDrawer from "@/components/cart/CartDrawer";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "LUXEN — Premium Research Peptides for Laboratory R&D",
  description:
    "LUXEN supplies premium, independently tested research peptides for laboratory and in-vitro studies. ≥99% HPLC-verified purity, cold-chain handling, tracked worldwide shipping. Research use only — not for human or veterinary consumption.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${urbanist.variable} antialiased`}>
      <body className="bg-white text-ink">
        <AuthProvider>
          <CartProvider>
            <SmoothScroll>{children}</SmoothScroll>
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
