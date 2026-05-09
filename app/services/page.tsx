import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  ArrowRightIcon,
  MapPinIcon,
  ServiceIcon,
  SparkleIcon
} from "@/components/Icons";
import LeadForm from "@/components/LeadForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import { brandName, cities, cityServiceLinkEntries, services } from "@/data/site";
import { absoluteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Landscaping Services | ${brandName}`,
  description:
    "Browse turf, sod, irrigation, lighting, yard cleanup, and gravel landscaping across Tulare County. Same-week estimates.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: `Landscaping Services | ${brandName}`,
    description: "Every service we match to local pros, with city hubs across Tulare County.",
    url: absoluteUrl("/services"),
    type: "website"
  }
};

export default function ServicesIndexPage() {
  return (
    <article className="section-space">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Services", href: "/services" }
        ]}
      />
      <section className="container-wide">
        <RevealOnScroll>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="eyebrow eyebrow-dot">
                <span>All services</span>
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-bright md:text-5xl">
                Landscaping <span className="text-gradient">services</span> we match
              </h1>
              <p className="mt-4 max-w-2xl text-muted">
                Pick a service to see scope, process, and FAQs. Each service links to localized pages across Tulare County
                so you get local context and faster scheduling.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-muted">
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/50 px-3 py-1.5">
                  <SparkleIcon size={12} className="text-leaf" /> Free on-site estimates
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-line bg-panel/50 px-3 py-1.5">
                  <MapPinIcon size={12} className="text-leaf" /> Tulare County focused
                </span>
              </div>
            </div>
            <LeadForm />
          </div>
        </RevealOnScroll>
      </section>

      <section className="container-wide mt-14">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealOnScroll key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-3xl border border-line bg-panel/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                  <ServiceIcon slug={service.slug} size={24} />
                </span>
                <h2 className="mt-4 text-lg font-bold text-bright group-hover:text-leaf">{service.name}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{service.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-leaf">
                  View service <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="container-wide mt-16">
        <RevealOnScroll>
          <div className="surface-panel p-8 md:p-10">
            <p className="eyebrow">
              <span>By city</span>
            </p>
            <h2 className="mt-3 text-2xl font-bold text-bright md:text-3xl">See services in your area</h2>
            <p className="mt-2 max-w-2xl text-sm text-muted">
              City pages list every service with localized copy; below is every city + service URL for full coverage.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {cities.map((city) => (
                <li key={city.slug}>
                  <Link
                    href={`/locations/${city.slug}`}
                    className="btn-secondary inline-flex items-center gap-2"
                  >
                    <MapPinIcon size={14} />
                    {city.name}, {city.state}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cityServiceLinkEntries.map(({ city, service, href }) => (
                <li key={`${city.slug}-${service.slug}`}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-panel/40 p-4 transition-colors hover:border-primary/40"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-deep-gradient text-leaf">
                      <ServiceIcon slug={service.slug} size={18} />
                    </span>
                    <span className="text-sm font-semibold text-bright group-hover:text-leaf">
                      {service.name} in {city.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </RevealOnScroll>
      </section>
    </article>
  );
}
