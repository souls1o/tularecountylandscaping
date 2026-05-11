import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import FAQAccordion from "@/components/FAQAccordion";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  MapPinIcon,
  ServiceIcon,
  SparkleIcon,
  WaterDropIcon
} from "@/components/Icons";
import LeadForm from "@/components/LeadForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  buildFaqs,
  cities,
  cityServiceContent,
  cityServiceParams,
  getCityBySlug,
  getServiceBySlug,
  globalFaqs,
  services
} from "@/data/site";
import { absoluteUrl, buildFaqSchema, buildLocalBusinessSchema, buildServiceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return cityServiceParams;
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ city: string; service: string }>;
}): Promise<Metadata> {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) return {};

  const title = `${service.name} in ${city.name}, ${city.state} | Free Local Estimates`;
  const description = `Need ${service.name.toLowerCase()} in ${city.name}? Get matched with vetted local contractors for quotes, scheduling, and quality-focused work.`;
  const url = `/locations/${city.slug}/${service.slug}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url: absoluteUrl(url), type: "article" }
  };
}

const localProcess = [
  {
    title: "On-site discovery",
    description: "Your matched contractor meets at your property to listen, assess, and document scope."
  },
  { title: "Scope & schedule", description: "Fixed-price quote, materials, and a confirmed timeline." },
  { title: "Prep & install", description: "Disciplined site prep, premium materials, daily cleanup." },
  {
    title: "QC walkthrough",
    description: "Final review with you before the contracting team wraps on site."
  }
];

export default async function CityServicePage({
  params
}: {
  params: Promise<{ city: string; service: string }>;
}) {
  const { city: citySlug, service: serviceSlug } = await params;
  const city = getCityBySlug(citySlug);
  const service = getServiceBySlug(serviceSlug);
  if (!city || !service) notFound();

  const faqs = [...globalFaqs, ...buildFaqs(city, service)];
  const content = cityServiceContent(city, service);
  const localSchema = buildLocalBusinessSchema();
  const serviceSchema = buildServiceSchema(service.name, `/locations/${city.slug}/${service.slug}`, city.name);
  const faqSchema = buildFaqSchema(faqs);

  return (
    <article className="space-y-20 pb-20">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_15%_15%,rgba(34,197,94,0.18),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(74,222,128,0.12),transparent_50%)]"
        />
        <div className="container-wide section-space grid items-start gap-10 lg:grid-cols-[1.1fr_minmax(380px,_1fr)]">
          <RevealOnScroll>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-gradient text-ink ring-1 ring-leaf/40">
                <ServiceIcon slug={service.slug} size={26} />
              </span>
              <p className="eyebrow eyebrow-dot">
                <span>Most Important Ranking Page</span>
              </p>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-bright md:text-6xl">
              {service.name}{" "}
              <span className="text-gradient">
                in {city.name}, {city.state}
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-soft md:text-lg">
              We connect {city.name} homeowners with local landscaping specialists who can boost curb appeal and reduce
              upkeep with work planned for {city.climateNote}.
            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm">
              <Link href="#estimate" className="btn-primary">
                Free Local Estimate <ArrowRightIcon size={16} />
              </Link>
              <Link href={`/services/${service.slug}`} className="btn-secondary">
                Main Service Page
              </Link>
              <Link href={`/locations/${city.slug}`} className="btn-secondary">
                {city.name} City Page
              </Link>
            </div>

            <ul className="mt-8 grid gap-2 text-sm sm:grid-cols-2">
              {[
                `Built for ${city.climateNote}`,
                `Familiar with ${city.neighborhoods.slice(0, 2).join(" & ")}`,
                "Licensed & insured local contractors",
                "Transparent flat-rate quotes"
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

      {/* LOCALIZED OVERVIEW */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="surface-elevated relative overflow-hidden p-8 md:p-12">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
              <div>
                <p className="eyebrow"><span>Localized Service Overview</span></p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
                  {service.name} that <span className="text-gradient">performs in {city.name}</span>.
                </h2>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    { icon: WaterDropIcon, text: `Built for ${city.climateNote}` },
                    { icon: MapPinIcon, text: `Aligned to ${city.neighborhoods.join(", ")}` },
                    { icon: SparkleIcon, text: "Reduced maintenance complexity for busy homeowners" },
                    { icon: CalendarIcon, text: "Same-week walkthroughs and clear scheduling" }
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
                {content.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* PROCESS */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="max-w-2xl">
            <p className="eyebrow">
              <span>Typical project flow</span>
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
              Predictable steps from <span className="text-gradient">first call to final walkthrough</span>.
            </h2>
          </div>
        </RevealOnScroll>

        <div className="relative mt-12 grid gap-6 md:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-leaf/40 to-transparent md:block"
          />
          {localProcess.map((step, idx) => (
            <RevealOnScroll key={step.title} delay={idx * 110}>
              <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-deep-gradient text-base font-black text-leaf shadow-glow">
                0{idx + 1}
              </span>
              <h3 className="mt-5 text-base font-bold text-bright">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-soft">{step.description}</p>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="surface-glass overflow-hidden p-8 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow"><span>Related Services</span></p>
                <h2 className="mt-3 text-2xl font-extrabold text-bright md:text-3xl">
                  More installs in {city.name}
                </h2>
              </div>
              <Link
                href={`/locations/${city.slug}`}
                className="link-underline text-sm font-semibold text-leaf"
              >
                View all in {city.name} <ArrowRightIcon size={14} />
              </Link>
            </div>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {services
                .filter((relatedService) => relatedService.slug !== service.slug)
                .slice(0, 6)
                .map((relatedService) => (
                  <Link
                    key={relatedService.slug}
                    href={`/locations/${city.slug}/${relatedService.slug}`}
                    className="group flex items-center gap-3 rounded-2xl border border-line bg-panel/60 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/40"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                      <ServiceIcon slug={relatedService.slug} size={18} />
                    </span>
                    <span className="flex-1 text-sm font-semibold text-bright">
                      {relatedService.name} in {city.name}
                    </span>
                    <ArrowRightIcon
                      size={14}
                      className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-leaf"
                    />
                  </Link>
                ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* SAME SERVICE — OTHER CITIES */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="surface-panel overflow-hidden p-8 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow">
                  <span>Nearby cities</span>
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-bright md:text-3xl">
                  {service.name} in other Tulare County cities
                </h2>
              </div>
              <Link href={`/services/${service.slug}`} className="link-underline text-sm font-semibold text-leaf">
                Hub page for {service.name} <ArrowRightIcon size={14} />
              </Link>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {cities
                .filter((c) => c.slug !== city.slug)
                .map((c) => (
                  <Link
                    key={c.slug}
                    href={`/locations/${c.slug}/${service.slug}`}
                    className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel/60 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/40"
                  >
                    <span className="flex items-center gap-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                        <MapPinIcon size={18} />
                      </span>
                      <span className="text-sm font-semibold text-bright group-hover:text-leaf">
                        {service.name} in {c.name}
                      </span>
                    </span>
                    <ArrowRightIcon
                      size={14}
                      className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-leaf"
                    />
                  </Link>
                ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* FAQ — contact strip in global footer */}
      <section className="container-wide max-w-3xl">
        <RevealOnScroll>
          <div>
            <p className="eyebrow">
              <span>FAQs</span>
            </p>
            <h2 className="mb-4 mt-3 text-2xl font-extrabold leading-tight text-bright md:text-3xl">
              Frequently asked questions
            </h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </RevealOnScroll>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </article>
  );
}
