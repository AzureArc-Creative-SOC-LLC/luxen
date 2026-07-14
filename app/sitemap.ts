import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/data";
import { SITE_URL } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/signin`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${SITE_URL}/signup`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const productEntries: MetadataRoute.Sitemap = SERVICES.map((p) => ({
    url: `${SITE_URL}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
    images: [`${SITE_URL}${p.img}`],
  }));

  return [...staticEntries, ...productEntries];
}
