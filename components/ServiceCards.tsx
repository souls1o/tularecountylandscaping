import Link from "next/link";
import { ArrowRightIcon, CheckIcon, ServiceIcon, SparkleIcon } from "@/components/Icons";
import { services } from "@/data/site";

const layoutClasses = [
  "lg:col-span-7 lg:row-span-2",
  "lg:col-span-5",
  "lg:col-span-5",
  "lg:col-span-4",
  "lg:col-span-4",
  "lg:col-span-4"
];

export default function ServiceCards() {
  return (
    <div className="grid gap-5 lg:grid-cols-12 lg:auto-rows-[minmax(220px,_auto)]">
      {services.map((service, idx) => {
        const featured = idx === 0;
        return (
          <article
            key={service.slug}
            className={`spotlight group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-panel/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40 ${
              layoutClasses[idx] ?? "lg:col-span-4"
            }`}
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl transition-all duration-500 group-hover:bg-primary/20"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-panel-gradient opacity-60"
            />

            <div className="flex items-start justify-between">
              <span
                className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl text-leaf ring-1 ring-primary/30 transition-all duration-500 group-hover:scale-110 ${
                  featured ? "bg-leaf-gradient text-ink ring-leaf/40" : "bg-deep-gradient"
                }`}
              >
                <ServiceIcon slug={service.slug} size={24} />
              </span>
              {featured ? (
                <span className="inline-flex items-center gap-1 rounded-full border border-leaf/40 bg-leaf/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-leaf">
                  <SparkleIcon size={12} /> Most requested
                </span>
              ) : (
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                  Service / 0{idx + 1}
                </span>
              )}
            </div>

            <h3
              className={`mt-5 font-bold text-bright ${
                featured ? "text-2xl md:text-3xl" : "text-lg"
              }`}
            >
              {service.name}
            </h3>
            <p
              className={`mt-2 leading-relaxed text-muted ${
                featured ? "max-w-md text-base" : "text-sm"
              }`}
            >
              {service.shortDescription}
            </p>

            {featured ? (
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-center gap-2 rounded-xl border border-line bg-canvas/50 px-3 py-2 text-sm text-soft"
                  >
                    <CheckIcon size={14} className="text-leaf" />
                    {benefit}
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="mt-4 space-y-1.5 text-sm text-soft">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-2">
                    <CheckIcon size={14} className="text-leaf" />
                    {benefit}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto pt-5">
              <Link
                href={`/services/${service.slug}`}
                className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-leaf"
              >
                Explore {service.name.split(" ")[0]} <ArrowRightIcon size={14} />
              </Link>
            </div>
          </article>
        );
      })}
    </div>
  );
}
