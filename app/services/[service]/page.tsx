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
  ShieldCheckIcon,
  SparkleIcon
} from "@/components/Icons";
import LeadForm from "@/components/LeadForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import { cities, getServiceBySlug, globalFaqs, servicePageFaqs, services } from "@/data/site";
import { pickServicePageHero } from "@/components/article/ArticleSvgs";
import { absoluteUrl, buildFaqSchema, buildServiceSchema } from "@/lib/seo";

export function generateStaticParams() {
  return services.map((service) => ({ service: service.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) return {};

  const title = `${service.name} | Tulare County Landscaping`;
  const description = `${service.shortDescription} Serving Tulare County cities with free estimates.`;
  const url = `/services/${service.slug}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url: absoluteUrl(url), type: "article" }
  };
}

const processSteps = [
  {
    title: "Property walkthrough",
    description: "Your matched contractor meets on-site, listens to your goals, and reviews the property in detail."
  },
  {
    title: "Scope planning",
    description: "Material options, timeline, and a fixed-price written quote with no surprises."
  },
  {
    title: "Site prep & install",
    description: "Disciplined prep, premium materials, and a clean job site every day."
  },
  {
    title: "QC & walkthrough",
    description: "Final quality control pass and a homeowner walkthrough before the team wraps on site."
  }
];

export default async function ServicePage({
  params
}: {
  params: Promise<{ service: string }>;
}) {
  const { service: serviceSlug } = await params;
  const service = getServiceBySlug(serviceSlug);
  if (!service) notFound();

  const faqs = [...globalFaqs, ...servicePageFaqs(service)];
  const faqSchema = buildFaqSchema(faqs);
  const serviceSchema = buildServiceSchema(service.name, `/services/${service.slug}`);
  const ServiceHeroIllustration = pickServicePageHero(service.slug);

  return (
    <article className="space-y-20 pb-20">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_15%_15%,rgba(34,197,94,0.18),transparent_45%)]"
        />
        <div className="container-wide section-space grid items-start gap-10 lg:grid-cols-[1.1fr_minmax(380px,_1fr)]">
          <RevealOnScroll>
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-leaf-gradient text-ink ring-1 ring-leaf/40">
                <ServiceIcon slug={service.slug} size={26} />
              </span>
              <p className="eyebrow eyebrow-dot">
                <span>Landscaping Service</span>
              </p>
            </div>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight text-bright md:text-6xl">
              {service.name}{" "}
              <span className="text-gradient">in Tulare County</span>
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-soft md:text-lg">
              {service.shortDescription} Engineered for Central Valley climate, typically executed by licensed
              local contractors you meet through us, with transparent flat-rate quotes from matched pros.
            </p>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-center gap-2 rounded-2xl border border-line bg-panel/60 px-4 py-3 text-sm text-soft"
                >
                  <CheckIcon size={14} className="text-leaf" /> {benefit}
                </div>
              ))}
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="#estimate" className="btn-primary">
                Request Free Estimate <ArrowRightIcon size={16} />
              </Link>
              <Link href="/locations/tulare-ca" className="btn-secondary">
                View Service Areas <MapPinIcon size={16} />
              </Link>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <LeadForm />
          </RevealOnScroll>
        </div>
      </section>

      {/* WHY HOMEOWNERS CHOOSE */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="surface-elevated relative overflow-hidden p-8 md:p-12">
            <div
              aria-hidden
              className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="grid gap-10 lg:grid-cols-[1fr_minmax(160px,220px)_1.15fr] lg:items-start">
              <div>
                <p className="eyebrow"><span>Why this service</span></p>
                <h2 className="mt-3 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
                  Built for <span className="text-gradient">long-term value</span>, not just opening day.
                </h2>
                <ul className="mt-6 space-y-3 text-sm">
                  {[
                    { icon: ShieldCheckIcon, text: "Licensed, insured, and CA-compliant install standards" },
                    { icon: CalendarIcon, text: "Predictable schedules and a clear point of contact with your contractor" },
                    { icon: SparkleIcon, text: "Premium materials sized for Valley sun, soil, and water" }
                  ].map(({ icon: Icon, text }) => (
                    <li key={text} className="flex items-start gap-3 text-soft">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                        <Icon size={18} />
                      </span>
                      {text}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative mx-auto hidden max-w-[200px] pt-4 lg:block xl:max-w-[220px]">
                <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-b from-primary/20 to-transparent blur-2xl" />
                <ServiceHeroIllustration className="h-auto w-full drop-shadow-[0_14px_48px_rgba(34,197,94,0.14)]" />
              </div>

              <div className="space-y-5 text-sm leading-relaxed text-soft md:text-base">
                <p>
                  {service.name} projects work best when planned around long-term value, local weather conditions,
                  and practical maintenance expectations. Matched contractors focus on clean execution, clear
                  communication, and measurable improvements in curb appeal and usability.
                </p>
                <p>
                  Every recommendation should be grounded in Central Valley experience: which materials hold up to
                  Tulare County summers, which irrigation strategies actually cut water bills, and how to lay out spaces
                  so they get used.
                </p>
                <p>
                  Expect one point of contact on site, written scopes before any major step, and workmanship from a
                  contractor who stands behind the result.
                </p>
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
              From walkthrough to <span className="text-gradient">final reveal</span>.
            </h2>
          </div>
        </RevealOnScroll>
        <div className="relative mt-12 grid gap-6 md:grid-cols-4">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-leaf/40 to-transparent md:block"
          />
          {processSteps.map((step, idx) => (
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

      {/* CITY GRID */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="surface-glass overflow-hidden p-8 md:p-10">
            <p className="eyebrow"><span>Service Areas</span></p>
            <h2 className="mt-3 text-2xl font-extrabold text-bright md:text-3xl">
              {service.name} by city
            </h2>
            <p className="mt-2 text-sm text-muted">
              Tap a city for hyper-local pricing details, neighborhoods, and FAQs.
            </p>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}/${service.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel/60 p-4 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/40"
                >
                  <span className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                      <MapPinIcon size={18} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-bright">
                        {service.name} in {city.name}
                      </span>
                      <span className="block text-xs text-muted">
                        {city.neighborhoods.slice(0, 2).join(", ")}
                      </span>
                    </span>
                  </span>
                  <ArrowRightIcon
                    size={16}
                    className="text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-leaf"
                  />
                </Link>
              ))}
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* FAQ — phone & estimate CTA in footer */}
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

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </article>
  );
}
