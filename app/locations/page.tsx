import type { Metadata } from "next";
import Link from "next/link";
import CityServiceHub from "@/components/CityServiceHub";
import { ArrowRightIcon, MapPinIcon } from "@/components/Icons";
import FAQAccordion from "@/components/FAQAccordion";
import LeadForm from "@/components/LeadForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import { brandName, cities, globalFaqs, locationsHubExtraFaqs, services } from "@/data/site";
import { absoluteUrl, buildFaqSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Service Areas & Locations | ${brandName}`,
  description:
    "Landscaping in Tulare County cities including Dinuba, Exeter, Farmersville, Lindsay, Woodlake, Goshen, Tipton, Pixley, and more. Browse city pages and service-by-city links.",
  alternates: { canonical: "/locations" },
  openGraph: {
    title: `Service Areas & Locations | ${brandName}`,
    description:
      "Landscaping hub pages for Dinuba, Exeter, Farmersville, Lindsay, Woodlake, Goshen, Tipton, Pixley, Tulare, Visalia, Porterville, and more.",
    url: absoluteUrl("/locations"),
    type: "website"
  }
};

export default function LocationsIndexPage() {
  const faqs = [...globalFaqs, ...locationsHubExtraFaqs];
  const faqSchema = buildFaqSchema(faqs);

  return (
    <article className="pb-20 md:pb-24">
      <section className="container-wide pt-8 md:pt-10">
        <RevealOnScroll>
          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <p className="eyebrow eyebrow-dot">
                <span>Service areas</span>
              </p>
              <h1 className="mt-4 text-4xl font-extrabold leading-tight text-bright md:text-5xl">
                Landscaping across <span className="text-gradient">Tulare County</span>
              </h1>
              <p className="mt-4 max-w-2xl text-muted">
                Open a city for climate-specific guidance, neighborhoods we mention, and links to every service in that
                market. Prefer a service first? Use the services hub and jump into city pages from there.
              </p>
              <p className="mt-4 text-sm text-soft">
                <Link href="/services" className="link-underline inline-flex items-center gap-1 font-semibold text-leaf">
                  Browse all services
                  <ArrowRightIcon size={14} />
                </Link>
              </p>
            </div>
            <LeadForm />
          </div>
        </RevealOnScroll>
      </section>

      <section className="container-wide mt-14">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {cities.map((city) => (
            <RevealOnScroll key={city.slug}>
              <Link
                href={`/locations/${city.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="absolute left-0 top-0 h-full w-1 origin-bottom scale-y-0 bg-leaf-gradient transition-transform duration-500 group-hover:scale-y-100" />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                  <MapPinIcon size={22} />
                </span>
                <h2 className="mt-4 text-xl font-bold text-bright group-hover:text-leaf">
                  {city.name}, {city.state}
                </h2>
                <p className="mt-2 text-sm text-muted">{city.climateNote}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">
                  {city.neighborhoods.join(" - ")}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-leaf">
                  City page <ArrowRightIcon size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="container-wide mt-16">
        <RevealOnScroll>
          <div className="surface-glass p-8 md:p-10">
            <p className="eyebrow">
              <span>Quick links</span>
            </p>
            <h2 className="mt-3 text-2xl font-bold text-bright">City + service pages</h2>
            <div className="mt-6">
              <CityServiceHub cities={cities} services={services} />
            </div>
          </div>
        </RevealOnScroll>
      </section>

      <section className="container-wide mt-16 max-w-3xl">
        <RevealOnScroll>
          <div>
            <p className="eyebrow">
              <span>FAQs</span>
            </p>
            <h2 className="mb-4 mt-3 text-2xl font-extrabold leading-tight text-bright md:text-3xl">
              Questions about <span className="text-gradient">service areas</span>
            </h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </RevealOnScroll>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </article>
  );
}
