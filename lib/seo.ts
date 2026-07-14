/* ---------------------------------------------------------------------------
   Central SEO constants. Keep a single source of truth for canonical URL,
   brand name, and social handles so metadata stays consistent across pages
   and JSON-LD emitters.
--------------------------------------------------------------------------- */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://luxen.co"
).replace(/\/+$/, "");

export const SITE_NAME = "LUXEN";

export const SITE_TAGLINE =
  "Premium Research Peptides for Laboratory R&D";

export const SITE_DESCRIPTION =
  "LUXEN supplies premium, independently tested research peptides for laboratory and in-vitro studies. ≥99% HPLC-verified purity, cold-chain handling, tracked worldwide shipping. Research use only — not for human or veterinary consumption.";

export const OG_IMAGE = {
  url: "/images/hero-webp.webp",
  width: 1600,
  height: 900,
  alt: "LUXEN — research-grade peptides",
} as const;

export const TWITTER_HANDLE = "@luxenlabs";

export const absoluteUrl = (path: string = "/") =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
