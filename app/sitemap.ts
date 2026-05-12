import type { MetadataRoute } from "next";
import { cities, cityServiceParams, services, siteUrl } from "@/data/site";
import { getPublishedArticlesMeta } from "@/lib/articles";

function parseIsoDate(iso: string, fallback: Date): Date {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? fallback : d;
}

/**
 * Programmatic URLs share one timestamp (build/request time). Article URLs use
 * frontmatter dates so crawlers see real recency signals.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const generatedAt = new Date();
  const entries: MetadataRoute.Sitemap = [];

  entries.push({
    url: siteUrl,
    lastModified: generatedAt,
    changeFrequency: "weekly",
    priority: 1
  });

  entries.push({
    url: `${siteUrl}/articles`,
    lastModified: generatedAt,
    changeFrequency: "weekly",
    priority: 0.85
  });

  for (const article of getPublishedArticlesMeta()) {
    entries.push({
      url: `${siteUrl}/articles/${article.slug}`,
      lastModified: parseIsoDate(article.updatedAt ?? article.publishedAt, generatedAt),
      changeFrequency: "monthly",
      priority: 0.75
    });
  }

  entries.push({
    url: `${siteUrl}/locations`,
    lastModified: generatedAt,
    changeFrequency: "weekly",
    priority: 0.88
  });

  for (const city of cities) {
    entries.push({
      url: `${siteUrl}/locations/${city.slug}`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.8
    });
  }

  for (const { city, service } of cityServiceParams) {
    entries.push({
      url: `${siteUrl}/locations/${city}/${service}`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.92
    });
  }

  entries.push({
    url: `${siteUrl}/services`,
    lastModified: generatedAt,
    changeFrequency: "weekly",
    priority: 0.88
  });

  for (const service of services) {
    entries.push({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: generatedAt,
      changeFrequency: "monthly",
      priority: 0.8
    });
  }

  return entries.sort((a, b) => a.url.localeCompare(b.url));
}
