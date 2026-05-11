import {
  brandName,
  businessAddress,
  cities,
  emailAddress,
  phoneNumber,
  siteUrl,
  socialLinks
} from "@/data/site";

const countyAndCityAreasServed = ["Tulare County, CA", ...cities.map((c) => `${c.name}, CA`)];

type FaqItem = { question: string; answer: string };

/** Office / intake hours for structured data (matches footer schedule). */
const openingHoursSpec = [
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "07:00",
    closes: "18:00"
  },
  {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Saturday"],
    opens: "08:00",
    closes: "16:00"
  }
];

export function buildLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: brandName,
    description:
      "Referral and intake service connecting Tulare County homeowners with vetted local landscaping contractors for estimates and project work.",
    url: siteUrl,
    telephone: phoneNumber,
    email: emailAddress,
    image: `${siteUrl}/og-image.png`,
    priceRange: "$$",
    serviceType: "Landscaping contractor referral and homeowner intake",
    address: {
      "@type": "PostalAddress",
      streetAddress: businessAddress.street,
      addressLocality: businessAddress.locality,
      addressRegion: businessAddress.region,
      postalCode: businessAddress.postalCode,
      addressCountry: businessAddress.country
    },
    areaServed: countyAndCityAreasServed,
    openingHoursSpecification: openingHoursSpec,
    sameAs: socialLinks.map((social) => social.href),
    geo: {
      "@type": "GeoCoordinates",
      latitude: 36.2077,
      longitude: -119.3473
    }
  };
}

export function buildServiceSchema(serviceName: string, pageUrl: string, cityName?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: serviceName,
    provider: {
      "@type": "LocalBusiness",
      name: brandName,
      telephone: phoneNumber,
      email: emailAddress
    },
    areaServed: cityName ? `${cityName}, CA` : cities.map((c) => `${c.name}, CA`),
    url: `${siteUrl}${pageUrl}`
  };
}

export function buildFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };
}

type BreadcrumbItem = { name: string; path: string };

/** JSON-LD BreadcrumbList — pair with visible `Breadcrumbs` for parity. */
export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

const organizationId = `${siteUrl}/#organization`;
const websiteId = `${siteUrl}/#website`;

/** Site-wide Organization + WebSite graph for publisher clarity (inject once in root layout). */
export function buildSiteGraphSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: brandName,
        url: siteUrl,
        logo: `${siteUrl}/icon.svg`,
        sameAs: socialLinks.map((s) => s.href),
        contactPoint: {
          "@type": "ContactPoint",
          telephone: phoneNumber,
          email: emailAddress,
          contactType: "customer service",
          areaServed: "US",
          availableLanguage: "English"
        }
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: brandName,
        description:
          "Referral service connecting Tulare County homeowners with vetted landscaping contractors.",
        inLanguage: "en-US",
        publisher: { "@id": organizationId }
      }
    ]
  };
}

export function absoluteUrl(path: string) {
  return `${siteUrl}${path}`;
}
