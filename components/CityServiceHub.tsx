"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRightIcon, MapPinIcon, ServiceIcon } from "@/components/Icons";
import type { City, Service } from "@/data/site";

type Props = {
  cities: City[];
  services: Service[];
  /** Optional intro shown above the city buttons */
  intro?: string;
};

export default function CityServiceHub({ cities, services, intro }: Props) {
  const [activeSlug, setActiveSlug] = useState(cities[0]?.slug ?? "");
  const activeCity = cities.find((c) => c.slug === activeSlug) ?? cities[0];

  if (!activeCity) return null;

  return (
    <div>
      {intro ? <p className="mb-4 max-w-2xl text-sm text-muted">{intro}</p> : null}

      <div className="flex flex-wrap gap-2">
        {cities.map((city) => {
          const isActive = city.slug === activeSlug;
          return (
            <Link
              key={city.slug}
              href={`/locations/${city.slug}`}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                isActive
                  ? "border-primary/50 bg-primary/15 text-bright"
                  : "border-line bg-panel/50 text-soft hover:border-primary/40 hover:text-bright"
              }`}
              onMouseEnter={() => setActiveSlug(city.slug)}
              onFocus={() => setActiveSlug(city.slug)}
            >
              <MapPinIcon size={14} className={isActive ? "text-leaf" : "text-muted"} />
              {city.name}
            </Link>
          );
        })}
      </div>

      <p className="mt-4 text-xs text-muted">
        Hover a city to preview local service pages. Click the city to open its full location hub.
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <li key={`${activeCity.slug}-${service.slug}`}>
            <Link
              href={`/locations/${activeCity.slug}/${service.slug}`}
              className="group flex items-center gap-3 rounded-2xl border border-line bg-panel/40 p-4 transition-colors hover:border-primary/40 hover:bg-primary/5"
            >
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                <ServiceIcon slug={service.slug} size={18} />
              </span>
              <span className="min-w-0 flex-1 text-sm font-semibold text-bright group-hover:text-leaf">
                {service.name} in {activeCity.name}
              </span>
              <ArrowRightIcon
                size={14}
                className="shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-leaf"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
