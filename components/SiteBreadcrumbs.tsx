"use client";

import { usePathname } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getCityBySlug, getServiceBySlug } from "@/data/site";

export default function SiteBreadcrumbs() {
  const pathname = usePathname() ?? "/";
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);
  const items: { label: string; href: string }[] = [{ label: "Home", href: "/" }];

  if (segments[0] === "services") {
    items.push({ label: "Services", href: "/services" });
    if (segments[1]) {
      const service = getServiceBySlug(segments[1]);
      items.push({
        label: service?.name ?? segments[1].replace(/-/g, " "),
        href: `/services/${segments[1]}`
      });
    }
    return <Breadcrumbs items={items} />;
  }

  if (segments[0] === "locations") {
    items.push({ label: "Locations", href: "/locations" });
    if (segments[1]) {
      const city = getCityBySlug(segments[1]);
      items.push({
        label: city ? `${city.name}, ${city.state}` : segments[1],
        href: `/locations/${segments[1]}`
      });
    }
    if (segments[1] && segments[2]) {
      const service = getServiceBySlug(segments[2]);
      items.push({
        label: service?.name ?? segments[2].replace(/-/g, " "),
        href: `/locations/${segments[1]}/${segments[2]}`
      });
    }
    return <Breadcrumbs items={items} />;
  }

  return null;
}
