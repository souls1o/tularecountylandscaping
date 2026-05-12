import { cities, cityServiceLinkEntries, services } from "@/data/site";
import { getArticleSlugs } from "@/lib/articles";

const articlePaths = getArticleSlugs().map((slug) => `/articles/${slug}`);

const allowed = new Set<string>([
  "/",
  "/locations",
  "/services",
  "/articles",
  ...cities.map((c) => `/locations/${c.slug}`),
  ...services.map((s) => `/services/${s.slug}`),
  ...cityServiceLinkEntries.map((e) => e.href),
  ...articlePaths
]);

export function isTrackablePath(path: string): boolean {
  if (!path.startsWith("/") || path.length > 200) return false;
  if (path.includes("..") || path.includes("//")) return false;
  return allowed.has(path);
}
