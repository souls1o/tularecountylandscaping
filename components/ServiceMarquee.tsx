import { ServiceIcon } from "@/components/Icons";
import type { Service } from "@/data/site";

export default function ServiceMarquee({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <div className="marquee-mask relative overflow-hidden border-y border-line/60 bg-canvas/40 py-3">
      <div className="flex w-max animate-marquee will-change-transform backface-hidden motion-reduce:animate-none">
        {[0, 1].map((dup) => (
          <ul
            key={dup}
            className="flex shrink-0 items-center gap-10 px-5 md:gap-14 md:px-8"
            aria-hidden={dup === 1}
          >
            {services.map((service) => (
              <li
                key={`${dup}-${service.slug}`}
                className="inline-flex shrink-0 items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-muted md:text-xs"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                  <ServiceIcon slug={service.slug} size={18} />
                </span>
                <span className="whitespace-nowrap text-soft">{service.name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
