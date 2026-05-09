export type Service = {
  slug: string;
  name: string;
  shortDescription: string;
  benefits: string[];
};

export type City = {
  slug: string;
  name: string;
  state: string;
  neighborhoods: string[];
  climateNote: string;
  localAngle: string;
};

export const phoneNumber = "(559) 555-0198";
export const telHref = "tel:+15595550198";
export const emailAddress = "info@tularecountylandscaping.com";
export const mailtoHref = "mailto:info@tularecountylandscaping.com";
export const siteUrl = "https://www.tularecountylandscaping.com";
export const brandName = "Tulare County Landscaping";
export const brandTagline =
  "We match homeowners with vetted Tulare County landscaping professionals—no guesswork, no runaround";

export const businessAddress = {
  street: "317 S O St",
  locality: "Tulare County",
  region: "CA",
  postalCode: "93274",
  country: "US"
};

/** `weekday` matches JavaScript `Date.getDay()` (0 Sunday … 6 Saturday). */
export const footerWeeklyHours: { weekday: number; name: string; hours: string }[] = [
  { weekday: 1, name: "Monday", hours: "7:00 AM – 6:00 PM" },
  { weekday: 2, name: "Tuesday", hours: "7:00 AM – 6:00 PM" },
  { weekday: 3, name: "Wednesday", hours: "7:00 AM – 6:00 PM" },
  { weekday: 4, name: "Thursday", hours: "7:00 AM – 6:00 PM" },
  { weekday: 5, name: "Friday", hours: "7:00 AM – 6:00 PM" },
  { weekday: 6, name: "Saturday", hours: "8:00 AM – 4:00 PM" },
  { weekday: 0, name: "Sunday", hours: "By appointment" }
];

export const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/centralvalleylandscapingpros", handle: "centralvalleylandscapingpros" },
  { name: "Instagram", href: "https://instagram.com/cvlandscapingpros", handle: "@cvlandscapingpros" },
  { name: "Google", href: "https://g.page/cvlandscapingpros", handle: "Google Business Profile" },
  { name: "Yelp", href: "https://yelp.com/biz/central-valley-landscaping-pros", handle: "Yelp Reviews" }
];

export const trustSignals = [
  { label: "Local pro network", value: "Tulare County focused" },
  { label: "Typical callback", value: "Under 24 hours" },
  { label: "Homeowner feedback", value: "4.9 / 5 avg match" },
  { label: "Intro to pros", value: "Same week" }
];

export const services: Service[] = [
  {
    slug: "artificial-turf-installation",
    name: "Artificial Turf Installation",
    shortDescription: "Low-maintenance, always-green turf systems built for Valley heat.",
    benefits: ["No mowing", "Lower water use", "Durable for pets and kids"]
  },
  {
    slug: "sod-installation",
    name: "Sod Installation",
    shortDescription: "Fresh sod installs that establish quickly and look full fast.",
    benefits: ["Instant curb appeal", "Erosion control", "Improved outdoor comfort"]
  },
  {
    slug: "irrigation-repair",
    name: "Irrigation Repair",
    shortDescription: "Smart diagnostics and sprinkler repairs to reduce water waste.",
    benefits: ["Lower bills", "Healthier lawns", "Reliable coverage"]
  },
  {
    slug: "landscape-lighting",
    name: "Landscape Lighting",
    shortDescription: "Energy-efficient lighting for beauty, safety, and usability.",
    benefits: ["Nighttime curb appeal", "Safer walkways", "Extended outdoor use"]
  },
  {
    slug: "yard-cleanup",
    name: "Yard Cleanup",
    shortDescription: "One-time and seasonal cleanups for overgrown, cluttered yards.",
    benefits: ["Cleaner property", "Faster sale prep", "Lower fire risk"]
  },
  {
    slug: "gravel-landscaping",
    name: "Gravel Landscaping",
    shortDescription: "Drought-conscious, low-upkeep landscapes with premium stone finishes.",
    benefits: ["Water-smart design", "Weed reduction", "Modern look"]
  }
];

export const cities: City[] = [
  {
    slug: "tulare-ca",
    name: "Tulare",
    state: "CA",
    neighborhoods: ["Del Lago", "Mission Valley", "Live Oak"],
    climateNote: "hot, dry summers and mild winters",
    localAngle: "properties that need durable landscaping that handles intense summer sun"
  },
  {
    slug: "visalia-ca",
    name: "Visalia",
    state: "CA",
    neighborhoods: ["Green Acres", "Beverly Glen", "Downtown Visalia"],
    climateNote: "long warm seasons with limited rainfall",
    localAngle: "high-value neighborhoods where curb appeal strongly impacts resale value"
  },
  {
    slug: "porterville-ca",
    name: "Porterville",
    state: "CA",
    neighborhoods: ["Westwood", "Eagle Mountain", "Downtown Porterville"],
    climateNote: "summer heat and periodic water-use concerns",
    localAngle: "families looking for practical, low-maintenance outdoor spaces"
  },
  {
    slug: "dinuba-ca",
    name: "Dinuba",
    state: "CA",
    neighborhoods: ["Alta District", "Orange Belt", "Downtown Dinuba"],
    climateNote: "hot summers with cool winter fog pockets typical of eastern Tulare County",
    localAngle: "residential lots that benefit from water-smart turf and gravel transitions"
  },
  {
    slug: "exeter-ca",
    name: "Exeter",
    state: "CA",
    neighborhoods: ["City Center", "Highway 198 corridor", "Orange Cove fringe"],
    climateNote: "dry Central Valley heat with strong seasonal irrigation demand",
    localAngle: "citrus-town curb appeal and tidy front yards that fit smaller-city character"
  },
  {
    slug: "farmersville-ca",
    name: "Farmersville",
    state: "CA",
    neighborhoods: ["Downtown Farmersville", "Westside", "Ivanhoe Highway corridor"],
    climateNote: "long dry stretches and occasional hard frosts in winter",
    localAngle: "working-class neighborhoods where durable, low-upkeep landscapes matter"
  },
  {
    slug: "lindsay-ca",
    name: "Lindsay",
    state: "CA",
    neighborhoods: ["Strathmore Road area", "Downtown Lindsay", "East Lindsay"],
    climateNote: "intense mid-summer temperatures with limited summer rainfall",
    localAngle: "tighter lots and alley-access yards that need efficient layouts"
  },
  {
    slug: "woodlake-ca",
    name: "Woodlake",
    state: "CA",
    neighborhoods: ["Naranjo Boulevard", "Downtown Woodlake", "West Valley"],
    climateNote: "Valley heat plus hillside drainage considerations toward the Sierra foothills",
    localAngle: "sloped entries and driveway planting that handles runoff"
  },
  {
    slug: "goshen-ca",
    name: "Goshen",
    state: "CA",
    neighborhoods: ["Highway 99 corridor", "Road 68 area", "Central Goshen"],
    climateNote: "similar to Visalia—long warm seasons and irrigation-heavy summers",
    localAngle: "semi-rural parcels and highway-adjacent homes needing privacy planting"
  },
  {
    slug: "tipton-ca",
    name: "Tipton",
    state: "CA",
    neighborhoods: ["Downtown Tipton", "County road corridors", "North Tipton"],
    climateNote: "open agricultural exposure and dusty dry summers",
    localAngle: "windbreaks, dust control, and simple irrigation fixes on older systems"
  },
  {
    slug: "pixley-ca",
    name: "Pixley",
    state: "CA",
    neighborhoods: ["Highway 99 area", "Downtown Pixley", "East Pixley"],
    climateNote: "hot, arid summers typical of southern Tulare County",
    localAngle: "renters and homeowners balancing affordability with yard usability"
  }
];

export const cityServiceParams = cities.flatMap((city) =>
  services.map((service) => ({ city: city.slug, service: service.slug }))
);

/** Resolved city + service entities for internal linking / hub grids. */
export const cityServiceLinkEntries = cities.flatMap((city) =>
  services.map((service) => ({
    city,
    service,
    href: `/locations/${city.slug}/${service.slug}` as const
  }))
);

/** FAQs for hub service pages (no single-city bias in questions). */
export function servicePageFaqs(service: Service) {
  return [
    {
      question: `How much does ${service.name.toLowerCase()} typically cost in Tulare County?`,
      answer:
        "Pricing depends on lot size, site condition, materials, and prep. The local pros we introduce you to typically provide written estimates with clear scope options."
    },
    {
      question: `How long does ${service.name.toLowerCase()} take?`,
      answer:
        "Most residential projects finish within a few days once scheduled. Larger scopes or custom details may take longer; your matched contractor will outline a realistic timeline."
    },
    {
      question: "Can I bundle related landscaping work?",
      answer:
        "Often yes. When you describe multiple needs, we can align you with contractors who bundle work for smoother scheduling and less disruption."
    }
  ];
}

export const globalFaqs = [
  {
    question: "How quickly can a local pro start my landscaping work?",
    answer:
      "After we match you, most contractors can schedule within a few business days of your on-site estimate. Timing depends on scope, materials, and weather."
  },
  {
    question: "Are estimates free?",
    answer:
      "Yes. The professionals we introduce you to typically offer free local estimates and clear scope options so you can choose what fits your goals and budget."
  },
  {
    question: "Can I bundle multiple services in one project?",
    answer:
      "Often yes. When you describe everything you need, we can align you with pros who handle bundled work—irrigation, sod, cleanup, and more—in one coordinated plan."
  }
];

export const getServiceBySlug = (slug: string) => services.find((s) => s.slug === slug);
export const getCityBySlug = (slug: string) => cities.find((c) => c.slug === slug);

export function servicePageContent(service: Service): string[] {
  return [
    `${service.name} is one of the fastest ways to improve curb appeal, usability, and property value for Central Valley homes. The local contractors we match you with focus on practical outcomes that look premium and hold up through long summers.`,
    `Projects usually start with a site walkthrough where your matched professional evaluates grading, sun patterns, irrigation conditions, and existing hardscape. That helps define a scope that avoids costly mid-project changes and keeps timelines predictable.`,
    `Homeowners choose this service when they want a cleaner, more intentional yard without constant upkeep. Matched installers combine product guidance, professional standards, and local climate knowledge so results perform in real-world Tulare County conditions.`,
    `Beyond visual impact, this service supports better day-to-day use of your property. Families get safer and more functional spaces, landlords reduce maintenance burden, and sellers create stronger first impressions for buyers.`,
    `Reputable contractors follow a repeatable arc: discovery, design recommendations, preparation, installation, quality checks, and final walkthrough. You should expect clear milestone updates and a single point of contact on site.`,
    `Material quality, long-term care, and water efficiency all affect value. The pros we introduce you to can walk through tradeoffs so you are not guessing when you sign off on a scope.`,
    `If you need dependable ${service.name.toLowerCase()} from a local contractor focused on results, call or request a match. We coordinate introductions; your matched pro handles scope, pricing, and execution.`
  ];
}

export function cityPageContent(city: City): string[] {
  return [
    `Landscaping in ${city.name}, ${city.state} benefits from a local lens. Neighborhoods like ${city.neighborhoods.join(", ")} each have different lot sizes, drainage patterns, and aesthetic expectations.`,
    `${city.name} properties experience ${city.climateNote}, so smart plant choices, irrigation efficiency, and resilient materials are essential for long-term performance.`,
    `Vetted contractors in the area routinely plan around ${city.localAngle}, balancing visual impact with practical maintenance expectations for homeowners, landlords, and busy families.`,
    `From front-yard refreshes to full backyard overhauls, well-scoped work can lift curb appeal while reducing long-term upkeep. Local market expectations and climate realities should drive material and layout choices.`,
    `If you are searching for dependable landscaping help in ${city.name}, we can connect you quickly for estimates, clear scopes, and quality-focused local contractors who keep projects moving.`
  ];
}

export function cityServiceContent(city: City, service: Service): string[] {
  return [
    `${service.name} in ${city.name}, ${city.state} should do more than look good on day one. In a market with ${city.climateNote}, installations need to stay functional, efficient, and attractive over time.`,
    `A strong project starts with property-specific planning: sun exposure, soil or base conditions, irrigation layout, drainage paths, and how your household actually uses the yard. That foundation helps matched contractors design the right scope and avoid expensive rework.`,
    `Homeowners in ${city.name} often want landscaping that supports ${city.localAngle}. Experienced local installers emphasize durability, clean lines, and maintainability so the finished result fits both lifestyle and property goals.`,
    `Neighborhood context still matters, including areas like ${city.neighborhoods.join(", ")}. Some properties need stronger edge definition and drainage control, while others benefit from layout optimization for entertaining, children, or pet use.`,
    `Execution quality is where long-term value is created. Reputable contractors follow a disciplined sequence for prep, installation, and finishing so every element performs as intended, with proper base work, precise measurements, and final checks before handoff.`,
    `Clear communication reduces surprises: scheduling windows, scope confirmations before major steps, and practical guidance after work wraps. Ask your matched contractor how they prefer to keep you updated.`,
    `For many properties, ${service.name.toLowerCase()} pairs well with complementary upgrades such as cleanup, irrigation adjustments, lighting, or material transitions. Your matched pro can advise on bundling versus phasing work.`,
    `If you want reliable ${service.name.toLowerCase()} in ${city.name}, start with a call or form request and we will introduce you to a local professional for estimates and next steps.`
  ];
}

export function buildFaqs(city: City, service?: Service) {
  if (!service) {
    return [
      {
        question: `Do you connect homeowners across all of ${city.name}?`,
        answer: `Yes. We coordinate introductions for major neighborhoods in ${city.name}, including ${city.neighborhoods.join(", ")}.`
      },
      {
        question: `What landscaping is best for ${city.name} weather?`,
        answer: `Water-conscious layouts, efficient irrigation, and durable materials are typically best due to ${city.climateNote}. We can match you with pros who specialize in those approaches.`
      }
    ];
  }

  return [
    {
      question: `How much does ${service.name.toLowerCase()} cost in ${city.name}?`,
      answer:
        "Pricing depends on project size, site condition, materials, and prep requirements. The local pros we introduce you to typically provide clear written estimates with options."
    },
    {
      question: `How long does ${service.name.toLowerCase()} take?`,
      answer:
        "Most residential projects are completed within a few days once scheduled, though larger scopes and custom details may take longer. Your matched contractor will give you a realistic timeline."
    },
    {
      question: `Can I bundle related landscaping work?`,
      answer:
        "Often yes. When you describe multiple needs, we can align you with contractors who bundle work for smoother scheduling and less disruption."
    }
  ];
}
