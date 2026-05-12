"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRightIcon,
  ChevronDownIcon,
  CloseIcon,
  LeafLogo,
  MailIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  ServiceIcon,
  SparkleIcon
} from "@/components/Icons";
import {
  brandName,
  cities,
  emailAddress,
  mailtoHref,
  phoneNumber,
  services,
  telHref
} from "@/data/site";

type DropdownKey = "services" | "locations" | "company" | null;

const companyLinks = [
  { label: "About Us", href: "/#about", description: "How we match homeowners with local pros." },
  { label: "How It Works", href: "/#process", description: "From request to introduction to estimate." },
  {
    label: "Articles",
    href: "/articles",
    description: "Guides on turf, irrigation, gravel, and Tulare County-friendly landscaping."
  },
  { label: "Contact", href: "/#contact", description: "Free same-week contractor introductions." }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<DropdownKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [portalReady, setPortalReady] = useState(false);
  const pathname = usePathname();
  const hoverTimer = useRef<number | null>(null);

  useEffect(() => setPortalReady(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpen(null);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const enter = (key: DropdownKey) => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    setOpen(key);
  };

  const leave = () => {
    if (hoverTimer.current) window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setOpen(null), 120);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-line/80 bg-canvas/85 shadow-[0_8px_30px_rgba(0,0,0,0.45)] backdrop-blur-2xl"
          : "border-b border-transparent bg-canvas/40 backdrop-blur-md"
      }`}
    >
      <nav className="container-wide flex items-center justify-between gap-6 py-3 md:py-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-deep to-canvas ring-1 ring-primary/30 transition-transform duration-500 group-hover:rotate-6">
            <LeafLogo size={22} />
            <span className="absolute -inset-1 -z-10 rounded-2xl bg-primary/20 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-[15px] font-bold text-bright sm:text-base">
              <span className="hidden sm:inline">{brandName}</span>
              <span className="sm:hidden">Tulare County Landscaping</span>
            </span>
            <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-leaf">
              Tulare County, CA
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex" onMouseLeave={leave}>
          <DesktopDropdown
            label="Services"
            isOpen={open === "services"}
            onEnter={() => enter("services")}
            onLeave={leave}
          >
            <ServicesPanel />
          </DesktopDropdown>

          <DesktopDropdown
            label="Locations"
            isOpen={open === "locations"}
            onEnter={() => enter("locations")}
            onLeave={leave}
          >
            <LocationsPanel />
          </DesktopDropdown>

          <DesktopDropdown
            label="Company"
            isOpen={open === "company"}
            onEnter={() => enter("company")}
            onLeave={leave}
          >
            <CompanyPanel />
          </DesktopDropdown>

        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={mailtoHref}
            aria-label="Email us"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-soft transition-all duration-300 hover:border-primary hover:text-leaf"
          >
            <MailIcon size={16} />
          </a>
          <a href={telHref} className="btn-primary">
            <PhoneIcon size={16} />
            {phoneNumber}
          </a>
        </div>

        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-panel/70 text-bright transition-colors hover:border-primary hover:text-leaf lg:hidden"
        >
          {mobileOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </nav>

      {portalReady && mobileOpen
        ? createPortal(<MobileMenuPortal onClose={() => setMobileOpen(false)} />, document.body)
        : null}
    </header>
  );
}

function DesktopDropdown({
  label,
  isOpen,
  onEnter,
  onLeave,
  children
}: {
  label: string;
  isOpen: boolean;
  onEnter: () => void;
  onLeave: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <button
        type="button"
        className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
          isOpen ? "bg-white/5 text-bright" : "text-soft hover:bg-white/5 hover:text-bright"
        }`}
        aria-expanded={isOpen}
      >
        {label}
        <ChevronDownIcon
          size={14}
          className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`absolute left-1/2 top-full pt-3 transition-all duration-300 ${
          isOpen
            ? "pointer-events-auto -translate-x-1/2 translate-y-0 opacity-100"
            : "pointer-events-none -translate-x-1/2 -translate-y-1 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function ServicesPanel() {
  return (
    <div className="surface-elevated w-[640px] overflow-hidden p-2 shadow-panel">
      <div className="grid grid-cols-2 gap-1">
        {services.map((service) => (
          <Link
            key={service.slug}
            href={`/services/${service.slug}`}
            className="group flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-primary/10"
          >
            <span className="mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
              <ServiceIcon slug={service.slug} size={22} />
            </span>
            <span className="flex flex-col">
              <span className="text-sm font-semibold text-bright group-hover:text-leaf">
                {service.name}
              </span>
              <span className="mt-0.5 text-xs leading-relaxed text-muted">
                {service.shortDescription}
              </span>
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-2 flex items-center justify-between rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3">
        <div className="flex items-center gap-2 text-xs text-leaf">
          <SparkleIcon size={14} />
          Bundle services and save up to 15%.
        </div>
        <Link href="/services" className="link-underline text-xs font-semibold text-bright">
          View all services <ArrowRightIcon size={14} />
        </Link>
      </div>
    </div>
  );
}

function LocationsPanel() {
  return (
    <div className="surface-elevated w-[420px] overflow-hidden p-2 shadow-panel">
      <div className="flex flex-col gap-1">
        {cities.map((city) => (
          <Link
            key={city.slug}
            href={`/locations/${city.slug}`}
            className="group flex items-center justify-between rounded-2xl p-3 transition-colors hover:bg-primary/10"
          >
            <span className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-deep-gradient text-leaf ring-1 ring-primary/30">
                <MapPinIcon size={16} />
              </span>
              <span>
                <span className="block text-sm font-semibold text-bright group-hover:text-leaf">
                  {city.name}, {city.state}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Serving {city.neighborhoods.slice(0, 2).join(" & ")}
                </span>
              </span>
            </span>
            <ArrowRightIcon
              size={16}
              className="text-muted transition-all duration-300 group-hover:translate-x-1 group-hover:text-leaf"
            />
          </Link>
        ))}
      </div>
      <div className="mt-2 flex flex-col gap-2 rounded-2xl border border-primary/25 bg-primary/5 px-4 py-3">
        <Link href="/locations" className="link-underline text-xs font-semibold text-bright">
          All service areas <ArrowRightIcon size={14} />
        </Link>
        <p className="text-xs font-medium text-muted">Servicing all of Tulare County - call for areas not listed.</p>
      </div>
    </div>
  );
}

function CompanyPanel() {
  return (
    <div className="surface-elevated w-[340px] overflow-hidden p-2 shadow-panel">
      <div className="flex flex-col gap-1">
        {companyLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl p-3 transition-colors hover:bg-primary/10"
          >
            <span className="block text-sm font-semibold text-bright group-hover:text-leaf">
              {link.label}
            </span>
            <span className="mt-0.5 block text-xs text-muted">{link.description}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function MobileMenuPortal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <button
        type="button"
        aria-label="Close menu"
        className="fixed inset-x-0 bottom-0 top-[68px] z-[40] bg-deep/65 backdrop-blur-[3px] lg:hidden"
        onClick={onClose}
      />
      <div
        className="fixed inset-x-0 bottom-0 top-[68px] z-[41] overflow-y-auto overscroll-y-contain border-t border-line/70 bg-canvas/98 backdrop-blur-xl animate-slide-down shadow-[0_-12px_48px_rgba(0,0,0,0.45)] motion-reduce:animate-none lg:hidden [touch-action:pan-y]"
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
      >
        <div className="container-wide space-y-6 py-6 pb-10">
          <MobileSection title="Services">
            <Link
              href="/services"
              onClick={onClose}
              className="mb-3 flex items-center justify-between rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-semibold text-bright"
            >
              View all services
              <ArrowRightIcon size={16} className="text-leaf" />
            </Link>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  onClick={onClose}
                  className="flex items-center gap-3 rounded-2xl border border-line bg-panel/60 p-3 transition-colors hover:border-primary"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-deep-gradient text-leaf">
                    <ServiceIcon slug={service.slug} size={18} />
                  </span>
                  <span className="text-sm font-semibold text-bright">{service.name}</span>
                </Link>
              ))}
            </div>
          </MobileSection>

          <MobileSection title="Locations">
            <Link
              href="/locations"
              onClick={onClose}
              className="mb-3 flex items-center justify-between rounded-2xl border border-primary/40 bg-primary/10 px-4 py-3 text-sm font-semibold text-bright"
            >
              All service areas
              <ArrowRightIcon size={16} className="text-leaf" />
            </Link>
            <div className="grid gap-2">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/locations/${city.slug}`}
                  onClick={onClose}
                  className="flex items-center justify-between rounded-2xl border border-line bg-panel/60 p-3 hover:border-primary"
                >
                  <span className="flex items-center gap-3">
                    <MapPinIcon size={16} className="text-leaf" />
                    <span className="text-sm font-semibold text-bright">
                      {city.name}, {city.state}
                    </span>
                  </span>
                  <ArrowRightIcon size={16} className="text-muted" />
                </Link>
              ))}
            </div>
          </MobileSection>

          <MobileSection title="Company">
            <div className="grid gap-2">
              {companyLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className="rounded-2xl border border-line bg-panel/60 p-3 text-sm font-semibold text-bright hover:border-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </MobileSection>

          <div className="grid gap-3 border-t border-line/70 pt-5">
            <a href={telHref} className="btn-primary w-full justify-center" onClick={onClose}>
              <PhoneIcon size={16} /> Call {phoneNumber}
            </a>
            <a href={mailtoHref} className="btn-secondary w-full justify-center" onClick={onClose}>
              <MailIcon size={16} /> {emailAddress}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

function MobileSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-leaf">{title}</p>
      {children}
    </section>
  );
}
