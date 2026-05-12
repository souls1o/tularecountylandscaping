import type { MetadataRoute } from "next";
import { cities, cityServiceParams, services, siteUrl } from "@/data/site";
import { getArticleSlugs } from "@/lib/articles";

/** Tiered priorities: hubs and city+service landers weighted highest after home. */
export default function sitemap(): MetadataRoute.Sitemap {
  const out: MetadataRoute.Sitemap = [{ url: siteUrl, changeFrequency: "weekly", priority: 1 }];

  out.push({ url: `${siteUrl}/articles`, changeFrequency: "weekly", priority: 0.85 });

  for (const slug of getArticleSlugs()) {
    out.push({
      url: `${siteUrl}/articles/${slug}`,
      changeFrequency: "monthly",
      priority: 0.78
    });
  }

  for (const path of ["/services", "/locations"]) {
    out.push({ url: `${siteUrl}${path}`, changeFrequency: "weekly", priority: 0.92 });
  }

  for (const service of services) {
    out.push({
      url: `${siteUrl}/services/${service.slug}`,
      changeFrequency: "monthly",
      priority: 0.8
    });
  }

  for (const city of cities) {
    out.push({
      url: `${siteUrl}/locations/${city.slug}`,
      changeFrequency: "monthly",
      priority: 0.8
    });
  }

  for (const { city, service } of cityServiceParams) {
    out.push({
      url: `${siteUrl}/locations/${city}/${service}`,
      changeFrequency: "weekly",
      priority: 0.88
    });
  }

  return out;
}
