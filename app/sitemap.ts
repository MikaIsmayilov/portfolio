import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://mikaismayilli.com";
  return [
    { url: base, lastModified: new Date(), priority: 1.0 },
    { url: `${base}/work/beatthestreet`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/work/scarcity-experiment`, lastModified: new Date(), priority: 0.9 },
    { url: `${base}/work/aurelian`, lastModified: new Date(), priority: 0.8 },
  ];
}
