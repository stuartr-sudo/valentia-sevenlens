import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    { route: "", priority: 1, changeFrequency: "weekly" as const },
    { route: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { route: "/journal", priority: 0.8, changeFrequency: "weekly" as const },
    {
      route: "/journal/why-you-wake-at-3am",
      priority: 0.75,
      changeFrequency: "monthly" as const,
    },
    {
      route: "/topics/why-do-i-wake-at-3am",
      priority: 0.75,
      changeFrequency: "monthly" as const,
    },
    {
      route: "/programmatic/vitamin-c-serum-for-sensitive-skin",
      priority: 0.7,
      changeFrequency: "monthly" as const,
    },
    { route: "/quiz", priority: 0.85, changeFrequency: "monthly" as const },
    { route: "/contact", priority: 0.65, changeFrequency: "monthly" as const },
    { route: "/wholesale", priority: 0.75, changeFrequency: "monthly" as const },
    {
      route: "/wholesale/portal",
      priority: 0.35,
      changeFrequency: "monthly" as const,
    },
    { route: "/cart", priority: 0.3, changeFrequency: "monthly" as const },
    { route: "/checkout", priority: 0.25, changeFrequency: "monthly" as const },
    { route: "/account", priority: 0.25, changeFrequency: "monthly" as const },
  ];
  const now = new Date();

  return routes.map(({ route, priority, changeFrequency }) => ({
    url: `${siteConfig.url}${route}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
