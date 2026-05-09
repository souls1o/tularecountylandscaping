import { StarIcon } from "@/components/Icons";

const testimonials = [
  {
    name: "M. Johnson",
    city: "Tulare, CA",
    service: "Artificial Turf",
    quote:
      "Fast estimate, clear pricing, and our front yard looked incredible when they finished. Installers were respectful and detail-oriented.",
    accent: "from-primary/30 to-deep/0"
  },
  {
    name: "R. Patel",
    city: "Visalia, CA",
    service: "Sod & Irrigation",
    quote:
      "Professional installers and excellent communication from first walkthrough to final cleanup. Yard looks like a brand new property.",
    accent: "from-leaf/30 to-deep/0"
  },
  {
    name: "S. Ramirez",
    city: "Porterville, CA",
    service: "Yard Cleanup + Lighting",
    quote:
      "Great local service. We got more rental inquiries the week after the upgrade. Worth every dollar.",
    accent: "from-primary/40 to-leaf/0"
  }
];

export default function TestimonialSection() {
  return (
    <section
      id="reviews"
      className="relative overflow-hidden rounded-[2rem] border border-line bg-panel/60 p-8 backdrop-blur-xl md:p-12"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_15%_25%,rgba(34,197,94,0.18),transparent_55%),radial-gradient(circle_at_90%_85%,rgba(74,222,128,0.12),transparent_55%)]"
      />

      <div className="grid items-end gap-6 md:grid-cols-[1fr_auto]">
        <div>
          <p className="eyebrow eyebrow-dot">
            <span>Social Proof</span>
          </p>
          <h2 className="mt-3 max-w-xl text-3xl font-extrabold leading-tight text-bright md:text-4xl">
            Trusted by homeowners across <span className="text-gradient">Tulare County</span>
          </h2>
        </div>
        <div className="flex items-center gap-3 rounded-2xl border border-line bg-canvas/60 px-4 py-3">
          <div className="flex">
            {[0, 1, 2, 3, 4].map((i) => (
              <StarIcon key={i} size={16} className="text-leaf" />
            ))}
          </div>
          <div className="text-xs text-soft">
            <span className="text-base font-bold text-bright">4.9 / 5</span>
            <span className="block text-muted">across 240+ Google reviews</span>
          </div>
        </div>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((item, idx) => (
          <article
            key={item.name}
            className="group relative flex flex-col rounded-3xl border border-line bg-canvas/60 p-6 transition-all duration-500 hover:-translate-y-1 hover:border-primary/40"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            <div
              aria-hidden
              className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${item.accent}`}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-5 top-5 select-none text-7xl font-black leading-none text-primary/15 transition-colors duration-500 group-hover:text-primary/30"
            >
              &ldquo;
            </div>
            <div className="mb-4 flex">
              {[0, 1, 2, 3, 4].map((i) => (
                <StarIcon key={i} size={14} className="text-leaf" />
              ))}
            </div>
            <p className="relative text-sm leading-relaxed text-soft">{item.quote}</p>
            <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
              <div>
                <p className="text-sm font-semibold text-bright">{item.name}</p>
                <p className="text-xs text-muted">{item.city}</p>
              </div>
              <span className="rounded-full border border-primary/25 bg-primary/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-leaf">
                {item.service}
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
