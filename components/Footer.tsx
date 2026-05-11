import Link from "next/link";
import type { ReactElement } from "react";
import FooterHours from "@/components/FooterHours";
import {
  ArrowRightIcon,
  CheckIcon,
  FacebookIcon,
  GoogleIcon,
  InstagramIcon,
  LeafLogo,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  ShieldCheckIcon,
  SparkleIcon,
  StarIcon,
  YelpIcon
} from "@/components/Icons";
import {
  brandName,
  brandTagline,
  businessAddress,
  cities,
  emailAddress,
  mailtoHref,
  phoneNumber,
  services,
  socialLinks,
  telHref,
  trustSignals
} from "@/data/site";

const socialIconMap: Record<string, (props: { size?: number }) => ReactElement> = {
  Facebook: FacebookIcon,
  Instagram: InstagramIcon,
  Google: GoogleIcon,
  Yelp: YelpIcon
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-line/70 bg-canvas">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 [background:radial-gradient(circle_at_15%_0%,rgba(34,197,94,0.18),transparent_45%),radial-gradient(circle_at_85%_100%,rgba(74,222,128,0.12),transparent_55%)]"
      />
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-leaf/40 to-transparent" />

      {/* Newsletter / CTA strip */}
      {/* <section className="container-wide pt-16">
        <div className="surface-elevated relative overflow-hidden rounded-[2rem] p-8 md:p-12">
          <div
            aria-hidden
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-center">
            <div>
              <p className="eyebrow eyebrow-dot">
                <span>Free match to local pros</span>
              </p>
              <h2 className="mt-4 max-w-xl text-3xl font-extrabold leading-tight text-bright md:text-4xl">
                Need landscaping in <span className="text-gradient">Tulare County</span>?
              </h2>
              <p className="mt-3 max-w-xl text-sm text-muted md:text-base">
                Tell us what you need—we connect you with vetted local contractors for turf, sod, irrigation,
                lighting, cleanup, and gravel work. We typically respond within 24 hours and can line up
                on-site walkthroughs the same week.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <a href={telHref} className="btn-primary justify-center text-base">
                <PhoneIcon size={18} /> Call {phoneNumber}
              </a>
              <a href={mailtoHref} className="btn-secondary justify-center">
                <MailIcon size={16} /> {emailAddress}
              </a>
            </div>
          </div>
        </div>
      </section> */}

      {/* Trust signals */}
      <section className="container-wide mt-12">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {trustSignals.map((signal, idx) => (
            <div
              key={signal.label}
              className="surface-glass flex items-center gap-3 px-5 py-4"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary/15 text-leaf ring-1 ring-primary/30">
                {idx === 0 ? <ShieldCheckIcon size={18} /> : idx === 1 ? <SparkleIcon size={18} /> : idx === 2 ? <StarIcon size={16} /> : <CheckIcon size={18} />}
              </span>
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-leaf">
                  {signal.label}
                </p>
                <p className="text-sm font-bold text-bright">{signal.value}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main link grid */}
      <section
        className="container-wide mt-14 grid gap-10 pb-12 lg:grid-cols-12"
        itemScope
        itemType="https://schema.org/LocalBusiness"
      >
        <div className="lg:col-span-5">
          <Link href="/" className="inline-flex items-center gap-3">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-deep to-canvas ring-1 ring-primary/30">
              <LeafLogo size={26} />
            </span>
            <span className="flex flex-col">
              <span itemProp="name" className="text-lg font-bold text-bright">
                {brandName}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-leaf">
                Tulare County, CA
              </span>
            </span>
          </Link>
          <p itemProp="description" className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
            {brandTagline}. {brandName} is a referral intake desk—we learn your goals, then introduce you
            to independent landscaping professionals who serve communities throughout Tulare County and nearby
            communities. Licensing, insurance, and workmanship are provided by the independent professionals we
            introduce you to.
          </p>

          <address
            className="mt-6 not-italic text-sm text-soft"
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            <div className="flex items-start gap-3">
              <MapPinIcon className="mt-0.5 text-leaf" size={16} />
              <p>
                <span itemProp="addressLocality">{businessAddress.locality}</span>,{" "}
                <span itemProp="addressRegion">{businessAddress.region}</span>{" "}
                <span itemProp="postalCode">{businessAddress.postalCode}</span>
              </p>
            </div>
          </address>

          <div className="mt-3 flex items-start gap-3 text-sm text-soft">
            <PhoneIcon className="mt-0.5 text-leaf" size={16} />
            <a href={telHref} itemProp="telephone" className="font-semibold text-bright hover:text-leaf">
              {phoneNumber}
            </a>
          </div>

          <div className="mt-3 flex items-start gap-3 text-sm text-soft">
            <MailIcon className="mt-0.5 text-leaf" size={16} />
            <a href={mailtoHref} itemProp="email" className="font-semibold text-bright hover:text-leaf">
              {emailAddress}
            </a>
          </div>

          <ul className="mt-6 flex items-center gap-2">
            {socialLinks.map((social) => {
              const Icon = socialIconMap[social.name];
              return (
                <li key={social.name}>
                  <a
                    href={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    aria-label={`${brandName} on ${social.name}`}
                    itemProp="sameAs"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-panel/60 text-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-leaf"
                  >
                    {Icon ? <Icon size={16} /> : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-leaf">
            Services we match
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/services" className="link-underline font-semibold text-leaf hover:text-bright">
                All services
              </Link>
            </li>
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="link-underline text-soft transition-colors hover:text-bright"
                >
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-leaf">
            Areas we cover
          </h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link href="/locations" className="link-underline font-semibold text-leaf hover:text-bright">
                All locations
              </Link>
            </li>
            {cities.map((city) => (
              <li key={city.slug}>
                <Link
                  href={`/locations/${city.slug}`}
                  className="link-underline text-soft transition-colors hover:text-bright"
                >
                  {city.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.22em] text-leaf">
            Intake hours
          </h3>
          <p className="mt-2 text-xs text-muted">
            When our intake line is staffed to take your call and coordinate introductions.
          </p>
          <FooterHours />

          <Link
            href="/#estimate"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-leaf hover:text-bright"
          >
            Request a match <ArrowRightIcon size={14} />
          </Link>
        </div>
      </section>

      {/* Bottom bar */}
      <div className="border-t border-line/70 bg-canvas/80">
        <div className="container-wide flex flex-col items-start justify-between gap-3 py-5 text-xs text-muted md:flex-row md:items-center">
          <p>
            &copy; {year} <span className="font-semibold text-soft">{brandName}</span>. Referral intake
            service. Independent pros carry their own licensing and insurance.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <li>
              <Link href="/sitemap.xml" className="hover:text-bright">
                Sitemap
              </Link>
            </li>
            <li>
              <Link href="/#privacy" className="hover:text-bright">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/#terms" className="hover:text-bright">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/#accessibility" className="hover:text-bright">
                Accessibility
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
