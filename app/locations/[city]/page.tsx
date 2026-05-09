import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/Breadcrumbs";
import FAQAccordion from "@/components/FAQAccordion";
import {
  ArrowRightIcon,
  CheckIcon,
  MapPinIcon,
  ServiceIcon,
  SparkleIcon,
  WaterDropIcon
} from "@/components/Icons";
import LeadForm from "@/components/LeadForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import { buildFaqs, cities, cityPageContent, getCityBySlug, globalFaqs, services } from "@/data/site";
import { absoluteUrl, buildFaqSchema, buildLocalBusinessSchema } from "@/lib/seo";

export function generateStaticParams() {
  return cities.map((city) => ({ city: city.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string }>;
}): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) return {};
  const title = `Landscaping Services in ${city.name}, ${city.state}`;
  const description = `Get matched with vetted landscaping contractors serving ${city.name}. Explore services and request a free introduction.`;
  const url = `/locations/${city.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url: absoluteUrl(url), type: "article" }
  };
}

export default async function CityPage({
  params
}: {
  params: Promise<{ city: string }>;
}) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city) notFound();

  const faqs = [...globalFaqs, ...buildFaqs(city)];
  const localSchema = buildLocalBusinessSchema();
  const faqSchema = buildFaqSchema(faqs);

  return (
    <article className="space-y-20 pb-20">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: `${city.name}, ${city.state}`, href: `/locations/${city.slug}` }
        ]}
      />
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_85%_15%,rgba(34,197,94,0.18),transparent_45%)]"
        />
        <div className="container-wide section-space grid items-start gap-10 lg:grid-cols-[1.1fr_minmax(380px,_1fr)]">
          <RevealOnScroll>
            <div className="flex items-center gap-3">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-gradient text-ink ring-1 ring-leaf/40">
                <MapPinIcon size={26} />
              </span>
              <p className="eyebrow eyebrow-dot"><span>Local Market Page</span></p>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-bright md:text-6xl">
              Landscaping Services in {city.name},{" "}
              <span className="text-gradient">{city.state}</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-soft md:text-lg">
              We connect you with experienced landscaping contractors across {city.neighborhoods.join(", ")}. Built for{" "}
              {city.climateNote}, with attention to {city.localAngle}.
            </p>

            <ul className="mt-7 grid gap-2 text-sm sm:grid-cols-2">
              {[
                "Free same-week introductions",
                "Licensed & insured local contractors",
                "Neighborhood-specific recommendations",
                "Transparent quotes from matched pros"
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 rounded-2xl border border-line bg-panel/60 px-4 py-3 text-soft">
                  <CheckIcon size={14} className="text-leaf" /> {item}
                </li>
              ))}
            </ul>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <LeadForm />
          </RevealOnScroll>
        </div>
      </section>

      {/* WHY LOCAL */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="surface-elevated relative overflow-hidden p-8 md:p-12">
            <div
              aria-hidden
              className="absolute -left-10 -top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="eyebrow"><span>Why local matters</span></p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
                  Matched pros plan for <span className="text-gradient">{city.name}</span> properties.
                </h2>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    { icon: WaterDropIcon, text: `Plans tuned for ${city.climateNote}` },
                    { icon: MapPinIcon, text: `Neighborhood-aware: ${city.neighborhoods.join(", ")}` },
                    { icon: SparkleIcon, text: "Materials and layouts built for actual daily use" }
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3 text-soft">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                        <Icon size={18} />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4 text-sm leading-relaxed text-soft md:text-base">
                {cityPageContent(city).map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* SERVICES IN CITY - bento */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="eyebrow"><span>Services in {city.name}</span></p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
                Pick the install you need
              </h2>
            </div>
            <p className="text-xs text-muted">All services include free local estimates and written quotes.</p>
          </div>
        </RevealOnScroll>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <RevealOnScroll key={service.slug}>
              <Link
                href={`/locations/${city.slug}/${service.slug}`}
                className="group flex h-full items-start gap-4 rounded-3xl border border-line bg-panel/60 p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-deep-gradient text-leaf ring-1 ring-primary/30 transition-transform duration-500 group-hover:scale-110">
                  <ServiceIcon slug={service.slug} size={22} />
                </span>
                <div className="flex-1">
                  <p className="text-base font-bold text-bright group-hover:text-leaf">
                    {service.name} in {city.name}
                  </p>
                  <p className="mt-1 text-xs text-muted">{service.shortDescription}</p>
                </div>
                <ArrowRightIcon
                  size={16}
                  className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-leaf"
                />
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="container-wide">
        <RevealOnScroll>
          <div className="surface-glass overflow-hidden p-8 md:p-10">
            <p className="eyebrow">
              <span>More cities</span>
            </p>
            <h2 className="mt-3 text-xl font-bold text-bright md:text-2xl">Landscaping in nearby Tulare County cities</h2>
            <p className="mt-2 text-sm text-muted">
              Compare climate notes and neighborhoods, then open the city hub for full service links.
            </p>
            <ul className="mt-6 flex flex-wrap gap-3">
              {cities
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/locations/${c.slug}`}
                      className="btn-secondary inline-flex items-center gap-2 text-sm"
                    >
                      <MapPinIcon size={14} />
                      {c.name}, {c.state}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </RevealOnScroll>
      </section>

      <section className="container-wide max-w-3xl">
        <RevealOnScroll>
          <div>
            <p className="eyebrow">
              <span>FAQs</span>
            </p>
            <h2 className="mb-4 mt-3 text-2xl font-extrabold leading-tight text-bright md:text-3xl">
              Questions about landscaping in {city.name}
            </h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </RevealOnScroll>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </article>
  );
}
