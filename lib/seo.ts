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
  "Premium Research Reference Peptides for Laboratory Analysis";

export const SITE_DESCRIPTION =
  "LUXEN supplies premium, independently tested research reference peptides for laboratory and in-vitro analytical work. ≥99% HPLC-verified purity, batch-level certificates of analysis. For research use only — not intended to diagnose, treat, cure, or prevent any disease. Not for human or veterinary use.";

export const OG_IMAGE = {
  url: "/images/hero-webp.webp",
  width: 1600,
  height: 900,
  alt: "LUXEN — research-grade peptides",
} as const;

export const TWITTER_HANDLE = "@luxenlabs";

export const absoluteUrl = (path: string = "/") =>
  path.startsWith("http") ? path : `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
