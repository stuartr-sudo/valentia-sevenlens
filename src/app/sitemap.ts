import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/journal",
    "/journal/why-you-wake-at-3am",
    "/topics/why-do-i-wake-at-3am",
    "/hormonal-skin-check-in",
    "/contact",
    "/wholesale",
    "/wholesale/portal",
  ];
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
