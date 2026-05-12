import Link from "next/link";
import { ArrowRightIcon, LeafLogo, MapPinIcon, SparkleIcon } from "@/components/Icons";

const cards = [
  {
    href: "/services",
    title: "Browse services",
    desc: "Turf, sod, irrigation repair, lighting, cleanup, and gravel—each with localized landing pages.",
    icon: SparkleIcon
  },
  {
    href: "/locations",
    title: "Explore cities",
    desc: "Hyper-local pages across Tulare County so intent-driven searches map to real neighborhoods.",
    icon: MapPinIcon
  },
  {
    href: "/#estimate",
    title: "Request a match",
    desc: "Tell us what you need—we coordinate introductions to vetted landscaping contractors.",
    icon: LeafLogo
  }
] as const;

export default function ArticleRelatedCards() {
  return (
    <section className="mt-12" aria-labelledby="article-related-heading">
      <h2 id="article-related-heading" className="text-lg font-bold text-bright md:text-xl">
        Continue exploring
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
        These hubs collect the same topics covered here—ideal next clicks for homeowners comparing scope and service areas.
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map(({ href, title, desc, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className="group surface-elevated flex flex-col p-5 transition duration-300 hover:-translate-y-0.5 hover:border-primary/35 md:p-6"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
              <Icon size={22} />
            </span>
            <h3 className="mt-4 text-base font-bold text-bright group-hover:text-leaf">{title}</h3>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{desc}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-leaf">
              Open <ArrowRightIcon size={12} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
