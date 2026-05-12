import type { Metadata } from "next";
import Link from "next/link";
import FAQAccordion from "@/components/FAQAccordion";
import LeadForm from "@/components/LeadForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import ServiceCards from "@/components/ServiceCards";
import ServiceMarquee from "@/components/ServiceMarquee";
import {
  ArrowRightIcon,
  CalendarIcon,
  CheckIcon,
  LeafLogo,
  MapPinIcon,
  PhoneIcon,
  SparkleIcon,
  StarIcon,
  WaterDropIcon
} from "@/components/Icons";
import { brandName, buildFaqs, cities, cityServiceLinkEntries, globalFaqs, phoneNumber, services, telHref, trustSignals } from "@/data/site";
import { getAllArticlesMeta } from "@/lib/articles";
import { buildFaqSchema, buildLocalBusinessSchema, absoluteUrl } from "@/lib/seo";
import { getTopCityServiceLinks } from "@/lib/visits";

export const revalidate = 30;

export const metadata: Metadata = {
  title: "Landscaping Services in Tulare County, CA | Turf, Sod, Irrigation & Outdoor Upgrades",
  description: `${brandName} helps Tulare County homeowners get matched with vetted local landscaping contractors for turf, sod, irrigation repair, lighting, yard cleanup, and gravel—free introductions and same-week walkthroughs.`,
  alternates: { canonical: "/" },
  openGraph: {
    title: `Landscaping Services in Tulare County, CA | ${brandName}`,
    description:
      "Homeowners: matched local contractors for landscaping installs and repairs across Tulare County cities.",
    url: absoluteUrl("/"),
    type: "website"
  }
};

const valuePillars = [
  {
    title: "Built for Valley climate",
    description:
      "We match you with pros who plan for Tulare County heat, soil, and seasonal water restrictions so your yard stays sharp year-round.",
    icon: WaterDropIcon
  },
  {
    title: "Licensed & background-checked contractors",
    description:
      "California-licensed, insured landscaping contractors with deep Central Valley experience—vetted before we introduce you.",
    icon: LeafLogo
  },
  {
    title: "Transparent flat-rate quotes",
    description:
      "No surprise change orders from matched pros: clear scopes, written quotes, and a defined point of contact on site through walkthrough.",
    icon: CheckIcon
  }
];

const processSteps = [
  {
    title: "Request & walkthrough",
    description: "Tell us what you need; your matched contractor meets on-site to listen and review the property."
  },
  {
    title: "Scoped written quote",
    description: "You get a fixed-price scope with material and timeline options from the pro—no pressure."
  },
  {
    title: "Schedule & prep",
    description: "Your contractor books around your calendar, preps the site cleanly, and protects your home."
  },
  {
    title: "Install & walkthrough",
    description: "Detailed install, full QC pass, and a final walkthrough so you know what was done."
  }
];

export default async function HomePage() {
  const { links: topPageLinks, analyticsEnabled } = await getTopCityServiceLinks(12);
  const articleTeasers = getAllArticlesMeta().slice(0, 3);
  const combinedFaqs = [...globalFaqs, ...buildFaqs(cities[0])];
  const localBusinessSchema = buildLocalBusinessSchema();
  const faqSchema = buildFaqSchema(combinedFaqs);

  return (
    <div className="space-y-24 pb-24">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_15%_15%,rgba(34,197,94,0.18),transparent_45%),radial-gradient(circle_at_85%_0%,rgba(74,222,128,0.12),transparent_50%)]"
        />
        <div
          aria-hidden
          className="absolute inset-x-0 top-32 -z-10 mx-auto h-72 max-w-5xl rounded-full bg-leaf-gradient opacity-15 blur-[120px]"
        />

        <div className="container-wide section-space grid items-start gap-10 lg:grid-cols-[1.1fr_minmax(380px,_1fr)]">
          <RevealOnScroll>
            <p className="eyebrow eyebrow-dot">
              <span>Tulare County Landscaping</span>
            </p>
            <h1 className="mt-5 text-[2.6rem] font-extrabold leading-[1.05] tracking-tight text-bright sm:text-5xl md:text-6xl">
              Premium yards, <span className="text-gradient">engineered for the Valley</span>.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-soft md:text-lg">
              {brandName} connects homeowners across Tulare County communities with vetted local contractors for
              turf, sod, irrigation, lighting, and gravel projects that hold up to long Central Valley summers.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link href="#estimate" className="btn-primary text-base">
                Get a Free Estimate <ArrowRightIcon size={16} />
              </Link>
              <a href={telHref} className="btn-secondary text-base">
                <PhoneIcon size={16} /> {phoneNumber}
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {trustSignals.map((stat) => (
                <div
                  key={stat.label}
                  className="surface-glass relative overflow-hidden px-4 py-3"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-leaf">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-lg font-bold text-bright">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex items-center gap-4 text-xs text-muted">
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} size={14} className="text-leaf" />
                ))}
              </div>
              <span>
                Rated <span className="font-semibold text-bright">4.9 / 5</span> by Tulare County
                homeowners on Google &amp; Yelp.
              </span>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={120}>
            <LeadForm />
          </RevealOnScroll>
        </div>

        <ServiceMarquee services={services} />
      </section>

      {/* VALUE PILLARS - asymmetric */}
      <section id="about" className="container-wide">
        <RevealOnScroll>
          <div className="grid items-end gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <p className="eyebrow"><span>Why Homeowners Choose Us</span></p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
                Local expertise meets <span className="text-gradient">modern landscaping</span>.
              </h2>
            </div>
            <p className="text-sm leading-relaxed text-muted md:text-base">
              Matched contractors plan installs that look great on day one and stay healthy through the next decade of
              Tulare County weather.
            </p>
          </div>
        </RevealOnScroll>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {valuePillars.map((pillar, idx) => (
            <RevealOnScroll
              key={pillar.title}
              delay={idx * 120}
              className={`spotlight group relative overflow-hidden rounded-3xl border border-line bg-panel/60 p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 ${
                idx === 1 ? "md:translate-y-6" : ""
              }`}
            >
              <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-deep-gradient text-leaf ring-1 ring-primary/30 transition-transform duration-500 group-hover:scale-110">
                <pillar.icon size={26} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-bright">{pillar.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-soft">{pillar.description}</p>
              <div
                aria-hidden
                className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-leaf/40 to-transparent"
              />
            </RevealOnScroll>
          ))}
        </div>
      </section>

      {/* SERVICES - bento layout */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow"><span>Services</span></p>
              <h2 className="mt-4 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
                Everything for an <span className="text-gradient">elevated outdoor space</span>.
              </h2>
            </div>
            <Link href="/services" className="link-underline text-sm font-semibold text-leaf">
              View all services <ArrowRightIcon size={14} />
            </Link>
          </div>
        </RevealOnScroll>

        <div className="mt-10">
          <ServiceCards />
        </div>
      </section>

      {/* PROCESS - timeline */}
      <section id="process" className="container-wide">
        <RevealOnScroll>
          <div className="max-w-2xl">
            <p className="eyebrow">
              <span>How matching works</span>
            </p>
            <h2 className="mt-4 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
              A clear, predictable path from <span className="text-gradient">quote to reveal</span>.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
              No mystery, no pressure. You always know what is happening on your property and what
              comes next.
            </p>
          </div>
        </RevealOnScroll>

        <div className="relative mt-12">
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-leaf/40 to-transparent md:block"
          />
          <div className="grid gap-6 md:grid-cols-4">
            {processSteps.map((step, idx) => (
              <RevealOnScroll
                key={step.title}
                delay={idx * 120}
                className="relative flex flex-col items-start"
              >
                <span className="relative z-10 inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/40 bg-deep-gradient text-base font-black text-leaf shadow-glow">
                  0{idx + 1}
                </span>
                <h3 className="mt-5 text-base font-bold text-bright">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-soft">{step.description}</p>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* CITIES BLOCK - interactive cards */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="surface-elevated relative overflow-hidden p-8 md:p-12">
            <div
              aria-hidden
              className="absolute -right-10 top-1/2 hidden h-72 w-72 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl md:block"
            />

            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
              <div>
                <p className="eyebrow eyebrow-dot"><span>Tulare County, CA</span></p>
                <h2 className="mt-4 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
                  Local contractors. Local <span className="text-gradient">accountability</span>.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">
                  We focus introductions on the Central Valley—soils, climate, HOAs, and water rules that affect your
                  install are top of mind when we align you with a pro.
                </p>
                <ul className="mt-6 space-y-2 text-sm text-soft">
                  <li className="flex items-center gap-2">
                    <CalendarIcon size={16} className="text-leaf" /> Same-week site walkthroughs
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon size={16} className="text-leaf" /> Family-owned, fully insured contractors
                  </li>
                  <li className="flex items-center gap-2">
                    <SparkleIcon size={16} className="text-leaf" /> Honest recommendations - even when DIY is the right call
                  </li>
                </ul>
              </div>

              <div className="grid gap-3">
                {cities.map((city, idx) => (
                  <Link
                    key={city.slug}
                    href={`/locations/${city.slug}`}
                    className="group relative flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-line bg-canvas/60 p-5 transition-all duration-500 hover:-translate-y-0.5 hover:border-primary/40"
                  >
                    <span className="absolute left-0 top-0 h-full w-1 origin-bottom scale-y-0 bg-leaf-gradient transition-transform duration-500 group-hover:scale-y-100" />
                    <div className="flex items-start gap-4">
                      <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                        <MapPinIcon size={20} />
                      </span>
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-leaf">
                          0{idx + 1} - Service Area
                        </p>
                        <p className="mt-0.5 text-base font-bold text-bright">
                          Landscaping in {city.name}, {city.state}
                        </p>
                        <p className="mt-1 text-xs text-muted">
                          {city.neighborhoods.join(" - ")}
                        </p>
                      </div>
                    </div>
                    <ArrowRightIcon
                      size={18}
                      className="text-muted transition-transform duration-500 group-hover:translate-x-1 group-hover:text-leaf"
                    />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* TESTIMONIALS */}
      {/*<section className="container-wide">
        <RevealOnScroll>
          <TestimonialSection />
        </RevealOnScroll>
      </section> */}

      {/* ARTICLES */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">
                <span>Guides</span>
              </p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
                Landscaping articles for <span className="text-gradient">Tulare County homeowners</span>
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted">
                Longer reads on irrigation, turf choices, gravel layouts, and cleanup—each links into our core service and city pages for
                stronger internal discovery.
              </p>
            </div>
            <Link href="/articles" className="btn-secondary shrink-0">
              All articles <ArrowRightIcon size={16} />
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {articleTeasers.map((post) => (
              <Link
                key={post.slug}
                href={`/articles/${post.slug}`}
                className="group surface-elevated flex flex-col p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 md:p-6"
              >
                <time
                  dateTime={post.publishedAt}
                  className="text-[10px] font-semibold uppercase tracking-[0.2em] text-leaf"
                >
                  {new Intl.DateTimeFormat("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    timeZone: "America/Los_Angeles"
                  }).format(new Date(`${post.publishedAt}T12:00:00`))}
                </time>
                <h3 className="mt-2 text-lg font-bold leading-snug text-bright group-hover:text-leaf">{post.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{post.description}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-leaf">
                  Read guide{" "}
                  <ArrowRightIcon size={12} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </RevealOnScroll>
      </section>

      {/* FAQ — contact lives in footer */}
      <section id="contact" className="container-wide max-w-3xl">
        <RevealOnScroll>
          <div>
            <p className="eyebrow">
              <span>FAQs</span>
            </p>
            <h2 className="mb-4 mt-3 text-3xl font-extrabold leading-tight text-bright md:text-4xl">
              Common questions, <span className="text-gradient">straight answers</span>.
            </h2>
            <FAQAccordion faqs={combinedFaqs} />
          </div>
        </RevealOnScroll>
      </section>

      {/* TOP PAGES */}
      <section className="container-wide">
        <RevealOnScroll>
          <div className="surface-glass overflow-hidden p-8 md:p-10">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="eyebrow"><span>Top Pages</span></p>
                <h2 className="mt-3 text-2xl font-bold text-bright md:text-3xl">
                  Popular service + city combinations
                </h2>
              </div>
              <p className="text-xs text-muted">
                {analyticsEnabled
                  ? `Twelve most-visited city + service pages (of ${cityServiceLinkEntries.length}+ localized URLs), refreshed periodically.`
                  : `Twelve popular city + service pages (out of ${cityServiceLinkEntries.length}+ localized URLs). Set Upstash Redis env vars to rank this list by real traffic.`}
              </p>
            </div>
            <div className="mt-6 grid gap-2 text-sm md:grid-cols-2 lg:grid-cols-3">
              {topPageLinks.map(({ city, service, href }) => (
                <Link
                  key={`${city.slug}-${service.slug}`}
                  className="group flex items-center justify-between gap-3 rounded-2xl border border-line bg-panel/40 px-4 py-3 transition-colors hover:border-primary/40 hover:bg-primary/5"
                  href={href}
                >
                  <span className="font-medium text-soft group-hover:text-bright">
                    {service.name} in {city.name}
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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
