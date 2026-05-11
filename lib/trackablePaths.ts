import { cities, cityServiceLinkEntries, services } from "@/data/site";

const allowed = new Set<string>([
  "/",
  "/locations",
  "/services",
  ...cities.map((c) => `/locations/${c.slug}`),
  ...services.map((s) => `/services/${s.slug}`),
  ...cityServiceLinkEntries.map((e) => e.href)
]);

export function isTrackablePath(path: string): boolean {
  if (!path.startsWith("/") || path.length > 200) return false;
  if (path.includes("..") || path.includes("//")) return false;
  return allowed.has(path);
}
