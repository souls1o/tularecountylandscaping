import Link from "next/link";
import { ArrowRightIcon, CheckIcon, ServiceIcon } from "@/components/Icons";
import { services } from "@/data/site";

export default function ServiceCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((service, idx) => (
        <article
          key={service.slug}
          className="spotlight group relative flex h-full min-h-[280px] flex-col overflow-hidden rounded-3xl border border-line bg-panel/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
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
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-deep-gradient text-leaf ring-1 ring-primary/30 transition-transform duration-500 group-hover:scale-110">
              <ServiceIcon slug={service.slug} size={24} />
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
              Service / {String(idx + 1).padStart(2, "0")}
            </span>
          </div>

          <h3 className="mt-5 text-lg font-bold text-bright">{service.name}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{service.shortDescription}</p>

          <ul className="mt-4 space-y-1.5 text-sm text-soft">
            {service.benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <CheckIcon size={14} className="text-leaf" />
                {benefit}
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-5">
            <Link
              href={`/services/${service.slug}`}
              className="link-underline inline-flex items-center gap-1.5 text-sm font-semibold text-leaf"
            >
              Explore {service.name.split(" ")[0]} <ArrowRightIcon size={14} />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}
